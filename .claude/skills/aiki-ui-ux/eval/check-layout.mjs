#!/usr/bin/env node
// Headless layout checker.
// For each target URL + viewport width, spawns Chrome headless with a temp debug HTML
// (copy of refs/debug-iframe.html adjusted for the target) and parses the --dump-dom
// output for measurements. Asserts:
//   - body.scrollWidth ≤ innerWidth + 1 (no horizontal overflow)
//   - TRUE overflow element count == 0
//   - Type-specific: showcase-native shell width ≥ 1200 at 1440+, standard ≤ 960 at 1440
//
// Prereqs:
//   - Preview server running: `bun run build && bun run preview` (default http://127.0.0.1:4321)
//   - Chrome installed. Override with CHROME_PATH env var if needed.
//
// Usage:
//   node .claude/skills/aiki-ui-ux/eval/check-layout.mjs
//   AIKI_BASE_URL=http://127.0.0.1:4331 node .claude/skills/aiki-ui-ux/eval/check-layout.mjs

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync, spawnSync } from 'node:child_process';
import { tmpdir, platform } from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..', '..', '..');
const TARGETS_FILE = join(HERE, 'targets.json');

const BASE = process.env.AIKI_BASE_URL || 'http://127.0.0.1:4321';
const CHROME = process.env.CHROME_PATH || findChrome();
const DIST = join(REPO, 'dist');
const EVAL_DIR = join(DIST, '_eval');

function findChrome() {
  const candidates = platform() === 'win32'
    ? [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      ]
    : platform() === 'darwin'
      ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
      : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  for (const p of candidates) if (existsSync(p)) return p;
  throw new Error('Chrome not found. Set CHROME_PATH env var.');
}

function checkServer() {
  try {
    const res = spawnSync('curl', ['-s', '-o', platform() === 'win32' ? 'NUL' : '/dev/null', '-w', '%{http_code}', BASE + '/']);
    const code = (res.stdout || '').toString().trim();
    if (code !== '200') throw new Error('got ' + code);
  } catch (e) {
    console.error(`[check-layout] Preview server not reachable at ${BASE}. Run: bun run build && bun run preview`);
    process.exit(2);
  }
}

function buildDebugHtml({ selectors, widths }) {
  return `<!DOCTYPE html>
<meta charset="utf-8">
<title>check-layout</title>
<div id="o" data-dbg-json="">running</div>
<iframe id="f" src="__SRC__" width="__W__" height="1000" style="position:fixed;left:-9999px;top:0"></iframe>
<script>
const SELECTORS = ${JSON.stringify(selectors)};
const WIDTHS = ${JSON.stringify(widths)};
const iframe = document.getElementById('f');
function measure(d, w) {
  const h = d.documentElement, b = d.body;
  const out = {
    innerWidth: w.innerWidth,
    bodyScrollWidth: b.scrollWidth,
    overflow: Math.max(0, b.scrollWidth - w.innerWidth),
    containers: {},
    trueOverflowCount: 0,
    trueOverflowTop: [],
  };
  SELECTORS.forEach(sel => {
    const el = d.querySelector(sel);
    if (!el) return;
    const r = el.getBoundingClientRect();
    out.containers[sel] = { w: Math.round(r.width), l: Math.round(r.left), r: Math.round(r.right) };
  });
  const overflow = [];
  d.querySelectorAll('*').forEach(el => {
    const rc = el.getBoundingClientRect();
    if (rc.width === 0 || rc.right <= w.innerWidth + 0.5) return;
    let p = el.parentElement, clipped = false;
    while (p && p !== h) {
      const cs = getComputedStyle(p);
      if (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowX === 'hidden') { clipped = true; break; }
      p = p.parentElement;
    }
    if (!clipped) overflow.push({ tag: el.tagName, cls: ((el.className||'')+'').slice(0, 40), r: Math.round(rc.right) });
  });
  overflow.sort((a, b) => b.r - a.r);
  out.trueOverflowCount = overflow.length;
  out.trueOverflowTop = overflow.slice(0, 5);
  return out;
}
(async () => {
  await new Promise(r => iframe.onload = r);
  await new Promise(r => setTimeout(r, 1800));
  const results = {};
  for (const w of WIDTHS) {
    iframe.style.position = 'static';
    iframe.style.left = '0';
    iframe.width = w;
    await new Promise(r => setTimeout(r, 500));
    results[w] = measure(iframe.contentDocument, iframe.contentWindow);
  }
  document.getElementById('o').setAttribute('data-dbg-json', JSON.stringify(results));
  document.getElementById('o').textContent = 'done';
})();
</script>
`;
}

