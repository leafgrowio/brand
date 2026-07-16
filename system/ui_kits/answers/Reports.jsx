import { Tabs } from "../../components/navigation/Tabs/Tabs.jsx";
import { Table } from "../../components/data/Table/Table.jsx";
import { Badge } from "../../components/data/Badge/Badge.jsx";

const CSS = `
  .leaf-reports__title { font: 640 26px/1.1 var(--leaf-font-sans); letter-spacing: -0.02em; color: var(--leaf-color-ink); margin-bottom: 6px; }
  .leaf-reports__meta { font: 400 13.5px/1.5 var(--leaf-font-sans); color: var(--leaf-color-warm-grey); margin-bottom: 22px; }
  .leaf-reports__tabs { margin-bottom: 20px; }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-reports")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-reports";
  s.textContent = CSS;
  document.head.appendChild(s);
}

const TABS = [
  { id: "all", label: "All reports" },
  { id: "scheduled", label: "Scheduled" },
  { id: "archived", label: "Archived" },
];

const COLUMNS = [
  { key: "channel", label: "Channel" },
  { key: "spend", label: "Spend", numeric: true },
  { key: "roas", label: "ROAS", numeric: true },
  { key: "delta", label: "Δ", numeric: true },
  { key: "status", label: "Status" },
];

const ROWS = [
  {
    channel: { value: "Paid media", swatch: "var(--leaf-chart-series-1)" },
    spend: "£1.49M",
    roas: { value: "3.72", heat: "var(--leaf-ramp-harbor-1)" },
    delta: { value: "18%", delta: "up" },
    status: { value: <Badge state="success">Live</Badge> },
  },
  {
    channel: { value: "Organic", swatch: "var(--leaf-chart-series-2)" },
    spend: "£0.55M",
    roas: { value: "2.98", heat: "var(--leaf-heatmap-mid)" },
    delta: { value: "4%", delta: "up" },
    status: { value: <Badge state="success">Live</Badge> },
  },
  {
    channel: { value: "Email", swatch: "var(--leaf-chart-series-3)" },
    spend: "£0.37M",
    roas: { value: "2.14", heat: "var(--leaf-ramp-coral-1)" },
    delta: { value: "6%", delta: "down" },
    status: { value: <Badge state="warning">Needs review</Badge> },
  },
  {
    channel: { value: "Referral", swatch: "var(--leaf-chart-series-4)" },
    spend: "£0.21M",
    roas: { value: "4.10", heat: "var(--leaf-ramp-harbor-2)" },
    delta: null,
    status: { value: <Badge state="info">Draft</Badge> },
  },
  {
    channel: { value: "Social", swatch: "var(--leaf-chart-series-5)" },
    spend: "£0.18M",
    roas: { value: "2.45", heat: "var(--leaf-heatmap-mid)" },
    delta: { value: "9%", delta: "up" },
    status: { value: <Badge state="success">Live</Badge> },
  },
  {
    channel: { value: "Affiliate", swatch: "var(--leaf-chart-series-6)" },
    spend: "£0.09M",
    roas: { value: "1.86", heat: "var(--leaf-ramp-coral-2)" },
    delta: { value: "3%", delta: "down" },
    status: { value: <Badge state="warning">Needs review</Badge> },
  },
];

/**
 * Reports — the table-heavy list view: in-page Tabs slicing All reports /
 * Scheduled / Archived, over a quiet channel-performance Table with a
 * diverging harbor-to-coral ROAS heatmap and Fern/Ember delta arrows.
 */
export function Reports() {
  ensureStyles();
  const [activeTab, setActiveTab] = React.useState("all");

  return (
    <>
      <h1 className="leaf-reports__title">Reports</h1>
      <p className="leaf-reports__meta">Dash Water · Channel performance, trailing 30 days</p>

      <div className="leaf-reports__tabs">
        <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} />
      </div>

      <Table
        caption="Spend and return by channel, trailing 30 days"
        zebra
        columns={COLUMNS}
        rows={ROWS}
      />
    </>
  );
}
