#!/usr/bin/env python3
"""Cut one social-ready gameplay clip WITH SOUND out of a YouTube video.

Sister script to make_clips.py. That one builds the muted shelf clips in
clips/ from tools/clip_times.txt in bulk; this one is the quick single-shot
tool: you paste a link and a time slot, it writes a finished clip to
social-clips/.

WHY IT RUNS ON YOUR MAC, not through the Vault's cloud helper:
    YouTube blocks video downloads from datacenter IPs (the cloud sandbox
    gets HTTP 403). Your home connection doesn't hit that, so this is a
    normal-Mac-Terminal job, same as make_clips.py and fetch_c64_assets.py.

ONE-TIME SETUP (Homebrew):
    brew install yt-dlp ffmpeg

USE:
    python3 tools/make_social_clip.py <link> <tijdslot> [naam]

    The time slot takes any of these shapes:
        1:23            start at 1:23, keep the default 12 seconds
        1:23+15         start at 1:23, keep 15 seconds
        1:23-1:38       start at 1:23, stop at 1:38
        83              plain seconds work everywhere a time is expected

    Separate several slots with commas and they are stitched into one clip,
    in the order you wrote them:
        0:00-0:03,4:13-4:20,7:15-7:18

    Examples:
        python3 tools/make_social_clip.py https://youtu.be/sUHfSygbSBo 2:14+12
        python3 tools/make_social_clip.py sUHfSygbSBo 2:14-2:26 c64_last_ninja
        python3 tools/make_social_clip.py sUHfSygbSBo 0:00-0:03,4:13-4:20 wizball

    Leave the name off and it slugs the video title for you; pass one to get
    a predictable clip_<naam>.mp4 that matches your existing ids.

OUTPUT FORMAT (matches the clips already in social-clips/, plus audio):
    640px wide, source aspect kept, 30fps, H.264 Main / yuv420p, faststart,
    AAC 192k stereo normalised to -14 LUFS - the level Instagram, TikTok,
    YouTube and X all normalise towards, so your clips sit at the same
    loudness as everything around them in the feed.

PROVENANCE:
    Every build appends a row to social-clips/_sources.tsv with the video id,
    channel, title, exact timecode and build date. Posting a frame of someone
    else's upload carries their rights on top of the publisher's; having the
    trail already written beats reconstructing it later.

FOOTING: same personal, non-distributed footing as make_clips.py - these are
cut from third-party YouTube uploads and downloading is against YouTube's
terms. Your call which ones you use and where.

FLAGS:
    --len N         default length when the slot gives no duration (default 12)
    --width N       output width in px (default 640, matches social-clips/)
    --fps N         output frame rate (default 30, matches social-clips/)
    --lufs N        target loudness (default -14.0)
    --source-height N   max height to pull from YouTube (default 1080)
    --outdir DIR    write somewhere else than social-clips/
    --force         overwrite an existing clip with the same name
    --keep-raw      keep the untouched download next to the clip
    --dry-run       show what would happen, download nothing
"""

import argparse
import datetime
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOCIAL = os.path.join(ROOT, "social-clips")
SOURCES = "_sources.tsv"

DEFAULT_LEN = 12
DEFAULT_WIDTH = 640
DEFAULT_FPS = 30
DEFAULT_LUFS = -14.0
TRUE_PEAK = -1.5
LRA = 11.0


# --------------------------------------------------------------------- utils

def need(tool):
    if shutil.which(tool) is None:
        sys.exit("Missing '%s'. Install it first:  brew install yt-dlp ffmpeg" % tool)


def die(msg):
    sys.exit("error: %s" % msg)


def to_seconds(s):
    """'90' / '1:30' / '1:02:03' / '1:30.5' -> float seconds. Bad input -> None."""
    s = (s or "").strip()
    if not s:
        return None
    parts = s.split(":")
    if not all(re.fullmatch(r"\d+(\.\d+)?", p) for p in parts):
        return None
    sec = 0.0
    for p in parts:
        sec = sec * 60 + float(p)
    return sec


def fmt_time(sec):
    """123.5 -> '2:03.5' for human-readable logging."""
    m, s = divmod(float(sec), 60)
    h, m = divmod(int(m), 60)
    body = "%d:%05.2f" % (m, s) if h else "%d:%05.2f" % (m, s)
    return ("%d:%02d:%05.2f" % (h, m, s)) if h else body


