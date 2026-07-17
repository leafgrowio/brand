---
name: leaf-design
description: Make any generated visual artifact look and sound like Leaf — HTML artifacts, dashboards, deck slides, landing mockups, reports, social cards, charts (including matplotlib). Ships a self-contained artifact kit (design tokens, base styles, component classes, an embeddable Mona Sans subset) plus a matplotlib kit (static brand fonts with the letterforms frozen in, an rcParams/palette helper) and the brand's hard rules, so output follows the Leaf design system without fetching anything at render time. Use before generating any visual output for Leaf; pairs with find-icon (assets) and the full design spec, system/DESIGN.md in leafgrowio/brand (deep rules).
---

# Leaf design (artifact kit)

You are about to produce something visual for Leaf. Everything you make should look like Leaf (warm Stone grounds, one Coral moment, flat surfaces, Mona Sans letterforms) and sound like Leaf (UK English, sentence case, mechanism before claim, no hype). This skill gives you the kit to do that inside sandboxed artifacts, where **nothing external loads** — no CDN fonts, no remote stylesheets, no hotlinked images. Whatever the artifact needs must travel inside it.

This kit is a downstream build of the Leaf design system (`system/` in the public GitHub repo `leafgrowio/brand`, v1.0.4). The canonical spec is `system/DESIGN.md` in that repo; inside the Leaf plugin the same document is mirrored as the **design** slice of the `leaf-context` skill (at `brand/files/DESIGN.md`).

## The kit (`assets/`)

- **`leaf-artifact.html`** — the starter. A complete, self-contained page: all `--leaf-*` tokens, base element styles, and distilled component classes (`.leaf-btn`, `.leaf-card`, `.leaf-block`, `.leaf-table`, `.leaf-badge--*`, `.leaf-alert--*`, KPI classes). Start new artifacts from it and replace the placeholder content; don't restyle from scratch.
- **`leaf-tokens.css`** — just the token block, for when you're adding Leaf styling to an existing artifact rather than starting fresh. Paste it into the `<style>` and reference only `var(--leaf-*)` from then on.
- **`leaf-fonts-inline.css`** — Mona Sans as an embeddable `@font-face` (latin subset, variable weight 200–900, the five brand stylistic sets intact; ~60KB base64). Replace the `/* FONT: ... */` comment in the template with this file's contents.
- **`MonaSans-subset.woff2`** — the raw subset behind that CSS (SIL OFL; licence travels with the brand repo). Rebuild both with `brand/tools/subset_fonts.py` in Leaf's internal `leaf` plugin repo when the brand repo's font changes.
- **`LeafSans-{Regular,Medium,SemiBold,Bold}.ttf`** — static cuts of Mona Sans (SIL OFL; copyright and licence records kept inside each file) for renderers that can't use variable fonts or apply OpenType features (matplotlib above all), with the brand stylistic sets and tabular figures frozen into the glyphs, plus ▲/▼ delta glyphs drawn in as original Leaf geometry (absent from Mona Sans; sized to the tabular figures so delta columns align). The family registers as "Leaf Sans" (the OFL reserves "Mona" for unmodified builds, and the distinct name stops a stock Mona Sans shadowing it). Built by the same `subset_fonts.py`.
- **`leaf_matplotlib.py`** — the matplotlib kit: registers those statics, applies the Leaf rcParams (grounds, grid, spines, series cycle, type), and exposes the palette plus the number-rule formatters (`currency()`, `fmt_ratio()`, `fmt_delta()`, …). One call: `leaf.use()`.

**When to embed the font:** whenever type is prominent — decks, heroes, landing mockups, dashboards, anything a human is meant to *look at*. Skip it only for dense utilitarian output (a long data table, a quick throwaway diff view); the template's fallback stack degrades gracefully. Never load Mona Sans from Google Fonts anywhere: their build strips the stylistic sets that make the letterforms Leaf's.

## Hard rules (never break)

- **One solid-Coral moment per view** — the primary button, the active nav item, or the focus chart series. Never two. Emphasis fills use the Coral tint (`.leaf-block`) with Ink text; solid Coral is for CTAs and small marks only.
- **Copy colour:** text is Ink, Coral, Warm Grey, or Aqua-on-dark only. Secondary palette colours are fills, never text; every colour fill takes Ink text; Canvas text only on dark anchors (white-on-Coral is large-text only).
- **Status never wears Coral.** Success/warning/error/info use the state palette (`.leaf-badge--*`, `.leaf-alert--*`); destructive actions are Ember, never Coral.
- **Flat by default:** hairline borders and background tone separate surfaces; the warm shadows are for lifted/transient surfaces only. Never shadow + heavy border together.
- **Numbers:** `£1.49M` (abbreviate ≥1M) · ratios 2 dp with lowercase x (`3.72x`) · percentages 1 dp (`24.6%`) · deltas ▲/▼ in Fern/Ember (never colour alone) · dates `1 Jun 2026` · tabular figures right-aligned · missing data is an em-dash, never blank or 0.
- **Voice:** UK English, sentence case everywhere, verb-first button labels ("Create report", never "Submit"), em dashes, no exclamation marks, no emojis. Signal, Answers, Watcher, Leaf Schema capitalised. Never fabricate metrics or client claims in sample content.
- **Accessibility:** never colour as the only cue; visible focus ring (the kit sets it); body text contrast ≥ 4.5:1 (the copy-colour rule guarantees it — don't invent new text/background pairs).

## Charts

Read `references/chart-recipes.md` before drawing any chart in HTML/SVG. For charts generated in Python, read `references/matplotlib.md` and use the kit's `leaf_matplotlib.py` — never point matplotlib at stock Mona Sans (it can't apply the stylistic sets; the shipped "Leaf Sans" statics have them frozen in). The load-bearing rules: categorical series in fixed order (`--leaf-chart-series-1..6` — Coral leads or flags the one series that matters over a graphite set); hairline gridlines (`--leaf-chart-grid`) and a slightly stronger baseline (`--leaf-chart-axis`); axis labels in Warm Grey caption size; direct series labels over legends where space allows; Fern/Ember reserved for good/bad, never as series colours; no 3D, no drop shadows, no gradients outside the defined ramps.

## Icons and logos in artifacts

Resolve assets with the `find-icon` skill (same folder family), then — because artifacts cannot hotlink — **fetch the SVG and inline its markup** into the artifact rather than using an `<img src="https://…">`. Icons are black line-art (white on dark surfaces), never recoloured, never hand-drawn. Category tiles: one black icon centred on one flat secondary-colour field, never Coral, never a photo.

## Outside artifacts

For files that render unsandboxed (local HTML, deployed pages, exported decks), prefer the full design system over this kit: link `system/styles.css` from a clone of `leafgrowio/brand` or copy its token files, self-host Mona Sans from `system/assets/fonts/`, and reference icons by their raw GitHub URLs. This kit exists for the sandbox; the system is richer where the sandbox doesn't apply.

## Deeper rules

For the full spec — logo usage and clear space, imagery and photography rules, overlay and navigation patterns, spacing/radius/elevation detail, the approved text-pairings matrix, and governance — load the **design** slice of `leaf-context` when the Leaf plugin is installed; otherwise read the canonical source directly, `system/DESIGN.md` in `leafgrowio/brand` (fetch it by raw URL or from a local clone). Exceptions route to the Creative team (creative@leaf.fm).
