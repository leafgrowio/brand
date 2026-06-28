# Leaf Brand

This repository is the canonical home for Leaf's brand assets and design foundations. Today it contains the core asset library for typography, icons, and logos. Over time it should become the source of truth for the design primitives that power Leaf across product, marketing, sales, and internal materials.

## What Is Here

```text
assets/
  font/
  icons/
  logos/
```

### Font

`assets/font/` contains Mona Sans, the primary font Leaf currently uses for the business.

Current file:

- `MonaSans-VariableFont_wdth,wght.ttf`

### Icons

`assets/icons/` contains icon exports grouped by context. Each context includes color/style treatments, and each treatment includes both SVG and PNG exports.

Current contexts:

- `banking`
- `business`
- `communications`
- `ecology`
- `education`
- `electronics`
- `logistics`
- `shopping`
- `social`

Current treatment structure:

```text
assets/icons/<context>/<treatment>/<format>/<asset>
```

Examples:

```text
assets/icons/business/black/svg/
assets/icons/shopping/white solid/png/
```

Use SVG when possible for product and web implementation. Use PNG when a raster format is required.

### Logos

`assets/logos/` contains logos for Leaf and related Leaf surfaces.

Current groups:

- `_ leaf`
- `answers`
- `blog`
- `colectivo`
- `signal`
- `stores`

Most logo groups include `png/` and `svg/` exports. The core `_ leaf` group separates the Leaf icon and full logo:

```text
assets/logos/_ leaf/icon/
assets/logos/_ leaf/logo/
```

## Working With Assets

- Preserve source asset quality. Do not compress, recolor, rename, or re-export assets unless that is the intended change.
- Keep SVG and PNG exports paired when adding new logos or icons.
- Prefer existing folder conventions over introducing new naming patterns.
- Keep documentation updated when adding new foundation areas, asset groups, or usage rules.

## Agent Setup

This repo includes `AGENTS.md` for agent-facing instructions. `CLAUDE.md` is a symlink to the same file so Claude-compatible tooling reads the same guidance.

## Future Foundations

This repo is expected to grow beyond static assets. Good next additions include:

- Brand color tokens and usage rules.
- Typography guidance for product and marketing contexts.
- Logo clear-space, sizing, and background guidance.
- Icon selection and implementation rules.
- Export or packaging workflows for downstream teams and apps.
