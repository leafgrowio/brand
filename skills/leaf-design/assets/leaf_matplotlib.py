"""Leaf matplotlib kit — one call to make charts land on-brand.

Usage (from anywhere; the module finds its fonts next to itself):

    import sys
    sys.path.insert(0, "<this skill's assets directory>")
    import leaf_matplotlib as leaf
    leaf.use()                      # fonts + rcParams; do this before plotting

    fig, ax = plt.subplots(figsize=(8, 4.5))
    ax.plot(x, y, color=leaf.CORAL)
    ax.yaxis.set_major_formatter(leaf.currency())

The kit registers the "Leaf Sans" static cuts shipped in this folder —
Mona Sans (SIL OFL) instanced at Regular/Medium/SemiBold/Bold, wdth=100,
with the brand's stylistic sets ss03/05/06/07/09 and tabular figures (tnum)
FROZEN into the glyphs — because matplotlib cannot read variable fonts
properly and never applies OpenType features. (Renamed per the OFL's
Reserved Font Name clause; the distinct family also stops a stock Mona Sans
install shadowing the frozen letterforms.) Do not substitute a stock
Mona Sans here: it will render the wrong letterforms and proportional
digits. ▲/▼ are not in Mona Sans; the build draws them into Leaf Sans as
original Leaf geometry (sized to the tabular figures, so delta columns
align), which is why one family covers everything a Leaf chart sets and
findfont stays silent. If a chart genuinely needs glyphs beyond latin +
▲/▼, append "DejaVu Sans" to rcParams["font.family"] after use() and
accept its one-line weight-miss log as the trade.

Palette and rules mirror leaf-tokens.css / references/chart-recipes.md
(downstream of system/DESIGN.md in leafgrowio/brand). Never edit values here;
regenerate from the tokens when the design system bumps.
"""

from __future__ import annotations

from pathlib import Path

FAMILY = "Leaf Sans"

# --- core ---
INK = "#171412"
CANVAS = "#fffdfb"
WARM_GREY = "#656565"
MUTED = "#9a8f86"
CORAL = "#fb5e48"
CORAL_TINT = "#fbe4df"
STONE_LIGHT = "#f9f4f1"

# --- categorical series, fixed order (a series keeps its colour everywhere) ---
HARBOR = "#4fa3a6"
MARIGOLD = "#efb75a"
HEATHER = "#aaa2d4"
LAUREL = "#8ebb91"
APRICOT = "#f4a38f"
SERIES = [CORAL, HARBOR, MARIGOLD, HEATHER, LAUREL, APRICOT]

# --- neutral lead (dense dashboards: graphite carries the set, Coral flags one) ---
NEUTRAL = "#8c857e"
MONO = ["#3f3a36", "#8c857e", "#c9c2bb"]

# --- state (deltas/status only — never as series colours) ---
FERN = "#2f8b57"    # good / up
EMBER = "#c63a2b"   # bad / down / target lines
AMBER = "#c77e1c"
TIDAL = "#2e8388"

# --- sequential ramps (single measure) and diverging midpoint ---
RAMP_CORAL = ["#fbe4df", "#f7a08f", "#fb5e48", "#c0392a"]
RAMP_HARBOR = ["#ddecec", "#9fc7bc", "#4fa3a6", "#2e8388"]
HEATMAP_MID = "#efeae6"

# --- structure (Ink at 7% / 16% alpha) ---
GRID = "#17141212"
AXIS = "#17141229"

_FONTS_REGISTERED = False


def register_fonts(directory: str | Path | None = None) -> None:
    """Register the Leaf Sans statics with matplotlib's font manager."""
    global _FONTS_REGISTERED
    from matplotlib import font_manager

    directory = Path(directory) if directory else Path(__file__).resolve().parent
    ttfs = sorted(directory.glob("LeafSans-*.ttf"))
    if not ttfs:
        raise FileNotFoundError(f"no LeafSans-*.ttf found in {directory}")
    for ttf in ttfs:
        font_manager.fontManager.addfont(str(ttf))
    _FONTS_REGISTERED = True


