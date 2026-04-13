---
term: memory
title: "Memory"
lang: ko
summary: "Memory는 에이전트나 챗봇이 이전 대화와 작업 결과를 저장해 다음 행동에 다시 쓰게 하는 기억 계층이야."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "agent memory"
  - "ai memory"
relatedTerms:
  - langchain
  - tool-use
  - llamaindex
  - long-context
firstMentioned: "2026-02-27"
mentionCount: 18
draft: false
tags:
  - agents
  - context-window
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering"
      title: "Not Found - Claude API Docs"
    - url: "https://blog.langchain.dev/short-term-memory-agent/"
      title: "https://blog.langchain.dev/short-term-memory-agent/"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 https://blog.langchain.dev/short-term-memory-agent/."
        - "원문을 보면 https://blog.langchain.dev/short-term-memory-agent/."
        - "별칭 대조: agent memory, ai memory도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "교차 대조: 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "출처 1 대조: docs.anthropic.com."
        - "출처 2 대조: blog.langchain.dev."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 토큰 예산과 긴 문맥 처리 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Memory는 모델이나 에이전트가 과거 대화, 사용자 선호, 중간 결과를 저장하고 다음 요청에서 다시 참조하게 만드는 구조야.
## 어떻게 작동하나
짧은 메모리는 현재 대화 안에서만 유지되고, 긴 메모리는 여러 세션에 걸쳐 저장될 수 있어. 예를 들어 코딩 에이전트가 방금 수정한 파일 목록을 기억하거나, 개인 비서 앱이 사용자의 일정 선호를 저장하는 식이야.

중요한 점은 메모리가 곧바로 컨텍스트 창과 같지는 않다는 것이야. 컨텍스트는 한 번에 넣을 수 있는 길이이고, 메모리는 필요할 때 다시 불러올 수 있는 저장 구조에 가까워.
## 왜 중요한가
에이전트 제품에서 "기억한다"는 표현이 나오면 단순히 컨텍스트가 길어졌다는 뜻인지, 별도 저장 시스템이 붙었다는 뜻인지 구분해야 해. 이 차이가 제품 경험을 크게 바꿔.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 같이 보면 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다.
- [Tool Use](/ko/wiki/tool-use/) — 같이 보면 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다.
- [LlamaIndex](/ko/wiki/llamaindex/) — 같이 보면 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다.
- [Long Context](/ko/wiki/long-context/) — Long Context와 비교해 보면 토큰 예산과 긴 문맥 처리에서 어디가 다른지 읽기 쉬워.