---
term: vllm
title: "vLLM"
lang: ko
summary: "vLLM는 LLM을 위한 높은 처리량과 메모리 효율적인 추론 및 제공 엔진."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하는 데 도움이 돼."
category: tool
aliases:
  - "vLLM"
relatedTerms:
  - sglang
  - triton
  - ollama
  - inference
firstMentioned: "2026-03-09"
mentionCount: 1
draft: false
tags:
  - inference
  - serving
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://github.com/vllm-project/vllm"
      title: "vllm-project/vllm"
    - url: "https://docs.vllm.ai/"
      title: "vLLM"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 LLM을 위한 높은 처리량과 메모리 효율적인 추론 및 제공 엔진."
        - "원문을 보면 LLM을 위한 높은 처리량과 메모리 효율적인 추론 및 제공 엔진."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 LLM을 위한 높은 처리량과 메모리 효율적인 추론 및 제공 엔진."
        - "교차 대조: LLM을 위한 높은 처리량과 메모리 효율적인 추론 및 제공 엔진."
        - "출처 1 대조: github.com."
        - "출처 2 대조: docs.vllm.ai."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 모델 서빙과 추론 성능 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 모델 자체와 같은 말로 쓰면 제품 층위와 운영 층위가 섞이기 쉬워."
        - "헷갈리기 쉬운 건 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
vLLM를 짧게 잡으면 LLM을 위한 높은 처리량과 메모리 효율적인 추론 및 제공 엔진 쪽이야. batching, cache, GPU 메모리 재사용, 서버 API 같은 운영 요소로 추론 비용과 지연을 줄이는 쪽에 가까워.
## 실제로 무엇을 하나
LLM을 위한 높은 처리량과 메모리 효율적인 추론 및 제공 엔진. batching, cache, GPU 메모리 재사용, 서버 API 같은 운영 요소로 추론 비용과 지연을 줄이는 쪽에 가까워. 예를 들어 같은 모델이라도 batching이나 cache 설계가 달라지면 지연 시간과 비용이 크게 달라져.
## 왜 중요한가
실무에선 모델 자체보다 추론 스택이 지연 시간과 비용을 좌우하는 경우가 많아. 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워.
## 관련 용어
- [SGLang](/ko/wiki/sglang/) — SGLang와 비교해 보면 모델 서빙과 추론 성능에서 어디가 다른지 읽기 쉬워.
- [Triton Inference Server](/ko/wiki/triton/) — Triton Inference Server와 비교해 보면 모델 서빙과 추론 성능에서 어디가 다른지 읽기 쉬워.
- [Ollama](/ko/wiki/ollama/) — Ollama와 비교해 보면 모델 서빙과 추론 성능에서 어디가 다른지 읽기 쉬워.
- [Inference](/ko/wiki/inference/) — Inference와 함께 보면 vLLM가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.