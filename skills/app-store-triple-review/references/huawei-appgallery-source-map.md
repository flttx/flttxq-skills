# 华为应用市场审核规范来源矩阵

## 目的

回答“华为规则很多，当前到底按哪层判定”的问题，避免把流程文档、FAQ、历史公告混作同级强制规则。

## 来源优先级（由高到低）

1. `L1 强制审核规则`：应用市场审核政策与资质要求（决定是否通过）。
2. `L2 提交流程规则`：AppGallery Connect 提审/发布流程（决定材料和提交流程是否有效）。
3. `L3 时效与动态要求`：监管政策与审核策略动态（带生效时间的附加要求）。
4. `L4 辅助说明`：FAQ/清单/培训类文档（解释规则，不替代 L1/L2）。

## 当前采用的核心官方来源

### L1 强制审核规则

1. 应用审核指南（`50104`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/50104
2. 应用资质审核要求（`80301`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/80301
3. 应用侵权投诉处理指引（`50120`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/50120
4. 应用年龄分级标准（`50125`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/50125

### L2 提交流程规则

1. 发布HarmonyOS应用（`agc-help-release-app-0000002271695230`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-help-release-app-0000002271695230
2. 提交审核（`agc-help-release-app-submit-0000002286180890`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-help-release-app-submit-0000002286180890
3. 填写审核信息与联系方式（`agc-help-release-app-reviewinfo-0000002320780365`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-help-release-app-reviewinfo-0000002320780365
4. 配置隐私声明/隐私说明/备案信息  
`agc-help-release-app-privacy-state-0000002278878296`  
`agc-help-release-app-privacy-desc-0000002313477969`  
`agc-help-release-app-record-0000002319594705`
5. 应用素材规范（`agc-help-app-material-requirement-0000001146534651` / `agc-help-app-visual-asset-spec-0000002277607976`）

### L3 时效与动态要求

1. 监管政策与审核策略动态（`news`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/news

### L4 辅助说明

1. 应用审核FAQ（`50106`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/50106
2. 应用资质FAQ（`50111`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/50111
3. 应用审核Checklist（`50170`）  
https://developer.huawei.com/consumer/cn/doc/distribution/app/50170

## 机器可追溯来源（用于校验文档目录）

1. 目录树接口：  
`POST https://svc-drcn.developer.huawei.com/community/servlet/consumer/cn/documentPortal/getCatalogTree`
2. 导航地址接口：  
`POST https://svc-drcn.developer.huawei.com/community/servlet/consumer/cn/documentPortal/getNavigationAddress`
3. 本次采样参数：  
`catalogName=app, objectId=50106, showHide=0, language=cn`

## 当前 skill 与规范映射关系

| skill 检查维度 | 对应规则层 | 主要来源 |
|---|---|---|
| 基础可用性与可复现 | L1 + L2 | `50104` + `agc-help-release-app-reviewinfo-*` + `agc-help-release-app-submit-*` |
| 元数据与素材一致性 | L1 + L2 | `50104-01` + `agc-help-app-material-requirement-*` + `agc-help-app-visual-asset-spec-*` |
| 隐私、权限、账号处理 | L1 + L2 | `50104-07` + `privacy-label` + `agc-help-release-app-privacy-state-*` + `agc-help-release-app-privacy-desc-*` |
| 资质与备案 | L1 + L2 | `50104-10` + `80301` + `50130` + `agc-help-release-app-record-*` |
| 提审流程与驳回处理 | L2 | `agc-help-release-app-guide-*` + `agc-help-release-push-*` |
| 侵权、内容、分级风险 | L1 + L3 | `50120` + `50125` + `news` |

## 使用规则

1. 若 L1 与其他层冲突，以 L1 为准。
2. 若 L3 公告带有明确生效日期，按生效日期执行，并在报告里写明具体日期。
3. 若某结论仅来自 L4，标记为 `PASS_WITH_QUESTIONS`，要求人工二次确认。
4. 若同主题存在 HarmonyOS 3/4 与 5+ 双版本文档，优先采用 HarmonyOS 5+ 路径。

## 当前覆盖边界（需要明确）

1. 游戏、元服务、快应用等专题需追加对应专题规则，不能直接套用“普通应用”结论。
2. 医疗、金融、地图、新闻等高监管行业需叠加专项资质与合规条款。
3. 涉及出海或地区化发布时，需叠加目标地区监管要求后再给最终 PASS。
