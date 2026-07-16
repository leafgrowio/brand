# Badge

A status badge for a record's current state — reach for it in tables, cards, and list rows wherever a status needs to read at a glance, never as a generic label (use Tag for that).

```jsx
<Badge state="success">Live</Badge>
```

Variants: `success` · `warning` · `error` · `info`. Rules: always renders the solid dot alongside the label — colour and text pair so meaning survives greyscale · one state per badge, never combine states · Ink label text stays constant across states, only the tint fill, border, and dot change.
