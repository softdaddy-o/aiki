---
term: distillation
title: "Distillation"
lang: ko
summary: "기계 학습에서 지식 증류 또는 모델 증류는 큰 모델에서 작은 모델로 지식을 전달하는 프로세스입니다."
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
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Knowledge_distillation"
      title: "Knowledge distillation"
    - url: "https://platform.openai.com/docs/guides/distillation"
      title: "Supervised fine-tuning | OpenAI API"
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
Distillation는 기계 학습에서 지식 증류 또는 모델 증류는 큰 모델에서 작은 모델로 지식을 전달하는 프로세스입니다. 대형 모델은 소형 모델보다 지식 용량이 더 크지만 이 용량이 완전히 활용되지 않을 수 있습니다. 모델이 지식 용량을 거의 활용하지 않더라도 모델을 평가하는 데 계산 비용이 많이 들 수 있습니다. 지식 증류는 타당성을 잃지 않고 큰 모델의 지식을 더 작은 모델로 이전합니다. 소형 모델은 평가 비용이 저렴하므로 덜 강력한 하드웨어에 배포할 수 있습니다라는 맥락에서 자주 언급된…
## 어떻게 작동하나
더 나은 결과와 효율성을 위해 예시 입력과 알려진 양호한 출력을 사용하여 모델을 미세 조정하세요라는 설명을 함께 보면, Distillation가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Distillation는 3번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [pytorch](/ko/wiki/pytorch/)
- [quantization](/ko/wiki/quantization/)
- [alignment](/ko/wiki/alignment/)
- [fine-tuning](/ko/wiki/fine-tuning/)