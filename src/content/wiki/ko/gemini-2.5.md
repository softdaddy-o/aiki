---
term: gemini-2.5
title: "Gemini 2.5"
lang: ko
summary: "Google DeepMind의 Gemini 2.5 모델이다. 이름이 나오면 벤치마크 점수보다 어떤 작업에 쓰는지와 API 비용 구간을 같이 봐야 한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://deepmind.google/technologies/gemini/"
      title: "Gemini 3 — Google DeepMind"
    - url: "https://ai.google.dev/gemini-api/docs/models"
      title: "Modelos &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 같은 축인지 먼저 맞춰봤다."
      items:
        - "모델명 대조: Gemini 2.5"
        - "벤더 대조: Google DeepMind"
        - "배포 유형 대조: version 모델 / 폐쇄형 API"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 라인업 위치와 접근 경로를 다시 봤다."
      items:
        - "공식 소스 1: Gemini API models"
        - "공식 소스 2: Gemini API pricing"
        - "비교 확인: Pro/Flash 라인업 구분과 가격 체계가 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 따로 빼서 한 번 더 확인해봤다."
      items:
        - "컨텍스트: 1,048,576 토큰 (Pro 기준)"
        - "가격: 입력 $1.25 / 출력 $10.00 per 1M tokens (200K 이하)"
        - "입력 범위: 텍스트 / 이미지 / 비디오 / 오디오"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "Gemini 2.5는 Pro와 Flash가 갈리므로 기사에서 세부 모델명을 생략하면 가격 해석이 틀어질 수 있다."
      findings:
        - "Gemini 2.5는 Pro와 Flash가 갈리므로 기사에서 세부 모델명을 생략하면 가격 해석이 틀어질 수 있다."
---
## 한 줄 정의
Gemini 2.5는 Google DeepMind가 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제 비교표에 올릴 후보라고 생각하면 된다. Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다. Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이다. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이다. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다. Gemini API와 Google AI Studio에서 접근하는 폐쇄형 모델 계열이다. 실제 도입은 Pro와 Flash 중 무엇을 쓰는지까지 확인해야 한다. 그래서 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 된다.
## 스펙을 읽는 법
- **입력/출력 범위**: Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다. 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈린다.
- **컨텍스트/메모리 감각**: Gemini 2.5 Pro 기준 컨텍스트 1,048,576토큰이다. 서비스형 모델이라 GPU 메모리보다는 긴 입력을 실제로 감당할 예산이 더 중요하다. 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 본다.
- **모델 구조와 규모**: 활성 파라미터 수는 비공개다. 대신 Pro/Flash 라인업 구분과 컨텍스트 한도가 실사용 차이를 만든다. 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있다.
- **접근 경로**: Gemini API와 Google AI Studio에서 접근하는 폐쇄형 모델 계열이다. 실제 도입은 Pro와 Flash 중 무엇을 쓰는지까지 확인해야 한다. 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단한다.
- **가격과 운영비**: Gemini 2.5 Pro paid tier 기준 1M 토큰당 입력 $1.25, 출력 $10.00(200K 이하), 200K 초과 구간은 입력 $2.50, 출력 $15.00이다. 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 된다.
- **웨이트 공개 여부**: 오픈 웨이트 미공개, API 제공 중심. 자체 호스팅 가능 여부를 여기서 먼저 걸러낸다.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 Google DeepMind 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞다.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/) — 비교 대상으로 자주 같이 묶이는 모델
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델
- [o3](/ko/wiki/o3/) — 비교 대상으로 자주 같이 묶이는 모델