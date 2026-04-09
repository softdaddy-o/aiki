---
term: distillation
title: "Distillation"
lang: ko
summary: "학습과 비용 최적화를 개선하거나 연결하는 AI 기법이다. 보통 정확도, 비용, 실행 방식 중 하나를 바꾼다."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
category: technique
aliases:
  - "knowledge distillation"
relatedTerms:
  - pytorch
  - quantization
  - alignment
  - fine-tuning
firstMentioned: "2026-03-23"
mentionCount: 3
draft: false
tags:
  - training
  - efficiency
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Knowledge_distillation"
      title: "Knowledge distillation"
    - url: "https://platform.openai.com/docs/guides/distillation"
      title: "Supervised fine-tuning | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Distillation"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Knowledge distillation (https://en.wikipedia.org/wiki/Knowledge_distillation)"
        - "Supervised fine-tuning | OpenAI API (https://platform.openai.com/docs/guides/distillation)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
학습과 비용 최적화를 바꾸거나 개선할 때 쓰는 기법이다. 쉽게 말하면 기존 모델을 더 잘 맞추거나 더 싸게 돌리기 위한 학습·압축 레이어 역할을 한다고 보면 된다.
## 어떻게 작동하나
데이터, 보상, 압축 기법을 써서 모델의 성능과 비용 균형을 다시 잡는 방식이다. 베이스 모델이 같아도 여기서 결과가 크게 달라진다. 그래서 이런 기법은 "무슨 모델이냐"보다 입력, 검색, 학습, 실행 흐름 중 어디에 개입하는지로 이해하는 편이 쉽다.
## 왜 중요한가
같은 모델 계열 안에서도 실사용 성능과 운영비 차이가 크게 나는 이유를 설명해 준다. 같은 모델도 어떤 기법을 붙이느냐에 따라 정확도, 비용, 지연이 크게 달라진다.
## 관련 용어
- [PyTorch](/ko/wiki/pytorch/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Quantization](/ko/wiki/quantization/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Alignment](/ko/wiki/alignment/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.
- [Fine-tuning](/ko/wiki/fine-tuning/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.