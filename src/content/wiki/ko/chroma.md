---
term: chroma
title: "Chroma"
lang: ko
summary: "검색과 외부 지식 연결 작업에 자주 쓰이는 AI 도구야. 결국 많이 갈리는 판단 포인트는 프로토타입 단계에서 가볍게 붙일 저장소가 필요한지, 운영형 벡터 DB가 필요한지이야."
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
  date: "2026-04-11"
  sources:
    - url: "https://github.com/chroma-core/chroma"
      title: "chroma-core/chroma"
    - url: "https://docs.trychroma.com/"
      title: "Introduction - Chroma Docs"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 프로토타입 단계에서 가볍게 붙일 저장소가 필요한지, 운영형 벡터 DB가 필요한지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 프로토타입 단계에서 가볍게 붙일 저장소가 필요한지, 운영형 벡터 DB가 필요한지야."
        - "이름을 다시 보면 Chroma로 잡혀."
        - "분류를 다시 보면 도구로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 임베디드·로컬 중심 도구로 충분한지 아니면 별도 서비스형 DB가 필요한지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 임베디드·로컬 중심 도구로 충분한지 아니면 별도 서비스형 DB가 필요한지야."
        - "같이 본 출처로는 chroma-core/chroma (https://github.com/chroma-core/chroma)"
        - "같이 본 출처로는 Introduction - Chroma Docs (https://docs.trychroma.com/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 임베디드·로컬 중심 도구로 충분한지 아니면 별도 서비스형 DB가 필요한지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 임베디드·로컬 중심 도구로 충분한지 아니면 별도 서비스형 DB가 필요한지야."
        - "이름부터 다시 보면 Chroma로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 프로토타입 단계에서 가볍게 붙일 저장소가 필요한지, 운영형 벡터 DB가 필요한지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 임베디드·로컬 중심 도구로 충분한지 아니면 별도 서비스형 DB가 필요한지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "벡터 DB라는 말만 보고 바로 운영형 제품 후보로 올리면, 실제론 개발 편의 도구에 더 가까운 경우를 놓치기 쉬워."
---
## 한 줄 정의
검색과 외부 지식 연결 작업에 쓰이는 AI 도구야. 쉽게 말하면 질문에 맞는 자료를 바깥에서 찾아와 붙이는 검색 레이어를 실제 제품과 워크플로로 옮긴 쪽에 가까워. 결국 이 페이지는 프로토타입 단계에서 가볍게 붙일 저장소가 필요한지, 운영형 벡터 DB가 필요한지를 판단할 때 보는 기준점이야.
## 실제로 무엇을 하나
모델 자체라기보다 검색과 외부 지식 연결 작업을 실제로 굴리는 도구 쪽에 가까워. 핵심은 질문이나 문서를 검색하기 쉬운 형태로 바꾼 뒤, 관련 자료를 찾아 모델 앞에 붙이거나 결과 순서를 다시 정렬하는 데 있어. 그래서 기능 목록보다 임베디드·로컬 중심 도구로 충분한지 아니면 별도 서비스형 DB가 필요한지가 어떻게 달라지는지로 읽는 편이 이해가 빨라.
## 왜 중요한가
사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감돼. 결국 프로토타입 단계에서 가볍게 붙일 저장소가 필요한지, 운영형 벡터 DB가 필요한지부터 못 잡으면 실제 도입 범위와 필요한 연결 작업을 잘못 보기 쉬워.
## 관련 용어
- [Pinecone](/ko/wiki/pinecone/) — 프로토타입용 로컬 스토어와 완전 관리형 SaaS의 간극을 비교하게 해 준다. - [Weaviate](/ko/wiki/weaviate/) — 가벼운 개발용 스택과 기능 많은 서버형 벡터 DB 차이를 보게 해 준다. - [Qdrant](/ko/wiki/qdrant/) — 오픈소스 서버형으로 올라갈 필요가 있는지 판단하는 비교축이 돼. - [RAG](/ko/wiki/rag/) — 왜 벡터 저장소를 붙이는지 상위 검색 구조를 다시 큰 흐름을 잡는 데 도움이 돼.