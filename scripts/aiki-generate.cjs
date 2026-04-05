const fs = require('fs');
const path = require('path');

// Paths — scraper output lives in the Docs repo
const SCRAPER_OUTPUT = process.env.SCRAPER_OUTPUT
    || 'F:/src3/Docs/social-scraper/accounts/softdaddy/output';
const NEWS_OUTPUT = path.resolve(__dirname, '../src/content/news/ko');
const TRENDING_THEMES = process.env.TRENDING_THEMES
    || 'F:/src3/Docs/social-scraper/accounts/softdaddy/trending-themes.json';

// Official/authoritative domains get priority
const OFFICIAL_DOMAINS = [
    'anthropic.com', 'openai.com', 'deepmind.google', 'ai.meta.com',
    'mistral.ai', 'arxiv.org', 'blog.google', 'research.google',
    'huggingface.co', 'github.blog', 'microsoft.com/en-us/research',
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

// AI keyword filter
const AI_KEYWORDS = [
    'ai', 'llm', 'gpt', 'claude', 'gemini', 'anthropic', 'openai',
    'machine learning', 'deep learning', 'transformer', 'neural',
    'rag', 'agent', 'mcp', 'fine-tuning', 'prompt', 'embedding',
    'mistral', 'llama', 'diffusion', 'multimodal', 'reasoning',
    'vibe coding', 'cursor', 'copilot', 'langchain', 'llamaindex',
    'deepseek', 'qwen', 'phi-4', 'grok', 'perplexity', 'windsurf',
];

function filterAndScorePosts(posts, daysBack, themes, existing) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);
    const cutoffStr = cutoff.toISOString().split('T')[0];

    const trendingKeywords = themes.flatMap(t => t.keywords.map(k => k.toLowerCase()));

    // Dedup within candidates by URL
    const seenUrls = new Set();

    return posts
        .map(post => {
            const text = (post.text || '').toLowerCase();
            const url = post.threadUrl || post.sourceUrls?.[0] || post.articleUrl || post.postUrl || '';

            // Must be AI-related
            const matchedKeywords = AI_KEYWORDS.filter(kw => text.includes(kw));
            if (matchedKeywords.length === 0) return null;

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

// Detect wiki terms in text
function detectWikiTerms(text) {
    const wikiTermsPath = path.resolve(__dirname, '../data/wiki-terms.json');
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

// Grade classification
// A: 필수 발행 — 공식 블로그 + (트렌딩 OR 다중 플랫폼)
// B: 발행 권장 — 공식 소스 OR engagement 높음 OR 트렌딩
// C: 검토 후 결정 — 키워드 매칭만
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
// Rules:
//   - Score cutoff: 40 미만 무조건 제외
//   - A등급: 전부 발행 (최대 7)
//   - B등급: 최대 3건
//   - C등급: 드래프트만 (draft: true)
//   - 같은 주제 (키워드 50%+ 겹침) 최대 2건
//   - 일일 최소 1건, 최대 7건 (발행 기준)
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
    const topicGroups = {}; // keyword → count

    for (const c of graded) {
        // Check topic diversity
        const topicKey = c._matchedKeywords.sort().join(',');
        const topicCount = topicGroups[topicKey] || 0;
        const isSameTopicOverflow = topicCount >= MAX_SAME_TOPIC;

        // Also check overlap with already selected
        const hasSimilarSelected = publish.some(p => keywordOverlap(p, c) > 0.5);
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
