const CSS = `
  .leaf-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 220px;
    background: var(--leaf-color-canvas);
    border: 1px solid var(--leaf-border-light);
    border-radius: var(--leaf-radius-md);
    box-shadow: var(--leaf-shadow-md);
    padding: var(--leaf-space-1);
    animation: leaf-menu-rise-in var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-menu-item {
    display: flex;
    align-items: center;
    gap: var(--leaf-space-2);
    width: 100%;
    font: var(--leaf-type-ui-label);
    color: var(--leaf-text-primary);
    background: none;
    border: none;
    padding: var(--leaf-space-2) var(--leaf-space-2);
    border-radius: var(--leaf-radius-sm);
    cursor: pointer;
    text-align: left;
    transition: background-color var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-menu-item:hover {
    background: var(--leaf-surface-hover);
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
    background: var(--leaf-border-light);
    margin: var(--leaf-space-1) var(--leaf-space-1);
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
