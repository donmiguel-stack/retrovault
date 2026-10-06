#!/usr/bin/env python3
"""Retro Vault YouTube end screen: a 15 s outro to append to a gameplay video.

Leaves two empty, outlined slots for YouTube's own end-screen elements
(a 16:9 video/playlist card on the right, the round Subscribe button bottom
left); everything else is baked in: the Retro Vault mark, "Play <title>",
the URL, and a row of the game's own sprites running along a lane.

    python3 make_endscreen.py --title "Le Sprint" --slug new_le-sprint \
        --accent "#3ba97a" --platform "VIDEOPAC G7000" --out endscreen.mp4
"""
import argparse, json, math, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument("--title", required=True)
ap.add_argument("--slug", required=True)
ap.add_argument("--accent", default="#3ba97a")
ap.add_argument("--platform", default="VIDEOPAC G7000")
ap.add_argument("--sprites", default="sprites.json")
ap.add_argument("--chime", default="")
ap.add_argument("--next-shot", default="", help="screenshot for the next-video card")
ap.add_argument("--next-title", default="")
ap.add_argument("--next-crop", default="", help="l,t,r,b crop of the screenshot, e.g. to drop a border")
ap.add_argument("--icon", required=True)
ap.add_argument("--secs", type=float, default=15)
ap.add_argument("--w", type=int, default=1280)
ap.add_argument("--h", type=int, default=960)
ap.add_argument("--out", required=True)
a = ap.parse_args()

W, H, FPS = a.w, a.h, 50
N = int(a.secs * FPS)
hexc = lambda s: tuple(int(s.lstrip("#")[i:i + 2], 16) for i in (0, 2, 4))
BG, SURF, BORDER = hexc("#0f1115"), hexc("#171a21"), hexc("#2a2e37")
TEXT, DIM, MUTE = hexc("#e9edf2"), hexc("#9aa3af"), hexc("#6b7280")
BLUE, ACC, YEL = hexc("#5b8def"), hexc(a.accent), hexc("#f5d742")
LANE = (24, 52, 190)
PIX = "/tmp/claude-0/fonts/PressStart2P.ttf"
INTER = "/usr/share/fonts/opentype/inter/Inter-%s.otf"
F = lambda f, s: ImageFont.truetype(f, s)

# ---------------------------------------------------------------- base layer
base = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(base)
# faint scanlines, the only "CRT" nod
for y in range(0, H, 4):
    d.line([(0, y), (W, y)], fill=(13, 15, 19))

M = 72  # side margin
# --- header: icon + wordmark
icon = Image.open(a.icon).convert("RGBA")
icon = icon.resize((64, 64), Image.NEAREST)
hdr = Image.new("RGBA", (W, 140), (0, 0, 0, 0))
hd = ImageDraw.Draw(hdr)
hdr.paste(icon, (M, 46), icon)
hd.text((M + 84, 44), "Retro Vault", font=F(INTER % "Bold", 54), fill=TEXT)
hd.text((M + 88, 110), "VIDEOPAC  ·  C64  ·  MS-DOS  ·  AMIGA", font=F(PIX, 13), fill=MUTE)

# --- left column: call to action
cta = Image.new("RGBA", (W, H), (0, 0, 0, 0))
cd = ImageDraw.Draw(cta)
y0 = 250
cd.text((M, y0), "PLAY", font=F(PIX, 26), fill=DIM)
tf = 46
while cd.textlength(a.title.upper(), font=F(PIX, tf)) > 520 and tf > 20: tf -= 2
cd.text((M, y0 + 46), a.title.upper(), font=F(PIX, tf), fill=YEL)
cd.text((M, y0 + 46 + tf + 30), "free, in your browser —", font=F(INTER % "Regular", 34), fill=TEXT)
cd.text((M, y0 + 46 + tf + 74), "box art, manual and history too", font=F(INTER % "Regular", 34), fill=DIM)
# URL pill
uf = F(INTER % "SemiBold", 32)
url = "demo.retrovault.world"
uw = cd.textlength(url, font=uf)
py = y0 + 46 + tf + 150
pill = (M, py, M + uw + 56, py + 64)
cd.rounded_rectangle(pill, 32, fill=SURF, outline=BLUE, width=3)
cd.text((M + 28, py + 13), url, font=uf, fill=BLUE)
# platform chip
pf = F(PIX, 12)
pw = cd.textlength(a.platform, font=pf)
cd.rounded_rectangle((M, py + 92, M + pw + 28, py + 126), 8, outline=ACC, width=2)
cd.text((M + 14, py + 103), a.platform, font=pf, fill=ACC)

