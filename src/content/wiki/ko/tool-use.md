---
term: tool-use
title: "Tool Use"
lang: ko
summary: "Tool Use는 에이전트가 작업을 이어 가는 방식 맥락에서 반복해서 등장하는 AI 기법다."
readerValue: "Tool Use가 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
category: technique
aliases:
  - "tool use"
relatedTerms:
  - langchain
  - llamaindex
  - langgraph
  - autogen
firstMentioned: "2026-02-27"
mentionCount: 1
draft: false
tags:
  - agents
  - function-calling
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "Function calling | OpenAI API"
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
Tool Use는 특정 제품명이 아니라 일을 처리하는 방법에 가깝다. 결국 이 기법이 에이전트가 작업을 이어 가는 방식 가운데 무엇을 바꾸는지 봐야 한다. 같은 기법이라도 어떤 모델과 데이터 위에 얹히느냐에 따라 무게가 달라진다.
## 뉴스에서 왜 자주 나오나
Tool Use는 AIKI 기사에서 1번 이상 언급됐고, 가장 이른 기록도 2026-02-27까지 올라간다. 그만큼 이 용어는 반짝 유행어라기보다 에이전트가 작업을 이어 가는 방식 문제를 설명할 때 계속 재등장하는 기준 단어다. 참고 소스도 Tool use with Claude, Function calling | OpenAI API 쪽으로 모여 있어, 한 번 정리해 두면 이후 뉴스를 읽을 때 해석 속도가 빨라진다.
## 읽을 때 체크포인트
1. 먼저 Tool Use가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 에이전트가 작업을 이어 가는 방식 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.

3. 마지막으로 기사에서 tool use 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [langchain](/ko/wiki/langchain/)
- [llamaindex](/ko/wiki/llamaindex/)
- [langgraph](/ko/wiki/langgraph/)
- [autogen](/ko/wiki/autogen/)