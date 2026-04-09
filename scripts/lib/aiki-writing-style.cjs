const TITLE_OVERRIDES = new Map([
    ['ibm-watson-jeopardy', 'IBM Watson, 질의응답형 AI의 대중화 신호'],
    ['alphago-lee-sedol', 'AlphaGo, AI 경쟁의 기준을 바꾼 대국'],
    ['alphago-zero', 'AlphaGo Zero, 자기학습 강화학습의 분기점'],
    ['bert-announcement', 'BERT 공개, 검색과 NLP 해석 방식의 전환점'],
    ['gpt-2-announcement', 'GPT-2 공개, 생성형 AI 배포 기준의 변화'],
    ['gpt-3-paper', 'GPT-3 공개, 대규모 언어모델 경쟁의 출발점'],
    ['github-copilot-preview', 'GitHub Copilot 공개, AI 코딩 보조의 시작'],
    ['chatgpt-launch', 'ChatGPT 출시, 대화형 AI 대중화의 출발점'],
    ['gpt-4-launch', 'GPT-4 공개, 멀티모달 경쟁의 본격화'],
    ['openai-sora-preview', 'Sora 공개, 생성형 비디오 경쟁의 개막'],
    ['deepseek-r1-open-release', 'DeepSeek R1 공개, 오픈 추론 모델 경쟁 가속'],
    ['openai-reasoning-best-practices', 'OpenAI 추론 모델 운영 가이드'],
    ['sora2-prompting-guide', 'Sora 2 프롬프트 가이드 업데이트'],
    ['gemma-4-26b-a3b-is-mindblowingly-good-if', 'Gemma 4 26B A3B, 설정에 따라 갈리는 실성능'],
    ['we-re-opening-the-google-ai-center-berli', 'Google AI 센터 베를린 개소'],
    ['1-openai-acquires-tbpn-media', 'OpenAI, TBPN 인수'],
]);

function normalizeText(text) {
    return String(text || '')
        .replace(/\s+/g, ' ')
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, '\'')
        .trim();
}

function trimSentence(text) {
    return normalizeText(text).replace(/[.!?]+$/g, '').trim();
}

function slugFromFileName(fileName) {
    return String(fileName || '')
        .replace(/^\d{4}-\d{2}-\d{2}-/, '')
        .replace(/\.md$/i, '');
}

function lowerList(values) {
    const list = Array.isArray(values) ? values : [];
    return list
        .map((value) => String(value || '').toLowerCase().trim())
        .filter(Boolean);
}

function looksGenericSourceTitle(text) {
    const value = normalizeText(text).toLowerCase();
    return !value
        || value === 'google blog'
        || value === 'openai'
        || value === 'reddit r/localllama'
        || value === 'localllama'
        || value === 'secondary source'
        || value === 'hugging face'
        || value === 'github';
}

function cleanCandidateTitle(title) {
    let cleaned = normalizeText(title)
        .replace(/\s*·\s*포옹하는 얼굴.*$/u, '')
        .replace(/\s*·\s*Hugging Face.*$/iu, '')
        .replace(/\s*,\s*arXiv .*$/iu, '')
        .replace(/\s*,\s*arxiv .*$/iu, '')
        .replace(/\s*,\s*논문 .*페이지.*$/u, '')
        .replace(/\s*,\s*문서 .*페이지.*$/u, '')
        .replace(/\s*,\s*요약 페이지.*$/u, '')
        .replace(/\s*,\s*초록 페이지.*$/u, '')
        .replace(/\s*,\s*추상 페이지.*$/u, '')
        .replace(/\s*,\s*추상.*$/u, '')
        .replace(/\s*,\s*요약.*$/u, '')
        .replace(/\s*,\s*초록.*$/u, '')
        .replace(/\s*,\s*우리는 .*$/u, '')
        .replace(/\s*,\s*사용자는 .*$/u, '')
        .replace(/\s*,\s*이 가이드는 .*$/u, '')
        .replace(/\s*,\s*작성자:.*$/u, '')
        .replace(/\s*발표,\s*.*$/u, ' 공개')
        .replace(/\s{2,}/g, ' ')
        .replace(/[,:;]+$/g, '')
        .trim();

    if (cleaned.includes(',')) {
        const parts = cleaned.split(',').map((part) => part.trim()).filter(Boolean);
        if (parts.length >= 2) {
            if (parts[0].length >= 16) {
                cleaned = parts[0];
            } else if (parts[1].length >= 10) {
                cleaned = `${parts[0]} ${parts[1]}`.trim();
            }
        }
    }

    return cleaned;
}

