---
term: gemini-2.5
title: "Gemini 2.5"
lang: ko
summary: "Gemini 2.5는 Google DeepMind가 제공하는 버전형 AI 모델로, 실제 도입에서는 성능보다 접근 경로와 운영 조건까지 함께 비교해야 한다."
readerValue: "Gemini 2.5가 기사에 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
parentModel: gemini
modelProfile:
  memoryUsage: "Gemini 2.5 Pro 기준 컨텍스트 1,048,576토큰이다. 서비스형 모델이라 GPU 메모리보다는 긴 입력을 실제로 감당할 예산이 더 중요하다."
  implementation: "Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이다. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다."
  activeParameters: "활성 파라미터 수는 비공개다. 대신 Pro/Flash 라인업 구분과 컨텍스트 한도가 실사용 차이를 만든다."
  multimodalSupport: "Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다."
  access: "Gemini API와 Google AI Studio에서 접근하는 폐쇄형 모델 계열이다. 실제 도입은 Pro와 Flash 중 무엇을 쓰는지까지 확인해야 한다."
  pricing: "Gemini 2.5 Pro paid tier 기준 1M 토큰당 입력 $1.25, 출력 $10.00(200K 이하), 200K 초과 구간은 입력 $2.50, 출력 $15.00이다."
  weightsOpen: "오픈 웨이트 미공개, API 제공 중심"
  vendor: "Google DeepMind"
aliases:
  - "Gemini 2.5"
relatedTerms:
  - gemini
  - deepseek-r1
  - gemma
  - o3
mentionCount: 0
draft: false
tags:
  - google
  - reasoning
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://deepmind.google/technologies/gemini/"
      title: "Gemini 3 — Google DeepMind"
    - url: "https://ai.google.dev/gemini-api/docs/models"
      title: "Models &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 맞는지 먼저 대조했다."
      items:
        - "모델명 대조: Gemini 2.5"
        - "벤더 대조: Google DeepMind"
        - "배포 유형 대조: version 모델 / 폐쇄형 API"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 위치와 접근 경로를 교차검증했다."
      items:
        - "공식 소스 1: Gemini API models"
        - "공식 소스 2: Gemini API pricing"
        - "비교 확인: Pro/Flash 라인업 구분과 가격 체계가 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 별도로 묶어서 다시 확인했다."
      items:
        - "컨텍스트: 1,048,576 토큰 (Pro 기준)"
        - "가격: 입력 $1.25 / 출력 $10.00 per 1M tokens (200K 이하)"
        - "입력 범위: 텍스트 / 이미지 / 비디오 / 오디오"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트를 따로 비판적으로 검토했다."
      items:
        - "Gemini 2.5는 Pro와 Flash가 갈리므로 기사에서 세부 모델명을 생략하면 가격 해석이 틀어질 수 있다."
      findings:
        - "Gemini 2.5는 Pro와 Flash가 갈리므로 기사에서 세부 모델명을 생략하면 가격 해석이 틀어질 수 있다."
---
## 먼저 감 잡기
Gemini 2.5는 Google DeepMind가 제공하는 버전형 모델이야. Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이다. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다. Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다. 그래서 기사에서 이 이름이 보이면 추상적인 성능 향상 문구보다 입력 범위, 컨텍스트 한도, 접근 채널이 어떻게 달라졌는지부터 먼저 보는 편이 정확해.
## 뉴스에서 왜 자주 나오나
Gemini 2.5가 뉴스에 풀네임으로 등장하기 시작했다는 건 이제 실제 배포 판단에 써야 할 정보가 붙었다는 뜻에 가까워. 상위 브랜드 이름만 나올 때와 달리, 이 단계부터는 Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다. Gemini 2.5 Pro paid tier 기준 1M 토큰당 입력 $1.25, 출력 $10.00(200K 이하), 200K 초과 구간은 입력 $2.50, 출력 $15.00이다. 같은 운용 조건을 구체적으로 비교할 수 있어.
## 읽을 때 체크포인트
1. 먼저 Gemini 2.5가 어떤 입력을 받고 무엇을 출력하는지부터 확인하면 돼. 여기서 모델 포지션이 거의 정리돼.

2. 다음으로 컨텍스트, 최대 출력, 툴 호출 지원처럼 운영 조건을 봐야 해. 같은 성능 홍보라도 실제 제품 적합성은 여기서 갈려.

3. 마지막으로 Gemini API와 Google AI Studio에서 접근하는 폐쇄형 모델 계열이다. 실제 도입은 Pro와 Flash 중 무엇을 쓰는지까지 확인해야 한다. Gemini 2.5 Pro paid tier 기준 1M 토큰당 입력 $1.25, 출력 $10.00(200K 이하), 200K 초과 구간은 입력 $2.50, 출력 $15.00이다. 이 두 줄을 같이 읽으면 '당장 붙일 수 있는 모델인지'와 '비용이 감당되는지'를 빠르게 판단할 수 있어.
## 같이 봐야 할 용어
- [gemini](/ko/wiki/gemini/)
- [deepseek-r1](/ko/wiki/deepseek-r1/)
- [gemma](/ko/wiki/gemma/)
- [o3](/ko/wiki/o3/)