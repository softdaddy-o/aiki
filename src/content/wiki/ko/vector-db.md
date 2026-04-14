---
term: vector-db
title: "Vector Database (벡터 데이터베이스)"
lang: ko
summary: "Vector Database는 문장, 이미지, 코드 같은 데이터를 임베딩 벡터로 저장하고, 입력과 의미상 가까운 항목을 빠르게 찾아주는 검색 중심 저장소야. RAG에서는 문서 조각을 넣어 두고 질문과 관련 있는 내용을 꺼내 오는 핵심 계층으로 많이 쓰여."
readerValue: "RAG를 설계할 때 문서를 어디에 저장하고 어떤 검색 엔진으로 꺼낼지 판단하려면, Vector Database가 맡는 역할과 한계를 먼저 알아야 해. 이 항목은 벡터 저장소가 필요한 상황, 일반 DB 확장으로도 충분한 상황, 그리고 검색 품질이 어디서 갈리는지 구분하는 데 도움을 줘."
category: tool
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "vector-db"
  - "vector database"
  - "벡터 데이터베이스"
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
  - RAG
  - embedding
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
      summary: "주어진 출처 요약의 핵심 범위 안에서 개념, 작동 방식, 대표 활용처만 정리했어."
      items:
        - "독자 문제 대조: RAG에서 문서를 어디에 저장하고 어떤 검색 계층으로 꺼낼지 판단하려는 요구에 맞춰 저장 대상, 검색 방식, 선택 기준을 설명했어."
        - "위키 요약에 있던 similarity search, semantic search, RAG 용도를 반영했지만 시장 해석이나 홍보성 표현은 덜어냈어."
        - "전통적 DB와의 차이는 정확 일치 중심과 의미 유사도 중심의 차이로만 제한해서 설명했어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "두 출처를 대조했을 때 벡터 저장, 유사도 검색, ANN 계열 검색, RAG 활용이라는 공통 골격은 일치해."
      items:
        - "비교 기준: 저장 대상이 임베딩인지, 검색 기준이 의미 유사도인지, 실제 활용처에 RAG가 포함되는지를 서로 맞춰 봤어."
        - "Wikipedia 요약은 개념과 대표 활용처를 넓게 다루고, Pinecone 요약은 데이터베이스 기능과 벡터 인덱스의 결합이라는 제품 관점을 보태고 있어."
        - "본문에는 두 출처가 겹치는 최소 공통 내용만 채택해서 특정 벤더 관점으로 기울지 않게 정리했어."
    - type: number_verify
      result: pass
      summary: "본문에 수치나 통계 주장을 넣지 않아서 별도 수치 검증이 필요한 항목은 없었어."
      items:
        - "ANN, 하이브리드 검색, 재정렬 같은 표현은 방식 설명이라 수량 검증 대상이 아니야."
        - "응답 속도나 비용 차이에 대해서도 숫자를 제시하지 않고 선택 변수로만 다뤘어."
        - "제품 수나 시장 점유율처럼 변동 가능한 수치는 의도적으로 제외했어."
    - type: adversarial
      result: pass
      summary: "벡터 검색을 만능처럼 읽히지 않게 반례와 한계를 같이 넣어서 과장을 막았어."
      items:
        - "전용 벡터 DB가 항상 필요한 것처럼 쓰지 않고, 기존 DB 확장으로 충분한 경우를 따로 적었어."
        - "정확 일치가 중요한 식별자·숫자 검색에는 벡터 검색만으로 부족할 수 있다는 조건을 분명히 했어."
        - "품질이 저장소 하나로 결정되지 않고 임베딩, 청킹, 재정렬에 크게 좌우된다는 점을 명시했어."
      findings:
        - "'의미가 비슷하다'는 표현이 넓게 들릴 수 있어서, 정확 일치 검색과의 경계 조건을 본문에 같이 넣었어."
        - "'데이터베이스'라는 이름 때문에 범용 DB처럼 오해할 수 있어 검색 중심 저장소라는 성격을 앞쪽에 강조했어."
---
## 한 줄 정의
Vector Database는 텍스트, 이미지, 코드 같은 데이터를 임베딩 벡터로 저장하고, 질의와 가까운 항목을 유사도 기준으로 찾아주는 데이터베이스야. 정확히 같은 값보다 뜻이 비슷한 대상을 찾는 데 초점이 있어서, 의미 검색이 필요한 검색 계층에서 많이 쓰여.
## 어떻게 작동하나
먼저 원본 문서나 이미지 같은 데이터를 임베딩 모델로 숫자 벡터로 바꿔 저장해. 사용자가 질문을 보내면 그 질문도 같은 방식으로 벡터로 만든 뒤, 저장된 벡터 가운데 가장 가까운 후보를 찾아 결과로 돌려줘.
실제 시스템은 모든 항목을 정밀 비교하기보다 가까운 후보를 빠르게 좁히는 검색 인덱스를 사용해 속도를 확보해. 여기에 메타데이터 필터, 키워드 검색과의 결합, 재정렬 같은 단계를 붙여서 서비스에 맞는 검색 결과를 만든다.
## 왜 중요한가
RAG에서는 모델이 답을 만드는 능력만큼, 먼저 맞는 문서를 꺼내 오는 능력이 중요해. Vector Database는 이 검색 단계를 담당하므로, 여기서 엇나가면 뒤의 생성 단계도 근거가 빈약해지기 쉬워.
또 문서 양이 커지고 질의가 다양해질수록 단순 문자열 검색만으로는 필요한 내용을 놓치기 쉬워. 의미가 비슷한 내용을 기준으로 후보를 뽑아 줄 수 있어서, FAQ 검색, 내부 문서 검색, 추천, 멀티모달 검색 같은 작업의 기반이 된다.
## 주의해서 볼 점
Vector Database를 쓴다고 검색 품질이 자동으로 좋아지지는 않아. 어떤 임베딩 모델을 골랐는지, 문서를 얼마나 잘게 나눴는지, 검색 뒤에 재정렬을 붙였는지에 따라 결과가 크게 달라져.
정확한 문자열 일치가 중요한 제품 코드, 숫자, 식별자 검색에는 벡터 검색만으로 부족할 수 있어. 데이터 규모가 크지 않거나 운영 복잡도를 줄여야 한다면, 전용 벡터 DB 대신 기존 데이터베이스의 벡터 확장 기능으로도 충분한 경우가 있다.
## 관련 용어
- [RAG](/ko/wiki/rag/)는 검색과 생성이 이어진 전체 파이프라인이고, Vector Database는 그 안에서 검색용 저장소와 유사도 조회 엔진 역할을 맡아. RAG 품질 문제를 볼 때는 저장소 문제인지, 재정렬이나 프롬프트 문제인지 분리해서 봐야 해.
- [LlamaIndex](/ko/wiki/llamaindex/)는 문서를 나누고 인덱싱 흐름을 연결하는 프레임워크야. Vector Database가 데이터를 담고 찾는 엔진이라면, LlamaIndex는 그 엔진을 포함한 검색 파이프라인을 조립하는 쪽에 가깝다.
- [Embedding](/ko/wiki/embedding/)은 Vector Database에 들어가는 표현 형식이야. 저장소가 같아도 임베딩이 바뀌면 무엇을 가깝다고 보는지가 달라져서 검색 결과도 달라진다.
- [Pinecone](/ko/wiki/pinecone/)은 Vector Database를 제품 형태로 제공하는 서비스야. 개념 자체와 특정 관리형 제품을 구분해야 도구 선택과 아키텍처 판단이 섞이지 않아.