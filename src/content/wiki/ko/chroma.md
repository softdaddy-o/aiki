---
term: chroma
title: "Chroma"
lang: ko
summary: "Chroma는 AI를 위한 오픈 소스 데이터 인프라입니다."
readerValue: "프로토타입 단계에서 가볍게 붙일 저장소가 필요한지, 운영형 벡터 DB가 필요한지 먼저 판단하는 데 도움이 돼."
category: tool
aliases:
  - "Chroma"
relatedTerms:
  - pinecone
  - weaviate
  - qdrant
  - rag
firstMentioned: "2026-04-09"
mentionCount: 1
draft: true
tags:
  - vector-db
  - retrieval
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://github.com/chroma-core/chroma"
      title: "chroma-core/chroma"
    - url: "https://docs.trychroma.com/"
      title: "Introduction - Chroma Docs"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 AI를 위한 오픈 소스 데이터 인프라입니다."
        - "원문을 보면 AI를 위한 오픈 소스 데이터 인프라입니다."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 시작하는 데 필요한 모든 것이 내장되어 있습니다."
        - "교차 대조: 시작하는 데 필요한 모든 것이 내장되어 있습니다."
        - "출처 1 대조: github.com."
        - "출처 2 대조: docs.trychroma.com."
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
        - "벡터 DB라는 말만 보고 바로 운영형 제품 후보로 올리면, 실제론 개발 편의 도구에 더 가까운 경우를 놓치기 쉬워."
---
## 한 줄 정의
Chroma를 짧게 잡으면 AI를 위한 오픈 소스 데이터 인프라입니다 쪽이야. 임베딩 저장, 필터링, reranking, vector search 같은 retrieval pipeline에서 어느 구간을 맡는지로 읽으면 덜 헷갈려.
## 실제로 무엇을 하나
시작하는 데 필요한 모든 것이 내장되어 있습니다. 임베딩 저장, 필터링, reranking, vector search 같은 retrieval pipeline에서 어느 구간을 맡는지로 읽으면 덜 헷갈려. 예를 들어 사내 문서를 검색해 답하는 RAG 흐름에서 검색 품질이 흔들리면 답변 품질도 같이 무너져.
## 왜 중요한가
사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감돼. 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워.
## 관련 용어
- [Pinecone](/ko/wiki/pinecone/) — 프로토타입용 로컬 스토어와 완전 관리형 SaaS의 간극을 비교하게 해 준다.
- [Weaviate](/ko/wiki/weaviate/) — 가벼운 개발용 스택과 기능 많은 서버형 벡터 DB 차이를 보게 해 준다.
- [Qdrant](/ko/wiki/qdrant/) — 오픈소스 서버형으로 올라갈 필요가 있는지 판단하는 비교축이 돼.
- [RAG](/ko/wiki/rag/) — 왜 벡터 저장소를 붙이는지 상위 검색 구조를 다시 큰 흐름을 잡는 데 도움이 돼.