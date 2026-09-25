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
| Eyebrows | Coral `#FB5E48` — eyebrows only (the ratified exception on Light Stone); never Coral running text on any Stone ground, never Coral type on Stone `#F2E8E1` |

No Aqua, no Canvas-on-Ink text (both are dark-mode only). No secondary or
Coral-ramp colour as text. Emphasis never comes from a dark fill.

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
a new size or colour. UK English, sentence case, em dashes, no exclamation
marks, no emojis.

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

## 7. Never

- An Ink or dark slide, band, card or panel.
- Decorative lines: accent bars, short rules above headings, underline
  flourishes, left-edge stripes. Lines are structural only — table rules,
  hairline borders, chart axes and gridlines.
- More than one logo on the cover, or any logo but the black export.
- An author or presenter name.
- A slide that looks like it came from another deck.
- A table used for layout or for numbered steps.
- Coral as running text on Light Stone, or as any text on Stone.
- Fabricated metrics, quotes or claims; mark unknowns as `[__]` placeholders
  and list them for the person.

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
