---
name: cross-framework-test-suite
description: 为 Vue、React、React Native 项目生成与维护单元测试和集成测试。用于“补单测/补集成测试”“按现有测试规范补覆盖”“区分测试层级并建立命名与运行规则”“跨框架测试迁移或统一”的场景，基于仓库现有用例和脚本进行最小侵入式补测。
---

# Cross Framework Test Suite

## Overview
用统一流程补齐测试：先识别仓库既有规范，再按“单元测试/集成测试”分层补用例，并确保 Vue、React、React Native 在同一口径下落地。  
默认目标是最小改动通过测试，不改业务行为。

## Workflow
1. 扫描测试基线：读取 `package.json`、`jest/vitest` 配置、`__tests__` 目录、命名约定。
2. 识别框架与测试栈：按依赖判断 Vue/React/React Native 与 Jest/Vitest（见 `references/framework-recipes.md`）。
3. 判定测试类型：按职责边界区分单测与集成测试（见 `references/test-layering.md`）。
4. 设计用例矩阵：优先关键链路、异常分支、回归风险高的路径。
5. 实现测试：遵循现有 mock 风格、命名风格、目录风格，避免重造规范。
6. 运行验证：优先跑新增文件，再跑分层脚本，最后视时间跑全量。
7. 输出结果：给出新增测试清单、通过情况、剩余风险与建议。

## Test Layer Rules
- 单元测试（Unit）
  - 目标：验证单个函数/模块/组件局部行为。
  - 特征：依赖大量 mock；不跨真实网络、真实存储、真实路由。
  - 命名：`*.test.ts` / `*.test.tsx`。
- 集成测试（Integration）
  - 目标：验证跨模块协作（页面-状态-服务、路由-组件-请求封装）。
  - 特征：只 mock 外部不可控边界，保留内部真实拼装。
  - 命名：`*.integration.test.ts` / `*.integration.test.tsx`。

## Execution Rules
- 先增量后全量：先跑新增测试文件，再跑分层命令，再跑全量。
- 失败先定位类型：确定是业务回归、测试脆弱、还是异步/定时器泄漏。
- 测试必须可重复：禁止依赖真实时间、随机值、外部网络；必要时固定种子或 fake timers。
- 断言面向行为：优先断言用户可见结果或稳定接口契约，不依赖脆弱实现细节。

## Framework Selection
- Vue：优先 `@vue/test-utils` + `vitest/jest`。
- React：优先 `@testing-library/react` 或 `react-test-renderer`（按现有仓库习惯）。
- React Native：优先 `@testing-library/react-native`，必要时配合 `react-test-renderer`。
- 详细配方和示例见：`references/framework-recipes.md`。

## Output Template
最终输出应包含：
1. 新增/修改测试文件列表与类型（unit/integration）。
2. 覆盖的关键功能点与未覆盖风险点。
3. 执行命令与结果摘要（通过/失败数量）。
4. 若失败：失败原因分类与下一步修复建议。
