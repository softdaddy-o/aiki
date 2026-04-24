const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const migrate = require('../scripts/aiki-migrate-format-version.cjs');

function withArgv(args, fn) {
    const original = process.argv;
    process.argv = ['node', 'scripts/aiki-migrate-format-version.cjs', ...args];
    try {
        return fn();
    } finally {
        process.argv = original;
    }
}

describe('migrate-format-version', () => {
    it('supports projects-only mode', () => {
        const options = withArgv(['--projects-only'], () => migrate.parseArgs());
        assert.equal(options.projectsOnly, true);
        assert.equal(options.newsOnly, false);
        assert.equal(options.wikiOnly, false);
    });

    it('supports action filters', () => {
        const options = withArgv(['--bump-only', '--review-only', '--rewrite-only'], () => migrate.parseArgs());
        assert.equal(options.bumpOnly, true);
        assert.equal(options.reviewOnly, true);
        assert.equal(options.rewriteOnly, true);
    });

    it('uses safe review defaults for migration batches', () => {
        const options = withArgv([], () => migrate.parseArgs());
        assert.equal(options.reviewMaxRounds, 2);
        assert.equal(options.reviewTimeoutMs, 600_000);
        assert.equal(options.draftOnFail, false);
    });

    it('treats missing tone guide version as stale', () => {
        const currentGuide = {
            tone: '2.0.0',
            common: '2.2.0',
            news: '3.1.1',
            wiki: '3.1.1',
            projects: '4.2.0',
        };

        assert.equal(
            migrate.isGuideStale(
                { guideVersion: { common: '2.2.0', news: '3.1.1' } },
                'news',
                currentGuide,
            ),
            true,
        );

        assert.equal(
            migrate.isGuideStale(
                { guideVersion: { tone: '2.0.0', common: '2.2.0', projects: '4.2.0' } },
                'projects',
                currentGuide,
            ),
            false,
        );
    });

    it('includes tone, common, and type guide versions in signatures', () => {
        const base = {
            tone: '2.0.0',
            common: '2.2.0',
            news: '3.1.1',
            wiki: '3.1.1',
            projects: '4.2.0',
        };
        const nextTone = { ...base, tone: '2.0.1' };

        assert.notEqual(
            migrate.getMigrationSignature(base),
            migrate.getMigrationSignature(nextTone),
        );

        assert.deepEqual(
            migrate.getCurrentGuideVersions('projects', base),
            { tone: '2.0.0', common: '2.2.0', projects: '4.2.0' },
        );
    });
});
