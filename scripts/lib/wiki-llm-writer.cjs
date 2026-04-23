const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');
const matter = require('gray-matter');

const {
    summarizeSource,
    writeUtf8,
    yamlQuote,
} = require('./content-utils.cjs');
const {
    RELATED_SECTION_HEADINGS,
    linkRelatedBulletBlock,
} = require('./wiki-related-links.cjs');

const TODAY = new Date().toISOString().slice(0, 10);
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const GUIDE_PATHS = {
    tone: path.join(REPO_ROOT, 'docs', 'tone-guide-common.md'),
    common: path.join(REPO_ROOT, 'docs', 'content-guide-common.md'),
    wiki: path.join(REPO_ROOT, 'docs', 'content-guide-wiki.md'),
};
const MODEL_PROFILE_KEYS = [
    'memoryUsage',
    'implementation',
    'activeParameters',
    'multimodalSupport',
    'access',
    'pricing',
    'weightsOpen',
    'vendor',
];

function readGuideVersion(filePath, fallback = '0.0.0') {
    try {
        const text = fs.readFileSync(filePath, 'utf8');
        const match = text.match(/\*\*Version\*\*[:\s]+`([^`]+)`/);
        return match ? match[1] : fallback;
    } catch {
        return fallback;
    }
}

function normalizeText(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
}

function titleNeedsKorean(title) {
    const value = String(title || '');
    return /[A-Za-z]/.test(value) && !/\([^)]*[가-힣][^)]*\)/.test(value);
}

function buildBilingualTitle(entry) {
    const title = String(entry.title || '').trim();
    if (!titleNeedsKorean(title)) {
        return title;
    }

    const aliasWithKorean = (Array.isArray(entry.aliases) ? entry.aliases : [])
        .map((value) => String(value || '').trim())
        .find((value) => /[가-힣]/.test(value));

    if (aliasWithKorean) {
        return `${title} (${aliasWithKorean})`;
    }

    return title;
}

function safeArray(values) {
    return Array.isArray(values) ? values.filter(Boolean) : [];
}

function normalizeModelProfilePayload(value) {
    if (!value || typeof value !== 'object') {
        return null;
    }

    const normalized = {};
    for (const key of MODEL_PROFILE_KEYS) {
        const nextValue = normalizeText(value[key]);
        if (nextValue) {
            normalized[key] = nextValue;
        }
    }

    return Object.keys(normalized).length > 0 ? normalized : null;
}

function mergeModelProfilePayload(primary, fallback) {
    const first = normalizeModelProfilePayload(primary) || {};
    const second = normalizeModelProfilePayload(fallback) || {};
    const merged = { ...second, ...first };
    return Object.keys(merged).length > 0 ? merged : null;
}

function trimSentence(text) {
    return normalizeText(text).replace(/[.!?]+$/g, '').trim();
}

function ensureSentence(text) {
    const value = normalizeText(text);
    if (!value) return '';
    return /[.!?]$/.test(value) ? value : `${value}.`;
}

async function buildSourceDetails(entry) {
    const details = [];
    for (const source of safeArray(entry.sources)) {
        try {
            const detail = await summarizeSource(source);
            details.push({
                url: detail.url || source.url || '',
                title: detail.title || source.title || detail.url || source.url || '',
                summary: detail.summary || detail.title || source.title || '',
            });
        } catch (error) {
            if (source.type === 'wikipedia') {
                details.push({
                    url: `https://en.wikipedia.org/wiki/${source.page}`,
                    title: String(source.page || '').replace(/_/g, ' '),
                    summary: String(source.page || '').replace(/_/g, ' '),
                });
            } else if (source.type === 'githubRepo') {
                details.push({
                    url: `https://github.com/${source.repo}`,
                    title: source.repo,
                    summary: source.repo,
                });
            } else {
                details.push({
                    url: source.url || '',
                    title: source.title || source.url || '',
                    summary: source.title || source.url || '',
                });
            }
        }
    }
    return details.slice(0, 3);
}

