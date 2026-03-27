# polyglot-code-review-expert

## 这个 skill 做什么

它是一个偏工程化的代码审查 skill，不只是看语法和风格，而是会尽量一起看：

- 当前 diff 或改动范围
- 项目自己的规范文档
- 对应技术栈的专项风险
- 输出平台的呈现方式

它适合拿来做“这次改动有没有真实风险”的判断。

## 适合什么时候用

推荐在这些场景使用：

- 代码评审
- 合并前风险检查
- 帮你找潜在回归、边界 bug、竞态、异常处理问题
- 希望 review 同时考虑仓库规范，而不是套通用经验

适用技术栈包括但不限于：

- React
- Vue 2
- Vue 3
- React Native
- Electron
- HarmonyOS

## 使用前最好准备什么

最好能提供以下信息之一：

- 当前 `git diff`
- 指定要 review 的文件或目录
- 本次任务目标
- 仓库里的规范文档位置，例如 `AGENTS.md`、`docs/`

## 怎么使用

推荐明确说“审什么范围”和“你最担心什么风险”。

典型提示词：

```text
用 polyglot-code-review-expert review 当前改动，重点关注状态机、竞态和异常恢复。
```

```text
用 polyglot-code-review-expert 审查 stores/caseStore.ts 和首页启动链路，按仓库 AGENTS.md 规则来。
```

```text
用 polyglot-code-review-expert 检查这次 React Native 改动有没有首屏、导航和资源释放风险。
```

## 你大概会得到什么

常见输出包括：

- 按优先级排序的问题列表
- 文件位置和触发条件
- 为什么这是问题
- 最小修复方向
- 未验证范围和剩余风险

如果没有发现明确问题，也应该能得到：

- “未发现问题”的明确结论
- 仍然未覆盖的验证缺口

## 适合期待它帮你解决的问题

- “这次提交最大的风险点是什么？”
- “哪些问题是功能缺陷，不只是代码风格？”
- “这个仓库自己的规范有没有被破坏？”
- “Review 输出怎么更稳定、更像一套流程？”

## 仓库里的补充资源

- [SKILL.md](D:/Projects/flttxq-skills/skills/polyglot-code-review-expert/SKILL.md)
- [common-review-baseline.md](D:/Projects/flttxq-skills/skills/polyglot-code-review-expert/references/common-review-baseline.md)
- [project-policy-scan.md](D:/Projects/flttxq-skills/skills/polyglot-code-review-expert/references/project-policy-scan.md)
- [platform-adapters.md](D:/Projects/flttxq-skills/skills/polyglot-code-review-expert/references/platform-adapters.md)
- [detect_review_context.py](D:/Projects/flttxq-skills/skills/polyglot-code-review-expert/scripts/detect_review_context.py)

## 注意事项

- 它是 review skill，不适合拿来直接写功能。
- 如果你不给范围，它可能需要先花时间收敛改动范围。
- 它强调“证据优先”，所以输入越具体，结论越可信。
