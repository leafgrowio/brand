const CSS = `
  .leaf-input {
    display: flex;
    flex-direction: column;
    font-family: var(--leaf-font-sans);
  }
  .leaf-input__label {
    display: block;
    font-family: var(--leaf-font-sans);
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    color: var(--leaf-color-ink);
    margin-bottom: 7px;
  }
  .leaf-input__label.is-disabled {
    color: var(--leaf-text-muted);
  }
  .leaf-input__field {
    font-family: var(--leaf-font-sans);
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: var(--leaf-color-ink);
    background: var(--leaf-color-canvas);
    border: 1px solid var(--leaf-border-input);
    border-radius: var(--leaf-radius-md);
    padding: 11px 14px;
    transition: border-color var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-input__field::placeholder {
    color: var(--leaf-text-muted);
  }
  .leaf-input__field:focus-visible {
    border-color: var(--leaf-color-coral);
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 1px;
  }
  .leaf-input__field--error {
    border-color: var(--leaf-color-state-error);
  }
  .leaf-input__field:disabled {
    color: var(--leaf-text-muted);
    background: var(--leaf-color-stone-faint);
    border: 1px solid rgba(23, 20, 18, 0.12);
    opacity: 0.7;
    cursor: not-allowed;
  }
  .leaf-input__help {
    font-family: var(--leaf-font-sans);
    font-size: 12.5px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--leaf-color-warm-grey);
    margin-top: 6px;
  }
  .leaf-input__error {
    font-family: var(--leaf-font-sans);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--leaf-color-state-error);
    margin-top: 6px;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-input__field {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-input")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-input";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * @startingPoint
 */
export function Input({
  label,
  value,
  defaultValue,
  placeholder,
  help,
  error,
  disabled = false,
  id,
  name,
  type = "text",
  onChange,
}) {
  ensureStyles();

  const fieldProps = { id, name, type, placeholder, disabled, onChange };
  if (value !== undefined) fieldProps.value = value;
  else fieldProps.defaultValue = defaultValue;

  return (
    <div className="leaf-input">
      {label && (
        <label className={`leaf-input__label${disabled ? " is-disabled" : ""}`} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`leaf-input__field${error ? " leaf-input__field--error" : ""}`}
        {...fieldProps}
      />
      {error ? (
        <span className="leaf-input__error">{error}</span>
      ) : help ? (
        <span className="leaf-input__help">{help}</span>
      ) : null}
    </div>
  );
}
