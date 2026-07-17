#!/usr/bin/env python3
"""Generate Leaf Notion gallery banners from secondary colours and icon assets."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from dataclasses import dataclass, replace
from difflib import SequenceMatcher
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:  # pragma: no cover - exercised by local environment
    raise SystemExit("This generator needs Pillow. Run: pip install pillow") from exc


# This file ships in two layouts and must work unchanged in both:
# - leaf plugin repo: brand/tools/<this file>, with the find-icon skill at
#   brand/skills/find-icon/ (a sibling of tools/).
# - standalone find-icon skill (leafgrowio/brand skills/ export): this file
#   sits inside the skill directory, next to manifest.json and brand_repo.py.
_HERE = Path(__file__).resolve().parent
if (_HERE / "manifest.json").exists():
    ROOT = _HERE
    FIND_ICON_DIR = _HERE
    DEFAULT_OUTPUT_DIR = Path.cwd() / "notion-banners"
else:
    ROOT = _HERE.parent
    FIND_ICON_DIR = ROOT / "skills" / "find-icon"
    DEFAULT_OUTPUT_DIR = ROOT / "exports" / "notion-banners"
MANIFEST_PATH = FIND_ICON_DIR / "manifest.json"

# Icon assets are not shipped locally — they live in the public leafgrowio/brand
# repo and are fetched on demand via brand_repo.fetch_asset(). This tool selects
# candidates from the generated manifest (brand-repo-relative paths) and only
# downloads the single PNG it ends up compositing.
sys.path.insert(0, str(FIND_ICON_DIR))
from brand_repo import fetch_asset  # noqa: E402

INK = "#171412"
SECONDARY_COLOURS = {
    "marigold": "#EFB75A",
    "butter": "#F6E49D",
    "apricot": "#F4A38F",
    "rosehip": "#D96B7C",
    "sage": "#DCE8C4",
    "laurel": "#8EBB91",
    "eucalyptus": "#9FC7BC",
    "harbor": "#4FA3A6",
    "lilac": "#D8CFF0",
    "heather": "#AAA2D4",
}
PRESETS = {
    "page-cover": (1500, 600),
    "gallery-preview": (1500, 840),
    "square": (1200, 1200),
}

REQUEST_ALIASES = {
    "award": ["badge", "certificate", "medal", "star", "trophy"],
    "awards": ["badge", "certificate", "medal", "star", "trophy"],
    "brand": ["badge", "book", "guidebook", "megaphone", "palette"],
    "certification": ["badge", "certificate", "degree", "shield"],
    "certifications": ["badge", "certificate", "degree", "shield"],
    "creative": ["brush", "palette", "pencil", "picture"],
    "growth": ["chart", "growth", "plant"],
    "history": ["book", "guidebook", "leaf", "report"],
    "leaf": ["ecology", "leaf", "plant"],
    "leafers": ["conversation", "group", "team", "user"],
    "people": ["conversation", "group", "team", "user"],
    "performance": ["analytics", "chart", "growth", "report"],
    "strategy": ["chart", "dartboard", "map", "target"],
    "values": ["badge", "certificate", "heart", "shield", "star"],
    "voice": ["chat", "communication", "megaphone", "speech"],
}
PHRASE_ALIASES = {
    "brand and voice": ["book", "guidebook", "megaphone", "palette", "speech"],
    "getting to know": ["book", "guidebook", "leaf", "learning"],
    "what we do": ["business", "building", "chart", "growth", "workflow"],
}


@dataclass(frozen=True)
class IconCandidate:
    rel_path: str  # brand-repo-relative, e.g. "assets/icons/banking/Abacus/black/png/Abacus.png"
    context: str  # theme
    name: str
    score: float


def parse_hex(hex_colour: str) -> tuple[int, int, int, int]:
    clean = hex_colour.strip().lstrip("#")
    if not re.fullmatch(r"[0-9a-fA-F]{6}", clean):
        raise ValueError(f"Expected a 6-digit hex colour, got {hex_colour!r}")
    return tuple(int(clean[index : index + 2], 16) for index in (0, 2, 4)) + (255,)


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "notion-banner"


def tokens(value: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", value.lower().replace("_", " "))


def expanded_query_terms(request: str) -> list[str]:
    terms = tokens(request)
    expanded = list(terms)
    lowered = request.lower()
    for phrase, aliases in PHRASE_ALIASES.items():
        if phrase in lowered:
            expanded.extend(aliases)
    for term in terms:
        expanded.extend(REQUEST_ALIASES.get(term, []))
    return expanded


def load_manifest() -> dict:
    if not MANIFEST_PATH.exists():
        raise SystemExit(
            f"Icon manifest not found: {MANIFEST_PATH}\n"
            "Regenerate it with: python3 brand/tools/generate_icon_manifest.py "
            "--brand-root <clone of leafgrowio/brand>"
        )
    return json.loads(MANIFEST_PATH.read_text())


def iter_icons(treatment: str) -> list[IconCandidate]:
    """Return candidates (brand-repo-relative PNG paths) for a colour treatment.

    Drawn from the manifest rather than the filesystem — assets are remote."""
    manifest = load_manifest()
    candidates: list[IconCandidate] = []
    for theme, icons in manifest.get("themes", {}).items():
        for icon_name, variants in icons.items():
            for variations in variants.values():
                formats = variations.get(treatment)
                if not formats or "png" not in formats:
                    continue
                candidates.append(
                    IconCandidate(rel_path=formats["png"], context=theme, name=icon_name, score=0.0)
                )
    candidates.sort(key=lambda candidate: (candidate.context, candidate.name, candidate.rel_path))
    return candidates


def score_icon(candidate: IconCandidate, request: str, expanded_terms: list[str]) -> IconCandidate:
    haystack = f"{candidate.context} {candidate.name}".lower()
    haystack_terms = set(tokens(haystack))
    query = " ".join(tokens(request))

    exact_bonus = 45 if query and query in haystack else 0
    overlap = len(set(expanded_terms) & haystack_terms)
    partial = sum(1 for term in expanded_terms if len(term) > 2 and term in haystack)
    similarity = SequenceMatcher(None, query, haystack).ratio() if query else 0
    score = exact_bonus + (overlap * 18) + (partial * 8) + (similarity * 35)
    return replace(candidate, score=score)


def find_icon(request: str, treatment: str, explicit_icon: str | None = None) -> IconCandidate:
    icons = iter_icons(treatment)
    if not icons:
        raise SystemExit(f"No PNG icons found for treatment {treatment!r} in the manifest.")

    if explicit_icon:
        explicit = explicit_icon.lower()
        matches = [
            candidate
            for candidate in icons
            if explicit in candidate.name.lower() or explicit in candidate.rel_path.lower()
        ]
        if not matches:
            raise SystemExit(f"No {treatment!r} icon matched {explicit_icon!r}")
        return replace(matches[0], score=999)

    expanded_terms = expanded_query_terms(request)
    ranked = sorted(
        (score_icon(candidate, request, expanded_terms) for candidate in icons),
        key=lambda candidate: (-candidate.score, candidate.context, candidate.name),
    )
    return ranked[0]


def suggest_icons(request: str, treatment: str, limit: int) -> list[IconCandidate]:
    expanded_terms = expanded_query_terms(request)
    return sorted(
        (score_icon(candidate, request, expanded_terms) for candidate in iter_icons(treatment)),
        key=lambda candidate: (-candidate.score, candidate.context, candidate.name),
    )[:limit]


def pick_colour(request: str, colour_name: str) -> tuple[str, str]:
    normalized = colour_name.lower()
    if normalized != "auto":
        if normalized not in SECONDARY_COLOURS:
            allowed = ", ".join(["auto", *SECONDARY_COLOURS.keys()])
            raise SystemExit(f"Unknown colour {colour_name!r}. Use one of: {allowed}")
        return normalized, SECONDARY_COLOURS[normalized]

    digest = hashlib.sha256(request.encode("utf-8")).digest()
    names = list(SECONDARY_COLOURS)
    name = names[digest[0] % len(names)]
    return name, SECONDARY_COLOURS[name]


def fit_icon(icon: Image.Image, max_width: int, max_height: int) -> Image.Image:
    icon = icon.convert("RGBA")
    bbox = icon.getbbox()
    if bbox:
        icon = icon.crop(bbox)
    icon.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
    return icon


def generate_banner(
    request: str,
    output: Path,
    width: int,
    height: int,
    colour_hex: str,
    icon_path: Path,
    icon_scale: float,
) -> None:
    background = Image.new("RGBA", (width, height), parse_hex(colour_hex))
    icon_limit = int(min(width, height) * icon_scale)
    icon = fit_icon(Image.open(icon_path), icon_limit, icon_limit)
    x = (width - icon.width) // 2
    y = (height - icon.height) // 2
    background.alpha_composite(icon, (x, y))
    output.parent.mkdir(parents=True, exist_ok=True)
    background.convert("RGB").save(output, "PNG", optimize=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate a Leaf-style Notion gallery banner from a request and icon-library match."
    )
    parser.add_argument("request", nargs="?", help="Natural-language banner request, such as 'Our values'.")
    parser.add_argument("--colour", "--color", default="auto", help="Secondary colour token name, or auto.")
    parser.add_argument("--icon", help="Force an icon by partial filename or path match.")
    parser.add_argument(
        "--treatment",
        default="black",
        choices=["black", "black solid"],
        help="Icon treatment to use from assets/icons.",
    )
    parser.add_argument("--preset", default="page-cover", choices=PRESETS.keys(), help="Output size preset.")
    parser.add_argument("--width", type=int, help="Override output width in pixels.")
    parser.add_argument("--height", type=int, help="Override output height in pixels.")
    parser.add_argument("--icon-scale", type=float, default=0.36, help="Icon size as a fraction of the shorter side.")
    parser.add_argument("--output", type=Path, help="Output PNG path.")
    parser.add_argument("--list-colours", action="store_true", help="Print available secondary colours and exit.")
    parser.add_argument("--suggest-icons", type=int, metavar="N", help="Print the top N icon matches and exit.")
    parser.add_argument(
        "--local-root",
        help="Debug: read icon PNGs from a local clone of the brand repo instead of "
        "downloading (the dir containing assets/).",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if args.list_colours:
        for name, value in SECONDARY_COLOURS.items():
            print(f"{name}: {value}")
        return 0

    if not args.request:
        raise SystemExit("Provide a banner request, or use --list-colours.")

    if args.suggest_icons:
        for candidate in suggest_icons(args.request, args.treatment, args.suggest_icons):
            print(f"{candidate.score:6.1f}  {candidate.name}  [{candidate.context}]  {candidate.rel_path}")
        return 0

    width, height = PRESETS[args.preset]
    width = args.width or width
    height = args.height or height
    if width <= 0 or height <= 0:
        raise SystemExit("Width and height must be positive integers.")
    if not 0.05 <= args.icon_scale <= 0.9:
        raise SystemExit("--icon-scale must be between 0.05 and 0.9")

    colour_name, colour_hex = pick_colour(args.request, args.colour)
    icon = find_icon(args.request, args.treatment, args.icon)
    icon_file = fetch_asset(icon.rel_path, local_root=args.local_root)
    output = args.output or DEFAULT_OUTPUT_DIR / f"{slugify(args.request)}-{colour_name}-{slugify(icon.name)}.png"

    generate_banner(args.request, output, width, height, colour_hex, icon_file, args.icon_scale)

    print(f"Generated: {output.relative_to(ROOT) if output.is_relative_to(ROOT) else output}")
    print(f"Request: {args.request}")
    print(f"Colour: {colour_name} ({colour_hex})")
    print(f"Icon: {icon.rel_path}")
    print(f"Icon file: {icon_file}")
    print(f"Size: {width}x{height}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
