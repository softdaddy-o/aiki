#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { writeUtf8 } = require('./lib/content-utils.cjs');
const { buildWikiLookup } = require('./lib/wiki-term-registry.cjs');
const { linkRelatedSections } = require('./lib/wiki-related-links.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src/content/wiki/ko');

function listWikiFiles(rootDir = REPO_ROOT) {
    const directory = path.join(rootDir, 'src/content/wiki/ko');
    return fs.readdirSync(directory)
        .filter((name) => name.endsWith('.md'))
        .map((name) => path.join(directory, name));
}

function linkFile(filePath, lookup) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const result = linkRelatedSections(parsed.content, { lookup });

    if (!result.changed) {
        return false;
    }

    writeUtf8(filePath, matter.stringify(result.content, parsed.data));
    return true;
}

function linkRelatedTerms(rootDir = REPO_ROOT) {
    const lookup = buildWikiLookup(rootDir);
    let changed = 0;

    for (const filePath of listWikiFiles(rootDir)) {
        if (linkFile(filePath, lookup)) {
            changed += 1;
        }
    }

    return changed;
}

function main() {
    const changed = linkRelatedTerms(REPO_ROOT);
    console.log(`Linked related-term bullets in ${changed} wiki page(s).`);
}

if (require.main === module) {
    main();
}

module.exports = {
    linkFile,
    linkRelatedTerms,
    listWikiFiles,
};
