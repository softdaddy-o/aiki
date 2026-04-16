const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { isReviewCurrent } = require('../scripts/aiki-review-gate.cjs');

describe('review-gate', () => {
    it('accepts current pass review stamps', () => {
        assert.equal(isReviewCurrent({
            reviewStamp: {
                panelVersion: '1.0.0',
                panelVerdict: 'pass',
            },
        }, '1.0.0'), true);
    });

    it('rejects missing, non-pass, or stale stamps', () => {
        assert.equal(isReviewCurrent({}, '1.0.0'), false);
        assert.equal(isReviewCurrent({
            reviewStamp: {
                panelVersion: '1.0.0',
                panelVerdict: 'revise',
            },
        }, '1.0.0'), false);
        assert.equal(isReviewCurrent({
            reviewStamp: {
                panelVersion: '0.9.0',
                panelVerdict: 'pass',
            },
        }, '1.0.0'), false);
    });
});
