---
term: quantization
title: "Quantization"
lang: ko
summary: "수학과 디지털 신호 처리에서 양자화는 큰 세트의 입력 값을 (가산 가능한) 더 작은 세트의 출력 값으로 매핑하는 프로세스이며, 종종 유한한 수의 요소가 포함됩니다."
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
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Quantization_(signal_processing)"
      title: "Quantization (signal processing)"
    - url: "https://huggingface.co/docs/transformers/quantization/overview"
      title: "Overview · Hugging Face"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 한 줄 정의
Quantization는 수학과 디지털 신호 처리에서 양자화는 큰 세트의 입력 값을 (가산 가능한) 더 작은 세트의 출력 값으로 매핑하는 프로세스이며, 종종 유한한 수의 요소가 포함됩니다. 반올림 및 잘림은 양자화 프로세스의 일반적인 예입니다. 신호를 디지털 형식으로 표현하는 프로세스에는 일반적으로 반올림이 포함되므로 양자화는 거의 모든 디지털 신호 처리에 어느 정도 관련됩니다. 또한 양자화는 본질적으로 모든 손실 압축 알고리즘의 핵심을 형성합니다라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
우리는 오픈 소스와 오픈 사이언스를 통해 인공 지능을 발전시키고 민주화하기 위한 여정을 진행하고 있습니다라는 설명을 함께 보면, Quantization가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Quantization는 1번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [distillation](/ko/wiki/distillation/)
- [prompt-caching](/ko/wiki/prompt-caching/)
- [onnx](/ko/wiki/onnx/)
- [modal](/ko/wiki/modal/)