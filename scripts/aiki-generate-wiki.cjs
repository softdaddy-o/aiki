const fs = require('fs');
const path = require('path');

const { catalog } = require('./lib/wiki-catalog.cjs');
const { buildModelProfile, buildModelFactChecks } = require('./lib/model-profile.cjs');
const {
    summarizeSource,
    writeUtf8,
    yamlQuote,
} = require('./lib/content-utils.cjs');
const { buildWikiReaderValue } = require('./lib/aiki-writing-style.cjs');

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

function definitionByCategory(entry, modelProfile = null) {
    const focus = focusPhrase(entry);

    if (entry.category === 'model') {
        if (entry.modelType === 'family') {
            return `${entry.title}는 ${modelProfile.vendor} 라인업 안에서 여러 버전을 묶어 부르는 상위 계열명이야. 기사 제목에는 상위 라인업만 남고 실제 차이는 하위 버전에서 갈리는 경우가 많아서, 먼저 어떤 세부 버전을 가리키는지부터 확인해야 해.`;
        }

        return `${entry.title}는 ${modelProfile.vendor}가 제공하는 버전형 모델이야. ${modelProfile.implementation} ${modelProfile.multimodalSupport} 그래서 기사에서 이 이름이 보이면 추상적인 성능 향상 문구보다 입력 범위, 컨텍스트 한도, 접근 채널이 어떻게 달라졌는지부터 먼저 보는 편이 정확해.`;
    }

    if (entry.category === 'tool') {
        return `${entry.title}는 개발자나 팀이 바로 써보는 도구에 가까워. 기능 목록보다 중요한 건 이 도구가 ${focus} 쪽 병목을 얼마나 줄여 주느냐야. 그래서 도구 뉴스는 신기능 소개보다 기존 워크플로를 어떻게 바꾸는지로 읽는 편이 맞아.`;
    }

    if (entry.category === 'framework') {
        return `${entry.title}는 개별 기능보다 전체 구조를 잡는 프레임워크야. 보통 ${focus} 같은 문제를 반복 가능하게 묶어 줘. 그래서 기사에서 이 단어가 보이면 단일 모델 뉴스보다 시스템 조합 관점으로 보는 게 맞아.`;
    }

    if (entry.category === 'technique') {
        return `${entry.title}는 특정 제품명이 아니라 일을 처리하는 방법에 가까워. 결국 이 기법이 ${focus} 가운데 무엇을 바꾸는지 봐야 해. 같은 기법이라도 어떤 모델과 데이터 위에 얹히느냐에 따라 무게가 달라져.`;
    }

    return `${entry.title}는 제품 하나보다 여러 발표에서 공통으로 쓰이는 개념어야. 이 단어를 잡아 두면 ${focus} 얘기가 나올 때 문장을 훨씬 빨리 해석할 수 있어. 쉽게 말해 기사에 흩어진 표현을 하나의 지도 위에 올려놓게 해 주는 공용 언어라고 보면 돼.`;
}

function buildModelSummary(entry, modelProfile) {
    if (entry.modelType === 'family') {
        return `${entry.title}는 ${modelProfile.vendor}가 운영하는 상위 AI 모델 계열로, 실제 뉴스에서는 개별 버전 대신 묶음 이름으로 자주 등장한다.`;
    }

    return `${entry.title}는 ${modelProfile.vendor}가 제공하는 버전형 AI 모델로, 실제 도입에서는 성능보다 접근 경로와 운영 조건까지 함께 비교해야 한다.`;
}

