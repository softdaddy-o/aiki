const VENDOR_LABELS = {
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    google: 'Google DeepMind',
    meta: 'Meta',
    mistral: 'Mistral AI',
    microsoft: 'Microsoft',
    deepseek: 'DeepSeek',
    alibaba: 'Alibaba / Qwen',
    xai: 'xAI',
    github: 'GitHub',
};

function normalizeTags(tags) {
    return (tags || [])
        .map((tag) => String(tag || '').toLowerCase().trim())
        .filter(Boolean);
}

function inferVendor(entry) {
    const tags = normalizeTags(entry.tags);
    const sourceText = `${entry.title || ''} ${(entry.sources || []).map((source) => source.url || source.repo || source.page || '').join(' ')}`.toLowerCase();

    for (const [key, label] of Object.entries(VENDOR_LABELS)) {
        if (tags.includes(key) || sourceText.includes(key)) {
            return label;
        }
    }

    if (sourceText.includes('huggingface.co/mistralai')) {
        return 'Mistral AI';
    }

    return '공식 문서 기준 제작사/배포 벤더 확인 필요';
}

function inferImplementation(entry) {
    const tags = normalizeTags(entry.tags);
    const title = String(entry.title || '').toLowerCase();

    if (tags.includes('moe') || title.includes('mixtral')) {
        return 'MoE 계열로 보는 편이 맞고, 라우팅 방식과 expert 수는 공식 문서를 확인하는 게 안전하다.';
    }

    if (tags.includes('image-generation') || tags.includes('video-generation')) {
        return '생성 모델 계열로 보면 되고, 확산형인지 다른 구현인지 공식 문서 기준으로 구분하면 된다.';
    }

    return 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요하다.';
}

function inferMemoryUsage(entry) {
    const tags = normalizeTags(entry.tags);

    if (tags.includes('small-language-model') || tags.includes('on-device') || tags.includes('local-ai')) {
        return '소형 또는 온디바이스 지향으로 읽으면 되고, 실제 메모리 요구량은 양자화 방식과 컨텍스트 길이에 따라 달라진다.';
    }

    if (tags.includes('open-model') || tags.includes('open-weight')) {
        return '직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다.';
    }

    return '서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다.';
}

function inferActiveParameters(entry) {
    const tags = normalizeTags(entry.tags);
    const title = String(entry.title || '').toLowerCase();

    if (tags.includes('moe') || title.includes('mixtral')) {
        return '활성 파라미터와 총 파라미터를 분리해서 봐야 한다. MoE 계열이면 이 차이가 특히 중요하다.';
    }

    if (tags.includes('small-language-model')) {
        return '소형 모델 계열이지만 활성 파라미터 수는 공식 모델 카드 기준으로 다시 확인하는 편이 안전하다.';
    }

    return '공개 자료 기준 활성 파라미터 수 확인 필요';
}

function inferMultimodalSupport(entry) {
    const tags = normalizeTags(entry.tags);

    if (tags.includes('multimodal')) {
        return '멀티모달 지원으로 보면 된다. 다만 입력 전용인지 출력까지 되는지는 API 문서를 함께 봐야 한다.';
    }

    if (tags.includes('video-generation') || tags.includes('image-generation') || tags.includes('music-generation')) {
        return '텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 된다.';
    }

    if (tags.includes('audio')) {
        return '오디오 입력 또는 음성 처리 지원으로 읽는 편이 맞다.';
    }

    return '텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요';
}

function inferAccess(entry) {
    const tags = normalizeTags(entry.tags);

    if (tags.includes('open-weight') || tags.includes('open-model')) {
        return '무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있다.';
    }

    return '무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다.';
}

function inferPricing(entry) {
    const tags = normalizeTags(entry.tags);

    if (tags.includes('open-weight') || tags.includes('open-model')) {
        return '직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다.';
    }

    return '유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다.';
}

function inferWeightsOpen(entry) {
    const tags = normalizeTags(entry.tags);

    if (tags.includes('open-weight')) {
        return '오픈 웨이트';
    }

    if (tags.includes('open-model')) {
        return '오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요하다.';
    }

    return '비공개 또는 서비스/API 제공 중심';
}

function buildModelProfile(entry) {
    const inferred = {
        memoryUsage: inferMemoryUsage(entry),
        implementation: inferImplementation(entry),
        activeParameters: inferActiveParameters(entry),
        multimodalSupport: inferMultimodalSupport(entry),
        access: inferAccess(entry),
        pricing: inferPricing(entry),
        weightsOpen: inferWeightsOpen(entry),
        vendor: inferVendor(entry),
    };

    if (!entry.modelProfile) {
        return inferred;
    }

    return {
        ...inferred,
        ...entry.modelProfile,
    };
}

module.exports = {
    buildModelProfile,
};
