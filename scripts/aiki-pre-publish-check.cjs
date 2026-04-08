#!/usr/bin/env node
/**
 * Enforced pre-publish validation for AIKI content.
 */

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { isClearlyOffTopic } = require('./lib/scoring.cjs');
const { findPostByUrl, isRedditMediaUrl } = require('./lib/scraper-posts.cjs');
const {
    isBadNewsReaderValue,
    isBadNewsTitle,
} = require('./lib/aiki-writing-style.cjs');

const TONE_RULES_PATH = path.resolve(__dirname, '../../src3/Docs/social-posting/lib/tone-rules.js');
const ALT_TONE_RULES_PATH = 'F:/src3/Docs/social-posting/lib/tone-rules.js';

let toneRules = null;
try {
    toneRules = require(TONE_RULES_PATH);
} catch {
    try {
        toneRules = require(ALT_TONE_RULES_PATH);
    } catch {
        toneRules = null;
    }
}

const REPO_ROOT = path.join(__dirname, '..');
const CONTENT_TARGETS = [
    {
        name: 'news',
        dir: path.join(REPO_ROOT, 'src/content/news/ko'),
        requiredFields: ['title', 'date', 'lang', 'category', 'summary', 'readerValue', 'sourceUrl', 'sourceTitle'],
    },
    {
        name: 'wiki',
        dir: path.join(REPO_ROOT, 'src/content/wiki/ko'),
        requiredFields: ['term', 'title', 'lang', 'category', 'summary', 'readerValue'],
    },
];

const VALUELESS_PATTERNS = [
    /페이지를 찾을 수 없습니다/,
    /aiki 기사 기준/,
    /최근 ai 뉴스에서/,
];

const VALUE_SIGNAL_PATTERNS = [
    /중요한지/,
    /읽어야 하는 이유/,
    /해결해주는 문제/,
    /실무에서/,
    /판단하게/,
    /구분하게/,
];

const FORBIDDEN_COPY_PATTERNS = [
    /이 뉴스의 값은/,
    /이 글의 값/,
    /이 글이 주는 값/,
    /^이 글이 해결해주는 문제는\s*/u,
    /^이 글에서 해결하는 독자의 문제는\s*/u,
];

const MOJIBAKE_PATTERNS = [
    /\?\?/,
    /�/,
];

