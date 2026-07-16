# Drawer

An edge-anchored panel over the same Ink scrim as Modal — reach for it over Modal when the task is scoped but longer, or when the user benefits from seeing the page behind it.

```jsx
<Drawer
  open={open}
  title="Filters"
  onClose={() => setOpen(false)}
  footer={<button className="leaf-btn-primary-full">Apply filters</button>}
>
  <FilterFields />
</Drawer>
```

Variants: side "right" (default) · "left". States: open · closed (returns null).

Rules: square outer corners against the viewport edge — never round the side that meets the edge · width is `min(420px, 86vw)`, never wider · footer is typically one full-width Coral confirm, not a Cancel/confirm pair (closing without confirming is the × or scrim click) · closes on × click or a click on the scrim; clicks inside the panel never bubble to the scrim.
