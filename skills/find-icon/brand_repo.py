#!/usr/bin/env python3
"""Central config and fetch helper for Leaf brand assets.

Brand assets (icons, logos, fonts) are NOT shipped with the `leaf` plugin. They
live in the public GitHub repo `leafgrowio/brand` and are fetched at runtime.
The manifests in this skill store brand-repo-relative paths (e.g.
"assets/icons/shopping/Cart/black/svg/Cart.svg"); this module turns such a path
into a URL and, on request, downloads it into a local cache so tools can
operate on a real file.

ONE SOURCE, PINNED TO A COMMIT. Everything — display `<img>` embeds and real
downloads alike — goes to jsDelivr at `BRAND_REPO_REF`, so what a gallery shows
and what lands on disk are byte-for-byte the same object. raw.githubusercontent
and a git clone remain as fallbacks for sandboxes that block the CDN; they are
never the first choice.

The pin is a commit SHA, not `main`, and that is deliberate. jsDelivr does not
purge on push: a branch-pinned URL keeps serving the previous bytes for hours to
days, and `fetch_asset()` would write those stale bytes into a local cache that
has no expiry — so one unlucky fetch would persist indefinitely. A SHA-pinned
URL is immutable, so jsDelivr caches it forever and always correctly, and the
cache directory is keyed on the same SHA so bumping the pin invalidates it.

Bump BRAND_REPO_REF whenever anything FETCHED THROUGH IT changes in
leafgrowio/brand — not on every commit there. That is: files under `assets/`,
and `system/DESIGN.md`, which the find-icon skill tells callers to read at this
same pinned URL. Commits touching only `skills/`, tooling or other docs need no
bump. The invariant to check before a release is simply:

    git -C <brand clone> diff --quiet <BRAND_REPO_REF> HEAD -- assets/ system/DESIGN.md

The pin can never name the commit that contains itself — bumping it and
re-exporting the standalone skills always advances the brand repo by one more
commit. That is expected; the invariant above is what matters, not equality
with HEAD.

Stdlib only — no third-party dependencies — so any agent runtime can import it.

The asset path layout is a public URL contract: the segments after the base
(assets/icons/..., assets/logos/..., assets/font/...) map directly onto the
`leafgrowio/brand` tree. Renaming or moving assets in that repo without
regenerating the manifests here will break every URL.
"""

from __future__ import annotations

import os
import shutil
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

# The pinned commit in leafgrowio/brand that every URL below resolves against.
# BUMP THIS when assets/ or system/DESIGN.md change there — both are fetched
# through this pin — and re-run the manifest generators if any path moved.
# `scripts/sync-brand-skills.sh --check` verifies it. See the module docstring
# for why it is a SHA and not a branch.
BRAND_REPO_REF = "597b98ae57be6ece64fcf2163369eca7cac8bba4"

# PRIMARY: jsDelivr's GitHub mirror at the pinned commit. Used for everything —
# display-only <img> embeds AND real downloads — so a gallery and a fetch can
# never disagree. jsDelivr is also on the chat-widget CSP allowlist, which
# raw.githubusercontent.com is not, so this is the only base that works on
# every surface.
CDN_REPO_BASE = f"https://cdn.jsdelivr.net/gh/leafgrowio/brand@{BRAND_REPO_REF}"

# FALLBACK: raw.githubusercontent at the same commit, for sandboxes that reach
# GitHub but not jsDelivr. Same bytes, same pin.
RAW_REPO_BASE = f"https://raw.githubusercontent.com/leafgrowio/brand/{BRAND_REPO_REF}"

# LAST RESORT: clone URL, for sandboxes that block both CDNs but allow
# github.com. A blobless sparse clone checked out at the same pinned commit.
BRAND_REPO_GIT = "https://github.com/leafgrowio/brand.git"

# Deprecated alias kept so older callers importing BRAND_REPO_BASE still work;
# it now points at the CDN like everything else.
BRAND_REPO_BASE = CDN_REPO_BASE

