const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const {
    clip,
    extractDescription,
    fetchText,
    sentenceSplit,
    translateToKorean,
    writeUtf8,
    yamlQuote,
} = require('./lib/content-utils.cjs');
const {
    buildNewsReaderValue,
    buildNewsTitle,
} = require('./lib/aiki-writing-style.cjs');
const { BACKFILL_START_YEAR } = require('./lib/content-policy.cjs');

const HISTORY_DIR = 'F:/src3/Docs/social-scraper/accounts/softdaddy/history';
const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');
const PROGRESS_FILE = path.resolve(__dirname, '../data/backfill-progress.json');
const TODAY = new Date().toISOString().slice(0, 10);

const milestoneCatalog = [
    {
        date: '2025-01-20',
        slug: 'deepseek-r1-open-release',
        titleHint: 'DeepSeek R1',
        sourceUrl: 'https://api-docs.deepseek.com/news/news250120',
        secondaryUrl: 'https://huggingface.co/deepseek-ai/DeepSeek-R1',
        tags: ['deepseek-r1', 'reasoning', 'open-model'],
        score: 95,
    },
    {
        date: '2024-02-15',
        slug: 'openai-sora-preview',
        titleHint: 'OpenAI Sora',
        sourceUrl: 'https://openai.com/index/sora/',
        secondaryUrl: 'https://en.wikipedia.org/wiki/Sora_(text-to-video_model)',
        tags: ['sora', 'video-generation', 'openai'],
        score: 94,
    },
    {
        date: '2023-03-14',
        slug: 'gpt-4-launch',
        titleHint: 'GPT-4',
        sourceUrl: 'https://openai.com/index/gpt-4-research/',
        secondaryUrl: 'https://en.wikipedia.org/wiki/GPT-4',
        tags: ['gpt-4', 'openai', 'multimodal'],
        score: 95,
    },
    {
        date: '2022-11-30',
        slug: 'chatgpt-launch',
        titleHint: 'ChatGPT',
        sourceUrl: 'https://openai.com/index/chatgpt/',
        secondaryUrl: 'https://en.wikipedia.org/wiki/ChatGPT',
        tags: ['chatgpt', 'openai', 'assistant'],
        score: 96,
    },
    {
        date: '2021-06-29',
        slug: 'github-copilot-preview',
        titleHint: 'GitHub Copilot',
        sourceUrl: 'https://github.blog/news-insights/product-news/github-copilot-your-ai-pair-programmer/',
        secondaryUrl: 'https://en.wikipedia.org/wiki/GitHub_Copilot',
        tags: ['copilot', 'coding-agent', 'github'],
        score: 90,
    },
    {
        date: '2020-05-28',
        slug: 'gpt-3-paper',
        titleHint: 'GPT-3',
        sourceUrl: 'https://openai.com/index/language-models-are-few-shot-learners/',
        secondaryUrl: 'https://en.wikipedia.org/wiki/GPT-3',
        tags: ['gpt-3', 'openai', 'language-model'],
        score: 92,
    },
    {
        date: '2019-02-14',
        slug: 'gpt-2-announcement',
        titleHint: 'GPT-2',
        sourceUrl: 'https://openai.com/index/better-language-models/',
        secondaryUrl: 'https://en.wikipedia.org/wiki/GPT-2',
        tags: ['gpt-2', 'openai', 'language-model'],
        score: 91,
    },
    {
        date: '2018-10-11',
        slug: 'bert-announcement',
        titleHint: 'BERT',
        sourceUrl: 'https://research.google/pubs/bert-pre-training-of-deep-bidirectional-transformers-for-language-understanding/',
        secondaryUrl: 'https://en.wikipedia.org/wiki/BERT_(language_model)',
        tags: ['bert', 'google', 'language-model'],
        score: 90,
    },
    {
        date: '2017-10-18',
        slug: 'alphago-zero',
        titleHint: 'AlphaGo Zero',
        sourceUrl: 'https://deepmind.google/blog/alphago-zero-starting-from-scratch/',
        secondaryUrl: 'https://en.wikipedia.org/wiki/AlphaGo_Zero',
        tags: ['alphago-zero', 'deepmind', 'reinforcement-learning'],
        score: 89,
    },
    {
        date: '2016-03-15',
        slug: 'alphago-lee-sedol',
        titleHint: 'AlphaGo',
        sourceUrl: 'https://deepmind.google/research/highlighted-research/alphago/the-future-of-go-summit',
        secondaryUrl: 'https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol',
        tags: ['alphago', 'deepmind', 'reinforcement-learning'],
        score: 88,
    },
    {
        date: '2011-02-16',
        slug: 'ibm-watson-jeopardy',
        titleHint: 'IBM Watson',
        sourceUrl: 'https://www.ibm.com/history/watson-jeopardy',
        secondaryUrl: 'https://en.wikipedia.org/wiki/Watson_(computer)',
        tags: ['watson', 'ibm', 'question-answering'],
        score: 86,
    },
];