const BLOCKED_SOURCE_PATTERNS = [
    /please wait for verification/i,
    /확인을 기다려주세요/,
    /verify you are human/i,
    /sorry, you have been blocked/i,
    /access denied/i,
    /cloudflare/i,
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
            const list = [];
            i++;

            while (i < lines.length && lines[i].startsWith('  ')) {
                const trimmed = lines[i].trim();
                const nested = trimmed.match(/^(\w[\w-]*):\s*(.*)$/);
                const listItem = trimmed.match(/^-\s+(.*)$/);

                if (nested) {
                    obj[nested[1]] = nested[2].trim().replace(/^["']|["']$/g, '');
                } else if (listItem) {
                    list.push(listItem[1].trim().replace(/^["']|["']$/g, ''));
                }
                i++;
            }

            result[key] = Object.keys(obj).length > 0 ? obj : list;
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

function getToneResults(body) {
    if (!toneRules || typeof toneRules.checkTone !== 'function') {
        return [];
    }

    try {
        return toneRules.checkTone(body, 'blog');
    } catch {
        return [];
    }
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
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : null;
}

function extractFrontmatterDate(dateStr) {
    if (!dateStr) return null;
    return dateStr.substring(0, 10);
}

function getTodayString() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
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
                .map((line) => path.normalize(path.join(REPO_ROOT, line))),
        );
    } catch {
        return new Set();
    }
}

function listFilesForTarget(target, changedFiles) {
    const all = fs.readdirSync(target.dir).filter((file) => file.endsWith('.md'));

    if (dateFilter) {
        return all.filter((file) => file.startsWith(dateFilter));
    }

    if (checkAll) {
        return all;
    }

    const changed = all.filter((file) => changedFiles.has(path.normalize(path.join(target.dir, file))));
    if (changed.length > 0) {
        return changed;
    }

    const today = getTodayString();
    return all.filter((file) => file.startsWith(today));
}

function hasMeaningfulBody(targetName, body) {
    const compact = String(body || '').replace(/\s+/g, ' ').trim();
    const paragraphs = String(body || '')
        .split(/\n{2,}/)
        .map((chunk) => chunk.trim())
        .filter(Boolean);

    if (targetName === 'wiki') {
        return compact.length >= 260 && paragraphs.length >= 3;
    }

    return compact.length >= 220 && paragraphs.length >= 3;
}

function hasReaderValue(frontmatter, body) {
    const readerValue = String(frontmatter.readerValue || '').trim();
    if (readerValue.length >= 28 && !FORBIDDEN_COPY_PATTERNS.some((pattern) => pattern.test(readerValue))) {
        return true;
    }

    return VALUE_SIGNAL_PATTERNS.some((pattern) => pattern.test(body));
}

function bodyContainsValuelessTemplate(body) {
    return VALUELESS_PATTERNS.some((pattern) => pattern.test(body));
}

function countCjkIdeographs(text) {
    return (String(text || '').match(/[\u4E00-\u9FFF]/g) || []).length;
}

function containsBrokenCopy(text) {
    const source = String(text || '');
    if (MOJIBAKE_PATTERNS.some((pattern) => pattern.test(source))) {
        return true;
    }

    return countCjkIdeographs(source) >= 8;
}

function containsBlockedSourceText(text) {
    return BLOCKED_SOURCE_PATTERNS.some((pattern) => pattern.test(String(text || '')));
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
        const toneResults = getToneResults(body);

        for (const field of target.requiredFields) {
            if (!fm[field]) {
                errors.push(`${target.name}/${filename}: missing required field "${field}"`);
            }
        }

        const brokenFieldSamples = [
            ['title', fm.title],
            ['summary', fm.summary],
            ['readerValue', fm.readerValue],
            ['sourceTitle', fm.sourceTitle],
            ['body', body],
        ];

        for (const [fieldName, fieldValue] of brokenFieldSamples) {
            if (containsBrokenCopy(fieldValue)) {
                const message = `${target.name}/${filename}: ${fieldName} contains broken or mojibake text`;
                if (checkAll) warnings.push(message);
                else errors.push(message);
            }

            if (containsBlockedSourceText(fieldValue)) {
                errors.push(`${target.name}/${filename}: ${fieldName} contains blocked-page or verification text`);
            }
        }

        if (FORBIDDEN_COPY_PATTERNS.some((pattern) => pattern.test(String(fm.readerValue || '')))) {
            errors.push(`${target.name}/${filename}: readerValue uses forbidden "값" phrasing`);
        }

        if (target.name === 'news' && isRedditMediaUrl(fm.sourceUrl) && findPostByUrl(fm.sourceUrl)) {
            errors.push(`${target.name}/${filename}: reddit media URL used as sourceUrl; use the scraper postUrl instead`);
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

        if (!isDraft && target.name === 'news' && isBadNewsTitle(fm, filename, body)) {
            errors.push(`${target.name}/${filename}: title still looks like copied source copy`);
        }

        if (!isDraft && target.name === 'news' && isBadNewsReaderValue(fm)) {
            errors.push(`${target.name}/${filename}: readerValue still uses template or copied source phrasing`);
        }

        if (!isDraft && bodyContainsValuelessTemplate(body)) {
            const message = `${target.name}/${filename}: body still contains low-value template phrasing`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && !hasMeaningfulBody(target.name, body)) {
            const message = `${target.name}/${filename}: body is too thin to be useful`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && !hasReaderValue(fm, body)) {
            const message = `${target.name}/${filename}: missing explicit reader outcome`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && target.name === 'news' && toneResults.length > 0) {
            for (const result of toneResults) {
                const message = `${target.name}/${filename}: tone ${result.severity.toLowerCase()} [${result.id}] ${result.name} - ${result.msg}`;
                if (result.severity === 'FAIL') {
                    if (checkAll) warnings.push(message);
                    else errors.push(message);
                } else {
                    warnings.push(message);
                }
            }
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
