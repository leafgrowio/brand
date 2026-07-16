# Agent notes — Leaf design system (`system/`)

This folder is the **compiled, consumable form of Leaf's brand**: tokens, React components, specimen cards, and the Answers UI kit. It is the editable source for the Claude Design project **"Design System"** (projectId `50c5863c-cf10-448a-afcd-8bfe51f84469`, the org default). Read this file fully before changing anything here; the guardrails below exist to prevent drift between the spec, the files, and the deployed design system.

## Source of truth, in order

1. **`DESIGN.md`** (in this folder) — the ratified written spec (v1.0). Every rule and token traces to it. This is the single canonical DESIGN.md; there is deliberately no copy at the repo root.
2. **`readme.md`** — the guide + manifest digest (voice rules, visual fundamentals, component index, intentional additions, resolved discrepancies).
3. **`Leaf Brand Book.dc.html`** and **`Leaf Component Library.dc.html`** — visual references for humans. The compiler ignores them; do not delete them.
4. The files themselves (`tokens/`, `components/`, `foundations/`, `ui_kits/`).

Where anything disagrees, DESIGN.md wins and **all** artifacts get fixed together in the same change. A token value may never differ between `tokens/*.css` and DESIGN.md's implementation block.

## Layout

```text
styles.css              # entry point — @import lines only, consumers link this one file
tokens/                 # one file per concern; every token is a --leaf-* custom property
components/<cat>/<Name>/  # forms, data, feedback, navigation, overlays — 18 directories
foundations/            # foundation specimen cards (@dsCard HTML)
ui_kits/answers/        # the Answers product recreation (index.html click-through + JSX screens)
assets/                 # curated fonts, icons, logos, imagery, photography used by this system
SKILL.md                # agent entry point for producing Leaf-branded work
```

## Editing rules

**Tokens**
- All styling flows through `var(--leaf-*)` tokens. Never introduce a new hex colour anywhere; one-off `rgba(23,20,18,x)` / `rgba(255,253,251,x)` alphas are allowed only where the spec uses them and no token exists.
- A token change lands in **both** `tokens/*.css` and DESIGN.md's implementation block in the same commit, with a version bump (see Governance).
- Fonts stay **self-hosted** from `assets/fonts/`. Never switch Mona Sans to Google Fonts — that build strips the ss03/05/06/07/09 stylistic-set tables the brand depends on. The sets are enforced via `* { font-feature-settings: var(--leaf-type-features) }` because the `font` shorthand resets them.
- `assets/fonts/` here is a deliberate **runtime subset** (4 variable TTFs + their OFL licences) of the canonical font sources at the repo root (`assets/font/`, which also carries static faces and READMEs). The Claude Design project is self-contained, so the system cannot reference files outside this folder — do not "deduplicate" the subset away, and keep the OFL licence files beside the fonts (the SIL licence requires them to travel together).
- **Mona Sans is pinned to upstream github/mona-sans v2.0.27.** Upgrading is deliberate, never automatic: download the latest `mona-sans-variable-*.zip` release, copy `MonaSansVF[wdth,opsz,wght].ttf` (+ Italic) over the existing filenames in BOTH `assets/font/Mona Sans/` (repo root) and `assets/fonts/` here — filenames never change, they are public URLs — and refresh the OFL. Then **verify before committing**: check with fonttools that ss03/05/06/07/09 still substitute l/a/g/G/Q and the wght axis still spans 200–900 (v2.000 lacked ss09 — set semantics DO change between releases), render the type cards, bump DESIGN.md with the new pin, and regenerate the plugin's font subset (`prompts/brand/tools/subset_fonts.py`).

**Components**
- Each component is a directory of exactly four files that move as one unit: `<Name>.jsx` (named export, PascalCase), `<Name>.d.ts` (typed props, JSDoc), `<Name>.prompt.md` (one-line contract + example), `<Name>.card.html` (specimen).
- JSX conventions: no `import React` (the runtime provides it globally); no npm dependencies; no CSS-in-JS libraries. Styles are injected once per component via the `ensureStyles()` pattern with a unique style-element id and `leaf-`-prefixed class names; hover/focus/disabled live in CSS, not JS.
- Accessibility is non-negotiable: semantic elements, ARIA roles (switch, dialog, tablist, tooltip, `aria-current`), a `:focus-visible` ring of `2px solid var(--leaf-focus-ring)` (Aqua `--leaf-focus-ring-dark` on Ink) on everything interactive, disabled = 0.4 opacity + real `disabled` attribute, and `prefers-reduced-motion` handled in every CSS block that animates.
- The `@startingPoint` set is fixed: Button, Input, Table, Modal, SidebarItem. Do not add or remove members casually — it seeds new designs in the app.
- The component inventory is locked to what the component library reference shows. New components require a minor version bump and an entry under "Intentional additions" in `readme.md` with a reason.

