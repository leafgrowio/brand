# Alert

An inline status banner for page- or section-level feedback — reach for it to lead with what happened and follow with the consequence, never for transient confirmations (there's no toast pattern here yet).

```jsx
<Alert state="success" title="Tracking restored.">
  Signal reconnected to Shopify at 09:14.
</Alert>
```

Variants: `info` · `success` · `warning` · `error`. Rules: one structure across all four states — tint fill, tinted border, 3px left accent, solid round badge, Ink message — only the colour and glyph change · lead with the bold consequence-free fact in `title`, then the consequence in `children` · Coral never appears in an alert · `role` is set automatically ("alert" for warning/error, "status" otherwise) so don't pass it yourself.
