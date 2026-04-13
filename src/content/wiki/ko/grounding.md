---
term: grounding
title: "Grounding"
lang: ko
summary: "Grounding은 모델 답변을 외부의 검증 가능한 정보원에 붙여 주는 기법이야. 단순히 검색을 붙이는 것보다 넓은 개념이고, 모델을 더 학습시키는 대신 실행 시점에 근거를 연결한다는 점이 관건이야."
readerValue: "모델이 원래 더 똑똑한 경우와, 실행 시점에 외부 근거를 붙이는 경우를 구분해야 하는지 먼저 판단하는 데 도움이 돼."
category: technique
aliases:
  - "retrieval grounding"
relatedTerms:
  - rag
  - llamaindex
  - embedding
  - vector-db
firstMentioned: "2026-03-23"
mentionCount: 1
draft: false
tags:
  - retrieval
  - reliability
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview"
      title: "建立依据概览 &nbsp;|&nbsp; Generative AI on Vertex AI &nbsp;|&nbsp; Google Cloud Documentation"
    - url: "https://ai.google.dev/gemini-api/docs/google-search"
      title: "Grounding with Google Search &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers"
  checks:
    - type: source_match
      result: pass
      summary: "grounding을 모델 학습이 아니라 외부 근거 연결 기법으로 읽는 게 맞는지부터 먼저 맞춰봤어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 모델이 원래 더 똑똑한 경우와, 실행 시점에 외부 근거를 붙여 답변을 안정시키는 경우를 먼저 나눠 봐야 해."
        - "원문을 보면 Vertex AI 문서는 grounding을 모델 출력을 검증 가능한 소스와 연결하는 방식으로 설명해."
        - "정체성을 보면 fine-tuning이나 pretraining이 아니라 inference 시점의 연결 기법이라는 해석과 맞는다."
        - "분류를 잡을 때는 technique로 두고, 본문에서는 search 자체보다 evidence attachment 계층이라는 점을 먼저 잡았다."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "Vertex와 Gemini 문서를 같이 놓고 grounding을 단순 검색 기능으로 축소하지 않았는지 다시 봤어."
      items:
        - "여기서 먼저 갈라 볼 기준은 검색 API, RAG, grounding 가운데 어떤 것이 근거 연결 전체를 설명하는지 봐야 해."
        - "공식 자료를 같이 보면 Vertex 문서는 Google Search, Vertex AI Search, RAG Engine, Maps, 외부 파트너 검색까지 여러 grounding 경로를 포괄해."
        - "공식 자료를 같이 보면 Gemini 문서는 grounding 결과와 함께 citation, web search query, grounding metadata를 반환하는 흐름을 설명해."
        - "그래서 grounding은 검색 붙이기보다 넓고, RAG는 그 안의 한 구현 패턴으로 보는 편이 정확해."
    - type: number_verify
      result: pass
      summary: "문서에 직접 나오는 필드 이름과 단계 정보도 한 번 더 봤어."
      items:
        - "필드 검증: Gemini 문서는 groundingMetadata, groundingChunks, groundingSupports, webSearchQueries 같은 응답 필드를 예시로 보여 준다."
        - "범위를 다시 보면 Vertex overview는 여러 grounding source 유형을 한 umbrella 개념 아래에서 다룬다."
        - "이름부터 다시 보면 grounding은 retrieval 자체와 동의어가 아니라, 답변을 근거와 묶는 더 넓은 용어다."
    - type: adversarial
      result: pass
      summary: "grounding을 설명할 때 자주 생기는 축소 해석을 어떻게 걸러야 하는지 의심해보고 정리했어."
      items:
        - "헷갈리기 쉬운 건 grounding은 RAG의 다른 이름이 아니다."
        - "헷갈리기 쉬운 건 grounding을 붙였다고 답변이 항상 사실이 되는 것은 아니고, 어떤 소스를 붙이느냐가 여전히 중요해."
        - "헷갈리기 쉬운 건 더 좋은 모델을 쓰는 문제와, 외부 근거를 답변에 연결하는 문제는 층위가 다르다."
      findings:
        - "grounding의 핵심은 모델 성능을 마법처럼 끌어올리는 데 있지 않고, 답변을 어떤 근거 체계에 묶을지 설계하는 데 있어."
---
## 한 줄 정의
Grounding은 모델 답변을 외부의 검증 가능한 정보원에 연결해, 답변에 근거를 붙이는 기법이야.
## 어떻게 작동하나
Grounding을 이해할 때 가장 먼저 버려야 할 오해는 "모델이 더 똑똑해지는 기술"이라는 생각이야. grounding은 학습 단계가 아니라 실행 단계에서 작동하거든. 질문이 들어오면 웹 검색, 사내 검색, 지도 데이터, 문서 저장소 같은 외부 소스를 조회하고, 그 결과를 모델 답변과 연결해.

그래서 grounding의 핵심은 검색 자체보다 근거 연결 방식에 있어. 검색 결과를 그냥 참고만 하는 것이 아니라, 어떤 소스를 바탕으로 답했는지 citation과 metadata를 함께 남길 수 있어야 하거든. Gemini와 Vertex 문서가 grounding metadata를 따로 강조하는 이유도 여기에 있어.
## 왜 중요한가
Grounding이 중요한 이유는 많은 AI 제품의 문제를 "모델 성능 부족"으로만 오해하기 쉽기 때문이야. 실제로는 모델이 모르는 최신 정보, 조직 내부 정보, 특정 도메인 데이터가 필요한 경우가 훨씬 많아. 이때 필요한 것은 더 큰 모델이 아니라, 외부 근거를 안전하게 붙이는 설계일 수 있어.

또 grounding은 제품 판단에도 영향을 줘. 같은 검색을 붙여도 citation이 필요한지, 웹 기반 최신성이 중요한지, 사내 문서 중심인지에 따라 구현 방식이 달라져. 그래서 grounding을 이해하면 RAG, 검색 API, 벡터 DB를 어디에 써야 할지 구분이 쉬워진다.
## 관련 용어
- [RAG](/ko/wiki/rag/) — grounding의 대표 구현 패턴 중 하나라서 같이 보되, grounding 전체를 RAG로 축소하면 범위를 잘못 잡게 돼.
- [LlamaIndex](/ko/wiki/llamaindex/) — grounding을 실제 문서 연결 흐름으로 구현할 때 자주 등장하는 프레임워크라서, 추상 개념이 코드로 내려오는 방식을 보기 좋아.
- [Embedding](/ko/wiki/embedding/) — grounding에서 검색 후보를 고르는 단계와 자주 연결되므로, retrieval 품질이 어디서 갈리는지 이해할 때 필요해.
- [Vector Database](/ko/wiki/vector-db/) — grounding이 문서 검색 계층과 만나는 대표 지점이라서, 외부 근거를 어떤 저장소에서 꺼내는지 이해하는 데 도움이 돼.