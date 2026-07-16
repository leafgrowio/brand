const CSS = `
  .leaf-radio {
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
  .leaf-radio.is-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .leaf-radio__input {
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
  .leaf-radio__box {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1.5px solid rgba(23, 20, 18, 0.3);
    background: var(--leaf-color-canvas);
    transition: border-color var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-radio__input:checked + .leaf-radio__box {
    border-color: var(--leaf-color-coral);
  }
  .leaf-radio__input:focus-visible + .leaf-radio__box {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  .leaf-radio__dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--leaf-color-coral);
    opacity: 0;
    transition: opacity var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-radio__input:checked + .leaf-radio__box .leaf-radio__dot {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-radio__box,
    .leaf-radio__dot {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-radio")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-radio";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Radio({ label, checked, defaultChecked, disabled = false, name, value, onChange, id }) {
  ensureStyles();

  const inputProps = { id, name, value, disabled, onChange };
  if (checked !== undefined) inputProps.checked = checked;
  else inputProps.defaultChecked = defaultChecked;

  return (
    <label className={`leaf-radio${disabled ? " is-disabled" : ""}`}>
      <input type="radio" className="leaf-radio__input" {...inputProps} />
      <span className="leaf-radio__box" aria-hidden="true">
        <span className="leaf-radio__dot" />
      </span>
      {label && <span className="leaf-radio__label">{label}</span>}
    </label>
  );
}
