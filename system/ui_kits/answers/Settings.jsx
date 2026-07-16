import { Input } from "../../components/forms/Input/Input.jsx";
import { Select } from "../../components/forms/Select/Select.jsx";
import { Switch } from "../../components/forms/Switch/Switch.jsx";
import { Checkbox } from "../../components/forms/Checkbox/Checkbox.jsx";
import { Button } from "../../components/forms/Button/Button.jsx";

const CSS = `
  .leaf-settings__title { font: 640 26px/1.1 var(--leaf-font-sans); letter-spacing: -0.02em; color: var(--leaf-color-ink); margin-bottom: 6px; }
  .leaf-settings__meta { font: 400 13.5px/1.5 var(--leaf-font-sans); color: var(--leaf-color-warm-grey); margin-bottom: 22px; }
  .leaf-settings-card {
    max-width: 560px;
    background: var(--leaf-color-canvas);
    border: 1px solid var(--leaf-border-light);
    border-radius: var(--leaf-radius-lg);
    padding: 26px;
  }
  .leaf-settings-card__title { font: 600 18px/1.2 var(--leaf-font-sans); color: var(--leaf-color-ink); margin-bottom: 4px; }
  .leaf-settings-card__sub { font: 400 13.5px/1.5 var(--leaf-font-sans); color: var(--leaf-color-warm-grey); margin-bottom: 22px; }
  .leaf-settings-card__field { margin-bottom: 20px; }
  .leaf-settings-card__switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0 18px;
    border-bottom: 1px solid rgba(23, 20, 18, 0.07);
    margin-bottom: 18px;
  }
  .leaf-settings-card__switch-label { font: 500 14px/1.3 var(--leaf-font-sans); color: var(--leaf-color-ink); }
  .leaf-settings-card__checkbox-row { margin-bottom: 24px; }
  .leaf-settings-card__footer { display: flex; justify-content: flex-end; gap: 10px; padding-top: 4px; }
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
