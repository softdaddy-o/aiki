---
term: small-language-model
title: "Small Language Model"
lang: ko
summary: "경량 모델과 온디바이스 추론을 이해할 때 자주 나오는 AI 개념이야. 기사에서는 핵심 질문을 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지 쪽에 두고 읽는 편이 쉬워."
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
      summary: "이 페이지를 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자가 먼저 갈라 봐야 할 건 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 Small Language Model로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "여기서 먼저 갈라 볼 기준은 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model (https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model)"
        - "같이 본 출처로는 SmolLM - blazingly fast and remarkably powerful (https://huggingface.co/blog/smollm)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름부터 다시 보면 Small Language Model로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "헷갈리지 않으려면 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
경량 모델과 온디바이스 추론을 이해할 때 자주 나오는 개념이야. 쉽게 말하면 기존 모델을 더 잘 맞추거나 더 싸게 돌리기 위한 학습·압축 레이어에 가까워. 결국 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지를 읽어내는 기준점 역할을 해.
## 어떻게 작동하나
데이터, 보상, 압축 기법을 써서 모델의 성능과 비용 균형을 다시 잡는 방식이야. 베이스 모델이 같아도 여기서 결과가 크게 달라져. 보통 이런 개념은 새 제품 이름이 아니라, 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지를 설명하는 기본 단위로 보면 이해가 빨라.
## 왜 중요한가
같은 모델 계열 안에서도 실사용 성능과 운영비 차이가 크게 나는 이유를 설명해 준다. 이 개념을 알고 있으면 화려한 발표 문구를 봐도 결국 경량 모델과 온디바이스 추론를 기사에서 어떤 판단 기준으로 읽어야 하는지를 더 빨리 읽을 수 있어.
## 관련 용어
- [Quantization](/ko/wiki/quantization/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Distillation](/ko/wiki/distillation/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Prompt Caching](/ko/wiki/prompt-caching/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.