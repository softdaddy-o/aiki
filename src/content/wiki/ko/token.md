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
      title: "OpenAI Platform"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지"
        - "용어명 대조: Token"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "비교 기준: 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지"
        - "Lexical analysis (https://en.wikipedia.org/wiki/Lexical_analysis)"
        - "OpenAI Platform (https://platform.openai.com/tokenizer)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "선택 기준 대조: 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지"
        - "명칭 대조: Token"
        - "고정 스펙이 적은 항목이라 숫자 대신 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "오해 방지 기준: 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지"
        - "정의와 역할보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈다."
      findings:
        - "이 페이지는 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
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