---
term: llamaindex
title: "LlamaIndex"
lang: ko
summary: "검색과 외부 지식 연결 흐름을 연결하고 조립하는 프레임워크야. 결국 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지를 풀 때 어떤 뼈대를 쓸지 가르는 이름이야."
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
draft: false
tags:
  - retrieval
  - agents
factCheck:
  status: passed
  date: "2026-04-10"
  sources:
    - url: "https://github.com/run-llama/llama_index"
      title: "run-llama/llama_index"
    - url: "https://www.llamaindex.ai/"
      title: "LlamaIndex | AI Agents for Document OCR + Workflows"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지야."
        - "이름을 다시 보면 LlamaIndex로 잡혀."
        - "분류를 다시 보면 프레임워크로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지야."
        - "같이 본 출처로는 run-llama/llama_index (https://github.com/run-llama/llama_index)"
        - "같이 본 출처로는 LlamaIndex | AI Agents for Document OCR + Workflows (https://www.llamaindex.ai/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지야."
        - "이름부터 다시 보면 LlamaIndex로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
검색과 외부 지식 연결 흐름을 연결하고 조립하는 프레임워크야. 쉽게 말하면 질문에 맞는 자료를 바깥에서 찾아와 붙이는 검색 레이어를 코드와 시스템 구조로 묶는 뼈대야. 결국 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지를 풀 때 어떤 골조를 쓸지 가르는 이름이야.
## 실제로 무엇을 하나
결과를 직접 만드는 모델이라기보다 흐름을 묶는 틀에 가까워. 핵심은 질문이나 문서를 검색하기 쉬운 형태로 바꾼 뒤, 관련 자료를 찾아 모델 앞에 붙이거나 결과 순서를 다시 정렬하는 데 있어. 보통 관건은 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지를 어떤 구조로 묶느냐야.
## 왜 중요한가
사내 문서 Q&A, 고객지원, 최신 정보 응답처럼 "모델이 원래 모르던 것"을 다뤄야 하는 서비스에서 바로 체감돼. 결국 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지를 어느 구조 문제로 볼지 알아야 도입 판단이 쉬워져.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — LlamaIndex를 볼 때 비교 포인트는 검색과 외부 지식 연결 흐름을 어떤 구조로 묶어야 하는지다. - [RAG](/ko/wiki/rag/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다. - [Tool Use](/ko/wiki/tool-use/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다. - [Embedding](/ko/wiki/embedding/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.