const CSS = `
  .leaf-overview__head { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
  .leaf-overview__title { font: 640 26px/1.1 var(--leaf-font-sans); letter-spacing: -0.02em; color: var(--leaf-color-ink); }
  .leaf-overview__live {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font: 500 12px/1 var(--leaf-font-sans);
    color: var(--leaf-color-state-success);
    background: var(--leaf-color-state-success-tint);
    border-radius: var(--leaf-radius-pill);
    padding: 5px 10px;
  }
  .leaf-overview__meta { font: 400 13.5px/1.5 var(--leaf-font-sans); color: var(--leaf-color-warm-grey); margin-bottom: 22px; }

  .leaf-overview__kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--leaf-space-5); margin-bottom: var(--leaf-space-5); }
  .leaf-kpi { background: var(--leaf-color-canvas); border: 1px solid var(--leaf-border-light); border-radius: var(--leaf-radius-md); padding: 18px; }
  .leaf-kpi__label { font: 500 12.5px/1 var(--leaf-font-sans); color: var(--leaf-color-warm-grey); margin-bottom: 10px; }
  .leaf-kpi__value { font: 640 26px/1 var(--leaf-font-sans); color: var(--leaf-color-ink); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .leaf-kpi__delta { font: 600 12.5px/1 var(--leaf-font-sans); margin-top: 8px; font-variant-numeric: tabular-nums; }
  .leaf-kpi__delta--up { color: var(--leaf-color-state-success); }
  .leaf-kpi__delta--down { color: var(--leaf-color-state-error); }

  .leaf-overview__charts { display: grid; grid-template-columns: 1.7fr 1fr; gap: var(--leaf-space-5); margin-bottom: var(--leaf-space-5); align-items: stretch; }
  .leaf-chart-card { background: var(--leaf-color-canvas); border: 1px solid var(--leaf-border-light); border-radius: var(--leaf-radius-lg); padding: 20px 22px 18px; }
  .leaf-chart-card__title { font: 600 15px/1.2 var(--leaf-font-sans); color: var(--leaf-color-ink); margin-bottom: 18px; }

  .leaf-columns { position: relative; height: 190px; display: flex; align-items: flex-end; gap: 18px; padding-bottom: 22px; }
  .leaf-columns__grid {
    position: absolute; left: 0; right: 0; top: 0; bottom: 22px;
    background-image:
      linear-gradient(to top, var(--leaf-chart-grid) 1px, transparent 1px),
      linear-gradient(to top, var(--leaf-chart-grid) 1px, transparent 1px),
      linear-gradient(to top, var(--leaf-chart-grid) 1px, transparent 1px);
    background-size: 100% 25%, 100% 50%, 100% 75%;
    background-repeat: no-repeat;
    background-position: bottom;
  }
  .leaf-columns__baseline { position: absolute; left: 0; right: 0; bottom: 22px; height: 1px; background: var(--leaf-chart-axis); }
  .leaf-columns__target { position: absolute; left: 0; right: 0; border-top: 2px dashed var(--leaf-color-state-error); }
  .leaf-columns__target-label {
    position: absolute; left: 0; top: -18px;
    font: 600 11px/1 var(--leaf-font-sans); color: var(--leaf-color-state-error);
    background: var(--leaf-color-canvas); padding-right: 6px;
  }
  .leaf-col { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; z-index: 1; }
  .leaf-col__value { font: 600 11.5px/1 var(--leaf-font-sans); color: var(--leaf-color-ink); margin-bottom: 6px; white-space: nowrap; }
  .leaf-col__bar { width: 26px; background: var(--leaf-color-coral); border-radius: 5px 5px 0 0; }
  .leaf-col__label { position: absolute; bottom: -20px; font: 500 11.5px/1 var(--leaf-font-sans); color: var(--leaf-color-warm-grey); }

  .leaf-donut-wrap { display: flex; flex-direction: column; align-items: center; gap: 18px; }
  .leaf-donut {
    position: relative; width: 158px; height: 158px; border-radius: 50%;
    background: conic-gradient(
      var(--leaf-chart-series-1) 0 46%,
      var(--leaf-chart-series-2) 46% 69%,
      var(--leaf-chart-series-3) 69% 86%,
      var(--leaf-chart-series-4) 86% 100%
    );
  }
  .leaf-donut__hole {
    position: absolute; inset: 24px; border-radius: 50%; background: var(--leaf-color-canvas);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .leaf-donut__value { font: 640 20px/1 var(--leaf-font-sans); color: var(--leaf-color-ink); letter-spacing: -0.02em; }
  .leaf-donut__caption { font: 500 11px/1.3 var(--leaf-font-sans); color: var(--leaf-color-warm-grey); margin-top: 4px; }
  .leaf-legend { width: 100%; display: flex; flex-direction: column; gap: 10px; }
  .leaf-legend__row { display: flex; align-items: center; gap: 9px; font: 400 13px/1 var(--leaf-font-sans); color: var(--leaf-color-ink); }
  .leaf-legend__swatch { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
  .leaf-legend__label { flex: 1; }
  .leaf-legend__pct { font: 600 13px/1 var(--leaf-font-sans); color: var(--leaf-color-ink); font-variant-numeric: tabular-nums; }

  .leaf-line-chart { width: 100%; height: 240px; display: block; }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-overview")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-overview";
  s.textContent = CSS;
  document.head.appendChild(s);
}

const REVENUE_MONTHS = [
  { label: "Feb", value: "£238K", pct: 52 },
  { label: "Mar", value: "£293K", pct: 64 },
  { label: "Apr", value: "£265K", pct: 58 },
  { label: "May", value: "£339K", pct: 74 },
  { label: "Jun", value: "£311K", pct: 68 },
  { label: "Jul", value: "£412K", pct: 90 },
];

const CHANNEL_LEGEND = [
  { label: "Paid media", pct: "46%", color: "var(--leaf-chart-series-1)" },
  { label: "Organic", pct: "23%", color: "var(--leaf-chart-series-2)" },
  { label: "Email", pct: "17%", color: "var(--leaf-chart-series-3)" },
  { label: "Referral", pct: "14%", color: "var(--leaf-chart-series-4)" },
];

/**
 * Overview — the Answers dashboard: three KPI cards (tracked revenue, blended
 * ROAS, wasted spend), a six-month revenue column chart with a dashed target
 * line, a channel-mix donut, and a full-width weekly conversions line/area
 * chart. Coral leads every chart as the one decisive series.
 */
export function Overview() {
  ensureStyles();

  return (
    <>
      <div className="leaf-overview__head">
        <h1 className="leaf-overview__title">Overview</h1>
        <span className="leaf-overview__live">● Live</span>
      </div>
      <p className="leaf-overview__meta">Dash Water · All campaigns · Last updated 14 Jul 2026, 09:02</p>

      <div className="leaf-overview__kpis">
        <div className="leaf-kpi">
          <div className="leaf-kpi__label">Tracked revenue</div>
          <div className="leaf-kpi__value">£2.41M</div>
          <div className="leaf-kpi__delta leaf-kpi__delta--up">▲ 18.4%</div>
        </div>
        <div className="leaf-kpi">
          <div className="leaf-kpi__label">Blended ROAS</div>
          <div className="leaf-kpi__value">3.72x</div>
          <div className="leaf-kpi__delta leaf-kpi__delta--up">▲ 0.3</div>
        </div>
        <div className="leaf-kpi">
          <div className="leaf-kpi__label">Wasted spend</div>
          <div className="leaf-kpi__value">£48.2K</div>
          <div className="leaf-kpi__delta leaf-kpi__delta--up">▼ 12.1%</div>
        </div>
      </div>

      <div className="leaf-overview__charts">
        <div className="leaf-chart-card">
          <div className="leaf-chart-card__title">Tracked revenue — last 6 months</div>
          <div className="leaf-columns">
            <div className="leaf-columns__grid" aria-hidden="true" />
            <div className="leaf-columns__target" style={{ bottom: "76%" }}>
              <span className="leaf-columns__target-label">Target £350K</span>
            </div>
            {REVENUE_MONTHS.map((month) => (
              <div className="leaf-col" key={month.label}>
                <span className="leaf-col__value">{month.value}</span>
                <span className="leaf-col__bar" style={{ height: `${month.pct}%` }} />
                <span className="leaf-col__label">{month.label}</span>
              </div>
            ))}
            <div className="leaf-columns__baseline" aria-hidden="true" />
          </div>
        </div>

        <div className="leaf-chart-card">
          <div className="leaf-chart-card__title">Revenue by channel</div>
          <div className="leaf-donut-wrap">
            <div
              className="leaf-donut"
              role="img"
              aria-label="Revenue by channel: Paid media 46%, Organic 23%, Email 17%, Referral 14%"
            >
              <div className="leaf-donut__hole">
                <span className="leaf-donut__value">£2.4M</span>
                <span className="leaf-donut__caption">Tracked</span>
              </div>
            </div>
            <div className="leaf-legend">
              {CHANNEL_LEGEND.map((row) => (
                <div className="leaf-legend__row" key={row.label}>
                  <span className="leaf-legend__swatch" style={{ background: row.color }} />
                  <span className="leaf-legend__label">{row.label}</span>
                  <span className="leaf-legend__pct">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="leaf-chart-card">
        <div className="leaf-chart-card__title">Conversions — weekly, indexed</div>
        <svg
          className="leaf-line-chart"
          viewBox="0 0 900 240"
          preserveAspectRatio="none"
          role="img"
          aria-label="Weekly indexed conversions, this period trending above last period"
        >
          <defs>
            <linearGradient id="leaf-overview-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--leaf-color-coral)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--leaf-color-coral)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="20" x2="900" y2="20" stroke="var(--leaf-chart-grid)" strokeWidth="1" />
          <line x1="0" y1="75" x2="900" y2="75" stroke="var(--leaf-chart-grid)" strokeWidth="1" />
          <line x1="0" y1="130" x2="900" y2="130" stroke="var(--leaf-chart-grid)" strokeWidth="1" />
          <line x1="0" y1="185" x2="900" y2="185" stroke="var(--leaf-chart-grid)" strokeWidth="1" />
          <line x1="0" y1="206" x2="900" y2="206" stroke="var(--leaf-chart-axis)" strokeWidth="1" />

          <polyline
            points="10,150 130,146 250,140 370,148 490,132 610,138 730,120 870,128"
            fill="none"
            stroke="var(--leaf-chart-series-2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <polygon
            points="10,132 130,118 250,108 370,96 490,80 610,66 730,54 870,40 870,206 10,206"
            fill="url(#leaf-overview-area-fill)"
            stroke="none"
          />
          <polyline
            points="10,132 130,118 250,108 370,96 490,80 610,66 730,54 870,40"
            fill="none"
            stroke="var(--leaf-color-coral)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text x="875" y="34" textAnchor="end" fontFamily="Mona Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--leaf-color-coral)">This period</text>
          <text x="875" y="122" textAnchor="end" fontFamily="Mona Sans, sans-serif" fontSize="12" fontWeight="600" fill="var(--leaf-chart-series-2)">Last period</text>

          <text x="10" y="226" fontFamily="Mona Sans, sans-serif" fontSize="11" fill="var(--leaf-color-warm-grey)">W1</text>
          <text x="130" y="226" textAnchor="middle" fontFamily="Mona Sans, sans-serif" fontSize="11" fill="var(--leaf-color-warm-grey)">W2</text>
          <text x="250" y="226" textAnchor="middle" fontFamily="Mona Sans, sans-serif" fontSize="11" fill="var(--leaf-color-warm-grey)">W3</text>
          <text x="370" y="226" textAnchor="middle" fontFamily="Mona Sans, sans-serif" fontSize="11" fill="var(--leaf-color-warm-grey)">W4</text>
          <text x="490" y="226" textAnchor="middle" fontFamily="Mona Sans, sans-serif" fontSize="11" fill="var(--leaf-color-warm-grey)">W5</text>
          <text x="610" y="226" textAnchor="middle" fontFamily="Mona Sans, sans-serif" fontSize="11" fill="var(--leaf-color-warm-grey)">W6</text>
          <text x="730" y="226" textAnchor="middle" fontFamily="Mona Sans, sans-serif" fontSize="11" fill="var(--leaf-color-warm-grey)">W7</text>
          <text x="870" y="226" textAnchor="end" fontFamily="Mona Sans, sans-serif" fontSize="11" fill="var(--leaf-color-warm-grey)">W8</text>
        </svg>
      </div>
    </>
  );
}
