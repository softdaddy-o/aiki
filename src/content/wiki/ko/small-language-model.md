---
term: small-language-model
title: "Small Language Model"
lang: ko
summary: "경량 모델과 온디바이스 추론을 이해할 때 자주 나오는 AI 개념이다. 기사에서는 이 말이 실제로 무엇을 하는지부터 보는 편이 쉽다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "slm"
relatedTerms:
  - quantization
  - distillation
  - prompt-caching
mentionCount: 0
draft: false
tags:
  - efficiency
  - on-device
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model"
      title: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model"
    - url: "https://huggingface.co/blog/smollm"
      title: "SmolLM - blazingly fast and remarkably powerful"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Small Language Model"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model (https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model)"
        - "SmolLM - blazingly fast and remarkably powerful (https://huggingface.co/blog/smollm)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
경량 모델과 온디바이스 추론을 이해할 때 자주 나오는 개념이다. 쉽게 말하면 기존 모델을 더 잘 맞추거나 더 싸게 돌리기 위한 학습·압축 레이어에 가깝다.
## 어떻게 작동하나
데이터, 보상, 압축 기법을 써서 모델의 성능과 비용 균형을 다시 잡는 방식이다. 베이스 모델이 같아도 여기서 결과가 크게 달라진다. 보통 이런 개념은 새 제품 이름이 아니라, 모델이나 시스템이 어떻게 움직이는지를 설명하는 기본 단위로 보면 이해가 빠르다.
## 왜 중요한가
같은 모델 계열 안에서도 실사용 성능과 운영비 차이가 크게 나는 이유를 설명해 준다. 이 개념을 알고 있으면 화려한 발표 문구를 봐도 실제로 무엇이 개선됐는지 더 빨리 읽을 수 있다.
## 관련 용어
- [Quantization](/ko/wiki/quantization/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Distillation](/ko/wiki/distillation/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Prompt Caching](/ko/wiki/prompt-caching/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.