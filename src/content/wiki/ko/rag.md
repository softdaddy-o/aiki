---
term: rag
title: "RAG"
lang: ko
summary: "LLM이 답변을 생성하기 전에 외부 문서를 검색해서 참고하는 기법. 학습 데이터에 없는 최신 정보도 활용할 수 있어."
readerValue: "이 용어가 모델 성능 자체보다 검색과 외부 지식 연결을 바꾸는 이야기인지 바로 잡는 데 도움이 돼."
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
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation"
      title: "Retrieval-augmented generation"
    - url: "https://www.ibm.com/think/topics/retrieval-augmented-generation"
      title: "What is RAG (Retrieval Augmented Generation)? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 LLM(대형 언어 모델)이 외부 데이터 소스에서 새로운 정보를 검색하고 통합할 수 있도록 하는 기술입니다."
        - "원문을 보면 LLM(대형 언어 모델)이 외부 데이터 소스에서 새로운 정보를 검색하고 통합할 수 있도록 하는 기술입니다."
        - "별칭 대조: retrieval augmented generation도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 검색 증강 생성(RAG)은 인공지능(AI) 모델을 외부 지식 베이스와 연결하여 성능을 최적화하기 위한 아키텍처입니다."
        - "교차 대조: 검색 증강 생성(RAG)은 인공지능(AI) 모델을 외부 지식 베이스와 연결하여 성능을 최적화하기 위한 아키텍처입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: ibm.com."
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
        - "헷갈리기 쉬운 건 새 제품명으로 받아들이면 실제로는 기존 모델 위에 얹는 방법론이라는 점을 놓치기 쉬워."
        - "헷갈리기 쉬운 건 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
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