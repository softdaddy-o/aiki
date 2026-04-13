---
term: gemini-2.5
title: "Gemini 2.5"
lang: ko
summary: "Gemini 2.5는 Google DeepMind가 실제 배포용으로 내놓은 개별 모델 버전이야. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 해."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽는 데 도움이 돼."
category: model
modelType: version
parentModel: gemini
modelProfile:
  memoryUsage: "Gemini 2.5 Pro 기준 컨텍스트 1,048,576토큰이야. 서비스형 모델이라 GPU 메모리보다는 긴 입력을 실제로 감당할 예산이 더 중요해."
  implementation: "Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이야. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다."
  activeParameters: "활성 파라미터 수는 비공개다. 대신 Pro/Flash 라인업 구분과 컨텍스트 한도가 실사용 차이를 만들어."
  multimodalSupport: "Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원해."
  access: "Gemini API와 Google AI Studio에서 접근하는 폐쇄형 모델 계열이야. 실제 도입은 Pro와 Flash 중 무엇을 쓰는지까지 확인해야 해."
  pricing: "Gemini 2.5 Pro paid tier 기준 1M 토큰당 입력 $1.25, 출력 $10.00(200K 이하), 200K 초과 구간은 입력 $2.50, 출력 $15.00이야."
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
  date: "2026-04-13"
  sources:
    - url: "https://deepmind.google/technologies/gemini/"
      title: "Gemini 3 — Google DeepMind"
    - url: "https://ai.google.dev/gemini-api/docs/models"
      title: "Models &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 어떤 층위의 모델 설명으로 읽어야 하는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 Gemini 2.5를 어떤 작업과 운영 조건에 붙일 모델인지."
        - "모델 이름부터 다시 보면 Gemini 2.5."
        - "만든 쪽을 다시 보면 Google DeepMind."
        - "배포 유형 대조: version 모델 / 폐쇄형 API."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스를 나란히 놓고 접근 채널과 포지션 설명이 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 Gemini 2.5를 고를 때 접근 채널, 가격, 입력 범위 가운데 무엇을 먼저 봐야 하는지."
        - "출처 1 대조: deepmind.google."
        - "출처 2 대조: ai.google.dev."
        - "공식 소스 1: Gemini API models."
        - "공식 소스 2: Gemini API pricing."
        - "비교 확인: Pro/Flash 라인업 구분과 가격 체계가 일치."
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 실제 도입 판단에 필요한 항목만 따로 빼서 검증해뒀어 확인했어."
      items:
        - "컨텍스트: 1,048,576 토큰 (Pro 기준)"
        - "가격: 입력 $1.25 / 출력 $10.00 per 1M tokens (200K 이하)"
        - "입력 범위: 텍스트 / 이미지 / 비디오 / 오디오."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리해뒀어 확인했어."
      items:
        - "Gemini 2.5는 Pro와 Flash가 갈리므로 기사에서 세부 모델명을 생략하면 가격 해석이 틀어질 수 있어."
      findings:
        - "Gemini 2.5는 Pro와 Flash가 갈리므로 기사에서 세부 모델명을 생략하면 가격 해석이 틀어질 수 있어."
---
## 한 줄 정의
Gemini 2.5는 Google DeepMind가 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원해. Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이야. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이야. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다. Gemini API와 Google AI Studio에서 접근하는 폐쇄형 모델 계열이야. 실제 도입은 Pro와 Flash 중 무엇을 쓰는지까지 확인해야 해. 예를 들어 수학 풀이, 코드 수정, 장문 계획처럼 중간 단계가 긴 작업 후보를 고를 때 차이가 크게 난다. 그래서 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 돼.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 Google DeepMind 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞아.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/) — Gemini와는 입력 범위와 출력 형태 차이를 비교하기 쉬워.
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — DeepSeek R1와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.
- [Gemma](/ko/wiki/gemma/) — Gemma와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.
- [o3](/ko/wiki/o3/) — o3와는 추론형 모델인지 범용 생성형 모델인지 비교하기 쉬워.