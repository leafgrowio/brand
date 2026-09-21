const CSS = `
  .leaf-alert {
    display: flex;
    align-items: center;
    gap: var(--leaf-space-4);
    border-radius: var(--leaf-radius-md);
    padding: var(--leaf-space-4) var(--leaf-space-4);
    border: 1px solid transparent;
  }
  .leaf-alert__badge {
    font: var(--leaf-type-ui-label);
    font-weight: 700;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: var(--leaf-color-canvas);
  }
  .leaf-alert__message {
    font: var(--leaf-type-ui-body);
    margin: 0;
    color: var(--leaf-color-ink);
  }
  .leaf-alert__title {
    font-weight: 600;
  }
  .leaf-alert--info {
    background: var(--leaf-color-state-info-tint);
    border-color: var(--leaf-border-info);
  }
  .leaf-alert--info .leaf-alert__badge {
    background: var(--leaf-color-state-info);
  }
  .leaf-alert--success {
    background: var(--leaf-color-state-success-tint);
    border-color: var(--leaf-border-success);
  }
  .leaf-alert--success .leaf-alert__badge {
    background: var(--leaf-color-state-success);
  }
  .leaf-alert--warning {
    background: var(--leaf-color-state-warning-tint);
    border-color: var(--leaf-border-warning);
  }
  .leaf-alert--warning .leaf-alert__badge {
    background: var(--leaf-color-state-warning);
  }
  .leaf-alert--error {
    background: var(--leaf-color-state-error-tint);
    border-color: var(--leaf-border-error);
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
