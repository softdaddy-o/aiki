#!/usr/bin/env node
/**
 * Enforced pre-publish validation for AIKI content.
 *
 * Hard errors are intended for newly created or recently edited content.
 * Legacy repository-wide debt is surfaced as warnings when running `--all`.
 */

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { isClearlyOffTopic } = require('./lib/scoring.cjs');

const REPO_ROOT = path.join(__dirname, '..');
const CONTENT_TARGETS = [
    {
        name: 'news',
        dir: path.join(REPO_ROOT, 'src/content/news/ko'),
        requiredFields: ['title', 'date', 'lang', 'category', 'summary', 'sourceUrl', 'sourceTitle'],
    },
    {
        name: 'wiki',
        dir: path.join(REPO_ROOT, 'src/content/wiki/ko'),
        requiredFields: ['term', 'title', 'lang', 'category', 'summary'],
    },
];

const VALUELESS_PATTERNS = [
    /라는 맥락에서 자주 언급된다/,
    /라는 설명을 함께 보면/,
    /최근 ai 뉴스에서 맥락/,
    /aiki 기사 기준/,
    /페이지를 찾을 수 없습니다/,
];

const VALUE_SIGNAL_PATTERNS = [
    /왜 중요한가/,
    /뉴스에서 어떻게 읽으면 되나/,
    /실무에서/,
    /사용자/,
    /독자/,
    /의미/,
    /가치/,
    /핵심/,
    /구분/,
];

