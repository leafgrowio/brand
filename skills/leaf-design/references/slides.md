# Leaf slides — the deck rulebook

Read this whole page before writing a single slide, whatever builds the deck
(the Slides artifact type, inline HTML, a .pptx, Figma). It is the complete set
of deck decisions; `SKILL.md`'s hard rules still apply underneath it, and
`system/DESIGN.md` (the **design** slice) wins where they disagree — say so, so
this page gets fixed.

Every value below is exact. Copy it; don't approximate it.

## 1. Before you build

- **Owner.** Decide which team or product the deck represents: Leaf, Leaf
  Signal, Leaf Answers, Leaf Stores, Leaf Performance, Leaf Creative or Leaf
  Strategy. If the content doesn't make it obvious, ask. It picks the cover logo.
- **Audience.** Assume internal or customer-facing: the cover says
  "Leaf Confidential". Drop that only when the person says the deck is public.
- **No author.** Never put an author's, presenter's or owner's name on any
  slide. Decks ship under the Leaf or team brand.
- **Assets.** Resolve logos and the Leaf icon through `find-icon` — the black,
  no-padding SVG exports — and inline the SVG. Never recolour or redraw.

## 2. Canvas and chrome

- **Canvas** 1920×1080. Margins 128px all round. Content slides reserve the
  footer band: `padding:128px 128px 160px`.
- **Ground** Light Stone `#F9F4F1` on every slide — cover, content, closing and
  seal alike. Never Ink, never a dark slide, band, card or panel.
- **Footer row, every slide:** one pinned label,
  `position:absolute; left:128px; bottom:64px; width:1664px`, in the
  `slide-caption` style (26px / 500, Warm Grey `#656565`). Cover: "Leaf
  Confidential". Other slides: "<Deck title> · NN" (two-digit slide number).
- **Watermark, every slide except the cover and the seal:** the black
  no-padding Leaf icon, pinned bottom right on the footer row —
  `position:absolute; right:128px; bottom:69px; width:26px; height:26px;
  opacity:0.6`. Opacity is the only adjustment allowed; it keeps the icon at the
  same quiet tone as the footer text. Same place on every slide.
- **One look.** Every slide shares the ground, eyebrow treatment, type scale and
  footer. Vary the layout, never the look.

## 3. Colour on slides

Only these values appear on a slide:

| Use | Value |
| --- | --- |
| Ground | Light Stone `#F9F4F1` |
| Cards, table body | Canvas `#FFFDFB`, 1px `rgba(23,20,18,0.1)` border |
| Quieter second tone (table header, "former" states) | Stone `#F2E8E1` |
| Zebra stripe | Stone-faint `#FBF7F4` |
| Emphasis panel, step-number disc | Coral tint `#FBE4DF`, Ink text |
| Category fills (tiers, stages) | Secondary palette — Lilac `#D8CFF0`, Sage `#DCE8C4`, Butter `#F6E49D`, Eucalyptus `#9FC7BC` — Ink text only |
| Primary text | Ink `#171412` |
| Supporting text, footer | Warm Grey `#656565` |
| Eyebrows | Coral `#FB5E48` (the ratified exception on Light Stone) — or Warm Grey `#656565` on a slide whose title carries a Coral phrase |
| Title emphasis | Coral `#FB5E48` on one phrase of a `slide-display`, `slide-h1` or `slide-h2` title, on Light Stone or Canvas only — never on Stone `#F2E8E1` or the Coral tint |

No Aqua, no Canvas-on-Ink text (both are dark-mode only). No secondary or
Coral-ramp colour as text. Emphasis never comes from a dark fill.

**One piece of Coral type per slide.** Either the Coral eyebrow, or one Coral
phrase in the title (the title-emphasis exception, DESIGN.md › Copy colour) —
never both. When the title takes the phrase, the eyebrow turns Warm Grey. The
phrase is a clause or a few words, under half the title, with the rest in Ink:

