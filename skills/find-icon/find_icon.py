#!/usr/bin/env python3
"""Resolve a natural-language query to Leaf icon asset paths and URLs.

Stdlib-only so any agent runtime can call it without installing dependencies.
Reads manifest.json (auto-generated from the brand repo — see
brand/tools/generate_icon_manifest.py) and keywords.json (hand-curated synonym
overlay) sitting next to this script, merges them, and returns ranked matches
as JSON on stdout.

Assets are NOT shipped with the plugin. They live in the public leafgrowio/brand
repo and are fetched at runtime via raw URLs. Each result therefore carries, for
every colour-variation/format combination, both the brand-repo-relative `path`
and the raw GitHub `url`. Download a chosen asset with fetch_asset() (see
brand_repo.py) or the --fetch flag, then use the returned local file.

Usage:
    python3 find_icon.py "shopping cart"
    python3 find_icon.py "growth" --theme banking --limit 5
    python3 find_icon.py "checkout" --variation "white" --format svg
    python3 find_icon.py "shopping cart" --fetch          # download top result
    python3 find_icon.py "store" --gallery out.html       # candidates gallery
    python3 find_icon.py "store" --widget out.html        # chat-widget fragment
    python3 find_icon.py --icon "shopping/Shopping Website"
    python3 find_icon.py --icon "shopping/Shopping Website" \
        --gallery out.html --recommend "white"            # variations gallery
    python3 find_icon.py "work in progress" "construction" "checklist" \
        --limit 6 --gallery out.html --widget out2.html   # merged multi-query

Output for a single-term query is a JSON array — unchanged shape. Passing
multiple query terms (or --gallery/--widget) wraps the same array under
"results" instead: each term is ranked separately, then merged and deduped by
(theme, name), keeping the highest-scoring row and recording which term(s)
matched it under `matched_query`. Use multiple terms to broaden a search that
returns nothing or too little — never run separate searches and hand-splice
the resulting gallery/widget files together; the merged run produces one
gallery/widget with continuous badge numbering. Each match includes the
icon's theme, name, variant, a `paths` object mapping every colour-variation/
format combination to its {path, url}, and the score that produced the ranking
— so a calling skill can pick the exact asset it needs (e.g. white SVG
for a dark banner) without a second lookup.

Galleries are the premade UI for interactive picking: the script fills
gallery_template.html (next to this script) with numbered cards and writes a
self-contained HTML file. Galleries default to --embed inline: each card's SVG
text is fetched (cached, with a git-clone fallback when raw URLs are
unreachable) and inlined directly into the file, because gallery files are
often opened in an in-app file-preview panel whose CSP blocks ALL external
images (including jsDelivr) — an inline gallery renders everywhere. --embed
cdn instead points each card's <img> at the icon's SVG on cdn.jsdelivr.net —
jsDelivr's mirror of the public brand repo — for galleries you know will be
opened in a real browser (near-instant, nothing fetched). --embed url points
<img> at the public raw-GitHub PNG — also nothing downloaded, for browser-
destined files. A per-card inline failure falls back to a URL embed and is
noted in the JSON output under embed_fallbacks.

--widget writes a compact chat-widget HTML fragment instead of (or alongside) a
full gallery document: scoped .lfic- CSS, and clickable cards that call the
surface's global sendPrompt() so a click sends the pick back to chat. Widgets
default to --embed cdn (jsDelivr <img> tags) because the chat-widget CSP
allowlists cdn.jsdelivr.net, keeping the fragment tiny. Paste the fragment
verbatim into an inline-widget surface; without JS it degrades to a static
card grid.

An explicit --embed flag overrides both defaults and applies to whichever of
--gallery/--widget are passed in the same run.
"""

import argparse
import difflib
import html
import json
import re
import string
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
MANIFEST_PATH = SCRIPT_DIR / "manifest.json"
KEYWORDS_PATH = SCRIPT_DIR / "keywords.json"
GALLERY_TEMPLATE_PATH = SCRIPT_DIR / "gallery_template.html"

