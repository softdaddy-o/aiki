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

    it('extracts showcase-only fields used by native project pages', () => {
        const source = `
            const flows = [
                {
                    prompt: '월간 리포트 장면으로 시작해',
                    resultNote: 'HTML 장면이 바로 render로 이어진다.',
                    watchFor: '폰트 fallback과 safe area부터 봐',
                    caption: '운영 체크',
                },
            ];
        `;

        const text = extractProjectShowcaseText(source);

        assert.match(text, /월간 리포트 장면/);
        assert.match(text, /바로 render/);
        assert.match(text, /safe area/);
        assert.match(text, /운영 체크/);
    });
});
