# Radio

A 22×22 radio for a single choice from a mutually exclusive set — reach for it any time exactly one option in a group must be selected.

```jsx
<Radio name="digest" value="weekly" label="Weekly digest" defaultChecked />
```

States: off · on (Coral ring + 11px Coral dot) · disabled. Rules: give every radio in a set the same `name` so only one can be checked · the real `<input type="radio">` stays visually hidden but present, never `display: none` · use for a single required choice — independent toggles belong on `Checkbox`.
