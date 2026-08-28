#!/bin/bash
# ------------------------------------------------------------------
#  Retro Vault.app — same logic as "Start Retro Vault.command", just
#  triggered from inside an app bundle instead of run directly. It:
#    1. makes sure Python 3 is installed (installs it if not)
#    2. makes sure the Vault files are here (downloads them if not)
#    3. starts the Vault's little local server
#    4. opens it in your browser
#
#  Kept in sync by hand with "Start Retro Vault.command" at the repo
#  root — the two differ only in how HERE is computed (this one has to
#  climb out of Contents/Resources first) and in the trap/exit at the
#  end (Terminal.app owns this window, not a double-clicked .command).
# ------------------------------------------------------------------

RELEASE_URL="https://github.com/donmiguel-stack/retrovault/releases/latest/download/retro-vault.zip"
PYTHON_PKG_URL="https://www.python.org/ftp/python/3.13.7/python-3.13.7-macos11.pkg"
DEFAULT_DIR="$HOME/RetroVault"
FIRST_PORT=8000

# Where am I? This script lives at .../Retro Vault.app/Contents/Resources/
# — the folder that should hold serve.py is three levels up, i.e. wherever
# the .app itself was placed (Desktop, Applications, an unzipped release...).
HERE="$(cd "$(dirname "$0")/../../.." && pwd)"

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m    %s\033[0m\n' "$*"; }
warn(){ printf '\033[1;33m    %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31mERROR: %s\033[0m\n\n' "$*"; read -r -p "Press Return to close." _; exit 1; }

clear 2>/dev/null
printf '\033[1m\n   RETRO VAULT\n   Videopac - Odyssey2 - Commodore 64 - MS-DOS\n\033[0m'

# ---------- 1. Python ----------------------------------------------
have_python() {
  local p
  for p in python3 /usr/local/bin/python3 /opt/homebrew/bin/python3 \
           /Library/Frameworks/Python.framework/Versions/Current/bin/python3; do
    if "$p" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 7) else 1)' >/dev/null 2>&1; then
      PY="$p"; return 0
    fi
  done
  return 1
}

say "Checking for Python 3..."
if have_python; then
  ok "Found: $("$PY" --version 2>&1)"
else
  warn "Python 3 is not installed yet."
  if command -v brew >/dev/null 2>&1; then
    say "Installing Python with Homebrew (this can take a few minutes)..."
    brew install python3 || die "Homebrew could not install Python."
  else
    say "Downloading the official Python installer from python.org..."
    PKG="/tmp/retro-vault-python.pkg"
    curl -fL --progress-bar -o "$PKG" "$PYTHON_PKG_URL" || die "Could not download Python. Are you online?"
    say "Opening the installer. Click through it (Continue / Agree / Install)."
    warn "Come back to this window when the installer says 'The installation was successful'."
    open "$PKG"
    printf '    waiting for Python'
    for _ in $(seq 1 600); do
      have_python && break
      printf '.'; sleep 1
    done
    echo
  fi
  have_python || die "Python still isn't available. Finish the installer, then double-click Retro Vault again."
  ok "Python installed: $("$PY" --version 2>&1)"
fi

# ---------- 2. The Vault files ---------------------------------------
say "Looking for the Vault..."
if [ -f "$HERE/serve.py" ]; then
  VAULT="$HERE"
  ok "Using this folder: $VAULT"
elif [ -f "$DEFAULT_DIR/serve.py" ]; then
  VAULT="$DEFAULT_DIR"
  ok "Found it in $VAULT"
else
  say "Not installed yet - downloading the latest release (about 180 MB)..."
  TMP="$(mktemp -d /tmp/retro-vault.XXXXXX)"
  curl -fL --progress-bar -o "$TMP/retro-vault.zip" "$RELEASE_URL" || die "Download failed. Are you online?"
  say "Unpacking..."
  unzip -q "$TMP/retro-vault.zip" -d "$TMP/unzipped" || die "The download could not be unpacked."
  SRC="$(find "$TMP/unzipped" -maxdepth 2 -name serve.py -print -quit)"
  [ -n "$SRC" ] || die "serve.py not found inside the download."
  SRC="$(dirname "$SRC")"
  mkdir -p "$DEFAULT_DIR"
  cp -R "$SRC"/. "$DEFAULT_DIR"/
  rm -rf "$TMP"
  VAULT="$DEFAULT_DIR"
  ok "Installed to $VAULT"
  warn "Put your own game files in:  $VAULT/emulator/roms/"
  warn "and the console BIOS in:     $VAULT/emulator/bios/"
fi
cd "$VAULT" || die "Cannot open $VAULT"

# ---------- 3. Start the server ---------------------------------------
vault_answering() { curl -s --max-time 2 "http://localhost:$1/index.html" 2>/dev/null | grep -q "Retro Vault"; }
port_in_use()     { lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1; }

PORT=$FIRST_PORT
while port_in_use "$PORT"; do
  if vault_answering "$PORT"; then
    say "The Vault is already running on port $PORT - just opening it."
    open "http://localhost:$PORT/"
    echo; read -r -p "Press Return to close this window." _; exit 0
  fi
  PORT=$((PORT + 1))
  [ "$PORT" -gt $((FIRST_PORT + 20)) ] && die "No free port found between $FIRST_PORT and $PORT."
done

say "Starting the Vault on http://localhost:$PORT/ ..."
"$PY" serve.py "$PORT" &
SERVER=$!
trap 'echo; say "Stopping the Vault."; kill $SERVER 2>/dev/null; exit 0' INT TERM

printf '    waiting for the server'
for _ in $(seq 1 30); do
  vault_answering "$PORT" && break
  kill -0 $SERVER 2>/dev/null || die "The server stopped unexpectedly."
  printf '.'; sleep 0.5
done
echo

# ---------- 4. Open the browser --------------------------------------
if [ -d "/Applications/Google Chrome.app" ]; then
  open -a "Google Chrome" "http://localhost:$PORT/"
else
  open "http://localhost:$PORT/"
fi

ok "Retro Vault is running at http://localhost:$PORT/"
echo
echo "    Leave this window open while you play."
echo "    Done? Press Control+C, or just close this window."
echo
wait $SERVER
