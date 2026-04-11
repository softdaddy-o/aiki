#!/usr/bin/env node
// Fetch og:image from each news entry's sourceUrl and cache under public/og/news/{slug}.jpg.

import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NEWS_DIR = path.join(ROOT, 'src/content/news');
const OUT_DIR = path.join(ROOT, 'public/og/news');
const FAILURES_PATH = path.join(ROOT, 'data/og-failures.json');
const CURL_BIN = process.platform === 'win32' ? 'curl.exe' : 'curl';
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';
const DEFAULT_CURL_HEADERS = [
    '-H', `User-Agent: ${BROWSER_UA}`,
    '-H', 'Accept-Language: en-US,en;q=0.9',
];

function extractYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match ? match[1] : null;
}

function resolveUrl(baseUrl, maybeRelativeUrl) {
    try {
        return new URL(maybeRelativeUrl, baseUrl).href;
    } catch {
        return maybeRelativeUrl;
    }
}

function fetchHtmlWithCurl(pageUrl) {
    try {
        return execFileSync(
            CURL_BIN,
            ['-L', '-s', '--max-time', '15', ...DEFAULT_CURL_HEADERS, pageUrl],
            { encoding: 'utf-8', maxBuffer: 5 * 1024 * 1024 },
        );
    } catch {
        return null;
    }
}

function fetchOgImage(pageUrl) {
    const ytId = extractYouTubeId(pageUrl);
    if (ytId) {
        return Promise.resolve(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
    }

    if (/reddit\.com\/r\/[^/]+\/comments\/[a-z0-9]+/i.test(pageUrl)) {
        return fetchRedditPreview(pageUrl);
    }

    const curlHtml = fetchHtmlWithCurl(pageUrl);
    if (curlHtml) {
        const match =
            curlHtml.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
            || curlHtml.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
            || curlHtml.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
            || curlHtml.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
        if (match) {
            return Promise.resolve(resolveUrl(pageUrl, match[1].replace(/&amp;/g, '&')));
        }
    }

    return new Promise((resolve) => {
        const lib = pageUrl.startsWith('https:') ? https : http;
        const req = lib.get(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 }, (res) => {
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(fetchOgImage(resolveUrl(pageUrl, res.headers.location)));
            }

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
                if (data.length > 200000) {
                    req.destroy();
                }
            });
            res.on('end', () => {
                const match =
                    data.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                    || data.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
                resolve(match ? resolveUrl(pageUrl, match[1].replace(/&amp;/g, '&')) : null);
            });
        });

        req.on('error', () => resolve(null));
        req.on('timeout', () => {
            req.destroy();
            resolve(null);
        });
    });
}

function fetchRedditPreview(redditUrl) {
    const jsonUrl = redditUrl.replace(/\/?(\?.*)?$/, '/.json');
    const fullUrl = jsonUrl.startsWith('https://') ? jsonUrl : `https://www.${jsonUrl.replace(/^https?:\/\//, '')}`;

    try {
        const raw = execFileSync(
            CURL_BIN,
            ['-L', '-s', '--max-time', '10', '-H', 'User-Agent: AIKI/1.0', '-H', 'Accept: application/json', fullUrl],
            { encoding: 'utf-8', maxBuffer: 1024 * 1024 },
        );
        const json = JSON.parse(raw);
        const post = json?.[0]?.data?.children?.[0]?.data;
        const previewUrl = post?.preview?.images?.[0]?.source?.url;

        if (previewUrl) {
            return Promise.resolve(previewUrl.replace(/&amp;/g, '&'));
        }
        if (post?.url_overridden_by_dest && /\.(jpg|jpeg|png|gif|webp)/i.test(post.url_overridden_by_dest)) {
            return Promise.resolve(post.url_overridden_by_dest);
        }
        if (post?.thumbnail && post.thumbnail.startsWith('http')) {
            return Promise.resolve(post.thumbnail.replace(/&amp;/g, '&'));
        }
        return Promise.resolve(null);
    } catch {
        return Promise.resolve(null);
    }
}

function downloadFile(fileUrl, destPath) {
    const curlResult = spawnSync(
        CURL_BIN,
        ['-L', '-s', '--fail', '--max-time', '20', ...DEFAULT_CURL_HEADERS, '-o', destPath, fileUrl],
        { stdio: 'ignore' },
    );
    if (curlResult.status === 0 && fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
        return Promise.resolve(true);
    }

    return new Promise((resolve) => {
        const lib = fileUrl.startsWith('https:') ? https : http;
        const file = fs.createWriteStream(destPath);

        const cleanup = () => {
            file.close(() => {
                fs.rm(destPath, { force: true }, () => {});
            });
        };

        lib.get(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                cleanup();
                return resolve(downloadFile(resolveUrl(fileUrl, res.headers.location), destPath));
            }
            if (res.statusCode !== 200) {
                cleanup();
                return resolve(false);
            }

            res.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(true));
            });
        }).on('error', () => {
            cleanup();
            resolve(false);
        });
    });
}

function walkMarkdown(dir) {
    const results = [];
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            results.push(...walkMarkdown(full));
        } else if (name.endsWith('.md')) {
            results.push(full);
        }
    }
    return results;
}

function slugFromPath(mdPath) {
    const rel = path.relative(NEWS_DIR, mdPath).replace(/\\/g, '/');
    return rel.replace(/^ko\//, '').replace(/\.md$/, '');
}

async function main() {
    if (process.env.AIKI_SKIP_NEWS_OG_FETCH === '1') {
        console.log('skipped=true reason=AIKI_SKIP_NEWS_OG_FETCH');
        return;
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });

    const failures = fs.existsSync(FAILURES_PATH)
        ? JSON.parse(fs.readFileSync(FAILURES_PATH, 'utf-8'))
        : {};

    const files = walkMarkdown(NEWS_DIR);
    let fetched = 0;
    let skipped = 0;
    let failed = 0;

    for (const file of files) {
        const source = fs.readFileSync(file, 'utf-8');
        const { data: frontmatter } = matter(source);

        if (frontmatter.lang && frontmatter.lang !== 'ko') {
            continue;
        }
        if (!frontmatter.sourceUrl) {
            continue;
        }

        const slug = slugFromPath(file);
        const outPath = path.join(OUT_DIR, `${slug}.jpg`);
        if (fs.existsSync(outPath)) {
            delete failures[slug];
            skipped++;
            continue;
        }
        if (failures[slug]) {
            skipped++;
            continue;
        }

        console.log(`[fetch] ${slug} <- ${frontmatter.sourceUrl}`);
        const ogUrl = await fetchOgImage(frontmatter.sourceUrl);
        if (!ogUrl) {
            failures[slug] = 'no og:image found';
            failed++;
            continue;
        }

        const ok = await downloadFile(ogUrl, outPath);
        if (ok) {
            delete failures[slug];
            fetched++;
        } else {
            failures[slug] = `download failed: ${ogUrl}`;
            failed++;
        }
    }

    fs.writeFileSync(FAILURES_PATH, `${JSON.stringify(failures, null, 2)}\n`);
    console.log(`\nfetched=${fetched} skipped=${skipped} failed=${failed}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
