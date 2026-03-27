---
name: polyglot-code-review-expert
description: 当需要对当前代码改动做通用基线 + 框架专项 + 项目规范感知的代码审查时使用。适用于 React、Vue 2、Vue 3、React Native、Electron、HarmonyOS 等项目，也适用于创建或更新跨项目的 code review 流程。该 skill 会先收敛审查范围，再读取项目内规范文档（如 AGENTS.md、CLAUDE.md、README、docs），最后根据技术栈选择对应清单，并按 Codex、Claude Code、Antigravity 等终端的交互习惯输出问题。
---

# Polyglot Code Review Expert

## 概览

这个 skill 用来把“代码审查”拆成一条稳定可复用的流程：

1. 先确定审查范围与变更证据。
2. 再读取项目中的真实规范文档，形成仓库级约束。
3. 最后按框架选择专项清单，输出带证据、带优先级、带验证建议的结论。

它的目标不是替代你的判断，而是减少遗漏、压低误报，并让不同项目下的 review 口径保持一致。

## 适用场景

在以下场景触发本 skill：

- 用户要求“做 code review / 审查改动 / 检查风险 / 找 bug / 看看这次提交有没有问题”。
- 当前仓库可能属于 `React`、`Vue 2`、`Vue 3`、`React Native`、`Electron`、`HarmonyOS` 中的一种或多种。
- 需要同时考虑通用工程质量与项目内规范文档，而不是只看语法问题。
- 需要根据终端平台调整输出方式，例如 `Codex` 用问题列表，`Claude Code` 适配评论式输出，`Antigravity` 适配更偏摘要/结论式输出。

如果用户只是要“解释代码”“写功能”“修 bug”，且没有明确要求 review，则不要默认触发本 skill。

## 审查工作流

### 第 1 步：收敛审查范围

优先只看本次真实相关的改动，而不是整个仓库。

- 优先读取 `git diff --stat`、`git diff --name-only`、关键变更文件。
- 如果工作区很脏，先区分“本次任务相关改动”和“历史遗留改动”。
- 如果用户已经限定范围，只审指定文件或模块。
- 如果没有 diff，但用户要求 review 某个文件/目录，则以该范围为准。

若需要快速探测仓库规范和技术栈，可运行：

```bash
python3 /path/to/detect_review_context.py .
```

Windows 可替换成：

```powershell
& 'C:\Path\To\python.exe' 'C:\Users\...\polyglot-code-review-expert\scripts\detect_review_context.py' .
```

该脚本会输出候选规范文档、框架线索和建议加载的 reference 文件；脚本不是必需，但在大仓库里很有帮助。

### 第 2 步：读取项目规范

先读项目自己写下来的规则，再做判断。优先级高于通用经验。

