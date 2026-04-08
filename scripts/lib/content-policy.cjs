const {
    OFFICIAL_DOMAINS,
    isMajorAICompanyOfficial,
} = require('./scoring.cjs');

const BACKFILL_START_YEAR = 2000;
const DAILY_RETENTION_DAYS = 120;
const WEEKLY_RETENTION_DAYS = 730;
const MONTHLY_RETENTION_DAYS = 3650;

const MODEL_RELEASE_KEYWORDS = [
    'gpt',
    'claude',
    'gemini',
    'gemma',
    'llama',
    'mistral',
    'mixtral',
    'deepseek',
    'qwen',
    'phi',
    'grok',
    'sora',
    'veo',
    'imagen',
    'lyria',
    'whisper',
    'dall-e',
    'flux',
    'reasoning',
    'multimodal',
    'open model',
    'open-model',
    'open weight',
    'open-weight',
    'model release',
    'launch',
    'preview',
];

const MODEL_RELEASE_TAGS = new Set([
    'model',
    'language-model',
    'small-language-model',
    'reasoning',
    'multimodal',
    'open-model',
    'open-weight',
    'video-generation',
    'image-generation',
    'music-generation',
    'audio',
    'assistant',
]);

function toDateOnly(value) {
    return String(value || '').slice(0, 10);
}

function daysSince(dateStr, now = new Date()) {
    const target = toDateOnly(dateStr);
    if (!target) {
        return Number.POSITIVE_INFINITY;
    }

    const targetDate = new Date(`${target}T00:00:00Z`);
    const diffMs = now.getTime() - targetDate.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function isWithinRetention(dateStr, maxDays, now = new Date()) {
    return daysSince(dateStr, now) <= maxDays;
}

function hasOfficialSource(url) {
    return OFFICIAL_DOMAINS.some((domain) => String(url || '').includes(domain));
}

function normalizeList(values) {
    return (values || [])
        .map((value) => String(value || '').toLowerCase().trim())
        .filter(Boolean);
}

function hasMajorModelReleaseSignal(input) {
    const tags = normalizeList(input.tags);
    const matchedKeywords = normalizeList(input.matchedKeywords || input._matchedKeywords);
    const wikiTerms = normalizeList(input.wikiTerms || input._wikiTerms);
    const title = String(input.title || input._firstLine || '').toLowerCase();
    const summary = String(input.summary || input.contentSnippet || '').toLowerCase();
    const text = String(input.text || '').toLowerCase();
    const haystack = `${title} ${summary} ${text}`;

    if (tags.some((tag) => MODEL_RELEASE_TAGS.has(tag))) {
        return true;
    }

    if (matchedKeywords.some((keyword) => MODEL_RELEASE_KEYWORDS.includes(keyword))) {
        return true;
    }

    if (wikiTerms.some((term) => MODEL_RELEASE_KEYWORDS.includes(term))) {
        return true;
    }

    return MODEL_RELEASE_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

function isYearlyMilestoneCandidate(input) {
    const score = Number(input.score ?? input._score ?? 0);
    const sourceCount = Number(input.sourceCount ?? input._sourceCount ?? 1);
    const url = input.sourceUrl || input.url || input._url || '';
    const official = hasOfficialSource(url);
    const majorOfficial = isMajorAICompanyOfficial(url);
    const modelSignal = hasMajorModelReleaseSignal(input);

    if (score < 80) {
        return false;
    }

    if (majorOfficial && official) {
        return true;
    }

    if (official && modelSignal) {
        return true;
    }

    if (modelSignal && sourceCount >= 2) {
        return true;
    }

    return score >= 92 && modelSignal;
}

function shouldPruneNews(input, now = new Date()) {
    if (isWithinRetention(input.date, MONTHLY_RETENTION_DAYS, now)) {
        return false;
    }

    return !isYearlyMilestoneCandidate(input);
}

module.exports = {
    BACKFILL_START_YEAR,
    DAILY_RETENTION_DAYS,
    WEEKLY_RETENTION_DAYS,
    MONTHLY_RETENTION_DAYS,
    isWithinRetention,
    hasOfficialSource,
    hasMajorModelReleaseSignal,
    isYearlyMilestoneCandidate,
    shouldPruneNews,
};
