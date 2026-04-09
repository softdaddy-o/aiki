---
term: token
title: "Token"
lang: ko
summary: "모델이 텍스트를 잘라 읽는 최소 단위. 비용, 컨텍스트 길이, 최대 출력 계산이 모두 토큰 기준으로 움직여."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "tokenization"
relatedTerms:
  - llm
  - long-context
  - memory
firstMentioned: "2026-02-23"
mentionCount: 9
draft: false
tags:
  - language-model
  - context-window
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Lexical_analysis"
      title: "Lexical analysis"
    - url: "https://platform.openai.com/tokenizer"
      title: "https://platform.openai.com/tokenizer"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Token"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Lexical analysis (https://en.wikipedia.org/wiki/Lexical_analysis)"
        - "https://platform.openai.com/tokenizer (https://platform.openai.com/tokenizer)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Token"
        - "숫자가 적은 개념형 항목이라 고정 스펙보다 정의와 분류가 틀리지 않는지 먼저 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Token은 LLM이 텍스트를 한 글자씩이 아니라 잘게 쪼갠 조각 단위로 읽을 때 쓰는 기본 단위다.
## 어떻게 작동하나
영어 단어 하나가 토큰 하나일 때도 있지만, 긴 단어는 여러 조각으로 나뉠 수 있고 한글도 글자 수와 토큰 수가 꼭 일치하지는 않아. 모델은 결국 이 토큰 개수를 기준으로 입력 길이, 출력 길이, 요금을 계산해. 그래서 같은 문장도 어떤 tokenizer를 쓰느냐에 따라 비용과 처리 한도가 달라져.
## 왜 중요한가
뉴스에서 "128K 컨텍스트", "최대 출력 8K", "1M tokens당 가격" 같은 문구가 보이면 전부 토큰 단위를 말하는 거다. 이 개념을 알아야 모델 스펙표와 API 요금표를 제대로 읽을 수 있어.
## 관련 용어
- [LLM](/ko/wiki/llm/) — 토큰을 실제로 읽고 예측하는 기반 모델
- [Tokenizer](/ko/wiki/tokenizer/) — 텍스트를 토큰으로 자르는 규칙과 도구
- [Context Window](/ko/wiki/context-window/) — 한 번에 넣을 수 있는 토큰 상한