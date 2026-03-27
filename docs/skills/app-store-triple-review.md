# app-store-triple-review

## 这个 skill 做什么

它用三个平台的审核视角，帮你提前发现移动应用上架前的合规风险：

- 华为应用市场
- 腾讯应用宝
- Apple App Store

它不是只给一句“能不能上”，而是会尽量给出：

- 关键检查动作
- 对应证据
- 每个平台的风险等级
- 是否建议继续提审

## 适合什么时候用

推荐在这些场景使用：

- 上架前预审
- 被拒后复审
- 版本迭代后的合规回归检查
- 权限、隐私、账号注销、短信验证码、支付链路风险排查

如果你只有某一个平台要检查，也可以只针对单个平台使用。

## 使用前最好准备什么

至少准备下面的一部分材料，越完整越好：

- 项目源码
- 安装包或构建产物：`APK`、`AAB`、`IPA`
- 包名 / Bundle ID
- 版本号、构建号
- 隐私政策链接或文案
- 测试账号
- 功能说明
- 权限申请说明

## 怎么使用

推荐直接说清楚平台、版本和你要它检查的重点。

典型提示词：

```text
用 app-store-triple-review 审查这个 Android 版本的上架风险，重点看权限、账号注销和隐私政策。
```

```text
用 app-store-triple-review 复审这次 App Store 被拒后的版本，结合源码和审核反馈找出高风险项。
```

```text
用 app-store-triple-review 检查华为、应用宝、Apple 三个平台的提审阻塞项，并给出最终建议。
```

## 你大概会得到什么

比较理想的输出通常包括：

- 关键操作记录
- 华为审核结果
- 腾讯应用宝审核结果
- Apple App Store 审核结果
- 跨平台疑问与优化项汇总
- 最终建议

如果风险较高，输出里通常会带 `P0`、`P1`、`P2` 这类分级。

## 适合期待它帮你解决的问题

- “这个版本现在能不能提审？”
- “为什么这个权限可能被拒？”
- “账号注销链路是否闭环？”
- “隐私政策、权限声明、实际实现有没有打架？”
- “收到拒审后，最该先修哪几项？”

## 仓库里的补充资源

你可以在这些位置看到更细的规则：

- [SKILL.md](D:/Projects/flttxq-skills/skills/app-store-triple-review/SKILL.md)
- [report-template.md](D:/Projects/flttxq-skills/skills/app-store-triple-review/references/report-template.md)
- [review_scorecard.py](D:/Projects/flttxq-skills/skills/app-store-triple-review/scripts/review_scorecard.py)

## 注意事项

- 这个 skill 更偏“审核/合规预审”，不是自动修复器。
- 平台规则会变化，必要时还要再对照最新官方规范。
- 如果输入材料不完整，输出结论会偏保守。
