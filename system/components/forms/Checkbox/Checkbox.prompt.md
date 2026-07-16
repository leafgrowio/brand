# Checkbox

A 22×22 checkbox for independent on/off choices — reach for it any time more than one option in a group can be selected at once.

```jsx
<Checkbox label="Send a weekly summary" defaultChecked />
```

States: off · on (solid Coral fill, white check) · disabled. Rules: the real `<input type="checkbox">` stays in the DOM and is only visually hidden, never `display: none`, so keyboard and screen-reader behaviour survive · the focus ring lands on the styled box, not the hidden input · use for independent choices — a mutually exclusive set belongs on `Radio`.
