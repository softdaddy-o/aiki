---
term: function-calling
title: "Function Calling"
lang: ko
summary: "Function Calling는 API 연결과 제품 기능 확장 맥락에서 반복해서 등장하는 AI 기법다."
readerValue: "Function Calling가 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
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
  date: "2026-04-08"
  sources:
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "Function calling | OpenAI API"
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Function Calling"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Function calling | OpenAI API (https://platform.openai.com/docs/guides/function-calling)"
        - "Tool use with Claude (https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "세부 수치나 가격은 문서 성격상 고정값이 아닐 수 있어 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 용어 방향을 잡는 설명용 항목이라 세부 수치는 개별 기사나 버전 페이지에서 다시 확인해야 한다."
---
## 먼저 감 잡기
Function Calling는 특정 제품명이 아니라 일을 처리하는 방법에 가까워. 결국 이 기법이 API 연결과 제품 기능 확장 가운데 무엇을 바꾸는지 봐야 해. 같은 기법이라도 어떤 모델과 데이터 위에 얹히느냐에 따라 무게가 달라져.
## 뉴스에서 왜 자주 나오나
Function Calling는 AIKI 기사에서 1번 이상 언급됐고, 가장 이른 기록도 2026-04-07까지 올라가 있어. 그만큼 이 용어는 반짝 유행어라기보다 API 연결과 제품 기능 확장 문제를 설명할 때 계속 재등장하는 기준 단어야. 참고 소스도 Function calling | OpenAI API, Tool use with Claude 쪽으로 모여 있어, 한 번 정리해 두면 이후 뉴스를 읽을 때 해석 속도가 빨라져.
## 읽을 때 체크포인트
1. 먼저 Function Calling가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 돼. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라져.

2. 다음으로 이 용어가 API 연결과 제품 기능 확장 중 어디를 바꾸는지 봐야 해. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있어.

3. 마지막으로 기사에서 tool calling 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 돼. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있어.
## 같이 봐야 할 용어
- [mcp](/ko/wiki/mcp/)
- [openai-api](/ko/wiki/openai-api/)
- [anthropic-api](/ko/wiki/anthropic-api/)
- [openrouter](/ko/wiki/openrouter/)