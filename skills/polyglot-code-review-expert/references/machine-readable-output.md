# 可机读输出规范

当 review 结果需要被脚本、流水线、数据库或审查面板消费时，使用这份结构化协议。

## 适用场景

- 用户要求输出 JSON
- 需要跨 `Codex`、`Claude Code`、`Antigravity` 保持统一字段
- 需要把 findings 接入自动化流程
- 需要沉淀可复查、可统计的审查记录

## 输出形态

优先输出一个 JSON 对象，而不是纯数组。

推荐顶层字段：

- `review_scope`
- `summary`
- `findings`
- `validation`
- `assumptions`
- `unreviewed_areas`

## 字段说明

### `review_scope`

描述本次审查范围：

- `workspace`
- `target`
- `files_reviewed`
- `policy_docs`
- `frameworks`

### `summary`

描述整体结论：

- `overall_risk`
- `finding_count`
- `critical_count`
- `note`

风险级别建议：

- `low`
- `medium`
- `high`
- `critical`

### `findings`

问题数组。每项建议包含：

- `id`
- `severity`
- `title`
- `file`
- `line`
- `symbol`
- `confidence`
- `category`
- `impact`
- `evidence`
- `recommendation`
- `suggested_validation`

严重级别建议：

- `P0`
- `P1`
- `P2`
- `P3`

### `validation`

描述验证现状：

- `performed`
- `recommended`
- `gaps`

### `assumptions`

列出本次结论成立所依赖的假设。

### `unreviewed_areas`

列出这次没有覆盖到的模块、路径或验证面。

## 输出原则

- 没有证据支撑的问题不要进入 `findings`。
- 纯风格建议默认不要放进结构化 findings。
- `evidence` 尽量写成可复查的事实，不写成抽象评价。
- `recommendation` 给最小修复方向，不展开成长篇方案。

## 文本终端兼容建议

如果平台不适合只输出 JSON：

1. 先写一两句摘要。
2. 再附一个 ```json 代码块。
3. 摘要与 JSON 结论保持一致。
