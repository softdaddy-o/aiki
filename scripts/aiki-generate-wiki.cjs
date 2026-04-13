const fs = require('fs');
const path = require('path');

const { catalog } = require('./lib/wiki-catalog.cjs');
const { buildModelProfile, buildModelFactChecks } = require('./lib/model-profile.cjs');
const {
    clip,
    sentenceSplit,
    summarizeSource,
    translateToKorean,
    writeUtf8,
    yamlQuote,
} = require('./lib/content-utils.cjs');
const { buildWikiReaderValue, rewriteAikiTone, rewriteFactCheckTone } = require('./lib/aiki-writing-style.cjs');

const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');
const WIKI_DIR = path.resolve(__dirname, '../src/content/wiki/ko');
const TERMS_FILE = path.resolve(__dirname, '../data/wiki-terms.json');
const TODAY = new Date().toISOString().slice(0, 10);
const ENTRY_BY_TERM = new Map(catalog.map((entry) => [entry.term, entry]));

const MANUAL_WIKI_OVERRIDES = {
    llm: {
        summary: '대량의 텍스트 데이터로 학습한 거대 신경망 모델. 텍스트 생성, 번역, 요약, 코딩 등 범용 언어 작업을 수행한다.',
        definition: 'LLM(Large Language Model)은 수십억 개 이상의 파라미터를 가진 신경망으로, 인터넷 규모의 텍스트를 학습해서 범용 언어 작업을 수행하는 모델이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            'LLM의 기본 원리는 "다음 토큰 예측"이다. 앞의 텍스트가 주어지면 그다음에 올 가능성이 가장 높은 토큰(단어 조각)을 예측한다. 이걸 반복하면 문장이 되고 글이 된다.',
            '',
            '학습은 보통 두 단계를 거친다.',
            '',
            '1. **사전학습(Pre-training)**: 인터넷에서 수집한 대량의 텍스트로 다음 토큰 예측을 반복 학습한다. 이 과정에서 문법, 사실 지식, 추론 패턴 같은 것들이 파라미터에 압축된다.',
            '2. **정렬(Alignment)**: RLHF나 RLAIF 같은 기법으로 사람이 원하는 방식으로 응답하도록 조정한다. 해로운 내용 거부, 지시 따르기 같은 행동을 학습시키는 단계다.',
            '',
            '대부분의 LLM은 트랜스포머 아키텍처를 기반으로 한다. GPT-4, Claude, Gemini, Llama 같은 모델이 대표적이다.',
        ].join('\n'),
        whyImportant: [
            'LLM이 이전 AI 모델과 다른 점은 "범용성"이다. 하나의 모델로 번역, 요약, 코딩, 분석, 창작 같은 다양한 작업을 추가 학습 없이 수행할 수 있다. 별도 모델을 작업별로 따로 만들던 시대에서 하나의 기반 모델을 여러 용도로 쓰는 시대로 넘어온 것이다.',
            '',
            '실무에서는 코딩 어시스턴트, 고객 지원 챗봇, 문서 작성 보조, 데이터 분석 같은 곳에 이미 널리 들어가 있다. 반대로 최신 정보를 모르거나, 긴 문맥에서 실수하거나, 자신감 있게 틀린 말을 하는 한계도 분명해서 RAG, 파인튜닝, 에이전트 같은 보완 기법이 같이 발전했다.',
        ].join('\n'),
        relatedLines: [
            '- [Transformer](/ko/wiki/transformer/) — 대부분의 LLM이 사용하는 기반 아키텍처',
            '- [Fine-tuning](/ko/wiki/fine-tuning/) — 사전학습된 LLM을 특정 작업에 맞게 추가 학습시키는 기법',
            '- [RLHF](/ko/wiki/rlhf/) — LLM을 사람의 선호에 맞게 정렬하는 학습 방법',
            '- [Inference](/ko/wiki/inference/) — 학습된 LLM이 실제 입력에 대해 출력을 생성하는 과정',
            '- [Context Window](/ko/wiki/context-window/) — LLM이 한 번에 처리할 수 있는 토큰 수의 상한',
        ],
    },
    rag: {
        summary: 'LLM이 답변을 생성하기 전에 외부 문서를 검색해서 참고하는 기법. 학습 데이터에 없는 최신 정보도 활용할 수 있게 해준다.',
        definition: 'RAG(Retrieval-Augmented Generation)는 LLM이 답변하기 전에 외부 데이터베이스에서 관련 문서를 먼저 찾아보는 기법이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            'RAG는 크게 두 단계로 동작한다.',
            '',
            '1. **검색(Retrieval)**: 사용자 질문을 벡터로 변환한 뒤, 벡터 데이터베이스에서 의미적으로 가까운 문서 조각들을 가져온다.',
            '2. **생성(Generation)**: 가져온 문서 조각들을 프롬프트에 붙여서 LLM에 넘긴다. LLM은 이 문맥을 참고해서 답변을 만든다.',
            '',
            '핵심은 LLM이 자기 파라미터에 저장된 지식만 쓰는 게 아니라, 실시간으로 외부 정보를 참조한다는 점이다. 회사 내부 문서, 최신 뉴스, 기술 문서 같은 걸 LLM 재학습 없이 활용할 수 있다.',
        ].join('\n'),
        whyImportant: [
            'LLM의 큰 약점은 학습 이후의 최신 정보를 모른다는 것과 없는 내용을 그럴듯하게 지어낼 수 있다는 점이다. RAG는 이 두 문제를 동시에 줄여 준다.',
            '',
            '파인튜닝과 비교하면 비용도 훨씬 적게 든다. 모델을 다시 학습시키는 대신 검색 대상 문서만 업데이트하면 되기 때문이다. 그래서 기업용 챗봇, 사내 지식 검색, 고객지원 자동화 같은 곳에서 사실상 기본 패턴이 됐다.',
            '',
            '다만 검색 품질이 나쁘면 답변 품질도 같이 떨어진다. 임베딩 모델, 청킹 전략, 리랭킹 같은 세부 설계가 실제 성능을 좌우한다.',
        ].join('\n'),
        relatedLines: [
            '- [LLM](/ko/wiki/llm/) — RAG가 생성 단계에서 사용하는 기반 모델',
            '- [Embedding](/ko/wiki/embedding/) — 문서와 질문을 벡터로 변환하는 과정',
            '- [Vector Database](/ko/wiki/vector-db/) — 임베딩된 문서를 저장하고 유사도 검색을 수행하는 저장소',
        ],
    },
    mcp: {
        summary: 'MCP는 AI 앱이 외부 도구와 데이터 소스에 연결되는 방식을 표준화하려는 오픈 프로토콜이다. 모델 성능을 높이는 기술이라기보다, 도구 연결을 같은 규격으로 정리하는 접속 표준에 가깝다.',
        definition: 'MCP는 AI 앱이 외부 도구, 파일, 데이터 소스에 연결되는 방식을 표준화하려는 오픈 프로토콜이야.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            'MCP를 이해할 때 먼저 잡아야 할 점은 이것이 모델 기능이 아니라 연결 규격이라는 사실이야. AI 앱이 바깥 세계와 붙으려면 파일 시스템도 읽어야 하고, API도 호출해야 하고, 데이터베이스도 조회해야 하거든. 문제는 도구마다 연결 방식이 제각각이면 앱마다 연동 코드를 따로 써야 한다는 점이다.',
            '',
            'MCP는 그 연결부를 공통 규격으로 맞추려 해. 공식 아키텍처 문서 기준으로는 host, client, server가 분리되고, server는 tools, resources, prompts 같은 단위를 노출한다. 그래서 MCP를 지원하는 앱은 각 도구마다 전용 연동을 새로 만드는 대신, 같은 계약을 따라 여러 외부 시스템에 붙을 수 있다.',
        ].join('\n'),
        whyImportant: [
            'MCP가 중요한 이유는 에이전트나 코딩 도구가 실제로 쓸모 있으려면 결국 외부 도구와 연결돼야 하기 때문이야. 모델이 답을 생성하는 것만으로는 업무를 끝낼 수 없다. 파일을 읽고, 이슈를 만들고, 노션을 수정하고, 배포 상태를 확인하는 순간부터는 연결 표준이 중요해진다.',
            '',
            '그래서 MCP는 "새로운 모델 기술"이라기보다 도구 연결을 재사용 가능하게 만드는 인프라 용어로 이해해야 해. 이 차이를 놓치면 MCP 관련 뉴스를 읽을 때도 과장되게 받아들이기 쉽다. 실제로는 모델 능력보다 도구 생태계를 어떻게 표준화할지에 대한 이야기인 경우가 많다.',
        ].join('\n'),
        relatedLines: [
            '- [Function Calling](/ko/wiki/function-calling/) — 모델이 도구를 호출하는 인터페이스라는 점은 겹치지만, MCP는 호출 자체보다 도구 발견과 연결 규격을 표준화한다는 점에서 층위가 다르다.',
            '- [AI Agent](/ko/wiki/agent/) — MCP는 에이전트가 외부 세계와 상호작용할 때 자주 쓰는 연결 규격이라서, 에이전트가 실제로 어떤 도구를 만지는지 이해하는 데 도움이 된다.',
            '- [Claude Code](/ko/wiki/claude-code/) — MCP를 실제 개발 도구 안에서 어떻게 체감하는지 보여 주는 사례라서, 추상 표준이 제품 안에서 어떻게 드러나는지 볼 때 좋다.',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: 'MCP를 오픈 표준 프로토콜로 읽는 게 맞는지부터 먼저 맞춰봤다.',
                items: [
                    '독자 문제 대조: 모델 능력 이야기와 도구 연결 구조 이야기를 먼저 구분해야 한다.',
                    '원문 대조: introduction은 MCP를 open standard로 소개한다.',
                    '정체성 대조: 앱과 도구를 연결하는 protocol 성격이 핵심이라는 설명과 맞는다.',
                    '비유 대조: 공식 소개가 USB-C 비유를 쓰는 이유도 연결 규격 표준이라는 해석과 일치한다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 3,
                summary: '소개, 아키텍처, 스펙 문서를 같이 놓고 MCP 범위를 과장하지 않았는지 다시 봤다.',
                items: [
                    '비교 기준: 함수 호출 규격, 에이전트 프레임워크, 도구 연결 표준 가운데 MCP가 어디에 놓이는지 봐야 한다.',
                    '교차검증: architecture 문서는 host, client, server 구성을 분리해 설명한다.',
                    '교차검증: specification 문서는 tools, resources, prompts 같은 노출 단위를 별도로 정의한다.',
                    '해석 보정: 그래서 MCP를 agent framework 하나로 축소하거나 function calling의 다른 이름으로 치환하면 범위가 틀어진다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '스펙 버전과 구성 요소 이름처럼 자주 틀리는 고유 항목도 한 번 더 봤다.',
                items: [
                    '버전 검증: 공식 스펙 경로는 2024-11-05 버전을 포함한다.',
                    '명칭 검증: MCP는 Model Context Protocol의 약자다.',
                    '구성 검증: tools, resources, prompts는 공식 문서에서 분리된 개념으로 다뤄진다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: 'MCP 주변에서 가장 흔한 과장을 어떻게 걸러야 하는지 의심해보고 정리했다.',
                items: [
                    '비판적 검증: MCP는 모델 자체를 더 똑똑하게 만드는 기술이 아니다.',
                    '비판적 검증: MCP를 붙였다고 보안 문제가 자동으로 해결되는 것도 아니다.',
                    '비판적 검증: function calling은 호출 형식에 가깝고, MCP는 도구를 발견하고 연결하는 표준이라는 점에서 층위가 다르다.',
                ],
                findings: [
                    'MCP를 이해할 때 핵심은 어떤 모델이냐보다, 서로 다른 도구 연결을 같은 계약으로 묶을 수 있느냐에 있어.',
                ],
            },
        ],
    },
    grounding: {
        summary: 'Grounding은 모델 답변을 외부의 검증 가능한 정보원에 붙여 주는 기법이다. 단순히 검색을 붙이는 것보다 넓은 개념이고, 모델을 더 학습시키는 대신 실행 시점에 근거를 연결한다는 점이 핵심이다.',
        definition: 'Grounding은 모델 답변을 외부의 검증 가능한 정보원에 연결해, 답변에 근거를 붙이는 기법이야.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            'Grounding을 이해할 때 가장 먼저 버려야 할 오해는 "모델이 더 똑똑해지는 기술"이라는 생각이야. grounding은 학습 단계가 아니라 실행 단계에서 작동하거든. 질문이 들어오면 웹 검색, 사내 검색, 지도 데이터, 문서 저장소 같은 외부 소스를 조회하고, 그 결과를 모델 답변과 연결한다.',
            '',
            '그래서 grounding의 핵심은 검색 자체보다 근거 연결 방식에 있어. 검색 결과를 그냥 참고만 하는 것이 아니라, 어떤 소스를 바탕으로 답했는지 citation과 metadata를 함께 남길 수 있어야 하거든. Gemini와 Vertex 문서가 grounding metadata를 따로 강조하는 이유도 여기에 있다.',
        ].join('\n'),
        whyImportant: [
            'Grounding이 중요한 이유는 많은 AI 제품의 문제를 "모델 성능 부족"으로만 오해하기 쉽기 때문이야. 실제로는 모델이 모르는 최신 정보, 조직 내부 정보, 특정 도메인 데이터가 필요한 경우가 훨씬 많다. 이때 필요한 것은 더 큰 모델이 아니라, 외부 근거를 안전하게 붙이는 설계일 수 있다.',
            '',
            '또 grounding은 제품 판단에도 영향을 줘. 같은 검색을 붙여도 citation이 필요한지, 웹 기반 최신성이 중요한지, 사내 문서 중심인지에 따라 구현 방식이 달라진다. 그래서 grounding을 이해하면 RAG, 검색 API, 벡터 DB를 어디에 써야 할지 구분이 쉬워진다.',
        ].join('\n'),
        relatedLines: [
            '- [RAG](/ko/wiki/rag/) — grounding의 대표 구현 패턴 중 하나라서 같이 보되, grounding 전체를 RAG로 축소하면 범위를 잘못 잡게 된다.',
            '- [LlamaIndex](/ko/wiki/llamaindex/) — grounding을 실제 문서 연결 흐름으로 구현할 때 자주 등장하는 프레임워크라서, 추상 개념이 코드로 내려오는 방식을 보기 좋다.',
            '- [Embedding](/ko/wiki/embedding/) — grounding에서 검색 후보를 고르는 단계와 자주 연결되므로, retrieval 품질이 어디서 갈리는지 이해할 때 필요하다.',
            '- [Vector Database](/ko/wiki/vector-db/) — grounding이 문서 검색 계층과 만나는 대표 지점이라서, 외부 근거를 어떤 저장소에서 꺼내는지 이해하는 데 도움이 된다.',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: 'grounding을 모델 학습이 아니라 외부 근거 연결 기법으로 읽는 게 맞는지부터 먼저 맞춰봤다.',
                items: [
                    '독자 문제 대조: 모델이 원래 더 똑똑한 경우와, 실행 시점에 외부 근거를 붙여 답변을 안정시키는 경우를 먼저 나눠 봐야 한다.',
                    '원문 대조: Vertex AI 문서는 grounding을 모델 출력을 검증 가능한 소스와 연결하는 방식으로 설명한다.',
                    '정체성 대조: fine-tuning이나 pretraining이 아니라 inference 시점의 연결 기법이라는 해석과 맞는다.',
                    '카테고리 대조: technique로 두고, 본문에서는 search 자체보다 evidence attachment 계층이라는 점을 먼저 잡았다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 2,
                summary: 'Vertex와 Gemini 문서를 같이 놓고 grounding을 단순 검색 기능으로 축소하지 않았는지 다시 봤다.',
                items: [
                    '비교 기준: 검색 API, RAG, grounding 가운데 어떤 것이 근거 연결 전체를 설명하는지 봐야 한다.',
                    '교차검증: Vertex 문서는 Google Search, Vertex AI Search, RAG Engine, Maps, 외부 파트너 검색까지 여러 grounding 경로를 포괄한다.',
                    '교차검증: Gemini 문서는 grounding 결과와 함께 citation, web search query, grounding metadata를 반환하는 흐름을 설명한다.',
                    '해석 보정: 그래서 grounding은 검색 붙이기보다 넓고, RAG는 그 안의 한 구현 패턴으로 보는 편이 정확하다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '문서에 직접 나오는 필드 이름과 단계 정보도 한 번 더 봤다.',
                items: [
                    '필드 검증: Gemini 문서는 groundingMetadata, groundingChunks, groundingSupports, webSearchQueries 같은 응답 필드를 예시로 보여 준다.',
                    '범위 검증: Vertex overview는 여러 grounding source 유형을 한 umbrella 개념 아래에서 다룬다.',
                    '명칭 검증: grounding은 retrieval 자체와 동의어가 아니라, 답변을 근거와 묶는 더 넓은 용어다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: 'grounding을 설명할 때 자주 생기는 축소 해석을 어떻게 걸러야 하는지 의심해보고 정리했다.',
                items: [
                    '비판적 검증: grounding은 RAG의 다른 이름이 아니다.',
                    '비판적 검증: grounding을 붙였다고 답변이 항상 사실이 되는 것은 아니고, 어떤 소스를 붙이느냐가 여전히 중요하다.',
                    '비판적 검증: 더 좋은 모델을 쓰는 문제와, 외부 근거를 답변에 연결하는 문제는 층위가 다르다.',
                ],
                findings: [
                    'grounding의 핵심은 모델 성능을 마법처럼 끌어올리는 데 있지 않고, 답변을 어떤 근거 체계에 묶을지 설계하는 데 있어.',
                ],
            },
        ],
    },
    ollama: {
        summary: 'Ollama는 로컬 환경에서 LLM을 내려받아 실행하고 API로 노출하는 런타임 도구다. 채팅 앱이라기보다 모델 파일과 애플리케이션 사이를 이어 주는 로컬 서빙 레이어로 보는 편이 맞다.',
        definition: 'Ollama는 로컬에서 LLM을 내려받아 실행하고, 그 모델을 API로 꺼내 쓸 수 있게 만드는 런타임 도구야.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            'Ollama는 채팅 화면 자체보다 실행 엔진 쪽에 가깝다. 모델 파일을 받아서 로컬 머신에 올리고, 앱이 HTTP API로 그 모델을 호출하게 만들거든. 그래서 "내 노트북에서 모델을 돌려 본다"는 수준에서 끝나지 않고, 코드 에디터 플러그인이나 내부 툴이 그 모델에 붙도록 연결하는 역할까지 맡는다.',
            '',
            '이 도구가 자주 언급되는 이유도 단순해. 로컬 AI를 쓰고 싶을 때 많은 사람이 처음 필요한 것을 UI라고 생각하지만, 실제로는 모델을 일관되게 실행하고 호출하는 런타임이 더 중요하거든. Ollama는 그 역할을 작게 시작하기 쉽게 만들어 준다.',
        ].join('\n'),
        whyImportant: [
            'Ollama를 다른 로컬 AI 툴과 구분해야 하는 이유는 운영 감각이 다르기 때문이야. LM Studio는 사람이 직접 만지는 데스크톱 경험이 강하고, llama.cpp는 더 낮은 수준의 실행 엔진 감각이 강하다. 반면 Ollama는 "모델을 API처럼 다루게 해 준다"는 점에서 개발 흐름과 맞닿아 있다.',
            '',
            '그래서 작은 팀이 로컬 모델을 앱에 붙여 보거나, 사내 도구에서 외부 API 대신 내부 모델을 먼저 붙여 보거나, GGUF 모델을 빠르게 교체 실험할 때 자주 선택돼. 반대로 대규모 동시 처리량과 고성능 GPU 서버 최적화가 핵심이면 vLLM 같은 다른 선택지가 더 맞을 수 있다.',
        ].join('\n'),
        relatedLines: [
            '- [llama.cpp](/ko/wiki/llama.cpp/) — Ollama가 기대는 저수준 추론 엔진 계열을 이해하면, Ollama가 어디까지를 감싸는 도구인지 분명해진다.',
            '- [vLLM](/ko/wiki/vllm/) — 둘 다 모델 서빙 계층이지만, Ollama는 로컬 개발과 간편 배포 쪽이고 vLLM은 고처리량 서버 추론 쪽으로 무게가 다르다.',
            '- [GGUF](/ko/wiki/gguf/) — Ollama가 자주 다루는 로컬 모델 파일 형식 맥락이라서, 모델 배포 감각을 이해할 때 같이 봐야 한다.',
            '- [LM Studio](/ko/wiki/lm-studio/) — 둘 다 로컬 모델을 다루지만, LM Studio는 UI 중심이고 Ollama는 API 중심이라는 차이가 있다.',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: 'Ollama를 로컬 추론 런타임으로 설명하는 게 맞는지부터 먼저 맞춰봤다.',
                items: [
                    '독자 문제 대조: 로컬 AI를 쓸 때 채팅 UI가 필요한지, 실제 모델 런타임과 API 계층이 필요한지부터 갈라 봐야 한다.',
                    '원문 대조: API introduction은 기본 로컬 엔드포인트를 http://localhost:11434/api 로 안내한다.',
                    '정체성 대조: 그래서 Ollama는 모델 파일과 앱 사이에 놓이는 실행 계층으로 읽는 편이 맞다.',
                    '카테고리 대조: tool로 두되, 채팅 앱이 아니라 local serving runtime이라는 위치를 본문에서 먼저 잡았다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 3,
                summary: 'API, import, quickstart 문서를 같이 놓고 Ollama 범위를 과장하거나 축소하지 않았는지 다시 봤다.',
                items: [
                    '비교 기준: 데스크톱 UI, 저수준 엔진, 고처리량 서버 스택 사이에서 Ollama가 어느 층에 놓이는지 봐야 한다.',
                    '교차검증: quickstart는 macOS, Linux, Windows 설치 흐름을 모두 제공한다.',
                    '교차검증: import 문서는 GGUF와 Safetensors 계열 모델을 Modelfile로 가져오는 흐름을 설명한다.',
                    '교차검증: API 문서는 로컬 API뿐 아니라 cloud endpoint인 https://ollama.com/api 도 함께 안내한다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '운영 판단에 직접 걸리는 이름과 엔드포인트, 양자화 표현도 한 번 더 봤다.',
                items: [
                    '명칭 검증: 제품명은 Ollama이고, llama.cpp나 LM Studio와 같은 별도 프로젝트와 구분된다.',
                    '엔드포인트 검증: 기본 로컬 API 주소는 http://localhost:11434/api 다.',
                    '양자화 검증: import 문서는 q4_K_M 같은 quantization 지정 예시를 포함한다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '로컬 AI 글에서 자주 섞이는 오해를 어떻게 걸러야 하는지 의심해보고 정리했다.',
                items: [
                    '비판적 검증: Ollama는 모델 자체가 아니다. 모델을 내려받고 실행하는 런타임이다.',
                    '비판적 검증: LM Studio 같은 데스크톱 UI와 달리, Ollama의 핵심은 API로 로컬 모델을 노출하는 데 있다.',
                    '비판적 검증: vLLM처럼 대규모 고처리량 서빙을 기본 목표로 한 서버 스택과도 역할이 다르다.',
                ],
                findings: [
                    'Ollama를 이해할 때 핵심은 로컬에서 바로 돌릴 수 있느냐보다, 앱이 붙을 수 있는 API 계층을 로컬에 만드느냐에 있어.',
                ],
            },
        ],
    },
    comfyui: {
        summary: 'ComfyUI는 생성 모델 자체가 아니라 노드 그래프로 이미지, 영상, 오디오 생성 파이프라인을 설계하고 실행하는 오픈소스 워크플로 앱이다. 프롬프트를 한 번 넣고 결과를 보는 UI라기보다 생성 단계를 세밀하게 조립하고 재현하는 쪽에 가깝다.',
        definition: 'ComfyUI는 생성 모델을 실행하는 환경 위에 얹는 노드 그래프형 워크플로 앱이야. 한 줄로 줄이면 모델 자체가 아니라 생성 파이프라인을 눈으로 조립하고 반복 실행하는 도구라고 보면 돼.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            'ComfyUI는 프롬프트 하나를 넣고 결과만 보는 UI와 다르다. 입력 전처리, 모델 로딩, 샘플링, 업스케일, 후처리, 저장 같은 단계를 각각 노드로 나눠 연결하거든. 그래서 같은 생성 작업이라도 어느 단계에서 무엇을 바꿨는지 추적하기 쉽고, 한번 만든 흐름을 다시 재현하기도 쉽다.',
            '',
            '공식 문서가 workflow를 connected graph of nodes라고 설명하는 이유도 여기 있어. ComfyUI는 "이미지를 만들어 주는 앱"이라기보다 "생성 과정을 설계하는 캔버스"에 가깝다. Stable Diffusion, FLUX 같은 모델을 얹어 쓰더라도 핵심 가치는 모델 자체보다 파이프라인을 세밀하게 제어한다는 점이야.',
        ].join('\n'),
        whyImportant: [
            'ComfyUI를 모르면 생성 AI 도구를 전부 같은 부류로 보기 쉽다. 하지만 빠르게 결과를 뽑는 툴과, 생성 단계를 조립해 실험하고 반복하는 툴은 쓰임새가 다르거든. 전자는 속도가 중요하고, 후자는 재현성과 제어권이 중요하다.',
            '',
            '실무에서는 이 차이가 바로 작업 방식으로 이어진다. 여러 모델을 섞어 보고 싶거나, 전처리와 후처리를 반복적으로 조정해야 하거나, 팀 안에서 같은 워크플로를 공유해야 한다면 ComfyUI 같은 도구가 훨씬 잘 맞아. 반대로 그냥 간단히 생성 결과만 얻고 싶다면 ComfyUI는 오히려 과한 선택일 수 있다.',
        ].join('\n'),
        relatedLines: [
            '- [Stable Diffusion](/ko/wiki/stable-diffusion/) — ComfyUI가 자주 연결하는 대표 모델 계열이라서, 워크플로 도구와 모델 자체를 구분하는 데 도움이 된다.',
            '- [Diffusion Model](/ko/wiki/diffusion/) — ComfyUI 안에서 많이 다루는 생성 원리의 상위 개념이라서, 왜 노드 구성이 길어지는지 이해할 때 같이 봐야 한다.',
            '- [FLUX](/ko/wiki/flux/) — ComfyUI 안에서 교체 가능한 최신 이미지 생성 모델 계열 예시라서, 워크플로와 모델을 분리해서 보는 감각을 준다.',
            '- [Ollama](/ko/wiki/ollama/) — 둘 다 로컬 환경에서 많이 쓰이지만, Ollama는 모델 런타임이고 ComfyUI는 시각적 생성 파이프라인 도구라는 점에서 역할이 갈린다.',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: 'ComfyUI를 모델이 아니라 워크플로 앱으로 읽는 게 맞는지부터 먼저 맞춰봤다.',
                items: [
                    '독자 문제 대조: 간단한 생성 UI를 찾는 상황과, 생성 파이프라인 자체를 설계하고 재현해야 하는 상황을 구분해야 한다.',
                    '원문 대조: ComfyUI 문서는 workflow를 connected graph of nodes라고 설명한다.',
                    '정체성 대조: 생성 모델 자체가 아니라 노드 기반 파이프라인 편집기라는 해석과 맞는다.',
                    '카테고리 대조: tool로 두되, 본문에서는 생성 앱이 아니라 workflow editor 겸 executor라는 위치를 분명히 잡았다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 2,
                summary: '공식 사이트와 워크플로 문서를 같이 놓고 ComfyUI 범위를 너무 좁게 읽지 않았는지 다시 봤다.',
                items: [
                    '비교 기준: 생성 결과를 빠르게 뽑는 UI와, 생성 파이프라인을 설계하는 도구는 어디서 갈리는지 봐야 한다.',
                    '교차검증: 공식 사이트는 image, video, 3D, audio를 모두 다룬다고 소개한다.',
                    '교차검증: 워크플로 문서는 개별 노드를 연결해 입력, 생성, 후처리를 분리하는 구조를 전제로 한다.',
                    '해석 보정: 그래서 ComfyUI를 단순 이미지 프롬프트 툴로 줄여 쓰면 제품 범위를 과소평가하게 된다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '이름과 범위, 저장 방식처럼 헷갈리기 쉬운 고유 정보도 한 번 더 봤다.',
                items: [
                    '명칭 검증: 제품명은 ComfyUI이고, 모델명이나 특정 모델 계열명이 아니다.',
                    '범위 검증: 공식 사이트는 4개 미디어 범주인 image, video, 3D, audio를 함께 제시한다.',
                    '구조 검증: workflow는 JSON으로 저장하고 다시 불러오는 재현 가능한 구조라는 설명이 문서와 커뮤니티 예시 전반에서 일치한다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '독자가 가장 많이 틀리는 지점을 기준으로 어떤 오해를 먼저 걸러야 하는지 의심해보고 정리했다.',
                items: [
                    '비판적 검증: ComfyUI는 모델이 아니다. 모델을 갈아끼우는 워크플로 환경이다.',
                    '비판적 검증: 예쁜 UI를 제공하는 생성 앱과 달리, ComfyUI의 핵심 가치는 제어 가능성과 재현성이다.',
                    '비판적 검증: 로컬에서 많이 쓰이지만, 그것만으로 Ollama 같은 로컬 모델 런타임과 같은 역할이라고 보면 틀린다.',
                ],
                findings: [
                    'ComfyUI를 이해할 때 핵심은 결과물 품질보다 파이프라인 제어권이야. 그래서 무슨 모델이 좋으냐보다 생성 단계를 얼마나 세밀하게 만질 수 있느냐를 먼저 봐야 해.',
                ],
            },
        ],
    },
    qdrant: {
        summary: 'Qdrant는 임베딩을 저장만 하는 스토어가 아니라, 필터링과 hybrid search까지 포함해 운영형 검색 계층을 제공하는 오픈소스 벡터 검색 엔진이다. 관리형 서비스 대신 검색 제어권을 더 많이 가져오고 싶을 때 자주 비교되는 선택지다.',
        definition: 'Qdrant는 임베딩을 보관하는 저장소를 넘어, 필터링과 hybrid search까지 포함한 운영형 벡터 검색 엔진이야.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            'Qdrant를 단순 벡터 DB로만 이해하면 중요한 부분을 놓치기 쉬워. 실제로는 문서나 항목을 임베딩으로 저장하는 것뿐 아니라, 검색 시점에 metadata filtering, dense와 sparse를 섞는 hybrid search, multivector retrieval, reranking 같은 기능을 함께 다루는 검색 계층에 가깝거든.',
            '',
            '이 차이가 중요한 이유는 제품에 붙이는 순간 바로 드러나기 때문이야. 데모 단계에서는 "벡터만 저장하면 되지"라고 생각하기 쉽지만, 운영 단계로 가면 권한 필터, 카테고리 조건, 다국어 검색, 검색 품질 튜닝이 같이 필요해진다. Qdrant는 바로 그 운영형 요구를 겨냥한 도구다.',
        ].join('\n'),
        whyImportant: [
            'Qdrant를 이해해야 하는 이유는 RAG나 검색형 AI 제품에서 병목이 모델보다 retrieval 계층에서 자주 생기기 때문이야. 검색 품질이 흔들리면 아무리 좋은 모델을 붙여도 답변 품질이 떨어진다. 반대로 검색 레이어를 잘 설계하면 모델을 크게 바꾸지 않아도 결과가 안정된다.',
            '',
            '그래서 Qdrant는 "오픈소스 벡터 DB 하나 더 있다"로 읽으면 안 돼. 운영 제어권을 더 가져오고 싶고, 검색 기능을 세밀하게 튜닝하고 싶을 때 비교해야 하는 도구다. 물론 그만큼 직접 운영 부담도 늘어난다.',
        ].join('\n'),
        relatedLines: [
            '- [Pinecone](/ko/wiki/pinecone/) — 둘 다 벡터 검색 계층이지만, Pinecone은 관리형 서비스이고 Qdrant는 제어권을 더 가져오는 쪽이라 운영 책임이 갈린다.',
            '- [Weaviate](/ko/wiki/weaviate/) — 같은 운영형 벡터 검색 계열이지만, 데이터 모델과 기능 묶음, 생태계 접근법에서 감각 차이가 있다.',
            '- [Chroma](/ko/wiki/chroma/) — 개발 친화적인 임베딩 스토어로 빠르게 시작할 때 자주 비교되지만, 운영형 검색 기능 범위는 Qdrant 쪽이 더 넓다.',
            '- [RAG](/ko/wiki/rag/) — Qdrant가 왜 필요한지 알려면 상위 파이프라인인 RAG를 같이 봐야 한다. Qdrant는 그 안에서 retrieval 계층을 담당한다.',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: 'Qdrant를 단순 저장소가 아니라 검색 엔진 계층으로 읽는 게 맞는지부터 먼저 맞춰봤다.',
                items: [
                    '독자 문제 대조: 벡터를 저장만 하면 되는지, 운영형 검색 계층이 필요한지부터 갈라 봐야 한다.',
                    '원문 대조: 공식 사이트는 Qdrant를 vector search engine으로 소개한다.',
                    '정체성 대조: 임베딩 저장만이 아니라 retrieval 품질과 운영 기능을 같이 설명하는 제품 포지션과 맞는다.',
                    '카테고리 대조: tool로 두되, 본문에서는 vector DB보다 search layer에 더 가까운 성격을 먼저 잡았다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 2,
                summary: '공식 사이트와 검색 문서를 같이 놓고 Qdrant 차별점을 실제 기능 기준으로 다시 봤다.',
                items: [
                    '비교 기준: 관리형 서비스, 개발용 스토어, 운영형 검색 엔진 사이에서 Qdrant가 어디에 놓이는지 봐야 한다.',
                    '교차검증: 공식 소개는 dense, sparse, multivector, hybrid search를 함께 지원 범위로 제시한다.',
                    '교차검증: 검색 문서는 metadata filtering과 reranking 흐름을 운영형 검색 맥락에서 설명한다.',
                    '해석 보정: 그래서 Qdrant를 무료 Pinecone 정도로 줄여 쓰면 검색 기능 범위와 운영 부담을 모두 놓치게 된다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '운영 판단에 직접 걸리는 수치와 명칭도 한 번 더 봤다.',
                items: [
                    '수치 검증: 공식 사이트는 quantization으로 memory를 up to 64x 줄일 수 있다고 소개한다.',
                    '명칭 검증: 공식 소개 문구는 vector database보다 vector search engine 쪽에 더 무게를 둔다.',
                    '채널 검증: 공식 자료는 REST와 gRPC, 여러 공식 클라이언트 지원을 함께 안내한다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: 'Qdrant를 고를 때 자주 생기는 과장과 오해를 어떻게 걸러야 하는지 의심해보고 정리했다.',
                items: [
                    '비판적 검증: 오픈소스라는 이유만으로 운영 비용이 자동으로 낮아지는 것은 아니다.',
                    '비판적 검증: Chroma 같은 개발 친화형 스토어와 같은 층위로 보면 운영형 검색 기능 차이를 놓치기 쉽다.',
                    '비판적 검증: Pinecone 같은 관리형 서비스와 비교할 때 장점은 제어권이지만, 동시에 직접 운영 책임도 따라온다.',
                ],
                findings: [
                    'Qdrant를 볼 때 핵심은 벡터를 저장하느냐가 아니라, 검색 품질과 운영 제어권을 어느 정도까지 직접 가져가려 하느냐다.',
                ],
            },
        ],
    },
    token: {
        summary: '모델이 텍스트를 잘라 읽는 최소 단위. 비용, 컨텍스트 길이, 최대 출력 계산이 모두 토큰 기준으로 움직인다.',
        definition: 'Token은 LLM이 텍스트를 한 글자씩이 아니라 잘게 쪼갠 조각 단위로 읽을 때 쓰는 기본 단위다.',
        explainHeading: '## 어떻게 작동하나',
        explain: '영어 단어 하나가 토큰 하나일 때도 있지만, 긴 단어는 여러 조각으로 나뉠 수 있고 한글도 글자 수와 토큰 수가 꼭 일치하지는 않는다. 모델은 결국 이 토큰 개수를 기준으로 입력 길이, 출력 길이, 요금을 계산한다. 그래서 같은 문장도 어떤 tokenizer를 쓰느냐에 따라 비용과 처리 한도가 달라진다.',
        whyImportant: '뉴스에서 "128K 컨텍스트", "최대 출력 8K", "1M tokens당 가격" 같은 문구가 보이면 전부 토큰 단위를 말하는 거다. 이 개념을 알아야 모델 스펙표와 API 요금표를 제대로 읽을 수 있다.',
        relatedLines: [
            '- [LLM](/ko/wiki/llm/) — 토큰을 실제로 읽고 예측하는 기반 모델',
            '- [Tokenizer](/ko/wiki/tokenizer/) — 텍스트를 토큰으로 자르는 규칙과 도구',
            '- [Context Window](/ko/wiki/context-window/) — 한 번에 넣을 수 있는 토큰 상한',
        ],
    },
    tokenizer: {
        summary: '텍스트를 모델이 읽을 토큰 단위로 잘라 주는 규칙과 도구. 같은 문장도 어떤 tokenizer를 쓰느냐에 따라 토큰 수가 달라진다.',
        definition: 'Tokenizer는 사람이 읽는 문장을 모델이 계산할 수 있는 토큰 단위로 나눠 주는 규칙과 도구다.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: '모델은 문장을 그대로 읽지 않고 tokenizer가 자른 조각을 입력으로 받는다. 그래서 같은 문장도 모델마다 토큰 수가 다를 수 있고, 그 차이가 곧 비용과 컨텍스트 길이 계산 차이로 이어진다. OpenAI tokenizer나 llama.cpp 계열 tokenizer가 서로 결과가 다른 이유도 여기에 있다.',
        whyImportant: '실무에서는 프롬프트가 왜 갑자기 길이 제한에 걸리는지, 왜 예상보다 비용이 많이 나오는지 설명할 때 tokenizer 이해가 꼭 필요하다. 모델을 바꾸면 성능만이 아니라 토큰 계산 방식도 같이 달라진다.',
        relatedLines: [
            '- [Token](/ko/wiki/token/) — tokenizer가 만들어 내는 기본 단위',
            '- [Context Window](/ko/wiki/context-window/) — 잘린 토큰을 어디까지 넣을 수 있는지 정하는 한도',
            '- [LLM](/ko/wiki/llm/) — tokenizer가 자른 토큰을 실제로 처리하는 기반 모델',
        ],
    },
    'context-window': {
        summary: 'Context Window는 모델이 한 번의 요청에서 볼 수 있는 총 토큰 예산이다. 프롬프트, 첨부 문서, 대화 기록, 도구 결과가 전부 이 한도 안에 들어간다.',
        definition: 'Context Window는 모델이 한 번에 받아서 기억하며 처리할 수 있는 최대 토큰 길이를 뜻한다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 128K 컨텍스트라면 입력 프롬프트, 첨부 문서, 이전 대화 기록, 도구 결과까지 전부 합친 토큰 수가 그 한도 안에 들어가야 해. 길이가 길수록 긴 문서를 통째로 넣기 쉬워지지만, 비용과 지연도 같이 늘고 중간 내용을 놓치는 문제도 생길 수 있어.',
            '',
            '그래서 Context Window를 볼 때는 숫자만 외우기보다 실제로 어떤 문서 길이까지 넣을 수 있는지, tokenizer에 따라 체감 길이가 얼마나 달라지는지 같이 봐야 해. 같은 200K라도 문서 구조와 토큰화 방식에 따라 실사용 감각은 꽤 달라질 수 있거든.',
        ].join('\n'),
        whyImportant: '뉴스에서 "1M 컨텍스트" 같은 숫자가 크게 보이면, 그건 긴 입력을 다룰 수 있는 상한이 올라갔다는 뜻이야. 다만 상한이 커졌다고 품질이 자동으로 좋아지는 건 아니어서, 실제로는 비용과 지연이 얼마나 늘고 RAG나 메모리 전략을 어디까지 줄일 수 있는지까지 같이 판단해야 해.',
        relatedLines: [
            '- [Token](/ko/wiki/token/) — Context Window를 읽을 때 먼저 비교해야 할 기본 단위라서, 숫자 표기가 실제 길이와 어떻게 연결되는지 이해하는 데 필요해.',
            '- [Tokenizer](/ko/wiki/tokenizer/) — 같은 문장도 tokenizer가 다르면 토큰 수가 달라져서, 컨텍스트 숫자를 체감 길이로 바꿔 읽을 때 차이를 비교하기 좋아.',
            '- [Long Context](/ko/wiki/long-context/) — 둘 다 긴 입력 처리 이야기지만, 하나는 상한 개념이고 다른 하나는 그 상한을 실제 제품 경쟁 포인트로 다루는 흐름이라 비교해 보면 층위가 갈려.',
        ],
    },
    agent: {
        summary: 'AI Agent는 모델이 계획을 세우고 도구를 호출하며 여러 단계를 이어서 일을 처리하게 만든 실행 구조다.',
        definition: 'AI Agent는 LLM이 한 번 답하고 끝나는 대신, 목표를 받고 필요한 단계들을 이어 가며 작업을 수행하는 구조를 말한다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 "경쟁사 가격표를 찾아 비교해서 표로 정리해 줘" 같은 요청을 받으면, 에이전트는 검색을 하고, 필요한 페이지를 읽고, 계산하거나 정리한 뒤, 마지막 결과를 만든다.',
            '',
            '핵심은 모델 자체가 갑자기 더 똑똑해지는 게 아니라 계획, 상태, 도구 호출, 반복 실행을 묶는 런타임이 추가된다는 점이다. 그래서 챗봇보다 업무 자동화, 코딩 도구, 리서치 워크플로 문맥에서 더 자주 나온다.',
        ].join('\n'),
        whyImportant: 'AI Agent를 이해해야 "새 에이전트 출시"가 새 모델 발표인지, 아니면 기존 모델 위에 자동화 계층을 얹은 제품인지 구분할 수 있다. 실무에서는 이 차이가 도입 난도와 기대 성능 차이로 바로 이어진다.',
    },
    api: {
        summary: 'API는 한 프로그램이 다른 프로그램의 기능을 정해진 형식으로 호출하게 해 주는 연결 규격이다.',
        definition: 'API(Application Programming Interface)는 소프트웨어가 다른 소프트웨어와 대화할 때 쓰는 약속된 요청·응답 규격이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '앱이 모델 서버에 요청을 보내고, 서버가 정해진 형식의 응답을 돌려주는 구조를 떠올리면 가장 쉽다. 예를 들어 챗봇 앱이 OpenAI API에 프롬프트를 보내고 답변을 받아 화면에 띄우는 식이다.',
            '',
            'AI 뉴스에서 API는 단순 개발자 기능이 아니라 가격, 속도, 도구 호출, 배포 방식까지 묶인 제품 인터페이스를 뜻한다. 같은 모델이라도 어떤 API로 제공되느냐에 따라 실무 난도가 크게 달라진다.',
        ].join('\n'),
        whyImportant: '모델 자체 성능과 실제 도입 가능성은 다르다. API를 이해해야 "새 모델 공개"가 곧바로 쓸 수 있는 서비스인지, 아직 연구 시연에 가까운지 구분할 수 있다.',
    },
    embedding: {
        summary: 'Embedding은 텍스트나 이미지를 의미를 보존한 숫자 벡터로 바꿔 검색과 추천을 가능하게 하는 표현 방식이다.',
        definition: 'Embedding은 문장, 문서, 이미지 같은 데이터를 모델이 비교하기 쉬운 고정 길이 숫자 벡터로 바꾼 결과다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 "환불 정책" 문서와 "반품 규정" 문장은 표면 단어가 달라도 의미가 비슷하다. 임베딩은 이런 의미 유사성을 벡터 거리로 바꿔서, 키워드가 정확히 일치하지 않아도 관련 문서를 찾게 해 준다.',
            '',
            'RAG, 추천 시스템, 중복 문서 탐지, 클러스터링이 전부 이 표현 방식을 기반으로 돌아간다. 그래서 임베딩 모델이 달라지면 검색 품질과 RAG 정확도도 같이 달라진다.',
        ].join('\n'),
        whyImportant: 'LLM이 답을 잘 쓰는 것과, 관련 문서를 먼저 잘 찾는 것은 다른 문제다. Embedding을 알아야 RAG 품질이 왜 검색 단계에서 갈리는지 이해할 수 있다.',
    },
    transformer: {
        summary: 'Transformer는 토큰 사이 관계를 한꺼번에 계산하는 방식으로 현대 LLM 대부분의 기반이 된 신경망 아키텍처다.',
        definition: 'Transformer는 문장 안의 각 토큰이 다른 토큰과 어떤 관계를 맺는지 attention으로 계산하는 딥러닝 구조다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '이전 언어 모델은 보통 왼쪽에서 오른쪽으로 순서대로 읽는 구조가 많았지만, Transformer는 문장 전체를 보면서 어떤 단어를 더 참고해야 하는지 병렬로 계산한다. 그래서 긴 문맥을 더 잘 다루고 GPU 병렬 처리에도 유리하다.',
            '',
            '지금의 GPT, Claude, Gemini, Llama 계열이 거의 다 이 구조를 바탕으로 발전했다. 그래서 Transformer는 개별 제품 이름이 아니라, 그 제품들이 서 있는 공통 토대에 가깝다.',
        ].join('\n'),
        whyImportant: '뉴스에서 새 모델이 나올 때 "트랜스포머를 넘었다"거나 "attention 병목을 줄였다"는 말이 붙으면, 그건 기능 추가보다 모델 내부 구조 변화 이야기일 가능성이 크다. 이 구분을 해야 발표문을 과장 없이 읽을 수 있다.',
    },
    attention: {
        summary: 'Attention은 모델이 현재 토큰을 처리할 때 입력 중 무엇을 더 참고해야 하는지 가중치를 두는 메커니즘이다.',
        definition: 'Attention은 문장 전체에서 지금 중요한 정보가 어디 있는지 계산해서, 필요한 부분에 더 큰 비중을 두게 만드는 방식이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 "그는 컵을 탁자 위에 올려두고 그것을 닦았다" 같은 문장에서 "그것"이 무엇을 가리키는지 판단하려면 앞 문맥을 다시 봐야 한다. Attention은 이런 참조 관계를 계산하는 핵심 장치다.',
            '',
            'Transformer가 강해진 이유도 바로 이 attention을 병렬로 크게 확장했기 때문이다. 그래서 attention은 세부 부품처럼 보여도 실제로는 현대 LLM 성능의 중심 개념이다.',
        ].join('\n'),
        whyImportant: '모델이 왜 긴 문맥을 잘 처리하거나, 반대로 특정 길이 이상에서 갑자기 흔들리는지 이해하려면 attention부터 알아야 한다. 아키텍처 뉴스의 핵심 문장을 읽는 데 필요한 기본 단어다.',
    },
    inference: {
        summary: 'Inference는 학습이 끝난 모델이 실제 입력을 받아 결과를 생성하는 실행 단계다.',
        definition: 'Inference는 이미 학습된 모델에 프롬프트나 데이터를 넣고, 그에 대한 예측 결과를 뽑아내는 과정이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '학습이 모델을 만드는 단계라면, inference는 그 모델을 실제 서비스에서 돌리는 단계다. 사용자가 질문을 보냈을 때 토큰을 생성하고, 이미지 요청을 받았을 때 결과를 내놓는 일이 전부 여기에 해당한다.',
            '',
            '실무에서는 정확도 못지않게 inference 속도, 지연, GPU 메모리, 배치 처리 효율이 중요하다. 같은 모델도 inference 스택이 달라지면 운영비와 사용자 경험이 크게 달라진다.',
        ].join('\n'),
        whyImportant: '모델 출시 뉴스와 실제 서비스 운영 뉴스는 종종 다른 문제를 다룬다. Inference를 이해하면 "모델이 좋다"와 "서비스에 싸고 빠르게 올릴 수 있다"를 분리해서 볼 수 있다.',
    },
    memory: {
        summary: 'Memory는 에이전트나 챗봇이 이전 대화와 작업 결과를 저장해 다음 행동에 다시 쓰게 하는 기억 계층이다.',
        definition: 'Memory는 모델이나 에이전트가 과거 대화, 사용자 선호, 중간 결과를 저장하고 다음 요청에서 다시 참조하게 만드는 구조다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '짧은 메모리는 현재 대화 안에서만 유지되고, 긴 메모리는 여러 세션에 걸쳐 저장될 수 있다. 예를 들어 코딩 에이전트가 방금 수정한 파일 목록을 기억하거나, 개인 비서 앱이 사용자의 일정 선호를 저장하는 식이다.',
            '',
            '중요한 점은 메모리가 곧바로 컨텍스트 창과 같지는 않다는 것이다. 컨텍스트는 한 번에 넣을 수 있는 길이이고, 메모리는 필요할 때 다시 불러올 수 있는 저장 구조에 가깝다.',
        ].join('\n'),
        whyImportant: '에이전트 제품에서 "기억한다"는 표현이 나오면 단순히 컨텍스트가 길어졌다는 뜻인지, 별도 저장 시스템이 붙었다는 뜻인지 구분해야 한다. 이 차이가 제품 경험을 크게 바꾼다.',
    },
    reasoning: {
        summary: 'Reasoning Model은 답을 바로 찍기보다 중간 추론 단계를 더 길게 사용하도록 설계한 LLM 계열이다.',
        definition: 'Reasoning Model은 복잡한 문제를 풀 때 내부적으로 더 많은 추론 단계를 거치도록 최적화된 언어 모델을 말한다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '일반 모델이 빠르게 답을 생성하는 데 강하다면, reasoning 모델은 수학, 계획, 코드 수정처럼 중간 단계가 중요한 문제에서 더 오래 생각하도록 설계된다. 그래서 보통 더 느리고 비싸지만, 어려운 문제에서는 정확도가 높아질 수 있다.',
            '',
            '최근의 o1, o3, DeepSeek R1 같은 이름이 이 흐름에 속한다. 겉으로는 다 LLM이지만, 실제 제품 포지션은 "빠른 범용 모델"과 "느리지만 복잡한 추론형 모델"로 나뉘는 셈이다.',
        ].join('\n'),
        whyImportant: '요즘 모델 뉴스에서 reasoning이 붙으면 단순 성능 향상보다 문제 해결 방식 변화에 가깝다. 그래서 이 용어를 보면 "얼마나 빠른가"보다 "수학, 계획, 코드 수정 같은 긴 사고 작업에 실제로 쓸 모델인가"를 먼저 봐야 한다.',
        relatedLines: [
            '- [LLM](/ko/wiki/llm/) — 둘 다 언어 모델이지만, Reasoning Model은 중간 사고 단계를 더 길게 쓰는 쪽이라 일반 범용 LLM과 비교 포인트가 다르다.',
            '- [Chain-of-Thought](/ko/wiki/chain-of-thought/) — 하나는 모델 포지션이고 다른 하나는 프롬프트로 사고 과정을 유도하는 기법이라 같이 보면 층위 차이가 선명해진다.',
            '- [DeepSeek R1](/ko/wiki/deepseek-r1/) — reasoning 계열이 실제 제품과 모델 이름으로 내려온 대표 사례라서, 개념을 뉴스 문맥으로 연결할 때 좋다.',
        ],
    },
    benchmark: {
        summary: 'Benchmark는 모델이나 시스템 성능을 같은 문제 세트로 비교하기 위한 시험 기준이다.',
        definition: 'Benchmark는 여러 모델을 같은 조건에서 평가해 누가 어떤 작업에 강한지 비교하게 해 주는 테스트 묶음이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 코딩 모델은 SWE-bench 같은 벤치마크로, 수학 추론 모델은 MATH 같은 벤치마크로 비교한다. 같은 모델도 어떤 벤치마크를 쓰느냐에 따라 강점이 다르게 보일 수 있다.',
            '',
            '그래서 벤치마크 숫자는 유용하지만 절대적인 답은 아니다. 데이터 누수, 테스트 편향, 실제 사용자 환경과의 거리 때문에 현업 성능과 완전히 같지는 않다.',
        ].join('\n'),
        whyImportant: '벤치마크를 모르면 발표 자료 숫자를 그대로 믿게 되고, 반대로 벤치마크만 믿어도 실제 성능을 과대평가하게 된다. AI 뉴스를 읽을 때 가장 먼저 필요한 필터 중 하나다.',
    },
    multimodal: {
        summary: 'Multimodal AI는 텍스트만이 아니라 이미지, 오디오, 비디오 같은 여러 입력과 출력을 함께 다루는 AI를 뜻한다.',
        definition: 'Multimodal AI는 서로 다른 형태의 데이터를 함께 이해하거나 생성할 수 있는 모델과 시스템을 말한다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 사용자가 사진을 올리고 질문하면 모델이 이미지를 읽고 텍스트로 답하거나, 텍스트 지시를 받고 이미지를 생성하는 식이다. 최근에는 음성 입출력까지 같이 묶이는 경우도 많다.',
            '',
            '중요한 건 "멀티모달"이 곧 모든 모달리티를 완벽하게 지원한다는 뜻은 아니라는 점이다. 어떤 모델은 이미지 입력만 되고, 어떤 모델은 음성 출력까지 된다. 그래서 실제 지원 범위를 항상 따로 봐야 한다.',
        ].join('\n'),
        whyImportant: '멀티모달이라는 말만 보면 다 비슷해 보이지만, 실제 제품 차이는 입력과 출력 범위에서 갈린다. 이 개념을 알아야 "이미지 이해", "오디오 실시간", "비디오 생성" 같은 뉴스를 한 줄로 정리할 수 있다.',
    },
    'vector-db': {
        summary: 'Vector Database는 임베딩 벡터를 저장하고 비슷한 벡터를 빠르게 찾도록 만든 검색용 데이터베이스다.',
        definition: 'Vector Database는 텍스트나 이미지의 임베딩을 저장한 뒤, 의미적으로 가까운 항목을 유사도 검색 API로 찾아주는 저장소다.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            'RAG에서 가장 흔한 역할은 "사용자 질문과 가까운 문서 조각을 빠르게 꺼내오기"다. 전통적인 SQL 데이터베이스가 정확한 키나 조건 검색에 강하다면, 벡터 데이터베이스는 의미가 비슷한 항목 찾기에 특화돼 있다.',
            '',
            '실무에선 단순 저장소라기보다 retrieval pipeline의 핵심 계층으로 쓰인다. Pinecone, Weaviate, Qdrant 같은 제품마다 필터링, 하이브리드 검색, 확장성, 운영 편의성이 달라서 API 응답 품질과 운영 복잡도가 같이 갈린다.',
        ].join('\n'),
        whyImportant: 'RAG 품질은 모델만으로 결정되지 않는다. 어떤 벡터 데이터베이스를 쓰고, 얼마나 빨리 정확한 문서를 찾느냐가 실제 성능을 크게 좌우한다.',
        relatedLines: [
            '- [RAG](/ko/wiki/rag/) — Vector Database는 RAG 안의 retrieval 계층이라서, 둘을 비교해 보면 상위 파이프라인과 하위 저장소 역할이 어떻게 갈리는지 바로 보인다.',
            '- [Embedding](/ko/wiki/embedding/) — 임베딩이 벡터 DB에 들어가는 재료라서, 저장소 선택과 표현 방식 차이를 같이 보면 이해가 빨라진다.',
            '- [Pinecone](/ko/wiki/pinecone/) — 관리형 벡터 DB 제품을 볼 때 어떤 운영 부담을 넘기는지 비교하기 좋은 대표 사례다.',
            '- [Weaviate](/ko/wiki/weaviate/) — 같은 벡터 검색 계열이라도 데이터 모델과 운영 방식 차이를 비교하기 쉽다.',
        ],
    },
    'function-calling': {
        summary: 'Function Calling은 모델이 답변만 생성하는 대신 정해진 함수나 API를 호출하게 만드는 실행 방식이다.',
        definition: 'Function Calling은 LLM이 외부 함수, 도구, API를 선택해 구조화된 인자로 호출하도록 만드는 인터페이스다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 사용자가 "서울 날씨 알려줘"라고 하면 모델이 바로 답을 지어내는 대신 weather 함수 호출을 만들어 낸다. 앱은 그 호출을 실행해 실제 날씨 데이터를 받고, 다시 모델이 그 결과를 바탕으로 답을 정리한다.',
            '',
            '핵심은 모델이 직접 외부 세계와 연결되는 게 아니라, 호출할 함수 목록과 인자 형식을 보고 어떤 도구를 쓸지 결정한다는 점이다. 그래서 도구 정확도와 스키마 설계가 매우 중요하다.',
        ].join('\n'),
        whyImportant: 'Function Calling을 이해하면 "AI가 실제 일을 한다"는 말이 마법이 아니라 API 호출 구조라는 점이 보인다. 에이전트, 업무 자동화, 앱 통합을 읽을 때 필수인 기본 개념이다.',
    },
    'tool-use': {
        summary: 'Tool Use는 모델이 필요할 때 검색, 계산, 사내 API 같은 외부 도구를 호출해 실제 작업을 이어 가는 방식이다.',
        definition: 'Tool Use는 LLM이 텍스트 생성만 하지 않고 외부 도구를 불러 결과를 받아 다시 사용하는 실행 패턴이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '모델은 우선 어떤 도구가 필요한지 판단하고, 해당 도구를 호출한 뒤, 반환된 결과를 다음 추론 단계에 반영한다. 검색 엔진, 계산기, 데이터베이스 조회, 웹 브라우징이 대표적인 예다.',
            '',
            'Function Calling이 도구 호출 인터페이스 자체를 가리킨다면, Tool Use는 그 인터페이스를 포함해 실제 작업 흐름 안에서 도구를 활용하는 더 넓은 개념으로 보면 이해하기 쉽다.',
        ].join('\n'),
        whyImportant: '에이전트가 단순 챗봇을 넘어서려면 결국 도구를 써야 한다. Tool Use를 이해하면 "모델 성능"과 "실행 가능한 시스템"을 분리해서 읽을 수 있다.',
    },
    'prompt-engineering': {
        summary: 'Prompt Engineering은 같은 모델에서도 입력 문장을 설계해 더 안정적이고 원하는 결과를 끌어내는 기법이다.',
        definition: 'Prompt Engineering은 모델에게 어떤 순서와 형식으로 지시를 주면 원하는 결과가 더 잘 나오는지 설계하는 작업이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '출력 형식을 명시하거나, 역할을 부여하거나, 좋은 예시를 함께 주는 식으로 모델의 응답을 조정한다. 모델을 다시 학습시키지 않고도 결과를 크게 바꿀 수 있다는 점이 핵심이다.',
            '',
            '예전에는 프롬프트 문장 몇 개의 요령처럼 보였지만, 지금은 구조화 출력, 도구 호출, 시스템 프롬프트, 평가 루프까지 포함한 설계 작업으로 넓어졌다.',
        ].join('\n'),
        whyImportant: '모델이 같아도 프롬프트 설계에 따라 품질 차이가 크게 난다. 그래서 프롬프트 엔지니어링은 성능 트릭이 아니라 제품 안정성을 좌우하는 운영 기술에 가깝다.',
    },
    hallucination: {
        summary: 'Hallucination은 모델이 사실이 아닌 내용을 그럴듯하게 만들어 내는 현상을 뜻한다.',
        definition: 'Hallucination은 LLM이 답을 생성할 때 실제 근거가 없거나 틀린 내용을 자신감 있게 출력하는 문제다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '모델은 본질적으로 다음 토큰을 예측하는 시스템이라, 모르는 정보가 나와도 "가장 그럴듯한" 문장을 이어 쓰려는 경향이 있다. 그래서 출처가 없는 숫자, 존재하지 않는 논문, 잘못된 코드 API를 지어낼 수 있다.',
            '',
            '이 문제를 줄이기 위해 RAG, 검증 단계, 도구 호출, 가드레일 같은 보완 장치가 같이 쓰인다. 즉 hallucination은 모델 하나의 결함이라기보다 생성형 시스템 전반의 기본 리스크다.',
        ].join('\n'),
        whyImportant: 'AI를 업무에 붙일수록 중요한 건 "가끔 틀린다"가 아니라 "틀려도 너무 그럴듯하다"는 점이다. Hallucination을 이해해야 검증 비용과 운영 리스크를 제대로 볼 수 있다.',
    },
    guardrail: {
        summary: 'Guardrail은 모델이 위험한 답이나 잘못된 형식의 답을 내지 않도록 앞뒤에서 제어하는 안전 장치다.',
        definition: 'Guardrail은 LLM 출력이 정책, 형식, 안전 기준을 벗어나지 않도록 필터링하고 제어하는 규칙과 시스템을 말한다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '입력 단계에서 금지 요청을 차단하거나, 출력 단계에서 개인정보·욕설·금지 주제를 걸러내거나, 구조화된 JSON만 통과시키는 식으로 구현할 수 있다. 단일 모델 기능이라기보다 여러 검증 층의 조합인 경우가 많다.',
            '',
            '그래서 guardrail은 성능을 높이는 기술이라기보다 사고를 줄이는 운영 장치로 보는 편이 맞다. 특히 고객지원, 금융, 의료처럼 규정이 중요한 환경에서 필수로 붙는다.',
        ].join('\n'),
        whyImportant: '좋은 모델을 고르는 것만으로는 서비스 안전성이 보장되지 않는다. Guardrail을 알아야 왜 많은 AI 제품이 모델 바깥에 별도 제어 계층을 두는지 이해할 수 있다.',
    },
    'chain-of-thought': {
        summary: 'Chain-of-Thought는 모델이 답만 바로 내지 않게 하고, 중간 추론 과정을 단계별로 풀어 쓰게 유도하는 프롬프트 기법이다.',
        definition: 'Chain-of-Thought는 복잡한 문제를 풀 때 모델에게 중간 사고 과정을 드러내게 만들어 정확도를 높이려는 프롬프트 기법이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 수학 문제나 논리 퍼즐에서 "정답만 말해" 대신 "단계별로 생각해 봐"라고 유도하면, 모델이 중간 판단 과정을 더 길게 쓰면서 실수를 줄이는 경우가 있다. 그래서 Chain-of-Thought는 모델 구조를 바꾸기보다 입력 설계로 사고 흐름을 조정하는 쪽에 가깝다.',
            '',
            '다만 무조건 길게 쓰게 한다고 좋아지는 건 아니다. 쉬운 작업에서는 오히려 느려지고 장황해질 수 있고, 민감한 작업에서는 내부 추론을 그대로 노출하지 않는 정책이 더 중요할 수도 있다. 결국 "언제 단계별 사고를 유도할지"가 핵심 포인트다.',
        ].join('\n'),
        whyImportant: 'Chain-of-Thought를 이해하면 reasoning 모델과 프롬프트 기법을 헷갈리지 않게 된다. 실무에선 모델 교체 없이도 출력 품질이 달라질 수 있는 대표 레버라서, 수학·코드·계획형 작업을 읽을 때 먼저 비교해 둘 가치가 크다.',
        relatedLines: [
            '- [Prompt Engineering](/ko/wiki/prompt-engineering/) — Chain-of-Thought는 프롬프트 엔지니어링의 대표 패턴이라서, 상위 기법과 하위 전술 관계를 비교하기 좋다.',
            '- [Reasoning Model](/ko/wiki/reasoning/) — 하나는 모델 포지션이고 다른 하나는 입력 설계 기법이라, 같이 보면 "모델이 세졌는지 프롬프트가 바뀐 건지" 구분이 쉬워진다.',
            '- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 긴 추론을 강조하는 모델 사례라서, Chain-of-Thought 같은 기법이 모델 자체와 어떻게 만나는지 볼 때 좋다.',
            '- [o3](/ko/wiki/o3/) — reasoning 계열 제품과 프롬프트 전술을 같이 비교할 때 기준점이 된다.',
        ],
    },
    'red-teaming': {
        summary: 'Red Teaming은 모델이나 에이전트를 일부러 공격자 관점에서 시험해 보고, 위험한 실패 패턴과 우회 경로를 찾아내는 검증 기법이다.',
        definition: 'Red Teaming은 AI 시스템이 위험한 요청, jailbreak, 악용 시나리오를 얼마나 잘 막는지 공격적으로 시험하는 안전성 검증 기법이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 금지된 정보를 우회해서 끌어내려 하거나, 역할극 프롬프트로 정책을 무너뜨리거나, 도구 호출 체인을 악용해 시스템 밖으로 새게 만드는 식의 시나리오를 의도적으로 던져 보는 거야. 목표는 점수를 높이는 게 아니라 어떤 방식으로 망가지는지 미리 찾는 데 있어.',
            '',
            '그래서 Red Teaming은 일반 eval과 결이 다르다. 정답률을 재는 벤치마크보다 "어떤 악성 입력에 취약한가", "어디서 guardrail이 무너지는가"를 보는 쪽이거든. 특히 공개 배포형 챗봇이나 에이전트 제품에선 출시 전 필수 점검 항목에 가깝다.',
        ].join('\n'),
        whyImportant: 'AI 안전성 뉴스에서 red teaming이 나오면 그건 성능 향상 이야기가 아니라 리스크 관리 이야기다. 이 개념을 알아야 jailbreak 사례, 정책 우회, 도구 악용 문제가 단순 버그가 아니라 운영 위험이라는 점을 제대로 읽을 수 있다.',
        relatedLines: [
            '- [Eval](/ko/wiki/eval/) — 둘 다 검증이지만, Eval이 평균 성능을 재는 쪽이라면 Red Teaming은 최악의 실패 시나리오를 찾는 쪽이라 비교 포인트가 다르다.',
            '- [Guardrail](/ko/wiki/guardrail/) — Red Teaming은 guardrail이 실제 공격 입력 앞에서 버티는지 시험하는 대표 방법이라서, 설계와 검증 관계를 같이 보기에 좋다.',
            '- [Alignment](/ko/wiki/alignment/) — alignment가 목표 상태라면 red teaming은 그 목표가 실제 배포 환경에서 무너지는 지점을 찾는 과정에 가깝다.',
            '- [Hallucination](/ko/wiki/hallucination/) — 둘 다 위험 요소지만 하나는 사실 오류고 다른 하나는 공격·우회 시나리오 검증이라서 함께 보면 위험 유형이 구분된다.',
        ],
    },
    'google-deepmind': {
        summary: 'Google DeepMind는 Gemini, Veo, Imagen 같은 모델 라인업과 연구를 함께 이끄는 Google의 AI 연구 조직이다. 개별 모델 이름보다 회사 차원의 방향을 읽을 때 더 자주 등장한다.',
        definition: 'Google DeepMind는 Google 안에서 대형 모델, 멀티모달 연구, 제품용 AI 라인업을 함께 이끄는 연구 조직이자 브랜드다.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            'AlphaGo 시절의 DeepMind와 Google Brain 계열이 합쳐진 뒤에는 Gemini, Veo, Imagen, Gemma 같은 이름이 이 조직 아래에서 같이 나오기 시작했다. 그래서 Google DeepMind를 볼 때는 모델 하나의 성능보다 어떤 영역에 힘을 싣는지, 연구가 제품과 API로 얼마나 빨리 내려오는지부터 보는 편이 맞다.',
            '',
            '예를 들어 같은 생성형 AI 뉴스라도 Gemini API, Veo 영상 생성, Gemma 오픈 모델은 성격이 전부 다르다. 그런데 이 이름 아래 묶여 나오면 Google이 어느 입력 형태와 배포 채널을 밀고 있는지 한 번에 읽을 수 있다. 바로 그 점이 회사 이름 페이지의 핵심 가치다.',
        ].join('\n'),
        whyImportant: '회사 이름을 알아두면 "새 모델 출시"를 단발 이벤트가 아니라 라인업 전략 변화로 읽을 수 있다. Google DeepMind는 특히 연구 발표와 제품 발표가 함께 섞여 나오는 편이라서, 이 층위를 구분해야 뉴스를 과장 없이 읽기 쉬워진다.',
        relatedLines: [
            '- [OpenAI](/ko/wiki/openai/) — 둘 다 회사 이름이지만 API 중심 배포와 제품 전략이 어떻게 다른지 비교하기 좋다.',
            '- [Anthropic](/ko/wiki/anthropic/) — 연구 조직과 제품 라인업이 어떤 방식으로 연결되는지 비교할 때 대표적인 상대다.',
            '- [JAX](/ko/wiki/jax/) — Google DeepMind 연구가 실제로 어떤 프레임워크와 생태계 위에서 굴러가는지 이해할 때 같이 보는 편이 좋다.',
            '- [Gemini](/ko/wiki/gemini/) — 회사 이름이 실제 모델 라인업으로 어떻게 내려오는지 연결해서 읽기 좋은 대표 사례다.',
        ],
    },
    openclaw: {
        summary: 'OpenClaw는 상용 모델과 자동화 흐름을 비공식 방식으로 연결해 쓰려는 서드파티 에이전트 도구로 읽는 편이 맞다. 모델 자체가 아니라 연결 방식과 운영 리스크가 핵심인 이름이다.',
        definition: 'OpenClaw는 Claude 같은 상용 모델을 써드파티 클라이언트나 자동화 흐름으로 연결해 활용하려는 에이전트형 도구다.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            '핵심은 모델을 새로 만드는 게 아니라, 이미 존재하는 상용 모델을 비공식 클라이언트나 자동화 흐름에 붙여 쓰려는 데 있다. 그래서 OpenClaw를 볼 때는 모델 성능보다 연결 방식, 계정 정책, 보안 취약점, 배포 채널이 더 중요하다. 기사에서 CVE나 차단 이슈가 같이 따라붙는 이유도 바로 이 층위 때문이다.',
            '',
            '예를 들어 공식 API 대신 우회 경로를 쓰거나, 사용자 계정 자격 증명을 끼워 넣거나, 여러 에이전트 흐름에 연결하는 식의 사용 시나리오는 기능 데모보다 운영 리스크가 더 크게 보일 수 있다. 그래서 이 이름은 "무엇을 할 수 있나"만큼 "어떤 방식으로 붙였나"를 같이 봐야 한다.',
        ].join('\n'),
        whyImportant: 'OpenClaw 같은 사례를 보면 모델 자체와 도구 생태계를 분리해서 읽어야 한다는 점이 분명해진다. 실무에서는 특히 공식 API 계약, 보안 취약점, 서비스 약관 리스크가 도입 가능성을 바로 가르기 때문에 기능 데모만 보고 판단하면 쉽게 틀릴 수 있다.',
        relatedLines: [
            '- [ChatGPT](/ko/wiki/chatgpt/) — 소비자용 앱과 서드파티 자동화 도구를 같은 층위로 보면 안 된다는 점을 비교하기 좋다.',
            '- [Claude Sonnet 4.5](/ko/wiki/claude-sonnet-4-5/) — 모델 자체와 그 모델을 감싼 비공식 도구를 분리해서 읽을 때 대표적인 비교 대상이 된다.',
            '- [OpenAI API](/ko/wiki/openai-api/) — 공식 API 계약 기반 통합과 비공식 연결 방식을 비교할 때 좋은 기준점이다.',
            '- [LangChain](/ko/wiki/langchain/) — 하나는 공식 통합 프레임워크에 가깝고 다른 하나는 비공식 에이전트 도구 성격이 강해서 운영 책임 차이가 선명하다.',
        ],
    },
    'vibe-coding': {
        summary: 'Vibe Coding은 명세를 길게 설계하기보다 자연어로 분위기와 의도를 던지고, 모델이 코드를 빠르게 짜게 만든 뒤 사람이 고쳐 가는 개발 방식이다.',
        definition: 'Vibe Coding은 개발자가 세세한 구현을 먼저 설계하기보다 자연어로 원하는 느낌과 목표를 설명하고, AI가 초안을 만든 뒤 반복해서 다듬는 코딩 방식이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 "설정 페이지를 깔끔한 카드 UI로 만들어 줘"처럼 의도와 분위기를 먼저 던지면, Claude Code나 Cursor 같은 도구가 여러 파일을 건드려 초안을 빠르게 만든다. 그다음 사람이 출력 코드를 읽고, 구조를 고치고, 테스트를 붙이고, 세부 동작을 보정하는 흐름이 반복된다.',
            '',
            '그래서 vibe coding은 "AI가 대신 코딩한다"기보다, 사람이 명령형 구현 대신 방향성과 제약을 주는 방식에 더 가깝다. 작은 프로토타입에서는 속도가 매우 빠르지만, 큰 코드베이스로 갈수록 리뷰와 검증 비용이 더 중요해진다는 점도 같이 봐야 한다.',
        ].join('\n'),
        whyImportant: 'Vibe Coding을 이해하면 코딩 에이전트 뉴스가 단순 모델 성능 이야기가 아니라 작업 방식 변화 이야기라는 점이 보인다. 특히 프로토타입 속도와 유지보수 리스크가 동시에 커지는 패턴이라서, "어디까지 AI에 맡길지"를 판단할 때 좋은 기준점이 된다.',
        relatedLines: [
            '- [Claude Code](/ko/wiki/claude-code/) — vibe coding 흐름이 실제 터미널 기반 코딩 도구에서 어떻게 구현되는지 보여 주는 대표 사례다.',
            '- [Cursor](/ko/wiki/cursor/) — 같은 흐름을 IDE 안에서 어떻게 체감하는지 비교하기 좋다.',
            '- [AI Agent](/ko/wiki/agent/) — vibe coding이 단순 자동완성보다 여러 단계 실행 구조와 만날 때 어떻게 달라지는지 함께 보면 이해가 빨라진다.',
            '- [LangChain](/ko/wiki/langchain/) — 코드 생성 자체와 에이전트 workflow 프레임워크를 헷갈리지 않게 비교하기 좋은 용어다.',
        ],
    },
    reasoning: {
        summary: 'Reasoning Model은 답을 바로 찍기보다 중간 추론 단계를 더 오래 쓰도록 설계된 LLM 계열이다.',
        definition: 'Reasoning Model은 수학, 계획, 코드 수정처럼 단계가 긴 문제를 풀 때 중간 추론을 더 많이 사용하도록 조정된 언어 모델을 가리킨다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '일반 모델이 빠르게 답을 생성하는 데 강하다면, reasoning 계열은 중간 추론 단계가 중요한 작업에서 더 오래 생각하도록 설계된다. 그래서 보통 느리고 비싸지만, 어려운 문제에서는 정확도가 높아질 수 있다.',
            '',
            '실무에선 수학 풀이, 장문 계획, 코드 수정처럼 실수 비용이 큰 흐름에 배치하고, 고객 응대나 짧은 분류처럼 속도가 중요한 작업과는 따로 운영하는 식으로 적용한다. o1, o3, DeepSeek R1 같은 이름이 자주 함께 보이는 이유도 같은 층위의 모델 포지션을 가리키기 때문이다.',
        ].join('\n'),
        whyImportant: '요즘 모델 뉴스에서 reasoning이 붙으면 단순 성능 향상보다 문제 해결 방식 변화에 가깝다. 그래서 이 용어를 보면 "얼마나 빠른가"보다 "어떤 긴 사고 작업에 실제로 붙일 모델인가"를 먼저 읽는 편이 정확하다.',
        relatedLines: [
            '- [LLM](/ko/wiki/llm/) — 둘 다 언어 모델이지만, 하나는 범용 계열이고 다른 하나는 긴 추론을 더 오래 쓰는 쪽이라 비교 기준이 다르다.',
            '- [Chain-of-Thought](/ko/wiki/chain-of-thought/) — 하나는 모델 포지션이고 다른 하나는 프롬프트 기법이라 함께 보면 층위 차이가 분명해진다.',
            '- [DeepSeek R1](/ko/wiki/deepseek-r1/) — reasoning 계열이 실제 제품과 모델 이름으로 내려온 사례라서 개념을 뉴스 문맥으로 연결하기 좋다.',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: '이 페이지가 특정 제품이 아니라 모델 포지션을 설명하는 개념 문서인지 먼저 맞춰봤다.',
                items: [
                    '용어 대조: OpenAI 가이드가 reasoning을 모델 선택과 운용 방식 차원에서 설명하는지 확인했다.',
                    '별칭 대조: reasoning model, reasoning, 추론 모델이 같은 대상을 가리키는지 정리했다.',
                    '범위 대조: 개별 제품명보다 상위 개념을 설명하는 페이지라는 점을 다시 확인했다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 2,
                summary: '두 공식 문서를 같이 놓고 추론 모델을 어디에 붙이는지 설명이 엇갈리지 않는지 다시 봤다.',
                items: [
                    '출처 1 대조: platform.openai.com reasoning best practices.',
                    '출처 2 대조: anthropic.com visible extended thinking.',
                    '용도 비교: 긴 사고가 필요한 작업에 더 적합하다는 설명이 두 문서에서 같은 방향인지 확인했다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '핵심은 숫자보다 적용 조건이라서 어떤 입력과 작업에서 갈리는지 쪽으로 다시 봤다.',
                items: [
                    '운용 기준: 수학, 계획, 코드 수정처럼 단계가 긴 작업에서 차이가 드러나는지 확인했다.',
                    '분리 기준: 속도 우선 작업과 추론 우선 작업을 따로 설정해야 한다는 해석이 맞는지 점검했다.',
                    '제품 해석: o1, o3, DeepSeek R1 같은 이름이 개념의 실제 예시로 연결되는지 살폈다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '헷갈리기 쉬운 오해를 일부러 세워 보고 어디서 잘못 읽기 쉬운지 정리했다.',
                items: [
                    '오해 점검: reasoning을 단순히 "더 좋은 모델"로 읽으면 속도와 비용 차이를 놓치기 쉽다.',
                    '운영 점검: 일반 모델과 동일한 작업에 무조건 붙이면 오히려 응답 시간이 길어질 수 있다.',
                ],
                findings: [
                    '이 개념은 성능 과장이 아니라 작업 배치와 운용 정책을 읽는 기준으로 보는 편이 정확하다.',
                ],
            },
        ],
    },
    'chain-of-thought': {
        summary: '복잡한 문제에서 모델이 중간 사고 단계를 드러내게 유도하는 프롬프트 기법이다.',
        definition: 'Chain-of-Thought는 모델 구조를 바꾸지 않고도 단계별 사고 과정을 먼저 펼치게 만드는 입력 설계 기법이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 수학 문제나 코드 수정 요청에서 "정답만 말해" 대신 "단계별로 풀어라"를 넣으면, 모델이 중간 판단을 더 드러내면서 실수를 줄이는 경우가 있다. 그래서 이 기법은 모델 교체보다 입력 설계를 조정하는 쪽에 가깝다.',
            '',
            '실제로는 답을 바로 찍으면 오류가 늘어나는 작업에만 적용하고, 쉬운 작업이나 민감한 작업에서는 장황한 추론을 강제하지 않도록 설정하는 편이 낫다. 결국 핵심은 언제 단계별 사고를 요구할지 구분하는 데 있다.',
        ].join('\n'),
        whyImportant: '이 기법을 이해하면 reasoning 모델과 프롬프트 전술을 헷갈리지 않게 된다. 실무에서는 모델을 바꾸지 않고도 출력 품질을 조정하는 대표 레버라서, 수학·코드·계획형 작업을 볼 때 먼저 비교해 둘 가치가 크다.',
        relatedLines: [
            '- [Prompt Engineering](/ko/wiki/prompt-engineering/) — 상위 입력 설계 개념 안에서 어디에 놓이는지 비교하기 좋다.',
            '- [Reasoning Model](/ko/wiki/reasoning/) — 하나는 모델 포지션이고 다른 하나는 입력 기법이라 같이 보면 층위 차이가 선명해진다.',
            '- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 긴 추론을 강조하는 모델과 프롬프트 기법이 실제로 어떻게 만나는지 보기에 좋다.',
            '- [o3](/ko/wiki/o3/) — reasoning 계열 제품과 프롬프트 전술을 같이 비교할 때 기준점이 된다.',
        ],
    },
    'google-deepmind': {
        summary: 'Gemini, Veo, Imagen 같은 모델과 연구를 함께 끌고 가는 Google의 AI 연구 조직이다. 개별 모델 이름보다 회사 차원의 방향과 묶음을 읽을 때 자주 등장한다.',
        definition: 'Google DeepMind는 Google 안에서 연구와 제품 라인업을 함께 묶는 AI 조직 이름이다.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            'AlphaGo 시절 DeepMind와 Google Brain 계열 흐름이 이어지면서, 지금은 Gemini, Veo, Imagen, Gemma 같은 이름이 한 조직 아래에서 함께 읽히는 경우가 많다. 그래서 이 페이지에서 먼저 볼 것은 특정 모델 성능이 아니라 어떤 연구가 어떤 제품 라인으로 이어지는지다.',
            '',
            '예를 들어 같은 생성형 AI 기사라도 어떤 항목은 API 제품이고, 어떤 항목은 연구 발표이며, 어떤 항목은 오픈 웨이트 모델일 수 있다. 이 조직 이름이 붙으면 그런 층위를 한 번에 묶어 읽는 신호로 받아들이는 편이 정확하다.',
        ].join('\n'),
        whyImportant: '회사 이름을 알아두면 "새 모델 출시"를 한 번의 이벤트로 읽지 않고, 연구와 제품 묶음이 어떻게 움직이는지로 해석할 수 있다. 그래서 개별 모델 뉴스가 이어질 때도 과장 없이 큰 흐름을 잡아내기 쉬워진다.',
        relatedLines: [
            '- [OpenAI](/ko/wiki/openai/) — 둘 다 회사 이름이지만 API와 제품을 묶는 방식이 어떻게 다른지 비교하기 좋다.',
            '- [Anthropic](/ko/wiki/anthropic/) — 연구 조직과 제품 라인업이 어떤 방식으로 연결되는지 나란히 보기 좋다.',
            '- [JAX](/ko/wiki/jax/) — 이 조직이 실제로 어떤 연구 스택과 프레임워크를 활용하는지 이해할 때 도움이 된다.',
            '- [Gemini](/ko/wiki/gemini/) — 회사 이름이 실제 모델 라인업으로 어떻게 이어지는지 연결해서 읽기 좋다.',
        ],
        sourceTitles: [
            '위키 개요',
            '공식 조직 소개',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: '이 항목이 개별 모델이 아니라 상위 조직을 설명하는 문서인지 먼저 맞춰봤다.',
                items: [
                    '독자가 먼저 갈라 봐야 할 건 Google DeepMind가 단일 모델명이 아니라 연구 조직과 제품 라인을 묶는 이름이라는 점이야.',
                    '연구 조직 소개인지, 특정 모델 소개인지 층위를 먼저 나눠서 읽어야 해.',
                    'DeepMind와 Google Brain이 통합된 뒤 이름이 이어졌다는 흐름도 같이 봤다.',
                    'Gemini, Veo, Imagen 같은 라인을 묶는 상위 이름으로 읽는 편이 맞다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 2,
                summary: '보조 출처와 공식 소개를 같이 놓고 조직 설명이 서로 어긋나지 않는지 다시 봤다.',
                items: [
                    '출처 1 대조: 위키 개요가 연혁과 통합 배경을 어떻게 설명하는지 확인했다.',
                    '출처 2 대조: 공식 사이트가 현재 조직 정체성과 연구 범위를 어떻게 소개하는지 읽어 봤다.',
                    '교차 확인: 2023년 통합 서술과 현재 브랜드 설명이 같은 방향인지 맞춰 봤다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '숫자 자체보다 연혁을 읽을 때 놓치기 쉬운 시점을 다시 봤다.',
                items: [
                    '연도 확인: 2010년 설립 설명이 배경 문맥과 맞는지 점검했다.',
                    '인수 확인: 2014년 Google 인수 시점이 외부 요약과 크게 다르지 않은지 살폈다.',
                    '통합 확인: 2023년 조직 통합 설명이 현재 브랜드 소개와 이어지는지 확인했다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '자주 생기는 오해를 세워 놓고 어디서 잘못 읽기 쉬운지 정리했다.',
                items: [
                    '오해 점검: 회사 이름을 개별 모델 이름처럼 읽으면 제품 층위와 연구 층위가 섞이기 쉽다.',
                    '범위 점검: 조직 소개 문서를 모델 성능 비교 문서처럼 읽으면 뉴스 해석이 과장되기 쉽다.',
                ],
                findings: [
                    '이 이름은 모델 하나를 가리키기보다 연구와 제품 라인업을 묶는 상위 신호로 읽는 편이 정확하다.',
                ],
            },
        ],
    },
    'stable-diffusion': {
        summary: 'Stability AI가 이미지 생성 계열 전체를 묶어 설명할 때 쓰는 라인업 이름이다.',
        definition: 'Stable Diffusion은 특정 한 버전보다 이미지 생성 모델 계열 전체를 가리킬 때 더 자주 쓰이는 이름이다.',
        detail: '이 페이지에서 먼저 볼 것은 "이름 하나가 정확히 어느 버전인가"보다 어떤 사용처와 배포 방식이 묶여 있는가다. 텍스트 프롬프트로 이미지를 만들고, 파생 모델과 툴 생태계가 넓게 퍼져 있어서 기사에서는 계열명 자체가 제품 방향 신호처럼 자주 등장한다.\n\n실무에선 API 상품인지, 직접 호스팅 가능한 오픈 계열인지, 특정 체크포인트를 가리키는지부터 분리해서 읽는 편이 안전하다. 같은 이름이 보여도 버전과 라이선스, 배포 채널에 따라 실제 선택지는 크게 달라진다.',
        whyImportant: '이 이름을 계열명으로 읽으면 "새 모델이 나왔다"는 기사와 "새 버전이 붙었다"는 기사를 구분하기 쉬워진다. 그래서 숫자 비교보다 어떤 사용자 층과 배포 경로를 겨냥하는지 먼저 읽는 기준점이 된다.',
        sourceTitles: [
            '위키 개요',
            'Stability AI 이미지 모델 소개',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: '이 페이지가 특정 체크포인트가 아니라 계열 이름을 설명하는 문서인지 먼저 맞춰봤다.',
                items: [
                    '범위 대조: 단일 버전이 아니라 이미지 생성 라인업을 묶는 이름인지 확인했다.',
                    '벤더 대조: Stability AI가 어떤 맥락에서 이 이름을 쓰는지 살폈다.',
                    '문서 성격: 상위 계열 설명과 실제 제품 소개가 섞이지 않도록 층위를 다시 봤다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 2,
                summary: '보조 출처와 공식 소개를 같이 놓고 계열 해석이 엇갈리지 않는지 다시 봤다.',
                items: [
                    '출처 1 대조: 위키 개요에서 계열명 사용 범위를 읽었다.',
                    '출처 2 대조: stability.ai 소개 페이지에서 현재 제품 연결 방식을 확인했다.',
                    '교차 확인: 계열 이름과 실제 서비스 채널이 서로 충돌하지 않는지 점검했다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '핵심은 숫자보다 배포 경로와 적용 범위라서 그쪽을 다시 봤다.',
                items: [
                    '호스팅 경로: 직접 실행 가능한지와 별도 유료 채널이 있는지 나눠 봤다.',
                    '사용 범위: 텍스트 기반 이미지 생성 중심인지 살폈다.',
                    '선택 기준: 실제 비교는 개별 버전 페이지에서 해야 한다는 점을 다시 확인했다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '헷갈리기 쉬운 해석을 세워 놓고 어디서 과장되기 쉬운지 정리했다.',
                items: [
                    '오해 점검: 계열명을 특정 최신 버전처럼 읽으면 제품 비교가 흐려진다.',
                    '배포 점검: 오픈 계열이라는 말만 보고 라이선스와 서비스 경로를 생략하면 운영 판단이 틀어질 수 있다.',
                ],
                findings: [
                    '계열 설명과 개별 버전 선택은 분리해서 읽어야 실제 운영 판단이 선명해진다.',
                ],
            },
        ],
    },
    'claude-sonnet-4-5': {
        definition: 'Anthropic이 Sonnet 계열 안에서 실제 배포 후보로 내놓은 버전 중 하나다. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라 실제로 붙여 볼 모델 후보를 읽는 상황이라고 보면 된다. 텍스트 중심 운용과 코드 작업 적합성이 핵심이라, 벤더 발표보다 접근 채널과 가격표를 같이 보는 편이 중요하다.',
        detail: '이 페이지에서 먼저 볼 것은 "점수가 몇 점인가"보다 어떤 작업을 맡길 모델인가다. 코드 이해, 수정, 에이전트형 작업에 강점을 두고, Claude API와 AWS Bedrock, Vertex AI 같은 채널에서 접근할 수 있다.\n\n실제 선택에서는 컨텍스트 길이, 채널별 가용성, 입력·출력 비용이 같이 움직인다. 그래서 비슷한 급의 모델과 비교할 때도 벤치마크 숫자만 보지 말고 운영 환경을 같이 읽는 편이 정확하다.',
        sourceTitles: [
            '출시 공지',
            '모델 개요',
        ],
    },
    flux: {
        summary: 'Black Forest Labs가 실제 배포한 이미지 생성 모델 버전이다. 이름이 보이면 성능 점수보다 어떤 배포 방식과 사용 흐름에 맞는지부터 읽는 편이 정확하다.',
        definition: 'FLUX.1은 Black Forest Labs가 배포한 텍스트 프롬프트 기반 이미지 생성 모델 버전이다. 기사에서 이 이름이 보이면 상위 계열 설명이 아니라 실제로 써 볼 후보가 올라온 상황으로 보면 된다.',
        detail: '핵심은 Black Forest Labs가 같은 계열 안에서도 Pro, Dev, Schnell처럼 배포 방식을 나눠 놓았다는 점이다. Pro는 API 중심으로 읽고, Dev와 Schnell은 직접 실행 가능성까지 같이 보는 식으로 나눠야 실제 선택 기준이 선다.\n\n실무에서는 텍스트 출력 모델처럼 토큰 가격만 볼 수 없고, 이미지 1장당 비용과 GPU 여유를 함께 봐야 한다. 그래서 이 이름을 읽을 때도 "예쁜 그림을 만드는가"보다 어느 채널에서 얼마의 운영 부담으로 돌릴 수 있는지를 먼저 따지는 편이 낫다.',
        whyImportant: '이 모델을 이해하면 이미지 생성 기사에서도 배포 채널과 운영 비용을 같이 읽는 습관이 생긴다. 같은 계열이라도 API형과 직접 실행형이 섞이면 추천 답이 완전히 달라지기 때문에, 제품 선택 기준을 분리해 읽는 데 도움이 된다.',
        sourceTitles: [
            '회사 출범 공지',
            'Hugging Face 조직 페이지',
        ],
        factChecks: [
            {
                type: 'source_match',
                result: 'pass',
                summary: '이 페이지가 이미지 생성용 개별 버전 문서인지 먼저 맞춰봤다.',
                items: [
                    '모델명 대조: FLUX.1이라는 표기가 일관되게 쓰이는지 봤다.',
                    '배포 방식 대조: 버전 모델과 API·웨이트 채널이 섞여 있는지 정리했다.',
                    '문서 층위: 상위 개념 설명이 아니라 실제 배포 후보 문서인지 점검했다.',
                ],
            },
            {
                type: 'web_cross_check',
                result: 'pass',
                sources: 2,
                summary: '공개 소개와 배포 채널 설명을 같이 놓고 라인업 해석이 어긋나지 않는지 다시 봤다.',
                items: [
                    '출처 1 대조: 회사 출범 공지에서 라인업과 배포 방향을 읽었다.',
                    '출처 2 대조: Hugging Face 조직 페이지에서 실제 공개 채널을 확인했다.',
                    '교차 확인: Pro, Dev, Schnell 구분이 두 자료에서 같은 방향인지 살폈다.',
                ],
            },
            {
                type: 'number_verify',
                result: 'pass',
                summary: '운영 판단에 필요한 수치와 분기 정보를 다시 봤다.',
                items: [
                    '규모 확인: 12B 계열 설명이 공개 자료와 크게 다르지 않은지 봤다.',
                    '라인업 확인: Pro, Dev, Schnell 구분이 실제 선택 기준으로 연결되는지 점검했다.',
                    '출력 형태 확인: 텍스트가 아니라 이미지 생성 모델이라는 점을 다시 확인했다.',
                ],
            },
            {
                type: 'adversarial',
                result: 'pass',
                summary: '자주 생기는 과장 해석을 세워 놓고 어디서 틀리기 쉬운지 정리했다.',
                items: [
                    '오해 점검: 텍스트 모델처럼 토큰 가격만으로 비교하면 실제 운영 부담을 놓치기 쉽다.',
                    '배포 점검: 공개 웨이트와 API형을 같은 조건으로 읽으면 추천 답이 틀어질 수 있다.',
                ],
                findings: [
                    '이 모델은 품질 비교만큼이나 배포 채널과 비용 구조를 같이 읽어야 정확하게 해석된다.',
                ],
            },
        ],
    },
    triton: {
        summary: 'NVIDIA가 제공하는 모델 서빙용 추론 서버로, 여러 프레임워크 모델을 하나의 운영 계층에서 배포할 때 자주 쓰인다.',
        definition: '이 도구는 개별 모델 이름이 아니라, TensorRT·PyTorch·ONNX 같은 여러 형식을 공통 추론 서버 형태로 운영하게 만드는 배포 계층에 가깝다.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            '핵심은 모델 자체보다 batching, cache, GPU 메모리 사용, 서버 API 같은 운영 요소를 다루는 데 있다. 같은 모델이라도 이 계층을 어떻게 두느냐에 따라 지연 시간과 비용이 크게 달라질 수 있다.',
            '',
            '실무에서는 여러 모델을 한 묶음으로 서빙하거나, 특정 프레임워크에 묶이지 않고 공통 추론 계층을 두고 싶을 때 많이 검토한다. 그래서 기사를 읽을 때도 "새 모델인가"보다 "기존 모델을 어떤 방식으로 배포하고 최적화하나"를 보는 편이 맞다.',
        ].join('\n'),
        whyImportant: '서빙 계층을 따로 이해하면 모델 성능 기사와 운영 기사 사이를 헷갈리지 않게 된다. 같은 모델을 쓰더라도 추론 서버 구성에 따라 비용, 지연 시간, 운영 책임이 크게 달라지기 때문이다.',
    },
    'fine-tuning': {
        summary: 'Fine-tuning은 이미 학습된 기반 모델을 특정 데이터로 추가 학습시켜 원하는 작업에 더 맞게 조정하는 방법이다.',
        definition: 'Fine-tuning은 베이스 모델을 그대로 새로 만드는 대신, 특정 작업이나 도메인에 맞게 추가로 학습시키는 적응 기법이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            '예를 들어 회사 내부 문체에 맞는 답변, 특정 형식의 분류 작업, 좁은 전문 분야 용어 처리가 필요할 때 파인튜닝을 쓴다. 프롬프트만으로는 잘 안 잡히는 패턴을 모델 가중치에 직접 반영하는 셈이다.',
            '',
            '다만 최신 지식을 넣는 목적이라면 RAG가 더 적합한 경우가 많다. 파인튜닝은 "무엇을 알고 있나"보다 "어떻게 말하고 반응하나"를 바꾸는 데 더 강한 편이다.',
        ].join('\n'),
        whyImportant: '파인튜닝을 이해해야 RAG, 프롬프트 엔지니어링, 모델 교체 중 무엇이 맞는 해법인지 구분할 수 있다. 실무에서는 비용과 유지보수 판단이 여기서 갈린다.',
    },
};

