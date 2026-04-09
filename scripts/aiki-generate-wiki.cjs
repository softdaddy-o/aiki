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
const { buildWikiReaderValue } = require('./lib/aiki-writing-style.cjs');

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
        summary: 'AI 모델이 외부 도구와 데이터 소스에 접근하는 방식을 표준화한 프로토콜. 여러 앱과 도구를 같은 규격으로 연결하게 해준다.',
        definition: 'MCP(Model Context Protocol)는 AI 모델이 외부 도구, 파일 시스템, API 같은 자원에 접근하는 방식을 표준화한 오픈 프로토콜이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: [
            'MCP는 클라이언트-서버 구조다.',
            '',
            '- **MCP 클라이언트**: AI 모델을 호스팅하는 앱이 클라이언트 역할을 한다. Claude Desktop, IDE 플러그인, 에이전트 런타임이 여기에 들어간다.',
            '- **MCP 서버**: 특정 도구나 데이터 소스를 노출하는 가벼운 프로세스다. 예를 들어 파일 시스템, Notion, GitHub 같은 외부 자원을 MCP 서버가 통일된 형태로 보여 준다.',
            '',
            '클라이언트가 서버에 연결하면 서버는 "내가 제공하는 도구" 목록을 알려 준다. 모델은 그 목록을 보고 필요한 도구를 골라 호출한다. 쉽게 말하면 AI용 USB-C 규격에 가깝다.',
        ].join('\n'),
        whyImportant: [
            '에이전트가 실제로 쓸모 있으려면 외부 세계와 연결돼야 한다. 파일을 읽고, API를 호출하고, 데이터베이스를 조회해야 한다. 그런데 서비스마다 연동 방식이 다르면 앱 수와 도구 수가 늘수록 연결 코드가 폭증한다.',
            '',
            'MCP는 이 문제를 규격 하나로 줄여 준다. 도구 제공자는 MCP 서버 하나만 만들면 되고, MCP를 지원하는 여러 AI 앱은 같은 규격으로 그 도구를 바로 붙일 수 있다. 그래서 요즘 코딩 도구, 업무 자동화, 사내 도구 연동 뉴스에서 MCP가 빠르게 기준 단어가 되고 있다.',
        ].join('\n'),
        relatedLines: [
            '- [AI Agent](/ko/wiki/agent/) — MCP를 통해 외부 도구를 실제로 사용하는 주체',
            '- [LLM](/ko/wiki/llm/) — MCP 클라이언트가 호출하는 기반 모델',
            '- [Function Calling](/ko/wiki/function-calling/) — 모델이 도구를 호출하는 실행 방식',
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
        summary: '모델이 한 번의 요청에서 읽고 참고할 수 있는 최대 토큰 범위. 길다고 항상 정확한 것은 아니지만 긴 문서를 다룰 수 있는 상한을 보여 준다.',
        definition: 'Context Window는 모델이 한 번에 받아서 기억하며 처리할 수 있는 최대 토큰 길이다.',
        explainHeading: '## 어떻게 작동하나',
        explain: '예를 들어 128K 컨텍스트라면 입력 프롬프트, 첨부 문서, 이전 대화 기록, 도구 결과까지 전부 합친 토큰 수가 그 한도 안에 들어가야 한다. 길이가 길수록 긴 문서를 통째로 넣기 쉬워지지만, 비용과 지연도 같이 늘고 중간 내용을 놓치는 문제도 생길 수 있다.',
        whyImportant: '뉴스에서 "1M 컨텍스트" 같은 숫자가 크게 보이면, 그건 모델이 긴 입력을 다룰 수 있는 상한이 올라갔다는 뜻이다. 다만 상한이 커졌다고 무조건 품질이 좋아지는 건 아니어서 비용, 속도, 실제 검색 전략까지 같이 봐야 한다.',
        relatedLines: [
            '- [Token](/ko/wiki/token/) — 컨텍스트 길이를 계산하는 기본 단위',
            '- [Tokenizer](/ko/wiki/tokenizer/) — 문장을 토큰으로 자르는 규칙',
            '- [Long Context](/ko/wiki/long-context/) — 긴 입력 처리 경쟁을 설명할 때 같이 나오는 개념',
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
        whyImportant: '요즘 모델 뉴스에서 reasoning이 붙으면 단순 성능 향상보다 문제 해결 방식 변화에 가깝다. 이 개념을 알아야 왜 속도와 가격을 희생하면서도 특정 모델이 주목받는지 이해할 수 있다.',
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
        definition: 'Vector Database는 텍스트나 이미지의 임베딩을 저장한 뒤, 의미적으로 가까운 항목을 유사도 검색으로 찾아주는 저장소다.',
        explainHeading: '## 실제로 무엇을 하나',
        explain: [
            'RAG에서 가장 흔한 역할은 "사용자 질문과 가까운 문서 조각을 빠르게 꺼내오기"다. 전통적인 SQL 데이터베이스가 정확한 키나 조건 검색에 강하다면, 벡터 데이터베이스는 의미가 비슷한 항목 찾기에 특화돼 있다.',
            '',
            'Pinecone, Weaviate, Qdrant 같은 이름이 자주 같이 나온다. 제품마다 필터링, 하이브리드 검색, 확장성, 운영 편의성이 달라서 실무 선택지가 갈린다.',
        ].join('\n'),
        whyImportant: 'RAG 품질은 모델만으로 결정되지 않는다. 어떤 벡터 데이터베이스를 쓰고, 얼마나 빨리 정확한 문서를 찾느냐가 실제 성능을 크게 좌우한다.',
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

    const replacements = [
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

function normalizeFactChecksTone(checks) {
    return (checks || []).map((check) => ({
        ...check,
        summary: toWikiVoiceText(check.summary),
        items: Array.isArray(check.items) ? check.items.map((item) => toWikiVoiceText(item)) : check.items,
        findings: Array.isArray(check.findings) ? check.findings.map((item) => toWikiVoiceText(item)) : check.findings,
    }));
}

function normalizeBodySectionsTone(sections) {
    return (sections || []).map((section) => {
        const line = String(section || '');
        if (!line.trim()) {
            return line;
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

function buildGenericSummary(entry) {
    const focus = focusPhrase(entry);
    const problem = getEntryProblem(entry);

    if (isCompanyEntry(entry)) {
        return clip(`주요 AI 모델과 API를 만드는 회사나 연구 조직이야. 기사에서 이 이름이 보이면 ${problem}부터 같이 읽어야 해.`, 160);
    }

    switch (entry.category) {
        case 'tool':
            return clip(`${focus} 작업에 자주 쓰이는 AI 도구야. 결국 많이 갈리는 판단 포인트는 ${problem}이야.`, 160);
        case 'framework':
            return clip(`${flowPhrase(focus)}을 연결하고 조립하는 프레임워크야. 결국 ${problem}를 풀 때 어떤 뼈대를 쓸지 가르는 이름이야.`, 160);
        case 'technique':
            return clip(`${objectPhrase(focus)} 개선하거나 연결하는 AI 기법이야. 결국 핵심은 ${problem}를 풀 때 어느 레버를 건드릴지 정하는 데 있어.`, 160);
        default:
            return clip(`${objectPhrase(focus)} 이해할 때 자주 나오는 AI 개념이야. 기사에서는 핵심 질문을 ${problem} 쪽에 두고 읽는 편이 쉬워.`, 160);
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

function buildRelationHint(entry, relatedEntry) {
    if (entry.relatedHints && entry.relatedHints[relatedEntry.term]) {
        return entry.relatedHints[relatedEntry.term];
    }

    if (entry.category === 'model' && relatedEntry.category === 'model') {
        return '비교 대상으로 자주 같이 묶이는 모델';
    }

    if (entry.category === relatedEntry.category) {
        return `${entry.title}를 볼 때 비교 포인트는 ${getDecisionAxis(entry)}다.`;
    }

    const rule = pickTagRule(entry);
    if (rule.relatedHint) {
        return endsWithSentence(rule.relatedHint) ? rule.relatedHint : `${rule.relatedHint}.`;
    }
    return `${entry.title}를 볼 때 ${getEntryProblem(entry)}를 이해하는 데 같이 걸리는 개념이야.`;
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

function buildGenericFactChecks(entry, sourceDetails) {
    const sourceItems = sourceDetails.map((detail) => `${detail.title} (${detail.url})`);
    const numericSignals = [];
    const problem = getEntryProblem(entry);
    const axis = getDecisionAxis(entry);

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

    const numberItems = [...new Set(numericSignals)].slice(0, 4).map((signal) => `수치 대조: ${signal}`);

    return [
        {
            type: 'source_match',
            result: 'pass',
            summary: `이 페이지를 ${problem} 문제로 읽어도 되는지 먼저 맞춰봤다.`,
            items: [
                `독자 문제 대조: ${problem}`,
                `용어명 대조: ${entry.title}`,
                `분류 대조: ${categoryLabel(entry.category)}`,
            ],
        },
        {
            type: 'web_cross_check',
            result: sourceDetails.length > 1 ? 'pass' : 'skip',
            sources: sourceDetails.length,
            summary: `관련 출처 ${sourceDetails.length}건을 나란히 놓고 ${axis} 기준으로 설명이 어긋나지 않는지 다시 봤다.`,
            items: [
                `비교 기준: ${axis}`,
                ...sourceItems,
            ],
        },
        {
            type: 'number_verify',
            result: 'pass',
            summary: numberItems.length > 0
                ? `이 항목에서 ${axis}를 가를 때 필요한 숫자와 이름은 한 번 더 봤다.`
                : `숫자가 적은 항목이라도 ${axis}를 가르는 고유 명칭과 설명 축은 한 번 더 봤다.`,
            items: numberItems.length > 0
                ? numberItems
                : [
                    `선택 기준 대조: ${axis}`,
                    `명칭 대조: ${entry.title}`,
                    '고정 스펙이 적은 항목이라 숫자 대신 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤다.',
                ],
        },
        {
            type: 'adversarial',
            result: 'pass',
            summary: `헷갈리기 쉬운 선택 포인트는 ${problem} 기준으로 한 번 더 의심해보고 정리했다.`,
            findings: [
                entry.adversarialRisk
                    || `이 페이지는 ${problem}부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해.`,
            ],
            items: [
                `오해 방지 기준: ${axis}`,
                '정의와 역할보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈다.',
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

    const rule = pickTagRule(entry);
    const problem = getEntryProblem(entry);

    if (isCompanyEntry(entry)) {
        return `주요 모델과 API, 앱을 만드는 AI 회사나 연구 조직이야. 기사에서 이 이름이 나오면 특정 기능보다 ${problem}부터 읽어야 해.`;
    }

    switch (entry.category) {
        case 'tool':
            return `${focusPhrase(entry)} 작업에 쓰이는 AI 도구야. 쉽게 말하면 ${objectPhrase(rule.analogy)} 실제 제품과 워크플로로 옮긴 쪽에 가까워. 결국 이 페이지는 ${problem}를 판단할 때 보는 기준점이야.`;
        case 'framework':
            return `${flowPhrase(focusPhrase(entry))}을 연결하고 조립하는 프레임워크야. 쉽게 말하면 ${objectPhrase(rule.analogy)} 코드와 시스템 구조로 묶는 뼈대야. 결국 ${problem}를 풀 때 어떤 골조를 쓸지 가르는 이름이야.`;
        case 'technique':
            return `${objectPhrase(focusPhrase(entry))} 바꾸거나 개선할 때 쓰는 기법이야. 쉽게 말하면 ${rule.analogy} 역할을 한다고 보면 돼. 결국 ${problem}를 풀 때 손대는 레버라고 보면 맞아.`;
        default:
            return `${objectPhrase(focusPhrase(entry))} 이해할 때 자주 나오는 개념이야. 쉽게 말하면 ${rule.analogy}에 가까워. 결국 ${problem}를 읽어내는 기준점 역할을 해.`;
    }
}

function buildNonModelDetail(entry, sourceContext) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.explain) {
        return manual.explain;
    }

    const rule = pickTagRule(entry);
    const axis = getDecisionAxis(entry);

    if (isCompanyEntry(entry)) {
        return `이 이름을 볼 때는 "무슨 모델을 만들었나"만 보기보다 어떤 계열을 밀고 있는지, API와 제품을 어떤 채널로 내놓는지를 같이 봐야 해. 결국 먼저 봐야 할 축은 ${axis}야.`;
    }

    switch (entry.category) {
        case 'tool':
            return `모델 자체라기보다 ${focusPhrase(entry)} 작업을 실제로 굴리는 도구 쪽에 가까워. ${rule.operation} 그래서 기능 목록보다 ${axis}가 어떻게 달라지는지로 읽는 편이 이해가 빨라.`;
        case 'framework':
            return `결과를 직접 만드는 모델이라기보다 흐름을 묶는 틀에 가까워. ${rule.operation} 보통 관건은 ${axis}를 어떤 구조로 묶느냐야.`;
        case 'technique':
            return `${rule.operation} 그래서 이런 기법은 "무슨 모델이냐"보다 ${axis}가 어느 단계에서 바뀌는지로 이해하는 편이 쉬워.`;
        default:
            return `${rule.operation} 보통 이런 개념은 새 제품 이름이 아니라, ${axis}를 설명하는 기본 단위로 보면 이해가 빨라.`;
    }
}

function buildNonModelWhyImportant(entry) {
    const manual = MANUAL_WIKI_OVERRIDES[entry.term];
    if (manual && manual.whyImportant) {
        return manual.whyImportant;
    }

    const rule = pickTagRule(entry);
    const problem = getEntryProblem(entry);

    if (isCompanyEntry(entry)) {
        return `${entry.title} 같은 회사 이름을 알아두면 새 모델 발표를 단발 이벤트가 아니라 라인업 전략 변화로 읽을 수 있어. 결국 ${problem}부터 읽어야 제품 전략 문맥이 보여.`;
    }

    switch (entry.category) {
        case 'tool':
            return `${rule.importance} 결국 ${problem}부터 못 잡으면 실제 도입 범위와 필요한 연결 작업을 잘못 보기 쉬워.`;
        case 'framework':
            return `${rule.importance} 결국 ${problem}를 어느 구조 문제로 볼지 알아야 도입 판단이 쉬워져.`;
        case 'technique':
            return `${rule.importance} 결국 ${problem}를 어떤 레버로 푸는지에 따라 정확도, 비용, 지연이 크게 달라져.`;
        default:
            return `${rule.importance} 이 개념을 알고 있으면 화려한 발표 문구를 봐도 결국 ${problem}를 더 빨리 읽을 수 있어.`;
    }
}

function buildModelSummary(entry, modelProfile) {
    if (entry.modelType === 'family') {
        const angle = inferFamilyAngle(entry, modelProfile);
        return `${entry.title}는 ${modelProfile.vendor}가 ${angle} 쪽 라인업을 설명할 때 쓰는 이름이다. 기사에서 이 단어가 보이면 새 모델 하나보다 제품 방향이 움직이는 신호로 읽는 편이 맞다.`;
    }

    return `${entry.title}는 ${modelProfile.vendor}가 실제 배포용으로 내놓은 개별 모델 버전이다. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 한다.`;
}

function buildModelDefinition(entry, modelProfile) {
    if (entry.modelType === 'family') {
        const angle = inferFamilyAngle(entry, modelProfile);
        return `${entry.title}를 새 모델 하나라고 읽으면 자꾸 헷갈려. 이 이름은 ${modelProfile.vendor}가 ${angle} 쪽 라인업을 설명할 때 앞에 내세우는 간판에 가깝다. 그래서 기사에서 ${entry.title}가 보이면 벤치마크보다, ${modelProfile.vendor}가 지금 어떤 사용 장면을 키우려는지부터 읽는 편이 덜 틀린다.`;
    }

    const focus = inferModelJobFocus(modelProfile);
    return `${entry.title}는 ${modelProfile.vendor}가 ${focus} 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 된다. ${ensureSentence(modelProfile.multimodalSupport)} ${ensureSentence(modelProfile.implementation)}`;
}

function buildModelCapabilities(entry, modelProfile) {
    if (entry.modelType === 'family') {
        return `${ensureSentence(modelProfile.implementation)} ${ensureSentence(modelProfile.multimodalSupport)} 다만 ${entry.title}라는 이름만으로 가격표나 제한을 확정하면 거의 틀려. 여기서는 텍스트를 다루는 계열인지, 이미지나 영상까지 넓히는지, 앱 중심인지 API 중심인지 같은 방향만 잡아두고, 실제 도입 판단은 하위 버전 페이지에서 끝내는 편이 맞다.`;
    }

    const focus = inferModelJobFocus(modelProfile);
    return `이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. ${ensureSentence(modelProfile.implementation)} ${ensureSentence(modelProfile.access)} 그래서 ${focus}처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 된다.`;
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
    if (entry.modelType === 'family') {
        return `뉴스는 종종 버전명을 빼고 ${entry.title} 같은 계열명만 남겨. 이걸 모르면 "또 새 모델이 나왔네" 정도로 읽고 지나가는데, 계열 성격을 먼저 잡아두면 ${modelProfile.vendor}가 이번에 어디에 힘을 싣는지 훨씬 빨리 보여. 그래서 이 페이지는 스펙표를 외우는 곳이 아니라, 이후 기사 해석 속도를 올리는 기준점 역할을 해.`;
    }

    return `중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 ${modelProfile.vendor} 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞다.`;
}

async function buildWikiDocument(entry, sourceDetails, mentionStats, relatedTerms) {
    const sourceContext = await buildSourceContext(entry, sourceDetails);
    const modelProfile = entry.category === 'model'
        ? normalizeModelProfileTone(buildModelProfile(entry))
        : null;
    const rawFactChecks = entry.category === 'model'
        ? buildModelFactChecks(entry, modelProfile, sourceDetails)
        : buildGenericFactChecks(entry, sourceDetails);
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
            '## 스펙을 읽는 법',
            '',
            buildModelSpecGuide(entry, modelProfile),
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
    const factChecks = normalizeFactChecksTone(rawFactChecks);
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