```html
<p style="font-size:28px; font-weight:500; line-height:1.4; color:#656565">The thesis</p>
<h2 style="font-size:64px; font-weight:700; line-height:1.05; letter-spacing:1px">The model is a commodity. <span style="color:#fb5e48">Context is the moat.</span></h2>
```

A statement panel that carries the emphasised phrase is Canvas with a hairline,
never Stone or the Coral tint (Coral fails on both).

## 4. Type

Mona Sans throughout, from the design system's font file. Use the slide scale;
titles take positive tracking, written out in px because the Slides format takes
no `em`. The Slides format accepts whole-hundred weights only, so `slide-figure`
(640) is set at 600 there.

| Style | Size / line-height | Weight | Tracking | Use |
| --- | --- | --- | --- | --- |
| `slide-display` | 128 / 0.96 | 700 | 2px | Cover and seal title; the one statement carrying a slide |
| `slide-h1` | 92 / 1.0 | 700 | 1.44px | Divider titles, the closing ask |
| `slide-h2` | 64 / 1.05 | 700 | 1px | The slide title, at the top margin |
| `slide-h3` | 44 / 1.2 | 600 | 0.69px | Card, column or block title |
| `slide-figure` | 128 / 0.96 | 600 (640 elsewhere) | 2px | A metric's number |
| `slide-body-lg` | 36 / 1.55 | 400 | none | Lead paragraph, cover subtitle |
| `slide-body` | 32 / 1.6 | 400 | none | Body copy, list items, table cells |
| `slide-label` | 28 / 1.4 | 500 | none | Eyebrows, table headers, axis labels |
| `slide-caption` | 26 / 1.4 | 500 | none | Footer row, sources, notes |

Nothing smaller than 26px anywhere. Emphasis inside text is weight (`<b>`), not
a new size or colour — the one exception is a Coral phrase in a title (§3).
UK English, sentence case, em dashes, no exclamation marks, no emojis.

## 5. The four slide types

### Cover (slide 1)

Logo pinned top left, title block centred vertically as the **only flow child**,
footer label pinned. Don't centre with spacer divs (see §8).

```html
<section id="cover" style="background:#f9f4f1; color:#171412; font-family:'Mona Sans', Arial, sans-serif; padding:128px; display:flex; flex-direction:column; justify-content:center">
  <svg aria-label="Leaf" style="position:absolute; left:128px; top:128px; width:211px; height:64px" viewBox="0 0 422 128">…black owner logo…</svg>
  <div style="display:flex; flex-direction:column; gap:40px">
    <p style="font-size:28px; font-weight:500; color:#fb5e48">Eyebrow · 25 Sep 2026</p>
    <h1 style="font-size:128px; font-weight:700; line-height:0.96; letter-spacing:2px">Deck title</h1>
    <p style="font-size:36px; line-height:1.55; color:#656565; width:1200px">One-sentence subtitle.</p>
  </div>
  <p style="position:absolute; left:128px; bottom:64px; width:1664px; font-size:26px; font-weight:500; color:#656565">Leaf Confidential</p>
</section>
```

The logo keeps its own aspect ratio (height 64px); it is the owner's logo, not
always Leaf's.

### Content slide

Eyebrow and title at the top margin, the body below, footer and watermark
pinned.

```html
<section id="…" style="background:#f9f4f1; color:#171412; font-family:'Mona Sans', Arial, sans-serif; padding:128px 128px 160px; display:flex; flex-direction:column; gap:56px">
  <div style="display:flex; flex-direction:column; gap:16px">
    <p style="font-size:28px; font-weight:500; color:#fb5e48">Eyebrow</p>
    <h2 style="font-size:64px; font-weight:700; line-height:1.05; letter-spacing:1px">Slide title</h2>
  </div>
  …body…
  <p style="position:absolute; left:128px; bottom:64px; width:1664px; font-size:26px; font-weight:500; color:#656565">Deck title · 02</p>
  <svg aria-label="Leaf" style="position:absolute; right:128px; bottom:69px; width:26px; height:26px; opacity:0.6" viewBox="0 0 128 128">…black Leaf icon…</svg>
</section>
```

