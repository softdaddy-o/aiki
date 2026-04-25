---
term: gpt-oss
title: gpt-oss(지피티 오에스에스)
lang: ko
summary: >-
  gpt-oss(지피티 오에스에스)는 OpenAI가 공개한 오픈 웨이트 추론 모델 계열이야. API로만 쓰는 GPT가 아니라 Hugging
  Face에서 내려받아 로컬·온디바이스·자체 GPU에 올릴 수 있는 OpenAI 계열이라는 점이 핵심이야.
readerValue: 'gpt-oss가 왜 20b와 120b 두 모델로 나뉘고, 언제 API보다 로컬 배포 문맥에서 더 자주 언급되는지 바로 구분할 수 있어.'
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    gpt-oss는 120B와 20B 두 계열로 공개됐고, 공식 발표 기준 120B는 80GB 메모리, 20B는 16GB 메모리 안에서 돌릴
    수 있게 맞춰졌다. API 과금보다 어떤 GPU 한 장으로 돌릴 수 있는지가 먼저 눈에 들어오는 타입이야.
  implementation: >-
    OpenAI가 낸 오픈 웨이트 reasoning MoE 계열이야. 툴 사용과 코딩, 문제 해결 쪽을 염두에 둔 라인업이고,
    PyTorch·Metal·llama.cpp·vLLM 같은 실행 경로가 같이 준비됐다. 이렇게 보면 돼.
  activeParameters: >-
    공식 자료 기준 gpt-oss-120b는 총 117B에 토큰당 5.1B 활성, gpt-oss-20b는 총 21B에 토큰당 3.6B
    활성이야. family 페이지에서는 보통 20B와 120B 중 어느 쪽을 말하는지부터 같이 봐야 한다. 이렇게 보면 돼.
  multimodalSupport: >-
    현재 공개 라인업은 텍스트 중심 reasoning 모델로 보는 편이 맞아. 공식 설명도 STEM, coding, tool use와 일반
    지식 쪽에 초점이 맞춰져 있어.
  access: >-
    Hugging Face에서 웨이트를 받고 로컬이나 자체 인프라에 올릴 수 있고, Ollama·LM Studio·llama.cpp·vLLM
    같은 배포 채널이 런치부터 붙어 있어.
  pricing: >-
    OpenAI가 API 과금형으로 파는 모델이 아니라 Apache 2.0 오픈 웨이트다. 비용은 토큰표보다 호스팅 GPU와 추론 스택
    선택에서 갈린다. 이렇게 보면 돼.
  weightsOpen: Apache 2.0 기반 오픈 웨이트 공개. 이렇게 보면 돼.
  vendor: OpenAI
aliases:
  - gpt oss
relatedTerms:
  - chatgpt
  - codex
  - chain-of-thought
  - gpt-4o
