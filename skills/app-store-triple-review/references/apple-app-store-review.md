# Apple App Store 审查清单（预审版）

> 本清单按 App Review Guidelines 的常用主线组织，优先覆盖 2.1、2.3、3.1、5.1。  
> 规范来源总表见 `references/apple-app-store-source-map.md`。

## 1. App Completeness（完整性，Guidelines 2.1）

1. 审核可用账号、测试环境、必要权限说明齐全。
2. 核心功能可在审核环境中完整跑通，不依赖不可访问资源。
3. 无明显占位页、空白页、演示残留、按钮无响应等问题。

## 2. Metadata Accuracy（元数据真实性，Guidelines 2.3）

1. 名称、副标题、描述、截图、预览视频与实际功能一致。
2. 不夸大能力，不声明未上线功能。
3. 年龄分级、内容声明与应用实际内容一致。

## 3. Payments（支付，Guidelines 3.1）

1. 数字内容/服务购买路径优先核查 IAP 合规性。
2. 不在 App 内引导使用违规外部支付（按最新规则与地区政策核实）。
3. 订阅条款、自动续费、取消方式描述清晰可见。

## 4. Privacy（隐私，Guidelines 5.1）

1. 隐私政策链接可访问，且与数据收集行为一致。
2. `Info.plist` 中敏感权限描述文案与实际用途一致。
3. 如涉及跟踪，跟踪声明与授权流程一致。

## 5. Safety & Performance（安全与性能，常用关联 2.5）

1. 高频路径无崩溃、无明显卡顿、无严重内存异常。
2. 异常场景（断网、超时、权限拒绝）可恢复。
3. 不暴露调试信息、测试账号、密钥或内部地址。

## 输出建议

每个问题项建议使用：

- `Guideline 维度`（如 Completeness / Metadata / Payments / Privacy）
- `风险描述`
- `证据`
- `风险级别`
- `修复建议`

## 审核结论门槛

1. 任一 P0 => `BLOCKED`
2. 无 P0 但有 P1 => `PASS_WITH_QUESTIONS`
3. 仅 P2/INFO => `PASS`
