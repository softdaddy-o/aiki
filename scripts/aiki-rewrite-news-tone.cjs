const fs = require('fs');
const path = require('path');

const { writeUtf8, yamlQuote } = require('./lib/content-utils.cjs');
const { checkTone } = require('F:/src3/Docs/social-posting/lib/tone-rules.js');
const {
    buildNewsReaderValue,
    buildNewsTitle,
    isBadNewsReaderValue,
    isBadNewsTitle,
    normalizeText,
    trimSentence,
} = require('./lib/aiki-writing-style.cjs');

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

function focusFromTags(tags) {
    const joined = new Set(tags || []);

    if (joined.has('security') || joined.has('보안') || joined.has('취약점')) {
        return '운영 리스크와 권한 통제';
    }
    if (joined.has('claude-code') || joined.has('coding-agent') || joined.has('developer-tools')) {
        return '개발 생산성과 도구 흐름';
    }
    if (joined.has('local-ai') || joined.has('tiny-model') || joined.has('retro-computing')) {
        return '로컬 배포 한계와 초저사양 실험';
    }
    if (joined.has('openai') || joined.has('anthropic') || joined.has('google') || joined.has('gemini')) {
        return '모델 로드맵과 제품 우선순위';
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

function buildBody(frontmatter, fileName) {
    const title = buildNewsTitle(frontmatter, fileName);
    const summary = trimSentence(frontmatter.summary);
    const sourceUrl = normalizeText(frontmatter.sourceUrl);
    const sourceTitle = trimSentence(frontmatter.sourceTitle) || title;
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const focus = focusFromTags(tags);
    const problem = buildNewsReaderValue(frontmatter, fileName);

    const paragraphOne = `${summary} [원문](${sourceUrl})은 ${sourceTitle} 기준으로 다시 확인한 내용이야. 독자 입장에선 ${problem}`;
    const paragraphTwo = `${title}에서 봐야 하는 포인트는 발표 문장 자체보다 ${focus} 쪽 변화야. 공개 범위, 숫자, 가격, 실제 적용 조건을 같이 봐야 과장된 문구와 실질 신호를 구분할 수 있어.`;
    const paragraphThree = '바로 도입할지보다 먼저 체크할 건 이 변화가 지금 쓰는 모델, 도구, 배포 흐름에 어떤 마찰이나 기회를 만들었는지야. 그렇게 읽어야 이 뉴스가 단순 화제가 아니라 다음 우선순위를 바꾸는 신호인지 판단이 쉬워져.';

    return [paragraphOne, paragraphTwo, paragraphThree].join('\n\n');
}

function shouldRewriteBody(body) {
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
    const rewriteBody = shouldRewriteBody(body);
    const rewriteTitle = isBadNewsTitle(parsed.data, fileName, body);
    const rewriteReaderValue = isBadNewsReaderValue(parsed.data);

    if (!rewriteBody && !rewriteTitle && !rewriteReaderValue) {
        return false;
    }

    const nextBody = rewriteBody ? buildBody(parsed.data, fileName) : body;
    let nextBlock = parsed.block;
    nextBlock = replaceFrontmatterField(nextBlock, 'summary', `${trimSentence(parsed.data.summary)}.`);

    if (rewriteTitle) {
        nextBlock = replaceFrontmatterField(nextBlock, 'title', buildNewsTitle(parsed.data, fileName));
    }

    if (rewriteReaderValue) {
        nextBlock = replaceFrontmatterField(nextBlock, 'readerValue', buildNewsReaderValue(parsed.data, fileName));
    }

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
