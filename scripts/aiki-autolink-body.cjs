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
const { buildWikiLookup } = require('./lib/wiki-term-registry.cjs');

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
    // Short Korean tokens that collide with common adverbs / generic
    // nouns. "달리" means "differently", "코딩"/"코드" are generic enough
    // that auto-linking them in prose is usually wrong.
    '달리', '코딩', '코드', '파일', '형식',
]);

function isHangul(ch) {
    const code = ch.charCodeAt(0);
    return code >= 0xac00 && code <= 0xd7a3;
}

function hasHangul(s) {
    for (const ch of s) {
        if (isHangul(ch)) return true;
    }
    return false;
}

function passesMinLength(label) {
    if (hasHangul(label)) return label.length >= MIN_HANGUL_LEN;
    return label.length >= MIN_ASCII_LEN;
}

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildMatcher(label) {
    const escaped = escapeRegex(label);
    // Boundary set depends on the label's script. Korean particles like
    // "의", "이", "가", "은", "는" attach directly to ASCII words without
    // space, so for ASCII-only labels we must NOT treat hangul as a word
    // boundary (otherwise "Anthropic의" would not match "Anthropic").
    // For labels containing hangul we keep hangul in the boundary set so
    // short 한글 terms don't match inside longer hangul words.
    const boundary = hasHangul(label)
        ? '[A-Za-z0-9_\\uac00-\\ud7a3]'
        : '[A-Za-z0-9_]';
    return new RegExp(`(?<!${boundary})${escaped}(?!${boundary})`, 'i');
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
    // Minimal YAML scan — grabs the first top-level `title:` scalar.
    const lines = head.split(/\r?\n/);
    for (const line of lines) {
        const m = /^title\s*:\s*(.+)$/.exec(line);
        if (!m) continue;
        let value = m[1].trim();
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
    const placeholder = (i) => `\u0000MASK${i}\u0000`;

    const push = (match) => {
        const i = stash.length;
        stash.push(match);
        return placeholder(i);
    };

    let masked = body;

    // Fenced code blocks ``` ... ```
    masked = masked.replace(/```[\s\S]*?```/g, push);
    // Indented code blocks (4 leading spaces) — conservative: skip.
    // HTML tags (opening/closing/self-closing) and their contents for simple blocks.
    masked = masked.replace(/<[^>\n]+>/g, push);
    // Inline code `...`
    masked = masked.replace(/`[^`\n]+`/g, push);
    // Existing markdown links [text](url) and images ![alt](url)
    masked = masked.replace(/!?\[[^\]]*\]\([^)]*\)/g, push);
    // Reference-style link targets [text][id] and definitions at column 0
    masked = masked.replace(/\[[^\]]*\]\[[^\]]*\]/g, push);
    masked = masked.replace(/^\s*\[[^\]]+\]:\s+\S.*$/gm, push);
    // ATX headings (entire line)
    masked = masked.replace(/^#{1,6} .*$/gm, push);
    // Setext heading underline lines (=== ---) we leave alone; heading text
    // above gets matched but is unusual in our corpus.
    // Table separator rows | --- | --- |
    masked = masked.replace(/^\s*\|?[\s:|-]+\|[\s:|-]+\|?\s*$/gm, push);

    const restore = (text) =>
        text.replace(/\u0000MASK(\d+)\u0000/g, (_, i) => stash[Number(i)]);

    return { masked, restore };
}

function pickCandidates(lookup, { selfTerm, pageTitle }) {
    const titleLower = (pageTitle || '').toLowerCase();
    return lookup
        .filter((c) => passesMinLength(c.label))
        .filter((c) => !BLOCKLIST.has(c.normalized))
        .filter((c) => !selfTerm || c.term !== selfTerm)
        .filter((c) => {
            if (!titleLower) return true;
            // If the candidate label appears as a whole word inside this
            // page's title, it's almost always part of the page's own name
            // (e.g. "Weights" inside "Weights & Biases"). Skip to avoid
            // mis-branding product/tool titles.
            const re = buildMatcher(c.label);
            return !re.test(titleLower);
        });
}

function applyLinks(body, candidates) {
    const { masked, restore } = maskProtected(body);

    // Link every occurrence of every candidate. Priority order (longest label
    // first, already sorted by buildWikiLookup) decides overlap resolution:
    // earlier candidates claim their ranges first, later ones must not
    // overlap. Candidates with the same URL still produce multiple links
    // because the user wants repeated mentions linked.
    const claimed = [];

    const overlaps = (start, end) => {
        for (const c of claimed) {
            if (!(end <= c.start || start >= c.end)) return true;
        }
        return false;
    };

    for (const cand of candidates) {
        const source = buildMatcher(cand.label).source;
        const re = new RegExp(source, 'gi');
        let m;
        while ((m = re.exec(masked)) !== null) {
            const start = m.index;
            const end = start + m[0].length;
            if (m[0].length === 0) {
                re.lastIndex = start + 1;
                continue;
            }
            if (masked.slice(start, end).includes('\u0000')) continue;
            if (overlaps(start, end)) continue;
            claimed.push({
                start,
                end,
                label: m[0],
                url: cand.url,
                term: cand.term,
            });
        }
    }

    if (claimed.length === 0) return { body, changed: false, inserts: [] };

    claimed.sort((a, b) => a.start - b.start);

    let out = masked;
    for (let i = claimed.length - 1; i >= 0; i--) {
        const ins = claimed[i];
        const replacement = `[${ins.label}](${ins.url})`;
        out = out.slice(0, ins.start) + replacement + out.slice(ins.end);
    }

    return { body: restore(out), changed: true, inserts: claimed };
}

function selfTermFromPath(filePath) {
    // Only wiki files have a 1:1 mapping to a term slug.
    const rel = path.relative(WIKI_DIR, filePath);
    if (rel.startsWith('..')) return null;
    const base = path.basename(filePath, '.md');
    return base || null;
}

function processFile(filePath, lookup, { dryRun }) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { head, body, title } = splitFrontmatter(raw);
    if (!body.trim()) return null;

    // Split body into prose (scanned) and related-terms tail (untouched).
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
        .filter((n) => n.endsWith('.md'))
        .map((n) => path.join(dir, n))
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
        const res = processFile(file, lookup, { dryRun });
        if (res) results.push(res);
    }

    if (results.length === 0) {
        console.log(`autolink-body: no changes (${files.length} files scanned${dryRun ? ', dry run' : ''})`);
        return;
    }

    let totalLinks = 0;
    for (const r of results) {
        const rel = path.relative(ROOT, r.filePath).replace(/\\/g, '/');
        console.log(`${dryRun ? '[dry] ' : ''}${rel}`);
        for (const ins of r.inserts) {
            console.log(`    + [${ins.label}](${ins.url})`);
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
    buildMatcher,
    maskProtected,
    passesMinLength,
    pickCandidates,
    splitFrontmatter,
    extractFrontmatterTitle,
};
