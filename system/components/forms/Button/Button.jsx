const CSS = `
  .leaf-btn {
    display: inline-flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    gap: var(--leaf-space-2);
    font-family: var(--leaf-font-sans);
    font-weight: 600;
    line-height: 1;
    border: none;
    border-radius: var(--leaf-radius-pill);
    cursor: pointer;
    transition: background-color var(--leaf-motion-base) var(--leaf-ease),
      opacity var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-btn:focus-visible {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .leaf-btn--primary {
    color: var(--leaf-color-canvas);
    background: var(--leaf-color-coral);
  }
  .leaf-btn--primary:hover:not(:disabled) {
    background: var(--leaf-color-coral-hover);
  }
  .leaf-btn--secondary {
    color: var(--leaf-color-coral);
    background: transparent;
    border: 1px solid var(--leaf-color-coral);
  }
  .leaf-btn--secondary:hover:not(:disabled) {
    background: var(--leaf-color-coral-tint);
  }
  .leaf-btn--sm.leaf-btn--primary {
    font-size: 13px;
    padding: 8px 15px;
  }
  .leaf-btn--md.leaf-btn--primary {
    font-size: 14px;
    padding: 11px 20px;
  }
  .leaf-btn--lg.leaf-btn--primary {
    font-size: 15px;
    padding: 13px 26px;
  }
  .leaf-btn--sm.leaf-btn--secondary {
    font-size: 13px;
    padding: 7px 14px;
  }
  .leaf-btn--md.leaf-btn--secondary {
    font-size: 14px;
    padding: 10px 19px;
  }
  .leaf-btn--lg.leaf-btn--secondary {
    font-size: 15px;
    padding: 12px 25px;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-btn {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-btn")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-btn";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * @startingPoint
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  onClick,
  children,
  type = "button",
}) {
  ensureStyles();

  return (
    <button
      type={type}
      className={`leaf-btn leaf-btn--${variant} leaf-btn--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}
