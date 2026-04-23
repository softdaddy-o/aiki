const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { extractProjectShowcaseText } = require('../scripts/lib/project-showcase.cjs');

describe('project-showcase', () => {
    it('keeps TermHint term text in extracted descriptions', () => {
        const source = `
            const sample = (
                <Panel
                    description={<>브라우저에서 먼저 보고, <TermHint term="safe area" description="..." />와 폰트 fallback까지 점검한다.</>}
                />
            );
        `;

        const text = extractProjectShowcaseText(source);

        assert.match(text, /safe area/);
        assert.doesNotMatch(text, /보고, 와/);
    });

    it('keeps self-closing TermHint text in extracted descriptions', () => {
        const source = `
            const sample = (
                <Panel
                    description={<>cold start와 warm run을 나눠 보고, <TermHint term="reserved VRAM" description="..." /> 기준으로 배치 여유 판단.</>}
                />
            );
        `;

        const text = extractProjectShowcaseText(source);

        assert.match(text, /reserved VRAM/);
        assert.doesNotMatch(text, /보고, 기준/);
    });
});