# Preferred display order; also the neutral-display preference for candidate
# galleries (black first — rendered on the light swatch).
VARIATION_ORDER = ["black", "white"]

# Per-card snippet substituted into gallery_template.html's $cards slot. The
# template documents this shape — keep the two in sync.
CARD_TEMPLATE = string.Template(
    '    <div class="card$extra">\n'
    '      <span class="badge">$number</span>$tag\n'
    '      <div class="icon $swatch">$media</div>\n'
    '      <div class="caption"><div class="name">$name</div>\n'
    '      <div class="meta">$meta</div></div>\n'
    "    </div>"
)

# Chat-widget fragment pieces (--widget). Deliberately terse: the fragment gets
# pasted into a chat surface, so every byte counts. Class names are prefixed
# lfic- so they cannot collide with the host page; background stays transparent
# and there is no top-level padding, per inline-widget surface rules. Cards are
# <button>s calling the surface's global sendPrompt(); without JS they render
# as a static grid.
WIDGET_CSS = (
    "<style>"
    ".lfic{display:flex;flex-wrap:wrap;gap:10px;font:13px/1.4 system-ui,sans-serif;color:#1c1c1a}"
    ".lfic-c{position:relative;width:118px;padding:0;text-align:center;cursor:pointer;"
    "border:1px solid #e7e7e3;border-radius:10px;overflow:hidden;background:#fff;font:inherit;color:inherit}"
    ".lfic-c:hover{border-color:#e2543e}"
    ".lfic-c.lfic-r{border:2px solid #e2543e}"
    ".lfic-n{position:absolute;top:6px;left:6px;min-width:18px;line-height:18px;padding:0 5px;"
    "border-radius:9px;background:#1c1c1a;color:#fff;font-size:11px;font-weight:600}"
    ".lfic-rt{position:absolute;top:6px;right:6px;padding:1px 6px;border-radius:8px;"
    "background:#e2543e;color:#fff;font-size:10px;font-weight:600}"
    ".lfic-i{height:84px;display:flex;align-items:center;justify-content:center}"
    ".lfic-i svg,.lfic-i img{width:54px;height:54px}"
    ".lfic-l{background:#fafaf7}.lfic-d{background:#161614}"
    ".lfic-t{display:block;padding:6px 8px 8px;border-top:1px solid #e7e7e3}"
    ".lfic-m{color:#8a8a85;font-size:11px}"
    "</style>"
)

WIDGET_CARD = string.Template(
    '<button class="lfic-c$extra" type="button" onclick="$onclick">'
    '<span class="lfic-n">$number</span>$tag'
    '<span class="lfic-i lfic-$swatch">$media</span>'
    '<span class="lfic-t"><b>$name</b><br><span class="lfic-m">$meta</span></span>'
    "</button>"
)

sys.path.insert(0, str(SCRIPT_DIR))
from brand_repo import asset_url, cdn_url, fetch_asset  # noqa: E402


def tokenize(text: str) -> set:
    return set(re.findall(r"[a-z0-9]+", text.lower()))


def load_json(path: Path) -> dict:
    if not path.exists():
        return {}
    return json.loads(path.read_text())


def build_index(manifest: dict, keywords: dict) -> list:
    """Flatten manifest into one row per (theme, icon, variant) with a token set."""
    rows = []
    for theme, icons in manifest.get("themes", {}).items():
        for icon_name, variants in icons.items():
            icon_id = f"{theme}/{icon_name}"
            extra_terms = keywords.get(icon_id, [])
            # Deliberately excludes the theme name: injecting it into every
            # icon's tokens made same-theme icons score identically regardless
            # of relevance (e.g. "shopping cart" matching "Banknote" just
            # because it lives under the shopping theme). Use --theme to
            # filter by theme explicitly instead.
            base_tokens = tokenize(icon_name)
            for term in extra_terms:
                base_tokens |= tokenize(term)
            for variant_name, variations in variants.items():
                rows.append(
                    {
                        "theme": theme,
                        "name": icon_name,
                        "variant": variant_name,
                        "variations": variations,
                        "tokens": base_tokens,
                        "keywords": extra_terms,
                    }
                )
    return rows


