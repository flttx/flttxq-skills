# Tencent MyApp (应用宝)

## Common Console Fields (verify against live console)

1. 版本特性说明
- Typical limit seen in console: 500 chars.
- Use concise numbered bullets.

2. 审核备注/登录账号说明
- Some flows support self-registration; some teams still provide test account.
- Keep statement consistent with actual capability.
- Keep note short and reproducible.

## Recommended Tencent Review Notes Pattern

1. Start app and privacy/user agreement consent.
2. Register via mobile + SMS code.
3. Verify cancellation entry and recovery behavior.
4. Clarify SMS verification scope and privacy boundary.
5. Add rate-limit caution for frequent SMS resend.

## Practical Reminder

- If no reviewer account provided, explicitly state "审核员可自行注册体验".
- Confirm SMS channel is available during review window.
