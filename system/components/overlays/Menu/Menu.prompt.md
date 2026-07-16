# Menu

A small, anchor-free list of actions from a trigger — a row's overflow button, a card's kebab menu. Never dims the page.

```jsx
<Menu
  items={[
    { label: "Rename", icon: <PencilIcon />, onSelect: handleRename },
    { label: "Duplicate", icon: <DuplicateIcon />, onSelect: handleDuplicate },
    { label: "Export", icon: <ExportIcon />, onSelect: handleExport },
    "divider",
    { label: "Delete", icon: <TrashIcon />, destructive: true, onSelect: handleDelete },
  ]}
/>
```

States: default item · hover (rgba(23,20,18,0.05) wash) · destructive (Ember text). Rules: put a `"divider"` entry immediately before a destructive item, never after · icons are the 16×16 stroke glyphs from the component spec, supplied by the consumer, never hand-rolled per instance · dismiss on outside click or Esc is the consumer's job — Menu itself is purely presentational and carries no scrim.
