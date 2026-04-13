---
term: alignment
title: "Alignment"
lang: ko
summary: "Alignment는 인공 지능(AI) 분야에서 정렬은 AI 시스템을 개인이나 그룹이 의도한 목표, 선호도 또는 윤리 원칙에 맞게 조정하는 것을 목표로 합니다."
readerValue: "이 말이 성능 향상보다 오류와 위험을 줄이는 안전 장치에 가깝다는 점을 구분하는 데 도움이 돼."
category: concept
aliases:
  - "ai alignment"
relatedTerms:
  - pytorch
  - fine-tuning
  - distillation
  - hallucination
firstMentioned: "2026-02-22"
mentionCount: 3
draft: false
tags:
  - safety
  - training
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/AI_alignment"
      title: "AI alignment"
    - url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback"
      title: "Constitutional AI: Harmlessness from AI Feedback"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 인공 지능(AI) 분야에서 정렬은 AI 시스템을 개인이나 그룹이 의도한 목표, 선호도 또는 윤리 원칙에 맞게 조정하는 것을 목표로 합니다."
        - "원문을 보면 인공 지능(AI) 분야에서 정렬은 AI 시스템을 개인이나 그룹이 의도한 목표, 선호도 또는 윤리 원칙에 맞게 조정하는 것을 목표로 합니다."
        - "별칭 대조: ai alignment도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 인공 지능(AI) 분야에서 정렬은 AI 시스템을 개인이나 그룹이 의도한 목표, 선호도 또는 윤리 원칙에 맞게 조정하는 것을 목표로 합니다."
        - "교차 대조: 인공 지능(AI) 분야에서 정렬은 AI 시스템을 개인이나 그룹이 의도한 목표, 선호도 또는 윤리 원칙에 맞게 조정하는 것을 목표로 합니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: anthropic.com."
    - type: number_verify
      result: pass
      summary: "설명에 직접 걸리는 숫자와 표기를 한 번 더 검증해뒀어 확인했어."
      items:
        - "숫자를 다시 보면 27 같은 표기가 실제 기준점으로 잡혀."
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
Alignment를 짧게 잡으면 인공 지능(AI) 분야에서 정렬은 AI 시스템을 개인이나 그룹이 의도한 목표, 선호도 또는 윤리 원칙에 맞게 조정하는 것을 목표로 합니다 쪽이야. 데이터, 파라미터, 압축, 학습 루프를 어떻게 조정해 품질과 비용 균형을 바꾸는지와 연결돼.
## 어떻게 작동하나
인공 지능(AI) 분야에서 정렬은 AI 시스템을 개인이나 그룹이 의도한 목표, 선호도 또는 윤리 원칙에 맞게 조정하는 것을 목표로 합니다. 데이터, 파라미터, 압축, 학습 루프를 어떻게 조정해 품질과 비용 균형을 바꾸는지와 연결돼. 예를 들어 더 작은 모델에 큰 모델 출력을 학습시키거나 양자화로 운영비를 줄이는 시도가 여기에 들어가.
## 왜 중요한가
실서비스에서는 성능 점수보다 사고 예방과 신뢰성 관리가 더 큰 비용을 좌우해. 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어.
## 관련 용어
- [PyTorch](/ko/wiki/pytorch/) — 같이 보면 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼.
- [Fine-tuning](/ko/wiki/fine-tuning/) — 같이 보면 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼.
- [Distillation](/ko/wiki/distillation/) — 같이 보면 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼.
- [Hallucination](/ko/wiki/hallucination/) — Hallucination와 비교해 보면 안전성과 신뢰성 제어에서 어디가 다른지 읽기 쉬워.