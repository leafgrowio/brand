const CSS = `
  .leaf-badge {
    font: var(--leaf-type-ui-label);
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: var(--leaf-space-2);
    padding: var(--leaf-space-1) var(--leaf-space-3);
    border-radius: var(--leaf-radius-pill);
    border: 1px solid transparent;
    color: var(--leaf-color-ink);
  }
  .leaf-badge__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .leaf-badge--success {
    background: var(--leaf-color-state-success-tint);
    border-color: var(--leaf-border-success);
  }
  .leaf-badge--success .leaf-badge__dot {
    background: var(--leaf-color-state-success);
  }
  .leaf-badge--warning {
    background: var(--leaf-color-state-warning-tint);
    border-color: var(--leaf-border-warning);
  }
  .leaf-badge--warning .leaf-badge__dot {
    background: var(--leaf-color-state-warning);
  }
  .leaf-badge--error {
    background: var(--leaf-color-state-error-tint);
    border-color: var(--leaf-border-error);
  }
  .leaf-badge--error .leaf-badge__dot {
    background: var(--leaf-color-state-error);
  }
  .leaf-badge--info {
    background: var(--leaf-color-state-info-tint);
    border-color: var(--leaf-border-info);
  }
  .leaf-badge--info .leaf-badge__dot {
    background: var(--leaf-color-state-info);
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-badge")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-badge";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Badge({ state = "info", children }) {
  ensureStyles();

  return (
    <span className={`leaf-badge leaf-badge--${state}`}>
      <span className="leaf-badge__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
