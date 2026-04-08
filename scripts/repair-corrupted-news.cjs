const fs = require('fs');
const path = require('path');

const {
    clip,
    sentenceSplit,
    translateToKorean,
    writeUtf8,
    yamlQuote,
} = require('./lib/content-utils.cjs');
const { findPostByUrl, isRedditMediaUrl } = require('./lib/scraper-posts.cjs');

const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');
const BLOCKED_SOURCE_PATTERNS = [
    /please wait for verification/i,
    /확인을 기다려주세요/,
    /verify you are human/i,
    /sorry, you have been blocked/i,
    /access denied/i,
    /cloudflare/i,
];
const FORBIDDEN_COPY_PATTERNS = [
    /이 뉴스의 값은/,
    /이 글의 값/,
    /이 글이 주는 값/,
];

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

    return { block: match[1], data };
}

function extractBody(content) {
    const match = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)$/);
    return match ? match[1] : '';
}

function countCjkIdeographs(text) {
    return (String(text || '').match(/[\u4E00-\u9FFF]/g) || []).length;
}

function containsBrokenCopy(text) {
    const source = String(text || '');
    return /\?\?|�/.test(source) || countCjkIdeographs(source) >= 8;
}

function containsBlockedSourceText(text) {
    return BLOCKED_SOURCE_PATTERNS.some((pattern) => pattern.test(String(text || '')));
}

function needsRepair(content, frontmatter) {
    return containsBrokenCopy(frontmatter.title)
        || containsBrokenCopy(frontmatter.summary)
        || containsBrokenCopy(frontmatter.readerValue)
        || containsBrokenCopy(frontmatter.sourceTitle)
        || containsBrokenCopy(extractBody(content))
        || containsBlockedSourceText(frontmatter.title)
        || containsBlockedSourceText(frontmatter.summary)
        || containsBlockedSourceText(frontmatter.readerValue)
        || containsBlockedSourceText(frontmatter.sourceTitle)
        || FORBIDDEN_COPY_PATTERNS.some((pattern) => pattern.test(String(frontmatter.readerValue || '')))
        || isRedditMediaUrl(frontmatter.sourceUrl);
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

async function localize(text) {
    const source = String(text || '').replace(/\s+/g, ' ').trim();
    if (!source) return '';

    try {
        return await translateToKorean(source);
    } catch {
        return source;
    }
}

function cleanEnglish(text) {
    return String(text || '')
        .replace(/\?\?/g, '')
        .replace(/\\n/g, '\n')
        .replace(/\s+/g, ' ')
        .trim();
}

function pickComment(post) {
    if (!post || !Array.isArray(post.topComments)) {
        return '';
    }

    const candidate = post.topComments
        .filter((item) => !item.isModerator && !item.isBot && Number(item.score || 0) >= 5)
        .sort((a, b) => Number(b.score || 0) - Number(a.score || 0))[0];

    return candidate ? cleanEnglish(candidate.text).split('…')[0] : '';
}

function buildReaderValue(summary) {
    return `이 글이 해결해주는 문제는 ${summary}가 왜 실무 판단 포인트로 이어지는지 빠르게 읽게 해준다는 점이다.`;
}

function buildBody(post, summaryKo, commentKo) {
    const snippet = cleanEnglish(post.contentSnippet);
    const facts = snippet
        .split(/\n+/)
        .map((line) => line.replace(/^[-*•\s]+/, '').trim())
        .filter((line) => line.length >= 16)
        .slice(0, 3);

    const likeCount = Number(post.likeCount || 0).toLocaleString('en-US');
    const replyCount = Number(post.replyCount || 0).toLocaleString('en-US');

    const paragraphs = [
        `${summaryKo} 이 글은 Reddit에서 추천 ${likeCount}개, 댓글 ${replyCount}개를 모으면서 단순 화제성보다 실험 설계 자체로 주목받았다.`,
    ];

    if (facts.length > 0) {
        paragraphs.push(`작성자가 남긴 단서는 ${facts.join(', ')} 쪽이다. 그래서 이 사례는 결과 이미지보다 어떤 제약을 우회했고 무엇이 병목이었는지를 읽어야 의미가 생긴다.`);
    }

    paragraphs.push('이런 글을 볼 때 핵심은 "최신 모델이 더 좋다"가 아니라, 제약이 심한 환경에서도 어디까지 동작 범위를 밀어낼 수 있느냐다. 로컬 추론, 엣지 배포, 교육용 실험처럼 성능보다 조건 적합성이 중요한 팀에는 이런 사례가 꽤 직접적인 힌트가 된다.');

    if (commentKo) {
        paragraphs.push(`커뮤니티 반응도 같은 지점을 짚었다. 상위 댓글은 "${commentKo}"라고 반응했는데, 신기함보다 실제 효용과 재현 가능성을 먼저 묻고 있다는 뜻이다. 그래서 이 글은 데모 감상이 아니라 "어떤 환경에서 이 접근이 먹히는가"를 가르는 사례로 보는 편이 맞다.`);
    } else {
        paragraphs.push('정리하면 이 포스트의 가치는 기술 과시에 있지 않다. 모델 크기, 하드웨어 제약, 툴체인 우회가 한 번에 얽힐 때 로컬 AI의 현실적인 하한선이 어디까지 내려오는지를 보여준다는 점이 더 중요하다.');
    }

    return paragraphs.join('\n\n');
}

async function repairFile(filePath) {
    const original = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(original);
    if (!parsed) return false;
    if (!needsRepair(original, parsed.data)) return false;

    const scraperPost = findPostByUrl(parsed.data.sourceUrl) || findPostByUrl(parsed.data.postUrl);
    if (!scraperPost) {
        return false;
    }

    const titleKo = clip(await localize(cleanEnglish(scraperPost.text)), 64);
    const summarySeed = cleanEnglish(scraperPost.contentSnippet) || cleanEnglish(scraperPost.text);
    const summaryKo = clip(await localize(sentenceSplit(summarySeed)[0] || summarySeed), 180);
    const commentKo = await localize(clip(pickComment(scraperPost), 120));
    const readerValue = buildReaderValue(summaryKo);
    const body = buildBody(scraperPost, summaryKo, commentKo);

    let nextBlock = parsed.block;
    nextBlock = replaceFrontmatterField(nextBlock, 'title', titleKo);
    nextBlock = replaceFrontmatterField(nextBlock, 'summary', summaryKo);
    nextBlock = replaceFrontmatterField(nextBlock, 'readerValue', readerValue);
    nextBlock = replaceFrontmatterField(nextBlock, 'sourceUrl', scraperPost.postUrl || parsed.data.sourceUrl);
    nextBlock = replaceFrontmatterField(nextBlock, 'sourceTitle', `Reddit r/${scraperPost.username || 'LocalLLaMA'}`);

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
