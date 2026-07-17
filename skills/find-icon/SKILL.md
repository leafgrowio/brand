---
name: find-icon
description: Resolve a natural-language description (or a theme/name) to an exact Leaf icon or logo asset path — SVG or PNG, in the right colour variation — for generating branded documents, decks, banners, Notion pages, or UI mockups; when a human is choosing, it also previews candidate icons visually, guides the colour-variation pick for the target surface, and can go on to create the branded asset (e.g. a Notion banner). Use whenever a task needs a Leaf-brand icon or logo file, not a description of one.
---

# Find Icon

*Action skill (stateless): one job — resolve a query to an exact asset path —
then exit. No attached Project; nothing here is working memory.*

Leaf ships ~1,250 icons across 9 themes (banking, business, communications, ecology, education, electronics, logistics, shopping, social), each in two colour variations (black — the default brand treatment — and white for dark surfaces; the brand is line-art only, with no solid icons) and two formats (SVG, PNG), plus Leaf's logo set (Leaf, Signal, Answers, Stores, Creative, Performance, Strategy, Colectivo, blog — each in padded/unpadded, SVG/PNG). This skill is the query layer over both, so an agent never has to guess a filename to generate a branded asset.

The asset files themselves do **not** ship with this skill. They live in the public GitHub repo `leafgrowio/brand` and are fetched at runtime via raw URLs. The manifests here store brand-repo-relative paths (e.g. `assets/icons/shopping/Shopping Bag/black/svg/Shopping Bag.svg`); the workflow is always: **run `find_icon.py` (or read `logos_manifest.json`) → fetch the asset by URL → use the local file.**

How a resolved asset is allowed to land on a surface is governed by the Leaf
**design spec**: `system/DESIGN.md` in `leafgrowio/brand` (fetchable by raw
URL, same repo as the assets). Inside the Leaf plugin, the same document is
mirrored as the `design` slice of the `leaf-context` skill — load that slice
when it is available; otherwise fetch the file. "Design spec" below always
means that document.

## Two modes, one run

The skill stays one job → exit. Interactivity, when it happens, lives inside
a single run; nothing is remembered between runs.

**Resolve mode (programmatic).** When another skill or agent invokes this as
a sub-step, resolve silently: run the CLI, pick the exact variation/format,
fetch, return the path. No questions, no galleries. If the request is
underspecified (e.g. unknown target surface), stay in resolve mode anyway —
take the top match and a sensible default variation, and state the
assumptions in the result. Never interrupt a calling flow with questions.

**Pick mode (interactive — default when a human asked).** When a person asked
for an icon directly, or a human is in the loop and the choice is ambiguous
(multiple plausible candidates, unknown target surface), run a guided visual
flow. Search first, ask later: the user sees candidates before being asked
anything — never ask where the icon will live, or whether they would like a
preview, before they have picked one.

