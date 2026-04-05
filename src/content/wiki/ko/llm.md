---
term: llm
title: 'LLM (대규모 언어 모델)'
lang: ko
summary: '대량의 텍스트 데이터로 학습한 거대 신경망 모델. 텍스트 생성, 번역, 요약, 코딩 등 범용 언어 작업을 수행한다.'
category: concept
aliases:
    - large language model
    - 대규모 언어 모델
relatedTerms:
    - transformer
    - fine-tuning
    - rlhf
    - inference
    - context-window
mentionCount: 0
draft: false
tags:
    - foundation-model
    - nlp
    - deep-learning
---

## 한 줄 정의

LLM(Large Language Model)은 수십억 개 이상의 파라미터를 가진 신경망으로, 인터넷 규모의 텍스트를 학습해서 범용 언어 작업을 수행하는 모델이다.

## 작동 원리

LLM의 기본 원리는 "다음 토큰 예측"이다. 앞의 텍스트가 주어지면 그다음에 올 가능성이 가장 높은 토큰(단어 조각)을 예측한다. 이걸 반복하면 문장이 되고 글이 된다.

학습은 보통 두 단계를 거친다.

1. **사전학습(Pre-training)**: 인터넷에서 수집한 대량의 텍스트로 다음 토큰 예측을 반복 학습한다. 이 과정에서 문법, 사실 지식, 추론 패턴 같은 것들이 파라미터에 압축된다.
2. **정렬(Alignment)**: RLHF나 RLAIF 같은 기법으로 사람이 원하는 방식으로 응답하도록 조정한다. 해로운 내용 거부, 지시 따르기 같은 행동을 학습시키는 단계다.

대부분의 LLM은 트랜스포머 아키텍처를 기반으로 한다. GPT-4, Claude 3.5 Sonnet, Gemini, Llama 3 같은 모델이 대표적이다.

## 왜 중요한가

LLM이 이전 AI 모델과 다른 점은 "범용성"이다. 하나의 모델로 번역, 요약, 코딩, 분석, 창작 등 다양한 작업을 추가 학습 없이 수행할 수 있다. 별도 모델을 작업별로 따로 만들던 시대에서 하나의 기반 모델을 여러 용도로 쓰는 시대로 넘어온 것이다.

실용적으로는 코딩 어시스턴트(GitHub Copilot, Cursor), 고객 지원 챗봇, 문서 작성 보조, 데이터 분석 등에 이미 널리 쓰이고 있다. 기업 기준으로 보면 사람이 하던 텍스트 기반 작업의 상당 부분을 자동화하거나 보조할 수 있다는 의미다.

한계도 분명하다. 학습 데이터에 없는 최신 정보를 모르고, 긴 문맥을 정확히 다루기 어렵고, 자신감 있게 거짓을 말하기도 한다. RAG, 파인튜닝, 에이전트 같은 기법들은 이 한계를 보완하기 위해 나온 것들이다.

## 관련 용어

- [트랜스포머](/wiki/ko/transformer) — 대부분의 LLM이 사용하는 기반 아키텍처
- [파인튜닝](/wiki/ko/fine-tuning) — 사전학습된 LLM을 특정 작업에 맞게 추가 학습시키는 기법
- [RLHF](/wiki/ko/rlhf) — LLM을 사람의 선호에 맞게 정렬하는 학습 방법
- [추론 (인퍼런스)](/wiki/ko/inference) — 학습된 LLM이 실제 입력에 대해 출력을 생성하는 과정
- [컨텍스트 윈도우](/wiki/ko/context-window) — LLM이 한 번에 처리할 수 있는 토큰 수의 상한
