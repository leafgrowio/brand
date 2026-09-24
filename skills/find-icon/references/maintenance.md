# Maintenance — manifests, flags, and internals

Loaded from `find-icon`'s SKILL.md only when maintaining the skill itself
(regenerating manifests, curating keywords, or debugging the fetch path) —
not needed for ordinary resolve/pick-mode use.

## Full CLI flag reference

`--theme`, `--variation` (`black` / `white`), `--format` (`svg` / `png`),
`--limit` (default 5), `--fetch` (download the top result — or, with
`--icon`, the chosen variation), `--icon "theme/Icon Name"` (exact lookup
instead of a search; alone it prints the icon's full JSON entry, unknown
names get near-miss suggestions), `--gallery <out.html>` (write the premade
gallery document — candidates for a query, colour variations with `--icon`),
`--widget <out.html>` (write the compact chat-widget fragment, same two
kinds; combinable with `--gallery`), `--recommend "<variation>"` (with
`--icon --gallery`/`--widget`: tag that variation's card), `--embed
cdn|inline|url` (gallery/widget embedding; default is per-output — `inline`
for `--gallery`, `cdn` for `--widget` — an explicit value overrides both),
`--local-root` (debug: read from a local clone of the brand repo instead of
downloading).

## Fetch and cache internals

Either fetch the `url` yourself (a jsDelivr URL pinned to a commit) or let
the script do it: add `--fetch` to download the top result via
`brand_repo.fetch_asset()` and print the local cached path (added to the
result JSON as `fetched`). If jsDelivr is blocked (uncommon, but possible in
sandboxed environments), `fetch_asset()` falls back automatically to
raw.githubusercontent.com at the same pinned commit, then to a blobless
sparse git clone of `leafgrowio/brand` via github.com — same bytes, same
cache, no flag needed. Downloads are cached under
`$XDG_CACHE_HOME/leaf-brand/` (default `~/.cache/leaf-brand/`), namespaced by
the pinned commit, so repeat lookups are free. Always use the returned local
file — never assume the asset already exists on disk.

## Regenerating the manifests

The manifests (`manifest.json`, `logos_manifest.json`) are generated from
the brand repo's asset tree and must never be hand-edited. The stored paths
are a public URL contract, so re-run the generators whenever icons or logos
change in `leafgrowio/brand`, pointing `--brand-root` at a local clone of
that repo (the directory containing `assets/`). The generators live in
Leaf's internal `leaf` plugin repo (they are not distributed with this
skill):

```bash
python3 brand/tools/generate_icon_manifest.py --brand-root /path/to/leafgrowio-brand
python3 brand/tools/generate_logo_manifest.py --brand-root /path/to/leafgrowio-brand
```

## `keywords.json`

The one hand-curated file here: a synonym overlay keyed by `"theme/Icon
Name"` (e.g. `"shopping/Pay Per Click": ["ppc", "paid media"]`), merged with
the icon's own name at query time. It ships as a starter set focused on
Leaf's own use cases (growth, ecommerce, ads, tracking, trust) — add to it
directly when a real query keeps missing an icon that should have matched.
Never let the generator scripts touch it.

## Logos manifest structure detail

Most groups in `logos_manifest.json` have `padding`/`no-padding` ×
`svg`/`png`, with colour variants (`- Black`, `- White`, `- Negative`, or
unsuffixed for the primary mark). The `leaf` group differs: it has an extra
sublevel with two sub-marks — `logo/` (the full mark) and `icon/` (the Leaf
icon alone) — before the `{padding,no-padding}/{svg,png}` split, and its
variants are unsuffixed, `- Negative`, and `- Coral` (no `- Black`/`-
White`).
