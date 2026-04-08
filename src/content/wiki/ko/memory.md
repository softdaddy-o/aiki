---
term: memory
title: "Memory"
lang: ko
summary: "Memory는 에이전트가 작업을 이어 가는 방식 맥락에서 반복해서 등장하는 AI 개념다."
readerValue: "이 용어가 뉴스에 나오면 Memory가 단순 기능 이름인지, 성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지 빠르게 구분해서 읽게 해준다."
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
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 먼저 감 잡기
Memory는 제품 하나를 뜻하기보다 여러 발표에서 공통으로 쓰이는 개념어다. 이 단어를 잡아 두면 에이전트가 작업을 이어 가는 방식 얘기가 나올 때 문장을 훨씬 빨리 해석할 수 있다. 쉽게 말해 기사에 흩어진 표현을 하나의 지도 위에 올려놓게 해 주는 공용 언어라고 보면 된다.
## 뉴스에서 왜 자주 나오나
Memory는 AIKI 기사에서 16번 이상 언급됐고, 가장 이른 기록도 2026-02-27까지 올라간다. 그만큼 이 용어는 반짝 유행어라기보다 에이전트가 작업을 이어 가는 방식 문제를 설명할 때 계속 재등장하는 기준 단어다. 참고 소스도 Not Found - Claude API Docs, https://blog.langchain.dev/short-term-memory-agent/ 쪽으로 모여 있어서, 마케팅 문구보다 실제 구현 맥락으로 읽을 여지가 크다.
## 읽을 때 체크포인트
1. 먼저 Memory가 모델 내부 이야기인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 에이전트가 작업을 이어 가는 방식 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 밀어 올리는지, 비용을 줄이는지, 아니면 사용자 경험만 부드럽게 만드는지 나눠서 읽으면 과장을 덜 타게 된다.

3. 마지막으로 기사에서 agent memory, ai memory 같은 표현이 섞여 나오면 같은 범주인지 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아서, 여기서 한 번 걸러 두면 발표 내용을 훨씬 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [langchain](/ko/wiki/langchain/)
- [tool-use](/ko/wiki/tool-use/)
- [llamaindex](/ko/wiki/llamaindex/)
- [long-context](/ko/wiki/long-context/)