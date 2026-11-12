# Leaf in Google Slides — the simplified guide

Read this only after the person has confirmed they want Google Slides (see
`slides.md` §1). Google Slides cannot load Leaf's frozen font, set letter
spacing or place an SVG, so a deck there is a stated approximation of the
system, not the system. This page is the mapping; everything it doesn't
mention (owner, no author names, one idea per slide, one piece of Coral type
per slide, the closing slide, the seal, numbers and voice) is `slides.md`
unchanged. Canonical: `system/DESIGN.md` › Decks › Google Slides, simplified.

*Written 12 Nov 2026 from the Slides scale. Not yet proven on a real Google
Slides deck: when the first one shows a gap, fix this page.*

## What changes, and what is lost

| Leaf system (Claude Slides) | In Google Slides | Lost |
| --- | --- | --- |
| Frozen `MonaSans-Leaf.ttf` | Stock **Mona Sans** from Google Fonts (Font menu › More fonts). If it isn't offered, **Arial** | The brand letterforms: tailed `l`, double-storey `a` and `g`, `G`, `Q` |
| Positive title tracking (+2px at 128) | None. Leave letter spacing alone | Tracking |
| `slide-figure` at 640 (600 in Slides) | SemiBold (600) | Nothing visible |
| 1920×1080 px canvas | The default 16:9 page, 720×405 pt (10 × 5.625 in) | Nothing: multiply px by 0.375 |
| Black SVG logos and icons, inlined | The black **PNG** exports of the same files, from `find-icon` | Vector sharpness at extreme zoom |
| Hairline `rgba(23,20,18,0.1)` | 1px solid `#E8E6E4` (the same hairline flattened on Canvas) | Nothing visible |
| Design system installed in the deck | Nothing to install. Type the values on this page | Theme and Text style menus |
| `scripts/lint_deck.py` | Does not apply. Walk the checklist at the foot of this page | The automatic check |

Never use Leaf Sans here. It is the static cut for matplotlib, it isn't on
Google Fonts, and anyone opening the deck without it installed sees a
substitute.

## Type

Mona Sans throughout, four weights only: Regular 400, Medium 500, SemiBold
600, Bold 700. Sizes are the Slides scale × 0.375, rounded to a size Google
Slides sets cleanly. Line spacing goes in Format › Line & paragraph spacing ›
Custom spacing.

| Style | Claude Slides | Google Slides | Weight | Line spacing | Use |
| --- | --- | --- | --- | --- | --- |
| `slide-display` | 128px | 48pt | Bold | 0.96 | Cover and seal title; the one statement carrying a slide |
| `slide-h1` | 92px | 34pt | Bold | 1.0 | Divider titles, the closing ask |
| `slide-h2` | 64px | 24pt | Bold | 1.05 | The slide title, at the top margin |
| `slide-h3` | 44px | 16pt | SemiBold | 1.2 | Card, column or block title |
| `slide-figure` | 128px | 48pt | SemiBold | 0.96 | A metric's number |
| `slide-body-lg` | 36px | 14pt | Regular | 1.55 | Lead paragraph, cover subtitle |
| `slide-body` | 32px | 12pt | Regular | 1.6 | Body copy, list items, table cells |
| `slide-label` | 28px | 11pt | Medium | 1.4 | Eyebrows, table headers, axis labels |
| `slide-caption` | 26px | 10pt | Medium | 1.4 | Footer row, sources, notes |

Nothing under 10pt. Emphasis inside text is weight, never a new size.

## Colour

The same hex values as `slides.md` §3, typed into the custom colour box: ground
Light Stone `#F9F4F1` on every slide (set it on the theme's background so new
slides inherit it), cards Canvas `#FFFDFB`, quieter tone Stone `#F2E8E1`,
zebra `#FBF7F4`, emphasis Coral tint `#FBE4DF`, text Ink `#171412` and Warm
Grey `#656565`, Coral `#FB5E48` for the eyebrow or one title phrase. Category
fills and chart colours as in `slides.md`. Never the Google Slides default
theme colours, pure white or pure black.

## Geometry

| Element | Claude Slides | Google Slides |
| --- | --- | --- |
| Margins, all sides | 128px | 48pt (0.67 in) |
| Footer label | `left:128px; bottom:64px` | 48pt from the left, its baseline row 24pt above the bottom edge |
| Content area above the footer | 824px tall | 309pt tall |
| Watermark (Leaf Icon – Black) | 26×26px, right margin, 60% opacity | 10×10pt, right margin on the footer row, transparency 40% in Format options › Adjustments |
| Cover and seal logo | 64px tall or 320px wide, whichever is smaller | 24pt tall or 120pt wide, whichever is smaller. Leaf 79×24pt; Signal 120×21; Stores and Strategy 120×18; Creative 120×16; Answers 120×15.5; Performance 120×13 |
| Card | 18px radius, 40–48px padding | Rounded rectangle with the corner handle at about 7pt, 15–18pt inset, 1px `#E8E6E4` border, no shadow |
| Gap between cards | 32px | 12pt |
| Step disc | 72px, Coral tint | 27pt circle, Coral tint, the number in Ink 12pt SemiBold |

Turn off every shape's default shadow and outline colour. Use Arrange › Align
and Distribute rather than placing by eye, and keep the footer label and
watermark in the same position on every slide by putting them on the layout
(Slide › Edit theme), not on each slide.

## Marks, charts and tables

- **Logos and icons:** resolve with `find-icon`, ask for the black no-padding
  **PNG**, and insert it as an image. Never recolour, crop or redraw.
- **Charts:** build with the matplotlib kit (`matplotlib.md`) and insert the
  PNG, exported at 2× the size it will sit at. A linked Sheets chart takes
  Google's palette and type, so use one only when the person needs it live,
  and restyle it to the chart colours in `slides.md` §3.
- **Tables:** real data only. Header row Stone `#F2E8E1` with Medium labels,
  body Ink 12pt, zebra `#FBF7F4` on even rows, 1px `#E8E6E4` borders. Cells
  can take fills here, unlike Claude Slides.

## Building it

Load the `google-workspace` skill before the first Google Slides or Drive
call. Ask whether Leaf's Google Slides template should be the starting point;
if the person gives its link, copy it and bring the copy to this page's
values rather than starting from a blank deck. Write placeholders as `[__]`
and list them, as in any deck.

## Before it ships

- [ ] The person confirmed Google Slides, and knows the letterforms differ.
- [ ] Mona Sans (or Arial) on every text box; four weights only; nothing
      under 10pt; no letter spacing set.
- [ ] Light Stone ground on every slide; only the values above.
- [ ] Cover: one black owner logo at the size cap, "Leaf Confidential", no
      author. Footer label and numbered slides; watermark at 40%
      transparency; Pura Vida seal last with the black Leaf logo.
- [ ] One piece of Coral type per slide; no shadows; no default theme colours.
- [ ] Deliver as a PDF (File › Download › PDF document) unless the client is
      meant to edit the deck. Speaker notes travel with a shared link.
