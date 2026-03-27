---
name: app-store-triple-review
description: 从华为应用市场、腾讯应用宝、Apple App Store 三个审核员视角，对移动应用项目源码与构建产物（APK/AAB/IPA）进行合规审查并输出统一结论。用于“上架前预审”“被拒后复审”“版本迭代合规回归”“权限/隐私/账号流程风险排查”等场景，要求同时给出关键操作记录、平台疑问项、优化建议和最终汇总。
---

# App Store Triple Review

## 总览

执行三端并行审查思路，但输出按平台分区，保证可追溯。  
始终基于“证据优先”：每条结论都绑定到代码路径、配置项、日志或构建产物信息。

## 执行流程

1. 明确审查对象和版本上下文。
- 记录应用名、版本号、构建时间、目标平台、包名/Bundle ID。
- 确认输入是否包含源码、构建包（`*.apk`/`*.aab`/`*.ipa`）、审核材料（隐私政策、测试账号、功能说明）。

2. 先做证据采集，再做合规判定。
- 先采集权限、账号、支付、内容、安全、稳定性证据。
- 再按平台规范做差异化判定，不先入为主下结论。

3. 按平台逐一输出结果。
- 华为应用市场：读取 `references/huawei-appgallery-review.md`
- 腾讯应用宝：读取 `references/tencent-myapp-review.md`
- Apple App Store：读取 `references/apple-app-store-review.md`
- 若用户追问“到底参考了哪份规范”，再读取对应来源矩阵：
  - 华为：`references/huawei-appgallery-source-map.md`
  - 应用宝：`references/tencent-myapp-source-map.md`
  - App Store：`references/apple-app-store-source-map.md`

4. 生成统一报告。
- 使用 `references/report-template.md` 结构输出。
- 任何“通过/不通过/有疑问”必须有证据与建议动作。

## 关键操作输出规则（必须）

每次执行审查，都必须输出 `关键操作记录` 小节，至少包含以下字段：

1. `步骤`：序号 + 动作名称。  
2. `目标`：本步骤验证什么风险。  
3. `操作`：执行的命令、检查动作或阅读的文件。  
4. `证据`：文件路径/日志关键行/截图说明。  
5. `结论`：本步骤发现（通过、疑问、风险）。  

若命令不可执行，必须记录降级动作（例如改为静态文件检查）并标注不确定性来源。

## 审查判定标准

每个平台都使用同一套风险级别，便于汇总：

- `P0`：高概率拒审或下架风险（必须修复后再提审）。
- `P1`：明显合规疑问或高风险缺陷（建议修复后提审）。
- `P2`：可优化项（不一定阻塞提审，但建议修复）。
- `INFO`：信息项，不构成风险。

平台结论使用：

- `PASS`：当前证据下可提审。
- `PASS_WITH_QUESTIONS`：可提审但存在待确认疑问。
- `BLOCKED`：存在 P0，建议暂停提审。

## 平台审查顺序与重点

1. 华为应用市场：
- 优先核查隐私政策可达性、权限最小化、账号注销闭环、内容与功能一致性。

2. 腾讯应用宝：
- 优先核查资质/备案材料一致性、权限申请合理性、诱导行为与广告合规、账号与数据删除承诺一致性。

3. Apple App Store：
- 优先核查 App Completeness、元数据真实性、IAP/外部支付合规、隐私与跟踪声明一致性。

## 官方规范校验要求

平台规则会变更。执行本技能时：

1. 优先查阅官方审核规范最新版本（官方文档、开发者后台说明、审核反馈邮件）。
2. 若无法联网或缺少官方链接，先按本技能 references 做保守审查，并在结论中标注“需二次对照官方最新规则”。
3. 不得把未验证的第三方博客内容当作最终依据。

## 输出要求

最终输出必须按以下顺序：

1. `关键操作记录`
2. `华为应用市场审核结果`
3. `腾讯应用宝审核结果`
4. `Apple App Store 审核结果`
5. `跨平台疑问与优化项汇总`
6. `最终建议（是否提审 + 先修复清单）`

若用户要求“只看某个平台”，仍需保留 `关键操作记录` 和 `最终建议`。

## 脚本化打分与统计（推荐）

当需要快速汇总 P0/P1/P2 和平台状态时，优先使用脚本：

```powershell
python3 .codex/skills/app-store-triple-review/scripts/review_scorecard.py `
  --input .codex/skills/app-store-triple-review/references/review-findings.sample.json `
  --output docs/review/triple-store-scorecard.md
```

脚本输入为 JSON，至少包含：

1. `meta`：应用名、版本、构建号。
2. `operations`：关键操作记录。
3. `findings`：平台、风险级别、类型、证据、建议。

脚本输出包含：

1. 总分与总体风险统计表。
2. 平台状态矩阵（PASS / PASS_WITH_QUESTIONS / BLOCKED）。
3. 疑问项与优化项数量统计。
4. 排序后的风险清单和最终提审建议。

判定规则：

- `P0 > 0` => `BLOCKED`
- `P0 == 0 and P1 > 0` => `PASS_WITH_QUESTIONS`
- `P0 == 0 and P1 == 0` => `PASS`

## 平台规范来源矩阵

当用户问“平台规范很多，当前到底参考了什么”时，必须读取对应来源矩阵：

1. 华为应用市场：`references/huawei-appgallery-source-map.md`
2. 腾讯应用宝：`references/tencent-myapp-source-map.md`
3. Apple App Store：`references/apple-app-store-source-map.md`

三份矩阵统一按 `L1 强制规则 / L2 提交流程 / L3 时效要求 / L4 辅助说明` 分层。

## 常用检查动作（示例）

```powershell
# Android 权限与敏感能力
rg -n "android.permission|uses-permission|QUERY_ALL_PACKAGES|REQUEST_INSTALL_PACKAGES" android .

# iOS 隐私描述与能力开关
rg -n "NSCameraUsageDescription|NSPhotoLibraryUsageDescription|NSLocationWhenInUseUsageDescription|NSUserTrackingUsageDescription" ios .

# 账号注销与隐私入口
rg -n "注销|删除账号|delete account|privacy policy|隐私政策" src ios android .
```

命令仅作示例；实际以项目技术栈和目录结构为准。

## 资源文件

- 打分脚本：`scripts/review_scorecard.py`
- 华为审查清单：`references/huawei-appgallery-review.md`
- 应用宝审查清单：`references/tencent-myapp-review.md`
- App Store 审查清单：`references/apple-app-store-review.md`
- 华为来源矩阵：`references/huawei-appgallery-source-map.md`
- 应用宝来源矩阵：`references/tencent-myapp-source-map.md`
- App Store 来源矩阵：`references/apple-app-store-source-map.md`
- 输出模板：`references/report-template.md`
- 脚本输入样例：`references/review-findings.sample.json`
