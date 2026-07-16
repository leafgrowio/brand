const CSS = `
  .leaf-sidebar-item {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 9px 12px;
    border-radius: var(--leaf-radius-sm);
    font-family: var(--leaf-font-sans);
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    color: var(--leaf-color-ink);
    text-decoration: none;
    box-shadow: none;
    transition: background-color var(--leaf-motion-fast) var(--leaf-ease),
      color var(--leaf-motion-fast) var(--leaf-ease),
      box-shadow var(--leaf-motion-fast) var(--leaf-ease),
      padding var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-sidebar-item:hover {
    background: rgba(23, 20, 18, 0.05);
  }
  .leaf-sidebar-item:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-sidebar-item.is-active {
    padding: 9px 12px 9px 14px;
    font-weight: 600;
    color: var(--leaf-text-accent);
    background: var(--leaf-color-coral-tint);
    box-shadow: inset 3px 0 0 var(--leaf-color-coral);
  }
  .leaf-sidebar-item.is-active:hover {
    background: var(--leaf-color-coral-tint);
  }
  .leaf-sidebar-item__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 19px;
    height: 19px;
    flex-shrink: 0;
  }
  .leaf-sidebar-item__label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .leaf-sidebar-item__count {
    margin-left: auto;
    font-family: var(--leaf-font-sans);
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    color: var(--leaf-text-accent);
    background: var(--leaf-color-coral-tint);
    border-radius: var(--leaf-radius-pill);
    padding: 3px 7px;
  }
  .leaf-sidebar-item.is-collapsed {
    width: 36px;
    height: 36px;
    padding: 0;
    justify-content: center;
    gap: 0;
  }
  .leaf-sidebar-item.is-collapsed.is-active {
    padding: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-sidebar-item {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-sidebar-item")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-sidebar-item";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * @startingPoint
 */
export function SidebarItem({ icon, label, active = false, count, href = "#", onClick, collapsed = false }) {
  ensureStyles();

  const classes = ["leaf-sidebar-item"];
  if (active) classes.push("is-active");
  if (collapsed) classes.push("is-collapsed");

  return (
    <a
      href={href}
      className={classes.join(" ")}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
    >
      <span className="leaf-sidebar-item__icon" aria-hidden="true">
        {icon}
      </span>
      {!collapsed && <span className="leaf-sidebar-item__label">{label}</span>}
      {!collapsed && typeof count === "number" && (
        <span className="leaf-sidebar-item__count">{count}</span>
      )}
    </a>
  );
}
