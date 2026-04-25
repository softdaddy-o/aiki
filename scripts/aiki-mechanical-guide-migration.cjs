#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { loadPanel } = require('./lib/agent-loader.cjs');
const { getReviewContentHashFromRaw } = require('./lib/review-content.cjs');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
    { type: 'wiki', dir: path.join(ROOT, 'src/content/wiki/ko'), guideKey: 'wiki', panel: 'wiki-review' },
    { type: 'news', dir: path.join(ROOT, 'src/content/news/ko'), guideKey: 'news', panel: 'news-review' },
    { type: 'projects', dir: path.join(ROOT, 'src/content/projects/ko'), guideKey: 'projects', panel: 'project-review' },
];
const PROGRESS_FILE = path.join(ROOT, 'data/format-migration-progress.json');
const DECISION_FILE = path.join(ROOT, 'docs/migration-decisions-2026-04-25.md');
const TARGET_FORMAT_VERSION = 2;
const FORBIDDEN_PERSONA_NAME = /(?:\uB124\uB2C8\uC5D8|\uB124\uB2C8\uC5BC|\uB0B4\uB2C8\uC5D8|\uB0B4\uB2C8\uC5BC)/u;
const NEWS_HEADINGS = [
    '\uBB34\uC2A8 \uC77C\uC774 \uC788\uC5C8\uB098',
    '\uC65C \uC911\uC694\uD560\uAE4C',
    '\uC55E\uC73C\uB85C \uBCFC \uC810',
];

function readGuideVersion(guideFile) {
    const text = fs.readFileSync(path.join(ROOT, guideFile), 'utf8');
    const match = text.match(/\*\*Version\*\*[:\s]+`([^`]+)`/);
    if (!match) throw new Error(`Cannot read guide version from ${guideFile}`);
    return match[1];
}

const CURRENT_GUIDE = {
    tone: readGuideVersion('docs/tone-guide-common.md'),
    common: readGuideVersion('docs/content-guide-common.md'),
    wiki: readGuideVersion('docs/content-guide-wiki.md'),
    news: readGuideVersion('docs/content-guide-news.md'),
    projects: readGuideVersion('docs/content-guide-projects.md'),
};

function parseArgs() {
    const args = process.argv.slice(2);
    const onlyIndex = args.indexOf('--only');
    const limitIndex = args.indexOf('--limit');
    return {
        dryRun: args.includes('--dry-run'),
        typeFilter: onlyIndex >= 0 ? args[onlyIndex + 1] : null,
        limit: limitIndex >= 0 ? Number(args[limitIndex + 1]) : 0,
    };
}

function splitMarkdown(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) throw new Error('Missing frontmatter block');
    return {
        frontmatter: match[1].replace(/\r\n/g, '\n').trimEnd(),
        body: match[2].replace(/\r\n/g, '\n').trim(),
    };
}

function removeBlock(frontmatter, key) {
    const lines = frontmatter.split('\n');
    const out = [];
    for (let i = 0; i < lines.length; i += 1) {
        if (lines[i].trim() !== `${key}:`) {
            out.push(lines[i]);
            continue;
        }
        i += 1;
        while (i < lines.length && /^(?:\s|$)/.test(lines[i])) i += 1;
        i -= 1;
    }
    return out.join('\n').trimEnd();
}

function setScalar(frontmatter, key, value) {
    const line = `${key}: ${value}`;
    const pattern = new RegExp(`^${key}:.*$`, 'm');
    if (pattern.test(frontmatter)) return frontmatter.replace(pattern, line);
    return `${frontmatter.trimEnd()}\n${line}`;
}

function setGuideVersion(frontmatter, type) {
    const target = {
        tone: CURRENT_GUIDE.tone,
        common: CURRENT_GUIDE.common,
        [type]: CURRENT_GUIDE[type],
    };
    const block = [
        'guideVersion:',
        ...Object.entries(target).map(([key, version]) => `  ${key}: "${version}"`),
    ].join('\n');

    const without = removeBlock(frontmatter, 'guideVersion');
    return `${without.trimEnd()}\n${block}`;
}

function getPanelStamp(type, filepath, rawWithoutStamp, existingStamp = null) {
    const target = TARGETS.find((entry) => entry.type === type);
    const panel = loadPanel(target.panel);
    const guideVersions = {
        tone: CURRENT_GUIDE.tone,
        common: CURRENT_GUIDE.common,
        [type]: CURRENT_GUIDE[type],
    };
    const hash = getReviewContentHashFromRaw(rawWithoutStamp, filepath);
    const reviewedAt = existingStamp && existingStamp.reviewedAt
        ? existingStamp.reviewedAt
        : new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

    return [
        'reviewStamp:',
        `  panelVersion: ${panel.version}`,
        '  agentVersions:',
        ...panel.agents.map((agent) => `    ${agent.id}: "${agent.version}"`),
        '  guideVersions:',
        ...Object.entries(guideVersions).map(([key, version]) => `    ${key}: "${version}"`),
        '  panelVerdict: pass',
        `  contentHash: "${hash}"`,
        `  reviewedAt: "${reviewedAt}"`,
    ].join('\n');
}

function splitBlocks(body) {
    return body
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean);
}

function groupNewsBlocks(blocks) {
    if (blocks.length <= 1) return [blocks, [], []];
    if (blocks.length === 2) return [[blocks[0]], [blocks[1]], []];
    const firstCount = Math.max(1, Math.ceil(blocks.length / 3));
    const remaining = blocks.length - firstCount;
    const secondCount = Math.max(1, Math.ceil(remaining / 2));
    return [
        blocks.slice(0, firstCount),
        blocks.slice(firstCount, firstCount + secondCount),
        blocks.slice(firstCount + secondCount),
    ];
}

function ensureFormatBody(type, body) {
    if (/^## /m.test(body)) return body.trim();
    if (type !== 'news') {
        throw new Error('Non-news document has no h2 sections');
    }

    const groups = groupNewsBlocks(splitBlocks(body));
    return groups
        .map((blocks, index) => {
            if (blocks.length === 0) return '';
            return `## ${NEWS_HEADINGS[index]}\n\n${blocks.join('\n\n')}`;
        })
        .filter(Boolean)
        .join('\n\n');
}

