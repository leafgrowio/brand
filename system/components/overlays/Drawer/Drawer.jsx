const CSS = `
  .leaf-drawer-scrim {
    position: fixed;
    inset: 0;
    background: var(--leaf-scrim);
    display: flex;
    z-index: 1000;
    animation: leaf-drawer-fade-in var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-drawer-panel {
    width: min(420px, 86vw);
    height: 100%;
    background: var(--leaf-color-canvas);
    box-shadow: var(--leaf-shadow-md);
    padding: var(--leaf-space-5);
    display: flex;
    flex-direction: column;
  }
  .leaf-drawer-panel-right {
    margin-left: auto;
    animation: leaf-drawer-rise-right var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-drawer-panel-left {
    margin-right: auto;
    animation: leaf-drawer-rise-left var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: var(--leaf-space-4);
  }
  .leaf-drawer-title {
    font: 600 18px/1.2 var(--leaf-font-sans);
    color: var(--leaf-text-primary);
    margin: 0;
  }
  .leaf-drawer-close {
    display: flex;
    flex: none;
    color: var(--leaf-color-warm-grey);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: var(--leaf-radius-sm);
  }
  .leaf-drawer-close:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-drawer-body {
    flex: 1;
    overflow-y: auto;
    font: 400 14.5px/1.55 var(--leaf-font-sans);
    color: var(--leaf-color-warm-grey);
  }
  .leaf-drawer-footer {
    margin-top: var(--leaf-space-4);
    flex: none;
  }
  @keyframes leaf-drawer-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes leaf-drawer-rise-right {
    from { opacity: 0; transform: translateX(8px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes leaf-drawer-rise-left {
    from { opacity: 0; transform: translateX(-8px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-drawer-scrim,
    .leaf-drawer-panel-right,
    .leaf-drawer-panel-left {
      animation: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-drawer")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-drawer";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Drawer — an edge-anchored panel over the same Ink scrim as Modal, for
 * scoped, longer tasks that still want the page kept in view. Square outer
 * corners against the viewport edge.
 */
export function Drawer({ open, title, children, onClose, footer, side = "right" }) {
  ensureStyles();

  if (!open) return null;

  return (
    <div className="leaf-drawer-scrim" onClick={onClose}>
      <div
        className={`leaf-drawer-panel leaf-drawer-panel-${side}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="leaf-drawer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="leaf-drawer-header">
          <h2 id="leaf-drawer-title" className="leaf-drawer-title">
            {title}
          </h2>
          <button type="button" className="leaf-drawer-close" aria-label="Close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <div className="leaf-drawer-body">{children}</div>
        {footer ? <div className="leaf-drawer-footer">{footer}</div> : null}
      </div>
    </div>
  );
}
