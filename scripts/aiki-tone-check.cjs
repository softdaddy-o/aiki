'use strict';

/**
 * aiki-tone-check.cjs — AIKI 기사 톤 검증 (thin wrapper)
 *
 * 실제 규칙 엔진은 social-posting/lib/tone-rules.js에 있음.
 * 이 파일은 AIKI 프로젝트 내에서 편하게 호출하기 위한 래퍼.
 *
 * Usage:
 *   node aiki-tone-check.cjs                        # 오늘 기사 검증
 *   node aiki-tone-check.cjs --date 2026-04-06      # 특정 날짜 검증
 *   node aiki-tone-check.cjs --file <path>          # 단일 파일 검증
 *
 * Exit codes: 0=PASS, 1=FAIL, 2=없음
 */

const fs = require('fs');
const path = require('path');

// 공유 모듈 로드 (social-posting/lib/tone-rules.js)
const TONE_RULES_PATH = path.resolve(__dirname, '../../../src3/Docs/social-posting/lib/tone-rules.js');
const ALT_PATH = 'F:/src3/Docs/social-posting/lib/tone-rules.js';

let toneRules;
try {
    toneRules = require(TONE_RULES_PATH);
} catch {
    try {
        toneRules = require(ALT_PATH);
    } catch {
        console.error('❌ tone-rules.js를 찾을 수 없음.');
        console.error(`   시도한 경로: ${TONE_RULES_PATH}`);
        console.error(`   대체 경로: ${ALT_PATH}`);
        process.exit(2);
    }
}

const { checkTone, hasFail, printResults } = toneRules;

const CONTENT_DIR = path.resolve(__dirname, '../src/content/news/ko');

// ── 인수 파싱 ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
let dateArg = null;
let fileArg = null;

const dateIdx = args.indexOf('--date');
if (dateIdx >= 0 && args[dateIdx + 1]) dateArg = args[dateIdx + 1];

const fileIdx = args.indexOf('--file');
if (fileIdx >= 0 && args[fileIdx + 1]) fileArg = args[fileIdx + 1];

function kstToday() {
    const n = new Date(Date.now() + 9 * 60 * 60 * 1000);
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
}

const targetDate = dateArg || kstToday();

// ── 본문 추출 ───────────────────────────────────────────────────────────────

function extractBody(content) {
    const fmEnd = content.indexOf('---', content.indexOf('---') + 3);
    if (fmEnd < 0) return content;
    return content.slice(fmEnd + 3).trim();
}

// ── 파일 수집 ───────────────────────────────────────────────────────────────

function getFiles() {
    if (fileArg) {
        const p = path.resolve(fileArg);
        if (!fs.existsSync(p)) {
            console.error(`❌ 파일 없음: ${p}`);
            process.exit(2);
        }
        return [p];
    }
    if (!fs.existsSync(CONTENT_DIR)) {
        console.error(`❌ 콘텐츠 디렉토리 없음: ${CONTENT_DIR}`);
        process.exit(2);
    }
    return fs.readdirSync(CONTENT_DIR)
        .filter(f => f.startsWith(targetDate) && f.endsWith('.md'))
        .sort()
        .map(f => path.join(CONTENT_DIR, f));
}

// ── 메인 ────────────────────────────────────────────────────────────────────

const files = getFiles();
if (files.length === 0) {
    console.error(`❌ ${targetDate} 날짜의 기사 없음`);
    process.exit(2);
}

console.log(`\n🔍 AIKI 톤 검증 — ${targetDate} (${files.length}건)\n`);

let totalFails = 0;
let totalWarns = 0;

for (const filepath of files) {
    const filename = path.basename(filepath);
    const content = fs.readFileSync(filepath, 'utf-8');
    const body = extractBody(content);

    const results = checkTone(body, 'blog');
    const fails = results.filter(r => r.severity === 'FAIL');
    const warns = results.filter(r => r.severity === 'WARN');
    totalFails += fails.length;
    totalWarns += warns.length;

    printResults(filename, results);
}

console.log('─'.repeat(60));
if (totalFails > 0) {
    console.log(`\n❌ FAIL — ${totalFails}건 실패, ${totalWarns}건 경고`);
    console.log('톤 가이드에 맞게 수정 후 재검증하세요.\n');
    process.exit(1);
} else if (totalWarns > 0) {
    console.log(`\n⚠️  WARN — 경고 ${totalWarns}건 (통과는 했지만 개선 권장)\n`);
    process.exit(0);
} else {
    console.log('\n✅ PASS — 모든 기사가 톤 가이드를 준수합니다.\n');
    process.exit(0);
}
