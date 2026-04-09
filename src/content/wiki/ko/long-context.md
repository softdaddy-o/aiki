---
term: long-context
title: "Long Context"
lang: ko
summary: "토큰 예산과 긴 문맥 처리를 이해할 때 자주 나오는 AI 개념이다. 기사에서는 이 말이 실제로 무엇을 하는지부터 보는 편이 쉽다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "long context"
relatedTerms:
  - context-window
  - token
  - memory
firstMentioned: "2026-03-27"
mentionCount: 2
draft: false
tags:
  - context-window
  - memory
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"
      title: "Context windows"
    - url: "https://deepmind.google/technologies/gemini/"
      title: "Gemini 3 — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Long Context"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Context windows (https://docs.anthropic.com/en/docs/build-with-claude/context-windows)"
        - "Gemini 3 — Google DeepMind (https://deepmind.google/technologies/gemini/)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
토큰 예산과 긴 문맥 처리를 이해할 때 자주 나오는 개념이다. 쉽게 말하면 모델이 글을 쪼개 읽는 단위와 한 번에 들고 갈 수 있는 예산표에 가깝다.
## 어떻게 작동하나
텍스트를 얼마나 잘게 나누는지, 그리고 그 조각을 한 번에 얼마나 기억할 수 있는지를 정한다. 긴 문서를 붙일 수 있는지와 비용 감각이 여기서 갈린다. 보통 이런 개념은 새 제품 이름이 아니라, 모델이나 시스템이 어떻게 움직이는지를 설명하는 기본 단위로 보면 이해가 빠르다.
## 왜 중요한가
긴 문서 처리, 프롬프트 설계, 사용량 요금제를 읽을 때 기본이 된다. 이 개념을 알고 있으면 화려한 발표 문구를 봐도 실제로 무엇이 개선됐는지 더 빨리 읽을 수 있다.
## 관련 용어
- [Context Window](/ko/wiki/context-window/) — 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다.
- [Token](/ko/wiki/token/) — 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다.
- [Memory](/ko/wiki/memory/) — 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다.