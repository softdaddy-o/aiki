---
term: n8n
title: n8n(엔에잇엔)
lang: ko
summary: 'n8n은 앱, API, AI 단계를 노드로 엮어 반복 업무를 자동화하는 워크플로 도구야.'
readerValue: 'n8n이 나오면 단순 자동화 앱인지, 팀 운영 흐름까지 묶는 오케스트레이션 축인지 빨리 가르는 데 도움 돼.'
category: tool
aliases:
  - n8n(엔에잇엔)
relatedTerms:
  - agent
  - langchain
  - agentic-ai
  - langgraph
mentionCount: 0
draft: false
tags:
  - automation
  - workflow
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/N8n'
      title: N8n
    - url: 'https://docs.n8n.io/'
      title: >-
        Explore n8n Docs: Your Resource for Workflow Automation and Integrations
        | n8n Docs
  checks:
    - type: source_match
      result: pass
      summary: 위키 요약과 공식 문서가 n8n을 자동화 워크플로 도구로 설명하는지 맞춰봤어.
      items:
        - '독자 문제 대조: n8n이 새 AI 모델 이름이 아니라 노드 기반 자동화 도구인지 먼저 확인했어.'
        - 위키 성격 소개와 공식 문서 요약이 모두 앱 통합과 워크플로 자동화 축에 맞춰져 있는지 같이 봤어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 위키 성격 설명과 공식 문서 설명이 같은 축을 쓰는지 다시 봤어.
      items:
        - '비교 기준: n8n을 단순 노코드 앱으로 볼지, 코드 확장까지 되는 워크플로 플랫폼으로 볼지 나눠서 비교했어.'
        - >-
          한쪽은 low-code workflow automation 쪽을 말하고 다른 쪽은 integrations와 automation
          문서를 강조해서, 본문을 연결 플랫폼 쪽으로 잡아도 무리가 없는지 확인했어.
    - type: number_verify
      result: skip
      summary: 과하게 못 박을 숫자는 빼고 운영 경로처럼 안정적인 정보만 남겼어.
      items:
        - 가격표나 성능 수치는 제공된 소스 요약에 없어서 본문에 넣지 않았어.
        - '대신 공식 문서에 드러난 클라우드, npm, Docker, self-host 같은 배포 경로만 남겼어.'
    - type: adversarial
      result: pass
      summary: n8n을 만능 앱 플랫폼처럼 읽는 오해를 막았어.
      items:
        - 워크플로를 잘 묶는 도구라는 점과 복잡한 애플리케이션 로직을 전부 대신하는 플랫폼이라는 점을 분리했어.
        - self-host를 고르면 편의성만이 아니라 보안과 운영 책임도 같이 따라온다는 쪽으로 균형을 맞췄어.
      findings:
        - 자동화 도구 소개를 제품 전체 백엔드 대체 이야기로 키우면 기대치가 과해지기 쉬워.
        - AI 기능을 붙일 수 있다는 말만 보고 n8n 자체를 모델로 읽는 오해도 생기기 쉬워.
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
  contentHash: "a1b9e0b924a9ffe2"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
n8n은 앱과 API를 노드로 이어 자동화 흐름을 만드는 워크플로 도구야. 드래그 앤 드롭으로 시작할 수 있지만 필요하면 코드와 커스텀 노드까지 섞을 수 있어서 가벼운 노코드 툴보다 범위가 넓어.
## 어떻게 작동하나
트리거 노드가 시작점을 만들고, 그 뒤에 데이터 변환, 조건 분기, API 호출, 메시지 전송 같은 노드를 이어 붙여 흐름을 짜. 공식 문서 기준으로 클라우드로 바로 쓰거나 npm, Docker, self-host 방식으로 운영할 수 있어서 팀 상황에 맞춰 배포 경로를 고를 수 있어.
## 왜 중요한가
작은 팀은 CRM, 메신저, 데이터베이스, 내부 API, AI 호출을 각각 붙일 때 백엔드 공수를 많이 써. n8n은 그 연결 작업을 화면 단위 워크플로로 끌어올려서 반복 업무를 제품처럼 굴리게 해 준다는 점에서 의미가 커.
## 주의해서 볼 점
n8n이 흐름을 잘 묶는다고 해서 복잡한 도메인 로직이나 장기 상태 관리까지 전부 대신해 주는 건 아니야. 특히 self-host를 고르면 비밀값 관리, 실패 재시도, 커뮤니티 노드 신뢰성, 권한 설계 같은 운영 책임이 그대로 따라와.
## 관련 용어
- [agent](/ko/wiki/agent/): agent는 스스로 판단하고 행동하는 단위를 말해. n8n은 그런 agent를 포함해 여러 시스템을 연결하는 배선판 쪽에 더 가까워.
- [langchain](/ko/wiki/langchain/): LangChain은 코드 중심으로 AI 흐름을 짜는 프레임워크야. n8n은 시각적 워크플로와 외부 서비스 연결 경험이 더 앞에 나와.
- [agentic-ai](/ko/wiki/agentic-ai/): agentic AI는 더 넓은 개념이야. n8n은 그 개념을 실제 업무 자동화 파이프라인 안에 넣는 도구로 보면 이해가 쉬워.
- [langgraph](/ko/wiki/langgraph/): LangGraph가 상태와 분기 제어를 더 세밀하게 다룬다면 n8n은 SaaS와 API를 빠르게 묶는 데 강점이 커.
