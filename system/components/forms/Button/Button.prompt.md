# Button

A pill-shaped action button for the one decisive action on a view — reach for `primary` for that action and `secondary` for everything else nearby.

```jsx
<Button variant="primary" icon={<PlusIcon />}>Create report</Button>
```

Variants: `primary` (solid Coral) · `secondary` (Coral outline). Sizes: `sm` · `md` · `lg`. Rules: one `primary` button per view — `secondary` stays visually lighter so it never competes · icon renders before the label with an 8px gap · disabled dims to 40% opacity and sets the real `disabled` attribute.