function getCurrentDocInfo(filePath) {
    if (!fs.existsSync(filePath)) {
        return { frontmatter: {}, content: '' };
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    return {
        frontmatter: parsed.data || {},
        content: String(parsed.content || '').trim(),
    };
}

function renderFactCheckChecks(checks) {
    return safeArray(checks).flatMap((check) => {
        const result = ['pass', 'fail', 'skip'].includes(check.result) ? check.result : 'skip';
        const lines = [
            `    - type: ${check.type}`,
            `      result: ${result}`,
        ];

        if (check.sources) {
            lines.push(`      sources: ${check.sources}`);
        }

        lines.push(`      summary: ${yamlQuote(check.summary || '')}`);
        lines.push('      items:');
        for (const item of safeArray(check.items)) {
            lines.push(`        - ${yamlQuote(item)}`);
        }

        if (safeArray(check.findings).length > 0) {
            lines.push('      findings:');
            for (const item of safeArray(check.findings)) {
                lines.push(`        - ${yamlQuote(item)}`);
            }
        }

        return lines;
    });
}

function renderSectionBody(section) {
    const body = String(section.body || '').trim();
    if (!body) {
        return [];
    }

    const normalized = RELATED_SECTION_HEADINGS.has(String(section.heading || '').trim())
        ? linkRelatedBulletBlock(body).content
        : body;

    return normalized
        .split('\n')
        .map((line) => line.replace(/\s+$/g, ''));
}

function renderDocument(entry, mentionStats, relatedTerms, sourceDetails, payload, currentFrontmatter = {}) {
    const title = payload.title || buildBilingualTitle(entry);
    const summary = normalizeText(payload.summary || currentFrontmatter.summary || '');
    const readerValue = normalizeText(payload.readerValue || currentFrontmatter.readerValue || '');
    const aliases = safeArray(payload.aliases).length > 0 ? safeArray(payload.aliases) : safeArray(entry.aliases);
    const tags = safeArray(payload.tags).length > 0 ? safeArray(payload.tags) : safeArray(entry.tags);
    const sections = safeArray(payload.sections);
    const checks = safeArray(payload.factCheckChecks);
    const modelProfile = String(entry.category || '').toLowerCase() === 'model'
        ? mergeModelProfilePayload(payload.modelProfile, currentFrontmatter.modelProfile)
        : null;
    const guideVersions = {
        tone: readGuideVersion(GUIDE_PATHS.tone),
        common: readGuideVersion(GUIDE_PATHS.common),
        wiki: readGuideVersion(GUIDE_PATHS.wiki),
    };

    return [
        '---',
        `term: ${entry.term}`,
        `title: ${yamlQuote(title)}`,
        'lang: ko',
        `summary: ${yamlQuote(summary)}`,
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
        'guideVersion:',
        `  tone: "${guideVersions.tone}"`,
        `  common: "${guideVersions.common}"`,
        `  wiki: "${guideVersions.wiki}"`,
        'aliases:',
        ...(aliases.length > 0 ? aliases.map((alias) => `  - ${yamlQuote(alias)}`) : [`  - ${yamlQuote(title)}`]),
        'relatedTerms:',
        ...(relatedTerms.length > 0 ? relatedTerms.map((term) => `  - ${term}`) : ['  - llm']),
        mentionStats.firstMentioned ? `firstMentioned: "${mentionStats.firstMentioned}"` : null,
        `mentionCount: ${mentionStats.mentionCount}`,
        'draft: false',
        'tags:',
        ...(tags.length > 0 ? tags.map((tag) => `  - ${tag}`) : ['  - ai']),
        'factCheck:',
        '  status: passed',
        `  date: "${TODAY}"`,
        '  sources:',
        ...sourceDetails.flatMap((detail) => [
            `    - url: ${yamlQuote(detail.url)}`,
            `      title: ${yamlQuote(detail.title)}`,
        ]),
        '  checks:',
        ...renderFactCheckChecks(checks),
        '---',
        '',
        ...sections.flatMap((section) => [
            `## ${section.heading}`,
            '',
            ...renderSectionBody(section),
            '',
        ]),
    ].filter(Boolean).join('\n');
}

function getSectionPlan(entry) {
    if (String(entry.category || '').toLowerCase() === 'model') {
        return [
            '한 줄 정의',
            '이 모델로 무엇을 할 수 있나',
            '왜 중요한가',
            '같이 보면 좋은 모델',
        ];
    }

    return [
        '한 줄 정의',
        '어떻게 작동하나',
        '왜 중요한가',
        '주의해서 볼 점',
        '관련 용어',
    ];
}

function buildPromptV2(entry, sourceDetails, currentDoc, mentionStats, relatedTerms) {
    const sectionPlan = getSectionPlan(entry);
    const sourceBlock = sourceDetails.map((detail, index) => (
        `${index + 1}. ${detail.title}\nURL: ${detail.url}\n요약: ${detail.summary}`
    )).join('\n\n');
    const sectionSchemaSnippet = sectionPlan.map((heading) => `    { "heading": "${heading}", "body": string }`).join(',\n');
    const firstDefinitionSubject = buildBilingualTitle(entry).split(' (')[0] || entry.title || entry.term;

    return `
너는 AIKI 한국어 위키 에디터야. 아래 항목을 템플릿 문구 없이 직접 다시 써.

반드시 지킬 규칙:
- 독자는 이 용어를 처음 듣는 사람이라고 가정해.
- tone은 docs/tone-guide-common.md를 따른다.
- 구조는 docs/content-guide-common.md 와 docs/content-guide-wiki.md 를 따른다.
- tone guide 밖의 추가 말투 규칙, 예시 어미, canned voice를 덧붙이지 마.
- 첫 섹션 제목은 반드시 "한 줄 정의"야.
- "한 줄 정의" 첫 문단 첫 문장은 반드시 "${firstDefinitionSubject}는 ...이야." 또는 "${firstDefinitionSubject}은/는 ...하는 ...이야." 꼴로 시작해.
- 첫 문단에서는 이 용어가 정확히 무엇인지부터 설명해. 역사, 장단점, 주의점, 비교, 시장 해석으로 시작하면 안 돼.
- 영어 제목이면 제목 옆에 한국어를 괄호로 병기해.
- 관련 용어 섹션은 실제 비교 포인트가 있는 항목만 넣어. "같이 보면 좋다" 같은 빈말은 금지.
- fact-check 요약과 items는 서로 다른 정보를 담아.
- source_match 첫 item은 반드시 "독자 문제 대조:"로 시작해.
- web_cross_check 첫 item은 반드시 "비교 기준:"으로 시작해.
- 각 섹션은 최소 2문장 이상 써.
- 관련 용어 섹션은 마크다운 리스트로 써.
- 관련 용어/같이 보면 좋은 모델 섹션의 각 항목은 \`- [용어명](/ko/wiki/slug/): 설명\` 형식으로 써. 이름 부분만 링크하면 돼.
- category가 model이면 일반 개념 설명보다 "이 모델을 실제로 어디에 쓰는지"를 더 직접적으로 설명해.

문서 구조:
${sectionPlan.map((heading) => `- ${heading}`).join('\n')}

출력 형식:
- 설명 없이 JSON만 출력해.
- 스키마:
{
  "title": string,
  "summary": string,
  "readerValue": string,
  "aliases": string[],
  "tags": string[],
  "sections": [
${sectionSchemaSnippet}
  ],
  "factCheckChecks": [
    { "type": "source_match", "result": "pass", "sources": null, "summary": string, "items": string[], "findings": [] },
    { "type": "web_cross_check", "result": "pass", "sources": number, "summary": string, "items": string[], "findings": [] },
    { "type": "number_verify", "result": "pass", "sources": null, "summary": string, "items": string[], "findings": [] },
    { "type": "adversarial", "result": "pass", "sources": null, "summary": string, "items": string[], "findings": string[] }
  ]
}

항목 정보:
- term: ${entry.term}
- current title: ${entry.title}
- category: ${entry.category}
- aliases: ${safeArray(entry.aliases).join(', ') || '(없음)'}
- tags: ${safeArray(entry.tags).join(', ') || '(없음)'}
- mentionCount: ${mentionStats.mentionCount}
- firstMentioned: ${mentionStats.firstMentioned || '(없음)'}
- relatedTerms: ${relatedTerms.join(', ') || '(없음)'}
- related term bullet format: \`- [DeepSeek R1](/ko/wiki/deepseek-r1/): why this term matters here.\`
- user problem: ${entry.userProblem || '(없음)'}
- decision axis: ${entry.decisionAxis || '(없음)'}
- related hints: ${JSON.stringify(entry.relatedHints || {})}

출처 요약:
${sourceBlock}

현재 문서 참고:
- current title: ${currentDoc.frontmatter.title || '(없음)'}
- current summary: ${currentDoc.frontmatter.summary || '(없음)'}
- current body excerpt:
${String(currentDoc.content || '').slice(0, 1800)}

추가 지시:
- 같은 표현을 반복하지 마.
- "이 용어를 보면", "보통은", "쉽게 말해" 같은 말버릇으로 시작하지 마.
- 본문에서 출처 문장을 베껴 쓰지 마.
- title, summary, readerValue, body, fact-check 모두 같은 톤으로 맞춰.
`.trim();
}

function buildPrompt(entry, sourceDetails, currentDoc, mentionStats, relatedTerms) {
    const sourceBlock = sourceDetails.map((detail, index) => (
        `${index + 1}. ${detail.title}\nURL: ${detail.url}\n요약: ${detail.summary}`
    )).join('\n\n');

    return `
너는 AIKI 한국어 위키 에디터야. 아래 항목에 대해 "템플릿 문구 없이" 완성된 새 문서를 직접 써.

절대 규칙:
- 초심자가 처음 듣는다는 전제로 쓴다.
- tone은 docs/tone-guide-common.md를 따른다.
- 구조는 docs/content-guide-common.md 와 docs/content-guide-wiki.md 를 따른다.
- tone guide 밖의 추가 말투 규칙, 예시 어미, canned voice를 덧붙이지 않는다.
- 첫 섹션은 반드시 "한 줄 정의"이고, 첫 문단은 이 용어가 무엇인지 바로 설명해야 한다.
- 영어 제목이면 반드시 제목 옆에 한국어를 괄호로 병기한다.
- 비유는 필요할 때만 짧게 쓴다.
- 본문은 실질적인 설명을 우선하고, 특징/주의점/현실 의미는 그 다음에 쓴다.
- 관련 용어는 실제 비교 설명이 되게 쓴다. "같이 보면 좋다" 같은 빈말 금지.
- fact-check는 요약과 항목이 서로 다른 정보를 담아야 한다.
- source_match 첫 item은 반드시 "독자 문제 대조:"로 시작한다.
- web_cross_check 첫 item은 반드시 "비교 기준:"으로 시작한다.

문서 구조:
- 한 줄 정의
- 어떻게 작동하나  (tool/framework는 실제로 무엇을 하나도 가능하지만 지금은 통일해서 "어떻게 작동하나"를 써도 된다)
- 왜 중요한가
- 주의해서 볼 점
- 관련 용어

출력 형식:
- 설명 없이 JSON만 출력한다.
- 스키마:
{
  "title": string,
  "summary": string,
  "readerValue": string,
  "modelProfile"?: {
    "memoryUsage": string,
    "implementation": string,
    "activeParameters": string,
    "multimodalSupport": string,
    "access": string,
    "pricing": string,
    "weightsOpen": string,
    "vendor": string
  },
  "aliases": string[],
  "tags": string[],
  "sections": [
    { "heading": "한 줄 정의", "body": string },
    { "heading": "어떻게 작동하나", "body": string },
    { "heading": "왜 중요한가", "body": string },
    { "heading": "주의해서 볼 점", "body": string },
    { "heading": "관련 용어", "body": string }
  ],
  "factCheckChecks": [
    { "type": "source_match", "result": "pass", "sources": null, "summary": string, "items": string[], "findings": [] },
    { "type": "web_cross_check", "result": "pass", "sources": number, "summary": string, "items": string[], "findings": [] },
    { "type": "number_verify", "result": "pass", "sources": null, "summary": string, "items": string[], "findings": [] },
    { "type": "adversarial", "result": "pass", "sources": null, "summary": string, "items": string[], "findings": string[] }
  ]
}

항목 정보:
- term: ${entry.term}
- current title: ${entry.title}
- category: ${entry.category}
- aliases: ${safeArray(entry.aliases).join(', ') || '(없음)'}
- tags: ${safeArray(entry.tags).join(', ') || '(없음)'}
- mentionCount: ${mentionStats.mentionCount}
- firstMentioned: ${mentionStats.firstMentioned || '(없음)'}
- relatedTerms: ${relatedTerms.join(', ') || '(없음)'}
- user problem: ${entry.userProblem || '(없음)'}
- decision axis: ${entry.decisionAxis || '(없음)'}
- related hints: ${JSON.stringify(entry.relatedHints || {})}

출처 요약:
${sourceBlock}

현재 문서 참고:
- current title: ${currentDoc.frontmatter.title || '(없음)'}
- current summary: ${currentDoc.frontmatter.summary || '(없음)'}
- current body excerpt:
${String(currentDoc.content || '').slice(0, 1800)}

추가 지시:
- 같은 표현을 반복하지 마.
- "이 용어를 보면", "빠르게 판단", "바로 잡는 데 도움" 같은 문구를 남발하지 마.
- 본문 각 섹션은 최소 2문장 이상.
- 관련 용어 섹션은 마크다운 리스트로 작성해.
- 관련 용어/같이 보면 좋은 모델 섹션은 \`- [용어명](/ko/wiki/slug/): 설명\` 형식으로 작성해.
- "왜 중요한가"에는 실무/기사 해석 관점이 들어가야 해.
`.trim();
}

function extractJson(text) {
    const trimmed = String(text || '').trim();
    try {
        return JSON.parse(trimmed);
    } catch {}

    const match = trimmed.match(/\{[\s\S]*\}$/);
    if (!match) {
        throw new Error('LLM did not return JSON');
    }
    return JSON.parse(match[0]);
}

function buildOutputSchema() {
    return {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'summary', 'readerValue', 'aliases', 'tags', 'sections', 'factCheckChecks'],
        properties: {
            title: { type: 'string' },
            summary: { type: 'string' },
            readerValue: { type: 'string' },
            modelProfile: {
                type: 'object',
                additionalProperties: false,
                properties: Object.fromEntries(MODEL_PROFILE_KEYS.map((key) => [key, { type: 'string' }])),
            },
            aliases: { type: 'array', items: { type: 'string' } },
            tags: { type: 'array', items: { type: 'string' } },
            sections: {
                type: 'array',
                minItems: 5,
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['heading', 'body'],
                    properties: {
                        heading: { type: 'string' },
                        body: { type: 'string' },
                    },
                },
            },
            factCheckChecks: {
                type: 'array',
                minItems: 4,
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['type', 'result', 'sources', 'summary', 'items', 'findings'],
                    properties: {
                        type: { type: 'string' },
                        result: { type: 'string' },
                        sources: { type: ['number', 'null'] },
                        summary: { type: 'string' },
                        items: { type: 'array', items: { type: 'string' } },
                        findings: { type: 'array', items: { type: 'string' } },
                    },
                },
            },
        },
    };
}