优先查找：

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/**`
- `.cursor/rules/**`
- `.github/pull_request_template*`
- 仓库内与架构、验证、发布、测试相关的规范文件

读取策略：

- 只读与本次改动范围相关的文档，不要把整仓库文档一次性全部加载。
- 若规范很多，先用关键词检索：`review`、`lint`、`test`、`architecture`、`startup`、`state`、`security`、`performance`、`theme`、`recording`、`navigation` 等。
- 若规范之间冲突，优先采用更保守、更贴近当前改动目录的规则。

项目规范扫描的具体建议见 `references/project-policy-scan.md`。

### 第 3 步：执行通用基线审查

所有项目都先跑通用基线，再决定是否进入框架专项。通用基线见 `references/common-review-baseline.md`。

至少检查：

- 行为回归：调用时机、状态机分支、接口语义、边界条件是否变化。
- 数据正确性：空值、并发、竞态、缓存、旧响应覆盖新状态。
- 错误处理：异常分支是否可恢复，日志是否足够定位问题。
- 安全与隐私：输入校验、权限边界、凭证暴露、危险默认值。
- 可维护性：命名、职责边界、重复逻辑、超大文件、无效抽象。
- 验证完整性：是否缺少最小必要的 lint / test / build / 手工回归说明。

### 第 4 步：识别框架与运行时

只加载命中的专项清单，不要把所有框架文档都读进来。

框架判断优先看：

- `package.json` 依赖与脚本
- 锁文件
- 目录结构
- 配置文件命名
- 入口文件模式

常见线索：

- `React`：`react`、`react-dom`、`next`、`.tsx`
- `Vue 2`：`vue@2`、`vue-template-compiler`
- `Vue 3`：`vue@3`、`vite`、`<script setup>`
- `React Native`：`react-native`、`expo`、`app.json`、`metro.config.*`
- `Electron`：`electron`、`main.js`、`preload.*`
- `HarmonyOS`：`ohos`、`ets`、`module.json5`

对应专项文档：

- React：`references/framework-react.md`
- Vue 2：`references/framework-vue2.md`
- Vue 3：`references/framework-vue3.md`
- React Native：`references/framework-react-native.md`
- Electron：`references/framework-electron.md`
- HarmonyOS：`references/framework-harmonyos.md`

### 第 5 步：执行框架专项审查

按命中的框架补充专项检查。若一个仓库同时包含多种技术栈，只读与当前改动目录相关的专项文档。

专项检查时要特别注意：

- UI 框架的生命周期、副作用边界、状态来源一致性。
- 原生或桌面端的权限、进程边界、桥接层安全性。
- 移动端的首屏链路、导航、离线恢复、资源释放。
- 平台特定构建配置、发布渠道和环境变量一致性。

### 第 6 步：组织输出

默认先给“发现”，再给“风险边界”，最后给“验证建议”。不要把无问题的概览写得比问题本身还长。

问题项应尽量包含：

- 位置：文件 + 行号或符号名
- 级别：建议使用 `P0` 到 `P3`
- 触发条件：在什么输入、分支、时序或平台下出现
- 影响：用户、数据、稳定性、安全性、发布风险
- 理由：为什么这是问题，而不只是风格偏好
- 建议：最小修复方向或验证方式

如果没有发现问题，也要明确说明“未发现问题”，并补充剩余风险或未验证范围。

## 平台适配

不同终端的输出和交互应略作调整，具体规则见 `references/platform-adapters.md`。

默认原则：

- `Codex`：优先问题列表，简短总结放后面。
- `Claude Code`：问题列表 + 更明确的假设与未验证范围。
- `Antigravity`：先结论摘要，再列关键问题，减少冗长上下文。

无论在哪个平台：

- 不要输出没有证据支撑的猜测性问题。
- 不要把风格偏好伪装成功能缺陷。
- 不要建议与项目规范直接冲突的“最佳实践”。

## 快速决策树

### 用户要求 review 当前改动

1. 看 diff 与范围。
2. 读项目规范文档。
3. 读通用基线。
4. 检测框架。
5. 仅读命中的专项文档。
6. 输出问题、验证缺口、剩余风险。

### 用户要求创建或升级团队的 review 流程

1. 先读 `references/common-review-baseline.md`。
2. 再按目标框架读取相应专项文档。
3. 若要兼容多个终端，再读 `references/platform-adapters.md`。
4. 将项目自定义规则映射为“仓库约束层”。

## 资源使用说明

### `scripts/detect_review_context.py`

用途：

- 快速探测候选规范文档
- 快速识别框架线索
- 给出建议读取的 reference 文件

适合在大型仓库或不熟悉的项目里先跑一遍，避免盲读。

### `references/common-review-baseline.md`

所有 review 的起点。只要进入 review，就应该先读它。

### `references/project-policy-scan.md`

当仓库里存在 `AGENTS.md`、`docs/**`、规则文件或多份内部规范时读取。

### `references/platform-adapters.md`

当你需要把同一份审查逻辑适配到 `Codex`、`Claude Code`、`Antigravity` 等不同终端时读取。

### `references/machine-readable-output.md`

当用户需要 JSON、结构化 findings、审查落库或自动化消费时读取。

### `references/review-output-schema.json`

当需要严格按 JSON 字段输出 review 结果时读取。

### 框架专项 references

只读命中的框架文档：

- `references/framework-react.md`
- `references/framework-vue2.md`
- `references/framework-vue3.md`
- `references/framework-react-native.md`
- `references/framework-electron.md`
- `references/framework-harmonyos.md`

不要无差别全读。

## 可机读输出

当用户要求“结构化输出 / JSON 输出 / 可机读结果 / 接自动化”时：

1. 先读 `references/machine-readable-output.md`。
2. 再按需读 `references/review-output-schema.json`。
3. 优先输出可稳定解析的 JSON 对象。
4. 如果终端不适合只输出 JSON，则先给一段简短摘要，再附 JSON 代码块。

推荐顶层字段：

- `review_scope`
- `summary`
- `findings`
- `validation`
- `assumptions`
- `unreviewed_areas`

字段定义与约束以 `references/machine-readable-output.md` 和 `references/review-output-schema.json` 为准。

## 约束

- 先做证据收集，再做判断。
- 先读项目规范，再套通用经验。
- 先通用基线，再框架专项。
- 审查目标是发现真实风险，不是展示知识广度。
- 若证据不足，明确写“不确定，需要验证”，不要强下结论。
