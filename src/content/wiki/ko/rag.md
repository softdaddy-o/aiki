---
term: rag
title: "RAG"
lang: ko
summary: "RAG(검색 증강 생성)는 LLM(대형 언어 모델)이 외부 데이터 소스에서 새로운 정보를 검색하고 통합할 수 있도록 하는 기술입니다."
category: technique
aliases:
  - "retrieval augmented generation"
relatedTerms:
  - llamaindex
  - embedding
  - vector-db
  - pinecone
firstMentioned: "2026-02-16"
mentionCount: 14
draft: false
tags:
  - retrieval
  - generation
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation"
      title: "Retrieval-augmented generation"
    - url: "https://www.ibm.com/think/topics/retrieval-augmented-generation"
      title: "What is RAG (Retrieval Augmented Generation)? | IBM"
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
RAG는 RAG(검색 증강 생성)는 LLM(대형 언어 모델)이 외부 데이터 소스에서 새로운 정보를 검색하고 통합할 수 있도록 하는 기술입니다. RAG를 사용하면 LLM은 먼저 지정된 문서 세트를 참조한 다음 사용자 쿼리에 응답합니다. 이 문서는 LLM의 기존 교육 데이터 정보를 보완합니다. 이를 통해 LLM은 교육 데이터에서 사용할 수 없는 도메인별 및/또는 업데이트된 정보를 사용할 수 있습니다. 예를 들어, 이는 LLM 기반 챗봇이 내부 회사 데이터에 액세스하거나 신뢰할 수 있는 소스를 기반으…
## 어떻게 작동하나
검색 증강 생성(RAG)은 인공지능(AI) 모델을 외부 지식 베이스와 연결하여 성능을 최적화하기 위한 아키텍처입니다라는 설명을 함께 보면, RAG가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 RAG는 14번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [llamaindex](/ko/wiki/llamaindex/)
- [embedding](/ko/wiki/embedding/)
- [vector-db](/ko/wiki/vector-db/)
- [pinecone](/ko/wiki/pinecone/)