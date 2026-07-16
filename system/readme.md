# Leaf design system

The compiled, consumable form of Leaf's brand: tokens, React components, specimen cards, and an Answers UI kit, generated from the written spec in [DESIGN.md](DESIGN.md) and the two visual references ([Leaf Brand Book.dc.html](Leaf%20Brand%20Book.dc.html), [Leaf Component Library.dc.html](Leaf%20Component%20Library.dc.html)). Where anything here disagrees with DESIGN.md, DESIGN.md wins — fix both together.

Version 1.0 — ratified 16 July 2026. Maintained by the Creative team (creative@leaf.fm). Versioning: patch = copy/typo/token value · minor = new component or guidance, backwards-compatible · major = a rule change that breaks existing artifacts.

## How to use it

**Link one file.** `styles.css` is the entry point — import-only, it loads the self-hosted fonts and every token file. Every card, kit, and component in this project resolves its styling through `var(--leaf-*)` custom properties defined there. Never hard-code a hex that has a token.

**For agents:** read [SKILL.md](SKILL.md). Short version — for artifacts and static HTML, copy the token values and specimen patterns; for production code, import the components; for rules, read this file and DESIGN.md.

**Fonts are self-hosted and that matters.** Mona Sans must load from `assets/fonts/` — the Google Fonts build strips the stylistic-set tables (ss03/05/06/07/09) that give Leaf its letterforms. The sets are enforced globally via `* { font-feature-settings: var(--leaf-type-features) }` because the `font` shorthand resets them. Source Serif 4 (editorial serif only — never UI, tables, forms, nav, or small labels) is self-hosted alongside for parity.

## Content fundamentals

Leaf sounds commercially sharp, technically credible, plain-spoken, and evidence-led. Lead with the mechanism before the claim; translate technical depth into commercial consequence (tracking accuracy, wasted spend, bidding efficiency, margin, decision speed).

- **Mechanics:** UK English (optimisation, behaviour, analyse, centre). Sentence case everywhere — headings, buttons, labels, nav. Em dashes for asides, straight quotes, no exclamation marks, no emojis in external or sales copy. Product names capitalised: Signal, Answers, Watcher, Leaf Schema.
- **Use:** performance intelligence · post-attribution era · first-party signal data · tracking accuracy · signal quality · wasted spend · targeting quality · bidding efficiency · decision-grade reporting · board-ready numbers.
- **Use carefully:** "better performance" (tie to the mechanism) · "data accuracy" (name the context) · "ROI" (state assumptions) · "agency" (only when the contrast needs it).
- **Avoid:** unlock growth · seamless solution · game-changing · trusted partner (unless immediately proven) · single source of truth (unless substantiated) · real ROAS · kill your spreadsheets.
- **Microcopy:** verb-first, one idea, present tense. Errors reassure and give one next step; empty states point at one action; confirmations name the consequence and the button repeats the verb ("Delete report", never "OK").
- **Numbers:** `£1.49M` (abbreviate ≥1M), ratios 2 dp with a lowercase x (`3.72x`), percentages 1 dp (`24.6%`), deltas signed with ▲/▼ in Fern/Ember, dates `1 Jun 2026`, tabular figures right-aligned, missing data is an em-dash — never blank, never 0.

## Visual foundations

- **Flat by default.** Surfaces separate with 1px hairline borders and background tone, not shadow. One warm shadow family exists for lifted/transient surfaces only (`--leaf-shadow-sm` hover, `--leaf-shadow-md` menus/modals). Never shadow + heavy border on the same element.
- **One Coral moment per view.** Coral is the signal, not a coat of paint: the primary button, the active nav item, the focus series in a chart. Content blocks use the soft tint (`--leaf-color-coral-tint`) with Ink text; solid Coral is for CTAs and small marks only.
- **Warm Stone grounds.** Light Stone (`--leaf-surface-page`) is the room, Canvas cards are for clarity, Ink is a real brand surface (Aqua accents, Canvas text, `--leaf-border-dark` hairlines).
- **Copy colour rule.** Text is Ink, Coral, Warm Grey, or Aqua-on-dark only. Secondary palette colours are fills, never text — every colour fill takes Ink text; only the dark anchors take Canvas (white-on-Coral is 3.09:1, large text only).
- **Minimal motion.** Opacity and transform only, 120–200ms, ease-out `cubic-bezier(0.2, 0, 0, 1)`, always honouring `prefers-reduced-motion`.
- **Accessibility is a foundation.** WCAG 2.1 AA: body text ≥ 4.5:1, never colour alone (deltas carry ▲/▼, badges carry dots, banners carry icons), 2px Coral focus ring (Aqua on dark) on everything interactive, hit targets ≥ 44px.

## Iconography

