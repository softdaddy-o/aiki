---
term: vibe-coding
title: "Vibe Coding"
lang: ko
summary: "개발 생산성과 코딩 워크플로를 개선하거나 연결하는 AI 기법이다. 보통 정확도, 비용, 실행 방식 중 하나를 바꾼다."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
category: technique
aliases:
  - "vibe coding"
relatedTerms:
  - agent
  - claude-code
  - cursor
  - langchain
firstMentioned: "2026-03-16"
mentionCount: 2
draft: false
tags:
  - coding-agent
  - workflow
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Vibe_coding"
      title: "Vibe coding - Wikipedia"
    - url: "https://www.anthropic.com/news/claude-3-7-sonnet"
      title: "Claude 3.7 Sonnet and Claude Code"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Vibe Coding"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Vibe coding - Wikipedia (https://en.wikipedia.org/wiki/Vibe_coding)"
        - "Claude 3.7 Sonnet and Claude Code (https://www.anthropic.com/news/claude-3-7-sonnet)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
개발 생산성과 코딩 워크플로를 바꾸거나 개선할 때 쓰는 기법이다. 쉽게 말하면 모델을 제품과 개발 흐름에 붙이는 작업대 역할을 한다고 보면 된다.
## 어떻게 작동하나
모델 자체를 만드는 게 아니라 코드 작성, 검색, 수정, 실행, 리뷰 같은 반복 작업을 줄여 주는 층이다. 그래서 이런 기법은 "무슨 모델이냐"보다 입력, 검색, 학습, 실행 흐름 중 어디에 개입하는지로 이해하는 편이 쉽다.
## 왜 중요한가
실제로는 모델 성능이 비슷할 때 생산성을 가르는 건 이런 도구와 워크플로인 경우가 많다. 같은 모델도 어떤 기법을 붙이느냐에 따라 정확도, 비용, 지연이 크게 달라진다.
## 관련 용어
- [AI Agent](/ko/wiki/agent/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.
- [Claude Code](/ko/wiki/claude-code/) — 개발 생산성과 도구 조합 맥락을 같이 본다.
- [Cursor](/ko/wiki/cursor/) — 개발 생산성과 도구 조합 맥락을 같이 본다.
- [LangChain](/ko/wiki/langchain/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.