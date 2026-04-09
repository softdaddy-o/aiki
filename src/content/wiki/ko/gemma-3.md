---
term: gemma-3
title: "Gemma 3"
lang: ko
summary: "Google DeepMind에서 제공하는 버전형 모델이다. 실제 도입에서는 입력 범위, 컨텍스트, 가격을 함께 비교해야 한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
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
  date: "2026-04-09"
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
## 한 줄 정의
Google DeepMind에서 제공하는 버전형 모델이야. Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이다. 텍스트와 이미지 입력, 텍스트 출력을 지원한다. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다. 한 줄로 말하면 "이 모델이 실제로 어떤 입력을 받아 어떤 결과를 내는지"를 가장 직접적으로 보여 주는 페이지라고 보면 된다.
## 이 모델로 무엇을 할 수 있나
Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이다. 텍스트와 이미지 입력, 텍스트 출력을 지원한다. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다. 실무에서는 이 문장만 읽어도 이 모델이 챗봇형인지, 코딩형인지, 멀티모달 앱에 맞는지 감이 잡힌다.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트와 이미지 입력, 텍스트 출력을 지원한다. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: Gemma 3는 1B, 4B, 12B, 27B 크기로 나온 오픈 모델 계열이다. 128K 컨텍스트를 지원하지만 실제 배포 메모리는 모델 크기와 정밀도에 따라 크게 달라진다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 공식 모델 크기는 1B, 4B, 12B, 27B다. 페이지를 볼 때는 어떤 크기를 말하는지까지 같이 확인해야 한다. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: 오픈 웨이트 모델이라 Hugging Face, Kaggle, Vertex Model Garden 등에서 내려받아 직접 실행할 수 있다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: 모델 자체 라이선스와 호스팅 비용이 핵심이다. API 토큰 과금보다 GPU 사양과 추론 속도를 먼저 계산하는 편이 맞다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: 오픈 웨이트 공개. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 버전 페이지가 중요한 이유는 실제 도입 판단이 바로 이 단계에서 이뤄지기 때문이야. 같은 회사 모델끼리도 입력 범위, 컨텍스트, 가격, 배포 채널이 다르면 완전히 다른 제품에 맞는다. 그래서 벤치마크 숫자보다 "내 앱에 바로 붙는지"를 읽는 기준으로 봐야 한다.
## 같이 보면 좋은 모델
- [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemini](/ko/wiki/gemini/) — 비교 대상으로 자주 같이 묶이는 모델
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 비교 대상으로 자주 같이 묶이는 모델
- [Llama](/ko/wiki/llama/) — 비교 대상으로 자주 같이 묶이는 모델