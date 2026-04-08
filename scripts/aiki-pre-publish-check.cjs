#!/usr/bin/env node
/**
 * aiki-pre-publish-check.cjs
 *
 * Enforced pre-publish validation for AIKI articles.
 * Blocks git push if violations are found.
 *
 * Checks:
 *   1. No article with factCheck.status: pending (unless draft: true)
 *   2. No published article with score: 0 or missing score
 *   3. Filename date matches frontmatter date (non-backfill only)
 *   4. No future dates on non-backfill articles
 *   5. Required frontmatter fields present
 *
 * Usage:
 *   node scripts/aiki-pre-publish-check.cjs
 *   node scripts/aiki-pre-publish-check.cjs --date 2026-04-07   # check specific date only
 *   node scripts/aiki-pre-publish-check.cjs --all               # check all articles
 */

const fs = require('fs');
const path = require('path');
const {
    isClearlyOffTopic,
} = require('./lib/scoring.cjs');

const CONTENT_DIR = path.join(__dirname, '../src/content/news/ko');
const REQUIRED_FIELDS = ['title', 'date', 'lang', 'category', 'summary', 'sourceUrl', 'sourceTitle'];

// Parse CLI args
const args = process.argv.slice(2);
const dateFilter = args.includes('--date') ? args[args.indexOf('--date') + 1] : null;
const checkAll = args.includes('--all');

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;
    const yaml = match[1];
    const result = {};

    // Simple YAML parser for our known fields
    const lines = yaml.split('\n');
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
        if (!kv) { i++; continue; }
        const key = kv[1];
        let val = kv[2].trim();

        // Handle nested object (factCheck)
        if (val === '' && i + 1 < lines.length && lines[i + 1].startsWith('  ')) {
            const obj = {};
            i++;
            while (i < lines.length && lines[i].startsWith('  ')) {
                const nested = lines[i].trim().match(/^(\w[\w-]*):\s*(.*)$/);
                if (nested) obj[nested[1]] = nested[2].trim().replace(/^["']|["']$/g, '');
                i++;
            }
            result[key] = obj;
            continue;
        }

        // Boolean
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        // Number
        else if (/^\d+$/.test(val)) val = parseInt(val, 10);
        // Strip quotes
        else val = val.replace(/^["']|["']$/g, '');

        result[key] = val;
        i++;
    }
    return result;
}

function getFilesToCheck() {
    const all = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

    if (dateFilter) {
        return all.filter(f => f.startsWith(dateFilter));
    }

    if (checkAll) {
        return all;
    }

    // Default: only check today's files (based on git staged or today's date)
    const today = (() => {
        const n = new Date();
        return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
    })();
    return all.filter(f => f.startsWith(today));
}

function extractDateFromFilename(filename) {
    const m = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : null;
}

function extractFrontmatterDate(dateStr) {
    if (!dateStr) return null;
    return dateStr.substring(0, 10);
}

function extractBody(content) {
    const match = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)$/);
    return match ? match[1] : '';
}

function normalizeComparableText(text) {
    return String(text || '')
        .replace(/\s+/g, ' ')
        .replace(/[.!?]+$/g, '')
        .trim()
        .toLowerCase();
}

function extractFirstSentence(body) {
    const compact = String(body || '').replace(/\s+/g, ' ').trim();
    if (!compact) return '';

    const parts = compact.split(/(?<=[.!?])\s+/);
    return (parts[0] || compact).trim();
}

let errors = [];
let warnings = [];
let checked = 0;

const files = getFilesToCheck();

if (files.length === 0) {
    console.log('✅ aiki-pre-publish-check: no articles to check');
    process.exit(0);
}

