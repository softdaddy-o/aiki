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
mentionCount: 17
draft: false
tags:
  - agents
  - context-window
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering"
      title: "Not Found - Claude API Docs"
    - url: "https://blog.langchain.dev/short-term-memory-agent/"
      title: "https://blog.langchain.dev/short-term-memory-agent/"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 Memory로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 Not Found - Claude API Docs (https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering)"
        - "같이 본 출처로는 https://blog.langchain.dev/short-term-memory-agent/ (https://blog.langchain.dev/short-term-memory-agent/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름부터 다시 보면 Memory로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Memory는 모델이나 에이전트가 과거 대화, 사용자 선호, 중간 결과를 저장하고 다음 요청에서 다시 참조하게 만드는 구조야.
## 어떻게 작동하나
짧은 메모리는 현재 대화 안에서만 유지되고, 긴 메모리는 여러 세션에 걸쳐 저장될 수 있어. 예를 들어 코딩 에이전트가 방금 수정한 파일 목록을 기억하거나, 개인 비서 앱이 사용자의 일정 선호를 저장하는 식이야. 중요한 점은 메모리가 곧바로 컨텍스트 창과 같지는 않다는 것이야. 컨텍스트는 한 번에 넣을 수 있는 길이이고, 메모리는 필요할 때 다시 불러올 수 있는 저장 구조에 가까워.
## 왜 중요한가
에이전트 제품에서 "기억한다"는 표현이 나오면 단순히 컨텍스트가 길어졌다는 뜻인지, 별도 저장 시스템이 붙었다는 뜻인지 구분해야 해. 이 차이가 제품 경험을 크게 바꿔.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다. - [Tool Use](/ko/wiki/tool-use/) — 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다. - [LlamaIndex](/ko/wiki/llamaindex/) — 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다. - [Long Context](/ko/wiki/long-context/) — Memory를 볼 때 비교 포인트는 토큰 예산과 긴 문맥 처리를 기사에서 어떤 판단 기준으로 읽어야 하는지다.