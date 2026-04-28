const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { collectFindings } = require('../scripts/lib/script-findings.cjs');

describe('script-findings', () => {
    it('returns an empty array for missing files', () => {
        const missing = path.join(os.tmpdir(), `aiki-missing-${Date.now()}.md`);
        assert.deepStrictEqual(collectFindings(missing, 'wiki'), []);
    });

    it('collects pre-publish findings for a malformed wiki file', () => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aiki-findings-'));
        const file = path.join(dir, 'thin.md');

        fs.writeFileSync(file, [
            '---',
            'term: thin',
            'title: Thin',
            'lang: ko',
            'category: concept',
            'summary: Thin',
            'readerValue: x',
            '---',
            '',
            'Too short.',
            '',
        ].join('\n'), 'utf8');

        try {
            const findings = collectFindings(file, 'wiki');
            assert.ok(Array.isArray(findings));
            assert.ok(findings.length > 0);
            assert.ok(findings.every((finding) => finding.source));
            assert.ok(findings.every((finding) => finding.severity));
            assert.ok(findings.every((finding) => finding.message));
        } finally {
            fs.rmSync(dir, { recursive: true, force: true });
        }
    });

    it('flags direct mentions of the internal reader persona in published copy', () => {
        const file = path.join(__dirname, 'fixtures', 'forbidden-persona-news.md');
        const findings = collectFindings(file, 'news');

        assert.ok(
            findings.some((finding) => finding.rule === 'forbidden-persona-name'),
            'expected a forbidden-persona-name finding',
        );
    });

    it('flags formal report tone in nested news frontmatter copy', () => {
        const file = path.join(__dirname, 'fixtures', 'formal-news-frontmatter.md');
        const findings = collectFindings(file, 'news');

        assert.ok(
            findings.some((finding) => finding.rule === 'news-frontmatter-tone'),
            'expected a news-frontmatter-tone finding',
        );
    });

    it('flags unsupported Google I/O ticket prize claims in published news', () => {
        const file = path.join(__dirname, 'fixtures', 'unsupported-event-prize-news.md');
        const findings = collectFindings(file, 'news');

        assert.ok(
            findings.some((finding) => finding.rule === 'unsupported-event-prize-claim'),
            'expected an unsupported-event-prize-claim finding',
        );
    });
});
