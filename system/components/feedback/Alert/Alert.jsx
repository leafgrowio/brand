const CSS = `
  .leaf-alert {
    display: flex;
    align-items: center;
    gap: 14px;
    border-radius: var(--leaf-radius-md);
    padding: 14px 18px;
    border: 1px solid transparent;
    border-left-width: 3px;
    border-left-style: solid;
  }
  .leaf-alert__badge {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    font-family: var(--leaf-font-sans);
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
    color: var(--leaf-color-canvas);
  }
  .leaf-alert__message {
    margin: 0;
    font-family: var(--leaf-font-sans);
    font-size: 14.5px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--leaf-color-ink);
  }
  .leaf-alert__title {
    font-weight: 600;
  }
  .leaf-alert--info {
    background: var(--leaf-color-state-info-tint);
    border-color: rgba(46, 131, 136, 0.28);
    border-left-color: var(--leaf-color-state-info);
  }
  .leaf-alert--info .leaf-alert__badge {
    background: var(--leaf-color-state-info);
  }
  .leaf-alert--success {
    background: var(--leaf-color-state-success-tint);
    border-color: rgba(47, 139, 87, 0.28);
    border-left-color: var(--leaf-color-state-success);
  }
  .leaf-alert--success .leaf-alert__badge {
    background: var(--leaf-color-state-success);
  }
  .leaf-alert--warning {
    background: var(--leaf-color-state-warning-tint);
    border-color: rgba(199, 126, 28, 0.3);
    border-left-color: var(--leaf-color-state-warning);
  }
  .leaf-alert--warning .leaf-alert__badge {
    background: var(--leaf-color-state-warning);
  }
  .leaf-alert--error {
    background: var(--leaf-color-state-error-tint);
    border-color: rgba(198, 58, 43, 0.3);
    border-left-color: var(--leaf-color-state-error);
  }
  .leaf-alert--error .leaf-alert__badge {
    background: var(--leaf-color-state-error);
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-alert")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-alert";
  s.textContent = CSS;
  document.head.appendChild(s);
}

const GLYPH = { info: "i", success: "✓", warning: "!", error: "!" };

export function Alert({ state = "info", title, children }) {
  ensureStyles();

  const role = state === "warning" || state === "error" ? "alert" : "status";

  return (
    <div className={`leaf-alert leaf-alert--${state}`} role={role}>
      <span className="leaf-alert__badge" aria-hidden="true">
        {GLYPH[state]}
      </span>
      <p className="leaf-alert__message">
        {title && <span className="leaf-alert__title">{title} </span>}
        {children}
      </p>
    </div>
  );
}
