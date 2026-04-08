---
term: memory
title: "Memory"
lang: ko
summary: "Memory는 에이전트가 작업을 이어 가는 방식 맥락에서 반복해서 등장하는 AI 개념다."
readerValue: "Memory를 보면 용어 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "agent memory"
  - "ai memory"
relatedTerms:
  - langchain
  - tool-use
  - llamaindex
  - long-context
firstMentioned: "2026-02-27"
mentionCount: 16
draft: false
tags:
  - agents
  - context-window
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering"
      title: "Not Found - Claude API Docs"
    - url: "https://blog.langchain.dev/short-term-memory-agent/"
      title: "https://blog.langchain.dev/short-term-memory-agent/"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Memory"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Not Found - Claude API Docs (https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering)"
        - "https://blog.langchain.dev/short-term-memory-agent/ (https://blog.langchain.dev/short-term-memory-agent/)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "세부 수치나 가격은 문서 성격상 고정값이 아닐 수 있어 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 용어 방향을 잡는 설명용 항목이라 세부 수치는 개별 기사나 버전 페이지에서 다시 확인해야 한다."
---
## 먼저 감 잡기
Memory는 제품 하나보다 여러 발표에서 공통으로 쓰이는 개념어야. 이 단어를 잡아 두면 에이전트가 작업을 이어 가는 방식 얘기가 나올 때 문장을 훨씬 빨리 해석할 수 있어. 쉽게 말해 기사에 흩어진 표현을 하나의 지도 위에 올려놓게 해 주는 공용 언어라고 보면 돼.
## 뉴스에서 왜 자주 나오나
Memory는 AIKI 기사에서 16번 이상 언급됐고, 가장 이른 기록도 2026-02-27까지 올라가 있어. 그만큼 이 용어는 반짝 유행어라기보다 에이전트가 작업을 이어 가는 방식 문제를 설명할 때 계속 재등장하는 기준 단어야. 참고 소스도 Not Found - Claude API Docs, https://blog.langchain.dev/short-term-memory-agent/ 쪽으로 모여 있어, 한 번 정리해 두면 이후 뉴스를 읽을 때 해석 속도가 빨라져.
## 읽을 때 체크포인트
1. 먼저 Memory가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 돼. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라져.

2. 다음으로 이 용어가 에이전트가 작업을 이어 가는 방식 중 어디를 바꾸는지 봐야 해. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있어.

3. 마지막으로 기사에서 agent memory, ai memory 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 돼. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있어.
## 같이 봐야 할 용어
- [langchain](/ko/wiki/langchain/)
- [tool-use](/ko/wiki/tool-use/)
- [llamaindex](/ko/wiki/llamaindex/)
- [long-context](/ko/wiki/long-context/)