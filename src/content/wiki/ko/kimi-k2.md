---
term: kimi-k2
title: Kimi K2 (키미 K2)
lang: ko
summary: >-
  Kimi K2 (키미 K2)는 Moonshot AI가 만든 에이전트형 MoE 언어모델 계열이야. 기사에서 이 이름이 보이면 대화형 챗봇보다
  코딩, 툴 호출, 긴 작업 흐름 자동화 쪽 모델로 읽으면 쉬워.
readerValue: '`kimi-k2`가 원본 공개 웨이트 전체를 말하는지, 아니면 현재 플랫폼의 0905 API를 말하는지 바로 구분하는 데 도움돼.'
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    Kimi K2 계열은 0711 preview 기준 1T 총 파라미터에 32B 활성 구조이고, 0905 preview와 thinking
    계열은 256K 컨텍스트까지 올라간다. family 페이지라 어떤 서브모델을 쓰는지 먼저 봐야 한다. 이렇게 보면 돼.
  implementation: >-
    Moonshot AI가 코드와 agent 작업에 맞춰 공개한 MoE 계열이야. K2, K2 turbo, K2 thinking처럼 같은
    뿌리에서 응답 속도와 추론 깊이를 나눠 가져간다. 이렇게 보면 돼.
  activeParameters: >-
    공식 문서에서 가장 구체적인 수치는 kimi-k2-0711-preview의 1T 총 / 32B 활성이야. 최신 0905 계열은 컨텍스트와
    coding 실전성을 더 키운 라인으로 읽으면 돼.
  multimodalSupport: >-
    K2 본체는 코딩·agent 작업 중심이고, 최신 K2.5 쪽에서 비전까지 넓어진다. K2 family 페이지에서는
    thinking/non-thinking과 turbo 유무를 같이 봐야 한다. 이렇게 보면 돼.
  access: >-
    Kimi API 플랫폼에서 여러 K2 파생 모델을 선택해 쓸 수 있어. Claude Code/Cline류 설정 가이드도 같이 제공돼서
    개발 도구 연결이 빠른 편이야.
  pricing: >-
    K2 계열은 API 서비스형 가격표를 봐. turbo와 thinking 모델은 속도와 비용이 다르니 family 이름만 보고 예산을
    고정하면 안 돼.
  weightsOpen: 서비스형 제공 중심. 이렇게 보면 돼.
  vendor: Moonshot AI / Kimi
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - kimi k2
  - kimi-k2
relatedTerms:
  - chain-of-thought
  - o1
  - o3
  - gpt-oss
mentionCount: 0
draft: false
tags:
  - moonshot
  - agentic-coding
  - reasoning
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: 'https://platform.kimi.ai/docs/models'
      title: Model List - Kimi API Platform
    - url: 'https://platform.kimi.ai/'
      title: Kimi API Platform
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: Kimi K2를 계열 이름과 현재 API 표기까지 나눠서 공식 문서에 맞춰봤어.
      items:
        - >-
          독자 문제 대조: Kimi K2를 그냥 벤치마크 이름이 아니라 Moonshot AI의 에이전트 코딩용 모델 계열로 먼저
          이해하게 맞춰봤어.
        - >-
          소스 대조: Hugging Face 모델 카드의 1T 총 파라미터, 32B 활성, 128K 기본 맥락과 Kimi 플랫폼 문서의
          0905·thinking 라인업 설명을 함께 반영했어.
        - '운영 대조: 공식 플랫폼에서 `kimi-k2`가 현재 K2 0905 가격표와 함께 노출된다는 점을 본문 운영 설명에 맞췄어.'
      findings:
        - 페이지 범위를 원본 공개 웨이트와 현재 플랫폼 별칭을 함께 설명하는 계열 페이지로 잡았어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '오픈 웨이트 카드, 모델 목록, 가격 페이지를 나란히 보고 낡기 쉬운 표현을 줄였어.'
      items:
        - >-
          비교 기준: Hugging Face 모델 카드로 공개 웨이트 사양을 보고, Kimi API 모델 목록과 가격 페이지로 현재
          서비스 쪽 별칭과 운영 조건을 맞춰봤어.
        - >-
          교차 확인: 0711은 128K, 0905는 256K라는 문구가 모델 카드와 플랫폼 문서에서 같은 축으로 이어지는지 다시
          봤어.
        - >-
          교차 확인: K2가 비전 모델이 아니라 코드·에이전트 중심 텍스트 모델이라는 설명이 가격 문서와 모델 목록에서 함께 유지되는지
          확인했어.
      findings:
        - 지금 기사 문맥의 `kimi-k2`는 대개 플랫폼의 0905 계열을 가리킨다는 점을 남겼어.
    - type: number_verify
      result: pass
      sources: 3
      summary: '컨텍스트, 파라미터, 가격 숫자만 따로 다시 봤어.'
      items:
        - >-
          정량 점검: 공개 웨이트 `Kimi-K2-Instruct`는 1T total, 32B activated, 128K
          context로 표기돼.
        - >-
          정량 점검: `Kimi-K2-Instruct-0905`와 `kimi-k2-0905-preview`는 256K context로
          안내돼.
        - >-
          정량 점검: 플랫폼 홈과 가격 문서에서 K2 계열은 입력 1M 토큰당 0.60달러, 출력 1M 토큰당 2.50달러, cache
          hit 1M 토큰당 0.15달러로 보였어.
      findings:
        - '가격은 바뀔 수 있어서 본문에는 실사용 감각으로만 넣고, 세부 숫자는 사실 확인 항목에도 남겼어.'
    - type: adversarial
      result: pass
      sources: 3
      summary: K2를 단일 버전 하나나 멀티모달 모델로 오해할 표현은 막았어.
      items:
        - >-
          오해 점검: Kimi K2를 K2.5와 섞지 않게, 현재 최고급 멀티모달 모델은 K2.5고 K2는 별도 계열이라는 선을
          유지했어.
        - >-
          오해 점검: 공개 웨이트 모델 전체와 플랫폼 API 별칭을 한 문장에 뭉개지 않고, 원본 0711과 현재 0905 운영 맥락을
          나눠 적었어.
        - '과장 방지: 최고 성능 같은 단정 대신 코딩 에이전트, 툴 호출, 긴 작업 흐름에 강하다는 실사용 설명으로 눌렀어.'
      findings:
        - 독자가 오픈 모델 하나와 호스팅 API 별칭을 같은 층위로 읽는 혼선을 줄였어.
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.1.0
    tone-editor: 1.6.0
    structure-editor: 1.1.0
  guideVersions:
    tone: 2.0.0
    common: 2.3.0
    wiki: 3.1.2
  panelVerdict: pass
  contentHash: eb6a3f24c6b6c987
  reviewedAt: '2026-04-25T09:55:57Z'
