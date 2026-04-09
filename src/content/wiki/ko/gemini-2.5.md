---
term: gemini-2.5
title: "Gemini 2.5"
lang: ko
summary: "Google DeepMind에서 제공하는 버전형 모델이다. 실제 도입에서는 입력 범위, 컨텍스트, 가격을 함께 비교해야 한다."
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
      title: "Mô hình &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers"
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
## 한 줄 정의
Google DeepMind에서 제공하는 버전형 모델이야. Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이다. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다. Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다. 한 줄로 말하면 "이 모델이 실제로 어떤 입력을 받아 어떤 결과를 내는지"를 가장 직접적으로 보여 주는 페이지라고 보면 된다.
## 이 모델로 무엇을 할 수 있나
Google의 Gemini 2.5 계열은 Pro와 Flash로 갈리는 멀티모달 추론 라인업이다. 제품에서는 긴 컨텍스트와 멀티모달 입력 처리가 핵심 포인트다. Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다. 실무에서는 이 문장만 읽어도 이 모델이 챗봇형인지, 코딩형인지, 멀티모달 앱에 맞는지 감이 잡힌다.
## 스펙을 읽는 법
- **입력/출력 범위**: Gemini 2.5 Pro 기준 텍스트, 이미지, 비디오, 오디오 입력과 텍스트 출력을 지원한다. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: Gemini 2.5 Pro 기준 컨텍스트 1,048,576토큰이다. 서비스형 모델이라 GPU 메모리보다는 긴 입력을 실제로 감당할 예산이 더 중요하다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 활성 파라미터 수는 비공개다. 대신 Pro/Flash 라인업 구분과 컨텍스트 한도가 실사용 차이를 만든다. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: Gemini API와 Google AI Studio에서 접근하는 폐쇄형 모델 계열이다. 실제 도입은 Pro와 Flash 중 무엇을 쓰는지까지 확인해야 한다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: Gemini 2.5 Pro paid tier 기준 1M 토큰당 입력 $1.25, 출력 $10.00(200K 이하), 200K 초과 구간은 입력 $2.50, 출력 $15.00이다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: 오픈 웨이트 미공개, API 제공 중심. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 버전 페이지가 중요한 이유는 실제 도입 판단이 바로 이 단계에서 이뤄지기 때문이야. 같은 회사 모델끼리도 입력 범위, 컨텍스트, 가격, 배포 채널이 다르면 완전히 다른 제품에 맞는다. 그래서 벤치마크 숫자보다 "내 앱에 바로 붙는지"를 읽는 기준으로 봐야 한다.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/) — 비교 대상으로 자주 같이 묶이는 모델
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델
- [o3](/ko/wiki/o3/) — 비교 대상으로 자주 같이 묶이는 모델