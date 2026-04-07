---
term: jax
title: "JAX"
lang: ko
summary: "Python+NumPy 프로그램의 구성 가능한 변환: 차별화, 벡터화, JIT에서 GPU/TPU로 등"
category: framework
aliases:
  - "JAX"
relatedTerms:
  - pytorch
  - alignment
  - fine-tuning
  - google-deepmind
mentionCount: 0
draft: false
tags:
  - training
  - research
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://github.com/jax-ml/jax"
      title: "jax-ml/jax"
    - url: "https://jax.readthedocs.io/en/latest/"
      title: "JAX: High performance array computing &#8212; JAX documentation"
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
JAX는 Python+NumPy 프로그램의 구성 가능한 변환: 차별화, 벡터화, JIT에서 GPU/TPU로 등라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
JAX는 고성능 수치 컴퓨팅 및 대규모 기계 학습을 위해 설계된 가속기 중심 배열 계산 및 프로그램 변환을 위한 Python 라이브러리입니다라는 설명을 함께 보면, JAX가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
JAX는 최근 AI 제품, 모델, 워크플로를 읽을 때 기본 맥락을 잡아주는 용어다.
## 관련 용어
- [pytorch](/ko/wiki/pytorch/)
- [alignment](/ko/wiki/alignment/)
- [fine-tuning](/ko/wiki/fine-tuning/)
- [google-deepmind](/ko/wiki/google-deepmind/)