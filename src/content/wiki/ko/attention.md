---
term: attention
title: "Attention"
lang: ko
summary: "기계 학습에서 주의는 해당 시퀀스의 다른 구성 요소와 관련하여 시퀀스의 각 구성 요소의 중요성을 결정하는 방법입니다."
category: concept
aliases:
  - "Attention"
relatedTerms:
  - transformer
  - mixture-of-experts
firstMentioned: "2026-02-23"
mentionCount: 4
draft: false
tags:
  - architecture
  - transformer
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Attention_(machine_learning)"
      title: "Attention (machine learning)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
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
Attention는 기계 학습에서 주의는 해당 시퀀스의 다른 구성 요소와 관련하여 시퀀스의 각 구성 요소의 중요성을 결정하는 방법입니다. 자연어 처리에서 중요도는 문장의 각 단어에 할당된 "소프트" 가중치로 표현됩니다. 보다 일반적으로 Attention은 크기가 수천만에서 수백만 개의 토큰에 이르는 고정 너비 시퀀스에 걸쳐 토큰 임베딩이라는 벡터를 인코딩합니다라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
우리는 다양한 기간과 위험 수준에 걸쳐 다양한 유형의 연구에 도움이 되는 환경을 조성하기 위해 노력합니다라는 설명을 함께 보면, Attention가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Attention는 4번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [transformer](/ko/wiki/transformer/)
- [mixture-of-experts](/ko/wiki/mixture-of-experts/)