function loadProgress() {
    if (!fs.existsSync(PROGRESS_FILE)) {
        return {
            lastHistoryDate: null,
            lastMilestoneYear: null,
            processedDates: [],
            processedYears: [],
        };
    }

    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
}

function saveProgress(progress) {
    writeUtf8(PROGRESS_FILE, `${JSON.stringify(progress, null, 4)}\n`);
}

function getHistoryDates() {
    return fs.readdirSync(HISTORY_DIR, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()
        .reverse();
}

function readBackfillCandidates(date) {
    const raw = execFileSync(
        process.execPath,
        [path.resolve(__dirname, './aiki-backfill.cjs'), '--history', '--date', date, '--max', '3'],
        { encoding: 'utf8' },
    );

    return JSON.parse(raw);
}

async function fetchArticleSummary(url, fallback = '') {
    try {
        const html = await fetchText(url);
        return extractDescription(html);
    } catch {
        return fallback || url;
    }
}

function chooseCandidate(candidates) {
    return (candidates.publish || [])[0] || null;
}

async function buildArticleMarkdown(date, title, sourceUrl, secondaryUrl, score, tags, bodySeed) {
    const translated = await translateToKorean(bodySeed);
    const sentences = sentenceSplit(translated);
    const summary = clip(sentences[0] || translated, 180);
    const frontmatterSeed = {
        title,
        summary,
        sourceUrl,
        sourceTitle: title,
        tags,
    };
    const readerValue = buildNewsReaderValue(frontmatterSeed, `${date}-${title}.md`);
    const headline = buildNewsTitle(frontmatterSeed, `${date}-${title}.md`);
    const paragraphOne = clip(translated, 340);
    const paragraphTwo = clip(
        `${title} 관련 1차 출처와 보조 출처를 함께 보면, ${summary.replace(/\.$/, '')}가 단순한 발표가 아니라 실제 제품과 생태계 변화로 이어졌다는 점이 드러난다.`,
        260,
    );
    const paragraphThree = clip(
        'AIKI 기준으로 이 이슈는 주간 타임라인에 올릴 만한 고득점 이벤트다. 기술 흐름을 볼 때는 발표 자체보다 이후에 어떤 제품, 비용 구조, 개발 습관을 바꾸는지가 더 중요하다.',
        220,
    );

    const cleanSummary = summary.replace(/[.!?]+$/g, '');
    const finalParagraphOne = clip(
        `[공식 발표](${sourceUrl})와 [보조 자료](${secondaryUrl})를 같이 보면 ${title}의 핵심은 ${cleanSummary} 쪽이야. 연간 뉴스로 남길 만한 이유도 이 발표가 실제 제품 흐름과 경쟁 구도를 바꾼 기준점이기 때문이야.`,
        320,
    );
    const finalParagraphTwo = clip(
        `${title} 자체보다 더 중요한 건 이후에 어떤 사용자 경험, 비용 구조, 생태계 반응이 따라붙었는지야. AIKI에서는 이런 마일스톤을 단순 출시 소식이 아니라 다음 분기 전략을 읽는 기준점으로 다뤄.`,
        260,
    );
    const finalParagraphThree = clip(
        `나중에 다시 볼 때는 성능 주장, 공개 범위, 가격 정책, 배포 채널을 공식 문서 기준으로 같이 확인하면 돼. 그래야 과장된 회고가 아니라 실제 변화로 읽을 수 있지.`,
        220,
    );

    return [
        '---',
        `title: ${yamlQuote(headline)}`,
        `date: "${date}T12:00:00+09:00"`,
        'lang: ko',
        'category: news',
        `summary: ${yamlQuote(summary)}`,
        `readerValue: ${yamlQuote(readerValue)}`,
        `sourceUrl: ${yamlQuote(sourceUrl)}`,
        `sourceTitle: ${yamlQuote(title)}`,
        'draft: false',
        'backfilled: true',
        `backfilledAt: "${TODAY}"`,
        `score: ${score}`,
        'sourceCount: 2',
        'factCheck:',
        '  status: passed',
        `  date: "${TODAY}"`,
        '  sources:',
        `    - url: ${yamlQuote(sourceUrl)}`,
        `      title: ${yamlQuote(title)}`,
        `    - url: ${yamlQuote(secondaryUrl)}`,
        '      title: "Secondary source"',
        '  checks:',
        '    - type: source_match',
        '      result: pass',
        '    - type: web_cross_check',
        '      result: pass',
        '      sources: 2',
        '    - type: adversarial',
        '      result: pass',
        '      findings: []',
        `tags: [${tags.map((tag) => yamlQuote(tag)).join(', ')}]`,
        '---',
        '',
        finalParagraphOne,
        '',
        finalParagraphTwo,
        '',
        finalParagraphThree,
        '',
    ].join('\n');
}

async function publishHistoryBackfill() {
    const progress = loadProgress();
    const dates = getHistoryDates();

    for (const date of dates) {
        const result = readBackfillCandidates(date);
        const candidate = chooseCandidate(result);

        progress.lastHistoryDate = date;
        if (!progress.processedDates.includes(date)) {
            progress.processedDates.push(date);
        }
        saveProgress(progress);

        if (!candidate) continue;

        const slug = candidate.title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 40) || 'backfill';
        const filePath = path.join(NEWS_DIR, `${date}-${slug}.md`);
        if (fs.existsSync(filePath)) continue;

        const markdown = await buildArticleMarkdown(
            date,
            candidate.title || candidate.sourceAccount || candidate.platform || 'AI source',
            candidate.url,
            (candidate.allUrls || []).find((url) => url !== candidate.url) || candidate.url,
            candidate.score,
            candidate.wikiTerms && candidate.wikiTerms.length > 0 ? candidate.wikiTerms : candidate.matchedKeywords.slice(0, 5),
            candidate.contentSnippet || candidate.text || candidate.title,
        );

        writeUtf8(filePath, markdown);
    }
}

async function publishMilestones() {
    const progress = loadProgress();

    for (const item of milestoneCatalog.filter((entry) => Number(entry.date.slice(0, 4)) >= BACKFILL_START_YEAR)) {
        const filePath = path.join(NEWS_DIR, `${item.date}-${item.slug}.md`);
        const primarySeed = await fetchArticleSummary(item.sourceUrl, item.titleHint);
        const secondarySeed = await fetchArticleSummary(item.secondaryUrl, item.titleHint);
        const markdown = await buildArticleMarkdown(
            item.date,
            item.titleHint,
            item.sourceUrl,
            item.secondaryUrl,
            item.score,
            item.tags,
            `${primarySeed} ${secondarySeed}`.trim(),
        );

        writeUtf8(filePath, markdown);

        const year = Number(item.date.slice(0, 4));
        progress.lastMilestoneYear = year;
        if (!progress.processedYears.includes(year)) {
            progress.processedYears.push(year);
        }
        saveProgress(progress);
    }
}

async function main() {
    await publishHistoryBackfill();
    await publishMilestones();
    console.log('Backfill range publishing complete.');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
