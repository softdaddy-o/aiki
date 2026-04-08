const fs = require('fs');
const path = require('path');

const {
    filterAndScorePosts,
    clusterPosts,
    classifyGrade,
    applyBudget,
    detectWikiTerms,
} = require('./lib/scoring.cjs');
const {
    BACKFILL_START_YEAR,
    isYearlyMilestoneCandidate,
} = require('./lib/content-policy.cjs');

// Paths
const HISTORY_BASE = 'F:/src3/Docs/social-scraper/accounts/softdaddy/history';
const NEWS_OUTPUT = path.resolve(__dirname, '../src/content/news/ko');
const PROGRESS_FILE = path.resolve(__dirname, '../data/backfill-progress.json');

// --- Progress tracking ---

function loadProgress() {
    try {
        if (!fs.existsSync(PROGRESS_FILE)) return createEmptyProgress();
        const raw = fs.readFileSync(PROGRESS_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return createEmptyProgress();
    }
}

function createEmptyProgress() {
    return {
        lastHistoryDate: null,
        lastMilestoneYear: null,
        processedDates: [],
        processedYears: [],
    };
}

function saveProgress(progress) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 4) + '\n', 'utf-8');
}

// --- Load existing articles for dedup ---

function loadExistingArticles() {
    if (!fs.existsSync(NEWS_OUTPUT)) return { urls: new Set(), titles: [] };
    const files = fs.readdirSync(NEWS_OUTPUT).filter(f => f.endsWith('.md'));
    const urls = new Set();
    const titles = [];

    for (const file of files) {
        try {
            const content = fs.readFileSync(path.join(NEWS_OUTPUT, file), 'utf-8');
            const urlMatch = content.match(/sourceUrl:\s*"([^"]+)"/);
            const titleMatch = content.match(/title:\s*"([^"]+)"/);
            if (urlMatch) urls.add(urlMatch[1]);
            if (titleMatch) titles.push(titleMatch[1].toLowerCase());
        } catch { /* skip */ }
    }

    return { urls, titles };
}

// --- History mode ---

