#!/usr/bin/env node
/**
 * Enforced pre-publish validation for AIKI content.
 */

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const yaml = require('js-yaml');
const { isClearlyOffTopic } = require('./lib/scoring.cjs');
const { findPostByUrl, isRedditMediaUrl } = require('./lib/scraper-posts.cjs');
const { hasDetailedItems } = require('./lib/fact-check-details.cjs');
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
    /반짝 유행어라기보다/u,
    /먼저 감 잡기/u,
    /뉴스에서 왜 자주 나오나/u,
    /읽을 때 체크포인트/u,
    /같이 봐야 할 용어/u,
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

const BAD_WIKI_MODEL_SUMMARY_PATTERNS = [
    /반복해서 등장하는 AI 모델/u,
    /맥락에서 반복해서 등장하는 AI 모델/u,
];

const BAD_WIKI_MODEL_BODY_PATTERNS = [
    /특정 회사가 만든 단일 제품명이라기보다/u,
    /아직 기사 출현 빈도가 높지 않아도 앞으로 자주 붙을 가능성이 높은 용어/u,
    /이런 용어를 먼저 잡아 두면 발표문이 조금 과장돼 보여도/u,
    /모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분/u,
    /AIKI 기사에서 이미 \d+번 이상 언급/u,
    /버전형 모델이야/u,
    /한 줄로 말하면/u,
    /실무에서는 이 문장만 읽어도/u,
    /이런 버전 페이지가 중요한 이유는/u,
    /내 앱에 바로 붙는지/u,
    /이 줄은 .*항목이야/u,
    /읽는 줄이다/u,
    /묶어 부르는 상위 모델 계열이야/u,
    /기사에서 이름만 크게 보일 때가 많아서/u,
    /개별 모델 프로필이 필요하면/u,
    /어떤 하위 버전으로 갈라지나/u,
    /계열 이름만 알아서는 가격이나 컨텍스트를 못 박을 수 없고/u,
    /상위 계열 페이지가 필요한 이유는/u,
];

const WIKI_SOURCE_COPY_PATTERNS = [
    /알아보세요/u,
    /살펴보세요/u,
    /연결하세요/u,
    /learn how/i,
    /what is /i,
    /what are /i,
];

const FACT_CHECK_FORMAL_PATTERNS = [
    /교차검증했다/u,
    /비판적으로(?: 다시)? 검토했다/u,
    /별도(?:로)? 묶(?:음|어서)으로 다시/u,
    /맞는지 확인했다/u,
    /일치하는지 확인했다/u,
    /직접 대조했다/u,
];

const FACT_CHECK_TONE_PATTERNS = [
    /맞춰봤다/u,
    /다시 봤다/u,
    /한 번 더 봤다/u,
    /한 번 더 확인해봤다/u,
    /의심해보고/u,
    /정리했다/u,
    /걸렀다/u,
];

const VERSION_MODEL_CONTRADICTION_PATTERNS = [
    /여러 버전을 묶어 부르는 상위 계열명/u,
    /개별 버전 대신 묶음 이름/u,
    /실제 도입 판단은 상위 이름이 아니라/u,
    /상위 계열명인지, 실제로 바로 붙일 수 있는 개별 버전인지/u,
];

const FAMILY_MODEL_CONTRADICTION_PATTERNS = [
    /버전형 모델/u,
    /실제로 비교표에 올려놓고 고르는/u,
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
    return yaml.load(match[1], { schema: yaml.FAILSAFE_SCHEMA }) || null;
}

function extractBody(content) {
    const match = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)$/);
    return match ? match[1] : '';
}