# --- end-screen slots (YouTube draws its own elements on top)
slots = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(slots)
vw = 560; vh = vw * 9 // 16
vx, vy = W - M - vw, 250
def dashed_rr(box, r, col, dash=14, gap=10, width=2):
    x0, y0_, x1, y1 = box
    sd.rounded_rectangle(box, r, fill=(23, 26, 33, 255))
    per = []
    # straight edges only, corners drawn solid
    for (sx, sy, ex, ey) in ((x0 + r, y0_, x1 - r, y0_), (x0 + r, y1, x1 - r, y1),
                             (x0, y0_ + r, x0, y1 - r), (x1, y0_ + r, x1, y1 - r)):
        L = math.hypot(ex - sx, ey - sy); t = 0
        while t < L:
            t2 = min(t + dash, L)
            sd.line([(sx + (ex - sx) * t / L, sy + (ey - sy) * t / L),
                     (sx + (ex - sx) * t2 / L, sy + (ey - sy) * t2 / L)], fill=col, width=width)
            t += dash + gap
    for cx, cy, st in ((x0 + r, y0_ + r, 180), (x1 - r, y0_ + r, 270), (x1 - r, y1 - r, 0), (x0 + r, y1 - r, 90)):
        sd.arc((cx - r, cy - r, cx + r, cy + r), st, st + 90, fill=col, width=width)
