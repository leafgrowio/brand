# Tag

A utility chip for labels, filters, and counts — reach for it for neutral categorisation and removable filter pills, never for status (use Badge for that).

```jsx
<Tag variant="removable" onRemove={() => removeFilter("channel")}>
  Paid media
</Tag>
```

Variants: `neutral` (Stone) · `featured` (Coral tint) · `count` (Coral-tint pill, tighter padding) · `removable` (hairline chip with a close button). Rules: `removable`'s close control is a real `<button aria-label="Remove">`, never a bare icon in a span · `count` is for numeric pills only, keep the label short · Coral tint (`featured`/`count`) is a light accent here, not the one decisive Coral moment — don't stack more than a couple per view.