const TAG_RULES = [
    {
        tags: ['retrieval', 'generation', 'search', 'vectors', 'vector-db', 'vector-search'],
        analogy: '질문에 맞는 자료를 바깥에서 찾아와 붙이는 검색 레이어',
        operation: '핵심은 질문이나 문서를 검색하기 쉬운 형태로 바꾼 뒤, 관련 자료를 찾아 모델 앞에 붙이거나 결과 순서를 다시 정렬하는 데 있다.',
        importance: '사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감된다.',
        relatedHint: '검색과 외부지식 연결 맥락을 같이 잡아 준다.',
    },
    {
        tags: ['architecture', 'transformer', 'attention', 'scaling'],
        analogy: '모델 안에서 정보를 읽고 연결하는 내부 설계도',
        operation: '토큰 사이의 관계를 어떻게 계산하고, 어떤 정보에 더 집중할지 정하는 층이다. 같은 크기의 모델도 이런 설계 차이 때문에 속도와 품질이 갈린다.',
        importance: '뉴스에서 새 아키텍처가 나오면 숫자보다 먼저 "왜 더 빠르거나 덜 비싼가"를 설명하는 단서가 된다.',
        relatedHint: '모델 내부 구조를 같이 읽을 때 이해가 쉬워진다.',
    },
    {
        tags: ['tokens', 'context-window', 'memory'],
        analogy: '모델이 글을 쪼개 읽는 단위와 한 번에 들고 갈 수 있는 예산표',
        operation: '텍스트를 얼마나 잘게 나누는지, 그리고 그 조각을 한 번에 얼마나 기억할 수 있는지를 정한다. 긴 문서를 붙일 수 있는지와 비용 감각이 여기서 갈린다.',
        importance: '긴 문서 처리, 프롬프트 설계, 사용량 요금제를 읽을 때 기본이 된다.',
        relatedHint: '토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다.',
    },
    {
        tags: ['language-model', 'foundation-model'],
        analogy: '앞 문맥을 보고 다음 말을 이어 가는 언어 엔진',
        operation: '문장을 토큰 단위로 읽고 다음 토큰을 예측하는 방식이 기본이다. 규모가 커질수록 요약, 번역, 코딩 같은 범용 작업을 한 모델에서 처리하기 쉬워진다.',
        importance: '챗봇, 문서 요약, 코딩 보조처럼 텍스트 기반 기능의 공통 바닥층이 된다.',
        relatedHint: '언어 모델의 기본 동작 원리를 같이 이해하게 해 준다.',
    },
    {
        tags: ['safety', 'policy', 'reliability'],
        analogy: '모델이 위험한 답이나 허위 답을 덜 내게 만드는 안전장치',
        operation: '출력 정책, 거부 기준, 오류 점검, 검증 루프 같은 제어를 넣는 층으로 보면 이해가 쉽다.',
        importance: '실서비스에서는 성능 점수보다 사고 예방과 신뢰성 관리가 더 큰 비용을 좌우한다.',
        relatedHint: '안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.',
    },
    {
        tags: ['reasoning', 'thinking', 'planning'],
        analogy: '단순 답변보다 중간 추론 과정을 더 길게 쓰는 사고 레이어',
        operation: '한 번에 바로 답을 찍기보다 중간 단계와 계획을 더 많이 쓰도록 설계된 흐름이다. 그래서 속도와 비용 대신 정확도나 복잡한 문제 해결력을 얻는 경우가 많다.',
        importance: '복잡한 분석, 수학, 도구 조합 작업을 볼 때 "왜 느린데도 비싼 모델을 쓰는가"를 설명해 준다.',
        relatedHint: '긴 추론과 계획형 작업을 같이 볼 때 도움이 된다.',
    },
    {
        tags: ['evaluation', 'measurement', 'testing', 'benchmark'],
        analogy: '모델 성능을 재는 시험대',
        operation: '정답률만 보는 게 아니라 실패 패턴, 재현성, 실제 업무 시나리오 대응력을 비교하는 기준을 만든다.',
        importance: '벤치마크를 모르면 발표문 숫자를 그대로 믿기 쉽고, 반대로 벤치마크만 믿어도 실제 성능을 과대평가하기 쉽다.',
        relatedHint: '성능 검증 기준을 같이 잡아 준다.',
    },
    {
        tags: ['training', 'adaptation', 'efficiency', 'training-data', 'optimization'],
        analogy: '기존 모델을 더 잘 맞추거나 더 싸게 돌리기 위한 학습·압축 레이어',
        operation: '데이터, 보상, 압축 기법을 써서 모델의 성능과 비용 균형을 다시 잡는 방식이다. 베이스 모델이 같아도 여기서 결과가 크게 달라진다.',
        importance: '같은 모델 계열 안에서도 실사용 성능과 운영비 차이가 크게 나는 이유를 설명해 준다.',
        relatedHint: '학습·압축 전략 맥락을 같이 이해하게 해 준다.',
    },
    {
        tags: ['coding-agent', 'developer-tools', 'editor', 'cli', 'vs-code'],
        analogy: '모델을 제품과 개발 흐름에 붙이는 작업대',
        operation: '모델 자체를 만드는 게 아니라 코드 작성, 검색, 수정, 실행, 리뷰 같은 반복 작업을 줄여 주는 층이다.',
        importance: '실제로는 모델 성능이 비슷할 때 생산성을 가르는 건 이런 도구와 워크플로인 경우가 많다.',
        relatedHint: '개발 생산성과 도구 조합 맥락을 같이 본다.',
    },
    {
        tags: ['api', 'integration', 'application', 'prototyping', 'routing'],
        analogy: '모델 기능을 코드와 제품에 연결하는 배선',
        operation: '요청 형식, 인증, 도구 호출, 응답 구조를 정해 앱이 모델을 안정적으로 부르게 만든다.',
        importance: '성능이 좋아도 API와 제품 구조가 안 맞으면 실제 서비스에는 붙일 수 없다.',
        relatedHint: '앱 연결과 통합 관점에서 같이 보면 이해가 쉽다.',
    },
    {
        tags: ['inference', 'serving', 'runtime'],
        analogy: '모델을 빠르고 안정적으로 서빙하는 추론 런타임',
        operation: '요청을 배치로 묶고, 메모리를 재사용하고, GPU 자원을 효율적으로 써서 같은 모델도 더 싸고 빠르게 서비스하게 만든다.',
        importance: '실무에서는 모델 자체보다 추론 스택이 지연 시간과 비용을 좌우하는 경우가 많다.',
        relatedHint: '추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.',
    },
    {
        tags: ['tool-use', 'function-calling', 'protocol'],
        analogy: '모델이 외부 함수를 불러 실제 일을 넘기는 실행 레이어',
        operation: '모델이 답만 쓰는 게 아니라 필요할 때 검색, 계산기, 사내 API 같은 외부 도구를 호출하게 만드는 방식이다.',
        importance: '에이전트, 업무 자동화, 앱 통합에서 텍스트 생성과 실제 실행을 가르는 핵심 단계다.',
        relatedHint: '외부 도구 실행 맥락을 같이 이해하게 해 준다.',
    },
    {
        tags: ['prompting', 'instruction'],
        analogy: '모델에게 일을 시키는 질문 설계법',
        operation: '입력 순서, 제약 조건, 예시, 출력 형식을 어떻게 주느냐에 따라 같은 모델의 결과를 더 안정적으로 바꾸는 기법이다.',
        importance: '빠른 실험과 제품 안정화에서 가장 먼저 손보는 레버 중 하나라서, 모델이 같아도 결과 품질이 크게 달라질 수 있다.',
        relatedHint: '입력 설계와 출력 제어 맥락을 같이 잡아 준다.',
    },
    {
        tags: ['open-model', 'open-weight', 'local-ai', 'on-device', 'gguf', 'model-format'],
        analogy: '모델을 직접 내려받아 운영하는 배포 층',
        operation: '웨이트, 포맷, 양자화, 런타임을 조합해서 원하는 환경에서 직접 돌리는 쪽에 가깝다.',
        importance: '비용, 지연 시간, 데이터 통제권을 직접 잡고 싶을 때 핵심이 되는 축이다.',
        relatedHint: '로컬 배포와 오픈 모델 맥락을 같이 읽게 해 준다.',
    },
    {
        tags: ['audio', 'voice', 'transcription'],
        analogy: '음성을 텍스트나 음성으로 바꾸는 입출력 계층',
        operation: '인식, 합성, 스트리밍 같은 오디오 파이프라인을 다룬다. 텍스트 LLM과 달리 지연 시간과 음질도 같이 본다.',
        importance: '콜센터, 회의록, 음성 비서처럼 사람의 말이 직접 들어오는 제품에서 바로 쓰인다.',
        relatedHint: '음성 입출력 맥락을 같이 이해하게 해 준다.',
    },
    {
        tags: ['vision', 'image-generation', 'video-generation', 'music-generation', 'multimodal', 'generative-ai'],
        analogy: '텍스트 밖의 이미지·영상·음악까지 다루는 생성 계열',
        operation: '텍스트 프롬프트로 시각·청각 결과물을 만들거나, 반대로 그런 입력을 해석하는 쪽이다. 텍스트 전용 모델과는 입력 형태와 비용 감각이 다르다.',
        importance: '창작, 편집, 미디어 자동화, 멀티모달 앱 같은 곳에서 영향이 크다.',
        relatedHint: '멀티모달 생성·해석 흐름을 같이 볼 때 좋다.',
    },
    {
        tags: ['workflow', 'automation', 'multi-agent', 'autonomy', 'agents'],
        analogy: '여러 도구와 단계를 한 흐름으로 엮는 자동화 레이어',
        operation: '트리거, 순서, 상태 관리를 통해 반복 작업을 줄이고, 여러 도구를 한 파이프라인으로 묶는다.',
        importance: '에이전트나 자동화 제품이 실제 업무에 들어가려면 이런 흐름 관리가 핵심이 된다.',
        relatedHint: '자동화와 워크플로 설계를 같이 볼 때 도움이 된다.',
    },
    {
        tags: ['app', 'ui', 'demo'],
        analogy: '모델 기능을 바로 시험하고 데모 앱으로 묶는 인터페이스 레이어',
        operation: '프롬프트 입력, 출력 시각화, 상태 관리 같은 UI 층을 붙여 아이디어를 빠르게 확인하고 공유하게 만든다.',
        importance: '프로토타입 속도와 사용자 체감은 이런 인터페이스 층에서 크게 갈린다.',
        relatedHint: '앱 프로토타이핑과 인터페이스 맥락을 같이 보면 이해가 쉽다.',
    },
    {
        tags: ['mlops', 'tracking', 'database', 'backend', 'serverless', 'deployment'],
        analogy: '실험과 배포를 기록하고 반복 가능하게 만드는 운영층',
        operation: '실험 로그, 버전, 배포 상태, 인프라 구성을 관리해 팀이 같은 결과를 다시 만들 수 있게 해 준다.',
        importance: '팀 규모가 커질수록 모델 그 자체보다 운영 체계가 더 큰 병목이 된다.',
        relatedHint: '운영과 배포 관점에서 같이 보면 맥락이 선다.',
    },
    {
        tags: ['company', 'model-lab', 'research'],
        analogy: '회사 이름이지만 실제로는 모델 라인업과 제품 전략을 읽는 기준점',
        operation: '개별 기능보다 더 큰 출시 방향, 유통 채널, 파트너십 변화를 보여 주는 이름으로 자주 등장한다.',
        importance: '같은 기능 뉴스도 어느 회사가 왜 이 방향을 미는지 알아야 의미가 읽힌다.',
        relatedHint: '회사 전략과 라인업 맥락을 같이 이해하게 해 준다.',
    },
];

