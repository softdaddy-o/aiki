const fs = require('fs');
const path = require('path');

const SCRAPER_BASE = 'F:/src3/Docs/social-scraper/accounts/softdaddy';

let cachedPosts = null;

function loadCandidateFiles() {
    const files = [];

    const outputDir = path.join(SCRAPER_BASE, 'output');
    if (fs.existsSync(outputDir)) {
        for (const name of fs.readdirSync(outputDir)) {
            if (name.startsWith('reddit_') && name.endsWith('.json')) {
                files.push(path.join(outputDir, name));
            }
        }
    }

    const historyDir = path.join(SCRAPER_BASE, 'history');
    if (fs.existsSync(historyDir)) {
        for (const day of fs.readdirSync(historyDir)) {
            const dayDir = path.join(historyDir, day);
            if (!fs.statSync(dayDir).isDirectory()) {
                continue;
            }

            for (const name of fs.readdirSync(dayDir)) {
                if (name.startsWith('reddit_') && name.endsWith('.json')) {
                    const fullPath = path.join(dayDir, name);
                    if (!files.includes(fullPath)) {
                        files.push(fullPath);
                    }
                }
            }
        }
    }

    return files;
}

function getAllPosts() {
    if (cachedPosts) {
        return cachedPosts;
    }

    const posts = [];
    for (const filePath of loadCandidateFiles()) {
        try {
            const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            for (const post of payload.posts || []) {
                posts.push(post);
            }
        } catch {
            // Ignore unreadable scrape files.
        }
    }

    cachedPosts = posts;
    return posts;
}

function collectUrls(post) {
    return [
        post.postUrl,
        post.articleUrl,
        ...(Array.isArray(post.mediaUrls) ? post.mediaUrls : []),
    ]
        .filter(Boolean)
        .map((url) => String(url).trim());
}

function findPostByUrl(url) {
    if (!url) return null;

    const normalized = String(url).trim();
    for (const post of getAllPosts()) {
        if (collectUrls(post).includes(normalized)) {
            return post;
        }
    }

    return null;
}

function isRedditMediaUrl(url) {
    try {
        const parsed = new URL(String(url || '').trim());
        return parsed.hostname === 'i.redd.it' || parsed.hostname === 'v.redd.it';
    } catch {
        return false;
    }
}

module.exports = {
    findPostByUrl,
    isRedditMediaUrl,
};
