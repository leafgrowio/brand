---
name: find-icon
description: "Resolve a description or name to an exact Leaf icon or logo file (SVG/PNG, right colour variation) for decks, banners, Notion pages and mockups, with a visual picker when a person is choosing. Use whenever a task needs a Leaf icon, Leaf logo or tool logo file, not a description of one."
---

# Find Icon

*Action skill (stateless): one job — resolve a query to an exact asset path —
then exit. No attached Project; nothing here is working memory.*

Leaf ships ~1,250 icons across 9 themes (banking, business, communications,
ecology, education, electronics, logistics, shopping, social), each in two
colour variations (`black` — the default brand treatment — and `white` for
dark surfaces; the brand is line-art only, no solids) and two formats (SVG,
PNG), plus Leaf's logo set (Leaf, Signal, Answers, Stores, Creative,
Performance, Strategy, Colectivo, blog), a curated `tools` group of third-party marks, and a lookup over
the gilbarbara/logos collection for every other tool. This skill is the query layer over
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
the person sees candidates before being asked anything. Read
`references/pick-mode.md` (in this skill's own directory) before showing
candidates: it has the two-rung picker, the variation step and the hand-off.

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

Logos are few enough (10 groups) that no search is needed. Read `<this
skill's directory>/logos_manifest.json` and pick the group by name. Most
groups have `padding`/`no-padding` × `svg`/`png`, with colour variants (`-
Black`, `- White`, `- Negative`, or unsuffixed for the primary mark). The
`leaf` group adds `logo/` (full mark) and `icon/` (Leaf icon alone) before
the padding/format split, and has unsuffixed (Coral), `- Black` and `- White`
only — the single-colour mark has no two-tone `- Negative`. Decks take the
`- Black` files. The `tools` group nests one folder per tool
(`tools/<tool>/`), `no-padding/` only, `<Name>` and `<Name> Icon`: official marks
used as shipped, nominatively (spec: Logos › Tool marks). Turn a stored path into a downloadable file with
`brand_repo.fetch_asset("<path>")` (or `brand_repo.asset_url("<path>")` for
the raw URL). Use **padding** exports when the logo stands alone; use
**no-padding** exports inside layouts, navigation, cards, or watermarks where
spacing is already controlled — see the design spec for the full spacing and
usage rules.

## Tool logos: cache, collection, then ask

Third-party marks (Shopify, Slack, Klaviyo, Google Ads…) resolve in this order,
never from memory:

1. **The cache** — Leaf's `tools` group in the brand repo: the marks decks use
   most, `<Name>.svg` (full logo) and `<Name> Icon.svg` (square mark), each with
   a PNG. Use the Icon for the icon slot.
2. **The gilbarbara/logos collection** (CC0 files, pinned to `TOOL_LOGOS_REF`;
   the marks stay their owners' trademarks) — free; best for Google products.
3. **Ask the person to upload** the official logo, using the `ask_user` line.
   Never redraw, trace or substitute a look-alike. Then log the missing mark as
   harness feedback with `keep-memory` ("tool mark missing from the cache:
   <tool>") so Gilbert sources it and adds it to the brand repo's `tools`
   group. Don't ask the person to chase it.

There is no paid logo service in the lookup: Brandfetch was removed for cost.
Don't reach for one, or for logo-scraping sites, to fill a gap.

Steps 1–2 are one command:

```bash
python3 <this skill's directory>/find_tool_logo.py "google ads"
python3 <this skill's directory>/find_tool_logo.py "slack" --fetch
```

It returns JSON with a `status`: `found` (use `recommended`; `url` is pinned,
`--fetch` downloads it), `candidates` (no exact match — confirm the tool first),
`not_found` (follow `next_step`: `ask_user`, then flag it), or `unreachable`
(this environment can't reach the collection — try its catalogue URL with
another web tool, then ask). A mark found in steps 2–3 is used for the
session; the feedback flag is how it reaches the cache.

Use marks as shipped, in their own colours, sized as icons (spec: Logos › Tool
marks).

## Picking variation/format for a surface — load-bearing rules

- **Colour comes from the variation, never from editing:** `black` on light
  surfaces (default), `white` on Ink/dark. Never recolour, add fills, or
  apply effects.
- Prefer SVG; PNG only when raster is required.
- **In sandboxed artifacts** (chat and the Claude app), assets cannot be hotlinked —
  fetch the SVG and inline its markup. The `leaf-design` skill carries the
  artifact kit the inlined icon should land inside.
- Everything else — sizes, category-tile and banner conventions, logo
  minimums and clear space — lives in the design spec (`system/DESIGN.md` /
  the `design` slice of `leaf-context`). Check it before placing an asset
  somewhere unusual.

## Rules

- Never hand-author selector markup; `find_icon.py` generates it
  (`references/pick-mode.md`).
- Never draw a third-party logo, and never fabricate an icon or logo that isn't
  in the manifest: an empty result means say so, not substitute something close.
- Never recolour, re-export or resize an SVG/PNG from this skill. If a needed
  variation doesn't exist, say so rather than improvising one.
- Logos and Leaf's core icon carry brand meaning: check the design spec before
  using them somewhere unusual (outside Leaf-owned surfaces, or altered).
