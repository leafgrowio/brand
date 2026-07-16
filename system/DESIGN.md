# Leaf Design Foundations

This document is the written source of truth for Leaf's design system. It pairs with two visual references: the **brand book** (`Leaf Brand Book.dc.html`) for brand foundations, and the **component library** (`Leaf Component Library.dc.html`) for the application layer. Where any of them disagree, fix all. Keep the split clean: brand-level language (foundations, colour, type, voice, logos, icons, imagery, photography, data viz, applications preview) lives in the brand book; product components (catalog, patterns, app shell, overlays) live in the component library.

Status: v1.0 — ratified 16 July 2026. All sections locked.
Source: core brand reference (June 2026) + v1.0 ratification (July 2026).

---

## Changelog

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
- **Coral** — emphasis, eyebrows, links, small brand accents.
- **Warm Grey** — secondary text on Light Stone, Stone, and Canvas (passes AA; avoid at very small sizes on Stone).
- **Aqua** — small labels and accents on Ink / dark surfaces only.

Do **not** set copy in the secondary palette, in Stone tones, or in pale tints — their tones can't guarantee contrast at text sizes. Build small-text hierarchy with **weight**, not faint colour.

Exception: a **state tone may label its own status** — a Fern "success" or Ember "error" heading — at title size and weight.

### Coral usage

Coral carries action and brand signal; it is not a large content fill.

- **Primary button** — solid Coral (`#FB5E48`), Canvas text, pill shape. Darkens to `#E8462F` on hover. One primary per view.
- **Secondary button** — transparent, 1px Coral border, Coral text, pill shape. Soft-tint (`#FBE4DF`) fill on hover. Kept visually lighter than the primary so it never competes.
- **Coral content blocks** (cards, panels, slides) — use **soft Coral** (`#FBE4DF` tint) with Ink text, not a solid fill. Reserve solid Coral for CTAs and small brand marks.
- Never Canvas/white text on Coral for anything longer than a short button label (white-on-Coral is 3.09:1, large-text only).

### Product state palette (dedicated)

Status needs more depth than the secondary palette can give. States use their own small palette — tuned to sit beside Coral and the neutrals, but drawn outside them. Use the **solid** tone for icons, dots, and borders; use the **soft tint** with **Ink** text for banners and backgrounds. Error stays clear of Coral so the brand signal never reads as an alarm.

| Token | Name | Solid | Tint | Role |
| --- | --- | --- | --- | --- |
| `color.state.success` | Fern | `#2F8B57` | `#E7F1EA` | Success, positive confirmation |
| `color.state.warning` | Amber | `#C77E1C` | `#F6E9CC` | Warning, needs attention |
| `color.state.error` | Ember | `#C63A2B` | `#F7E0DB` | Error, destructive |
| `color.state.info` | Tidal | `#2E8388` | `#DDECEC` | Informational, neutral status |

### Approved text pairings

**Ink on colour, Canvas on the darks.** Every Coral, Aqua, secondary, and state-tint fill takes **Ink** text. Only the dark anchors take **Canvas**: Ink, Warm Grey, the solid state tones (Fern, Ember, Tidal), and Coral — the last for large text only (white-on-Coral is 3.09:1).

---

## Typography

Mona Sans is the working font; Source Serif 4 is the editorial serif (headlines `800`, pull quotes italic `500`). Serif is never used for UI, tables, forms, nav, or small labels.

### Type scale

| Token | Size / line-height | Weight | Use |
| --- | --- | --- | --- |
| `type.display` | 64 / 0.96 | 640 | Hero statements |
| `type.h1` | 46 / 1.0 | 640 | Page / section titles |
| `type.h2` | 32 / 1.05 | 600 | Sub-sections |
| `type.h3` | 22 / 1.2 | 600 | Card and block titles |
| `type.body-lg` | 18 / 1.55 | 400 | Marketing body, intros |
| `type.body` | 16 / 1.6 | 400 | Default product / long text |
| `type.label` | 14 / 1.4 | 500 | Buttons, nav, metadata |
| `type.caption` | 13 / 1.4 | 500 | Smallest supporting text |

Display/H1 are fluid on marketing surfaces (`clamp()`); the values above are the desktop anchors. Tighten large headings with negative letter-spacing (~-0.03em display, -0.02em headings).

