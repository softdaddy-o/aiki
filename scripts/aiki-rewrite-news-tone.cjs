const fs = require('fs');
const path = require('path');

const { writeUtf8, yamlQuote } = require('./lib/content-utils.cjs');
const { checkTone } = require('F:/src3/Docs/social-posting/lib/tone-rules.js');

const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) {
        return null;
    }

    const yaml = match[1];
    const data = {};
    let currentListKey = null;

    for (const line of yaml.split('\n')) {
        const listMatch = line.match(/^\s*-\s+(.*)$/);
        if (listMatch && currentListKey) {
            if (!Array.isArray(data[currentListKey])) {
                data[currentListKey] = [];
            }
            data[currentListKey].push(listMatch[1].replace(/^["']|["']$/g, '').trim());
            continue;
        }

        const kvMatch = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
        if (!kvMatch) {
            continue;
        }

        currentListKey = null;
        const key = kvMatch[1];
        const rawValue = kvMatch[2].trim();

        if (rawValue === '') {
            currentListKey = key;
            continue;
        }

        data[key] = rawValue.replace(/^["']|["']$/g, '').trim();
    }

    return {
        block: match[1],
        data,
    };
}

function extractBody(content) {
    const match = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)$/);
    return match ? match[1].trim() : '';
}

function replaceFrontmatterField(block, key, value) {
    const escaped = yamlQuote(value);
    if (new RegExp(`^${key}:`, 'm').test(block)) {
        return block.replace(new RegExp(`^${key}:\\s*.*$`, 'm'), `${key}: ${escaped}`);
    }

    return block;
}

function normalizeText(text) {
    return String(text || '')
        .replace(/\s+/g, ' ')
        .replace(/^\W+/, '')
        .trim();
}

function trimTrailingPeriod(text) {
    return normalizeText(text).replace(/[.!?]+$/g, '').trim();
}

function titleWithoutSuffix(title) {
    return trimTrailingPeriod(title).replace(/\s*-\s*AIKI$/i, '').trim();
}

function problemFromReaderValue(readerValue) {
    const source = normalizeText(readerValue)
        .replace(/^이 글이 해결해주는 문제는\s*/u, '')
        .replace(/^이 글에서 해결하는 독자의 문제는\s*/u, '')
        .replace(/^(이 글은|이 글이)\s*/u, '')
        .replace(/라는 점이다\.?$/u, '')
        .replace(/다는 점이다\.?$/u, '')
        .replace(/라는 데 있다\.?$/u, '')
        .replace(/라는 데 있다$/u, '')
        .replace(/라는 점이야\.?$/u, '')
        .replace(/다는 점이야\.?$/u, '')
        .trim();

    return source || '이 변화가 어디에 직접 영향을 주는지 빠르게 구분하는 거야';
}

function focusFromTags(tags) {
    const joined = new Set(tags || []);

    if (joined.has('security') || joined.has('보안') || joined.has('취약점')) {
        return '권한 통제와 운영 리스크';
    }
    if (joined.has('claude-code') || joined.has('coding-agent') || joined.has('developer-tools')) {
        return '개발 생산성과 도구 신뢰도';
    }
    if (joined.has('local-ai') || joined.has('tiny-model') || joined.has('retro-computing')) {
        return '로컬 추론 한계와 초저사양 배포';
    }
    if (joined.has('openai') || joined.has('anthropic') || joined.has('google') || joined.has('gemini')) {
        return '모델 전략과 제품 우선순위';
    }
    if (joined.has('multimodal') || joined.has('video-generation') || joined.has('audio')) {
        return '입출력 경험과 실제 사용 시나리오';
    }
    if (joined.has('reasoning') || joined.has('benchmark')) {
        return '성능 해석과 실전 적용 범위';
    }
    if (joined.has('open-model') || joined.has('gguf') || joined.has('quantization')) {
        return '오픈 모델 활용성과 배포 비용';
    }

    return '실무 우선순위와 적용 범위';
}

function buildBody(frontmatter) {
    const title = titleWithoutSuffix(frontmatter.title);
    const summary = trimTrailingPeriod(frontmatter.summary);
    const sourceUrl = normalizeText(frontmatter.sourceUrl);
    const sourceTitle = trimTrailingPeriod(frontmatter.sourceTitle) || title;
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const focus = focusFromTags(tags);
    const problem = problemFromReaderValue(frontmatter.readerValue);

    const paragraphOne = `${summary} [원문](${sourceUrl})은 ${sourceTitle} 기준으로 확인한 내용이야. 이 이슈는 ${problem} 쪽에서 읽어야 맥락이 빨리 잡혀.`;
    const paragraphTwo = `${title}에서 진짜 봐야 하는 건 이름 자체보다 ${focus}가 어디를 바꾸는지야. 공개 범위, 숫자, 적용 대상, 제약 조건이 같이 움직이는지 봐야 발표 문구와 실전 신호를 구분할 수 있어.`;
    const paragraphThree = `실무에서는 이 업데이트를 바로 도입할지보다 먼저 지금 쓰는 모델, 도구, 배포 흐름과 붙일 수 있는지를 체크하면 돼. 그렇게 봐야 이 변화가 단순 화제인지, 다음 분기 우선순위를 바꿀 수준인지 판단하기 쉬워져.`;

    return [paragraphOne, paragraphTwo, paragraphThree].join('\n\n');
}

function shouldRewrite(body) {
    const results = checkTone(body, 'blog');
    return results.some((result) => result.severity === 'FAIL');
}

function listNewsFiles() {
    return fs.readdirSync(NEWS_DIR)
        .filter((file) => file.endsWith('.md'))
        .sort();
}

function rewriteFile(fileName) {
    const filePath = path.join(NEWS_DIR, fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(content);

    if (!parsed) {
        return false;
    }

    const body = extractBody(content);
    if (!shouldRewrite(body)) {
        return false;
    }

    const nextBody = buildBody(parsed.data);
    let nextBlock = parsed.block;
    nextBlock = replaceFrontmatterField(nextBlock, 'summary', trimTrailingPeriod(parsed.data.summary) + '.');

    const nextContent = `---\n${nextBlock}\n---\n\n${nextBody}\n`;
    writeUtf8(filePath, nextContent);
    return true;
}

function main() {
    const files = listNewsFiles();
    let rewritten = 0;

    for (const fileName of files) {
        if (rewriteFile(fileName)) {
            rewritten += 1;
            console.log(`Rewrote ${fileName}`);
        }
    }

    console.log(`Tone rewrite complete: ${rewritten} file(s).`);
}

main();