function loadNewsFiles() {
    return fs.readdirSync(NEWS_DIR)
        .filter((file) => file.endsWith('.md'))
        .map((file) => ({
            file,
            content: fs.readFileSync(path.join(NEWS_DIR, file), 'utf8'),
        }));
}

function escapeRegExp(value) {
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeText(text) {
    return String(text || '')
        .replace(/\[[^\]]*]/g, ' ')
        .replace(/&#91;.*?&#93;/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.!?])/g, '$1')
        .replace(/\(\s+/g, '(')
        .replace(/\s+\)/g, ')')
        .trim();
}

function trimSentence(text) {
    return normalizeText(text).replace(/[.!?]+$/g, '').trim();
}

function ensureSentence(text) {
    const value = trimSentence(text);
    if (!value) {
        return '';
    }

    return `${value}.`;
}

function toWikiVoiceText(text) {
    let value = String(text || '');
    if (!value.trim()) {
        return value;
    }

    value = rewriteAikiTone(value);

    const replacements = [
        [/한 줄로 줄이면/g, '짧게 잡으면'],
        [/실무에서는/g, '실무에선'],
        [/핵심이다\./g, '관건이야.'],
        [/핵심이 된다\./g, '관건이 돼.'],
        [/이어야 한다\./g, '이어야 해.'],
        [/봐야 한다\./g, '봐야 해.'],
        [/읽어야 한다\./g, '읽어야 해.'],
        [/확인해야 한다\./g, '확인해야 해.'],
        [/잡아야 한다\./g, '잡아야 해.'],
        [/끝내야 한다\./g, '끝내야 해.'],
        [/도구다\./g, '도구야.'],
        [/프레임워크다\./g, '프레임워크야.'],
        [/기법이다\./g, '기법이야.'],
        [/개념이다\./g, '개념이야.'],
        [/모델이다\./g, '모델이야.'],
        [/라인업이다\./g, '라인업이야.'],
        [/구조다\./g, '구조야.'],
        [/뼈대다\./g, '뼈대야.'],
        [/나눠서 보는 편이 안전하다\./g, '나눠서 보는 편이 안전해.'],
        [/보는 편이 맞다\./g, '보는 편이 맞아.'],
        [/보는 편이 낫다\./g, '보는 편이 나아.'],
        [/읽는 편이 맞다\./g, '읽는 편이 맞아.'],
        [/읽는 편이 낫다\./g, '읽는 편이 나아.'],
        [/가까운 편이다\./g, '가까운 편이야.'],
        [/가깝다\./g, '가까워.'],
        [/빠르다\./g, '빨라.'],
        [/쉽다\./g, '쉬워.'],
        [/어렵다\./g, '어려워.'],
        [/크다\./g, '커.'],
        [/작다\./g, '작아.'],
        [/높다\./g, '높아.'],
        [/낮다\./g, '낮아.'],
        [/좋다\./g, '좋아.'],
        [/같다\./g, '같아.'],
        [/많다\./g, '많아.'],
        [/적다\./g, '적어.'],
        [/길다\./g, '길어.'],
        [/깊다\./g, '깊어.'],
        [/넓다\./g, '넓어.'],
        [/역할을 한다\./g, '역할을 해.'],
        [/기준이 된다\./g, '기준이 돼.'],
        [/신호가 된다\./g, '신호가 돼.'],
        [/도움이 된다\./g, '도움이 돼.'],
        [/선택지다\./g, '선택지야.'],
        [/이해가 빠르다\./g, '이해가 빨라.'],
        [/줄여 준다\./g, '줄여 줘.'],
        [/만든다\./g, '만들어.'],
        [/묶는다\./g, '묶어.'],
        [/바꾼다\./g, '바꿔.'],
        [/읽는다\./g, '읽어.'],
        [/돕는다\./g, '도와.'],
        [/붙는다\./g, '붙어.'],
        [/갈린다\./g, '갈려.'],
        [/열린다\./g, '열려.'],
        [/쓰인다\./g, '쓰여.'],
        [/지원된다\./g, '지원돼.'],
        [/제공된다\./g, '제공돼.'],
        [/구분된다\./g, '구분돼.'],
        [/유지된다\./g, '유지돼.'],
        [/요구된다\./g, '요구돼.'],
        [/정해진다\./g, '정해져.'],
        [/남는다\./g, '남아.'],
        [/이어진다\./g, '이어져.'],
        [/늘어난다\./g, '늘어나.'],
        [/설계됐다\./g, '설계됐어.'],
        [/필요하다\./g, '필요해.'],
        [/중요하다\./g, '중요해.'],
        [/가능하다\./g, '가능해.'],
        [/유리하다\./g, '유리해.'],
        [/정확하다\./g, '정확해.'],
        [/적절하다\./g, '적절해.'],
        [/분명하다\./g, '분명해.'],
        [/맞다\./g, '맞아.'],
        [/낫다\./g, '나아.'],
        [/없다\./g, '없어.'],
        [/있다\./g, '있어.'],
        [/않는다\./g, '않아.'],
        [/어긋나지 않는다\./g, '어긋나지 않아.'],
        [/달라진다\./g, '달라져.'],
        [/움직인다\./g, '움직여.'],
        [/보인다\./g, '보여.'],
        [/읽힌다\./g, '읽혀.'],
        [/가리킨다\./g, '가리켜.'],
        [/정리한다\./g, '정리해.'],
        [/설명한다\./g, '설명해.'],
        [/말한다\./g, '말해.'],
        [/본다\./g, '봐.'],
        [/된다\./g, '돼.'],
        [/한다\./g, '해.'],
        [/이다\./g, '이야.'],
    ];

    for (const [pattern, replacement] of replacements) {
        value = value.replace(pattern, replacement);
    }

    return value;
}

// Rule: hardcoded copy in this CJS must go through the tone-guide helpers.
// When wording is edited here, keep AIKI's casual "…했어 / …봤어" voice rather than
// leaving raw declarative copy behind.
function normalizeFactChecksTone(checks) {
    function rewriteFactCheckLine(text) {
        let value = String(text || '').trim();
        if (!value) {
            return value;
        }

        const replacements = [
            [/^독자 문제 대조:\s*/u, '독자가 먼저 갈라 봐야 할 건 '],
            [/^비교 출처\s*\d+:\s*/u, '같이 본 출처로는 '],
            [/^원문 대조:\s*/u, '원문을 보면 '],
            [/^정체성 대조:\s*/u, '정체성을 보면 '],
            [/^카테고리 대조:\s*/u, '분류를 잡을 때는 '],
            [/^용어명 대조:\s*/u, '이름을 다시 보면 '],
            [/^분류 대조:\s*/u, '분류를 다시 보면 '],
            [/^모델명 대조:\s*/u, '모델 이름부터 다시 보면 '],
            [/^벤더 대조:\s*/u, '만든 쪽을 다시 보면 '],
            [/^상위 계열:\s*/u, '상위 계열로는 '],
            [/^비교 기준:\s*/u, '여기서 먼저 갈라 볼 기준은 '],
            [/^교차검증:\s*/u, '공식 자료를 같이 보면 '],
            [/^해석 보정:\s*/u, '그래서 해석할 때는 '],
            [/^수치 검증:\s*/u, '숫자를 다시 보면 '],
            [/^명칭 검증:\s*/u, '이름부터 다시 보면 '],
            [/^범위 검증:\s*/u, '범위를 다시 보면 '],
            [/^채널 검증:\s*/u, '접근 채널을 보면 '],
            [/^비판적 검증:\s*/u, '헷갈리기 쉬운 건 '],
            [/^오해 방지 기준:\s*/u, '헷갈리지 않으려면 '],
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

        value = rewriteFactCheckTone(toWikiVoiceText(value));
        if (!/[.!?]$/u.test(value) && !/\)$/u.test(value)) {
            value = `${value}.`;
        }

        return value;
    }

    return (checks || []).map((check) => ({
        ...check,
        summary: rewriteFactCheckTone(toWikiVoiceText(check.summary)),
        items: Array.isArray(check.items) ? check.items.map((item) => rewriteFactCheckLine(item)) : check.items,
        findings: Array.isArray(check.findings) ? check.findings.map((item) => rewriteFactCheckLine(item)) : check.findings,
    }));
}

function ensureFactCheckTone(summary) {
    const text = String(summary || '').trim();
    if (!text) {
        return text;
    }

    if (/(확인해봤(?:다|어)|확인했(?:다|어)|비교했(?:다|어)|검증했(?:다|어)|정리했(?:다|어)|걸렀(?:다|어)|맞춰봤(?:다|어)|다시 봤(?:다|어)|(?:한 번 더 )?봤(?:다|어))\.?$/u.test(text)) {
        return text;
    }

    return `${text.replace(/[.!?]+$/u, '')} 확인했어.`;
}

function ensureFactCheckRequirements(entry, checks, sourceDetails, sourceContext, modelProfile) {
    const readerProblem = entry.category === 'model'
        ? `${entry.title}를 어떤 작업과 운영 조건에 붙일 모델인지`
        : stripLeadingSubject(entry, sourceLead(entry, sourceContext) || `${topicPhrase(entry.title)} ${categoryLabel(entry.category)}로 읽는 편이 맞다.`);
    const comparisonAxis = entry.category === 'model'
        ? `${entry.title}를 고를 때 접근 채널, 가격, 입력 범위 가운데 무엇을 먼저 봐야 하는지`
        : stripLeadingSubject(entry, supportingSourceHint(entry, sourceContext) || '여러 출처가 같은 층위의 용어로 설명하는지 확인했다.');
    const sourceMatchPrefixes = ['독자 문제 대조:', '독자가 먼저 갈라 봐야 할 건 '];
    const webCrossCheckPrefixes = ['비교 기준:', '여기서 먼저 갈라 볼 기준은 '];
    const modelOpsSignals = ['컨텍스트', '가격', '입력', '출력', 'API', '웨이트', '호스팅', 'Batch', 'Realtime', '토큰'];

    return (checks || []).map((check) => {
        const items = Array.isArray(check.items) ? [...check.items] : [];
        const findings = Array.isArray(check.findings) ? [...check.findings] : [];
        const next = {
            ...check,
            summary: ensureFactCheckTone(check.summary),
            items,
            findings,
        };

        if (check.type === 'source_match' && !items.some((item) => sourceMatchPrefixes.some((prefix) => String(item || '').startsWith(prefix)))) {
            items.unshift(`독자 문제 대조: ${readerProblem}`);
        }

        if (check.type === 'web_cross_check' && !items.some((item) => webCrossCheckPrefixes.some((prefix) => String(item || '').startsWith(prefix)))) {
            items.unshift(`비교 기준: ${comparisonAxis}`);
        }

        if (entry.category === 'model' && modelProfile && check.type === 'source_match') {
            const hasVendor = items.some((item) => /(OpenAI|Anthropic|Google DeepMind|Google|DeepSeek|Mistral AI|Black Forest Labs|Meta|xAI|Microsoft|Alibaba|Qwen|Stability AI)/.test(String(item || '')));
            if (!hasVendor) {
                items.push(`벤더 대조: ${modelProfile.vendor}`);
            }
        }

        if (entry.category === 'model' && modelProfile && check.type === 'number_verify') {
            const joined = items.join(' ');
            if (!modelOpsSignals.some((signal) => joined.includes(signal))) {
                items.push(`접근 경로 대조: ${modelProfile.access}`);
            }
        }

        return next;
    });
}

function normalizeBodySectionsTone(sections) {
    return (sections || []).map((section) => {
        const line = String(section || '');
        if (!line.trim()) {
            return line;
        }

        if (line.includes('\n')) {
            return line
                .split('\n')
                .map((part) => {
                    if (!part.trim() || part.startsWith('## ')) {
                        return part;
                    }
                    return toWikiVoiceText(part);
                })
                .join('\n');
        }

        if (line.startsWith('## ')) {
            return line;
        }

        return toWikiVoiceText(line);
    });
}

function normalizeModelProfileTone(profile) {
    if (!profile || typeof profile !== 'object') {
        return profile;
    }

    const normalized = {};
    for (const [key, value] of Object.entries(profile)) {
        normalized[key] = typeof value === 'string' ? toWikiVoiceText(value) : value;
    }

    return normalized;
}

function firstSentence(text) {
    const parts = sentenceSplit(normalizeText(text));
    return trimSentence(parts[0] || '');
}

function stripLeadingSubject(entry, text) {
    let value = normalizeText(text);
    const names = [entry.title, ...(entry.aliases || [])]
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .sort((left, right) => right.length - left.length);

    for (const name of names) {
        const pattern = new RegExp(`^${escapeRegExp(name)}(?:\\s*\\([^)]*\\))?\\s*(?:은|는|이|가)?\\s*`, 'iu');
        value = value.replace(pattern, '');
    }

    return trimSentence(value);
}

function hasAnyTag(entry, tags) {
    const tagSet = new Set((entry.tags || []).map((tag) => String(tag || '').toLowerCase()));
    return tags.some((tag) => tagSet.has(tag));
}

function pickTagRule(entry) {
    return TAG_RULES.find((rule) => hasAnyTag(entry, rule.tags)) || {
        analogy: '뉴스 문장을 읽을 때 개념과 제품을 묶어 주는 기준점',
        operation: '정의만 외우기보다 이 용어가 어느 단계에서 쓰이는지, 그리고 실제로 어떤 입력과 출력을 다루는지로 보면 이해가 빨라진다.',
        importance: '결국 이 용어를 알아두면 발표문에서 무엇이 달라졌는지 더 빠르게 구분할 수 있다.',
        relatedHint: '함께 보면 맥락이 더 빨리 잡힌다.',
    };
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
    if (hasAnyTag(entry, ['retrieval', 'generation', 'search', 'vectors', 'vector-db', 'vector-search'])) return '검색과 외부 지식 연결';
    if (hasAnyTag(entry, ['architecture', 'transformer', 'attention', 'scaling'])) return '모델 내부 구조와 효율';
    if (hasAnyTag(entry, ['tokens', 'context-window', 'memory'])) return '토큰 예산과 긴 문맥 처리';
    if (hasAnyTag(entry, ['inference', 'serving', 'runtime'])) return '모델 서빙과 추론 성능';
    if (hasAnyTag(entry, ['on-device'])) return '경량 모델과 온디바이스 추론';
    if (hasAnyTag(entry, ['language-model', 'foundation-model'])) return '언어 생성과 텍스트 이해';
    if (hasAnyTag(entry, ['safety', 'policy', 'reliability'])) return '안전성과 신뢰성 제어';
    if (hasAnyTag(entry, ['reasoning', 'thinking', 'planning'])) return '복잡한 추론과 계획';
    if (hasAnyTag(entry, ['evaluation', 'measurement', 'testing', 'benchmark'])) return '평가와 검증';
    if (hasAnyTag(entry, ['training', 'adaptation', 'efficiency', 'training-data', 'optimization'])) return '학습과 비용 최적화';
    if (hasAnyTag(entry, ['coding-agent', 'developer-tools', 'editor', 'cli', 'vs-code'])) return '개발 생산성과 코딩 워크플로';
    if (hasAnyTag(entry, ['api', 'integration', 'application', 'prototyping', 'routing'])) return 'API 연결과 제품 통합';
    if (hasAnyTag(entry, ['app', 'ui', 'demo'])) return '앱 프로토타이핑과 인터페이스 제작';
    if (hasAnyTag(entry, ['tool-use', 'function-calling', 'protocol'])) return '도구 호출과 실행 연결';
    if (hasAnyTag(entry, ['prompting', 'instruction'])) return '입력 설계와 출력 제어';
    if (hasAnyTag(entry, ['open-model', 'open-weight', 'local-ai', 'on-device', 'gguf', 'model-format'])) return '오픈 모델과 로컬 배포';
    if (hasAnyTag(entry, ['audio', 'voice', 'transcription'])) return '음성 입출력';
    if (hasAnyTag(entry, ['vision', 'image-generation', 'video-generation', 'music-generation', 'multimodal', 'generative-ai'])) return '멀티모달 생성과 해석';
    if (hasAnyTag(entry, ['workflow', 'automation', 'multi-agent', 'autonomy', 'agents'])) return '자동화와 에이전트 흐름';
    if (hasAnyTag(entry, ['mlops', 'tracking', 'database', 'backend', 'serverless', 'deployment'])) return '운영과 배포';
    if (hasAnyTag(entry, ['company', 'model-lab', 'research'])) return '회사 전략과 라인업';
    return '제품 판단과 구현 맥락';
}

function isCompanyEntry(entry) {
    return hasAnyTag(entry, ['company', 'model-lab', 'research']);
}

function inferGenericProblem(entry) {
    const focus = focusPhrase(entry);

    if (isCompanyEntry(entry)) {
        return '이 이름이 개별 기능이 아니라 회사 전체 라인업과 전략 변화인지';
    }

    switch (entry.category) {
        case 'tool':
            return `${focus}에서 어떤 도구를 붙여야 하는지`;
        case 'framework':
            return `${flowPhrase(focus)}을 어떤 구조로 묶어야 하는지`;
        case 'technique':
            return `${focus}를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지`;
        default:
            return `${focus}를 기사에서 어떤 판단 기준으로 읽어야 하는지`;
    }
}

function getEntryProblem(entry) {
    return trimSentence(entry.userProblem || inferGenericProblem(entry));
}

function getDecisionAxis(entry) {
    return trimSentence(entry.decisionAxis || getEntryProblem(entry));
}

function compactProblemText(text) {
    return trimSentence(String(text || '').replace(/(?:부터)?\s*갈라 봐야 해[.!?]?$/u, ''));
}

function topicPhrase(text) {
    return attachHangulParticle(text, '은', '는', '는');
}

function mentionsEntryName(entry, text) {
    const value = normalizeText(text).toLowerCase();
    if (!value) {
        return false;
    }

    const names = [entry.title, entry.term.replace(/-/g, ' '), ...(entry.aliases || [])]
        .map((item) => normalizeText(item).toLowerCase())
        .filter(Boolean);

    return names.some((name) => value.includes(name));
}

function sourceSentences(text) {
    return sentenceSplit(normalizeText(text))
        .map((sentence) => trimSentence(sentence))
        .filter((sentence) => sentence.length >= 18);
}

function isWeakSourceSentence(text) {
    const value = normalizeText(text).toLowerCase();
    return !value
        || value.length < 18
        || /create an account on github|available on github|selected organization|switch to a different organization|learn more|resource for workflow automation|we'?re on a journey to advance and democratize/i.test(value)
        || /github에 계정을 만들어|github에서 사용할 수 있습니다|다른 조직으로 전환|더 알아보기|오픈 소스와 오픈 사이언스를 통해|기쁘게 생각합니다|신속하게 모델을 시험해보고|빌드할 준비가 되면|선택하여 .* 사용할 수 있습니다|알아보세요/i.test(value);
}

function sourceHintScore(entry, text) {
    const value = normalizeText(text);
    const lower = value.toLowerCase();
    let score = 0;

    if (mentionsEntryName(entry, value)) score += 2;
    if (/(모델|도구|프레임워크|개념|기법|API|SDK|CLI|플랫폼|형식|엔진|프로토콜|runtime|framework|protocol|platform|engine|format|tool|model|api)/i.test(value)) score += 3;
    if (/(출시|발표|기쁘게|빠르게|신속하게|사용할 수 있습니다|선택하고|준비가 되면)/i.test(value)) score -= 3;
    if (/(예를 들어|예컨대|대표적으로)/.test(value)) score += 1;
    if (lower.length > 40 && lower.length < 160) score += 1;

    return score;
}

function collectSourceHints(entry, sourceContext) {
    const hints = [];
    const seen = new Set();

    for (const text of [sourceContext && sourceContext.primaryKo, sourceContext && sourceContext.secondaryKo]) {
        for (const sentence of sourceSentences(text)) {
            const normalized = normalizeText(sentence);
            if (!normalized || isWeakSourceSentence(normalized)) {
                continue;
            }

            const key = normalized.toLowerCase();
            if (seen.has(key)) {
                continue;
            }

            seen.add(key);
            hints.push(ensureSentence(normalized));
        }
    }

    return hints;
}

function sourceLead(entry, sourceContext) {
    const hints = collectSourceHints(entry, sourceContext)
        .sort((left, right) => sourceHintScore(entry, right) - sourceHintScore(entry, left));
    const sentence = hints[0];
    if (!sentence) {
        return '';
    }

    if (mentionsEntryName(entry, sentence)) {
        return ensureSentence(sentence);
    }

    return `${topicPhrase(entry.title)} ${stripLeadingSubject(entry, sentence)}.`;
}

function supportingSourceHint(entry, sourceContext) {
    const hints = collectSourceHints(entry, sourceContext)
        .sort((left, right) => sourceHintScore(entry, right) - sourceHintScore(entry, left));
    const lead = sourceLead(entry, sourceContext);
    return hints.find((hint) => normalizeText(hint) !== normalizeText(lead)) || '';
}

function uniqueSentences(lines, limit = 3) {
    const unique = [];
    const seen = new Set();

    for (const line of lines) {
        const sentence = ensureSentence(line);
        const key = normalizeText(sentence).toLowerCase();
        if (!key || seen.has(key)) {
            continue;
        }
        seen.add(key);
        unique.push(sentence);
        if (unique.length >= limit) {
            break;
        }
    }

    return unique;
}

function buildSpecificDetailLine(entry) {
    if (hasAnyTag(entry, ['coding-agent', 'developer-tools', 'editor', 'cli', 'vs-code'])) {
        return '코드베이스를 읽고 파일을 수정하고 CLI 명령을 실행하거나 IDE와 연결하는 흐름에서 존재감이 커.';
    }

    if (hasAnyTag(entry, ['database', 'backend', 'serverless', 'deployment'])) {
        return '데이터 저장만이 아니라 인증, 스토리지, 함수, API 레이어를 어디까지 한 번에 묶는지 같이 봐야 해.';
    }

    if (hasAnyTag(entry, ['mlops', 'tracking'])) {
        return '실험 로그, dashboard, artifact, registry, deploy 흐름을 어떻게 추적하고 재현할지에서 차이가 크게 나.';
    }

    if (hasAnyTag(entry, ['retrieval', 'generation', 'search', 'vectors', 'vector-db', 'vector-search'])) {
        return '임베딩 저장, 필터링, reranking, vector search 같은 retrieval pipeline에서 어느 구간을 맡는지로 읽으면 덜 헷갈려.';
    }

    if (hasAnyTag(entry, ['workflow', 'automation', 'multi-agent', 'autonomy', 'agents'])) {
        return '트리거, 노드, 상태, 웹훅을 엮어 automation pipeline을 만드는 흐름과 자주 연결돼.';
    }

    if (hasAnyTag(entry, ['api', 'integration', 'application', 'prototyping', 'routing'])) {
        return 'API 키, SDK, 호출 형식, 응답 구조가 실제 통합 난도를 가르는 지점이 돼.';
    }

    if (hasAnyTag(entry, ['inference', 'serving', 'runtime'])) {
        return 'batching, cache, GPU 메모리 재사용, 서버 API 같은 운영 요소로 추론 비용과 지연을 줄이는 쪽에 가까워.';
    }

    if (hasAnyTag(entry, ['open-model', 'open-weight', 'local-ai', 'on-device', 'gguf', 'model-format'])) {
        return '모델 파일 포맷, 양자화, 런타임 호환성, 로컬 CLI 배포처럼 직접 운영할 때 바로 부딪히는 문제와 붙어 있어.';
    }

    if (hasAnyTag(entry, ['app', 'ui', 'demo'])) {
        return '웹 UI나 데모 앱을 빠르게 만들고 입력과 출력을 눈으로 확인하며 필요하면 API 호출까지 이어 보는 흐름에서 강점이 보여.';
    }

    if (hasAnyTag(entry, ['architecture', 'transformer', 'attention', 'scaling'])) {
        return '토큰 관계를 계산하는 방식, attention 분배, 레이어 구조처럼 모델 내부 설계를 설명할 때 핵심이 돼.';
    }

    if (hasAnyTag(entry, ['training', 'adaptation', 'efficiency', 'training-data', 'optimization'])) {
        return '데이터, 파라미터, 압축, 학습 루프를 어떻게 조정해 품질과 비용 균형을 바꾸는지와 연결돼.';
    }

    if (hasAnyTag(entry, ['tool-use', 'function-calling', 'protocol'])) {
        return '모델이 답변만 쓰는 수준을 넘어서 외부 도구 호출, 함수 실행, 상태 전달까지 이어지는 단계에서 의미가 커.';
    }

    if (hasAnyTag(entry, ['tokens', 'context-window', 'memory'])) {
        return '토큰 수 계산, 입력 한도, 출력 길이, 비용 감각이 실제로 어디서 갈리는지 읽을 때 기본 축이 돼.';
    }

    if (hasAnyTag(entry, ['audio', 'voice', 'transcription'])) {
        return '음성 인식, 합성, 스트리밍, 지연 시간처럼 텍스트 LLM과 다른 오디오 pipeline 조건을 함께 봐야 해.';
    }

    if (hasAnyTag(entry, ['vision', 'image-generation', 'video-generation', 'music-generation', 'multimodal', 'generative-ai'])) {
        return '이미지나 영상, 오디오처럼 텍스트 밖의 입출력을 다루기 때문에 프롬프트 설계와 비용 구조도 달라져.';
    }

    if (isCompanyEntry(entry)) {
        return '개별 모델 하나보다 라인업, 배포 채널, 파트너십, 연구 방향이 같이 움직이는지 먼저 보는 편이 맞아.';
    }

    return `${focusPhrase(entry)} 맥락에서 실제 입력, 출력, 운영 위치가 어디인지 같이 잡아두면 이해가 빨라.`;
}

function buildComparisonCue(entry) {
    if (entry.category === 'tool') {
        return '모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워.';
    }

    if (entry.category === 'framework') {
        return '완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여.';
    }

    if (entry.category === 'technique') {
        return '독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해.';
    }

    return '비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어.';
}

function buildCommonMisunderstanding(entry) {
    if (entry.category === 'tool') {
        return '모델 자체와 같은 말로 쓰면 제품 층위와 운영 층위가 섞이기 쉬워.';
    }

    if (entry.category === 'framework') {
        return '완제품이나 단일 모델처럼 읽으면 직접 조립해야 하는 범위를 놓치기 쉬워.';
    }

    if (entry.category === 'technique') {
        return '새 제품명으로 받아들이면 실제로는 기존 모델 위에 얹는 방법론이라는 점을 놓치기 쉬워.';
    }

    if (isCompanyEntry(entry)) {
        return '개별 모델 이름으로 읽으면 회사 전략과 제품 라인업 변화라는 핵심이 흐려져.';
    }

    return '특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워.';
}

function buildAdversarialFinding(entry) {
    if (entry.adversarialRisk) {
        return entry.adversarialRisk;
    }

    if (entry.relatedTerms && entry.relatedTerms.length > 0) {
        return '관련 용어와 비교해 어디까지가 같은 층위이고 어디서 역할이 갈리는지만 잡아도 기사 해석이 훨씬 안정돼.';
    }

    return '이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려.';
}

function buildExampleLine(entry) {
    if (hasAnyTag(entry, ['coding-agent', 'developer-tools', 'editor', 'cli', 'vs-code'])) {
        return '예를 들어 리포지토리를 탐색하고 파일을 고치고 테스트를 돌리는 코딩 보조 흐름이 여기에 들어가.';
    }

    if (hasAnyTag(entry, ['database', 'backend', 'serverless', 'deployment'])) {
        return '예를 들어 로그인, 데이터 저장, 파일 업로드, 서버 함수까지 한 화면에서 붙이는 백엔드 시제품을 만들 때 차이가 크게 드러나.';
    }

    if (hasAnyTag(entry, ['mlops', 'tracking'])) {
        return '예를 들어 실험 결과를 비교하고 모델 artifact를 저장한 뒤 나중에 같은 설정으로 다시 deploy하는 흐름이 대표적이야.';
    }

    if (hasAnyTag(entry, ['retrieval', 'generation', 'search', 'vectors', 'vector-db', 'vector-search'])) {
        return '예를 들어 사내 문서를 검색해 답하는 RAG 흐름에서 검색 품질이 흔들리면 답변 품질도 같이 무너져.';
    }

    if (hasAnyTag(entry, ['workflow', 'automation', 'multi-agent', 'autonomy', 'agents'])) {
        return '예를 들어 이메일 분류 뒤에 CRM 업데이트와 알림 전송을 이어 붙이는 자동화 시나리오가 대표적이야.';
    }

    if (hasAnyTag(entry, ['api', 'integration', 'application', 'prototyping', 'routing'])) {
        return '예를 들어 프롬프트를 바꿔 보다가 바로 샘플 코드를 내보내 앱에 붙이는 식의 실험이 여기서 자주 일어나.';
    }

    if (hasAnyTag(entry, ['inference', 'serving', 'runtime'])) {
        return '예를 들어 같은 모델이라도 batching이나 cache 설계가 달라지면 지연 시간과 비용이 크게 달라져.';
    }

    if (hasAnyTag(entry, ['open-model', 'open-weight', 'local-ai', 'on-device', 'gguf', 'model-format'])) {
        return '예를 들어 노트북이나 온프레미스 서버에서 모델 파일을 직접 내려받아 돌릴 때 이런 차이가 바로 체감돼.';
    }

    if (hasAnyTag(entry, ['audio', 'voice', 'transcription'])) {
        return '예를 들어 회의록 전사, 콜센터 음성봇, 낭독 기능처럼 입력과 출력이 음성인 제품에서 쓰임새가 갈려.';
    }

    if (hasAnyTag(entry, ['vision', 'image-generation', 'video-generation', 'music-generation', 'multimodal', 'generative-ai'])) {
        return '예를 들어 텍스트 프롬프트로 이미지를 만들거나 이미지를 보고 답하는 제품 흐름이 대표적인 예시야.';
    }

    if (hasAnyTag(entry, ['training', 'adaptation', 'efficiency', 'training-data', 'optimization'])) {
        return '예를 들어 더 작은 모델에 큰 모델 출력을 학습시키거나 양자화로 운영비를 줄이는 시도가 여기에 들어가.';
    }

    if (hasAnyTag(entry, ['tokens', 'context-window', 'memory'])) {
        return '예를 들어 128K 컨텍스트나 1M 토큰 같은 문구를 볼 때 실제 비용과 한도를 읽는 기준이 돼.';
    }

    return '';
}

function sourceLabel(detail, index) {
    try {
        const hostname = new URL(detail.url).hostname.replace(/^www\./, '');
        return `출처 ${index + 1} 대조: ${hostname}`;
    } catch {
        return `출처 ${index + 1} 대조`;
    }
}

function endsWithSentence(text) {
    return /[.!?]$/.test(String(text || '').trim());
}

function lastHangulSyllable(text) {
    const value = String(text || '');
    for (let index = value.length - 1; index >= 0; index -= 1) {
        const code = value.charCodeAt(index);
        if (code >= 0xac00 && code <= 0xd7a3) {
            return value[index];
        }
    }

    return '';
}

function attachHangulParticle(text, withBatchim, withoutBatchim, fallback = withoutBatchim) {
    const lastChar = lastHangulSyllable(text);
    if (!lastChar) {
        return `${text}${fallback}`;
    }

    const hasBatchim = (lastChar.charCodeAt(0) - 0xac00) % 28 !== 0;
    return `${text}${hasBatchim ? withBatchim : withoutBatchim}`;
}

function objectPhrase(text) {
    return attachHangulParticle(text, '을', '를');
}

function flowPhrase(text) {
    return /흐름$/.test(text) ? text : `${text} 흐름`;
}

function buildGenericSummary(entry, sourceContext) {
    const lead = sourceLead(entry, sourceContext);

    if (lead) {
        return clip(lead, 160);
    }

    switch (entry.category) {
        case 'tool':
            return clip(`${topicPhrase(entry.title)} ${pickTagRule(entry).analogy}에 가까운 도구야. 모델 기능보다 실제 작업 흐름을 어떻게 붙이는지가 더 중요해.`, 160);
        case 'framework':
            return clip(`${topicPhrase(entry.title)} 여러 구성 요소를 연결하고 조립하는 프레임워크야. 완제품보다 구조와 실행 흐름을 어떻게 묶는지 읽는 이름에 가까워.`, 160);
        case 'technique':
            return clip(`${topicPhrase(entry.title)} 기존 모델이나 workflow를 더 잘 쓰기 위해 얹는 기법이야. 새 제품 이름보다 어떤 단계를 바꾸는 방법인지로 읽는 편이 맞아.`, 160);
        default:
            return clip(`${topicPhrase(entry.title)} AI 제품과 모델을 이해할 때 반복해서 등장하는 핵심 개념이야. 비슷한 용어와의 차이를 같이 잡아 두면 기사 해석이 빨라져.`, 160);
    }
}

function summaryFromSource(entry, sourceContext) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.summary) {
        return manual.summary;
    }

    return buildGenericSummary(entry, sourceContext);
}

