#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if command -v python3 >/dev/null 2>&1; then
  exec python3 "$SCRIPT_DIR/scripts/install.py" "$@"
fi

if command -v python >/dev/null 2>&1 && python -c 'import sys; raise SystemExit(0 if sys.version_info[0] >= 3 else 1)' >/dev/null 2>&1; then
  exec python "$SCRIPT_DIR/scripts/install.py" "$@"
fi

echo "未找到可用的 Python 3，请先安装 Python 3.9+。" >&2
exit 1