mentionCount: 0
draft: false
tags:
  - openai
  - open-weight
  - reasoning
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: 'https://openai.com/index/introducing-gpt-oss'
      title: Introducing gpt-oss
    - url: 'https://openai.com/index/gpt-oss-model-card/'
      title: gpt-oss-120b &amp; gpt-oss-20b Model Card
  checks:
    - type: source_match
      result: pass
      summary: gpt-oss를 계열 이름과 배포 방식 중심으로 다시 맞춰봤어.
      items:
        - >-
          독자 문제 대조: gpt-oss를 단일 API 모델이 아니라 20b와 120b를 묶는 오픈 웨이트 계열 이름으로 읽게
          맞춰봤어.
        - >-
          OpenAI 발표가 강조한 Apache 2.0, 로컬·온디바이스·서드파티 배포, 에이전트 기능을 본문 설명과 같은 축으로
          맞췄어.
        - API형 GPT와 달리 웨이트를 직접 내려받는 흐름이 핵심이라는 점을 첫 문단부터 드러냈어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '발표문, 모델 카드, API 문서를 나란히 보고 운영 정보만 남겼어.'
      items:
        - >-
          비교 기준: 출시 발표는 라이선스와 배포 범위를, 모델 카드는 안전 맥락을, OpenAI API 모델 페이지는
          컨텍스트·파라미터·엔드포인트를 보여줘서 셋이 겹치는 운영 정보만 남겼어.
        - >-
          세 소스 모두 gpt-oss를 open-weight reasoning 계열로 설명해서, API 전용 모델처럼 적는 해석을
          막았어.
        - '안전성 문구는 모델 카드 쪽에만 두고, 배포와 하드웨어 설명은 발표문·API 문서 쪽 근거로만 적었어.'
    - type: number_verify
      result: pass
      summary: '메모리, 컨텍스트, 파라미터처럼 숫자 오해가 큰 부분만 다시 봤어.'
      items:
        - >-
          gpt-oss-120b가 117B 파라미터에 5.1B active, gpt-oss-20b가 21B에 3.6B active인지
          다시 맞춰봤어.
        - '두 모델 모두 131,072 컨텍스트와 131,072 max output tokens로 적혀 있는지 다시 봤어.'
        - '120b는 80GB 메모리, 20b는 16GB 메모리 안에서 돌릴 수 있게 설명하는지 발표문 기준으로 다시 봤어.'
    - type: adversarial
      result: pass
      summary: 오픈 웨이트와 오픈소스를 같은 말처럼 쓰는 오해를 막았어.
      items:
        - >-
          gpt-oss는 Apache 2.0 오픈 웨이트라서 자유도가 크지만, OpenAI가 직접 호스팅해 주는 API 모델과 같은
          운영 경험은 아니라는 점을 남겼어.
        - >-
          로컬 실행이 된다는 말만 보고 아무 PC에서나 쉽게 최고 성능이 난다고 오해하지 않게, 20b와 120b의 하드웨어 차이를
          같이 적었어.
      findings:
        - >-
          gpt-oss는 이름만 보면 GPT API 변형처럼 보이지만, 실제로는 배포·라이선스 판단이 먼저 필요한 계열이라서 그 차이를
          따로 남겼어.
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "a30850cb3a29c468"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
gpt-oss는 [OpenAI](/ko/wiki/openai/)가 공개한 오픈 [웨이트](/ko/wiki/weight/) [추론](/ko/wiki/inference/) 모델 계열이야. 하나의 단일 모델 이름이라기보다 gpt-oss-120b와 gpt-oss-20b를 묶어 부르는 이름으로 보면 돼.
## 이 모델로 무엇을 할 수 있나
실무에서는 [Hugging Face](/ko/wiki/hugging-face/)에서 웨이트를 받아 [로컬](/ko/wiki/local-llm/) PC, [온디바이스](/ko/wiki/on-device/) 제품, 사내 GPU 서버, 서드파티 [추론](/ko/wiki/inference/) 플랫폼에 직접 올려 쓰는 쪽이 핵심이야. [OpenAI](/ko/wiki/openai/)는 [Apache 2.0](/ko/wiki/apache/) 라이선스, 131,072 컨텍스트, [함수 호출](/ko/wiki/function-calling/)·구조화 출력·웹 브라우징·Python 실행 같은 [에이전트](/ko/wiki/agent/) 기능을 같이 내세워서 API 비용보다 배포 경로와 하드웨어를 먼저 고르는 모델로 자리잡게 했어. 20b는 저지연 [로컬](/ko/wiki/local-llm/)·특화 용도, 120b는 H100 한 장급 고성능 쪽으로 읽으면 감이 빨라.
## 왜 중요한가
gpt-oss가 중요한 이유는 [OpenAI](/ko/wiki/openai/) 모델을 꼭 [OpenAI API](/ko/wiki/openai-api/) 안에서만 써야 한다는 전제를 깨기 때문이야. 발표 기준으로 120b는 80GB [메모리](/ko/wiki/memory/), 20b는 16GB [메모리](/ko/wiki/memory/) 안에서 돌릴 수 있게 맞춰졌고, [llama.cpp](/ko/wiki/llama.cpp/)·[vLLM](/ko/wiki/vllm/)·[Ollama](/ko/wiki/ollama/)·[LM Studio](/ko/wiki/lm-studio/) 같은 배포 경로까지 출시 시점부터 붙어서 실제 실험과 제품화 거리가 꽤 짧아졌어. 그래서 이 이름이 나오면 성능표보다 먼저 라이선스, VRAM, [추론](/ko/wiki/inference/) 스택을 보는 게 맞아.
## 같이 보면 좋은 모델
- [ChatGPT](/ko/wiki/chatgpt/): [ChatGPT](/ko/wiki/chatgpt/)는 [OpenAI](/ko/wiki/openai/)의 서비스 이름이고, gpt-oss는 직접 받아서 돌릴 수 있는 오픈 [웨이트](/ko/wiki/weight/) 계열이야. 둘을 같은 배포 방식으로 보면 비용과 제어권 판단이 완전히 꼬여.
- [Codex](/ko/wiki/codex/): [Codex](/ko/wiki/codex/)는 코딩 워크플로에 붙는 [OpenAI](/ko/wiki/openai/) 제품·모델 문맥이고, gpt-oss는 직접 서빙 가능한 오픈 [웨이트](/ko/wiki/weight/) 쪽이야. 둘 다 개발자에게 중요하지만 하나는 관리형 경험, 다른 하나는 배포 자유도가 중심이야.
- [GPT-4o](/ko/wiki/gpt-4o/): [GPT-4o](/ko/wiki/gpt-4o/)는 [OpenAI API](/ko/wiki/openai-api/)와 [ChatGPT](/ko/wiki/chatgpt/) 중심의 범용 [멀티모달](/ko/wiki/multimodal/) 모델이고, gpt-oss는 텍스트 중심 추론과 [로컬](/ko/wiki/local-llm/) 배포에 더 초점이 있어. 그래서 기사에서 둘이 같이 나오면 [멀티모달](/ko/wiki/multimodal/) 경험 비교인지 배포 전략 비교인지 먼저 갈라서 봐야 해.
- [Chain-of-thought](/ko/wiki/chain-of-thought/): gpt-oss는 [reasoning](/ko/wiki/reasoning/) effort 조절과 full [chain-of-thought](/ko/wiki/chain-of-thought/) 접근성을 강하게 내세운 계열이야. 그래서 이 용어와 같이 나오면 단순 모델 이름보다 디버깅·검증 흐름까지 포함한 운영 이야기를 읽게 돼.
