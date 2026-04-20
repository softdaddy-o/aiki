#!/usr/bin/env node
// Static source checker for aiki UI/UX rules.
// Usage: node .claude/skills/aiki-ui-ux/eval/check-source.mjs
// Exit 0 if no FAIL. Exit 1 if any FAIL. WARN/INFO do not fail the process.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(fileURLToPath(import.meta.url), '..', '..', '..', '..', '..');

const SCAN_ROOTS = [
  join(REPO, 'src', 'pages'),
  join(REPO, 'src', 'layouts'),
  join(REPO, 'src', 'components'),
];

const EXT = new Set(['.astro', '.tsx', '.jsx', '.ts', '.css', '.scss']);

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else {
      const dot = name.lastIndexOf('.');
      const ext = dot >= 0 ? name.slice(dot) : '';
      if (EXT.has(ext)) out.push(full);
    }
  }
  return out;
}

const findings = []; // {level: 'FAIL'|'WARN'|'INFO', rule, file, line, msg}

function record(level, rule, file, line, msg) {
  findings.push({ level, rule, file: relative(REPO, file).split(sep).join('/'), line, msg });
}

// ── rules ────────────────────────────────────────────────────────────────────

// R1: grid-template-columns: 1fr without minmax
// matches bare `1fr` as single or in repeat(N, 1fr) without minmax wrapper
function checkBareGridTrack(file, src) {
  // scan by line so we can report accurately
  const lines = src.split('\n');
  const re = /grid-template-columns\s*:\s*([^;]+);?/g;
  lines.forEach((line, i) => {
    let m;
    while ((m = re.exec(line)) !== null) {
      const val = m[1].trim();
      // allow: grid, none, subgrid, auto-*
      if (/^(none|subgrid|auto-)/.test(val)) continue;
      // Extract tokens. Flag if any token is bare `1fr` (without minmax wrapping it).
      // Approach: strip minmax(...) groups, then look for `1fr` tokens.
      const stripped = val.replace(/minmax\([^)]*\)/g, 'MINMAX')
                          .replace(/repeat\(([^,]+),\s*([^)]+)\)/g, '$2');
      if (/\b1fr\b/.test(stripped)) {
        record('WARN', 'R1-bare-1fr', file, i + 1,
          `grid-template-columns 에 맨손 1fr 사용: "${val}". minmax(0, 1fr) 로 바꿔.`);
      }
    }
  });
}