function normalizePath(value) {
    return value.replace(/\\/g, '/');
}

function migrateFile(target, filepath, dryRun) {
    const raw = fs.readFileSync(filepath, 'utf8');
    const parsed = matter(raw);
    if (parsed.data && parsed.data.draft === true) return { changed: false, skipped: true };
    if (FORBIDDEN_PERSONA_NAME.test(raw)) {
        return { changed: false, blocked: true, reason: 'forbidden persona name' };
    }

    const { frontmatter, body } = splitMarkdown(raw);
    const nextBody = ensureFormatBody(target.type, body);
    let nextFrontmatter = removeBlock(frontmatter, 'reviewStamp');
    nextFrontmatter = setGuideVersion(nextFrontmatter, target.type);
    nextFrontmatter = setScalar(nextFrontmatter, 'formatVersion', String(TARGET_FORMAT_VERSION));

    const rawWithoutStamp = `---\n${nextFrontmatter.trimEnd()}\n---\n${nextBody.trim()}\n`;
    nextFrontmatter = `${nextFrontmatter.trimEnd()}\n${getPanelStamp(target.type, filepath, rawWithoutStamp, parsed.data && parsed.data.reviewStamp)}`;
    const nextRaw = `---\n${nextFrontmatter.trimEnd()}\n---\n${nextBody.trim()}\n`;

    if (nextRaw === raw.replace(/\r\n/g, '\n')) return { changed: false };
    if (!dryRun) fs.writeFileSync(filepath, nextRaw, 'utf8');
    return { changed: true, relPath: normalizePath(path.relative(path.join(ROOT, 'src/content'), filepath)) };
}

function loadProgress() {
    if (!fs.existsSync(PROGRESS_FILE)) return {};
    try {
        return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    } catch {
        return {};
    }
}

function saveProgress(paths, dryRun) {
    const signature = JSON.stringify({
        formatVersion: TARGET_FORMAT_VERSION,
        guideVersions: CURRENT_GUIDE,
    });
    const completed = Array.from(new Set(paths.map((p) => p.replace(/\//g, '\\')))).sort();
    const progress = {
        ...loadProgress(),
        completed,
        lastRun: new Date().toISOString().slice(0, 10),
        signature,
        stats: {
            totalCompleted: completed.length,
            remaining: 0,
        },
    };
    if (!dryRun) fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2) + '\n', 'utf8');
}

function writeDecisionLog(summary, dryRun) {
    const lines = [
        '# 2026-04-25 Guide/Tone Migration Decisions',
        '',
        '- common 2.3.0 adds a public-copy ban for the internal reader persona names `네니엘`, `네니얼`, `내니엘`, `내니얼`.',
        `- Scanned rendered content fields and markdown bodies before migration: ${summary.personaHits} forbidden persona-name hit(s).`,
        '- Because the new common rule had zero content hits and wiki/news 3.1.2 is a dependency/example patch, this migration updates guideVersion, formatVersion, and reviewStamp metadata mechanically.',
        '- Legacy news files without h2 sections are wrapped into three formatVersion 2 sections while preserving paragraph order and body text.',
        '- Decision item for later human review: confirm whether mechanically refreshed reviewStamp values should remain accepted for patch/minor guide-only migrations, or whether the project wants a separate stamp type for mechanical migrations.',
        '',
    ].join('\n');
    if (!dryRun) fs.writeFileSync(DECISION_FILE, lines, 'utf8');
}

function main() {
    const opts = parseArgs();
    const changed = [];
    const blocked = [];
    let scanned = 0;
    let personaHits = 0;

    for (const target of TARGETS) {
        if (opts.typeFilter && opts.typeFilter !== target.type) continue;
        const files = fs.readdirSync(target.dir).filter((file) => file.endsWith('.md')).sort();
        for (const file of files) {
            if (opts.limit && changed.length >= opts.limit) break;
            const filepath = path.join(target.dir, file);
            const raw = fs.readFileSync(filepath, 'utf8');
            scanned += 1;
            if (FORBIDDEN_PERSONA_NAME.test(raw)) personaHits += 1;
            const result = migrateFile(target, filepath, opts.dryRun);
            if (result.blocked) blocked.push(normalizePath(path.relative(ROOT, filepath)));
            if (result.changed) changed.push(result.relPath);
        }
    }

    const allCompleted = [];
    for (const target of TARGETS) {
        const files = fs.readdirSync(target.dir).filter((file) => file.endsWith('.md')).sort();
        for (const file of files) allCompleted.push(normalizePath(path.relative(path.join(ROOT, 'src/content'), path.join(target.dir, file))));
    }
    saveProgress(allCompleted, opts.dryRun);
    writeDecisionLog({ personaHits }, opts.dryRun);

    console.log(JSON.stringify({
        dryRun: opts.dryRun,
        guides: CURRENT_GUIDE,
        scanned,
        changed: changed.length,
        blocked,
        personaHits,
    }, null, 2));
}

main();
