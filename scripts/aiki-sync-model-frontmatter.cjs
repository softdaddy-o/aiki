#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { writeUtf8 } = require('./lib/content-utils.cjs');
const { catalog } = require('./lib/wiki-catalog.cjs');
const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src/content/wiki/ko');

const FRONTMATTER_ORDER = [
    'term',
    'title',
    'lang',
    'summary',
    'readerValue',
    'category',
    'modelType',
    'parentModel',
    'modelProfile',
    'guideVersion',
    'aliases',
    'relatedTerms',
    'firstMentioned',
    'mentionCount',
    'draft',
    'tags',
    'factCheck',
    'reviewStamp',
];

function buildOrderedFrontmatter(data) {
    const ordered = {};

    for (const key of FRONTMATTER_ORDER) {
        if (data[key] !== undefined) {
            ordered[key] = data[key];
        }
    }

    for (const [key, value] of Object.entries(data)) {
        if (ordered[key] === undefined) {
            ordered[key] = value;
        }
    }

    return ordered;
}

function syncFile(entry) {
    const filePath = path.join(WIKI_DIR, `${entry.term}.md`);
    if (!fs.existsSync(filePath)) {
        return false;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const nextData = {
        ...parsed.data,
        category: 'model',
        modelType: entry.modelType,
    };

    if (entry.parentModel) {
        nextData.parentModel = entry.parentModel;
    } else {
        delete nextData.parentModel;
    }

    const nextRaw = matter.stringify(parsed.content, buildOrderedFrontmatter(nextData));
    if (nextRaw === raw) {
        return false;
    }

    writeUtf8(filePath, nextRaw);
    return true;
}

function main() {
    let changed = 0;

    for (const entry of catalog) {
        if (String(entry.category || '').toLowerCase() !== 'model') {
            continue;
        }

        if (syncFile(entry)) {
            changed += 1;
        }
    }

    console.log(`Synced model frontmatter in ${changed} wiki page(s).`);
}

main();
