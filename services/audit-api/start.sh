#!/bin/bash
# Run the RIPPL Audit API locally.
# Usage: bash start.sh
set -e
cd "$(dirname "$0")"
pip3 install --break-system-packages -q fastapi uvicorn playwright 2>/dev/null || true
python3 -m playwright install chromium --quiet 2>/dev/null || true
echo ""
echo "  RIPPL Audit API starting on http://localhost:8000"
echo "  Leave this terminal open while using the Sound Audit tab in RIPPL."
echo ""
python3 main.py
