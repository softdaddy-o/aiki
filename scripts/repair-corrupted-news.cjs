const fs = require('fs');
const path = require('path');

const {
    clip,
    extractDescription,
    extractTitle,
    fetchText,
    sentenceSplit,
    translateToKorean,
    writeUtf8,
    yamlQuote,
} = require('./lib/content-utils.cjs');

const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return null;

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
        if (!kvMatch) continue;

        currentListKey = null;
        const key = kvMatch[1];
        const rawValue = kvMatch[2].trim();

        if (rawValue === '') {
            currentListKey = key;
            continue;
        }

        data[key] = rawValue.replace(/^["']|["']$/g, '').trim();
    }

    return { block: match[1], bodyStart: match[0].length, data };
}

function extractBody(content) {
    const match = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)$/);
    return match ? match[1] : '';
}

function hasHangul(text) {
    return /[가-힣]/.test(String(text || ''));
}

function countCjkIdeographs(text) {
    return (String(text || '').match(/[\u4E00-\u9FFF]/g) || []).length;
}

function containsBrokenCopy(text) {
    const source = String(text || '');
    return /\?\?|�/.test(source) || countCjkIdeographs(source) >= 8;
}

function needsRepair(content, frontmatter) {
    return containsBrokenCopy(frontmatter.title)
        || containsBrokenCopy(frontmatter.summary)
        || containsBrokenCopy(frontmatter.readerValue)
        || containsBrokenCopy(extractBody(content))
        || /이 뉴스의 값은|이 글의 값|이 글이 주는 값/.test(String(frontmatter.readerValue || ''));
}

function normalizeTitleCandidate(title) {
    const source = String(title || '').replace(/\s+/g, ' ').trim();
    if (!source) return '';

    const parts = source.split(/\s+[|—-]\s+/).map((part) => part.trim()).filter(Boolean);
    if (parts.length === 0) return source;

    const best = parts.find((part) => part.length >= 10 && !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(part));
    return best || parts[0];
}

async function localize(text) {
    const source = String(text || '').replace(/\s+/g, ' ').trim();
    if (!source) return '';
    if (hasHangul(source)) return source;

    try {
        return await translateToKorean(source);
    } catch {
        return source;
    }
}

function buildHeadline(title, summary) {
    const cleanTitle = String(title || '').trim();
    const cleanSummary = String(summary || '').replace(/\s+/g, ' ').replace(/[.!?]+$/g, '').trim();

    if (!cleanTitle) {
        return clip(cleanSummary, 64);
    }

    if (!cleanSummary) {
        return clip(cleanTitle, 64);
    }

    if (cleanSummary.startsWith(cleanTitle)) {
        return clip(cleanTitle, 64);
    }

    return clip(`${cleanTitle}, ${cleanSummary}`, 64);
}

function buildReaderValue(summary, title) {
    const base = String(summary || title || '').replace(/\s+/g, ' ').replace(/[.!?]+$/g, '').trim();
    return `이 글이 해결해주는 문제는 ${base}가 실제 시장과 개발 흐름에서 왜 중요한지 빠르게 파악하게 해준다는 점이다.`;
}

function focusPhrase(tags) {
    const joined = Array.isArray(tags) ? tags.join(' ') : '';
    if (/reasoning|eval|benchmark/.test(joined)) return '성능 비교와 실전 적용 범위를';
    if (/agent|workflow|automation/.test(joined)) return '에이전트 워크플로와 운영 비용을';
    if (/model|open-model|llm/.test(joined)) return '모델 전략과 생태계 경쟁을';
    if (/api|tool|developer/.test(joined)) return '개발자 도구와 배포 흐름을';
    return '제품 전략과 실무 판단 포인트를';
}

function buildBody(title, summary, tags, sourceTitle) {
    const focus = focusPhrase(tags);
    const summaryLine = String(summary || '').replace(/[.!?]+$/g, '').trim();
    const sourceName = String(sourceTitle || '원문').trim();

    return [
        `${summaryLine}. 이 소식은 한 줄 뉴스로 끝낼 내용이 아니라, ${focus} 같이 보게 만든다.`,
        `${sourceName} 기준으로 보면 핵심은 기능 소개 자체보다 어떤 팀이 이 변화를 먼저 가져다 쓸 수 있는지에 있다. 숫자, 공개 범위, 적용 대상이 함께 움직이면 그때부터는 단순 데모가 아니라 실제 시장 신호로 읽어야 한다.`,
        `읽을 때는 ${title}가 바꾸는 지점이 성능인지, 비용인지, 배포 방식인지부터 나눠 보면 된다. 그렇게 읽으면 발표 문구가 과장돼 있어도 실무적으로 남는 포인트를 빠르게 추릴 수 있다.`,
    ].join('\n\n');
}

function replaceFrontmatterField(block, key, value) {
    const escaped = yamlQuote(value);
    if (new RegExp(`^${key}:`, 'm').test(block)) {
        return block.replace(new RegExp(`^${key}:\\s*.*$`, 'm'), `${key}: ${escaped}`);
    }

    if (key === 'readerValue' && /^sourceUrl:/m.test(block)) {
        return block.replace(/^sourceUrl:/m, `readerValue: ${escaped}\nsourceUrl:`);
    }

    return block;
}

async function fetchSourceMetadata(sourceUrl, fallbackTitle, fallbackSummary) {
    try {
        const html = await fetchText(sourceUrl);
        const title = normalizeTitleCandidate(extractTitle(html) || fallbackTitle);
        const description = extractDescription(html) || fallbackSummary;
        return { title, description };
    } catch {
        return {
            title: fallbackTitle,
            description: fallbackSummary,
        };
    }
}

async function repairFile(filePath) {
    const original = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(original);
    if (!parsed) return false;
    if (!needsRepair(original, parsed.data)) return false;

    const sourceUrl = parsed.data.sourceUrl || '';
    const sourceTitle = parsed.data.sourceTitle || parsed.data.title || '원문';
    const sourceMeta = await fetchSourceMetadata(
        sourceUrl,
        sourceTitle,
        parsed.data.summary || parsed.data.title || '',
    );

    const localizedTitle = await localize(sourceMeta.title || sourceTitle);
    const localizedDescription = await localize(sourceMeta.description || parsed.data.summary || localizedTitle);
    const summary = clip((sentenceSplit(localizedDescription)[0] || localizedDescription).trim(), 180);
    const headline = buildHeadline(localizedTitle, summary);
    const readerValue = buildReaderValue(summary, headline);
    const body = buildBody(headline, summary, parsed.data.tags, sourceMeta.title || sourceTitle);

    let nextBlock = parsed.block;
    nextBlock = replaceFrontmatterField(nextBlock, 'title', headline);
    nextBlock = replaceFrontmatterField(nextBlock, 'summary', summary);
    nextBlock = replaceFrontmatterField(nextBlock, 'readerValue', readerValue);
    nextBlock = replaceFrontmatterField(nextBlock, 'sourceTitle', sourceMeta.title || sourceTitle);

    const nextContent = `---\n${nextBlock}\n---\n\n${body}\n`;
    writeUtf8(filePath, nextContent);
    return true;
}

async function main() {
    const files = fs.readdirSync(NEWS_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => path.join(NEWS_DIR, file));

    let repaired = 0;
    for (const filePath of files) {
        if (await repairFile(filePath)) {
            repaired += 1;
            console.log(`Repaired ${path.basename(filePath)}`);
        }
    }

    console.log(`Repair complete: ${repaired} file(s).`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