dashed_rr((vx, vy, vx + vw, vy + vh), 14, BORDER + (255,))
# Fill the card with the next game's screenshot, so the frame reads complete on
# its own; on YouTube the end-screen video element sits on top of it.
if a.next_shot:
    sh = Image.open(a.next_shot).convert("RGB")
    # trim emulator borders (near-black edges) before fitting
    bb = sh.point(lambda v: 255 if v > 24 else 0).convert("L").getbbox()
    if bb: sh = sh.crop(bb)
    if a.next_crop: sh = sh.crop(tuple(int(v) for v in a.next_crop.split(",")))
    sw, shh = sh.size; tr = vw / vh
    if sw / shh > tr: nw = int(shh * tr); sh = sh.crop(((sw - nw) // 2, 0, (sw - nw) // 2 + nw, shh))
    else: nh = int(sw / tr); sh = sh.crop((0, (shh - nh) // 2, sw, (shh - nh) // 2 + nh))
    sh = sh.resize((vw, vh), Image.NEAREST).convert("RGBA")
    grad = Image.new("RGBA", (vw, vh), (0, 0, 0, 0)); gd = ImageDraw.Draw(grad)
    for yy in range(vh // 2, vh):
        gd.line([(0, yy), (vw, yy)], fill=(8, 9, 12, int(215 * (yy - vh // 2) / (vh // 2))))
    sh.alpha_composite(grad)
    shd = ImageDraw.Draw(sh)
    if a.next_title:
        shd.text((24, vh - 62), a.next_title.upper(), font=F(PIX, 26), fill=TEXT)
    # play triangle, top-left, so it reads as a video
    shd.ellipse((vw // 2 - 38, vh // 2 - 38, vw // 2 + 38, vh // 2 + 38), fill=(8, 9, 12, 170))
    shd.polygon([(vw // 2 - 12, vh // 2 - 20), (vw // 2 - 12, vh // 2 + 20), (vw // 2 + 22, vh // 2)], fill=TEXT)
    mask = Image.new("L", (vw, vh), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, vw - 1, vh - 1), 14, fill=255)
    slots.paste(sh, (vx, vy), mask)
    sd.rounded_rectangle((vx, vy, vx + vw, vy + vh), 14, outline=BORDER, width=2)
sd.text((vx, vy + vh + 18), "NEXT ON THE SHELF", font=F(PIX, 13), fill=MUTE)
# subscribe circle, lower right under the card: the Vault mark inside, so it is
# a logo badge on its own and the channel avatar covers it on YouTube
cr = 64
cx, cy = vx + 30 + cr, vy + vh + 56 + cr
sd.ellipse((cx - cr, cy - cr, cx + cr, cy + cr), fill=SURF + (255,), outline=BLUE, width=3)
ic = Image.open(a.icon).convert("RGBA").resize((72, 72), Image.NEAREST)
slots.alpha_composite(ic, (cx - 36, cy - 36))
sd.text((cx + cr + 26, cy - 22), "SUBSCRIBE", font=F(PIX, 14), fill=MUTE)
sd.text((cx + cr + 26, cy + 6), "for more Videopac,", font=F(INTER % "Regular", 22), fill=DIM)
sd.text((cx + cr + 26, cy + 34), "C64, DOS and Amiga", font=F(INTER % "Regular", 22), fill=DIM)

# --- lane at the bottom, Le Sprint style
LY = H - 148
lane = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ld = ImageDraw.Draw(lane)
for k in range(3):
    ld.rectangle((M, LY + k * 56, W - M, LY + k * 56 + 6), fill=LANE)
FX = W - M - 70
ld.rectangle((FX, LY, FX + 8, LY + 2 * 56 + 6), fill=LANE)

# --- sprites
spr = json.load(open(a.sprites))
def unpack(key):
    m = np.array(json.loads(key))[::2, ::2]  # undo the VDC's 2x2
    return m
S = 7  # pixel scale
def sprite_img(mask, col):
    h, w = mask.shape
    im = Image.new("RGBA", (w * S, h * S), (0, 0, 0, 0))
    dd = ImageDraw.Draw(im)
    for y in range(h):
        for x in range(w):
            if mask[y, x]: dd.rectangle((x * S, y * S, x * S + S - 1, y * S + S - 1), fill=col + (255,))
    return im
RED, GRN = (240, 70, 60), (80, 220, 90)
poses = {c: [sprite_img(unpack(k), col) for k in spr[n]] for n, c, col in (("red", "r", RED), ("green", "g", GRN))}

def ease(t): return 1 - (1 - min(max(t, 0), 1)) ** 3

def fade(layer, alpha, dy=0):
    if alpha <= 0: return None
    l = layer if dy == 0 else layer.transform(layer.size, Image.AFFINE, (1, 0, 0, 0, 1, -dy))
    if alpha < 1:
        l = l.copy(); l.putalpha(l.getchannel("A").point(lambda v: int(v * alpha)))
    return l

# runner schedule: two races across the lane in 15 s, photo finishes
rng = np.random.default_rng(7)
def race_x(t, start, dur, wobble):
    p = (t - start) / dur
    if p < 0: return M + 10
    p = min(p, 1)
    return M + 10 + (FX - 40 - M) * (p + wobble * math.sin(p * math.pi) * 0.06)

p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                      "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-crf", "16",
                      "-pix_fmt", "yuv420p", a.out + ".silent.mp4"], stdin=subprocess.PIPE)
countdown = ["3", "2", "1"]
for i in range(N):
    t = i / FPS
    fr = base.copy().convert("RGBA")
    for layer, st, dy in ((hdr, 0.0, 18), (cta, 0.35, 24), (slots, 0.7, 0), (lane, 0.1, 0)):
        e = ease((t - st) / 0.7)
        l = fade(layer, e, int((1 - e) * dy))
        if l is not None: fr.alpha_composite(l)
    # countdown over the lane, then two races
    if 0.3 < t < 1.8:
        n = countdown[min(int((t - 0.3) / 0.5), 2)]
        ImageDraw.Draw(fr).text((W // 2 - 20, LY - 66), n, font=F(PIX, 40), fill=YEL)
    for who, row, (s1, d1, w1), (s2, d2, w2) in (("r", 0, (1.8, 5.2, 0.6), (8.6, 5.0, -0.5)),
                                                 ("g", 1, (1.8, 5.3, -0.4), (8.6, 4.9, 0.7))):
        if t < 8.2: x = race_x(t, s1, d1, w1); running = s1 < t < s1 + d1
        else: x = race_x(t, s2, d2, w2); running = s2 < t < s2 + d2
        pose = poses[who][(i // 4) % 2] if running else poses[who][0]
        ye = LY + row * 56 + 6 + (50 - pose.height) - 2
        if t > 0.1: fr.alpha_composite(pose, (int(x), ye))
    if 6.9 < t < 8.2 or t > 13.5:
        ImageDraw.Draw(fr).text((W // 2 - 60, LY - 60), "PHOTO!", font=F(PIX, 22), fill=YEL)
    # slow pulse on the URL pill outline
    if t > 1.2:
        k = 0.5 + 0.5 * math.sin((t - 1.2) * 2.4)
        dd = ImageDraw.Draw(fr)
        dd.rounded_rectangle((pill[0] - 4, pill[1] - 4, pill[2] + 4, pill[3] + 4), 36,
                             outline=tuple(int(BG[j] + (BLUE[j] - BG[j]) * 0.35 * k) for j in range(3)), width=2)
    # fade the whole thing up from black over the first 0.25 s
    out = fr.convert("RGB")
    if t < 0.25: out = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), out, t / 0.25)
    p.stdin.write(out.tobytes())
p.stdin.close(); p.wait()

# audio: the Vault's SELECT GAME chime at 0.3 s, silence after
if a.chime:
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", a.out + ".silent.mp4",
                    "-f", "lavfi", "-t", str(a.secs), "-i", "anullsrc=r=48000:cl=stereo",
                    "-i", a.chime, "-filter_complex",
                    "[2:a]adelay=300|300,volume=0.8[c];[1:a][c]amix=inputs=2:duration=first:normalize=0[a]",
                    "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                    "-ar", "48000", a.out], check=True)
else:
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", a.out + ".silent.mp4", "-f", "lavfi",
                    "-t", str(a.secs), "-i", "anullsrc=r=48000:cl=stereo", "-c:v", "copy", "-c:a", "aac",
                    "-shortest", a.out], check=True)
print("wrote", a.out)
