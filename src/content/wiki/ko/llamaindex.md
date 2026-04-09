---
term: llamaindex
title: "LlamaIndex"
lang: ko
summary: "검색과 외부 지식 연결 흐름을 연결하고 조립하는 프레임워크야. 여러 단계와 도구를 묶는 문맥에서 자주 나와."
readerValue: "이 용어가 모델 성능 자체보다 검색과 외부 지식 연결을 바꾸는 이야기인지 바로 잡게 해준다."
category: framework
aliases:
  - "LlamaIndex"
relatedTerms:
  - langchain
  - rag
  - tool-use
  - embedding
mentionCount: 0
draft: false
tags:
  - retrieval
  - agents
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://github.com/run-llama/llama_index"
      title: "run-llama/llama_index"
    - url: "https://www.llamaindex.ai/"
      title: "LlamaIndex | AI Agents for Document OCR + Workflows"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: LlamaIndex"
        - "분류 대조: 프레임워크"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "run-llama/llama_index (https://github.com/run-llama/llama_index)"
        - "LlamaIndex | AI Agents for Document OCR + Workflows (https://www.llamaindex.ai/)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: LlamaIndex"
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
검색과 외부 지식 연결 흐름을 연결하고 조립하는 프레임워크야. 쉽게 말하면 질문에 맞는 자료를 바깥에서 찾아와 붙이는 검색 레이어를 코드와 시스템 구조로 묶는 뼈대야.
## 실제로 무엇을 하나
결과를 직접 만드는 모델이라기보다 흐름을 묶는 틀에 가까워. 핵심은 질문이나 문서를 검색하기 쉬운 형태로 바꾼 뒤, 관련 자료를 찾아 모델 앞에 붙이거나 결과 순서를 다시 정렬하는 데 있어. 보통 프롬프트, 검색, 메모리, 실행 순서를 어떻게 묶는지가 관건이야.
## 왜 중요한가
사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감돼. 프레임워크는 모델 성능보다 개발 속도와 시스템 구조를 바꾸는 경우가 많아서, 그 차이를 알아야 도입 판단이 쉬워져.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 돼.
- [RAG](/ko/wiki/rag/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Tool Use](/ko/wiki/tool-use/) — 외부 도구 실행 맥락을 같이 이해하게 해 준다.
- [Embedding](/ko/wiki/embedding/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.