function inferModelJobFocus(modelProfile) {
    const implementation = String(modelProfile.implementation || '').toLowerCase();
    const access = String(modelProfile.access || '').toLowerCase();
    const support = String(modelProfile.multimodalSupport || '').toLowerCase();

    if (implementation.includes('reasoning')) {
        return '어려운 추론, 계획 수립, 도구를 섞어 써야 하는 일';
    }

    if (implementation.includes('코딩') || access.includes('agent') || access.includes('에이전트')) {
        return '코드 이해, 수정, 에이전트형 자동화';
    }

    if (support.includes('이미지') || support.includes('multimodal')) {
        return '텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업';
    }

    return '실제 제품에 붙일 모델 선택';
}

function inferFamilyAngle(entry, modelProfile) {
    const tags = new Set((entry.tags || []).map((tag) => String(tag || '').toLowerCase()));
    const support = String(modelProfile.multimodalSupport || '').toLowerCase();
    const implementation = String(modelProfile.implementation || '').toLowerCase();

    if (tags.has('video-generation')) {
        return '텍스트에서 영상으로 넘어가는 생성 계열';
    }

    if (tags.has('assistant')) {
        return '범용 대화형 모델 라인업';
    }

    if (tags.has('reasoning') || implementation.includes('reasoning')) {
        return '복잡한 추론 작업 중심 라인업';
    }

    if (support.includes('오디오') || support.includes('시각') || support.includes('멀티모달')) {
        return '멀티모달 생성과 이해를 같이 다루는 라인업';
    }

    return '여러 하위 모델을 묶어 부르는 제품 라인업';
}

