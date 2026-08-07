#!/usr/bin/env python3
"""Make the 'keeping this console alive' community carousels loop: clicking
Next past the last card wraps to the first, Previous from the first wraps to
the last. Applies to both the Videopac panel (communityBlock) and the C64
panel (c64CommunityBlock) via one shared helper. Run once from inside the
VAULT folder."""
import sys

path = "app.js"
txt = open(path, encoding="utf-8").read()

if "wireCommunityCarousel" in txt:
    print("app.js: wireCommunityCarousel already present, aborting to avoid duplicates.")
    sys.exit(1)

# ---------------------------------------------------------------------------
# 1. Insert the shared helper right before communityBlock().
# ---------------------------------------------------------------------------
anchor = '''  // The community panel is a carousel: on a 14-inch screen six cards wrapped
  // onto a second line and webretro ended up orphaned down there on its own.
  function communityBlock() {'''

if anchor not in txt:
    print("app.js: communityBlock() comment/signature didn't match expected text — aborting, no edits made.")
    sys.exit(1)

helper = '''  // Loops the community carousel: Next past the last card wraps back to the
  // first, Previous from the first wraps to the last. Shared by both the
  // Videopac and C64 "keeping this console alive" panels so the behaviour
  // stays identical on both shelves.
  function wireCommunityCarousel(node, track) {
    node.querySelectorAll(".car-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var dir = parseInt(this.dataset.dir, 10);
        var max = track.scrollWidth - track.clientWidth;
        var atEnd = track.scrollLeft >= max - 4;
        var atStart = track.scrollLeft <= 4;
        if (dir > 0 && atEnd) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else if (dir < 0 && atStart) {
          track.scrollTo({ left: max, behavior: "smooth" });
        } else {
          track.scrollBy({ left: track.clientWidth * 0.8 * dir, behavior: "smooth" });
        }
      });
    });
  }

'''

txt = txt.replace(anchor, helper + anchor, 1)

# ---------------------------------------------------------------------------
# 2. Replace the inline car-btn wiring in both communityBlock() and
#    c64CommunityBlock() with a call to the shared helper.
# ---------------------------------------------------------------------------
old_wiring = '''    node.querySelectorAll(".car-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var step = track.clientWidth * 0.8 * parseInt(this.dataset.dir, 10);
        track.scrollBy({ left: step, behavior: "smooth" });
      });
    });'''
new_wiring = '''    wireCommunityCarousel(node, track);'''

count = txt.count(old_wiring)
if count != 2:
    print("app.js: expected exactly 2 occurrences of the old car-btn wiring (communityBlock + "
          "c64CommunityBlock), found " + str(count) + " — aborting before the helper-insertion edit "
          "above is written, to avoid a half-applied change.")
    sys.exit(1)

txt = txt.replace(old_wiring, new_wiring)

open(path, "w", encoding="utf-8").write(txt)
print("app.js: added wireCommunityCarousel() and wired it into both communityBlock() and c64CommunityBlock() (" + str(count) + " call sites updated)")
