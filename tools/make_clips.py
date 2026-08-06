#!/usr/bin/env python3
"""Build local gameplay clips from the games' YouTube videos.

You point out the good ~10-15 seconds of each game; this grabs exactly that
section from the game's YouTube video (the one already on its page) and writes a
small, muted, web-ready clip to clips/clip_<id>.mp4. Games that get a clip show
moving gameplay offline on the shelf AND on their game page; the rest keep the
YouTube embed automatically.

WHY IT RUNS ON YOUR MAC, not through the Vault's cloud helper:
    YouTube blocks video downloads from datacenter IPs (the cloud sandbox gets
    HTTP 403). Your home connection doesn't hit that, so this is a normal-Mac-
    Terminal job, same as fetch_c64_assets.py.

ONE-TIME SETUP (Homebrew):
    brew install yt-dlp ffmpeg

USE:
    1. Open tools/clip_times.txt and put a START time on any game you want.
       Leave START blank to skip it (that page keeps its YouTube embed).
         START  = where to begin, in SS or M:SS   (e.g. 90  or  1:30)
         LEN    = how many seconds to keep         (blank = 15)
       Pick a START on PURE GAMEPLAY - past the title/intro, and away from any
       face-cam or menus, so the clip is just the game. ~15s is the sweet spot.
    2. python3 tools/make_clips.py
    Re-run whenever you add or change times - it skips games whose clip already
    matches the requested start/length (delete a clip, or pass --force, to redo).

FOOTING: these clips are cut from third-party YouTube uploads. Downloading is
against YouTube's terms; this is here on the same personal, offline, non-
distributed footing as your ROM and manual dumps (clips/ is gitignored and is
NOT in the update manifest). Your call which games to fill in.

FLAGS:
    --only id[,id...]   build just these ids (ignores blanks elsewhere)
    --force             rebuild even if an up-to-date clip exists
    --width N           output width in px (default 640)
    --len N             default length when a row leaves LEN blank (default 12)
    --list              show which rows have times and exit (no downloading)
    --dry-run           print what would be built, don't download
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TIMES = os.path.join(ROOT, "tools", "clip_times.txt")
CLIPS = os.path.join(ROOT, "clips")
STAMP = os.path.join(CLIPS, ".clip_times.json")   # what each clip was cut from


def need(tool):
    if shutil.which(tool) is None:
        sys.exit("Missing '%s'. Install it first:  brew install yt-dlp ffmpeg" % tool)


def to_seconds(s):
    """'90' or '1:30' or '1:02:03' -> int seconds. Empty/invalid -> None."""
    s = (s or "").strip()
    if not s:
        return None
    if ":" not in s:
        return int(float(s)) if re.fullmatch(r"\d+(\.\d+)?", s) else None
    parts = s.split(":")
    if not all(re.fullmatch(r"\d+(\.\d+)?", p) for p in parts):
        return None
    sec = 0.0
    for p in parts:
        sec = sec * 60 + float(p)
    return int(sec)


def parse_times(default_len):
    """Yield dicts {id, yt, start, length} for rows that have a START time."""
    if not os.path.exists(TIMES):
        sys.exit("No %s - generate it or add it back." % TIMES)
    rows = []
    with open(TIMES, encoding="utf-8") as fh:
        for raw in fh:
            line = raw.split("#", 1)[0].strip()   # drop the trailing "# title"
            if not line:
                continue
            f = line.split()
            if len(f) < 2:
                continue
            gid, yt = f[0], f[1]
            start = to_seconds(f[2]) if len(f) >= 3 else None
            if start is None:
                continue                            # blank START = skip
            length = to_seconds(f[3]) if len(f) >= 4 else None
            rows.append({"id": gid, "yt": yt, "start": start,
                         "length": length or default_len})
    return rows


def load_stamp():
    if os.path.exists(STAMP):
        try:
            return json.load(open(STAMP))
        except Exception:
            return {}
    return {}


def save_stamp(d):
    os.makedirs(CLIPS, exist_ok=True)
    json.dump(d, open(STAMP, "w"), indent=1)


def build(row, width, force, stamp):
    gid, yt = row["id"], row["yt"]
    out = os.path.join(CLIPS, "clip_%s.mp4" % gid)
    want = {"yt": yt, "start": row["start"], "length": row["length"], "width": width}
    if not force and os.path.exists(out) and stamp.get(gid) == want:
        print("  = clip_%s.mp4 up to date, skipping" % gid)
        return "skip"

    start, length = row["start"], row["length"]
    end = start + length
    tmp = os.path.join(CLIPS, "_tmp_%s.mp4" % gid)
    for f in (tmp,):
        if os.path.exists(f):
            os.remove(f)

    # 1) grab just the wanted section (prefer <=480p mp4 to keep it light)
    dl = [
        "yt-dlp", "--quiet", "--no-warnings",
        "--download-sections", "*%d-%d" % (start, end),
        "-f", "bv*[height<=480][ext=mp4]/b[height<=480]/bv*[ext=mp4]/b",
        "--force-keyframes-at-cuts",
        "-o", tmp,
        "https://www.youtube.com/watch?v=%s" % yt,
    ]
    print("  > clip_%s.mp4  (%s: %ds-%ds)" % (gid, yt, start, end))
    r = subprocess.run(dl, stderr=subprocess.PIPE)
    if r.returncode != 0 or not os.path.exists(tmp):
        print("    ! download failed: %s" % (r.stderr.decode("utf-8", "ignore").strip()[-200:] or "no section produced"))
        return "fail"

    # 2) downscale, mute, web-optimise -> the final clip
    enc = [
        "ffmpeg", "-y", "-i", tmp,
        "-vf", "scale=%d:-2" % width,
        "-c:v", "libx264", "-crf", "20", "-preset", "medium",
        "-an", "-movflags", "+faststart", out,
    ]
    r = subprocess.run(enc, stderr=subprocess.PIPE)
    os.remove(tmp)
    if r.returncode != 0 or not os.path.exists(out):
        print("    ! encode failed: %s" % r.stderr.decode("utf-8", "ignore").strip()[-200:])
        return "fail"

    stamp[gid] = want
    size = os.path.getsize(out) / 1048576
    print("    done (%.2f MB)" % size)
    return "ok"


def main():
    ap = argparse.ArgumentParser(description="Build local gameplay clips.")
    ap.add_argument("--only", default="")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--width", type=int, default=640)
    ap.add_argument("--len", type=int, default=15, dest="deflen")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    rows = parse_times(a.deflen)
    if a.only:
        want = set(x.strip() for x in a.only.split(","))
        rows = [r for r in rows if r["id"] in want]

    if not rows:
        print("No games have a START time yet. Edit tools/clip_times.txt, add a")
        print("start time to the games you want, then run this again.")
        return

    if a.list or a.dry_run:
        print("%d game(s) with clip times:" % len(rows))
        for r in rows:
            print("  %-30s %s  %ds +%ds" % (r["id"], r["yt"], r["start"], r["length"]))
        return

    need("yt-dlp")
    need("ffmpeg")
    os.makedirs(CLIPS, exist_ok=True)
    stamp = load_stamp()

    tally = {"ok": 0, "skip": 0, "fail": 0}
    for r in rows:
        tally[build(r, a.width, a.force, stamp)] += 1
        save_stamp(stamp)     # save as we go, so a crash doesn't lose progress

    print("\nClips: %d built, %d up-to-date, %d failed."
          % (tally["ok"], tally["skip"], tally["fail"]))
    if tally["ok"]:
        print("Refresh the Vault to see them. Rebuild the manifest is NOT needed")
        print("(clips are local, like your ROMs).")


if __name__ == "__main__":
    main()
