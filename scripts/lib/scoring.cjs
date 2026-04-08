const fs = require('fs');
const path = require('path');

// Official/authoritative domains get priority
const OFFICIAL_DOMAINS = [
    'anthropic.com', 'openai.com', 'deepmind.google', 'ai.meta.com',
    'mistral.ai', 'arxiv.org', 'blog.google', 'research.google',
    'huggingface.co', 'github.blog', 'microsoft.com/en-us/research',
];

// AI keyword filter
const AI_KEYWORDS = [
    'ai', 'llm', 'gpt', 'claude', 'gemini', 'anthropic', 'openai',
    'machine learning', 'deep learning', 'transformer', 'neural',
    'rag', 'agent', 'mcp', 'fine-tuning', 'prompt', 'embedding',
    'mistral', 'llama', 'diffusion', 'multimodal', 'reasoning',
    'vibe coding', 'cursor', 'copilot', 'langchain', 'llamaindex',
    'deepseek', 'qwen', 'phi-4', 'grok', 'perplexity', 'windsurf',
];

const AI_CORE_KEYWORDS = [
    'llm', 'gpt', 'claude', 'gemini', 'anthropic', 'openai', 'transformer',
    'rag', 'agent', 'mcp', 'fine-tuning', 'prompt', 'embedding', 'mistral',
    'llama', 'diffusion', 'multimodal', 'reasoning', 'vibe coding',
    'cursor', 'copilot', 'langchain', 'llamaindex', 'deepseek', 'qwen',
    'grok', 'perplexity', 'model', 'inference', 'benchmark', 'distill',
];

const AI_EXCLUDE_KEYWORDS = [
    'mlb', 'baseball', 'nba', 'nfl', 'nhl', 'premier league', 'soccer',
    'football', 'cricket', 'fifa', 'no fap', 'nofap', 'porn',
];

const MAJOR_AI_COMPANY_DOMAINS = [
    'openai.com',
    'anthropic.com',
    'blog.google',
    'deepmind.google',
    'ai.meta.com',
    'meta.com',
    'mistral.ai',
    'x.ai',
];

// KST date helpers
function getKSTDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getKSTTimestamp() {
    const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
    return kst.toISOString().replace('Z', '+09:00');
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\uAC00-\uD7AF]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 40);
}