### Closing slide (the ask or the one habit)

The cover's composition: eyebrow inside the block, block centred as the only
flow child, footer label and watermark pinned. Title in `slide-h1`.

### Seal (always the last slide)

Every deck ends on it, after any closing or Q&A slide. "Pura Vida" in
`slide-display`, centred horizontally and vertically as the only flow child; the
black **Leaf** logo (always Leaf, whichever team owns the deck) pinned top left
in exactly the cover's logo position; the footer label; no watermark; nothing
else.

```html
<section id="seal" style="background:#f9f4f1; color:#171412; font-family:'Mona Sans', Arial, sans-serif; padding:128px; display:flex; flex-direction:column; justify-content:center; align-items:center">
  <svg aria-label="Leaf" style="position:absolute; left:128px; top:128px; width:211px; height:64px" viewBox="0 0 422 128">…black Leaf logo…</svg>
  <h2 style="font-size:128px; font-weight:700; line-height:0.96; letter-spacing:2px; text-align:center">Pura Vida</h2>
  <p style="position:absolute; left:128px; bottom:64px; width:1664px; font-size:26px; font-weight:500; color:#656565">Deck title · NN</p>
</section>
```

## 6. Content patterns

- **One idea per slide.** A statement beats bullets; turn lists into cards,
  steps, a table or a big number. Split an overfull slide; never shrink type.
- **Cards.** Canvas, 1px `rgba(23,20,18,0.1)` border (or a secondary-colour
  fill with Ink text for categories), 40–48px padding, `slide-h3` title,
  `slide-body` or 28px Warm Grey text. Flat: no shadow.
- **Emphasis panel.** Coral tint `#FBE4DF`, Ink text. At most one per slide.
- **Steps.** Ordered steps are rows, never a table and never a bare `<ol>`.
  Each row: a 72px Coral-tint disc (`border-radius:50%`) holding the number in
  Ink at 32px / 600, tabular; then the step in `slide-body` with its action
  phrase in `<b>`. Rows are `display:flex; gap:40px; align-items:center` (the
  disc is taller than a line, so centre it, never baseline), 36px apart, so the
  list fills the slide.
- **Tables** — only for real data, where every column carries its own
  information. Answers-kit treatment: Canvas body with a 1px
  `rgba(23,20,18,0.1)` border; header row on **Stone `#F2E8E1`**, labels in Ink
  at `slide-label` weight with a 2px `rgba(23,20,18,0.3)` rule beneath; body in
  `slide-body` Ink; zebra stripe `#FBF7F4` on even rows; 1px
  `rgba(23,20,18,0.1)` hairlines between rows, none after the last. The page,
  header and stripe must be three visibly different fills. Set `width:N%` on
  every first-row cell, sized to content (label column just wider than its
  longest entry). Square corners (see §8). Row fills go on `<tr>`.

### Icon slot

Cards and emphasis panels carry one black line icon each (DESIGN.md ›
Iconography), resolved with `find-icon` and inlined as SVG — or, for a card naming a
tool, that tool's official mark via `find-icon` (Leaf's cached `tools` group —
prefer its `Icon` file — then the gilbarbara/logos collection, then
Brandfetch), uploaded as an image. If
the lookup finds nothing, ask the person to upload the official logo; never
draw one. Every
card in a row takes one or none does; pick each for what its card says.

