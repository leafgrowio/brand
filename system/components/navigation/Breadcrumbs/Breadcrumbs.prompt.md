# Breadcrumbs

Shows where the current page sits in a hierarchy — reach for it under a page title whenever content is nested more than one level deep.

```jsx
<Breadcrumbs
  items={[
    { label: "Reports", href: "/reports" },
    { label: "Q2 performance", href: "/reports/q2" },
    { label: "Meta ads" },
  ]}
/>
```

Variants: none — a single trail. States: ancestor link · current page (last item, no `href`). Rules: ancestors are Coral links, never grey — this is a canonical Leaf decision, not a suggestion · the last item is always the current page: no link, Ink 600, `aria-current="page"` · separator is a literal `›` at low-contrast Ink, never a slash or chevron icon.
