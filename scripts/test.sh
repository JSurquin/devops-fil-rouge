#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/app"
if [[ ! -d node_modules ]]; then
  npm install
fi
npm test
echo "fil-rouge tests OK"