for (const filename of files) {
    const filepath = path.join(CONTENT_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf8');
    const fm = parseFrontmatter(content);

    if (!fm) {
        errors.push(`${filename}: frontmatter 파싱 실패`);
        continue;
    }

    checked++;

    // Skip draft articles for most checks
    const isDraft = fm.draft === true;
    const isBackfill = fm.backfilled === true;

    // CHECK 1: Required fields
    for (const field of REQUIRED_FIELDS) {
        if (!fm[field]) {
            errors.push(`${filename}: 필수 필드 누락 — ${field}`);
        }
    }

    // CHECK 2: factCheck.status must not be pending for published articles
    if (!isDraft) {
        const fcStatus = fm.factCheck && fm.factCheck.status;
        if (!fcStatus || fcStatus === 'pending') {
            errors.push(`${filename}: 팩트체크 미완료 (status: ${fcStatus || 'missing'}) — draft: true로 변경하거나 팩트체크 완료 필요`);
        }
    }

    // CHECK 3: Score must be > 0 for published articles
    if (!isDraft) {
        const score = fm.score;
        if (score === undefined || score === null || score === 0 || score === '') {
            errors.push(`${filename}: 점수(score) 없음 — 발행 전 score 입력 필요 (1-100)`);
        }
    }

    // CHECK 4: Filename date must match frontmatter date (non-backfill only)
    if (!isBackfill) {
        const filenameDate = extractDateFromFilename(filename);
        const fmDate = extractFrontmatterDate(fm.date);
        if (filenameDate && fmDate && filenameDate !== fmDate) {
            errors.push(`${filename}: 날짜 불일치 — 파일명 날짜(${filenameDate}) ≠ frontmatter date(${fmDate})`);
        }
    }

    // CHECK 5: No future dates on non-backfill articles
    if (!isBackfill && fm.date) {
        const today = (() => {
            const n = new Date();
            return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
        })();
        const articleDate = fm.date.substring(0, 10);
        if (articleDate > today) {
            warnings.push(`${filename}: 미래 날짜 (${articleDate}) — backfill이 아닌데 오늘(${today})보다 미래`);
        }
    }

    // CHECK 6: score below minimum threshold warning
    if (!isDraft && fm.score && fm.score < 40) {
        warnings.push(`${filename}: 점수 낮음 (${fm.score}) — 발행 기준 40 이상 권장`);
    }

    // CHECK 7: obvious off-scope block
    if (!isDraft) {
        const body = extractBody(content).toLowerCase();
        const sourceUrl = String(fm.sourceUrl || '').toLowerCase();
        const signalText = `${String(fm.title || '').toLowerCase()} ${String(fm.summary || '').toLowerCase()} ${body}`;

        if (isClearlyOffTopic(signalText, sourceUrl)) {
            errors.push(`${filename}: AIKI 범위를 벗어난 기사로 보임 — 오프토픽 키워드 감지`);
        }
    }

    // CHECK 8: title must not collapse into summary/body sentence
    if (!isDraft) {
        const body = extractBody(content);
        const normalizedTitle = normalizeComparableText(fm.title);
        const normalizedSummary = normalizeComparableText(fm.summary);
        const normalizedFirstSentence = normalizeComparableText(extractFirstSentence(body));

        if (normalizedTitle && normalizedTitle === normalizedSummary) {
            errors.push(`${filename}: title matches summary exactly`);
        }

        if (normalizedTitle && normalizedTitle === normalizedFirstSentence) {
            errors.push(`${filename}: title matches first sentence exactly`);
        }
    }
}

// Report
console.log(`\n📋 aiki-pre-publish-check — ${checked}개 기사 검사\n`);

if (errors.length > 0) {
    console.log(`❌ ERROR (${errors.length}건) — 발행 불가:`);
    errors.forEach(e => console.log(`   • ${e}`));
}

if (warnings.length > 0) {
    console.log(`\n⚠️  WARNING (${warnings.length}건):`);
    warnings.forEach(w => console.log(`   • ${w}`));
}

if (errors.length === 0 && warnings.length === 0) {
    console.log(`✅ 모든 검사 통과 — 발행 준비 완료`);
}

if (errors.length > 0) {
    console.log(`\n🚫 ${errors.length}개 오류 해결 후 발행하세요.\n`);
    process.exit(1);
} else {
    console.log('');
    process.exit(0);
}
