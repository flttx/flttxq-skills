# frontend-ai-radar

## 这个 skill 做什么

它用于收集和筛选公开的 AI builder、前端工程、GitHub 工具链、社区讨论和官方博客信号，然后整理成面向中文前端工程师的技术雷达。

它不是简单资讯汇总，而是强调：

- 只保留有工程含量的内容
- 从前端架构和工程管理视角解释价值
- 补充 Codex agent 工作流、任务切分、测试和自动化启发

## 适合什么时候用

推荐在这些场景使用：

- 想定期了解 AI + 前端工程趋势
- 想整理团队内部技术雷达或周报
- 想跟踪前端社区、GitHub 工具链和官方博客变化
- 想把外部信号转成架构、质量、测试、CI、设计系统、WebGL/3D UI 等方向的行动建议

## 使用前最好准备什么

可以直接使用默认来源目录，也可以补充：

- 关注周期，例如“最近一周”或“最近 24 小时”
- 重点方向，例如 React、Vue、构建工具、测试、Three.js、WebGPU、AI coding agent
- 输出用途，例如团队周会、架构复盘、个人学习列表
- 是否需要运行内置 collector

## 怎么使用

典型提示词：

```text
用 frontend-ai-radar 生成本周前端 AI 技术雷达，重点关注 AI coding agent、构建工具、测试和前端架构治理。
```

```text
用 frontend-ai-radar 收集最近 24 小时的高信号前端工程内容，输出中文摘要、来源链接和对团队实践的启发。
```

```text
用 frontend-ai-radar 跟踪 GitHub 和官方前端博客里的工具链变化，重点看 CI、性能、测试和 DX。
```

高频可复制示例：

```text
用 frontend-ai-radar 做一份面向前端架构负责人的周报，只保留有工程实践价值的内容，每条都给出来源、为什么重要、团队可以怎么用。
```

## 你大概会得到什么

常见输出包括：

- AI Builder Signals
- Frontend Community Signals
- GitHub / Tooling Signals
- Frontend Architecture Implications
- Codex Agent Takeaways
- 每条内容对应的来源链接

## 仓库里的补充资源

- [SKILL.md](D:/Projects/flttxq-skills/skills/frontend-ai-radar/SKILL.md)
- [source-catalog.md](D:/Projects/flttxq-skills/skills/frontend-ai-radar/references/source-catalog.md)
- [source-catalog.json](D:/Projects/flttxq-skills/skills/frontend-ai-radar/references/source-catalog.json)
- [filtering-rules.md](D:/Projects/flttxq-skills/skills/frontend-ai-radar/references/filtering-rules.md)
- [collect_frontend_radar.mjs](D:/Projects/flttxq-skills/skills/frontend-ai-radar/scripts/collect_frontend_radar.mjs)

## 注意事项

- 它只处理公开可访问来源，不绕过登录、付费墙或私有内容。
- 内置 collector 只负责收集候选项，不替代最终判断。
- 如果某个来源抓取失败，应报告不可用并继续处理其他来源。
- 最终摘要必须保留直接来源链接，避免凭空补内容。
