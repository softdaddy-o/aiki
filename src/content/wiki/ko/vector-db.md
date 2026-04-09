---
term: vector-db
title: "Vector Database"
lang: ko
summary: "Vector Database는 임베딩 벡터를 저장하고 비슷한 벡터를 빠르게 찾도록 만든 검색용 데이터베이스다."
readerValue: "이 용어가 모델 성능 자체보다 검색과 외부 지식 연결을 바꾸는 이야기인지 바로 잡게 해준다."
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
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Vector Database"
        - "분류 대조: 도구"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Vector database (https://en.wikipedia.org/wiki/Vector_database)"
        - "What is a Vector Database &amp; How Does it Work? Use Cases + Examples | Pinecone (https://www.pinecone.io/learn/vector-database/)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Vector Database"
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
- [Pinecone](/ko/wiki/pinecone/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.