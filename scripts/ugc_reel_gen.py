#!/usr/bin/env python3
"""
RIPPL UGC Reel Generator
========================

Batch-render vertical (1080x1920) UGC-style promo reels:

    [hook b-roll + text overlay]  ->  [CTA endcard]   with the track as the bed

Adapted for RIPPL from vishnuhimself/UGCVidGen (MIT). Changes vs the original:
  * campaign-scoped state, so hooks are only "used up" per campaign
  * `--track` promotes YOUR record instead of random library music
  * angle filtering (`--angle curiosity`) so a batch tests one mechanism
  * a manifest JSON that maps every rendered file back to its hook id, so
    3-second-retention results are attributable (see
    knowledge/marketing/UGC_CONTENT_ENGINE.md)
  * no third-party Python deps — shells out to ffmpeg directly

Requirements
------------
    ffmpeg on PATH   (mac: brew install ffmpeg)

Layout (relative to repo root, created on first run)
----------------------------------------------------
    data/hooks.csv              id,text,angle
    media/hook_videos/          1080x1920 b-roll, 3-6s, NO text
    media/cta_videos/           1080x1920 endcards
    media/fonts/                a .ttf (BeVietnamPro-Bold.ttf recommended)
    media/music/                fallback beds if --track is not given
    out/ugc/<campaign>/         rendered reels + manifest.json + used_hooks.txt

Usage
-----
    python3 scripts/ugc_reel_gen.py --campaign night-drive --count 12 \
        --track media/music/night_drive.wav

    python3 scripts/ugc_reel_gen.py --campaign night-drive --angle curiosity --count 4
"""

from __future__ import annotations

import argparse
import csv
import json
import logging
import os
import random
import shutil
import subprocess
import sys
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOOKS_CSV = ROOT / "data" / "hooks.csv"
MEDIA = ROOT / "media"
HOOK_DIR = MEDIA / "hook_videos"
CTA_DIR = MEDIA / "cta_videos"
MUSIC_DIR = MEDIA / "music"
FONT_DIR = MEDIA / "fonts"
OUT_ROOT = ROOT / "out" / "ugc"

VIDEO_EXT = {".mp4", ".mov", ".m4v", ".webm"}
AUDIO_EXT = {".mp3", ".wav", ".m4a", ".aac", ".flac"}

W, H = 1080, 1920
FONT_SIZE = 70
TEXT_COLOR = "white"
HOOK_SECONDS = 4.0          # how long the hook clip + overlay runs
BODY_SECONDS = 11.0         # b-roll body after the hook, before the CTA

log = logging.getLogger("ugc")


# ----------------------------------------------------------------------------- models
@dataclass
class Hook:
    id: str
    text: str
    angle: str


@dataclass
class Rendered:
    file: str
    hook_id: str
    hook_text: str
    angle: str
    hook_clip: str
    cta_clip: str
    audio: str
    rendered_at: str


# ----------------------------------------------------------------------------- helpers
def require_ffmpeg() -> None:
    if shutil.which("ffmpeg") is None:
        sys.exit(
            "ffmpeg not found on PATH.\n"
            "  macOS:  brew install ffmpeg\n"
            "  Ubuntu: sudo apt install ffmpeg\n"
            "  Windows: https://ffmpeg.org/download.html"
        )


def ensure_dirs() -> None:
    for d in (HOOK_DIR, CTA_DIR, MUSIC_DIR, FONT_DIR, OUT_ROOT):
        d.mkdir(parents=True, exist_ok=True)


