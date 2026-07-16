const CSS = `
  .leaf-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 220px;
    background: var(--leaf-color-canvas);
    border: 1px solid var(--leaf-border-light);
    border-radius: 12px;
    box-shadow: var(--leaf-shadow-md);
    padding: 6px;
    animation: leaf-menu-rise-in var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    font: 500 13.5px/1 var(--leaf-font-sans);
    color: var(--leaf-text-primary);
    background: none;
    border: none;
    padding: 9px 10px;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    transition: background-color var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-menu-item:hover {
    background: rgba(23, 20, 18, 0.05);
  }
  .leaf-menu-item:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-menu-item-destructive {
    color: var(--leaf-color-state-error);
  }
  .leaf-menu-item-icon {
    display: flex;
    flex: none;
  }
  .leaf-menu-item-label {
    flex: 1;
  }
  .leaf-menu-divider {
    height: 1px;
    background: rgba(23, 20, 18, 0.1);
    margin: 6px 4px;
  }
  @keyframes leaf-menu-rise-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-menu {
      animation: none;
    }
    .leaf-menu-item {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-menu")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-menu";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Menu — a small, anchor-free list of actions from a trigger. Never dims the
 * page; dismiss on outside click or Esc is the consumer's responsibility
 * (Menu itself is purely presentational).
 */
export function Menu({ items = [], open = true }) {
  ensureStyles();

  if (!open) return null;

  return (
    <div className="leaf-menu" role="menu">
      {items.map((item, index) => {
        if (item === "divider") {
          return <div key={`divider-${index}`} className="leaf-menu-divider" role="separator" />;
        }
        const { label, icon, destructive, onSelect } = item;
        return (
          <button
            key={label != null ? label : index}
            type="button"
            role="menuitem"
            className={destructive ? "leaf-menu-item leaf-menu-item-destructive" : "leaf-menu-item"}
            onClick={onSelect}
          >
            {icon ? (
              <span className="leaf-menu-item-icon" aria-hidden="true">
                {icon}
              </span>
            ) : null}
            <span className="leaf-menu-item-label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
