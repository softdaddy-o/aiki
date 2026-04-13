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
  - gemini-api
firstMentioned: "2026-04-07"
mentionCount: 1
draft: false
tags:
  - tool-use
  - api
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "Function calling | OpenAI API"
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 Claude를 외부 도구 및 API에 연결하세요."
        - "원문을 보면 Claude를 외부 도구 및 API에 연결하세요."
        - "별칭 대조: tool calling도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 Claude를 외부 도구 및 API에 연결하세요."
        - "교차 대조: Claude를 외부 도구 및 API에 연결하세요."
        - "출처 1 대조: platform.openai.com."
        - "출처 2 대조: docs.anthropic.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 API 연결과 제품 통합 맥락에서 다루는 범위를 다시 확인했어."
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
Function Calling은 LLM이 외부 함수, 도구, API를 선택해 구조화된 인자로 호출하도록 만드는 인터페이스다.
## 어떻게 작동하나
예를 들어 사용자가 "서울 날씨 알려줘"라고 하면 모델이 바로 답을 지어내는 대신 weather 함수 호출을 만들어 낸다. 앱은 그 호출을 실행해 실제 날씨 데이터를 받고, 다시 모델이 그 결과를 바탕으로 답을 정리해.

핵심은 모델이 직접 외부 세계와 연결되는 게 아니라, 호출할 함수 목록과 인자 형식을 보고 어떤 도구를 쓸지 결정한다는 점이야. 그래서 도구 정확도와 스키마 설계가 매우 중요해.
## 왜 중요한가
Function Calling을 이해하면 "AI가 실제 일을 한다"는 말이 마법이 아니라 API 호출 구조라는 점이 보여. 에이전트, 업무 자동화, 앱 통합을 읽을 때 필수인 기본 개념이야.
## 관련 용어
- [MCP](/ko/wiki/mcp/) — 같이 보면 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.
- [OpenAI API](/ko/wiki/openai-api/) — 같이 보면 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.
- [Anthropic API](/ko/wiki/anthropic-api/) — 같이 보면 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.
- [Gemini API](/ko/wiki/gemini-api/) — 같이 보면 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.