def load_hooks(path: Path) -> list[Hook]:
    if not path.exists():
        sys.exit(f"No hooks file at {path}. Expected columns: id,text,angle")
    out: list[Hook] = []
    with path.open(newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            if not row.get("text"):
                continue
            out.append(
                Hook(
                    id=str(row.get("id") or len(out) + 1).strip(),
                    text=row["text"].strip(),
                    angle=(row.get("angle") or "unspecified").strip(),
                )
            )
    if not out:
        sys.exit(f"{path} has no usable rows.")
    return out


def pick_files(folder: Path, exts: set[str]) -> list[Path]:
    return sorted(p for p in folder.glob("*") if p.suffix.lower() in exts)


def escape_drawtext(s: str) -> str:
    """ffmpeg drawtext is fussy: escape :, ', \\ and wrap lines."""
    return (
        s.replace("\\", r"\\\\")
        .replace(":", r"\:")
        .replace("'", r"\'")
        .replace("%", r"\%")
    )


def wrap(text: str, width: int = 22) -> str:
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > width and cur:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        lines.append(cur)
    return "\n".join(lines)


def used_hooks_path(out_dir: Path) -> Path:
    return out_dir / "used_hooks.txt"


def read_used(out_dir: Path) -> set[str]:
    p = used_hooks_path(out_dir)
    return set(p.read_text(encoding="utf-8").split()) if p.exists() else set()


def mark_used(out_dir: Path, hook_id: str) -> None:
    with used_hooks_path(out_dir).open("a", encoding="utf-8") as fh:
        fh.write(hook_id + "\n")


# ----------------------------------------------------------------------------- render
def build_filter(font: Path | None, text: str) -> str:
    """Scale/crop everything to 1080x1920, then burn the hook text over the
    first HOOK_SECONDS with a soft shadow for legibility on any b-roll."""
    base = (
        f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,"
        f"crop={W}:{H},setsar=1,fps=30[hook];"
        f"[1:v]scale={W}:{H}:force_original_aspect_ratio=increase,"
        f"crop={W}:{H},setsar=1,fps=30[cta];"
    )
    if font and font.exists():
        draw = (
            f"[hook]drawtext=fontfile='{font.as_posix()}':"
            f"text='{escape_drawtext(wrap(text))}':"
            f"fontcolor={TEXT_COLOR}:fontsize={FONT_SIZE}:line_spacing=12:"
            f"box=1:boxcolor=black@0.35:boxborderw=28:"
            f"x=(w-text_w)/2:y=(h-text_h)/2-120:"
            f"enable='between(t,0,{HOOK_SECONDS})'[hookt];"
        )
        concat = "[hookt][cta]concat=n=2:v=1:a=0[v]"
    else:
        draw = ""
        concat = "[hook][cta]concat=n=2:v=1:a=0[v]"
    return base + draw + concat


def render_one(
    hook: Hook,
    hook_clip: Path,
    cta_clip: Path,
    audio: Path,
    font: Path | None,
    out_file: Path,
) -> bool:
    total = HOOK_SECONDS + BODY_SECONDS
    cmd = [
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
        "-stream_loop", "-1", "-t", str(total), "-i", str(hook_clip),
        "-i", str(cta_clip),
        "-i", str(audio),
        "-filter_complex", build_filter(font, hook.text),
        "-map", "[v]", "-map", "2:a",
        "-shortest",
        "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-ar", "44100",
        "-movflags", "+faststart",
        str(out_file),
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        log.error("ffmpeg failed for hook %s: %s", hook.id, proc.stderr.strip()[:500])
        return False
    return True


# ----------------------------------------------------------------------------- main
def main() -> int:
    ap = argparse.ArgumentParser(description="Batch-render UGC promo reels for RIPPL.")
    ap.add_argument("--campaign", required=True, help="campaign slug, e.g. night-drive")
    ap.add_argument("--count", type=int, default=12, help="how many reels to render")
    ap.add_argument("--track", help="audio file to promote (defaults to media/music/*)")
    ap.add_argument("--angle", help="only use hooks with this angle")
    ap.add_argument("--hooks", default=str(HOOKS_CSV), help="path to hooks.csv")
    ap.add_argument("--font", help="path to a .ttf for the overlay")
    ap.add_argument("--reset", action="store_true", help="clear used-hook history first")
    args = ap.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s  %(levelname)-7s %(message)s",
        datefmt="%H:%M:%S",
    )
    require_ffmpeg()
    ensure_dirs()

    out_dir = OUT_ROOT / args.campaign
    out_dir.mkdir(parents=True, exist_ok=True)
    logging.getLogger().addHandler(logging.FileHandler(out_dir / "render.log"))

    if args.reset and used_hooks_path(out_dir).exists():
        used_hooks_path(out_dir).unlink()

    hooks = load_hooks(Path(args.hooks))
    if args.angle:
        hooks = [h for h in hooks if h.angle.lower() == args.angle.lower()]
        if not hooks:
            sys.exit(f"No hooks with angle '{args.angle}'.")

    used = read_used(out_dir)
    available = [h for h in hooks if h.id not in used]
    if not available:
        log.warning("Every hook has been used for '%s'. Re-run with --reset.", args.campaign)
        return 0

    hook_clips = pick_files(HOOK_DIR, VIDEO_EXT)
    cta_clips = pick_files(CTA_DIR, VIDEO_EXT)
    if not hook_clips:
        sys.exit(f"Put some 1080x1920 b-roll in {HOOK_DIR}")
    if not cta_clips:
        sys.exit(f"Put at least one endcard in {CTA_DIR}")

    if args.track:
        audio_pool = [Path(args.track)]
        if not audio_pool[0].exists():
            sys.exit(f"Track not found: {args.track}")
    else:
        audio_pool = pick_files(MUSIC_DIR, AUDIO_EXT)
        if not audio_pool:
            sys.exit(f"Pass --track, or put audio in {MUSIC_DIR}")

    fonts = [Path(args.font)] if args.font else pick_files(FONT_DIR, {".ttf", ".otf"})
    font = fonts[0] if fonts else None
    if font is None:
        log.warning("No font found in %s — rendering without the text overlay.", FONT_DIR)

    random.shuffle(available)
    todo = available[: args.count]
    log.info("Rendering %d reel(s) for campaign '%s'", len(todo), args.campaign)

    manifest_path = out_dir / "manifest.json"
    manifest: list[dict] = []
    if manifest_path.exists():
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    ok = 0
    for i, hook in enumerate(todo, 1):
        hook_clip = random.choice(hook_clips)
        cta_clip = random.choice(cta_clips)
        audio = random.choice(audio_pool)
        out_file = out_dir / f"{args.campaign}_hook{hook.id}_{i:02d}.mp4"

        log.info("[%d/%d] hook %s (%s) — %s", i, len(todo), hook.id, hook.angle, hook.text)
        if render_one(hook, hook_clip, cta_clip, audio, font, out_file):
            ok += 1
            mark_used(out_dir, hook.id)
            manifest.append(
                asdict(
                    Rendered(
                        file=out_file.name,
                        hook_id=hook.id,
                        hook_text=hook.text,
                        angle=hook.angle,
                        hook_clip=hook_clip.name,
                        cta_clip=cta_clip.name,
                        audio=Path(audio).name,
                        rendered_at=datetime.now(timezone.utc).isoformat(timespec="seconds"),
                    )
                )
            )

    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    log.info("Done: %d/%d rendered -> %s", ok, len(todo), out_dir)
    log.info("manifest.json maps each file to its hook id — log 3s retention against it.")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
