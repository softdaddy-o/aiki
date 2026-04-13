---
term: gpt-4o
title: "GPT-4o"
lang: ko
summary: "GPT-4o는 OpenAI가 실제 배포용으로 내놓은 개별 모델 버전이야. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 해."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽는 데 도움이 돼."
category: model
modelType: version
modelProfile:
  memoryUsage: "OpenAI API 기준 컨텍스트 128K, 최대 출력 16,384토큰이야. 자체 호스팅형 웨이트가 아니라 GPU 메모리 계산보다 요청당 토큰 예산을 먼저 봐."
  implementation: "OpenAI의 범용 멀티모달 GPT 계열이야. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원해."
  activeParameters: "활성 파라미터 수는 비공개다. 대신 gpt-4o, gpt-4o-2024-08-06, gpt-4o-2024-11-20처럼 스냅샷을 고정해 운영할 수 있어."
  multimodalSupport: "텍스트와 이미지 입력, 텍스트 출력이 기본이야. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확해."
  access: "Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있어. 범용 프로덕션 기본 모델로 쓰기 쉬운 타입이야."
  pricing: "OpenAI API 기준 1M 토큰당 입력 $2.50, 캐시 입력 $1.25, 출력 $10.00이야."
  weightsOpen: "오픈 웨이트 미공개, API 제공 중심"
  vendor: "OpenAI"
aliases:
  - "GPT-4o"
relatedTerms:
  - gemini
  - chatgpt
  - codex
  - o3
mentionCount: 0
draft: true
tags:
  - openai
  - multimodal
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/GPT-4o"
      title: "GPT-4o"
    - url: "https://openai.com/index/hello-gpt-4o/"
      title: "Hello GPT-4o"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 어떤 층위의 모델 설명으로 읽어야 하는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 GPT-4o를 어떤 작업과 운영 조건에 붙일 모델인지."
        - "모델 이름부터 다시 보면 GPT-4o."
        - "만든 쪽을 다시 보면 OpenAI."
        - "배포 유형 대조: version 모델 / 폐쇄형 API."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스를 나란히 놓고 접근 채널과 포지션 설명이 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 GPT-4o를 고를 때 접근 채널, 가격, 입력 범위 가운데 무엇을 먼저 봐야 하는지."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: openai.com."
        - "공식 소스 1: Introducing GPT-4o."
        - "공식 소스 2: OpenAI API 모델 문서."
        - "비교 확인: 멀티모달 입력 범위와 API 지원 범위가 두 소스에서 일치."
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 실제 도입 판단에 필요한 항목만 따로 빼서 검증해뒀어 확인했어."
      items:
        - "컨텍스트: 128K."
        - "최대 출력: 16,384 토큰."
        - "가격: 입력 $2.50 / 캐시 입력 $1.25 / 출력 $10.00 per 1M tokens."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리해뒀어 확인했어."
      items:
        - "오디오 입출력은 GPT-4o 기본 텍스트 모델과 별도 계열 문서로 분리해 읽어야 해."
      findings:
        - "오디오 입출력은 GPT-4o 기본 텍스트 모델과 별도 계열 문서로 분리해 읽어야 해."
---
## 한 줄 정의
GPT-4o는 OpenAI가 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. 텍스트와 이미지 입력, 텍스트 출력이 기본이야. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확해. OpenAI의 범용 멀티모달 GPT 계열이야. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원해.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. OpenAI의 범용 멀티모달 GPT 계열이야. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원해. Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있어. 범용 프로덕션 기본 모델로 쓰기 쉬운 타입이야. 예를 들어 이미지를 보고 답하거나 음성을 받아 처리하는 앱에서 입력 범위 차이가 바로 체감돼. 그래서 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 돼.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 OpenAI 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞아.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/) — Gemini와는 입력 범위와 출력 형태 차이를 비교하기 쉬워.
- [ChatGPT](/ko/wiki/chatgpt/) — 같이 보면 멀티모달 생성·해석 흐름을 같이 볼 때 좋아.
- [Codex](/ko/wiki/codex/) — 같이 보면 멀티모달 생성·해석 흐름을 같이 볼 때 좋아.
- [o3](/ko/wiki/o3/) — o3와는 추론형 모델인지 범용 생성형 모델인지 비교하기 쉬워.