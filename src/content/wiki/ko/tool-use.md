---
term: tool-use
title: "Tool Use"
lang: ko
summary: "Claude를 외부 도구 및 API에 연결하세요."
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
  date: "2026-04-07"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "https://platform.openai.com/docs/guides/function-calling"
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
Tool Use는 Claude를 외부 도구 및 API에 연결하세요. 도구가 실행되는 위치와 에이전트 루프가 작동하는 방식을 알아보세요라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
https://platform.openai.com/docs/guides/function-calling라는 설명을 함께 보면, Tool Use가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Tool Use는 1번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [langchain](/ko/wiki/langchain/)
- [llamaindex](/ko/wiki/llamaindex/)
- [langgraph](/ko/wiki/langgraph/)
- [autogen](/ko/wiki/autogen/)