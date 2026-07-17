# Leaf Brand

This repository is Leaf's canonical, public source of brand assets and design foundations: fonts, icons, logos, and the full Leaf design system (spec, tokens, components, and reference UI). It is public because assets are fetched at runtime over plain HTTPS from `raw.githubusercontent.com/leafgrowio/brand/main/...`, so anyone building against Leaf's brand (internal tooling, partner integrations, or the open web) can pull the exact current asset without needing repo access or a local clone.

Tools that generate, package, or clean these assets (the icon and logo manifest generators, export cleanup scripts) live in Leaf's internal `leaf` plugin repo, not here. See the "Tools" section below. The repo does carry `skills/` — standalone Claude Agent Skills for using the brand (icon/logo resolution, the artifact design kit, Notion banner generation), installable by anyone with a Claude CLI setup. See the "Skills" section below.

## What Is Here

```text
assets/
  font/
  icons/
  logos/
skills/
system/
```

`system/` is the Leaf design system — the compiled, consumable form of the brand. It holds the ratified written spec (`system/DESIGN.md`, the single source of truth for design foundations), CSS design tokens (`system/styles.css` + `system/tokens/`), a React component library, foundation specimen cards, an interactive brand book and component library (`system/Leaf Brand Book.dc.html`, `system/Leaf Component Library.dc.html`), and the Answers UI kit. It syncs to Leaf's Claude Design "Design System" project, where it grounds design generation across the org. Start with `system/readme.md` for the guide and manifest; agents should read `system/AGENTS.md` before making changes there.

### Font

`assets/font/` contains the two typefaces Leaf uses for product, marketing, and brand communication: Mona Sans and Source Serif 4 — variable-font sources only, each beside its SIL Open Font License (`OFL.txt`). Both are pinned to named upstream releases (Mona Sans: github/mona-sans v2.0.27 · Source Serif 4: adobe-fonts/source-serif 4.005R) and refreshed deliberately from those repos; static instances are not carried — instance from the variable fonts when a fixed cut is needed.

Mona Sans is the main font for product, UI, navigation, labels, body copy, landing pages, and most brand communication. Source Serif 4 is an optional editorial serif for blogs, long-form content, banners, marketing communications, pull quotes, and selected highlight moments — `800` for headlines, italic `500` for quotes. **Self-host Mona Sans** (from here or from `system/assets/fonts/`): Leaf's letterforms depend on stylistic sets ss03/05/06/07/09, which the Google Fonts build strips. Source Serif 4 may load from Google Fonts, though the design system self-hosts both for parity. See `system/tokens/fonts.css` for the reference `@font-face` rules.

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

Colour variations are `black` (the default — black line-art is the brand treatment) and `white` (line-art for dark surfaces). The brand carries no solid icon variations.

Examples:

```text
assets/icons/business/Analytical Report/black/svg/Analytical Report.svg
assets/icons/shopping/Discount Tag/white/png/Discount Tag.png
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

## Skills

`skills/` holds standalone Claude Agent Skills for working with the brand from any Claude setup, without Leaf's internal plugin distribution:

- `skills/find-icon/` — resolves a natural-language description to an exact icon or logo asset in this repo (right colour variation, SVG or PNG) and can generate Notion banners from a pick.
- `skills/leaf-design/` — the artifact kit: design tokens, base styles, component classes, chart recipes, and an embeddable Mona Sans subset, so generated artifacts follow the Leaf design system.

Install by copying the skill folders into `~/.claude/skills/` (or a project's `.claude/skills/`) — see `skills/README.md` for full instructions. These folders are synced exports from the internal `leaf` plugin repo, which remains the canonical source; edit them there, never here.

## Tools

Asset tooling — the icon and logo manifest generators and export cleanup scripts — lives in Leaf's internal `leaf` plugin repo, not in this repo. Those tools run against a local clone of this repo and read or write files here directly; they are not published here because they are internal-only and not part of the public asset contract. (The Notion banner generator is the exception: it is an end-user feature of the `find-icon` skill, so a synced copy ships inside `skills/find-icon/`.)

## Agent Setup

This repo includes `AGENTS.md` for agent-facing instructions, with `CLAUDE.md` as a symlink to the same file so Claude-compatible tooling reads the same guidance. The design system carries its own nested pair — `system/AGENTS.md` (and `system/CLAUDE.md` symlinked to it) — with the editing rules, verification workflow, and Claude Design sync procedure for that folder. Any agent (Claude Code, Codex, or otherwise) working under `system/` must follow it.

## Design System

The foundations that used to be aspirational here now live in `system/` as a working design system, ratified at v1.0 (16 July 2026):

- **Spec** — `system/DESIGN.md`: colour, typography (including the always-on Mona Sans stylistic sets), voice, spacing, elevation, motion, logos, iconography, imagery, photography, data visualization, product patterns, navigation, overlays, responsive rules, and governance.
- **Tokens** — `system/styles.css` imports `system/tokens/*.css`; every value is a `--leaf-*` CSS custom property.
- **Components** — 18 React primitives across forms, data, feedback, navigation, and overlays, each with typed props, a usage prompt, and a rendered specimen card.
- **Answers UI kit** — `system/ui_kits/answers/index.html`, an interactive recreation of Leaf's product surface composed from the primitives.

Changes follow the governance in `system/DESIGN.md` (patch/minor/major versioning, Creative team review via creative@leaf.fm) and sync from this repo to the Claude Design project — see `system/AGENTS.md` for the workflow.
