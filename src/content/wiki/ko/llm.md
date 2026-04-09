---
term: llm
title: "LLM"
lang: ko
summary: "대량의 텍스트 데이터로 학습한 거대 신경망 모델. 텍스트 생성, 번역, 요약, 코딩 등 범용 언어 작업을 수행해."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "large language model"
relatedTerms:
  - token
firstMentioned: "2025-08-03"
mentionCount: 43
draft: false
tags:
  - language-model
  - foundation-model
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Large_language_model"
      title: "Large language model"
    - url: "https://www.ibm.com/think/topics/large-language-models"
      title: "What Are Large Language Models (LLMs)? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: LLM"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Large language model (https://en.wikipedia.org/wiki/Large_language_model)"
        - "What Are Large Language Models (LLMs)? | IBM (https://www.ibm.com/think/topics/large-language-models)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: LLM"
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
LLM(Large Language Model)은 수십억 개 이상의 파라미터를 가진 신경망으로, 인터넷 규모의 텍스트를 학습해서 범용 언어 작업을 수행하는 모델이야.
## 어떻게 작동하나
LLM의 기본 원리는 "다음 토큰 예측"이야. 앞의 텍스트가 주어지면 그다음에 올 가능성이 가장 높은 토큰(단어 조각)을 예측해. 이걸 반복하면 문장이 되고 글이 돼.

학습은 보통 두 단계를 거친다.

1. **사전학습(Pre-training)**: 인터넷에서 수집한 대량의 텍스트로 다음 토큰 예측을 반복 학습해. 이 과정에서 문법, 사실 지식, 추론 패턴 같은 것들이 파라미터에 압축돼.
2. **정렬(Alignment)**: RLHF나 RLAIF 같은 기법으로 사람이 원하는 방식으로 응답하도록 조정해. 해로운 내용 거부, 지시 따르기 같은 행동을 학습시키는 단계다.

대부분의 LLM은 트랜스포머 아키텍처를 기반으로 해. GPT-4, Claude, Gemini, Llama 같은 모델이 대표적이야.
## 왜 중요한가
LLM이 이전 AI 모델과 다른 점은 "범용성"이야. 하나의 모델로 번역, 요약, 코딩, 분석, 창작 같은 다양한 작업을 추가 학습 없이 수행할 수 있어. 별도 모델을 작업별로 따로 만들던 시대에서 하나의 기반 모델을 여러 용도로 쓰는 시대로 넘어온 것이야.

실무에서는 코딩 어시스턴트, 고객 지원 챗봇, 문서 작성 보조, 데이터 분석 같은 곳에 이미 널리 들어가 있어. 반대로 최신 정보를 모르거나, 긴 문맥에서 실수하거나, 자신감 있게 틀린 말을 하는 한계도 분명해서 RAG, 파인튜닝, 에이전트 같은 보완 기법이 같이 발전했다.
## 관련 용어
- [Transformer](/ko/wiki/transformer/) — 대부분의 LLM이 사용하는 기반 아키텍처
- [Fine-tuning](/ko/wiki/fine-tuning/) — 사전학습된 LLM을 특정 작업에 맞게 추가 학습시키는 기법
- [RLHF](/ko/wiki/rlhf/) — LLM을 사람의 선호에 맞게 정렬하는 학습 방법
- [Inference](/ko/wiki/inference/) — 학습된 LLM이 실제 입력에 대해 출력을 생성하는 과정
- [Context Window](/ko/wiki/context-window/) — LLM이 한 번에 처리할 수 있는 토큰 수의 상한