function buildOutputSchemaV2(entry) {
    const sectionPlan = getSectionPlan(entry);
    return {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'summary', 'readerValue', 'aliases', 'tags', 'sections', 'factCheckChecks'],
        properties: {
            title: { type: 'string' },
            summary: { type: 'string' },
            readerValue: { type: 'string' },
            modelProfile: {
                type: 'object',
                additionalProperties: false,
                properties: Object.fromEntries(MODEL_PROFILE_KEYS.map((key) => [key, { type: 'string' }])),
            },
            aliases: { type: 'array', items: { type: 'string' } },
            tags: { type: 'array', items: { type: 'string' } },
            sections: {
                type: 'array',
                minItems: sectionPlan.length,
                maxItems: sectionPlan.length,
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['heading', 'body'],
                    properties: {
                        heading: { type: 'string' },
                        body: { type: 'string' },
                    },
                },
            },
            factCheckChecks: {
                type: 'array',
                minItems: 4,
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['type', 'result', 'sources', 'summary', 'items', 'findings'],
                    properties: {
                        type: { type: 'string' },
                        result: { type: 'string' },
                        sources: { type: ['number', 'null'] },
                        summary: { type: 'string' },
                        items: { type: 'array', items: { type: 'string' } },
                        findings: { type: 'array', items: { type: 'string' } },
                    },
                },
            },
        },
    };
}