- **Card** — the icon first in the card's column, 92px (`width:93px;
  height:92px`, the library's native box), above the `slide-h3` title; the
  card's `gap:16px` spaces it. A tool mark sits in the same slot at 88×88,
  `object-fit:contain`.
- **Emphasis panel** — the panel becomes a row: `display:flex;
  align-items:center; gap:40px`, the 92px icon first, the text `flex:1`.

Icons add about 110px to a card; re-check the height budget (§6a).

### Labelled rows (categories)

Up to six categorical items — tiers, stages, layers, options — are rows, not a
table: a Warm Grey column-label row, then one Canvas row per item.

```html
<div style="display:flex; flex-direction:column; gap:14px">
  <div style="display:flex; gap:40px; padding:0px 32px"><p style="width:240px; font-size:26px; font-weight:500; color:#656565">Tier</p><p style="flex:1; font-size:26px; font-weight:500; color:#656565">What lives there</p><p style="width:400px; font-size:26px; font-weight:500; color:#656565">Who can read it</p></div>
  <div style="display:flex; align-items:center; gap:40px; background:#fffdfb; border:1px solid rgba(23,20,18,0.1); border-radius:12px; padding:12px 32px 12px 12px">
    <div style="width:260px; background:#d8cff0; padding:10px 20px; border-radius:8px"><p style="font-size:32px; font-weight:600; line-height:1.2">Person</p></div>
    <p style="flex:1; font-size:28px; line-height:1.35">Your decisions, commitments, private context</p>
    <p style="width:400px; font-size:28px; font-weight:500; line-height:1.35">Only you</p>
  </div>
  …one row per item…
</div>
```

Label chips take the secondary palette in a meaningful order (private → shared,
first → last), never at random; the right-hand column still says in words what
the colour implies.

### Layer stack

An architecture or dependency stack: full-width bricks, **all 1664px wide** so
their columns align like a table. Each level is a column of a stud row (eight
`64×16` tabs, `border-radius:8px 8px 0px 0px`, same fill, `padding:0px 56px`,
`justify-content:space-between`) over the brick (`padding:18px 40px;
border-radius:8px`, secondary fill, Ink text): `slide-h3` name at 430px, the
description `flex:1` at 28px, a 300px right column of two 26px lines (where,
bold; how often). Stack gap 0; the foundation layer is last. Five layers fit
with the section `gap:40px`.

### Process row

A pipeline under a row of cards: step blocks spanning the full content width,
each `flex:1; display:flex; justify-content:center; align-items:center;
padding:28px 16px; border-radius:16px` on a secondary fill, the step in Ink at
32px / 600, joined by `<x-shape kind="arrow-right" style="width:48px;
height:24px; background:#656565">`, `gap:24px`. Five steps is the limit at
1664px; keep each label to about ten characters.

### Mascot cover

The cover with the mascot's transparent cut-out (from the mascot sticker pack —
never a boxed JPG) pinned right: `position:absolute; right:128px; top:260px;
width:560px; height:560px; object-fit:contain`, placed right after the logo so
it paints under the flow. Narrow the subtitle to `width:1000px`.

### 6a. Height budget

The live area is 824px tall on a content slide (`padding:128px 128px 160px`).
Add it up before you publish, because nothing in the Slides type checks it:

- eyebrow + `slide-h2` title block ≈ 28×1.4 + 16 + 64×1.05 per line ≈ 111px
  for a one-line title (+67px per extra line), then the section `gap`.
- a text block ≈ size × line-height × lines; lines ≈ characters ÷ (box width ÷
  (0.6 × size)).
- a card ≈ padding (2 × 44) + icon (92 + 16) + `slide-h3` (53 + 16) + its text.
- a table row ≈ 2.1 × font size per line of text.
- a labelled row ≈ 82px; a layer-stack level ≈ 16 + 112px.

Over 824: split the slide. Never shrink type below the §4 scale to fit.

## 7. Never

- An Ink or dark slide, band, card or panel.
- Decorative lines: accent bars, short rules above headings, underline
  flourishes, left-edge stripes. Lines are structural only — table rules,
  hairline borders, chart axes and gridlines.
