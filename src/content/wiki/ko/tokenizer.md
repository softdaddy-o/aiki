---
term: tokenizer
title: "Tokenizer"
lang: ko
summary: "텍스트를 모델이 읽을 토큰 단위로 잘라 주는 규칙과 도구. 같은 문장도 어떤 tokenizer를 쓰느냐에 따라 토큰 수가 달라진다."
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
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Tokenizer"
        - "분류 대조: 도구"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Lexical analysis (https://en.wikipedia.org/wiki/Lexical_analysis)"
        - "OpenAI Platform (https://platform.openai.com/tokenizer)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Tokenizer는 사람이 읽는 문장을 모델이 계산할 수 있는 토큰 단위로 나눠 주는 규칙과 도구다.
## 실제로 무엇을 하나
모델은 문장을 그대로 읽지 않고 tokenizer가 자른 조각을 입력으로 받는다. 그래서 같은 문장도 모델마다 토큰 수가 다를 수 있고, 그 차이가 곧 비용과 컨텍스트 길이 계산 차이로 이어진다. OpenAI tokenizer나 llama.cpp 계열 tokenizer가 서로 결과가 다른 이유도 여기에 있다.
## 왜 중요한가
실무에서는 프롬프트가 왜 갑자기 길이 제한에 걸리는지, 왜 예상보다 비용이 많이 나오는지 설명할 때 tokenizer 이해가 꼭 필요하다. 모델을 바꾸면 성능만이 아니라 토큰 계산 방식도 같이 달라진다.
## 관련 용어
- [Token](/ko/wiki/token/) — tokenizer가 만들어 내는 기본 단위
- [Context Window](/ko/wiki/context-window/) — 잘린 토큰을 어디까지 넣을 수 있는지 정하는 한도
- [LLM](/ko/wiki/llm/) — tokenizer가 자른 토큰을 실제로 처리하는 기반 모델