# Source Catalog

Use `source-catalog.json` for machine-readable collection. This file explains source intent and fallback behavior.

## AI Builder Signals

Prefer the installed `follow-builders` skill for AI builder sources. It already tracks builders and podcasts, centralizes source updates, and provides a deterministic feed. This skill adds the frontend architecture and Codex-agent interpretation layer.

If `follow-builders` is unavailable, use public X/search/blog sources only when accessible and apply `filtering-rules.md`.

## Chinese Frontend Communities

- 掘金: use frontend and AI+frontend search pages for Chinese practitioner posts.
- 知乎: use frontend topic/search pages for long-form discussion and opinions.
- SegmentFault: use frontend channel/tag pages for practical Chinese engineering articles.
- V2EX: use JavaScript/frontend-related nodes for practitioner pain points and tooling discussions.

These pages can be dynamic. If direct fetch is weak, use browser tooling or the collector's text-mirror fallback. Do not infer content from an empty page.

## Global Communities

- DEV Community: RSS feeds for `frontend`, `webdev`, `react`, and similar tags.
- Reddit: `r/frontend`, `r/webdev`, and framework subreddits for practitioner discussion.
- Hacker News: Algolia API searches for frontend, WebGPU, design systems, build tools, and agentic coding.

Treat community posts as candidates, not facts. Favor posts with implementation detail, code, benchmarks, or mature tradeoff discussion.

## GitHub Signals

Use GitHub topic/search APIs for repositories related to frontend, Three.js, WebGPU, design systems, testing, and build tools. Prefer:

- recent activity plus meaningful stars
- clear README and releases
- issues/discussions that reveal adoption pain or architectural tradeoffs
- tools that could affect frontend architecture or engineering management

Do not overvalue stars alone.

## Official / Maintainer Sources

Official blogs from web.dev, React, Vue, Chrome Developers, Vercel, Next.js, and similar sources should be treated as high-signal when they describe platform changes, framework changes, or migration paths.

## X / Social Sources

Use X mainly for builder opinions, early signals, and tool announcements. Because X fetchability changes often, always include direct links and skip items that cannot be verified from accessible content.