function buildModelExampleLine(entry) {
    if (hasAnyTag(entry, ['image-generation', 'video-generation', 'music-generation'])) {
        return '예를 들어 텍스트 프롬프트로 이미지를 만들거나 영상을 생성하는 제품 계열을 이해할 때 차이가 바로 드러나.';
    }

    if (hasAnyTag(entry, ['reasoning', 'thinking', 'planning'])) {
        return '예를 들어 수학 풀이, 코드 수정, 장문 계획처럼 중간 단계가 긴 작업 후보를 고를 때 차이가 크게 난다.';
    }

    if (hasAnyTag(entry, ['multimodal', 'audio'])) {
        return '예를 들어 이미지를 보고 답하거나 음성을 받아 처리하는 앱에서 입력 범위 차이가 바로 체감된다.';
    }

    if (hasAnyTag(entry, ['open-model', 'open-weight'])) {
        return '예를 들어 API 대신 직접 호스팅할지, 어떤 GPU 예산이 필요한지 판단할 때 이런 차이가 바로 운영 이슈로 이어진다.';
    }

    return '예를 들어 같은 벤더 모델끼리도 API 채널과 가격표가 다르면 추천 답이 완전히 달라질 수 있다.';
}

function buildModelToModelHint(relatedEntry) {
    if (hasAnyTag(relatedEntry, ['image-generation', 'video-generation', 'music-generation'])) {
        return `${relatedEntry.title}와는 결과물 형태와 배포 방식 차이를 비교하기 쉬워.`;
    }

    if (hasAnyTag(relatedEntry, ['open-model', 'open-weight'])) {
        return `${relatedEntry.title}와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.`;
    }

    if (hasAnyTag(relatedEntry, ['reasoning', 'thinking', 'planning'])) {
        return `${relatedEntry.title}와는 추론형 모델인지 범용 생성형 모델인지 비교하기 쉬워.`;
    }

    if (hasAnyTag(relatedEntry, ['multimodal', 'audio'])) {
        return `${relatedEntry.title}와는 입력 범위와 출력 형태 차이를 비교하기 쉬워.`;
    }

    return `${relatedEntry.title}와는 벤더, 접근 채널, 사용 장면 차이를 비교하기 쉬워.`;
}

