const CSS = `
  .leaf-tabs {
    display: flex;
    gap: 22px;
    border-bottom: 1px solid rgba(23, 20, 18, 0.12);
  }
  .leaf-tabs__tab {
    appearance: none;
    background: none;
    border: none;
    margin: 0;
    cursor: pointer;
    padding: 0 0 12px;
    font-family: var(--leaf-font-sans);
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: var(--leaf-color-warm-grey);
    box-shadow: inset 0 0 0 transparent;
    transition: color var(--leaf-motion-fast) var(--leaf-ease),
      box-shadow var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-tabs__tab:hover {
    color: var(--leaf-color-ink);
  }
  .leaf-tabs__tab:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-tabs__tab.is-active {
    font-weight: 600;
    color: var(--leaf-color-ink);
    box-shadow: inset 0 -2px 0 var(--leaf-color-coral);
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-tabs__tab {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-tabs")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-tabs";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Tabs({ tabs, activeId, onChange }) {
  ensureStyles();

  function focusTab(index) {
    const target = document.getElementById(`leaf-tab-${tabs[index].id}`);
    if (target) target.focus();
  }

  function handleKeyDown(event, index) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      onChange(tabs[nextIndex].id);
      focusTab(nextIndex);
    } else if (event.key === "Home") {
      event.preventDefault();
      onChange(tabs[0].id);
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      onChange(tabs[tabs.length - 1].id);
      focusTab(tabs.length - 1);
    }
  }

  return (
    <div className="leaf-tabs" role="tablist">
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            id={`leaf-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`leaf-tabs__tab${isActive ? " is-active" : ""}`}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
