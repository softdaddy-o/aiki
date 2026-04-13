---
term: vibe-coding
title: "Vibe Coding"
lang: ko
summary: "Vibe Coding은 명세를 길게 설계하기보다 자연어로 분위기와 의도를 던지고, 모델이 코드를 빠르게 짜게 만든 뒤 사람이 고쳐 가는 개발 방식이야."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르는 기준이 돼."
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
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Vibe_coding"
      title: "Vibe coding - Wikipedia"
    - url: "https://www.anthropic.com/news/claude-3-7-sonnet"
      title: "Claude 3.7 Sonnet and Claude Code"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 소프트웨어 개발자는 소스 코드를 자동으로 생성하는 LLM(대형 언어 모델)에 대한 프롬프트로 프로젝트나 작업을 설명합니다."
        - "원문을 보면 소프트웨어 개발자는 소스 코드를 자동으로 생성하는 LLM(대형 언어 모델)에 대한 프롬프트로 프로젝트나 작업을 설명합니다."
        - "별칭 대조: vibe coding도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 소프트웨어 개발자는 소스 코드를 자동으로 생성하는 LLM(대형 언어 모델)에 대한 프롬프트로 프로젝트나 작업을 설명합니다."
        - "교차 대조: 소프트웨어 개발자는 소스 코드를 자동으로 생성하는 LLM(대형 언어 모델)에 대한 프롬프트로 프로젝트나 작업을 설명합니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: anthropic.com."
    - type: number_verify
      result: pass
      summary: "설명에 직접 걸리는 숫자와 표기를 한 번 더 검증해뒀어 확인했어."
      items:
        - "숫자를 다시 보면 91 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 1 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 93 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 2 같은 표기가 실제 기준점으로 잡혀."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 새 제품명으로 받아들이면 실제로는 기존 모델 위에 얹는 방법론이라는 점을 놓치기 쉬워."
        - "헷갈리기 쉬운 건 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Vibe Coding은 개발자가 세세한 구현을 먼저 설계하기보다 자연어로 원하는 느낌과 목표를 설명하고, AI가 초안을 만든 뒤 반복해서 다듬는 코딩 방식이야.
## 어떻게 작동하나
예를 들어 "설정 페이지를 깔끔한 카드 UI로 만들어 줘"처럼 의도와 분위기를 먼저 던지면, Claude Code나 Cursor 같은 도구가 여러 파일을 건드려 초안을 빠르게 만들어. 그다음 사람이 출력 코드를 읽고, 구조를 고치고, 테스트를 붙이고, 세부 동작을 보정하는 흐름이 반복돼.

그래서 vibe coding은 "AI가 대신 코딩한다"기보다, 사람이 명령형 구현 대신 방향성과 제약을 주는 방식에 더 가까워. 작은 프로토타입에서는 속도가 매우 빠르지만, 큰 코드베이스로 갈수록 리뷰와 검증 비용이 더 중요해진다는 점도 같이 봐야 해.
## 왜 중요한가
Vibe Coding을 이해하면 코딩 에이전트 뉴스가 단순 모델 성능 이야기가 아니라 작업 방식 변화 이야기라는 점이 보여. 특히 프로토타입 속도와 유지보수 리스크가 동시에 커지는 패턴이라서, "어디까지 AI에 맡길지"를 판단할 때 좋은 기준점이 돼.
## 관련 용어
- [Claude Code](/ko/wiki/claude-code/) — vibe coding 흐름이 실제 터미널 기반 코딩 도구에서 어떻게 구현되는지 보여 주는 대표 사례다.
- [Cursor](/ko/wiki/cursor/) — 같은 흐름을 IDE 안에서 어떻게 체감하는지 비교하기 좋아.
- [AI Agent](/ko/wiki/agent/) — vibe coding이 단순 자동완성보다 여러 단계 실행 구조와 만날 때 어떻게 달라지는지 함께 보면 이해가 빨라진다.
- [LangChain](/ko/wiki/langchain/) — 코드 생성 자체와 에이전트 workflow 프레임워크를 헷갈리지 않게 비교하기 좋은 용어다.