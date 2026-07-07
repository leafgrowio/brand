# Leaf Brand

This repository is Leaf's canonical, public source of brand assets: fonts, icons, logos, the design foundation spec, and an HTML brand book. It is public because assets are fetched at runtime over plain HTTPS from `raw.githubusercontent.com/leafgrowio/brand/main/...`, so anyone building against Leaf's brand (internal tooling, partner integrations, or the open web) can pull the exact current asset without needing repo access or a local clone.

Tools that generate, package, or clean these assets (the Notion banner generator, icon and logo manifest generators, export cleanup scripts) live in Leaf's internal `leaf` plugin repo, not here. See the "Tools" section below.

## What Is Here

```text
assets/
  font/
  icons/
  logos/
book/
DESIGN.md
```

`DESIGN.md` contains the design-system foundation notes, starting with Leaf's core colour palette and implementation token names.

`book/` contains an HTML-based brand book for visually reviewing the design foundations and brand assets together. Open `book/index.html` in a browser to view it.

### Font

`assets/font/` contains the two typefaces Leaf uses for product, marketing, and brand communication: Mona Sans and Source Serif 4. Both are distributed under the SIL Open Font License, and each font folder includes its own `OFL.txt` and `README.txt` alongside the variable-font source files.

Mona Sans is the main font for product, UI, navigation, labels, body copy, landing pages, and most brand communication. Source Serif 4 is an optional editorial serif for blogs, long-form content, banners, marketing communications, pull quotes, and selected highlight moments. Load both fonts from Google Fonts for online usage, using Source Serif 4 `800` for headlines and italic `500` for quotes.

### Icons

`assets/icons/` contains roughly 1,250 icons grouped by theme, then icon, then colour variation, then format. Each icon keeps its SVG and PNG exports together under the same icon-name folder.

Current themes:

- `banking`
- `business`
- `communications`
- `ecology`
- `education`
- `electronics`
- `logistics`
- `shopping`
- `social`

Current icon structure:

```text
assets/icons/<theme>/<icon>/<variation>/<format>/<asset>
```

Icons with alternate drawings add an icon-variant layer:

```text
assets/icons/<theme>/<icon>/<icon-variant>/<variation>/<format>/<asset>
```

Use `default` for the unsuffixed original export and numbered folders such as `1`, `2`, or `3` for alternate drawings. Filenames should match the icon name, with the numbered variant appended when relevant.

Examples:

```text
assets/icons/business/Analytical Report/black/svg/Analytical Report.svg
assets/icons/shopping/Discount Tag/white solid/png/Discount Tag.png
assets/icons/electronics/Dataserver/2/black/svg/Dataserver_2.svg
```

Use SVG when possible for product and web implementation. Use PNG when a raster format is required.

### Logos

`assets/logos/` contains logos for Leaf and related Leaf surfaces.

Current groups:

- `leaf`
- `answers`
- `blog`
- `colectivo`
- `creative`
- `performance`
- `signal`
- `stores`
- `strategy`

Most service and property logo groups include both `padding/` and `no-padding/` export modes, each with `png/` and `svg/` folders. Use `padding/` when the asset should carry its own safe area; the margin is equal to 50% of the Leaf icon. Use `no-padding/` inside applications, components, navigation, cards, and watermarks where the layout already controls spacing.

The core `leaf` group separates the Leaf icon and full logo:

```text
assets/logos/leaf/icon/
assets/logos/leaf/icon/padding/svg/
assets/logos/leaf/icon/no-padding/svg/
assets/logos/leaf/logo/padding/svg/
assets/logos/leaf/logo/no-padding/svg/
assets/logos/<group>/padding/svg/
assets/logos/<group>/no-padding/svg/
```

## Working With Assets

- Preserve source asset quality. Do not compress, recolor, rename, or re-export assets unless that is the intended change.
- Keep SVG and PNG exports paired when adding new logos or icons.
- Prefer existing folder conventions over introducing new naming patterns.
- Keep documentation updated when adding new foundation areas, asset groups, or usage rules.

## Paths Are a Public Contract

Assets are consumed remotely over `raw.githubusercontent.com/leafgrowio/brand/main/...`, not through a local clone, so every asset path is a stable public URL that other systems depend on directly. Renaming, moving, or restructuring a folder is a breaking change for every consumer of that URL, not a local refactor. Coordinate any path change with a manifest regeneration in the `leaf` plugin repo (see "Tools" below) before merging, and treat path stability as a first-class constraint alongside asset fidelity.

## Tools

Asset tooling — the Notion banner generator, the icon and logo manifest generators, and export cleanup scripts — lives in Leaf's internal `leaf` plugin repo, not in this repo. Those tools run against a local clone of this repo and read or write files here directly; they are not published here because they are internal-only and not part of the public asset contract.

## Agent Setup

This repo includes `AGENTS.md` for agent-facing instructions. `CLAUDE.md` is a symlink to the same file so Claude-compatible tooling reads the same guidance.

## Future Foundations

This repo is expected to grow beyond static assets. Good next additions include:

- Typography guidance for product and marketing contexts.
- Logo minimum sizing and placement examples.
- Icon selection and implementation rules.
- Export or packaging workflows for downstream teams and apps.
