---
name: leaf-design
description: Use this skill to generate well-branded interfaces and assets for Leaf — product UI, dashboards, decks, docs, landing pages, social cards, or any artifact that should look and sound like Leaf. It loads Leaf's design tokens, component specs, voice rules, and ready-made specimens.
user-invocable: true
---

# Leaf design

You are working inside Leaf's design system. Everything you produce should look like Leaf (warm Stone grounds, one Coral moment, flat surfaces, Mona Sans with its stylistic sets) and sound like Leaf (UK English, sentence case, mechanism before claim, no hype).

## First

1. Read `readme.md` — the guide and manifest. It carries the voice rules, visual fundamentals, number formats, and the index of everything here.
2. For depth on any rule (colour usage, type scale, charts, overlays, photography), read `DESIGN.md` — the ratified written spec.

## Producing work

**Static HTML artifacts (previews, decks, one-off pages):**
- Link `styles.css` (or inline-copy the token blocks from `tokens/*.css` when the artifact must be fully self-contained) and style exclusively with `var(--leaf-*)` tokens.
- Copy specimen markup from `foundations/*.card.html` and `components/**/*.card.html` — they are small, correct, self-contained HTML you can lift patterns from directly.
- Self-host or embed Mona Sans from `assets/fonts/` and keep `font-feature-settings: var(--leaf-type-features)` on `*` — Google Fonts' Mona Sans loses the brand letterforms.

**Production React code:**
- Import the primitives from `components/<category>/<Name>/<Name>.jsx` (named exports). Read the sibling `<Name>.prompt.md` for the one-line usage contract and `<Name>.d.ts` for props.
- Start new screens from the `@startingPoint` components (Button, Input, Table, Modal, SidebarItem) and from the `ui_kits/answers/` screens, which show the full app shell composed correctly.

**Assets:**
- Icons: copy from `assets/icons/` (black SVG line-art by default); the full themed library is in the brand repo. Never hand-roll decorative SVGs, never recolour icons.
- Logos: copy from `assets/logos/`; Coral on light, Negative on Coral/Ink; respect the padded exports' clear space; icon alone below 80px.
- Imagery: one black line icon centred on one flat secondary-colour field. No stock photos, no gradients (photography is reserved for customer co-brand moments — see DESIGN.md).

## Hard rules (never break)

- One solid-Coral moment per view; Ember (never Coral) for destructive; Coral never in status banners.
- Text only in Ink / Coral / Warm Grey / Aqua-on-dark; every colour fill takes Ink text.
- Sentence case, UK English, no exclamation marks, no emojis; Signal, Answers, Watcher, Leaf Schema capitalised.
- Tabular figures right-aligned; missing data is an em-dash; deltas carry ▲/▼ with Fern/Ember.
- 2px Coral focus ring (Aqua on dark) on everything interactive; honour `prefers-reduced-motion`; never colour as the only cue.
- Don't fabricate metrics or client claims in sample content; use the specimen data patterns.
