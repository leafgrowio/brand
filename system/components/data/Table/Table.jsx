const CSS = `
  .leaf-table-wrap {
    background: var(--leaf-surface-card);
    border: 1px solid var(--leaf-border-light);
    border-radius: var(--leaf-radius-lg);
    overflow: hidden;
  }
  .leaf-table {
    width: 100%;
    border-collapse: collapse;
  }
  .leaf-table caption {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .leaf-table thead tr {
    background: var(--leaf-color-stone-faint);
    border-bottom: 1.5px solid rgba(23, 20, 18, 0.14);
  }
  .leaf-table th {
    text-align: left;
    padding: 13px 16px;
    font-family: var(--leaf-font-sans);
    font-size: 11.5px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.02em;
    color: var(--leaf-color-ink);
  }
  .leaf-table th[data-align="right"] {
    text-align: right;
  }
  .leaf-table tbody tr {
    border-bottom: 1px solid rgba(23, 20, 18, 0.07);
  }
  .leaf-table tbody tr:last-child {
    border-bottom: none;
  }
  .leaf-table--zebra tbody tr:nth-child(even) {
    background: var(--leaf-color-stone-faint);
  }
  .leaf-table td {
    padding: 12px 16px;
    font-family: var(--leaf-font-sans);
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1;
    color: var(--leaf-color-ink);
  }
  .leaf-table td[data-align="right"] {
    text-align: right;
  }
  .leaf-table td[data-numeric="true"] {
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .leaf-table__swatch {
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 3px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .leaf-table__delta {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .leaf-table__delta--up {
    color: var(--leaf-color-state-success);
  }
  .leaf-table__delta--down {
    color: var(--leaf-color-state-error);
  }
  .leaf-table__empty {
    color: var(--leaf-text-muted);
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-table")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-table";
  s.textContent = CSS;
  document.head.appendChild(s);
}

function cellAlign(col) {
  return col.align || (col.numeric ? "right" : undefined);
}

function renderCellContent(raw) {
  const cell = raw !== null && typeof raw === "object" ? raw : { value: raw };
  const { value, swatch, delta } = cell;

  if (value === null || value === undefined || value === "") {
    return <span className="leaf-table__empty">—</span>;
  }

  if (delta === "up" || delta === "down") {
    const arrow = delta === "up" ? "▲" : "▼";
    return <span className={`leaf-table__delta leaf-table__delta--${delta}`}>{arrow} {value}</span>;
  }

  return (
    <>
      {swatch && <span className="leaf-table__swatch" style={{ background: swatch }} aria-hidden="true" />}
      {value}
    </>
  );
}

/**
 * @startingPoint
 */
export function Table({ columns, rows, zebra = false, caption }) {
  ensureStyles();

  const classes = ["leaf-table"];
  if (zebra) classes.push("leaf-table--zebra");

  return (
    <div className="leaf-table-wrap">
      <table className={classes.join(" ")}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} data-align={cellAlign(col)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => {
                const raw = row[col.key];
                const heat = raw !== null && typeof raw === "object" ? raw.heat : undefined;
                return (
                  <td
                    key={col.key}
                    data-align={cellAlign(col)}
                    data-numeric={col.numeric ? "true" : undefined}
                    style={heat ? { background: heat } : undefined}
                  >
                    {renderCellContent(raw)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