def parse_slot(slot, default_len):
    """'1:23' | '1:23+15' | '1:23-1:38' -> (start_seconds, length_seconds)."""
    slot = (slot or "").strip()
    if not slot:
        die("no time slot given")

    if "+" in slot:
        a, b = slot.split("+", 1)
        start, length = to_seconds(a), to_seconds(b)
        if start is None or length is None:
            die("could not read time slot %r - try 1:23+15" % slot)
        if length <= 0:
            die("length must be more than 0 seconds")
        return start, length

    # '-' is only a range separator between two times, never a minus sign here
    if "-" in slot:
        a, b = slot.split("-", 1)
        start, end = to_seconds(a), to_seconds(b)
        if start is None or end is None:
            die("could not read time slot %r - try 1:23-1:38" % slot)
        if end <= start:
            die("the end time (%s) must come after the start (%s)" % (b, a))
        return start, end - start

    start = to_seconds(slot)
    if start is None:
        die("could not read time slot %r - try 1:23, 1:23+15 or 1:23-1:38" % slot)
    return start, float(default_len)


def parse_slots(spec, default_len):
    """Comma-separated slots -> [(start, length), ...], in the order given.

    Order is deliberately left alone: '4:13-4:20,0:00-0:03' means you want the
    action first and the title screen after it.
    """
    parts = [p for p in re.split(r"\s*,\s*", (spec or "").strip()) if p]
    if not parts:
        die("no time slot given")
    return [parse_slot(p, default_len) for p in parts]


def video_id(link):
    """Accept a full URL, a youtu.be/shorts link, or a bare 11-char id."""
    link = (link or "").strip()
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", link):
        return link
    for pat in (r"[?&]v=([A-Za-z0-9_-]{11})",
                r"youtu\.be/([A-Za-z0-9_-]{11})",
                r"/shorts/([A-Za-z0-9_-]{11})",
                r"/embed/([A-Za-z0-9_-]{11})",
                r"/live/([A-Za-z0-9_-]{11})"):
        m = re.search(pat, link)
        if m:
            return m.group(1)
    die("that doesn't look like a YouTube link or id: %r" % link)


def slugify(text, limit=48):
    s = re.sub(r"[^a-z0-9]+", "_", (text or "").lower()).strip("_")
    if len(s) > limit:
        s = s[:limit].rsplit("_", 1)[0] or s[:limit]
    return s or "clip"


def probe_has_audio(path):
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "a:0",
         "-show_entries", "stream=codec_name", "-of", "csv=p=0", path],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return bool(r.stdout.strip())


def run(cmd, what):
    r = subprocess.run(cmd, stderr=subprocess.PIPE)
    if r.returncode != 0:
        tail = r.stderr.decode("utf-8", "ignore").strip()[-400:]
        die("%s failed:\n%s" % (what, tail))
    return r


# ------------------------------------------------------------------ metadata

def fetch_meta(vid):
    """Title + channel, without pulling any video. Never fatal."""
    r = subprocess.run(
        ["yt-dlp", "--quiet", "--no-warnings", "--skip-download",
         "--print", "%(title)s\t%(channel)s",
         "https://www.youtube.com/watch?v=%s" % vid],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if r.returncode != 0:
        return "", ""
    line = r.stdout.decode("utf-8", "ignore").strip().split("\n")[0]
    parts = line.split("\t")
    title = parts[0].strip() if parts else ""
    channel = parts[1].strip() if len(parts) > 1 else ""
    return title, channel


def log_source(outdir, name, vid, title, channel, start, length):
    path = os.path.join(outdir, SOURCES)
    new = not os.path.exists(path)
    today = datetime.date.today().isoformat()
    with open(path, "a", encoding="utf-8") as fh:
        if new:
            fh.write("clip\tyoutube_id\tchannel\ttitle\tstart_s\tlength_s\tbuilt\n")
        fh.write("%s\t%s\t%s\t%s\t%.2f\t%.2f\t%s\n"
                 % (name, vid, channel.replace("\t", " "),
                    title.replace("\t", " "), start, length, today))


# ------------------------------------------------------------------ loudness

def measure_loudness(input_args, lufs):
    """Pass 1 of a two-pass loudnorm. Returns the measured dict, or None.

    Measured over exactly the material that ends up in the clip - the
    stitched segments, not the hour of longplay they were cut from.
    """
    r = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats"] + input_args +
        ["-af", "loudnorm=I=%s:TP=%s:LRA=%s:print_format=json" % (lufs, TRUE_PEAK, LRA),
         "-f", "null", "-"],
        stderr=subprocess.PIPE)
    err = r.stderr.decode("utf-8", "ignore")
    blocks = re.findall(r"\{[^{}]*\"input_i\"[^{}]*\}", err, re.S)
    if not blocks:
        return None
    try:
        return json.loads(blocks[-1])
    except Exception:
        return None


