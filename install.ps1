$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

if (Get-Command node -ErrorAction SilentlyContinue) {
  node (Join-Path $repoRoot 'bin\flttxq-skills.js') @args
  exit $LASTEXITCODE
}

throw "未找到可用的 Node.js，请先安装 Node.js 18+。"
