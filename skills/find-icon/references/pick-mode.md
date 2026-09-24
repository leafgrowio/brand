# Pick mode — full ladder

Loaded from `find-icon`'s SKILL.md when a human is choosing an icon or logo
interactively. Everything below assumes pick mode (search first, ask later —
the user sees candidates before being asked anything). Never ask where the
icon will live, or whether they would like a preview, before they have
picked one.

## Capture the destination from the ask

Most requests name the target artifact in the same breath ("an icon for a
Notion banner of X", "…for a slide", "…for a doc header"). Read it out of
the request and carry it through the whole flow — never ask for information
the user already gave. A known destination does three things: it sets the
`--recommend` variation in step 2, it can skip step 2 entirely (Notion
banners — see step 4), and it tells step 4 where to hand off, without a
question.

## Step 1: search and show the selector immediately

Run the CLI once and present the results visually as the default action — do
not wait to be asked for a preview. For a concept with no direct hit or thin
results, pass SEVERAL related terms to that ONE call instead (e.g.
`find_icon.py "work in progress" "construction" "checklist" --limit 6`) —
the CLI merges and dedupes them into a single ranked selector. Never run
separate searches and combine the resulting gallery/widget files by hand.
Pick the best presentation the surface supports:

**a. Inline chat widget** (surfaces with an in-chat HTML widget tool, e.g.
Cowork's `show_widget`). Generate BOTH outputs in one run so the fallback is
already on disk:

```bash
python3 <this skill's directory>/find_icon.py "<query>" --limit 5 \
  --widget <workdir>/icon-widget.html --gallery <workdir>/icon-candidates.html
```

Read the fragment file and render it through the widget tool **verbatim** —
the cards are clickable and send the pick back into chat via the surface's
global `sendPrompt()`. If the widget tool requires a setup step first (e.g. a
`read_me` call), do that before rendering. **If the widget tool errors or is
unavailable, do not retry and do not re-run the CLI — present the
already-generated gallery file (rung b) immediately** and ask for a pick by
number or name. Widget tools can be intermittently flaky; one attempt, then
fall back.

**b. File preview / artifacts, no inline widget:**

```bash
python3 <this skill's directory>/find_icon.py "<query>" --limit 5 \
  --gallery <workdir>/icon-candidates.html
```

Galleries are self-contained (inline `<svg>`) by default — in-app
file-preview panels typically block ALL external images (including
cdn.jsdelivr.net), so an inline gallery is the one that reliably renders. Use
`--embed cdn` only when the file is destined for a real browser tab. Present
the file (e.g. `present_files` in Cowork; attach/preview on claude.ai) and
ask the user to pick by number or name.

**c. Bare CLI:** give the user a text table (number, name, theme) read from
the ranked JSON, plus the file path if a gallery was written.

Both selectors show numbered, captioned cards (one neutral display variation
per candidate); stdout carries the same ranked JSON plus `"widget"`/
`"gallery"` paths. Never make a human choose from a list of file paths
alone. If `results` is empty (`[]`), say so and ask for a different
description — do not substitute a loosely related icon.

## Step 2: show colour variations the same way

Once an icon is chosen, same ladder, same command shape:

```bash
python3 <this skill's directory>/find_icon.py --icon "<theme>/<Icon Name>" \
  --widget <workdir>/icon-var-widget.html --gallery <workdir>/icon-variations.html
```

(Same dual-output rule: widget first, already-generated gallery file as the
no-retry fallback; gallery alone on surfaces with no widget tool.)

One card per colour variation that exists in the manifest — light swatch
behind `black`, dark swatch behind `white` — so the right choice for the
target surface is self-evident. Add `--recommend "<variation>"` **only if
the target surface is already known from the conversation** (dark surface →
`white`; light → `black`); do not ask a question to establish it. Let the
user confirm or override. **Skip this step entirely when the destination is
a Notion banner** — the banner builder owns colour and treatment, so go
straight from the icon pick to step 4.

## Step 3: deliver

`--fetch` the confirmed variation/format — the only download of a
deliverable — and return the local cached path plus the brand-repo path and
pinned jsDelivr URL. If jsDelivr is unreachable (some sandboxes block it),
the fetch falls back automatically to raw.githubusercontent.com at the same
pinned commit, then to a sparse git clone of the brand repo via github.com —
no action needed.

## Step 4: hand off to the builder

This skill resolves assets; it does not build surfaces. If the destination
was named in the ask, hand the picked icon (theme/name and fetched path)
straight on without asking again; only if it is genuinely unknown, ask here
— the only place usage ever gets asked.

- **Leaf plugin installed:** hand off to the **`saville`** skill, which owns
  every brand surface — including **Notion page covers, gallery cards, and
  square banners** (its `scripts/notion_banner_generator.py`), social cards,
  deck covers, and the rest of its surface catalogue. Pass the icon name so
  Saville does not search again.
- **Standalone install (no plugin):** return the fetched asset and compose
  the surface ad hoc, following the design spec for spacing, logo, and
  colour rules. Notion banner generation needs the Leaf plugin.

Never place the icon on a surface that violates the design spec.

## Selectors are premade — never hand-author gallery or widget markup

The selector UIs ship with the skill and `find_icon.py` generates them. Your
whole job is to run one command and present the output — do not write,
adapt, or "improve" gallery or widget HTML yourself, on any surface. To
combine multiple searches into one selector, pass multiple query terms in a
single run (e.g. `find_icon.py "work in progress" "construction"
"checklist"`) — the script merges and dedupes them into one gallery/widget
with continuous badge numbering; do not splice separate gallery files
together by hand.

- `--gallery <out.html>` fills the shipped `gallery_template.html` into a
  self-contained HTML document. Icons default to inline `<svg>` (`--embed
  inline`): each card's SVG text is fetched (cached, with a git-clone
  fallback) and inlined directly into the file, because gallery files are
  routinely opened in an in-app file-preview panel whose CSP blocks ALL
  external images — including jsDelivr — so a CDN-embedded gallery renders
  as broken image placeholders there. Use `--embed cdn` only when you know
  the file will be opened in a real browser tab (nothing fetched,
  near-instant): it points `<img>` tags at the icon's SVG on
  cdn.jsdelivr.net. `--embed url` points `<img>` tags at the PNGs on that
  same pinned jsDelivr URL instead, also for browser-destined files. A
  per-card inline failure falls back to a URL embed and is noted under
  `embed_fallbacks` in the JSON.
- `--widget <out.html>` writes a compact HTML fragment for inline
  chat-widget surfaces: scoped CSS, cdn-embedded icons by default (`--embed
  cdn`) because the chat-widget CSP allowlists cdn.jsdelivr.net — keeping
  the fragment tiny — and clickable cards wired to `sendPrompt()`. Paste the
  fragment into the widget tool verbatim — never hand-edit, trim, or
  restyle it. It can be combined with `--gallery` in one run: each output
  resolves its own default unless `--embed` is passed explicitly, in which
  case it applies to both.

Download only the final deliverable, with `--fetch`, after the variation is
confirmed.
