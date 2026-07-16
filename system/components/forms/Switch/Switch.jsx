const CSS = `
  .leaf-switch {
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
  .leaf-switch.is-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  .leaf-switch__input {
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
  .leaf-switch__track {
    position: relative;
    flex-shrink: 0;
    width: 44px;
    height: 26px;
    border-radius: var(--leaf-radius-pill);
    background: var(--leaf-color-stone-hairline);
    transition: background-color var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-switch__thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--leaf-color-canvas);
    box-shadow: 0 1px 2px rgba(23, 20, 18, 0.2);
    transition: left var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-switch__input:checked + .leaf-switch__track {
    background: var(--leaf-color-coral);
  }
  .leaf-switch__input:checked + .leaf-switch__track .leaf-switch__thumb {
    left: 21px;
  }
  .leaf-switch__input:focus-visible + .leaf-switch__track {
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-switch__track,
    .leaf-switch__thumb {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-switch")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-switch";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Switch({ label, checked, defaultChecked = false, disabled = false, onChange, id, name }) {
  ensureStyles();

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;

  function handleChange(event) {
    if (!isControlled) setInternalChecked(event.target.checked);
    if (onChange) onChange(event);
  }

  return (
    <label className={`leaf-switch${disabled ? " is-disabled" : ""}`}>
      <input
        type="checkbox"
        role="switch"
        aria-checked={isChecked}
        className="leaf-switch__input"
        id={id}
        name={name}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="leaf-switch__track" aria-hidden="true">
        <span className="leaf-switch__thumb" />
      </span>
      {label && <span className="leaf-switch__label">{label}</span>}
    </label>
  );
}
