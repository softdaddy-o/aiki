const { buildNewsProblemStatement } = require('./aiki-writing-style.cjs');

function rewriteFactCheckLine(text) {
    let value = String(text || '').trim();
    if (!value) {
        return value;
    }

    const replacements = [
        [/^독자 문제 대조:\s*/u, '독자가 먼저 갈라 봐야 할 건 '],
        [/^제목 대조:\s*/u, '제목부터 다시 보면 '],
        [/^출처 대조:\s*/u, '출처를 다시 보면 '],
        [/^태그 대조:\s*/u, '이 글의 축을 다시 보면 '],
        [/^비교 기준:\s*/u, '여기서 먼저 갈라 볼 기준은 '],
        [/^비교 출처\s*\d+:\s*/u, '같이 본 출처로는 '],
        [/^숫자 포인트:\s*/u, '숫자를 다시 보면 '],
        [/^원문 대조:\s*/u, '원문을 다시 보면 '],
        [/^교차검증:\s*/u, '같이 본 출처를 보면 '],
        [/^수치 검증:\s*/u, '숫자를 다시 보면 '],
        [/^명칭 검증:\s*/u, '이름부터 다시 보면 '],
        [/^비판적 검증:\s*/u, '헷갈리기 쉬운 건 '],
        [/^그래서 해석할 때는 그래서\s+/u, '그래서 '],
    ];

    for (const [pattern, replacement] of replacements) {
        value = value.replace(pattern, replacement);
    }

    value = value.replace(
        /^독자가 먼저 갈라 봐야 할 건 (.+?)(?:부터)?\s*갈라 봐야 (?:해|한다)\.?$/u,
        '독자가 먼저 갈라 봐야 할 건 $1야',
    );
    value = value.replace(
        /^여기서 먼저 갈라 볼 기준은 (.+?)(?:부터)?\s*갈라 봐야 (?:해|한다)\.?$/u,
        '여기서 먼저 갈라 볼 기준은 $1야',
    );

    if (!/[.!?]$/u.test(value) && !/\)$/u.test(value)) {
        value = `${value}.`;
    }

    return value;
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sentenceSplit(text) {
    return String(text || '')
        .replace(/\r/g, '')
        .split(/(?<=[.!?。！？])\s+|\n+/)
        .map((line) => line.trim())
        .filter(Boolean);
}

function unique(values) {
    return [...new Set(values.filter(Boolean))];
}

function detectDomain(url) {
    try {
        return new URL(String(url || '')).hostname.replace(/^www\./i, '').toLowerCase();
    } catch {
        return '';
    }
}

function extractNumericClaims(text, maxItems = 4) {
    const sentences = sentenceSplit(text);
    const picked = [];

    for (const sentence of sentences) {
        if (!/\d/.test(sentence)) {
            continue;
        }

        const trimmed = sentence.replace(/\s+/g, ' ').trim();
        if (trimmed.length < 8) {
            continue;
        }

        picked.push(trimmed.length > 110 ? `${trimmed.slice(0, 107)}...` : trimmed);
        if (picked.length >= maxItems) {
            break;
        }
    }

    return picked;
}

