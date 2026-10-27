---
name: leaf-design
description: "Use before making ANY visual at Leaf: deck, slide, one-pager, poster, social card, dashboard, chart (incl. matplotlib), HTML artifact, mockup, diagram or styled document, even if branding isn't mentioned. Routes to the right surface and carries Leaf's design tokens, artifact kit, matplotlib kit and hard rules."
---

# Leaf design

Everything you make for Leaf should look like Leaf (warm Stone grounds, one
Coral moment, flat surfaces, Mona Sans letterforms) and sound like Leaf (UK
English, sentence case, mechanism before claim, no hype). This skill picks the
surface, then gives you the rules and, for hand-built HTML, the kit.

This kit is a downstream build of the Leaf design system (`system/` in
`leafgrowio/brand`, v2.4). The canonical spec is `system/DESIGN.md` there;
in the Leaf plugin the same document is the **design** slice
of `leaf-context`. Where this skill and the spec disagree, the spec wins.

## Pick the surface

| You're making | Use |
| --- | --- |
| A deck | The **Slides** artifact type. Read `references/slides.md` in full first. |
| A poster, one-pager, mockup, or social graphic where exact pixels don't matter | The **Design** artifact type |
| A dashboard | The **Dashboard** artifact type, with the Leaf tokens (`assets/leaf-tokens.css`) |
| A chart | Python: the matplotlib kit (`references/matplotlib.md`). HTML/SVG: `references/chart-recipes.md`, plus the `dataviz` skill for method |
| A bespoke interactive page, or anything exported at exact pixels (social cards, OG images, favicons, podcast art) | Hand-built HTML from `assets/leaf-artifact.html`, then `render-brand-asset` for the export |

Typed artifacts (Slides, Design, Dashboard) carry the Leaf design system's
fonts and tokens and export their own PDF, image or .pptx. They inherit none of
the kit's guardrails, so every colour you type is unchecked: keep to the hex
values in `references/rules.md`.

## Hard rules

1. **One solid-Coral moment per view** (the primary button, active nav item or
   focus chart series). Emphasis fills are the Coral tint with Ink text.
2. **Light Stone family grounds only** (Light Stone `#F9F4F1`, Canvas `#FFFDFB`,
   Stone `#F2E8E1`). Ink is dark-mode UI only: never an Ink slide, cover, band,
   card or panel.
3. **Text is Ink, Warm Grey, or Coral within its ground limits** (Aqua only on
   dark). Secondary palette colours are fills, never text.
4. **Coral type depends on the ground.** Eyebrows, small uppercase labels and
   links on Canvas, Stone-faint and Light Stone; one Coral phrase in a 46px+
   title (then the eyebrow turns Warm Grey); never on Stone. Table in `rules.md`.
5. **No decorative lines** (accent bars, rules above headings, underlines,
   left-edge stripes). Lines are structural only.
6. **Flat by default.** Hairline borders and tone separate surfaces; never
   shadow plus heavy border.
7. **Tables are for data, not layout.** Categories are labelled rows, steps are a
   numbered sequence.
8. **Status never wears Coral.** State palette for status, Ember for
   destructive actions.
9. **Numbers:** `£1.49M`, `3.72x`, `24.6%`, ▲/▼ in Fern/Ember, `1 Jun 2026`,
   em-dash for missing data.
10. **Voice:** UK English, sentence case, verb-first buttons, no exclamation
    marks, no emojis, never fabricate metrics or client claims.

**Read `references/rules.md`** for brand surfaces (deck, cover, social card,
one-pager, marketing page) before choosing any background or text colour, and
whenever one of these rules leaves you unsure. It has the full Coral/ground
table, the table treatment, the number and voice detail, and accessibility.
For logo clear space, imagery, spacing and governance, load the **design** slice
of `leaf-context` (or `system/DESIGN.md` from `leafgrowio/brand`); read its
**Colour**, **Dark surfaces** and **Ratified exceptions** sections for brand
surfaces. Exceptions route to the Creative team (creative@leaf.fm).

## The kit (`assets/`) for hand-built HTML

Nothing external loads in sandboxed artifacts: no CDN fonts, remote stylesheets
or hotlinked images. Whatever the page needs travels inside it.

- **`leaf-artifact.html`** — the starter: a complete, self-contained page with
  all `--leaf-*` tokens, base styles and component classes (`.leaf-btn`,
  `.leaf-card`, `.leaf-block`, `.leaf-table`, `.leaf-badge--*`,
  `.leaf-alert--*`, KPI classes). Start from it and replace the placeholder
  content. Replace the `<title>` too: it ships as "Untitled — Leaf" and becomes
  the artifact's name on publish.
- **`leaf-tokens.css`** — just the token block, for adding Leaf styling to an
  existing page or a Dashboard artifact. Reference only `var(--leaf-*)`.
- **`leaf-fonts-inline.css`** — Mona Sans as an embeddable `@font-face` (latin
  subset, variable weight 200–900, the five brand stylistic sets intact; ~71KB).
  Replace the `/* FONT: ... */` comment in the starter with its contents.
- **`MonaSans-subset.woff2`** — the raw subset behind that CSS (SIL OFL).
- **`LeafSans-{Regular,Medium,SemiBold,Bold}.ttf`** — static cuts of Mona Sans
  for renderers that can't use variable fonts or OpenType features (matplotlib
  above all), with the stylistic sets and tabular figures frozen in, plus ▲/▼
  delta glyphs. Registers as "Leaf Sans".
- **`leaf_matplotlib.py`** — the matplotlib kit: registers the statics, applies
  the Leaf rcParams and palette, exposes the number formatters. One call:
  `leaf.use()`.

Rebuild the font files with `tools/subset_fonts.py` in the `leafgrowio/brand`
repo (in the Leaf plugin repo it sits at `brand/tools/`) when the brand font
changes.

**Font embedding is only for hand-built HTML** (typed artifacts carry the design
system's fonts). Embed whenever type is prominent: heroes, landing mockups,
dashboards, anything a human is meant to look at. Skip it only for dense
utilitarian output. Never load Mona Sans from Google Fonts: their build strips
the stylistic sets that make the letterforms Leaf's.

## Icons and logos

Resolve assets with the `find-icon` skill, then, because artifacts cannot
hotlink, fetch the SVG and inline its markup. Icons are black line-art (white on
dark surfaces), never recoloured, never hand-drawn. Third-party tool logos come
through `find-icon`; if nothing is found, ask the person to upload the official
file and flag the missing mark; never draw one. Category tiles: one black icon
centred on one flat secondary-colour field, never Coral, never a photo.

## Outside artifacts

For files that render unsandboxed (local HTML, deployed pages), prefer the full
design system: link `system/styles.css` from a clone of `leafgrowio/brand`,
self-host Mona Sans from `system/assets/fonts/`, and reference icons by their
raw GitHub URLs.

## Before you ship

Run `review-brand-asset` on the finished source if the Leaf plugin is installed,
and fix every P0 and P1 first. Without it, walk the hard rules against every
view. Where the rules and the spec disagree, the spec wins; say so.
