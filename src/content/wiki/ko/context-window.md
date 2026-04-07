---
term: context-window
title: "Context Window"
lang: ko
summary: "LLM(대형 언어 모델)은 대규모 학습 데이터 세트에서 파생된 상황별 관계를 사용하여 자연어 처리 작업, 특히 언어 생성을 수행하도록 설계된 계산 모델입니다."
category: concept
aliases:
  - "context length"
relatedTerms:
  - long-context
  - tokenizer
mentionCount: 0
draft: false
tags:
  - tokens
  - memory
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Large_language_model"
      title: "Large language model - Wikipedia"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"
      title: "Context windows"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 한 줄 정의
Context Window는 LLM(대형 언어 모델)은 대규모 학습 데이터 세트에서 파생된 상황별 관계를 사용하여 자연어 처리 작업, 특히 언어 생성을 수행하도록 설계된 계산 모델입니다. [ 1 ] [ 2 ] LLM은 다양한 맥락에서 텍스트를 생성, 요약, 번역 및 구문 분석할 수 있으며 [ 3 ] 최신 챗봇의 기술적 기반입니다. [4] LLM은 사람이 쓴 텍스트 모음에 대해 훈련을 받았기 때문에 자연어 패턴을 정확하게 모방할 수 있습니다. [ 5 ] 같은 이유로 편향되거나 부정확한 교육 데이터…
## 어떻게 작동하나
클로드 API 문서라는 설명을 함께 보면, Context Window가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
Context Window는 최근 AI 제품, 모델, 워크플로를 읽을 때 기본 맥락을 잡아주는 용어다.
## 관련 용어
- [long-context](/ko/wiki/long-context/)
- [tokenizer](/ko/wiki/tokenizer/)