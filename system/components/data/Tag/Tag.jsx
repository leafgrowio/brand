const CSS = `
  .leaf-tag {
    font: var(--leaf-type-ui-label);
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: var(--leaf-space-2);
    border-radius: var(--leaf-radius-pill);
    padding: var(--leaf-space-1) var(--leaf-space-3);
  }
  .leaf-tag--neutral {
    color: var(--leaf-color-ink);
    background: var(--leaf-color-stone);
    border: 1px solid var(--leaf-border-light);
  }
  .leaf-tag--featured {
    color: var(--leaf-color-ink);
    background: var(--leaf-color-coral-tint);
    border: 1px solid var(--leaf-border-brand);
  }
  .leaf-tag--count {
    color: var(--leaf-color-ink);
    background: var(--leaf-color-coral-tint);
    border: 1px solid var(--leaf-border-brand);
    padding: var(--leaf-space-1) var(--leaf-space-2);
  }
  .leaf-tag--removable {
    font: var(--leaf-type-ui-label);
    color: var(--leaf-color-ink);
    background: var(--leaf-color-stone-faint);
    border: 1px solid var(--leaf-border-light);
    padding: var(--leaf-space-1) var(--leaf-space-2) var(--leaf-space-1) var(--leaf-space-3);
  }
  .leaf-tag__remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--leaf-text-muted);
    cursor: pointer;
    transition: background-color var(--leaf-motion-fast) var(--leaf-ease),
      color var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-tag__remove:hover {
    background: var(--leaf-color-stone);
    color: var(--leaf-color-ink);
  }
  .leaf-tag__remove:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-tag__remove {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-tag")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-tag";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Tag({ variant = "neutral", onRemove, children }) {
  ensureStyles();

  return (
    <span className={`leaf-tag leaf-tag--${variant}`}>
      {children}
      {variant === "removable" && (
        <button type="button" className="leaf-tag__remove" aria-label="Remove" onClick={onRemove}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}
