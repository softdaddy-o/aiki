#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { writeUtf8 } = require('./lib/content-utils.cjs');
const { catalog } = require('./lib/wiki-catalog.cjs');
const { buildBilingualTitle } = require('./lib/wiki-llm-writer.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');

function getWikiDir(rootDir = REPO_ROOT) {
    return path.join(rootDir, 'src/content/wiki/ko');
}

function getTermsFile(rootDir = REPO_ROOT) {
    return path.join(rootDir, 'data/wiki-terms.json');
}

function readWikiFrontmatter(term, rootDir = REPO_ROOT) {
    const filePath = path.join(getWikiDir(rootDir), `${term}.md`);
    if (!fs.existsSync(filePath)) {
        return {};
    }

    return matter(fs.readFileSync(filePath, 'utf8')).data || {};
}

function buildDocumentRow(entry, rootDir = REPO_ROOT) {
    const frontmatter = readWikiFrontmatter(entry.term, rootDir);

    return {
        term: entry.term,
        title: String(frontmatter.title || '').trim() || buildBilingualTitle(entry),
        category: frontmatter.category || entry.category,
        aliases: Array.isArray(frontmatter.aliases) && frontmatter.aliases.length > 0
            ? frontmatter.aliases
            : (entry.aliases || []),
        ...(frontmatter.modelType || entry.modelType ? { modelType: frontmatter.modelType || entry.modelType } : {}),
    };
}

function buildRowFromWikiFile(filePath) {
    const parsed = matter(fs.readFileSync(filePath, 'utf8'));
    const term = String(parsed.data?.term || path.basename(filePath, '.md')).trim();
    return {
        term,
        title: String(parsed.data?.title || term).trim(),
        category: String(parsed.data?.category || 'concept').trim(),
        aliases: Array.isArray(parsed.data?.aliases) ? parsed.data.aliases : [],
        ...(parsed.data?.modelType ? { modelType: parsed.data.modelType } : {}),
    };
}

function buildTermsRows(rootDir = REPO_ROOT) {
    const rows = new Map();
    const wikiDir = getWikiDir(rootDir);

    for (const fileName of fs.readdirSync(wikiDir).filter((name) => name.endsWith('.md')).sort()) {
        const row = buildRowFromWikiFile(path.join(wikiDir, fileName));
        rows.set(row.term, row);
    }

    for (const entry of catalog) {
        if (!rows.has(entry.term)) {
            rows.set(entry.term, buildDocumentRow(entry, rootDir));
        }
    }

    return [...rows.values()].sort((a, b) => a.term.localeCompare(b.term));
}

function syncWikiTerms(rootDir = REPO_ROOT) {
    const rows = buildTermsRows(rootDir);
    writeUtf8(getTermsFile(rootDir), `${JSON.stringify(rows, null, 4)}\n`);
    return rows.length;
}

function main() {
    const count = syncWikiTerms();
    console.log(`Synced ${count} wiki term row(s).`);
}

if (require.main === module) {
    main();
}

module.exports = {
    buildTermsRows,
    buildRowFromWikiFile,
    buildDocumentRow,
    syncWikiTerms,
};