def audio_filter(measured, lufs):
    base = "loudnorm=I=%s:TP=%s:LRA=%s" % (lufs, TRUE_PEAK, LRA)
    if measured:
        base += (":measured_I=%s:measured_TP=%s:measured_LRA=%s"
                 ":measured_thresh=%s:offset=%s:linear=true"
                 % (measured.get("input_i"), measured.get("input_tp"),
                    measured.get("input_lra"), measured.get("input_thresh"),
                    measured.get("target_offset", 0.0)))
    return base + ",aresample=48000"


# ---------------------------------------------------------------------- crop

def source_size(path):
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", path],
        stdout=subprocess.PIPE)
    try:
        w, h = r.stdout.decode().strip().split("x")
        return int(w), int(h)
    except Exception:
        return None, None


def detect_crop(path, seek, length, srcw, srch):
    """Find the black border around the game, as (w, h, x, y) or None.

    Longplays put a 4:3 game inside a 16:9 frame, so most of what YouTube
    hands us is padding. Two things make this less fragile than a plain
    cropdetect call:

    - We take the UNION of every report across the clip, not the last one.
      Retro games are mostly black; on a dark frame cropdetect happily eats
      half the playfield, and a single sample would bake that in.
    - We refuse anything that throws away more than half of either axis.
      That is no longer a border, that is a bug.
    """
    r = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats"] + seek + ["-i", path,
         "-t", "%.3f" % length,
         "-vf", "cropdetect=limit=24:round=2:reset=0", "-f", "null", "-"],
        stderr=subprocess.PIPE)
    found = re.findall(r"crop=(\d+):(\d+):(\d+):(\d+)",
                       r.stderr.decode("utf-8", "ignore"))
    if not found:
        return None

    x0 = min(int(c[2]) for c in found)
    y0 = min(int(c[3]) for c in found)
    x1 = max(int(c[2]) + int(c[0]) for c in found)
    y1 = max(int(c[3]) + int(c[1]) for c in found)

    x0 -= x0 % 2
    y0 -= y0 % 2
    w = (x1 - x0) - ((x1 - x0) % 2)
    h = (y1 - y0) - ((y1 - y0) % 2)

    if w <= 0 or h <= 0:
        return None
    if srcw and (w < srcw * 0.5 or h < srch * 0.5):
        print("     (border detection looked wrong - %dx%d out of %dx%d - "
              "keeping the full frame)" % (w, h, srcw, srch))
        return None
    if srcw and w >= srcw - 2 and h >= srch - 2:
        return None                      # nothing worth cropping
    return w, h, x0, y0


# ------------------------------------------------------------------ download

def _produced(tmpdir, raw):
    """yt-dlp doesn't always land on the exact name we asked for."""
    if os.path.exists(raw) and os.path.getsize(raw) > 0:
        return raw
    stem = os.path.splitext(os.path.basename(raw))[0]
    for f in sorted(os.listdir(tmpdir)):
        if f.startswith(stem) and not f.endswith(".part"):
            p = os.path.join(tmpdir, f)
            if os.path.getsize(p) > 0:
                return p
    return None


def _clear(tmpdir, raw):
    stem = os.path.splitext(os.path.basename(raw))[0]
    for f in os.listdir(tmpdir):
        if f.startswith(stem):
            try:
                os.remove(os.path.join(tmpdir, f))
            except OSError:
                pass


