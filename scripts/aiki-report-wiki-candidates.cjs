#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { buildWikiLookup, normalizePhrase } = require('./lib/wiki-term-registry.cjs');

const ROOT = path.resolve(__dirname, '..');
const NEWS_DIR = path.join(ROOT, 'src/content/news/ko');
const OUT_PATH = path.join(ROOT, 'data/wiki-term-candidates.json');
const KNOWN = new Set(buildWikiLookup(ROOT).map((entry) => entry.normalized));
const GENERIC_STOPWORDS = new Set([
    'ai',
    'aiki',
    'google',
    'reddit',
    'chrome',
    'threads',
    'twitter',
    'youtube',
    'wired',
    'oracle',
    'uber',
    'mckinsey',
    'accenture',
]);

function toKey(value) {
    return normalizePhrase(value).toLowerCase();
}

function shouldKeepCandidate(value) {
    const normalized = normalizePhrase(value);
    const key = normalized.toLowerCase();
    if (!normalized || normalized.length < 3 || KNOWN.has(key) || GENERIC_STOPWORDS.has(key)) {
        return false;
    }

    if (!/[A-Za-z]/.test(normalized)) {
        return false;
    }

    return (
        /[0-9.+-]/.test(normalized)
        || /\b(AI|LLM|GPT|RAG|API|GPU|RTX|VRAM)\b/.test(normalized)
        || /[A-Z].+\s+[A-Z]/.test(normalized)
        || /^[A-Z][A-Za-z0-9.+-]+$/.test(normalized)
    );
}

function collectMatches(text) {
    const source = String(text || '');
    const matches = source.match(/\b[A-Z][A-Za-z0-9.+-]*(?:\s+[A-Z][A-Za-z0-9.+-]*){0,3}\b/g) || [];
    return matches.filter(shouldKeepCandidate);
}

function addCandidate(store, phrase, filePath, kind) {
    const label = normalizePhrase(phrase);
    const key = toKey(label);
    if (!shouldKeepCandidate(label)) {
        return;
    }

    const entry = store.get(key) || {
        term: label,
        occurrences: 0,
        kinds: new Set(),
        sourceSlugs: new Set(),
    };

    entry.occurrences += 1;
    entry.kinds.add(kind);
    entry.sourceSlugs.add(path.basename(filePath, '.md'));
    store.set(key, entry);
}

function main() {
    const store = new Map();

    for (const fileName of fs.readdirSync(NEWS_DIR).filter((name) => name.endsWith('.md'))) {
        const filePath = path.join(NEWS_DIR, fileName);
        const source = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(source);
        const body = String(parsed.content || '');
        const frontmatter = parsed.data || {};

        for (const tag of frontmatter.tags || []) {
            addCandidate(store, tag, filePath, 'tag');
        }

        const phraseSources = [
            frontmatter.title,
            frontmatter.summary,
            frontmatter.sourceTitle,
            body,
        ];

        for (const text of phraseSources) {
            for (const match of collectMatches(text)) {
                addCandidate(store, match, filePath, 'phrase');
            }
        }
    }

    const output = [...store.values()]
        .map((entry) => ({
            term: entry.term,
            occurrences: entry.occurrences,
            kinds: [...entry.kinds].sort(),
            sourceSlugs: [...entry.sourceSlugs].sort().slice(0, 8),
        }))
        .filter((entry) => entry.occurrences >= 3 || entry.kinds.includes('tag'))
        .sort((a, b) => b.occurrences - a.occurrences || a.term.localeCompare(b.term));

    fs.writeFileSync(OUT_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
    console.log(`reported=${output.length} -> ${path.relative(ROOT, OUT_PATH)}`);
}

main();
