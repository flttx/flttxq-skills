# cross-framework-test-suite

## 这个 skill 做什么

它用统一流程给 `Vue`、`React`、`React Native` 项目补测试，重点是：

- 不乱改业务行为
- 尽量遵循现有仓库测试风格
- 区分单元测试和集成测试
- 先补关键链路，再补边界情况

## 适合什么时候用

推荐在这些场景使用：

- 现有模块缺测试，需要补单测
- 页面或业务流需要补集成测试
- 仓库里已有测试规范，想按现有口径继续补
- 多种前端框架并存，想统一测试层级和命名

## 使用前最好准备什么

最好能明确下面的信息：

- 要补测试的模块或文件范围
- 仓库使用的测试框架：Jest / Vitest
- 现有测试目录和命名习惯
- 你更关心的链路：正常流、异常流、边界条件、回归风险

## 怎么使用

推荐直接指出目标模块和你希望补的是哪一层测试。

典型提示词：

```text
用 cross-framework-test-suite 给这个 React 组件补单测，遵循当前仓库的 testing-library 风格。
```

```text
用 cross-framework-test-suite 为这个页面补集成测试，重点覆盖加载失败、重试和空态。
```

```text
用 cross-framework-test-suite 检查这个仓库现有测试规范，然后给 recording 模块补最小必要测试。
```

## 你大概会得到什么

常见输出包括：

- 新增或修改的测试文件列表
- 每个测试属于 `unit` 还是 `integration`
- 覆盖到的功能点
- 实际执行的测试命令与结果
- 还未覆盖的剩余风险

## 适合期待它帮你解决的问题

- “这个模块怎么补测试最合理？”
- “哪些地方应该做单测，哪些更适合集成测试？”
- “不推翻现有测试体系的前提下，怎么补覆盖率？”
- “为什么这段测试容易脆弱或不稳定？”

## 仓库里的补充资源

- [SKILL.md](D:/Projects/flttxq-skills/skills/cross-framework-test-suite/SKILL.md)
- [framework-recipes.md](D:/Projects/flttxq-skills/skills/cross-framework-test-suite/references/framework-recipes.md)
- [test-layering.md](D:/Projects/flttxq-skills/skills/cross-framework-test-suite/references/test-layering.md)

## 注意事项

- 这个 skill 偏“最小侵入补测”，不是为了追求表面覆盖率。
- 如果仓库本身测试基础设施不完整，它通常会先帮你识别约束，再补最小可落地方案。
- 涉及异步、时间、随机值的测试，最好明确要求它做稳定化处理。
