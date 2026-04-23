#!/usr/bin/env node
/**
 * aiki-autolink-body
 *
 * Scans news and wiki body markdown for mentions of wiki terms that
 * already have pages but are not yet linked, and inserts a link on the
 * first occurrence per file.
 *
 * Conservative rules:
 *   - Process only markdown body (skip frontmatter).
 *   - First occurrence per term per file only.
 *   - Skip code fences (``` ... ```), inline code (`...`), headings,
 *     existing markdown links [text](url), HTML tags, and images.
 *   - Minimum label length: Korean >= 2 chars, ASCII >= 4 chars.
 *   - Blocklist of overly generic tokens.
 *   - A wiki page never links to itself.
 *
 * Usage:
 *   node scripts/aiki-autolink-body.cjs           # write changes
 *   node scripts/aiki-autolink-body.cjs --dry     # preview only
 *   node scripts/aiki-autolink-body.cjs --news    # news only
 *   node scripts/aiki-autolink-body.cjs --wiki    # wiki only
 */

const fs = require('fs');
const path = require('path');
const {
    buildLabelMatcher,
    buildWikiLookup,
    findWikiTextMatches,
    hasHangul,
} = require('./lib/wiki-term-registry.cjs');

const ROOT = path.resolve(__dirname, '..');
const NEWS_DIR = path.join(ROOT, 'src', 'content', 'news', 'ko');
const WIKI_DIR = path.join(ROOT, 'src', 'content', 'wiki', 'ko');

const MIN_ASCII_LEN = 4;
const MIN_HANGUL_LEN = 2;

// Labels that match too loosely or create noise if auto-linked.
const BLOCKLIST = new Set([
    'ai', 'api', 'ml', 'llm', 'gpu', 'cpu', 'cli', 'sdk', 'ide', 'os',
    'app', 'apps', 'dev', 'test', 'tests', 'tool', 'tools', 'note',
    'note-taking', 'chat', 'model', 'models',
    '모델', '도구', '노트', '채팅',
    // Short Korean tokens that collide with common adverbs / generic nouns.
    '달리', '코딩', '코드', '파일', '형식',
]);

function passesMinLength(label) {
    if (hasHangul(label)) return label.length >= MIN_HANGUL_LEN;
    return label.length >= MIN_ASCII_LEN;
}

function splitFrontmatter(text) {
    if (!text.startsWith('---')) return { head: '', body: text, title: '' };
    const end = text.indexOf('\n---', 3);
    if (end < 0) return { head: '', body: text, title: '' };
    const close = text.indexOf('\n', end + 1);
    if (close < 0) return { head: text, body: '', title: '' };
    const head = text.slice(0, close + 1);
    const title = extractFrontmatterTitle(head);
    return { head, body: text.slice(close + 1), title };
}

