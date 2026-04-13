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
  - agentic-ai
  - langchain
  - langgraph
  - n8n
firstMentioned: "2021-06-29"
mentionCount: 42
draft: false
tags:
  - autonomy
  - workflow
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Intelligent_agent"
      title: "Intelligent agent"
    - url: "https://www.ibm.com/think/topics/ai-agents"
      title: "What Are AI Agents? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 인공지능에서 지능형 에이전트는 환경을 인식하고 목표를 달성하기 위해 자율적으로 조치를 취하며 기계 학습이나 지식 획득을 통해 성능을 향상시킬 수 있는 개체입니다."
        - "원문을 보면 인공지능에서 지능형 에이전트는 환경을 인식하고 목표를 달성하기 위해 자율적으로 조치를 취하며 기계 학습이나 지식 획득을 통해 성능을 향상시킬 수 있는 개체입니다."
        - "별칭 대조: ai agent, intelligent agent도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 인공지능에서 지능형 에이전트는 환경을 인식하고 목표를 달성하기 위해 자율적으로 조치를 취하며 기계 학습이나 지식 획득을 통해 성능을 향상시킬 수 있는 개체입니다."
        - "교차 대조: 인공지능에서 지능형 에이전트는 환경을 인식하고 목표를 달성하기 위해 자율적으로 조치를 취하며 기계 학습이나 지식 획득을 통해 성능을 향상시킬 수 있는 개체입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: ibm.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 자동화와 에이전트 흐름 맥락에서 다루는 범위를 다시 확인했어."
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
AI Agent는 LLM이 한 번 답하고 끝나는 대신, 목표를 받고 필요한 단계들을 이어 가며 작업을 수행하는 구조를 말해.
## 어떻게 작동하나
예를 들어 "경쟁사 가격표를 찾아 비교해서 표로 정리해 줘" 같은 요청을 받으면, 에이전트는 검색을 하고, 필요한 페이지를 읽고, 계산하거나 정리한 뒤, 마지막 결과를 만들어.

핵심은 모델 자체가 갑자기 더 똑똑해지는 게 아니라 계획, 상태, 도구 호출, 반복 실행을 묶는 런타임이 추가된다는 점이야. 그래서 챗봇보다 업무 자동화, 코딩 도구, 리서치 워크플로 문맥에서 더 자주 나온다.
## 왜 중요한가
AI Agent를 이해해야 "새 에이전트 출시"가 새 모델 발표인지, 아니면 기존 모델 위에 자동화 계층을 얹은 제품인지 구분할 수 있어. 실무에선 이 차이가 도입 난도와 기대 성능 차이로 바로 이어져.
## 관련 용어
- [Agentic AI](/ko/wiki/agentic-ai/) — Agentic AI와 비교해 보면 자동화와 에이전트 흐름에서 어디가 다른지 읽기 쉬워.
- [LangChain](/ko/wiki/langchain/) — 같이 보면 자동화와 워크플로 설계를 같이 볼 때 도움이 돼.
- [LangGraph](/ko/wiki/langgraph/) — 같이 보면 자동화와 워크플로 설계를 같이 볼 때 도움이 돼.
- [n8n](/ko/wiki/n8n/) — 같이 보면 자동화와 워크플로 설계를 같이 볼 때 도움이 돼.