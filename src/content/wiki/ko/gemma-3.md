---
term: gemma-3
title: "Gemma 3"
lang: ko
summary: "Gemma 3는 Google DeepMind가 제공하는 버전형 AI 모델로, 실제 도입에서는 성능보다 접근 경로와 운영 조건까지 함께 비교해야 한다."
readerValue: "Gemma 3가 기사에 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
parentModel: gemma
modelProfile:
  memoryUsage: "Gemma 3는 1B, 4B, 12B, 27B 크기로 나온 오픈 모델 계열이다. 128K 컨텍스트를 지원하지만 실제 배포 메모리는 모델 크기와 정밀도에 따라 크게 달라진다."
  implementation: "Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이다."
  activeParameters: "공식 모델 크기는 1B, 4B, 12B, 27B다. 페이지를 볼 때는 어떤 크기를 말하는지까지 같이 확인해야 한다."
  multimodalSupport: "텍스트와 이미지 입력, 텍스트 출력을 지원한다. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다."
  access: "오픈 웨이트 모델이라 Hugging Face, Kaggle, Vertex Model Garden 등에서 내려받아 직접 실행할 수 있다."
  pricing: "모델 자체 라이선스와 호스팅 비용이 핵심이다. API 토큰 과금보다 GPU 사양과 추론 속도를 먼저 계산하는 편이 맞다."
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
  date: "2026-04-08"
  sources:
    - url: "https://ai.google.dev/gemma"
      title: "Gemma — Google DeepMind"
    - url: "https://blog.google/technology/developers/gemma-3/"
      title: "Introducing Gemma 3: The most capable model you can run on a single GPU or TPU"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 맞는지 먼저 대조했다."
      items:
        - "모델명 대조: Gemma 3"
        - "벤더 대조: Google DeepMind"
        - "배포 유형 대조: version 모델 / 오픈 웨이트"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 위치와 접근 경로를 교차검증했다."
      items:
        - "공식 소스 1: Gemma docs"
        - "공식 소스 2: Gemma 3 launch post"
        - "비교 확인: 오픈 배포 경로와 입력 지원 설명이 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 별도로 묶어서 다시 확인했다."
      items:
        - "모델 크기: 1B / 4B / 12B / 27B"
        - "컨텍스트: 128K"
        - "언어 지원: 140개 이상"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트를 따로 비판적으로 검토했다."
      items:
        - "Gemma 3는 크기별 성능과 배포 난이도가 크게 갈리므로 모델 크기를 생략하면 비교가 흐려진다."
      findings:
        - "Gemma 3는 크기별 성능과 배포 난이도가 크게 갈리므로 모델 크기를 생략하면 비교가 흐려진다."
---
## 먼저 감 잡기
Gemma 3는 Google DeepMind가 제공하는 버전형 모델이야. Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이다. 텍스트와 이미지 입력, 텍스트 출력을 지원한다. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다. 그래서 기사에서 이 이름이 보이면 추상적인 성능 향상 문구보다 입력 범위, 컨텍스트 한도, 접근 채널이 어떻게 달라졌는지부터 먼저 보는 편이 정확해.
## 뉴스에서 왜 자주 나오나
Gemma 3가 뉴스에 풀네임으로 등장하기 시작했다는 건 이제 실제 배포 판단에 써야 할 정보가 붙었다는 뜻에 가까워. 상위 브랜드 이름만 나올 때와 달리, 이 단계부터는 텍스트와 이미지 입력, 텍스트 출력을 지원한다. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다. 모델 자체 라이선스와 호스팅 비용이 핵심이다. API 토큰 과금보다 GPU 사양과 추론 속도를 먼저 계산하는 편이 맞다. 같은 운용 조건을 구체적으로 비교할 수 있어.
## 읽을 때 체크포인트
1. 먼저 Gemma 3가 어떤 입력을 받고 무엇을 출력하는지부터 확인하면 돼. 여기서 모델 포지션이 거의 정리돼.

2. 다음으로 컨텍스트, 최대 출력, 툴 호출 지원처럼 운영 조건을 봐야 해. 같은 성능 홍보라도 실제 제품 적합성은 여기서 갈려.

3. 마지막으로 오픈 웨이트 모델이라 Hugging Face, Kaggle, Vertex Model Garden 등에서 내려받아 직접 실행할 수 있다. 모델 자체 라이선스와 호스팅 비용이 핵심이다. API 토큰 과금보다 GPU 사양과 추론 속도를 먼저 계산하는 편이 맞다. 이 두 줄을 같이 읽으면 '당장 붙일 수 있는 모델인지'와 '비용이 감당되는지'를 빠르게 판단할 수 있어.
## 같이 봐야 할 용어
- [gemma](/ko/wiki/gemma/)
- [gemini](/ko/wiki/gemini/)
- [deepseek-r1](/ko/wiki/deepseek-r1/)
- [llama](/ko/wiki/llama/)