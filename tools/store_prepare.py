#!/usr/bin/env python3
"""Retro Vault store - get a paid homebrew ready for sale, or trace a copy.

    python3 tools/store_prepare.py prepare "path/to/Game.bin"
    python3 tools/store_prepare.py trace   "some copy found online.bin"

prepare
    Works out how this file can carry a buyer's stamp without changing how
    it plays, prints the `stamp` line for store-server/config.php, and writes
    a stamped TEST copy next to the file (Game.stamptest.bin). Boot that test
    copy in the Vault (drop it in emulator/roms/ under the game's own name)
    and play a minute: if it behaves exactly like the original, the stamp is
    safe to go live. The server applies the very same stamp per buyer.

    .bin / .crt   "fill"       - overwrites a run of unused filler bytes
                                 (0xFF, or 0x00 if no 0xFF run is long
                                 enough). File size never changes - o2em
                                 picks the bank layout from the size.
    .prg          "prg_append" - a few bytes after the program; refused if
                                 the program ends too close to $A000.
    .d64          "d64_dir"    - a 0-block "LIC <NAME>" entry after the last
                                 file in the directory (visible in the
                                 listing, never loaded).
    .zip          "zip_file"   - a LICENSE.TXT inside the zip.
    anything else "none"       - no in-file stamp; the key limits still apply.

trace
    Looks for a stamp in a file and prints the order number and code, to
    look up in Lemon Squeezy (Orders -> search the order number). The code
    is checked by the server's secret, so pass --secret and --license-id to
    confirm a code really belongs to an order.
"""
import hashlib
import hmac
import io
import os
import re
import struct
import sys
import zipfile

TEST = {"order": "TEST", "code": "00000000", "name": "Test Buyer", "text": "RV#TEST/00000000"}
STAMP_LEN = 32
D64_SIZES = (174848, 175531, 196608, 197376)
T18 = 17 * 21 * 256


def runs(data, byte, start=0, end=None):
    end = len(data) if end is None else end
    i = start
    while i < end:
        if data[i] == byte:
            j = i
            while j < end and data[j] == byte:
                j += 1
            yield i, j - i
            i = j
        else:
            i += 1


def chip_areas(data):
    """Data areas of a .crt (inside CHIP packets), so headers are never touched."""
    if data[:16] != b"C64 CARTRIDGE   ":
        return None
    hdr = struct.unpack(">I", data[16:20])[0]
    pos, out = hdr, []
    while pos + 16 <= len(data) and data[pos:pos + 4] == b"CHIP":
        plen = struct.unpack(">I", data[pos + 4:pos + 8])[0]
        out.append((pos + 16, pos + plen))
        pos += plen
    return out


def find_fill(data, areas):
    best = None
    for filler, need in ((0xFF, 48), (0x00, 96)):
        for a, b in areas:
            for s, n in runs(data, filler, a, b):
                if n >= need and (best is None or n > best[2]):
                    best = (filler, s, n)
        if best:
            break
    if not best:
        return None
    filler, s, n = best
    # middle of the run, away from both ends (code often runs into filler)
    off = s + (n - STAMP_LEN) // 2
    return {"method": "fill", "offset": off, "length": STAMP_LEN, "filler": filler}


def d64_petscii(s):
    import unicodedata
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().upper()
    return re.sub(r"[^A-Z0-9 .\-/#]", "", s)


def d64_slot(data):
    slot = last = None
    sec, seen = 1, set()
    while sec is not None and sec not in seen and sec < 19:
        seen.add(sec)
        base = T18 + sec * 256
        for i in range(8):
            p = base + 2 + i * 32
            if data[p] != 0:
                last, slot = p, None
            elif slot is None:
                slot = p
        nt, ns = data[base], data[base + 1]
        sec = ns if nt == 18 else None
    if slot is None or last is None:
        return None
    return slot


# ---- the same stamps as store-server/lib.php (keep the two in step) ----

def apply(data, st, stamp):
    m = st["method"]
    if m == "none":
        return data
    if m == "fill":
        off, n, f = st["offset"], st["length"], st["filler"]
        assert data[off:off + n] == bytes([f]) * n, "filler not where config says"
        mark = stamp["text"].encode()[:n].ljust(n, bytes([f]))
        return data[:off] + mark + data[off + n:]
    if m == "prg_append":
        return data + b"\0" + stamp["text"].encode() + b"\0"
    if m == "d64_dir":
        slot = d64_slot(data)
        name = ("LIC " + d64_petscii(stamp["name"] or "ORDER " + stamp["order"])).strip()[:16]
        entry = (bytes([0x80, 18, 0]) + name.encode().ljust(16, b"\xa0") + b"\0\0\0"
                 + struct.pack("<I", (int(stamp["order"]) if stamp["order"].isdigit() else 0) & 0xFFFFFFFF)
                 + bytes.fromhex(stamp["code"][:4].ljust(4, "0")) + b"\0\0")
        return data[:slot] + entry + data[slot + 30:]
    if m == "zip_file":
        zin = zipfile.ZipFile(io.BytesIO(data))
        names = [n.lstrip("/") for n in zin.namelist()]
        roots = {("" if "/" not in n else n.split("/")[0]) for n in names}
        prefix = (next(iter(roots)) + "/") if len(roots) == 1 and "" not in roots and ".jsdos" not in roots else ""
        buf = io.BytesIO(data)
        with zipfile.ZipFile(buf, "a") as z:
            z.writestr(prefix + "LICENSE.TXT",
                       "Retro Vault - licensed copy\r\n\r\nLicensed to: %s\r\nOrder: %s   Code: %s\r\n"
                       % (stamp["name"] or "-", stamp["order"], stamp["code"]))
        return buf.getvalue()
    raise ValueError(m)


