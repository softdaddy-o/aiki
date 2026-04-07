---
term: transformer
title: "Transformer"
lang: ko
summary: "딥러닝에서 변환기는 텍스트가 토큰이라는 숫자 표현으로 변환되고 각 토큰이 단어 임베딩 테이블의 조회를 통해 벡터로 변환되는 다중 헤드 주의 메커니즘을 기반으로 하는 인공 신경망 아키텍처 제품군입니다."
category: concept
aliases:
  - "Transformer"
relatedTerms:
  - attention
  - mixture-of-experts
firstMentioned: "2023-03-14"
mentionCount: 4
draft: false
tags:
  - architecture
  - attention
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning)"
      title: "Transformer (deep learning)"
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
Transformer는 딥러닝에서 변환기는 텍스트가 토큰이라는 숫자 표현으로 변환되고 각 토큰이 단어 임베딩 테이블의 조회를 통해 벡터로 변환되는 다중 헤드 주의 메커니즘을 기반으로 하는 인공 신경망 아키텍처 제품군입니다. 각 계층에서 각 토큰은 병렬 멀티헤드 어텐션 메커니즘을 통해 다른(마스크 해제된) 토큰과 함께 컨텍스트 창 범위 내에서 컨텍스트화되어 키 토큰에 대한 신호가 증폭되고 덜 중요한 토큰이 감소될 수 있습니다라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
우리는 다양한 기간과 위험 수준에 걸쳐 다양한 유형의 연구에 도움이 되는 환경을 조성하기 위해 노력합니다라는 설명을 함께 보면, Transformer가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Transformer는 4번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [attention](/ko/wiki/attention/)
- [mixture-of-experts](/ko/wiki/mixture-of-experts/)