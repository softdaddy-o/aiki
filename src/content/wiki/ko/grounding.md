---
term: grounding
title: "Grounding"
lang: ko
summary: "Google 검색의 실시간 정보를 기반으로 모델의 응답을 기반으로 사실의 정확성을 높이고 인용을 제공합니다."
category: technique
aliases:
  - "retrieval grounding"
relatedTerms:
  - rag
  - llamaindex
  - embedding
  - vector-db
firstMentioned: "2026-03-23"
mentionCount: 1
draft: false
tags:
  - retrieval
  - reliability
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://ai.google.dev/gemini-api/docs/grounding"
      title: "Grounding with Google Search &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers"
    - url: "https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview"
      title: "Grounding overview &nbsp;|&nbsp; Generative AI on Vertex AI &nbsp;|&nbsp; Google Cloud Documentation"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 한 줄 정의
Grounding는 Google 검색의 실시간 정보를 기반으로 모델의 응답을 기반으로 사실의 정확성을 높이고 인용을 제공합니다라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
생성적 AI 접지를 구현합니다. 모델 출력을 검증 가능한 데이터 소스에 연결하여 RAG, Google 검색 또는 지도를 통해 환각을 줄입니다라는 설명을 함께 보면, Grounding가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Grounding는 1번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [rag](/ko/wiki/rag/)
- [llamaindex](/ko/wiki/llamaindex/)
- [embedding](/ko/wiki/embedding/)
- [vector-db](/ko/wiki/vector-db/)