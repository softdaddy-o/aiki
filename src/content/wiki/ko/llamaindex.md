---
term: llamaindex
title: "LlamaIndex (라마인덱스)"
lang: ko
summary: "LlamaIndex는 LLM이 외부 문서와 데이터를 찾아 쓰게 연결하는 프레임워크야. 모델 자체를 만드는 도구라기보다 RAG, 검색, 문서 에이전트 흐름을 조립하는 층에 가까워."
readerValue: "이 이름이 나오면 모델 성능 이야기보다 문서 파싱, 인덱싱, 검색, 에이전트 워크플로를 어떻게 붙였는지 보는 데 도움 돼."
category: framework
aliases:
  - "LlamaIndex (라마인덱스)"
relatedTerms:
  - langchain
  - rag
  - tool-use
  - embedding
mentionCount: 0
draft: false
tags:
  - retrieval
  - agents
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://github.com/run-llama/llama_index"
      title: "run-llama/llama_index"
    - url: "https://www.llamaindex.ai/"
      title: "LlamaIndex | AI Agents for Document OCR + Workflows"
  checks:
    - type: source_match
      result: pass
      sources: 1
      summary: "LlamaIndex를 데이터 연결 프레임워크로 설명했는지 GitHub README와 맞춰봤어."
      items:
        - "독자 문제 대조: 모델 성능보다 검색과 외부 지식 연결 이야기라는 점이 바로 보이게 첫 문단을 잡았어."
        - "소스 대조: README의 data framework, ingest, retrieval, query interface 설명을 한국어 개념어로 풀었어."
      findings:
        - "모델 학습 도구처럼 읽히는 표현을 덜고 연결층 설명으로 고쳤어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 사이트의 문서 OCR·에이전트 메시지와 OSS 설명이 충돌하지 않게 다시 봤어."
      items:
        - "비교 기준: 공식 사이트는 문서 OCR과 워크플로 제품군을, GitHub는 OSS 프레임워크를 강조하는지 나눠서 봤어."
        - "교차 확인: 본문은 프레임워크 중심으로 쓰고, 제품 홍보 성격이 강한 LlamaParse 세부 문구는 최소화했어."
      findings:
        - "오픈소스 프레임워크와 별도 플랫폼 메시지가 섞이지 않게 역할을 분리했어."
    - type: number_verify
      result: pass
      summary: "통합 패키지 수나 무료 크레딧처럼 자주 바뀌는 숫자는 본문에서 줄였어."
      items:
        - "정량 점검: GitHub의 통합 패키지 수와 사이트의 무료 크레딧 수치는 빨리 바뀔 수 있어서 안 넣었어."
        - "오류 방지: 대신 인덱싱, 검색, 에이전트 연결처럼 구조적 설명만 남겼어."
      findings:
        - "숫자 갱신 부담 없이 오래 읽힐 문안으로 맞췄어."
    - type: adversarial
      result: pass
      summary: "LlamaIndex를 곧바로 OCR 제품이나 모델 자체로 오해할 표현은 막았어."
      items:
        - "오해 점검: 프레임워크와 LlamaParse 플랫폼을 같은 것으로 단정하지 않게 분리했어."
        - "표현 점검: 새 모델을 학습시키는 도구라는 인상을 주는 문장은 빼고 검색 연결 역할을 강조했어."
      findings:
        - "개념 경계가 흐려지지 않게 도구의 위치를 먼저 설명했어."
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
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
  contentHash: "993d52d0f6d15970"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
LlamaIndex는 문서, 데이터베이스, API 같은 바깥 지식을 LLM에 연결하는 프레임워크야. 새 모델을 학습시키는 도구라기보다 이미 있는 모델이 필요한 정보를 더 잘 찾아오게 만드는 연결층이라고 보면 돼.
## 어떻게 작동하나
보통은 문서를 읽어 조각내고, 인덱스와 메타데이터를 붙여서 나중에 찾기 쉽게 준비해 둬. 사용자가 질문하면 관련 조각을 꺼내 모델 프롬프트에 붙이거나, 쿼리 엔진과 [에이전트](/ko/wiki/agent/) 흐름에 연결해서 답을 만들게 해.
## 왜 중요한가
실무의 많은 문제는 모델이 더 똑똑하냐보다 회사 문서와 업무 데이터를 제대로 찾느냐에 달려 있어. LlamaIndex는 바로 그 검색 연결부를 다루기 때문에 RAG 시스템, 문서 QA, 도구 호출형 에이전트를 만들 때 자주 기준 도구로 언급돼.
## 주의해서 볼 점
프레임워크를 쓴다고 검색 품질이 자동으로 좋아지지는 않아. 문서를 어떻게 쪼개는지, 어떤 메타데이터를 붙이는지, 벡터 검색과 재정렬을 어떻게 섞는지에 따라 결과 차이가 크게 나.
## 관련 용어
- `langchain`은 앱 전체 오케스트레이션을 넓게 다루는 프레임워크라서 LlamaIndex와 자주 비교돼.
- `rag`는 검색 결과를 생성 단계에 붙이는 방식 자체를 말하고, LlamaIndex는 그 방식을 실제 시스템으로 구현할 때 자주 쓰여.
- `tool-use`는 모델이 바깥 도구를 부르는 흐름을 뜻하고, LlamaIndex는 검색기나 쿼리 엔진을 그런 도구로 엮을 때 많이 등장해.
- `embedding`은 문서 조각을 벡터로 바꿔 비슷한 내용을 찾게 하는 기반이라서 LlamaIndex의 검색 설계를 이해할 때 같이 봐야 해.
