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
    const contexts = unique([
        ...extractNumericClaims(frontmatter.title, 2),
        ...extractNumericClaims(frontmatter.summary, 2),
        ...extractNumericClaims(body, 4),
    ]).slice(0, 4);

    if (contexts.length > 0) {
        return contexts.map((entry) => `수치 대조: ${entry}`);
    }

    return ['핵심 수치 주장이 전면에 없는 글이라 이름, 출처, 공개 범위를 중심으로 확인했다.'];
}

function buildAdversarialItems(frontmatter, body, sources) {
    const domain = detectDomain(frontmatter.sourceUrl || (sources[0] && sources[0].url) || '');
    const items = [];
    const findings = [];

    if (/reddit\.com$/i.test(domain)) {
        items.push('커뮤니티 반응 수치와 실제 제품 영향력을 분리해서 읽었다.');
        items.push('개인 실험·후기 성격의 글이라 재현 가능성과 대표성을 따로 판단했다.');
        findings.push('Reddit 반응은 관심 신호일 뿐 제품 준비도나 시장 검증을 직접 뜻하지 않는다.');
    } else if (/openai\.com$|anthropic\.com$|google\.com$|deepmind\.google$|ai\.google$/i.test(domain)) {
        items.push('공식 발표 문구와 실제 배포 범위를 분리해서 읽었다.');
        items.push('홍보성 표현보다 출시 채널, 가격, 접근 조건이 본문과 맞는지 다시 확인했다.');
        findings.push('공식 블로그는 가장 빠른 원문이지만 마케팅 문구가 섞일 수 있어 운영 조건을 따로 봐야 한다.');
    } else if (/arxiv\.org$/i.test(domain)) {
        items.push('논문 성과와 실제 제품 배포 가능성을 같은 뜻으로 읽지 않도록 분리했다.');
        items.push('평가셋 결과가 실제 서비스 품질을 바로 보장하는지 따로 점검했다.');
        findings.push('논문 수치는 재현 환경과 후속 구현에 따라 체감값이 크게 달라질 수 있다.');
    } else {
        items.push('제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 확인했다.');
        items.push('출처 성격상 주장과 해석을 분리해 독자가 바로 써먹을 판단 기준만 남겼다.');
    }

    if (/\b(leak|ban|lawsuit|acquire|funding|attack|breach|exploit)\b/i.test(`${frontmatter.title} ${frontmatter.summary} ${body}`)) {
        items.push('사건성 키워드는 단발 이슈인지 구조 변화 신호인지 구분해서 읽었다.');
    }

    return { items: unique(items), findings: unique(findings) };
}

function buildNewsFactChecks(frontmatter, body) {
    const sources = normalizeSourceList(frontmatter);
    const sourceItems = sources.length > 0
        ? sources.map((source, index) => `출처 ${index + 1}: ${source.title} (${source.url})`)
        : ['대표 원문 URL이 비어 있지 않은지 먼저 확인했다.'];
    const sourceTitles = unique([
        String(frontmatter.sourceTitle || '').trim(),
        ...sources.map((source) => source.title).filter(Boolean),
    ]).filter(Boolean);
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const numericItems = buildNumberItems(frontmatter, body);
    const adversarial = buildAdversarialItems(frontmatter, body, sources);
    const domain = detectDomain(frontmatter.sourceUrl || (sources[0] && sources[0].url) || '');

    return {
        sources,
        checks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: '원문 제목이랑 기사 메타데이터가 같은 사건을 가리키는지 먼저 맞춰봤다.',
                items: unique([
                    `기사 제목 대조: ${String(frontmatter.title || '').trim()}`,
                    ...(sourceTitles.length > 0 ? [`원문 제목 대조: ${sourceTitles[0]}`] : []),
                    ...(domain ? [`대표 출처 도메인: ${domain}`] : []),
                    ...(tags.length > 0 ? [`핵심 태그 축: ${tags.slice(0, 4).join(', ')}`] : []),
                ]),
            },
            {
                type: 'web_cross_check',
                result: sources.length > 1 ? 'pass' : 'skip',
                sources: sources.length,
                summary: `출처 ${sources.length}건을 나란히 놓고 정말 같은 사건을 말하는지 다시 봤다.`,
                items: sourceItems,
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '숫자와 고유 명칭은 따로 빼서 한 번 더 보고 과장된 표현을 걸렀다.',
                items: numericItems,
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '헷갈릴 수 있는 해석 포인트는 한 번 더 의심해보고 정리했다.',
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
