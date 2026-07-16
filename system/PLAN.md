# PLAN.md — Convert Leaf into a full Claude Design system

Goal: turn this project (brand book + component library + `DESIGN.md`) into a **compiled, org-consumable design system**. The compiler discovers everything from file *content* and sibling relationships, not folder names. The only fixed requirement is a root `styles.css` (import-only entry point).

Source of truth today:
- `DESIGN.md` — full written spec (v1.0, ratified). Colour, type, voice, spacing, elevation, motion, logos, iconography, imagery, photography, data-viz, product patterns, nav, overlays, responsive, governance, and an **Implementation tokens** CSS block (lines ~469–544).
- `Leaf Brand Book.dc.html` — brand foundations reference.
- `Leaf Component Library.dc.html` — application-layer reference (component catalog, patterns, app shell, overlays, responsive).
- `assets/` — logos, icons (~1,250), imagery, photography.
- Self-hosted fonts: `assets/fonts/MonaSans.ttf`, `assets/fonts/MonaSans-Italic.ttf`.

Do NOT hand-write `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`, or a barrel `index.js` — all generated automatically.

---

## Phase 0 — Prep
- [x] Read `DESIGN.md` end to end; it is the spec. Every token/rule below traces to it.
- [x] Confirm the mounted `brand/` repo is attached (fonts + full asset tree live there if you need originals).
- [x] Keep the two `.dc.html` files as-is — they become the human reference; the compiler ignores them. Do not delete.

