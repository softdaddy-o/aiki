---
term: vector-db
title: Vector Database (벡터 데이터베이스)
lang: ko
summary: >-
  Vector Database는 문장, 이미지, 코드 같은 데이터를 임베딩 벡터로 저장하고, 입력과 의미상 가까운 항목을 빠르게 찾아주는 검색
  중심 저장소야. RAG에서는 문서 조각을 넣어 두고 질문과 관련 있는 내용을 꺼내 오는 핵심 계층으로 많이 쓰여.
readerValue: RAG에서 문서를 어디에 저장하고 어떤 방식으로 꺼낼지 판단할 때 벡터 DB가 정확히 어떤 역할을 하는지 바로 잡을 수 있어.
category: tool
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - vector database
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
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Vector_database'
      title: Vector database
    - url: 'https://www.pinecone.io/learn/vector-database/'
      title: >-
        What is a Vector Database &amp; How Does it Work? Use Cases + Examples |
        Pinecone
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 정의와 사용처를 제공된 출처 핵심에 맞춰 정리했어.
      items:
        - '독자 문제 대조: RAG에서 문서를 어디에 두고 어떻게 꺼내는지 판단하게 하려는 초점에 맞춰 검색 계층 역할을 앞에 뒀어.'
        - 임베딩 저장과 유사도 검색이라는 공통 핵심을 첫 정의에 그대로 반영했어.
      findings:
        - 단순 DB 설명에 그치지 않고 RAG와 의미 검색 사용처를 실전 맥락으로 연결했어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 위키형 설명과 학습 문서가 겹치는 공통 개념만 남겼어.
      items:
        - '비교 기준: 하나는 일반 개념 정의이고 다른 하나는 구현과 사용 사례 설명이라는 점을 놓고 공통 의미를 뽑았어.'
        - 두 출처 모두 벡터 공간에서 유사한 항목을 찾는 검색 저장소라는 점은 같았어.
      findings:
        - 특정 제품 우열 비교는 넣지 않고 일반 원리 수준만 남겼어.
    - type: number_verify
      result: pass
      sources: 2
      summary: 고정 성능 수치나 용량 숫자는 임의로 넣지 않았어.
      items:
        - 검색 정확도나 지연시간 수치는 환경에 따라 달라져서 본문에 넣지 않았어.
        - RAG 품질을 숫자로 단정하지 않고 어떤 요소가 좌우하는지만 설명했어.
      findings:
        - 임베딩 차원 수 같은 세부 값도 일반 정의에는 끌어오지 않았어.
    - type: adversarial
      result: pass
      sources: 2
      summary: 벡터 DB에 대한 흔한 과장을 먼저 막았어.
      items:
        - 벡터 DB를 쓰면 검색 품질이 자동으로 좋아진다고 읽히지 않게 했어.
        - 정확한 문자열 검색까지 전부 대체할 수 있다는 식의 오해를 막았어.
      findings:
        - 벡터 DB를 넣었는데도 검색 품질이 안 오르면 저장소보다 임베딩과 문서 분할 설계를 먼저 다시 봐야 해.
---
## 한 줄 정의
Vector Database는 텍스트, 이미지, 코드 같은 데이터를 임베딩 벡터로 저장하고 질의와 가까운 항목을 유사도 기준으로 찾아주는 데이터베이스야. 정확히 같은 값보다 뜻이 비슷한 대상을 찾는 데 강해서 의미 검색 계층에서 많이 쓰여.
## 어떻게 작동하나
먼저 원본 문서나 이미지 같은 데이터를 임베딩 모델로 숫자 벡터로 바꿔 저장해. 사용자가 질문을 보내면 그 질문도 같은 방식으로 벡터로 만든 뒤 저장된 벡터 가운데 가장 가까운 후보를 찾아 결과로 돌려줘. 실제 시스템은 여기에 메타데이터 필터, 키워드 검색, 재정렬 같은 단계를 더 붙이기도 해.
## 왜 중요한가
RAG에서는 모델이 답을 잘 만드는 능력만큼 먼저 맞는 문서를 꺼내 오는 능력이 중요해. Vector Database는 그 검색 단계를 맡기 때문에 여기서 엇나가면 뒤의 생성 단계도 근거가 약해지기 쉬워. 또 문서 양이 커지고 질의가 다양해질수록 단순 문자열 검색만으로는 놓치는 내용을 의미 기준으로 다시 잡아낼 수 있어.
## 주의해서 볼 점
Vector Database를 쓴다고 검색 품질이 자동으로 좋아지지는 않아. 어떤 임베딩 모델을 골랐는지, 문서를 얼마나 잘게 나눴는지, 검색 뒤에 재정렬을 붙였는지에 따라 결과가 크게 달라져. 또 제품 코드나 숫자처럼 정확한 문자열 일치가 중요한 검색은 벡터 검색만으로 부족할 수 있어서 다른 검색 방식과 섞는 경우가 많아.
## 관련 용어
- [RAG](/ko/wiki/rag/): RAG는 검색과 생성이 이어진 전체 파이프라인이야. Vector Database는 그 안에서 검색용 저장소와 유사도 조회 엔진 역할을 맡아.
- [LlamaIndex](/ko/wiki/llamaindex/): LlamaIndex는 문서를 나누고 인덱싱 흐름을 연결하는 프레임워크야. Vector Database가 데이터를 담고 찾는 엔진이라면 LlamaIndex는 그 엔진을 포함한 검색 파이프라인을 조립하는 쪽에 더 가까워.
- [Embedding (임베딩)](/ko/wiki/embedding/): Embedding은 Vector Database에 들어가는 표현 형식이야. 저장소가 같아도 임베딩이 바뀌면 무엇을 가깝다고 보는지가 달라져서 검색 결과도 달라져.
- [Pinecone (파인콘)](/ko/wiki/pinecone/): Pinecone은 Vector Database를 서비스 형태로 제공하는 대표적인 제품 중 하나야. 개념 자체와 특정 관리형 서비스를 구분해서 봐야 도구 선택이 덜 헷갈려.
