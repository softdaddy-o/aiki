---
term: embedding
title: "Embedding"
lang: ko
summary: "Embedding은 텍스트나 이미지를 의미를 보존한 숫자 벡터로 바꿔 검색과 추천을 가능하게 하는 표현 방식이야."
readerValue: "이 용어가 모델 성능 자체보다 검색과 외부 지식 연결을 바꾸는 이야기인지 바로 잡게 해준다."
category: concept
aliases:
  - "vector embedding"
relatedTerms:
  - rag
  - llamaindex
  - vector-db
  - pinecone
firstMentioned: "2026-02-16"
mentionCount: 12
draft: false
tags:
  - vectors
  - retrieval
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Word_embedding"
      title: "Word embedding"
    - url: "https://platform.openai.com/docs/guides/embeddings"
      title: "Vector embeddings | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Embedding"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Word embedding (https://en.wikipedia.org/wiki/Word_embedding)"
        - "Vector embeddings | OpenAI API (https://platform.openai.com/docs/guides/embeddings)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Embedding"
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
Embedding은 문장, 문서, 이미지 같은 데이터를 모델이 비교하기 쉬운 고정 길이 숫자 벡터로 바꾼 결과다.
## 어떻게 작동하나
예를 들어 "환불 정책" 문서와 "반품 규정" 문장은 표면 단어가 달라도 의미가 비슷하다. 임베딩은 이런 의미 유사성을 벡터 거리로 바꿔서, 키워드가 정확히 일치하지 않아도 관련 문서를 찾게 해 준다.

RAG, 추천 시스템, 중복 문서 탐지, 클러스터링이 전부 이 표현 방식을 기반으로 돌아간다. 그래서 임베딩 모델이 달라지면 검색 품질과 RAG 정확도도 같이 달라져.
## 왜 중요한가
LLM이 답을 잘 쓰는 것과, 관련 문서를 먼저 잘 찾는 것은 다른 문제다. Embedding을 알아야 RAG 품질이 왜 검색 단계에서 갈리는지 이해할 수 있어.
## 관련 용어
- [RAG](/ko/wiki/rag/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [LlamaIndex](/ko/wiki/llamaindex/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Vector Database](/ko/wiki/vector-db/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Pinecone](/ko/wiki/pinecone/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.