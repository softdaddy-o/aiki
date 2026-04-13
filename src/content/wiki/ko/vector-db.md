---
term: vector-db
title: "Vector Database"
lang: ko
summary: "Vector Database는 임베딩 벡터를 저장하고 비슷한 벡터를 빠르게 찾도록 만든 검색용 데이터베이스다."
readerValue: "RAG에서 문서를 어디에 저장하고 어떤 검색 엔진으로 꺼낼지 먼저 판단하는 데 도움이 돼."
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
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Vector_database"
      title: "Vector database"
    - url: "https://www.pinecone.io/learn/vector-database/"
      title: "What is a Vector Database &amp; How Does it Work? Use Cases + Examples | Pinecone"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 벡터 데이터베이스, 벡터 저장소 또는 벡터 검색 엔진은 벡터 공간에 데이터 임베딩을 저장하고 검색하는 데이터베이스입니다."
        - "원문을 보면 벡터 데이터베이스, 벡터 저장소 또는 벡터 검색 엔진은 벡터 공간에 데이터 임베딩을 저장하고 검색하는 데이터베이스입니다."
        - "별칭 대조: vector database도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 벡터 데이터베이스, 벡터 저장소 또는 벡터 검색 엔진은 벡터 공간에 데이터 임베딩을 저장하고 검색하는 데이터베이스입니다."
        - "교차 대조: 벡터 데이터베이스, 벡터 저장소 또는 벡터 검색 엔진은 벡터 공간에 데이터 임베딩을 저장하고 검색하는 데이터베이스입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: pinecone.io."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 검색과 외부 지식 연결 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 모델 자체와 같은 말로 쓰면 제품 층위와 운영 층위가 섞이기 쉬워."
        - "헷갈리기 쉬운 건 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워."
      findings:
        - "벡터 DB라는 큰 묶음만 보면 실제론 관리형 SaaS, 오픈소스 서버형, 로컬 임베디드형 차이를 놓치기 쉬워."
---
## 한 줄 정의
Vector Database는 텍스트나 이미지의 임베딩을 저장한 뒤, 의미적으로 가까운 항목을 유사도 검색 API로 찾아주는 저장소다.
## 실제로 무엇을 하나
RAG에서 가장 흔한 역할은 "사용자 질문과 가까운 문서 조각을 빠르게 꺼내오기"다. 전통적인 SQL 데이터베이스가 정확한 키나 조건 검색에 강하다면, 벡터 데이터베이스는 의미가 비슷한 항목 찾기에 특화돼 있어.

실무에선 단순 저장소라기보다 retrieval pipeline의 핵심 계층으로 쓰여. Pinecone, Weaviate, Qdrant 같은 제품마다 필터링, 하이브리드 검색, 확장성, 운영 편의성이 달라서 API 응답 품질과 운영 복잡도가 같이 갈려.
## 왜 중요한가
RAG 품질은 모델만으로 결정되지 않아. 어떤 벡터 데이터베이스를 쓰고, 얼마나 빨리 정확한 문서를 찾느냐가 실제 성능을 크게 좌우해.
## 관련 용어
- [RAG](/ko/wiki/rag/) — Vector Database는 RAG 안의 retrieval 계층이라서, 둘을 비교해 보면 상위 파이프라인과 하위 저장소 역할이 어떻게 갈리는지 바로 보여.
- [Embedding](/ko/wiki/embedding/) — 임베딩이 벡터 DB에 들어가는 재료라서, 저장소 선택과 표현 방식 차이를 같이 보면 이해가 빨라진다.
- [Pinecone](/ko/wiki/pinecone/) — 관리형 벡터 DB 제품을 볼 때 어떤 운영 부담을 넘기는지 비교하기 좋은 대표 사례다.
- [Weaviate](/ko/wiki/weaviate/) — 같은 벡터 검색 계열이라도 데이터 모델과 운영 방식 차이를 비교하기 쉬워.