function readHistoryDir(dateStr) {
    const historyDir = path.join(HISTORY_BASE, dateStr);
    if (!fs.existsSync(historyDir)) {
        console.error(`❌ History directory not found: ${historyDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(historyDir).filter(f => f.endsWith('.json'));
    const allPosts = [];

    for (const file of files) {
        try {
            const raw = fs.readFileSync(path.join(historyDir, file), 'utf-8');
            const data = JSON.parse(raw);
            if (!data.posts) continue;
            for (const post of data.posts) {
                allPosts.push({
                    ...post,
                    platform: data.platform,
                    sourceAccount: data.username,
                    _file: file,
                });
            }
        } catch (e) {
            console.warn(`⚠️ Failed to parse ${file}: ${e.message}`);
        }
    }

    return allPosts;
}

function computeDateConfidence(publishedAt, targetDate) {
    if (!publishedAt) return null; // will be skipped
    const pubDate = new Date(publishedAt);
    const target = new Date(targetDate + 'T00:00:00+09:00');
    const diffMs = Math.abs(pubDate.getTime() - target.getTime());
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours <= 24) return 'needs_verification';
    return 'high';
}

function runHistoryMode(dateStr, maxPosts) {
    console.error(`📂 AIKI Backfill — History mode for ${dateStr}`);

    const posts = readHistoryDir(dateStr);
    console.error(`📥 Read ${posts.length} posts from history/${dateStr}/`);

    // Filter out posts without publishedAt
    const withDate = posts.filter(p => p.publishedAt);
    const skipped = posts.length - withDate.length;
    if (skipped > 0) {
        console.error(`⚠️ Skipped ${skipped} posts without publishedAt`);
    }

    const existing = loadExistingArticles();
    console.error(`📄 Found ${existing.urls.size} existing articles (dedup)`);

    // For backfill, use a very large daysBack to avoid date cutoff filtering
    // (the history data is already from the target date)
    const candidates = filterAndScorePosts(withDate, 365, [], existing);
    console.error(`🤖 Filtered ${candidates.length} AI-related candidates`);

    if (candidates.length === 0) {
        console.error('ℹ️ No AI posts found for this date.');
        console.log(JSON.stringify({ publish: [], drafts: [], stats: { totalCandidates: 0 } }, null, 2));
        return;
    }

    const clustered = clusterPosts(candidates);
    console.error(`🔗 Clustered into ${clustered.length} topics`);

    // Apply wiki terms
    for (const c of clustered) {
        c._wikiTerms = detectWikiTerms((c.text || '') + ' ' + (c.contentSnippet || ''));
    }

    const milestoneCandidates = clustered.filter((candidate) => isYearlyMilestoneCandidate({
        title: candidate._firstLine,
        summary: candidate.contentSnippet,
        text: candidate.text,
        url: candidate._url,
        tags: candidate.tags,
        matchedKeywords: candidate._matchedKeywords,
        wikiTerms: candidate._wikiTerms,
        score: candidate._score,
        sourceCount: candidate._sourceCount,
    }));
    console.error(`Filtered to ${milestoneCandidates.length} milestone-class candidates`);

    if (milestoneCandidates.length === 0) {
        console.error('No major official or model-release candidates found for this date.');
        console.log(JSON.stringify({ publish: [], drafts: [], stats: { totalCandidates: 0 } }, null, 2));
        return;
    }

    // Apply budget
    const { publish, drafts } = applyBudget(milestoneCandidates);
    const topPublish = publish.slice(0, maxPosts);
    const topDrafts = drafts.slice(0, 5);

    const formatCandidate = (c, i, isDraft) => {
        const dateConfidence = computeDateConfidence(c.publishedAt, dateStr);
        return {
            rank: i + 1,
            score: c._score,
            grade: c._grade,
            draft: isDraft,
            platform: c.platform,
            sourceAccount: c.sourceAccount,
            title: c._firstLine,
            url: c._url,
            text: (c.text || '').substring(0, 500),
            contentSnippet: (c.contentSnippet || '').substring(0, 300),
            engagement: {
                likes: c.likeCount || 0,
                replies: c.replyCount || 0,
            },
            publishedAt: c.publishedAt || '',
            isOfficial: c._isOfficial,
            matchedKeywords: c._matchedKeywords,
            sourceCount: c._sourceCount || 1,
            allPlatforms: c._allPlatforms || [c.platform],
            allUrls: c._allUrls || [c._url],
            wikiTerms: c._wikiTerms || [],
            _file: c._file,
            backfilled: true,
            backfilledDate: dateStr,
            dateConfidence: dateConfidence,
        };
    };

    const output = {
        publish: topPublish.map((c, i) => formatCandidate(c, i, false)),
        drafts: topDrafts.map((c, i) => formatCandidate(c, i, true)),
        stats: {
            totalCandidates: milestoneCandidates.length,
            clusteredFrom: clustered.reduce((sum, c) => sum + (c._sourceCount || 1), 0),
            milestoneCandidates: milestoneCandidates.length,
            gradeA: milestoneCandidates.filter(c => classifyGrade(c) === 'A').length,
            gradeB: milestoneCandidates.filter(c => classifyGrade(c) === 'B').length,
            gradeC: milestoneCandidates.filter(c => classifyGrade(c) === 'C').length,
            belowCutoff: milestoneCandidates.filter(c => c._score < 40).length,
            toPublish: topPublish.length,
            toDraft: topDrafts.length,
            skippedNoDate: skipped,
        },
    };

    console.log(JSON.stringify(output, null, 2));

    // Update progress
    const progress = loadProgress();
    progress.lastHistoryDate = dateStr;
    if (!progress.processedDates.includes(dateStr)) {
        progress.processedDates.push(dateStr);
        progress.processedDates.sort();
    }
    saveProgress(progress);
    console.error(`✓ Updated backfill progress: ${dateStr} marked as processed`);
}

// --- Milestone mode ---

function runMilestoneMode(year) {
    console.error(`🏛️ AIKI Backfill — Milestone mode for ${year}`);

    if (year < BACKFILL_START_YEAR) {
        console.error(`Milestone backfill starts at ${BACKFILL_START_YEAR}.`);
        process.exit(1);
    }

    const queries = [
        { query: `official AI model release ${year} OpenAI Google DeepMind Anthropic Meta Mistral DeepSeek`, year: year, bucket: 'major-vendors' },
        { query: `official AI launch ${year} GPT Claude Gemini Llama Qwen DeepSeek Mixtral Gemma`, year: year, bucket: 'flagship-models' },
        { query: `official AI reasoning model multimodal model release ${year}`, year: year, bucket: 'model-capabilities' },
        { query: `official AI announcement ${year} product launch foundation model release`, year: year, bucket: 'official-announcements' },
    ];

    console.log(JSON.stringify(queries, null, 2));

    // Update progress
    const progress = loadProgress();
    progress.lastMilestoneYear = year;
    if (!progress.processedYears.includes(year)) {
        progress.processedYears.push(year);
        progress.processedYears.sort();
    }
    saveProgress(progress);
    console.error(`✓ Updated backfill progress: ${year} marked as processed`);
}

// --- Main ---

function main() {
    const args = process.argv.slice(2);

    const isHistory = args.includes('--history');
    const isMilestone = args.includes('--milestone');

    if (!isHistory && !isMilestone) {
        console.error('Usage:');
        console.error('  node aiki-backfill.cjs --history --date 2026-03-20 [--max 3]');
        console.error('  node aiki-backfill.cjs --milestone --year 2024 [--max 2]');
        process.exit(1);
    }

    if (isHistory) {
        const dateIdx = args.indexOf('--date');
        if (dateIdx === -1 || !args[dateIdx + 1]) {
            console.error('❌ --history requires --date YYYY-MM-DD');
            process.exit(1);
        }
        const dateStr = args[dateIdx + 1];
        const maxPosts = args.includes('--max') ? parseInt(args[args.indexOf('--max') + 1]) : 5;
        runHistoryMode(dateStr, maxPosts);
    }

    if (isMilestone) {
        const yearIdx = args.indexOf('--year');
        if (yearIdx === -1 || !args[yearIdx + 1]) {
            console.error('❌ --milestone requires --year YYYY');
            process.exit(1);
        }
        const year = parseInt(args[yearIdx + 1]);
        runMilestoneMode(year);
    }
}

main();
