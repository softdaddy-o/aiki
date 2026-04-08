---
term: memory
title: "Memory"
lang: ko
summary: "메모리는 AI 에이전트가 이전 대화, 사용자 선호, 작업 상태를 이어서 쓰기 위해 남겨두는 기억 층이다."
category: concept
aliases:
  - "agent memory"
  - "ai memory"
relatedTerms:
  - context-window
  - long-context
  - tool-use
  - langchain
firstMentioned: "2026-02-27"
mentionCount: 19
draft: false
tags:
  - agents
  - context-window
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering"
      title: "Context engineering"
    - url: "https://blog.langchain.dev/short-term-memory-agent/"
      title: "How to add short-term memory to your LangChain agent"
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
## 한 줄 정의

Memory는 AI 에이전트가 방금 한 일만 보는 대신, 이전 대화와 작업 상태를 이어서 쓰게 만드는 기억 층이야.

## 어떻게 작동하나

컨텍스트 윈도우만으로는 오래 일하기가 어려워. 세션이 길어질수록 앞부분이 밀려나고, 새로 연 대화에선 이전 작업을 그대로 이어받지도 못하거든. 그래서 에이전트 시스템은 필요한 정보를 따로 저장해 두고, 다음 호출 때 다시 주입하는 메모리 계층을 둬.

보통은 세 가지가 같이 움직여.

1. **단기 메모리**: 현재 세션에서 방금 한 결정, 최근 에러, 직전 도구 호출 결과처럼 바로 이어서 써야 하는 정보야.
2. **장기 메모리**: 사용자 선호, 반복 작업 규칙, 프로젝트 배경처럼 여러 세션에 걸쳐 유지할 정보야.
3. **작업 메모리**: 지금 진행 중인 목표, 체크리스트, 중간 산출물처럼 "현재 일감"을 복원하기 위한 상태야.

핵심은 많이 저장하는 게 아니라, 다음 행동에 필요한 기억만 다시 꺼내 쓰는 거야. 메모리가 너무 많으면 오히려 잡음이 늘고, 너무 적으면 매번 처음부터 다시 설명해야 해.

## 왜 중요한가

에이전트가 한 번의 답변이 아니라 여러 단계를 거쳐 일하려면 기억이 거의 필수야. 파일을 고치다 실패한 이유를 다음 시도에서 기억해야 하고, 사용자가 싫어하는 표현도 다음 글에서 피해야 하잖아. 메모리가 없으면 모델은 매 호출마다 똑똑한 신입처럼 행동하고, 메모리가 있으면 점점 맥락을 쌓는 팀원처럼 움직여.

그래서 최근 에이전트 경쟁도 단순 모델 점수보다 "얼마나 안정적으로 기억을 축적하고 다시 꺼내 쓰느냐" 쪽으로 옮겨가고 있어. 긴 컨텍스트, 벡터 검색, 프로필 저장, 작업 로그 같은 기능이 한 묶음으로 자주 같이 언급되는 이유가 여기 있어.

## 관련 용어

- [context-window](/ko/wiki/context-window/) — 모델이 한 번에 직접 읽을 수 있는 입력 길이야. 메모리는 이 한계를 보완하려고 따로 붙는 층이야.
- [long-context](/ko/wiki/long-context/) — 컨텍스트를 길게 늘리는 접근이야. 메모리와 비슷해 보여도, 저장과 재주입이라는 점에서 역할이 달라.
- [tool-use](/ko/wiki/tool-use/) — 메모리에 남긴 작업 상태를 바탕으로 도구를 다시 호출할 때 함께 쓰인다.
- [langchain](/ko/wiki/langchain/) — 에이전트 메모리 패턴을 라이브러리 차원에서 많이 정리해 온 프레임워크야.
