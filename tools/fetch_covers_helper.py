#!/usr/bin/env python3
"""
Optional helper: matches every game in the catalogue (official
releases, French dumps, Jopac, homebrew, mods, rare/unreleased - all
of it) against the libretro-thumbnails community box art archives and
downloads the best matches into ../covers/<id>.jpg

This is NOT run automatically by the app or by Claude - it's here for
you to read and run yourself if you want. It makes network requests to
GitHub (api.github.com, raw.githubusercontent.com) to fetch community-
maintained box art images. Review it before running if that matters to
you: https://github.com/libretro-thumbnails/Magnavox_-_Odyssey2 and
https://github.com/libretro-thumbnails/Philips_-_Videopac

Checks both repos for every game rather than assuming which system a
title belongs to - homebrew and rare dumps in particular aren't
reliably filed under one or the other, and a few US Odyssey2 carts
turn up in the Videopac repo (or vice versa) too. Titles with no
official box art (most homebrew, mods) just won't find a confident
match, which is expected - see the "no match" list it prints out.

Never overwrites anything already in covers/ - if you've dropped your
own scans or screengrabs in by hand, this only fills in games that
don't have a cover yet. No need to remove anything first.

Usage:
    cd app/tools
    python3 fetch_covers_helper.py            # dry run, shows matches
    python3 fetch_covers_helper.py --apply    # actually downloads
"""
import json, os, re, sys, difflib, urllib.request, urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.dirname(HERE)
GAMES_JSON = os.path.join(APP_DIR, "games.json")
COVERS_DIR = os.path.join(APP_DIR, "covers")

REPOS = ["Magnavox_-_Odyssey2", "Philips_-_Videopac"]
API = "https://api.github.com/repos/libretro-thumbnails/{repo}/contents/Named_Boxarts"
RAW = "https://raw.githubusercontent.com/libretro-thumbnails/{repo}/master/Named_Boxarts/{name}"
THRESHOLD = 0.6

def normalize(s):
    s = re.sub(r"\([^)]*\)", "", s)          # drop region tags e.g. (USA)
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return s.strip()

def list_boxarts(repo):
    url = API.format(repo=repo)
    with urllib.request.urlopen(url, timeout=30) as r:
        data = json.load(r)
    return [item["name"] for item in data if item["name"].lower().endswith((".png", ".jpg"))]

def best_match_in(title, names, norm_names):
    norm_title = normalize(title)
    best_ratio, best_idx = 0, -1
    for i, c in enumerate(norm_names):
        ratio = difflib.SequenceMatcher(None, norm_title, c).ratio()
        if ratio > best_ratio:
            best_ratio, best_idx = ratio, i
    if best_idx == -1:
        return None, 0
    return names[best_idx], best_ratio

def main():
    apply = "--apply" in sys.argv
    games = json.load(open(GAMES_JSON))["games"]
    print(f"{len(games)} games to match against libretro-thumbnails (checking both repos for each)\n")

    repo_files = {}
    for repo in REPOS:
        print(f"Fetching file list for {repo}...")
        names = list_boxarts(repo)
        norm_names = [normalize(n.rsplit(".", 1)[0]) for n in names]
        repo_files[repo] = (names, norm_names)

    def existing_cover(game_id):
        for ext in ("jpg", "png"):
            p = os.path.join(COVERS_DIR, game_id + "." + ext)
            if os.path.exists(p):
                return p
        return None

    matched, unmatched, already_have = [], [], []
    for g in games:
        existing = existing_cover(g["id"])
        if existing:
            already_have.append((g, existing))
            continue
        best_overall = (None, None, 0)  # repo, match, score
        for repo in REPOS:
            names, norm_names = repo_files[repo]
            match, score = best_match_in(g["title"], names, norm_names)
            if match and score > best_overall[2]:
                best_overall = (repo, match, score)
        repo, match, score = best_overall
        if match and score >= THRESHOLD:
            matched.append((g, repo, match, score))
        else:
            unmatched.append(g)

    if already_have:
        print(f"Already have a cover for {len(already_have)} titles - leaving those alone:")
        for g, path in already_have:
            print(f"  {g['id']:<22} {os.path.basename(path)}")
        print()

    matched.sort(key=lambda x: -x[3])
    print(f"Matched {len(matched)} / {len(games) - len(already_have)} remaining (threshold {THRESHOLD}):\n")
    for g, repo, match, score in matched:
        print(f"  {score:.2f}  {g['id']:<22} -> [{repo}] {match}")

    if unmatched:
        print(f"\nNo confident match for {len(unmatched)} titles (expected for most homebrew/mods - add these manually if you have art for them):")
        for g in unmatched:
            print(f"  {g['id']:<22} {g['title']}")

    if not apply:
        print("\nDry run only - re-run with --apply to download the matched images.")
        return

    os.makedirs(COVERS_DIR, exist_ok=True)
    for g, repo, match, score in matched:
        ext = match.rsplit(".", 1)[1].lower()
        dest = os.path.join(COVERS_DIR, g["id"] + "." + ext)
        url = RAW.format(repo=repo, name=urllib.parse.quote(match))
        try:
            urllib.request.urlretrieve(url, dest)
            print(f"  saved {dest}")
        except Exception as e:
            print(f"  FAILED {g['id']}: {e}")

if __name__ == "__main__":
    main()