- More than one logo on the cover, or any logo but the black export.
- An author or presenter name.
- A slide that looks like it came from another deck.
- A table used for layout or for numbered steps.
- Coral as running text on Light Stone (beyond the eyebrow or one title
  phrase), or as any text on Stone.
- Fabricated metrics, quotes or claims; mark unknowns as `[__]` placeholders
  and list them for the person.
- A Coral eyebrow on a slide whose title carries a Coral phrase, two Coral
  phrases, or a Coral phrase on Stone or the Coral tint.
- A table for categorical content that belongs in labelled rows.
- A tool logo redrawn from memory, or any mark not taken from the brand repo.
- Two closing statements back to back.

## 8. Slides-renderer quirks (the Slides artifact type)

Learned the hard way; design around them.

- **Unpainted divs are dropped.** An empty spacer `<div>` does not hold space,
  so `justify-content:space-between` collapses. Centre with
  `justify-content:center` and a single flow child instead.
- **Pinning a footer changes the flow.** Moving an element to
  `position:absolute` removes it from the flex balance; re-check any
  `space-between` it was part of.
- **Rounded corners on tables don't render.** Neither `border-radius` on the
  table nor on a wrapper with `overflow:hidden` survives, so tables get square
  corners.
- **Cells take no background.** Put fills on the `<tr>`.
- **Column widths** need `width:N%` on every cell of the first row, or columns
  split equally.
- **Weights** are whole hundreds only; `em` is not accepted (write tracking in
  px).
- **Tables and SVGs don't inherit the slide's face.** Put
  `font-family:'Mona Sans', Arial, sans-serif` and `font-size` on the `<table>`
  (and cells), the `<svg>` and each `<text>`, or they fall out of Mona Sans.
- **Install the design system, and re-install it before you ship.** A deck keeps
  a snapshot of the system's tokens and fonts from the moment it was installed;
  later system changes reach new decks only. Key the face to the installed
  `MonaSans-Leaf.ttf` (stylistic sets frozen in — the slide format can't turn
  them on), never a one-off upload or a stock Mona Sans.

- **The editor re-saves slides.** A slide a person has edited comes back
  normalised (per-element `font-family`, hex-alpha colours such as
  `#1714121a`). Read it again before editing and match on text, not on markup.
- **Importing a slide from another deck** copies that deck's styling with it.
  Restyle it to this page's values (26px floor, 700 titles with px tracking,
  28/500 eyebrows, hairline borders) before publishing.

## 9. Pre-publish checklist

Walk every slide against this before publishing, then run `review-brand-asset`
if the Leaf plugin is installed.

- [ ] Every slide on Light Stone; no Ink anywhere as a ground.
- [ ] Cover: one black owner logo top left; title block centred; "Leaf
      Confidential" in the footer row; no author.
- [ ] Every content slide: eyebrow + title at the top margin; footer label with
      slide number; watermark bottom right at 26px, 60% opacity.
- [ ] Closing slide uses the cover's centred composition.
- [ ] Last slide is the seal: "Pura Vida" centred, black Leaf logo in the
      cover's logo position, footer label, no watermark.
- [ ] Type from §4 only; nothing under 26px; title tracking in px.
- [ ] Colours from §3 only; Coral text only as eyebrows.
- [ ] No decorative lines; no half-rendered rounded corners.
- [ ] Steps as disc rows; tables only for data, header distinct, widths set.
- [ ] Footer label and watermark in identical positions on every slide.
- [ ] Footer numbers run 02, 03 … with no gaps or repeats — renumber after
      every insert, removal or reorder.
- [ ] One piece of Coral type per slide: Coral eyebrow, or one title phrase
      with a Warm Grey eyebrow.
- [ ] Cards in a row all carry an icon or none do; callouts carry one.
- [ ] Categorical lists are labelled rows; tables hold figures only.
- [ ] Imported slides restyled to this page's values.
- [ ] Every content slide inside the 824px height budget (§6a).
- [ ] One closing statement before the seal.