**Capture the destination from the ask.** Most requests name the target
artifact in the same breath ("an icon for a Notion banner of X", "…for a
slide", "…for a doc header"). Read it out of the request and carry it through
the whole flow — never ask for information the user already gave. A known
destination does three things: it sets the `--recommend` variation in step 2,
it can skip step 2 entirely (Notion banners — see step 4), and it makes step
4 a build step, not a question.

1. **Search and show the selector immediately.** Run the CLI once and present
   the results visually as the default action — do not wait to be asked for a
   preview. For a concept with no direct hit or thin results, pass SEVERAL
   related terms to that ONE call instead (e.g. `find_icon.py "work in
   progress" "construction" "checklist" --limit 6`) — the CLI merges and
   dedupes them into a single ranked selector. Never run separate searches
   and combine the resulting gallery/widget files by hand. Pick the best
   presentation the surface supports:

   **a. Inline chat widget** (surfaces with an in-chat HTML widget tool, e.g.
   Cowork's `show_widget`). Generate BOTH outputs in one run so the fallback
   is already on disk:

   ```bash
   python3 <this skill's directory>/find_icon.py "<query>" --limit 5 \
     --widget <workdir>/icon-widget.html --gallery <workdir>/icon-candidates.html
   ```

   Read the fragment file and render it through the widget tool **verbatim**
   — the cards are clickable and send the pick back into chat via the
   surface's global `sendPrompt()`. If the widget tool requires a setup step
   first (e.g. a `read_me` call), do that before rendering. **If the widget
   tool errors or is unavailable, do not retry and do not re-run the CLI —
   present the already-generated gallery file (rung b) immediately** and ask
   for a pick by number or name. Widget tools can be intermittently flaky;
   one attempt, then fall back.

   **b. File preview / artifacts, no inline widget:**

   ```bash
   python3 <this skill's directory>/find_icon.py "<query>" --limit 5 \
     --gallery <workdir>/icon-candidates.html
   ```

   Galleries are self-contained (inline `<svg>`) by default — in-app file-
   preview panels typically block ALL external images (including
   cdn.jsdelivr.net), so an inline gallery is the one that reliably renders.
   Use `--embed cdn` only when the file is destined for a real browser tab.
   Present the file (e.g. present_files in Cowork; attach/preview on
   claude.ai) and ask the user to pick by number or name.

   **c. Bare CLI:** give the user a text table (number, name, theme) read
   from the ranked JSON, plus the file path if a gallery was written.

   Both selectors show numbered, captioned cards (one neutral display
   variation per candidate); stdout carries the same ranked JSON plus
   `"widget"`/`"gallery"` paths. Never make a human choose from a list of
   file paths alone. If `results` is empty (`[]`), say so and ask for a
   different description — do not substitute a loosely related icon.
2. **Show colour variations the same way.** Once an icon is chosen, same
   ladder, same command shape:

   ```bash
   python3 <this skill's directory>/find_icon.py --icon "<theme>/<Icon Name>" \
     --widget <workdir>/icon-var-widget.html --gallery <workdir>/icon-variations.html
   ```

   (Same dual-output rule: widget first, already-generated gallery file as
   the no-retry fallback; gallery alone on surfaces with no widget tool.)

   One card per colour variation that exists in the manifest — light swatch
   behind `black`, dark swatch behind `white` —
   so the right choice for the target surface is self-evident. Add
   `--recommend "<variation>"` **only if the target surface is already known
   from the conversation** (dark surface → `white`; light →
   `black`); do not ask a question to establish it. Let the
   user confirm or override. **Skip this step entirely when the destination
   is a Notion banner** — the banner generator owns colour and treatment, so
   go straight from the icon pick to step 4.
3. **Deliver.** `--fetch` the confirmed variation/format — the only download
   of a deliverable — and return the local cached path plus the brand-repo
   path and raw URL. If raw.githubusercontent.com is unreachable (some
   sandboxes block it), the fetch falls back automatically to a sparse git
   clone of the brand repo via github.com — no action needed.
4. **Build the asset.** If the destination was named in the ask, build it now
   without asking again; only if it is genuinely unknown, ask here — the only
   place usage ever gets asked.

   **Notion banners are fully wired.** After the icon pick, run the generator
   directly (it needs Pillow — `pip install pillow --break-system-packages`
   if missing) and present the PNG. The generator is
   `notion_banner_generator.py`: in the standalone install it sits in this
   skill's own directory; in the leaf plugin it lives at
   `<plugin root>/brand/tools/`. Use whichever exists:

   ```bash
   python3 <path to notion_banner_generator.py> "<request>" \
     --icon "<Icon Name>" --colour auto --preset page-cover \
     --output <workdir>/banner.png
   ```

   `--colour` takes `auto` or a Leaf secondary token (marigold, butter,
   apricot, rosehip, sage, laurel, eucalyptus, harbor, lilac, heather);
   presets are `page-cover` (1500×600), `gallery-preview` (1500×840),
   `square` (1200×1200). The generator picks the black line-art treatment
   and composites on a light Leaf colour itself — that is why step 2 is
   skipped for banners. It fetches the one PNG it needs via the same
   raw-URL-then-git fallback as `--fetch`. Present the banner and offer the
   other colour tokens if the user wants variants.

   Any other branded surface (deck slide, doc header, social image, mockup)
   is composed ad hoc, following the design spec for spacing, logo, and
   colour rules. Never place the icon on a surface that violates those
   rules.

### Selectors are premade — never hand-author gallery or widget markup

The selector UIs ship with the skill and `find_icon.py` generates them. Your
whole job is to run one command and present the output — do not write, adapt,
or "improve" gallery or widget HTML yourself, on any surface. To combine
multiple searches into one selector, pass multiple query terms in a single
run (e.g. `find_icon.py "work in progress" "construction" "checklist"`) —
the script merges and dedupes them into one gallery/widget with continuous
badge numbering; do not splice separate gallery files together by hand.

- `--gallery <out.html>` fills the shipped `gallery_template.html` into a
  self-contained HTML document. Icons default to inline `<svg>` (`--embed
  inline`): each card's SVG text is fetched (cached, with a git-clone
  fallback) and inlined directly into the file, because gallery files are
  routinely opened in an in-app file-preview panel whose CSP blocks ALL
  external images — including jsDelivr — so a CDN-embedded gallery renders as
  broken image placeholders there. Use `--embed cdn` only when you know the
  file will be opened in a real browser tab (nothing fetched, near-instant):
  it points `<img>` tags at the icon's SVG on cdn.jsdelivr.net. `--embed url`
  points `<img>` tags at the public raw-GitHub PNGs instead, also for
  browser-destined files. A per-card inline failure falls back to a URL embed
  and is noted under `embed_fallbacks` in the JSON.
- `--widget <out.html>` writes a compact HTML fragment for inline
  chat-widget surfaces: scoped CSS, cdn-embedded icons by default (`--embed
  cdn`) because the chat-widget CSP allowlists cdn.jsdelivr.net — keeping the
  fragment tiny — and clickable cards wired to `sendPrompt()`. Paste the
  fragment into the widget tool verbatim — never hand-edit, trim, or restyle
  it. It can be combined with `--gallery` in one run: each output resolves
  its own default unless `--embed` is passed explicitly, in which case it
  applies to both.

Download only the final deliverable, with `--fetch`, after the variation is
confirmed.

## Icons: run the CLI

Do not read `manifest.json` directly to search — it is large and meant for the generator, not for a human or agent to scan by eye. Instead run the query script from this skill's own directory:

```bash
python3 <this skill's directory>/find_icon.py "growth chart" --limit 3
python3 <this skill's directory>/find_icon.py "checkout" --variation "white" --format svg
python3 <this skill's directory>/find_icon.py "ppc ads" --theme business
```

Stdlib-only (no pip install needed). It returns ranked JSON matches, each with the icon's theme, name, and a `paths` object covering every colour variation/format combination available, keyed like `paths["white"]["svg"]` — each entry is an object with a brand-repo-relative `path` and the raw GitHub `url`. Pick the exact entry for the variation and format the target surface needs (e.g. `white` SVG for a dark banner, `black` PNG for a light doc) — do not always default to the first result.

Then get the file: either fetch the `url` yourself (it is a plain raw.githubusercontent.com URL) or let the script do it — add `--fetch` to download the top result via `brand_repo.fetch_asset()` and print the local cached path (added to the result JSON as `fetched`). If raw.githubusercontent.com is blocked (common in sandboxed environments), `fetch_asset()` falls back automatically to a blobless sparse git clone of `leafgrowio/brand` via github.com — same file, same cache, no flag needed. Downloads are cached under `$XDG_CACHE_HOME/leaf-brand/` (default `~/.cache/leaf-brand/`), so repeat lookups are free. Use the returned local file — never assume the asset already exists on disk.

Flags: `--theme`, `--variation` (`black` / `white`), `--format` (`svg` / `png`), `--limit` (default 5), `--fetch` (download the top result — or, with `--icon`, the chosen variation), `--icon "theme/Icon Name"` (exact lookup instead of a search; alone it prints the icon's full JSON entry, unknown names get near-miss suggestions), `--gallery <out.html>` (write the premade gallery document — candidates for a query, colour variations with `--icon`), `--widget <out.html>` (write the compact chat-widget fragment, same two kinds; combinable with `--gallery`), `--recommend "<variation>"` (with `--icon --gallery`/`--widget`: tag that variation's card), `--embed cdn|inline|url` (gallery/widget embedding; default is per-output — `inline` for `--gallery`, `cdn` for `--widget` — an explicit value overrides both), `--local-root` (debug: read from a local clone of the brand repo instead of downloading). An empty `[]` means no icon matches that query — do not fall back to a loosely related icon without saying so; report the gap instead of guessing.

## Logos: read the manifest directly

Logos are few enough (9 groups) that no search is needed. Read `<this skill's directory>/logos_manifest.json` and pick the group by name. Most groups have `padding`/`no-padding` × `svg`/`png`, with colour variants (`- Black`, `- White`, `- Negative`, or unsuffixed for the primary mark). The `leaf` group differs: it has an extra sublevel with two sub-marks — `logo/` (the full mark) and `icon/` (the Leaf icon alone) — before the `{padding,no-padding}/{svg,png}` split, and its variants are unsuffixed, `- Negative`, and `- Coral` (no `- Black`/`- White`). The stored paths are brand-repo-relative; turn one into a downloadable file with `brand_repo.fetch_asset("<path>")` (or build the raw URL with `brand_repo.asset_url("<path>")` — it URL-encodes the spaces for you). Use **padding** exports when the logo stands alone (e.g. a social avatar, a favicon-adjacent use); use **no-padding** exports inside layouts, navigation, cards, or watermarks where spacing is already controlled by the surrounding design — see the design spec for the full spacing and usage rules.

## Regenerating the manifests

The manifests (`manifest.json`, `logos_manifest.json`) are generated from the brand repo's asset tree and must never be hand-edited. The stored paths are a public URL contract, so re-run the generators whenever icons or logos change in `leafgrowio/brand`, pointing `--brand-root` at a local clone of that repo (the directory containing `assets/`). The generators live in Leaf's internal `leaf` plugin repo (they are not distributed with this skill):

```bash
python3 brand/tools/generate_icon_manifest.py --brand-root /path/to/leafgrowio-brand
python3 brand/tools/generate_logo_manifest.py --brand-root /path/to/leafgrowio-brand
```

`keywords.json` is the one hand-curated file here: a synonym overlay keyed by
`"theme/Icon Name"` (e.g. `"shopping/Pay Per Click": ["ppc", "paid media"]`),
merged with the icon's own name at query time. It ships as a starter set
focused on Leaf's own use cases (growth, ecommerce, ads, tracking, trust) — add
to it directly when a real query keeps missing an icon that should have
matched. Never let the generator scripts touch it.

## How the design system expects icons and logos to be used

This skill resolves the asset; the design spec governs how it lands on the surface. The load-bearing rules, so a picked icon arrives correctly:

- **Icons are line-art, and colour comes from the variation, never from editing:** `black` on light surfaces (the default brand treatment), `white` on Ink/dark. Never recolour, add fills, or apply effects.
- **Sizes:** 16 · 20 · 24 · 32 · 48px in UI. Prefer SVG; PNG only when raster is required.
- **Category tiles** (libraries, hubs, editorial navigation): one black icon, optically centred on one flat **secondary-colour** field (topic-matched — people → Heather, decisions → Harbor, momentum → Marigold), icon ≈ ⅓ of the tile's shorter side. Never a Coral field, never a gradient or photo, never multiple icons per field.
- **Imagery/banners** follow the same convention at ≈ ¼ of the shorter edge with generous margin — Leaf imagery is iconographic, not photographic.
- **Logos:** Coral on light; Negative on Coral/Ink. Minimums: icon 16px digital / 6mm print, full logo 80px / 20mm — below that, use the icon alone. Padding exports carry their own 50%-icon clear space; never trim it (switch to no-padding instead), never stretch, rotate, box, or add effects.
- **In sandboxed artifacts** (Chat/Cowork), assets cannot be hotlinked — fetch the SVG and inline its markup. The `leaf-design` skill carries the artifact kit (tokens, base styles, embeddable Mona Sans) that the inlined icon should land inside.

## Rules

- Never fabricate an icon or logo that does not exist in the manifest — an
  empty result means say so, not substitute something close.
- Preserve asset fidelity: do not re-export, recolor, or resize an SVG/PNG
  found through this skill. If a task needs a variation that does not exist
  (e.g. a colour not in black/white), say so rather
  than improvising one.
- Logos and Leaf's core icon (Leaf) carry brand meaning — check the design
  spec before using them somewhere unusual (e.g. outside Leaf-owned
  surfaces, or altered).
