# Modal

A centred, scrim-backed dialog for one decision at a time — use it to confirm or block on a single choice, never for a multi-step flow.

```jsx
<Modal
  open={open}
  title="Delete this report?"
  onClose={() => setOpen(false)}
  destructive
  actions={
    <>
      <button className="leaf-btn-secondary-neutral" onClick={() => setOpen(false)}>Cancel</button>
      <button className="leaf-btn-destructive" onClick={handleDelete}>Delete report</button>
    </>
  }
>
  "Black Friday 2026" and its 4 connected sources will be removed. This can't be undone.
</Modal>
```

States: open · closed (returns null) · destructive (documentation-only hint — style the confirm button yourself).

Rules: one decision per modal, never stack a second modal on top · the destructive primary is solid Ember (`--leaf-color-state-error`), never Coral — Cancel stays neutral (Ink text, `1px rgba(23,20,18,0.16)` border, pill) · closes on × click, Esc, or a click on the scrim; clicks inside the card never bubble to the scrim · confirmations name the consequence ("This can't be undone…") and the button repeats the verb ("Delete report", not "Confirm").