Default to SVG, black variation. This project carries a curated flat set in `assets/icons/` (the icons the brand book and kit actually use). The full library (~1,250 icons) lives in the [brand repo](https://github.com/leafgrowio/brand) under `assets/icons/<theme>/<icon>/<variation>/<format>/` — themes: banking, business, communications, ecology, education, electronics, logistics, shopping, social; variations: black (default) and white (dark surfaces), both line-art — the brand carries no solid icons.

Sizes 16 · 20 · 24 · 32 · 48px. In coloured category tiles the icon is ~⅓ of the shorter side, always black line-art on a flat secondary-colour field — never recoloured, never on Coral. Leaf imagery is iconographic, not photographic: one icon, optically centred, one flat secondary field, topic-matched (people → Heather, decisions → Harbor, momentum → Marigold). Photography is the deliberate exception, reserved for customers in flight (co-brand `Partner × leafsignal` lockups, customer quotes on Ink).

Small functional strokes inside components (check, chevron, ×, search, the sidebar glyphs) are part of the component spec; anything illustrative comes from `assets/icons/` — never hand-roll decorative SVGs.

## Manifest

### Tokens (`tokens/`)

| File | Declares |
| --- | --- |
| `colors.css` | Core, neutral, highlight, secondary, state (+tints), chart series/grid/axis, graphite mono ramp, sequential ramps, heatmap midpoint, semantic aliases, focus rings |
| `typography.css` | Families, `--leaf-type-*` shorthands, stylistic-set features, heading tracking |
| `spacing.css` | `--leaf-space-1..9` (4→96), `--leaf-container-max` |
| `radius.css` | sm 8 · md 14 · lg 18 · pill 999 |
| `elevation.css` | Hairlines (light/dark/input), `--leaf-shadow-sm/md`, `--leaf-scrim` |
| `motion.css` | 120/180ms, `--leaf-ease` |
| `fonts.css` | `@font-face` (Mona Sans VF, Source Serif 4 VF) + global feature-settings |

### Components (`components/`)

Each directory: `<Name>.jsx` (named export) · `<Name>.d.ts` (typed props; `@startingPoint` marks good seeds for new designs) · `<Name>.prompt.md` (what/when + example) · `<Name>.card.html` (specimen).

- `forms/` — Button★, Input★, Select, Checkbox, Radio, Switch
- `data/` — Badge, Tag, Table★
- `feedback/` — Alert, Tooltip
- `navigation/` — SidebarItem★, Tabs, Breadcrumbs
- `overlays/` — Modal★, Drawer, Menu, Popover

★ = `@startingPoint` components.

### UI kits (`ui_kits/`)

- `answers/` — the Answers product recreation: app shell (sidebar + top bar + breadcrumbs), dashboard/report view, table-heavy list view, settings/form view. `index.html` is an interactive click-through; screens ship as JSX composing the primitives.

### Specimen cards (`foundations/` + per-component cards)

Groups: Colors (core, neutrals, aqua-on-Ink, secondary, state, chart series, ramps) · Type (headings, body, stylistic sets, serif) · Spacing · Radius & Elevation · Brand (Coral rule, text pairings) · Components (one per directory) · Answers (the kit click-through).

## Intentional additions & resolved discrepancies

Additions beyond DESIGN.md's implementation block, each traceable to spec prose: sequential-ramp/graphite/heatmap tokens (Data visualization section) · `--leaf-border-input`, `--leaf-scrim`, dark-surface and focus tokens (Forms/Overlays/Dark surfaces sections) · `--leaf-text-muted: #9a8f86` (the muted grey used pervasively in the component library for placeholders and quiet captions, previously unnamed) · Button sm/lg sizes (the plan requires them; the reference shows md — sm/lg are derived proportionally) · heading tracking tokens.

Where the visual references disagreed with DESIGN.md, DESIGN.md won: breadcrumb ancestors are Coral links (one mock showed Warm Grey) · modal cancel is neutral Ink outline (one mock coloured it Ember; Ember is reserved for the destructive primary) · input focus is the 2px Coral outline ring (not the soft box-shadow variant) · inputs use `--leaf-radius-md` (14px).

## Keeping it in sync

This folder is canonical; the Claude Design project is a build target. Every change lands here first (spec + files together, verified by rendering), then syncs incrementally to the project. The full workflow, editing rules, and guardrails live in [AGENTS.md](AGENTS.md) — read it before changing anything in this folder.

## Turning it on in Claude Design

The component cards are static specimens, so they render with or without the generated bundle. Once this project is synced to a Claude Design design-system project (type is set at creation) and the app's self-check has compiled `_ds_bundle.js` and reported the `<Namespace>`, any card can be switched to mount the live component instead: `const { Button } = window.<Namespace>`. Do not hand-write `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`, or a barrel `index.js` — they are generated.

## Sources

- [DESIGN.md](DESIGN.md) — the written spec (v1.0, ratified). The deep dive; this readme is the digest.
- [Leaf Brand Book.dc.html](Leaf%20Brand%20Book.dc.html) — brand foundations, visually.
- [Leaf Component Library.dc.html](Leaf%20Component%20Library.dc.html) — the application layer, visually.
- [leafgrowio/brand](https://github.com/leafgrowio/brand) — logos, the full icon library, font sources, imagery, photography.
