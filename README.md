# flttxq-skills

这是一个用于集中维护、版本化管理并提交到仓库的全局 skills 仓库。

目标：

- 管理“比较完善和实用”的 skills
- 以仓库方式沉淀、评审、迭代和分发
- 安装到不同工具的**全局 skills 目录**
- 支持多平台安装选择：`codex`、`opencode`、`openclaw`、`claude-code`、`gemmni`

当前内置 skill：

- `app-store-triple-review`
- `cross-framework-test-suite`
- `frontend-design`
- `polyglot-code-review-expert`
- `store-submission-docs-cn`
- `ui-ux-pro-max`

## 目录结构

```text
flttxq-skills/
├── README.md
├── install.ps1
├── install.sh
├── scripts/
│   └── install.py
└── skills/
    ├── app-store-triple-review/
    ├── cross-framework-test-suite/
    ├── frontend-design/
    ├── polyglot-code-review-expert/
    ├── store-submission-docs-cn/
    └── ui-ux-pro-max/
```

## 首批纳入原则

- 只收录自定义 skill，不收录官方、系统内建或第三方预置 skill
- 优先纳入跨项目复用价值高的 skill
- 优先纳入“代码审查、测试补齐、前端设计、应用商店文档/审核”等通用能力
- 暂不纳入明显项目私有的 skill，例如强依赖 SmileLinked 或特定业务目录结构的能力

## 设计原则

- 仓库中的 skill 仅用于**维护和分发**
- 实际使用时，skill 会被复制到目标平台的**全局技能目录**
- 安装阶段提供命令行选择：
  - 选择平台
  - 选择 skill
  - 确认目标目录
- 对不确定的第三方平台目录，安装器会提供“建议目录 + 自定义覆盖”

## 安装方式

### Windows PowerShell

```powershell
Set-Location D:\Projects\flttxq-skills
.\install.ps1
```

### macOS / Linux / Git Bash

```bash
cd /path/to/flttxq-skills
./install.sh
```

### 直接运行 Python 安装器

```bash
python3 scripts/install.py
```

## 常用参数

列出支持的平台：

```bash
python3 scripts/install.py --list-platforms
```

列出仓库中的 skills：

```bash
python3 scripts/install.py --list-skills
```

安装指定平台和指定 skill：

```bash
python3 scripts/install.py --platform codex --skill polyglot-code-review-expert
```

安装全部 skills：

```bash
python3 scripts/install.py --platform codex --all
```

覆盖目标目录：

```bash
python3 scripts/install.py --platform codex --skill polyglot-code-review-expert --target-dir C:\Users\you\.codex\skills
```

非交互确认：

```bash
python3 scripts/install.py --platform codex --skill polyglot-code-review-expert --yes
```

## 支持平台

安装器内置以下平台选项：

- `codex`
- `opencode`
- `openclaw`
- `claude-code`
- `gemmni`

说明：

- `gemmni` 按你的命名保留为平台键，同时兼容别名 `gemini`
- 对于 `Codex`，默认优先使用 `CODEX_HOME/skills`，否则回退到 `~/.codex/skills`
- 其他平台默认采用“常见全局目录建议值”，但安装前会让用户确认或覆盖

## 如何新增 skill

1. 在 `skills/` 下新增一个合法的 skill 目录
2. 确保目录内至少包含 `SKILL.md`
3. 可选补充 `agents/`、`references/`、`scripts/`
4. 提交到仓库
5. 通过安装器选择并安装到目标平台

## 首次提交建议

建议在完成首批 skill 收录后执行首次提交：

```bash
git init
git add .
git commit -m "feat: initialize flttxq skills repository"
```
