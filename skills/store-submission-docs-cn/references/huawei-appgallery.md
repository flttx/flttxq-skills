# Huawei AppGallery

## Common Console Fields (verify against live console)

1. 新版本特性
- Typical limit seen in console: 500 chars.
- Prefer 4 short bullets with `【标签】` style.

2. 审核备注/应用审核信息
- Typical limit seen in console: 300 chars.
- Include reproducible path.
- If self-registration is used, state clearly.

3. 应用隐私权限说明
- Explain each sensitive permission by business necessity.
- Keep wording concrete: trigger time, user impact if denied, data boundaries.

4. 应用介绍截图
- Console commonly asks 3-5 screenshots.
- For phone portrait sets in this project, use 9:16 and 450x800 when required by channel page.
- Refresh screenshots when key flows changed (registration/cancellation/recovery).

## Recommended Huawei Review Notes Pattern

1. Entry and consent check.
2. Registration path and SMS verification.
3. Account cancellation entry and rollback/recovery path.
4. Risk note: avoid frequent SMS resend in short time due upstream rate-limit.
