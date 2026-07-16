# Tooltip

A presentational label for a single trigger — reach for it to add a short clarification on hover/focus, never to carry information the interface depends on.

```jsx
<Tooltip label="Exports as CSV">
  <button type="button">Export</button>
</Tooltip>
```

Variants: `position` `top` (default) · `bottom` · `left` · `right`. Rules: shows on hover/focus only, driven by CSS — never mount it as an always-open popover · never the only place essential information lives · wraps a single trigger element, which receives the `aria-describedby` link to the tooltip.
