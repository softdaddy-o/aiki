const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
    { dir: path.join(ROOT, 'src/content/news/ko'), category: 'news' },
    { dir: path.join(ROOT, 'src/content/wiki/ko'), category: 'wiki' },
];

function escapeYaml(value) {
    return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

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

function summarizeTags(tags) {
    if (!tags || tags.length === 0) return '실제 제품과 모델 경쟁';
    return tags.slice(0, 3).join(', ');
}

function buildReaderValue(frontmatter, kind) {
    const title = frontmatter.title || frontmatter.term || '이 글';
    const summary = String(frontmatter.summary || '').replace(/\s+/g, ' ').trim().replace(/[.!?]+$/g, '');
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const tagPhrase = summarizeTags(tags);

    if (kind === 'wiki') {
        return `이 용어가 뉴스에 나오면 ${title}가 ${tagPhrase} 맥락에서 무엇을 바꾸는 개념인지 빠르게 구분해서 읽게 해준다.`;
    }

    if (summary.length > 40) {
        return `이 글이 해결해주는 문제는 ${summary}가 실제 시장과 개발 흐름에서 왜 중요한지 빠르게 파악하게 해준다는 점이다.`;
    }

    return `이 글이 해결해주는 문제는 ${title}가 ${tagPhrase} 맥락에서 왜 중요한 변화인지 빠르게 파악하게 해준다는 점이다.`;
}

function targetHasKey(frontmatterBlock, key) {
    return new RegExp(`^${key}:`, 'm').test(frontmatterBlock);
}

function updateFile(filePath, kind) {
    const original = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(original);
    if (!parsed) return false;

    const currentReaderValue = String(parsed.data.readerValue || '').trim();
    const nextReaderValue = buildReaderValue(parsed.data, kind);
    let frontmatterBlock = parsed.block;

    if (currentReaderValue) {
        frontmatterBlock = frontmatterBlock.replace(
            /^readerValue:\s*.*$/m,
            `readerValue: ${escapeYaml(nextReaderValue)}`,
        );
    } else if (targetHasKey(frontmatterBlock, 'sourceUrl')) {
        frontmatterBlock = frontmatterBlock.replace(
            /\nsourceUrl:/,
            `\nreaderValue: ${escapeYaml(nextReaderValue)}\nsourceUrl:`,
        );
    } else {
        frontmatterBlock = frontmatterBlock.replace(
            /\ncategory:/,
            `\nreaderValue: ${escapeYaml(nextReaderValue)}\ncategory:`,
        );
    }

    if (frontmatterBlock === parsed.block) {
        return false;
    }

    const nextContent = `---\n${frontmatterBlock}\n---\n${original.slice(parsed.bodyStart)}`;
    fs.writeFileSync(filePath, nextContent, 'utf8');
    return true;
}

let updated = 0;

for (const target of TARGETS) {
    const files = fs.readdirSync(target.dir).filter((file) => file.endsWith('.md'));
    for (const file of files) {
        if (updateFile(path.join(target.dir, file), target.category)) {
            updated += 1;
        }
    }
}

console.log(`Updated readerValue in ${updated} content file(s).`);