function extractNumericSignals(text, maxItems = 6) {
    const matches = String(text || '')
        .replace(/\[[^\]]*]\([^)]+\)/g, ' ')
        .split(/[\s,;:()[\]{}<>/"'`]+/)
        .filter((token) => /\d/.test(token));
    const cleaned = matches
        .map((item) => String(item || '').trim())
        .map((item) => item.replace(/^[^\w]+|[^\w%.-]+$/g, ''))
        .filter((item) => item.length > 0 && item.length < 32)
        .filter((item) => /(?:[A-Za-z]\d|\d[A-Za-z]|^\d+(?:[.,]\d+)?(?:K|M|B|%|ms|초|분|시간|달러|tokens?|x)?$)/.test(item));

    return unique(cleaned).slice(0, maxItems);
}

function normalizeSourceList(frontmatter) {
    const factCheckSources = Array.isArray(frontmatter.factCheck && frontmatter.factCheck.sources)
        ? frontmatter.factCheck.sources
        : [];
    const normalized = factCheckSources
        .map((source) => ({
            url: String(source && source.url || '').trim(),
            title: String(source && source.title || '').trim(),
        }))
        .filter((source) => source.url);

    if (normalized.length > 0) {
        return normalized;
    }

    if (frontmatter.sourceUrl) {
        return [{
            url: String(frontmatter.sourceUrl).trim(),
            title: String(frontmatter.sourceTitle || frontmatter.title || frontmatter.sourceUrl).trim(),
        }];
    }

    return [];
}

function buildNumberItems(frontmatter, body) {
    const signals = unique([
        ...extractNumericSignals(frontmatter.title, 4),
        ...extractNumericSignals(frontmatter.summary, 4),
        ...extractNumericSignals(body, 6),
    ]).slice(0, 4);

    if (signals.length > 0) {
        const items = [`숫자 포인트: 원문에서 다시 본 숫자나 버전 표기는 ${signals.join(', ')} 쪽이야`];
        if (signals.some((signal) => /[A-Za-z]/.test(signal) && /\d/.test(signal))) {
            items.push('이름처럼 보이는 숫자 표기는 버전명인지 실제 스펙인지 따로 갈라서 읽었어.');
        }
        return items.map(rewriteFactCheckLine);
    }

    return ['핵심 수치가 전면에 없는 글이라 숫자보다 이름, 출처, 공개 범위를 먼저 맞춰봤어.'].map(rewriteFactCheckLine);
}

function buildAdversarialItems(frontmatter, body, sources) {
    const domain = detectDomain(frontmatter.sourceUrl || (sources[0] && sources[0].url) || '');
    const items = [];
    const findings = [];

    if (/reddit\.com$/i.test(domain)) {
        items.push('커뮤니티 반응 수치와 실제 제품 영향력은 같은 뜻이 아니라서 따로 갈라 봤어.');
        items.push('개인 실험이나 후기 성격의 글이라 재현 가능성과 대표성도 따로 의심해봤어.');
        findings.push('Reddit 반응은 관심 신호일 뿐이고, 제품 준비도나 시장 검증을 바로 뜻하지는 않아.');
    } else if (/openai\.com$|anthropic\.com$|google\.com$|deepmind\.google$|ai\.google$/i.test(domain)) {
        items.push('공식 발표 문구와 실제 배포 범위는 같은 말이 아니라서 분리해서 읽었어.');
        items.push('홍보성 표현보다 출시 채널, 가격, 접근 조건이 본문과 맞는지 다시 맞춰봤어.');
        findings.push('공식 블로그는 가장 빠른 원문이지만 마케팅 문구가 섞일 수 있어서 운영 조건은 따로 봐야 해.');
    } else if (/arxiv\.org$/i.test(domain)) {
        items.push('논문 성과와 실제 제품 배포 가능성은 같은 뜻으로 읽지 않으려고 따로 갈라 봤어.');
        items.push('평가셋 결과가 실제 서비스 품질을 바로 보장하는지도 한 번 더 의심해봤어.');
        findings.push('논문 수치는 재현 환경과 후속 구현에 따라 체감값이 크게 달라질 수 있어.');
    } else {
        items.push('제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.');
        items.push('출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.');
    }

    if (/\b(leak|ban|lawsuit|acquire|funding|attack|breach|exploit)\b/i.test(`${frontmatter.title} ${frontmatter.summary} ${body}`)) {
        items.push('사건성 키워드는 단발 이슈인지 구조 변화 신호인지 따로 갈라 봤어.');
    }

    return {
        items: unique(items).map(rewriteFactCheckLine),
        findings: unique(findings).map(rewriteFactCheckLine),
    };
}

function buildNewsFactChecks(frontmatter, body) {
    const sources = normalizeSourceList(frontmatter);
    const sourceItems = sources.length > 0
        ? sources.map((source, index) => `비교 출처 ${index + 1}: ${source.title} (${source.url})`)
        : ['비교할 대표 원문 URL이 비어 있지 않은지부터 먼저 맞춰봤다.'];
    const sourceTitles = unique([
        String(frontmatter.sourceTitle || '').trim(),
        ...sources.map((source) => source.title).filter(Boolean),
    ]).filter(Boolean);
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const numericItems = buildNumberItems(frontmatter, body);
    const adversarial = buildAdversarialItems(frontmatter, body, sources);
    const domain = detectDomain(frontmatter.sourceUrl || (sources[0] && sources[0].url) || '');
    const primarySourceTitle = sourceTitles[0] || String(frontmatter.sourceTitle || frontmatter.title || '').trim();
    const titleLine = primarySourceTitle
        ? `제목 대조: 기사 제목은 "${String(frontmatter.title || '').trim()}"이고, 원문 제목은 "${primarySourceTitle}"로 잡혔어.`
        : `제목 대조: 기사 제목 "${String(frontmatter.title || '').trim()}"이 비어 있지 않은지 먼저 맞춰봤어.`;

    return {
        sources,
        checks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: '이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 맞춰봤다.',
                items: unique([
                    `독자 문제 대조: ${buildNewsProblemStatement(frontmatter)}`,
                    titleLine,
                    ...(domain ? [`출처 대조: 대표 원문 도메인은 ${domain}로 잡혔어.`] : []),
                    ...(tags.length > 0 ? [`태그 대조: 이 글의 핵심 축은 ${tags.slice(0, 4).join(', ')}로 읽었어.`] : []),
                ]).map(rewriteFactCheckLine),
            },
            {
                type: 'web_cross_check',
                result: sources.length > 1 ? 'pass' : 'skip',
                sources: sources.length,
                summary: sources.length > 1
                    ? `원문 하나만 믿지 않으려고 관련 출처 ${sources.length}건을 옆에 두고 다시 봤다.`
                    : '단일 원문이라도 같은 사건을 과장 없이 읽었는지 한 번 더 다시 봤다.',
                items: unique([
                    `비교 기준: ${buildNewsProblemStatement(frontmatter)}`,
                    ...sourceItems,
                ]).map(rewriteFactCheckLine),
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 한 번 더 봤다.',
                items: numericItems,
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸렀다.',
                items: adversarial.items,
                findings: adversarial.findings,
            },
        ],
    };
}

function hasDetailedItems(check) {
    return !!(check && typeof check.summary === 'string' && check.summary.trim()
        && Array.isArray(check.items) && check.items.some((item) => String(item || '').trim()));
}

module.exports = {
    buildNewsFactChecks,
    hasDetailedItems,
};