def score(query_tokens: set, row_tokens: set) -> float:
    if not query_tokens:
        return 0.0
    overlap = len(query_tokens & row_tokens)
    if overlap == 0:
        return 0.0
    # Reward full-query coverage; lightly penalise very large token sets so
    # a short, precise icon name outranks a long one with the same overlap.
    return overlap / len(query_tokens) - 0.01 * len(row_tokens)


def rank_query(query: str, rows: list, args) -> list:
    """Score every row against one query term and return the ranked (unsorted,
    unlimited) result dicts, applying --theme/--variation/--format filters.
    Shared by single- and multi-term search so both go through identical
    scoring logic."""
    query_tokens = tokenize(query)
    results = []
    for row in rows:
        if args.theme and row["theme"] != args.theme:
            continue
        s = score(query_tokens, row["tokens"])
        if s <= 0:
            continue
        variations = row["variations"]
        if args.variation:
            variations = {k: v for k, v in variations.items() if k == args.variation}
        if args.format:
            variations = {
                k: {f: p for f, p in fmts.items() if f == args.format}
                for k, fmts in variations.items()
            }
            variations = {k: v for k, v in variations.items() if v}
        if not variations:
            continue
        enriched = {
            variation: {
                fmt: {"path": rel, "url": asset_url(rel), "cdn_url": cdn_url(rel)}
                for fmt, rel in fmts.items()
            }
            for variation, fmts in variations.items()
        }
        results.append(
            {
                "theme": row["theme"],
                "name": row["name"],
                "variant": row["variant"],
                "score": round(s, 3),
                "matched_keywords": sorted(query_tokens & tokenize(" ".join(row["keywords"]))),
                "paths": enriched,
            }
        )
    return results


def merge_query_results(queries: list, rows: list, args) -> list:
    """Rank each term separately, then merge into one list: dedupe by
    (theme, name) keeping the row with the MAX score across terms, and record
    which term(s) produced each surviving row under `matched_query` (a string
    when only one term hit, a list when several did). Sorting/limiting is left
    to the caller so it matches the single-term path exactly."""
    merged: dict = {}
    for term in queries:
        for row_result in rank_query(term, rows, args):
            key = (row_result["theme"], row_result["name"])
            entry = merged.get(key)
            if entry is None:
                merged[key] = {"result": row_result, "terms": set()}
            elif row_result["score"] > entry["result"]["score"]:
                entry["result"] = row_result
            merged[key]["terms"].add(term)
    results = []
    for entry in merged.values():
        terms = sorted(entry["terms"])
        entry["result"]["matched_query"] = terms[0] if len(terms) == 1 else terms
        results.append(entry["result"])
    return results


def combined_query_label(queries: list) -> str:
    """Title-friendly label for a (possibly multi-term) query: quote the lone
    term, join short multi-term queries with '+', or collapse long ones to
    the first term plus a count."""
    if len(queries) == 1:
        return f'"{queries[0]}"'
    joined = " + ".join(f'"{q}"' for q in queries)
    if len(joined) <= 60:
        return joined
    return f'"{queries[0]}" + {len(queries) - 1} more'


def display_variation(variations: dict) -> str:
    """Pick the neutral display variation for a candidate card: black if the
    icon has it, otherwise the first variation it does have."""
    for name in VARIATION_ORDER:
        if name in variations:
            return name
    return next(iter(variations))


def swatch_for(variation: str) -> str:
    """White icons are invisible on white — give them the dark
    swatch; everything else sits on the light one."""
    return "dark" if variation.startswith("white") else "light"


def extract_svg(text: str) -> str | None:
    """Return just the <svg>...</svg> element (no XML prolog/doctype), or None."""
    match = re.search(r"<svg\b.*</svg>", text, re.DOTALL)
    return match.group(0) if match else None


