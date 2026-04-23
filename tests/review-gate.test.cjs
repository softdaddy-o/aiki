const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const { isReviewCurrent } = require('../scripts/aiki-review-gate.cjs');
const { getReviewContentHash, getReviewScopeFiles } = require('../scripts/lib/review-content.cjs');

const PROJECT_FILE = path.resolve(__dirname, '../src/content/projects/ko/pocketbase.md');
const PANEL = {
    version: '1.1.0',
    agents: [
        { id: 'beginner-editor', version: '1.0.0' },
        { id: 'fact-checker', version: '1.0.0' },
        { id: 'skeptical-critic', version: '1.1.0' },
        { id: 'tone-editor', version: '1.5.0' },
        { id: 'structure-editor', version: '1.1.0' },
    ],
};

function buildStamp(overrides = {}) {
    return {
        panelVersion: PANEL.version,
        panelVerdict: 'pass',
        contentHash: getReviewContentHash(PROJECT_FILE),
        agentVersions: Object.fromEntries(PANEL.agents.map((agent) => [agent.id, agent.version])),
        guideVersions: {
            tone: '2.0.0',
            common: '2.2.0',
            projects: '4.2.0',
        },
        ...overrides,
    };
}

describe('review-gate', () => {
    it('accepts current pass review stamps', () => {
        assert.equal(
            isReviewCurrent({ reviewStamp: buildStamp() }, PANEL, PROJECT_FILE),
            true,
        );
    });

    it('rejects missing, non-pass, or stale stamps', () => {
        assert.equal(isReviewCurrent({}, PANEL, PROJECT_FILE), false);
        assert.equal(
            isReviewCurrent({ reviewStamp: buildStamp({ panelVerdict: 'revise' }) }, PANEL, PROJECT_FILE),
            false,
        );
        assert.equal(
            isReviewCurrent({ reviewStamp: buildStamp({ panelVersion: '1.0.0' }) }, PANEL, PROJECT_FILE),
            false,
        );
        assert.equal(
            isReviewCurrent({ reviewStamp: buildStamp({ contentHash: 'deadbeefdeadbeef' }) }, PANEL, PROJECT_FILE),
            false,
        );
    });

    it('includes showcase files in the project review scope', () => {
        const scope = getReviewScopeFiles(PROJECT_FILE).map((filepath) => path.relative(path.dirname(PROJECT_FILE), filepath).replace(/\\/g, '/'));
        assert.deepEqual(scope, ['pocketbase.md', '../../../components/projects/showcases/pocketbase/index.tsx']);
    });
});
