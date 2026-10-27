# Leaf design: the hard rules in full

`SKILL.md` carries the ten rules you can't break. This page is the detail
behind them: exact colour pairings, tables, numbers and voice. Read it before
choosing a background or text colour on any brand surface (deck, cover, social
card, one-pager, marketing page), and whenever a one-line rule in `SKILL.md`
leaves you unsure. Where this page and `system/DESIGN.md` (the **design**
slice in the Leaf plugin) disagree, the spec wins; say so, so this page gets
fixed.

## Colour and grounds

- **One solid-Coral moment per view** — the primary button, the active nav
  item, or the focus chart series. Never two. Emphasis fills use the Coral tint
  (`.leaf-block`) with Ink text; solid Coral is for CTAs and small marks only.
- **Grounds: the light Stone family only.** Decks, covers, dividers, quote
  frames, social cards, one-pagers and marketing pages sit on Light Stone
  (`#F9F4F1`, the page), Canvas (`#FFFDFB`, cards) and Stone (`#F2E8E1`, a
  quieter second tone). **Ink is not a brand surface**: it is the dark-mode UI
  surface and nothing else — never an Ink slide, cover, band, card or panel.
  Emphasis comes from the Coral tint (`#FBE4DF`) with Ink text, never a dark
  fill. Aqua and Canvas-on-Ink text belong to dark mode, so they never appear in
  a deck or marketing asset.
- **Copy colour:** text is Ink, Coral (within the limits below), Warm Grey, or
  Aqua-on-dark only. Secondary palette colours are fills, never text; every
  colour fill takes Ink text; Canvas text only on the dark anchors (Ink in
  dark-mode UI, Warm Grey, solid state tones, a solid Coral button label).
- **Coral as text depends on the ground** (ratios from the spec's ratified
  exceptions):

  | Ground | Coral running text (≥24px, or ≥19px bold) | Coral eyebrows, small uppercase labels, inline links | One Coral phrase in a title (the title-emphasis exception) | Otherwise |
  | --- | --- | --- | --- | --- |
  | Canvas `#FFFDFB` (3.04:1) | Yes | Yes | Yes | — |
  | Stone-faint `#FBF7F4` (2.90:1), Light Stone `#F9F4F1` (2.83:1) | No | Yes — the eyebrow exception | Yes | Ink |
  | Stone `#F2E8E1` (2.56:1), Stone-deep, Coral tint | No | No | No | Text in Ink; don't compensate with a decorative Coral line |

  An eyebrow is a wayfinding label above a heading that carries the meaning.
  Anything a reader has to read to understand the slide is not an eyebrow.
  **Title emphasis:** one phrase (under half) of a 700-weight title at 46px+ —
  web `display`/`h1`, `slide-display`/`slide-h1`/`slide-h2` — may be Coral; when
  it is, **that view's eyebrow turns Warm Grey**, so a view never carries more
  than one piece of Coral type. A statement panel wanting Coral emphasis sits on
  Canvas, never Stone.
- **Status never wears Coral.** Success/warning/error/info use the state palette
  (`.leaf-badge--*`, `.leaf-alert--*`); destructive actions are Ember, never
  Coral.

## Lines, depth, consistency

- **No decorative lines.** No accent bars, short rules above headings, underline
  flourishes or left-edge stripes; the Coral eyebrow, type weight and
  background tone carry hierarchy. Lines are structural only: table rules,
  hairline card borders, chart axes and gridlines.
- **Flat by default:** hairline borders and background tone separate surfaces;
  the warm shadows are for lifted/transient surfaces only. Never shadow + heavy
  border together.
- **One system across a multi-page asset.** Every page or slide shares the same
  ground, eyebrow treatment and type scale; a slide that looks like it came from
  another deck is a defect. Vary layout, not the look.

## Tables

Tables are for data, not layout. Use a table only when every column carries its
own figures (a comparison, a matrix, numbers). Categorical content of up to six
items (tiers, stages, options) is labelled rows on slides (`slides.md` §6);
ordered steps are a numbered sequence, never a table with an index column.

Tables take the Answers kit `Table` treatment: Canvas body with a 1px
`rgba(23,20,18,0.1)` border, an Ink header at 600 with a stronger rule beneath,
zebra rows in Stone-faint (`#FBF7F4`), 1px hairlines between rows and none after
the last. The header fill must differ visibly from both the page and the stripe
(on a Light Stone page, use Stone `#F2E8E1`). Size columns to their content —
set widths on every first-row cell — never equal splits.

## Numbers

`£1.49M` (abbreviate ≥1M) · ratios 2 dp with lowercase x (`3.72x`) ·
percentages 1 dp (`24.6%`) · deltas ▲/▼ in Fern/Ember (never colour alone) ·
dates `1 Jun 2026` · tabular figures right-aligned · missing data is an em-dash,
never blank or 0.

## Voice

UK English, sentence case everywhere, verb-first button labels ("Create report",
never "Submit"), em dashes, no exclamation marks, no emojis. Signal, Answers,
Watcher, Leaf Schema capitalised. Never fabricate metrics or client claims in
sample content.

## Accessibility

Never colour as the only cue; visible focus ring (the kit sets it); body text
contrast ≥ 4.5:1 (the copy-colour rule guarantees it — don't invent new
text/background pairs).

## Surfaces without the starter get no guardrails

Slides built from an Artifact type, inline-styled HTML, Canva, Figma and PNG
exports inherit none of the kit's tokens or classes, so every colour you type
is unchecked. Keep to the hex values above and check each slide's background
and each text colour against the grounds and Coral rules.