## Phase 1 — Tokens + CSS entry point (unblocks "turn it on")
- [x] Create `tokens/` with one file per concern, each declaring `--leaf-*` custom properties on `:root`:
  - `tokens/colors.css` — **author the base palette first** (DESIGN.md's Implementation block is only the *extension*; the core/neutral/highlight/secondary tokens are referenced but not yet emitted). Needed families:
    - Core: `--leaf-color-coral: #fb5e48`, `--leaf-color-coral-hover: #e8462f`, `--leaf-color-coral-tint: #fbe4df`.
    - Neutral: Ink `#171412`, Canvas `#fffdfb`, Warm Grey `#656565`, Stone / Light Stone tints (`#f9f4f1`, `#fbf7f4`, `#f2e8e1`, `#ede3dc`, hairline `#d9cfc8`), Aqua `#7ad8ce`.
    - Secondary palette (categorical): Harbor `#4fa3a6`, Marigold `#efb75a`, Butter `#f6e49d`, Apricot `#f4a38f`, Rosehip `#d96b7c`, Sage `#dce8c4`, Laurel `#8ebb91`, Eucalyptus `#9fc7bc`, Lilac `#d8cff0`, Heather `#aaa2d4`.
    - State palette + tints, chart series + grid/axis, sequential ramps — copy verbatim from DESIGN.md Implementation block.
    - Add **semantic aliases** on top of base values: `--leaf-text-primary` (Ink), `--leaf-text-secondary` (Warm Grey), `--leaf-text-accent` (Coral), `--leaf-surface-page` (Light Stone), `--leaf-surface-card` (Canvas), `--leaf-surface-ink` (Ink), `--leaf-border` (`--leaf-border-light`).
  - `tokens/typography.css` — the `--leaf-type-*` shorthands + `--leaf-type-features` from DESIGN.md. Include font-family vars: `--leaf-font-sans: "Mona Sans"`, `--leaf-font-serif: "Source Serif 4"`.
  - `tokens/spacing.css` — `--leaf-space-1..9`, `--leaf-container-max`.
  - `tokens/radius.css` — `--leaf-radius-sm/md/lg/pill`.
  - `tokens/elevation.css` — `--leaf-border-light/dark`, `--leaf-shadow-sm/md`.
  - `tokens/motion.css` — `--leaf-motion-fast/base`, `--leaf-ease`.
- [x] Create `tokens/fonts.css` with the `@font-face` rules:
  - Mona Sans normal + italic → `assets/fonts/MonaSans.ttf` / `MonaSans-Italic.ttf`, `format('truetype-variations')`, `font-weight: 200 900`, `font-stretch: 75% 125%`. **Self-hosting is mandatory** — Google Fonts' Mona Sans strips the ssXX stylistic-set tables.
  - Source Serif 4 via Google Fonts `@import` (or self-host from `brand/assets/font/Source Serif 4/`).
  - Add a global `* { font-feature-settings: var(--leaf-type-features); }` rule (the `font` shorthand resets feature settings, so enforce on `*`).
- [x] Create root `styles.css` — **`@import` lines only, no inline rules**. Import order: `fonts.css`, then every `tokens/*.css`. This is the file consumers link.
- [x] Verify: open any `@dsCard` (Phase 4) and confirm `var(--leaf-*)` resolve (no browser-default fallbacks).

## Phase 2 — Component primitives (the consumable library)
Split the HTML component catalog into real React files. **Each component = a directory with:** `<Name>.jsx` (named `export function <Name>`), `<Name>.d.ts` (props interface), `<Name>.prompt.md` (one-line what/when + JSX example + variants), and one `@dsCard`-tagged `.html` per directory. Reference styling via `var(--leaf-*)` only — React + relative sibling imports, no npm, no CSS-in-JS.

Inventory (from `Leaf Component Library.dc.html` — build exactly these, don't invent extras):
- [x] `components/forms/`
  - `Button` — variants: primary (solid Coral, Canvas text, pill), secondary (Coral outline, tint hover); sizes sm/md/lg; disabled; with-icon. Hover `--leaf-color-coral-hover`.
  - `Input` — Canvas field, `rgba(23,20,18,0.18)` border, `--leaf-radius-md`, 2px Coral focus ring. States: default, focus, error (Ember), disabled.
  - `Select` — matches Input; chevron affordance.
  - `Checkbox` — Coral checked fill, 6px radius.
  - `Radio` — Coral checked ring.
  - `Switch` (Toggle) — 44×26 pill, Coral when on.
- [x] `components/data/`
  - `Tag` / `Badge` — state palette (soft tint + solid dot + Ink label); pair colour with text always.
  - `Table` — quiet Stone header (`#fbf7f4`), Ink labels 11.5/600, 1.5px bottom rule; tabular figures right-aligned; em-dash for null.
- [x] `components/feedback/`
  - `Alert` / `Banner` — one structure across 4 states: soft-tint fill + 1px tint border + 3px solid left accent + solid badge/icon + Ink body.
  - `Tooltip` — Ink surface, Canvas text, small.
- [x] `components/navigation/`
  - `SidebarItem` — line icon + label; active = Coral tint fill + Coral text/icon + 3px accent; hover Stone tint.
  - `Tabs` — in-page only; active 2px Coral underline, inactive Warm Grey.
  - `Breadcrumbs` — chevron separators, ancestors Coral links, current Ink semibold.
- [x] `components/overlays/`
  - `Modal` — on `rgba(23,20,18,0.44)` scrim, `--leaf-shadow-md`, `--leaf-radius-lg`.
  - `Popover` / `Menu` — single warm shadow, hairline border.
  - `Drawer` — edge-anchored panel.
- [x] For each: add `@startingPoint` JSDoc tag on the `.d.ts` interface for the ones worth seeding new designs from (Button, Input, Table, Modal, SidebarItem).

## Phase 3 — UI kits (product recreations)
Leaf's product is **Answers** (data/analytics) + internal tools. Build one kit that composes the primitives — screens, not a storybook.
- [x] `ui_kits/answers/` — `{README.md, index.html, <Screen>.jsx…}`. Core screens: app shell (sidebar + top bar + breadcrumbs), a dashboard/report view (charts per data-viz section), a table-heavy list view, one form/settings view. `index.html` shows an interactive click-through.
- [x] Tag `index.html` line 1: `<!-- @dsCard group="Answers" viewport="1440x900" -->`.
- [x] Recreate visuals from `Leaf Component Library.dc.html` app-shell/patterns sections + DESIGN.md — do not invent new layouts. Copy icons from `assets/icons/`, never hand-roll SVG.

## Phase 4 — Design System tab specimen cards (`@dsCard`)
Small HTML files, ~700×150px (400px max), each linking root `styles.css` via relative path, first line tagged `<!-- @dsCard group="…" viewport="700xNN" subtitle="…" name="…" -->`. Show specimens directly (card name renders outside — no titles inside). Aim for MANY small cards. Split from the brand book's existing panels:
- [x] **Colors** — separate cards: Core (Coral/Ink/Canvas), Neutral/Stone ramp, Aqua-on-Ink, Secondary categorical, State palette (solid+tint), Chart series order, Sequential ramps.
- [x] **Type** — display/H1/H2/H3 specimen, body/label/caption, the 5 stylistic-set glyphs (ss03/05/06/07/09), serif (Source Serif 4) editorial specimen.
- [x] **Spacing** — the 4→96 scale swatches; a spacing-in-use example.
- [x] **Radius / Elevation** — radius steps; the two shadows on cards.
- [x] **Brand** — Coral usage rule (one moment per view), approved text pairings matrix (Ink-on-colour / Canvas-on-dark).
- [x] **Components** — one card per component directory (already required in Phase 2).

## Phase 5 — Manifest, skill, governance
- [x] `readme.md` (root) — the guide + manifest. Fold in `DESIGN.md`'s CONTENT FUNDAMENTALS (voice: UK English, sentence case, em dashes, no exclamation marks/emojis, Signal/Answers/Watcher/Leaf Schema capitalised; use/use-carefully/avoid word lists) and VISUAL FOUNDATIONS (flat-by-default, hairline borders, one Coral moment, warm Stone grounds, minimal motion). Add ICONOGRAPHY section (SVG/black default from `assets/icons/`, structure `<theme>/<icon>/<variation>/<format>`). Index/manifest: list tokens, components, UI kits, cards. Cite sources: the `brand/` repo, `DESIGN.md`, both `.dc.html` references.
- [x] `SKILL.md` (root) — Agent-Skills-compatible frontmatter:
  ```
  ---
  name: leaf-design
  description: Use this skill to generate well-branded interfaces and assets for Leaf…
  user-invocable: true
  ---
  ```
  Body: read `readme.md`, explore files; copy assets + emit static HTML for artifacts, or read rules for production code.
- [x] Keep `DESIGN.md` as the deep-dive spec; `readme.md` links to it. Ensure the token CSS files stay in sync with the DESIGN.md Implementation block.

## Phase 6 — Turn it on (the actual "org design system" switch)
- [x] In the **Share** menu, set the file **type to "Design System"** so others in the org can view/consume it. (This is the setting that surfaces it as a design system — everything above just makes it useful.)
- [x] Run `check_design_system` to get the generated `<Namespace>` for mounting components in card HTML (`const { Button } = window.<Namespace>`).
- [x] Verify every `@dsCard` renders and the Design System tab groups them correctly.

---

## Open decisions for the Claude Code session
1. **Base colour tokens** — DESIGN.md ships only the *extension* CSS block; the core/neutral/secondary token names above are proposed. Confirm naming (`--leaf-color-*`) before wiring semantic aliases.
2. **Component inventory** — locked to what the component library shows. Add `IconButton` or an `Icon` wrapper only if the Answers kit needs it (list under "Intentional additions" in readme with a reason).
3. **Source Serif 4** — self-host (from `brand/assets/font/Source Serif 4/`) vs Google Fonts `@import`. Self-host for parity with Mona Sans.
4. **Answers kit fidelity** — recreate from `Leaf Component Library.dc.html` only; if a real Answers codebase/Figma exists, import it as ground truth before building (screenshots are lossy).

## Amendments (Claude Code execution session, 16 Jul 2026)

Gaps found on close reading; all executed below.

1. **Data-viz tokens beyond the Implementation block.** DESIGN.md's CSS block omits values that only live in the Data visualization prose: the sequential ramps (Coral `#FBE4DF→#F7A08F→#FB5E48→#C0392A`, Harbor `#DDECEC→#9FC7BC→#4FA3A6→#2E8388`), the neutral-lead graphite (`#8C857E`, mono ramp `#3F3A36→#8C857E→#C9C2BB`), and the heatmap midpoint `#EFEAE6`. `tokens/colors.css` authors these as `--leaf-ramp-*`, `--leaf-chart-neutral`, `--leaf-chart-mono-*`, `--leaf-heatmap-mid`.
2. **Semantic tokens the components need but the plan didn't list.** Input border `rgba(23,20,18,0.18)` (`--leaf-border-input`), modal scrim `rgba(23,20,18,0.44)` (`--leaf-scrim`), dark-surface text/panel tokens (`--leaf-text-on-dark`, `--leaf-text-on-dark-secondary: rgba(255,253,251,0.6)`, `--leaf-surface-ink-panel: rgba(255,253,251,0.04)`), focus tokens (`--leaf-focus-ring` Coral, `--leaf-focus-ring-dark` Aqua).
3. **Open decisions resolved:** (1) `--leaf-color-*` naming confirmed; (3) Source Serif 4 **self-hosted** — variable TTFs copied from `brand/assets/font/Source Serif 4/` into `assets/fonts/`; (4) no Answers codebase/Figma supplied — kit recreated from the component library + DESIGN.md as planned.
4. **Phase 6 from Claude Code.** `check_design_system` isn't callable from this session, but **DesignSync** is: create/target a design-system project (type is set at creation) and push the compiled tree. Component `@dsCard` cards are written as **static specimens** (self-contained HTML mirroring the JSX output) so every card renders with or without the generated bundle; readme notes how to switch a card to `window.<Namespace>` mounts once the app's self-check reports the namespace.
5. **Governance sync.** Repo-root `DESIGN.md` is still v0.2; `system/DESIGN.md` is the ratified v1.0. Root copy gets synced (CLAUDE.md requires the two stay aligned).
6. **Local verification.** Every card and the Answers kit get rendered in a browser before hand-off — tokens resolve, fonts load with stylistic sets on.

## Definition of done
- Root `styles.css` resolves every token; fonts load with stylistic sets on.
- Every component directory has `.jsx` + `.d.ts` + `.prompt.md` + `@dsCard` HTML and mounts from the generated bundle.
- Answers UI kit renders an interactive click-through.
- Design System tab populated (Colors, Type, Spacing, Radius/Elevation, Brand, Components, Answers).
- `readme.md` + `SKILL.md` written; file type set to **Design System** in Share.
