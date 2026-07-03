# Agent Notes

This is the Leaf brand repository. Treat it as the canonical source for Leaf design foundations and brand assets, not as a throwaway asset dump.

## Repository Purpose

This repo currently stores the brand primitives Leaf uses across products, marketing, sales, and internal materials:

- `assets/font/` - Mona Sans local source asset. Mona is the default system font; Source Serif 4 is an optional editorial/highlight serif loaded from Google Fonts where used.
- `assets/icons/` - icon exports grouped by theme, icon, variation, and format.
- `assets/logos/` - logos for Leaf and its related surfaces.
- `tools/notion_banner_generator.py` - utility for generating Notion page-cover PNGs from secondary colours and existing black icon exports, intended for gallery views that use page covers as card images.

Over time, this repo should become the source of truth for reusable foundations such as typography, color, iconography, logos, design tokens, usage guidance, and distribution-ready exports.

## Working Guidelines

- Preserve asset fidelity. Do not re-export, optimize, compress, rename, or recolor image/font assets unless the user explicitly asks for that change.
- Prefer SVG for implementation guidance and PNG for contexts that require raster assets.
- Keep paired SVG and PNG exports together when adding or reorganizing icon or logo assets.
- Preserve existing asset naming conventions unless the task is specifically about cleanup or normalization.
- Do not treat `.DS_Store` files as brand assets. The repo ignores them, and they should not be committed.
- Keep documentation aligned with the actual folder structure. If assets move, update `README.md` and this file together.
- Keep `DESIGN.md` aligned with any design foundation changes such as colour, typography, logo usage, icon guidance, or tokens.
- Keep `book/` aligned with `DESIGN.md` when visual design foundations land. Preview-only explorations in `book/` do not need to be promoted to canonical docs until the user decides they have landed.
- Be careful with bulk operations under `assets/icons/`; the icon library is large and grouped by theme.
- Before making broad edits, inventory the target folder with `find` or `rg --files` and work on a narrow subset.
- Generated Notion page covers belong in `exports/notion-banners/` by default. Keep the generator and source assets in git; do not commit one-off generated banners unless the user asks for a specific banner asset to become canonical.

## Current Asset Map

### Font

- `assets/font/MonaSans-VariableFont_wdth,wght.ttf`

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

- `_ leaf`
- `answers`
- `blog`
- `colectivo`
- `creative`
- `performance`
- `signal`
- `stores`
- `strategy`

Most product/surface logo groups contain `padding/` and `no-padding/` versions, each with `png/` and `svg/` exports. Use padded exports when the asset should carry its own 50%-Leaf-icon safe margin. Use no-padding exports inside applications, components, navigation, cards, and watermarks where layout spacing is already controlled. The core `_ leaf` icon and logo groups also have `padding/` and `no-padding/` folders.

## Useful Checks

- `git status --short` - see local changes.
- `find assets -type f | wc -l` - count asset files.
- `find assets/icons -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort` - list icon themes.
- `find assets/logos -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort` - list logo groups.
- `bash -n assets/icons/clean_exports.sh` - syntax-check the icon cleanup helper.
- `/Users/gcorrales/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 tools/notion_banner_generator.py "Our values" --suggest-icons 8` - preview Notion banner icon matches.

## Documentation Expectations

When adding a new foundation area, document:

- What the asset or token is for.
- Where the source file lives.
- Which exported format should be used by product, marketing, or sales teams.
- Any naming, sizing, color, or accessibility constraints.

Keep the README user-facing and concise. Put operational details for future agents here.