**Specimen cards (`*.card.html`)**
- Line 1 must be exactly `<!-- @dsCard group="…" viewport="WxH" subtitle="…" name="…" -->` — no leading whitespace; the app's compiler indexes cards from this line.
- Cards link the root `styles.css` by relative path, are fully static (no React, no bundle references, no external resources), and show specimens directly with no headings or titles inside the body.
- Copy follows Leaf voice: UK English, sentence case, verb-first button labels, no exclamation marks, no emojis, em-dash for missing data, and the number conventions (`£1.49M`, `3.72x`, `24.6%`, ▲/▼ in Fern/Ember, `1 Jun 2026`).

**Icons and imagery**
- Illustrative icons come from `assets/icons/` via `<img>` — never hand-roll decorative SVGs and never recolour icons. The small functional strokes inside controls (check, chevron, ×, search, the sidebar glyphs) are part of the component spec and stay inline.
- The full themed icon library (~1,250) lives in the parent repo under `assets/icons/<theme>/<icon>/<variation>/<format>/`; this folder carries only the curated flat set the system actually uses.

**Never hand-write** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`, `thumbnail.html`, or a barrel `index.js`. These are generated by the Claude Design app's self-check. They exist only in the remote project, not in this repo — never commit them here and never include them in a sync.

## Canonical rulings

Where the visual references contradicted DESIGN.md, these were resolved once — do not relitigate them from the reference HTML:
- Breadcrumb ancestors are **Coral links**; only the current page is Ink + semibold.
- Modal cancel is **neutral** (Ink text, hairline pill); the destructive primary is solid **Ember, never Coral**.
- Input/Select focus is the 2px Coral **outline** ring (not a box-shadow ring); fields use `--leaf-radius-md` (14px).
- Coral is one decisive moment per view; status surfaces never use Coral.

## Verification (required before any sync)

Render every touched card headlessly and look at it:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
vp=$(head -1 path/to/X.card.html | sed -n 's/.*viewport="\([0-9]*\)x\([0-9]*\)".*/\1 \2/p')
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=${vp/ /,} \
  --screenshot=/tmp/card.png "file://$PWD/path/to/X.card.html"
```

Check: tokens resolve (no browser-default colours), Mona Sans letterforms load (tailed l, double-storey a/g), content fits the declared viewport, and the brand rules above hold. For component changes, also render the component's card and `ui_kits/answers/index.html` if the kit composes it.

## Sync workflow (repo ⇄ Claude Design)

**This repo is canonical; the Claude Design project is a build target.** All editing happens here.

Forward (the normal loop):
1. Spec first for rule changes: edit `DESIGN.md`, bump the version, add a changelog line.
2. Apply to files (token + spec together; component four-file unit together).
3. Verify (above), then commit.
4. Push **only the changed paths** with the DesignSync tool: `list_files` to confirm state → `finalize_plan` with the exact changed paths → `write_files` with `localPath` entries relative to this folder (`localDir` = this folder). Incremental, per-component — never a wholesale replace, and never touching the `_ds_*` generated files.
5. Open the project in the Claude Design app afterwards so its self-check recompiles `_ds_bundle.js` / `_ds_manifest.json`.

Downstream consumers to re-sync on version bumps (both live in the `leaf` plugin repo, `prompts/`): `brand/files/DESIGN.md` (verbatim copy of `DESIGN.md`, keeping its header) and the `leaf-design` artifact kit (`brand/skills/leaf-design/assets/leaf-tokens.css` regenerated from `tokens/*.css`; the font subset via `brand/tools/subset_fonts.py` if Mona Sans changed).

Reverse (a change born in the app — e.g. a generation produced a treatment worth keeping): pull it back before it strands — `get_file` the changed component, land the change here **and** in DESIGN.md, then re-push so both sides agree.

DesignSync is a Claude-session tool. Agents without it (Codex, others): make the repo-side change with full verification, then leave the push to a Claude Code session or note it clearly for a human — do not attempt to edit the Claude Design project by other means.

## Governance

- Versioning per DESIGN.md: **patch** = copy/typo/token value · **minor** = new component or guidance, backwards-compatible · **major** = a rule change that breaks existing artifacts. The changelog at the top of DESIGN.md records each release.
- Changes and exception requests route through the Creative team (creative@leaf.fm); the system is reviewed quarterly.
- Keep `readme.md`'s manifest and this file aligned with the actual folder structure whenever anything moves.