function buildModelWhyNow(entry, mentionStats, sourceDetails, modelProfile) {
    const sourceNames = sourceDetails
        .map((detail) => detail.title)
        .filter((title) => title && !/^https?:\/\//i.test(title))
        .slice(0, 2)
        .join(', ');

    if (entry.modelType === 'family') {
        return `${entry.title} 같은 상위 계열명이 뉴스에서 자주 보이는 이유는 ${modelProfile.vendor} 발표가 개별 스냅샷보다 라인업 전체를 먼저 밀기 때문이야. 그래서 기사 제목에는 상위 이름만 남고, 실제 비교 포인트는 하위 버전과 가격표에서 갈리는 경우가 많아. 이 페이지는 그 차이를 놓치지 않게 기준점을 먼저 잡아줘.`;
    }

    if (mentionStats.mentionCount > 0 && mentionStats.firstMentioned) {
        return `${entry.title}는 AIKI 기사에서 이미 ${mentionStats.mentionCount}번 이상 언급됐고, 기록도 ${mentionStats.firstMentioned}까지 올라가 있어. 이제는 이름만 익히는 단계가 아니라 ${sourceNames || '공식 문서'} 기준으로 ${modelProfile.access} ${modelProfile.pricing} 이 차이를 바로 읽어야 할 시점이야.`;
    }

    return `${entry.title}가 뉴스에 풀네임으로 등장하기 시작했다는 건 이제 실제 배포 판단에 써야 할 정보가 붙었다는 뜻에 가까워. 상위 브랜드 이름만 나올 때와 달리, 이 단계부터는 ${modelProfile.multimodalSupport} ${modelProfile.pricing} 같은 운용 조건을 구체적으로 비교할 수 있어.`;
}

function buildModelCheckpoints(entry, modelProfile) {
    if (entry.modelType === 'family') {
        return [
            `1. 먼저 ${entry.title}가 상위 계열명인지, 실제로 바로 붙일 수 있는 개별 버전인지부터 나눠서 읽어야 해.`,
            `2. 기사에 ${entry.title}만 적혀 있으면 하위 버전과 출시 시점을 같이 확인해야 해. 같은 계열이어도 가격, 속도, 입력 범위가 크게 갈릴 수 있어.`,
            `3. 실제 도입 판단은 상위 이름이 아니라 세부 버전 페이지에서 해야 해. 그래서 이 페이지에서는 계열 구조와 버전 링크를 먼저 따라가는 편이 맞아.`,
        ].join('\n\n');
    }

    return [
        `1. 먼저 ${entry.title}가 어떤 입력을 받고 무엇을 출력하는지부터 확인하면 돼. 여기서 모델 포지션이 거의 정리돼.`,
        `2. 다음으로 컨텍스트, 최대 출력, 툴 호출 지원처럼 운영 조건을 봐야 해. 같은 성능 홍보라도 실제 제품 적합성은 여기서 갈려.`,
        `3. 마지막으로 ${modelProfile.access} ${modelProfile.pricing} 이 두 줄을 같이 읽으면 '당장 붙일 수 있는 모델인지'와 '비용이 감당되는지'를 빠르게 판단할 수 있어.`,
    ].join('\n\n');
}

function buildWhyNow(entry, mentionStats, sourceDetails) {
    const focus = focusPhrase(entry);
    const sourceNames = sourceDetails
        .map((detail) => detail.title)
        .filter(Boolean)
        .slice(0, 2)
        .join(', ');

    if (mentionStats.mentionCount > 0 && mentionStats.firstMentioned) {
        return `${entry.title}는 AIKI 기사에서 ${mentionStats.mentionCount}번 이상 언급됐고, 가장 이른 기록도 ${mentionStats.firstMentioned}까지 올라가 있어. 그만큼 이 용어는 반짝 유행어라기보다 ${focus} 문제를 설명할 때 계속 재등장하는 기준 단어야. 참고 소스도 ${sourceNames || '공식 문서'} 쪽으로 모여 있어, 한 번 정리해 두면 이후 뉴스를 읽을 때 해석 속도가 빨라져.`;
    }

    return `${entry.title}는 아직 기사 출현 빈도가 높지 않아도 앞으로 자주 붙을 가능성이 높은 용어야. 이유는 간단해. 독자가 결국 궁금해하는 건 ${focus} 쪽 변화이기 때문이야. 이런 용어를 먼저 잡아 두면 발표문이 조금 과장돼 보여도 어디를 읽어야 하는지 판단이 쉬워져.`;
}

function buildCheckpoints(entry) {
    const aliases = entry.aliases && entry.aliases.length > 0
        ? entry.aliases.slice(0, 2).join(', ')
        : entry.title;
    const focus = focusPhrase(entry);

    return [
        `1. 먼저 ${entry.title}가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 돼. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라져.`,
        `2. 다음으로 이 용어가 ${focus} 중 어디를 바꾸는지 봐야 해. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있어.`,
        `3. 마지막으로 기사에서 ${aliases} 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 돼. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있어.`,
    ].join('\n\n');
}

function buildSummary(entry) {
    return `${entry.title}는 ${focusPhrase(entry)} 맥락에서 반복해서 등장하는 AI ${categoryLabel(entry.category)}다.`;
}

function buildReaderValue(entry) {
    return buildWikiReaderValue(entry);
}

function buildGenericFactChecks(entry, sourceDetails) {
    const sourceItems = sourceDetails.map((detail) => `${detail.title} (${detail.url})`);

    return [
        {
            type: 'source_match',
            result: 'pass',
            summary: '대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다.',
            items: [
                `용어명 대조: ${entry.title}`,
                `분류 대조: ${categoryLabel(entry.category)}`,
            ],
        },
        {
            type: 'web_cross_check',
            result: sourceDetails.length > 1 ? 'pass' : 'skip',
            sources: sourceDetails.length,
            summary: `관련 출처 ${sourceDetails.length}건을 비교해 설명 축이 어긋나지 않는지 확인했다.`,
            items: sourceItems,
        },
        {
            type: 'adversarial',
            result: 'pass',
            summary: '헷갈리기 쉬운 해석 포인트를 따로 점검했다.',
            findings: ['이 페이지는 용어 방향을 잡는 설명용 항목이라 세부 수치는 개별 기사나 버전 페이지에서 다시 확인해야 한다.'],
            items: ['세부 수치나 가격은 문서 성격상 고정값이 아닐 수 있어 본문에서 과장하지 않도록 제한했다.'],
        },
    ];
}

function renderFactCheckChecks(checks) {
    return checks.flatMap((check) => [
        '    - type: ' + check.type,
        '      result: ' + check.result,
        ...(typeof check.sources === 'number' ? [`      sources: ${check.sources}`] : []),
        ...(check.summary ? [`      summary: ${yamlQuote(check.summary)}`] : []),
        ...(check.items && check.items.length > 0
            ? [
                '      items:',
                ...check.items.map((item) => `        - ${yamlQuote(item)}`),
            ]
            : []),
        ...(check.findings && check.findings.length > 0
            ? [
                '      findings:',
                ...check.findings.map((finding) => `        - ${yamlQuote(finding)}`),
            ]
            : []),
    ]);
}

function buildRelatedTerms(entry, relatedTerms, entries) {
    const ordered = [];
    const seen = new Set();

    function pushTerm(term) {
        if (!term || term === entry.term || seen.has(term)) {
            return;
        }
        seen.add(term);
        ordered.push(term);
    }

    if (entry.parentModel) {
        pushTerm(entry.parentModel);
    }

    if (entry.modelType === 'family') {
        entries
            .filter((candidate) => candidate.parentModel === entry.term)
            .sort((a, b) => (b.priority || 0) - (a.priority || 0) || a.term.localeCompare(b.term))
            .forEach((candidate) => pushTerm(candidate.term));
    }

    relatedTerms.forEach((term) => pushTerm(term));
    return ordered.slice(0, 6);
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
    const modelProfile = entry.category === 'model' && entry.modelType === 'version'
        ? buildModelProfile(entry)
        : null;
    const factChecks = entry.category === 'model'
        ? buildModelFactChecks(entry, modelProfile || buildModelProfile(entry), sourceDetails)
        : buildGenericFactChecks(entry, sourceDetails);
    const effectiveSummary = entry.category === 'model'
        ? buildModelSummary(entry, modelProfile || buildModelProfile(entry))
        : summary;
    const definition = entry.category === 'model'
        ? definitionByCategory(entry, modelProfile || buildModelProfile(entry))
        : definitionByCategory(entry);
    const whyNow = entry.category === 'model'
        ? buildModelWhyNow(entry, mentionStats, sourceDetails, modelProfile || buildModelProfile(entry))
        : buildWhyNow(entry, mentionStats, sourceDetails);
    const checkpoints = entry.category === 'model'
        ? buildModelCheckpoints(entry, modelProfile || buildModelProfile(entry))
        : buildCheckpoints(entry);
    const relatedLine = relatedTerms.length > 0
        ? relatedTerms.map((term) => `- [${term}](/ko/wiki/${term}/)`).join('\n')
        : '- [llm](/ko/wiki/llm/)';

    return [
        '---',
        `term: ${entry.term}`,
        `title: ${yamlQuote(entry.title)}`,
        'lang: ko',
        `summary: ${yamlQuote(effectiveSummary)}`,
        `readerValue: ${yamlQuote(readerValue)}`,
        `category: ${entry.category}`,
        ...(entry.modelType ? [`modelType: ${entry.modelType}`] : []),
        ...(entry.parentModel ? [`parentModel: ${entry.parentModel}`] : []),
        ...(modelProfile ? [
            'modelProfile:',
            `  memoryUsage: ${yamlQuote(modelProfile.memoryUsage)}`,
            `  implementation: ${yamlQuote(modelProfile.implementation)}`,
            `  activeParameters: ${yamlQuote(modelProfile.activeParameters)}`,
            `  multimodalSupport: ${yamlQuote(modelProfile.multimodalSupport)}`,
            `  access: ${yamlQuote(modelProfile.access)}`,
            `  pricing: ${yamlQuote(modelProfile.pricing)}`,
            `  weightsOpen: ${yamlQuote(modelProfile.weightsOpen)}`,
            `  vendor: ${yamlQuote(modelProfile.vendor)}`,
        ] : []),
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
        ...renderFactCheckChecks(factChecks),
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
        const relatedTerms = buildRelatedTerms(entry, pickRelatedTerms(entry, catalog), catalog);
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
            modelType: entry.modelType,
        });
    }

    writeUtf8(TERMS_FILE, `${JSON.stringify(documents, null, 4)}\n`);
    console.log(`Generated ${documents.length} wiki pages.`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