def card_media(fmts: dict, embed: str, label: str, fallbacks: list, local_root=None) -> str:
    """Build the media HTML for one card. fmts maps format -> brand-repo-
    relative path. In cdn mode (default) an <img> points at the icon's SVG on
    cdn.jsdelivr.net — nothing fetched or downloaded. In inline mode the SVG
    text is fetched (cached) and inlined; on failure the card falls back to a
    URL embed and the failure is recorded in `fallbacks`. In url mode an <img>
    points at the public raw-GitHub PNG."""
    if embed == "cdn":
        rel = fmts.get("svg") or fmts.get("png")
        if rel:
            return f'<img src="{html.escape(cdn_url(rel), quote=True)}" alt="{html.escape(label, quote=True)}">'
    if embed == "inline" and "svg" in fmts:
        try:
            local = fetch_asset(fmts["svg"], local_root=local_root)
            svg = extract_svg(local.read_text())
            if svg:
                return svg
            fallbacks.append({"item": label, "fallback": "url", "reason": "no <svg> element found"})
        except (OSError, RuntimeError) as exc:
            fallbacks.append({"item": label, "fallback": "url", "reason": str(exc)})
    # URL embed: PNG renders on the broadest set of surfaces.
    rel = fmts.get("png") or fmts.get("svg")
    return f'<img src="{html.escape(asset_url(rel), quote=True)}" alt="{html.escape(label, quote=True)}">'


def make_widget_card(number, name, meta, swatch, media, prompt, recommended=False) -> str:
    """One clickable chat-widget card. `prompt` is the message sendPrompt()
    posts back to chat on click; it is escaped for both the JS string literal
    and the HTML attribute."""
    js = prompt.replace("\\", "\\\\").replace("'", "\\'")
    return WIDGET_CARD.substitute(
        extra=" lfic-r" if recommended else "",
        tag='<span class="lfic-rt">recommended</span>' if recommended else "",
        # quote=False: the attribute is double-quoted, so the single quotes
        # wrapping the JS string literal don't need HTML-entity-escaping —
        # only "&"/"<"/">" do. Every byte counts in a chat-widget fragment.
        onclick=html.escape(f"sendPrompt('{js}')", quote=False),
        number=number,
        swatch=swatch[0],  # "light" -> lfic-l, "dark" -> lfic-d
        media=media,
        name=html.escape(name),
        meta=html.escape(meta),
    )


def write_widget(out_path: str, cards: list) -> str:
    fragment = WIDGET_CSS + '\n<div class="lfic">' + "".join(cards) + "</div>\n"
    out = Path(out_path).expanduser()
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(fragment)
    return str(out)


def make_card(number, name, meta, swatch, media, recommended=False) -> str:
    return CARD_TEMPLATE.substitute(
        extra=" recommended" if recommended else "",
        tag='<span class="rec-tag">recommended</span>' if recommended else "",
        number=number,
        swatch=swatch,
        media=media,
        name=html.escape(name),
        meta=html.escape(meta),
    )


def write_gallery(out_path: str, title: str, subtitle: str, cards: list, hint: str) -> str:
    template = string.Template(GALLERY_TEMPLATE_PATH.read_text())
    document = template.substitute(
        title=html.escape(title),
        subtitle=html.escape(subtitle),
        cards="\n".join(cards),
        hint=html.escape(hint),
    )
    out = Path(out_path).expanduser()
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(document)
    return str(out)


def lookup_icon(manifest: dict, spec: str):
    """Exact 'theme/Icon Name' lookup (case-insensitive fallback). Returns
    (theme, name, variants) or exits with near-misses listed."""
    themes = manifest.get("themes", {})
    theme, _, name = spec.partition("/")
    icons = themes.get(theme, {})
    if name in icons:
        return theme, name, icons[name]
    for candidate_theme, candidate_icons in themes.items():
        for candidate_name in candidate_icons:
            if (
                candidate_theme.lower() == theme.lower()
                and candidate_name.lower() == name.lower()
            ):
                return candidate_theme, candidate_name, candidate_icons[candidate_name]
    all_ids = [f"{t}/{n}" for t, icons in themes.items() for n in icons]
    close = difflib.get_close_matches(spec, all_ids, n=5, cutoff=0.4)
    hint = f" Did you mean: {', '.join(close)}?" if close else ""
    sys.exit(f'Icon not found: "{spec}". Expected "theme/Icon Name".{hint}')


