---
term: autogen
title: "AutoGen"
lang: ko
summary: "AutoGen는 에이전트가 작업을 이어 가는 방식 맥락에서 반복해서 등장하는 AI 프레임워크다."
readerValue: "이 용어가 뉴스에 나오면 AutoGen가 단순 기능 이름인지, 성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지 빠르게 구분해서 읽게 해준다."
category: framework
aliases:
  - "AutoGen"
relatedTerms:
  - langchain
  - tool-use
  - llamaindex
  - langgraph
mentionCount: 0
draft: false
tags:
  - agents
  - multi-agent
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://github.com/microsoft/autogen"
      title: "microsoft/autogen"
    - url: "https://microsoft.github.io/autogen/stable/"
      title: "AutoGen &#8212; AutoGen"
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
AutoGen는 개별 기능보다 전체 구조를 잡는 프레임워크다. 보통 에이전트가 작업을 이어 가는 방식 같은 문제를 반복 가능하게 묶어 준다. 그래서 기사에서 이 단어가 보이면 단일 모델 뉴스가 아니라 시스템 조합 관점으로 보는 게 맞다.
## 뉴스에서 왜 자주 나오나
AutoGen는 아직 기사 출현 빈도가 높지 않아도 앞으로 자주 붙을 가능성이 높은 용어다. 이유는 간단하다. 독자가 결국 궁금해하는 건 에이전트가 작업을 이어 가는 방식 쪽 변화이기 때문이다. 이런 용어를 먼저 잡아 두면 발표문이 조금 과장돼 보여도 어디를 읽어야 하는지 판단이 쉬워진다.
## 읽을 때 체크포인트
1. 먼저 AutoGen가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 에이전트가 작업을 이어 가는 방식 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.

3. 마지막으로 기사에서 AutoGen 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [langchain](/ko/wiki/langchain/)
- [tool-use](/ko/wiki/tool-use/)
- [llamaindex](/ko/wiki/llamaindex/)
- [langgraph](/ko/wiki/langgraph/)