---
term: weaviate
title: "Weaviate(위비에이트)"
lang: ko
summary: "Weaviate(위비에이트)는 벡터와 원본 데이터를 함께 저장하면서 의미 검색을 해 주는 오픈소스 벡터 데이터베이스야. RAG나 추천, 검색 보강처럼 retrieval 품질이 중요한 앱에서 검색 계층 자체를 설계할 때 많이 거론돼."
readerValue: "Weaviate가 보이면 단순 저장소가 아니라 벡터 검색, 필터링, 스키마를 같이 다루는 retrieval 인프라 이야기로 읽으면 돼."
category: tool
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "Weaviate(위비에이트)"
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
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Weaviate"
      title: "Weaviate"
    - url: "https://docs.weaviate.io/"
      title: "Weaviate Database | Weaviate Documentation"
  checks:
    - type: source_match
      result: pass
      summary: "정의를 공식 문서 기준으로 맞춰봤어."
      items:
        - "독자 문제 대조: Weaviate를 오픈소스 벡터 데이터베이스이자 AI 앱용 retrieval 계층으로 설명했는지 확인했어."
        - "공식 문서에 맞춰 벡터 검색과 객체 데이터 관리가 함께 간다는 점을 남겼어."
      findings:
        - "오픈소스 벡터 DB"
        - "retrieval 중심 설명"
    - type: web_cross_check
      result: pass
      summary: "출처 둘이 겹치는 핵심만 남겼어."
      items:
        - "비교 기준: 공식 문서와 위키 요약이 둘 다 Weaviate를 벡터 검색용 데이터베이스로 보는지 맞춰봤어."
        - "출처마다 표현은 달라도 AI 애플리케이션용 검색 기반이라는 공통분모만 유지했어."
      findings:
        - "벡터 검색 용도 일치"
        - "과장된 범용성 제거"
    - type: number_verify
      result: pass
      summary: "불확실한 성능 수치는 넣지 않게 막았어."
      items:
        - "처리량, 지연시간, 버전별 기능 같은 변동 수치는 본문에서 빼서 오해를 줄였어."
        - "대신 검색 구조와 사용 맥락처럼 비교적 안정적인 설명만 남겼어."
      findings:
        - "변동 성능 수치 미사용"
    - type: adversarial
      result: pass
      summary: "벡터 DB만 붙이면 검색이 해결된다는 오해를 막았어."
      items:
        - "많이 하는 오해는 Weaviate가 임베딩 품질과 청크 전략까지 자동으로 해결해 준다고 보는 거야."
        - "본문에 스키마와 메타데이터 품질을 따로 챙겨야 한다는 경계 조건을 넣어 뒀어."
      findings:
        - "임베딩 품질 중요"
        - "자동 해결 아님"
---
## 한 줄 정의
Weaviate는 데이터 객체와 그 객체의 벡터 표현을 같이 저장하고 검색하는 벡터 데이터베이스야. 키워드 검색을 조금 보강한 정도가 아니라 의미 검색과 필터링을 함께 다루는 검색 엔진 층이라고 보면 돼.
## 어떻게 작동하나
문서나 상품, 사용자 기록을 넣을 때 메타데이터와 임베딩을 함께 인덱싱해 두고 질의가 오면 유사도 검색과 필터를 조합해서 후보를 좁혀. 이렇게 뽑힌 결과를 RAG 파이프라인이나 추천 시스템에 넘기면 모델이 바깥 지식을 더 안정적으로 끌어다 쓸 수 있어.
## 왜 중요한가
요즘 AI 앱 품질은 모델 자체보다 retrieval 품질에서 크게 갈리는 경우가 많아. Weaviate 같은 도구를 이해하면 검색 레이어를 어떻게 설계하느냐가 답변 품질과 운영 복잡도를 얼마나 바꾸는지 한 번에 읽을 수 있어.
## 주의해서 볼 점
Weaviate를 붙인다고 검색 품질이 자동으로 좋아지진 않아. 임베딩 모델 선택, 청크 분할, 스키마, 메타데이터 품질이 별로면 결과도 흔들리고 작은 프로젝트라면 더 단순한 저장소가 오히려 맞을 수도 있어.
## 관련 용어
- [pinecone](/ko/wiki/pinecone/)은 관리형 벡터 DB 쪽 감각이 더 강해. 직접 운영할지 서비스형으로 갈지 비교할 때 같이 보면 좋아.
- [chroma](/ko/wiki/chroma/)는 더 가볍게 붙여 보는 개발 경험에 가까워. 프로토타입 단계와 운영 단계 차이를 볼 때 대비가 잘 돼.
- [qdrant](/ko/wiki/qdrant/)는 비슷한 층위의 벡터 검색 엔진이라 API와 필터링, 운영 감각 차이를 비교하기 좋아.
- [rag](/ko/wiki/rag/)는 Weaviate 같은 저장 계층이 실제 응답 흐름 어디에 들어가는지 보여 줘. retrieval과 생성 모델을 한 줄로 연결해서 이해하는 데 도움이 돼.