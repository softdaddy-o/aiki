const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { auditModelWikiCoverage } = require('../scripts/aiki-audit-model-wiki-coverage.cjs');

function makeTempRepo() {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aiki-model-audit-'));
    fs.mkdirSync(path.join(rootDir, 'src/content/news/ko'), { recursive: true });
    fs.mkdirSync(path.join(rootDir, 'src/content/wiki/ko'), { recursive: true });
    return rootDir;
}

describe('aiki-audit-model-wiki-coverage', () => {
    it('reports a missing wiki page for a watched model mention', () => {
        const rootDir = makeTempRepo();

        try {
            fs.writeFileSync(path.join(rootDir, 'src/content/news/ko', 'sample.md'), [
                '---',
                'title: "GPT-OSS 로컬 실행기"',
                'summary: "gpt-oss를 로컬로 돌리는 얘기야."',
                'tags: ["gpt-oss"]',
                '---',
                '',
                '본문에서도 gpt-oss를 언급해.',
            ].join('\n'), 'utf8');

            const findings = auditModelWikiCoverage({
                rootDir,
                catalogEntries: [
                    { term: 'gpt-oss', title: 'gpt-oss', category: 'model' },
                ],
                watchRules: [
                    { term: 'gpt-oss', patterns: [/\bgpt[- ]oss\b/iu] },
                ],
            });

            assert.equal(findings.length, 1);
            assert.equal(findings[0].kind, 'missing_wiki_page');
        } finally {
            fs.rmSync(rootDir, { recursive: true, force: true });
        }
    });

    it('passes when the watched model page exists with model metadata', () => {
        const rootDir = makeTempRepo();

        try {
            fs.writeFileSync(path.join(rootDir, 'src/content/news/ko', 'sample.md'), [
                '---',
                'title: "Gemma 4 로컬 테스트"',
                'summary: "gemma 4 로컬 테스트 얘기야."',
                'tags: ["gemma-4"]',
                '---',
                '',
                '본문에서도 gemma 4를 언급해.',
            ].join('\n'), 'utf8');

            fs.writeFileSync(path.join(rootDir, 'src/content/wiki/ko', 'gemma-4.md'), [
                '---',
                'term: gemma-4',
                'title: "Gemma 4"',
                'lang: ko',
                'category: model',
                'modelProfile:',
                '  vendor: "Google"',
                '---',
                '',
                '본문',
            ].join('\n'), 'utf8');

            const findings = auditModelWikiCoverage({
                rootDir,
                catalogEntries: [
                    { term: 'gemma-4', title: 'Gemma 4', category: 'model' },
                ],
                watchRules: [
                    { term: 'gemma-4', patterns: [/\bgemma[ -]?4\b/iu] },
                ],
            });

            assert.deepStrictEqual(findings, []);
        } finally {
            fs.rmSync(rootDir, { recursive: true, force: true });
        }
    });
});
