#!/usr/bin/env bash
# Sets the ANTHROPIC_API_KEY Firebase secret + deploys the Cloud Functions.
#
# USAGE (from the repo root):
#   bash scripts/set-anthropic-key.sh sk-ant-YOUR-KEY-HERE
#
# The key is written to a tempfile, uploaded to Firebase Secret Manager, then
# deleted. Nothing is stored in git. Only Cloud Functions that declare
# { secrets: [anthropicKey] } can read it at runtime.
#
# AFTER RUNNING: clear your shell history if you're paranoid about the key
# lingering in ~/.bash_history. On bash: `history -c && history -w`.

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "ERROR: missing key argument" >&2
  echo "" >&2
  echo "Usage:   bash scripts/set-anthropic-key.sh <anthropic-key>" >&2
  echo "Example: bash scripts/set-anthropic-key.sh sk-ant-abc...def" >&2
  exit 1
fi

KEY="$1"

if [[ ! "$KEY" =~ ^sk-ant- ]]; then
  echo "ERROR: key must start with 'sk-ant-'" >&2
  exit 1
fi

TMPFILE=$(mktemp)
trap "rm -f $TMPFILE" EXIT
printf '%s' "$KEY" > "$TMPFILE"

echo "Setting ANTHROPIC_API_KEY Firebase secret..."
firebase functions:secrets:set ANTHROPIC_API_KEY --data-file "$TMPFILE"

echo ""
echo "Deploying functions (this takes ~1-2 minutes)..."
firebase deploy --only functions

echo ""
echo "✓ Done. AI policy generation is live."
echo "  Test it from the Policies page → New policy → '✦ Generate with AI' button."
