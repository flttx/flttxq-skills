# 跨框架测试配方（Vue / React / React Native）

## 1. 先识别仓库测试栈
- 看 `package.json`：
  - Vue：`vue`, `@vue/test-utils`, `vitest` / `jest`
  - React：`react`, `@testing-library/react`, `react-test-renderer`
  - React Native：`react-native`, `@testing-library/react-native`, `jest-expo`
- 看配置文件：
  - Jest：`jest.config.*`, `jest.setup.*`
  - Vitest：`vitest.config.*`, `setupTests.*`

## 2. Vue 配方
- 单测：
  - 使用 `@vue/test-utils` 的 `mount/shallowMount`。
  - 对 composable、API client、router、pinia store 做 mock。
  - 断言：props -> 渲染；事件 -> emit；方法 -> 状态变化。
- 集成：
  - 用真实 pinia/router（必要时简化配置）验证页面交互链路。
  - 仅 mock HTTP 与外部 SDK。

## 3. React 配方
- 单测：
  - `@testing-library/react` + `screen` + `fireEvent/userEvent`。
  - hook 或工具函数优先直接测，不强制包页面容器。
  - 断言以可见文本、aria、回调调用次数为主。
- 集成：
  - 页面 + store/provider + service 接线一起验证。
  - 保留真实 reducer/store 组合，mock 网络层。

## 4. React Native 配方
- 单测：
  - `@testing-library/react-native`，以 `getByText/getByTestId` 为主。
  - mock `Linking`, `Platform`, 原生权限 API。
- 集成：
  - 页面/容器 + store + service 联测。
  - 对 WebView、原生模块保留壳组件 mock，验证关键 props 与行为回调。

## 5. 推荐断言模式
- AAA（Arrange / Act / Assert）
- 每个用例只覆盖一个“核心行为 + 一个关键结果”
- 异步断言使用 `await waitFor(...)`
- 定时器逻辑使用 fake timers，避免随机失败

## 6. 推荐执行顺序
1. 跑新增用例文件
2. 跑分层命令（unit/integration）
3. 跑全量
4. 失败后按“环境问题 / 逻辑问题 / 用例脆弱”三类归因
