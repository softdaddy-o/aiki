const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const reviewPanel = require('../scripts/aiki-review-panel.cjs');

function withArgv(args, fn) {
    const original = process.argv;
    process.argv = ['node', 'scripts/aiki-review-panel.cjs', ...args];
    try {
        return fn();
    } finally {
        process.argv = original;
    }
}

describe('review-panel', () => {
    it('enables auto revise by default', () => {
        const options = withArgv(['--target', 'wiki'], () => reviewPanel.parseArgs());
        assert.equal(options.autoRevise, true);
    });

    it('supports disabling auto revise explicitly', () => {
        const options = withArgv(['--target', 'wiki', '--no-revise'], () => reviewPanel.parseArgs());
        assert.equal(options.autoRevise, false);
    });

    it('builds a revision prompt with file path and must-fix guidance', () => {
        const prompt = reviewPanel.buildRevisionPrompt(
            { filepath: 'D:\\srcp\\aiki\\src\\content\\wiki\\ko\\chain-of-thought.md' },
            {
                topMustFix: ['본문에 인라인 링크를 넣어라.'],
                reviews: [
                    {
                        role: 'structure_editor',
                        mustFix: ['compare 섹션을 보강해라.'],
                        findings: ['발표문 요약처럼 읽힌다.'],
                    },
                ],
            },
            {
                contentType: 'wiki',
                internalLinkCandidates: [
                    { title: 'Reasoning Model', url: '/ko/wiki/reasoning/' },
                ],
                scriptFindings: [
                    { severity: 'warn', rule: 'tone-B1', message: '인라인 링크 부족' },
                ],
            },
        );

        assert.match(prompt, /src\/content\/wiki\/ko\/chain-of-thought\.md/);
        assert.match(prompt, /본문에 인라인 링크를 넣어라/);
        assert.match(prompt, /Reasoning Model/);
        assert.match(prompt, /tone-B1/);
    });
});
