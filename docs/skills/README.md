# Skills 文档总览

这份文档面向仓库使用者，而不是面向 agent 内部加载逻辑。

如果你想先从整个仓库的文档导航开始看，请先看：

- [文档首页](D:/Projects/flttxq-skills/docs/index.md)

如果你想知道：

- 每个 skill 是干什么的
- 适合在什么场景下使用
- 该怎么向 agent 提需求
- 需要提前准备什么输入
- 最后大概会得到什么输出

可以先从这里开始。

## 使用原则

安装 skill 之后，建议在对话里明确点名 skill 名称，并把目标说清楚。

推荐表达方式：

- `用 polyglot-code-review-expert review 当前改动`
- `用 cross-framework-test-suite 给这个模块补测试`
- `用 store-submission-docs-cn 生成 1.2.3 版本提审文案`
- `用 app-store-triple-review 检查这个版本的上架风险`

如果目标平台支持自动触发 skill，也建议在关键任务里显式点名，这样更稳定。

## 当前技能清单

| Skill | 功能定位 | 典型输入 | 典型输出 |
| --- | --- | --- | --- |
| `app-store-triple-review` | 三端应用商店合规预审 | 源码、安装包、权限/隐私/账号信息 | 分平台风险结论、关键操作记录、提审建议 |
| `cross-framework-test-suite` | 跨框架补单测/集成测试 | 目标模块、现有测试规范、仓库测试栈 | 新增测试文件、执行结果、剩余风险 |
| `polyglot-code-review-expert` | 带项目规范感知的代码审查 | 当前 diff、目标文件、仓库规范文档 | 问题列表、风险说明、验证建议 |
| `store-submission-docs-cn` | 应用商店提审文案与材料整理 | 版本变更、权限用途、截图/审核路径信息 | 可直接粘贴的提审文案、备注、版本说明 |

## 单独说明

- [app-store-triple-review](D:/Projects/flttxq-skills/docs/skills/app-store-triple-review.md)
- [cross-framework-test-suite](D:/Projects/flttxq-skills/docs/skills/cross-framework-test-suite.md)
- [polyglot-code-review-expert](D:/Projects/flttxq-skills/docs/skills/polyglot-code-review-expert.md)
- [store-submission-docs-cn](D:/Projects/flttxq-skills/docs/skills/store-submission-docs-cn.md)
- [示例提示词库](D:/Projects/flttxq-skills/docs/skills/prompt-examples.md)

## 补充说明

- skill 的原始触发描述和 agent 内部执行规则，仍然以各自目录下的 `SKILL.md` 为准。
- 这里的文档重点是“给人看”，帮助快速理解和使用。
- 如果后续 skill 能力扩展，建议同时更新这里的总览和对应单页。
