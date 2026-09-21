const CSS = `
  .leaf-select {
    display: flex;
    flex-direction: column;
    font-family: var(--leaf-font-sans);
  }
  .leaf-select__label {
    font: var(--leaf-type-ui-label);
    font-weight: 600;
    display: block;
    color: var(--leaf-color-ink);
    margin-bottom: var(--leaf-space-2);
  }
  .leaf-select__label.is-disabled {
    color: var(--leaf-text-muted);
  }
  .leaf-select__control {
    position: relative;
    display: flex;
    align-items: center;
  }
  .leaf-select__field {
    font: var(--leaf-type-ui-body);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    color: var(--leaf-color-ink);
    background: var(--leaf-color-canvas);
    border: 1px solid var(--leaf-border-input);
    border-radius: var(--leaf-radius-md);
    padding: var(--leaf-space-3) var(--leaf-space-6) var(--leaf-space-3) var(--leaf-space-4);
    transition: border-color var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-select__field:focus-visible {
    border-color: var(--leaf-color-coral);
    outline: 2px solid var(--leaf-focus-ring);
    outline-offset: 1px;
  }
  .leaf-select__field--error {
    border-color: var(--leaf-color-state-error);
  }
  .leaf-select__field:disabled {
    color: var(--leaf-text-muted);
    background: var(--leaf-color-stone-faint);
    border: 1px solid var(--leaf-border-light);
    opacity: 0.7;
    cursor: not-allowed;
  }
  .leaf-select__chevron {
    position: absolute;
    right: 14px;
    display: flex;
    pointer-events: none;
    color: var(--leaf-color-warm-grey);
  }
  .leaf-select__help {
    font: var(--leaf-type-ui-label);
    font-weight: 400;
    color: var(--leaf-color-warm-grey);
    margin-top: var(--leaf-space-1);
  }
  .leaf-select__error {
    font: var(--leaf-type-ui-label);
    color: var(--leaf-color-state-error);
    margin-top: var(--leaf-space-1);
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-select__field {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-select")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-select";
  s.textContent = CSS;
  document.head.appendChild(s);
}

function normalizeOptions(options) {
  return options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );
}

export function Select({
  label,
  options = [],
  value,
  defaultValue,
  disabled = false,
  help,
  error,
  id,
  name,
  onChange,
}) {
  ensureStyles();

  const fieldProps = { id, name, disabled, onChange };
  if (value !== undefined) fieldProps.value = value;
  else fieldProps.defaultValue = defaultValue;

  return (
    <div className="leaf-select">
      {label && (
        <label className={`leaf-select__label${disabled ? " is-disabled" : ""}`} htmlFor={id}>
          {label}
        </label>
      )}
      <div className="leaf-select__control">
        <select
          className={`leaf-select__field${error ? " leaf-select__field--error" : ""}`}
          {...fieldProps}
        >
          {normalizeOptions(options).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="leaf-select__chevron" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {error ? (
        <span className="leaf-select__error">{error}</span>
      ) : help ? (
        <span className="leaf-select__help">{help}</span>
      ) : null}
    </div>
  );
}