function focusFromNews(frontmatter) {
    const tags = new Set(lowerList(frontmatter.tags));
    const sourceUrl = String(frontmatter.sourceUrl || '').toLowerCase();
    const sourceTitle = normalizeText(frontmatter.sourceTitle).toLowerCase();

    if (sourceUrl.includes('reddit.com') || tags.has('local-ai') || tags.has('retro-computing')) {
        return '이 데모가 재미 요소인지 실제 로컬 배포 힌트인지';
    }

    if (sourceUrl.includes('arxiv.org')) {
        return '이 연구를 당장 제품 로드맵으로 읽어야 할지, 아직 연구 신호로만 봐야 할지';
    }

    if (sourceUrl.includes('huggingface.co') || tags.has('open-model') || tags.has('gguf') || tags.has('quantization')) {
        return '이 모델이 화제성 공개인지 실제 배포 후보인지';
    }

    if (tags.has('security') || /security|취약점|보안/u.test(sourceTitle)) {
        return '이 이슈가 기능 소개보다 운영 리스크에 가까운지';
    }

    if (tags.has('pricing') || tags.has('api') || tags.has('developer-tools')) {
        return '이 업데이트가 가격 구조, 사용량 정책, 개발 흐름 중 어디를 바꾸는지';
    }

    if (tags.has('reasoning') || tags.has('benchmark')) {
        return '벤치마크 숫자보다 실제 적용 범위를 어디까지 믿어야 하는지';
    }

    if (tags.has('model') || tags.has('language-model') || tags.has('multimodal') || tags.has('video-generation')) {
        return '이 모델이 성능 경쟁 이상의 제품 전략 신호를 주는지';
    }

    return '이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지';
}

function buildNewsReaderValue(frontmatter, fileName = '') {
    const slug = slugFromFileName(fileName);
    const summary = trimSentence(frontmatter.summary);

    if (slug === 'i-technically-got-an-llm-running-locally') {
        return '로컬 AI 실험을 성능 자랑으로만 볼지, 극단적인 저사양 배포 힌트로 읽을지 빠르게 가르게 해준다.';
    }

    if (slug === 'gemma-4-26b-a3b-is-mindblowingly-good-if') {
        return '오픈 모델을 볼 때 순위표만 볼지, 실제 설정 난도와 비용 대비 효율까지 같이 봐야 할지 빠르게 판단하게 해준다.';
    }

    if (summary && summary.length < 110 && /실험|공개|출시|업데이트|추가|인수|가이드|벤치마크|논문/u.test(summary)) {
        return `${focusFromNews(frontmatter)} 빠르게 판단하게 해준다.`;
    }

    return `${focusFromNews(frontmatter)} 빠르게 판단하게 해준다.`;
}

