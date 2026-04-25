---
term: deepseek
title: "DeepSeek (딥시크)"
lang: ko
summary: "DeepSeek는 중국 AI 회사 DeepSeek가 쓰는 브랜드 이름이야. 회사 이름, API 서비스, 공개 모델 계열이 한 단어로 같이 묶여 나오기 쉬워서 기사에서 이 이름이 보이면 먼저 어떤 층위를 말하는지 가려 읽는 게 중요해."
readerValue: "DeepSeek를 보면 성능표부터 보기 전에 지금 문장이 회사 이야기인지, API 이야기인지, 공개 모델 이야기인지부터 나누면 문맥을 훨씬 덜 헷갈리게 읽을 수 있어."
category: model
modelType: family
modelProfile:
  memoryUsage: "DeepSeek라는 이름 아래에는 API 서비스와 공개 weights 계열이 같이 있어서 숫자 하나로 못 묶어. 대표 공개 계열인 R1/V3는 671B total, 37B activated 같은 대형 MoE 축이고 distill variants는 훨씬 가벼워."
  implementation: "DeepSeek라는 이름은 회사/브랜드와 R1, V3 같은 모델 계열을 함께 가리켜. 실무에선 DeepSeek-V3 계열, DeepSeek-R1 reasoning, distill checkpoints를 나눠서 봐야 해."
  activeParameters: "대표 공개 계열인 R1/V3는 671B total / 37B activated로 소개돼 있어. 다만 이 페이지는 특정 버전 하나보다 라인업을 묶어 설명하는 family 페이지야."
  multimodalSupport: "주요 공개 계열은 텍스트 reasoning·coding 중심으로 보는 편이 맞아."
  access: "Open Platform API와 GitHub 공개 weights 경로가 같이 있어. 어떤 DeepSeek 계열을 말하는지에 따라 접근 경로가 달라져."
  pricing: "API 과금과 자체 서빙 비용을 같은 축으로 보면 안 돼. 서비스형 가격과 오픈 웨이트 운영비를 나눠 봐야 해."
  weightsOpen: "핵심 공개 계열과 distill checkpoints가 함께 존재"
  vendor: "DeepSeek"
aliases:
  - "DeepSeek"
relatedTerms:
  - deepseek-r1
  - reasoning
  - api
  - benchmark
  - weight
firstMentioned: "2025-01-20"
mentionCount: 3
draft: false
tags:
  - open-model
  - reasoning
  - china-ai
factCheck:
  status: passed
  date: "2026-04-18"
  sources:
    - url: "https://api-docs.deepseek.com/"
      title: "DeepSeek API overview"
    - url: "https://github.com/deepseek-ai/DeepSeek-R1"
      title: "deepseek-ai/DeepSeek-R1"
    - url: "https://github.com/deepseek-ai/DeepSeek-V3"
      title: "deepseek-ai/DeepSeek-V3"
    - url: "https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html"
      title: "DeepSeek Open Platform Terms of Service"
  checks:
    - type: source_match
      result: pass
      sources: 4
      summary: "회사, API, 공개 모델 계열이 같은 이름 아래 묶인다는 점을 공식 문서 기준으로 다시 맞춰봤어."
      items:
        - "독자 문제 대조: DeepSeek를 특정 모델 하나가 아니라 회사 브랜드와 모델 계열, API가 같이 붙는 이름으로 먼저 읽게 정리했어."
        - "API 개요 문서와 이용약관은 서비스 운영 주체와 API 경로를 보여 주고, GitHub 리포지토리는 공개 모델 계열이 따로 존재한다는 점을 뒷받침해."
        - "그래서 본문도 회사 이야기, [API](/ko/wiki/api/) 이야기, 공개 [weight](/ko/wiki/weight/) 이야기로 층위를 나눠 설명했어."
      findings:
        - "한 이름에 여러 층위가 섞이는 문제를 앞단에서 먼저 잘라 뒀어."
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "API 문서와 공개 리포지토리, 약관이 서로 어떤 층위를 가리키는지 다시 맞춰봤어."
      items:
        - "비교 기준: API 개요 문서는 서비스 접근 경로를, GitHub 리포지토리는 공개 모델 계열을, 약관은 운영 주체와 플랫폼 범위를 설명하는지 맞춰봤어."
        - "공개 리포지토리의 R1/V3 계열과 API 문서의 OpenAI 호환 서빙 문맥을 같은 주장처럼 섞지 않고 분리했어."
      findings:
        - "벤치마크나 가격 이야기가 붙어도 그게 API인지 공개 모델인지 따로 읽어야 한다는 해석 경계를 남겼어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "공개 계열에서 직접 확인되는 숫자만 남겨서 다시 맞춰봤어."
      items:
        - "DeepSeek-R1 리포지토리 기준으로 671B total, 37B activated 설명을 다시 확인했어."
        - "API 문서에 OpenAI 호환 접근 경로가 있다는 점만 확인하고, 이 페이지에서는 서비스 가격표나 앱 체감 같은 별도 숫자는 억지로 끌어오지 않았어."
      findings:
        - "회사 브랜드 페이지에서 확인되지 않는 숫자는 본문 핵심 근거로 쓰지 않았어."
    - type: adversarial
      result: pass
      sources: 4
      summary: "회사 이름과 모델 이름, API 별칭을 하나로 읽는 오해를 먼저 막아뒀어."
      items:
        - "DeepSeek를 곧바로 [DeepSeek R1](/ko/wiki/deepseek-r1/) 하나로 읽지 않게 family 문맥을 먼저 깔았어."
        - "OpenAI 호환 API 문맥을 모델 버전 번호로 오해하지 않게 서비스 층위를 따로 적었어."
      findings:
        - "동일 이름 다층 구조 때문에 생기는 해석 오류를 초반에 차단했어."
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "90d076b5eb62a1bd"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의

