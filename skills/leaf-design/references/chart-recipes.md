# Leaf chart recipes (for artifacts)

Downstream of `system/DESIGN.md` § Data visualization (leafgrowio/brand, v1.0.2). All colours by token — the kit's `leaf-tokens.css` defines every variable used here.

## Palette rules

- **Categorical series, fixed order** (a given series keeps its colour across every chart): 1 `--leaf-chart-series-1` Coral (focus) · 2 Harbor · 3 Marigold · 4 Heather · 5 Laurel · 6 Apricot. Use the fewest series possible.
- **Two leads, chosen per chart:** *Coral lead* (default) for single-focus charts and headline metrics; *neutral lead* for dense dashboards — graphite `--leaf-chart-neutral` carries the set (mono ramp `--leaf-chart-mono-1..3`) and **Coral flags only the one series that matters**.
- **Sequential ramps** (one measure): Coral `--leaf-ramp-coral-1..4`, or Harbor `--leaf-ramp-harbor-1..4` when Coral would read as alarm. Diverging heatmaps: harbor tints (good) → `--leaf-heatmap-mid` → coral tints (watch).
- **Status ≠ series:** Fern up / Ember down, deltas only, always with ▲/▼ glyphs. Never repurpose a series colour as status or vice versa.

## Structure

- Gridlines `1px --leaf-chart-grid`; baseline/zero `--leaf-chart-axis`. Axis labels and ticks: Warm Grey, caption size, sentence case.
- Label series directly next to the line/bar where space allows; legends only when direct labels can't fit.
- Chart surfaces are Canvas cards: `background: var(--leaf-surface-card); border: 1px solid var(--leaf-border); border-radius: var(--leaf-radius-lg); padding: var(--leaf-space-5);`
- No chart junk: no 3D, drop shadows, heavy borders, or gradients outside the ramps.
- Small sizes (thumbnails, deck tiles): drop gridlines and ticks, one direct label per series, line weight ≥ 2.5px, bake the key numbers in.

## Recipes (pure CSS/SVG — no chart libraries in artifacts)

**Column chart** — flex row of bars:
```html
<div style="display:flex; align-items:flex-end; gap:14px; height:180px;
            background:repeating-linear-gradient(to top, transparent 0 44px, var(--leaf-chart-grid) 44px 45px);
            border-bottom:1px solid var(--leaf-chart-axis); padding:0 6px;">
  <div style="flex:1; height:52%; background:var(--leaf-chart-series-1); border-radius:4px 4px 0 0;"></div>
  <!-- one div per bar; label above each bar (Ink 12/600, tabular-nums), month below (Warm Grey caption) -->
</div>
```
Target line: absolutely positioned `border-top: 2px dashed var(--leaf-color-state-error)` with a small "Target £350K" label at the clear end.

**Donut** — conic-gradient in categorical order, Canvas centre hole with the total:
```html
<div style="width:160px; height:160px; border-radius:50%; position:relative;
            background:conic-gradient(var(--leaf-chart-series-1) 0 46%, var(--leaf-chart-series-2) 46% 69%,
                                      var(--leaf-chart-series-3) 69% 86%, var(--leaf-chart-series-4) 86% 100%);">
  <div style="position:absolute; inset:28px; border-radius:50%; background:var(--leaf-surface-card);
              display:flex; flex-direction:column; align-items:center; justify-content:center;">
    <span style="font-size:20px; font-weight:640; letter-spacing:-0.02em;">£2.4M</span>
  </div>
</div>
```
Legend rows: 9px square swatch (radius 3px) + label + right-aligned tabular percentage.

**Line/area** — inline SVG polylines; focus series Coral solid with a ~10%-opacity fill beneath; comparison series Harbor, no fill; gridlines as `<line>` at `--leaf-chart-grid`; direct end-of-line labels.

**Combo (bar + line)** — volume bars in Harbor (or graphite), the rate as a Coral line with dot markers on a second axis. The line is always the Coral focus.

**Waterfall** — Coral for the start and net-total bars, graphite `--leaf-chart-neutral` for the floating steps.

**Funnel** — stage bars narrowing by volume in categorical order (Coral → Harbor → Marigold), Ink labels, percentages right-aligned.

**Heatmap table** — the `.leaf-table` from the kit with cell backgrounds from the diverging scale (`--leaf-ramp-harbor-2` good → `--leaf-heatmap-mid` → `--leaf-ramp-coral-2` watch), Ink text, hairline gaps, no cell borders.

**KPI row** — `.leaf-card` per metric: `.leaf-kpi-label` (Warm Grey caption) + `.leaf-kpi-value` (26/640, tabular) + delta line (`.leaf-delta-up` ▲ Fern / `.leaf-delta-down` ▼ Ember, relative to a stated baseline).