def download(vid, start, length, raw, tmpdir, srcheight, full_only=False,
             cache=None):
    """Fetch the wanted seconds, trying progressively duller options.

    yt-dlp's section download hands the byte-range fetching to ffmpeg, and
    ffmpeg trips over some DASH streams with 'exited with code 8' - almost
    always a webm/opus pairing. Asking for plain H.264+AAC fixes the large
    majority; when even that fails we pull the whole video and cut it here,
    which is slower but has no ranged requests to get wrong.

    Returns (path, needs_local_cut).
    """
    # Once we've been forced to pull the whole video for one segment, every
    # other segment is already sitting in that file. Downloading an hour-long
    # longplay three times over would be daft.
    if cache is not None and cache.get("full"):
        print("     (reusing the full download)")
        return cache["full"], True

    url = "https://www.youtube.com/watch?v=%s" % vid
    section = ["--download-sections", "*%.2f-%.2f" % (start, start + length),
               "--force-keyframes-at-cuts"]

    h = srcheight
    ladder = []
    if not full_only:
        ladder += [
            ("best available up to %dp" % h,
             section + ["-f", "bv*[height<=%d]+ba/b[height<=%d]/bv*+ba/b" % (h, h)],
             False),
            ("H.264 + AAC only",
             section + ["-f", "bv*[height<=%d][vcodec^=avc1]+ba[acodec^=mp4a]/"
                              "b[height<=%d][ext=mp4]" % (h, h)],
             False),
            ("H.264 + AAC, capped at 720p",
             section + ["-f", "bv*[height<=720][vcodec^=avc1]+ba[acodec^=mp4a]/"
                              "b[height<=720][ext=mp4]"],
             False),
        ]
    ladder.append(
        ("whole video, cut locally (slower)",
         ["-f", "bv*[height<=720]+ba/b[height<=720]/bv*+ba/b"],
         True))

    last = ""
    for i, (label, extra, needs_cut) in enumerate(ladder, 1):
        _clear(tmpdir, raw)
        if i > 1:
            print("     retrying: %s" % label)
        elif needs_cut:
            print("     %s" % label)
        cmd = (["yt-dlp", "--quiet", "--no-warnings", "--no-playlist",
                "--merge-output-format", "mp4", "-o", raw]
               + extra + [url])
        r = subprocess.run(cmd, stderr=subprocess.PIPE)
        got = _produced(tmpdir, raw)
        if r.returncode == 0 and got:
            if needs_cut and cache is not None:
                cache["full"] = got
            return got, needs_cut
        last = r.stderr.decode("utf-8", "ignore").strip()[-300:] or "no file produced"

    die("could not download this section after %d attempts. Last error:\n%s\n\n"
        "If it says the video is unavailable or age-restricted, try another\n"
        "upload of the same game. Otherwise --source-height 480 sometimes gets\n"
        "past a stubborn stream." % (len(ladder), last))


# -------------------------------------------------------------------- stitch

def target_size(width, cw, ch):
    """Output box: your width, the first segment's shape, even numbers."""
    h = int(round(width * float(ch) / float(cw)))
    return width - (width % 2), h - (h % 2)


def encode_segment(src, seek, length, crop, box, fps, has_audio, dest):
    """One segment -> an intermediate at the exact final video settings.

    Video is encoded here and only here; the concat step copies it through
    untouched, so nothing gets a second generation of x264. Audio stays
    uncompressed (PCM) until the very last step for the same reason.

    The 15ms fades are not cosmetic: cutting an audio waveform mid-cycle
    puts a step in the signal, and a step is a click. Every segment boundary
    is one of those unless you ramp through it.
    """
    w, h = box
    vf = []
    if crop:
        vf.append("crop=%d:%d:%d:%d" % crop)
    vf += ["fps=%d" % fps,
           "scale=%d:%d:force_original_aspect_ratio=decrease:flags=lanczos" % (w, h),
           "pad=%d:%d:(ow-iw)/2:(oh-ih)/2" % (w, h),
           "setsar=1", "format=yuv420p"]

    fade = min(0.015, length / 4.0)
    af = ["afade=t=in:st=0:d=%.3f" % fade,
          "afade=t=out:st=%.3f:d=%.3f" % (max(0.0, length - fade), fade),
          "aresample=48000"]

    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"] + seek + \
          ["-i", src]
    if not has_audio:
        cmd += ["-f", "lavfi", "-i",
                "anullsrc=channel_layout=stereo:sample_rate=48000"]
    cmd += ["-t", "%.3f" % length,
            "-map", "0:v:0", "-map", ("0:a:0" if has_audio else "1:a:0"),
            "-vf", ",".join(vf), "-af", ",".join(af),
            "-c:v", "libx264", "-crf", "20", "-preset", "medium",
            "-profile:v", "main", "-level", "3.0",
            "-c:a", "pcm_s16le", "-ac", "2",
            dest]
    run(cmd, "encoding segment")


def write_concat_list(paths, dest):
    with open(dest, "w", encoding="utf-8") as fh:
        for p in paths:
            fh.write("file '%s'\n" % p.replace("'", "'\\''"))
    return dest


# --------------------------------------------------------------------- build