def enrich(variations: dict) -> dict:
    """Add raw and CDN URLs alongside brand-repo-relative paths."""
    return {
        variation: {
            fmt: {"path": rel, "url": asset_url(rel), "cdn_url": cdn_url(rel)}
            for fmt, rel in fmts.items()
        }
        for variation, fmts in variations.items()
    }


def resolve_embeds(args) -> tuple:
    """Per-output --embed default: 'inline' for galleries (self-contained —
    renders under a CSP that blocks all external images, e.g. an in-app file
    preview panel) and 'cdn' for widgets (the chat-widget CSP allowlists
    cdn.jsdelivr.net, so nothing needs fetching). An explicit --embed
    overrides both defaults and applies to whichever output is written."""
    gallery_embed = args.embed or "inline"
    widget_embed = args.embed or "cdn"
    return gallery_embed, widget_embed


def report_embed(output: dict, args, gallery_embed: str, widget_embed: str) -> None:
    """Record which embed mode each written output used. A single 'embed' key
    when both outputs (or the only output) share one mode — keeps the common
    case backward-compatible with callers reading output['embed']; separate
    'embed_gallery'/'embed_widget' keys when a combined run's per-output
    defaults diverge."""
    if args.gallery and args.widget:
        if gallery_embed == widget_embed:
            output["embed"] = gallery_embed
        else:
            output["embed_gallery"] = gallery_embed
            output["embed_widget"] = widget_embed
    elif args.gallery:
        output["embed"] = gallery_embed
    elif args.widget:
        output["embed"] = widget_embed


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "query",
        nargs="*",
        help="Natural-language description of the icon you want. Pass several "
        "terms in one run (e.g. \"work in progress\" \"construction\" "
        "\"checklist\") to merge their results into one ranked, deduped list "
        "instead of running separate searches and combining files by hand.",
    )
    parser.add_argument(
        "--icon",
        metavar='"theme/Icon Name"',
        help="Exact lookup of one icon by theme/name instead of a search query. "
        "Alone: print its full JSON entry. With --gallery: write a variations "
        "gallery (one card per available colour variation).",
    )
    parser.add_argument(
        "--gallery",
        metavar="OUT.html",
        help="Write a premade HTML gallery (filled from gallery_template.html): "
        "candidate cards for a query, variation cards with --icon.",
    )
    parser.add_argument(
        "--widget",
        metavar="OUT.html",
        help="Write a compact chat-widget HTML fragment (no doctype/head/body): "
        "inline-SVG cards, clickable via the surface's global sendPrompt(). "
        "Candidates for a query, variations with --icon. Paste verbatim into an "
        "inline-widget surface; combinable with --gallery.",
    )
    parser.add_argument(
        "--recommend",
        metavar='"variation"',
        help="With --icon --gallery/--widget: mark this colour variation's card "
        "as recommended.",
    )
    parser.add_argument(
        "--embed",
        choices=["url", "inline", "cdn"],
        default=None,
        help="Gallery/widget embedding. Default is per-output: galleries "
        "default to 'inline' (each SVG's text is fetched, cached, and "
        "inlined — self-contained HTML that renders even where a CSP blocks "
        "ALL external images, e.g. an in-app file-preview panel); widgets "
        "default to 'cdn' (an <img> pointed at the icon's SVG on "
        "cdn.jsdelivr.net, jsDelivr's mirror of the public brand repo — "
        "nothing fetched or downloaded, on the chat-widget CSP allowlist). "
        "Passing --embed explicitly overrides both defaults and applies to "
        "whichever of --gallery/--widget are given. 'url' points <img> at the "
        "public raw-GitHub PNG (nothing downloaded), for files opened in a "
        "real browser. A per-card inline failure falls back to url and is "
        "reported under embed_fallbacks.",
    )
    parser.add_argument("--theme", help="Restrict to one theme (e.g. shopping, banking)")
    parser.add_argument(
        "--variation",
        choices=["black", "white"],
        help="Only include this colour variation in the result paths",
    )
    parser.add_argument("--format", choices=["svg", "png"], help="Only include this format")
    parser.add_argument("--limit", type=int, default=5, help="Max results (default 5)")
    parser.add_argument(
        "--fetch",
        action="store_true",
        help="Download the top result's asset and add its local path to the output.",
    )
    parser.add_argument(
        "--local-root",
        help="Debug: read assets from a local clone of the brand repo instead of "
        "downloading (the dir containing assets/).",
    )
    args = parser.parse_args()

    if args.query and args.icon:
        parser.error("give a search query or --icon, not both")
    if not args.query and not args.icon:
        parser.error("give a search query or --icon")
    if args.recommend and not (args.icon and (args.gallery or args.widget)):
        parser.error("--recommend only applies with --icon --gallery/--widget")

    manifest = load_json(MANIFEST_PATH)

    if args.icon:
        run_icon_mode(args, manifest)
        return

    keywords = load_json(KEYWORDS_PATH)
    keywords.pop("_comment", None)
    rows = build_index(manifest, keywords)

    queries = args.query
    multi = len(queries) > 1
    if multi:
        results = merge_query_results(queries, rows, args)
    else:
        results = rank_query(queries[0], rows, args)

    results.sort(key=lambda r: r["score"], reverse=True)
    results = results[: args.limit]

    if args.fetch and results:
        rel = _first_path(results[0])
        if rel is None:
            print("No asset path to fetch for the top result.", file=sys.stderr)
        else:
            local = fetch_asset(rel, local_root=args.local_root)
            results[0]["fetched"] = str(local)
            print(f"Fetched top result -> {local}", file=sys.stderr)

    if args.gallery is None and args.widget is None:
        # Multi-term runs always wrap in an object (matches the gallery-case
        # shape) so a merged, deduped result set is never mistaken for a
        # plain single-query array. Single-query stays a bare array —
        # unchanged shape for backward compatibility.
        if multi:
            print(json.dumps({"results": results}, indent=2))
        else:
            print(json.dumps(results, indent=2))
        return

    # Candidates gallery and/or widget: one card per ranked result, numbered in
    # rank order, each shown in one neutral display variation. Each output
    # resolves its own --embed default (gallery: inline, widget: cdn) unless
    # the caller passed --embed explicitly.
    gallery_embed, widget_embed = resolve_embeds(args)
    fallbacks: list = []
    gallery_cards: list = []
    widget_cards: list = []
    for rank, result in enumerate(results, start=1):
        # Recover format->path maps from the result's enriched paths, so any
        # --variation/--format filters carry through to the gallery.
        raw = {
            variation: {fmt: entry["path"] for fmt, entry in fmts.items()}
            for variation, fmts in result["paths"].items()
        }
        variation = display_variation(raw)
        meta = result["theme"]
        if result["variant"] != "default":
            meta += f" · {result['variant']}"
        swatch = swatch_for(variation)
        if args.gallery:
            gallery_cards.append(
                make_card(
                    number=rank,
                    name=result["name"],
                    meta=meta,
                    swatch=swatch,
                    media=card_media(
                        raw[variation], gallery_embed, result["name"], fallbacks, args.local_root
                    ),
                )
            )
        if args.widget:
            widget_cards.append(
                make_widget_card(
                    number=rank,
                    name=result["name"],
                    meta=meta,
                    swatch=swatch,
                    media=card_media(
                        raw[variation], widget_embed, result["name"], fallbacks, args.local_root
                    ),
                    prompt=f"Use icon: {result['theme']}/{result['name']}",
                )
            )
    output = {"results": results}
    if args.gallery:
        output["gallery"] = write_gallery(
            args.gallery,
            title=f"Icons matching {combined_query_label(queries)}",
            subtitle=f"{len(results)} candidate{'s' if len(results) != 1 else ''} "
            "from the Leaf icon library",
            cards=gallery_cards,
            hint="Reply with a number to choose an icon.",
        )
    if args.widget:
        output["widget"] = write_widget(args.widget, widget_cards)
    report_embed(output, args, gallery_embed, widget_embed)
    if fallbacks:
        output["embed_fallbacks"] = fallbacks
    print(json.dumps(output, indent=2))