// Simple title similarity (word overlap ratio)
function titleSimilarity(a, b) {
    const wordsA = new Set(a.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    const wordsB = new Set(b.toLowerCase().split(/\s+/).filter(w => w.length > 2));
    if (wordsA.size === 0 || wordsB.size === 0) return 0;
    let overlap = 0;
    for (const w of wordsA) {
        if (wordsB.has(w)) overlap++;
    }
    return overlap / Math.min(wordsA.size, wordsB.size);
}

function countKeywordMatches(text, keywords) {
    return keywords.filter(keyword => text.includes(keyword)).length;
}

function isClearlyOffTopic(text, url) {
    const haystack = `${text} ${url}`.toLowerCase();
    return AI_EXCLUDE_KEYWORDS.some(keyword => haystack.includes(keyword));
}

function hasStrongAISignal(text, url, matchedKeywords) {
    const haystack = `${text} ${url}`.toLowerCase();
    const coreMatches = countKeywordMatches(haystack, AI_CORE_KEYWORDS);
    return coreMatches >= 1 || matchedKeywords.length >= 2;
}

function isMajorAICompanyOfficial(url) {
    return MAJOR_AI_COMPANY_DOMAINS.some(domain => url.includes(domain));
}

function filterAndScorePosts(posts, daysBack, themes, existing) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);
    const cutoffStr = cutoff.toISOString().split('T')[0];

    const trendingKeywords = themes.flatMap(t => t.keywords.map(k => k.toLowerCase()));

    // Dedup within candidates by URL
    const seenUrls = new Set();

    return posts
        .map(post => {
            const text = `${post.text || ''} ${post.contentSnippet || ''}`.toLowerCase();
            const url = post.threadUrl || post.sourceUrls?.[0] || post.articleUrl || post.postUrl || '';

            // Must be AI-related
            const matchedKeywords = AI_KEYWORDS.filter(kw => text.includes(kw));
            if (matchedKeywords.length === 0) return null;
            if (isClearlyOffTopic(text, url)) return null;
            if (!hasStrongAISignal(text, url, matchedKeywords)) return null;

            // Must be recent
            const publishedDate = post.publishedAt ? post.publishedAt.split('T')[0] : '';
            if (publishedDate && publishedDate < cutoffStr) return null;

            // Dedup: skip if URL already exists in AIKI or in this batch
            if (url && existing.urls.has(url)) return null;
            if (url && seenUrls.has(url)) return null;
            if (url) seenUrls.add(url);

            // Dedup: skip if title too similar
            const firstLine = (post.text || '').split('\n')[0].substring(0, 80);
            const isDuplicate = existing.titles.some(t => titleSimilarity(firstLine, t) > 0.7);
            if (isDuplicate) return null;

            // Scoring
            let score = 0;

            // Official source bonus
            const isOfficial = OFFICIAL_DOMAINS.some(d => url.includes(d));
            if (isOfficial) score += 30;

            // Trending theme bonus
            const trendMatch = trendingKeywords.filter(k => text.includes(k));
            if (trendMatch.length > 0) score += Math.min(trendMatch.length * 10, 20);

            // Engagement
            const engagement = (post.likeCount || 0) + (post.replyCount || 0);
            if (engagement > 100) score += 15;
            else if (engagement > 20) score += 10;
            else if (engagement > 5) score += 5;

            // Blog posts with full articles are better
            if (post.platform === 'blog' && post.articleUrl) score += 10;

            // Content richness bonus — posts with actual text content
            const textLen = (post.text || '').length + (post.contentSnippet || '').length;
            if (textLen > 500) score += 15;
            else if (textLen > 200) score += 10;
            else if (textLen > 50) score += 5;
            else score -= 20; // Penalize empty/title-only posts (e.g. HF model cards)

            // Recency bonus (today = +10, yesterday = +5)
            const today = getKSTDate();
            if (publishedDate === today) score += 10;
            else if (publishedDate >= cutoffStr) score += 5;

            // Age penalty
            if (publishedDate) {
                const ageMs = Date.now() - new Date(publishedDate).getTime();
                const ageDays = ageMs / (1000 * 60 * 60 * 24);
                if (ageDays > 3) score -= 30;
            }

            return {
                ...post,
                _score: score,
                _matchedKeywords: matchedKeywords,
                _isOfficial: isOfficial,
                _isMajorAICompanyOfficial: isMajorAICompanyOfficial(url),
                _url: url,
                _firstLine: firstLine,
            };
        })
        .filter(Boolean)
        .sort((a, b) => b._score - a._score);
}

// Cluster posts about the same topic from multiple sources
function clusterPosts(candidates) {
    const MAX_BONUS = 45;
    const BONUS_PER_SOURCE = 15;
    const TITLE_SIM_THRESHOLD = 0.5;
    const KEYWORD_OVERLAP_THRESHOLD = 0.7;

    function keywordOverlap(a, b) {
        const setA = new Set(a._matchedKeywords);
        const setB = new Set(b._matchedKeywords);
        if (setA.size === 0 || setB.size === 0) return 0;
        let overlap = 0;
        for (const k of setA) { if (setB.has(k)) overlap++; }
        return overlap / Math.min(setA.size, setB.size);
    }

    function isSameTopic(a, b) {
        if (titleSimilarity(a._firstLine, b._firstLine) > TITLE_SIM_THRESHOLD) return true;
        if (keywordOverlap(a, b) > KEYWORD_OVERLAP_THRESHOLD) return true;
        return false;
    }

    // Build clusters using greedy grouping
    const used = new Set();
    const clusters = [];

    for (let i = 0; i < candidates.length; i++) {
        if (used.has(i)) continue;
        const cluster = [candidates[i]];
        used.add(i);

        for (let j = i + 1; j < candidates.length; j++) {
            if (used.has(j)) continue;
            if (isSameTopic(candidates[i], candidates[j])) {
                cluster.push(candidates[j]);
                used.add(j);
            }
        }
        clusters.push(cluster);
    }

    // Merge each cluster into a single primary candidate
    const results = clusters.map(sources => {
        // Pick highest-scored as primary
        sources.sort((a, b) => b._score - a._score);
        const primary = { ...sources[0] };

        // Multi-source bonus
        const bonus = Math.min((sources.length - 1) * BONUS_PER_SOURCE, MAX_BONUS);
        primary._score += bonus;

        // Cluster metadata
        primary._sourceCount = sources.length;
        primary._allUrls = sources.map(s => s._url).filter(Boolean);
        primary._allPlatforms = [...new Set(sources.map(s => s.platform))];

        // Merge keywords from all sources
        const mergedKeywords = new Set(primary._matchedKeywords);
        for (const s of sources) {
            for (const k of s._matchedKeywords) mergedKeywords.add(k);
        }
        primary._matchedKeywords = [...mergedKeywords];

        // Take richest contentSnippet (longest)
        let richest = primary.contentSnippet || '';
        for (const s of sources) {
            if ((s.contentSnippet || '').length > richest.length) {
                richest = s.contentSnippet;
            }
        }
        primary.contentSnippet = richest;

        return primary;
    });

    // Sort by score DESC
    results.sort((a, b) => b._score - a._score);
    return results;
}

