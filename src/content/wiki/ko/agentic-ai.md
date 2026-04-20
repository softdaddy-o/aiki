---
term: agentic-ai
title: Agentic AI(에이전틱 AI)
lang: ko
summary: >-
  Agentic AI는 목표를 주면 중간 단계를 스스로 정하고 필요한 행동을 이어 가려는 AI 방식을 말해. 한 번 답만 내는 모델보다 계획,
  판단, 실행 흐름이 더 강조되는 개념이야.
readerValue: >-
  이 말을 보면 그냥 멋있는 마케팅 표현인지, 아니면 여러 단계를 스스로 처리하는 시스템 얘기인지 빨리 구분할 수 있어. 기사나 제품 소개에서
  자동화 범위를 어디까지 주장하는지도 같이 읽게 돼.
category: concept
guideVersion:
  common: 1.0.0
  wiki: 3.0.0
aliases:
  - agentic ai
relatedTerms:
  - agent
  - langchain
  - langgraph
  - crewai
firstMentioned: '2026-02-25'
mentionCount: 3
draft: true
tags:
  - agents
  - autonomy
  - workflow
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://www.ibm.com/think/topics/agentic-ai'
      title: What is Agentic AI? | IBM
    - url: >-
        https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/what-is-agentic-ai/
      title: >-
        https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/what-is-agentic-ai/
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: '공식 설명이 말하는 핵심이 목표 달성과 제한된 감독, 그리고 에이전트 기반 실행인지 다시 맞춰봤어.'
      items:
        - >-
          독자 문제 대조: 이 페이지는 Agentic AI를 여러 단계를 스스로 이어 가려는 AI 방식으로 설명했고, 처음 듣는 독자가
          챗봇과 무엇이 다른지 구분하게 만들었어.
        - IBM 설명과 맞춰 보면 특정 목표를 제한된 감독 아래 수행하는 시스템이라는 중심 의미를 유지하고 있어.
        - Microsoft 설명과 맞춰 봐도 에이전트가 작업을 진행하고 의사결정 흐름을 이어 간다는 큰 틀은 어긋나지 않아.
        - 문서 전체에서 개념 페이지라는 층위를 유지했고 특정 제품 이름으로 좁혀 쓰지 않았어.
      findings:
        - 정의는 제품명이 아니라 실행 방식 설명에 맞춰 두는 게 맞아.
        - '실무 예시는 개념 이해를 돕는 범위로만 넣고, 특정 벤더 기능처럼 단정하지 않았어.'
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 두 출처를 나란히 보면 둘 다 목표 지향성과 에이전트식 실행을 핵심으로 잡고 있어서 설명 방향이 맞아.
      items:
        - '비교 기준: Agentic AI를 단순 챗봇이 아니라 목표를 향해 여러 행동을 이어 가는 시스템으로 보느냐를 기준으로 잡았어.'
        - IBM은 제한된 감독 아래 목표를 수행하는 시스템이라는 점을 강조해.
        - Microsoft는 에이전트가 작업을 진행하며 의사결정 흐름을 이어 가는 쪽을 강조해.
        - 두 설명을 합치면 이 페이지의 서술처럼 계획과 실행 흐름이 핵심이라는 결론이 자연스러워.
      findings:
        - 출처마다 표현은 달라도 핵심은 자동화된 다단계 행동 쪽으로 모여.
        - 시장 용어로 부풀려진 부분은 있어도 기본 정의 자체는 크게 충돌하지 않았어.
    - type: number_verify
      result: pass
      summary: '이 페이지는 숫자보다 개념 구분이 중요해서, 수치 대신 용어 범위와 실무 예시가 과장되지 않았는지 점검했어.'
      items:
        - '버전, 가격, 성능 수치 같은 가변 정보는 넣지 않았어.'
        - 실무 예시는 이메일 처리나 티켓 분류처럼 일반적인 자동화 흐름으로 제한했어.
        - 특정 회사의 제품 기능이나 출시 시점처럼 변할 수 있는 숫자성 정보는 서술에서 뺐어.
      findings:
        - 수치 검증이 필요한 문장이 거의 없어서 시간에 덜 민감한 설명으로 구성했어.
        - 숫자를 안 넣은 대신 개념 경계가 흐려지지 않게 챗봇과의 차이를 분명히 했어.
    - type: adversarial
      result: pass
      summary: 가장 흔한 오해인 자동화면 다 Agentic AI라고 부르는 식의 확장을 일부러 경계했어.
      items:
        - 규칙 기반 자동화에 모델 한 번 붙인 것만으로 Agentic AI라고 단정하면 범위가 너무 넓어져.
        - 에이전트라는 단어가 들어가도 실제로는 다음 행동을 스스로 고르지 못하는 경우가 있어.
        - '그래서 계획, 상태 추적, 실패 복구 같은 요소가 있는지 따로 보라는 경고를 본문에 넣었어.'
      findings:
        - 이 용어는 기술 설명이면서 동시에 마케팅 문구로도 자주 쓰여.
        - 독자는 자율성 수준과 운영 책임 범위를 같이 봐야 덜 속아.
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.0.0
    tone-editor: 1.0.0
    structure-editor: 1.0.0
  panelVerdict: pass
  reviewedAt: '2026-04-17'
---
## 한 줄 정의
Agentic AI는 목표를 주면 AI가 다음 행동을 고르고 여러 단계를 이어서 처리하려는 접근을 뜻해. 쉽게 말하면 질문 하나에 답하는 모델보다, 일의 흐름 전체를 맡기려는 방향에 가까워.
## 어떻게 작동하나
보통은 목표를 받은 뒤 현재 상태를 읽고, 다음에 뭘 해야 할지 고르고, 필요하면 도구나 다른 모델을 써서 결과를 다시 평가하는 식으로 움직여. 그래서 검색, 분류, 요약, 외부 시스템 업데이트 같은 단계를 한 번에 묶어서 처리하는 자동화 시나리오와 자주 붙어 다녀.
## 왜 중요한가
이 개념이 중요한 이유는 AI를 챗봇 한 칸에서 끝내지 않고 실제 업무 흐름 안으로 밀어 넣으려는 시도와 바로 연결되기 때문이야. 이메일 처리, 티켓 분류, 리서치 보조처럼 여러 단계를 거치는 일에서는 한 번의 답변 품질보다 다음 행동을 안정적으로 고르는 능력이 더 중요해져.
## 주의해서 볼 점
Agentic AI라는 말이 붙었다고 다 자율성이 높은 건 아니야. 어떤 제품은 규칙 기반 자동화에 모델을 조금 얹어 놓고도 같은 표현을 쓰니까, 실제로는 얼마나 스스로 계획하고 실패를 복구하는지 따로 봐야 해.
## 관련 용어
- [AI Agent](/ko/wiki/agent/)는 실제로 행동 단위를 수행하는 주체를 가리키는 말이라서, Agentic AI보다 더 좁은 층위로 읽으면 돼.
- [LangChain](/ko/wiki/langchain/)은 이런 흐름을 코드로 엮을 때 자주 등장하는 도구 묶음이라서 구현 쪽 맥락을 이해할 때 도움이 돼.
- [LangGraph](/ko/wiki/langgraph/)는 상태와 분기 흐름을 더 뚜렷하게 다루는 편이라서 여러 단계 실행 구조를 볼 때 같이 보면 좋아.
- [CrewAI](/ko/wiki/crewai/)는 여러 에이전트 역할 분담 쪽에 초점을 둔 편이라서, Agentic AI를 팀형 실행 모델로 확장해서 볼 때 연결점이 생겨.
