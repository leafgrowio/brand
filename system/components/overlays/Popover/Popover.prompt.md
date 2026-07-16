# Popover

Rich, interactive content anchored to its trigger with a small beak — reach for it over Tooltip when there's more than a one-line label, or over Menu when the content isn't a list of actions.

```jsx
<Popover
  title="Compare to baseline"
  action={{ label: "Change baseline", onClick: handleChangeBaseline }}
>
  Deltas are measured against the 2025 campaign period.
</Popover>
```

Variants: beak "bottom-left" (default) · "bottom-right" · "top-left" · "top-right". Rules: no scrim — the page stays live behind it · the action is a Coral text link, not a button, and there's at most one · position the beak against the trigger, never floating mid-edge.
