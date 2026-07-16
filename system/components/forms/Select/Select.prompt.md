# Select

A labelled dropdown matching `Input`'s field styling — reach for it any time a value must come from a fixed list.

```jsx
<Select label="Reporting frequency" options={["Daily", "Weekly", "Monthly"]} defaultValue="Weekly" />
```

Options: array of plain strings or `{ value, label }` pairs. States: default · focus · error · disabled. Rules: same border, radius, and focus treatment as `Input` · the chevron is `pointer-events: none` and purely decorative — the real `<select>` handles interaction.
