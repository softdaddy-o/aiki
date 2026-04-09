---
term: tokenizer
title: "Tokenizer"
lang: ko
summary: "텍스트를 모델이 읽을 토큰 단위로 잘라 주는 규칙과 도구. 같은 문장도 어떤 tokenizer를 쓰느냐에 따라 토큰 수가 달라져."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
category: tool
aliases:
  - "tokenizer"
relatedTerms:
  - context-window
mentionCount: 0
draft: false
tags:
  - tokens
  - preprocessing
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Lexical_analysis"
      title: "Lexical analysis"
    - url: "https://platform.openai.com/tokenizer"
      title: "OpenAI Platform"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지"
        - "용어명 대조: Tokenizer"
        - "분류 대조: 도구"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "비교 기준: 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지"
        - "Lexical analysis (https://en.wikipedia.org/wiki/Lexical_analysis)"
        - "OpenAI Platform (https://platform.openai.com/tokenizer)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "선택 기준 대조: 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지"
        - "명칭 대조: Tokenizer"
        - "고정 스펙이 적은 항목이라 숫자 대신 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "오해 방지 기준: 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지"
        - "정의와 역할보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈다."
      findings:
        - "이 페이지는 토큰 예산과 긴 문맥 처리에서 어떤 도구를 붙여야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Tokenizer는 사람이 읽는 문장을 모델이 계산할 수 있는 토큰 단위로 나눠 주는 규칙과 도구야.
## 실제로 무엇을 하나
모델은 문장을 그대로 읽지 않고 tokenizer가 자른 조각을 입력으로 받는다. 그래서 같은 문장도 모델마다 토큰 수가 다를 수 있고, 그 차이가 곧 비용과 컨텍스트 길이 계산 차이로 이어져. OpenAI tokenizer나 llama.cpp 계열 tokenizer가 서로 결과가 다른 이유도 여기에 있어.
## 왜 중요한가
실무에서는 프롬프트가 왜 갑자기 길이 제한에 걸리는지, 왜 예상보다 비용이 많이 나오는지 설명할 때 tokenizer 이해가 꼭 필요해. 모델을 바꾸면 성능만이 아니라 토큰 계산 방식도 같이 달라져.
## 관련 용어
- [Token](/ko/wiki/token/) — tokenizer가 만들어 내는 기본 단위
- [Context Window](/ko/wiki/context-window/) — 잘린 토큰을 어디까지 넣을 수 있는지 정하는 한도
- [LLM](/ko/wiki/llm/) — tokenizer가 자른 토큰을 실제로 처리하는 기반 모델