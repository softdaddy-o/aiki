---
term: inference
title: "Inference (추론)"
lang: ko
summary: "Inference는 학습이 끝난 모델이 실제 입력을 받아 결과를 만드는 실행 단계야. 사용자가 프롬프트를 넣었을 때 토큰을 생성하는 순간이 바로 여기에 해당해."
readerValue: "AI 기사에서 추론 비용, 추론 속도, 추론 서버라는 말이 나오면 모델 학습이 아니라 실제 서비스 실행 단계 이야기라는 걸 바로 잡을 수 있어."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "model inference"
  - "추론"
  - "모델 추론"
relatedTerms:
  - vllm
  - runtime
  - sglang
  - triton
firstMentioned: "2025-01-20"
mentionCount: 40
draft: false
tags:
  - serving
  - runtime
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://developers.google.com/machine-learning/glossary#inference"
      title: "Machine Learning Glossary | Google for Developers"
    - url: "https://en.wikipedia.org/wiki/Statistical_inference"
      title: "Statistical inference"
  checks:
    - type: source_match
      result: pass
      summary: "머신러닝 문맥의 inference를 학습 후 예측 단계로 설명해도 기본 의미와 맞는지 먼저 맞춰봤어."
      items:
        - "독자 문제 대조: 추론을 reasoning 같은 사고 능력으로 읽기 쉬운데, 여기서는 학습 후 실행 단계라는 점부터 갈라 봐야 해."
        - "그래서 본문에서 사용자의 입력을 받아 결과를 생성하는 실행 단계라고 푼 건 방향이 맞아."
        - "aliases에 있는 model inference, 추론, 모델 추론도 같은 문맥으로 이어져."
        - "통계학 inference와 단어는 같아도 AI 기사에서는 보통 모델 실행 단계를 뜻한다는 점을 분리해 두는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "일반 용어와 머신러닝 용어가 섞이지 않게 다시 봤어."
      items:
        - "비교 기준: 통계학 일반 용어로 읽을지, AI 서비스 실행 단계로 읽을지부터 갈라 봐야 해."
        - "AI 기사에서 추론 서버나 추론 비용이라는 말이 나오면 거의 항상 후자 문맥이야."
        - "그래서 본문도 실무 AI 문맥을 기준으로 설명 순서를 잡았어."
        - "이 구분이 초심자 혼동을 줄여."
    - type: number_verify
      result: pass
      summary: "숫자보다 실행 지표가 중요한 항목이라, 실제로 같이 붙는 성능 축을 다시 봤어."
      items:
        - "추론 문맥에서는 보통 지연 시간, 처리량, 메모리 사용량, 토큰 속도가 같이 붙어."
        - "vLLM, SGLang, Triton 같은 이름도 대부분 이 실행 최적화 층에서 등장해."
        - "그래서 본문은 학습과 반대되는 서비스 실행 단계라는 점을 먼저 강조했어."
    - type: adversarial
      result: pass
      summary: "처음 읽는 사람이 흔히 하는 오해를 따로 떼서 다시 봤어."
      items:
        - "Inference는 모델이 똑똑해지는 학습 단계가 아니라, 이미 학습된 모델을 돌리는 단계야."
        - "또 reasoning model의 '추론'과 같은 한국어를 써서 더 헷갈릴 수 있는데, 여기서는 실행 단계 의미가 먼저야."
        - "그래서 추론 최적화 기사와 추론 능력 기사도 같은 말처럼 보면 안 돼."
      findings:
        - "이 문맥에서 inference의 핵심은 사고 능력보다 실행 비용과 속도에 있어."
---

## 한 줄 정의

Inference는 학습이 끝난 모델이 실제 입력을 받아 결과를 만들어 내는 단계야. 쉽게 말해 모델을 가르치는 시간이 아니라, 이미 배운 모델을 실제로 돌려서 답을 뽑는 과정이라고 보면 돼.

그래서 사용자가 프롬프트를 넣고 모델이 토큰을 생성하는 순간도 전부 inference야. 학습과 서비스 실행을 구분할 때 가장 먼저 잡아야 하는 개념이기도 해.

## 어떻게 작동하나

AI 서비스가 돌아갈 때 대부분의 비용은 inference에서 발생해. 사용자가 질문을 보내면 서버가 모델을 불러 입력을 처리하고, 토큰을 하나씩 생성해서 응답을 보내는데, 이 전체 흐름이 추론 실행이야.

이 단계에서는 속도와 비용이 특히 중요해. 같은 모델이라도 어떤 런타임을 쓰는지, 배치 처리를 어떻게 하는지, KV 캐시를 어떻게 다루는지에 따라 응답 속도와 서버 비용이 크게 달라질 수 있어.

## 왜 중요한가

이 용어를 이해하면 "모델을 더 잘 학습시켰다"는 이야기와 "모델을 더 싸고 빠르게 돌린다"는 이야기를 구분할 수 있어. AI 인프라 기사 대부분은 사실 후자 쪽에 가까워.

실무에서도 inference는 핵심 병목이야. 사용자 수가 늘수록 GPU 비용, 지연 시간, 처리량 문제가 바로 드러나기 때문에, vLLM이나 Triton 같은 도구가 주목받는 이유도 여기에 있어.

## 주의해서 볼 점

Inference를 한국어로 그냥 '추론'이라고 옮기면 reasoning model의 추론과 섞여 버리기 쉬워. 하지만 여기서는 논리 사고보다 실행 단계라는 뜻이 먼저야.

또 추론 최적화가 모델 품질 향상을 뜻하는 건 아니야. 보통은 같은 모델을 더 빨리, 더 싸게, 더 많이 처리하는 쪽 개선이라서 기사 해석 방향이 달라져.

## 관련 용어

- [vLLM](/ko/wiki/vllm/) 은 LLM 추론 서빙 최적화 문맥에서 자주 나와.
- [Runtime](/ko/wiki/runtime/) 은 실제 추론이 어디서 어떤 방식으로 실행되는지 볼 때 이어져.
- [SGLang](/ko/wiki/sglang/) 은 추론 파이프라인과 실행 최적화 문맥에서 같이 나온다.
- [Triton](/ko/wiki/triton/) 은 추론 서버나 최적화 인프라 문맥에서 자주 보이는 이름이야.