# Which transport served the most recent fetch_asset() call:
# "cache", "url", "git", or "local". Informational only.
LAST_TRANSPORT: str | None = None


def _cache_root() -> Path:
    """User cache dir for downloaded assets: $XDG_CACHE_HOME/leaf-brand or
    ~/.cache/leaf-brand."""
    xdg = os.environ.get("XDG_CACHE_HOME")
    base = Path(xdg) if xdg else Path.home() / ".cache"
    return base / "leaf-brand"


def _encode(rel_path: str) -> str:
    """URL-encode each path segment individually, so spaces and other
    characters in asset names ("Jack Port", "Leaf Answers - Black.png") are
    escaped while the "/" separators are preserved."""
    clean = rel_path.strip().lstrip("/")
    return "/".join(urllib.parse.quote(segment) for segment in clean.split("/"))


def asset_url(rel_path: str) -> str:
    """The canonical URL for a brand asset: jsDelivr at the pinned commit.

    This is the one URL to use, for display and for download alike. It is safe
    to put straight into an `<img src>` (jsDelivr is CSP-allowlisted in chat
    widgets) and it is what `fetch_asset()` downloads, so a preview and a file
    on disk are always the same bytes.
    """
    return f"{CDN_REPO_BASE}/{_encode(rel_path)}"


def cdn_url(rel_path: str) -> str:
    """Alias of `asset_url()`, kept for callers written when the CDN and the
    raw host were two different things. Both now return the same pinned
    jsDelivr URL; prefer `asset_url()` in new code."""
    return asset_url(rel_path)


def raw_url(rel_path: str) -> str:
    """The raw.githubusercontent URL at the same pinned commit — the fallback
    transport, for sandboxes that reach GitHub but not jsDelivr. Not the URL to
    hand out or embed; use `asset_url()` for that."""
    return f"{RAW_REPO_BASE}/{_encode(rel_path)}"


def cache_path(rel_path: str) -> Path:
    """Local cache location for an asset, namespaced by the pinned commit.

    The ref prefix is what makes the cache correct: cached files never expire,
    so without it an asset whose bytes changed under an unchanged path would be
    served from a warm cache forever. Keying on the ref means bumping
    BRAND_REPO_REF misses every stale entry and re-fetches. Old ref directories
    are simply orphaned and can be deleted.
    """
    clean = rel_path.strip().lstrip("/")
    return _cache_root().joinpath(BRAND_REPO_REF[:12], *clean.split("/"))


