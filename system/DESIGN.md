# Leaf Design Foundations

This document is the written source of truth for Leaf's design system. It pairs with two visual references: the **brand book** (`Leaf Brand Book.dc.html`) for brand foundations, and the **component library** (`Leaf Component Library.dc.html`) for the application layer. Where any of them disagree, fix all. Keep the split clean: brand-level language (foundations, colour, type, voice, logos, icons, imagery, photography, data viz, applications preview) lives in the brand book; product components (catalog, patterns, app shell, overlays) live in the component library.

Status: v2.1 — ratified 24 September 2026 (supersedes v2.0.2, 23 September 2026). All sections locked.
Source: core brand reference (June 2026) + v1.0 ratification (July 2026).

---

## Changelog

**v2.1 — September 2026 (minor).** *Optical size is pinned to 0.* Mona Sans v2.0.27 carries an `opsz` axis, and browsers drive it from the font size by default (`font-optical-sizing: auto`), so display headlines on the brand book, component library and Claude Design rendered tighter and narrower than the same headline from the artifact kit, a PNG export or a matplotlib chart — all of which are instanced at `opsz` 0 and cannot follow. The spec never chose. It chooses now: **`font-optical-sizing: none` on `*`** in `tokens/fonts.css`, so every surface renders the axis default. Display headlines on the canonical surfaces get slightly wider; the kit, exports and charts do not change. Measured in Chromium: the kit subset and the canonical file at `opsz` 0 render identically, glyph outlines included. Backwards-compatible — nothing already rendered needs re-rendering.

**v2.0.2 — September 2026 (patch).** *Brand in the wild* catches up with v2.0. It still offered an "Ink or Stone ground" for the social / link-preview card and a Canvas wordmark to go with it — the pre-v2.0 treatment, left behind when Ink stopped being a brand surface. Social and link-preview cards are **Stone**, with the **Coral** wordmark (Coral on light, per Logos); Ink is never a social ground. The section intro loses "Ink/Stone grounds" for the same reason, and the brand book's social, carousel and brand-in-the-wild copy is corrected to match the mocks, which were already Stone. Copy only — no token, component or rendered mock changes.

**v2.0.1 — September 2026 (patch).** `--leaf-border` is retired; use **`--leaf-border-light`**. It was an alias pointing at that token, and the only one of the twelve semantic aliases that pointed at another semantic token rather than a physical colour — the rest translate a role to a hex. It also sat in `colors.css` while the border family it aliased lives in `elevation.css`, so the pair read as an accident rather than a decision. `--leaf-border-light` stays because it is half of a real pair: it is the light-ground counterpart to `--leaf-border-dark`, not a lighter variant of something. Nothing already rendered breaks — artifacts embed the token block, so they carry their own copy — but new work should use the explicit name. Three references moved: one specimen card, the artifact starter's `.leaf-card`, and the chart-recipes line.

**v2.0 — September 2026 (major).** The first rule change since ratification that breaks existing artifacts. Anything already shipped against v1.0 needs re-rendering; anything reading the retired tracking tokens needs repointing.

*Ink is no longer a brand surface.* It is the **dark-mode UI surface**, and nothing else. Marketing pages, decks, covers, dividers, quote frames and social cards stay in the light Stone family. The customer-quote frame moves from Ink to Stone, keeping Ink type and the oversized Coral quotation marks. Directed by the CEO. This alone is the major.

*Headings go bold.* `display`, `h1` and `h2` move to **700** (from 640, 640 and 600); `h3` holds at **600**. Display, h1 and h2 carry a page; a title sitting inside content settles rather than competes. Every heading on every surface changes.

*Title tracking splits into two bands, and slides invert.* `--leaf-type-tracking-display` and `--leaf-type-tracking-heading` are **removed**. In their place: `--leaf-type-tracking-title` (-0.03em, at 54px and below), `--leaf-type-tracking-title-large` (-0.02em, above 54px) and `--leaf-type-tracking-slide` (**+0.015625em**, positive, the slide scale only). The web bands are empirical — leafsignal.com sets -0.03em on every heading it renders, measured up to 54px, which is the largest type the site has. Slides open rather than tighten because a slide is read across a room.

*Two new scales.* A **Product scale** (`ui-title` through `ui-micro`, seven styles) for dense application views — the Answers kit had been running eleven freehand sizes against the system's eight. A **Slides scale** (eleven styles, `slide-display` through `slide-serif-quote`) for deck typography. Both are in `tokens/typography.css` and documented under Type scale.

*Seven tokens added in the first pass:* `--leaf-border-strong`, `--leaf-surface-hover`, `--leaf-border-success` / `-warning` / `-error` / `-info`, `--leaf-shadow-control`. All were literal values repeated across components. An eighth, `--leaf-border-brand`, arrived later with the tag fix — eight new tokens in the release.

*The left accent bar is removed* from Alert and the active SidebarItem. The alert keeps its soft-tint fill, a 1px tint border on all four sides and the solid state badge; the active sidebar item keeps its Coral tint fill, takes Ink text and icon, and now holds its resting padding so the label does not nudge sideways on activation. The state was already stated three times over.

*The whole component library moves onto tokens.* No literal type size, spacing step, radius, border or wash survives in any component source, specimen card or the Answers kit.

*Mona Sans is now a frozen build.* `assets/fonts/MonaSans.ttf` and `MonaSans-Italic.ttf` keep their filenames — they are public URLs — but carry upstream v2.0.27 with ss03/05/06/07/09 baked into the glyph mapping rather than held in a feature table, and the `wght` default moved from 200 to 400. Surfaces that cannot request OpenType features now get the brand letterforms anyway; the `font-feature-settings` rule stays, because it costs nothing against a frozen file.

*Correction.* The claim that the Google Fonts build of Mona Sans strips the stylistic-set tables is **withdrawn**. It was measured against the live build and it is wrong: ss03, ss05, ss06 and ss07 are present and shift metrics when requested. Self-hosting stands on its real reasons — pinning to a named upstream release, no third-party request at render time, and renderers that cannot turn features on.

*Motion* narrows from 120–200ms to **120–180ms**, matching the tokens that exist.

*The ramp family is now complete and cross-referenced.* The graphite mono ramp had been defined in `colors.css` and described under Lead options since v1.0, but appeared in no specimen and was referenced by nothing — it is now listed with the other ramps and shown on the ramps card. The categorical palette states which of its series carry a ramp: **1–3 do, 4–6 are categorical only**, so a chart can move from categorical to intensity without changing hue family. The mono ramp is also renumbered light-to-dark to match the hue ramps — `--leaf-chart-mono-1` was the darkest step and is now the lightest. Nothing referenced those tokens, so the change is inert; directed by the CEO.

*A third sequential ramp.* **Marigold** joins Coral and Harbor — `#FCF0DE → #F5D39A → #EFB75A → #BA8F46`, generated on a formula fitted to the other two (82% toward Canvas, 40%, the base, 22% toward black; Coral and Harbor were hand-picked and do not reproduce from it). It exists so a categorical chart can run three series in tints instead of three saturated fills: the funnel specimen was Coral/Harbor/Marigold at full strength with Ink labels inside, which passed contrast at 5.93, 6.22 and 10.12 and was still hard to read, because a saturated mid-tone ground fights dark text in a way a ratio does not capture. It now uses step 2 of each ramp — Coral 9.06, Harbor 9.93, Marigold 12.81:1 — and sits in a balanced block rather than a wide strip. Marigold has no dark anchor: every step takes Ink, step 4 included.

*The “For agents” band is relit, and its cheat-sheet corrected.* That section was a full-Ink ground telling agents to use “Ink for high-impact moments” — the rule v2.0 reverses — and the old spec had named it as the canonical example of Ink-as-brand-surface. It now sits on Light Stone with Canvas cards, Ink text, Warm Grey secondary and Coral eyebrows. More seriously, its token cheat-sheet listed seven names that have never existed (`--leaf-color-brand-coral`, `--leaf-color-neutral-ink` and five more); an agent following it would have written unresolvable properties. All seven corrected, and a token-name check added to `AGENTS.md`, because a `var()`-only sweep cannot see a name written as a bare declaration in a code block.

