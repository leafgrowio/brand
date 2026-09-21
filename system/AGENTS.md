# Agent notes — Leaf design system (`system/`)

This folder is the **compiled, consumable form of Leaf's brand**: tokens, React components, specimen cards, and the Answers UI kit. It is the editable source for the Claude Design project **"Design System"** (projectId `50c5863c-cf10-448a-afcd-8bfe51f84469`, the org default). Read this file fully before changing anything here; the guardrails below exist to prevent drift between the spec, the files, and the deployed design system.

## Source of truth, in order

1. **`DESIGN.md`** (in this folder) — the ratified written spec (v2.0). Every rule and token traces to it. This is the single canonical DESIGN.md; there is deliberately no copy at the repo root.
2. **`readme.md`** — the guide + manifest digest (voice rules, visual fundamentals, component index, intentional additions, resolved discrepancies).
3. **`Leaf Brand Book.dc.html`** and **`Leaf Component Library.dc.html`** — visual references for humans, and navigators of the system (since v1.0.5). They consume `styles.css` — all styling through `var(--leaf-*)` tokens, fonts self-hosted via `tokens/fonts.css` — and each ends with a **Rendered from source** section that live-embeds every specimen card via relative iframes at its declared viewport. Keep them token-clean (no new hard-coded values; the only literal hexes are visible swatch-label text, do/don't specimens, and the JS fallbacks beside the `getComputedStyle` token reads). Renaming or moving a card breaks these embeds — update both references in the same change. The compiler ignores them; do not delete them.

   **Their typography is on the scale, and must stay there.** These two files used to set their
   body copy on a private editorial ramp — 12.5, 13.5, 15, 15.5, 17, 19px and the variable font's
   in-between weights 420, 520 and 680 — about 1,150 declarations of it. As of v2.0 every one reads a
   `--leaf-type-*` token. The reasoning: a brand book that documents a type scale and then sets itself
   on a different one is arguing against its own case, and while the private ramp existed there was no
   way to tell a deliberate 15.5px from a careless one. Now any literal type value in these files is a
   signal. It cost almost nothing to move — the document grew 20px in 32,000, and one element that had
   been clipping stopped. Three literal Source Serif 4 declarations remain: the 72px "Aa" face specimen and a 19px italic
   sample line, because the web serif scale has only two styles and neither fits; and a fluid
   `clamp()` hero subtitle, which is the sanctioned fluid-display case, not an exception. If the serif scale ever
   gains a display size, fold them in. One rule takes a token and overrides a single property — the token
   block in the for-agents section is `caption` with `line-height: 2` for code legibility. That pattern is
   fine and is how a deliberate deviation should look: on the scale, with the exception visible. The v1.0.5 instruction to keep
   these files token-clean covered colour; since v2.0 it covers type as well.
4. The files themselves (`tokens/`, `components/`, `foundations/`, `ui_kits/`).

Where anything disagrees, DESIGN.md wins and **all** artifacts get fixed together in the same change. A token value may never differ between `tokens/*.css` and DESIGN.md's implementation block.

## Layout

```text
styles.css              # entry point — @import lines only, consumers link this one file
support.js              # small helper the two .dc.html references load; not part of the system
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
- Fonts stay **self-hosted** from `assets/fonts/`, and Mona Sans here is a **frozen build** (below). Never switch to Google Fonts — not because that build strips the stylistic sets (it does not; the claim was measured and withdrawn in v2.0) but because self-hosting pins the font to a named upstream release, makes no third-party request at render time, and is the only way to serve a renderer that cannot request OpenType features. The sets are still enforced via `* { font-feature-settings: var(--leaf-type-features) }` because the `font` shorthand resets them, and because it rescues any surface that loads a stock Mona Sans instead of ours.
- `assets/fonts/` here is a deliberate **runtime subset** (4 variable TTFs + their OFL licences) of the canonical font sources at the repo root (`assets/font/`, variable fonts + licences only). The Claude Design project is self-contained, so the system cannot reference files outside this folder — do not "deduplicate" the subset away, and keep the OFL licence files beside the fonts (the SIL licence requires them to travel together).
- **Fonts are pinned to named upstream releases and kept current deliberately, never automatically.** Mona Sans: **github/mona-sans v2.0.27** (`mona-sans-variable-*.zip` → `MonaSansVF[wdth,opsz,wght].ttf` + Italic). Source Serif 4: **adobe-fonts/source-serif 4.005R** (`*_Desktop.zip` → `VAR/SourceSerif4Variable-Roman.ttf` + Italic). Check both upstreams when touching fonts. Filenames never change in either place — they are public URLs.

  **`assets/font/` (repo root) is verbatim upstream. `assets/fonts/` here is a frozen build derived from it.** Since v2.0, the Mona Sans this system ships has ss03/05/06/07/09 baked into the glyph mapping (`a` *is* `a.ss05`) and its `wght` default moved from 200 to 400, so a surface that cannot request OpenType features still gets the brand letterforms, and one that sets no weight gets Regular rather than Thin. Never overwrite the root sources with a frozen build: they are what the freeze is built from, and a modified font must stay distinguishable from the upstream it came from.

  To upgrade: copy the new upstream variable TTFs over the existing filenames in `assets/font/` and refresh the OFL files. Then re-freeze into `assets/fonts/` here —

  ```bash
  pyftfeatfreeze -f "ss03,ss05,ss06,ss07,ss09" in.ttf out.ttf   # opentype-feature-freezer
  python -c "from fontTools.ttLib import TTFont; from fontTools.varLib.instancer import instantiateVariableFont as I; f=TTFont('out.ttf'); I(f,{'wght':(200,400,900)},inplace=True,updateFontNames=False); f.save('out.ttf')"
  ```

  Both weights, roman **and** italic — the italic was missed the first time and rendered stock letterforms silently for a day. Then **verify before committing**: with fonttools, confirm the cmap maps l/a/g/G/Q to `l.ss03`/`a.ss05`/`g.ss06`/`G.ss07`/`Q.ss09`, the `wght` axis still spans 200–900 with default 400, and the sets still exist upstream at all (set semantics DO change between releases — Mona v2.000 lacked ss09). Render the type cards, bump DESIGN.md with the new pins, and regenerate the plugin's font subset (`prompts/brand/tools/subset_fonts.py`).

**Components**
- Each component is a directory of exactly four files that move as one unit: `<Name>.jsx` (named export, PascalCase), `<Name>.d.ts` (typed props, JSDoc), `<Name>.prompt.md` (one-line contract + example), `<Name>.card.html` (specimen).
- **The `font:` shorthand resets `font-weight`, `font-style` and `font-feature-settings`.** Every
  `--leaf-type-*` token is a `font` shorthand, so `font: var(--leaf-type-ui-body)` silently discards a
  weight set on the base class — which is how v2.0 shipped buttons at 400 where the spec says 600, in a
  system whose own stylesheet already documents this hazard for stylistic sets. Where a rule sets a
  `font:` token and the element needs a different weight than that token carries, restate
  `font-weight` on the line after. Check it by cascade, not by eye: 500 against 600 at 13px is
  invisible in a screenshot.
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

## The token-name check

Grep every `--leaf-*` **name** written anywhere under `system/` — not just `var()` references — and confirm each one exists in `tokens/*.css`. The only legitimate exceptions are names that appear **solely inside DESIGN.md's changelog or this file's prose, as a record of something removed or wrong**: the bare prefix `--leaf-type-`, the two retired tracking tokens, and `--leaf-color-brand-coral` / `--leaf-color-neutral-ink`, quoted below as examples of names that never existed. A name that appears anywhere else is a defect.

This is not the same check as resolving `var()` usages, and the difference matters: the "For agents" band shipped a token cheat-sheet listing `--leaf-color-brand-coral`, `--leaf-color-neutral-ink` and five more that have never existed, because they were written as bare declarations inside a code block rather than as `var()` calls. Seven wrong names, in the one section every agent reads before producing Leaf work. A `var()`-only sweep cannot see them.

## The contrast check

Before any sync, resolve every text-on-background pair in `system/` and compute its ratio. Do not spot-check by eye and do not trust a screenshot: 500 against 600 at 13px is invisible, and so is 3.1:1 against 4.5:1. Resolve tokens to hex, composite translucent foregrounds over their ground, read size and weight from the declaration (remembering that a `--leaf-type-*` token carries the weight), and apply 4.5:1 — or 3:1 where the text is 24px+, 19px+ bold, or a glyph inside a badge.

**Run it two ways, because one way is not enough.** A same-element pass, where one declaration sets both `color` and `background`, catches components. A tree pass, which walks the HTML and inherits the background from ancestors, catches a coloured child sitting on a tinted parent — which is most of the brand book, and which the same-element pass structurally cannot see. The first version of this check reported "0 defects" while four Do/Don't panel labels were sitting at 3.67:1, because they were children of the tinted card rather than the card itself.

At v2.0: the same-element pass reports **165 pairs, 0 defects, 31 ratified**. The tree pass reports **1,292 pairs**, with a residue of 9 child-on-inherited-background findings in three classes, all correct: verdict chips inside the contrast-reference panel, which exist to demonstrate a pairing (5); ✓/✕ glyphs and ▲/▼ delta arrows, which are marks carrying a second cue (2); and decorative `›` breadcrumb separators (2). Any *new* name appearing in that residue is a defect until argued otherwise.

The check exists because hand-auditing kept finding these one at a time: the active sidebar item, then tags, then status pills, then the muted token, then the Do/Don't labels — five instances of *colour carrying legibility*, found over five separate passes, when two sweeps find all five. Both scripts belong in the plugin repo with the rest of the tooling (`prompts/brand/tools/`), not here.

## Ratified accessibility exceptions

DESIGN.md's Accessibility section carries a **Ratified exceptions** table: Canvas on solid Coral (3.04:1), Coral eyebrows and small uppercase labels, and Coral inline links and secondary-button labels. These were measured and signed off by the CEO with the reasoning written down. **Do not re-raise them as defects, and do not "fix" them.** An audit that finds them has found the exception. Anything below the AA floor that is *not* in that table is a real defect — including anything that drifts onto a Stone ground, where Coral has no second signal.

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
