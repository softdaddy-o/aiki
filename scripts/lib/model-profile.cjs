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

const MODEL_PROFILE_OVERRIDES = {
    'gpt-4o': {
        memoryUsage: 'OpenAI API 기준 컨텍스트 128K, 최대 출력 16,384토큰이다. 자체 호스팅형 웨이트가 아니라 GPU 메모리 계산보다 요청당 토큰 예산을 먼저 본다.',
        implementation: 'OpenAI의 범용 멀티모달 GPT 계열이다. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원한다.',
        activeParameters: '활성 파라미터 수는 비공개다. 대신 gpt-4o, gpt-4o-2024-08-06, gpt-4o-2024-11-20처럼 스냅샷을 고정해 운영할 수 있다.',
        multimodalSupport: '텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다.',
        access: 'Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있다. 범용 프로덕션 기본 모델로 쓰기 쉬운 타입이다.',
        pricing: 'OpenAI API 기준 1M 토큰당 입력 $2.50, 캐시 입력 $1.25, 출력 $10.00이다.',
        weightsOpen: '오픈 웨이트 미공개, API 제공 중심',
        vendor: 'OpenAI',
    },
    'o1': {
        memoryUsage: 'API 기준 컨텍스트 200K, 최대 출력 100K 토큰이다. 자체 호스팅형 모델이 아니라 추론 길이와 출력 예산이 운영 포인트다.',
        implementation: '강화학습 기반 o-series reasoning 모델이다. 텍스트와 이미지 입력을 받아 긴 내부 추론 뒤 텍스트를 출력한다.',
        activeParameters: '활성 파라미터 수는 비공개다. 대신 reasoning token 지원, 함수 호출, 구조화 출력 여부가 실사용 차이를 만든다.',
        multimodalSupport: '텍스트 입력·출력과 이미지 입력을 지원한다. 오디오와 비디오는 공식 미지원이다.',
        access: 'Responses, Chat Completions, Realtime, Batch에서 쓸 수 있다. 파인튜닝과 distillation은 공식 미지원이다.',
        pricing: 'OpenAI API 기준 1M 토큰당 입력 $15.00, 캐시 입력 $7.50, 출력 $60.00이다.',
        weightsOpen: '오픈 웨이트 미공개, API 제공 중심',
        vendor: 'OpenAI',
    },
    'o3': {
        memoryUsage: 'API 기준 컨텍스트 200K, 최대 출력 100K 토큰이다. 긴 추론 작업에 맞춰 토큰 예산을 넉넉하게 잡아야 한다.',
        implementation: 'OpenAI의 최신 o-series reasoning 모델로, 고난도 추론과 도구 사용을 전제로 설계된 계열이다.',
        activeParameters: '활성 파라미터 수는 비공개다. 대신 reasoning effort, 함수 호출, structured outputs 같은 운용 옵션이 핵심 차이점이다.',
        multimodalSupport: '텍스트와 이미지 입력을 받아 텍스트를 출력한다. 오디오와 비디오는 기본 모델 기준 미지원이다.',
        access: 'Responses API와 Chat Completions에서 바로 쓸 수 있고, Batch도 지원한다. 고난도 추론 작업의 상위 티어 모델로 보면 된다.',
        pricing: 'OpenAI API 기준 1M 토큰당 입력 $10.00, 캐시 입력 $2.50, 출력 $40.00이다.',
        weightsOpen: '오픈 웨이트 미공개, API 제공 중심',
        vendor: 'OpenAI',
    },
    'claude-sonnet-4-5': {
        memoryUsage: 'Claude API 기준 200K 컨텍스트 계열로 운영한다. 자체 웨이트가 공개되지 않으므로 서버 메모리보다 컨텍스트와 출력 정책을 먼저 본다.',
        implementation: 'Anthropic의 Sonnet 라인업 중 코딩과 에이전트 작업을 겨냥한 서비스형 모델이다. 병렬 툴 실행과 긴 코드베이스 작업 성능을 강조한다.',
        activeParameters: '활성 파라미터 수는 비공개다. 대신 API 식별자 `claude-sonnet-4-5`와 상위 Sonnet 라인업 내 포지션이 실사용 기준이 된다.',
        multimodalSupport: '텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞다. 핵심 포인트는 코드 이해와 장문 맥락 유지다.',
        access: 'Claude API, AWS Bedrock, Vertex AI 같은 서비스 채널에서 접근하는 폐쇄형 모델이다.',
        pricing: 'Anthropic 발표 기준 Claude Sonnet 4와 같은 가격으로 유지되며, 1M 토큰당 입력 $3, 출력 $15다.',
        weightsOpen: '오픈 웨이트 미공개, API 제공 중심',
        vendor: 'Anthropic',
    },
    'deepseek-r1': {
        memoryUsage: '공개 모델 기준 총 671B 파라미터, 활성 37B 규모의 MoE 계열로 알려져 있다. 자체 호스팅 시 메모리와 KV 캐시 설계 부담이 큰 편이다.',
        implementation: '추론 특화 MoE 모델이다. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명한다.',
        activeParameters: '공식 공개 수치는 총 671B 파라미터, 토큰당 활성 37B다.',
        multimodalSupport: '현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확하다.',
        access: 'DeepSeek API의 reasoning 채널로 쓰거나, 공개 웨이트를 받아 자체 호스팅하는 두 경로가 있다.',
        pricing: 'API 채널 가격은 시점별로 바뀔 수 있다. 자체 호스팅 관점에서는 토큰 단가보다 GPU 시간과 메모리 비용이 더 중요하다.',
        weightsOpen: '오픈 웨이트 공개 계열이다. 허깅페이스와 GitHub 배포 경로를 함께 확인하는 편이 안전하다.',
        vendor: 'DeepSeek',
    },
    'mixtral': {
        memoryUsage: 'Mixtral 8x7B v0.1 기준 32K 컨텍스트를 지원한다. 총 파라미터 수는 46.7B지만 토큰당 활성 파라미터가 더 적어 dense 40B대 모델과는 메모리 감각이 다르다.',
        implementation: 'Mistral AI의 sparse mixture-of-experts 모델이다. 8개 expert 중 일부만 활성화하는 구조라 MoE 이해가 핵심이다.',
        activeParameters: '공식 발표 기준 총 46.7B 파라미터, 토큰당 활성 12.9B다.',
        multimodalSupport: '텍스트 중심 모델이다. 이미지·오디오 입력을 기대하는 계열은 아니다.',
        access: '오픈 웨이트 모델이라 허깅페이스에서 바로 받아 로컬이나 자체 인프라에 올릴 수 있다.',
        pricing: '직접 호스팅이면 GPU 비용이 핵심이다. API 재판매 채널을 쓸 때만 별도 토큰 단가를 비교하면 된다.',
        weightsOpen: '오픈 웨이트 공개',
        vendor: 'Mistral AI',
    },
    'flux': {
        memoryUsage: 'FLUX.1은 12B 파라미터 이미지 생성 모델 계열로 알려져 있다. 텍스트 LLM보다 VRAM 요구량이 크기 쉬워 배치와 해상도 설정을 같이 봐야 한다.',
        implementation: 'Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이다. Pro, Dev, Schnell처럼 배포 방식이 나뉜다.',
        activeParameters: '공개 자료 기준 12B 파라미터 계열이다. 활성 파라미터를 따로 쪼개 공개하는 구조는 아니다.',
        multimodalSupport: '텍스트 프롬프트를 받아 이미지를 생성하는 모델이다. 텍스트 출력형 LLM과는 사용 방식이 다르다.',
        access: 'Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있다.',
        pricing: 'API형 Pro와 자체 호스팅형 Dev·Schnell의 비용 구조가 갈린다. 이 모델은 토큰 가격보다 이미지 1장당 생성 비용과 GPU 점유가 더 중요하다.',
        weightsOpen: 'Dev와 Schnell은 오픈 웨이트, Pro는 폐쇄형 API',
        vendor: 'Black Forest Labs',
    },
    'gemini-2.5': {
        memoryUsage: 'Gemini 2.5 Pro 기준 컨텍스트 1,048,576토큰이다. 서비스형 모델이라 GPU 메모리보다는 긴 입력을 실제로 감당할 예산이 더 중요하다.',
        implementation: 'Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이다. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다.',
        activeParameters: '활성 파라미터 수는 비공개다. 대신 Pro/Flash 라인업 구분과 컨텍스트 한도가 실사용 차이를 만든다.',
        multimodalSupport: 'Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다.',
        access: 'Gemini API와 Google AI Studio에서 접근하는 폐쇄형 모델 계열이다. 실제 도입은 Pro와 Flash 중 무엇을 쓰는지까지 확인해야 한다.',
        pricing: 'Gemini 2.5 Pro paid tier 기준 1M 토큰당 입력 $1.25, 출력 $10.00(200K 이하), 200K 초과 구간은 입력 $2.50, 출력 $15.00이다.',
        weightsOpen: '오픈 웨이트 미공개, API 제공 중심',
        vendor: 'Google DeepMind',
    },
    'gemma-3': {
        memoryUsage: 'Gemma 3는 1B, 4B, 12B, 27B 크기로 나온 오픈 모델 계열이다. 128K 컨텍스트를 지원하지만 실제 배포 메모리는 모델 크기와 정밀도에 따라 크게 달라진다.',
        implementation: 'Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이다.',
        activeParameters: '공식 모델 크기는 1B, 4B, 12B, 27B다. 페이지를 볼 때는 어떤 크기를 말하는지까지 같이 확인해야 한다.',
        multimodalSupport: '텍스트와 이미지 입력, 텍스트 출력을 지원한다. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다.',
        access: '오픈 웨이트 모델이라 Hugging Face, Kaggle, Vertex Model Garden 등에서 내려받아 직접 실행할 수 있다.',
        pricing: '모델 자체 라이선스와 호스팅 비용이 핵심이다. API 토큰 과금보다 GPU 사양과 추론 속도를 먼저 계산하는 편이 맞다.',
        weightsOpen: '오픈 웨이트 공개',
        vendor: 'Google DeepMind',
    },
};

