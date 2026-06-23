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
- `frontend-ai-radar`
- `polyglot-code-review-expert`
- `store-submission-docs-cn`

技能使用说明见：

- [文档首页](D:/Projects/flttxq-skills/docs/index.md)
- [Skills 文档总览](D:/Projects/flttxq-skills/docs/skills/README.md)
- [示例提示词库](D:/Projects/flttxq-skills/docs/skills/prompt-examples.md)
- [app-store-triple-review](D:/Projects/flttxq-skills/docs/skills/app-store-triple-review.md)
- [cross-framework-test-suite](D:/Projects/flttxq-skills/docs/skills/cross-framework-test-suite.md)
- [frontend-ai-radar](D:/Projects/flttxq-skills/docs/skills/frontend-ai-radar.md)
- [polyglot-code-review-expert](D:/Projects/flttxq-skills/docs/skills/polyglot-code-review-expert.md)
- [store-submission-docs-cn](D:/Projects/flttxq-skills/docs/skills/store-submission-docs-cn.md)

## 目录结构

```text
flttxq-skills/
├── package.json
├── bin/
│   ├── add.js
│   └── flttxq-skills.js
├── docs/
│   ├── index.md
│   └── skills/
│       ├── README.md
│       ├── app-store-triple-review.md
│       ├── cross-framework-test-suite.md
│       ├── frontend-ai-radar.md
│       ├── polyglot-code-review-expert.md
│       ├── prompt-examples.md
│       └── store-submission-docs-cn.md
├── README.md
├── install.ps1
├── install.sh
├── scripts/
│   ├── install.js
│   └── install.py
└── skills/
    ├── app-store-triple-review/
    ├── cross-framework-test-suite/
    ├── frontend-ai-radar/
    ├── polyglot-code-review-expert/
    └── store-submission-docs-cn/
```

## 首批纳入原则

- 只收录自定义 skill，不收录官方、系统内建或第三方预置 skill
- 优先纳入跨项目复用价值高的 skill
- 优先纳入“代码审查、测试补齐、应用商店文档/审核”等通用能力
- 暂不纳入明显项目私有的 skill，例如强依赖 SmileLinked 或特定业务目录结构的能力

## 技能文档

仓库里的 `skills/*/SKILL.md` 主要面向 agent 触发和执行规则。

如果你是以“仓库使用者”的视角想快速了解：

- 每个 skill 能干什么
- 该怎么调用
- 需要准备什么输入
- 最终会产出什么

请优先阅读：

- [文档首页](D:/Projects/flttxq-skills/docs/index.md)
- [Skills 文档总览](D:/Projects/flttxq-skills/docs/skills/README.md)
- [示例提示词库](D:/Projects/flttxq-skills/docs/skills/prompt-examples.md)

## 设计原则

- 仓库中的 skill 仅用于**维护和分发**
- 实际使用时，skill 会被复制到目标平台的**全局技能目录**
- 安装阶段提供命令行选择：
  - 选择平台
  - 选择 skill
  - 确认目标目录
- 对不确定的第三方平台目录，安装器会提供“建议目录 + 自定义覆盖”

## 运行方式

### 通过 npx 交互安装

```bash
npx flttxq-skills
```

默认进入交互流程，依次选择：

- 平台
- skill
- 目标目录
- 是否确认安装

### 通过 npx 直接安装指定 skill

```bash
npx flttxq-skills add polyglot-code-review-expert
```

也支持直接补充参数，跳过确认：

```bash
npx flttxq-skills add polyglot-code-review-expert --platform codex --yes
```

### `add` 快捷命令

包内额外暴露了 `add` 这个 bin，适合在以下形式里使用：

```bash
npx flttxq-skills add polyglot-code-review-expert --platform codex --yes
```

说明：

- 我们已经提供了 `add` 命令入口
- 稳定可依赖的官方入口就是 `npx flttxq-skills` 和 `npx flttxq-skills add <skill>`
- 不再建议使用 `npx add <skill>` 这类歧义命令

## 本地运行方式

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

### 直接运行 Node 安装器

```bash
node scripts/install.js
```

## 常用参数

列出支持的平台：

```bash
node scripts/install.js --list-platforms
```

列出仓库中的 skills：

```bash
node scripts/install.js --list-skills
```

安装指定平台和指定 skill：

```bash
node scripts/install.js add polyglot-code-review-expert --platform codex
```

安装全部 skills：

```bash
node scripts/install.js add --all --platform codex
```

覆盖目标目录：

```bash
node scripts/install.js add polyglot-code-review-expert --platform codex --target-dir C:\Users\you\.codex\skills
```

非交互确认：

```bash
node scripts/install.js add polyglot-code-review-expert --platform codex --yes
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

## 发布建议

如果后续要正式通过 `npx flttxq-skills` 分发，建议：

1. 补充 npm 包发布信息
2. 确认 `package.json.name` 与 npm 上的可用包名一致
3. 发布后再验证一次 `npx flttxq-skills` 与 `npx flttxq-skills add ...`

## 发布状态

当前仓库已按 `npx flttxq-skills` 的正式发布口径整理：

- 包名：`flttxq-skills`
- 入口：`npx flttxq-skills`
- 子命令：`npx flttxq-skills add <skill>`
- npm 发布模式：公开包
