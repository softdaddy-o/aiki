const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const {
    summarizeSource,
    writeUtf8,
    yamlQuote,
} = require('./content-utils.cjs');
const {
    buildWikiReaderValue,
    rewriteAikiTone,
    rewriteFactCheckTone,
} = require('./aiki-writing-style.cjs');

const TODAY = new Date().toISOString().slice(0, 10);

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
        const lines = [
            `    - type: ${check.type}`,
            `      result: ${check.result || 'pass'}`,
        ];

        if (check.sources) {
            lines.push(`      sources: ${check.sources}`);
        }

        lines.push(`      summary: ${yamlQuote(rewriteFactCheckTone(check.summary || ''))}`);
        lines.push('      items:');
        for (const item of safeArray(check.items)) {
            lines.push(`        - ${yamlQuote(rewriteFactCheckTone(item))}`);
        }

        if (safeArray(check.findings).length > 0) {
            lines.push('      findings:');
            for (const item of safeArray(check.findings)) {
                lines.push(`        - ${yamlQuote(rewriteFactCheckTone(item))}`);
            }
        }

        return lines;
    });
}

function renderDocument(entry, mentionStats, relatedTerms, sourceDetails, payload) {
    const title = payload.title || buildBilingualTitle(entry);
    const summary = rewriteAikiTone(payload.summary || '');
    const readerValue = rewriteAikiTone(payload.readerValue || buildWikiReaderValue(entry));
    const aliases = safeArray(payload.aliases).length > 0 ? safeArray(payload.aliases) : safeArray(entry.aliases);
    const tags = safeArray(payload.tags).length > 0 ? safeArray(payload.tags) : safeArray(entry.tags);
    const sections = safeArray(payload.sections);
    const checks = safeArray(payload.factCheckChecks);

    return [
        '---',
        `term: ${entry.term}`,
        `title: ${yamlQuote(title)}`,
        'lang: ko',
        `summary: ${yamlQuote(summary)}`,
        `readerValue: ${yamlQuote(readerValue)}`,
        `category: ${entry.category}`,
        'guideVersion:',
        '  common: "1.0.0"',
        '  wiki: "2.0.0"',
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
            ...String(section.body || '')
                .trim()
                .split('\n')
                .map((line) => line.replace(/\s+$/g, '')),
            '',
        ]),
    ].filter(Boolean).join('\n');
}

function buildPrompt(entry, sourceDetails, currentDoc, mentionStats, relatedTerms) {
    const sourceBlock = sourceDetails.map((detail, index) => (
        `${index + 1}. ${detail.title}\nURL: ${detail.url}\n요약: ${detail.summary}`
    )).join('\n\n');

    return `
너는 AIKI 한국어 위키 에디터야. 아래 항목에 대해 "템플릿 문구 없이" 완성된 새 문서를 직접 써.

절대 규칙:
- 초심자가 처음 듣는다는 전제로 쓴다.
- 첫 섹션은 반드시 "한 줄 정의"이고, 첫 문단은 이 용어가 무엇인지 바로 설명해야 한다.
- 스크립트 냄새 나는 상투 문구, 반복 문구, 분류 놀음, 발표문 말투를 쓰지 않는다.
- 존칭 금지. 모두 반말 톤으로 쓴다. 예: "맞춰봤어", "중요해", "볼 수 있어".
- 영어 제목이면 반드시 제목 옆에 한국어를 괄호로 병기한다.
- 비유는 필요할 때만 짧게 쓴다.
- 본문은 실질적인 설명을 우선하고, 특징/주의점/현실 의미는 그 다음에 쓴다.
- 관련 용어는 실제 비교 설명이 되게 쓴다. "같이 보면 좋다" 같은 빈말 금지.
- fact-check는 요약과 항목이 서로 다른 정보를 담아야 한다.
- source_match 첫 item은 반드시 "독자 문제 대조:"로 시작한다.
- web_cross_check 첫 item은 반드시 "비교 기준:"으로 시작한다.
- fact-check summary는 모두 "~맞춰봤어 / ~다시 봤어 / ~한 번 더 봤어" 톤으로 쓴다.

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
    { "type": "source_match", "result": "pass", "summary": string, "items": string[] },
    { "type": "web_cross_check", "result": "pass", "sources": number, "summary": string, "items": string[] },
    { "type": "number_verify", "result": "pass", "summary": string, "items": string[] },
    { "type": "adversarial", "result": "pass", "summary": string, "items": string[], "findings": string[] }
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
- reader focus: ${buildWikiReaderValue(entry)}

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

async function requestOpenAIJson(prompt, options = {}) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not set');
    }

    const model = options.model || process.env.AIKI_WIKI_LLM_MODEL || 'gpt-5.4';
    const temperature = options.temperature ?? 0.4;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model,
            temperature,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: '너는 AIKI 한국어 위키 편집자다. 응답은 반드시 JSON 한 개만 출력한다.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`OpenAI request failed (${response.status}): ${body}`);
    }

    const json = await response.json();
    const text = json?.choices?.[0]?.message?.content;
    if (!text) {
        throw new Error('OpenAI response did not contain message content');
    }

    return extractJson(text);
}

async function rewriteWikiEntryWithLlm(params) {
    const {
        entry,
        filePath,
        mentionStats,
        relatedTerms,
        model,
    } = params;

    const sourceDetails = await buildSourceDetails(entry);
    const currentDoc = getCurrentDocInfo(filePath);
    const prompt = buildPrompt(entry, sourceDetails, currentDoc, mentionStats, relatedTerms);
    const payload = await requestOpenAIJson(prompt, { model });
    const content = renderDocument(entry, mentionStats, relatedTerms, sourceDetails, payload);
    writeUtf8(filePath, content);
    return { payload, content };
}

module.exports = {
    buildBilingualTitle,
    buildPrompt,
    getCurrentDocInfo,
    rewriteWikiEntryWithLlm,
    requestOpenAIJson,
    renderDocument,
    TODAY,
};
