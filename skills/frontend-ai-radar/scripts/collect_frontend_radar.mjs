#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, isAbsolute, join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = dirname(__dirname);
const DEFAULT_SOURCE_FILE = join(SKILL_DIR, 'references', 'source-catalog.json');

const DEFAULT_KEYWORDS = [
  'frontend', 'front-end', '前端', '架构', '工程化', 'design system', '设计系统',
  'react', 'vue', 'next.js', 'nuxt', 'vite', 'webpack', 'rspack', 'rollup',
  'turbopack', 'typescript', 'javascript', 'css', 'performance', '性能',
  'accessibility', 'a11y', '测试', 'test', 'playwright', 'vitest', 'jest',
  'ci', 'release', 'observability', 'dx', 'monorepo', 'package', 'bundle',
  'three.js', 'threejs', 'webgl', 'webgpu', 'canvas', '3d', '可视化',
  'agent', 'codex', 'claude code', 'ai', 'eval', 'prompt'
];

function usage() {
  console.log(`Usage: node scripts/collect_frontend_radar.mjs [options]

Options:
  --source-file <path>     Source catalog JSON file
  --limit <number>         Max frontend candidate items to output (default: 30)
  --no-follow-builders     Skip installed follow-builders feed collection
  --help                   Show this help

Output:
  JSON with compact follow-builders AI input (if available) plus scored frontend candidates.
`);
}

function parseArgs(argv) {
  const args = {
    sourceFile: DEFAULT_SOURCE_FILE,
    limit: 30,
    includeFollowBuilders: true
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--source-file') {
      args.sourceFile = argv[++i];
    } else if (arg === '--limit') {
      args.limit = Number(argv[++i]);
    } else if (arg === '--no-follow-builders') {
      args.includeFollowBuilders = false;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!Number.isFinite(args.limit) || args.limit < 1) {
    throw new Error('--limit must be a positive number');
  }

  if (!isAbsolute(args.sourceFile)) {
    const fromCwd = join(process.cwd(), args.sourceFile);
    const fromSkill = join(SKILL_DIR, args.sourceFile);
    args.sourceFile = existsSync(fromCwd) ? fromCwd : fromSkill;
  }

  return args;
}

function decodeHtml(text) {
  return String(text || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, '...')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)));
}

function stripTags(input) {
  return decodeHtml(input)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, max = 1200) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max)}...` : clean;
}

function extractTag(text, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = text.match(re);
  return match ? stripTags(match[1]) : '';
}

function extractMetaDescription(html) {
  const match = html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']+)["'][^>]*>/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["'](?:description|og:description)["'][^>]*>/i);
  return match ? decodeHtml(match[1]).trim() : '';
}

function scoreText(text) {
  const lower = String(text || '').toLowerCase();
  const matched = [];
  let score = 0;

  for (const keyword of DEFAULT_KEYWORDS) {
    const needle = keyword.toLowerCase();
    if (lower.includes(needle)) {
      matched.push(keyword);
      score += needle.length > 3 ? 2 : 1;
    }
  }

  return { score, matchedKeywords: matched.slice(0, 12) };
}

function mirrorUrlFor(url) {
  return `https://r.jina.ai/http://${url.replace(/^https?:\/\//i, '')}`;
}

async function fetchText(url) {
  const headers = {
    'user-agent': 'frontend-ai-radar/1.0 (+https://github.com/openai/codex)',
    accept: 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8'
  };

  const attempts = [
    { url, via: 'direct' },
    { url: mirrorUrlFor(url), via: 'text-mirror' }
  ];

  let lastError = '';
  for (const attempt of attempts) {
    try {
      const res = await fetch(attempt.url, {
        headers,
        signal: AbortSignal.timeout(20000)
      });
      const text = await res.text();
      if (res.ok && text.trim().length > 80) {
        return {
          ok: true,
          via: attempt.via,
          status: res.status,
          contentType: res.headers.get('content-type') || '',
          text
        };
      }
      lastError = `HTTP ${res.status}, ${text.length} chars`;
    } catch (error) {
      lastError = error.message;
    }
  }

  return { ok: false, error: lastError };
}

