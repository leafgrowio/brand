const CSS = `
  .leaf-tooltip-wrap {
    position: relative;
    display: inline-flex;
  }
  .leaf-tooltip {
    position: absolute;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 8px 12px;
    border-radius: var(--leaf-radius-sm);
    background: var(--leaf-color-ink);
    font-family: var(--leaf-font-sans);
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    color: var(--leaf-color-canvas);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity var(--leaf-motion-fast) var(--leaf-ease);
  }
  .leaf-tooltip-wrap:hover .leaf-tooltip,
  .leaf-tooltip-wrap:focus-within .leaf-tooltip {
    opacity: 1;
    visibility: visible;
  }
  .leaf-tooltip__pointer {
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--leaf-color-ink);
    transform: rotate(45deg);
  }
  .leaf-tooltip--top {
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
  }
  .leaf-tooltip--top .leaf-tooltip__pointer {
    left: 50%;
    bottom: -5px;
    transform: translateX(-50%) rotate(45deg);
  }
  .leaf-tooltip--bottom {
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
  }
  .leaf-tooltip--bottom .leaf-tooltip__pointer {
    left: 50%;
    top: -5px;
    transform: translateX(-50%) rotate(45deg);
  }
  .leaf-tooltip--left {
    right: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
  }
  .leaf-tooltip--left .leaf-tooltip__pointer {
    right: -5px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  .leaf-tooltip--right {
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
  }
  .leaf-tooltip--right .leaf-tooltip__pointer {
    left: -5px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-tooltip {
      transition: none;
    }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-tooltip")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-tooltip";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Tooltip({ label, children, position = "top" }) {
  ensureStyles();

  const id = React.useId();
  const trigger = React.cloneElement(children, { "aria-describedby": id });

  return (
    <span className="leaf-tooltip-wrap">
      {trigger}
      <span role="tooltip" id={id} className={`leaf-tooltip leaf-tooltip--${position}`}>
        {label}
        <span className="leaf-tooltip__pointer" aria-hidden="true" />
      </span>
    </span>
  );
}
