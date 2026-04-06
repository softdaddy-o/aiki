---
term: api
title: "API — 프로그램끼리 대화하는 언어"
lang: ko
summary: "API는 프로그램끼리 데이터를 주고받는 약속된 규칙이야. 식당 메뉴판처럼, 어떤 요청을 보내면 어떤 결과가 오는지 정해놓은 인터페이스거든."
category: concept
aliases:
    - application programming interface
    - 응용 프로그래밍 인터페이스
relatedTerms:
    - llm
    - agent
    - mcp
mentionCount: 15
draft: false
tags:
    - infrastructure
    - integration
---

## 한 줄 정의

API(Application Programming Interface)는 프로그램끼리 대화할 때 쓰는 메뉴판이야. "이렇게 요청하면 이런 결과 줄게"라는 약속이거든.

## 작동 원리

식당 가면 메뉴판 보고 주문하잖아. 주방에서 뭘 어떻게 만드는지는 몰라도, 메뉴판에 있는 걸 시키면 음식이 나와. API도 똑같아.

예를 들어 날씨 앱이 기상청 데이터를 보여주려면, 기상청 서버한테 "서울 날씨 알려줘"라고 요청을 보내. 그러면 서버가 정해진 형식으로 기온, 습도, 강수확률을 돌려주지. 이 요청-응답 규칙 전체가 API야.

AI 세계에서는 이게 특히 중요해. OpenAI API에 텍스트를 보내면 GPT가 답변을 생성해서 돌려주고, Anthropic API에 보내면 Claude가 응답해. 내부에서 수천억 개 파라미터가 어떻게 돌아가는지 몰라도, API 규격만 맞추면 누구나 AI를 자기 서비스에 붙일 수 있어.

## 왜 중요한가

API가 없으면 모든 걸 직접 만들어야 해. 결제? 직접 구현. 지도? 직접 그려. AI? 직접 학습. 현실적으로 불가능하지.

API 덕분에 스타트업 한 팀이 Claude API로 고객 상담 챗봇을 만들고, Google Maps API로 배달 경로를 짜고, Stripe API로 결제를 처리할 수 있어. 레고 블록처럼 조립하는 거야. 요즘 AI 서비스 대부분이 이런 식으로 여러 API를 엮어서 만들어져 있거든.

## 관련 용어

- [LLM](/ko/wiki/llm) — API를 통해 외부에서 호출할 수 있는 거대 언어 모델이야.
- [AI 에이전트](/ko/wiki/agent) — 여러 API를 자율적으로 호출하면서 작업을 수행하는 AI 프로그램이야.
- [MCP](/ko/wiki/mcp) — AI가 외부 도구와 소통하는 표준 프로토콜이야. API 위에 한 층 더 얹은 규격이라고 보면 돼.
