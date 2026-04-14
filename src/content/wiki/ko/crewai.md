---
term: crewai
title: "CrewAI (크루에이아이)"
lang: ko
summary: "CrewAI (크루에이아이)는 여러 AI 에이전트에게 역할을 나눠 주고 협업 흐름을 묶는 오케스트레이션 프레임워크야."
readerValue: "CrewAI가 그냥 LLM 호출 래퍼가 아니라 역할 분담, 순서, 도구 권한까지 설계하는 워크플로 도구라는 걸 구분해 볼 수 있어."
category: framework
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "CrewAI (크루에이아이)"
relatedTerms:
  - langchain
  - agentic-ai
  - langgraph
  - agent
mentionCount: 0
draft: false
tags:
  - agents
  - workflow
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://github.com/crewAIInc/crewAI"
      title: "crewAIInc/crewAI"
    - url: "https://docs.crewai.com/"
      title: "CrewAI Documentation - CrewAI"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "공식 저장소와 문서가 CrewAI를 어떤 도구로 규정하는지 먼저 맞춰봤어."
      items:
        - "독자 문제 대조: CrewAI를 단순 프롬프트 템플릿이 아니라 협업형 에이전트 오케스트레이션 프레임워크로 읽는 게 맞는지 확인했어."
        - "GitHub 저장소는 role-playing, autonomous AI agents를 orchestrating하는 프레임워크라고 설명해."
        - "공식 문서는 collaborative AI agents, crews, flows를 만든다고 소개해."
        - "그래서 본문도 역할 분담과 작업 흐름 설계 도구라는 축으로 정리했어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "저장소와 문서를 나란히 보고 CrewAI의 중심이 에이전트 협업인지 다시 봤어."
      items:
        - "비교 기준: CrewAI가 일반 LLM 체인 도구인지, 멀티에이전트 협업 프레임워크인지 비교했어."
        - "두 출처 모두 agents가 함께 일하도록 만드는 orchestration을 핵심으로 둬."
        - "저장소 설명은 autonomous agents와 collaborative intelligence를 강조하고, 문서는 crews와 flows 같은 실행 단위를 더 분명히 보여 줘."
        - "그래서 본문은 역할, 순서, 도구 권한을 묶는 워크플로 프레임워크로 맞췄어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "버전별 기능 수나 가격표는 빼고, crew와 flow 같은 안정적인 개념만 남겼어."
      items:
        - "공식 페이지에서 바로 확인되는 핵심 단위는 agents, crews, flows였어."
        - "버전마다 바뀔 수 있는 세부 기능 목록이나 가격 정보는 본문에 넣지 않았어."
        - "숫자로 포장된 성숙도 대신, 실제 사용 방식이 드러나는 구조 설명만 남겼어."
    - type: adversarial
      result: pass
      sources: 2
      summary: "에이전트를 많이 붙일수록 똑똑해진다는 착각을 따로 막았어."
      items:
        - "CrewAI를 쓰면 에이전트 수만 늘려도 성능이 오른다고 생각하기 쉬운데, 실제론 역할 설계와 검증 루프가 더 중요해."
        - "또 CrewAI를 LangChain의 별칭처럼 읽으면 틀려. 겹치는 부분은 있어도 역할 중심 협업 설계에 더 초점을 둬."
      findings:
        - "멀티에이전트라는 말보다 오케스트레이션 레이어라는 점을 남겼어."
---
## 한 줄 정의
CrewAI는 여러 에이전트가 팀처럼 협업하게 만드는 프레임워크야. 한 번의 프롬프트로 끝내기보다, 조사 담당과 작성 담당처럼 역할을 나눠서 작업 흐름을 짜는 데 초점이 있어.
## 어떻게 작동하나
에이전트마다 역할, 목표, 사용할 도구를 정의하고, 그 에이전트들을 crew나 flow 같은 구조로 연결해서 순차 작업이나 분기 작업을 돌려. 실무에선 리서치 에이전트가 자료를 모으고, 정리 에이전트가 초안을 만들고, 검토 에이전트가 결과를 다시 확인하는 식으로 많이 구성해.
## 왜 중요한가
에이전트 시스템의 어려움은 모델 성능보다도 누가 어떤 순서로 어떤 도구를 쓰느냐를 설계하는 데 있어. CrewAI는 그 조율 층을 비교적 직관적으로 드러내서, 멀티에이전트 자동화를 제품 흐름으로 옮길 때 출발점으로 많이 쓰여.
## 주의해서 볼 점
에이전트를 많이 붙인다고 자동으로 결과가 좋아지진 않아. 역할 정의가 흐리거나 도구 권한이 넓으면 비용만 커지고, 디버깅도 어렵고, 실패 지점도 오히려 늘어날 수 있어.
## 관련 용어
- [LangChain](/ko/wiki/langchain/)은 LLM 앱을 조립하는 범용 프레임워크야. CrewAI는 그보다 역할 분담과 협업 흐름을 전면에 세운다는 점이 더 또렷해.
- [Agentic AI](/ko/wiki/agentic-ai/)는 스스로 계획하고 행동하는 AI 시스템이라는 큰 개념이야. CrewAI는 그 개념을 코드와 워크플로로 옮기는 도구 쪽이야.
- [LangGraph](/ko/wiki/langgraph/)는 상태 전이와 그래프 흐름을 명시적으로 다루는 프레임워크야. CrewAI는 더 역할 중심으로 접근한다는 차이를 같이 보면 좋아.
- [AI Agent](/ko/wiki/agent/)는 실제로 일을 맡아 수행하는 개별 주체를 뜻해. CrewAI는 그런 에이전트 여러 개를 팀처럼 엮는 프레임워크라고 보면 돼.