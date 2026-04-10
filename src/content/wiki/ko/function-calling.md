---
term: function-calling
title: "Function Calling"
lang: ko
summary: "Function Calling은 모델이 답변만 생성하는 대신 정해진 함수나 API를 호출하게 만드는 실행 방식이야."
readerValue: "이 말이 답변 생성 이야기가 아니라 외부 도구 실행과 연결 구조 이야기인지 빠르게 구분하는 데 도움이 돼."
category: technique
aliases:
  - "tool calling"
relatedTerms:
  - mcp
  - openai-api
  - anthropic-api
  - openrouter
firstMentioned: "2026-04-07"
mentionCount: 1
draft: false
tags:
  - tool-use
  - api
factCheck:
  status: passed
  date: "2026-04-10"
  sources:
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "Function calling | OpenAI API"
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "이름을 다시 보면 Function Calling로 잡혀."
        - "분류를 다시 보면 기법로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "같이 본 출처로는 Function calling | OpenAI API (https://platform.openai.com/docs/guides/function-calling)"
        - "같이 본 출처로는 Tool use with Claude (https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "이름부터 다시 보면 Function Calling로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 API 연결과 제품 통합를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Function Calling은 LLM이 외부 함수, 도구, API를 선택해 구조화된 인자로 호출하도록 만드는 인터페이스다.
## 어떻게 작동하나
예를 들어 사용자가 "서울 날씨 알려줘"라고 하면 모델이 바로 답을 지어내는 대신 weather 함수 호출을 만들어 낸다. 앱은 그 호출을 실행해 실제 날씨 데이터를 받고, 다시 모델이 그 결과를 바탕으로 답을 정리해. 핵심은 모델이 직접 외부 세계와 연결되는 게 아니라, 호출할 함수 목록과 인자 형식을 보고 어떤 도구를 쓸지 결정한다는 점이야. 그래서 도구 정확도와 스키마 설계가 매우 중요해.
## 왜 중요한가
Function Calling을 이해하면 "AI가 실제 일을 한다"는 말이 마법이 아니라 API 호출 구조라는 점이 보여. 에이전트, 업무 자동화, 앱 통합을 읽을 때 필수인 기본 개념이야.
## 관련 용어
- [MCP](/ko/wiki/mcp/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워. - [OpenAI API](/ko/wiki/openai-api/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워. - [Anthropic API](/ko/wiki/anthropic-api/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워. - [OpenRouter](/ko/wiki/openrouter/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.