const { test } = require('node:test');
const assert = require('node:assert/strict');

test('wiki catalog hidden hints avoid helper-verb tone templates', () => {
    const { catalog } = require('../scripts/lib/wiki-catalog.cjs');
    const joined = catalog
        .flatMap((item) => [
            item.userProblem,
            item.decisionAxis,
            item.adversarialRisk,
            ...Object.values(item.relatedHints || {}),
        ])
        .filter(Boolean)
        .join('\n');

    assert.doesNotMatch(joined, /(?:해\s*준다|도와준(?:다|다는))/u);
});
