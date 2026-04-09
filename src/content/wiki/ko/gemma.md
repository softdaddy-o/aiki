---
term: gemma
title: "Gemma"
lang: ko
summary: "Google DeepMind의 상위 모델 계열이다. 기사에서 이름만 나오면 하위 버전과 제품 포지션을 함께 확인해야 한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: family
modelProfile:
  memoryUsage: "직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다."
  implementation: "Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요하다."
  activeParameters: "공개 자료 기준 활성 파라미터 수 확인 필요"
  multimodalSupport: "텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요"
  access: "무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있다."
  pricing: "직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다."
  weightsOpen: "오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요하다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Gemma_(language_model)"
      title: "Gemma (language model)"
    - url: "https://ai.google.dev/gemma"
      title: "Gemma — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명과 라인업 성격이 같은 축인지 먼저 맞춰봤다."
      items:
        - "모델명 대조: Gemma"
        - "벤더 대조: Google DeepMind"
        - "상위 계열: 최상위 라인업"
        - "페이지 성격: 개별 스냅샷이 아니라 상위 계열 안내 페이지"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 라인업 설명이 같은지 다시 봤다."
      items:
        - "비교 소스 1: Gemma (language model)"
        - "비교 소스 2: Gemma — Google DeepMind"
    - type: adversarial
      result: pass
      summary: "이 페이지가 버전 비교표가 아니라 계열 안내 페이지라는 점은 따로 의심해보고 확인했다."
      items:
        - "개별 가격과 컨텍스트는 하위 버전 페이지에서 확인해야 한다."
      findings:
        - "계열 페이지의 일반 설명을 특정 버전 스펙처럼 읽지 않도록 분리했다."
---
## 한 줄 정의
Gemma는 Google DeepMind가 묶어 부르는 상위 모델 계열이야. 기사에서 이름만 크게 보일 때가 많아서, 먼저 어떤 하위 버전을 가리키는지부터 잡아야 맥락이 덜 꼬인다. 개별 모델 프로필이 필요하면 이 페이지보다 하위 버전 페이지로 내려가는 게 맞다.
## 이 모델로 무엇을 할 수 있나
Gemma 같은 계열 페이지에서는 "무슨 일을 잘하나"보다 "어떤 하위 버전으로 갈라지나"를 먼저 보는 편이 좋아. 무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있다. 계열 이름만 알아서는 가격이나 컨텍스트를 못 박을 수 없고, 실제 선택은 하위 버전에서 갈린다.
## 스펙을 읽는 법
- **계열 이름인지 개별 버전인지**: 이 이름은 상위 라인업을 가리킨다. 실제 비교표는 하위 버전 페이지에서 읽는 편이 정확하다.
- **입력/출력 범위**: 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요. 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈린다.
- **컨텍스트/메모리 감각**: 직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다. 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 본다.
- **모델 구조와 규모**: 공개 자료 기준 활성 파라미터 수 확인 필요. 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있다.
- **접근 경로**: 무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있다. 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단한다.
- **가격과 운영비**: 직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다. 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 된다.
- **웨이트 공개 여부**: 오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요하다. 자체 호스팅 가능 여부를 여기서 먼저 걸러낸다.
## 왜 중요한가
상위 계열 페이지가 필요한 이유는 뉴스 제목에 버전명보다 계열명만 남는 경우가 많기 때문이야. Google DeepMind가 라인업을 어떤 축으로 나누는지 먼저 알아두면, 하위 버전 페이지로 내려갔을 때 왜 가격과 성격이 갈리는지도 훨씬 빨리 보인다.
## 같이 보면 좋은 모델
- [Gemma 3](/ko/wiki/gemma-3/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemini](/ko/wiki/gemini/) — 비교 대상으로 자주 같이 묶이는 모델
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 비교 대상으로 자주 같이 묶이는 모델
- [Llama](/ko/wiki/llama/) — 비교 대상으로 자주 같이 묶이는 모델