DeepSeek는 중국 AI 회사 DeepSeek가 쓰는 브랜드 이름이야. 회사 이름이기도 하고, 공개 모델 계열 이름이기도 하고, [OpenAI](/ko/wiki/openai/) 호환 [API](/ko/wiki/api/) 서비스 이름처럼 읽히기도 해서 기사에서 이 단어가 나오면 먼저 어떤 층위를 말하는지 나눠 보는 게 중요해.

## 이 모델로 무엇을 할 수 있나

실무에선 DeepSeek라는 이름이 보통 코딩 보조, [reasoning](/ko/wiki/reasoning/)형 Q&A, 구조화 출력 자동화 같은 일을 할 때 붙어 나와. 공식 API 문서는 기본 주소를 `https://api.deepseek.com`으로 두고 [OpenAI](/ko/wiki/openai/) 호환 포맷을 지원한다고 설명해 두고, GitHub에는 [DeepSeek-R1](/ko/wiki/deepseek-r1/)과 DeepSeek-V3처럼 공개 모델 계열 리포지토리가 따로 있어. 그래서 같은 이름을 봐도 "서비스를 쓰는 얘기인지, 공개 모델을 가져다 돌리는 얘기인지"를 먼저 가르는 편이 안전해.

또 기사에서 성능표나 [benchmark](/ko/wiki/benchmark/) 얘기가 붙으면 공개 모델 계열 문맥일 가능성이 크고, 기존 [OpenAI](/ko/wiki/openai/) SDK에서 갈아타기 쉽다는 식의 말이 붙으면 서비스 문맥일 가능성이 커. 이 두 문맥을 섞어 읽으면 가격, 운영 책임, 공개 여부를 완전히 다르게 해석하게 돼.

## 왜 중요한가

DeepSeek라는 이름이 중요한 이유는 한 단어에 회사 이야기, 공개 모델 이야기, API 이야기, 앱 체감담까지 한꺼번에 엮이기 쉬워서야. 같은 글 안에서도 공개 모델인 [DeepSeek-R1](/ko/wiki/deepseek-r1/)과 서비스형 API 품질 얘기가 섞이면, 독자는 다른 층위를 같은 말로 읽게 돼. 그래서 "이 문장이 회사냐, 서비스냐, 공개 모델이냐"를 먼저 나누는 습관이 필요해.

이 구분은 선택에도 바로 연결돼. 공개 [weight](/ko/wiki/weight/)를 직접 다루려는지, 아니면 [OpenAI](/ko/wiki/openai/) 호환 API만 붙이면 되는지에 따라 운영 부담과 검증 포인트가 완전히 달라지기 때문이야.

## 같이 보면 좋은 모델

- [DeepSeek R1](/ko/wiki/deepseek-r1/): DeepSeek 브랜드 아래에서 가장 자주 대표 사례로 불리는 [reasoning](/ko/wiki/reasoning/) 공개 모델이야.
- [Qwen 3.5](/ko/wiki/qwen-3.5/): 중국 오픈 모델 계열을 다른 운영 철학으로 비교할 때 기준이 돼.
- [Gemma 4](/ko/wiki/gemma-4/): [온디바이스](/ko/wiki/on-device/)·오픈 [웨이트](/ko/wiki/weight/) 축과 비교할 때 자주 함께 언급돼.
- [OpenAI](/ko/wiki/openai/): API 호환 문맥을 읽을 때 어떤 서비스 층위와 비교하고 있는지 가르는 기준이 돼.