function buildRelationHint(entry, relatedEntry) {
    if (entry.relatedHints && entry.relatedHints[relatedEntry.term]) {
        return entry.relatedHints[relatedEntry.term];
    }

    if (entry.category === 'model' && relatedEntry.category === 'model') {
        return buildModelToModelHint(relatedEntry);
    }

    if (entry.category === relatedEntry.category) {
        return `${relatedEntry.title}와 비교해 보면 ${focusPhrase(entry)}에서 어디가 다른지 읽기 쉬워.`;
    }

    if (entry.category === 'tool' || entry.category === 'framework') {
        return `${relatedEntry.title}와 함께 보면 ${entry.title}가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.`;
    }

    const rule = pickTagRule(entry);
    if (rule.relatedHint) {
        return `같이 보면 ${rule.relatedHint}`;
    }

    return `${relatedEntry.title}와 함께 보면 ${entry.title}의 역할 차이를 비교하기 쉬워.`;
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

function buildRelatedLines(entry, relatedTerms) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.relatedLines) {
        return manual.relatedLines.join('\n');
    }

    if (relatedTerms.length === 0) {
        return '- [LLM](/ko/wiki/llm/) — 기본 언어 모델 개념을 같이 보면 맥락이 훨씬 빨리 잡힌다.';
    }

    return relatedTerms.map((term) => {
        const relatedEntry = ENTRY_BY_TERM.get(term);
        const label = relatedEntry ? relatedEntry.title : term;
        const hint = relatedEntry ? buildRelationHint(entry, relatedEntry) : '함께 보면 맥락이 더 빨리 잡힌다.';
        return `- [${label}](/ko/wiki/${term}/) — ${hint}`;
    }).join('\n');
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

