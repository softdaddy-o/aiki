---
term: embedding
title: "Embedding"
lang: ko
summary: "Embedding은 텍스트나 이미지를 의미를 보존한 숫자 벡터로 바꿔 검색과 추천을 가능하게 하는 표현 방식이야."
readerValue: "검색 품질이 모델 답변보다 먼저 갈리고 있는지 먼저 판단하는 데 도움이 돼."
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
  date: "2026-04-11"
  sources:
    - url: "https://en.wikipedia.org/wiki/Word_embedding"
      title: "Word embedding"
    - url: "https://platform.openai.com/docs/guides/embeddings"
      title: "Vector embeddings | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 검색 품질이 모델 답변보다 먼저 갈리고 있는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 검색 품질이 모델 답변보다 먼저 갈리고 있는지야."
        - "이름을 다시 보면 Embedding로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 임베딩 모델 품질, 벡터 저장 방식, 검색 파이프라인 중 어디가 병목인지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 임베딩 모델 품질, 벡터 저장 방식, 검색 파이프라인 중 어디가 병목인지야."
        - "같이 본 출처로는 Word embedding (https://en.wikipedia.org/wiki/Word_embedding)"
        - "같이 본 출처로는 Vector embeddings | OpenAI API (https://platform.openai.com/docs/guides/embeddings)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 임베딩 모델 품질, 벡터 저장 방식, 검색 파이프라인 중 어디가 병목인지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 임베딩 모델 품질, 벡터 저장 방식, 검색 파이프라인 중 어디가 병목인지야."
        - "이름부터 다시 보면 Embedding로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 검색 품질이 모델 답변보다 먼저 갈리고 있는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 임베딩 모델 품질, 벡터 저장 방식, 검색 파이프라인 중 어디가 병목인지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "임베딩 품질 문제를 LLM 답변 문제로 착각하면 검색 단계 병목을 놓치기 쉬워."
---
## 한 줄 정의
Embedding은 문장, 문서, 이미지 같은 데이터를 모델이 비교하기 쉬운 고정 길이 숫자 벡터로 바꾼 결과다.
## 어떻게 작동하나
예를 들어 "환불 정책" 문서와 "반품 규정" 문장은 표면 단어가 달라도 의미가 비슷하다. 임베딩은 이런 의미 유사성을 벡터 거리로 바꿔서, 키워드가 정확히 일치하지 않아도 관련 문서를 찾게 해 준다. RAG, 추천 시스템, 중복 문서 탐지, 클러스터링이 전부 이 표현 방식을 기반으로 돌아간다. 그래서 임베딩 모델이 달라지면 검색 품질과 RAG 정확도도 같이 달라져.
## 왜 중요한가
LLM이 답을 잘 쓰는 것과, 관련 문서를 먼저 잘 찾는 것은 다른 문제다. Embedding을 알아야 RAG 품질이 왜 검색 단계에서 갈리는지 이해할 수 있어.
## 관련 용어
- [RAG](/ko/wiki/rag/) — 검색 단계가 약하면 RAG 답변도 같이 흔들린다는 점을 같이 보게 해 준다. - [LlamaIndex](/ko/wiki/llamaindex/) — 임베딩을 실제 인덱싱과 검색 흐름에 어떻게 붙이는지 이해하는 데 이어져. - [Vector Database](/ko/wiki/vector-db/) — 벡터를 어디에 저장하고 어떤 필터·검색 전략으로 꺼낼지까지 같이 보게 해 준다. - [Pinecone](/ko/wiki/pinecone/) — 임베딩 품질이 아니라 운영형 벡터 스토어 선택으로 문제가 넘어가는 지점을 구분하는 데 도움이 돼.