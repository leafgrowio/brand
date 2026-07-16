# Input

A labelled Canvas text field — reach for it for any single-line form value, from campaign names to search terms.

```jsx
<Input label="Campaign name" placeholder="e.g. Black Friday 2026" help="Visible to your team only." />
```

States: default · focus (Coral border + ring) · error (Ember border, message replaces help text) · disabled. Rules: an error message always replaces the help text, never shows alongside it · focus is a Coral border plus a 2px Coral outline at 1px offset, not a box-shadow ring · disabled dims the label, border, and text and sets the real `disabled` attribute.
