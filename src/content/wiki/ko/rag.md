---
term: rag
title: "RAG"
lang: ko
summary: "LLM이 답변을 생성하기 전에 외부 문서를 검색해서 참고하는 기법. 학습 데이터에 없는 최신 정보도 활용할 수 있게 해준다."
readerValue: "이 용어가 모델 성능 자체보다 검색과 외부 지식 연결을 바꾸는 이야기인지 바로 잡게 해준다."
category: technique
aliases:
  - "retrieval augmented generation"
relatedTerms:
  - llamaindex
  - embedding
  - vector-db
  - pinecone
firstMentioned: "2026-02-16"
mentionCount: 12
draft: false
tags:
  - retrieval
  - generation
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation"
      title: "Retrieval-augmented generation"
    - url: "https://www.ibm.com/think/topics/retrieval-augmented-generation"
      title: "What is RAG (Retrieval Augmented Generation)? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: RAG"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Retrieval-augmented generation (https://en.wikipedia.org/wiki/Retrieval-augmented_generation)"
        - "What is RAG (Retrieval Augmented Generation)? | IBM (https://www.ibm.com/think/topics/retrieval-augmented-generation)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: RAG"
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
RAG(Retrieval-Augmented Generation)는 LLM이 답변하기 전에 외부 데이터베이스에서 관련 문서를 먼저 찾아보는 기법이야.
## 어떻게 작동하나
RAG는 크게 두 단계로 동작해.

1. **검색(Retrieval)**: 사용자 질문을 벡터로 변환한 뒤, 벡터 데이터베이스에서 의미적으로 가까운 문서 조각들을 가져온다.
2. **생성(Generation)**: 가져온 문서 조각들을 프롬프트에 붙여서 LLM에 넘긴다. LLM은 이 문맥을 참고해서 답변을 만들어.

핵심은 LLM이 자기 파라미터에 저장된 지식만 쓰는 게 아니라, 실시간으로 외부 정보를 참조한다는 점이야. 회사 내부 문서, 최신 뉴스, 기술 문서 같은 걸 LLM 재학습 없이 활용할 수 있어.
## 왜 중요한가
LLM의 큰 약점은 학습 이후의 최신 정보를 모른다는 것과 없는 내용을 그럴듯하게 지어낼 수 있다는 점이야. RAG는 이 두 문제를 동시에 줄여 줘.

파인튜닝과 비교하면 비용도 훨씬 적게 든다. 모델을 다시 학습시키는 대신 검색 대상 문서만 업데이트하면 되기 때문이야. 그래서 기업용 챗봇, 사내 지식 검색, 고객지원 자동화 같은 곳에서 사실상 기본 패턴이 됐다.

다만 검색 품질이 나쁘면 답변 품질도 같이 떨어진다. 임베딩 모델, 청킹 전략, 리랭킹 같은 세부 설계가 실제 성능을 좌우해.
## 관련 용어
- [LLM](/ko/wiki/llm/) — RAG가 생성 단계에서 사용하는 기반 모델
- [Embedding](/ko/wiki/embedding/) — 문서와 질문을 벡터로 변환하는 과정
- [Vector Database](/ko/wiki/vector-db/) — 임베딩된 문서를 저장하고 유사도 검색을 수행하는 저장소