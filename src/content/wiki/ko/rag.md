---
term: rag
title: "RAG (검색 증강 생성)"
lang: ko
summary: "RAG는 모델이 답을 만들기 전에 외부 문서부터 찾아보고, 그 내용을 바탕으로 답하게 만드는 방식이야. 모델을 다시 학습시키지 않고도 최신 정보나 사내 문서를 붙일 수 있어."
readerValue: "RAG를 모델 성능 향상 마법처럼 읽지 않고, 검색과 문서 연결 구조로 보면 기사에서 무엇이 바뀌는지 훨씬 분명하게 보이게 돼."
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
      summary: "RAG를 외부 정보를 검색해서 생성 단계에 붙이는 기법으로 설명해도 기본 정의와 맞는지 먼저 맞춰봤어."
      items:
        - "독자 문제 대조: RAG를 새 모델 이름으로 읽기 쉬운데, 실제로는 검색을 앞단에 붙이는 방식이라는 점부터 갈라 봐야 해."
        - "핵심은 모델이 외부 데이터 소스에서 정보를 가져와 답변에 반영한다는 점이야."
        - "그래서 본문에서 RAG를 새 모델이 아니라 기존 모델 위에 얹는 방식으로 푼 건 맞아."
        - "retrieval augmented generation이라는 풀네임도 같은 개념을 가리켜."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "두 출처를 같이 보고 RAG를 학습 기법과 혼동하지 않았는지 다시 봤어."
      items:
        - "비교 기준: RAG를 모델 자체의 변화로 읽을지, 검색 계층을 붙이는 구조 변화로 읽을지부터 갈라 봐야 해."
        - "즉 RAG는 파인튜닝보다 검색 계층에 더 가까운 접근이야."
        - "그래서 본문도 '문서를 먼저 찾고 그걸 넣어서 답한다'는 순서로 풀었어."
        - "이 순서가 초심자한테 가장 덜 헷갈려."
    - type: number_verify
      result: pass
      summary: "숫자보다 파이프라인 구조가 중요한 항목이라, 단계 구성이 맞는지 쪽으로 다시 봤어."
      items:
        - "검색 단계, 관련 문맥 주입, 생성 단계라는 큰 흐름은 RAG 설명의 공통 뼈대야."
        - "여기서 임베딩과 벡터 검색은 흔한 구현 방식이지 정의 자체는 아니야."
        - "그래서 본문은 구현 세부보다 개념 순서를 먼저 설명하도록 맞췄어."
    - type: adversarial
      result: pass
      summary: "처음 읽는 사람이 흔히 하는 오해를 따로 떼서 다시 봤어."
      items:
        - "RAG는 새 모델 이름이 아니라, 모델 앞단에 검색을 붙이는 방식이야."
        - "RAG를 붙였다고 항상 정확해지는 건 아니고, 검색된 문서 품질이 낮으면 답도 흔들려."
        - "그래서 'RAG 적용'이라는 말은 모델 교체보다 데이터 연결 방식을 바꿨다는 뜻일 때가 많아."
      findings:
        - "RAG의 핵심은 더 똑똑한 모델이 아니라, 답하기 전에 바깥 지식을 가져오는 흐름에 있어."
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "72591f3046f7bba2"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의

RAG는 모델이 답을 만들기 전에 관련 문서를 먼저 찾아보고, 그 문서를 참고해서 답하게 만드는 방법이야. 쉽게 말해 모델 머릿속 지식만 믿지 말고, 필요한 자료를 옆에 펼쳐 놓고 답하게 만드는 방식이라고 보면 돼.

그래서 RAG는 모델을 새로 학습시키는 기술이 아니야. 기존 LLM 위에 검색 단계를 붙여서, 최신 정보나 회사 내부 문서를 쓸 수 있게 하는 쪽에 더 가깝다.

## 어떻게 작동하나

보통 흐름은 이래. 사용자가 질문하면 시스템이 먼저 관련 문서를 검색하고, 그중 중요한 부분만 뽑아서 모델 입력에 같이 넣고, 그다음 모델이 답을 생성해. 검색과 생성이 한 파이프라인으로 이어지는 셈이야.

예를 들어 사내 정책 문서를 바탕으로 답하는 챗봇, 최신 제품 카탈로그를 참고하는 상담 봇, 논문이나 위키를 찾아 인용하는 검색형 서비스에서 RAG가 많이 쓰여. 이런 경우 모델 자체를 자주 다시 학습시키는 것보다 문서를 최신으로 유지하는 편이 훨씬 현실적이거든.

## 왜 중요한가

RAG를 이해하면 "모델이 똑똑해졌다"는 말과 "문서 연결이 좋아졌다"는 말을 구분할 수 있어. 둘은 결과가 비슷해 보여도 실제로 개선한 층위가 전혀 달라.

실무에서는 특히 최신성, 사내 데이터 연결, 근거 제시 때문에 중요해. 모델만으로는 모르는 문서도 검색으로 끌어와 답할 수 있으니까, 기업용 AI에서 거의 기본 구조처럼 쓰이는 경우가 많아.

## 주의해서 볼 점

RAG의 품질은 모델만큼 검색 품질에도 크게 좌우돼. 문서를 잘못 찾거나, 너무 긴 문맥을 넣거나, 엉뚱한 조각을 가져오면 답변도 흔들려.

또 "RAG를 붙였다"는 말이 정확도를 보장하는 건 아니야. 실제로는 [임베딩](/ko/wiki/embedding/) 품질, 문서 분할 방식, 벡터 DB 설정, 재정렬 여부 같은 구현 디테일이 결과를 많이 바꿔.

## 관련 용어

- [LlamaIndex](/ko/wiki/llamaindex/) 는 RAG 파이프라인을 구성할 때 자주 나오는 도구야.
- [Embedding](/ko/wiki/embedding/) 은 문서를 검색 가능한 벡터로 바꾸는 단계와 연결돼.
- [Vector DB](/ko/wiki/vector-db/) 는 검색용 벡터를 저장하고 찾는 저장소 쪽 개념이야.
- [Pinecone](/ko/wiki/pinecone/) 는 벡터 DB 제품 문맥에서 자주 같이 언급돼.
