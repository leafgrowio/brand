#!/usr/bin/env python3
"""Central config and fetch helper for Leaf brand assets.

Brand assets (icons, logos, fonts) are NOT shipped with the `leaf` plugin. They
live in the public GitHub repo `leafgrowio/brand` and are fetched at runtime via
raw URLs pinned to `main`. The manifests in this skill store brand-repo-relative
paths (e.g. "assets/icons/shopping/Cart/black/svg/Cart.svg"); this module turns
such a path into a raw GitHub URL and, on request, downloads it into a local
cache so tools can operate on a real file. `cdn_url()` builds a third kind of
URL — a jsDelivr mirror of the same repo — for surfaces that only need to
*display* an asset (e.g. an `<img>` in a gallery or chat widget) without
downloading or inlining anything.

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

# Pinned to the default branch of the public brand repo. Assets are fetched from
# raw.githubusercontent.com, which serves file bytes (not the HTML page view).
BRAND_REPO_BASE = "https://raw.githubusercontent.com/leafgrowio/brand/main"

# Clone URL for the git fallback: some sandboxes block raw.githubusercontent.com
# but allow github.com, so a blobless sparse clone can serve the same files.
BRAND_REPO_GIT = "https://github.com/leafgrowio/brand.git"

# jsDelivr's GitHub mirror, pinned to the same branch as BRAND_REPO_BASE. Used
# for display-only <img> embeds (galleries, chat widgets): jsDelivr is on the
# chat-widget CSP allowlist, raw.githubusercontent.com is not.
CDN_REPO_BASE = "https://cdn.jsdelivr.net/gh/leafgrowio/brand@main"

# Which transport served the most recent fetch_asset() call:
# "cache", "url", "git", or "local". Informational only.
LAST_TRANSPORT: str | None = None


def _cache_root() -> Path:
    """User cache dir for downloaded assets: $XDG_CACHE_HOME/leaf-brand or
    ~/.cache/leaf-brand."""
    xdg = os.environ.get("XDG_CACHE_HOME")
    base = Path(xdg) if xdg else Path.home() / ".cache"
    return base / "leaf-brand"


def asset_url(rel_path: str) -> str:
    """Build the raw GitHub URL for a brand-repo-relative asset path.

    Each path segment is URL-encoded individually so spaces and other characters
    in asset names (e.g. "Jack Port", "Leaf Answers - Black.png") are escaped
    while the "/" separators are preserved.
    """
    clean = rel_path.strip().lstrip("/")
    encoded = "/".join(urllib.parse.quote(segment) for segment in clean.split("/"))
    return f"{BRAND_REPO_BASE}/{encoded}"


def cdn_url(rel_path: str) -> str:
    """Build the jsDelivr CDN URL for a brand-repo-relative asset path.

    jsDelivr mirrors `leafgrowio/brand` and is on the chat-widget CSP
    allowlist (raw.githubusercontent.com is not), so this is the URL to point
    a display-only `<img>` at — nothing is fetched or downloaded by this
    function; use `fetch_asset()` when an actual local file is needed. Same
    per-segment URL-encoding as `asset_url()`.
    """
    clean = rel_path.strip().lstrip("/")
    encoded = "/".join(urllib.parse.quote(segment) for segment in clean.split("/"))
    return f"{CDN_REPO_BASE}/{encoded}"


def cache_path(rel_path: str) -> Path:
    """Local cache location mirroring the brand-repo-relative path."""
    clean = rel_path.strip().lstrip("/")
    return _cache_root().joinpath(*clean.split("/"))


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

    Fallback transport for environments where raw.githubusercontent.com is
    unreachable but github.com is not. Maintains a single clone under
    <cache>/repo/ (created once with --depth 1 --filter=blob:none --sparse,
    then grown one directory at a time with sparse-checkout add). Returns the
    file inside the clone, or None if git or the file is unavailable — the
    caller then re-raises the original URL error.
    """
    if shutil.which("git") is None:
        return None
    repo = _cache_root() / "repo"
    try:
        if not (repo / ".git").is_dir():
            if repo.exists():  # broken previous attempt — start over
                shutil.rmtree(repo)
            repo.parent.mkdir(parents=True, exist_ok=True)
            _git(
                ["clone", "--depth", "1", "--filter=blob:none", "--sparse",
                 BRAND_REPO_GIT, str(repo)]
            )
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
    - Otherwise the asset is downloaded from ``BRAND_REPO_BASE`` and cached under
      the user cache dir, mirroring rel_path. Set ``cache=False`` to force a
      re-download.
    - If the raw URL fails (connection error, timeout, or any HTTP error — e.g.
      raw.githubusercontent.com blocked by a sandbox), the asset is served from
      a blobless sparse git clone of the brand repo on github.com instead, into
      the same cache layout, so callers see no difference. If git is missing or
      the fallback also fails, the original URL error is raised.

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
    try:
        with urllib.request.urlopen(url, timeout=30) as response:
            data = response.read()
        transport = "url"
    except OSError as exc:  # HTTPError/URLError/timeout/connection errors
        src = _fetch_via_git(clean)
        if src is None:
            _raise_fetch_error(rel_path, url, exc)
        data = src.read_bytes()
        transport = "git"

    tmp = dest.with_name(dest.name + ".tmp")
    tmp.write_bytes(data)
    tmp.replace(dest)
    LAST_TRANSPORT = transport
    return dest


def _raise_fetch_error(rel_path: str, url: str, exc: OSError) -> None:
    """Re-raise a URL fetch failure with the actionable message, after the git
    fallback has also come up empty."""
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
        f"  (git fallback via {BRAND_REPO_GIT} also unavailable)"
    ) from exc