def _git(args: list, cwd: Path | None = None, attempts: int = 3) -> None:
    """Run git, retrying transient failures (flaky sandbox proxies return
    intermittent 5xx on github.com) with a short backoff."""
    for attempt in range(attempts):
        try:
            subprocess.run(
                ["git", *args],
                cwd=cwd,
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            return
        except subprocess.SubprocessError:
            if attempt == attempts - 1:
                raise
            time.sleep(2 * (attempt + 1))


def _fetch_via_git(clean: str) -> Path | None:
    """Materialise one asset via a blobless sparse clone of the brand repo.

    Last-resort transport for environments that block both CDNs but allow
    github.com. Maintains one clone per pinned ref under <cache>/repo-<ref>/
    (created with --filter=blob:none --sparse, then grown one directory at a
    time with sparse-checkout add) and checks out BRAND_REPO_REF, so this path
    serves the same commit as the CDN rather than whatever the branch tip
    happens to be. Returns the file inside the clone, or None if git or the
    file is unavailable — the caller then re-raises the original URL error.
    """
    if shutil.which("git") is None:
        return None
    repo = _cache_root() / f"repo-{BRAND_REPO_REF[:12]}"
    try:
        if not (repo / ".git").is_dir():
            if repo.exists():  # broken previous attempt — start over
                shutil.rmtree(repo)
            repo.parent.mkdir(parents=True, exist_ok=True)
            # No --depth here: a shallow clone of the branch tip may not
            # contain the pinned commit. Blobless keeps it cheap anyway.
            _git(["clone", "--filter=blob:none", "--sparse",
                  BRAND_REPO_GIT, str(repo)])
            _git(["checkout", BRAND_REPO_REF], cwd=repo)
        target = repo.joinpath(*clean.split("/"))
        if not target.is_file():
            _git(["sparse-checkout", "add", clean.rsplit("/", 1)[0]], cwd=repo)
        return target if target.is_file() else None
    except (OSError, subprocess.SubprocessError):
        return None


def fetch_asset(rel_path: str, cache: bool = True, local_root: str | None = None) -> Path:
    """Fetch a brand asset and return a local Path to the file.

    rel_path is brand-repo-relative, e.g. "assets/icons/.../Cart.svg".

    - If ``local_root`` is given (offline/debug use), the file is read from that
      local clone of the brand repo instead of the network: local_root/rel_path.
    - Otherwise the asset is downloaded and cached under the user cache dir,
      namespaced by the pinned ref. Set ``cache=False`` to force a re-download.
    - Transports are tried in order: jsDelivr at the pinned commit (the same
      URL `asset_url()` hands out), then raw.githubusercontent at that commit,
      then a sparse git clone checked out at it. All three serve identical
      bytes, so callers see no difference beyond latency. If all three fail the
      original CDN error is raised.

    Raises FileNotFoundError on a 404 (usually a stale manifest) and RuntimeError
    on any other network failure, both with an actionable message.
    """
    global LAST_TRANSPORT
    clean = rel_path.strip().lstrip("/")

    if local_root:
        src = Path(local_root).expanduser().joinpath(*clean.split("/"))
        if not src.exists():
            raise FileNotFoundError(f"Brand asset not found under local_root: {src}")
        LAST_TRANSPORT = "local"
        return src

    dest = cache_path(clean)
    if cache and dest.exists() and dest.stat().st_size > 0:
        LAST_TRANSPORT = "cache"
        return dest

    url = asset_url(clean)
    dest.parent.mkdir(parents=True, exist_ok=True)
    data = None
    first_exc: OSError | None = None
    for candidate, name in ((url, "cdn"), (raw_url(clean), "raw")):
        try:
            with urllib.request.urlopen(candidate, timeout=30) as response:
                data = response.read()
            transport = name
            break
        except OSError as exc:  # HTTPError/URLError/timeout/connection errors
            if first_exc is None:
                first_exc = exc
            # A 404 is the manifest being wrong, not the host being blocked —
            # the other host will 404 too, so stop rather than retry.
            if isinstance(exc, urllib.error.HTTPError) and exc.code == 404:
                break
    if data is None:
        src = _fetch_via_git(clean)
        if src is None:
            _raise_fetch_error(rel_path, url, first_exc)
        data = src.read_bytes()
        transport = "git"

    tmp = dest.with_name(dest.name + ".tmp")
    tmp.write_bytes(data)
    tmp.replace(dest)
    LAST_TRANSPORT = transport
    return dest


def _raise_fetch_error(rel_path: str, url: str, exc: OSError | None) -> None:
    """Re-raise a URL fetch failure with the actionable message, after every
    fallback has also come up empty."""
    if exc is None:  # defensive: no transport ran, so there is nothing to chain
        raise RuntimeError(f"Failed to fetch brand asset: {url}")
    if isinstance(exc, urllib.error.HTTPError):
        if exc.code == 404:
            raise FileNotFoundError(
                f"Brand asset not found (HTTP 404): {rel_path}\n"
                f"  URL: {url}\n"
                f"  The manifests may be stale. Regenerate them against a local "
                f"clone of leafgrowio/brand (see generate_icon_manifest.py "
                f"--brand-root / generate_logo_manifest.py --brand-root)."
            ) from exc
        raise RuntimeError(
            f"Failed to fetch brand asset (HTTP {exc.code}): {url}"
        ) from exc
    reason = getattr(exc, "reason", exc)
    raise RuntimeError(
        f"Network error fetching brand asset: {url}\n  {reason}\n"
        f"  (raw.githubusercontent and the git clone via {BRAND_REPO_GIT} "
        f"were also tried and are unavailable)"
    ) from exc
