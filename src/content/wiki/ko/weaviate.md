---
term: weaviate
title: "Weaviate"
lang: ko
summary: "AI 애플리케이션용 오픈 소스 벡터 데이터베이스인 Weaviate에 대한 전체 문서입니다."
readerValue: "벡터 검색에 필터링, 모듈 연결, 스키마 설계까지 한 번에 묶고 싶은지 먼저 판단하는 데 도움이 돼."
category: tool
aliases:
  - "Weaviate"
relatedTerms:
  - pinecone
  - chroma
  - qdrant
  - rag
mentionCount: 0
draft: false
tags:
  - vector-db
  - retrieval
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Weaviate"
      title: "Weaviate"
    - url: "https://docs.weaviate.io/"
      title: "Weaviate Database | Weaviate Documentation"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 AI 애플리케이션용 오픈 소스 벡터 데이터베이스인 Weaviate에 대한 전체 문서입니다."
        - "원문을 보면 AI 애플리케이션용 오픈 소스 벡터 데이터베이스인 Weaviate에 대한 전체 문서입니다."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "교차 대조: 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: docs.weaviate.io."
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
        - "벡터 DB라는 이름만 같다고 같은 급의 제품으로 보면, 모듈 구조와 데이터 모델링 난도를 과소평가하기 쉬워."
---
## 한 줄 정의
Weaviate를 짧게 잡으면 AI 애플리케이션용 오픈 소스 벡터 데이터베이스인 Weaviate에 대한 전체 문서입니다 쪽이야. 임베딩 저장, 필터링, reranking, vector search 같은 retrieval pipeline에서 어느 구간을 맡는지로 읽으면 덜 헷갈려.
## 실제로 무엇을 하나
임베딩 저장, 필터링, reranking, vector search 같은 retrieval pipeline에서 어느 구간을 맡는지로 읽으면 덜 헷갈려. 예를 들어 사내 문서를 검색해 답하는 RAG 흐름에서 검색 품질이 흔들리면 답변 품질도 같이 무너져. 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워.
## 왜 중요한가
사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감돼. 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워.
## 관련 용어
- [Pinecone](/ko/wiki/pinecone/) — 완전 관리형 서비스와 오픈소스 서버형 중 어디에 무게를 둘지 비교하게 해 준다.
- [Chroma](/ko/wiki/chroma/) — 앱 안에 가볍게 넣는 저장소가 아니라 서비스용 데이터 모델을 다루는 쪽인지 구분하는 데 도움이 돼.
- [Qdrant](/ko/wiki/qdrant/) — 오픈소스 기반끼리 비교할 때 API 감각과 기능 구성 차이를 보게 해 준다.
- [RAG](/ko/wiki/rag/) — 검색 파이프라인 안에서 벡터 DB를 어떻게 설계하는지 상위 맥락을 같이 큰 흐름을 잡는 데 도움이 돼.