def main():
    ap = argparse.ArgumentParser(
        description="Cut one social clip with sound from a YouTube video.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="examples:\n"
               "  python3 tools/make_social_clip.py https://youtu.be/sUHfSygbSBo 2:14+12\n"
               "  python3 tools/make_social_clip.py sUHfSygbSBo 2:14-2:26 c64_last_ninja\n")
    ap.add_argument("link", help="YouTube link or 11-character video id")
    ap.add_argument("slot", help="1:23 | 1:23+15 | 1:23-1:38 | several, "
                                 "comma-separated, stitched in order")
    ap.add_argument("name", nargs="?", default="",
                    help="clip id; default is a slug of the video title")
    ap.add_argument("--len", type=float, default=DEFAULT_LEN, dest="deflen")
    ap.add_argument("--width", type=int, default=DEFAULT_WIDTH)
    ap.add_argument("--fps", type=int, default=DEFAULT_FPS)
    ap.add_argument("--lufs", type=float, default=DEFAULT_LUFS)
    ap.add_argument("--source-height", type=int, default=1080, dest="srcheight")
    ap.add_argument("--outdir", default=SOCIAL)
    ap.add_argument("--no-crop", action="store_true", dest="nocrop",
                    help="keep the black bars instead of trimming them")
    ap.add_argument("--crop", default="",
                    help="crop by hand: W:H:X:Y (skips the detection)")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--full", action="store_true",
                    help="skip the section download, pull the whole video")
    ap.add_argument("--keep-raw", action="store_true", dest="keepraw")
    ap.add_argument("--dry-run", action="store_true", dest="dryrun")
    a = ap.parse_args()

    vid = video_id(a.link)
    slots = parse_slots(a.slot, a.deflen)
    total = sum(s[1] for s in slots)
    outdir = os.path.abspath(a.outdir)

    need("yt-dlp")
    need("ffmpeg")
    need("ffprobe")

    manual_crop = None
    if a.crop:
        if not re.fullmatch(r"\d+:\d+:\d+:\d+", a.crop):
            die("--crop wants W:H:X:Y, e.g. 1440:1080:240:0")
        manual_crop = tuple(int(v) for v in a.crop.split(":"))

    title, channel = fetch_meta(vid)
    name = a.name.strip() or slugify(title or vid)
    name = re.sub(r"^clip_", "", name)              # so 'clip_x' doesn't double up
    out = os.path.join(outdir, "clip_%s.mp4" % name)

    print("video   : %s%s" % (vid, ("  -  %s" % title) if title else ""))
    if channel:
        print("channel : %s" % channel)
    for i, (s, l) in enumerate(slots, 1):
        label = "slot    :" if i == 1 else "         "
        print("%s %s -> %s  (%.1fs)%s"
              % (label, fmt_time(s), fmt_time(s + l), l,
                 ("   [%d of %d]" % (i, len(slots))) if len(slots) > 1 else ""))
    if len(slots) > 1:
        print("total   : %.1fs across %d segments" % (total, len(slots)))
    print("out     : %s" % out)

    if a.dryrun:
        print("\n(dry run - nothing downloaded)")
        return

    if os.path.exists(out) and not a.force:
        die("%s already exists. Pass --force to overwrite, or give another name."
            % os.path.basename(out))

    os.makedirs(outdir, exist_ok=True)
    tmpdir = tempfile.mkdtemp(prefix="vaultclip_")
    cache = {}
    segs = []

    try:
        # 1) pull each wanted section, video + audio.
        #    We take a taller source than we need on purpose: downscaling a
        #    1080p stream to 640 averages away YouTube's compression noise,
        #    which matters a lot on flat pixel art. The 640p stream straight
        #    from YouTube is its lowest-bitrate tier and looks visibly worse.
        print("\n1/4  downloading ...")
        for i, (start, length) in enumerate(slots, 1):
            if len(slots) > 1:
                print("     segment %d of %d  (%s +%.1fs)"
                      % (i, len(slots), fmt_time(start), length))
            raw = os.path.join(tmpdir, "raw_%d.mp4" % i)
            path, needs_cut = download(vid, start, length, raw, tmpdir,
                                       a.srcheight, full_only=a.full,
                                       cache=cache)
            srcw, srch = source_size(path)
            segs.append({
                "i": i, "path": path, "start": start, "length": length,
                "seek": ["-ss", "%.3f" % start] if needs_cut else [],
                "audio": probe_has_audio(path), "w": srcw, "h": srch,
            })

        # 2) trim the pillarbox off. Order matters: we crop the source at its
        #    own resolution and only then scale down, so the game is
        #    downscaled rather than blown up from the middle of a 16:9 frame.
        if manual_crop:
            print("2/4  cropping to %d:%d:%d:%d (as told)" % manual_crop)
            for s in segs:
                s["crop"] = manual_crop
        elif a.nocrop:
            print("2/4  keeping the full frame (--no-crop)")
            for s in segs:
                s["crop"] = None
        else:
            print("2/4  looking for black borders ...")
            for s in segs:
                s["crop"] = detect_crop(s["path"], s["seek"], s["length"],
                                        s["w"], s["h"])
            # One crop for all of them. A title screen and a mid-game shot
            # from the same upload sit in the same frame, but a mostly-empty
            # segment reports a tighter box; taking the most generous keeps
            # every segment whole and keeps them all the same shape.
            picked = [s["crop"] for s in segs if s["crop"]]
            if picked and len(set(picked)) > 1 and len({(s["w"], s["h"]) for s in segs}) == 1:
                x0 = min(c[2] for c in picked)
                y0 = min(c[3] for c in picked)
                x1 = max(c[2] + c[0] for c in picked)
                y1 = max(c[3] + c[1] for c in picked)
                union = (x1 - x0 - ((x1 - x0) % 2), y1 - y0 - ((y1 - y0) % 2),
                         x0 - x0 % 2, y0 - y0 % 2)
                print("     segments disagreed, using the widest: %d:%d:%d:%d" % union)
                for s in segs:
                    s["crop"] = union
            if segs[0]["crop"]:
                c = segs[0]["crop"]
                print("     %dx%d -> %dx%d, trimming %dpx off the sides and "
                      "%dpx off top/bottom"
                      % (segs[0]["w"], segs[0]["h"], c[0], c[1],
                         (segs[0]["w"] - c[0]) // 2, (segs[0]["h"] - c[1]) // 2))
            else:
                print("     none found, keeping the full frame")

        first = segs[0]
        cw, ch = (first["crop"][0], first["crop"][1]) if first["crop"] \
            else (first["w"], first["h"])
        box = target_size(a.width, cw, ch)

        # 3) every segment to the same box and the same video settings, so
        #    the stitch below is a copy rather than a second encode.
        print("3/4  encoding %s ..."
              % ("segments" if len(segs) > 1 else "clip"))
        for s in segs:
            s["file"] = os.path.join(tmpdir, "seg_%d.mkv" % s["i"])
            encode_segment(s["path"], s["seek"], s["length"], s["crop"], box,
                           a.fps, s["audio"], s["file"])

        listfile = write_concat_list([s["file"] for s in segs],
                                     os.path.join(tmpdir, "list.txt"))
        concat_in = ["-f", "concat", "-safe", "0", "-i", listfile]

        # 4) stitch, normalise the whole thing as one, mux for the web.
        #    Loudness is measured across the finished sequence: normalising
        #    each segment on its own would make a quiet title screen jump to
        #    the same level as the action right after it.
        any_audio = any(s["audio"] for s in segs)
        print("4/4  %s ..." % ("stitching and normalising" if len(segs) > 1
                               else "normalising"))
        measured = None
        if any_audio:
            measured = measure_loudness(concat_in, a.lufs)
            if measured is None:
                print("     (measurement failed, falling back to single-pass)")
        else:
            print("     no audio in the source - the clip stays silent")

        cmd = (["ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
                "-fflags", "+genpts"] + concat_in
               + ["-c:v", "copy", "-movflags", "+faststart"])
        if any_audio:
            cmd += ["-af", audio_filter(measured, a.lufs)]
        cmd += ["-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", out]
        run(cmd, "stitch")

        if a.keepraw:
            for s in segs:
                kept = os.path.join(outdir, "raw_%s_%d.mp4" % (name, s["i"]))
                shutil.copy2(s["path"], kept)
            print("     kept the untouched download(s) in %s" % outdir)

    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)

    for s in segs:
        log_source(outdir, os.path.basename(out), vid, title, channel,
                   s["start"], s["length"])

    size = os.path.getsize(out) / 1048576.0
    info = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", out],
        stdout=subprocess.PIPE).stdout.decode().strip()
    dur = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", out], stdout=subprocess.PIPE).stdout.decode().strip()
    try:
        dur = "%.1fs" % float(dur)
    except ValueError:
        dur = "%.1fs" % total
    print("\ndone  %s  (%s, %s, %.2f MB%s)"
          % (os.path.basename(out), info, dur, size,
             ", silent" if not any_audio else ""))
    print("source logged in social-clips/%s%s"
          % (SOURCES, " (one row per segment)" if len(segs) > 1 else ""))


if __name__ == "__main__":
    main()
