---
term: gemma-4
title: Gemma 4(젬마 4)
lang: ko
summary: >-
  Gemma 4(젬마 4)는 Google DeepMind가 낸 오픈 모델 가족이야. 로컬 PC부터 휴대폰까지 올릴 수 있게 크기를 나눴고
  Apache 2.0으로 풀려서 온디바이스와 로컬 추론 얘기에서 자주 튀어나와.
readerValue: Gemini랑 뭐가 다르고 왜 로컬 LLM 얘기에서 Gemma 4가 자꾸 언급되는지 빠르게 읽는 데 도움 돼.
category: model
modelType: family
parentModel: gemma
modelProfile:
  memoryUsage: >-
    Gemma 4는 small 128K, medium 256K 컨텍스트 구성을 가진 오픈 웨이트 family다. 26B A4B MoE와
    31B Dense까지 있어 같은 Gemma 4라도 필요한 메모리가 크게 갈린다. 이렇게 보면 돼.
  implementation: >-
    Google DeepMind가 낸 멀티모달 오픈 모델 세대다. 텍스트와 이미지 입력을 처리하고, 작은 모델은 오디오 입력까지 지원하며,
    로컬 실행과 agent 작업을 같이 겨냥한다. 이렇게 보면 돼.
  activeParameters: >-
    공식 모델 카드 기준 31B Dense와 26B A4B MoE가 핵심 축이야. 26B A4B는 총 25.2B에 활성 3.8B, 31B
    Dense는 30.7B 규모다. 이렇게 보면 돼.
  multimodalSupport: >-
    텍스트와 이미지 입력, 텍스트 출력을 기본으로 보고, 작은 모델에서는 오디오 입력도 지원한다. 140개 이상 언어 지원과 함수 호출,
    agent 성향이 같이 강조돼.
  access: >-
    오픈 웨이트라 로컬과 자체 호스팅 경로가 열려 있어. 노트북·모바일 같은 온디바이스 실행을 공식적으로 같이 밀고 있는 점이 Gemma
    3와의 큰 차이야.
  pricing: API 토큰표보다 하드웨어 비용과 배포 경로가 핵심이야. 오픈 웨이트라 직접 서빙 기준 GPU 메모리와 양자화 전략을 먼저 계산하게 돼.
  weightsOpen: 오픈 웨이트 공개. 이렇게 보면 돼.
  vendor: Google DeepMind
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - gemma 4
  - gemma4
relatedTerms:
  - gemini
  - gemma
  - local-llm
  - localllama
mentionCount: 0
draft: false
tags:
  - google
  - open-model
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: >-
        https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/
      title: 'Gemma 4: Byte for byte, the most capable open models'
    - url: 'https://ai.google.dev/gemma/docs/core/model_card_4'
      title: Scheda del modello Gemma 4 &nbsp;|&nbsp; Google AI for Developers
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 공식 발표와 모델 카드 설명이 내가 쓴 정의랑 어긋나지 않는지 맞춰봤어.
      items:
        - '독자 문제 대조: Gemma 4를 Gemini의 다른 이름으로 오해하지 않게 오픈 모델 계열이라는 점부터 앞에 뒀어.'
        - 'Google 블로그의 Apache 2.0, 하드웨어별 네 가지 크기 설명을 본문 정의에 반영했어.'
        - '모델 카드의 128K, 256K 컨텍스트와 함수 호출 지원도 실제 사용 설명에 붙였어.'
      findings:
        - Gemma 4는 단순한 경량 모델이 아니라 기기별 배포 전략을 가진 제품군으로 읽는 게 맞아.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 출시 블로그와 모델 카드가 같은 제품 포지션을 말하는지 다시 봤어.
      items:
        - >-
          비교 기준: Google 블로그의 하드웨어 전략과 모델 카드의 세부 스펙이 서로 같은 네 가지 모델 구성을 가리키는지
          맞춰봤어.
        - '블로그의 온디바이스 오프라인 실행 설명과 모델 카드의 E2B, E4B, 26B, 31B 표를 서로 대조했어.'
        - AI Studio와 AI Edge Gallery 배포 경로도 블로그 쪽 설명에만 있는 내용이라 과장 없이 그대로만 남겼어.
      findings:
        - Gemma 4는 로컬 실행성과 제품 배포 채널이 같이 설계된 모델군이라는 점이 교차 확인돼.
    - type: number_verify
      result: pass
      sources: 2
      summary: '모델 크기, 컨텍스트 길이, 활성 파라미터 숫자를 다시 봤어.'
      items:
        - '작은 모델 128K, 큰 모델 256K 컨텍스트를 다시 확인했어.'
        - 26B A4B MoE의 총 25.2B와 활성 3.8B 수치를 다시 확인했어.
        - '31B Dense와 E2B, E4B라는 제품 구성을 다시 확인했어.'
      findings:
        - 숫자는 블로그와 모델 카드가 겹쳐 말하는 것만 남겨서 과장 가능성을 줄였어.
    - type: adversarial
      result: pass
      summary: Gemma 4를 그냥 작은 로컬 모델로만 읽는 오해를 막았어.
      items:
        - 31B와 26B는 워크스테이션급 추론용이라는 점을 넣어서 모바일 모델처럼만 보이지 않게 했어.
        - Gemini의 공개 버전이라고 단순 치환하는 표현은 빼고 별도 오픈 모델 계열이라는 설명만 남겼어.
        - 오픈 모델이라는 말이 곧 저사양 전용이라는 오해를 막으려고 하드웨어 범위를 같이 적었어.
      findings:
        - Gemma 4를 기기별 제품군으로 읽게 해서 과도한 단순화를 막았어.