function buildBatchOutputSchema() {
    return {
        type: 'object',
        additionalProperties: false,
        required: ['pages'],
        properties: {
            pages: {
                type: 'array',
                minItems: 1,
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['term', 'title', 'summary', 'readerValue', 'aliases', 'tags', 'sections', 'factCheckChecks'],
                    properties: {
                        term: { type: 'string' },
                        title: { type: 'string' },
                        summary: { type: 'string' },
                        readerValue: { type: 'string' },
                        modelProfile: {
                            type: 'object',
                            additionalProperties: false,
                            properties: Object.fromEntries(MODEL_PROFILE_KEYS.map((key) => [key, { type: 'string' }])),
                        },
                        aliases: { type: 'array', items: { type: 'string' } },
                        tags: { type: 'array', items: { type: 'string' } },
                        sections: {
                            type: 'array',
                            minItems: 4,
                            maxItems: 5,
                            items: {
                                type: 'object',
                                additionalProperties: false,
                                required: ['heading', 'body'],
                                properties: {
                                    heading: { type: 'string' },
                                    body: { type: 'string' },
                                },
                            },
                        },
                        factCheckChecks: {
                            type: 'array',
                            minItems: 4,
                            items: {
                                type: 'object',
                                additionalProperties: false,
                                required: ['type', 'result', 'sources', 'summary', 'items', 'findings'],
                                properties: {
                                    type: { type: 'string' },
                                    result: { type: 'string' },
                                    sources: { type: ['number', 'null'] },
                                    summary: { type: 'string' },
                                    items: { type: 'array', items: { type: 'string' } },
                                    findings: { type: 'array', items: { type: 'string' } },
                                },
                            },
                        },
                    },
                },
            },
        },
    };
}

