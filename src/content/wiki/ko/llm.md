---
term: llm
title: "LLM"
lang: ko
summary: "대량의 텍스트 데이터로 학습한 거대 신경망 모델. 텍스트 생성, 번역, 요약, 코딩 등 범용 언어 작업을 수행해."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "large language model"
relatedTerms:
  - token
firstMentioned: "2025-08-03"
mentionCount: 55
draft: false
tags:
  - language-model
  - foundation-model
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Large_language_model"
      title: "Large language model"
    - url: "https://www.ibm.com/think/topics/large-language-models"
      title: "What Are Large Language Models (LLMs)? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 대규모 훈련 데이터 세트에서 파생된 상황별 관계를 사용하여 자연어 처리 작업, 특히 언어 생성을 수행하도록 설계된 계산 모델입니다."
        - "원문을 보면 대규모 훈련 데이터 세트에서 파생된 상황별 관계를 사용하여 자연어 처리 작업, 특히 언어 생성을 수행하도록 설계된 계산 모델입니다."
        - "별칭 대조: large language model도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 대규모 언어 모델은 방대한 양의 텍스트 데이터를 처리하여 인간 언어를 이해하고 생성할 수 있는 AI 시스템입니다."
        - "교차 대조: 대규모 언어 모델은 방대한 양의 텍스트 데이터를 처리하여 인간 언어를 이해하고 생성할 수 있는 AI 시스템입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: ibm.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 언어 생성과 텍스트 이해 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
LLM(Large Language Model)은 수십억 개 이상의 파라미터를 가진 신경망으로, 인터넷 규모의 텍스트를 학습해서 범용 언어 작업을 수행하는 모델이야.
## 어떻게 작동하나
LLM의 기본 원리는 "다음 토큰 예측"이야. 앞의 텍스트가 주어지면 그다음에 올 가능성이 가장 높은 토큰(단어 조각)을 예측해. 이걸 반복하면 문장이 되고 글이 돼.

학습은 보통 두 단계를 거친다.

1. **사전학습(Pre-training)**: 인터넷에서 수집한 대량의 텍스트로 다음 토큰 예측을 반복 학습해. 이 과정에서 문법, 사실 지식, 추론 패턴 같은 것들이 파라미터에 압축돼.
2. **정렬(Alignment)**: RLHF나 RLAIF 같은 기법으로 사람이 원하는 방식으로 응답하도록 조정해. 해로운 내용 거부, 지시 따르기 같은 행동을 학습시키는 단계다.

대부분의 LLM은 트랜스포머 아키텍처를 기반으로 해. GPT-4, Claude, Gemini, Llama 같은 모델이 대표적이야.
## 왜 중요한가
LLM이 이전 AI 모델과 다른 점은 "범용성"이야. 하나의 모델로 번역, 요약, 코딩, 분석, 창작 같은 다양한 작업을 추가 학습 없이 수행할 수 있어. 별도 모델을 작업별로 따로 만들던 시대에서 하나의 기반 모델을 여러 용도로 쓰는 시대로 넘어온 것이야.

실무에선 코딩 어시스턴트, 고객 지원 챗봇, 문서 작성 보조, 데이터 분석 같은 곳에 이미 널리 들어가 있어. 반대로 최신 정보를 모르거나, 긴 문맥에서 실수하거나, 자신감 있게 틀린 말을 하는 한계도 분명해서 RAG, 파인튜닝, 에이전트 같은 보완 기법이 같이 발전했다.
## 관련 용어
- [Transformer](/ko/wiki/transformer/) — 대부분의 LLM이 사용하는 기반 아키텍처
- [Fine-tuning](/ko/wiki/fine-tuning/) — 사전학습된 LLM을 특정 작업에 맞게 추가 학습시키는 기법
- [RLHF](/ko/wiki/rlhf/) — LLM을 사람의 선호에 맞게 정렬하는 학습 방법
- [Inference](/ko/wiki/inference/) — 학습된 LLM이 실제 입력에 대해 출력을 생성하는 과정
- [Context Window](/ko/wiki/context-window/) — LLM이 한 번에 처리할 수 있는 토큰 수의 상한