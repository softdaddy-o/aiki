const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');

function readRepoFile(relativePath) {
    return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

test('common tone guide names awkward Korean and English-like phrase risks', () => {
    const guide = readRepoFile('docs/tone-guide-common.md');

    for (const phrase of ['빛난다', '멈출 때', '이것저것', '범용 명사', '영어식']) {
        assert.match(guide, new RegExp(phrase), `expected tone guide to cover ${phrase}`);
    }
});

test('Activepieces copy avoids awkward Korean fillers and English noun stacks', () => {
    const activepiecesCopy = [
        readRepoFile('src/content/projects/ko/activepieces.md'),
        readRepoFile('src/components/projects/showcases/activepieces/index.tsx'),
    ].join('\n');

    const blockedSnippets = [
        '빛나',
        '멈출 때',
        '이것저것',
        '먼저 볼 축',
        '가능해지는 일',
        '확장면',
        '운영면',
        '넓히는 지점',
        '갈리기 시작하는 지점',
        'visual workflow builder',
        'open-source automation platform',
        'self-host automation runtime',
        'custom integration',
    ];

    for (const snippet of blockedSnippets) {
        assert.doesNotMatch(activepiecesCopy, new RegExp(snippet, 'i'), `blocked phrase remained: ${snippet}`);
    }
});
