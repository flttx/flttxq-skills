---
name: store-submission-docs-cn
description: Generate and maintain app store submission documentation standards and review-ready copy for Huawei AppGallery, Tencent MyApp, and Apple App Store. Use when the user asks for release notes formatting, review notes, permission descriptions, screenshot guidance, account or deletion flow explanations, or versioned documentation structure for mobile app listing and submission.
---

# Store Submission Docs CN

## Overview

Create consistent, review-ready listing documents for Huawei AppGallery, Tencent MyApp, and Apple App Store.
Use concise Chinese output by default, generate paste-ready text blocks, and keep channel-specific limits and checkpoints explicit.

## Workflow

1. Collect factual changes first.
- Read current version release notes and legal/privacy docs.
- Extract only features that are actually shipped in this version.

2. Pick target stores.
- Huawei AppGallery: read `references/huawei-appgallery.md`.
- Tencent MyApp: read `references/tencent-myapp.md`.
- Apple App Store: read `references/app-store.md`.
- Shared templates: read `references/output-templates.md`.

3. Generate channel-specific deliverables.
- New version highlights (respect channel length limits).
- Review notes (review path, key verification points, risk notes).
- Permission usage descriptions for sensitive permissions.
- Screenshot update guidance.

4. Write versioned docs.
- Prefer `docs/release/vX.Y.Z/` per version.
- Create one file per channel.

5. Run final consistency checks.
- Validate character limits.
- Validate links and path consistency.
- Validate privacy and permission claims against implementation.
- Add SMS risk note when registration/login/recovery uses verification code.

## Output Rules

1. Use Chinese unless the user asks for English copy.
2. Prefer short structured bullets over long paragraphs.
3. For feature highlights, prefer this style:
- `1. [Tag] One clear change sentence.`
4. Keep each section copy-and-paste ready for store console fields.
5. Do not invent capabilities, limits, or compliance claims.

## Channel Selection Guide

- If user asks for Huawei only, produce Huawei content first.
- If user asks for Tencent only, produce Tencent content first.
- If user asks for App Store only, produce Apple content first.
- If user asks for all channels, produce in order: Huawei -> Tencent -> App Store.

## Required Checks Before Finalizing

1. Character limits are within channel constraints.
2. Review path is reproducible end-to-end.
3. Account statement matches reality (self-registration vs provided reviewer account).
4. Include SMS caution when relevant:
- avoid frequent resend in a short time window to reduce upstream rate-limit risk.
5. Screenshot guidance is practical:
- reuse only when current screenshots still match current UI and flow.

## Resources

- Huawei rules and examples: `references/huawei-appgallery.md`
- Tencent rules and examples: `references/tencent-myapp.md`
- App Store rules and examples: `references/app-store.md`
- Ready-to-use templates: `references/output-templates.md`
