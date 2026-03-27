#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if command -v node >/dev/null 2>&1; then
  exec node "$SCRIPT_DIR/bin/flttxq-skills.js" "$@"
fi

echo "未找到可用的 Node.js，请先安装 Node.js 18+。" >&2
exit 1