formatVersion: 2
---
## 한 줄 정의
Kimi K2는 Moonshot AI가 만든 [에이전트](/ko/wiki/agent/) 지향 MoE 언어모델 계열이야. 그냥 말을 잘하는 챗봇보다 코드 작성, 툴 호출, 여러 단계 작업 실행에 맞춘 모델이라고 보면 감이 빨리 와. 지금 Kimi 플랫폼에서 `kimi-k2`라고 부를 때는 보통 0905 계열 API를 가리킨다고 봐도 돼.
## 이 모델로 무엇을 할 수 있나
실무에서는 코딩 [에이전트](/ko/wiki/agent/) 백엔드, 리팩터링, 긴 저장소 읽기, 문서 기반 자동화에 많이 붙여. Moonshot AI는 이 계열을 [OpenAI](/ko/wiki/openai/) 호환 Chat Completions와 [Anthropic](/ko/wiki/anthropic/) 호환 API로 제공하고 있어서 기존 앱에 붙이기 쉬운 편이야. 공식 플랫폼 표기 기준으로 `kimi-k2`는 입력 1M 토큰당 0.60달러, 출력 1M 토큰당 2.50달러로 과금되고, 공개 [웨이트](/ko/wiki/weight/) 쪽은 [Hugging Face](/ko/wiki/hugging-face/)에서 받아 [vLLM](/ko/wiki/vllm/)이나 [SGLang](/ko/wiki/sglang/) 같은 엔진에 올려 볼 수도 있어.
## 왜 중요한가
Kimi K2가 중요한 이유는 Moonshot AI가 [에이전트](/ko/wiki/agent/) 코딩 쪽 경쟁을 오픈 웨이트와 클라우드 API 둘 다로 밀었다는 점이야. 공개 [웨이트](/ko/wiki/weight/) 기준 Kimi K2는 총 1T 파라미터에 토큰당 32B 활성 구조라서, 성능 숫자만이 아니라 배포 경로와 비용 구조까지 같이 기사에 붙어 나와. 또 0711의 128K에서 0905의 256K로 컨텍스트를 늘리면서 긴 작업 흐름과 프런트엔드 코드 품질을 함께 밀어, 이 라인이 단순 채팅 모델보다 개발자용 실행 엔진 쪽 전략에 가깝다는 신호로 읽을 수 있어.
## 같이 보면 좋은 모델
- `chain-of-thought`는 모델 자체보다 [추론](/ko/wiki/inference/) 과정을 어떻게 다루는지 보는 말이라서, Kimi K2의 일반형과 thinking 계열 차이를 읽을 때 같이 보면 좋아.
- `o1`은 [OpenAI](/ko/wiki/openai/)의 초기 추론형 라인업이라서, Kimi K2가 코딩 에이전트와 툴 호출에 더 강하게 포지셔닝된다는 점이 또렷해져.
- `o3`는 더 최신 [OpenAI 추론 모델](/ko/wiki/o1/) 축이라서, Kimi K2를 폐쇄형 API 모델과 비교할 때 기준점이 돼.
- `gpt-oss`는 오픈 웨이트와 [로컬](/ko/wiki/local-llm/) 배포 문맥을 비교하기 좋고, Kimi K2의 modified MIT 공개 전략이 왜 자주 같이 언급되는지도 보게 해.
