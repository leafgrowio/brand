import { Input } from "../../components/forms/Input/Input.jsx";
import { Select } from "../../components/forms/Select/Select.jsx";
import { Switch } from "../../components/forms/Switch/Switch.jsx";
import { Checkbox } from "../../components/forms/Checkbox/Checkbox.jsx";
import { Button } from "../../components/forms/Button/Button.jsx";

const CSS = `
  .leaf-settings__title { font: var(--leaf-type-ui-title); letter-spacing: var(--leaf-type-tracking-title); color: var(--leaf-color-ink); margin-bottom: var(--leaf-space-1); }
  .leaf-settings__meta { font: var(--leaf-type-ui-body); color: var(--leaf-color-warm-grey); margin-bottom: var(--leaf-space-5); }
  .leaf-settings-card {
    max-width: 560px;
    background: var(--leaf-color-canvas);
    border: 1px solid var(--leaf-border-light);
    border-radius: var(--leaf-radius-lg);
    padding: var(--leaf-space-5);
  }
  .leaf-settings-card__title { font: var(--leaf-type-ui-heading); font-weight: 600; color: var(--leaf-color-ink); margin-bottom: var(--leaf-space-1); }
  .leaf-settings-card__sub { font: var(--leaf-type-ui-body); color: var(--leaf-color-warm-grey); margin-bottom: var(--leaf-space-5); }
  .leaf-settings-card__field { margin-bottom: var(--leaf-space-5); }
  .leaf-settings-card__switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--leaf-space-1) 0 var(--leaf-space-4);
    border-bottom: 1px solid var(--leaf-border-light);
    margin-bottom: var(--leaf-space-4);
  }
  .leaf-settings-card__switch-label { font: var(--leaf-type-ui-body); font-weight: 500; color: var(--leaf-color-ink); }
  .leaf-settings-card__checkbox-row { margin-bottom: var(--leaf-space-5); }
  .leaf-settings-card__footer { display: flex; justify-content: flex-end; gap: var(--leaf-space-2); padding-top: 4px; }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-settings")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-settings";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Settings — the workspace preferences form: labelled Input/Select fields,
 * a Switch for an immediate setting, a Checkbox for a saved preference, and
 * a Cancel/Save footer with the one Coral primary action.
 */
export function Settings() {
  ensureStyles();

  return (
    <>
      <h1 className="leaf-settings__title">Settings</h1>
      <p className="leaf-settings__meta">Dash Water · Workspace preferences</p>

      <div className="leaf-settings-card">
        <div className="leaf-settings-card__title">Workspace</div>
        <div className="leaf-settings-card__sub">Applies to every report and dashboard in this workspace.</div>

        <div className="leaf-settings-card__field">
          <Input label="Workspace name" defaultValue="Dash Water" id="workspace-name" />
        </div>

        <div className="leaf-settings-card__field">
          <Select
            label="Reporting currency"
            options={["GBP £", "USD $", "EUR €"]}
            defaultValue="GBP £"
            id="reporting-currency"
          />
        </div>

        <div className="leaf-settings-card__field">
          <Input
            label="Report recipients"
            placeholder="e.g. sam@dashwater.com, finance@dashwater.com"
            help="Comma-separated email addresses. Sent every Monday at 9am."
            id="report-recipients"
          />
        </div>

        <div className="leaf-settings-card__switch-row">
          <span className="leaf-settings-card__switch-label">Send weekly summary</span>
          <Switch defaultChecked id="weekly-summary" />
        </div>

        <div className="leaf-settings-card__checkbox-row">
          <Checkbox label="Include comparison period" defaultChecked id="comparison-period" />
        </div>

        <div className="leaf-settings-card__footer">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </>
  );
}
