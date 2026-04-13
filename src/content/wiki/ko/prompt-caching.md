---
term: prompt-caching
title: "Prompt Caching"
lang: ko
summary: "Prompt Caching는 기존 모델이나 workflow를 더 잘 쓰기 위해 얹는 기법이야. 새 제품 이름보다 어떤 단계를 바꾸는 방법인지로 읽는 편이 맞아."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르는 기준이 돼."
category: technique
aliases:
  - "cache reuse"
relatedTerms:
  - ollama
  - vllm
  - quantization
  - distillation
mentionCount: 0
draft: false
tags:
  - efficiency
  - inference
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://platform.openai.com/docs/guides/prompt-caching"
      title: "Prompt caching | OpenAI API"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
      title: "Prompt caching"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 기법로 읽는 편이 맞다."
        - "원문을 보면 기법로 읽는 게 맞아."
        - "별칭 대조: cache reuse도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "교차 대조: 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "출처 1 대조: platform.openai.com."
        - "출처 2 대조: docs.anthropic.com."
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
        - "헷갈리기 쉬운 건 새 제품명으로 받아들이면 실제로는 기존 모델 위에 얹는 방법론이라는 점을 놓치기 쉬워."
        - "헷갈리기 쉬운 건 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Prompt Caching를 짧게 잡으면 모델 서빙과 추론 성능을 바꾸거나 개선할 때 쓰는 기법 쪽이야. batching, cache, GPU 메모리 재사용, 서버 API 같은 운영 요소로 추론 비용과 지연을 줄이는 쪽에 가까워.
## 어떻게 작동하나
batching, cache, GPU 메모리 재사용, 서버 API 같은 운영 요소로 추론 비용과 지연을 줄이는 쪽에 가까워. 예를 들어 같은 모델이라도 batching이나 cache 설계가 달라지면 지연 시간과 비용이 크게 달라져. 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해.
## 왜 중요한가
같은 모델 계열 안에서도 실사용 성능과 운영비 차이가 크게 나는 이유를 설명해 준다. 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해.
## 관련 용어
- [Ollama](/ko/wiki/ollama/) — 같이 보면 학습·압축 전략 맥락을 같이 이해하는 데 도움이 돼.
- [vLLM](/ko/wiki/vllm/) — 같이 보면 학습·압축 전략 맥락을 같이 이해하는 데 도움이 돼.
- [Quantization](/ko/wiki/quantization/) — Quantization와 비교해 보면 모델 서빙과 추론 성능에서 어디가 다른지 읽기 쉬워.
- [Distillation](/ko/wiki/distillation/) — Distillation와 비교해 보면 모델 서빙과 추론 성능에서 어디가 다른지 읽기 쉬워.