'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { checkTone, printResults, PROFILES } = require('./lib/aiki-tone-rules.cjs');

const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');
const PROJECTS_DIR = path.resolve(__dirname, '../src/content/projects/ko');

const args = process.argv.slice(2);

function getArg(flag) {
    const index = args.indexOf(flag);
    return index >= 0 && args[index + 1] ? args[index + 1] : null;
}

const platform = getArg('--platform') || 'blog';
const dateArg = getArg('--date');
const fileArg = getArg('--file');
const textArg = getArg('--text');

if (!PROFILES[platform]) {
    console.error(`Unsupported platform: ${platform}`);
    console.error(`Available platforms: ${Object.keys(PROFILES).join(', ')}`);
    process.exit(2);
}

function kstToday() {
    const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function extractMarkdownBody(content) {
    const fmEnd = content.indexOf('---', content.indexOf('---') + 3);
    if (fmEnd < 0) return content;
    return content.slice(fmEnd + 3).trim();
}

function extractMarkdownToneTarget(content) {
    const parsed = matter(content);
    return [
        String(parsed.data && parsed.data.summary || '').trim(),
        String(parsed.data && parsed.data.readerValue || '').trim(),
        String(parsed.content || '').trim(),
    ]
        .filter(Boolean)
        .join('\n\n');
}

function extractTqBody(content) {
    return content
        .split('\n')
        .filter((line) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('- ##')) return false;
            if (/^\w+::/.test(trimmed)) return false;
            if (trimmed === '-' || trimmed === '') return false;
            return true;
        })
        .map((line) => line.replace(/^-\s*/, '').trim())
        .filter(Boolean)
        .join('\n');
}

function collectInputs() {
    if (textArg) {
        return [{ label: '(text)', body: textArg }];
    }

    if (fileArg) {
        const filepath = path.resolve(fileArg);
        if (!fs.existsSync(filepath)) {
            console.error(`File not found: ${filepath}`);
            process.exit(2);
        }

        const content = fs.readFileSync(filepath, 'utf8');
        const body = platform === 'short' ? extractTqBody(content) : extractMarkdownToneTarget(content);
        return [{ label: path.basename(filepath), body }];
    }

    const targetDate = dateArg || kstToday();

    if (platform === 'blog' || platform === 'projects') {
        const contentDir = platform === 'projects' ? PROJECTS_DIR : NEWS_DIR;
        if (!fs.existsSync(contentDir)) {
            console.error(`Content directory not found: ${contentDir}`);
            process.exit(2);
        }

        return fs.readdirSync(contentDir)
            .filter((filename) => filename.startsWith(targetDate) && filename.endsWith('.md'))
            .sort()
            .map((filename) => {
                const content = fs.readFileSync(path.join(contentDir, filename), 'utf8');
                return { label: filename, body: extractMarkdownToneTarget(content) };
            });
    }

    if (platform === 'short') {
        const logseqGraph = process.env.LOGSEQ_GRAPH_PATH || 'D:/LogseqData';
        const tqPath = path.join(logseqGraph, 'pages', `TQ Threads ${targetDate}.md`);
        if (!fs.existsSync(tqPath)) {
            console.error(`TQ page not found: ${tqPath}`);
            process.exit(2);
        }

        const content = fs.readFileSync(tqPath, 'utf8');
        const posts = [];
        let current = null;

        for (const line of content.split('\n')) {
            const match = line.match(/^-?\s*## (\d+)\.\s+(.+)/);
            if (match) {
                if (current) posts.push(current);
                current = { number: Number(match[1]), title: match[2].trim(), lines: [] };
            } else if (current) {
                current.lines.push(line);
            }
        }

        if (current) posts.push(current);

        return posts
            .filter((post) => !post.title.startsWith('보류'))
            .map((post) => ({
                label: `Post ${post.number}: ${post.title.slice(0, 40)}`,
                body: extractTqBody(post.lines.join('\n')),
            }));
    }

    return [];
}

const inputs = collectInputs();
if (inputs.length === 0) {
    console.error(`No input found for ${dateArg || kstToday()}`);
    process.exit(2);
}

console.log(`\nTone check: ${PROFILES[platform].name} (${inputs.length})\n`);

let totalFails = 0;
let totalWarns = 0;

for (const { label, body } of inputs) {
    if (!body || body.trim().length < 10) {
        console.log(`WARN ${label}: skipped because body is too short\n`);
        continue;
    }

    const results = checkTone(body, platform);
    totalFails += results.filter((result) => result.severity === 'FAIL').length;
    totalWarns += results.filter((result) => result.severity === 'WARN').length;
    printResults(label, results);
}

console.log('='.repeat(60));
if (totalFails > 0) {
    console.log(`\nFAIL ${totalFails} fail(s), ${totalWarns} warning(s)\n`);
    process.exit(1);
}

if (totalWarns > 0) {
    console.log(`\nWARN ${totalWarns} warning(s)\n`);
    process.exit(0);
}

console.log('\nPASS all content matches the active tone rules.\n');