---
## 한 줄 정의
Gemma 4는 Google DeepMind가 만든 오픈 모델 계열이야. 같은 회사의 Gemini가 클라우드 서비스 쪽 중심이라면, Gemma 4는 가중치를 내려받아 로컬 장비나 엣지 기기에서도 굴릴 수 있게 설계된 쪽에 더 가까워. 공식 발표 기준 Apache 2.0 라이선스고 E2B, E4B, 26B A4B, 31B처럼 하드웨어별 크기로 나뉘어 있어.
## 이 모델로 무엇을 할 수 있나
실무에서는 로컬 코드 어시스턴트, 문서 OCR, 화면 이해, 이미지 입력이 섞인 에이전트 흐름, 온디바이스 앱 프로토타입에 많이 써. 작은 E2B와 E4B는 휴대폰, Raspberry Pi, Jetson Orin Nano 같은 엣지 기기에서 오프라인 실행을 노리고, 26B와 31B는 워크스테이션이나 consumer GPU에서 IDE 보조나 장문 리포지토리 분석용으로 많이 거론돼. Google은 31B와 26B를 AI Studio에서, 작은 모델은 AI Edge Gallery 쪽에서 바로 만져볼 수 있게 열어뒀어.
## 왜 중요한가
Gemma 4가 중요한 이유는 성능 좋은 오픈 모델에서 끝나지 않고, 작은 모델은 128K, 큰 모델은 256K 컨텍스트를 주면서 함수 호출과 구조화 출력 같은 에이전트 기능까지 기본 탑재했기 때문이야. 26B A4B MoE는 총 25.2B 중 3.8B만 활성화해서 속도를 챙기고, 31B Dense는 품질 쪽을 밀어줘서 같은 이름 아래에서도 선택 기준이 또렷해. 그래서 기사에서 Gemma 4가 보이면 그냥 Google의 공개형 모델이 아니라 로컬, 온디바이스, 멀티모달, 에이전트를 한꺼번에 묶는 전략으로 읽으면 돼.
## 같이 보면 좋은 모델
- [gemini](/ko/wiki/gemini/): Gemini는 Google의 클라우드 중심 주력 모델이라면 Gemma 4는 배포 자유도가 큰 오픈 모델 쪽이야. 둘을 같이 보면 Google이 왜 폐쇄형과 공개형을 동시에 가져가는지 보여.
- [gemma](/ko/wiki/gemma/): Gemma 4는 기존 Gemma 계열의 최신 세대야. 초창기 경량 오픈 모델 이미지에서 멀티모달과 에이전트 쪽으로 얼마나 넓어졌는지 비교하기 좋아.
- [local-llm](/ko/wiki/local-llm/): Gemma 4는 로컬 LLM 얘기에서 하드웨어 대비 성능 기준점으로 자주 쓰여. 특히 26B와 31B가 소비자 GPU에서 어디까지 가능한지 읽을 때 같이 보면 좋아.
- [localllama](/ko/wiki/localllama/): 커뮤니티 반응을 따라가려면 LocalLLaMA 문맥도 중요해. Gemma 4가 실제로 어떤 장비에서 잘 돈다는 평가를 어디서 얻는지 감이 생겨.
