const fs = require('fs');
const path = require('path');

const {
    OFFICIAL_DOMAINS,
    AI_KEYWORDS,
    getKSTDate,
    getKSTTimestamp,
    slugify,
    titleSimilarity,
    filterAndScorePosts,
    clusterPosts,
    classifyGrade,
    applyBudget,
    detectWikiTerms,
} = require('./lib/scoring.cjs');

// Paths — scraper output lives in the Docs repo
const SCRAPER_OUTPUT = process.env.SCRAPER_OUTPUT
    || 'F:/src3/Docs/social-scraper/accounts/softdaddy/output';
const NEWS_OUTPUT = path.resolve(__dirname, '../src/content/news/ko');
const TRENDING_THEMES = process.env.TRENDING_THEMES
    || 'F:/src3/Docs/social-scraper/accounts/softdaddy/trending-themes.json';

// Read all scraper JSON files
function readScraperOutput() {
    if (!fs.existsSync(SCRAPER_OUTPUT)) {
        console.error(`❌ Scraper output not found: ${SCRAPER_OUTPUT}`);
        process.exit(1);
    }

    const files = fs.readdirSync(SCRAPER_OUTPUT).filter(f => f.endsWith('.json'));
    const allPosts = [];

    for (const file of files) {
        try {
            const raw = fs.readFileSync(path.join(SCRAPER_OUTPUT, file), 'utf-8');
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

// Load trending themes
function loadTrendingThemes() {
    try {
        if (!fs.existsSync(TRENDING_THEMES)) return [];
        const raw = fs.readFileSync(TRENDING_THEMES, 'utf-8');
        const data = JSON.parse(raw);
        return (data.themes || []).map(t => ({
            name: t.name,
            keywords: t.keywords || [],
            frequency: t.frequency?.last7days || 0,
        }));
    } catch {
        return [];
    }
}

// Load existing articles for dedup
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

// Output candidate JSON for the skill to consume
function outputCandidates(candidates, maxPosts) {
    const { publish, drafts } = applyBudget(candidates);
    const topPublish = publish.slice(0, maxPosts);
    const topDrafts = drafts.slice(0, 5);

    const formatCandidate = (c, i, isDraft) => ({
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
    });

    return {
        publish: topPublish.map((c, i) => formatCandidate(c, i, false)),
        drafts: topDrafts.map((c, i) => formatCandidate(c, i, true)),
        stats: {
            totalCandidates: candidates.length,
            clusteredFrom: candidates.reduce((sum, c) => sum + (c._sourceCount || 1), 0),
            gradeA: candidates.filter(c => classifyGrade(c) === 'A').length,
            gradeB: candidates.filter(c => classifyGrade(c) === 'B').length,
            gradeC: candidates.filter(c => classifyGrade(c) === 'C').length,
            belowCutoff: candidates.filter(c => c._score < 40).length,
            toPublish: topPublish.length,
            toDraft: topDrafts.length,
        },
    };
}

// Main
function main() {
    const args = process.argv.slice(2);
    const daysBack = args.includes('--days') ? parseInt(args[args.indexOf('--days') + 1]) : 1;
    const maxPosts = args.includes('--max') ? parseInt(args[args.indexOf('--max') + 1]) : 10;
    const jsonOutput = args.includes('--json');

    console.error(`🚀 AIKI Generate — Reading from ${SCRAPER_OUTPUT}`);
    console.error(`   Days back: ${daysBack}, Max posts: ${maxPosts}`);

    const posts = readScraperOutput();
    console.error(`📥 Read ${posts.length} posts from scraper output`);

    const themes = loadTrendingThemes();
    console.error(`📈 Loaded ${themes.length} trending themes`);

    const existing = loadExistingArticles();
    console.error(`📄 Found ${existing.urls.size} existing articles (dedup)`);

    const candidates = filterAndScorePosts(posts, daysBack, themes, existing);
    console.error(`🤖 Filtered ${candidates.length} AI-related candidates`);

    if (candidates.length === 0) {
        console.error('ℹ️ No AI posts found for the given period.');
        if (jsonOutput) console.log('[]');
        return;
    }

    const clustered = clusterPosts(candidates);
    console.error(`🔗 Clustered into ${clustered.length} topics (from ${candidates.length} candidates)`);

    for (const c of clustered) {
        c._wikiTerms = detectWikiTerms((c.text || '') + ' ' + (c.contentSnippet || ''));
    }

    const output = outputCandidates(clustered, maxPosts);

    if (jsonOutput) {
        // JSON mode: output to stdout for skill consumption
        console.log(JSON.stringify(output, null, 2));
    } else {
        // Human-readable mode
        const { stats } = output;
        console.log(`\n📊 등급 분포: A=${stats.gradeA} B=${stats.gradeB} C=${stats.gradeC} (컷오프 미달=${stats.belowCutoff})`);
        console.log(`📰 발행 예정: ${stats.toPublish}건 | 드래프트: ${stats.toDraft}건\n`);

        if (output.publish.length > 0) {
            console.log(`── 🟢 발행 (draft: false) ──`);
            for (const c of output.publish) {
                const officialBadge = c.isOfficial ? ' 🏛️' : '';
                const srcBadge = c.sourceCount > 1 ? ` ×${c.sourceCount}` : '';
                const wikiLine = c.wikiTerms.length > 0 ? `\n     📖 ${c.wikiTerms.join(', ')}` : '';
                console.log(`  ${c.rank}. [${c.score}${srcBadge}|${c.grade}] ${c.platform}/${c.sourceAccount}${officialBadge}`);
                console.log(`     ${c.title}`);
                console.log(`     ❤️ ${c.engagement.likes} 💬 ${c.engagement.replies} | 🏷️ ${c.matchedKeywords.join(', ')}${wikiLine}`);
                console.log('');
            }
        }

        if (output.drafts.length > 0) {
            console.log(`── 🟡 드래프트 (draft: true) ──`);
            for (const c of output.drafts) {
                const officialBadge = c.isOfficial ? ' 🏛️' : '';
                const srcBadge = c.sourceCount > 1 ? ` ×${c.sourceCount}` : '';
                const wikiLine = c.wikiTerms.length > 0 ? `\n     📖 ${c.wikiTerms.join(', ')}` : '';
                console.log(`  ${c.rank}. [${c.score}${srcBadge}|${c.grade}] ${c.platform}/${c.sourceAccount}${officialBadge}`);
                console.log(`     ${c.title}${wikiLine}`);
                console.log('');
            }
        }
    }
}

main();
