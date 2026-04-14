---
term: prompt-caching
title: "Prompt Caching(프롬프트 캐싱)"
lang: ko
summary: "Prompt Caching은 반복되는 프롬프트 앞부분 계산을 재사용해서 지연과 입력 비용을 줄이는 서빙 기법이야."
readerValue: "이 말을 보면 모델 성능 향상인지, 운영비와 응답 속도 최적화인지 바로 가르는 데 도움 돼."
category: technique
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
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
  date: "2026-04-14"
  sources:
    - url: "https://platform.openai.com/docs/guides/prompt-caching"
      title: "Prompt caching | OpenAI API"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
      title: "Prompt caching"
  checks:
    - type: source_match
      result: pass
      summary: "Prompt Caching을 서빙 최적화 기법으로 잡은 정의를 문서 설명에 맞춰봤어."
      items:
        - "독자 문제 대조: Prompt Caching을 모델 성능 향상 기술이 아니라 반복 프롬프트 재사용 기법으로 읽도록 대상부터 고정했어."
        - "OpenAI와 Anthropic 문서 요약이 모두 긴 프롬프트 비용과 지연 절감 쪽을 강조하는지 확인했어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "두 제공자 문서가 같은 개념을 말하는지 다시 봤어."
      items:
        - "비교 기준: 두 문서가 모두 공통 접두부 재사용을 말하는지, 아니면 서로 다른 캐시 개념을 말하는지 비교했어."
        - "OpenAI는 적중 토큰 관측을, Anthropic은 breakpoint와 TTL 운영을 더 전면에 세워서 본문에 제공자별 차이도 같이 남겼어."
    - type: number_verify
      result: pass
      summary: "문서에 직접 나온 임계값과 TTL 숫자만 남기고 더 센 주장은 줄였어."
      items:
        - "OpenAI 쪽 설명에 나온 1024토큰 기준을 본문에 반영했어."
        - "Anthropic 쪽 설명에 나온 5분 기본 캐시와 1시간 옵션도 문서 요약 범위 안에서만 남겼어."
    - type: adversarial
      result: pass
      summary: "Prompt Caching을 어디서나 자동으로 먹는 만능 가속처럼 읽는 오해를 막았어."
      items:
        - "캐시 적중은 프롬프트 구조가 일정해야 한다는 점을 넣어서 무조건 빨라진다는 식의 과장을 막았어."
        - "제공자마다 캐시 깨지는 조건과 관측 방식이 다르다는 점을 같이 남겨서 구현 차이를 보이게 했어."
      findings:
        - "서빙 최적화와 모델 자체 개선을 섞어 읽으면 기사 핵심이 어긋나기 쉬워."
        - "캐시가 있다고 해도 작은 프롬프트나 자주 바뀌는 접두부에는 체감 이득이 약할 수 있어."
---
## 한 줄 정의
Prompt Caching은 매번 똑같이 붙는 프롬프트 앞부분을 다시 계산하지 않게 해서 속도와 비용을 줄이는 운영 기법이야. 모델을 더 똑똑하게 만드는 방법이라기보다 같은 모델을 더 싸고 빠르게 쓰게 만드는 서빙 최적화에 가까워.
## 어떻게 작동하나
긴 시스템 프롬프트나 반복되는 문서 배경처럼 공통 접두부가 있으면 제공자가 그 구간의 계산 결과를 캐시에 보관하고 다음 요청에서 재사용해. 제공된 문서 요약 기준으로 OpenAI는 1024토큰 이상 프롬프트와 `cached_tokens` 같은 적중 지표를 이야기하고, Anthropic은 cache breakpoint와 TTL 정책을 두고 5분 기본 캐시와 1시간 옵션 같은 운영 포인트를 보여 줘.
## 왜 중요한가
이 기법은 긴 컨텍스트를 쓰는 서비스에서 체감 속도와 운영비를 동시에 건드려. 대형 시스템 프롬프트, 도구 정의, 문서 배경을 매 요청마다 다시 넣는 제품이라면 모델을 바꾸지 않아도 Prompt Caching만으로 차이를 꽤 만들 수 있어.
## 주의해서 볼 점
Prompt Caching은 이름만 같다고 어디서나 같은 방식으로 동작하지 않아. 캐시에 들어가는 최소 토큰 수, 어떤 변경이 캐시를 깨는지, TTL이 얼마인지가 제공자마다 다르니까 프롬프트 구조와 관측 지표를 같이 봐야 실제 이득이 나.
## 관련 용어
- ollama: Ollama는 로컬 모델 실행 환경을 뜻해. Prompt Caching은 그 위나 API 서빙 층에서 반복 입력 계산을 줄이는 기법이라 역할이 달라.
- vllm: vLLM은 추론 서버와 KV 캐시 운영 맥락에서 자주 같이 나와. 그래도 Prompt Caching은 제품 수준에서 공통 프롬프트를 재사용하는 전략으로 읽는 쪽이 더 정확해.
- quantization: quantization은 모델 자체를 가볍게 만드는 방법이야. Prompt Caching은 같은 모델에서 반복 입력 비용을 줄이는 방법이라 층위가 달라.
- distillation: distillation은 더 작은 모델을 새로 만드는 방향이야. Prompt Caching은 모델은 그대로 둔 채 서빙 효율을 높이는 방향이야.