def run_icon_mode(args, manifest: dict) -> None:
    """--icon 'theme/Icon Name': exact lookup; optionally a variations gallery."""
    theme, name, variants = lookup_icon(manifest, args.icon)
    output = {
        "theme": theme,
        "name": name,
        "variants": {variant: enrich(variations) for variant, variations in variants.items()},
    }

    if args.gallery or args.widget:
        recommend = args.recommend.strip().lower() if args.recommend else None
        available = {v for variations in variants.values() for v in variations}
        if recommend and recommend not in available:
            print(
                f'Note: --recommend "{args.recommend}" is not an available '
                f"variation of {theme}/{name} ({', '.join(sorted(available))}); "
                "no card marked.",
                file=sys.stderr,
            )
        gallery_embed, widget_embed = resolve_embeds(args)
        fallbacks: list = []
        gallery_cards: list = []
        widget_cards: list = []
        number = 0
        for variant, variations in variants.items():
            for variation in sorted(variations, key=_variation_sort_key):
                number += 1
                meta = variant if variant != "default" else theme
                swatch = swatch_for(variation)
                recommended = variation == recommend
                if args.gallery:
                    gallery_cards.append(
                        make_card(
                            number=number,
                            name=variation,
                            meta=meta,
                            swatch=swatch,
                            media=card_media(
                                variations[variation],
                                gallery_embed,
                                f"{name} — {variation}",
                                fallbacks,
                                args.local_root,
                            ),
                            recommended=recommended,
                        )
                    )
                if args.widget:
                    widget_cards.append(
                        make_widget_card(
                            number=number,
                            name=variation,
                            meta=meta,
                            swatch=swatch,
                            media=card_media(
                                variations[variation],
                                widget_embed,
                                f"{name} — {variation}",
                                fallbacks,
                                args.local_root,
                            ),
                            prompt=f"Use variation: {variation} of {theme}/{name}",
                            recommended=recommended,
                        )
                    )
        if args.gallery:
            output["gallery"] = write_gallery(
                args.gallery,
                title=f"{name} — colour variations",
                subtitle=f"{theme} theme · white variations shown on a dark swatch",
                cards=gallery_cards,
                hint="Reply with a number (or variation name) to confirm, "
                "or override the recommendation.",
            )
        if args.widget:
            output["widget"] = write_widget(args.widget, widget_cards)
        report_embed(output, args, gallery_embed, widget_embed)
        if recommend in available:
            output["recommended"] = recommend
        if fallbacks:
            output["embed_fallbacks"] = fallbacks

    if args.fetch:
        variations = next(iter(variants.values()))
        variation = args.variation or display_variation(variations)
        fmts = variations.get(variation)
        if not fmts:
            sys.exit(f"{theme}/{name} has no '{variation}' variation to fetch.")
        rel = fmts.get(args.format or "svg") or next(iter(fmts.values()))
        local = fetch_asset(rel, local_root=args.local_root)
        output["fetched"] = str(local)
        print(f"Fetched {variation} -> {local}", file=sys.stderr)

    print(json.dumps(output, indent=2))


def _variation_sort_key(variation: str):
    return (
        VARIATION_ORDER.index(variation) if variation in VARIATION_ORDER else len(VARIATION_ORDER),
        variation,
    )


def _first_path(result: dict) -> str | None:
    """Return the first available brand-repo-relative path in a result's paths."""
    for fmts in result["paths"].values():
        for entry in fmts.values():
            return entry["path"]
    return None


if __name__ == "__main__":
    main()
