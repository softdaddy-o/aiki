---
term: agent
title: "AI Agent"
lang: ko
summary: "AI Agent는 모델이 계획을 세우고 도구를 호출하며 여러 단계를 이어서 일을 처리하게 만든 실행 구조야."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Intelligent_agent"
      title: "Intelligent agent"
    - url: "https://www.ibm.com/think/topics/ai-agents"
      title: "What Are AI Agents? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: AI Agent"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Intelligent agent (https://en.wikipedia.org/wiki/Intelligent_agent)"
        - "What Are AI Agents? | IBM (https://www.ibm.com/think/topics/ai-agents)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: AI Agent"
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
AI Agent는 LLM이 한 번 답하고 끝나는 대신, 목표를 받고 필요한 단계들을 이어 가며 작업을 수행하는 구조를 말해.
## 어떻게 작동하나
예를 들어 "경쟁사 가격표를 찾아 비교해서 표로 정리해 줘" 같은 요청을 받으면, 에이전트는 검색을 하고, 필요한 페이지를 읽고, 계산하거나 정리한 뒤, 마지막 결과를 만들어.

핵심은 모델 자체가 갑자기 더 똑똑해지는 게 아니라 계획, 상태, 도구 호출, 반복 실행을 묶는 런타임이 추가된다는 점이야. 그래서 챗봇보다 업무 자동화, 코딩 도구, 리서치 워크플로 문맥에서 더 자주 나온다.
## 왜 중요한가
AI Agent를 이해해야 "새 에이전트 출시"가 새 모델 발표인지, 아니면 기존 모델 위에 자동화 계층을 얹은 제품인지 구분할 수 있어. 실무에서는 이 차이가 도입 난도와 기대 성능 차이로 바로 이어진다.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 돼.
- [LangGraph](/ko/wiki/langgraph/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 돼.
- [n8n](/ko/wiki/n8n/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 돼.
- [Vibe Coding](/ko/wiki/vibe-coding/) — 개발 생산성과 도구 조합 맥락을 같이 봐.