def plan(path, data):
    ext = os.path.splitext(path)[1].lower()
    if ext == ".bin":
        return find_fill(data, [(0, len(data))]), "no filler run long enough"
    if ext == ".crt":
        areas = chip_areas(data)
        if areas is None:
            return None, "not a valid .crt"
        return find_fill(data, areas), "no filler run long enough inside the CHIP data"
    if ext == ".prg":
        load = data[0] | data[1] << 8
        end = load + len(data) - 2
        if end + 40 >= 0xA000 or load < 0x0801 - 0x100:
            return None, "program runs up to $%04X - appended bytes would land past $A000" % end
        return {"method": "prg_append"}, ""
    if ext == ".d64":
        if len(data) not in D64_SIZES:
            return None, "unexpected .d64 size %d" % len(data)
        if d64_slot(data) is None:
            return None, "directory has no free entry after the last file"
        return {"method": "d64_dir"}, ""
    if ext == ".zip":
        try:
            zipfile.ZipFile(io.BytesIO(data)).testzip()
        except Exception as e:
            return None, "zip unreadable: %s" % e
        return {"method": "zip_file"}, ""
    return None, "no stamp method for %s files" % ext


def php(st):
    return "'stamp' => [" + ", ".join("'%s' => %s" % (k, ("'%s'" % v) if isinstance(v, str) else v) for k, v in st.items()) + "],"


def prepare(path):
    data = open(path, "rb").read()
    st, why = plan(path, data)
    if st is None:
        print("No in-file stamp for this file: %s." % why)
        print("It can still be sold - the key/device limit applies. Config line:")
        print("    " + php({"method": "none"}))
        return
    out = apply(data, st, TEST)
    root, ext = os.path.splitext(path)
    test = root + ".stamptest" + ext
    open(test, "wb").write(out)
    changed = sum(1 for a, b in zip(data, out) if a != b) + abs(len(out) - len(data))
    print("Stamp method: %s  (%d bytes differ, size %d -> %d)" % (st["method"], changed, len(data), len(out)))
    print("Config line for store-server/config.php:")
    print("    " + php(st))
    print("Test copy: %s" % test)
    print("Boot it in the Vault under the game's own filename and play a minute.")
    print("Only go live if it behaves exactly like the original.")


def trace(path, secret=None, license_id=None):
    data = open(path, "rb").read()
    found = []
    for m in re.finditer(rb"RV#([0-9A-Za-z]+)/([0-9A-F]{8})", data):
        found.append((m.group(1).decode(), m.group(2).decode(), "in the file bytes"))
    if len(data) in D64_SIZES:
        sec, seen = 1, set()
        while sec is not None and sec not in seen and sec < 19:
            seen.add(sec)
            base = T18 + sec * 256
            for i in range(8):
                p = base + 2 + i * 32
                if data[p] == 0x80 and data[p + 3:p + 7] == b"LIC ":
                    name = data[p + 3:p + 19].rstrip(b"\xa0").decode("ascii", "replace")
                    order = str(struct.unpack("<I", data[p + 22:p + 26])[0])
                    found.append((order, data[p + 26:p + 28].hex().upper() + "…", "d64 entry '%s'" % name))
            sec = data[base + 1] if data[base] == 18 else None
    if data[:2] == b"PK":
        try:
            z = zipfile.ZipFile(io.BytesIO(data))
            for n in z.namelist():
                if n.upper().endswith("LICENSE.TXT"):
                    t = z.read(n).decode("utf-8", "replace")
                    m = re.search(r"Order: (\S+)\s+Code: (\S+)", t)
                    if m:
                        found.append((m.group(1), m.group(2), n))
        except Exception:
            pass
    if not found:
        print("No Retro Vault stamp found.")
        return
    for order, code, where in found:
        line = "order %s, code %s (%s)" % (order, code, where)
        if secret and license_id and order != "?":
            want = hmac.new(secret.encode(), ("%s|%s" % (license_id, order)).encode(), hashlib.sha256).hexdigest()[:8].upper()
            line += " - code %s" % ("MATCHES" if want == code else "does NOT match")
        print(line)


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) >= 2 and args[0] == "prepare":
        prepare(args[1])
    elif len(args) >= 2 and args[0] == "trace":
        opt = dict(zip(args[2::2], args[3::2]))
        trace(args[1], opt.get("--secret"), opt.get("--license-id"))
    else:
        print(__doc__)
        sys.exit(1)