### Stylistic sets

Mona Sans is a variable font. Five OpenType stylistic sets are **always on**, set once at the root so every surface inherits the same letterforms:

| Set | Feature | Letterform |
| --- | --- | --- |
| `ss03` | on | Lowercase `l` with tail |
| `ss05` | on | Double-storey `a` |
| `ss06` | on | Double-storey `g` |
| `ss07` | on | Square `G` |
| `ss09` | on | `Q` with diagonal arm |

```css
/* the `font` shorthand resets this — enforce on * where inline fonts are used */
* { font-feature-settings: "ss03" on, "ss05" on, "ss06" on, "ss07" on, "ss09" on; }
```

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
- **Disabled** — 40% opacity + `not-allowed` cursor. Never signal disabled by colour alone.
- **Links** — Coral default, Ink on hover; underline on hover for inline/body links (not for nav or button-style links).

---

## Accessibility

A foundation, not a final pass. Target **WCAG 2.1 AA**.

- **Contrast** — body text ≥ 4.5:1; large text (≥24px or ≥19px bold) and UI edges ≥ 3:1. Ink on Canvas/Stone always passes; the copy-colour rule exists to guarantee it.
- **Never colour alone** — pair colour with a second cue: deltas carry a ▲/▼ glyph, series carry direct labels, status banners carry an icon. Meaning must survive greyscale and colour-blindness.
- **Focus & targets** — a visible 2px Coral focus ring (Aqua on dark) on every interactive element; hit targets ≥ 44px; full keyboard reach with logical tab order.
- **Motion & semantics** — honour `prefers-reduced-motion`; use real headings, labelled inputs, and alt text on meaningful imagery. Motion and colour are never the only cue.

---

## Dark surfaces

Ink (`#171412`) is a real brand surface (e.g. the "for agents" section). On dark:

- Text: Canvas (`#FFFDFB`) primary; `rgba(255,253,251,0.6)` secondary.
- Accent / small labels: **Aqua**.
- Coral still works as the signal — solid Coral CTAs read well on Ink.
- Borders / dividers: `rgba(255,253,251,0.12)`. Panels: `rgba(255,253,251,0.04)` fill.

---

## Motion

Minimal and purposeful. Animate `opacity` and `transform` only; 120–200ms; ease-out (`cubic-bezier(0.2, 0, 0, 1)`). Hover lifts and fades tie to `shadow.sm`. Always honour `prefers-reduced-motion: reduce`.

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

For quotes and customer stories the subject anchors the frame and their words lead, set on **Ink**:

- The quote is the largest element — Canvas type on Ink, opened and closed by **oversized Coral quotation marks**. Coral appears once and nowhere else in the frame.
- Crop the subject to one edge so the quote breathes. Attribution is name, role, and the partner logo — the customer is named, Leaf is not.
- A campaign line (e.g. "Elevating the Game") sits small in a corner in Canvas — a signature, never a headline.

---

## Product patterns

The building blocks behind Answers and internal tools, at working density.

### Tables & data density

- **Quiet header** — faint Stone tint (`#FBF7F4`) with **Ink** labels (`11.5/600`, `+0.02em`) over a 1.5px bottom rule. The tint (not a heavy Ink fill) is what makes the header recede, while Ink labels keep them legible — Warm Grey on Stone is too low-contrast at this size. Avoid a full Ink header bar; it out-shouts the numbers that matter.
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

One structure across the four state colours: **soft-tint fill + 1px tint border + 3px solid left accent**, a solid state-colour badge/icon, and **Ink body copy** (never colour the message text — the accent carries status). Info = Tidal, Success = Fern, Warning = Amber, Error = Ember. Lead with what happened in bold, then the consequence; one line where possible. **Coral never appears in a status banner** — brand signal and status stay separate.

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
- **States:** rest = Ink; hover = quiet Stone wash (`rgba(23,20,18,0.05)`); **active = the one Coral signal** — soft tint fill (`#FBE4DF`), Coral text + icon, and a 3px inset Coral left accent. Counts/badges sit right-aligned in a Coral-tint pill.
- Group with short uppercase Warm-Grey labels (`11/600`, `+0.07em`). Order is stable; never icon-only except in the collapsed rail.
- **Collapsed rail:** 60px icon-only rail at tight widths — same order, same active tint + accent, labels on hover.