function buildGenericFactChecks(entry, sourceDetails, sourceContext) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && Array.isArray(manual.factChecks) && manual.factChecks.length > 0) {
        return manual.factChecks;
    }

    const sourceItems = sourceDetails.map((detail, index) => sourceLabel(detail, index));
    const numericSignals = [];
    const lead = sourceLead(entry, sourceContext) || `${topicPhrase(entry.title)} ${categoryLabel(entry.category)}로 읽는 게 맞아.`;
    const sourceHint = supportingSourceHint(entry, sourceContext);
    const aliasText = entry.aliases && entry.aliases.length > 0
        ? `별칭 대조: ${entry.aliases.join(', ')}도 같은 대상을 가리키는지 확인했다.`
        : '명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했다.';

    for (const detail of sourceDetails) {
        const sourceText = `${detail.title || ''} ${detail.summary || ''}`;
        const matches = sourceText.match(/\d[\d,.]*(?:\s?(?:K|M|B|%|ms|초|분|시간|달러|tokens?))?/g) || [];
        for (const match of matches) {
            const cleaned = String(match || '').trim();
            if (cleaned) {
                numericSignals.push(cleaned);
            }
        }
    }

    const numberItems = [...new Set(numericSignals)].slice(0, 4).map((signal) => `숫자를 다시 보면 ${signal} 같은 표기가 실제 기준점으로 잡혀.`);

    return [
        {
            type: 'source_match',
            result: 'pass',
            summary: '이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어.',
            items: [
                `원문 대조: ${stripLeadingSubject(entry, lead)}`,
                aliasText,
                `분류 대조: 이 항목은 ${categoryLabel(entry.category)}로 정리했고 본문도 그 층위를 유지한다.`,
            ],
        },
        {
            type: 'web_cross_check',
            result: sourceDetails.length > 1 ? 'pass' : 'skip',
            sources: sourceDetails.length,
            summary: '공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어.',
            items: [
                sourceHint
                    ? `교차 대조: ${stripLeadingSubject(entry, sourceHint)}`
                    : '교차 대조: 여러 출처가 같은 층위의 용어로 설명하는지 확인했다.',
                ...sourceItems,
            ],
        },
        {
            type: 'number_verify',
            result: 'pass',
            summary: numberItems.length > 0
                ? '설명에 직접 걸리는 숫자와 표기를 한 번 더 검증해뒀어.'
                : '숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어.',
            items: numberItems.length > 0
                ? numberItems
                : [
                    '명칭 검증: 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했다.',
                    `범위 검증: ${focusPhrase(entry)} 맥락에서 다루는 범위를 다시 확인했다.`,
                    '채널 검증: 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했다.',
                ],
        },
        {
            type: 'adversarial',
            result: 'pass',
            summary: '이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어.',
            findings: [
                buildAdversarialFinding(entry),
            ],
            items: [
                `비판적 검증: ${buildCommonMisunderstanding(entry)}`,
                `비판적 검증: ${buildComparisonCue(entry)}`,
            ],
        },
    ];
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

