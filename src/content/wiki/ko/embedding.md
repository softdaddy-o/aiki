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
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Word_embedding"
      title: "Word embedding"
    - url: "https://platform.openai.com/docs/guides/embeddings"
      title: "Vector embeddings | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 단어 임베딩은 어휘의 단어나 구문이 실수 벡터에 매핑되는 언어 모델링 및 기능 학습 기술을 사용하여 얻을 수 있습니다."
        - "원문을 보면 단어 임베딩은 어휘의 단어나 구문이 실수 벡터에 매핑되는 언어 모델링 및 기능 학습 기술을 사용하여 얻을 수 있습니다."
        - "별칭 대조: vector embedding도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 단어 임베딩은 어휘의 단어나 구문이 실수 벡터에 매핑되는 언어 모델링 및 기능 학습 기술을 사용하여 얻을 수 있습니다."
        - "교차 대조: 단어 임베딩은 어휘의 단어나 구문이 실수 벡터에 매핑되는 언어 모델링 및 기능 학습 기술을 사용하여 얻을 수 있습니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: platform.openai.com."
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
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "임베딩 품질 문제를 LLM 답변 문제로 착각하면 검색 단계 병목을 놓치기 쉬워."
---
## 한 줄 정의
Embedding은 문장, 문서, 이미지 같은 데이터를 모델이 비교하기 쉬운 고정 길이 숫자 벡터로 바꾼 결과다.
## 어떻게 작동하나
예를 들어 "환불 정책" 문서와 "반품 규정" 문장은 표면 단어가 달라도 의미가 비슷하다. 임베딩은 이런 의미 유사성을 벡터 거리로 바꿔서, 키워드가 정확히 일치하지 않아도 관련 문서를 찾게 해 준다.

RAG, 추천 시스템, 중복 문서 탐지, 클러스터링이 전부 이 표현 방식을 기반으로 돌아간다. 그래서 임베딩 모델이 달라지면 검색 품질과 RAG 정확도도 같이 달라져.
## 왜 중요한가
LLM이 답을 잘 쓰는 것과, 관련 문서를 먼저 잘 찾는 것은 다른 문제다. Embedding을 알아야 RAG 품질이 왜 검색 단계에서 갈리는지 이해할 수 있어.
## 관련 용어
- [RAG](/ko/wiki/rag/) — 검색 단계가 약하면 RAG 답변도 같이 흔들린다는 점을 같이 보게 해 준다.
- [LlamaIndex](/ko/wiki/llamaindex/) — 임베딩을 실제 인덱싱과 검색 흐름에 어떻게 붙이는지 이해하는 데 이어져.
- [Vector Database](/ko/wiki/vector-db/) — 벡터를 어디에 저장하고 어떤 필터·검색 전략으로 꺼낼지까지 같이 보게 해 준다.
- [Pinecone](/ko/wiki/pinecone/) — 임베딩 품질이 아니라 운영형 벡터 스토어 선택으로 문제가 넘어가는 지점을 구분하는 데 도움이 돼.