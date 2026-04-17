#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { catalog } = require('./lib/wiki-catalog.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');

const DEFAULT_WATCH_RULES = [
    { term: 'claude-opus-4-5', patterns: [/\bclaude opus 4\.5\b/iu, /\bopus 4\.5\b/iu] },
    { term: 'claude-opus-4-6', patterns: [/\bclaude opus 4\.6\b/iu, /\bopus 4\.6\b/iu] },
    { term: 'claude-opus-4-7', patterns: [/\bclaude opus 4\.7\b/iu, /\bopus 4\.7\b/iu] },
    { term: 'gpt-oss', patterns: [/\bgpt[- ]oss\b/iu] },
    { term: 'qwen-3.5', patterns: [/\bqwen[ -]?3\.5\b/iu, /\bqwen3\.5\b/iu] },
    { term: 'glm-5', patterns: [/\bglm[ -]?5\b/iu, /\bglm5\b/iu] },
    { term: 'glm-5.1', patterns: [/\bglm[ -]?5\.1\b/iu, /\bglm5\.1\b/iu] },
    { term: 'kimi-k2', patterns: [/\bkimi[ -]?k2\b/iu] },
    { term: 'gemma-4', patterns: [/\bgemma[ -]?4\b/iu, /\bgemma4\b/iu] },
];

function listMarkdownFiles(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        return [];
    }

    return fs.readdirSync(directoryPath)
        .filter((name) => name.endsWith('.md'))
        .map((name) => path.join(directoryPath, name));
}

function readNewsDocuments(newsDir) {
    return listMarkdownFiles(newsDir).map((filePath) => {
        const parsed = matter(fs.readFileSync(filePath, 'utf8'));
        return {
            slug: path.basename(filePath, '.md'),
            title: String(parsed.data?.title || ''),
            summary: String(parsed.data?.summary || ''),
            tags: Array.isArray(parsed.data?.tags) ? parsed.data.tags.map((value) => String(value || '')) : [],
            body: String(parsed.content || ''),
        };
    });
}

function buildNewsSearchText(doc) {
    return [
        doc.title,
        doc.summary,
        ...doc.tags,
        doc.body,
    ].join('\n');
}

function collectRuleMentions(newsDocs, watchRules = DEFAULT_WATCH_RULES) {
    const mentions = new Map();

    for (const rule of watchRules) {
        mentions.set(rule.term, new Set());
    }

    for (const doc of newsDocs) {
        const source = buildNewsSearchText(doc);

        for (const rule of watchRules) {
            if (rule.patterns.some((pattern) => pattern.test(source))) {
                mentions.get(rule.term).add(doc.slug);
            }
        }
    }

    return mentions;
}

function readWikiFrontmatter(filePath) {
    if (!fs.existsSync(filePath)) {
        return null;
    }

    return matter(fs.readFileSync(filePath, 'utf8')).data || {};
}

function auditModelWikiCoverage(options = {}) {
    const rootDir = options.rootDir || REPO_ROOT;
    const newsDir = options.newsDir || path.join(rootDir, 'src/content/news/ko');
    const wikiDir = options.wikiDir || path.join(rootDir, 'src/content/wiki/ko');
    const watchRules = options.watchRules || DEFAULT_WATCH_RULES;
    const catalogEntries = options.catalogEntries || catalog.filter((entry) => String(entry.category || '').toLowerCase() === 'model');
    const catalogByTerm = new Map(catalogEntries.map((entry) => [entry.term, entry]));
    const mentions = collectRuleMentions(readNewsDocuments(newsDir), watchRules);
    const findings = [];

    for (const rule of watchRules) {
        const sourceSlugs = [...(mentions.get(rule.term) || [])].sort();
        if (sourceSlugs.length === 0) {
            continue;
        }

        const entry = catalogByTerm.get(rule.term);
        if (!entry) {
            findings.push({
                severity: 'error',
                kind: 'missing_catalog_entry',
                term: rule.term,
                title: rule.term,
                sourceSlugs,
                message: `뉴스에 나오는데 위키 카탈로그 항목이 없다: ${rule.term}`,
            });
            continue;
        }

        const filePath = path.join(wikiDir, `${rule.term}.md`);
        if (!fs.existsSync(filePath)) {
            findings.push({
                severity: 'error',
                kind: 'missing_wiki_page',
                term: rule.term,
                title: entry.title,
                sourceSlugs,
                message: `뉴스에 나온 모델인데 위키 문서가 없다: ${entry.title}`,
            });
            continue;
        }

        const frontmatter = readWikiFrontmatter(filePath);
        if (String(frontmatter?.category || '') !== 'model') {
            findings.push({
                severity: 'error',
                kind: 'missing_model_category',
                term: rule.term,
                title: entry.title,
                sourceSlugs,
                message: `모델 문서인데 category: model 이 빠져 있다: ${entry.title}`,
            });
        }

        if (!frontmatter?.modelProfile) {
            findings.push({
                severity: 'error',
                kind: 'missing_model_profile',
                term: rule.term,
                title: entry.title,
                sourceSlugs,
                message: `모델 프리뷰 카드용 modelProfile 이 빠져 있다: ${entry.title}`,
            });
        }
    }

    return findings;
}

function main() {
    const findings = auditModelWikiCoverage();

    if (findings.length === 0) {
        console.log(`Model wiki coverage ok. watched=${DEFAULT_WATCH_RULES.length}`);
        return;
    }

    console.error('Model wiki coverage gaps:');
    for (const finding of findings) {
        console.error(` - [${finding.kind}] ${finding.message} | sources=${finding.sourceSlugs.join(', ')}`);
    }
    process.exit(1);
}

if (require.main === module) {
    main();
}

module.exports = {
    DEFAULT_WATCH_RULES,
    auditModelWikiCoverage,
    collectRuleMentions,
    readNewsDocuments,
};
