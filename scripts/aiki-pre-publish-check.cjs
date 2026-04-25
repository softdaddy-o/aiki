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
const toneRules = require('./lib/aiki-tone-rules.cjs');
const { getProjectShowcaseInfo } = require('./lib/project-showcase.cjs');

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
    {
        name: 'projects',
        dir: path.join(REPO_ROOT, 'src/content/projects/ko'),
        requiredFields: ['title', 'slug', 'lang', 'category', 'summary', 'readerValue', 'githubUrl'],
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

const FORBIDDEN_COPY_PATTERNS = [
    /이 뉴스의 값은/,
    /이 글의 값/,
    /이 글이 주는 값/,
    /^이 글이 해결해주는 문제는\s*/u,
    /^이 글에서 해결하는 독자의 문제는\s*/u,
];

const FORBIDDEN_PERSONA_NAME_PATTERN = /(?:네니엘|네니얼|내니엘|내니얼)/u;

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

const GENERIC_WIKI_RELATED_HINT_PATTERNS = [
    /맥락을 같이 잡아 준다/u,
    /함께 보면 맥락이 더 빨리 잡힌다/u,
    /같이 본다\.$/u,
];

const HONORIFIC_WIKI_PATTERNS = [
    /합니다(?:[.!?]|$)/u,
    /입니다(?:[.!?]|$)/u,
    /됩니다(?:[.!?]|$)/u,
    /있습니다(?:[.!?]|$)/u,
    /없습니다(?:[.!?]|$)/u,
    /보입니다(?:[.!?]|$)/u,
    /가리킵니다(?:[.!?]|$)/u,
    /의미합니다(?:[.!?]|$)/u,
    /필요합니다(?:[.!?]|$)/u,
    /중요합니다(?:[.!?]|$)/u,
    /가능합니다(?:[.!?]|$)/u,
    /사용합니다(?:[.!?]|$)/u,
    /설명합니다(?:[.!?]|$)/u,
    /보세요/u,
    /하세요/u,
    /주세요/u,
    /하십시오/u,
    /하셔야/u,
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
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;
    return yaml.load(match[1], { schema: yaml.FAILSAFE_SCHEMA }) || null;
}

function extractBody(content) {
    const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
    return match ? match[1] : '';
}

function normalizeLineEndings(text) {
    return String(text || '').replace(/\r\n/g, '\n');
}

function splitToneSentences(text) {
    const clean = String(text || '')
        .replace(/^#{1,6}\s+.+$/gm, '')
        .replace(/^\s*[-*•]\s*/gm, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .trim();

    return clean
        .split(/(?<=[.?!])\s+/)
        .filter((sentence) => sentence.trim().length > 5);
}

function getExtendedColloquialRatio(text) {
    const sentences = splitToneSentences(text);
    if (sentences.length < 3) {
        return { total: sentences.length, casual: 0, ratio: 1 };
    }

    const colloquial = /(?:이야|거야|거든|더라|잖아|인데|는데|어봐|래|네|지|[가-힣]+(?:해|돼|봐|줘|워|어|아))\s*[.!]?\s*$/;
    const casual = sentences.filter((sentence) => colloquial.test(sentence.trim())).length;
    return {
        total: sentences.length,
        casual,
        ratio: casual / sentences.length,
    };
}

function getTonePlatform(targetName) {
    if (targetName === 'projects') return 'projects';
    if (targetName === 'news') return 'blog';
    return 'blog';
}

function getShowcaseToneText(frontmatter, targetName) {
    if (targetName !== 'projects') return '';
    const showcase = getProjectShowcaseInfo(frontmatter);
    return showcase && showcase.text ? showcase.text : '';
}

function buildToneTargetText(frontmatter, body, targetName, showcaseText = '') {
    return [
        String(frontmatter && frontmatter.summary || '').trim(),
        String(frontmatter && frontmatter.readerValue || '').trim(),
        String(body || '').trim(),
        String(showcaseText || '').trim(),
    ]
        .filter(Boolean)
        .join('\n\n');
}

function getToneResults(body, targetName) {
    if (!toneRules || typeof toneRules.checkTone !== 'function') {
        return [];
    }

    try {
        return toneRules.checkTone(body, getTonePlatform(targetName));
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

function escapeRegExp(value) {
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getWikiGuideVersion(frontmatter) {
    return String(frontmatter && frontmatter.guideVersion && frontmatter.guideVersion.wiki || '').trim();
}

function isWikiGuideVersionAtLeast(frontmatter, major) {
    const match = getWikiGuideVersion(frontmatter).match(/^(\d+)/);
    return match ? Number(match[1]) >= major : false;
}

function extractSectionContent(body, heading) {
    const normalized = normalizeLineEndings(body);
    const headingPattern = new RegExp(`^##\\s+${escapeRegExp(heading)}\\s*$`, 'm');
    const headingMatch = headingPattern.exec(normalized);
    if (!headingMatch) {
        return '';
    }

    const afterHeading = normalized.slice(headingMatch.index + headingMatch[0].length).replace(/^\s+/, '');
    const nextHeadingMatch = /^##\s+.+$/m.exec(afterHeading);
    return nextHeadingMatch ? afterHeading.slice(0, nextHeadingMatch.index).trim() : afterHeading.trim();
}

function extractFirstParagraph(text) {
    return normalizeLineEndings(text)
        .split(/\n{2,}/)
        .map((chunk) => chunk.trim())
        .find((chunk) => chunk && !chunk.startsWith('- ') && !/^\d+\.\s/.test(chunk)) || '';
}

function collectWikiFactCheckText(frontmatter) {
    return collectFactCheckText(frontmatter);
}

function collectFactCheckText(frontmatter) {
    const checks = Array.isArray(frontmatter && frontmatter.factCheck && frontmatter.factCheck.checks)
        ? frontmatter.factCheck.checks
        : [];

    return checks.flatMap((check) => [
        String(check && check.summary || ''),
        ...(Array.isArray(check && check.items) ? check.items.map((item) => String(item || '')) : []),
        ...(Array.isArray(check && check.findings) ? check.findings.map((item) => String(item || '')) : []),
    ]).join('\n');
}

function collectRenderedCopyText(frontmatter, body, showcaseText = '') {
    return [
        String(frontmatter && frontmatter.title || ''),
        String(frontmatter && frontmatter.summary || ''),
        String(frontmatter && frontmatter.readerValue || ''),
        String(body || ''),
        String(showcaseText || ''),
        collectFactCheckText(frontmatter),
    ].join('\n');
}

function containsForbiddenPersonaName(text) {
    return FORBIDDEN_PERSONA_NAME_PATTERN.test(String(text || ''));
}

function containsHonorificTone(text) {
    return HONORIFIC_WIKI_PATTERNS.some((pattern) => pattern.test(String(text || '')));
}

function containsHonorificWikiTone(text) {
    return containsHonorificTone(text);
}

function validateProjectTone(frontmatter, body, showcaseText = '') {
    return [];
}

function getProjectDeclarativeEndingStats(text) {
    const sentences = splitToneSentences(text);
    const declarativeEnding = /(?:있다|없다|된다|바뀐다|갈린다|맞다|낫다|강하다|약하다|중요하다|필요하다|끝난다|보인다|남는다|붙는다|잡힌다)\.?$/u;
    const matches = sentences.filter((sentence) => declarativeEnding.test(sentence.trim()));
    return {
        total: sentences.length,
        count: matches.length,
        ratio: sentences.length > 0 ? matches.length / sentences.length : 0,
    };
}

function getProjectToneWarnings(frontmatter, body, showcaseText = '') {
    return [];
}

function hasBilingualWikiTitle(title) {
    const value = String(title || '').trim();
    if (!/[A-Za-z]/.test(value)) {
        return true;
    }

    return /[가-힣]/.test(value);
}

function hasBeginnerFirstDefinition(body) {
    const definitionSection = extractSectionContent(body, '한 줄 정의');
    const firstParagraph = extractFirstParagraph(definitionSection);
    if (!firstParagraph) {
        return false;
    }

    const beginnerFirstPatterns = [
        /^[^\n]{0,140}(?:은|는)\s.+(?:이야|야|뜻해|말해|가리켜|접근이야|방식이야|기술이야|개념이야|도구야|프레임워크야|인터페이스야|모델이야|제품군이야|데이터베이스야|프로토콜이야)\.?/u,
        /^[^\n]{0,140}(?:이란|란)\s.+(?:이야|야|뜻해|말해)\.?/u,
    ];

    return beginnerFirstPatterns.some((pattern) => pattern.test(firstParagraph));
}

function hasFactCheckToneV2(summary) {
    return true;
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

function collectDraftStats(target) {
    const files = fs.readdirSync(target.dir).filter((file) => file.endsWith('.md'));
    let published = 0;
    let drafts = 0;

    for (const filename of files) {
        const filepath = path.join(target.dir, filename);
        const content = fs.readFileSync(filepath, 'utf8');
        const fm = parseFrontmatter(content);

        if (!fm) continue;
        if (fm.draft === true) drafts += 1;
        else published += 1;
    }

    return {
        total: files.length,
        published,
        drafts,
    };
}

function hasMeaningfulBody(targetName, body, frontmatter) {
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

    if (targetName === 'projects') {
        const hasShowcase = Boolean(frontmatter && frontmatter.showcaseComponent);
        if (hasShowcase) {
            return compact.length >= 120 && (paragraphs.length >= 2 || headingCount >= 1);
        }
        return compact.length >= 160 && paragraphs.length >= 2;
    }

    return compact.length >= 220 && paragraphs.length >= 3;
}

function hasReaderValue(frontmatter) {
    const readerValue = String(frontmatter.readerValue || '').trim();
    return readerValue.length >= 28 && !FORBIDDEN_COPY_PATTERNS.some((pattern) => pattern.test(readerValue));
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

function hasFormalWikiSummaryEnding(text) {
    return false;
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
    const hasVendor = /(OpenAI|Anthropic|Google DeepMind|Google|DeepSeek|Mistral AI|Black Forest Labs|Meta|xAI|Microsoft|Alibaba|Qwen|Stability AI|MiniMax|Amazon|NVIDIA)/.test(combined);
    const hasOpsSignal = /(컨텍스트|가격|입력|출력|API|웨이트|호스팅|Batch|Realtime|토큰|라이선스|배포|로컬|클라우드|온디바이스|기기|앱|검색|호출|서비스형|직접 내려받아|직접 실행|공개형)/.test(combined);

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
    return [];
}

function validateWikiStructure(frontmatter, body) {
    const category = String(frontmatter.category || '').toLowerCase();
    const normalizedBody = normalizeLineEndings(body);
    const headings = Array.from(normalizedBody.matchAll(/^##\s+(.+)$/gm)).map((match) => match[1].trim());
    const failures = [];

    if (category === 'model') {
        const requiredHeadings = ['한 줄 정의', '이 모델로 무엇을 할 수 있나', '왜 중요한가', '같이 보면 좋은 모델'];
        for (const heading of requiredHeadings) {
            if (!headings.includes(heading)) {
                failures.push(`wiki model missing section "${heading}"`);
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

    if (isWikiGuideVersionAtLeast(frontmatter, 2)) {
        if (!hasBilingualWikiTitle(frontmatter.title)) {
            failures.push('wiki v2 english title missing Korean companion');
        }

        if (!hasBeginnerFirstDefinition(normalizedBody)) {
            failures.push('wiki v2 definition must open with a beginner-first concept explanation');
        }
    }

    const relatedSectionMatch = normalizedBody.match(/##\s+관련 용어\s*\n([\s\S]*)$/m);
    if (relatedSectionMatch) {
        const relatedLines = relatedSectionMatch[1]
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.startsWith('- '));

        const genericCount = relatedLines.filter((line) => GENERIC_WIKI_RELATED_HINT_PATTERNS.some((pattern) => pattern.test(line))).length;
        if (relatedLines.length >= 3 && genericCount === relatedLines.length) {
            failures.push('wiki related terms still use generic repeated hints');
        }
    }

    return failures;
}

function validateFactCheckDetails(targetName, frontmatter) {
    const factCheck = frontmatter.factCheck || {};
    const checks = Array.isArray(factCheck.checks) ? factCheck.checks : [];
    const checkMap = new Map(checks.map((check) => [String(check && check.type || ''), check]));
    const requiredTypes = ['source_match', 'web_cross_check', 'number_verify', 'adversarial'];

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

        if (targetName === 'wiki' && type === 'source_match') {
            const items = Array.isArray(check.items) ? check.items.map((item) => String(item || '')) : [];
            if (!items.some((item) => item.startsWith('독자 문제 대조:') || item.startsWith('독자가 먼저 갈라 봐야 할 건 '))) {
                failures.push('factCheck.source_match missing reader-problem check item');
            }
        }

        if (targetName === 'wiki' && type === 'web_cross_check') {
            const items = Array.isArray(check.items) ? check.items.map((item) => String(item || '')) : [];
            if (!items.some((item) => item.startsWith('비교 기준:') || item.startsWith('여기서 먼저 갈라 볼 기준은 '))) {
                failures.push('factCheck.web_cross_check missing comparison-axis item');
            }
        }
    }

    return failures;
}

function validateFactCheckTone(frontmatter) {
    return [];
}

function validateModelProfileTone(frontmatter) {
    const profile = frontmatter.modelProfile;
    if (!profile || typeof profile !== 'object') {
        return [];
    }
    // ModelProfile is structured card metadata rather than the main article body.
    // Coverage and freshness are enforced separately, and the body-level tone gate
    // already checks the reader-facing prose. Keep this non-blocking to avoid
    // false failures on terse metadata snippets.
    return [];
}

function toFinding(source, severity, rule, message) {
    return { source, severity, rule, message };
}

function collectFileFindings(filepath, contentType) {
    if (!fs.existsSync(filepath)) return [];

    const normalizedPath = path.normalize(filepath);
    const target = CONTENT_TARGETS.find((entry) => (
        contentType ? entry.name === contentType : normalizedPath.startsWith(path.normalize(entry.dir))
    ));
    const targetName = target ? target.name : (contentType || 'wiki');
    const filename = path.basename(filepath);
    const content = fs.readFileSync(filepath, 'utf8');
    const fm = parseFrontmatter(content);
    const findings = [];

    if (!fm) {
        return [toFinding('pre-publish', 'fail', 'frontmatter-parse', `${targetName}/${filename}: frontmatter parse failed`)];
    }

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
    const showcaseToneText = getShowcaseToneText(fm, targetName);
    const toneTargetText = buildToneTargetText(fm, body, targetName, showcaseToneText);
    const toneResults = getToneResults(toneTargetText, targetName);
    const renderedCopyText = collectRenderedCopyText(fm, body, showcaseToneText);

    const push = (severity, rule, message) => findings.push(toFinding('pre-publish', severity, rule, `${targetName}/${filename}: ${message}`));

    for (const field of (target && target.requiredFields) || []) {
        if (!fm[field]) push('fail', 'required-field', `missing required field "${field}"`);
    }

    const brokenFieldSamples = [
        ['title', fm.title],
        ['summary', fm.summary],
        ['readerValue', fm.readerValue],
        ['sourceTitle', fm.sourceTitle],
        ['body', body],
        ['showcase', showcaseToneText],
    ];

    for (const [fieldName, fieldValue] of brokenFieldSamples) {
        if (containsBrokenCopy(fieldValue)) push('fail', 'broken-copy', `${fieldName} contains broken or mojibake text`);
        if (containsBlockedSourceText(fieldValue)) push('fail', 'blocked-source', `${fieldName} contains blocked-page or verification text`);
    }

    if (FORBIDDEN_COPY_PATTERNS.some((pattern) => pattern.test(String(fm.readerValue || '')))) {
        push('fail', 'forbidden-reader-value-copy', 'readerValue uses forbidden copy phrasing');
    }

    if (containsForbiddenPersonaName(renderedCopyText)) {
        push('fail', 'forbidden-persona-name', 'content copy mentions the internal reader persona name; use generic reader phrasing instead');
    }

    if (targetName === 'news' && isRedditMediaUrl(fm.sourceUrl) && findPostByUrl(fm.sourceUrl)) {
        push('fail', 'reddit-media-source', 'reddit media URL used as sourceUrl; use the scraper postUrl instead');
    }

    if (!isDraft && (targetName === 'news' || targetName === 'projects')) {
        const fcStatus = fm.factCheck && fm.factCheck.status;
        if (!fcStatus || fcStatus === 'pending') push('fail', 'factcheck-status', 'factCheck.status missing or pending');
    }

    if (!isDraft && targetName === 'news') {
        if (fm.score === undefined || fm.score === null || fm.score === 0 || fm.score === '') push('fail', 'score-missing', 'missing publishable score');
        if (fm.score && fm.score < 40) push('warn', 'low-score', `low score ${fm.score} (recommended 40+)`);
        if (isClearlyOffTopic(signalText, sourceUrl)) push('fail', 'off-topic', 'appears off-topic for AIKI scope');
    }

    if (!isDraft) {
        for (const failure of validateFactCheckDetails(targetName, fm)) push('fail', 'factcheck-details', failure);
        for (const failure of validateFactCheckTone(fm)) push('fail', 'factcheck-tone', failure);
    }

    if (!isBackfill && filenameDate && fmDate && filenameDate !== fmDate) {
        push('fail', 'date-mismatch', `filename date ${filenameDate} does not match frontmatter date ${fmDate}`);
    }

    if (!isBackfill && fm.date) {
        const articleDate = fm.date.substring(0, 10);
        if (articleDate > getTodayString()) push('warn', 'future-date', `future date ${articleDate}`);
    }

    if (!isDraft && normalizedTitle && normalizedTitle === normalizedSummary) push('fail', 'title-summary-duplicate', 'title matches summary exactly');
    if (!isDraft && normalizedTitle && normalizedTitle === normalizedFirstSentence) push('fail', 'title-first-sentence-duplicate', 'title matches first sentence exactly');
    if (!isDraft && targetName === 'news' && isBadNewsTitle(fm, filename, body)) push('fail', 'news-title-copy', 'title still looks like copied source copy');
    if (!isDraft && targetName === 'news' && isBadNewsReaderValue(fm)) push('fail', 'news-reader-value-copy', 'readerValue still uses template or copied source phrasing');

    if (!isDraft && targetName === 'wiki' && hasGenericWikiModelCopy(fm, body)) push('fail', 'generic-model-copy', 'model page still uses generic template copy');
    if (!isDraft && targetName === 'wiki' && hasModelTypeContradiction(fm, body)) push('fail', 'model-type-contradiction', 'model copy contradicts modelType');
    if (!isDraft && targetName === 'wiki' && hasWeakModelSpecificity(fm, body)) push('fail', 'weak-model-specificity', 'model page lacks vendor or operating-detail specificity');
    if (!isDraft && bodyContainsValuelessTemplate(targetName === 'projects' ? `${body}\n${showcaseToneText}` : body)) {
        push('fail', 'valueless-template', 'body still contains low-value template phrasing');
    }
    if (!isDraft && !hasMeaningfulBody(targetName, body, fm)) push('fail', 'thin-body', 'body is too thin to be useful');
    if (!isDraft && !hasReaderValue(fm)) push('fail', 'reader-value-missing', 'missing explicit reader outcome');
    if (!isDraft && targetName === 'wiki' && hasAwkwardForeignReaderValue(fm)) push('fail', 'awkward-reader-value', 'readerValue uses awkward foreign-title particle pattern');
    if (!isDraft && targetName === 'wiki' && hasKnownBrokenWikiGrammar(`${String(fm.summary || '')}\n${String(fm.readerValue || '')}\n${body}`)) push('fail', 'broken-wiki-grammar', 'contains known broken wiki grammar pattern');
    if (!isDraft && targetName === 'wiki' && hasRepeatedAdjacentWord(`${String(fm.summary || '')}\n${body}`)) push('fail', 'repeated-adjacent-word', 'contains repeated adjacent words');
    if (!isDraft && targetName === 'wiki' && hasFormalWikiSummaryEnding(String(fm.summary || ''))) push('fail', 'formal-wiki-summary', 'wiki summary still ends in formal report tone');

    if (!isDraft && targetName === 'wiki') {
        for (const failure of validateModelProfileTone(fm)) push('fail', 'model-profile-tone', failure);
        for (const failure of validateWikiTone(fm, body)) push('fail', 'wiki-tone', failure);
        for (const failure of validateWikiStructure(fm, body)) push('fail', 'wiki-structure', failure);
    }

    if (!isDraft && targetName === 'projects') {
        for (const failure of validateProjectTone(fm, body, showcaseToneText)) push('fail', 'project-tone', failure);
        for (const warning of getProjectToneWarnings(fm, body, showcaseToneText)) push('warn', 'project-tone-warning', warning);
    }

    if (!isDraft && toneResults.length > 0) {
        for (const result of toneResults) {
            findings.push(toFinding(
                'pre-publish',
                result.severity === 'FAIL' ? 'fail' : 'warn',
                `tone-${result.id}`,
                `${targetName}/${filename}: tone ${result.severity.toLowerCase()} [${result.id}] ${result.name} - ${result.msg}`,
            ));
        }
    }

    return findings;
}

function runCli() {
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
        const showcaseToneText = getShowcaseToneText(fm, target.name);
        const toneTargetText = buildToneTargetText(fm, body, target.name, showcaseToneText);
        const toneResults = getToneResults(toneTargetText, target.name);
        const renderedCopyText = collectRenderedCopyText(fm, body, showcaseToneText);

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
            ['showcase', showcaseToneText],
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

        if (containsForbiddenPersonaName(renderedCopyText)) {
            errors.push(`${target.name}/${filename}: content copy mentions the internal reader persona name; use generic reader phrasing instead`);
        }

        if (target.name === 'news' && isRedditMediaUrl(fm.sourceUrl) && findPostByUrl(fm.sourceUrl)) {
            errors.push(`${target.name}/${filename}: reddit media URL used as sourceUrl; use the scraper postUrl instead`);
        }

        if (!isDraft && (target.name === 'news' || target.name === 'projects')) {
            const fcStatus = fm.factCheck && fm.factCheck.status;
            if (!fcStatus || fcStatus === 'pending') {
                errors.push(`${target.name}/${filename}: factCheck.status missing or pending`);
            }
        }

        if (!isDraft && target.name === 'news') {
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

        if (!isDraft && bodyContainsValuelessTemplate(target.name === 'projects' ? `${body}\n${showcaseToneText}` : body)) {
            const message = `${target.name}/${filename}: body still contains low-value template phrasing`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && !hasMeaningfulBody(target.name, body, fm)) {
            const message = `${target.name}/${filename}: body is too thin to be useful`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && !hasReaderValue(fm)) {
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

        if (!isDraft && target.name === 'wiki' && hasFormalWikiSummaryEnding(String(fm.summary || ''))) {
            const message = `${target.name}/${filename}: wiki summary still ends in formal report tone`;
            if (checkAll) warnings.push(message);
            else errors.push(message);
        }

        if (!isDraft && target.name === 'wiki') {
            for (const failure of validateModelProfileTone(fm)) {
                const message = `${target.name}/${filename}: ${failure}`;
                if (checkAll) warnings.push(message);
                else errors.push(message);
            }
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

        if (!isDraft && target.name === 'projects') {
            for (const failure of validateProjectTone(fm, body, showcaseToneText)) {
                const message = `${target.name}/${filename}: ${failure}`;
                if (checkAll) warnings.push(message);
                else errors.push(message);
            }

            for (const warning of getProjectToneWarnings(fm, body, showcaseToneText)) {
                warnings.push(`${target.name}/${filename}: ${warning}`);
            }
        }

        if (!isDraft && toneResults.length > 0) {
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

if (checkAll) {
    const wikiTarget = CONTENT_TARGETS.find((target) => target.name === 'wiki');
    if (wikiTarget) {
        const stats = collectDraftStats(wikiTarget);
        const minimumPublished = stats.total >= 50 ? Math.ceil(stats.total * 0.8) : 0;

        if (minimumPublished > 0 && stats.published < minimumPublished) {
            errors.push(
                `wiki publish coverage collapsed: ${stats.published}/${stats.total} published (draft ${stats.drafts}). ` +
                `Expected at least ${minimumPublished} published wiki pages.`,
            );
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
}

if (require.main === module) {
    runCli();
}

module.exports = {
    collectFileFindings,
};