const args = process.argv.slice(2);
const dateFilter = args.includes('--date') ? args[args.indexOf('--date') + 1] : null;
const checkAll = args.includes('--all');

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;
    const yaml = match[1];
    const result = {};
    const lines = yaml.split('\n');
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
        if (!kv) {
            i++;
            continue;
        }

        const key = kv[1];
        let val = kv[2].trim();

        if (val === '' && i + 1 < lines.length && lines[i + 1].startsWith('  ')) {
            const obj = {};
            i++;
            while (i < lines.length && lines[i].startsWith('  ')) {
                const nested = lines[i].trim().match(/^(\w[\w-]*):\s*(.*)$/);
                if (nested) {
                    obj[nested[1]] = nested[2].trim().replace(/^["']|["']$/g, '');
                }
                i++;
            }
            result[key] = obj;
            continue;
        }

        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (/^\d+$/.test(val)) val = parseInt(val, 10);
        else val = val.replace(/^["']|["']$/g, '');

        result[key] = val;
        i++;
    }

    return result;
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

function extractDateFromFilename(filename) {
    const m = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : null;
}

function extractFrontmatterDate(dateStr) {
    if (!dateStr) return null;
    return dateStr.substring(0, 10);
}

function getTodayString() {
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
}

function getChangedFiles() {
    try {
        const output = cp.execSync('git diff --name-only --diff-filter=ACM HEAD', {
            cwd: REPO_ROOT,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
        });
        return new Set(
            output
                .split(/\r?\n/)
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => path.normalize(path.join(REPO_ROOT, line)))
        );
    } catch {
        return new Set();
    }
}

function listFilesForTarget(target, changedFiles) {
    const all = fs.readdirSync(target.dir).filter((f) => f.endsWith('.md'));

    if (dateFilter) {
        return all.filter((f) => f.startsWith(dateFilter));
    }

    if (checkAll) {
        return all;
    }

    const changed = all.filter((f) => changedFiles.has(path.normalize(path.join(target.dir, f))));
    if (changed.length > 0) {
        return changed;
    }

    const today = getTodayString();
    return all.filter((f) => f.startsWith(today));
}

function hasMeaningfulBody(body) {
    const compact = String(body || '').replace(/\s+/g, ' ').trim();
    const paragraphs = String(body || '')
        .split(/\n{2,}/)
        .map((chunk) => chunk.trim())
        .filter(Boolean);

    return compact.length >= 420 && paragraphs.length >= 3;
}

function hasReaderValue(frontmatter, body) {
    const readerValue = String(frontmatter.readerValue || '').trim();
    if (readerValue.length >= 28) {
        return true;
    }

    return VALUE_SIGNAL_PATTERNS.some((pattern) => pattern.test(body));
}

function bodyContainsValuelessTemplate(body) {
    return VALUELESS_PATTERNS.some((pattern) => pattern.test(body));
}

const changedFiles = getChangedFiles();
const today = getTodayString();
const errors = [];
const warnings = [];
let checked = 0;

for (const target of CONTENT_TARGETS) {
    const files = listFilesForTarget(target, changedFiles);

    for (const filename of files) {
        const filepath = path.join(target.dir, filename);
        const content = fs.readFileSync(filepath, 'utf8');
        const fm = parseFrontmatter(content);

        if (!fm) {
            errors.push(`${target.name}/${filename}: frontmatter parse failed`);
            continue;
        }

        checked++;

        const isDraft = fm.draft === true;
        const isBackfill = fm.backfilled === true;
        const body = extractBody(content);
        const signalText = `${String(fm.title || '').toLowerCase()} ${String(fm.summary || '').toLowerCase()} ${body.toLowerCase()}`;
        const sourceUrl = String(fm.sourceUrl || '').toLowerCase();
        const filenameDate = extractDateFromFilename(filename);
        const fmDate = extractFrontmatterDate(fm.date);
        const normalizedTitle = normalizeComparableText(fm.title);
        const normalizedSummary = normalizeComparableText(fm.summary);
        const normalizedFirstSentence = normalizeComparableText(extractFirstSentence(body));
        const isRecentFile = changedFiles.has(path.normalize(filepath));

        for (const field of target.requiredFields) {
            if (!fm[field]) {
                errors.push(`${target.name}/${filename}: missing required field "${field}"`);
            }
        }

        if (!isDraft && target.name === 'news') {
            const fcStatus = fm.factCheck && fm.factCheck.status;
            if (!fcStatus || fcStatus === 'pending') {
                errors.push(`${target.name}/${filename}: factCheck.status missing or pending`);
            }

            const score = fm.score;
            if (score === undefined || score === null || score === 0 || score === '') {
                errors.push(`${target.name}/${filename}: missing publishable score`);
            }

            if (score && score < 40) {
                warnings.push(`${target.name}/${filename}: low score ${score} (recommended 40+)`);
            }

            if (isClearlyOffTopic(signalText, sourceUrl)) {
                errors.push(`${target.name}/${filename}: appears off-topic for AIKI scope`);
            }
        }

        if (!isBackfill && filenameDate && fmDate && filenameDate !== fmDate) {
            errors.push(`${target.name}/${filename}: filename date ${filenameDate} does not match frontmatter date ${fmDate}`);
        }

        if (!isBackfill && fm.date) {
            const articleDate = fm.date.substring(0, 10);
            if (articleDate > today) {
                warnings.push(`${target.name}/${filename}: future date ${articleDate}`);
            }
        }

        if (!isDraft && normalizedTitle && normalizedTitle === normalizedSummary) {
            errors.push(`${target.name}/${filename}: title matches summary exactly`);
        }

        if (!isDraft && normalizedTitle && normalizedTitle === normalizedFirstSentence) {
            errors.push(`${target.name}/${filename}: title matches first sentence exactly`);
        }

        if (!isDraft && bodyContainsValuelessTemplate(body)) {
            const message = `${target.name}/${filename}: body still contains low-value template phrasing`;
            if (checkAll && !isRecentFile) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && !hasMeaningfulBody(body)) {
            const message = `${target.name}/${filename}: body is too thin to be useful`;
            if (checkAll && !isRecentFile) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && !hasReaderValue(fm, body)) {
            const message = `${target.name}/${filename}: missing explicit reader value`;
            if (checkAll && !isRecentFile) warnings.push(message);
            else errors.push(message);
        }
    }
}

if (checked === 0) {
    console.log('aiki-pre-publish-check: no content selected');
    process.exit(0);
}

console.log(`\nAiki pre-publish check: ${checked} file(s) inspected\n`);

if (errors.length > 0) {
    console.log(`ERROR (${errors.length})`);
    errors.forEach((entry) => console.log(` - ${entry}`));
}

if (warnings.length > 0) {
    console.log(`\nWARNING (${warnings.length})`);
    warnings.forEach((entry) => console.log(` - ${entry}`));
}

if (errors.length === 0 && warnings.length === 0) {
    console.log('OK: all checks passed');
}

console.log('');
process.exit(errors.length > 0 ? 1 : 0);