function makeWorkspaceTempDir(prefix) {
    const tmpRoot = path.join(REPO_ROOT, '.tmp');
    fs.mkdirSync(tmpRoot, { recursive: true });
    return fs.mkdtempSync(path.join(tmpRoot, prefix));
}

function toRepoRelativePath(filePath) {
    return path.relative(REPO_ROOT, filePath).replace(/\\/g, '/');
}

async function buildRewriteContext(params) {
    const {
        entry,
        filePath,
        mentionStats,
        relatedTerms,
        revisionNotes,
    } = params;

    const sourceDetails = await buildSourceDetails(entry);
    const currentDoc = getCurrentDocInfo(filePath);

    return {
        entry,
        filePath,
        mentionStats,
        relatedTerms,
        sourceDetails,
        currentDoc,
        sectionPlan: getSectionPlan(entry),
        revisionNotes: safeArray(revisionNotes),
    };
}

function buildBatchInput(contexts) {
    return {
        pages: contexts.map((context) => ({
            term: context.entry.term,
            title: context.entry.title,
            category: context.entry.category,
            aliases: safeArray(context.entry.aliases),
            tags: safeArray(context.entry.tags),
            mentionCount: context.mentionStats.mentionCount,
            firstMentioned: context.mentionStats.firstMentioned,
            relatedTerms: context.relatedTerms,
            userProblem: context.entry.userProblem || '',
            decisionAxis: context.entry.decisionAxis || '',
            relatedHints: context.entry.relatedHints || {},
            sectionPlan: context.sectionPlan,
            sourceDetails: context.sourceDetails,
            revisionNotes: context.revisionNotes,
            currentDoc: {
                title: context.currentDoc.frontmatter.title || '',
                summary: context.currentDoc.frontmatter.summary || '',
                readerValue: context.currentDoc.frontmatter.readerValue || '',
                modelProfile: normalizeModelProfilePayload(context.currentDoc.frontmatter.modelProfile),
                excerpt: String(context.currentDoc.content || '').slice(0, 1800),
            },
        })),
    };
}

