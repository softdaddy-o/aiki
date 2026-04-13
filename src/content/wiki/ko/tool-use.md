---
term: tool-use
title: "Tool Use"
lang: ko
summary: "Tool Use는 모델이 필요할 때 검색, 계산, 사내 API 같은 외부 도구를 호출해 실제 작업을 이어 가는 방식이야."
readerValue: "이 말이 답변 생성 이야기가 아니라 외부 도구 실행과 연결 구조 이야기인지 빠르게 구분하는 데 도움이 돼."
category: technique
aliases:
  - "tool use"
relatedTerms:
  - langchain
  - llamaindex
  - agentic-ai
  - langgraph
firstMentioned: "2026-02-27"
mentionCount: 1
draft: false
tags:
  - agents
  - function-calling
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "Function calling | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 Claude를 외부 도구 및 API에 연결하세요."
        - "원문을 보면 Claude를 외부 도구 및 API에 연결하세요."
        - "별칭 대조: tool use도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 Claude를 외부 도구 및 API에 연결하세요."
        - "교차 대조: Claude를 외부 도구 및 API에 연결하세요."
        - "출처 1 대조: docs.anthropic.com."
        - "출처 2 대조: platform.openai.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 도구 호출과 실행 연결 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
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
Tool Use는 LLM이 텍스트 생성만 하지 않고 외부 도구를 불러 결과를 받아 다시 사용하는 실행 패턴이야.
## 어떻게 작동하나
모델은 우선 어떤 도구가 필요한지 판단하고, 해당 도구를 호출한 뒤, 반환된 결과를 다음 추론 단계에 반영해. 검색 엔진, 계산기, 데이터베이스 조회, 웹 브라우징이 대표적인 예다.

Function Calling이 도구 호출 인터페이스 자체를 가리킨다면, Tool Use는 그 인터페이스를 포함해 실제 작업 흐름 안에서 도구를 활용하는 더 넓은 개념으로 보면 이해하기 쉬워.
## 왜 중요한가
에이전트가 단순 챗봇을 넘어서려면 결국 도구를 써야 해. Tool Use를 이해하면 "모델 성능"과 "실행 가능한 시스템"을 분리해서 읽을 수 있어.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 같이 보면 외부 도구 실행 맥락을 같이 이해하는 데 도움이 돼.
- [LlamaIndex](/ko/wiki/llamaindex/) — 같이 보면 외부 도구 실행 맥락을 같이 이해하는 데 도움이 돼.
- [Agentic AI](/ko/wiki/agentic-ai/) — 같이 보면 외부 도구 실행 맥락을 같이 이해하는 데 도움이 돼.
- [LangGraph](/ko/wiki/langgraph/) — 같이 보면 외부 도구 실행 맥락을 같이 이해하는 데 도움이 돼.