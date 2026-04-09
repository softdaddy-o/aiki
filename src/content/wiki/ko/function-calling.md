---
term: function-calling
title: "Function Calling"
lang: ko
summary: "Function Calling은 모델이 답변만 생성하는 대신 정해진 함수나 API를 호출하게 만드는 실행 방식이야."
readerValue: "이 말이 답변 생성 이야기가 아니라 외부 도구 실행과 연결 구조 이야기인지 빠르게 구분하게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "Function calling | OpenAI API"
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Function Calling"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Function calling | OpenAI API (https://platform.openai.com/docs/guides/function-calling)"
        - "Tool use with Claude (https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Function Calling"
        - "숫자가 적은 개념형 항목이라 고정 스펙보다 정의와 분류가 틀리지 않는지 먼저 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Function Calling은 LLM이 외부 함수, 도구, API를 선택해 구조화된 인자로 호출하도록 만드는 인터페이스다.
## 어떻게 작동하나
예를 들어 사용자가 "서울 날씨 알려줘"라고 하면 모델이 바로 답을 지어내는 대신 weather 함수 호출을 만들어 낸다. 앱은 그 호출을 실행해 실제 날씨 데이터를 받고, 다시 모델이 그 결과를 바탕으로 답을 정리해.

핵심은 모델이 직접 외부 세계와 연결되는 게 아니라, 호출할 함수 목록과 인자 형식을 보고 어떤 도구를 쓸지 결정한다는 점이야. 그래서 도구 정확도와 스키마 설계가 매우 중요해.
## 왜 중요한가
Function Calling을 이해하면 "AI가 실제 일을 한다"는 말이 마법이 아니라 API 호출 구조라는 점이 보여. 에이전트, 업무 자동화, 앱 통합을 읽을 때 필수인 기본 개념이야.
## 관련 용어
- [MCP](/ko/wiki/mcp/) — 외부 도구 실행 맥락을 같이 이해하게 해 준다.
- [OpenAI API](/ko/wiki/openai-api/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.
- [Anthropic API](/ko/wiki/anthropic-api/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.
- [OpenRouter](/ko/wiki/openrouter/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.