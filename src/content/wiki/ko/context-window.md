---
term: context-window
title: "Context Window"
lang: ko
summary: "모델이 한 번의 요청에서 읽고 참고할 수 있는 최대 토큰 범위. 길다고 항상 정확한 것은 아니지만 긴 문서를 다룰 수 있는 상한을 보여 준다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Large_language_model"
      title: "Large language model - Wikipedia"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"
      title: "Context windows"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지"
        - "용어명 대조: Context Window"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "비교 기준: 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지"
        - "Large language model - Wikipedia (https://en.wikipedia.org/wiki/Large_language_model)"
        - "Context windows (https://docs.anthropic.com/en/docs/build-with-claude/context-windows)"
    - type: number_verify
      result: pass
      summary: "이 항목에서 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가를 때 필요한 숫자와 이름은 한 번 더 봤다."
      items:
        - "수치 대조: 91"
        - "수치 대조: 1"
        - "수치 대조: 93"
        - "수치 대조: 2"
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
Context Window는 모델이 한 번에 받아서 기억하며 처리할 수 있는 최대 토큰 길이야.
## 어떻게 작동하나
예를 들어 128K 컨텍스트라면 입력 프롬프트, 첨부 문서, 이전 대화 기록, 도구 결과까지 전부 합친 토큰 수가 그 한도 안에 들어가야 해. 길이가 길수록 긴 문서를 통째로 넣기 쉬워지지만, 비용과 지연도 같이 늘고 중간 내용을 놓치는 문제도 생길 수 있어.
## 왜 중요한가
뉴스에서 "1M 컨텍스트" 같은 숫자가 크게 보이면, 그건 모델이 긴 입력을 다룰 수 있는 상한이 올라갔다는 뜻이야. 다만 상한이 커졌다고 무조건 품질이 좋아지는 건 아니어서 비용, 속도, 실제 검색 전략까지 같이 봐야 해.
## 관련 용어
- [Token](/ko/wiki/token/) — 컨텍스트 길이를 계산하는 기본 단위
- [Tokenizer](/ko/wiki/tokenizer/) — 문장을 토큰으로 자르는 규칙
- [Long Context](/ko/wiki/long-context/) — 긴 입력 처리 경쟁을 설명할 때 같이 나오는 개념