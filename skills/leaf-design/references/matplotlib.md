# Leaf charts in matplotlib

For charts generated in Python (matplotlib, or libraries that render through
it). HTML artifacts keep using the CSS/SVG recipes in `chart-recipes.md`; this
is the same design system pointed at a different renderer. The palette rules,
structure rules, and number rules there apply unchanged — this file covers
what matplotlib needs on top.

## Quickstart

The kit ships in `assets/`: `leaf_matplotlib.py` plus four `LeafSans-*.ttf`
statics. The module finds the fonts next to itself, so keep those five files
together if you copy them out of the skill.

```python
import sys
sys.path.insert(0, "<this skill's directory>/assets")
import leaf_matplotlib as leaf
import matplotlib.pyplot as plt

leaf.use()                      # fonts + rcParams — call BEFORE plotting

fig, ax = plt.subplots(figsize=(8, 4.5))
ax.plot(months, revenue)        # series 1 = Coral, 2 = Harbor, ... automatic
ax.yaxis.set_major_formatter(leaf.currency())
ax.set_title("Blended revenue — H1 2026")
fig.savefig("chart.png")        # dpi 200, tight bbox, Canvas ground preset
```

`leaf.use()` sets the ground (Canvas), grid (hairline, y-only, Ink at 7%),
baseline (Ink at 16%, bottom spine only), Warm Grey axis labels and ticks,
left-aligned semibold Ink titles, the categorical series cycle, and
legend-off-frame. What it cannot set — series discipline, labels, formats —
is on you; the rules below.

## The fonts: use only these statics

matplotlib cannot read variable fonts correctly and never applies OpenType
features, so the brand letterforms have to be baked in at build time. The
shipped statics (Regular 400 / Medium 500 / SemiBold 600 / Bold 700) carry
the stylistic sets ss03/05/06/07/09 (the Leaf l · a · g · G · Q) and tabular
figures (tnum — the number rules require them) FROZEN into the default
glyphs.

- The family registers as **"Leaf Sans"** — renamed because the OFL
  reserves "Mona" for unmodified builds, and so a system-installed stock
  Mona Sans can never shadow the frozen letterforms.
- **Never point matplotlib at stock or Google-Fonts Mona Sans**: it renders
  the wrong letterforms and proportional digits. This is the same reason the
  web kit self-hosts. If someone hands you a chart set in plain "Mona Sans",
  the letterforms are wrong — rebuild with the kit.
- ▲/▼ are not in Mona Sans; the build draws them into Leaf Sans as original
  Leaf geometry, sized to the tabular figures so delta columns align. One
  family covers everything a Leaf chart sets, and findfont stays silent. If
  you need glyphs beyond latin + ▲/▼ (Cyrillic, CJK, emoji), append
  `"DejaVu Sans"` to `font.family` after `use()` — per-glyph fallback needs
  matplotlib ≥ 3.7 — and accept its one-line weight-miss log as the trade.
- Weights map cleanly: `fontweight="medium"` → 500, `"semibold"` → 600.
  Titles are semibold via rcParams already; KPI-style numbers take
  `fontweight="semibold"` or `"bold"`.

## Series discipline (the part `use()` can't do for you)

- **Default (Coral lead):** the prop cycle is the fixed categorical order —
  Coral, Harbor, Marigold, Heather, Laurel, Apricot. Plot in that order and
  don't reorder or skip; a given series keeps its colour across every chart
  in a set. Use the fewest series possible.
- **Dense dashboards (neutral lead):** `leaf.use(lead="neutral")` cycles
  graphite (`leaf.MONO`); then colour the ONE series that matters
  `leaf.CORAL` explicitly. One Coral moment per chart — never two.
- **Status is never a series colour.** `leaf.FERN` / `leaf.EMBER` are for
  deltas and good/bad marks only, always with the glyph:
  `label, colour = leaf.fmt_delta(4.2)` → `("▲ 4.2%", FERN)`; render the
  text in that colour. Never colour alone, never Fern/Ember as lines/bars.
- **Target/threshold lines:** dashed Ember —
  `ax.axhline(3.5, linestyle="--", linewidth=1.4, color=leaf.EMBER)` with a
  small Ember label at the clear end.
- **Single-measure ramps:** `leaf.RAMP_CORAL` / `leaf.RAMP_HARBOR` (use
  Harbor when Coral would read as alarm). Diverging heatmaps: build the
  colormap from `RAMP_HARBOR[1]` → `leaf.HEATMAP_MID` → `RAMP_CORAL[1]`
  (good → neutral → watch), Ink text on cells.

## Labels and legends

- **Label series directly** at the line end (`ax.annotate` in the series
  colour, semibold, size 9) instead of a legend, whenever space allows.
  Legends only when direct labels can't fit — the kit already strips the
  frame.
- Bar values: Ink, semibold, size 9, just above/beside the bar.
- Titles: sentence case, UK English, left-aligned (already set). No
  exclamation marks, no emojis. Signal, Answers, Watcher, Leaf Schema stay
  capitalised.

## Numbers (formatters included — use them)

- Money axis: `ax.yaxis.set_major_formatter(leaf.currency())` → `£1.49M`,
  `£350K`, `£950`. Other currencies: `leaf.currency("$")`.
- Percent axis: `leaf.percent()` (0 dp on ticks); in labels
  `leaf.fmt_percent(24.63)` → `24.6%`.
- Ratios: `leaf.fmt_ratio(3.716)` → `3.72x` (2 dp, lowercase x).
- Deltas: `leaf.fmt_delta(-2.4)` → `("▼ 2.4%", EMBER)`.
- Dates: `1 Jun 2026` — with matplotlib date axes use
  `DateFormatter("%-d %b %Y")` (`%#d` on Windows), or short `%b` ticks.
- Missing data is a gap or an em-dash label — never plotted as 0.

## Sizing and export

- Working sizes: `(8, 4.5)` for a single card, `(11, 4.2)` for a duo row,
  `(4, 3)` for a KPI-adjacent mini. `savefig` is preset to dpi 200 and tight
  bbox — don't pass `transparent=True`; the Canvas ground is part of the
  design.
- Small/thumbnail charts: drop the grid (`ax.grid(False)`), keep line width
  ≥ 2.5, one direct label per series, bake the key number into the title or
  as a big semibold figure.
- No 3D, no drop shadows, no gradients outside the ramps, no matplotlib
  styles/themes on top (`seaborn-*` styles, `ggplot`, etc.).

## Library interplay

- **seaborn:** `sns.set_theme()` clobbers rcParams — call `leaf.use()`
  AFTER it (or skip `set_theme` and pass `palette=leaf.SERIES` where
  needed).
- **pandas `.plot()`:** fine — it inherits rcParams. Pass
  `legend=False` and label directly where space allows.
- Anything that draws its own theme (plotly, altair) is out of scope here —
  matplotlib is the standard for Python-generated Leaf charts.

## Rebuilding the fonts

The statics are built by `brand/tools/subset_fonts.py` in the internal
`leaf` plugin repo (same tool as the artifact woff2) from the canonical
variable font in `leafgrowio/brand`. Rebuild there when the brand font
changes; never hand-edit or re-cut them ad hoc.