function extractFrontmatterTitle(head) {
    // Minimal YAML scan; grabs the first top-level `title:` scalar.
    const lines = head.split(/\r?\n/);
    for (const line of lines) {
        const match = /^title\s*:\s*(.+)$/.exec(line);
        if (!match) continue;
        let value = match[1].trim();
        if ((value.startsWith('"') && value.endsWith('"'))
            || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        return value;
    }
    return '';
}

// Mask segments we must not touch so regex scan ignores them.
// Returns { masked, restore(text) }.
function maskProtected(body) {
    const stash = [];
    const placeholder = (index) => `\u0000MASK${index}\u0000`;

    const push = (match) => {
        const index = stash.length;
        stash.push(match);
        return placeholder(index);
    };

    let masked = body;

    masked = masked.replace(/```[\s\S]*?```/g, push);
    masked = masked.replace(/<[^>\n]+>/g, push);
    masked = masked.replace(/`[^`\n]+`/g, push);
    masked = masked.replace(/!?\[[^\]]*\]\([^)]*\)/g, push);
    masked = masked.replace(/\[[^\]]*\]\[[^\]]*\]/g, push);
    masked = masked.replace(/^\s*\[[^\]]+\]:\s+\S.*$/gm, push);
    masked = masked.replace(/^#{1,6} .*$/gm, push);
    masked = masked.replace(/^\s*\|?[\s:|-]+\|[\s:|-]+\|?\s*$/gm, push);

    const restore = (text) =>
        text.replace(/\u0000MASK(\d+)\u0000/g, (_, index) => stash[Number(index)]);

    return { masked, restore };
}

function pickCandidates(lookup, { selfTerm, pageTitle }) {
    const titleLower = (pageTitle || '').toLowerCase();
    return lookup
        .filter((candidate) => passesMinLength(candidate.label))
        .filter((candidate) => !BLOCKLIST.has(candidate.normalized))
        .filter((candidate) => !selfTerm || candidate.term !== selfTerm)
        .filter((candidate) => {
            if (!titleLower) return true;
            const matcher = buildLabelMatcher(candidate.label, 'iu');
            return !matcher.test(titleLower);
        });
}

function applyLinks(body, candidates) {
    const { masked, restore } = maskProtected(body);

    const claimed = findWikiTextMatches(masked, candidates)
        .filter((match) => !masked.slice(match.start, match.end).includes('\u0000'))
        .map((match) => ({
            start: match.start,
            end: match.end,
            label: match.label,
            url: match.entry.url,
            term: match.entry.term,
        }));

    if (claimed.length === 0) return { body, changed: false, inserts: [] };

    let output = masked;
    for (let index = claimed.length - 1; index >= 0; index--) {
        const insert = claimed[index];
        const replacement = `[${insert.label}](${insert.url})`;
        output = output.slice(0, insert.start) + replacement + output.slice(insert.end);
    }

    return { body: restore(output), changed: true, inserts: claimed };
}

function selfTermFromPath(filePath) {
    const rel = path.relative(WIKI_DIR, filePath);
    if (rel.startsWith('..')) return null;
    return path.basename(filePath, '.md') || null;
}

function processFile(filePath, lookup, { dryRun }) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { head, body, title } = splitFrontmatter(raw);
    if (!body.trim()) return null;

    const relatedMatch = /^##\s*관련\s*용어\s*$/m.exec(body);
    const prose = relatedMatch ? body.slice(0, relatedMatch.index) : body;
    const tail = relatedMatch ? body.slice(relatedMatch.index) : '';

    const selfTerm = selfTermFromPath(filePath);
    const candidates = pickCandidates(lookup, {
        selfTerm,
        pageTitle: title,
    });

    const { body: nextProse, changed, inserts } = applyLinks(prose, candidates);
    if (!changed) return null;

    if (!dryRun) {
        fs.writeFileSync(filePath, head + nextProse + tail, 'utf8');
    }

    return { filePath, inserts };
}

function listMarkdown(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((name) => name.endsWith('.md'))
        .map((name) => path.join(dir, name))
        .sort();
}

function main() {
    const args = new Set(process.argv.slice(2));
    const dryRun = args.has('--dry') || args.has('--dry-run');
    const onlyNews = args.has('--news');
    const onlyWiki = args.has('--wiki');

    const lookup = buildWikiLookup(ROOT);
    if (lookup.length === 0) {
        console.error('No wiki terms loaded. Run wiki term regeneration first.');
        process.exit(1);
    }

    const files = [];
    if (!onlyWiki) files.push(...listMarkdown(NEWS_DIR));
    if (!onlyNews) files.push(...listMarkdown(WIKI_DIR));

    const results = [];
    for (const file of files) {
        const result = processFile(file, lookup, { dryRun });
        if (result) results.push(result);
    }

    if (results.length === 0) {
        console.log(`autolink-body: no changes (${files.length} files scanned${dryRun ? ', dry run' : ''})`);
        return;
    }

    let totalLinks = 0;
    for (const result of results) {
        const rel = path.relative(ROOT, result.filePath).replace(/\\/g, '/');
        console.log(`${dryRun ? '[dry] ' : ''}${rel}`);
        for (const insert of result.inserts) {
            console.log(`    + [${insert.label}](${insert.url})`);
            totalLinks += 1;
        }
    }

    console.log(
        `\nautolink-body: ${results.length} files ${dryRun ? 'would change' : 'changed'}, ${totalLinks} links inserted.`,
    );
}

if (require.main === module) {
    main();
}

module.exports = {
    applyLinks,
    buildMatcher: buildLabelMatcher,
    extractFrontmatterTitle,
    maskProtected,
    passesMinLength,
    pickCandidates,
    splitFrontmatter,
};
