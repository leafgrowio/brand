# Tabs

Slices an already-loaded page into sections — reach for it inside a page, never for top-level or app-wide navigation.

```jsx
<Tabs
  tabs={[
    { id: "overview", label: "Overview" },
    { id: "performance", label: "Performance" },
    { id: "settings", label: "Settings" },
  ]}
  activeId="overview"
  onChange={setActiveId}
/>
```

Variants: none — one row of buttons. States: active (Ink 600, Coral inset underline) · inactive (Warm Grey 500) · hover (inactive fades to Ink) · focus-visible ring. Rules: in-page sections only, never top-level navigation · buttons, not links — nothing here should be independently bookmarkable · arrow keys move focus and selection between tabs (roving tabindex), matching the `tablist` pattern.
