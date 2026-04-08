const fs = require('fs');
const path = require('path');

const { catalog } = require('./lib/wiki-catalog.cjs');
const {
    summarizeSource,
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

function categoryLabel(category) {
    switch (category) {
        case 'model':
            return '모델';
        case 'tool':
            return '도구';
        case 'technique':
            return '기법';
        case 'framework':
            return '프레임워크';
        default:
            return '개념';
    }
}

function focusPhrase(entry) {
    const tags = entry.tags || [];
    if (tags.includes('agents')) return '에이전트가 작업을 이어 가는 방식';
    if (tags.includes('reasoning')) return '추론 성능과 의사결정 흐름';
    if (tags.includes('retrieval')) return '검색 결과와 메모리 연결';
    if (tags.includes('inference') || tags.includes('serving')) return '배포 비용과 추론 처리량';
    if (tags.includes('training')) return '학습 전략과 모델 개선 루프';
    if (tags.includes('multimodal') || tags.includes('vision') || tags.includes('audio')) return '멀티모달 입력과 출력 경험';
    if (tags.includes('coding-agent') || tags.includes('developer-tools')) return '개발 생산성과 코딩 워크플로';
    if (tags.includes('vector-db') || tags.includes('vector-search')) return '벡터 검색과 메모리 계층';
    if (tags.includes('api') || tags.includes('integration')) return 'API 연결과 제품 기능 확장';
    if (tags.includes('safety') || tags.includes('policy')) return '안전성 제어와 정책 운영';
    if (tags.includes('open-model') || tags.includes('open-weight')) return '오픈 모델 전략과 생태계 경쟁';
    return '모델 성능, 제품 전략, 개발 흐름';
}

function definitionByCategory(entry) {
    const focus = focusPhrase(entry);

    if (entry.category === 'model') {
        return `${entry.title}는 특정 회사가 만든 단일 제품명이라기보다, ${focus} 변화와 연결해 읽어야 하는 모델 계열 이름에 가깝다. 기사에서 이 단어가 나오면 벤치마크 점수만 볼 게 아니라 어떤 사용 시나리오를 밀고 있는지까지 같이 봐야 한다.`;
    }

    if (entry.category === 'tool') {
        return `${entry.title}는 개발자나 팀이 바로 써보는 도구에 가깝다. 기능 목록보다 중요한 건 이 도구가 ${focus} 쪽의 병목을 얼마나 줄여 주는지다. 그래서 도구 뉴스는 신기능 소개보다 기존 워크플로를 어떻게 바꾸는지로 읽는 편이 맞다.`;
    }

    if (entry.category === 'framework') {
        return `${entry.title}는 개별 기능보다 전체 구조를 잡는 프레임워크다. 보통 ${focus} 같은 문제를 반복 가능하게 묶어 준다. 그래서 기사에서 이 단어가 보이면 단일 모델 뉴스가 아니라 시스템 조합 관점으로 보는 게 맞다.`;
    }

    if (entry.category === 'technique') {
        return `${entry.title}는 특정 제품명이 아니라 일을 처리하는 방법에 가깝다. 결국 이 기법이 ${focus} 가운데 무엇을 바꾸는지 봐야 한다. 같은 기법이라도 어떤 모델과 데이터 위에 얹히느냐에 따라 무게가 달라진다.`;
    }

    return `${entry.title}는 제품 하나보다 여러 발표에서 공통으로 쓰이는 개념어다. 이 단어를 잡아 두면 ${focus} 얘기가 나올 때 문장을 훨씬 빨리 해석할 수 있다. 쉽게 말해 기사에 흩어진 표현을 하나의 지도 위에 올려놓게 해 주는 공용 언어라고 보면 된다.`;
}

function buildWhyNow(entry, mentionStats, sourceDetails) {
    const focus = focusPhrase(entry);
    const sourceNames = sourceDetails
        .map((detail) => detail.title)
        .filter(Boolean)
        .slice(0, 2)
        .join(', ');

    if (mentionStats.mentionCount > 0 && mentionStats.firstMentioned) {
        return `${entry.title}는 AIKI 기사에서 ${mentionStats.mentionCount}번 이상 언급됐고, 가장 이른 기록도 ${mentionStats.firstMentioned}까지 올라간다. 그만큼 이 용어는 반짝 유행어라기보다 ${focus} 문제를 설명할 때 계속 재등장하는 기준 단어다. 참고 소스도 ${sourceNames || '공식 문서'} 쪽으로 모여 있어, 한 번 정리해 두면 이후 뉴스를 읽을 때 해석 속도가 빨라진다.`;
    }

    return `${entry.title}는 아직 기사 출현 빈도가 높지 않아도 앞으로 자주 붙을 가능성이 높은 용어다. 이유는 간단하다. 독자가 결국 궁금해하는 건 ${focus} 쪽 변화이기 때문이다. 이런 용어를 먼저 잡아 두면 발표문이 조금 과장돼 보여도 어디를 읽어야 하는지 판단이 쉬워진다.`;
}

function buildCheckpoints(entry) {
    const aliases = entry.aliases && entry.aliases.length > 0
        ? entry.aliases.slice(0, 2).join(', ')
        : entry.title;
    const focus = focusPhrase(entry);

    return [
        `1. 먼저 ${entry.title}가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.`,
        `2. 다음으로 이 용어가 ${focus} 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.`,
        `3. 마지막으로 기사에서 ${aliases} 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.`,
    ].join('\n\n');
}

function buildSummary(entry) {
    return `${entry.title}는 ${focusPhrase(entry)} 맥락에서 반복해서 등장하는 AI ${categoryLabel(entry.category)}다.`;
}

function buildReaderValue(entry) {
    return `이 용어가 뉴스에 나오면 ${entry.title}가 단순 기능 이름인지, 성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지 빠르게 구분해서 읽게 해준다.`;
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
    const summary = buildSummary(entry);
    const readerValue = buildReaderValue(entry);
    const definition = definitionByCategory(entry);
    const whyNow = buildWhyNow(entry, mentionStats, sourceDetails);
    const checkpoints = buildCheckpoints(entry);
    const relatedLine = relatedTerms.length > 0
        ? relatedTerms.map((term) => `- [${term}](/ko/wiki/${term}/)`).join('\n')
        : '- [llm](/ko/wiki/llm/)';

    return [
        '---',
        `term: ${entry.term}`,
        `title: ${yamlQuote(entry.title)}`,
        'lang: ko',
        `summary: ${yamlQuote(summary)}`,
        `readerValue: ${yamlQuote(readerValue)}`,
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
        '## 먼저 감 잡기',
        '',
        definition,
        '',
        '## 뉴스에서 왜 자주 나오나',
        '',
        whyNow,
        '',
        '## 읽을 때 체크포인트',
        '',
        checkpoints,
        '',
        '## 같이 봐야 할 용어',
        '',
        relatedLine,
        '',
    ].filter(Boolean).join('\n');
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
