---
term: vector-db
title: "Vector Database"
lang: ko
summary: "Vector Database는 임베딩 벡터를 저장하고 비슷한 벡터를 빠르게 찾도록 만든 검색용 데이터베이스다."
readerValue: "RAG에서 문서를 어디에 저장하고 어떤 검색 엔진으로 꺼낼지 먼저 판단하게 해준다."
category: tool
aliases:
  - "vector database"
relatedTerms:
  - rag
  - llamaindex
  - embedding
  - pinecone
mentionCount: 0
draft: false
tags:
  - retrieval
  - search
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Vector_database"
      title: "Vector database"
    - url: "https://www.pinecone.io/learn/vector-database/"
      title: "What is a Vector Database &amp; How Does it Work? Use Cases + Examples | Pinecone"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 RAG에서 문서를 어디에 저장하고 어떤 검색 엔진으로 꺼낼지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자가 먼저 갈라 봐야 할 건 RAG에서 문서를 어디에 저장하고 어떤 검색 엔진으로 꺼낼지야."
        - "이름을 다시 보면 Vector Database로 잡혀."
        - "분류를 다시 보면 도구로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 검색 정확도보다 운영 방식과 필터링·하이브리드 검색 요구가 더 큰 선택 기준인지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "여기서 먼저 갈라 볼 기준은 검색 정확도보다 운영 방식과 필터링·하이브리드 검색 요구가 더 큰 선택 기준인지야."
        - "같이 본 출처로는 Vector database (https://en.wikipedia.org/wiki/Vector_database)"
        - "같이 본 출처로는 What is a Vector Database &amp; How Does it Work? Use Cases + Examples | Pinecone (https://www.pinecone.io/learn/vector-database/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 검색 정확도보다 운영 방식과 필터링·하이브리드 검색 요구가 더 큰 선택 기준인지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 검색 정확도보다 운영 방식과 필터링·하이브리드 검색 요구가 더 큰 선택 기준인지야."
        - "이름부터 다시 보면 Vector Database로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 RAG에서 문서를 어디에 저장하고 어떤 검색 엔진으로 꺼낼지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "헷갈리지 않으려면 검색 정확도보다 운영 방식과 필터링·하이브리드 검색 요구가 더 큰 선택 기준인지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "벡터 DB라는 큰 묶음만 보면 실제론 관리형 SaaS, 오픈소스 서버형, 로컬 임베디드형 차이를 놓치기 쉬워."
---
## 한 줄 정의
Vector Database는 텍스트나 이미지의 임베딩을 저장한 뒤, 의미적으로 가까운 항목을 유사도 검색으로 찾아주는 저장소다.
## 실제로 무엇을 하나
RAG에서 가장 흔한 역할은 "사용자 질문과 가까운 문서 조각을 빠르게 꺼내오기"다. 전통적인 SQL 데이터베이스가 정확한 키나 조건 검색에 강하다면, 벡터 데이터베이스는 의미가 비슷한 항목 찾기에 특화돼 있어.

Pinecone, Weaviate, Qdrant 같은 이름이 자주 같이 나온다. 제품마다 필터링, 하이브리드 검색, 확장성, 운영 편의성이 달라서 실무 선택지가 갈려.
## 왜 중요한가
RAG 품질은 모델만으로 결정되지 않아. 어떤 벡터 데이터베이스를 쓰고, 얼마나 빨리 정확한 문서를 찾느냐가 실제 성능을 크게 좌우해.
## 관련 용어
- [RAG](/ko/wiki/rag/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [LlamaIndex](/ko/wiki/llamaindex/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Embedding](/ko/wiki/embedding/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Pinecone](/ko/wiki/pinecone/) — 완전 관리형 벡터 DB를 고를 때 어떤 운영 부담을 넘기는지 비교하게 해 준다.