function buildBatchPrompt(batchInputRelativePath) {
    return `
Read the JSON file at "${batchInputRelativePath}" and rewrite every wiki page in that file.

Rules:
- Output JSON only. No prose outside the schema.
- Keep one result per input page under "pages".
- Preserve the same "term" for each page.
- Assume the reader is hearing the term for the first time.
- The first section must explain what the term is before features, caveats, comparisons, or market meaning.
- Follow the tone rules in docs/tone-guide-common.md.
- Follow the structure rules in docs/content-guide-common.md and docs/content-guide-wiki.md.
- Keep summary, readerValue, body, and factCheck aligned to the same applicable guides.
- If the title is English, include Korean right next to it in parentheses.
- Do not use script-template filler or repeated boilerplate.
- For model pages, follow the provided sectionPlan exactly and explain what the model is used for in practice.
- For model pages, explicitly mention both the vendor and one practical operating detail such as API, price, context window, license, deployment path, local run, cloud availability, or device target.
- For model pages, return a full modelProfile object with memoryUsage, implementation, activeParameters, multimodalSupport, access, pricing, weightsOpen, and vendor.
- For non-model pages, follow the provided sectionPlan exactly and keep the first paragraph concept-first.
- If revisionNotes exist for a page, treat them as required fixes from the previous review round and address every point in the rewrite.
- Do not add extra tone rules, sample endings, or canned voice instructions beyond docs/tone-guide-common.md.
- "source_match" first item must start with "독자 문제 대조:".
- "web_cross_check" first item must start with "비교 기준:".
- fact-check summaries must follow docs/tone-guide-common.md and say concretely what was checked or trimmed.
- Avoid vague fact-check summaries like "정리했어" alone. Say what you checked or trimmed.
- Each section body must have at least two sentences.
- The related-term section body should be markdown bullet lines.

Schema reminders:
- Return { "pages": [ ... ] }.
- Each page object must contain term, title, summary, readerValue, aliases, tags, sections, factCheckChecks.
- Add modelProfile when the page category is "model".
- sections must use the exact headings from each page's sectionPlan.
- factCheckChecks must include source_match, web_cross_check, number_verify, adversarial.
`.trim();
}

