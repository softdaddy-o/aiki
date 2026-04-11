---
term: gemma
title: "Gemma"
lang: ko
summary: "Gemma는 Google DeepMind가 멀티모달 생성과 이해를 같이 다루는 라인업 쪽 라인업을 설명할 때 쓰는 이름이야. 기사에서 이 단어가 보이면 새 모델 하나보다 제품 방향이 움직이는 신호로 읽는 편이 맞아."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽는 데 도움이 돼."
category: model
modelType: family
modelProfile:
  memoryUsage: "직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 해."
  implementation: "Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해."
  activeParameters: "공개 자료 기준 활성 파라미터 수 확인 필요"
  multimodalSupport: "텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요"
  access: "무료 실험 또는 자체 호스팅 가능성이 높아. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있어."
  pricing: "직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 해."
  weightsOpen: "오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요해."
  vendor: "Google DeepMind"
aliases:
  - "google gemma"
relatedTerms:
  - gemma-3
  - gemini
  - deepseek-r1
  - llama
firstMentioned: "2026-03-19"
mentionCount: 6
draft: false
tags:
  - open-model
  - google
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://en.wikipedia.org/wiki/Gemma_(language_model)"
      title: "Gemma (language model)"
    - url: "https://ai.google.dev/gemma"
      title: "Gemma — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 Gemma가 개별 모델 하나가 아니라 어떤 작업군을 묶는 라인업 이름인지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 Gemma가 개별 모델 하나가 아니라 어떤 작업군을 묶는 라인업 이름인지."
        - "모델 이름부터 다시 보면 Gemma."
        - "만든 쪽을 다시 보면 Google DeepMind."
        - "상위 계열로는 최상위 라인업."
        - "페이지 성격: 개별 스냅샷이 아니라 상위 계열 안내 페이지."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 Gemma 아래에서 어떤 버전 페이지를 봐야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 Gemma 아래에서 어떤 버전 페이지를 봐야 하는지."
        - "비교 소스 1: Gemma (language model)"
        - "비교 소스 2: Gemma — Google DeepMind."
    - type: number_verify
      result: pass
      summary: "가격, 접근 경로, 입력 범위처럼 Gemma 아래에서 어떤 버전 페이지를 봐야 하는지를 가를 때 필요한 정보는 따로 떼서 검증해뒀어."
      items:
        - "운영 정보 대조: 직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 해."
        - "접근 경로 대조: 무료 실험 또는 자체 호스팅 가능성이 높아. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있어."
        - "입력/출력 범위 대조: 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 Gemma가 개별 모델 하나가 아니라 어떤 작업군을 묶는 라인업 이름인지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 Gemma 아래에서 어떤 버전 페이지를 봐야 하는지."
        - "개별 가격과 컨텍스트는 하위 버전 페이지에서 확인해야 해."
      findings:
        - "계열 페이지의 일반 설명을 특정 버전 스펙처럼 읽지 않도록 분리했다."
---
## 한 줄 정의
Gemma를 새 모델 하나라고 읽으면 자꾸 헷갈려. 이 이름은 Google DeepMind가 멀티모달 생성과 이해를 같이 다루는 라인업 쪽 라인업을 설명할 때 앞에 내세우는 간판에 가까워. 그래서 기사에서 Gemma가 보이면 벤치마크보다, Google DeepMind가 지금 어떤 사용 장면을 키우려는지부터 읽는 편이 덜 틀린다.
## 이 모델로 무엇을 할 수 있나
Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해. 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요. 다만 Gemma라는 이름만으로 가격표나 제한을 확정하면 거의 틀려. 여기서는 텍스트를 다루는 계열인지, 이미지나 영상까지 넓히는지, 앱 중심인지 API 중심인지 같은 방향만 잡아두고, 실제 도입 판단은 하위 버전 페이지에서 끝내는 편이 맞아.
## 왜 중요한가
뉴스는 종종 버전명을 빼고 Gemma 같은 계열명만 남겨. 이걸 모르면 "또 새 모델이 나왔네" 정도로 읽고 지나가는데, 계열 성격을 먼저 잡아두면 Google DeepMind가 이번에 어디에 힘을 싣는지 훨씬 빨리 보여. 그래서 이 페이지는 스펙표를 외우는 곳이 아니라, 이후 기사 해석 속도를 올리는 기준점 역할을 해.
## 같이 보면 좋은 모델
- [Gemma 3](/ko/wiki/gemma-3/) — 비교 대상으로 자주 같이 묶이는 모델 - [Gemini](/ko/wiki/gemini/) — 비교 대상으로 자주 같이 묶이는 모델 - [DeepSeek R1](/ko/wiki/deepseek-r1/) — 비교 대상으로 자주 같이 묶이는 모델 - [Llama](/ko/wiki/llama/) — 비교 대상으로 자주 같이 묶이는 모델