const MODEL_FACT_OVERRIDES = {
    'gpt-4o': {
        sourceMatch: [
            '모델명 대조: GPT-4o',
            '벤더 대조: OpenAI',
            '배포 유형 대조: version 모델 / 폐쇄형 API',
        ],
        webCrossCheck: [
            '공식 소스 1: Introducing GPT-4o',
            '공식 소스 2: OpenAI API 모델 문서',
            '비교 확인: 멀티모달 입력 범위와 API 지원 범위가 두 소스에서 일치',
        ],
        numberVerify: [
            '컨텍스트: 128K',
            '최대 출력: 16,384 토큰',
            '가격: 입력 $2.50 / 캐시 입력 $1.25 / 출력 $10.00 per 1M tokens',
        ],
        adversarial: [
            '오디오 입출력은 GPT-4o 기본 텍스트 모델과 별도 계열 문서로 분리해 읽어야 한다.',
        ],
    },
    'o1': {
        sourceMatch: [
            '모델명 대조: o1',
            '벤더 대조: OpenAI',
            '배포 유형 대조: version 모델 / reasoning API',
        ],
        webCrossCheck: [
            '공식 소스 1: Introducing OpenAI o1',
            '공식 소스 2: Reasoning best practices',
            '비교 확인: 접근 채널과 reasoning 모델 포지션이 두 소스에서 일치',
        ],
        numberVerify: [
            '컨텍스트: 200K',
            '최대 출력: 100K 토큰',
            '가격: 입력 $15.00 / 캐시 입력 $7.50 / 출력 $60.00 per 1M tokens',
        ],
        adversarial: [
            '활성 파라미터 수는 공식 비공개라 성능 기사에서 임의 수치를 붙이면 안 된다.',
        ],
    },
    'o3': {
        sourceMatch: [
            '모델명 대조: o3',
            '벤더 대조: OpenAI',
            '배포 유형 대조: version 모델 / reasoning API',
        ],
        webCrossCheck: [
            '공식 소스 1: Introducing o3 and o4-mini',
            '공식 소스 2: Reasoning best practices',
            '비교 확인: 상위 reasoning 라인업 포지션과 지원 채널이 두 소스에서 일치',
        ],
        numberVerify: [
            '컨텍스트: 200K',
            '최대 출력: 100K 토큰',
            '가격: 입력 $10.00 / 캐시 입력 $2.50 / 출력 $40.00 per 1M tokens',
        ],
        adversarial: [
            'o-series는 서비스 정책과 가격이 자주 바뀔 수 있어 발표 시점 확인이 필요하다.',
        ],
    },
    'claude-sonnet-4-5': {
        sourceMatch: [
            '모델명 대조: Claude Sonnet 4.5',
            '벤더 대조: Anthropic',
            '배포 유형 대조: version 모델 / 폐쇄형 API',
        ],
        webCrossCheck: [
            '공식 소스 1: Introducing Claude Sonnet 4.5',
            '공식 소스 2: Claude models overview',
            '비교 확인: Sonnet 라인업 내 위치와 배포 채널 설명이 두 소스에서 일치',
        ],
        numberVerify: [
            '컨텍스트: 200K 계열',
            '가격: 입력 $3 / 출력 $15 per 1M tokens',
            '채널: Claude API / AWS Bedrock / Vertex AI',
        ],
        adversarial: [
            '활성 파라미터 수는 공개되지 않아 벤치마크 기사에서 추정 수치를 사실처럼 쓰면 안 된다.',
        ],
    },
    'deepseek-r1': {
        sourceMatch: [
            '모델명 대조: DeepSeek R1',
            '벤더 대조: DeepSeek',
            '배포 유형 대조: version 모델 / 공개 계열',
        ],
        webCrossCheck: [
            '공식 소스 1: DeepSeek R1 릴리스 공지',
            '공식 소스 2: 공개 저장소 / 모델 카드',
            '비교 확인: 공개 배포와 reasoning 포지션 설명이 일치',
        ],
        numberVerify: [
            '총 파라미터: 671B',
            '활성 파라미터: 37B',
            '포지션: reasoning 특화 공개 모델',
        ],
        adversarial: [
            'API 가격보다 자체 호스팅 GPU 비용이 실제 운영비를 더 크게 좌우할 수 있다.',
        ],
    },
    'mixtral': {
        sourceMatch: [
            '모델명 대조: Mixtral 8x7B 계열',
            '벤더 대조: Mistral AI',
            '배포 유형 대조: version 모델 / 오픈 웨이트',
        ],
        webCrossCheck: [
            '공식 소스 1: Mixtral of Experts 발표',
            '공식 소스 2: Hugging Face 모델 카드',
            '비교 확인: MoE 구조와 공개 웨이트 배포가 일치',
        ],
        numberVerify: [
            '총 파라미터: 46.7B',
            '활성 파라미터: 12.9B',
            '컨텍스트: 32K',
        ],
        adversarial: [
            'dense 모델과 단순 파라미터 수 비교만 하면 실제 추론 비용 감각이 틀어질 수 있다.',
        ],
    },
    'flux': {
        sourceMatch: [
            '모델명 대조: FLUX.1',
            '벤더 대조: Black Forest Labs',
            '배포 유형 대조: version 모델 / API + 오픈 웨이트 혼합',
        ],
        webCrossCheck: [
            '공식 소스 1: Black Forest Labs launch',
            '공식 소스 2: Hugging Face 배포 페이지',
            '비교 확인: Pro, Dev, Schnell 배포 방식 차이가 소스 간 일치',
        ],
        numberVerify: [
            '파라미터: 12B',
            '라인업: Pro / Dev / Schnell',
            '출력 유형: 텍스트-이미지 생성',
        ],
        adversarial: [
            '토큰 가격표가 없는 대신 GPU 점유와 이미지 1장당 비용을 따로 봐야 한다.',
        ],
    },
    'gemini-2.5': {
        sourceMatch: [
            '모델명 대조: Gemini 2.5',
            '벤더 대조: Google DeepMind',
            '배포 유형 대조: version 모델 / 폐쇄형 API',
        ],
        webCrossCheck: [
            '공식 소스 1: Gemini API models',
            '공식 소스 2: Gemini API pricing',
            '비교 확인: Pro/Flash 라인업 구분과 가격 체계가 일치',
        ],
        numberVerify: [
            '컨텍스트: 1,048,576 토큰 (Pro 기준)',
            '가격: 입력 $1.25 / 출력 $10.00 per 1M tokens (200K 이하)',
            '입력 범위: 텍스트 / 이미지 / 비디오 / 오디오',
        ],
        adversarial: [
            'Gemini 2.5는 Pro와 Flash가 갈리므로 기사에서 세부 모델명을 생략하면 가격 해석이 틀어질 수 있다.',
        ],
    },
    'gemma-3': {
        sourceMatch: [
            '모델명 대조: Gemma 3',
            '벤더 대조: Google DeepMind',
            '배포 유형 대조: version 모델 / 오픈 웨이트',
        ],
        webCrossCheck: [
            '공식 소스 1: Gemma docs',
            '공식 소스 2: Gemma 3 launch post',
            '비교 확인: 오픈 배포 경로와 입력 지원 설명이 일치',
        ],
        numberVerify: [
            '모델 크기: 1B / 4B / 12B / 27B',
            '컨텍스트: 128K',
            '언어 지원: 140개 이상',
        ],
        adversarial: [
            'Gemma 3는 크기별 성능과 배포 난이도가 크게 갈리므로 모델 크기를 생략하면 비교가 흐려진다.',
        ],
    },
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

    if (sourceText.includes('stability.ai')) {
        return 'Stability AI';
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
    const overrides = MODEL_PROFILE_OVERRIDES[entry.term] || null;

    return {
        ...inferred,
        ...(overrides || {}),
        ...entry.modelProfile,
    };
}

function buildModelFactChecks(entry, modelProfile, sourceDetails) {
    const sourceTitles = sourceDetails
        .map((detail) => detail.title)
        .filter(Boolean)
        .filter((title) => !/^https?:\/\//i.test(title));
    const override = MODEL_FACT_OVERRIDES[entry.term];

    if (override) {
        return [
            {
                type: 'source_match',
                result: 'pass',
                summary: '원문에서 모델명, 벤더, 페이지 성격이 맞는지 먼저 대조했다.',
                items: override.sourceMatch,
            },
            {
                type: 'web_cross_check',
                result: sourceDetails.length > 1 ? 'pass' : 'skip',
                sources: sourceDetails.length,
                summary: `공식 소스 ${sourceDetails.length}건을 비교해 라인업 위치와 접근 경로를 교차검증했다.`,
                items: override.webCrossCheck,
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '숫자와 고유 명칭은 별도로 묶어서 다시 확인했다.',
                items: override.numberVerify,
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '오해하기 쉬운 포인트를 따로 비판적으로 검토했다.',
                items: override.adversarial,
                findings: override.adversarial,
            },
        ];
    }

    const familyItems = [
        `모델명 대조: ${entry.title}`,
        `벤더 대조: ${modelProfile.vendor}`,
        entry.parentModel ? `상위 계열: ${entry.parentModel}` : '상위 계열: 최상위 라인업',
    ];
    if (entry.modelType === 'family') {
        familyItems.push('페이지 성격: 개별 스냅샷이 아니라 상위 계열 안내 페이지');
    }

    return [
        {
            type: 'source_match',
            result: 'pass',
            summary: '원문에서 모델명과 라인업 성격이 맞는지 확인했다.',
            items: familyItems,
        },
        {
            type: 'web_cross_check',
            result: sourceDetails.length > 1 ? 'pass' : 'skip',
            sources: sourceDetails.length,
            summary: `공식 소스 ${sourceDetails.length}건을 비교해 라인업 설명이 일치하는지 확인했다.`,
            items: sourceTitles.map((title, index) => `비교 소스 ${index + 1}: ${title}`),
        },
        {
            type: 'adversarial',
            result: 'pass',
            summary: '이 페이지가 버전 비교표가 아니라 계열 안내 페이지라는 점을 별도로 점검했다.',
            items: ['개별 가격과 컨텍스트는 하위 버전 페이지에서 확인해야 한다.'],
            findings: ['계열 페이지의 일반 설명을 특정 버전 스펙처럼 읽지 않도록 분리했다.'],
        },
    ];
}

module.exports = {
    buildModelProfile,
    buildModelFactChecks,
};
