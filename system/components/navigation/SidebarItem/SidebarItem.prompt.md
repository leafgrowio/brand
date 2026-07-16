# SidebarItem

A single row in the primary navigation sidebar — reach for it whenever you're building the app shell's left-hand nav, never for in-page or secondary navigation.

```jsx
<SidebarItem
  icon={<GridIcon />}
  label="Overview"
  href="/overview"
  active
/>
```

Variants: rest · hover · active · with-count · collapsed (36×36 icon tile). States: `active` drives `aria-current="page"`; `collapsed` swaps the label to `title`/`aria-label`. Rules: active is the one decisive Coral moment in the sidebar — tint fill, Coral text/icon, 600 weight, 3px inset left accent — never combine it with the count pill's Coral on more than one item at a time · icon slot is always 19×19, supplied by the caller, never hand-rolled inline · group items under a plain uppercase label styled per the spec (`font:600 11px; letter-spacing:.07em; color:var(--leaf-text-muted); text-transform:uppercase`) rather than a separate component.
