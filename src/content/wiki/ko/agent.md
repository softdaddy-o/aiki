---
term: agent
title: "AI Agent"
lang: ko
summary: "AI Agent는 모델이 계획을 세우고 도구를 호출하며 여러 단계를 이어서 일을 처리하게 만든 실행 구조야."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "ai agent"
  - "intelligent agent"
relatedTerms:
  - langchain
  - langgraph
  - n8n
  - vibe-coding
firstMentioned: "2021-06-29"
mentionCount: 41
draft: false
tags:
  - autonomy
  - workflow
factCheck:
  status: passed
  date: "2026-04-10"
  sources:
    - url: "https://en.wikipedia.org/wiki/Intelligent_agent"
      title: "Intelligent agent"
    - url: "https://www.ibm.com/think/topics/ai-agents"
      title: "What Are AI Agents? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 AI Agent로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 Intelligent agent (https://en.wikipedia.org/wiki/Intelligent_agent)"
        - "같이 본 출처로는 What Are AI Agents? | IBM (https://www.ibm.com/think/topics/ai-agents)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름부터 다시 보면 AI Agent로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 자동화와 에이전트 흐름를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
AI Agent는 LLM이 한 번 답하고 끝나는 대신, 목표를 받고 필요한 단계들을 이어 가며 작업을 수행하는 구조를 말해.
## 어떻게 작동하나
예를 들어 "경쟁사 가격표를 찾아 비교해서 표로 정리해 줘" 같은 요청을 받으면, 에이전트는 검색을 하고, 필요한 페이지를 읽고, 계산하거나 정리한 뒤, 마지막 결과를 만들어. 핵심은 모델 자체가 갑자기 더 똑똑해지는 게 아니라 계획, 상태, 도구 호출, 반복 실행을 묶는 런타임이 추가된다는 점이야. 그래서 챗봇보다 업무 자동화, 코딩 도구, 리서치 워크플로 문맥에서 더 자주 나온다.
## 왜 중요한가
AI Agent를 이해해야 "새 에이전트 출시"가 새 모델 발표인지, 아니면 기존 모델 위에 자동화 계층을 얹은 제품인지 구분할 수 있어. 실무에선 이 차이가 도입 난도와 기대 성능 차이로 바로 이어져.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 돼. - [LangGraph](/ko/wiki/langgraph/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 돼. - [n8n](/ko/wiki/n8n/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 돼. - [Vibe Coding](/ko/wiki/vibe-coding/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 돼.