function normalizeLineEndings(text) {
    return String(text || '').replace(/\r\n/g, '\n');
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
    const normalized = normalizeLineEndings(body);
    const compact = normalized.replace(/\s+/g, ' ').trim();
    const paragraphs = normalized
        .split(/\n{2,}/)
        .map((chunk) => chunk.trim())
        .filter(Boolean);
    const headingCount = (normalized.match(/^##\s+/gm) || []).length;

    if (targetName === 'wiki') {
        return compact.length >= 240 && (paragraphs.length >= 3 || headingCount >= 4);
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

function hasAwkwardForeignReaderValue(frontmatter) {
    const readerValue = String(frontmatter.readerValue || '').trim();
    return /^(?:"[^"]+"|[A-Za-z0-9][A-Za-z0-9 .&+\-/]*)이?라는 (말이|이름이|용어를)/.test(readerValue);
}

function hasKnownBrokenWikiGrammar(text) {
    const source = normalizeLineEndings(String(text || ''));
    return [
        /흐름 흐름/,
        /배선를/,
        /계열를/,
        /운영층를/,
        /입출력를/,
        /해석를/,
    ].some((pattern) => pattern.test(source));
}

function hasRepeatedAdjacentWord(text) {
    const source = normalizeLineEndings(String(text || ''));
    return /(^|[\s"'“”‘’(])([가-힣A-Za-z0-9][가-힣A-Za-z0-9-]*)\s+\2(?=$|[\s"'“”‘’).,!?])/m.test(source);
}

function bodyContainsValuelessTemplate(body) {
    return VALUELESS_PATTERNS.some((pattern) => pattern.test(body));
}

function hasGenericWikiModelCopy(frontmatter, body) {
    if (String(frontmatter.category || '').toLowerCase() !== 'model') {
        return false;
    }

    const summary = String(frontmatter.summary || '');
    return BAD_WIKI_MODEL_SUMMARY_PATTERNS.some((pattern) => pattern.test(summary))
        || BAD_WIKI_MODEL_BODY_PATTERNS.some((pattern) => pattern.test(String(body || '')));
}

function hasModelTypeContradiction(frontmatter, body) {
    if (String(frontmatter.category || '').toLowerCase() !== 'model') {
        return false;
    }

    const combined = `${String(frontmatter.summary || '')}\n${String(body || '')}`;
    const modelType = String(frontmatter.modelType || '').toLowerCase();

    if (modelType === 'version') {
        return VERSION_MODEL_CONTRADICTION_PATTERNS.some((pattern) => pattern.test(combined));
    }

    if (modelType === 'family') {
        return FAMILY_MODEL_CONTRADICTION_PATTERNS.some((pattern) => pattern.test(combined));
    }

    return false;
}

function hasWeakModelSpecificity(frontmatter, body) {
    if (String(frontmatter.category || '').toLowerCase() !== 'model') {
        return false;
    }

    const combined = `${String(frontmatter.summary || '')}\n${String(body || '')}`;
    const hasVendor = /(OpenAI|Anthropic|Google DeepMind|Google|DeepSeek|Mistral AI|Black Forest Labs|Meta|xAI|Microsoft|Alibaba|Qwen|Stability AI)/.test(combined);
    const hasOpsSignal = /(컨텍스트|가격|입력|출력|API|웨이트|호스팅|Batch|Realtime|토큰)/.test(combined);

    return !hasVendor || !hasOpsSignal;
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

function containsWeakWikiSourceCopy(text) {
    return WIKI_SOURCE_COPY_PATTERNS.some((pattern) => pattern.test(String(text || '')));
}

function splitBodySentences(body) {
    return normalizeLineEndings(body)
        .replace(/^#{1,6}\s+.+$/gm, '')
        .split(/(?<=[.!?])\s+|\n+/)
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 4);
}

function validateWikiTone(frontmatter, body) {
    const normalized = normalizeLineEndings(body);
    const sentences = splitBodySentences(normalized);
    if (sentences.length < 2) {
        return ['wiki tone too thin to evaluate'];
    }

    const failures = [];
    const category = String(frontmatter.category || '').toLowerCase();
    const modelType = String(frontmatter.modelType || '').toLowerCase();
    const combined = `${String(frontmatter.summary || '')}\n${normalized}`;

    if (containsWeakWikiSourceCopy(normalized)) {
        failures.push('wiki tone still reads like pasted source copy');
    }

    if (category === 'model' && modelType === 'version') {
        if (BAD_WIKI_MODEL_SUMMARY_PATTERNS.some((pattern) => pattern.test(String(frontmatter.summary || '')))) {
            failures.push('wiki model summary still uses generic family-level copy');
        }

        if (BAD_WIKI_MODEL_BODY_PATTERNS.some((pattern) => pattern.test(combined))) {
            failures.push('wiki model body still uses deprecated template copy');
        }
    }

    if (category === 'model' && modelType === 'family') {
        if (/상위 모델 계열이다\. 기사에서 이름만 나오면 하위 버전과 제품 포지션을 함께 확인해야 한다\./u.test(String(frontmatter.summary || ''))) {
            failures.push('wiki family model summary still uses generic template copy');
        }

        if (BAD_WIKI_MODEL_BODY_PATTERNS.some((pattern) => pattern.test(combined))) {
            failures.push('wiki family model body still uses deprecated template copy');
        }
    }

    return failures;
}

function validateWikiStructure(frontmatter, body) {
    const category = String(frontmatter.category || '').toLowerCase();
    const normalizedBody = normalizeLineEndings(body);
    const headings = Array.from(normalizedBody.matchAll(/^##\s+(.+)$/gm)).map((match) => match[1].trim());
    const failures = [];

    if (category === 'model') {
        const requiredHeadings = ['한 줄 정의', '이 모델로 무엇을 할 수 있나', '스펙을 읽는 법', '왜 중요한가', '같이 보면 좋은 모델'];
        for (const heading of requiredHeadings) {
            if (!headings.includes(heading)) {
                failures.push(`wiki model missing section "${heading}"`);
            }
        }

        const specSignals = [
            /\*\*입력\/출력 범위\*\*/u,
            /\*\*컨텍스트\/메모리 감각\*\*/u,
            /\*\*접근 경로\*\*/u,
            /\*\*가격과 운영비\*\*/u,
            /\*\*웨이트 공개 여부\*\*/u,
        ];

        for (const signal of specSignals) {
            if (!signal.test(String(body || ''))) {
                failures.push('wiki model spec guide is missing core comparison bullets');
                break;
            }
        }
    } else {
        if (!headings.includes('한 줄 정의')) {
            failures.push('wiki missing section "한 줄 정의"');
        }

        if (!headings.some((heading) => heading === '어떻게 작동하나' || heading === '실제로 무엇을 하나')) {
            failures.push('wiki missing explanation section');
        }

        if (!headings.includes('왜 중요한가')) {
            failures.push('wiki missing section "왜 중요한가"');
        }

        if (!headings.includes('관련 용어')) {
            failures.push('wiki missing section "관련 용어"');
        }
    }

    if (/^##\s+(먼저 감 잡기|뉴스에서 왜 자주 나오나|읽을 때 체크포인트|같이 봐야 할 용어)$/m.test(normalizedBody)) {
        failures.push('wiki still uses deprecated boilerplate headings');
    }

    if (/모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분/u.test(normalizedBody)) {
        failures.push('wiki still uses deprecated classification-first template copy');
    }

    if (/AIKI 기사에서 \d+번 이상 언급/u.test(normalizedBody)) {
        failures.push('wiki still uses mention-count boilerplate in body');
    }

    if (containsWeakWikiSourceCopy(`${String(frontmatter.summary || '')}\n${normalizedBody}`)) {
        failures.push('wiki still contains source-style CTA copy');
    }

    return failures;
}

function validateFactCheckDetails(targetName, frontmatter) {
    const factCheck = frontmatter.factCheck || {};
    const checks = Array.isArray(factCheck.checks) ? factCheck.checks : [];
    const checkMap = new Map(checks.map((check) => [String(check && check.type || ''), check]));
    const requiredTypes = targetName === 'news'
        ? ['source_match', 'web_cross_check', 'number_verify', 'adversarial']
        : ['source_match', 'web_cross_check', 'adversarial'];

    if (String(frontmatter.modelType || '').toLowerCase() === 'version' && !requiredTypes.includes('number_verify')) {
        requiredTypes.push('number_verify');
    }

    const failures = [];

    if (!Array.isArray(factCheck.sources) || factCheck.sources.length === 0) {
        failures.push('factCheck.sources missing');
    }

    for (const type of requiredTypes) {
        const check = checkMap.get(type);
        if (!check) {
            failures.push(`factCheck.${type} missing`);
            continue;
        }

        if (!hasDetailedItems(check)) {
            failures.push(`factCheck.${type} lacks summary or items`);
        }
    }

    return failures;
}

function validateFactCheckTone(frontmatter) {
    const factCheck = frontmatter.factCheck || {};
    const checks = Array.isArray(factCheck.checks) ? factCheck.checks : [];
    const failures = [];

    for (const check of checks) {
        const type = String(check && check.type || 'unknown');
        const summary = String(check && check.summary || '').trim();
        const joined = [
            summary,
            ...((check && Array.isArray(check.items)) ? check.items : []).map((item) => String(item || '').trim()),
            ...((check && Array.isArray(check.findings)) ? check.findings : []).map((item) => String(item || '').trim()),
        ].join('\n');

        if (FACT_CHECK_FORMAL_PATTERNS.some((pattern) => pattern.test(joined))) {
            failures.push(`factCheck.${type} still uses report-style template copy`);
        }

        if (summary && !FACT_CHECK_TONE_PATTERNS.some((pattern) => pattern.test(summary))) {
            failures.push(`factCheck.${type} summary is missing AIKI writing tone`);
        }
    }

    return failures;
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

        if (!isDraft) {
            for (const failure of validateFactCheckDetails(target.name, fm)) {
                const message = `${target.name}/${filename}: ${failure}`;
                if (checkAll) warnings.push(message);
                else errors.push(message);
            }

            for (const failure of validateFactCheckTone(fm)) {
                const message = `${target.name}/${filename}: ${failure}`;
                if (checkAll) warnings.push(message);
                else errors.push(message);
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

        if (!isDraft && target.name === 'wiki' && hasGenericWikiModelCopy(fm, body)) {
            const message = `${target.name}/${filename}: model page still uses generic template copy`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && target.name === 'wiki' && hasModelTypeContradiction(fm, body)) {
            const message = `${target.name}/${filename}: model copy contradicts modelType`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && target.name === 'wiki' && hasWeakModelSpecificity(fm, body)) {
            const message = `${target.name}/${filename}: model page lacks vendor or operating-detail specificity`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
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

        if (!isDraft && target.name === 'wiki' && hasAwkwardForeignReaderValue(fm)) {
            const message = `${target.name}/${filename}: readerValue uses awkward foreign-title particle pattern`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && target.name === 'wiki' && hasKnownBrokenWikiGrammar(`${String(fm.summary || '')}\n${String(fm.readerValue || '')}\n${body}`)) {
            const message = `${target.name}/${filename}: contains known broken wiki grammar pattern`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && target.name === 'wiki' && hasRepeatedAdjacentWord(`${String(fm.summary || '')}\n${body}`)) {
            const message = `${target.name}/${filename}: contains repeated adjacent words`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && target.name === 'wiki') {
            for (const failure of validateWikiTone(fm, body)) {
                const message = `${target.name}/${filename}: ${failure}`;
                if (checkAll) warnings.push(message);
                else errors.push(message);
            }

            for (const failure of validateWikiStructure(fm, body)) {
                const message = `${target.name}/${filename}: ${failure}`;
                if (checkAll) warnings.push(message);
                else errors.push(message);
            }
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
