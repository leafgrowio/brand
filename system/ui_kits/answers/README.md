# Answers UI kit

A product recreation of **Answers** — the reporting/analytics surface — built from the Leaf design system's primitives, not a one-off mockup. It shows the same three screens two ways: a static, click-through `index.html` for the Design System pane, and production-shaped JSX screens that compose the real component library.

## What it shows

One persistent app shell (236px sidebar on Stone-faint with an org switcher and grouped nav, 58px top bar with search and the single Coral "New report" action) wrapping three screens reached from the sidebar:

- **Overview** — three KPI cards (tracked revenue, blended ROAS, wasted spend), a six-month revenue column chart with a dashed Ember target line, a channel-mix donut, and a full-width weekly conversions line/area chart.
- **Reports** — in-page Tabs (All reports / Scheduled / Archived) over a quiet channel-performance table with a diverging harbor→coral ROAS heatmap, Fern/Ember deltas, and status Badges.
- **Settings** — a single Canvas form card: Input, Select, a help-text Input, a Switch, a Checkbox, and a Cancel/Save footer.

## Files

- `index.html` — the interactive deliverable. Self-contained static HTML/CSS/vanilla JS linking `../../styles.css`; clicking a sidebar item shows/hides the matching screen and updates the active nav item and breadcrumb. No React, no build step, no external resources beyond the stylesheet.
- `AppShell.jsx` — the frame: sidebar (org switcher + `SidebarItem` nav) and top bar (hamburger, `Breadcrumbs`, search pill, "New report", avatar), with a `children` content slot.
- `Overview.jsx` — KPI cards plus the three chart recipes (column, donut, line/area), styled from chart tokens only.
- `Reports.jsx` — composes `Tabs`, `Table`, and `Badge`.
- `Settings.jsx` — composes `Input`, `Select`, `Switch`, `Checkbox`, and `Button`.

`index.html` and the JSX screens are two renderings of the same design, not two designs — same copy, same numbers, same layout. The JSX is what a product team would actually import; `index.html` is what the Design System pane renders as the `@dsCard`.

## Rules this kit demonstrates

- **Every value is a token.** The kit carries no literal type size, spacing step, radius or border colour: it is styled entirely through `var(--leaf-*)`, on the **Product** type scale (`ui-title`, `ui-figure`, `ui-figure-sm`, `ui-heading`, `ui-body`, `ui-label`, `ui-micro`) and the 4px spacing grid. It used to hard-code eleven type sizes and eighteen spacing values, which meant every system-wide type decision had to be re-applied here by hand, three times over. Where a size needs emphasis, override `font-weight` on top of the token rather than reaching for a new size.

- **One Coral moment.** Inside the shell, Coral appears exactly twice with intent: the active sidebar item (tint fill, Ink text and icon — no accent bar) and the single solid "New report" pill. Every chart also leads with a Coral series, never more than one solid-Coral fill per view otherwise (Settings' one primary button is the third, screen-scoped instance).
- **Quiet tables.** The Reports table uses a Stone-faint header with Ink labels over a single rule, never a heavy Ink bar; numeric columns are right-aligned with tabular figures; the ROAS column is the only heatmap column and uses the diverging harbor→coral ramp tokens; the delta column is the only place Fern ▲ / Ember ▼ appear, and the one row without a comparator renders an em-dash, never a blank cell or a zero.
- **Chart recipes.** Categorical series follow the fixed order (Coral, Harbor, Marigold, Heather, Laurel, Apricot); gridlines and baseline use the token rgba literals (`--leaf-chart-grid`, `--leaf-chart-axis`); the target line is dashed Ember, never Coral; the line chart labels its two series directly instead of a legend.
- **Number formats.** Currency abbreviates at ≥1M (`£2.41M`, `£48.2K`), ratios are 2dp with a lowercase `x` (`3.72x`), percentages are 1dp, deltas always carry ▲/▼ in Fern/Ember, and missing data is an em-dash in muted text — never blank.
