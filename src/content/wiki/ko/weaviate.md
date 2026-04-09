---
term: weaviate
title: "Weaviate"
lang: ko
summary: "검색과 외부 지식 연결 작업에 자주 쓰이는 AI 도구야. 결국 많이 갈리는 판단 포인트는 벡터 검색에 필터링, 모듈 연결, 스키마 설계까지 한 번에 묶고 싶은지이야."
readerValue: "벡터 검색에 필터링, 모듈 연결, 스키마 설계까지 한 번에 묶고 싶은지 먼저 판단하게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Weaviate"
      title: "Weaviate"
    - url: "https://docs.weaviate.io/"
      title: "Weaviate Database | Weaviate Documentation"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 벡터 검색에 필터링, 모듈 연결, 스키마 설계까지 한 번에 묶고 싶은지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: 벡터 검색에 필터링, 모듈 연결, 스키마 설계까지 한 번에 묶고 싶은지"
        - "용어명 대조: Weaviate"
        - "분류 대조: 도구"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 검색 엔진 하나보다 데이터 모델과 확장 모듈까지 같이 고를 필요가 있는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "비교 기준: 검색 엔진 하나보다 데이터 모델과 확장 모듈까지 같이 고를 필요가 있는지"
        - "Weaviate (https://en.wikipedia.org/wiki/Weaviate)"
        - "Weaviate Database | Weaviate Documentation (https://docs.weaviate.io/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 검색 엔진 하나보다 데이터 모델과 확장 모듈까지 같이 고를 필요가 있는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "선택 기준 대조: 검색 엔진 하나보다 데이터 모델과 확장 모듈까지 같이 고를 필요가 있는지"
        - "명칭 대조: Weaviate"
        - "고정 스펙이 적은 항목이라 숫자 대신 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 벡터 검색에 필터링, 모듈 연결, 스키마 설계까지 한 번에 묶고 싶은지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "오해 방지 기준: 검색 엔진 하나보다 데이터 모델과 확장 모듈까지 같이 고를 필요가 있는지"
        - "정의와 역할보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈다."
      findings:
        - "벡터 DB라는 이름만 같다고 같은 급의 제품으로 보면, 모듈 구조와 데이터 모델링 난도를 과소평가하기 쉬워."
---
## 한 줄 정의
검색과 외부 지식 연결 작업에 쓰이는 AI 도구야. 쉽게 말하면 질문에 맞는 자료를 바깥에서 찾아와 붙이는 검색 레이어를 실제 제품과 워크플로로 옮긴 쪽에 가까워. 결국 이 페이지는 벡터 검색에 필터링, 모듈 연결, 스키마 설계까지 한 번에 묶고 싶은지를 판단할 때 보는 기준점이야.
## 실제로 무엇을 하나
모델 자체라기보다 검색과 외부 지식 연결 작업을 실제로 굴리는 도구 쪽에 가까워. 핵심은 질문이나 문서를 검색하기 쉬운 형태로 바꾼 뒤, 관련 자료를 찾아 모델 앞에 붙이거나 결과 순서를 다시 정렬하는 데 있어. 그래서 기능 목록보다 검색 엔진 하나보다 데이터 모델과 확장 모듈까지 같이 고를 필요가 있는지가 어떻게 달라지는지로 읽는 편이 이해가 빨라.
## 왜 중요한가
사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감돼. 결국 벡터 검색에 필터링, 모듈 연결, 스키마 설계까지 한 번에 묶고 싶은지부터 못 잡으면 실제 도입 범위와 필요한 연결 작업을 잘못 보기 쉬워.
## 관련 용어
- [Pinecone](/ko/wiki/pinecone/) — 완전 관리형 서비스와 오픈소스 서버형 중 어디에 무게를 둘지 비교하게 해 준다.
- [Chroma](/ko/wiki/chroma/) — 앱 안에 가볍게 넣는 저장소가 아니라 서비스용 데이터 모델을 다루는 쪽인지 구분하게 해 준다.
- [Qdrant](/ko/wiki/qdrant/) — 오픈소스 기반끼리 비교할 때 API 감각과 기능 구성 차이를 보게 해 준다.
- [RAG](/ko/wiki/rag/) — 검색 파이프라인 안에서 벡터 DB를 어떻게 설계하는지 상위 맥락을 같이 잡게 해 준다.