def rc(lead: str = "coral") -> dict:
    """The Leaf rcParams. lead='coral' (default) or 'neutral' (graphite set —
    then colour the one focus series CORAL explicitly)."""
    from cycler import cycler

    colors = SERIES if lead == "coral" else MONO
    return {
        # type — the Leaf Sans statics carry everything a Leaf chart sets,
        # ▲/▼ included, so one family keeps findfont silent. Kept as a list:
        # appending a fallback family (e.g. "DejaVu Sans" for exotic glyphs)
        # only builds a per-glyph fallback chain in list form, never through
        # the generic 'sans-serif' alias.
        "font.family": [FAMILY],
        "font.size": 10.0,
        # text colours: titles Ink, axis labels and ticks Warm Grey
        "text.color": INK,
        "axes.titlecolor": INK,
        "axes.titleweight": "semibold",
        "axes.titlesize": 12.0,
        "axes.titlelocation": "left",
        "axes.titlepad": 12.0,
        "axes.labelcolor": WARM_GREY,
        "axes.labelsize": 10.0,
        "xtick.labelsize": 9.0,
        "ytick.labelsize": 9.0,
        "xtick.color": WARM_GREY,
        "ytick.color": WARM_GREY,
        # flat surfaces: Canvas ground, hairline structure, no chart junk
        "figure.facecolor": CANVAS,
        "axes.facecolor": CANVAS,
        "savefig.facecolor": CANVAS,
        "savefig.dpi": 200,
        "savefig.bbox": "tight",
        "axes.grid": True,
        "axes.grid.axis": "y",
        "grid.color": GRID,
        "grid.linewidth": 1.0,
        "axes.axisbelow": True,
        "axes.edgecolor": AXIS,
        "axes.linewidth": 1.0,
        "axes.spines.top": False,
        "axes.spines.right": False,
        "axes.spines.left": False,
        "xtick.major.size": 0.0,
        "ytick.major.size": 0.0,
        "xtick.minor.size": 0.0,
        "ytick.minor.size": 0.0,
        # series
        "axes.prop_cycle": cycler(color=colors),
        "lines.linewidth": 2.4,
        "lines.solid_capstyle": "round",
        # prefer direct labels; when a legend is unavoidable, keep it bare
        "legend.frameon": False,
        "legend.fontsize": 9.0,
    }


def use(lead: str = "coral") -> None:
    """Register fonts and apply the Leaf rcParams. Call before plotting."""
    import matplotlib

    if not _FONTS_REGISTERED:
        register_fonts()
    matplotlib.rcParams.update(rc(lead))


# --- number formatting (DESIGN.md rules) -----------------------------------

def fmt_currency(value: float, symbol: str = "£") -> str:
    """£1.49M above 1M (2 dp, trimmed), £350K, £950. Negatives keep the sign."""
    sign = "-" if value < 0 else ""
    v = abs(value)
    if v >= 1_000_000_000:
        s = f"{v / 1_000_000_000:.2f}".rstrip("0").rstrip(".")
        return f"{sign}{symbol}{s}B"
    if v >= 1_000_000:
        s = f"{v / 1_000_000:.2f}".rstrip("0").rstrip(".")
        return f"{sign}{symbol}{s}M"
    if v >= 1_000:
        return f"{sign}{symbol}{v / 1_000:.0f}K"
    return f"{sign}{symbol}{v:.0f}"


def fmt_percent(value: float, dp: int = 1) -> str:
    """Percentages at 1 dp: 24.6%. Pass the number, not a fraction."""
    return f"{value:.{dp}f}%"


def fmt_ratio(value: float) -> str:
    """Ratios at 2 dp with a lowercase x: 3.72x."""
    return f"{value:.2f}x"


def fmt_delta(value: float, dp: int = 1, suffix: str = "%") -> tuple[str, str]:
    """('▲ 4.2%', FERN) or ('▼ 4.2%', EMBER) — always glyph + colour, never
    colour alone. Render with the returned colour."""
    arrow, colour = ("▲", FERN) if value >= 0 else ("▼", EMBER)
    return f"{arrow} {abs(value):.{dp}f}{suffix}", colour


def currency(symbol: str = "£"):
    """Axis tick formatter for money."""
    from matplotlib.ticker import FuncFormatter

    return FuncFormatter(lambda v, _pos: fmt_currency(v, symbol))


def percent(dp: int = 0):
    """Axis tick formatter for percentages (ticks usually take 0 dp)."""
    from matplotlib.ticker import FuncFormatter

    return FuncFormatter(lambda v, _pos: fmt_percent(v, dp))
