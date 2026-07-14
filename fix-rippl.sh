#!/usr/bin/env bash
#
# fix-rippl.sh — clean up misplaced duplicate files in the RIPPL repo and
# sync the 3 stale source files with the correct latest versions.
#
# USAGE:
#   1. Open Terminal and cd into your RIPPL git clone, e.g.:
#        cd ~/path/to/RIPPL
#   2. Run this script:
#        bash ~/Downloads/latifa-dashboard-claude/fix-rippl.sh
#
# It will NOT push automatically — it stages a commit and shows you the diff.
# Review, then run `git push` yourself.

set -euo pipefail

# The folder that holds the CORRECT, latest source (edited by Claude):
SRC="$HOME/Downloads/latifa-dashboard-claude/src"

# --- safety checks -----------------------------------------------------------
if [ ! -d ".git" ]; then
  echo "❌ This isn't a git repo. cd into your RIPPL clone first, then re-run."
  exit 1
fi
if [ ! -d "$SRC" ]; then
  echo "❌ Can't find correct source at: $SRC"
  exit 1
fi

echo "▶ Repo: $(pwd)"
echo "▶ Correct source: $SRC"
echo

# --- 1) remove misplaced duplicate FILES from repo root ----------------------
# (vite.config.ts and components.json are legit root files — left untouched)
echo "▶ Removing duplicate source files from repo root…"
rm -f \
  AppShell.tsx MagneticButton.tsx Marquee.tsx MeshGradient.tsx \
  Sidebar.tsx SpotlightCard.tsx __root.tsx assets.tsx creators.tsx \
  dashboard.tsx index.tsx mock-data.ts

# --- 2) remove misplaced duplicate FOLDERS + dead Next.js leftovers ----------
echo "▶ Removing duplicate folders (components/ lib/ ui/ app/) and Next leftovers…"
rm -rf components lib ui app
rm -f next.config.mjs prebuild-next.log prebuild-next.pid

# --- 3) sync the 3 stale files with the correct versions ---------------------
echo "▶ Syncing latest source into src/routes/…"
cp "$SRC/routes/index.tsx"     src/routes/index.tsx
cp "$SRC/routes/dashboard.tsx" src/routes/dashboard.tsx
cp "$SRC/routes/__root.tsx"    src/routes/__root.tsx

# --- 4) stage + commit (no push) ---------------------------------------------
git add -A
echo
echo "▶ Staged changes:"
git status --short
echo
git commit -m "Clean up misplaced duplicate files; sync latest 360 dashboard + landing" || {
  echo "Nothing to commit (already clean?)."; exit 0; }

echo
echo "✅ Done. Review with:  git show --stat"
echo "   Then push with:     git push"
