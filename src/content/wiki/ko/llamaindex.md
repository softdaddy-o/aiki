---
term: llamaindex
title: "LlamaIndex"
lang: ko
summary: "LlamaIndex는 여러 구성 요소를 연결하고 조립하는 프레임워크야. 완제품보다 구조와 실행 흐름을 어떻게 묶는지 읽는 이름에 가까워."
readerValue: "이 용어가 모델 성능 자체보다 검색과 외부 지식 연결을 바꾸는 이야기인지 바로 잡는 데 도움이 돼."
category: framework
aliases:
  - "LlamaIndex"
relatedTerms:
  - langchain
  - rag
  - tool-use
  - embedding
mentionCount: 0
draft: true
tags:
  - retrieval
  - agents
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://github.com/run-llama/llama_index"
      title: "run-llama/llama_index"
    - url: "https://www.llamaindex.ai/"
      title: "LlamaIndex | AI Agents for Document OCR + Workflows"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 프레임워크로 읽는 편이 맞다."
        - "원문을 보면 프레임워크로 읽는 게 맞아."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 프레임워크로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "교차 대조: 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "출처 1 대조: github.com."
        - "출처 2 대조: llamaindex.ai."
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
        - "헷갈리기 쉬운 건 완제품이나 단일 모델처럼 읽으면 직접 조립해야 하는 범위를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
LlamaIndex를 짧게 잡으면 여러 구성 요소를 연결하고 조립하는 프레임워크 쪽이야. 임베딩 저장, 필터링, reranking, vector search 같은 retrieval pipeline에서 어느 구간을 맡는지로 읽으면 덜 헷갈려.
## 실제로 무엇을 하나
임베딩 저장, 필터링, reranking, vector search 같은 retrieval pipeline에서 어느 구간을 맡는지로 읽으면 덜 헷갈려. 예를 들어 사내 문서를 검색해 답하는 RAG 흐름에서 검색 품질이 흔들리면 답변 품질도 같이 무너져. 완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여.
## 왜 중요한가
사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감돼. 완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — LangChain와 비교해 보면 검색과 외부 지식 연결에서 어디가 다른지 읽기 쉬워.
- [RAG](/ko/wiki/rag/) — RAG와 함께 보면 LlamaIndex가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [Tool Use](/ko/wiki/tool-use/) — Tool Use와 함께 보면 LlamaIndex가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [Embedding](/ko/wiki/embedding/) — Embedding와 함께 보면 LlamaIndex가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.