*Cleanup.* `PLAN.md` is deleted — it was the plan for the July 2026 migration that produced this folder, completed, undocumented in the repo's own file map, and still describing the system at v1.0 with rules v2.0 reversed. Git has it. Seven files were removed from `system/assets/` that nothing in the system referenced: five icons, a logo variant and one imagery PNG. That folder is documented as "the curated flat set the system actually uses", so files it does not use do not belong in it; every one has its canonical copy in the root library at `assets/`, which is the path a consumer should be using anyway. The OFL licence files stay — the SIL licence requires them to travel beside the fonts.

*A contrast sweep, and the three things it caught.* The repo now has a checker that resolves every text-on-background pair it can determine statically — tokens resolved to hex, translucency composited, size and weight read from the declaration — and computes the ratio. It found 59 failures where hand-checking had been finding them one component at a time. **Coloured state text on its own tint** (2.71–4.12:1) appeared 21 times across the brand book, the component library and the Answers kit, against the spec's own rule that a tint takes Ink; all 21 now take Ink and keep the coloured dot. **`--leaf-text-muted`** moves from `#9A8F86` to `#767065` — it was 3.11:1 on Canvas and 2.97:1 on Stone-faint, and it is the placeholder and help text in every form field, which is text people read. And the claim that the **solid state tones are dark anchors taking Canvas** is corrected: only Ember reaches 4.5, so Canvas on a solid tone is now stated as a glyph-and-dot treatment at the 3:1 non-text floor. What remains below AA is the ratified table and nothing else.

*Tags stop using colour as legibility.* Featured and count tags were Coral text on a Coral tint — 2.54:1, the same failure as the active sidebar item. All four tag variants now take **Ink**, with the fill and a 1px edge carrying the difference: a new `--leaf-border-brand` at the same 0.28 alpha as the four state borders. The neutral tag moves from Warm Grey to Ink as well, 4.83:1 to 15.20:1.

*The exceptions are ratified, not accidental.* The Accessibility section gains a **Ratified exceptions** table naming the three places the system sits below AA on purpose, each with its measured ratio and its second signal. An audit that surfaces one of them has found the exception; anything below the floor and not on that list is a defect.

*Coral gets its boundaries written down, after a contrast audit.* Three changes, all directed by the CEO. The **active sidebar item** now carries **Ink** text and icon on its Coral tint: Coral on its own tint is 2.54:1, which fails even the 3:1 floor, so the fill and the 600 weight mark the state instead of asking colour to carry legibility. A **solid Coral control** takes **Canvas** text, not Ink — Ink on Coral is for large quiet uses, a card or a panel, where on a button it reads as a warning label. And the **eyebrow exception** is now stated rather than implied: eyebrows, small uppercase labels, inline links and the secondary button's label sit below the Coral-as-type floor on purpose, because none of them is read as prose and each has a second signal — a heading beneath, an underline, a border. The document had asserted a 24px floor while every eyebrow in the system broke it; the rule now says what the system actually does, and where the licence stops.

*The two visual references move onto the type scale.* `Leaf Brand Book.dc.html` and `Leaf Component Library.dc.html` had set themselves on a private editorial ramp of 26 sizes and 8 weights across ~1,150 declarations. Every one now reads a `--leaf-type-*` token: 110 distinct styles collapse to 16, 26 sizes to 11, 8 weights to 5. The documents that describe the system are now made of it, and any literal type value in them is from here on a signal rather than noise. Three literal Source Serif 4 declarations remain: the 72px "Aa" face specimen and a 19px italic sample line, because the web serif scale has only two styles and neither fits; and a fluid `clamp(19px,2.3vw,24px)` hero subtitle, which is the sanctioned fluid-display case rather than an exception.

