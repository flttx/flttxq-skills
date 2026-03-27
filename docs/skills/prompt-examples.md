# Skills 示例提示词库

这份文档提供可以直接复制的示例提示词。

使用建议：

- 先点名 skill
- 再说清楚范围
- 再补重点风险或输出要求

推荐句式：

```text
用 <skill-name> + 目标 + 范围 + 重点关注点 + 输出要求
```

## app-store-triple-review

```text
用 app-store-triple-review 审查这个 Android 版本的上架风险，重点检查权限申请、隐私政策、账号注销和短信验证码链路。
```

```text
用 app-store-triple-review 复审这次 App Store 被拒后的版本，结合审核反馈和源码，列出阻塞提审的问题。
```

```text
用 app-store-triple-review 检查华为、应用宝、Apple 三个平台的提审阻塞项，并输出关键操作记录和最终建议。
```

```text
用 app-store-triple-review 只看华为应用市场，检查权限最小化、隐私政策可达性和账号删除闭环。
```

```text
用 app-store-triple-review 基于这个 IPA 和源码做预审，按 P0/P1/P2 列出风险，并告诉我现在是否建议提审。
```

## cross-framework-test-suite

```text
用 cross-framework-test-suite 给这个 React 组件补单测，遵循当前仓库的 testing-library 风格。
```

```text
用 cross-framework-test-suite 为这个页面补集成测试，重点覆盖加载失败、重试、空态和权限不足。
```

```text
用 cross-framework-test-suite 检查当前仓库测试规范，然后给 recording 模块补最小必要测试。
```

```text
用 cross-framework-test-suite 给这个 Vue 页面补测试，优先覆盖表单提交流程和异常提示。
```

```text
用 cross-framework-test-suite 给这个 React Native 列表页补测试，重点看分页、下拉刷新和空列表状态。
```

## polyglot-code-review-expert

```text
用 polyglot-code-review-expert review 当前改动，重点关注状态机、竞态和异常恢复。
```

```text
用 polyglot-code-review-expert 审查 stores/caseStore.ts 和首页启动链路，按仓库 AGENTS.md 规则来。
```

```text
用 polyglot-code-review-expert 检查这次 React Native 改动有没有首屏、导航和资源释放风险。
```

```text
用 polyglot-code-review-expert review 这个 PR，只输出真实问题，按优先级排序，并标明未验证范围。
```

```text
用 polyglot-code-review-expert 审查这次 Vue 3 改动，重点看副作用边界、watcher 使用和数据一致性。
```

## store-submission-docs-cn

```text
用 store-submission-docs-cn 生成 1.2.3 版本的华为和应用宝提审文案，包含版本说明、审核备注和权限说明。
```

```text
用 store-submission-docs-cn 为 App Store 写审核备注，重点解释短信验证码登录和账号注销入口。
```

```text
用 store-submission-docs-cn 按 docs/release/v1.2.3 的结构整理三端提审材料。
```

```text
用 store-submission-docs-cn 生成这个版本的权限用途说明，覆盖相机、相册、定位和通知权限。
```

```text
用 store-submission-docs-cn 输出华为、应用宝、App Store 三端可直接粘贴的版本更新说明，要求中文、简洁、不要夸大能力。
```

## 改写模板

如果你想快速自己拼提示词，可以套这个模板：

```text
用 <skill-name> 处理 <目标对象/版本/模块>，范围是 <文件/平台/页面/版本>，重点关注 <风险点/链路/限制>，输出 <你希望看到的结果格式>。
```

示例：

```text
用 polyglot-code-review-expert 处理当前 PR，范围是 stores 和 services，重点关注异常恢复和并发覆盖，输出按优先级排序的问题列表。
```
