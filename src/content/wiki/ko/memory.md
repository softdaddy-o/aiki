---
term: memory
title: "Memory"
lang: ko
summary: "Memory는 에이전트나 챗봇이 이전 대화와 작업 결과를 저장해 다음 행동에 다시 쓰게 하는 기억 계층이다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering"
      title: "Not Found - Claude API Docs"
    - url: "https://blog.langchain.dev/short-term-memory-agent/"
      title: "https://blog.langchain.dev/short-term-memory-agent/"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Memory"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Not Found - Claude API Docs (https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering)"
        - "https://blog.langchain.dev/short-term-memory-agent/ (https://blog.langchain.dev/short-term-memory-agent/)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Memory는 모델이나 에이전트가 과거 대화, 사용자 선호, 중간 결과를 저장하고 다음 요청에서 다시 참조하게 만드는 구조다.
## 어떻게 작동하나
짧은 메모리는 현재 대화 안에서만 유지되고, 긴 메모리는 여러 세션에 걸쳐 저장될 수 있다. 예를 들어 코딩 에이전트가 방금 수정한 파일 목록을 기억하거나, 개인 비서 앱이 사용자의 일정 선호를 저장하는 식이다.

중요한 점은 메모리가 곧바로 컨텍스트 창과 같지는 않다는 것이다. 컨텍스트는 한 번에 넣을 수 있는 길이이고, 메모리는 필요할 때 다시 불러올 수 있는 저장 구조에 가깝다.
## 왜 중요한가
에이전트 제품에서 "기억한다"는 표현이 나오면 단순히 컨텍스트가 길어졌다는 뜻인지, 별도 저장 시스템이 붙었다는 뜻인지 구분해야 한다. 이 차이가 제품 경험을 크게 바꾼다.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.
- [Tool Use](/ko/wiki/tool-use/) — 외부 도구 실행 맥락을 같이 이해하게 해 준다.
- [LlamaIndex](/ko/wiki/llamaindex/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Long Context](/ko/wiki/long-context/) — 토큰과 문맥 길이 쪽 맥락을 같이 잡아 준다.