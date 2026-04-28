const { test } = require('node:test');
const assert = require('node:assert/strict');

function entry(title, data) {
    return { data: { title, ...data } };
}

test('project catalog keeps popular as default and can switch to recent additions', async () => {
    const {
        sortProjectsByPopular,
        sortProjectsByRecent,
    } = await import('../src/lib/catalogSort.js');

    const projects = [
        entry('Middle', { stars: 200, date: '2026-01-01' }),
        entry('Fresh', { stars: 10, sourceMetric: 10, date: '2026-04-20' }),
        entry('Popular', { stars: 1200, date: '2025-11-02' }),
    ];

    assert.deepEqual(sortProjectsByPopular(projects).map((item) => item.data.title), [
        'Popular',
        'Middle',
        'Fresh',
    ]);
    assert.deepEqual(sortProjectsByRecent(projects).map((item) => item.data.title), [
        'Fresh',
        'Middle',
        'Popular',
    ]);
    assert.deepEqual(projects.map((item) => item.data.title), ['Middle', 'Fresh', 'Popular']);
});

test('wiki catalog keeps mention count as default and can switch to first-mentioned recency', async () => {
    const {
        sortWikiByPopular,
        sortWikiByRecent,
    } = await import('../src/lib/catalogSort.js');

    const wiki = [
        entry('Agent', { mentionCount: 40, firstMentioned: '2025-12-01' }),
        entry('Context Window', { mentionCount: 9, firstMentioned: '2026-04-03' }),
        entry('API', { mentionCount: 40, firstMentioned: '2026-01-10' }),
    ];

    assert.deepEqual(sortWikiByPopular(wiki).map((item) => item.data.title), [
        'Agent',
        'API',
        'Context Window',
    ]);
    assert.deepEqual(sortWikiByRecent(wiki).map((item) => item.data.title), [
        'Context Window',
        'API',
        'Agent',
    ]);
    assert.deepEqual(wiki.map((item) => item.data.title), ['Agent', 'Context Window', 'API']);
});
