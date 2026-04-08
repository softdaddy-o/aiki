---
term: gpt-4o
title: "GPT-4o"
lang: ko
summary: "GPT-4o는 OpenAI가 제공하는 버전형 AI 모델로, 실제 도입에서는 성능보다 접근 경로와 운영 조건까지 함께 비교해야 한다."
readerValue: "GPT-4o가 기사에 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
modelProfile:
  memoryUsage: "OpenAI API 기준 컨텍스트 128K, 최대 출력 16,384토큰이다. 자체 호스팅형 웨이트가 아니라 GPU 메모리 계산보다 요청당 토큰 예산을 먼저 본다."
  implementation: "OpenAI의 범용 멀티모달 GPT 계열이다. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원한다."
  activeParameters: "활성 파라미터 수는 비공개다. 대신 gpt-4o, gpt-4o-2024-08-06, gpt-4o-2024-11-20처럼 스냅샷을 고정해 운영할 수 있다."
  multimodalSupport: "텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다."
  access: "Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있다. 범용 프로덕션 기본 모델로 쓰기 쉬운 타입이다."
  pricing: "OpenAI API 기준 1M 토큰당 입력 $2.50, 캐시 입력 $1.25, 출력 $10.00이다."
  weightsOpen: "오픈 웨이트 미공개, API 제공 중심"
  vendor: "OpenAI"
aliases:
  - "GPT-4o"
relatedTerms:
  - gemini
  - o3
  - sora
  - o1
mentionCount: 0
draft: false
tags:
  - openai
  - multimodal
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://en.wikipedia.org/wiki/GPT-4o"
      title: "GPT-4o"
    - url: "https://openai.com/index/hello-gpt-4o/"
      title: "https://openai.com/index/hello-gpt-4o/"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 맞는지 먼저 대조했다."
      items:
        - "모델명 대조: GPT-4o"
        - "벤더 대조: OpenAI"
        - "배포 유형 대조: version 모델 / 폐쇄형 API"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 위치와 접근 경로를 교차검증했다."
      items:
        - "공식 소스 1: Introducing GPT-4o"
        - "공식 소스 2: OpenAI API 모델 문서"
        - "비교 확인: 멀티모달 입력 범위와 API 지원 범위가 두 소스에서 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 별도로 묶어서 다시 확인했다."
      items:
        - "컨텍스트: 128K"
        - "최대 출력: 16,384 토큰"
        - "가격: 입력 $2.50 / 캐시 입력 $1.25 / 출력 $10.00 per 1M tokens"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트를 따로 비판적으로 검토했다."
      items:
        - "오디오 입출력은 GPT-4o 기본 텍스트 모델과 별도 계열 문서로 분리해 읽어야 한다."
      findings:
        - "오디오 입출력은 GPT-4o 기본 텍스트 모델과 별도 계열 문서로 분리해 읽어야 한다."
---
## 먼저 감 잡기
GPT-4o는 OpenAI가 제공하는 버전형 모델이야. OpenAI의 범용 멀티모달 GPT 계열이다. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원한다. 텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다. 그래서 기사에서 이 이름이 보이면 추상적인 성능 향상 문구보다 입력 범위, 컨텍스트 한도, 접근 채널이 어떻게 달라졌는지부터 먼저 보는 편이 정확해.
## 뉴스에서 왜 자주 나오나
GPT-4o가 뉴스에 풀네임으로 등장하기 시작했다는 건 이제 실제 배포 판단에 써야 할 정보가 붙었다는 뜻에 가까워. 상위 브랜드 이름만 나올 때와 달리, 이 단계부터는 텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다. OpenAI API 기준 1M 토큰당 입력 $2.50, 캐시 입력 $1.25, 출력 $10.00이다. 같은 운용 조건을 구체적으로 비교할 수 있어.
## 읽을 때 체크포인트
1. 먼저 GPT-4o가 어떤 입력을 받고 무엇을 출력하는지부터 확인하면 돼. 여기서 모델 포지션이 거의 정리돼.

2. 다음으로 컨텍스트, 최대 출력, 툴 호출 지원처럼 운영 조건을 봐야 해. 같은 성능 홍보라도 실제 제품 적합성은 여기서 갈려.

3. 마지막으로 Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있다. 범용 프로덕션 기본 모델로 쓰기 쉬운 타입이다. OpenAI API 기준 1M 토큰당 입력 $2.50, 캐시 입력 $1.25, 출력 $10.00이다. 이 두 줄을 같이 읽으면 '당장 붙일 수 있는 모델인지'와 '비용이 감당되는지'를 빠르게 판단할 수 있어.
## 같이 봐야 할 용어
- [gemini](/ko/wiki/gemini/)
- [o3](/ko/wiki/o3/)
- [sora](/ko/wiki/sora/)
- [o1](/ko/wiki/o1/)