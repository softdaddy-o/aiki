---
term: diffusion
title: "Diffusion Model"
lang: ko
summary: "기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다."
category: concept
aliases:
  - "diffusion model"
relatedTerms:
  - stable-diffusion
  - dall-e
  - flux
  - imagen
firstMentioned: "2026-02-23"
mentionCount: 2
draft: false
tags:
  - image-generation
  - generative-ai
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Diffusion_model"
      title: "Diffusion model"
    - url: "https://stability.ai/blog/stable-diffusion-public-release"
      title: "Stable Diffusion Public Release &mdash; Stability AI"
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
Diffusion Model는 기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다. 확산 모델은 순방향 확산 프로세스와 역방향 샘플링 프로세스라는 두 가지 주요 구성 요소로 구성됩니다. 확산 모델의 목표는 주어진 데이터 세트에 대한 확산 프로세스를 학습하여 프로세스가 원래 데이터 세트와 유사하게 분포된 새로운 요소를 생성할 수 있도록 하는 것입니다. 확산 모델은 확산 프로세스에 의해 생성된 데이터를 모델링하며, 이에 따라…
## 어떻게 작동하나
Stable Diffusion의 공개 출시와 DreamStudio Lite의 출시를 발표하게 되어 기쁘게 생각합니다라는 설명을 함께 보면, Diffusion Model가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Diffusion Model는 2번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [stable-diffusion](/ko/wiki/stable-diffusion/)
- [dall-e](/ko/wiki/dall-e/)
- [flux](/ko/wiki/flux/)
- [imagen](/ko/wiki/imagen/)