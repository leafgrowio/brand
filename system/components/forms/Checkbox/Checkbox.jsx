const CSS = `
  .leaf-checkbox {
    display: inline-flex;
    align-items: center;
    gap: var(--leaf-space-2);
    cursor: pointer;
    font-family: var(--leaf-font-sans);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--leaf-color-ink);
  }
  .leaf-checkbox.is-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .leaf-checkbox__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .leaf-checkbox__box {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    border: 1.5px solid rgba(23, 20, 18, 0.3);
    background: var(--leaf-color-canvas);
    transition: background-color var(--leaf-motion-fast) var(--leaf-ease),
      border-color var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-checkbox__input:checked + .leaf-checkbox__box {
    background: var(--leaf-color-coral);
    border-color: var(--leaf-color-coral);
  }
  .leaf-checkbox__input:focus-visible + .leaf-checkbox__box {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-checkbox__check {
    opacity: 0;
    color: var(--leaf-color-canvas);
  }
  .leaf-checkbox__input:checked + .leaf-checkbox__box .leaf-checkbox__check {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-checkbox__box {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-checkbox")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-checkbox";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Checkbox({ label, checked, defaultChecked, disabled = false, onChange, id, name }) {
  ensureStyles();

  const inputProps = { id, name, disabled, onChange };
  if (checked !== undefined) inputProps.checked = checked;
  else inputProps.defaultChecked = defaultChecked;

  return (
    <label className={`leaf-checkbox${disabled ? " is-disabled" : ""}`}>
      <input type="checkbox" className="leaf-checkbox__input" {...inputProps} />
      <span className="leaf-checkbox__box" aria-hidden="true">
        <svg
          className="leaf-checkbox__check"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="5 12 10 17 19 7" />
        </svg>
      </span>
      {label && <span className="leaf-checkbox__label">{label}</span>}
    </label>
  );
}
