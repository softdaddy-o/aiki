---
term: alignment
title: "Alignment"
lang: ko
summary: "안전성과 신뢰성 제어를 이해할 때 자주 나오는 AI 개념이다. 기사에서는 이 말이 실제로 무엇을 하는지부터 보는 편이 쉽다."
readerValue: "이 말이 성능 향상보다 오류와 위험을 줄이는 안전 장치에 가깝다는 점을 구분하게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/AI_alignment"
      title: "AI alignment"
    - url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback"
      title: "Constitutional AI: Harmlessness from AI Feedback"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Alignment"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "AI alignment (https://en.wikipedia.org/wiki/AI_alignment)"
        - "Constitutional AI: Harmlessness from AI Feedback (https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
안전성과 신뢰성 제어를 이해할 때 자주 나오는 개념이다. 쉽게 말하면 모델이 위험한 답이나 허위 답을 덜 내게 만드는 안전장치에 가깝다.
## 어떻게 작동하나
출력 정책, 거부 기준, 오류 점검, 검증 루프 같은 제어를 넣는 층으로 보면 이해가 쉽다. 보통 이런 개념은 새 제품 이름이 아니라, 모델이나 시스템이 어떻게 움직이는지를 설명하는 기본 단위로 보면 이해가 빠르다.
## 왜 중요한가
실서비스에서는 성능 점수보다 사고 예방과 신뢰성 관리가 더 큰 비용을 좌우한다. 이 개념을 알고 있으면 화려한 발표 문구를 봐도 실제로 무엇이 개선됐는지 더 빨리 읽을 수 있다.
## 관련 용어
- [PyTorch](/ko/wiki/pytorch/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Fine-tuning](/ko/wiki/fine-tuning/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Distillation](/ko/wiki/distillation/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Hallucination](/ko/wiki/hallucination/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.