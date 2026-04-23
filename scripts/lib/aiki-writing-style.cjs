const { failScriptWriting } = require('./llm-only-writing.cjs');

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

const FORBIDDEN_READER_VALUE_PATTERNS = [
    /빠르게\s+파악하게\s+해준다는\s+점/u,
    /빠르게\s+파악할\s+수\s+있게\s+돕는다/u,
    /단순\s+기능\s+이름인지,\s*성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지/u,
];

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

    if (/^(우리는|사용자는|이 가이드는|작성자:)/u.test(title)) {
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
    return !value || FORBIDDEN_READER_VALUE_PATTERNS.some((pattern) => pattern.test(value));
}

function disabledWritingExport(name, detail) {
    return () => failScriptWriting(name, detail);
}

module.exports = {
    buildNewsProblemStatement: disabledWritingExport(
        'buildNewsProblemStatement',
        'Scripts must not generate problem-statement copy.',
    ),
    buildNewsReaderValue: disabledWritingExport(
        'buildNewsReaderValue',
        'readerValue must come from the LLM pipeline.',
    ),
    buildNewsTitle: disabledWritingExport(
        'buildNewsTitle',
        'news titles must come from the LLM pipeline.',
    ),
    buildWikiReaderValue: disabledWritingExport(
        'buildWikiReaderValue',
        'wiki readerValue must come from the LLM pipeline.',
    ),
    focusFromNews: disabledWritingExport(
        'focusFromNews',
        'Focus heuristics must not write user-facing copy.',
    ),
    isBadNewsReaderValue,
    isBadNewsTitle,
    normalizeText,
    rewriteAikiTone: disabledWritingExport(
        'rewriteAikiTone',
        'Scripts must not rewrite user-facing tone.',
    ),
    rewriteFactCheckTone: disabledWritingExport(
        'rewriteFactCheckTone',
        'Scripts must not rewrite fact-check prose.',
    ),
    trimSentence,
};
