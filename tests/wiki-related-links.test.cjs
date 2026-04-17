const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { linkRelatedSections } = require('../scripts/lib/wiki-related-links.cjs');

describe('wiki-related-links', () => {
    it('links bullet labels inside related sections', () => {
        const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aiki-related-links-'));
        const dataDir = path.join(rootDir, 'data');
        fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(path.join(dataDir, 'wiki-terms.json'), JSON.stringify([
            { term: 'deepseek-r1', title: 'DeepSeek R1', category: 'model', aliases: [] },
            { term: 'quantization', title: 'Quantization', category: 'concept', aliases: [] },
        ], null, 2), 'utf8');

        try {
            const source = [
                '## 관련 용어',
                '',
                '- `deepseek-r1`: 공개 범위를 비교할 때 자주 나오는 모델이야.',
                '- `quantization`: 웨이트 형식을 볼 때 같이 등장해.',
                '',
                '## 주의해서 볼 점',
                '',
                '- `deepseek-r1`: 이 구간은 링크되면 안 돼.',
            ].join('\n');

            const result = linkRelatedSections(source, { rootDir });
            assert.equal(result.changed, true);
            assert.match(result.content, /\[deepseek-r1\]\(\/ko\/wiki\/deepseek-r1\/\): 공개 범위를 비교할 때 자주 나오는 모델이야\./u);
            assert.match(result.content, /\[quantization\]\(\/ko\/wiki\/quantization\/\): 웨이트 형식을 볼 때 같이 등장해\./u);
            assert.match(result.content, /## 주의해서 볼 점[\s\S]*- `deepseek-r1`: 이 구간은 링크되면 안 돼\./u);
        } finally {
            fs.rmSync(rootDir, { recursive: true, force: true });
        }
    });
});
