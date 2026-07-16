const CSS = `
  .leaf-breadcrumbs {
    display: flex;
  }
  .leaf-breadcrumbs__list {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--leaf-font-sans);
    font-size: 13.5px;
    font-weight: 500;
    line-height: 1;
  }
  .leaf-breadcrumbs__item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .leaf-breadcrumbs__link {
    color: var(--leaf-text-accent);
    text-decoration: none;
    transition: color var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-breadcrumbs__link:hover {
    color: var(--leaf-color-ink);
  }
  .leaf-breadcrumbs__link:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-breadcrumbs__separator {
    color: rgba(23, 20, 18, 0.28);
  }
  .leaf-breadcrumbs__current {
    color: var(--leaf-color-ink);
    font-weight: 600;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-breadcrumbs__link {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-breadcrumbs")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-breadcrumbs";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Breadcrumbs({ items }) {
  ensureStyles();

  const lastIndex = items.length - 1;

  return (
    <nav className="leaf-breadcrumbs" aria-label="Breadcrumb">
      <ol className="leaf-breadcrumbs__list">
        {items.map((item, index) => {
          const isCurrent = index === lastIndex;
          return (
            <li key={item.label} className="leaf-breadcrumbs__item">
              {isCurrent ? (
                <span className="leaf-breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a className="leaf-breadcrumbs__link" href={item.href}>
                  {item.label}
                </a>
              )}
              {!isCurrent && <span className="leaf-breadcrumbs__separator" aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
