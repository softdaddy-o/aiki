---
term: langgraph
title: "LangGraph(랭그래프)"
lang: ko
summary: "LangGraph는 상태를 들고 가는 AI 에이전트 워크플로를 그래프 형태로 짜게 해 주는 오케스트레이션 프레임워크야."
readerValue: "이 이름이 그냥 챗봇 라이브러리인지, 아니면 여러 단계와 상태 전이를 직접 설계하는 에이전트 런타임인지 구분하는 데 도움이 돼."
category: framework
aliases:
  - "랭그래프"
relatedTerms:
  - langchain
  - agentic-ai
  - crewai
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
    - url: "https://github.com/langchain-ai/langgraph"
      title: "langchain-ai/langgraph"
    - url: "https://www.langchain.com/langgraph"
      title: "LangGraph: Agent Orchestration Framework for Reliable AI Agents"
  checks:
    - type: source_match
      result: pass
      summary: "공식 설명인 'resilient language agents as graphs' 축에 맞춰 정의와 작동 방식을 다시 맞춰봤어."
      items:
        - "독자 문제 대조: LangGraph를 일반 챗봇 도구가 아니라 그래프 기반 에이전트 오케스트레이션 프레임워크로 읽게 정리했어."
        - "GitHub와 공식 사이트가 공통으로 말하는 그래프, 런타임, 신뢰성 문맥을 앞부분에 올렸어."
      findings:
        - "그래프와 상태 관리라는 정체성을 남겼어."
    - type: web_cross_check
      result: pass
      summary: "저장소 소개와 제품 페이지를 맞춰 보면서 운영 기능 설명을 과장하지 않게 다시 봤어."
      items:
        - "비교 기준: GitHub의 그래프 기반 설명과 제품 페이지의 agent runtime 소개를 나란히 보고 겹치는 개념만 본문에 남겼어."
        - "durable execution, human-in-the-loop 같은 기능은 입력 초안에도 있고 공식 설명 축에도 맞아서 유지했어."
      findings:
        - "고수준 추상화 도구처럼 보이게 하는 표현은 줄였어."
    - type: number_verify
      result: pass
      summary: "버전 번호나 처리량 같은 숫자는 넣지 않고, 상태와 재시도 같은 구조 설명만 남겼어."
      items:
        - "LangGraph를 이해하는 데 꼭 필요한 고정 숫자 사양이 입력 자료엔 없어서 수치형 문장은 빼놨어."
        - "숫자 대신 노드, 상태, 전이라는 핵심 구성요소를 설명하게 조정했어."
      findings:
        - "변동성 큰 숫자 정보는 남기지 않았어."
    - type: adversarial
      result: pass
      summary: "가장 큰 오해인 'LangGraph면 에이전트가 자동으로 똑똑해진다'는 기대를 누르도록 다시 봤어."
      items:
        - "LangGraph는 제어권을 주는 틀이지 결과 품질을 자동 보장하는 마법 상자가 아니라는 점을 주의점에 넣었어."
        - "또 LangChain과 완전히 같은 것으로 읽지 않게, 낮은 레벨 오케스트레이션이라는 성격을 분리해서 적었어."
      findings:
        - "프레임워크 역할과 모델 능력을 섞는 오해를 막았어."
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
formatVersion: 2
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "a52fae7a3055cdcf"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
LangGraph는 [에이전트](/ko/wiki/agent/) 작업 단계를 노드와 엣지로 나눠서 설계하게 해 주는 프레임워크야. 핵심은 답 한 번 뽑는 체인이 아니라, 중간 상태를 기억하고 다음 단계로 넘기는 실행 흐름을 직접 다루는 데 있어.
## 어떻게 작동하나
개발자는 그래프 안에 작업 노드와 상태 객체를 정의하고, 어떤 조건에서 어디로 넘어갈지 연결해 둬. 그러면 실행 중에 상태 저장, 재시도, 사람 확인, 스트리밍 같은 운영 기능을 그래프 흐름 안에서 묶어 볼 수 있어.
## 왜 중요한가
AI 에이전트가 실무로 갈수록 한 번의 프롬프트보다 실패 복구와 상태 관리가 더 중요해져. LangGraph는 그 운영 문제를 다루는 낮은 레벨의 틀이라서, 장난감 데모를 넘는 [에이전트](/ko/wiki/agent/) 설계에서 자주 거론돼.
## 주의해서 볼 점
LangGraph는 높은 수준의 자동 마법보다는 제어권을 주는 도구라서, 직접 설계할 게 많아. 그래서 작은 작업에는 무겁게 느껴질 수 있고, 상태 모델링을 대충 잡으면 오히려 복잡도만 늘어날 수 있어.
## 관련 용어
- LangChain을 같이 보면 높은 수준 추상화와 낮은 수준 오케스트레이션이 어디서 갈리는지 더 또렷하게 보여.
- Agentic AI는 넓은 개념이고, LangGraph는 그 개념을 실제 워크플로 구조로 구현하는 도구 쪽이야.
- CrewAI를 같이 보면 멀티에이전트 추상화와 상태 그래프 중심 설계가 어떤 차이를 내는지 비교해 볼 수 있어.
- Agent를 같이 보면 '에이전트'라는 넓은 말 안에서 LangGraph가 맡는 역할이 어디쯤인지 감이 잡혀.
