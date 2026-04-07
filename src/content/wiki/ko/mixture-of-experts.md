---
term: mixture-of-experts
title: "Mixture of Experts"
lang: ko
summary: "전문가 혼합(MoE)은 여러 전문가 네트워크(학습자)를 사용하여 문제 공간을 동종 영역으로 나누는 기계 학습 기술입니다."
category: concept
aliases:
  - "moe"
relatedTerms:
  - transformer
  - attention
firstMentioned: "2026-03-02"
mentionCount: 4
draft: false
tags:
  - architecture
  - scaling
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Mixture_of_experts"
      title: "Mixture of experts"
    - url: "https://mistral.ai/news/mixtral-of-experts"
      title: "Mixtral of experts | Mistral AI"
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
Mixture of Experts는 전문가 혼합(MoE)은 여러 전문가 네트워크(학습자)를 사용하여 문제 공간을 동종 영역으로 나누는 기계 학습 기술입니다. MoE는 앙상블 학습의 한 형태를 나타냅니다. 위원회 기계라고도 불렸습니다라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
고품질의 희박한 전문가 조합라는 설명을 함께 보면, Mixture of Experts가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Mixture of Experts는 4번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [transformer](/ko/wiki/transformer/)
- [attention](/ko/wiki/attention/)