// Grade classification
// A: mandatory — official source + (trending OR multi-platform)
// B: recommended — official OR high engagement OR trending
// C: review — keyword match only
function classifyGrade(candidate) {
    const isOfficial = candidate._isOfficial;
    const isTrending = candidate._matchedKeywords.length >= 2;
    const hasEngagement = (candidate.likeCount || 0) + (candidate.replyCount || 0) > 20;
    const hasRichContent = ((candidate.text || '').length + (candidate.contentSnippet || '').length) > 200;

    if (isOfficial && (isTrending || hasEngagement)) return 'A';
    if (isOfficial || hasEngagement || isTrending) return 'B';
    return 'C';
}

// Apply daily budget with grade-based selection + diversity
function applyBudget(candidates) {
    const SCORE_CUTOFF = 40;
    const MAX_DAILY = 7;
    const MAX_B = 3;
    const MAX_SAME_TOPIC = 2;

    // Score cutoff
    const viable = candidates.filter(c => c._score >= SCORE_CUTOFF);

    // Classify grades
    const graded = viable.map(c => ({ ...c, _grade: classifyGrade(c) }));

    // Topic diversity check
    function keywordOverlap(a, b) {
        const setA = new Set(a._matchedKeywords);
        const setB = new Set(b._matchedKeywords);
        if (setA.size === 0 || setB.size === 0) return 0;
        let overlap = 0;
        for (const k of setA) { if (setB.has(k)) overlap++; }
        return overlap / Math.min(setA.size, setB.size);
    }

    const publish = [];  // draft: false
    const drafts = [];   // draft: true
    let bCount = 0;
    const topicGroups = {}; // keyword -> count

    for (const c of graded) {
        // Check topic diversity
        const topicKey = c._matchedKeywords.sort().join(',');
        const topicCount = topicGroups[topicKey] || 0;
        const isSameTopicOverflow = topicCount >= MAX_SAME_TOPIC;

        // Also check overlap with already selected
        const similarCount = publish.filter(p => keywordOverlap(p, c) > 0.5).length;

        if (c._grade === 'A' && publish.length < MAX_DAILY && similarCount < MAX_SAME_TOPIC) {
            publish.push(c);
            topicGroups[topicKey] = topicCount + 1;
        } else if (c._grade === 'B' && bCount < MAX_B && publish.length < MAX_DAILY && similarCount < MAX_SAME_TOPIC) {
            publish.push(c);
            bCount++;
            topicGroups[topicKey] = topicCount + 1;
        } else if (c._grade === 'C' || isSameTopicOverflow || publish.length >= MAX_DAILY) {
            drafts.push(c);
        } else {
            drafts.push(c);
        }
    }

    return { publish, drafts };
}

// Detect wiki terms in text
function detectWikiTerms(text) {
    const wikiTermsPath = path.resolve(__dirname, '../../data/wiki-terms.json');
    try {
        if (!fs.existsSync(wikiTermsPath)) return [];
        const raw = fs.readFileSync(wikiTermsPath, 'utf-8');
        const terms = JSON.parse(raw);
        const lower = text.toLowerCase();
        const matched = [];

        for (const entry of terms) {
            const namesToCheck = [entry.term, ...(entry.aliases || [])];
            const found = namesToCheck.some(name => lower.includes(name.toLowerCase()));
            if (found) matched.push(entry.term);
        }

        return matched;
    } catch {
        return [];
    }
}

module.exports = {
    OFFICIAL_DOMAINS,
    AI_KEYWORDS,
    AI_CORE_KEYWORDS,
    AI_EXCLUDE_KEYWORDS,
    MAJOR_AI_COMPANY_DOMAINS,
    getKSTDate,
    getKSTTimestamp,
    slugify,
    titleSimilarity,
    countKeywordMatches,
    isClearlyOffTopic,
    hasStrongAISignal,
    isMajorAICompanyOfficial,
    filterAndScorePosts,
    clusterPosts,
    classifyGrade,
    applyBudget,
    detectWikiTerms,
};
