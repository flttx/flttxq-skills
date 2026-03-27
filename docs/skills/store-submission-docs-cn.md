# store-submission-docs-cn

## 这个 skill 做什么

它专门用来整理和生成应用商店提审文档，面向：

- 华为应用市场
- 腾讯应用宝
- Apple App Store

它更偏“文案与材料组织”，不是合规审查本身。和 `app-store-triple-review` 的区别是：

- `app-store-triple-review` 偏风险审查
- `store-submission-docs-cn` 偏提审材料产出

## 适合什么时候用

推荐在这些场景使用：

- 写版本更新说明
- 写审核备注
- 写权限用途说明
- 写账号/注销/短信验证码相关解释
- 整理某个版本的提审材料目录

## 使用前最好准备什么

最好先准备：

- 当前版本号
- 本次真正上线的功能变更
- 权限用途说明
- 登录、注册、找回密码、注销流程信息
- 截图是否需要更新
- 审核员体验路径

## 怎么使用

推荐直接说明目标平台、版本号和想生成的文案类型。

典型提示词：

```text
用 store-submission-docs-cn 生成 1.2.3 版本的华为和应用宝提审文案，包含版本说明、审核备注和权限说明。
```

```text
用 store-submission-docs-cn 为 App Store 写审核备注，重点解释短信验证码登录和账号注销入口。
```

```text
用 store-submission-docs-cn 按 docs/release/v1.2.3 的结构整理三端提审材料。
```

## 你大概会得到什么

常见输出包括：

- 新版本亮点文案
- 审核备注
- 敏感权限用途说明
- 截图更新建议
- 按版本目录组织的文档结构建议

这些内容通常会偏“可直接复制粘贴到控制台”。

## 适合期待它帮你解决的问题

- “这个版本说明怎么写更像提审文案？”
- “审核备注怎样写才更完整？”
- “短信验证码、权限、账号注销怎么解释才更稳？”
- “三端材料怎么保持口径一致？”

## 仓库里的补充资源

- [SKILL.md](D:/Projects/flttxq-skills/skills/store-submission-docs-cn/SKILL.md)
- [huawei-appgallery.md](D:/Projects/flttxq-skills/skills/store-submission-docs-cn/references/huawei-appgallery.md)
- [tencent-myapp.md](D:/Projects/flttxq-skills/skills/store-submission-docs-cn/references/tencent-myapp.md)
- [app-store.md](D:/Projects/flttxq-skills/skills/store-submission-docs-cn/references/app-store.md)
- [output-templates.md](D:/Projects/flttxq-skills/skills/store-submission-docs-cn/references/output-templates.md)

## 注意事项

- 这个 skill 不应该编造不存在的功能、权限用途或审核路径。
- 你提供的版本事实如果不准确，最终文案也会跟着偏。
- 它适合生成“提交材料”，但不替代正式合规审查。
