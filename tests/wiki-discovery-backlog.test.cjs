const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
    discoverWikiCandidates,
    mergeDiscoveryBacklog,
    selectDiscoveryQuota,
} = require('../scripts/lib/wiki-discovery-backlog.cjs');
const { syncWikiTerms } = require('../scripts/aiki-sync-wiki-terms.cjs');

function makeTempRepo() {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aiki-discovery-'));
    fs.mkdirSync(path.join(root, 'data'), { recursive: true });
    fs.mkdirSync(path.join(root, 'src/content/news/ko'), { recursive: true });
    fs.mkdirSync(path.join(root, 'src/content/wiki/ko'), { recursive: true });
    return root;
}

function writeFile(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
}

test('discoverWikiCandidates mines unknown terms from news and wiki bodies', () => {
    const root = makeTempRepo();

    writeFile(
        path.join(root, 'data/wiki-terms.json'),
        `${JSON.stringify([
            { term: 'llm', title: 'LLM', category: 'concept', aliases: ['large language model'] },
        ], null, 2)}\n`,
    );
    writeFile(
        path.join(root, 'src/content/news/ko/2026-04-17-speculative-decoding.md'),
        `---
title: "Speculative Decoding benchmark"
date: "2026-04-17"
summary: "Speculative Decoding keeps showing up next to Qwen3.5-27B."
tags:
  - Speculative Decoding
sourceUrl: "https://example.com/speculative-decoding"
sourceTitle: "Speculative Decoding"
---

Researchers compared \`Speculative Decoding\` with Qwen3.5-27B in a local benchmark.
`,
    );
    writeFile(
        path.join(root, 'src/content/wiki/ko/llm.md'),
        `---
term: llm
title: "LLM"
lang: ko
summary: "LLM summary that is long enough for schema compatibility."
readerValue: "This reader value is long enough for the wiki schema compatibility check."
category: concept
aliases:
  - large language model
relatedTerms: []
mentionCount: 1
draft: false
tags:
  - language-model
factCheck:
  status: passed
  date: "2026-04-17"
  sources:
    - url: "https://example.com/llm"
      title: "LLM source"
---

LLM pages can mention Mixture Routing and \`Speculative Decoding\` in the body.
`,
    );

    const candidates = discoverWikiCandidates({ rootDir: root });
    const slugs = new Set(candidates.map((item) => item.slug));

    assert.ok(slugs.has('speculative-decoding'));
    assert.ok(slugs.has('mixture-routing'));
    const speculative = candidates.find((item) => item.slug === 'speculative-decoding');
    assert.equal(speculative.categoryGuess, 'technique');
    assert.deepEqual(speculative.sourceKinds.sort(), ['news', 'wiki']);
});

test('mergeDiscoveryBacklog preserves skipped/generated state and quota selects pending only', () => {
    const root = makeTempRepo();
    writeFile(path.join(root, 'src/content/wiki/ko/already-done.md'), '---\nterm: already-done\ntitle: "Already Done"\nsummary: "x"\nreaderValue: "reader value reader value reader value"\ncategory: concept\naliases: []\nrelatedTerms: []\nmentionCount: 1\ndraft: false\ntags: []\n---\n');

    const existing = {
        updatedAt: '2026-04-16T00:00:00.000Z',
        quota: 5,
        items: [
            { slug: 'manual-skip', term: 'Manual Skip', status: 'skipped', priority: 55, generationCount: 0 },
            { slug: 'already-done', term: 'Already Done', status: 'pending', priority: 40, generationCount: 1 },
        ],
    };
    const discovered = [
        {
            term: 'Priority Term',
            slug: 'priority-term',
            occurrences: 4,
            distinctSourceCount: 3,
            kinds: ['tag'],
            sourceKinds: ['news'],
            newsSourceSlugs: ['2026-04-17-priority'],
            wikiSourceTerms: [],
            knownTermHints: ['llm'],
            sourceTitles: ['Priority'],
            sourceUrls: [{ url: 'https://example.com/priority', title: 'Priority' }],
            sampleRefs: ['news:2026-04-17-priority'],
            firstMentioned: '2026-04-17',
            lastMentioned: '2026-04-17',
            categoryGuess: 'concept',
            priority: 90,
        },
        {
            term: 'Manual Skip',
            slug: 'manual-skip',
            occurrences: 3,
            distinctSourceCount: 2,
            kinds: ['phrase'],
            sourceKinds: ['wiki'],
            newsSourceSlugs: [],
            wikiSourceTerms: ['llm'],
            knownTermHints: ['llm'],
            sourceTitles: ['Manual'],
            sourceUrls: [{ url: 'https://example.com/manual', title: 'Manual' }],
            sampleRefs: ['wiki:llm'],
            firstMentioned: '2026-04-17',
            lastMentioned: '2026-04-17',
            categoryGuess: 'concept',
            priority: 60,
        },
    ];

    const backlog = mergeDiscoveryBacklog(existing, discovered, {
        rootDir: root,
        today: '2026-04-17',
        updatedAt: '2026-04-17T09:00:00.000Z',
    });
    const selected = selectDiscoveryQuota(backlog, 1);

    assert.equal(backlog.items.find((item) => item.slug === 'manual-skip').status, 'skipped');
    assert.equal(backlog.items.find((item) => item.slug === 'already-done').status, 'generated');
    assert.equal(selected.length, 1);
    assert.equal(selected[0].slug, 'priority-term');
});

test('syncWikiTerms includes wiki files that are not in the catalog', () => {
    const root = makeTempRepo();

    writeFile(
        path.join(root, 'src/content/wiki/ko/custom-term.md'),
        `---
term: custom-term
title: "Custom Term"
lang: ko
summary: "Custom summary for a generated wiki page."
readerValue: "This generated page should still appear in wiki terms after sync."
category: concept
aliases:
  - custom term
relatedTerms: []
mentionCount: 2
draft: false
tags:
  - custom
---

Generated body.
`,
    );

    syncWikiTerms(root);

    const rows = JSON.parse(fs.readFileSync(path.join(root, 'data/wiki-terms.json'), 'utf8'));
    const custom = rows.find((row) => row.term === 'custom-term');

    assert.ok(custom);
    assert.equal(custom.title, 'Custom Term');
    assert.deepEqual(custom.aliases, ['custom term']);
});
