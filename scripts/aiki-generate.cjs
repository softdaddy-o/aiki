const fs = require('fs');
const path = require('path');

// Paths — scraper output lives in the Docs repo
const SCRAPER_OUTPUT = process.env.SCRAPER_OUTPUT
    || 'F:/src3/Docs/social-scraper/accounts/softdaddy/output';
const NEWS_OUTPUT = path.resolve(__dirname, '../src/content/news/ko');

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
                });
            }
        } catch (e) {
            console.warn(`⚠️ Failed to parse ${file}: ${e.message}`);
        }
    }

    return allPosts;
}

// Filter AI-related posts from recent days
function filterAIPosts(posts, daysBack = 1) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);
    const cutoffStr = cutoff.toISOString().split('T')[0];

    const aiKeywords = [
        'ai', 'llm', 'gpt', 'claude', 'gemini', 'anthropic', 'openai',
        'machine learning', 'deep learning', 'transformer', 'neural',
        'rag', 'agent', 'mcp', 'fine-tuning', 'prompt', 'embedding',
        'mistral', 'llama', 'diffusion', 'multimodal', 'reasoning',
        'vibe coding', 'cursor', 'copilot', 'langchain', 'llamaindex',
    ];

    return posts.filter(post => {
        const text = (post.text || '').toLowerCase();
        const hasAIKeyword = aiKeywords.some(kw => text.includes(kw));
        const publishedDate = post.publishedAt ? post.publishedAt.split('T')[0] : '';
        const isRecent = publishedDate >= cutoffStr || !publishedDate;
        return hasAIKeyword && isRecent;
    });
}

// Generate markdown frontmatter + body for a post
function generateMarkdown(post, index) {
    const date = getKSTTimestamp();
    const today = getKSTDate();
    const firstLine = (post.text || '').split('\n')[0].substring(0, 80);
    const title = firstLine || `AI News ${index + 1}`;
    const summary = (post.text || '').substring(0, 200).replace(/\n/g, ' ').replace(/"/g, '\\"');
    const slug = `${today}-${index + 1}-${slugify(firstLine)}`;

    const sourceUrl = post.threadUrl || post.sourceUrls?.[0] || '';
    const sourceTitle = `${post.sourceAccount} (${post.platform})`;

    const md = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
lang: ko
category: news
summary: "${summary}"
sourceUrl: "${sourceUrl}"
sourceTitle: "${sourceTitle}"
draft: true
factCheck:
  status: pending
  date: "${today}"
  sources: []
  checks: []
tags: []
---

${post.text || ''}
`;

    return { slug, content: md };
}

// Main
function main() {
    const args = process.argv.slice(2);
    const daysBack = args.includes('--days') ? parseInt(args[args.indexOf('--days') + 1]) : 1;
    const maxPosts = args.includes('--max') ? parseInt(args[args.indexOf('--max') + 1]) : 10;

    console.log(`🚀 AIKI Generate — Reading from ${SCRAPER_OUTPUT}`);
    console.log(`   Days back: ${daysBack}, Max posts: ${maxPosts}`);

    // Ensure output directory
    if (!fs.existsSync(NEWS_OUTPUT)) {
        fs.mkdirSync(NEWS_OUTPUT, { recursive: true });
    }

    const posts = readScraperOutput();
    console.log(`📥 Read ${posts.length} posts from scraper output`);

    const aiPosts = filterAIPosts(posts, daysBack);
    console.log(`🤖 Filtered ${aiPosts.length} AI-related posts`);

    if (aiPosts.length === 0) {
        console.log('ℹ️ No AI posts found for the given period.');
        return;
    }

    // Sort by engagement
    aiPosts.sort((a, b) =>
        ((b.likeCount || 0) + (b.replyCount || 0)) -
        ((a.likeCount || 0) + (a.replyCount || 0))
    );

    const topPosts = aiPosts.slice(0, maxPosts);

    let created = 0;
    for (let i = 0; i < topPosts.length; i++) {
        const { slug, content } = generateMarkdown(topPosts[i], i);
        const filePath = path.join(NEWS_OUTPUT, `${slug}.md`);

        if (fs.existsSync(filePath)) {
            console.log(`⏭️ Skipped (exists): ${slug}.md`);
            continue;
        }

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✓ Created: ${slug}.md (draft)`);
        created++;
    }

    console.log(`\n✅ Done. Created ${created} new draft files in ${NEWS_OUTPUT}`);
    console.log(`   Review drafts and set 'draft: false' to publish.`);
}

main();