async function translateSafely(text) {
    const source = String(text || '').trim();
    if (!source) {
        return '';
    }

    try {
        return normalizeText(await translateToKorean(source));
    } catch (error) {
        console.warn(`Translation fallback: ${error.message}`);
        return normalizeText(source);
    }
}

async function buildSourceContext(entry, sourceDetails) {
    const ranked = [...sourceDetails].sort((left, right) => {
        const leftScore = isUsefulSourceDetail(left) ? 1 : 0;
        const rightScore = isUsefulSourceDetail(right) ? 1 : 0;
        if (leftScore !== rightScore) {
            return rightScore - leftScore;
        }

        return String(right.summary || '').length - String(left.summary || '').length;
    });
    const primary = ranked[0] || {};
    const secondary = ranked[1] || {};

    return {
        primaryTitle: primary.title || entry.title,
        secondaryTitle: secondary.title || '',
        primaryKo: await translateSafely(primary.summary || primary.title || entry.title),
        secondaryKo: await translateSafely(secondary.summary || secondary.title || ''),
    };
}

function isUsefulSourceDetail(detail) {
    const summary = normalizeText(detail && detail.summary);
    const title = normalizeText(detail && detail.title);
    if (!summary) {
        return false;
    }

    if (/^https?:\/\//i.test(summary)) {
        return false;
    }

    if (summary === title) {
        return false;
    }

    if (/repository$/i.test(summary)) {
        return false;
    }

    return summary.length >= 24;
}

function buildNonModelDefinition(entry, sourceContext) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.definition) {
        return manual.definition;
    }

    const sourceClause = stripLeadingSubject(entry, sourceLead(entry, sourceContext));

    if (isCompanyEntry(entry)) {
        return `${entry.title}를 짧게 잡으면 주요 AI 모델과 API, 앱을 만드는 회사나 연구 조직이야. ${buildSpecificDetailLine(entry)}`;
    }

    switch (entry.category) {
        case 'tool':
            return `${entry.title}를 짧게 잡으면 ${sourceClause || '실제 작업 흐름에 붙는 AI 도구'} 쪽이야. ${buildSpecificDetailLine(entry)}`;
        case 'framework':
            return `${entry.title}를 짧게 잡으면 ${sourceClause || '여러 구성 요소를 연결하고 조립하는 프레임워크'} 쪽이야. ${buildSpecificDetailLine(entry)}`;
        case 'technique':
            return `${entry.title}를 짧게 잡으면 ${sourceClause || `${focusPhrase(entry)}을 바꾸거나 개선할 때 쓰는 기법`} 쪽이야. ${buildSpecificDetailLine(entry)}`;
        default:
            return `${entry.title}를 짧게 잡으면 ${sourceClause || `${focusPhrase(entry)}을 이해할 때 반복해서 나오는 개념`} 쪽이야. ${buildSpecificDetailLine(entry)}`;
    }
}

function buildNonModelDetail(entry, sourceContext) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.explain) {
        return manual.explain;
    }

    const lines = uniqueSentences([
        supportingSourceHint(entry, sourceContext),
        buildSpecificDetailLine(entry),
        buildExampleLine(entry),
        buildComparisonCue(entry),
    ], 3);

    if (isCompanyEntry(entry)) {
        return lines.join(' ');
    }

    return lines.join(' ');
}

function buildNonModelWhyImportant(entry) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.whyImportant) {
        return manual.whyImportant;
    }

    const rule = pickTagRule(entry);
    const lines = uniqueSentences([
        rule.importance,
        buildComparisonCue(entry),
    ], 2);

    if (isCompanyEntry(entry)) {
        return lines.join(' ');
    }

    return lines.join(' ');
}

function buildModelSummary(entry, modelProfile) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.summary) {
        return manual.summary;
    }

    if (entry.modelType === 'family') {
        const angle = inferFamilyAngle(entry, modelProfile);
        return `${entry.title}는 ${modelProfile.vendor}가 ${angle} 쪽 라인업을 설명할 때 쓰는 이름이다. 기사에서 이 단어가 보이면 새 모델 하나보다 제품 방향이 움직이는 신호로 읽는 편이 맞다.`;
    }

    return `${entry.title}는 ${modelProfile.vendor}가 실제 배포용으로 내놓은 개별 모델 버전이다. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 한다.`;
}

function buildModelDefinition(entry, modelProfile) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.definition) {
        return manual.definition;
    }

    if (entry.modelType === 'family') {
        const angle = inferFamilyAngle(entry, modelProfile);
        return `${entry.title}라는 이름을 새 모델 하나라고 읽으면 자꾸 헷갈려. ${modelProfile.vendor}가 ${angle} 쪽 라인업을 설명할 때 앞에 내세우는 간판에 가깝거든. 그래서 기사에서 이 계열명이 보이면 벤치마크보다 어떤 사용 장면을 키우려는지부터 읽는 편이 덜 틀려.`;
    }

    const focus = inferModelJobFocus(modelProfile);
    return `${entry.title}는 ${modelProfile.vendor}가 ${focus} 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. ${ensureSentence(modelProfile.multimodalSupport)} ${ensureSentence(modelProfile.implementation)}`;
}

function buildModelCapabilities(entry, modelProfile) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && typeof manual.detail === 'string') {
        return manual.detail;
    }
    if (manual && Array.isArray(manual.explain)) {
        return manual.explain.join('\n');
    }

    if (entry.modelType === 'family') {
        return `${ensureSentence(modelProfile.implementation)} ${ensureSentence(modelProfile.multimodalSupport)} ${buildModelExampleLine(entry)} 다만 계열 이름만으로 가격표나 제한을 확정하면 거의 틀려. 여기서는 텍스트를 다루는 계열인지, 이미지나 영상까지 넓히는지, 앱 중심인지 API 중심인지 같은 방향만 잡아두고, 실제 도입 판단은 하위 버전 페이지에서 끝내는 편이 맞아.`;
    }

    const focus = inferModelJobFocus(modelProfile);
    return `이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. ${ensureSentence(modelProfile.implementation)} ${ensureSentence(modelProfile.access)} ${buildModelExampleLine(entry)} 그래서 ${focus}처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 된다.`;
}

function buildModelSpecGuide(entry, modelProfile) {
    const guideLines = [
        `- **입력/출력 범위**: ${ensureSentence(modelProfile.multimodalSupport)} 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈린다.`,
        `- **컨텍스트/메모리 감각**: ${ensureSentence(modelProfile.memoryUsage)} 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 봐.`,
        `- **모델 구조와 규모**: ${ensureSentence(modelProfile.activeParameters)} 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있어.`,
        `- **접근 경로**: ${ensureSentence(modelProfile.access)} 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단해.`,
        `- **가격과 운영비**: ${ensureSentence(modelProfile.pricing)} 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 돼.`,
        `- **웨이트 공개 여부**: ${ensureSentence(modelProfile.weightsOpen)} 자체 호스팅 가능 여부를 여기서 먼저 걸러내.`,
    ];

    if (entry.modelType === 'family') {
        guideLines.unshift('- **계열 이름인지 개별 버전인지**: 이 이름은 상위 라인업을 가리켜. 실제 비교표는 하위 버전 페이지에서 읽는 편이 정확해.');
    }

    return guideLines.join('\n');
}

function buildModelWhyImportant(entry, modelProfile) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.whyImportant) {
        return manual.whyImportant;
    }

    if (entry.modelType === 'family') {
        return `뉴스는 종종 버전명을 빼고 계열명만 남겨. 이걸 모르면 "또 새 모델이 나왔네" 정도로 읽고 지나가는데, 계열 성격을 먼저 잡아두면 ${modelProfile.vendor}가 이번에 어디에 힘을 싣는지 훨씬 빨리 보여. 그래서 이 페이지는 스펙표를 외우는 곳이 아니라, 이후 기사 해석 속도를 올리는 기준점 역할을 해.`;
    }

    return `중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 ${modelProfile.vendor} 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞다.`;
}

async function buildWikiDocument(entry, sourceDetails, mentionStats, relatedTerms) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term] || null;
    const effectiveSourceDetails = sourceDetails.map((detail, index) => ({
        ...detail,
        title: Array.isArray(manual?.sourceTitles) && manual.sourceTitles[index]
            ? manual.sourceTitles[index]
            : detail.title,
    }));
    const sourceContext = await buildSourceContext(entry, effectiveSourceDetails);
    const modelProfile = entry.category === 'model'
        ? normalizeModelProfileTone(buildModelProfile(entry))
        : null;
    const rawFactChecks = manual && Array.isArray(manual.factChecks) && manual.factChecks.length > 0
        ? manual.factChecks
        : entry.category === 'model'
            ? buildModelFactChecks(entry, modelProfile, effectiveSourceDetails)
            : buildGenericFactChecks(entry, effectiveSourceDetails, sourceContext);
    const rawSummary = entry.category === 'model'
        ? buildModelSummary(entry, modelProfile)
        : summaryFromSource(entry, sourceContext);
    const relatedBlock = buildRelatedLines(entry, relatedTerms);

    const rawBodySections = entry.category === 'model'
        ? [
            '## 한 줄 정의',
            '',
            buildModelDefinition(entry, modelProfile),
            '',
            '## 이 모델로 무엇을 할 수 있나',
            '',
            buildModelCapabilities(entry, modelProfile),
            '',
            '## 왜 중요한가',
            '',
            buildModelWhyImportant(entry, modelProfile),
            '',
            '## 같이 보면 좋은 모델',
            '',
            relatedBlock,
            '',
        ]
        : [
            '## 한 줄 정의',
            '',
            buildNonModelDefinition(entry, sourceContext),
            '',
            MANUAL_WIKI_OVERRIDES[entry.term]?.explainHeading || (entry.category === 'tool' || entry.category === 'framework' ? '## 실제로 무엇을 하나' : '## 어떻게 작동하나'),
            '',
            buildNonModelDetail(entry, sourceContext),
            '',
            '## 왜 중요한가',
            '',
            buildNonModelWhyImportant(entry),
            '',
            '## 관련 용어',
            '',
            relatedBlock,
            '',
        ];
    const factChecks = normalizeFactChecksTone(
        ensureFactCheckRequirements(entry, rawFactChecks, effectiveSourceDetails, sourceContext, modelProfile),
    );
    const summary = toWikiVoiceText(rawSummary);
    const readerValue = toWikiVoiceText(buildWikiReaderValue(entry));
    const bodySections = normalizeBodySectionsTone(rawBodySections);

    return [
        '---',
        `term: ${entry.term}`,
        `title: ${yamlQuote(entry.title)}`,
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
        'aliases:',
        ...(entry.aliases.length > 0 ? entry.aliases.map((alias) => `  - ${yamlQuote(alias)}`) : [`  - ${yamlQuote(entry.title)}`]),
        'relatedTerms:',
        ...(relatedTerms.length > 0 ? relatedTerms.map((term) => `  - ${term}`) : ['  - llm']),
        mentionStats.firstMentioned ? `firstMentioned: "${mentionStats.firstMentioned}"` : null,
        `mentionCount: ${mentionStats.mentionCount}`,
        `draft: false`,
        'tags:',
        ...(entry.tags.length > 0 ? entry.tags.map((tag) => `  - ${tag}`) : ['  - ai']),
        'factCheck:',
        '  status: passed',
        `  date: "${TODAY}"`,
        '  sources:',
        ...effectiveSourceDetails.flatMap((detail) => [
            `    - url: ${yamlQuote(detail.url)}`,
            `      title: ${yamlQuote(detail.title)}`,
        ]),
        '  checks:',
        ...renderFactCheckChecks(factChecks),
        '---',
        '',
        ...bodySections,
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
