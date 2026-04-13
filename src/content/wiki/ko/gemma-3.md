---
term: gemma-3
title: "Gemma 3"
lang: ko
summary: "Gemma 3는 Google DeepMind가 실제 배포용으로 내놓은 개별 모델 버전이야. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 해."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽는 데 도움이 돼."
category: model
modelType: version
parentModel: gemma
modelProfile:
  memoryUsage: "Gemma 3는 1B, 4B, 12B, 27B 크기로 나온 오픈 모델 계열이야. 128K 컨텍스트를 지원하지만 실제 배포 메모리는 모델 크기와 정밀도에 따라 크게 달라져."
  implementation: "Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이야."
  activeParameters: "공식 모델 크기는 1B, 4B, 12B, 27B다. 페이지를 볼 때는 어떤 크기를 말하는지까지 같이 확인해야 해."
  multimodalSupport: "텍스트와 이미지 입력, 텍스트 출력을 지원해. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다."
  access: "오픈 웨이트 모델이라 Hugging Face, Kaggle, Vertex Model Garden 등에서 내려받아 직접 실행할 수 있어."
  pricing: "모델 자체 라이선스와 호스팅 비용이 관건이야. API 토큰 과금보다 GPU 사양과 추론 속도를 먼저 계산하는 편이 맞아."
  weightsOpen: "오픈 웨이트 공개"
  vendor: "Google DeepMind"
aliases:
  - "Gemma 3"
relatedTerms:
  - gemma
  - gemini
  - deepseek-r1
  - llama
mentionCount: 0
draft: false
tags:
  - google
  - open-model
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://ai.google.dev/gemma"
      title: "Gemma — Google DeepMind"
    - url: "https://blog.google/technology/developers/gemma-3/"
      title: "Introducing Gemma 3: The most capable model you can run on a single GPU or TPU"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 어떤 층위의 모델 설명으로 읽어야 하는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 Gemma 3를 어떤 작업과 운영 조건에 붙일 모델인지."
        - "모델 이름부터 다시 보면 Gemma 3."
        - "만든 쪽을 다시 보면 Google DeepMind."
        - "배포 유형 대조: version 모델 / 오픈 웨이트."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스를 나란히 놓고 접근 채널과 포지션 설명이 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 Gemma 3를 고를 때 접근 채널, 가격, 입력 범위 가운데 무엇을 먼저 봐야 하는지."
        - "출처 1 대조: ai.google.dev."
        - "출처 2 대조: blog.google."
        - "공식 소스 1: Gemma docs."
        - "공식 소스 2: Gemma 3 launch post."
        - "비교 확인: 오픈 배포 경로와 입력 지원 설명이 일치."
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 실제 도입 판단에 필요한 항목만 따로 빼서 검증해뒀어 확인했어."
      items:
        - "모델 크기: 1B / 4B / 12B / 27B."
        - "컨텍스트: 128K."
        - "언어 지원: 140개 이상."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리해뒀어 확인했어."
      items:
        - "Gemma 3는 크기별 성능과 배포 난이도가 크게 갈리므로 모델 크기를 생략하면 비교가 흐려진다."
      findings:
        - "Gemma 3는 크기별 성능과 배포 난이도가 크게 갈리므로 모델 크기를 생략하면 비교가 흐려진다."
---
## 한 줄 정의
Gemma 3는 Google DeepMind가 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. 텍스트와 이미지 입력, 텍스트 출력을 지원해. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다. Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이야.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이야. 오픈 웨이트 모델이라 Hugging Face, Kaggle, Vertex Model Garden 등에서 내려받아 직접 실행할 수 있어. 예를 들어 API 대신 직접 호스팅할지, 어떤 GPU 예산이 필요한지 판단할 때 이런 차이가 바로 운영 이슈로 이어져. 그래서 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 돼.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 Google DeepMind 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞아.
## 같이 보면 좋은 모델
- [Gemma](/ko/wiki/gemma/) — Gemma와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.
- [Gemini](/ko/wiki/gemini/) — Gemini와는 입력 범위와 출력 형태 차이를 비교하기 쉬워.
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — DeepSeek R1와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.
- [Llama](/ko/wiki/llama/) — Llama와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.