---
term: tool-use
title: "Tool Use"
lang: ko
summary: "Tool Use는 모델이 필요할 때 검색, 계산, 사내 API 같은 외부 도구를 호출해 실제 작업을 이어 가는 방식이야."
readerValue: "이 말이 답변 생성 이야기가 아니라 외부 도구 실행과 연결 구조 이야기인지 빠르게 구분하게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "Function calling | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자가 먼저 갈라 봐야 할 건 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "이름을 다시 보면 Tool Use로 잡혀."
        - "분류를 다시 보면 기법로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "여기서 먼저 갈라 볼 기준은 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "같이 본 출처로는 Tool use with Claude (https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview)"
        - "같이 본 출처로는 Function calling | OpenAI API (https://platform.openai.com/docs/guides/function-calling)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "이름부터 다시 보면 Tool Use로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "헷갈리지 않으려면 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 도구 호출과 실행 연결를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Tool Use는 LLM이 텍스트 생성만 하지 않고 외부 도구를 불러 결과를 받아 다시 사용하는 실행 패턴이야.
## 어떻게 작동하나
모델은 우선 어떤 도구가 필요한지 판단하고, 해당 도구를 호출한 뒤, 반환된 결과를 다음 추론 단계에 반영해. 검색 엔진, 계산기, 데이터베이스 조회, 웹 브라우징이 대표적인 예다.

Function Calling이 도구 호출 인터페이스 자체를 가리킨다면, Tool Use는 그 인터페이스를 포함해 실제 작업 흐름 안에서 도구를 활용하는 더 넓은 개념으로 보면 이해하기 쉬워.
## 왜 중요한가
에이전트가 단순 챗봇을 넘어서려면 결국 도구를 써야 해. Tool Use를 이해하면 "모델 성능"과 "실행 가능한 시스템"을 분리해서 읽을 수 있어.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 외부 도구 실행 맥락을 같이 이해하게 해 준다.
- [LlamaIndex](/ko/wiki/llamaindex/) — 외부 도구 실행 맥락을 같이 이해하게 해 준다.
- [LangGraph](/ko/wiki/langgraph/) — 외부 도구 실행 맥락을 같이 이해하게 해 준다.
- [AutoGen](/ko/wiki/autogen/) — 외부 도구 실행 맥락을 같이 이해하게 해 준다.