function buildWikiReaderValue(entry) {
    const category = String(entry.category || '').toLowerCase();
    const tags = new Set(lowerList(entry.tags));

    const hasAnyTag = (values) => values.some((value) => tags.has(String(value || '').toLowerCase()));

    if (category === 'model') {
        return '기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다.';
    }

    if (hasAnyTag(['company', 'model-lab', 'research'])) {
        return '이 이름이 모델 하나인지, 회사 전체 라인업과 전략 이야기인지 빠르게 구분하게 해준다.';
    }

    if (hasAnyTag(['retrieval', 'generation', 'search', 'vectors', 'vector-db', 'vector-search'])) {
        return '이 용어가 모델 성능 자체보다 검색과 외부 지식 연결을 바꾸는 이야기인지 바로 잡게 해준다.';
    }

    if (hasAnyTag(['architecture', 'transformer', 'attention', 'scaling'])) {
        return '이 말이 새 모델 이름이 아니라 내부 구조 변화라는 점을 먼저 읽게 해준다.';
    }

    if (hasAnyTag(['tool-use', 'function-calling', 'protocol'])) {
        return '이 말이 답변 생성 이야기가 아니라 외부 도구 실행과 연결 구조 이야기인지 빠르게 구분하게 해준다.';
    }

    if (hasAnyTag(['prompting', 'instruction'])) {
        return '이 말이 모델 교체가 아니라 입력 설계와 출력 제어를 바꾸는 기법인지 바로 이해하게 해준다.';
    }

    if (hasAnyTag(['safety', 'policy', 'reliability'])) {
        return '이 말이 성능 향상보다 오류와 위험을 줄이는 안전 장치에 가깝다는 점을 구분하게 해준다.';
    }

    if (hasAnyTag(['thinking', 'planning', 'reasoning'])) {
        return '이 말이 단순 속도 경쟁이 아니라 복잡한 문제 해결 방식 변화를 뜻한다는 점을 먼저 읽게 해준다.';
    }

    if (category === 'framework' || category === 'tool') {
        return '이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다.';
    }

    if (category === 'technique') {
        return '이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다.';
    }

    return '이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다.';
}

function isBadNewsTitle(frontmatter, fileName = '', body = '') {
    const title = normalizeText(frontmatter.title);
    if (!title) {
        return true;
    }

    const slug = slugFromFileName(fileName);
    if (TITLE_OVERRIDES.has(slug)) {
        return title !== TITLE_OVERRIDES.get(slug);
    }

    if (title.includes('발표,') || title.includes('· 포옹하는 얼굴')) {
        return true;
    }

    if (/,\s*(arxiv|arXiv|논문|문서|요약 페이지|초록 페이지|추상 페이지)/u.test(title)) {
        return true;
    }

    if (/^우리는 |^사용자는 |^이 가이드는 |^작성자:/u.test(title)) {
        return true;
    }

    if (/,\s*(우리는|오늘 우리는|Google은|OpenAI는|Anthropic은|Gemini Drops는|이제|작성자:)/u.test(title)) {
        return true;
    }

    const firstSentence = trimSentence(String(body || '').split(/\n+/)[0] || '');
    return Boolean(firstSentence) && title === firstSentence;
}

function isBadNewsReaderValue(frontmatter) {
    const value = normalizeText(frontmatter.readerValue);
    return !value
        || value.includes('가 실제 시장과 개발 흐름에서 왜 중요한지 빠르게 파악하게 해준다는 점이다')
        || value.includes('발표가 실제 제품 흐름, 비용 구조, 개발 우선순위를 어떻게 바꾸는지 빠르게 파악할 수 있게 돕는다')
        || value.includes('단순 기능 이름인지, 성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지');
}

function buildNewsTitle(frontmatter, fileName = '') {
    const slug = slugFromFileName(fileName);
    if (TITLE_OVERRIDES.has(slug)) {
        return TITLE_OVERRIDES.get(slug);
    }

    const sourceTitle = normalizeText(frontmatter.sourceTitle);
    const currentTitle = normalizeText(frontmatter.title);

    let candidate = cleanCandidateTitle(currentTitle);
    if (!candidate && !looksGenericSourceTitle(sourceTitle)) {
        candidate = cleanCandidateTitle(sourceTitle);
    }

    if (!candidate) {
        const tags = lowerList(frontmatter.tags);
        candidate = tags[0] ? tags[0].replace(/-/g, ' ') : trimSentence(frontmatter.summary).slice(0, 36);
    }

    return candidate.replace(/\s{2,}/g, ' ').trim();
}

module.exports = {
    buildNewsReaderValue,
    buildNewsTitle,
    buildWikiReaderValue,
    isBadNewsReaderValue,
    isBadNewsTitle,
    normalizeText,
    trimSentence,
};