### Top bar

- 58px, Canvas, 1px bottom hairline. **Left:** menu toggle, then the breadcrumb trail. **Right:** search pill, one primary Coral action, account avatar.
- **Breadcrumbs:** light chevron separators (`rgba(23,20,18,0.28)`); ancestors are Coral links, only the current page is Ink + semibold.

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
- **Menu** — actions from a trigger; highlighted row is a Stone wash, destructive item in Ember, hairline divider before it. No scrim.
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

The small surfaces where Leaf shows up outside the product. Small canvases, same system: the mark in Coral, Ink/Stone grounds, sentence case, one accent. (Lives in the brand book.)

- **Favicon & app icon** — the Leaf **icon** (never the wordmark) on a solid Coral tile; ships at 16 / 32 / 180px. Full wordmark is never cropped into a square.
- **Social / link-preview (OG) card** — 1200×630, Ink or Stone ground, Canvas wordmark, one Coral accent, headline in the brand voice. Never a photo behind the wordmark — that treatment is for co-brand posts (see Photography).
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

Use the fewest series possible; mute comparison series in Harbor or Warm Grey so the Coral series leads. Palette colours are fine as chart *fills* (large marks) even though they're barred from text.

### Lead options

Two leads, chosen per chart:

- **Coral lead** (default) — single-focus charts and headline metrics where one series is the point.
- **Neutral lead** — dense dashboards and many equal-weight series. A warm graphite (`#8C857E`, mono ramp `#3F3A36 → #8C857E → #C9C2BB`) carries the set so no colour implies ranking, and **Coral flags only the one series that matters**. Use this before reaching for six saturated series at once.

### Sequential ramps (single measure)

- **Coral:** `#FBE4DF → #F7A08F → #FB5E48 → #C0392A` — intensity/density of one measure.
- **Harbor:** `#DDECEC → #9FC7BC → #4FA3A6 → #2E8388` — cooler alternative when Coral would read as alarm.

### Status in charts

Good-and-bad uses the **state palette only** — Fern for positive deltas, Ember for negative, Warm Grey for neutral. Never repurpose a series colour to mean status, and never use Fern/Ember for an ordinary series.

### Answers chart patterns

- **Combo (bar + line)** — volume as bars (Harbor or graphite), the rate/ratio as a Coral line on a secondary axis. The line is always the Coral focus.
- **Waterfall** — Coral for the start and net-total bars, graphite (`#8C857E`) for the floating steps between.
- **Funnel** — stages in categorical order (Coral → Harbor → Marigold), narrowing by volume, Ink labels.
- **Heatmap table** — diverging tint scale, Harbor tints (`#DDECEC → #9FC7BC`) for good and Coral tints (`#FBE4DF → #F7A08F`) for watch, neutral `#EFEAE6` at the midpoint. Ink text; hairline gaps, no borders.

### Structure

- Gridlines: hairline `rgba(23,20,18,0.07)`; baseline/zero line `rgba(23,20,18,0.16)`.
- Axis labels, ticks, and legends: Warm Grey, `type.caption`/`type.label`, sentence case.
- Label series directly where space allows. No chart junk: no 3D, no drop shadows, no heavy borders, no gradients outside a defined ramp.
- Chart surfaces are Canvas cards with the standard hairline border and `radius.lg`.

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

  /* --- type scale --- */
  --leaf-type-display: 640 64px/0.96 "Mona Sans";
  --leaf-type-h1: 640 46px/1.0 "Mona Sans";
  --leaf-type-h2: 600 32px/1.05 "Mona Sans";
  --leaf-type-h3: 600 22px/1.2 "Mona Sans";
  --leaf-type-body-lg: 400 18px/1.55 "Mona Sans";
  --leaf-type-body: 400 16px/1.6 "Mona Sans";
  --leaf-type-label: 500 14px/1.4 "Mona Sans";
  --leaf-type-caption: 500 13px/1.4 "Mona Sans";
  --leaf-type-features: "ss03" on, "ss05" on, "ss06" on, "ss07" on, "ss09" on;  /* always on */
}
```

> Merge with the base `:root` block (core, neutral, highlight, secondary colour tokens + font tokens).