// R2: <pre> or <code> in showcase CSS without max-width/overflow guard
// Heuristic: CSS rules containing `pre`/`code` selectors without max-width:100% in same block.
function checkPreCodeGuard(file, src) {
  // find blocks like `... pre ... { ... }` or `.x code { ... }`
  const blockRe = /(^|[{}\s,])([^{}]*\b(pre|code)\b[^{}]*)\{([^}]*)\}/g;
  let m;
  while ((m = blockRe.exec(src)) !== null) {
    const selector = m[2].trim();
    const body = m[4];
    // skip selectors that are NOT a CSS rule (likely matched in JSX/prose text)
    if (/[<>$`]/.test(selector)) continue;
    if (!/\bpre\b|\bcode\b/.test(selector)) continue;
    if (/max-width\s*:\s*100%/.test(body)) continue;
    if (/max-width\s*:\s*none/.test(body)) continue;
    // skip if no relevant properties at all (probably unrelated)
    if (body.trim().length < 5) continue;
    const lineIdx = src.slice(0, m.index).split('\n').length;
    record('INFO', 'R2-pre-code-guard', file, lineIdx,
      `pre/code 규칙에 max-width:100% 가 없음. 긴 스니펫이 카드 폭을 밀어낼 수 있음: "${selector.slice(0, 80)}"`);
  }
}

// R3: Hero clamp with upper bound > 7rem
function checkHeroClamp(file, src) {
  const lines = src.split('\n');
  const re = /clamp\(\s*([\d.]+)rem\s*,\s*[^,]+,\s*([\d.]+)rem\s*\)/g;
  lines.forEach((line, i) => {
    // only care about font-size clamps for hero/title/h1
    if (!/font-size/.test(line) && !/h1\b|hero|title/i.test(line)) return;
    let m;
    while ((m = re.exec(line)) !== null) {
      const upper = parseFloat(m[2]);
      if (upper > 7) {
        record('WARN', 'R3-hero-clamp', file, i + 1,
          `hero font clamp 상한 ${upper}rem (>7). 1280~1440 뷰포트에서 컬럼 침범 위험.`);
      }
    }
  });
}

// R4: Inline FactCheck reconstructions (class names like hf-fact-, news-fact-, etc.)
// False-positive guards:
//   - wrapper classes (`*-fact-wrap`, `*-fact-wrapper`, `*-fact-container`, `*-fact-section`) are fine — they just wrap the shared component.
//   - if the file actually imports or renders `<FactCheck`, trust it and skip (project uses the shared component).
function checkInlineFactCheck(file, src) {
  if (file.endsWith('FactCheck.astro')) return;
  if (/<FactCheck\b/.test(src) || /from\s+['"][^'"]*FactCheck/.test(src)) return;
  const lines = src.split('\n');
  const re = /\b(?:hf|news|wiki|project)-fact(?:-[\w-]+)?\b/g;
  const wrapperSuffix = /-(?:wrap|wrapper|container|section|box|slot)\b/;
  lines.forEach((line, i) => {
    const hit = line.match(re);
    if (!hit) return;
    // if every hit on this line is a wrapper suffix, skip
    if (hit.every(h => wrapperSuffix.test(h))) return;
    record('FAIL', 'R4-inline-factcheck', file, i + 1,
      `인라인 FactCheck 재구현 의심. 공유 <FactCheck> 컴포넌트 사용.`);
  });
}

// R5: main { max-width: ... } outside BaseLayout
function checkMainMaxWidth(file, src) {
  if (file.endsWith('BaseLayout.astro')) return;
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    if (/^\s*main\s*\{/.test(line) || /^\s*main\s*\{[^}]*max-width/.test(line)) {
      // cheap check: if this is a CSS rule scoping `main` directly (not a selector chain),
      // and sets max-width, flag.
      const blockStart = src.indexOf('{', src.split('\n', i + 1).join('\n').lastIndexOf('main'));
      if (blockStart < 0) return;
      const blockEnd = src.indexOf('}', blockStart);
      if (blockEnd < 0) return;
      const body = src.slice(blockStart, blockEnd);
      if (/max-width\s*:/.test(body)) {
        record('WARN', 'R5-main-maxwidth', file, i + 1,
          `BaseLayout 밖에서 main { max-width } 수정. 전 페이지에 영향. BaseLayout 에서 :has() override 패턴을 쓰는 게 맞음.`);
      }
    }
  });
}

// R6: showcase-native page must have :has(.project-page--showcase-native) override in BaseLayout
function checkBaseLayoutHasOverride() {
  const base = join(REPO, 'src', 'layouts', 'BaseLayout.astro');
  let src;
  try { src = readFileSync(base, 'utf8'); } catch { return; }
  if (!/:has\(\.project-page--showcase-native\)/.test(src)) {
    record('FAIL', 'R6-baselayout-has', base, 1,
      `BaseLayout 에 main:has(.project-page--showcase-native) override 누락. showcase-native 쉘이 960px 로 잡힘.`);
  }
}

// R7: backdrop-filter on an element that hosts a position:fixed descendant (heuristic)
// very weak check: just flag .hf-shell-like rules that set backdrop-filter to something other than none
function checkBackdropFilter(file, src) {
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    const m = /backdrop-filter\s*:\s*([^;]+);?/.exec(line);
    if (!m) return;
    const val = m[1].trim();
    if (val === 'none') return;
    // flag only if file is a showcase scope; cheap heuristic: file path contains 'showcase' or 'project'
    if (!/showcase|project/i.test(file)) return;
    record('INFO', 'R7-backdrop-filter', file, i + 1,
      `backdrop-filter: ${val}. floating/fixed 자식이 있다면 containing block 이 바뀌어 위치 어긋남. 해당 요소라면 none 으로.`);
  });
}

// R8: Project showcase must be showcase-native (SKILL.md §2.0 / §2.10).
//     Check the project [...slug].astro for any `showcaseComponent === 'X'` branch whose slug
//     is not in the showcase-native set (derived from the same file's `usesShowcaseNarrative` gate).
function checkProjectShowcaseNative(file, src) {
  if (!file.endsWith(join('pages', 'ko', 'projects', '[...slug].astro'))
      && !/projects[\/\\]\[\.\.\.slug\]\.astro$/.test(file)) return;
  // find branches like `showcaseComponent === 'xyz'`
  const branchRe = /showcaseComponent\s*===\s*['"]([^'"]+)['"]/g;
  const branches = new Set();
  let m;
  while ((m = branchRe.exec(src)) !== null) branches.add(m[1]);
  if (branches.size === 0) return;
  // find the showcase-native set: either `showcaseComponent === 'hyperframes'` line assigned to
  // usesShowcaseNarrative, or a `SHOWCASE_NATIVE = new Set([...])` pattern.
  const singleRe = /usesShowcaseNarrative\s*=\s*showcaseComponent\s*===\s*['"]([^'"]+)['"]/;
  const setRe = /SHOWCASE_NATIVE\s*=\s*new\s+Set\(\[([^\]]+)\]\)/;
  const nativeSet = new Set();
  const s1 = singleRe.exec(src);
  if (s1) nativeSet.add(s1[1]);
  const s2 = setRe.exec(src);
  if (s2) {
    for (const tok of s2[1].split(',')) {
      const clean = tok.trim().replace(/^['"]|['"]$/g, '');
      if (clean) nativeSet.add(clean);
    }
  }
  for (const slug of branches) {
    if (nativeSet.has(slug)) continue;
    record('FAIL', 'R8-project-not-native', file, 1,
      `Project showcase "${slug}" 이(가) showcase-native set 에 없음. SKILL.md §2.0 — 모든 project 는 showcase-native. §2.10 의 usesShowcaseNarrative gate 에 추가하거나 legacy 를 승격.`);
  }
}

// R9: project page must not render <Content /> in a project-explainer/prose section (SKILL.md §2.7 no-prose).
function checkProjectNoProse(file, src) {
  if (!/projects[\/\\]\[\.\.\.slug\]\.astro$/.test(file)) return;
  // Look for `project-explainer` class and `<Content />` tag existing together.
  const hasExplainer = /project-explainer/.test(src);
  const hasContent = /<Content\s*\/>/.test(src);
  if (hasExplainer && hasContent) {
    // locate the first project-explainer line
    const idx = src.indexOf('project-explainer');
    const line = src.slice(0, idx).split('\n').length;
    record('WARN', 'R9-project-prose-legacy', file, line,
      `project-explainer + <Content /> 결합은 legacy 산문 분기. SKILL.md §2.7 / §2.9 — 신규/승격 페이지는 Panel 로 분해. 현재 남은 레거시 페이지 지원 중에는 WARN 으로만 둠.`);
  }
}

// R10: every project showcase component must expose at least one TermHint.
// Applies only to src/components/projects/showcases/*/index.tsx.
function checkShowcaseTermHint(file, src) {
  if (!/src[\/\\]components[\/\\]projects[\/\\]showcases[\/\\][^\/\\]+[\/\\]index\.tsx$/.test(file)) return;
  if (!/<TermHint\b/.test(src)) {
    record('FAIL', 'R10-showcase-termhint', file, 1,
      `showcase component ??TermHint 媛 ?놁쓬. 紐⑤뱺 project ?섏씠吏??理쒖냼 ??媛쒖쓽 ?⑹뼱 ?ㅻ챸 ?대┰???덉뼱?덉빞 ??`);
  }
}

// R11: every project showcase component must expose a hero intro section in nav.
function checkShowcaseIntroSection(file, src) {
  if (!/src[\/\\]components[\/\\]projects[\/\\]showcases[\/\\][^\/\\]+[\/\\]index\.tsx$/.test(file)) return;
  const hasHeroNav = /label:\s*['"]소개['"]/.test(src);
  const hasHeroSection = /SECTION_PREFIX\}hero/.test(src);
  if (!hasHeroNav || !hasHeroSection) {
    record('FAIL', 'R11-showcase-intro-section', file, 1,
      `showcase-native ??HyperFrames 湲곗??쇰줈 nav 泥?섏뀡 '??뚭컻' ??id={\`\${SECTION_PREFIX}hero\`} ?ㅻⅨ ?뚭컻 援ъ뿭???꾩닔??`);
  }
}

// ── run ──────────────────────────────────────────────────────────────────────

function checkShowcaseHeroContractLegacy(file, src) {
  if (!/src[\/\\]components[\/\\]projects[\/\\]showcases[\/\\][^\/\\]+[\/\\]index\.tsx$/.test(file)) return;
  const hasBadge = /Interactive Showcase/.test(src);
  const hasH1 = /<h1\b/.test(src);
  const hasMetaGrid = /className=\{?["'`][^"'`]*meta-grid/.test(src);
  const hasTagRow = /className=\{?["'`][^"'`]*tag-row/.test(src);
  if (!hasBadge || !hasH1 || !hasMetaGrid || !hasTagRow) {
    record('FAIL', 'R12-showcase-hero-contract', file, 1,
      'showcase-native hero는 HyperFrames 계약을 따라야 함: `Interactive Showcase` badge + big h1 + meta-grid + tag-row.');
  }
}

function checkShowcaseHeroContract(file, src) {
  if (!/src[\/\\]components[\/\\]projects[\/\\]showcases[\/\\][^\/\\]+[\/\\]index\.tsx$/.test(file)) return;
  const usesMetaHero = /<ShowcaseMetaHero\b/.test(src);
  const leaksReadingMode = /MetaCard label=.*읽는 방식/.test(src);
  if (!usesMetaHero || leaksReadingMode) {
    record('FAIL', 'R12-showcase-hero-contract', file, 1,
      'showcase-native hero는 <ShowcaseMetaHero>를 쓰고, hero 메타에는 reading mode 같은 showcase 세부를 넣지 않는다.');
  }
}

const files = SCAN_ROOTS.flatMap(root => walk(root));

for (const f of files) {
  let src;
  try { src = readFileSync(f, 'utf8'); } catch { continue; }
  checkBareGridTrack(f, src);
  checkPreCodeGuard(f, src);
  checkHeroClamp(f, src);
  checkInlineFactCheck(f, src);
  checkMainMaxWidth(f, src);
  checkBackdropFilter(f, src);
  checkProjectShowcaseNative(f, src);
  checkProjectNoProse(f, src);
  checkShowcaseTermHint(f, src);
  checkShowcaseIntroSection(f, src);
  checkShowcaseHeroContract(f, src);
}
checkBaseLayoutHasOverride();

// ── report ───────────────────────────────────────────────────────────────────

const byLevel = { FAIL: [], WARN: [], INFO: [] };
findings.forEach(f => byLevel[f.level].push(f));

const COLOR = { FAIL: '\x1b[31m', WARN: '\x1b[33m', INFO: '\x1b[36m', RESET: '\x1b[0m' };
const noColor = process.env.NO_COLOR || !process.stdout.isTTY;
function c(level, s) { return noColor ? s : `${COLOR[level]}${s}${COLOR.RESET}`; }

for (const level of ['FAIL', 'WARN', 'INFO']) {
  if (byLevel[level].length === 0) continue;
  console.log(`\n${c(level, `── ${level} (${byLevel[level].length}) ──`)}`);
  for (const f of byLevel[level]) {
    console.log(`${c(level, level)}  ${f.rule}  ${f.file}:${f.line}`);
    console.log(`        ${f.msg}`);
  }
}

console.log(`\nScanned ${files.length} files.`);
console.log(`FAIL=${byLevel.FAIL.length}  WARN=${byLevel.WARN.length}  INFO=${byLevel.INFO.length}`);

if (byLevel.FAIL.length > 0) {
  process.exit(1);
}
