---
term: gpt-4o
title: "GPT-4o"
lang: ko
summary: "OpenAI의 GPT-4o 모델이다. 이름이 나오면 벤치마크 점수보다 어떤 작업에 쓰는지와 API 비용 구간을 같이 봐야 한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/GPT-4o"
      title: "GPT-4o"
    - url: "https://openai.com/index/hello-gpt-4o/"
      title: "Hello GPT-4o"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 같은 축인지 먼저 맞춰봤다."
      items:
        - "모델명 대조: GPT-4o"
        - "벤더 대조: OpenAI"
        - "배포 유형 대조: version 모델 / 폐쇄형 API"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 라인업 위치와 접근 경로를 다시 봤다."
      items:
        - "공식 소스 1: Introducing GPT-4o"
        - "공식 소스 2: OpenAI API 모델 문서"
        - "비교 확인: 멀티모달 입력 범위와 API 지원 범위가 두 소스에서 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 따로 빼서 한 번 더 확인해봤다."
      items:
        - "컨텍스트: 128K"
        - "최대 출력: 16,384 토큰"
        - "가격: 입력 $2.50 / 캐시 입력 $1.25 / 출력 $10.00 per 1M tokens"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "오디오 입출력은 GPT-4o 기본 텍스트 모델과 별도 계열 문서로 분리해 읽어야 한다."
      findings:
        - "오디오 입출력은 GPT-4o 기본 텍스트 모델과 별도 계열 문서로 분리해 읽어야 한다."
---
## 한 줄 정의
GPT-4o는 OpenAI가 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제 비교표에 올릴 후보라고 생각하면 된다. 텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다. OpenAI의 범용 멀티모달 GPT 계열이다. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원한다.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. OpenAI의 범용 멀티모달 GPT 계열이다. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원한다. Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있다. 범용 프로덕션 기본 모델로 쓰기 쉬운 타입이다. 그래서 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 된다.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다. 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈린다.
- **컨텍스트/메모리 감각**: OpenAI API 기준 컨텍스트 128K, 최대 출력 16,384토큰이다. 자체 호스팅형 웨이트가 아니라 GPU 메모리 계산보다 요청당 토큰 예산을 먼저 본다. 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 본다.
- **모델 구조와 규모**: 활성 파라미터 수는 비공개다. 대신 gpt-4o, gpt-4o-2024-08-06, gpt-4o-2024-11-20처럼 스냅샷을 고정해 운영할 수 있다. 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있다.
- **접근 경로**: Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있다. 범용 프로덕션 기본 모델로 쓰기 쉬운 타입이다. 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단한다.
- **가격과 운영비**: OpenAI API 기준 1M 토큰당 입력 $2.50, 캐시 입력 $1.25, 출력 $10.00이다. 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 된다.
- **웨이트 공개 여부**: 오픈 웨이트 미공개, API 제공 중심. 자체 호스팅 가능 여부를 여기서 먼저 걸러낸다.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 OpenAI 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞다.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/) — 비교 대상으로 자주 같이 묶이는 모델
- [o3](/ko/wiki/o3/) — 비교 대상으로 자주 같이 묶이는 모델
- [Sora](/ko/wiki/sora/) — 비교 대상으로 자주 같이 묶이는 모델
- [o1](/ko/wiki/o1/) — 비교 대상으로 자주 같이 묶이는 모델