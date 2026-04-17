const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { writeUtf8 } = require('./content-utils.cjs');
const { catalog } = require('./wiki-catalog.cjs');
const { getEntryVariants, normalizePhrase } = require('./wiki-term-registry.cjs');

const DEFAULT_WIKI_DISCOVERY_QUOTA = 5;
const BACKLOG_FILE = 'data/wiki-discovery-backlog.json';
const REPORT_FILE = 'data/wiki-term-candidates.json';
const NEWS_DIR = 'src/content/news/ko';
const WIKI_DIR = 'src/content/wiki/ko';
const TECHNICAL_KEYWORDS = [
    'agent',
    'api',
    'benchmark',
    'cache',
    'checkpoint',
    'cli',
    'context',
    'dataset',
    'decoding',
    'distill',
    'distillation',
    'embedding',
    'framework',
    'gpu',
    'inference',
    'kernel',
    'license',
    'memory',
    'model',
    'moe',
    'open-weight',
    'open-source',
    'open model',
    'open-model',
    'prompt',
    'protocol',
    'quantization',
    'rag',
    'reasoning',
    'routing',
    'runtime',
    'sdk',
    'server',
    'speculative',
    'studio',
    'token',
    'tokenizer',
    'training',
    'vram',
    'weight',
    'weights',
];
const GENERIC_STOPWORDS = new Set([
    'ai',
    'aiki',
    'blog',
    'blueprint',
    'chrome',
    'claude',
    'facebook',
    'gemini',
    'google',
    'google ai',
    'github',
    'linkedin',
    'meta',
    'open source',
    'open-source',
    'reddit',
    'threads',
    'twitter',
    'youtube',
]);
const MODEL_HINT_RE = /\b(claude|dall-e|deepseek|gemini|gemma|glm|gpt|grok|imagen|kimi|llama|lyria|mistral|mixtral|opus|phi|qwen|sonnet|sora|veo|whisper)\b/i;
const TOOL_HINT_RE = /\b(api|app|bot|chat|cli|code|copilot|cursor|ide|sdk|service|studio|tool)\b/i;
const FRAMEWORK_HINT_RE = /\b(db|engine|framework|graph|index|platform|protocol|runtime|server|stack|workflow)\b/i;
const TECHNIQUE_HINT_RE = /\b(agentic|benchmark|cache|caching|decoding|distill|distillation|embedding|eval|fine[- ]tuning|guardrail|prompt|quantization|reasoning|red teaming|retrieval|tokenization|training)\b/i;
const VERSION_HINT_RE = /\b(v?\d+(?:\.\d+)+|\d+[bkmt])\b/i;
const SOURCE_REF_LIMIT = 8;
const SAMPLE_LIMIT = 3;

function repoRoot(rootDir) {
    return rootDir || path.resolve(__dirname, '../..');
}

function isoDate(value = new Date()) {
    return value.toISOString().slice(0, 10);
}

function isoTimestamp(value = new Date()) {
    return value.toISOString();
}

function listMarkdownFiles(rootDir, relativeDir) {
    const directory = path.join(repoRoot(rootDir), relativeDir);
    if (!fs.existsSync(directory)) {
        return [];
    }

    return fs.readdirSync(directory)
        .filter((name) => name.endsWith('.md'))
        .map((name) => path.join(directory, name));
}

