# flttxq-skills 文档首页

如果你第一次接触这个仓库，建议按下面顺序阅读。

## 1. 先了解这个仓库是什么

- [仓库首页 README](D:/Projects/flttxq-skills/README.md)

这里会告诉你：

- 这个仓库维护什么
- 当前内置了哪些 skill
- 怎么通过 `npx flttxq-skills` 使用
- 支持哪些平台

## 2. 再看技能总览

- [Skills 文档总览](D:/Projects/flttxq-skills/docs/skills/README.md)

这里适合快速判断：

- 每个 skill 是做什么的
- 哪个 skill 更适合你的当前任务
- 大概要准备什么输入
- 预期会拿到什么输出

## 3. 想直接上手就看提示词示例

- [示例提示词库](D:/Projects/flttxq-skills/docs/skills/prompt-examples.md)

这里提供了可以直接复制的提示词，适合：

- 先跑通一次
- 快速验证 skill 效果
- 给团队成员一个统一表达模板

## 4. 需要深挖某个 skill 就看单页

- [app-store-triple-review](D:/Projects/flttxq-skills/docs/skills/app-store-triple-review.md)
- [cross-framework-test-suite](D:/Projects/flttxq-skills/docs/skills/cross-framework-test-suite.md)
- [frontend-ai-radar](D:/Projects/flttxq-skills/docs/skills/frontend-ai-radar.md)
- [polyglot-code-review-expert](D:/Projects/flttxq-skills/docs/skills/polyglot-code-review-expert.md)
- [store-submission-docs-cn](D:/Projects/flttxq-skills/docs/skills/store-submission-docs-cn.md)

单页文档重点回答：

- 这个 skill 适合什么时候用
- 推荐怎么开口
- 需要准备哪些输入
- 最后通常会输出什么

## 5. 想看 agent 内部执行规则再回到 skill 目录

仓库里的 `skills/*/SKILL.md` 主要面向 agent 本身，不是面向普通读者的快速指南。

如果你关心的是：

- 触发描述
- 详细执行流程
- references 和 scripts 的用途

再进入 `skills/<skill-name>/SKILL.md` 查看会更合适。

## 6. 常用阅读路径

### 我只想安装并试一次

1. 看 [仓库首页 README](D:/Projects/flttxq-skills/README.md)
2. 跑 `npx flttxq-skills`
3. 看 [示例提示词库](D:/Projects/flttxq-skills/docs/skills/prompt-examples.md)

### 我想知道某个 skill 适不适合我

1. 看 [Skills 文档总览](D:/Projects/flttxq-skills/docs/skills/README.md)
2. 再看对应 skill 单页

### 我想把这个仓库发给别人用

1. 看 [仓库首页 README](D:/Projects/flttxq-skills/README.md)
2. 看 [Skills 文档总览](D:/Projects/flttxq-skills/docs/skills/README.md)
3. 看 [示例提示词库](D:/Projects/flttxq-skills/docs/skills/prompt-examples.md)
4. 最后按 README 里的发布建议处理 npm 包

## 7. 当前推荐入口

如果你只保留一个最常用入口，建议就是这个：

- [Skills 文档总览](D:/Projects/flttxq-skills/docs/skills/README.md)

如果你只保留一个“拿来即用”的入口，建议就是这个：

- [示例提示词库](D:/Projects/flttxq-skills/docs/skills/prompt-examples.md)
