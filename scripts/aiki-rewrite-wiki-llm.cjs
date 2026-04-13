#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { catalog } = require('./lib/wiki-catalog.cjs');
const { rewriteWikiEntryWithLlm, buildBilingualTitle } = require('./lib/wiki-llm-writer.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src/content/wiki/ko');
const TERMS_FILE = path.join(REPO_ROOT, 'data/wiki-terms.json');

function readFrontmatter(filePath) {
    if (!fs.existsSync(filePath)) return {};
    return matter(fs.readFileSync(filePath, 'utf8')).data || {};
}

function isV2(frontmatter) {
    const value = String(frontmatter?.guideVersion?.wiki || '').trim();
    return value.startsWith('2.');
}

function getMentionStats(filePath) {
    const fm = readFrontmatter(filePath);
    return {
        mentionCount: Number(fm.mentionCount || 0),
        firstMentioned: fm.firstMentioned || null,
    };
}

function getRelatedTerms(filePath, entry) {
    const fm = readFrontmatter(filePath);
    const values = Array.isArray(fm.relatedTerms) && fm.relatedTerms.length > 0
        ? fm.relatedTerms
        : [];
    if (values.length > 0) return values;

    const fallback = [];
    for (const other of catalog) {
        if (other.term === entry.term) continue;
        const shared = (entry.tags || []).filter((tag) => (other.tags || []).includes(tag));
        if (shared.length > 0) fallback.push(other.term);
        if (fallback.length >= 4) break;
    }
    return fallback;
}

function parseArgs() {
    const args = process.argv.slice(2);
    const all = args.includes('--all');
    const staleOnly = args.includes('--stale') || !all;
    const limitIndex = args.indexOf('--limit');
    const limit = limitIndex >= 0 ? Number(args[limitIndex + 1]) : null;
    const onlyIndex = args.indexOf('--only');
    const only = onlyIndex >= 0 ? String(args[onlyIndex + 1] || '').split(',').map((v) => v.trim()).filter(Boolean) : [];
    const modelIndex = args.indexOf('--model');
    const model = modelIndex >= 0 ? String(args[modelIndex + 1] || '').trim() : '';
    return { all, staleOnly, limit, only, model };
}

function listTargets(options) {
    const entries = catalog.map((entry) => {
        const filePath = path.join(WIKI_DIR, `${entry.term}.md`);
        return {
            entry,
            filePath,
            frontmatter: readFrontmatter(filePath),
        };
    });

    let filtered = entries;
    if (options.only.length > 0) {
        const wanted = new Set(options.only);
        filtered = filtered.filter(({ entry }) => wanted.has(entry.term));
    } else if (options.staleOnly) {
        filtered = filtered.filter(({ frontmatter }) => !isV2(frontmatter));
    }

    filtered.sort((a, b) => (b.entry.priority || 0) - (a.entry.priority || 0));

    if (Number.isFinite(options.limit) && options.limit > 0) {
        filtered = filtered.slice(0, options.limit);
    }

    return filtered;
}

function updateTermsFile(updatedTitles) {
    const rows = JSON.parse(fs.readFileSync(TERMS_FILE, 'utf8'));
    let changed = 0;

    for (const row of rows) {
        const nextTitle = updatedTitles.get(row.term);
        if (nextTitle && row.title !== nextTitle) {
            row.title = nextTitle;
            changed += 1;
        }
    }

    if (changed > 0) {
        fs.writeFileSync(TERMS_FILE, `${JSON.stringify(rows, null, 4)}\n`, 'utf8');
    }

    return changed;
}

async function main() {
    const options = parseArgs();
    const targets = listTargets(options);

    if (targets.length === 0) {
        console.log('No wiki targets found.');
        return;
    }

    const updatedTitles = new Map();

    for (const { entry, filePath } of targets) {
        const mentionStats = getMentionStats(filePath);
        const relatedTerms = getRelatedTerms(filePath, entry);
        console.log(`Rewriting ${entry.term}...`);
        await rewriteWikiEntryWithLlm({
            entry: {
                ...entry,
                title: buildBilingualTitle(entry),
            },
            filePath,
            mentionStats,
            relatedTerms,
            model: options.model,
        });

        const nextFrontmatter = readFrontmatter(filePath);
        updatedTitles.set(entry.term, nextFrontmatter.title || buildBilingualTitle(entry));
    }

    const changed = updateTermsFile(updatedTitles);
    console.log(`Rewrote ${targets.length} wiki page(s). Updated ${changed} term title(s).`);
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