function readJson(filePath, fallback) {
    if (!fs.existsSync(filePath)) {
        return fallback;
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function safeArray(values) {
    return Array.isArray(values) ? values.filter(Boolean) : [];
}

function trimText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
}

function stripMarkdownDecorators(value) {
    return trimText(value)
        .replace(/^\s*[-*+]\s+/u, '')
        .replace(/^[`"'“”‘’(\[]+/u, '')
        .replace(/[`"'“”‘’)\].,:;!?]+$/u, '')
        .replace(/\*\*/g, '')
        .replace(/__/g, '')
        .replace(/\*/g, '')
        .replace(/_/g, ' ');
}

function humanizeSlug(value) {
    return trimText(String(value || '').replace(/[-_]+/g, ' '));
}

function slugifyTerm(value) {
    return trimText(String(value || ''))
        .toLowerCase()
        .replace(/[’'"]/gu, '')
        .replace(/&/g, ' and ')
        .replace(/[^\p{L}\p{N}.+\- ]+/gu, ' ')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^\-|\-$/g, '');
}

function normalizeCandidate(value) {
    return normalizePhrase(stripMarkdownDecorators(value))
        .replace(/\s+/g, ' ')
        .trim();
}

function buildKnownVariantSet(rootDir) {
    const root = repoRoot(rootDir);
    const known = new Set();
    const termsFile = path.join(root, 'data/wiki-terms.json');
    const wikiFiles = listMarkdownFiles(root, WIKI_DIR);
    const rows = readJson(termsFile, []);

    for (const row of rows) {
        for (const variant of getEntryVariants(row)) {
            known.add(normalizeCandidate(variant).toLowerCase());
        }
    }

    for (const row of catalog) {
        for (const variant of getEntryVariants(row)) {
            known.add(normalizeCandidate(variant).toLowerCase());
        }
    }

    for (const filePath of wikiFiles) {
        const parsed = matter(fs.readFileSync(filePath, 'utf8'));
        const entry = {
            term: parsed.data?.term || path.basename(filePath, '.md'),
            title: parsed.data?.title || '',
            aliases: safeArray(parsed.data?.aliases),
        };
        for (const variant of getEntryVariants(entry)) {
            known.add(normalizeCandidate(variant).toLowerCase());
        }
    }

    return known;
}

function looksTechnicalLowercasePhrase(value) {
    const normalized = value.toLowerCase();
    if (normalized.includes('.') || normalized.includes('-')) {
        return true;
    }

    return TECHNICAL_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function shouldKeepCandidate(value, knownSet, kind) {
    const normalized = normalizeCandidate(value);
    const key = normalized.toLowerCase();
    const tokens = normalized.split(/\s+/).filter(Boolean);

    if (!normalized || tokens.length === 0 || tokens.length > 5) {
        return false;
    }

    if (normalized.length < 3 || !/[A-Za-z]/.test(normalized)) {
        return false;
    }

    if (knownSet.has(key) || GENERIC_STOPWORDS.has(key)) {
        return false;
    }

    if (/^(the|this|that|with|from|into|when|where|which)$/i.test(normalized)) {
        return false;
    }

    if (kind === 'tag' || kind === 'inline_code' || kind === 'markdown_link') {
        return /[0-9.+-]/.test(normalized)
            || /[A-Z]{2,}/.test(normalized)
            || /[A-Z][a-z]+(?:\s+[A-Z][a-z0-9.+-]+)+/.test(normalized)
            || looksTechnicalLowercasePhrase(normalized);
    }

    return /[0-9.+-]/.test(normalized)
        || /[A-Z]{2,}/.test(normalized)
        || /^[A-Z][A-Za-z0-9.+-]+(?:\s+[A-Z][A-Za-z0-9.+-]+){0,4}$/.test(normalized)
        || looksTechnicalLowercasePhrase(normalized);
}

function pushDocHit(store, rawValue, kind, knownSet) {
    const normalized = normalizeCandidate(rawValue);
    if (!shouldKeepCandidate(normalized, knownSet, kind)) {
        return;
    }

    const key = normalized.toLowerCase();
    const prev = store.get(key) || {
        term: normalized,
        kinds: new Set(),
    };

    if (!prev.term || rawValue.length > prev.term.length) {
        prev.term = normalized;
    }

    prev.kinds.add(kind);
    store.set(key, prev);
}

function collectPatternMatches(text, regex) {
    const source = String(text || '');
    const matches = [];
    let match = regex.exec(source);

    while (match) {
        matches.push(match[1] || match[0]);
        match = regex.exec(source);
    }

    return matches;
}

function collectDocumentHits(doc, knownSet) {
    const store = new Map();
    const phraseSources = [doc.title, doc.summary, doc.readerValue, doc.body];

    for (const tag of doc.tags) {
        pushDocHit(store, tag, 'tag', knownSet);
    }

    for (const text of phraseSources) {
        for (const match of collectPatternMatches(text, /\[([^\]]{2,80})\]\([^)]+\)/g)) {
            pushDocHit(store, match, 'markdown_link', knownSet);
        }

        for (const match of collectPatternMatches(text, /`([^`\n]{2,80})`/g)) {
            pushDocHit(store, match, 'inline_code', knownSet);
        }

        const capitalized = String(text || '').match(/\b[A-Z][A-Za-z0-9.+-]*(?:\s+[A-Z][A-Za-z0-9.+-]*){0,4}\b/g) || [];
        for (const match of capitalized) {
            pushDocHit(store, match, 'phrase', knownSet);
        }

        const modelish = String(text || '').match(/\b[A-Za-z][A-Za-z0-9.+-]*\d[A-Za-z0-9.+-]*(?:\s+[A-Za-z0-9.+-]+){0,3}\b/g) || [];
        for (const match of modelish) {
            pushDocHit(store, match, 'versioned_phrase', knownSet);
        }
    }

    return [...store.values()].map((item) => ({
        term: item.term,
        kinds: [...item.kinds].sort(),
    }));
}

function extractExternalSources(frontmatter) {
    const candidates = [];

    if (frontmatter.sourceUrl) {
        candidates.push({
            url: String(frontmatter.sourceUrl),
            title: String(frontmatter.sourceTitle || frontmatter.title || frontmatter.sourceUrl),
        });
    }

    for (const source of safeArray(frontmatter.factCheck?.sources)) {
        if (!source?.url) continue;
        candidates.push({
            url: String(source.url),
            title: String(source.title || source.url),
        });
    }

    const seen = new Set();
    return candidates.filter((candidate) => {
        const key = candidate.url.trim();
        if (!key || seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    }).slice(0, SOURCE_REF_LIMIT);
}

function readSourceDocuments(rootDir) {
    const root = repoRoot(rootDir);
    const newsDocs = listMarkdownFiles(root, NEWS_DIR).map((filePath) => {
        const parsed = matter(fs.readFileSync(filePath, 'utf8'));
        const slug = path.basename(filePath, '.md');
        return {
            kind: 'news',
            ref: slug,
            date: trimText(parsed.data?.date || slug.slice(0, 10)),
            title: trimText(parsed.data?.title),
            summary: trimText(parsed.data?.summary),
            readerValue: trimText(parsed.data?.readerValue),
            body: String(parsed.content || ''),
            tags: safeArray(parsed.data?.tags).map((value) => trimText(value)),
            category: trimText(parsed.data?.category || 'news'),
            knownTermHints: safeArray(parsed.data?.tags).map((value) => slugifyTerm(value)).filter(Boolean),
            externalSources: extractExternalSources(parsed.data || {}),
        };
    });
    const wikiDocs = listMarkdownFiles(root, WIKI_DIR).map((filePath) => {
        const parsed = matter(fs.readFileSync(filePath, 'utf8'));
        const term = trimText(parsed.data?.term || path.basename(filePath, '.md'));
        return {
            kind: 'wiki',
            ref: term,
            date: trimText(parsed.data?.firstMentioned || parsed.data?.factCheck?.date || ''),
            title: trimText(parsed.data?.title),
            summary: trimText(parsed.data?.summary),
            readerValue: trimText(parsed.data?.readerValue),
            body: String(parsed.content || ''),
            tags: safeArray(parsed.data?.tags).map((value) => trimText(value)),
            category: trimText(parsed.data?.category || 'concept'),
            knownTermHints: [
                term,
                ...safeArray(parsed.data?.relatedTerms),
                ...safeArray(parsed.data?.tags).map((value) => slugifyTerm(value)),
            ].map((value) => slugifyTerm(value)).filter(Boolean),
            externalSources: extractExternalSources(parsed.data || {}),
        };
    });

    return [...newsDocs, ...wikiDocs];
}

function bumpTerm(store, candidate, doc) {
    const key = normalizeCandidate(candidate.term).toLowerCase();
    const current = store.get(key) || {
        term: candidate.term,
        slug: slugifyTerm(candidate.term),
        occurrences: 0,
        distinctSourceCount: 0,
        kinds: new Set(),
        sourceKinds: new Set(),
        newsSourceSlugs: new Set(),
        wikiSourceTerms: new Set(),
        knownTermHints: new Set(),
        sourceTitles: new Set(),
        sourceUrls: new Map(),
        sampleRefs: new Set(),
        firstMentioned: null,
        lastMentioned: null,
    };

    if (candidate.term.length > current.term.length) {
        current.term = candidate.term;
        current.slug = slugifyTerm(candidate.term);
    }

    current.occurrences += candidate.kinds.length;
    current.distinctSourceCount += 1;

    for (const kind of candidate.kinds) {
        current.kinds.add(kind);
    }

    current.sourceKinds.add(doc.kind);

    if (doc.kind === 'news') {
        current.newsSourceSlugs.add(doc.ref);
    } else {
        current.wikiSourceTerms.add(doc.ref);
    }

    for (const hint of safeArray(doc.knownTermHints)) {
        if (hint && hint !== current.slug) {
            current.knownTermHints.add(hint);
        }
    }

    if (doc.title) {
        current.sourceTitles.add(doc.title);
    }

    for (const source of doc.externalSources) {
        if (!current.sourceUrls.has(source.url)) {
            current.sourceUrls.set(source.url, source.title);
        }
    }

    current.sampleRefs.add(`${doc.kind}:${doc.ref}`);

    if (doc.date) {
        if (!current.firstMentioned || doc.date < current.firstMentioned) {
            current.firstMentioned = doc.date;
        }
        if (!current.lastMentioned || doc.date > current.lastMentioned) {
            current.lastMentioned = doc.date;
        }
    }

    store.set(key, current);
}

function guessDiscoveryCategory(candidate) {
    const source = `${candidate.term} ${candidate.slug}`;
    const hints = (candidate.knownTermHints || []).join(' ');

    if (/^[A-Z]{2,5}$/.test(candidate.term)) {
        return 'concept';
    }

    if (MODEL_HINT_RE.test(source) || (VERSION_HINT_RE.test(source) && MODEL_HINT_RE.test(hints))) {
        return 'model';
    }

    if (TOOL_HINT_RE.test(source)) {
        return 'tool';
    }

    if (FRAMEWORK_HINT_RE.test(source)) {
        return 'framework';
    }

    if (TECHNIQUE_HINT_RE.test(source)) {
        return 'technique';
    }

    return 'concept';
}

function guessModelType(candidate) {
    if (guessDiscoveryCategory(candidate) !== 'model') {
        return undefined;
    }

    return VERSION_HINT_RE.test(candidate.term) ? 'version' : 'family';
}

function scoreDiscoveryCandidate(candidate) {
    let score = 0;
    const normalizedTerm = String(candidate.term || '').toLowerCase();
    score += Math.min(32, candidate.occurrences * 4);
    score += Math.min(24, candidate.distinctSourceCount * 5);

    if (candidate.sourceKinds.includes('news')) score += 8;
    if (candidate.sourceKinds.includes('wiki')) score += 12;
    if (candidate.sourceKinds.includes('news') && candidate.sourceKinds.includes('wiki')) score += 10;
    if (candidate.kinds.includes('tag')) score += 6;
    if (candidate.kinds.includes('markdown_link') || candidate.kinds.includes('inline_code')) score += 6;

    const categoryGuess = guessDiscoveryCategory(candidate);
    if (categoryGuess === 'model') score += 16;
    if (categoryGuess === 'tool' || categoryGuess === 'framework' || categoryGuess === 'technique') score += 8;
    if ((candidate.kinds || []).length === 1 && candidate.kinds.includes('tag')) score -= 18;
    if (/^[A-Z]{2,5}$/.test(candidate.term)) score -= 12;
    if ((candidate.term || '').includes(' ')) score += 6;
    if (VERSION_HINT_RE.test(candidate.term || '')) score += 8;
    if (
        categoryGuess === 'concept'
        && !normalizedTerm.includes(' ')
        && /^[a-z0-9.+-]{3,12}$/i.test(normalizedTerm)
        && !MODEL_HINT_RE.test(normalizedTerm)
        && !TOOL_HINT_RE.test(normalizedTerm)
        && !FRAMEWORK_HINT_RE.test(normalizedTerm)
        && !TECHNIQUE_HINT_RE.test(normalizedTerm)
    ) {
        score -= 18;
    }

    if (['ai api', 'dense', 'experts', 'language model', 'mixture', 'open model', 'pro'].includes(normalizedTerm)) {
        score -= 16;
    }

    return Math.min(100, score);
}

function finalizeCandidate(candidate) {
    const output = {
        term: candidate.term,
        slug: candidate.slug,
        occurrences: candidate.occurrences,
        distinctSourceCount: candidate.distinctSourceCount,
        kinds: [...candidate.kinds].sort(),
        sourceKinds: [...candidate.sourceKinds].sort(),
        newsSourceSlugs: [...candidate.newsSourceSlugs].sort().slice(0, SOURCE_REF_LIMIT),
        wikiSourceTerms: [...candidate.wikiSourceTerms].sort().slice(0, SOURCE_REF_LIMIT),
        knownTermHints: [...candidate.knownTermHints].sort().slice(0, SOURCE_REF_LIMIT),
        sourceTitles: [...candidate.sourceTitles].sort().slice(0, SOURCE_REF_LIMIT),
        sourceUrls: [...candidate.sourceUrls.entries()].slice(0, SOURCE_REF_LIMIT).map(([url, title]) => ({ url, title })),
        sampleRefs: [...candidate.sampleRefs].sort().slice(0, SAMPLE_LIMIT),
        firstMentioned: candidate.firstMentioned,
        lastMentioned: candidate.lastMentioned,
    };

    output.categoryGuess = guessDiscoveryCategory(output);
    if (output.categoryGuess === 'model') {
        output.modelType = guessModelType(output);
    }
    output.priority = scoreDiscoveryCandidate(output);
    return output;
}

function discoverWikiCandidates(options = {}) {
    const rootDir = repoRoot(options.rootDir);
    const knownSet = buildKnownVariantSet(rootDir);
    const docs = readSourceDocuments(rootDir);
    const store = new Map();

    for (const doc of docs) {
        const hits = collectDocumentHits(doc, knownSet);
        for (const hit of hits) {
            bumpTerm(store, hit, doc);
        }
    }

    return [...store.values()]
        .map(finalizeCandidate)
        .filter((candidate) =>
            candidate.distinctSourceCount >= 2
            || candidate.kinds.includes('tag')
            || candidate.sourceKinds.includes('wiki')
        )
        .sort((a, b) =>
            b.priority - a.priority
            || b.distinctSourceCount - a.distinctSourceCount
            || b.occurrences - a.occurrences
            || a.term.localeCompare(b.term)
        );
}

function loadDiscoveryBacklog(rootDir) {
    const filePath = path.join(repoRoot(rootDir), BACKLOG_FILE);
    return readJson(filePath, { updatedAt: null, quota: DEFAULT_WIKI_DISCOVERY_QUOTA, items: [] });
}

function mergeDiscoveryBacklog(existingBacklog, discoveredCandidates, options = {}) {
    const root = repoRoot(options.rootDir);
    const wikiDir = path.join(root, WIKI_DIR);
    const knownSet = buildKnownVariantSet(root);
    const today = options.today || isoDate();
    const existingBySlug = new Map(safeArray(existingBacklog.items).map((item) => [item.slug, item]));
    const nextItems = [];
    const seen = new Set();

    for (const candidate of discoveredCandidates) {
        const prev = existingBySlug.get(candidate.slug) || null;
        const filePath = path.join(wikiDir, `${candidate.slug}.md`);
        const hasFile = fs.existsSync(filePath);
        const status = hasFile
            ? 'generated'
            : (prev?.status === 'skipped' ? 'skipped' : 'pending');

        nextItems.push({
            ...candidate,
            status,
            firstSeenAt: prev?.firstSeenAt || today,
            lastSeenAt: today,
            seenInCurrentRun: true,
            generatedAt: hasFile ? (prev?.generatedAt || today) : (prev?.generatedAt || null),
            generatedFile: hasFile ? path.relative(root, filePath).replace(/\\/g, '/') : (prev?.generatedFile || null),
            lastQueuedAt: prev?.lastQueuedAt || null,
            generationCount: hasFile
                ? Math.max(Number(prev?.generationCount || 0), 1)
                : Number(prev?.generationCount || 0),
            lastError: prev?.lastError || null,
        });
        seen.add(candidate.slug);
    }

    for (const item of safeArray(existingBacklog.items)) {
        if (seen.has(item.slug)) {
            continue;
        }

        const filePath = path.join(wikiDir, `${item.slug}.md`);
        const hasFile = fs.existsSync(filePath);
        const knownNow = knownSet.has(normalizeCandidate(item.term).toLowerCase());
        nextItems.push({
            ...item,
            status: hasFile
                ? 'generated'
                : (knownNow ? 'resolved' : (item.status || 'pending')),
            seenInCurrentRun: false,
            generatedAt: hasFile ? (item.generatedAt || today) : item.generatedAt || null,
            generatedFile: hasFile ? path.relative(root, filePath).replace(/\\/g, '/') : item.generatedFile || null,
        });
    }

    nextItems.sort((a, b) =>
        (a.status === 'pending' ? 0 : 1) - (b.status === 'pending' ? 0 : 1)
        || b.priority - a.priority
        || b.distinctSourceCount - a.distinctSourceCount
        || a.term.localeCompare(b.term)
    );

    return {
        updatedAt: options.updatedAt || isoTimestamp(),
        quota: Number(existingBacklog.quota || DEFAULT_WIKI_DISCOVERY_QUOTA),
        items: nextItems,
    };
}

function toCandidateReportItem(item) {
    return {
        term: item.term,
        slug: item.slug,
        status: item.status,
        priority: item.priority,
        categoryGuess: item.categoryGuess,
        occurrences: item.occurrences,
        distinctSourceCount: item.distinctSourceCount,
        kinds: item.kinds,
        sourceKinds: item.sourceKinds,
        newsSourceSlugs: item.newsSourceSlugs,
        wikiSourceTerms: item.wikiSourceTerms,
        knownTermHints: item.knownTermHints,
        firstMentioned: item.firstMentioned,
        lastMentioned: item.lastMentioned,
    };
}

function writeDiscoveryBacklog(rootDir, backlog) {
    const filePath = path.join(repoRoot(rootDir), BACKLOG_FILE);
    writeUtf8(filePath, `${JSON.stringify(backlog, null, 2)}\n`);
    return filePath;
}

function writeCandidateReport(rootDir, backlog) {
    const filePath = path.join(repoRoot(rootDir), REPORT_FILE);
    const rows = safeArray(backlog.items).map(toCandidateReportItem);
    writeUtf8(filePath, `${JSON.stringify(rows, null, 2)}\n`);
    return filePath;
}

function refreshWikiDiscoveryBacklog(options = {}) {
    const rootDir = repoRoot(options.rootDir);
    const existing = loadDiscoveryBacklog(rootDir);
    const discovered = discoverWikiCandidates({ rootDir });
    const backlog = mergeDiscoveryBacklog(existing, discovered, {
        rootDir,
        today: options.today || isoDate(),
        updatedAt: options.updatedAt || isoTimestamp(),
    });

    if (options.write !== false) {
        writeDiscoveryBacklog(rootDir, backlog);
    }

    if (options.writeReport !== false) {
        writeCandidateReport(rootDir, backlog);
    }

    return {
        backlog,
        discovered,
    };
}

function selectDiscoveryQuota(backlog, quota = DEFAULT_WIKI_DISCOVERY_QUOTA) {
    const limit = Number.isFinite(quota) && quota > 0 ? quota : DEFAULT_WIKI_DISCOVERY_QUOTA;
    return safeArray(backlog.items)
        .filter((item) =>
            item.status === 'pending'
            && item.seenInCurrentRun !== false
        )
        .sort((a, b) =>
            b.priority - a.priority
            || b.distinctSourceCount - a.distinctSourceCount
            || b.occurrences - a.occurrences
            || a.term.localeCompare(b.term)
        )
        .slice(0, limit);
}

function buildDiscoveryEntry(candidate) {
    const title = trimText(candidate.term);
    const aliases = [humanizeSlug(candidate.slug), title]
        .filter(Boolean)
        .filter((value, index, list) => list.indexOf(value) === index);
    const tags = candidate.knownTermHints
        .filter((value) => value && value !== candidate.slug)
        .slice(0, 5);
    const relatedTerms = candidate.knownTermHints
        .filter((value) => value && value !== candidate.slug)
        .slice(0, 6);
    const sources = candidate.sourceUrls
        .map((item) => ({ type: 'url', url: item.url, title: item.title }))
        .slice(0, 3);

    return {
        term: candidate.slug,
        title,
        category: candidate.categoryGuess || 'concept',
        sources,
        aliases,
        tags,
        priority: candidate.priority,
        modelType: candidate.modelType,
        parentModel: candidate.parentModel,
        relatedTerms,
        mentionStats: {
            mentionCount: candidate.distinctSourceCount,
            firstMentioned: candidate.firstMentioned || null,
        },
    };
}

module.exports = {
    BACKLOG_FILE,
    DEFAULT_WIKI_DISCOVERY_QUOTA,
    REPORT_FILE,
    buildDiscoveryEntry,
    buildKnownVariantSet,
    discoverWikiCandidates,
    guessDiscoveryCategory,
    mergeDiscoveryBacklog,
    normalizeCandidate,
    refreshWikiDiscoveryBacklog,
    scoreDiscoveryCandidate,
    selectDiscoveryQuota,
    slugifyTerm,
    writeCandidateReport,
    writeDiscoveryBacklog,
};
