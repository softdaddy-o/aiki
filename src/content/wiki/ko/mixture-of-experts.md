---
term: mixture-of-experts
title: "Mixture of Experts"
lang: ko
summary: "모델 내부 구조와 효율을 이해할 때 자주 나오는 AI 개념이다. 기사에서는 이 말이 실제로 무엇을 하는지부터 보는 편이 쉽다."
readerValue: "이 말이 새 모델 이름이 아니라 내부 구조 변화라는 점을 먼저 읽게 해준다."
category: concept
aliases:
  - "moe"
relatedTerms:
  - transformer
  - attention
firstMentioned: "2026-03-21"
mentionCount: 4
draft: false
tags:
  - architecture
  - scaling
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Mixture_of_experts"
      title: "Mixture of experts"
    - url: "https://mistral.ai/news/mixtral-of-experts"
      title: "Mixtral of experts | Mistral AI"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Mixture of Experts"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Mixture of experts (https://en.wikipedia.org/wiki/Mixture_of_experts)"
        - "Mixtral of experts | Mistral AI (https://mistral.ai/news/mixtral-of-experts)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
모델 내부 구조와 효율을 이해할 때 자주 나오는 개념이다. 쉽게 말하면 모델 안에서 정보를 읽고 연결하는 내부 설계도에 가깝다.
## 어떻게 작동하나
토큰 사이의 관계를 어떻게 계산하고, 어떤 정보에 더 집중할지 정하는 층이다. 같은 크기의 모델도 이런 설계 차이 때문에 속도와 품질이 갈린다. 보통 이런 개념은 새 제품 이름이 아니라, 모델이나 시스템이 어떻게 움직이는지를 설명하는 기본 단위로 보면 이해가 빠르다.
## 왜 중요한가
뉴스에서 새 아키텍처가 나오면 숫자보다 먼저 "왜 더 빠르거나 덜 비싼가"를 설명하는 단서가 된다. 이 개념을 알고 있으면 화려한 발표 문구를 봐도 실제로 무엇이 개선됐는지 더 빨리 읽을 수 있다.
## 관련 용어
- [Transformer](/ko/wiki/transformer/) — 모델 내부 구조를 같이 읽을 때 이해가 쉬워진다.
- [Attention](/ko/wiki/attention/) — 모델 내부 구조를 같이 읽을 때 이해가 쉬워진다.