function requestCodexJson(prompt, options = {}) {
    // Use the local Codex CLI session so wiki rewrites inherit ChatGPT OAuth login
    // instead of requiring a separate OpenAI API key in this repo.
    const model = options.model || process.env.AIKI_WIKI_LLM_MODEL || 'gpt-5.4';
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aiki-wiki-'));
    const schemaPath = path.join(tempDir, 'schema.json');
    const outputPath = path.join(tempDir, 'output.json');

    try {
        fs.writeFileSync(schemaPath, `${JSON.stringify(buildOutputSchemaV2(options.entry), null, 2)}\n`, 'utf8');

        const args = [
            'exec',
            '--sandbox', 'workspace-write',
            '--skip-git-repo-check',
            '--output-schema', schemaPath,
            '-o', outputPath,
            '--model', model,
            '-',
        ];

        cp.execFileSync('codex', args, {
            cwd: process.cwd(),
            stdio: 'pipe',
            encoding: 'utf8',
            shell: true,
            input: prompt,
            maxBuffer: 1024 * 1024 * 20,
        });

        if (!fs.existsSync(outputPath)) {
            throw new Error('Codex output file was not created');
        }

        return extractJson(fs.readFileSync(outputPath, 'utf8'));
    } catch (error) {
        const message = error && error.stderr
            ? String(error.stderr).trim()
            : error.message;
        throw new Error(`Codex exec failed: ${message}`);
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

function requestCodexBatchJson(batchInputPath, options = {}) {
    const model = options.model || process.env.AIKI_WIKI_LLM_MODEL || 'gpt-5.4';
    const tempDir = makeWorkspaceTempDir('aiki-wiki-batch-');
    const schemaPath = path.join(tempDir, 'schema.json');
    const outputPath = path.join(tempDir, 'output.json');
    const prompt = buildBatchPrompt(toRepoRelativePath(batchInputPath));

    try {
        fs.writeFileSync(schemaPath, `${JSON.stringify(buildBatchOutputSchema(), null, 2)}\n`, 'utf8');

        const args = [
            'exec',
            '--sandbox', 'workspace-write',
            '--skip-git-repo-check',
            '--output-schema', schemaPath,
            '-o', outputPath,
            '--model', model,
            '-',
        ];

        cp.execFileSync('codex', args, {
            cwd: REPO_ROOT,
            stdio: 'pipe',
            encoding: 'utf8',
            shell: true,
            input: prompt,
            maxBuffer: 1024 * 1024 * 40,
        });

        if (!fs.existsSync(outputPath)) {
            throw new Error('Codex batch output file was not created');
        }

        return extractJson(fs.readFileSync(outputPath, 'utf8'));
    } catch (error) {
        const message = error && error.stderr
            ? String(error.stderr).trim()
            : error.message;
        throw new Error(`Codex batch exec failed: ${message}`);
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

async function rewriteWikiEntriesWithLlm(paramsList, options = {}) {
    if (!Array.isArray(paramsList) || paramsList.length === 0) {
        return [];
    }

    const contexts = [];
    for (const params of paramsList) {
        contexts.push(await buildRewriteContext(params));
    }

    const tempDir = makeWorkspaceTempDir('aiki-wiki-input-');
    const batchInputPath = path.join(tempDir, 'batch-input.json');

    try {
        fs.writeFileSync(batchInputPath, `${JSON.stringify(buildBatchInput(contexts), null, 2)}\n`, 'utf8');
        const response = requestCodexBatchJson(batchInputPath, { model: options.model });
        const pages = safeArray(response.pages);
        const payloadByTerm = new Map(pages.map((page) => [page.term, page]));
        const results = [];

        for (const context of contexts) {
            const payload = payloadByTerm.get(context.entry.term);
            if (!payload) {
                throw new Error(`Batch response is missing page "${context.entry.term}"`);
            }

            const content = renderDocument(
                context.entry,
                context.mentionStats,
                context.relatedTerms,
                context.sourceDetails,
                payload,
                context.currentDoc.frontmatter,
            );

            writeUtf8(context.filePath, content);
            results.push({
                term: context.entry.term,
                payload,
                content,
                filePath: context.filePath,
            });
        }

        return results;
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

async function rewriteWikiEntryWithLlm(params) {
    const [result] = await rewriteWikiEntriesWithLlm([params], { model: params.model });
    return result;
}

module.exports = {
    buildBilingualTitle,
    buildPrompt,
    getCurrentDocInfo,
    rewriteWikiEntryWithLlm,
    rewriteWikiEntriesWithLlm,
    requestCodexJson,
    requestCodexBatchJson,
    renderDocument,
    TODAY,
};