function jsonItems(source, data) {
  if (Array.isArray(data.items)) {
    return data.items.slice(0, 8).map((item) => {
      const text = `${item.full_name || item.name || ''} ${item.description || ''} ${item.html_url || ''}`;
      const scored = scoreText(text);
      return {
        source: source.name,
        sourceUrl: source.url,
        url: item.html_url || item.url || source.url,
        title: item.full_name || item.name || source.name,
        excerpt: truncate(item.description || ''),
        stars: item.stargazers_count,
        updatedAt: item.updated_at,
        score: scored.score,
        matchedKeywords: scored.matchedKeywords
      };
    });
  }

  if (Array.isArray(data.hits)) {
    return data.hits.slice(0, 8).map((hit) => {
      const title = hit.title || hit.story_title || source.name;
      const url = hit.url || hit.story_url || (hit.objectID ? `https://news.ycombinator.com/item?id=${hit.objectID}` : source.url);
      const text = `${title} ${hit.story_text || hit.comment_text || ''}`;
      const scored = scoreText(text);
      return {
        source: source.name,
        sourceUrl: source.url,
        url,
        title,
        excerpt: truncate(stripTags(hit.story_text || hit.comment_text || '')),
        points: hit.points,
        createdAt: hit.created_at,
        score: scored.score,
        matchedKeywords: scored.matchedKeywords
      };
    });
  }

  const text = JSON.stringify(data).slice(0, 5000);
  const scored = scoreText(text);
  return [{
    source: source.name,
    sourceUrl: source.url,
    url: source.url,
    title: source.name,
    excerpt: truncate(text, 1600),
    score: scored.score,
    matchedKeywords: scored.matchedKeywords
  }];
}

function xmlItems(source, xml) {
  const blocks = [
    ...(xml.match(/<item[\s\S]*?<\/item>/gi) || []),
    ...(xml.match(/<entry[\s\S]*?<\/entry>/gi) || [])
  ];

  if (!blocks.length) {
    const text = stripTags(xml);
    const scored = scoreText(text);
    return [{
      source: source.name,
      sourceUrl: source.url,
      url: source.url,
      title: extractTag(xml, 'title') || source.name,
      excerpt: truncate(text, 1800),
      score: scored.score,
      matchedKeywords: scored.matchedKeywords
    }];
  }

  return blocks.slice(0, 8).map((block) => {
    const title = extractTag(block, 'title') || source.name;
    const directLink = extractTag(block, 'link');
    const hrefLink = (block.match(/<link[^>]+href=["']([^"']+)["']/i) || [])[1] || '';
    const url = directLink || hrefLink || source.url;
    const description = extractTag(block, 'description') || extractTag(block, 'summary') || extractTag(block, 'content') || stripTags(block);
    const text = `${title} ${description}`;
    const scored = scoreText(text);
    return {
      source: source.name,
      sourceUrl: source.url,
      url,
      title,
      excerpt: truncate(description),
      score: scored.score,
      matchedKeywords: scored.matchedKeywords
    };
  });
}

function htmlSnapshot(source, html) {
  const title = extractTag(html, 'title') || source.name;
  const desc = extractMetaDescription(html);
  const text = stripTags(html);
  const excerpt = truncate([desc, text].filter(Boolean).join(' '), 2200);
  const scored = scoreText(`${title} ${excerpt}`);
  return [{
    source: source.name,
    sourceUrl: source.url,
    url: source.url,
    title,
    excerpt,
    score: scored.score,
    matchedKeywords: scored.matchedKeywords
  }];
}

