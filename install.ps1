$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

if (Get-Command python3 -ErrorAction SilentlyContinue) {
  python3 (Join-Path $repoRoot 'scripts\install.py') @args
  exit $LASTEXITCODE
}

if (Get-Command py -ErrorAction SilentlyContinue) {
  py -3 (Join-Path $repoRoot 'scripts\install.py') @args
  exit $LASTEXITCODE
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  python -c "import sys; raise SystemExit(0 if sys.version_info[0] >= 3 else 1)" *> $null
  if ($LASTEXITCODE -eq 0) {
    python (Join-Path $repoRoot 'scripts\install.py') @args
    exit $LASTEXITCODE
  }
}

throw "未找到可用的 Python 3，请先安装 Python 3.9+。"
