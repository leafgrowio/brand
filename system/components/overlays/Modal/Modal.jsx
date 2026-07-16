const CSS = `
  .leaf-modal-scrim {
    position: fixed;
    inset: 0;
    background: var(--leaf-scrim);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--leaf-space-4);
    z-index: 1000;
    animation: leaf-modal-fade-in var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-modal-card {
    width: 100%;
    max-width: 400px;
    background: var(--leaf-color-canvas);
    border: 1px solid var(--leaf-border-light);
    border-radius: var(--leaf-radius-lg);
    box-shadow: var(--leaf-shadow-md);
    padding: 26px;
    animation: leaf-modal-rise-in var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--leaf-space-4);
    margin-bottom: var(--leaf-space-1);
  }
  .leaf-modal-title {
    font: 600 20px/1.2 var(--leaf-font-sans);
    color: var(--leaf-text-primary);
    margin: 0;
  }
  .leaf-modal-close {
    display: flex;
    flex: none;
    margin-top: 2px;
    color: var(--leaf-color-warm-grey);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: var(--leaf-radius-sm);
  }
  .leaf-modal-close:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-modal-body {
    font: 400 14.5px/1.55 var(--leaf-font-sans);
    color: var(--leaf-color-warm-grey);
    margin: 0 0 22px;
  }
  .leaf-modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  @keyframes leaf-modal-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes leaf-modal-rise-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-modal-scrim,
    .leaf-modal-card {
      animation: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-modal")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-modal";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Modal — a centred, scrim-backed dialog for one decision at a time.
 * Closes on × click, Esc, or a click on the scrim itself (clicks inside the
 * card are stopped from bubbling to the scrim).
 */
export function Modal({ open, title, children, onClose, actions, destructive }) {
  ensureStyles();

  React.useEffect(() => {
    if (!open) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape" && onClose) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="leaf-modal-scrim" onClick={onClose}>
      <div
        className="leaf-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leaf-modal-title"
        data-destructive={destructive ? "true" : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="leaf-modal-header">
          <h2 id="leaf-modal-title" className="leaf-modal-title">
            {title}
          </h2>
          <button type="button" className="leaf-modal-close" aria-label="Close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <div className="leaf-modal-body">{children}</div>
        {actions ? <div className="leaf-modal-actions">{actions}</div> : null}
      </div>
    </div>
  );
}