function parseSourceItems(source, payload) {
  const text = payload.text;
  const contentType = payload.contentType.toLowerCase();

  if (source.kind === 'json' || contentType.includes('json')) {
    try {
      return jsonItems(source, JSON.parse(text));
    } catch {
      return htmlSnapshot(source, text);
    }
  }

  if (source.kind === 'xml' || contentType.includes('xml') || text.trim().startsWith('<?xml')) {
    return xmlItems(source, text);
  }

  return htmlSnapshot(source, text);
}

function flattenSources(catalog) {
  const sources = [];
  for (const [group, entries] of Object.entries(catalog)) {
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      sources.push({ group, ...entry });
    }
  }
  return sources;
}

async function collectFrontendSources(sourceFile, limit) {
  const raw = await readFile(sourceFile, 'utf8');
  const catalog = JSON.parse(raw);
  const sources = flattenSources(catalog);
  const results = [];
  const errors = [];

  await Promise.all(sources.map(async (source) => {
    const fetched = await fetchText(source.url);
    if (!fetched.ok) {
      errors.push({ source: source.name, url: source.url, error: fetched.error });
      return;
    }
    const items = parseSourceItems(source, fetched).map((item) => ({
      ...item,
      group: source.group,
      fetchedVia: fetched.via
    }));
    results.push(...items);
  }));

  results.sort((a, b) => (b.score || 0) - (a.score || 0));
  return { items: results.slice(0, limit), errors };
}

function compactFollowBuilders(feed) {
  return {
    available: true,
    stats: feed.stats || {},
    x: (feed.x || []).map((builder) => ({
      name: builder.name,
      bio: truncate(builder.bio || '', 260),
      tweets: (builder.tweets || []).slice(0, 3).map((tweet) => ({
        url: tweet.url,
        text: truncate(tweet.text || '', 500)
      }))
    })),
    podcasts: (feed.podcasts || []).map((episode) => ({
      name: episode.name,
      title: episode.title,
      url: episode.url,
      transcriptExcerpt: truncate(episode.transcript || '', 1500),
      transcriptLength: episode.transcript ? episode.transcript.length : 0
    })),
    blogs: (feed.blogs || []).map((post) => ({
      name: post.name,
      title: post.title,
      url: post.url,
      excerpt: truncate(post.text || post.content || post.summary || '', 800)
    })),
    errors: feed.errors || []
  };
}

function collectFollowBuilders() {
  const codexHome = process.env.CODEX_HOME || join(homedir(), '.codex');
  const scriptPath = join(codexHome, 'skills', 'follow-builders', 'scripts', 'prepare-digest.js');
  if (!existsSync(scriptPath)) {
    return { available: false, reason: 'follow-builders skill not found' };
  }

  const attempts = 3;
  let lastFailure = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: dirname(scriptPath),
      encoding: 'utf8',
      timeout: 180000,
      windowsHide: true
    });

    if (result.status === 0 && result.stdout.trim()) {
      try {
        return compactFollowBuilders(JSON.parse(result.stdout));
      } catch (error) {
        lastFailure = `Could not parse follow-builders JSON: ${error.message}`;
      }
    } else {
      lastFailure = truncate(result.stderr || result.stdout || 'follow-builders prepare-digest.js failed', 1000);
    }

    if (attempt < attempts) {
      const delayMs = 1500 * attempt;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delayMs);
    }
  }

  return {
    available: false,
    reason: 'follow-builders prepare-digest.js failed after retries',
    stderr: lastFailure || 'unknown failure'
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }

  const frontend = await collectFrontendSources(args.sourceFile, args.limit);
  const aiBuilders = args.includeFollowBuilders
    ? collectFollowBuilders()
    : { available: false, reason: 'disabled by --no-follow-builders' };

  const output = {
    generatedAt: new Date().toISOString(),
    sourceFile: args.sourceFile,
    aiBuilders,
    frontend,
    instructions: {
      language: 'Chinese by default',
      lens: 'frontend architecture, engineering management, and Codex agent implications',
      reminder: 'Use this JSON as candidate evidence. Filter again before writing the final digest.'
    }
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
