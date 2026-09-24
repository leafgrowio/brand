---
name: find-icon
description: "Resolve a natural-language description (or a theme/name) to an exact Leaf icon or logo asset path — SVG or PNG, in the right colour variation — for generating branded documents, decks, banners, Notion pages, or UI mockups; when a human is choosing, it also previews candidate icons visually, guides the colour-variation pick for the target surface, then hands the picked asset to the surface builder (in the Leaf plugin, the saville skill — which also builds Notion page covers and gallery cards). Use whenever a task needs a Leaf-brand icon or logo file, not a description of one."
---

# Find Icon

*Action skill (stateless): one job — resolve a query to an exact asset path —
then exit. No attached Project; nothing here is working memory.*

Leaf ships ~1,250 icons across 9 themes (banking, business, communications,
ecology, education, electronics, logistics, shopping, social), each in two
colour variations (`black` — the default brand treatment — and `white` for
dark surfaces; the brand is line-art only, no solids) and two formats (SVG,
PNG), plus Leaf's logo set (Leaf, Signal, Answers, Stores, Creative,
Performance, Strategy, Colectivo, blog). This skill is the query layer over
both, so an agent never has to guess a filename.

**The asset files do not ship with this skill.** They live in the public
GitHub repo `leafgrowio/brand`, fetched at runtime via a URL pinned to a
commit — jsDelivr, with raw.githubusercontent.com and a sparse git clone as
fallbacks (see `brand_repo.py`). Manifests here store brand-repo-relative
paths. The workflow is always: **run `find_icon.py` (or read
`logos_manifest.json`) → fetch the asset by URL → use the local file.** Never
assume an asset already exists on disk.

How a resolved asset lands on a surface is governed by the Leaf **design
spec**: `system/DESIGN.md` in `leafgrowio/brand` (fetchable at the same
pinned jsDelivr URL). Inside the Leaf plugin, it is mirrored as the `design`
slice of `leaf-context` — load that slice when available, otherwise fetch the
file.

## Two modes, one run

**Resolve mode (programmatic).** Another skill or agent invokes this as a
sub-step: resolve silently — run the CLI, pick the exact variation/format,
fetch, return the path. No questions, no galleries. If the request is
underspecified, stay in resolve mode — take the top match and a sensible
default variation, and state the assumptions in the result. Never interrupt a
calling flow with questions.

**Pick mode (interactive — default when a human asked).** A person asked for
an icon directly, or the choice is ambiguous (multiple plausible candidates,
unknown target surface): run a guided visual flow. Search first, ask later —
the user sees candidates before being asked anything. Full ladder (widget vs
gallery vs bare CLI, variation selector, hand-off) is in
`references/pick-mode.md`, anchored on this skill's own directory.

## Icons: run the CLI

Do not read `manifest.json` directly — it is large and meant for the
generator, not for scanning by eye. Run the query script from this skill's
own directory:

```bash
python3 <this skill's directory>/find_icon.py "growth chart" --limit 3
python3 <this skill's directory>/find_icon.py "checkout" --variation "white" --format svg
python3 <this skill's directory>/find_icon.py "ppc ads" --theme business
```

Stdlib-only (no pip install needed). Returns ranked JSON matches, each with
theme, name, and a `paths` object covering every variation/format
combination, keyed like `paths["white"]["svg"]` — each entry has a
brand-repo-relative `path` and `url` (a pinned jsDelivr URL). Pick the exact
entry for the variation and format the target surface needs (e.g. `white`
SVG for a dark banner, `black` PNG for a light doc) — do not default to the
first result.

Fetch with `--fetch` to download the top result (or, with `--icon`, the
chosen variation) via `brand_repo.fetch_asset()`, printed as `fetched` in the
result JSON. Downloads are cached under `~/.cache/leaf-brand/`, namespaced by
the pinned commit. An empty `[]` means no icon matches that query — say so
and ask for a different description; never substitute a loosely related icon.

Key flags: `--theme`, `--variation` (`black`/`white`), `--format`
(`svg`/`png`), `--limit` (default 5), `--fetch`, `--icon "theme/Icon Name"`
(exact lookup instead of search), `--gallery <out.html>` / `--widget
<out.html>` (premade selector UIs — see `references/pick-mode.md`),
`--local-root` (debug: read from a local clone instead of downloading). Full
flag list and generator/maintenance flags are in
`references/maintenance.md`.

## Logos: read the manifest directly

Logos are few enough (9 groups) that no search is needed. Read `<this
skill's directory>/logos_manifest.json` and pick the group by name. Most
groups have `padding`/`no-padding` × `svg`/`png`, with colour variants (`-
Black`, `- White`, `- Negative`, or unsuffixed for the primary mark). The
`leaf` group differs: it has `logo/` (full mark) and `icon/` (Leaf icon
alone) before the padding/format split, with variants unsuffixed, `-
Negative`, and `- Coral`. Turn a stored path into a downloadable file with
`brand_repo.fetch_asset("<path>")` (or `brand_repo.asset_url("<path>")` for
the raw URL). Use **padding** exports when the logo stands alone; use
**no-padding** exports inside layouts, navigation, cards, or watermarks where
spacing is already controlled — see the design spec for the full spacing and
usage rules.

## Picking variation/format for a surface — load-bearing rules

- **Colour comes from the variation, never from editing:** `black` on light
  surfaces (default), `white` on Ink/dark. Never recolour, add fills, or
  apply effects.
- Prefer SVG; PNG only when raster is required.
- **In sandboxed artifacts** (Chat/Cowork), assets cannot be hotlinked —
  fetch the SVG and inline its markup. The `leaf-design` skill carries the
  artifact kit the inlined icon should land inside.
- Everything else — sizes, category-tile and banner conventions, logo
  minimums and clear space — lives in the design spec (`system/DESIGN.md` /
  the `design` slice of `leaf-context`). Check it before placing an asset
  somewhere unusual.

## Hand-off

This skill resolves assets; it does not build surfaces. If the destination
was named in the ask, hand the picked icon (theme/name and fetched path)
straight on without asking again; only ask here if usage is genuinely
unknown — this is the only place usage ever gets asked.

- **Leaf plugin installed:** hand off to the **`saville`** skill, which owns
  every brand surface — including Notion page covers, gallery cards, square
  banners, social cards, and deck covers. Pass the icon name so Saville does
  not search again.
- **Standalone install (no plugin):** return the fetched asset and compose
  the surface ad hoc, following the design spec for spacing, logo, and
  colour rules.

Never place the icon on a surface that violates the design spec.

## Rules

- **Never hand-author selector markup.** Gallery/widget UIs are premade;
  `find_icon.py` generates them. Run one command and present the output —
  never write, adapt, or splice gallery/widget HTML by hand. Details in
  `references/pick-mode.md`.
- Never fabricate an icon or logo that does not exist in the manifest — an
  empty result means say so, not substitute something close.
- **Never recolour, re-export, or resize** an SVG/PNG found through this
  skill. If a needed variation does not exist (e.g. a colour outside
  black/white), say so rather than improvising one.
- Always fetch via `brand_repo` (or `--fetch`) — never assume an asset
  already exists on disk.
- Logos and Leaf's core icon carry brand meaning — check the design spec
  before using them somewhere unusual (outside Leaf-owned surfaces, or
  altered).
