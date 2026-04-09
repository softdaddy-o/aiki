---
term: grounding
title: "Grounding"
lang: ko
summary: "검색과 외부 지식 연결을 개선하거나 연결하는 AI 기법이다. 보통 정확도, 비용, 실행 방식 중 하나를 바꾼다."
readerValue: "이 용어가 모델 성능 자체보다 검색과 외부 지식 연결을 바꾸는 이야기인지 바로 잡게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://ai.google.dev/gemini-api/docs/grounding"
      title: "Tìm hiểu thông tin cơ bản trên Google Tìm kiếm &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers"
    - url: "https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview"
      title: "Panoramica del grounding &nbsp;|&nbsp; Generative AI on Vertex AI &nbsp;|&nbsp; Google Cloud Documentation"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Grounding"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Tìm hiểu thông tin cơ bản trên Google Tìm kiếm &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers (https://ai.google.dev/gemini-api/docs/grounding)"
        - "Panoramica del grounding &nbsp;|&nbsp; Generative AI on Vertex AI &nbsp;|&nbsp; Google Cloud Documentation (https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
검색과 외부 지식 연결을 바꾸거나 개선할 때 쓰는 기법이다. 쉽게 말하면 질문에 맞는 자료를 바깥에서 찾아와 붙이는 검색 레이어 역할을 한다고 보면 된다.
## 어떻게 작동하나
핵심은 질문이나 문서를 검색하기 쉬운 형태로 바꾼 뒤, 관련 자료를 찾아 모델 앞에 붙이거나 결과 순서를 다시 정렬하는 데 있다. 그래서 이런 기법은 "무슨 모델이냐"보다 입력, 검색, 학습, 실행 흐름 중 어디에 개입하는지로 이해하는 편이 쉽다.
## 왜 중요한가
사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감된다. 같은 모델도 어떤 기법을 붙이느냐에 따라 정확도, 비용, 지연이 크게 달라진다.
## 관련 용어
- [RAG](/ko/wiki/rag/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [LlamaIndex](/ko/wiki/llamaindex/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Embedding](/ko/wiki/embedding/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Vector Database](/ko/wiki/vector-db/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.