---
term: quantization
title: "Quantization"
lang: ko
summary: "학습과 비용 최적화를 개선하거나 연결하는 AI 기법이야. 보통 정확도, 비용, 실행 방식 중 하나를 바꿔."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
category: technique
aliases:
  - "model quantization"
relatedTerms:
  - distillation
  - prompt-caching
  - onnx
  - modal
firstMentioned: "2026-03-26"
mentionCount: 1
draft: false
tags:
  - efficiency
  - deployment
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Quantization_(signal_processing)"
      title: "Quantization (signal processing)"
    - url: "https://huggingface.co/docs/transformers/quantization/overview"
      title: "Overview · Hugging Face"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Quantization"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Quantization (signal processing) (https://en.wikipedia.org/wiki/Quantization_(signal_processing))"
        - "Overview · Hugging Face (https://huggingface.co/docs/transformers/quantization/overview)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Quantization"
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
학습과 비용 최적화를 바꾸거나 개선할 때 쓰는 기법이야. 쉽게 말하면 기존 모델을 더 잘 맞추거나 더 싸게 돌리기 위한 학습·압축 레이어 역할을 한다고 보면 돼.
## 어떻게 작동하나
데이터, 보상, 압축 기법을 써서 모델의 성능과 비용 균형을 다시 잡는 방식이야. 베이스 모델이 같아도 여기서 결과가 크게 달라져. 그래서 이런 기법은 "무슨 모델이냐"보다 입력, 검색, 학습, 실행 흐름 중 어디에 개입하는지로 이해하는 편이 쉬워.
## 왜 중요한가
같은 모델 계열 안에서도 실사용 성능과 운영비 차이가 크게 나는 이유를 설명해 준다. 같은 모델도 어떤 기법을 붙이느냐에 따라 정확도, 비용, 지연이 크게 달라져.
## 관련 용어
- [Distillation](/ko/wiki/distillation/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Prompt Caching](/ko/wiki/prompt-caching/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [ONNX](/ko/wiki/onnx/) — 운영과 배포 관점에서 같이 보면 맥락이 선다.
- [Modal](/ko/wiki/modal/) — 운영과 배포 관점에서 같이 보면 맥락이 선다.