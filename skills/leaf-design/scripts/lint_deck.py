#!/usr/bin/env python3
"""Lint a Claude Slides deck against the Leaf deck rulebook (references/slides.md).

Reads the deck's own files (project/deck.json and project/slides/*.html). It does
not render, open or fetch anything, so it is safe to run on every deck.

Usage:
    python3 lint_deck.py <deck root>     # the folder that holds project/
    python3 lint_deck.py <deck root> --strict   # warnings fail too

Exit code 0 when there are no errors, 1 when there are, 2 on a bad path.
Errors are rule breaks; warnings are things to look at before sharing.
Standard library only.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

# --- the values slides.md allows -------------------------------------------

GROUND = "#f9f4f1"
SLIDE_COLOURS = {
    "#f9f4f1", "#fffdfb", "#f2e8e1", "#fbf7f4", "#fbe4df",  # grounds, tint
    "#d8cff0", "#dce8c4", "#f6e49d", "#9fc7bc",              # secondary fills
    "#171412", "#656565", "#fb5e48",                         # text
}
CHART_COLOURS = {
    "#fb5e48", "#4fa3a6", "#efb75a", "#aaa2d4", "#8ebb91", "#f4a38f",  # series
    "#fbe4df", "#f7a08f", "#c0392a",                         # Coral ramp
    "#ddecec", "#9fc7bc", "#2e8388",                         # Harbor ramp
    "#fcf0de", "#f5d39a", "#ba8f46",                         # Marigold ramp
    "#c9c2bb", "#8c857e", "#3f3a36",                         # graphite mono
    "#efeae6",                                               # heatmap midpoint
    "#2f8b57", "#c63a2b", "#e7f1ea", "#f7e0db",              # Fern, Ember
}
ALLOWED = SLIDE_COLOURS | CHART_COLOURS
CORAL = "#fb5e48"
SCALE = {128, 92, 64, 44, 36, 32, 28, 26}
FLOOR = 26
WORKING_NOTE = re.compile(
    r"\b(internal|before sharing|before showing|before presenting|check with|"
    r"confirm with|unsent|not yet sent|do not share|don't share|todo|tbc)\b",
    re.I,
)


def norm_hex(value: str) -> str:
    value = value.lower()
    if len(value) == 4:  # #abc
        value = "#" + "".join(ch * 2 for ch in value[1:])
    return value


def colours_in(text: str) -> list[str]:
    found = [norm_hex(h) for h in re.findall(r"#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b", text)]
    for r, g, b in re.findall(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)", text):
        found.append("#%02x%02x%02x" % (int(r), int(g), int(b)))
    return found


def strip_tags(html: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html)).strip()


class Report:
    def __init__(self) -> None:
        self.items: list[tuple[str, str, str]] = []

    def error(self, where: str, msg: str) -> None:
        self.items.append(("error", where, msg))

    def warn(self, where: str, msg: str) -> None:
        self.items.append(("warning", where, msg))

    def count(self, level: str) -> int:
        return sum(1 for lvl, _, _ in self.items if lvl == level)


def find_project(root: Path) -> Path | None:
    for candidate in (root / "project", root, root.parent):
        if (candidate / "deck.json").is_file():
            return candidate
    return None


def lint_index(index: dict, rep: Report) -> None:
    faces = index.get("faces") or {}
    mona = faces.get("mona-sans")
    if not mona:
        rep.error("deck", "no `mona-sans` face: the deck is not set in Leaf's Mona Sans")
    else:
        src = mona.get("src", "")
        if mona.get("href") or "MonaSans-Leaf" not in src or not src.startswith("project/ds/"):
            rep.error(
                "deck",
                "Mona Sans is not the design system's installed MonaSans-Leaf.ttf "
                "(a Google Fonts link or one-off upload loses the brand letterforms)",
            )
    systems = index.get("designSystems") or []
    if isinstance(systems, dict):
        systems = list(systems.values())
    if not any("leaf" in str(s.get("title", "")).lower() for s in systems if isinstance(s, dict)):
        rep.error("deck", "the Leaf design system is not installed in this deck")
    if not str(index.get("title", "")).strip() or index.get("title") == "Untitled":
        rep.warn("deck", "the deck has no title")


def lint_slide(sid: str, number: int, total: int, html: str, title: str, rep: Report) -> None:
    where = f"{number:02d} {sid}"
    is_cover = number == 1
    is_seal = number == total
    notes = " ".join(re.findall(r"<aside>(.*?)</aside>", html, flags=re.S))
    body = re.sub(r"<aside>.*?</aside>", "", html, flags=re.S)
    section = re.search(r"<section[^>]*>", body)
    if not section:
        rep.error(where, "no <section> element")
        return
    sec = section.group(0).lower().replace(" ", "")

    # ground and face
    if f"background:{GROUND}" not in sec:
        rep.error(where, "the slide ground is not Light Stone #f9f4f1")
    if "mona sans" not in body.lower():
        rep.error(where, "Mona Sans is not named on this slide")

    # format the Slides type drops or ignores
    if re.search(r"var\(", body):
        rep.error(where, "var() is not accepted in a slide: write the hex")
    if re.search(r"\sclass=", body):
        rep.error(where, "class= is ignored in a slide: every style is inline")
    if re.search(r"[\d.](em|rem)\b", body):
        rep.error(where, "em/rem lengths are not accepted: write px")
    if re.search(r"<svg[^>]*>.*?<text\b", body, flags=re.S):
        rep.error(where, "text inside an <svg> never takes Mona Sans: set chart labels as <p> over the graphic")
    if re.search(r"margin[a-z-]*:\s*(?!0(px)?\s*[;\"])", body):
        rep.warn(where, "margin is ignored by the slide format: use gap or padding")
    if len(re.findall(r"<(?!/)[a-zA-Z]", body)) > 200:
        rep.error(where, "more than 200 elements on the slide: split it")

    # type
    sizes = [float(x) for x in re.findall(r"font-size:\s*([\d.]+)px", body)]
    small = sorted({int(s) for s in sizes if s < FLOOR})
    if small:
        rep.error(where, f"type under the 26px floor: {small}")
    off = sorted({int(s) for s in sizes if s >= FLOOR and int(s) not in SCALE})
    if off:
        rep.warn(where, f"sizes off the slide scale: {off} (scale is 128, 92, 64, 44, 36, 32, 28, 26)")
    weights = {int(w) for w in re.findall(r"font-weight:\s*(\d+)", body)}
    bad_w = sorted(w for w in weights if w % 100)
    if bad_w:
        rep.error(where, f"weights must be whole hundreds: {bad_w}")
    for tag, style in re.findall(r"<(h1|h2)\b[^>]*style=\"([^\"]*)\"", body):
        size = re.search(r"font-size:\s*([\d.]+)px", style)
        if size and float(size.group(1)) >= 64:
            if not re.search(r"letter-spacing:\s*[\d.]+px", style):
                rep.warn(where, f"<{tag}> title has no px tracking (+2px at 128, +1.44px at 92, +1px at 64)")
            if "font-weight:700" not in style.replace(" ", ""):
                rep.warn(where, f"<{tag}> title is not weight 700")

    # colour
    bad = set()
    for colour in colours_in(body):
        base = colour[:7]
        if base not in ALLOWED:
            bad.add(colour)
    if bad:
        rep.error(where, f"colours outside the slide and chart palettes: {sorted(bad)}")
    coral_type = 0
    for style in re.findall(r"<(?:p|h1|h2|h3|span|li)\b[^>]*style=\"([^\"]*)\"", body):
        if re.search(r"(?<![a-z-])color:\s*#fb5e48", style, flags=re.I):
            coral_type += 1
    if coral_type > 1:
        rep.error(where, f"{coral_type} pieces of Coral type: one per slide (the eyebrow, or one title phrase)")

    # chrome
    footer = None
    for style, text in re.findall(r"<p\b[^>]*style=\"([^\"]*)\"[^>]*>(.*?)</p>", body, flags=re.S):
        compact = style.replace(" ", "")
        if "position:absolute" in compact and "bottom:64px" in compact:
            footer = strip_tags(text)
    if footer is None:
        rep.error(where, "no footer label pinned at bottom:64px")
    elif is_cover:
        if "leaf confidential" not in footer.lower():
            rep.warn(where, "the cover footer is not \"Leaf Confidential\" (drop it only for a public deck)")
    else:
        match = re.search(r"·\s*(\d{2})\s*$", footer)
        if not match:
            rep.error(where, f"footer has no two-digit slide number: \"{footer}\"")
        elif int(match.group(1)) != number:
            rep.error(where, f"footer says {match.group(1)}, the slide is {number:02d}: renumber")
        if title and title.lower() not in footer.lower():
            rep.warn(where, "footer does not carry the deck title")

    marks = []
    for tag in re.findall(r"<svg\b[^>]*>", body):
        compact = tag.replace(" ", "")
        if "width:26px" in compact and "height:26px" in compact:
            marks.append(compact)
    if is_cover or is_seal:
        if marks:
            rep.error(where, "the cover and the seal carry no watermark")
    else:
        if not marks:
            rep.error(where, "no Leaf icon watermark (26px, bottom right, 60% opacity)")
        elif not any("opacity:0.6" in m for m in marks):
            rep.warn(where, "the watermark is not at 60% opacity")

    if is_cover or is_seal:
        logo = re.search(r"<svg\b[^>]*style=\"([^\"]*)\"", body) or re.search(r"<img\b[^>]*style=\"([^\"]*)\"", body)
        if not logo:
            rep.error(where, "no logo pinned top left")
        else:
            w = re.search(r"(?<![a-z-])width:\s*([\d.]+)px", logo.group(1))
            h = re.search(r"(?<![a-z-])height:\s*([\d.]+)px", logo.group(1))
            if w and float(w.group(1)) > 320:
                rep.error(where, f"logo is {w.group(1)}px wide: the cap is 320px")
            if h and float(h.group(1)) > 64:
                rep.error(where, f"logo is {h.group(1)}px tall: the cap is 64px")
    if is_seal and "pura vida" not in strip_tags(body).lower():
        rep.error(where, "the last slide is not the Pura Vida seal")
    if is_cover and re.search(r"\bdraft\b", strip_tags(body), flags=re.I):
        rep.warn(where, "the cover still says \"Draft\"")

    # tables
    for tag in re.findall(r"<table\b[^>]*>", body):
        low = tag.lower()
        if "font-family" not in low or "font-size" not in low:
            rep.error(where, "<table> must set font-family and font-size itself, or it falls out of Mona Sans")
        if "border-radius" in low:
            rep.warn(where, "rounded corners on a table do not render")

    # notes
    if notes and WORKING_NOTE.search(notes):
        rep.warn(where, "speaker notes hold working notes: anyone who opens the link can read them, so share the PDF")


def main(argv: list[str]) -> int:
    args = [a for a in argv[1:] if not a.startswith("--")]
    strict = "--strict" in argv
    if len(args) != 1:
        print(__doc__)
        return 2
    project = find_project(Path(args[0]).expanduser())
    if project is None:
        print(f"No project/deck.json under {args[0]}", file=sys.stderr)
        return 2
    index = json.loads((project / "deck.json").read_text(encoding="utf-8"))
    order = [s for s in index.get("order", []) if re.fullmatch(r"[A-Za-z0-9_-]{1,64}", str(s))]
    rep = Report()
    lint_index(index, rep)
    title = str(index.get("title", "")).strip()
    missing = []
    for number, sid in enumerate(order, 1):
        path = project / "slides" / f"{sid}.html"
        if not path.is_file():
            missing.append(sid)
            continue
        lint_slide(sid, number, len(order), path.read_text(encoding="utf-8"), title, rep)
    if missing:
        rep.warn("deck", f"slides not on disk, so not checked: {', '.join(missing)}")

    for level, where, msg in rep.items:
        print(f"{level.upper():7s} {where}: {msg}")
    errors, warnings = rep.count("error"), rep.count("warning")
    checked = len(order) - len(missing)
    print(f"\n{checked} of {len(order)} slides checked: {errors} errors, {warnings} warnings")
    return 1 if errors or (strict and warnings) else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