**v1.0.5 — July 2026 (patch).** The two visual references (`Leaf Brand Book.dc.html`, `Leaf Component Library.dc.html`) refactored to consume the system instead of restating it: all styling now flows through `styles.css` tokens (`var(--leaf-*)`; ~1,000 hard-coded values replaced), fonts self-hosted via `tokens/fonts.css` (removing the component library's Google-Fonts Mona Sans; the reason given at the time — that the Google build strips the stylistic sets — was wrong, and is corrected in v2.0, but self-hosting was still the right call), and both pages gained a **Rendered from source** section that live-embeds every specimen card (18 component + 17 foundation) at its declared viewport, plus per-section source links into `tokens/`, `components/`, and this spec. Reference-only drift fixed against the spec in passing: off-token alert-banner tints → the state tint tokens; two hand-typed muted greys → `--leaf-text-muted`; the brand book's remaining one-off colours → tokens (voice-pill green and contrast-verdict greens/amber → state tokens; favicon tiles → Stone; the applications amber card → Marigold; the for-agents "Never" salmon → `--leaf-ramp-coral-2` with an Ember-alpha border; the footer version chip → Ink text per the tint-fill rule); both pages gained a Leaf favicon. No token values or rules changed. Do/don't specimens keep literal off-palette hexes by design.

**v1.0.4 — July 2026 (patch).** Source Serif 4 upgraded to upstream **4.005R** (adobe-fonts/source-serif) and both font families pinned to named releases, kept current deliberately (procedure in `AGENTS.md`). The repo's font folder now carries variable sources + licences only — static instances removed.

**v1.0.3 — July 2026 (patch).** Mona Sans upgraded to upstream **v2.0.27** (github/mona-sans; the repo had shipped v2.000). The newer font adds an optical-size axis and restores `ss09` — so all five stylistic sets (ss03/05/06/07/09) are real again and back on. Fonts are pinned to a named upstream release; the upgrade procedure lives in `AGENTS.md`.

**v1.0.2 — July 2026 (patch).** Corrected the stylistic sets to the four the then-bundled Mona Sans v2.000 shipped — its build predated `ss09`. Superseded by v1.0.3.

**v1.0.1 — July 2026 (patch).** Restored the palette tables the Colour section references — core, neutral, highlight, and secondary with hexes — which had dropped out of the doc; values match `tokens/colors.css`.

**v1.0 — ratified July 2026.** Full system locked; everything previously marked "proposed" is ratified. Added: Mona Sans **stylistic sets** (ss03/05/06/07/09, always on, self-hosted VF); a dedicated **Logos** section (clear space, minimum sizes, misuse, service/property family); **co-brand lockups** (divider for equal partnerships, `×` cross for customer announcements); the **approved colour pairings** matrix; an expanded **Voice** section with language patterns (use / use carefully / avoid) and mechanics; and **governance & versioning** (below).

**v0.2 — July 2026.** Alerts & banners, number & format conventions, and a consolidated Accessibility foundation. Coral button system (primary solid, secondary outline). Coral content blocks softened to a light tint with Ink text. Copy-colour rule. Product state palette (Fern, Amber, Ember, Tidal). Type scale. Spacing, layout, radius, elevation, motion, interaction states. Photography direction locked (customer/brand-association only; co-brand lockup + customer-quote treatment).

---

## Principles

1. Lead with warmth and clarity.
2. Coral is a signal, not a coat of paint — one decisive coral moment per view.
3. Stone is the room, Ink is the voice, Canvas is for clarity.
4. Secondary colours are support actors — variety, categories, campaigns; never the brand signal.
5. Sentence case, confident medium-to-semibold weights.
6. Prefer stable, named tokens over one-off values.

---

## Colour

The core, neutral, highlight, and secondary palettes are listed in the tables at the end. The decisions below govern *how* they are used.

### Copy colour (rule)

Text is set in a small, high-contrast set only:

- **Ink** — primary text on all light surfaces.
- **Coral** — emphasis, eyebrows, links, small brand accents. Coral measures 3.04:1 on Canvas, 2.83:1 on Light Stone and 2.56:1 on Stone, so as running text it is Canvas-only and only at 24px+ or 19px+ bold. On any Stone ground it is a mark — a rule, an underline, a dot, a fill — never type.

  **The eyebrow exception.** Section eyebrows, small uppercase labels and inline links are Coral at their own sizes, below that floor, and that is deliberate. An eyebrow is not read as prose: it is a wayfinding mark made of letters, it sits above a heading that carries the meaning, and it is never the only route to the information beneath it. The same licence covers a link inside body copy, where underline or context marks the link as well as colour. It does not extend to anything a reader has to read to understand the page, and it does not extend to Coral on a Stone ground at any size.
- **Warm Grey** — secondary text on Light Stone, Stone, and Canvas (passes AA; avoid at very small sizes on Stone).
- **Aqua** — small labels and accents on Ink / dark-mode surfaces only.

Do **not** set copy in the secondary palette, in Stone tones, or in pale tints — their tones can't guarantee contrast at text sizes. Build small-text hierarchy with **weight**, not faint colour.

Exception: a **state tone may label its own status** — a Fern "success" or Ember "error" heading — at title size and weight.

### Coral usage

Coral carries action and brand signal; it is not a large content fill.

- **Primary button** — solid Coral (`#FB5E48`), Canvas text, pill shape. Darkens to `#E8462F` on hover. One primary per view.
- **Secondary button** — transparent, 1px Coral border, Coral text, pill shape. Soft-tint (`#FBE4DF`) fill on hover. Kept visually lighter than the primary so it never competes. The label sits under the Coral-as-type floor and is covered by the same carve-out as eyebrows and links: the Coral border states the control as well as the text colour does, so colour is never the only signal. On a Stone ground use the primary or an Ink outline instead — Coral text on Stone is 2.56:1 and has no second signal to lean on.
- **Coral content blocks** (cards, panels, slides) — use **soft Coral** (`#FBE4DF` tint) with Ink text, not a solid fill. Reserve solid Coral for CTAs and small brand marks.
- Never Canvas/white text on Coral for anything longer than a short button label (white-on-Coral is 3.04:1, large-text only).

### Product state palette (dedicated)

Status needs more depth than the secondary palette can give. States use their own small palette — tuned to sit beside Coral and the neutrals, but drawn outside them. Use the **solid** tone for icons, dots, and borders; use the **soft tint** with **Ink** text for banners and backgrounds. Canvas text on a solid tone is body-safe on Ember only — on Fern and Tidal keep it to large text and UI marks (see Approved text pairings). Error stays clear of Coral so the brand signal never reads as an alarm.

| Token | Name | Solid | Tint | Role |
| --- | --- | --- | --- | --- |
| `color.state.success` | Fern | `#2F8B57` | `#E7F1EA` | Success, positive confirmation |
| `color.state.warning` | Amber | `#C77E1C` | `#F6E9CC` | Warning, needs attention |
| `color.state.error` | Ember | `#C63A2B` | `#F7E0DB` | Error, destructive |
| `color.state.info` | Tidal | `#2E8388` | `#DDECEC` | Informational, neutral status |

### Approved text pairings

**Ink on colour, Canvas on the darks.** Every Coral, Aqua, secondary, and state-tint fill takes **Ink** text — with one carve-out: a **solid Coral control** (a primary button, a pill) takes **Canvas**. Ink on Coral is for the large, quiet uses — a card, a panel, a block of colour someone reads across. On a button it reads as a warning label; Canvas reads as an action. The label is short and set at 600, which is the case the 3.04:1 ratio was measured for. Only the dark anchors take **Canvas**, and they split two ways. **Canvas at any size** on Ink (18.07:1), Warm Grey (5.74:1) and Ember (5.12:1). **Canvas on a solid state tone is for glyphs and dots only** — the tick, the i, the exclamation inside a 22px badge. Those are graphical objects and take WCAG's 3:1 non-text floor, which all four tones clear; as *text* only Ember reaches 4.5 (Fern 4.18, Tidal 4.39, Amber 3.22), so never set a word of Canvas copy on one. **Canvas at large text only** — 24px+, or 19px+ bold, and UI marks — on Coral (3.04:1), Tidal (4.39:1) and Fern (4.18:1): all three sit under the 4.5:1 body-text floor, so a sentence set in Canvas on a solid Fern or Tidal fill fails AA exactly as it does on Coral. Set body copy on those three in **Ink**, or move it onto the tint.

---

## Typography

Mona Sans is the working font; Source Serif 4 is the editorial serif (headlines `800`, pull quotes italic `500`). Serif is never used for UI, tables, forms, nav, or small labels.

### Type scale

| Token | Size / line-height | Weight | Use |
| --- | --- | --- | --- |
| `type.display` | 64 / 0.96 | 700 | Hero statements |
| `type.h1` | 46 / 1.0 | 700 | Page / section titles |
| `type.h2` | 32 / 1.05 | 700 | Sub-sections |
| `type.h3` | 22 / 1.2 | 600 | Card and block titles |
| `type.body-lg` | 18 / 1.55 | 400 | Marketing body, intros |
| `type.body` | 16 / 1.6 | 400 | Default product / long text |
| `type.label` | 14 / 1.4 | 500 | Buttons, nav, metadata |
| `type.caption` | 13 / 1.4 | 500 | Smallest supporting text |

Display/H1 are fluid on marketing surfaces (`clamp()`); the values above are the desktop anchors.

The table above is the **Interface scale**, for web and marketing. Three more scales sit beside it, all defined in `tokens/typography.css`.

**Editorial — Source Serif 4.** Two styles, for editorial moments only. Never UI, tables, forms, nav or small labels.

| Token | Size / line-height | Weight | Use |
| --- | --- | --- | --- |
| `type.serif-headline` | 34 / 1.08 | 800 | Editorial headlines |
| `type.serif-quote` | 24 / 1.3 | italic 500 | Pull quotes, customer quotes |

**Product.** Dense application views — the Answers kit and anything built like it. Tighter than the Interface scale because a product view packs more into the same pixels, and it bottoms out at 11px rather than 13px. The two figure styles sit one weight step under `ui-title` (640, not 700) so a number reads as data rather than as a heading.

| Token | Size / line-height | Weight | Use |
| --- | --- | --- | --- |
| `type.ui-title` | 24 / 1.15 | 700 | Page title in a product view |
| `type.ui-figure` | 24 / 1.0 | 640 | A KPI or headline number |
| `type.ui-figure-sm` | 20 / 1.0 | 640 | A secondary number: donut centre, compact stat |
| `type.ui-heading` | 16 / 1.25 | 600 | Card, panel and chart-card titles |
| `type.ui-body` | 14 / 1.5 | 400 | Default product text, descriptions, meta |
| `type.ui-label` | 13 / 1.2 | 500 | Field labels, legends, deltas, tab labels |
| `type.ui-micro` | 11 / 1.2 | 600 | The floor: uppercase group labels, smallest meta |

**Slides.** Deck typography on the 1920×1080 canvas, roughly 2× the Interface scale. `slide-figure` is the one style that is not a title: a big number, one weight step under the titles for the same reason `ui-figure` is.

| Token | Size / line-height | Weight | Use |
| --- | --- | --- | --- |
| `type.slide-display` | 128 / 0.96 | 700 | The one statement carrying a slide |
| `type.slide-h1` | 92 / 1.0 | 700 | Divider titles, the closing ask |
| `type.slide-h2` | 64 / 1.05 | 700 | The slide title, at the top margin |
| `type.slide-h3` | 44 / 1.2 | 600 | A card, column or block title |
| `type.slide-figure` | 128 / 0.96 | 640 | A metric card's number |
| `type.slide-body-lg` | 36 / 1.55 | 400 | Lead paragraph under a title |
| `type.slide-body` | 32 / 1.6 | 400 | Body copy, list items, table cells |
| `type.slide-label` | 28 / 1.4 | 500 | Eyebrows, axis labels, table headers |
| `type.slide-caption` | 26 / 1.4 | 500 | The footer band, sources, figure notes |
| `type.slide-serif-headline` | 68 / 1.08 | 800 | An editorial headline on a slide |
| `type.slide-serif-quote` | 48 / 1.3 | italic 500 | A customer quote |

**Web titles tighten; slide titles open. Two surfaces, two rules.**

On the **web**, tracking has two bands split at 54px: `-0.03em` at and below (`--leaf-type-tracking-title`), `-0.02em` above (`--leaf-type-tracking-title-large`). The boundary is empirical rather than typographic. leafsignal.com renders -0.03em on every heading it sets — measured at 31.86, 36, 44.1 and 54px — so that is the tracking the brand is actually seen with, but 54px is the largest type the site has, and the same ratio closes words up by the time type reaches 92 or 128px.

On **slides**, tracking is positive: `+0.015625em` (`--leaf-type-tracking-slide`), set so a 128px display line opens by exactly 2px and held as a ratio across the slide scale — +2px at 128, +1.44px at 92, +1px at 64, +0.69px at 44. A slide is read across a room, not at arm's length, and open tracking carries at distance where tight tracking closes up. The consequence to be aware of: the same words set on the site and on a cover slide are not identical, by design.

Reference the token for the surface rather than the number: a hard-coded value is invisible to the next change to the rule, which is exactly how the Answers UI kit sat at -0.02em after the rule moved. Body, label and caption take none: tightening text below 20px costs legibility and buys nothing. Where the surface takes no `em` — the slide format is the one that matters — write the px out: -0.03 × the font size, never `-0.03px`, which is legal CSS, looks like the rule and renders as no tracking at all.

**Tracking goes positive for small labels only**, where the caps need room to breathe: `0.07em` on an uppercase sidebar group label at 11px/600, `0.04em` on a small code label, `0.02em` on a table header. Those three are the whole set, they are component-level decisions set on those components directly rather than tokenised, and outside the slide band they are the only positive tracking in the system. Anything else opening up letter-spacing is drift.

### Stylistic sets

Mona Sans is a variable font (pinned to upstream v2.0.27). Five OpenType stylistic sets are **always on**, set once at the root so every surface inherits the same letterforms:

**The sets are frozen into the font, not requested from it.** The system ships a frozen build of Mona Sans, roman and italic, under the existing filenames (`assets/fonts/MonaSans.ttf`, `MonaSans-Italic.ttf` — they are public URLs and never change): upstream v2.0.27 with all five sets baked into the glyph mapping, so `a` *is* `a.ss05`, `g` *is* `g.ss06`, and so on. The CSS above stays — it costs nothing against a frozen file and it rescues any surface that loads a stock build — but nothing depends on it any more. **No plain Mona Sans is carried anywhere in this system**, deliberately: a stock build renders clean, readable text in the wrong letterforms, so the failure is invisible until someone who knows the brand looks at a `g`. The weight axis default is moved from 200 to 400 in both files, so type that sets no weight renders Regular rather than Thin; the 200–900 range is untouched.

**Correction, 19 September 2026.** This section and the brand book used to justify self-hosting on the grounds that the Google Fonts build strips the stylistic-set tables. That is not true — measured against the live build, ss03, ss05, ss06 and ss07 all change metrics, so the features are present and any surface that can request them gets them. Self-hosting stands on version pinning and on the surfaces that cannot request features at all; a hosted build is a legitimate choice anywhere the features can be turned on.

| Set | Feature | Letterform |
| --- | --- | --- |
| `ss03` | on | Lowercase `l` with tail |
| `ss05` | on | Double-storey `a` |
| `ss06` | on | Double-storey `g` |
| `ss07` | on | Square `G` |
| `ss09` | on | `Q` with diagonal arm |

```css
/* the `font` shorthand resets both — enforce on * where inline fonts are used */
* { font-feature-settings: "ss03" on, "ss05" on, "ss06" on, "ss07" on, "ss09" on; font-optical-sizing: none; }
```

### Optical size

Mona Sans has an optical-size axis (`opsz`, 0–100). **It is pinned to 0 on every surface** with `font-optical-sizing: none`, set on `*` beside the feature settings (the `font` shorthand resets it too). Browsers otherwise drive the axis from the font size, which tightens display type — and the surfaces that cannot follow (the artifact kit's subset, PNG exports, the matplotlib statics, all instanced at `opsz` 0) would then set the same headline wider than the brand book does. One headline, one shape, everywhere. Use `font-optical-sizing`, not `font-variation-settings`: the latter replaces every other axis setting declared on the element.

---

## Voice

Leaf sounds commercially sharp, technically credible, plain-spoken, evidence-led, and willing to challenge weak marketing norms. The strongest writing starts with a commercial mechanism, explains why it matters now, and lands on a practical consequence for ecommerce operators.

### Principles

- Lead with the mechanism before the claim — what's changing in the system, not just the benefit.
- Translate technical depth into commercial consequence: targeting quality, bidding efficiency, wasted spend, reporting confidence, margin, decision speed.
- Use operator language; write for founders, growth / ecommerce leads, performance marketers, finance leads, and agency operators.
- Make the uncomfortable point without blaming the buyer, their team, or their agency.
- Make uncertainty visible — mark proof, metrics, and dated claims that need verification before external use.

### Language patterns

- **Use:** performance intelligence, post-attribution era, reliable / first-party signal data, tracking accuracy, signal quality, wasted spend, targeting quality, bidding efficiency, customer match rates, consent-aware data pipelines, unit economics, shared metric definitions, decision-grade reporting, board-ready numbers, forecasting.
- **Use carefully:** "better performance" (tie to the mechanism), "data accuracy" (name the context: platforms, GA4, attribution), "ROI" (state assumptions), "agency" (only when the contrast needs it).
- **Avoid:** "unlock growth", "seamless solution", "game-changing", "trusted partner" (unless immediately proven), "single source of truth" (unless substantiated), "real ROAS" / exact attribution certainty, "kill your spreadsheets", white-label framing for Signal or Answers, generic SaaS calm that hides the cost of inaction.

### Mechanics

- **UK English** — optimisation, behaviour, personalisation, analyse, centre. Native spelling for platform / product names (e.g. Meta Advantage+ shopping).
- **Product names capitalised** — Signal, Answers, Watcher, Leaf Schema. Watcher is Signal's monitoring component; not a generic term.
- Sentence case headings; em dashes for asides; plain straight quotes; no exclamation marks; no emojis in external or sales copy.
- Don't casually call Leaf an agency; use "not a conventional agency" only when a contrast is required.
- Length by artifact: cold outreach = one mechanism, one consequence, one ask; landing pages / decks = mechanism + cost, then proof, then offer; proposals = business context → constraint → plan; thought leadership = mechanism-first argument ending on an operator takeaway.

### Calibration

How the writing should feel, not sources to copy: Linear (opinionated, craft-conscious), Stripe (technical depth in clear commercial language), 37signals (challenge-the-norm confidence), dbt Labs (opinionated definition layer), Segment (data reliability as infrastructure).

---

## Microcopy

The brand voice (commercially sharp, plain-spoken, evidence-led, sentence case) applied to the small moments. Lead with what happened, then what to do — verb-first, one idea, present tense. Never blame the user, never bury the action.

- **Errors** — reassure, don't blame. Say what failed and the one thing to do next; no codes, no "invalid", no fault. "We couldn't connect to Shopify. Check the store URL and try again."
- **Empty states** — point to one action. Name what's missing without apology, then offer the single next step. "No reports yet. Connect a source to get started."
- **Confirmations** — name the consequence. Ask the real question; the button repeats the verb ("Delete report", never "OK"/"Submit"). "Delete this report? This can't be undone."
- **Buttons & labels** — verb-first and specific ("Create report", not "Submit"). Sentence case; keep proper nouns capitalised (Signal, Answers, Shopify, Leaf).

---

## Spacing & layout

- **Base unit 4px, 8px rhythm.** Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- **Content max-width** 1200px, centred. **Section padding** `clamp(56px, 7vw, 96px)` vertical, `clamp(20px, 5vw, 56px)` horizontal.
- **Grid** 12 columns, 16px gutter default. Use CSS grid / flex with `gap` — never margin-based spacing between siblings.
- **Radius:** `sm 8px` (chips, small controls) · `md 14px` (cards, tiles) · `lg 18px` (large panels, hero blocks) · `pill 999px` (buttons, tags).

---

## Elevation & borders

Leaf is **flat by default**: surfaces are separated by 1px hairline borders (`rgba(23,20,18,0.10)` on light, `rgba(255,253,251,0.12)` on dark) and by background tone, not by shadow.

One soft, warm-tinted shadow exists for **lifted or transient surfaces only** — dropdowns, popovers, modals, and hover states. It reads as quiet texture, not depth theatre, and is the foundation for minimal motion (a small hover lift).

- `shadow.sm` — `0 1px 2px rgba(23,20,18,0.05), 0 2px 6px rgba(23,20,18,0.05)` — hover, resting cards that need faint lift.
- `shadow.md` — `0 4px 12px rgba(23,20,18,0.08), 0 12px 28px rgba(23,20,18,0.07)` — menus, modals, overlays.

Never stack shadow *and* a heavy border on the same element; pick one separation cue.

---

## Interaction states

- **Focus** — `2px solid Coral` outline, `2px` offset (`focus-visible` only). On Ink / dark surfaces use Aqua. Never remove focus outlines.
- **Hover** — buttons shift fill (primary → `#E8462F`, secondary → `#FBE4DF`); cards/links may lift with `shadow.sm`. Keep transitions 120–180ms.
- **Disabled** — `not-allowed` cursor, and opacity by what the control has to convey. **40%** where the disabled state is carried by a shape or by a label outside the control: Button, Checkbox, Radio, Switch. **70%** where the control still displays a value the user may need to read — Input and Select. A locked field showing a workspace name or a plan's currency is content, and Ink at 40% on Canvas is 2.57:1 against 6.76:1 at 70%. WCAG exempts inactive controls from contrast, so 40% is permitted there; it is still the wrong call for a control whose whole job is to show something. Never signal disabled by colour alone.
- **Links** — Coral default, Ink on hover; underline on hover for inline/body links (not for nav or button-style links).

---

## Accessibility

A foundation, not a final pass. Target **WCAG 2.1 AA**.

- **Contrast** — body text ≥ 4.5:1; large text (≥24px or ≥19px bold) and UI edges ≥ 3:1. Ink on Canvas/Stone always passes; the copy-colour rule exists to guarantee it.
- **Never colour alone** — pair colour with a second cue: deltas carry a ▲/▼ glyph, series carry direct labels, status banners carry an icon. Meaning must survive greyscale and colour-blindness.
- **Focus & targets** — a visible 2px Coral focus ring (Aqua on dark) on every interactive element; hit targets ≥ 44px; full keyboard reach with logical tab order.
- **Motion & semantics** — honour `prefers-reduced-motion`; use real headings, labelled inputs, and alt text on meaningful imagery. Motion and colour are never the only cue.

### Ratified exceptions

Four rows below, covering three kinds of exception. They were measured, argued and signed off by the CEO — an audit that surfaces them has found the exception, not a defect. Anything *not* on this list is a defect.

| What | Ratio | Why it stands |
| --- | --- | --- |
| **Canvas on solid Coral** — primary button and pill labels | 3.04:1 | Ink on Coral measures 5.93:1 and is the higher-contrast option, but on a control it reads as a warning label rather than an action. The label is short, set at 600, and never the only route to the action — the solid Coral fill is itself the signal. Ink on Coral stays the rule for the large quiet uses: a card, a panel, a block of colour read across. |
| **Coral eyebrows and small uppercase labels** | 2.83–3.04:1 | An eyebrow is a wayfinding mark made of letters, not prose. It sits above a heading that carries the meaning and is never the only route to what follows. |
| **Coral inline links and the secondary button's label** | 3.04:1 | Underline, context or a 1px Coral border states the control as well as the colour does, so colour is never the only signal. |
| **Canvas glyphs on a solid state tone** — the tick, i and exclamation inside a badge | 3.22–5.12:1 | A 22px solid circle with a glyph in it is a graphical object, so the 3:1 non-text floor applies and all four tones clear it. This does not extend to a word of text: as copy, only Ember reaches 4.5. |

**`--leaf-text-muted` (#767065) is valid on Canvas, Light Stone and Stone-faint only** — 4.84, 4.50 and 4.61:1. On Stone it is 4.07 and on Stone-deep 3.89, so use **Warm Grey** there instead. No single grey clears 4.5 on every Leaf ground without closing on Warm Grey and collapsing the two levels of quiet text into one, so the token carries a usage rule rather than a darker value.

The licence stops where the second signal does. None of these extends to running text a reader has to read to understand the page, and none extends to Coral on a Stone ground at any size — Coral on Stone is 2.56:1 with nothing to lean on. Where a state has no second cue, contrast is not negotiable: the active sidebar item takes **Ink** on its Coral tint (15.08:1), because Coral on that tint is 2.54:1 and the fill alone was being asked to carry legibility.

---

## Dark surfaces

Ink (`#171412`) is the **dark-mode UI surface**, and that is the only place a dark ground belongs. Marketing pages, decks, covers, dividers, quote frames and social cards stay in the light Stone family: a dark background is not a Leaf look, it is a mode the product offers. Ink stays the primary text colour on every light surface, and the small dark elements that are not backgrounds — the overlay scrim, a tooltip — keep it. In dark mode:

- Text: Canvas (`#FFFDFB`) primary; `rgba(255,253,251,0.6)` secondary.
- Accent / small labels: **Aqua**.
- Coral still works as the signal — solid Coral CTAs read well on Ink.
- Borders / dividers: `rgba(255,253,251,0.12)`. Panels: `rgba(255,253,251,0.04)` fill.

---

## Motion

Minimal and purposeful. Animate `opacity` and `transform` only; 120–180ms; ease-out (`cubic-bezier(0.2, 0, 0, 1)`). Hover lifts and fades tie to `shadow.sm`. Always honour `prefers-reduced-motion: reduce`.

---

## Logos

One mark leads — the Leaf icon and wordmark. Service and property lockups extend it. Every logo ships in padded and no-padding exports; choose by context, never crop by hand.

- **Colour variants** — Coral on light; Negative (knockout) on Coral and on Ink.
- **Clear space** — padded exports carry a safe margin of 50% of the icon; don't trim it, switch to no-padding instead.
- **Minimum sizes** — icon 16px digital / 6mm print; full logo 80px / 20mm. Below the full-logo minimum, use the icon alone. Prefer SVG; PNG only when raster is required.
- **Service sub-logos** — Signal (tracking), Answers (reporting), Performance (media), Creative (content), Stores (Shopify), Strategy (SEO).
- **Special properties** — Leaf Blog (editorial), Leaf Colectivo (podcast). The Blog mark ships in colour, black, and white for watermark use.

### Misuse

Don't recolour the mark, stretch or squash it, rotate it, add shadows / glows / effects, place it on low-contrast or busy grounds, or box / crop its clear space. The logo ships finished — reach for the right export instead.

### Co-brand lockups

Two treatments (see **Photography** for the customer-frame rules):

- **Divider lockup** — `leafsignal | Partner`, joined by a hairline divider at ~60% of the lockup height. For equal partnerships and footers. Match cap height (not the bounding box); keep one leaf-icon width of clear space either side.
- **`×` cross lockup** — `Partner × leafsignal`, joined by a lowercase `×`. For customer announcements and quotes, set over photography of the customer in flight (white knockout mark). Either brand can lead; the `×` is the constant. Never merge the two into one combined mark.

---

## Iconography

- Default to **SVG**, **black** variation. Keep icon treatment consistent within a set; let colour vary by category.
- Sizes: `16 · 20 · 24 · 32 · 48`px. In coloured category tiles, the icon is ~⅓ of the shorter side.
- Pair black icons with secondary-colour fields for libraries, hubs, and editorial navigation.

---

## Imagery

Leaf imagery is **iconographic, not photographic**. Each image is a single **black isometric line icon from the icon library, optically centred on a flat field of one secondary colour** — the same convention as the Leaf Studio banners.

- **One icon, centred** — sized to ~¼ of the shorter edge, generous margin; never a cluster, never full-bleed.
- **Flat secondary field** — one solid secondary colour, matched to topic (people → Heather, decisions → Harbor, momentum → Marigold). Never Coral, never a gradient, never a photo.
- **Black line only** — icons stay black line-art on the colour: no fills, no drop shadows, no recolouring to match the field. Contrast carries it.
- **No** stock photography, 3D renders, gradient meshes, text-in-image, or multiple icons per field.
- Rotate field colours across a set for rhythm; reuse library icons so imagery and UI stay one family.

---

## Photography

Photography is the **deliberate exception** to the iconographic rule above. Leaf mostly stays out of the frame — for the most part we stand back and let our brands be lifted, gaining through the association. We reach for photography only to **showcase customers in flight**: brand announcements, partner launches, and customer quotes.

- **Use it for brand-association moments** — launches, partnerships, customer stories and quotes. **Never** for product UI, system imagery, or decoration — those stay iconographic.
- **Let the partner own the frame** — real, warm, in-context imagery of the customer's brand and products. It should feel like the customer, not like Leaf. Never recolour or filter a partner's photography to Leaf's palette.

### Co-brand lockup

Whenever we share a customer's frame the two marks lock up as **`Partner × leafsignal`**, joined by a lowercase `×`.

- **Equal billing, light touch** — partner mark and leafsignal at the same visual weight; Leaf never outsizes the customer it's celebrating.
- **White knockout on imagery** — on photography the Leaf lockup is the Canvas (white) mark, set in a calm corner with clear space. No box, no heavy scrim beyond what the photo gives.
- **Either brand can lead** — order flips by channel (partner-first on their story, Leaf-first on ours); the `×` is the constant.

### Customer quotes

For quotes and customer stories the subject anchors the frame and their words lead, set on **Stone** (`#F2E8E1`):

- **The image is not optional.** A customer quote always carries a photograph, and the photograph is always the customer in context — their brand, their product, their people. No image, no quote slide: make the point in writing instead.
- **On social and in announcements** the frame carries the **`Partner × leafsignal` lockup** in white knockout, in a calm corner with clear space — equal visual weight, Leaf never larger. The customer is celebrated, not replaced.
- **In a deck, no mark goes on the photograph.** The deck is already Leaf's and the attribution names the customer, so a lockup on the image says it a third time. If the image carries a mark at all it is the customer's own, never Leaf's.
- The quote is the largest element — Ink type on Stone, opened and closed by **oversized Coral quotation marks**. Coral appears once and nowhere else in the frame.
- Crop the subject to one edge so the quote breathes. Attribution is name, role and company.
- A campaign line (e.g. "Elevating the Game") sits small in a corner in Warm Grey — a signature, never a headline.

---

## Product patterns

The building blocks behind Answers and internal tools, at working density.

### Tables & data density

- **Quiet header** — faint Stone tint (`#FBF7F4`) with **Ink** labels (`11/600` (`ui-micro`), `+0.02em`) over a 1.5px bottom rule. The tint (not a heavy Ink fill) is what makes the header recede, while Ink labels keep them legible — Warm Grey on Stone is too low-contrast at this size. Avoid a full Ink header bar; it out-shouts the numbers that matter.
- Right-align numerics and set them in **tabular figures** (`font-variant-numeric: tabular-nums`).
- Hairline row dividers (`border-light`); optional zebra tint `#FBF7F4`.
- Bring in the diverging heatmap scale (Harbor→Coral tints) for a scanned metric column; reserve Fern/Ember for the delta column only.
- Inline mini-bars for magnitude are fine; keep them one colour per column.

### Forms & inputs

- Canvas fields, 1px `border-light`-weight border (`rgba(23,20,18,0.18)`), `radius.md`.
- Labels Ink `13/600`; help text Warm Grey `caption`.
- **Coral is the active/selected state** — 2px Coral focus ring (always visible), filled toggle, checked box. Never signal state by border removal.

### Empty / loading / error

- **Empty** — muted Stone icon chip, Ink title, Warm Grey line, one primary (Coral) action.
- **Loading** — Stone (`#F2E8E1`) skeleton blocks; prefer skeletons over spinners wherever layout is known.
- **Error** — Ember accent (border + icon chip), Ink title, Warm Grey detail, secondary (Ember-outline) retry. Reassure; never blame.

### Alerts & banners

One structure across the four state colours: **soft-tint fill + 1px tint border on all four sides**, a solid state-colour badge/icon, and **Ink body copy** (never colour the message text — the badge carries status). **No left accent bar.** The fill, the border and the badge each already name the state; a heavier edge on one side is a fourth telling of the same thing, and a bar down the left of a card reads as a template rather than a considered layout. Info = Tidal, Success = Fern, Warning = Amber, Error = Ember. Lead with what happened in bold, then the consequence; one line where possible. **Coral never appears in a status banner** — brand signal and status stay separate.

**Tags follow the same construction, and take Ink.** A tag is a tint fill, a 1px tint border and **Ink** text — never coloured text on its own tint. Featured and count tags were Coral on Coral tint at 2.54:1; the fill and the Coral edge (`--leaf-border-brand`) mark them as brand-flavoured, and the label stays readable. The neutral tag takes Ink on Stone for the same reason. This is the tag case of the wider rule: where a state has no second cue, contrast is not negotiable.

### Number & format conventions

- **Currency** — symbol + abbreviate at ≥1M (`£1.49M`, K/M/B); full value (`£1,490,000`) only in tables.
- **Ratios / percent** — ratios to 2 dp with a lowercase `x` (`3.72x`, matching ROAS convention — not the `×` glyph, which sits mid-height and reads small); percentages to 1 dp (`24.6%`); no space before `%` or `x`.
- **Delta** — signed with a ▲/▼ triangle; Fern up, Ember down; always relative to a stated baseline.
- **Dates** — day-month-year, month abbreviated, no ordinals (`1 Jun 2026`); ranges `1–30 Jun`.
- **Alignment** — tabular figures, right-aligned in tables; thousands separators always.
- **Zero & null** — real zero is `0`; missing data is an em-dash `—` in Warm Grey. Never blank, never `0` for missing.

### Charts at small size & in print

Thumbnails, deck tiles, PDF: drop gridlines and ticks, keep one direct label per series, raise line weight to ≥2.5px, bake key numbers in (no hover reliance). Export chart SVGs as raster (`data-om-raster`) so they survive PPTX/PDF.

---

## Navigation & app shell

Every product screen shares one frame: a persistent **sidebar** (place), a **top bar** (context + global actions), and **tabs / breadcrumbs** (depth). Flat surfaces, hairline separation, and Coral marking exactly one thing — where you are.

### Sidebar

- 236px panel on a faint Stone tint (`#FBF7F4`) with a 1px right hairline. Items are a black line icon (library style, ~20px) + sentence-case label, `radius.sm`.
- **States:** rest = Ink; hover = a quiet Ink wash (`--leaf-surface-hover`); **active = the one Coral signal, carried by the fill** — soft tint (`#FBE4DF`) behind **Ink** text and icon at 600, no accent bar. The text stays Ink because Coral on its own tint measures 2.54:1, which fails even the 3:1 floor; the fill and the weight mark the state, and they do it without asking colour to carry legibility. Active keeps the resting padding, so the label holds its position when an item activates rather than nudging sideways. Counts/badges sit right-aligned in a Coral-tint pill.
- Group with short uppercase Warm-Grey labels (`11/600`, `+0.07em`). Order is stable; never icon-only except in the collapsed rail.
- **Collapsed rail:** 60px icon-only rail at tight widths — same order, same active tint, no accent, labels on hover.

### Top bar

- 58px, Canvas, 1px bottom hairline. **Left:** menu toggle, then the breadcrumb trail. **Right:** search pill, one primary Coral action, account avatar.
- **Breadcrumbs:** light chevron separators (`--leaf-text-muted`); ancestors are Coral links, only the current page is Ink + semibold.

### Tabs

In-page sections only — never top-level navigation. Active carries a 2px Coral underline; inactive labels are Warm Grey. Sentence case.

### Rules

- **One Coral moment** in the shell — the active nav item. The primary top-bar action may also be Coral only because nav uses the tint-and-accent treatment, not a second solid.
- Breadcrumb + page title answer "where and what"; tabs slice the page, not the app. Search and account stay top-right everywhere.

---

## Overlays

Overlays are the one place Leaf leaves the flat plane. Reach for the lightest one that does the job — tooltip → menu → popover → drawer → modal.

- **Elevation** — every overlay is Canvas with a 1px hairline edge and `shadow-md`. Never a heavier shadow, never shadow + thick border.
- **Scrim** — modals and drawers dim the page with an Ink scrim at ~44%. Menus, popovers, and tooltips never dim the page.
- **Focus** — trap focus in modals and drawers and return it to the trigger on close; Aqua focus ring on dimmed dark ground. Esc and outside-click close everything.
- **Motion** — fade + 8px rise (drawers slide from the edge), 180ms ease-out; honour reduced-motion.

**By type:**
- **Tooltip** — short label on Ink, Canvas text, `radius.sm`; hover/focus only, never interactive or essential.
- **Menu** — actions from a trigger; highlighted row is a quiet Ink wash (`--leaf-surface-hover`), destructive item in Ember, hairline divider before it. No scrim.
- **Popover** — rich/interactive content anchored to its trigger with a small beak; Canvas, hairline, `shadow-md`, no scrim.
- **Drawer** — edge panel over the scrim for scoped, longer tasks; square outer corners against the viewport, one Coral confirm.
- **Modal** — centred on the scrim, Canvas card at `radius.lg` + `shadow-md`, one decision. Destructive primary uses **Ember, not Coral**. Close on ×, Esc, or scrim click.

---

## Responsive & grid

The same tokens hold from phone to wide monitor: a 12-column grid collapses in steps, type and section padding flex with `clamp()`, and the app shell rearranges rather than redraws. (Lives in the component library alongside the shell.)

### Breakpoints

| Token | Name | Range | Grid |
| --- | --- | --- | --- |
| `sm` | Mobile | < 640 | 4 col · 16px gutter · 20px margins |
| `md` | Tablet | 640–1024 | 8 col · 16px gutter · fluid margins |
| `lg` | Desktop | 1024–1440 | 12 col · 1200px max, centred |
| `xl` | Wide | > 1440 | 12 col · wider gutters, content holds |

### Grid & fluid scale

- Content capped at 1200px, centred. Columns halve in steps (12 → 8 → 4), never reflow arbitrarily.
- Display/H1 scale with the viewport (`clamp(46,8vw,84)`, `clamp(34,4.4vw,52)`); **body stays fixed at 16px** for readability. Section padding flexes `clamp(56,7vw,96)`.

### Shell adaptation

Full sidebar on desktop → 60px icon rail on tablet → bottom tab bar on mobile (top bar keeps the menu toggle + title). Same order, same active Coral signal at every width.

### Rules

- **Touch before hover** — targets ≥ 44px; nothing hides behind hover (tooltips/hover menus get a tap equivalent).
- **Stack, don't shrink** — multi-column layouts collapse to one column in priority order; cards keep padding and radius.
- **Keep the action reachable** — primary action sticky bottom on mobile, top-right on desktop; modals become full-height sheets under 640px.

---

## Brand in the wild

The small surfaces where Leaf shows up outside the product. Small canvases, same system: the mark in Coral, Stone-family grounds, sentence case, one accent. (Lives in the brand book.)

- **Favicon & app icon** — the Leaf **icon** (never the wordmark) on a solid Coral tile; ships at 16 / 32 / 180px. Full wordmark is never cropped into a square.
- **Social / link-preview (OG) card** — 1200×630, Stone ground (never Ink — see Dark surfaces), Coral wordmark, one Coral accent, headline in the brand voice. Never a photo behind the wordmark — that treatment is for co-brand posts (see Photography).
- **Email signature** — live HTML text (not an image): name, one line of role, Coral links for address/site. Survives dark mode and high-DPI.

---

## Governance & versioning

The system is at **v1.0** — every section is ratified and locked. It stays a living document.

- **Versioning** — patch (copy / typo / token value), minor (new component or guidance, backwards-compatible), major (a rule change that breaks existing artifacts). The brand book and component library carry the same version.
- **Changes & exceptions** — proposals and exception requests go to the Creative team (creative@leaf.fm) for review before anything ships off-system. Merges update this doc, the brand book, and the component library together.
- **Cadence** — reviewed quarterly; the changelog at the top records each release.

**Shipped in v1.0:** core system, typography + scale, colour + state palette, voice, logos, icons, **imagery**, **photography**, data visualization, product patterns (tables, forms, empty/loading/error, alerts & banners, number & format, small/print charts), the consolidated accessibility foundation, foundation primitives (spacing, layout, radius, elevation, motion, interaction states, dark surfaces), **navigation & app shell** (sidebar, top bar, tabs, breadcrumbs), **overlays** (modals, drawers, tooltips, popovers, menus), the **component catalog** (buttons, inputs, selection controls, badges & tags — variant × state), **microcopy** (errors, empty states, confirmations), and **responsive / grid** (breakpoints, 12-col grid, fluid scale, shell adaptation), and **brand in the wild** (favicon/app icon, social OG card, email signature). Product-layer sections (catalog, patterns, app shell, overlays, responsive) now live in the standalone **component library**, keeping the brand book brand-only.

---

## Data visualization

Answers is mostly data visualization, so the brand has to hold up in charts. Coral leads the number that matters; the categorical palette carries series; the state palette carries good-and-bad; structure stays quiet.

### Categorical series palette (fixed order)

Multi-series charts use this sequence so a given series keeps the same colour across every chart:

1. Coral `#FB5E48` — primary / focus series
2. Harbor `#4FA3A6`
3. Marigold `#EFB75A`
4. Heather `#AAA2D4`
5. Laurel `#8EBB91`
6. Apricot `#F4A38F`

**Series 1–3 each carry a sequential ramp; series 4–6 are categorical only.** Coral, Harbor and Marigold have four-step ramps below, so a chart can move from categorical to intensity — a funnel, a heatmap, a density plot — without changing hue family or inventing a colour. Reach past series 3 only when you genuinely need a fourth category, and never for a measure of intensity.

Use the fewest series possible; mute comparison series in Harbor or Warm Grey so the Coral series leads. Palette colours are fine as chart *fills* (large marks) even though they're barred from text.

### Lead options

Two leads, chosen per chart:

- **Coral lead** (default) — single-focus charts and headline metrics where one series is the point.
- **Neutral lead** — dense dashboards and many equal-weight series. A warm graphite (`#8C857E`, mono ramp `#C9C2BB → #8C857E → #3F3A36`) carries the set so no colour implies ranking, and **Coral flags only the one series that matters**. Use this before reaching for six saturated series at once.

### Sequential ramps (single measure)

Three hue ramps and one neutral. **Coral and Harbor were picked by hand**; Marigold was generated to sit beside them, as the base colour 82% toward Canvas, 40% toward Canvas, the base itself, then 22% toward black. That formula is a fit to what the first two do, not a description of them — run it on Coral and you get `#FEE0DB / #FD9E90 / #C44938` against the committed `#FBE4DF / #F7A08F / #C0392A`. Use it to generate a *new* ramp, then adjust by eye; do not use it to regenerate Coral or Harbor.

- **Coral:** `#FBE4DF → #F7A08F → #FB5E48 → #C0392A` — intensity/density of one measure.
- **Harbor:** `#DDECEC → #9FC7BC → #4FA3A6 → #2E8388` — cooler alternative when Coral would read as alarm.
- **Marigold:** `#FCF0DE → #F5D39A → #EFB75A → #BA8F46` — the third ramp, so a categorical chart can run three series in tints rather than at full saturation. Generated to sit beside the other two: step 1 is the base 82% toward Canvas, step 2 is 40%, step 3 is the base, step 4 is 22% toward black. Coral and Harbor were hand-picked and do not reproduce from that formula — it is a fit to them, close enough that the three read as a family. Unlike Coral and Harbor it has no dark anchor — every step takes **Ink** text, including step 4 (6.20:1), because Canvas on it is only 2.91:1.
- **Graphite mono (neutral lead):** `#C9C2BB → #8C857E → #3F3A36` — three steps rather than four, numbered light-to-dark like the hue ramps. Use it when a dense dashboard has many equal-weight series and no one of them is the point, with Coral flagging the single series that is. Tokens are `--leaf-chart-mono-1/2/3`; the mid step `#8C857E` is the one that carries a neutral-lead set.

### Status in charts

Good-and-bad uses the **state palette only** — Fern for positive deltas, Ember for negative, Warm Grey for neutral. Never repurpose a series colour to mean status, and never use Fern/Ember for an ordinary series.

### Answers chart patterns

- **Combo (bar + line)** — volume as bars (Harbor or graphite), the rate/ratio as a Coral line on a secondary axis. The line is always the Coral focus.
- **Waterfall** — Coral for the start and net-total bars, graphite (`#8C857E`) for the floating steps between.
- **Funnel** — stages in categorical order (Harbor → Marigold → Coral), on step 2 of each ramp, narrowing by volume, Ink labels.
- **Heatmap table** — diverging tint scale, Harbor tints (`#DDECEC → #9FC7BC`) for good and Coral tints (`#FBE4DF → #F7A08F`) for watch, neutral `#EFEAE6` at the midpoint. Ink text; hairline gaps, no borders.

### Structure

- Gridlines: hairline `rgba(23,20,18,0.07)`; baseline/zero line `rgba(23,20,18,0.16)`.
- Axis labels, ticks, and legends: Warm Grey, `type.caption`/`type.label`, sentence case.
- Label series directly where space allows. No chart junk: no 3D, no drop shadows, no heavy borders, no gradients outside a defined ramp.
- Chart surfaces are Canvas cards with the standard hairline border and `radius.lg`.

---

## Palette tables

The base palette the whole system builds on. Token names live in `tokens/colors.css`; the values here and there must never differ.

### Core

| Name | Hex | Role |
| --- | --- | --- |
| Coral | `#FB5E48` | The brand signal — one decisive moment per view |
| Coral hover | `#E8462F` | Primary button hover |
| Coral tint | `#FBE4DF` | Soft content blocks, active-state fills |
| Ink | `#171412` | Primary text; the dark-mode UI surface |
| Canvas | `#FFFDFB` | Clarity surface — cards, fields |

### Neutral

| Name | Hex | Role |
| --- | --- | --- |
| Light Stone | `#F9F4F1` | Default page ground |
| Stone faint | `#FBF7F4` | Sidebar, table headers, zebra rows |
| Stone | `#F2E8E1` | Surface, skeletons, muted chips |
| Stone deep | `#EDE3DC` | Deeper stone ground |
| Stone hairline | `#D9CFC8` | Off-state controls |
| Warm Grey | `#656565` | Secondary text |

### Highlight

| Name | Hex | Role |
| --- | --- | --- |
| Aqua | `#7AD8CE` | Small labels and accents on Ink / dark-mode surfaces only |

### Secondary (fills only, never text — every one takes Ink text)

| Name | Hex | Mood |
| --- | --- | --- |
| Marigold | `#EFB75A` | Warm |
| Butter | `#F6E49D` | Warm |
| Apricot | `#F4A38F` | Warm |
| Rosehip | `#D96B7C` | Expressive |
| Sage | `#DCE8C4` | Fresh |
| Laurel | `#8EBB91` | Fresh |
| Eucalyptus | `#9FC7BC` | Calm |
| Harbor | `#4FA3A6` | Calm |
| Lilac | `#D8CFF0` | Cool |
| Heather | `#AAA2D4` | Cool |

---

## Implementation tokens

```css
:root {
  /* --- state palette --- */
  --leaf-color-state-success: #2f8b57;
  --leaf-color-state-success-tint: #e7f1ea;
  --leaf-color-state-warning: #c77e1c;
  --leaf-color-state-warning-tint: #f6e9cc;
  --leaf-color-state-error: #c63a2b;
  --leaf-color-state-error-tint: #f7e0db;
  --leaf-color-state-info: #2e8388;
  --leaf-color-state-info-tint: #ddecec;

  /* --- coral usage --- */
  --leaf-color-coral-hover: #e8462f;
  --leaf-color-coral-tint: #fbe4df;

  /* --- data-viz categorical series (fixed order) --- */
  --leaf-chart-series-1: #fb5e48; /* Coral — focus */
  --leaf-chart-series-2: #4fa3a6; /* Harbor */
  --leaf-chart-series-3: #efb75a; /* Marigold */
  --leaf-chart-series-4: #aaa2d4; /* Heather */
  --leaf-chart-series-5: #8ebb91; /* Laurel */
  --leaf-chart-series-6: #f4a38f; /* Apricot */
  --leaf-chart-grid: rgba(23, 20, 18, 0.07);
  --leaf-chart-axis: rgba(23, 20, 18, 0.16);

  /* --- spacing --- */
  --leaf-space-1: 4px;
  --leaf-space-2: 8px;
  --leaf-space-3: 12px;
  --leaf-space-4: 16px;
  --leaf-space-5: 24px;
  --leaf-space-6: 32px;
  --leaf-space-7: 48px;
  --leaf-space-8: 64px;
  --leaf-space-9: 96px;

  /* --- radius --- */
  --leaf-radius-sm: 8px;
  --leaf-radius-md: 14px;
  --leaf-radius-lg: 18px;
  --leaf-radius-pill: 999px;

  /* --- layout --- */
  --leaf-container-max: 1200px;

  /* --- borders --- */
  --leaf-border-light: rgba(23, 20, 18, 0.1);
  --leaf-border-dark: rgba(255, 253, 251, 0.12);

  /* --- elevation --- */
  --leaf-shadow-sm: 0 1px 2px rgba(23, 20, 18, 0.05), 0 2px 6px rgba(23, 20, 18, 0.05);
  --leaf-shadow-md: 0 4px 12px rgba(23, 20, 18, 0.08), 0 12px 28px rgba(23, 20, 18, 0.07);

  /* --- motion --- */
  --leaf-motion-fast: 120ms;
  --leaf-motion-base: 180ms;
  --leaf-ease: cubic-bezier(0.2, 0, 0, 1);

  /* --- type: Interface (web and marketing) --- */
  --leaf-type-display: 700 64px/0.96 "Mona Sans";
  --leaf-type-h1: 700 46px/1.0 "Mona Sans";
  --leaf-type-h2: 700 32px/1.05 "Mona Sans";
  --leaf-type-h3: 600 22px/1.2 "Mona Sans";
  --leaf-type-body-lg: 400 18px/1.55 "Mona Sans";
  --leaf-type-body: 400 16px/1.6 "Mona Sans";
  --leaf-type-label: 500 14px/1.4 "Mona Sans";
  --leaf-type-caption: 500 13px/1.4 "Mona Sans";

  /* --- type: Editorial (Source Serif 4) --- */
  --leaf-type-serif-headline: 800 34px/1.08 "Source Serif 4";
  --leaf-type-serif-quote: italic 500 24px/1.3 "Source Serif 4";

  /* --- type: Product (dense application views) --- */
  --leaf-type-ui-title: 700 24px/1.15 "Mona Sans";
  --leaf-type-ui-figure: 640 24px/1.0 "Mona Sans";
  --leaf-type-ui-figure-sm: 640 20px/1.0 "Mona Sans";
  --leaf-type-ui-heading: 600 16px/1.25 "Mona Sans";
  --leaf-type-ui-body: 400 14px/1.5 "Mona Sans";
  --leaf-type-ui-label: 500 13px/1.2 "Mona Sans";
  --leaf-type-ui-micro: 600 11px/1.2 "Mona Sans";

  /* --- type: Slides (1920x1080 canvas) --- */
  --leaf-type-slide-display: 700 128px/0.96 "Mona Sans";
  --leaf-type-slide-h1: 700 92px/1 "Mona Sans";
  --leaf-type-slide-h2: 700 64px/1.05 "Mona Sans";
  --leaf-type-slide-h3: 600 44px/1.2 "Mona Sans";
  --leaf-type-slide-figure: 640 128px/0.96 "Mona Sans";
  --leaf-type-slide-body-lg: 400 36px/1.55 "Mona Sans";
  --leaf-type-slide-body: 400 32px/1.6 "Mona Sans";
  --leaf-type-slide-label: 500 28px/1.4 "Mona Sans";
  --leaf-type-slide-caption: 500 26px/1.4 "Mona Sans";
  --leaf-type-slide-serif-headline: 800 68px/1.08 "Source Serif 4";
  --leaf-type-slide-serif-quote: italic 500 48px/1.3 "Source Serif 4";

  --leaf-type-features: "ss03" on, "ss05" on, "ss06" on, "ss07" on, "ss09" on;  /* always on */

  /* --- tracking --- */
  --leaf-type-tracking-title: -0.03em;        /* 54px and below */
  --leaf-type-tracking-title-large: -0.02em;  /* above 54px */
  --leaf-type-tracking-slide: 0.015625em;     /* slide scale only */

  /* --- borders and surfaces added in v2.0 --- */
  --leaf-border-strong: rgba(23, 20, 18, 0.3);
  --leaf-border-brand: rgba(251, 94, 72, 0.28);
  --leaf-border-success: rgba(47, 139, 87, 0.28);
  --leaf-border-warning: rgba(199, 126, 28, 0.28);
  --leaf-border-error: rgba(198, 58, 43, 0.28);
  --leaf-border-info: rgba(46, 131, 136, 0.28);
  --leaf-surface-hover: rgba(23, 20, 18, 0.05);
  --leaf-shadow-control: 0 1px 2px rgba(23, 20, 18, 0.2);
}
```

> Merge with the base `:root` block (core, neutral, highlight, secondary colour tokens + font tokens). These values live in `tokens/*.css`; the block above and those files must never differ.
