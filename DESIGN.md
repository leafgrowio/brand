# Leaf Design Foundations

This document is the written source of truth for Leaf's design system. It pairs with the visual brand book (`Leaf Brand Book.dc.html`). Where the two ever disagree, fix both.

Status: v0.2 — foundations locked, data-visualization intentionally deferred.
Source: core brand reference (June 2026) + v0.2 decisions (July 2026).

---

## What changed in v0.2

- **Coral button system** — two tiers defined (primary solid, secondary outline).
- **Coral content blocks** — softened to a light tint with Ink text instead of solid fills.
- **Copy-colour rule** — type is Ink / Coral / Warm Grey / Aqua-on-dark only; palette colours are for fills, not text.
- **Product state palette** — a dedicated set (Fern, Amber, Ember, Tidal), drawn deliberately outside the core and secondary palettes.
- **Type scale** — a documented modular scale for Mona Sans.
- **Spacing, layout, radius, elevation, motion, interaction states** — newly specified below.
- Still open: **data visualization** (chart palettes, series vs status, axis/gridline treatment).

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

The core, neutral, highlight, and secondary palettes are unchanged from v0.1 (see the palette tables at the end). The v0.2 decisions below govern *how* they are used.

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

## Iconography

- Default to **SVG**, **black** variation. Keep icon treatment consistent within a set; let colour vary by category.
- Sizes: `16 · 20 · 24 · 32 · 48`px. In coloured category tiles, the icon is ~⅓ of the shorter side.
- Pair black icons with secondary-colour fields for libraries, hubs, and editorial navigation.

---

## Imagery

Not yet specified. Out of scope for v0.2 — revisit alongside marketing surfaces.

---

## Deferred — data visualization

Locked for a dedicated pass. Open questions: categorical vs sequential chart palettes; how the **secondary palette** (series) and the **state palette** (status) divide; axis, gridline, and label treatment; legend and tooltip patterns; and small-multiple rules.

---

## Implementation tokens (additions for v0.2)

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
}
```

> These are the v0.2 **additions**. Merge on top of the v0.1 `:root` block (core, neutral, highlight, secondary colour tokens + font tokens), which is unchanged.
