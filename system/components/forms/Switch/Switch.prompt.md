# Switch

A 44×26 pill toggle for a setting that takes effect immediately — reach for it for anything applied right away, never for a choice that needs an explicit save.

```jsx
<Switch label="Email notifications" defaultChecked />
```

States: off (Stone-hairline track) · on (solid Coral track, thumb slides to 21px) · disabled. Rules: exposes `role="switch"` with `aria-checked` kept in sync, not default checkbox semantics · use for something that applies immediately — a setting that needs confirmation belongs in a form with `Checkbox` instead.
