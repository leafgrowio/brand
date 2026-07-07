# Agent Notes

This is the Leaf brand repository. Treat it as the canonical, public source for Leaf's brand assets and design foundations — not as a throwaway asset dump, and not as a place to add internal tooling.

## Repository Purpose

This repo stores the brand primitives Leaf uses across products, marketing, sales, and internal materials, published publicly so they can be fetched at runtime over `raw.githubusercontent.com/leafgrowio/brand/main/...`:

- `assets/font/` - Mona Sans and Source Serif 4 source files, both SIL Open Font License. Mona Sans is the default system font; Source Serif 4 is an optional editorial/highlight serif loaded from Google Fonts where used.
- `assets/icons/` - icon exports grouped by theme, icon, variation, and format.
- `assets/logos/` - logos for Leaf and its related surfaces.

Over time, this repo should become the source of truth for reusable foundations such as typography, color, iconography, logos, design tokens, usage guidance, and distribution-ready exports.

Tooling that generates, packages, or cleans these assets (Notion banner generator, icon/logo manifest generators, export cleanup) lives in the `leaf` plugin repo (`prompts/brand/tools/`), not here. That tooling runs against a local clone of this repo. Do not add scripts or generators to this repo; if a new tool is needed, it belongs in the plugin repo.

## Working Guidelines

- Preserve asset fidelity. Do not re-export, optimize, compress, rename, or recolor image/font assets unless the user explicitly asks for that change.
- Prefer SVG for implementation guidance and PNG for contexts that require raster assets.
- Keep paired SVG and PNG exports together when adding or reorganizing icon or logo assets.
- Preserve existing asset naming conventions unless the task is specifically about cleanup or normalization.
- Do not treat `.DS_Store` files as brand assets. The repo ignores them, and they should not be committed.
- Paths are a public URL contract. This repo is consumed remotely via `raw.githubusercontent.com/leafgrowio/brand/main/...`, so every folder and file path is effectively a stable public API. Any rename, move, or restructure is a breaking change for downstream consumers and must be coordinated with a manifest regeneration in the `leaf` plugin repo before or immediately after the change lands here.
- Keep documentation aligned with the actual folder structure. If assets move, update `README.md` and this file together.
- Keep `DESIGN.md` aligned with any design foundation changes such as colour, typography, logo usage, icon guidance, or tokens.
- Keep `book/` aligned with `DESIGN.md` when visual design foundations land. Preview-only explorations in `book/` do not need to be promoted to canonical docs until the user decides they have landed.
- Be careful with bulk operations under `assets/icons/`; the icon library is large and grouped by theme.
- Before making broad edits, inventory the target folder with `find` or `rg --files` and work on a narrow subset.

## Current Asset Map

### Font

- `assets/font/Mona Sans/`
- `assets/font/Source Serif 4/`

### Icons

Icon themes currently include:

- `banking`
- `business`
- `communications`
- `ecology`
- `education`
- `electronics`
- `logistics`
- `shopping`
- `social`

Each theme is organized by icon name. Each icon folder is organized by colour variation:

- `black`
- `black solid`
- `white`
- `white solid`

Each variation contains `png/` and `svg/` exports. The canonical structure is:

```text
assets/icons/<theme>/<icon>/<variation>/<format>/<asset>
```

Icons with alternate drawings add an icon-variant layer between the icon and colour variation:

```text
assets/icons/<theme>/<icon>/<icon-variant>/<variation>/<format>/<asset>
```

Use `default` for the unsuffixed original export and numbered folders such as `1`, `2`, or `3` for alternate drawings. Filenames should match the icon name; numbered variants append the variant suffix, for example `Dataserver_2.svg`.

### Logos

Logo groups currently include:

- `leaf`
- `answers`
- `blog`
- `colectivo`
- `creative`
- `performance`
- `signal`
- `stores`
- `strategy`

Most product/surface logo groups contain `padding/` and `no-padding/` versions, each with `png/` and `svg/` exports. Use padded exports when the asset should carry its own 50%-Leaf-icon safe margin. Use no-padding exports inside applications, components, navigation, cards, and watermarks where layout spacing is already controlled. The core `leaf` icon and logo groups also have `padding/` and `no-padding/` folders.

## Useful Checks

- `git status --short` - see local changes.
- `find assets -type f | wc -l` - count asset files.
- `find assets/icons -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort` - list icon themes.
- `find assets/logos -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort` - list logo groups.

## Documentation Expectations

When adding a new foundation area, document:

- What the asset or token is for.
- Where the source file lives.
- Which exported format should be used by product, marketing, or sales teams.
- Any naming, sizing, color, or accessibility constraints.

Keep the README user-facing and concise. Put operational details for future agents here.
