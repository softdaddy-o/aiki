#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { catalog } = require('./lib/wiki-catalog.cjs');
const { rewriteWikiEntriesWithLlm, buildBilingualTitle } = require('./lib/wiki-llm-writer.cjs');

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
    const batchSizeIndex = args.indexOf('--batch-size');
    const batchSize = batchSizeIndex >= 0 ? Number(args[batchSizeIndex + 1]) : 8;
    return { all, staleOnly, limit, only, model, batchSize };
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

function chunkList(values, chunkSize) {
    const size = Number.isFinite(chunkSize) && chunkSize > 0 ? chunkSize : 8;
    const chunks = [];
    for (let index = 0; index < values.length; index += size) {
        chunks.push(values.slice(index, index + size));
    }
    return chunks;
}

async function rewriteChunk(chunk, options, updatedTitles, failures) {
    const requestItems = chunk.map(({ entry, filePath }) => ({
        entry: {
            ...entry,
            title: buildBilingualTitle(entry),
        },
        filePath,
        mentionStats: getMentionStats(filePath),
        relatedTerms: getRelatedTerms(filePath, entry),
        model: options.model,
    }));

    const summary = chunk.map(({ entry }) => entry.term).join(', ');
    console.log(`Rewriting batch (${chunk.length}): ${summary}`);

    try {
        const results = await rewriteWikiEntriesWithLlm(requestItems, { model: options.model });
        for (const result of results) {
            updatedTitles.set(result.term, result.payload.title || buildBilingualTitle(chunk.find(({ entry }) => entry.term === result.term).entry));
        }
        return;
    } catch (error) {
        if (chunk.length === 1) {
            const { entry } = chunk[0];
            failures.push({ term: entry.term, error: error.message || String(error) });
            console.error(`Failed ${entry.term}: ${error.message || error}`);
            return;
        }

        const mid = Math.ceil(chunk.length / 2);
        console.error(`Batch failed for [${summary}], splitting chunk: ${error.message || error}`);
        await rewriteChunk(chunk.slice(0, mid), options, updatedTitles, failures);
        await rewriteChunk(chunk.slice(mid), options, updatedTitles, failures);
    }
}

async function main() {
    const options = parseArgs();
    const targets = listTargets(options);

    if (targets.length === 0) {
        console.log('No wiki targets found.');
        return;
    }

    const updatedTitles = new Map();

    const failures = [];

    const chunks = chunkList(targets, options.batchSize);

    for (const chunk of chunks) {
        await rewriteChunk(chunk, options, updatedTitles, failures);
    }

    const changed = updateTermsFile(updatedTitles);
    console.log(`Rewrote ${targets.length} wiki page(s). Updated ${changed} term title(s).`);

    if (failures.length > 0) {
        console.error(`Failures: ${failures.length}`);
        for (const failure of failures) {
            console.error(` - ${failure.term}: ${failure.error}`);
        }
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
