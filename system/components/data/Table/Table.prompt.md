# Table

A real `<table>` for scannable, numeric-heavy data — reach for it for reporting grids and list views wherever rows need sortable dimensions and right-aligned figures, never for card-style summaries.

```jsx
<Table
  caption="Spend and return by channel"
  zebra
  columns={[
    { key: "channel", label: "Channel" },
    { key: "spend", label: "Spend", numeric: true },
    { key: "roas", label: "ROAS", numeric: true },
    { key: "delta", label: "Δ", numeric: true },
  ]}
  rows={[
    { channel: "Paid media", spend: "£1.49M", roas: "3.72", delta: { value: "18%", delta: "up" } },
  ]}
/>
```

Variants: default · `zebra` alternating rows · cells with a dimension `swatch`, a `heat` background, or a `delta` arrow. Rules: header is always a quiet Stone-faint tint with Ink labels over a single rule — never a heavy Ink bar · numeric columns are right-aligned with tabular figures · missing values render an em-dash in muted text, never a blank cell · delta is Fern ▲ for `up` and Ember ▼ for `down`, and never appears outside a delta column.
