---
term: gpt-4o
title: "GPT-4o"
lang: ko
summary: "OpenAI에서 제공하는 버전형 모델이다. 실제 도입에서는 입력 범위, 컨텍스트, 가격을 함께 비교해야 한다."
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
## 한 줄 정의
OpenAI에서 제공하는 버전형 모델이야. OpenAI의 범용 멀티모달 GPT 계열이다. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원한다. 텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다. 한 줄로 말하면 "이 모델이 실제로 어떤 입력을 받아 어떤 결과를 내는지"를 가장 직접적으로 보여 주는 페이지라고 보면 된다.
## 이 모델로 무엇을 할 수 있나
OpenAI의 범용 멀티모달 GPT 계열이다. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식 지원한다. 텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다. 실무에서는 이 문장만 읽어도 이 모델이 챗봇형인지, 코딩형인지, 멀티모달 앱에 맞는지 감이 잡힌다.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트와 이미지 입력, 텍스트 출력이 기본이다. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확하다. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: OpenAI API 기준 컨텍스트 128K, 최대 출력 16,384토큰이다. 자체 호스팅형 웨이트가 아니라 GPU 메모리 계산보다 요청당 토큰 예산을 먼저 본다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 활성 파라미터 수는 비공개다. 대신 gpt-4o, gpt-4o-2024-08-06, gpt-4o-2024-11-20처럼 스냅샷을 고정해 운영할 수 있다. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있다. 범용 프로덕션 기본 모델로 쓰기 쉬운 타입이다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: OpenAI API 기준 1M 토큰당 입력 $2.50, 캐시 입력 $1.25, 출력 $10.00이다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: 오픈 웨이트 미공개, API 제공 중심. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 버전 페이지가 중요한 이유는 실제 도입 판단이 바로 이 단계에서 이뤄지기 때문이야. 같은 회사 모델끼리도 입력 범위, 컨텍스트, 가격, 배포 채널이 다르면 완전히 다른 제품에 맞는다. 그래서 벤치마크 숫자보다 "내 앱에 바로 붙는지"를 읽는 기준으로 봐야 한다.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/) — 비교 대상으로 자주 같이 묶이는 모델
- [o3](/ko/wiki/o3/) — 비교 대상으로 자주 같이 묶이는 모델
- [Sora](/ko/wiki/sora/) — 비교 대상으로 자주 같이 묶이는 모델
- [o1](/ko/wiki/o1/) — 비교 대상으로 자주 같이 묶이는 모델