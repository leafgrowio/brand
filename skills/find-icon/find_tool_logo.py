#!/usr/bin/env python3
"""Resolve a third-party tool name (Shopify, Slack, Snowflake…) to an official logo file.

Lookup order — stop at the first hit:

1. Leaf's curated `tools` group in the brand repo (`assets/logos/tools/<tool>/`),
   read from `logos_manifest.json`. Curated overrides and logos a Leafer uploaded
   because the collection lacked them.
2. The gilbarbara/logos collection (CC0 files; the marks stay their owners'
   trademarks), read from its `logos.json` catalogue pinned to a commit
   (`TOOL_LOGOS_REF`), matched on name and shortname.
3. Not found: the result says so and carries an `ask_user` line. The calling agent
   asks the person to upload the tool's official logo in the session. It never
   redraws a logo or substitutes a look-alike.

Stdlib only. Output is JSON on stdout.

    python3 find_tool_logo.py "shopify"
    python3 find_tool_logo.py "google ads" --fetch
    python3 find_tool_logo.py "slack" --local-root ../brand     # curated group from a clone

Usage rules for what this returns live in the design spec, Logos › Tool marks.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import brand_repo  # noqa: E402

# Pinned like BRAND_REPO_REF, for the same reason: jsDelivr does not purge a
# branch URL on push and the local cache never expires. Bump deliberately.
TOOL_LOGOS_REF = "a5b65275e761a8347a99eded1101c6b130a06e52"
TOOL_LOGOS_REPO = "gilbarbara/logos"
TOOL_LOGOS_CDN = f"https://cdn.jsdelivr.net/gh/{TOOL_LOGOS_REPO}@{TOOL_LOGOS_REF}"
TOOL_LOGOS_RAW = f"https://raw.githubusercontent.com/{TOOL_LOGOS_REPO}/{TOOL_LOGOS_REF}"
TOOL_LOGOS_LICENCE = "CC0-1.0 (files); marks remain their owners' trademarks — nominative use only"

ASK_USER = (
    "I couldn't find an official {tool} logo in Leaf's tool marks or the logo collection. "
    "Could you upload the official {tool} logo (SVG preferred, PNG fine) here? "
    "I won't redraw it."
)


def _cache_dir() -> Path:
    xdg = os.environ.get("XDG_CACHE_HOME")
    base = Path(xdg) if xdg else Path.home() / ".cache"
    return base / "leaf-brand" / "tool-logos" / TOOL_LOGOS_REF[:12]


def _norm(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", text.lower())


def _tokens(text: str) -> set:
    return {t for t in re.split(r"[^a-z0-9]+", text.lower()) if t}


def _get(url: str, timeout: int = 20) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "leaf-find-tool-logo"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read()


def _fetch(rel: str, cache: bool = True) -> tuple[Path | None, str | None]:
    """Download a collection file (CDN, then raw) into the pinned cache."""
    dest = _cache_dir().joinpath(*rel.split("/"))
    if cache and dest.exists() and dest.stat().st_size > 0:
        return dest, None
    last = None
    for base in (TOOL_LOGOS_CDN, TOOL_LOGOS_RAW):
        url = f"{base}/{urllib.parse.quote(rel)}"
        try:
            data = _get(url)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return dest, None
        except (urllib.error.URLError, OSError) as exc:
            last = f"{url}: {exc}"
    return None, last


def curated(query: str, local_root: str | None) -> dict | None:
    manifest = json.loads((HERE / "logos_manifest.json").read_text())
    tools = manifest.get("groups", {}).get("tools", {})
    q = _norm(query)
    for name, variants in tools.items():
        if _norm(name) != q:
            continue
        files = []
        for spacing, formats in variants.items():
            for fmt, paths in formats.items():
                for p in paths:
                    files.append({"format": fmt, "spacing": spacing, "path": p,
                                  "url": brand_repo.asset_url(p)})
        files.sort(key=lambda f: 0 if f["format"] == "svg" else 1)
        return {"source": "leaf-tools", "tool": name, "files": files,
                "recommended": files[0] if files else None}
    return None


def _pick(files: list, shortname: str) -> str:
    """Prefer the square mark for the icon slot, then the full logo."""
    for pref in (f"{shortname}-icon.svg", f"{shortname}.svg"):
        if pref in files:
            return pref
    plain = [f for f in files if "-dark" not in f]
    return (plain or files)[0]


def collection(query: str) -> tuple[dict | None, str | None]:
    path, err = _fetch("logos.json")
    if not path:
        return None, err
    catalogue = json.loads(path.read_text())
    q, qt = _norm(query), _tokens(query)
    exact, partial = [], []
    for entry in catalogue:
        name, short = entry.get("name", ""), entry.get("shortname", "")
        if q in (_norm(name), _norm(short)):
            exact.append(entry)
        elif qt and (qt <= _tokens(name) or qt <= _tokens(short.replace("-", " "))):
            partial.append(entry)
    hits = exact or partial
    if not hits:
        return {"source": "collection", "matches": []}, None
    matches = []
    for entry in hits[:5]:
        short = entry["shortname"]
        files = [{"file": f, "url": f"{TOOL_LOGOS_CDN}/logos/{urllib.parse.quote(f)}"}
                 for f in entry.get("files", [])]
        rec = _pick(entry.get("files", []), short)
        matches.append({"name": entry.get("name"), "shortname": short,
                        "site": entry.get("url"), "files": files,
                        "recommended": {"file": rec,
                                        "url": f"{TOOL_LOGOS_CDN}/logos/{urllib.parse.quote(rec)}",
                                        "path": f"logos/{rec}"}})
    return {"source": "collection", "matches": matches, "exact": bool(exact)}, None


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("tool", help='Tool name, e.g. "shopify", "google ads"')
    ap.add_argument("--fetch", action="store_true", help="Download the recommended file")
    ap.add_argument("--local-root", help="Brand repo clone, for the curated group's files")
    args = ap.parse_args()

    out: dict = {"query": args.tool, "collection_ref": TOOL_LOGOS_REF,
                 "licence": TOOL_LOGOS_LICENCE}

    hit = curated(args.tool, args.local_root)
    if hit:
        out.update(status="found", **hit)
        if args.fetch and hit["recommended"]:
            p = brand_repo.fetch_asset(hit["recommended"]["path"], local_root=args.local_root)
            out["fetched"] = str(p)
        print(json.dumps(out, indent=2))
        return

    res, err = collection(args.tool)
    if res is None:
        out.update(status="unreachable", error=err,
                   catalogue_url=f"{TOOL_LOGOS_CDN}/logos.json",
                   hint=("This environment cannot reach the collection. Try the catalogue URL "
                         "with another web tool, or ask the person to upload the official logo."),
                   ask_user=ASK_USER.format(tool=args.tool))
        print(json.dumps(out, indent=2))
        return
    if not res["matches"]:
        out.update(status="not_found", ask_user=ASK_USER.format(tool=args.tool))
        print(json.dumps(out, indent=2))
        return

    out.update(status="found" if res.get("exact") else "candidates", **res)
    if not res.get("exact"):
        out["note"] = "No exact name match; confirm the right tool before using one of these."
    if args.fetch and res.get("exact"):
        p, ferr = _fetch(res["matches"][0]["recommended"]["path"])
        out["fetched" if p else "fetch_error"] = str(p) if p else ferr
    print(json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
