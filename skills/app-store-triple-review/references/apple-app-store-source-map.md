# App Store 审核规范来源矩阵

## 目的

回答“App Store 规范很多，当前到底参考哪一层”的问题，避免混用规则。

## 来源优先级（由高到低）

1. `L1 强制规则`：App Review Guidelines（审核是否通过的核心依据）。
2. `L2 提交流程`：App Store Connect 提交与审核流程文档（材料和流程要求）。
3. `L3 时效要求`：Upcoming Requirements / 版本要求（时间窗口与强制升级项）。
4. `L4 辅助说明`：审核 FAQ、状态说明页面（解释规则，不替代 L1）。

## 当前采用的核心官方来源

1. App Review Guidelines（总入口）  
https://developer.apple.com/app-store/review/guidelines/

2. App Review 流程说明  
https://developer.apple.com/distribute/app-review/

3. 提审总览（App Store Connect Help）  
https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/overview-of-submitting-for-review/

4. Platform version information（含 App Review Information）  
https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata/

5. App and submission statuses  
https://developer.apple.com/help/app-store-connect/reference/app-and-submission-statuses

6. App privacy details  
https://developer.apple.com/help/app-store-connect/manage-app-privacy/app-privacy-details/

7. Upcoming Requirements（时效要求入口）  
https://developer.apple.com/news/upcoming-requirements/

## 当前 skill 与规范的映射关系

| skill 检查维度 | 对应规则层 | 主要来源 |
|---|---|---|
| App Completeness | L1 | App Review Guidelines 2.1 |
| Metadata Accuracy | L1 | App Review Guidelines 2.3 |
| Payments | L1 | App Review Guidelines 3.1 |
| Privacy | L1 + L2 | App Review Guidelines 5.1 + App privacy details |
| 提审材料完整性 | L2 | Overview of submitting for review + App Review Information |
| 状态与复审跟踪 | L2/L4 | App and submission statuses + App Review 页面 |
| 截止期与版本门槛 | L3 | Upcoming Requirements |

## 使用规则

1. 若 L1 与其他来源冲突，以 L1 为准。
2. 若 L3 有生效日期要求，按生效日期优先处理。
3. 若仅在 L4 出现、L1/L2 没有对应条款，结论标记为 `PASS_WITH_QUESTIONS`，并要求人工二次确认。

## 当前覆盖边界（需要明确）

当前 skill 默认覆盖通用审核维度。以下专题需要按业务额外补充：

1. 儿童类应用（Kids Category）专项要求。
2. 医疗、金融、加密资产、博彩等高监管品类专项要求。
3. 特定地区支付与外链政策差异。

若命中以上专题，必须追加专题规则后再给最终 PASS 结论。
