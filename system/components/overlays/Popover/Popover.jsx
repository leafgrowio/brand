const CSS = `
  .leaf-popover {
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 280px;
    animation: leaf-popover-rise-in var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-popover-card {
    background: var(--leaf-color-canvas);
    border: 1px solid var(--leaf-border-light);
    border-radius: 12px;
    box-shadow: var(--leaf-shadow-md);
    padding: 16px 18px;
  }
  .leaf-popover-title {
    font: 600 14px/1.2 var(--leaf-font-sans);
    color: var(--leaf-text-primary);
    margin: 0 0 6px;
  }
  .leaf-popover-body {
    font: 400 13px/1.5 var(--leaf-font-sans);
    color: var(--leaf-color-warm-grey);
    margin: 0;
  }
  .leaf-popover-action {
    display: inline-flex;
    margin-top: 12px;
    font: 600 12.5px/1 var(--leaf-font-sans);
    color: var(--leaf-text-accent);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  .leaf-popover-action:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-popover-beak {
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--leaf-color-canvas);
    transform: rotate(45deg);
  }
  .leaf-popover-beak-bottom-left {
    left: 26px;
    bottom: -7px;
    border-right: 1px solid var(--leaf-border-light);
    border-bottom: 1px solid var(--leaf-border-light);
  }
  .leaf-popover-beak-bottom-right {
    right: 26px;
    bottom: -7px;
    border-right: 1px solid var(--leaf-border-light);
    border-bottom: 1px solid var(--leaf-border-light);
  }
  .leaf-popover-beak-top-left {
    left: 26px;
    top: -7px;
    border-left: 1px solid var(--leaf-border-light);
    border-top: 1px solid var(--leaf-border-light);
  }
  .leaf-popover-beak-top-right {
    right: 26px;
    top: -7px;
    border-left: 1px solid var(--leaf-border-light);
    border-top: 1px solid var(--leaf-border-light);
  }
  @keyframes leaf-popover-rise-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-popover {
      animation: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-popover")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-popover";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Popover — rich, interactive content anchored to its trigger with a small
 * beak. No scrim; the page stays live behind it.
 */
export function Popover({ title, children, action, beak = "bottom-left" }) {
  ensureStyles();

  return (
    <div className="leaf-popover">
      <div className="leaf-popover-card">
        {title ? <div className="leaf-popover-title">{title}</div> : null}
        {children ? <div className="leaf-popover-body">{children}</div> : null}
        {action ? (
          <button type="button" className="leaf-popover-action" onClick={action.onClick}>
            {action.label}
          </button>
        ) : null}
      </div>
      <span className={`leaf-popover-beak leaf-popover-beak-${beak}`} aria-hidden="true" />
    </div>
  );
}
