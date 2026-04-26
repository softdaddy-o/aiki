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

    it('loads current tone guide sections into review prompts', () => {
        const guideContext = reviewPanel.buildGuideContext('projects');

        assert.match(guideContext, /화자의 입장/);
        assert.match(guideContext, /5초 순간/);
        assert.match(guideContext, /AI 상투어 제거 체크리스트/);
    });

    it('builds a wiki revision prompt with file path and must-fix guidance', () => {
        const prompt = reviewPanel.buildRevisionPrompt(
            { filepath: 'D:\\srcp\\aiki\\src\\content\\wiki\\ko\\chain-of-thought.md' },
            {
                topMustFix: ['본문에 링크를 더 넣어라'],
                reviews: [
                    {
                        role: 'structure_editor',
                        mustFix: ['compare section is missing'],
                        findings: ['page still reads like a source summary'],
                    },
                ],
            },
            {
                contentType: 'wiki',
                reviewScopeFiles: ['src/content/wiki/ko/chain-of-thought.md'],
                internalLinkCandidates: [
                    { title: 'Reasoning Model', url: '/ko/wiki/reasoning/' },
                ],
                scriptFindings: [
                    { severity: 'warn', rule: 'tone-B1', message: 'inline link count is low' },
                ],
            },
        );

        assert.match(prompt, /src\/content\/wiki\/ko\/chain-of-thought\.md/);
        assert.match(prompt, /본문에 링크를 더 넣어라/);
        assert.match(prompt, /Reasoning Model/);
        assert.match(prompt, /tone-B1/);
    });

    it('includes showcase scope when revising project pages', () => {
        const prompt = reviewPanel.buildRevisionPrompt(
            { filepath: 'D:\\srcp\\aiki\\src\\content\\projects\\ko\\pocketbase.md' },
            { topMustFix: ['showcase card headings still read like prose'], reviews: [] },
            {
                contentType: 'projects',
                reviewScopeFiles: [
                    'src/content/projects/ko/pocketbase.md',
                    'src/components/projects/showcases/pocketbase/index.tsx',
                ],
                showcase: {
                    filePath: 'src/components/projects/showcases/pocketbase/index.tsx',
                    text: '실전형 샘플 구조\n자동 Admin CRUD',
                },
                internalLinkCandidates: [],
                scriptFindings: [],
            },
        );

        assert.match(prompt, /src\/content\/projects\/ko\/pocketbase\.md/);
        assert.match(prompt, /src\/components\/projects\/showcases\/pocketbase\/index\.tsx/);
        assert.match(prompt, /showcase TSX file/);
    });
});
