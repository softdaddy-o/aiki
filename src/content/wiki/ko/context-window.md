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
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Context Window"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Large language model - Wikipedia (https://en.wikipedia.org/wiki/Large_language_model)"
        - "Context windows (https://docs.anthropic.com/en/docs/build-with-claude/context-windows)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Context Window는 모델이 한 번에 받아서 기억하며 처리할 수 있는 최대 토큰 길이다.
## 어떻게 작동하나
예를 들어 128K 컨텍스트라면 입력 프롬프트, 첨부 문서, 이전 대화 기록, 도구 결과까지 전부 합친 토큰 수가 그 한도 안에 들어가야 한다. 길이가 길수록 긴 문서를 통째로 넣기 쉬워지지만, 비용과 지연도 같이 늘고 중간 내용을 놓치는 문제도 생길 수 있다.
## 왜 중요한가
뉴스에서 "1M 컨텍스트" 같은 숫자가 크게 보이면, 그건 모델이 긴 입력을 다룰 수 있는 상한이 올라갔다는 뜻이다. 다만 상한이 커졌다고 무조건 품질이 좋아지는 건 아니어서 비용, 속도, 실제 검색 전략까지 같이 봐야 한다.
## 관련 용어
- [Token](/ko/wiki/token/) — 컨텍스트 길이를 계산하는 기본 단위
- [Tokenizer](/ko/wiki/tokenizer/) — 문장을 토큰으로 자르는 규칙
- [Long Context](/ko/wiki/long-context/) — 긴 입력 처리 경쟁을 설명할 때 같이 나오는 개념