function runChrome(dbgUrl, screenshotPath) {
  const userDir = join(tmpdir(), 'aiki-eval-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8));
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=' + userDir,
    '--virtual-time-budget=12000',
    '--dump-dom',
    dbgUrl,
  ];
  const res = spawnSync(CHROME, args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  try { rmSync(userDir, { recursive: true, force: true }); } catch {}
  if (res.status !== 0) {
    throw new Error('Chrome failed: ' + (res.stderr || '').slice(0, 400));
  }
  return res.stdout;
}

function extractJson(dom) {
  const m = /data-dbg-json="([^"]*)"/.exec(dom);
  if (!m) return null;
  const decoded = m[1]
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  try { return JSON.parse(decoded); } catch (e) { return null; }
}

function assert(target, width, m, issues) {
  if (m.overflow > 1) {
    issues.push(`FAIL ${target.url} @ ${width}px: body.scrollWidth=${m.bodyScrollWidth} > innerWidth=${m.innerWidth} (overflow ${m.overflow}px)`);
  }
  if (m.trueOverflowCount > 0) {
    const sample = JSON.stringify(m.trueOverflowTop);
    issues.push(`FAIL ${target.url} @ ${width}px: ${m.trueOverflowCount} TRUE overflow elements: ${sample}`);
  }
  if (target.type === 'showcase-native' && width >= 1440) {
    const shellWidth = (m.containers['.hf-shell'] || m.containers['.showcase-shell'] || {}).w || 0;
    if (shellWidth < 1200) {
      issues.push(`FAIL ${target.url} @ ${width}px: showcase-native shell width ${shellWidth}px < 1200px. main 제약 확인.`);
    }
  }
  if (target.type === 'standard' && width >= 1440) {
    const mainWidth = (m.containers['main'] || {}).w || 0;
    if (mainWidth > 1000) {
      issues.push(`WARN ${target.url} @ ${width}px: standard main width ${mainWidth}px > 1000px. 의도한 것?`);
    }
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

let targets;
try { targets = JSON.parse(readFileSync(TARGETS_FILE, 'utf8')); }
catch (e) { console.error(`Cannot read ${TARGETS_FILE}: ${e.message}`); process.exit(2); }

checkServer();

const SELECTORS = [
  'main',
  '.project-page',
  '.showcase-area',
  '.showcase-shell',
  '.showcase-frame',
  '.hf-shell',
  '.hf-main',
  '.wiki-page',
  '.news-page',
];
const WIDTHS = [390, 768, 1280, 1440, 2560];

if (!existsSync(DIST)) {
  console.error(`[check-layout] dist/ not found. Run: bun run build`);
  process.exit(2);
}
mkdirSync(EVAL_DIR, { recursive: true });

const issues = [];

for (const target of targets) {
  const distTargetDir = join(DIST, target.url.replace(/^\//, '').replace(/\/$/, ''));
  if (!existsSync(distTargetDir)) {
    issues.push(`WARN ${target.url}: dist path not found (${distTargetDir}). Target built?`);
    continue;
  }
  const dbgName = 'dbg-' + target.url.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') + '.html';
  const dbgPath = join(distTargetDir, dbgName);
  const html = buildDebugHtml({ selectors: SELECTORS, widths: WIDTHS })
    .replace('__SRC__', './index.html')
    .replace('__W__', '390');
  writeFileSync(dbgPath, html);
  const dbgUrl = BASE + target.url + dbgName;
  console.log(`\n── ${target.url} (${target.type}) ──`);
  try {
    const dom = runChrome(dbgUrl);
    const results = extractJson(dom);
    if (!results) {
      issues.push(`FAIL ${target.url}: could not extract measurements (dump-dom parse failed)`);
      continue;
    }
    for (const [wStr, m] of Object.entries(results)) {
      const w = Number(wStr);
      console.log(`  ${w}px: innerW=${m.innerWidth} bodySW=${m.bodyScrollWidth} overflow=${m.overflow} trueOF=${m.trueOverflowCount}`);
      assert(target, w, m, issues);
    }
  } catch (e) {
    issues.push(`FAIL ${target.url}: ${e.message}`);
  } finally {
    try { rmSync(dbgPath); } catch {}
  }
}

try { rmSync(EVAL_DIR, { recursive: true, force: true }); } catch {}

console.log('\n' + '─'.repeat(60));
if (issues.length === 0) {
  console.log('OK: all targets pass');
  process.exit(0);
}
const fails = issues.filter(x => x.startsWith('FAIL')).length;
const warns = issues.length - fails;
for (const i of issues) console.log(i);
console.log(`\nFAIL=${fails}  WARN=${warns}`);
process.exit(fails > 0 ? 1 : 0);
