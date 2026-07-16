const CSS = `
  .leaf-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 12px;
    border-radius: var(--leaf-radius-pill);
    border: 1px solid transparent;
    font-family: var(--leaf-font-sans);
    font-size: 12.5px;
    font-weight: 600;
    line-height: 1;
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
    border-color: rgba(47, 139, 87, 0.25);
  }
  .leaf-badge--success .leaf-badge__dot {
    background: var(--leaf-color-state-success);
  }
  .leaf-badge--warning {
    background: var(--leaf-color-state-warning-tint);
    border-color: rgba(199, 126, 28, 0.28);
  }
  .leaf-badge--warning .leaf-badge__dot {
    background: var(--leaf-color-state-warning);
  }
  .leaf-badge--error {
    background: var(--leaf-color-state-error-tint);
    border-color: rgba(198, 58, 43, 0.28);
  }
  .leaf-badge--error .leaf-badge__dot {
    background: var(--leaf-color-state-error);
  }
  .leaf-badge--info {
    background: var(--leaf-color-state-info-tint);
    border-color: rgba(46, 131, 136, 0.28);
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
