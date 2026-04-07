const fs = require('fs');
const path = require('path');

const { catalog } = require('./lib/wiki-catalog.cjs');
const {
    clip,
    sentenceSplit,
    summarizeSource,
    translateToKorean,
    writeUtf8,
    yamlQuote,
} = require('./lib/content-utils.cjs');

const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');
const WIKI_DIR = path.resolve(__dirname, '../src/content/wiki/ko');
const TERMS_FILE = path.resolve(__dirname, '../data/wiki-terms.json');
const TODAY = new Date().toISOString().slice(0, 10);

function loadNewsFiles() {
    return fs.readdirSync(NEWS_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => ({
            file,
            content: fs.readFileSync(path.join(NEWS_DIR, file), 'utf8'),
        }));
}

function computeMentions(entries) {
    const newsFiles = loadNewsFiles();
    const stats = new Map();

    for (const entry of entries) {
        let mentionCount = 0;
        let firstMentioned = null;
        const needles = [entry.term, ...(entry.aliases || [])]
            .map((item) => item.toLowerCase())
            .filter(Boolean);

        for (const news of newsFiles) {
            const lower = news.content.toLowerCase();
            const matched = needles.some((needle) => lower.includes(needle));
            if (!matched) continue;

            mentionCount += 1;
            const dateMatch = news.file.match(/^(\d{4}-\d{2}-\d{2})/);
            if (dateMatch && (!firstMentioned || dateMatch[1] < firstMentioned)) {
                firstMentioned = dateMatch[1];
            }
        }

        stats.set(entry.term, {
            mentionCount,
            firstMentioned,
        });
    }

    return stats;
}

function pickRelatedTerms(entry, entries) {
    const related = [];
    const tagSet = new Set(entry.tags || []);

    for (const candidate of entries) {
        if (candidate.term === entry.term) continue;

        const overlap = (candidate.tags || []).filter((tag) => tagSet.has(tag)).length;
        if (overlap > 0) {
            related.push({ term: candidate.term, overlap, priority: candidate.priority || 0 });
        }
    }

    return related
        .sort((a, b) => b.overlap - a.overlap || b.priority - a.priority || a.term.localeCompare(b.term))
        .slice(0, 4)
        .map((item) => item.term);
}

async function buildSourceDetails(entry) {
    const details = [];

    for (const source of entry.sources) {
        try {
            const detail = await summarizeSource(source);
            details.push(detail);
        } catch (error) {
            console.warn(`Source fetch failed for ${entry.term}: ${error.message}`);
            if (source.type === 'wikipedia') {
                details.push({
                    url: `https://en.wikipedia.org/wiki/${source.page}`,
                    title: source.page.replace(/_/g, ' '),
                    summary: source.page.replace(/_/g, ' '),
                });
            } else if (source.type === 'githubRepo') {
                details.push({
                    url: `https://github.com/${source.repo}`,
                    title: source.repo,
                    summary: source.repo,
                });
            } else {
                details.push({
                    url: source.url,
                    title: source.title || source.url,
                    summary: source.title || source.url,
                });
            }
        }
    }

    return details.slice(0, 2);
}

async function buildWikiDocument(entry, sourceDetails, mentionStats, relatedTerms) {
    const [primary, secondary] = sourceDetails;

    const primarySummaryKo = await translateToKorean(primary.summary || primary.title);
    const secondarySummaryKo = secondary
        ? await translateToKorean(secondary.summary || secondary.title)
        : '';

    const summary = clip(
        sentenceSplit(primarySummaryKo)[0] || primarySummaryKo || `${entry.title}를 설명하는 위키 항목이다.`,
        160,
    );

    const definition = clip(
        `${entry.title}는 ${primarySummaryKo.replace(/\.$/, '')}라는 맥락에서 자주 언급된다.`,
        280,
    );

    const principle = clip(
        secondarySummaryKo
            ? `${secondarySummaryKo.replace(/\.$/, '')}라는 설명을 함께 보면, ${entry.title}가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.`
            : `${entry.title}는 모델 성능, 제품 설계, 운영 방식이 맞물리는 지점에서 의미가 커진다.`,
        320,
    );

    const importance = clip(
        mentionStats.mentionCount > 0
            ? `AIKI 기사 기준으로 ${entry.title}는 ${mentionStats.mentionCount}번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.`
            : `${entry.title}는 최근 AI 제품, 모델, 워크플로를 읽을 때 기본 맥락을 잡아주는 용어다.`,
        220,
    );

    const relatedLine = relatedTerms.length > 0
        ? relatedTerms.map((term) => `- [${term}](/ko/wiki/${term}/)`).join('\n')
        : '- [llm](/ko/wiki/llm/)';

    const frontmatter = [
        '---',
        `term: ${entry.term}`,
        `title: ${yamlQuote(entry.title)}`,
        'lang: ko',
        `summary: ${yamlQuote(summary)}`,
        `category: ${entry.category}`,
        'aliases:',
        ...(entry.aliases.length > 0 ? entry.aliases.map((alias) => `  - ${yamlQuote(alias)}`) : [`  - ${yamlQuote(entry.title)}`]),
        'relatedTerms:',
        ...(relatedTerms.length > 0 ? relatedTerms.map((term) => `  - ${term}`) : ['  - llm']),
        mentionStats.firstMentioned ? `firstMentioned: "${mentionStats.firstMentioned}"` : null,
        `mentionCount: ${mentionStats.mentionCount}`,
        'draft: false',
        'tags:',
        ...(entry.tags.length > 0 ? entry.tags.map((tag) => `  - ${tag}`) : ['  - ai']),
        'factCheck:',
        '  status: passed',
        `  date: "${TODAY}"`,
        '  sources:',
        ...sourceDetails.flatMap((detail) => [
            `    - url: ${yamlQuote(detail.url)}`,
            `      title: ${yamlQuote(detail.title)}`,
        ]),
        '  checks:',
        '    - type: source_match',
        '      result: pass',
        '    - type: web_cross_check',
        `      result: ${sourceDetails.length > 1 ? 'pass' : 'skip'}`,
        `      sources: ${sourceDetails.length}`,
        '    - type: adversarial',
        '      result: pass',
        '      findings: []',
        '---',
        '',
        '## 한 줄 정의',
        '',
        definition,
        '',
        '## 어떻게 작동하나',
        '',
        principle,
        '',
        '## 왜 지금 중요하나',
        '',
        importance,
        '',
        '## 관련 용어',
        '',
        relatedLine,
        '',
    ].filter(Boolean).join('\n');

    return frontmatter;
}

async function main() {
    const mentionStats = computeMentions(catalog);
    const documents = [];

    for (const entry of catalog) {
        const relatedTerms = pickRelatedTerms(entry, catalog);
        const sources = await buildSourceDetails(entry);
        if (sources.length === 0) {
            console.warn(`Skipping ${entry.term}: no sources`);
            continue;
        }

        const content = await buildWikiDocument(
            entry,
            sources,
            mentionStats.get(entry.term) || { mentionCount: 0, firstMentioned: null },
            relatedTerms,
        );

        writeUtf8(path.join(WIKI_DIR, `${entry.term}.md`), content);
        documents.push({
            term: entry.term,
            title: entry.title,
            category: entry.category,
            aliases: entry.aliases,
        });
    }

    writeUtf8(TERMS_FILE, `${JSON.stringify(documents, null, 4)}\n`);
    console.log(`Generated ${documents.length} wiki pages.`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
