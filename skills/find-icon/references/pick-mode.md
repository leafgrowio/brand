# Pick mode

Loaded from `find-icon`'s SKILL.md when a human is choosing an icon or logo
interactively. Search first, ask later: the person sees candidates before being
asked anything. Never ask where the icon will live, or whether they'd like a
preview, before they have picked one.

## Capture the destination from the ask

Most requests name the target in the same breath ("an icon for a Notion banner
of X", "…for a slide", "…for a doc header"). Read it out of the request and
carry it through; never ask for what the person already said. A known
destination sets the `--recommend` variation in step 2, skips step 2 entirely
for Notion banners, and tells step 4 where to hand off.

## Step 1: search and show candidates

Run the CLI once. For a concept with thin results, pass several related terms to
that one call (`find_icon.py "work in progress" "construction" "checklist"
--limit 6`); it merges and dedupes them into a single ranked set. Never run
separate searches and combine the output by hand. If `results` is `[]`, say so
and ask for a different description; never substitute a loosely related icon.

Two rungs, in this order:

1. **Interactive widget**, where the visualize tool (`show_widget`) is
   available. Generate only the widget fragment:

   ```bash
   python3 <this skill's directory>/find_icon.py "<query>" --limit 5 \
     --widget <workdir>/icon-widget.html
   ```

   Do the tool's setup step first if it needs one, then render the fragment
   **verbatim**. The cards are clickable and send the pick back through
   `sendPrompt()`. One attempt: if the widget tool errors, drop to rung 2.
2. **A rendered gallery file** sent to the person (SendUserFile, display
   `render`). Generate it only if rung 1 isn't available or failed:

   ```bash
   python3 <this skill's directory>/find_icon.py "<query>" --limit 5 \
     --gallery <workdir>/icon-candidates.html
   ```

   Ask for a pick by number or name. The gallery is self-contained (inline
   `<svg>`) by default because in-app file previews block external images. Use
   `--embed cdn` only for a file destined for a real browser tab.

For **2–4 clearly distinct candidates**, skip the visuals: ask with
AskUserQuestion (names as the options) where available, otherwise in one short
message. If nothing visual or interactive is available at all, give a text
table (number, name, theme) read from the ranked JSON. Never make a person
choose from a list of file paths alone.

## Step 2: show colour variations the same way

Once an icon is chosen, same two rungs, same command shape:

```bash
python3 <this skill's directory>/find_icon.py --icon "<theme>/<Icon Name>" \
  --widget <workdir>/icon-var-widget.html          # rung 1
python3 <this skill's directory>/find_icon.py --icon "<theme>/<Icon Name>" \
  --gallery <workdir>/icon-variations.html         # rung 2, only if needed
```

One card per colour variation in the manifest (light swatch behind `black`, dark
swatch behind `white`). Add `--recommend "<variation>"` only if the target
surface is already known (dark surface: `white`; light: `black`); don't ask a
question to establish it. Skip this step when the destination is a Notion
banner: the banner builder owns colour and treatment.

## Step 3: deliver

`--fetch` the confirmed variation and format (the only download of a
deliverable) and return the local cached path plus the brand-repo path and
pinned URL. If jsDelivr is unreachable the fetch falls back automatically to
raw.githubusercontent.com at the same commit, then to a sparse git clone.

## Step 4: hand off to the builder

This skill resolves assets; it does not build surfaces. If the destination was
named in the ask, hand the picked icon (theme/name and fetched path) straight on
without asking again; ask here only if it is genuinely unknown.

- **Leaf plugin installed:** hand off to `saville`, which owns every brand
  surface, including Notion page covers, gallery cards and square banners
  (`scripts/notion_banner_generator.py`). Pass the icon name so Saville doesn't
  search again.
- **Standalone install:** return the fetched asset and compose the surface
  against the design spec. Notion banner generation needs the Leaf plugin.

Never place the icon on a surface that violates the design spec.

## Selectors are premade

The widget and gallery UIs ship with the skill and `find_icon.py` generates
them. Run one command and present the output; never write, adapt, trim or
restyle selector markup, and never splice separate files together.

- `--gallery <out.html>` fills `gallery_template.html` into a self-contained
  document. `--embed inline` (default) inlines each card's SVG; `--embed cdn`
  and `--embed url` point `<img>` tags at the pinned jsDelivr URL, for browser
  tabs only. A per-card inline failure falls back to a URL embed and is noted
  under `embed_fallbacks` in the JSON.
- `--widget <out.html>` writes a compact fragment for inline widgets: scoped
  CSS, cdn-embedded icons by default (the widget CSP allowlists
  cdn.jsdelivr.net), clickable cards wired to `sendPrompt()`.

Download only the final deliverable, with `--fetch`, after the variation is
confirmed.
