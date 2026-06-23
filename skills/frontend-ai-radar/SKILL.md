---
name: frontend-ai-radar
description: Curate high-signal AI builder and frontend engineering content from public sources such as follow-builders, Juejin, Zhihu, X, GitHub, SegmentFault, V2EX, DEV, Reddit, Hacker News, and official frontend blogs. Use when the user wants a frontend technology radar, AI + frontend digest, public-source crawling, GitHub/community monitoring, or Codex-agent-oriented analysis of frontend architecture, engineering management, performance, design systems, WebGL/3D UI, CI, testing, and developer tooling.
---

# Frontend AI Radar

Curate public AI and frontend signals into a Chinese, frontend-first engineering digest. Preserve the `follow-builders` philosophy: follow builders with original opinions and concrete work, not generic influencers.

## Core Workflow

1. **Collect AI builder signals**
   - If `follow-builders` is installed, run its `prepare-digest.js` feed and use it as the AI builder input.
   - If unavailable, collect public AI-builder posts only from accessible public pages and apply the same filtering rules.

2. **Collect frontend signals**
   - Use `references/source-catalog.json` for public source URLs across Juejin, Zhihu, X, GitHub, SegmentFault, V2EX, DEV, Reddit, Hacker News, and official frontend blogs.
   - Prefer public RSS, JSON APIs, topic pages, search pages, and GitHub APIs. Do not require login, bypass paywalls, or scrape private content.
   - For repeated collection, run:

   ```bash
   node scripts/collect_frontend_radar.mjs
   ```

3. **Filter aggressively**
   - Keep original engineering substance: architecture decisions, framework changes, build tooling, testing, CI, performance, design systems, WebGL/Three.js/WebGPU, DX, observability, agent workflows, and repo-scale practices.
   - Skip generic hype, reposts without commentary, course ads, shallow listicles, recruitment posts, personal updates, and engagement bait.
   - Read `references/filtering-rules.md` when the source set is noisy.

4. **Analyze through the user's lens**
   - The reader is a frontend engineer responsible for frontend architecture and frontend engineering management.
   - Explain what each signal means for frontend system design, engineering governance, code quality, repo structure, UI/3D delivery, test strategy, and team workflows.
   - Add Codex agent implications: better task slicing, prompts, review loops, tests, permissions, project memory, source-of-truth docs, and automation opportunities.

## Output Shape

Write in Chinese by default unless the user asks otherwise.

Use this structure:

```text
Frontend AI Radar — YYYY-MM-DD

1. AI Builder Signals
2. Frontend Community Signals
3. GitHub / Tooling Signals
4. Frontend Architecture Implications
5. Codex Agent Takeaways

Sources: include direct links for every included item.
```

Keep the digest compact. Every included item needs:

- direct source link
- why it matters
- frontend architecture / engineering-management implication
- Codex agent implication when relevant

## Source Handling

- Read `references/source-catalog.md` for human source guidance.
- Read `references/source-catalog.json` when using the bundled collector.
- Update the catalog conservatively; prefer stable public pages and feeds.
- If a site blocks public fetches, report it as unavailable and continue with other sources.
- Never invent content from a blocked or empty source.

## Collector Notes

`scripts/collect_frontend_radar.mjs` is a lightweight candidate collector, not a final summarizer. It outputs JSON snapshots and scored candidate items. Use the JSON as evidence, then perform the final selection and analysis yourself.

Useful options:

```bash
node scripts/collect_frontend_radar.mjs --help
node scripts/collect_frontend_radar.mjs --no-follow-builders
node scripts/collect_frontend_radar.mjs --source-file references/source-catalog.json --limit 20
```
