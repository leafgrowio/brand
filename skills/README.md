# Leaf brand skills (standalone)

Self-contained [Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills) for working with the Leaf brand from any Claude setup — Claude Code CLI, the desktop app, or anything else that reads `SKILL.md` folders. They are the same skills that ship inside Leaf's internal `leaf` plugin, packaged here so that people without access to the plugin distribution can still generate on-brand output.

- **`find-icon/`** — resolves a natural-language description to an exact Leaf icon or logo asset (SVG or PNG, right colour variation) from this repo's ~1,250-icon library, and can generate Notion banners from a pick. Assets are fetched at runtime from this repo's raw GitHub URLs and cached locally, so the skill folder stays small.
- **`leaf-design/`** — the artifact kit: Leaf design tokens, base styles, component classes, chart recipes, and an embeddable Mona Sans subset, plus the brand's hard rules, so generated HTML artifacts, dashboards, decks, and reports follow the Leaf design system without fetching anything at render time.

## Install

**Claude Code (personal, all projects):** copy the skill folders into your personal skills directory.

```bash
git clone --depth 1 https://github.com/leafgrowio/brand.git
mkdir -p ~/.claude/skills
cp -R brand/skills/find-icon brand/skills/leaf-design ~/.claude/skills/
```

**Claude Code (one project):** copy them into the project's `.claude/skills/` folder instead, and commit them with the project.

**skills CLI:** `npx skills add leafgrowio/brand` installs them from this repo directly, if you use the `skills` installer.

Requirements: `find_icon.py` is stdlib-only. Banner generation additionally needs Pillow (`pip install pillow`). Asset fetching needs network access to `raw.githubusercontent.com` (with an automatic git-clone fallback via `github.com` when raw is blocked).

**Leafers:** if you have the `leaf` plugin installed, do not install these — the plugin already ships both skills (plus `leaf-context`, which layers the deeper design spec and company context on top). These copies exist for setups the plugin does not reach.

## Provenance

These folders are synced exports from Leaf's internal `leaf` plugin repo (`prompts`), which is the canonical source — edit the skills there and re-export with its `scripts/sync-brand-skills.sh`, not here. The manifests (`find-icon/manifest.json`, `find-icon/logos_manifest.json`) are generated from this repo's asset tree and are never hand-edited; the full design spec behind both skills is [`system/DESIGN.md`](../system/DESIGN.md).
