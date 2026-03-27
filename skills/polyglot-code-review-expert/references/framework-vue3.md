# Vue 3 审查清单

适用于 Composition API、`<script setup>` 为主的 Vue 3 项目。

## 重点检查

- `ref`、`reactive`、`computed` 的边界是否清晰。
- 是否把大量业务副作用堆在 `watch` / `watchEffect` 中。
- 组合式函数是否真正可复用，还是只是把耦合逻辑挪了位置。
- `props`、`emit`、`v-model` 语义是否稳定。
- 异步请求、路由切换、组件卸载时的竞态处理是否完善。

## 常见误区

- 滥用 `watchEffect`，导致依赖关系不透明。
- 在 composable 中混入页面级副作用。
