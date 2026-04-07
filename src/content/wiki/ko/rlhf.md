---
term: rlhf
title: "RLHF"
lang: ko
summary: "기계 학습에서 인간 피드백 강화 학습(RLHF)은 지능형 에이전트를 인간 선호도에 맞추는 기술입니다."
category: technique
aliases:
  - "reinforcement learning from human feedback"
relatedTerms:
  - pytorch
  - alignment
  - fine-tuning
  - distillation
mentionCount: 0
draft: false
tags:
  - alignment
  - training
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback"
      title: "Reinforcement learning from human feedback"
    - url: "https://huggingface.co/blog/rlhf"
      title: "Illustrating Reinforcement Learning from Human Feedback (RLHF)"
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
RLHF는 기계 학습에서 인간 피드백 강화 학습(RLHF)은 지능형 에이전트를 인간 선호도에 맞추는 기술입니다. 여기에는 선호도를 나타내기 위해 보상 모델을 교육하는 작업이 포함되며, 강화 학습을 통해 다른 모델을 교육하는 데 사용할 수 있습니다라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
우리는 오픈 소스와 오픈 사이언스를 통해 인공 지능을 발전시키고 민주화하기 위한 여정을 진행하고 있습니다라는 설명을 함께 보면, RLHF가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
RLHF는 최근 AI 제품, 모델, 워크플로를 읽을 때 기본 맥락을 잡아주는 용어다.
## 관련 용어
- [pytorch](/ko/wiki/pytorch/)
- [alignment](/ko/wiki/alignment/)
- [fine-tuning](/ko/wiki/fine-tuning/)
- [distillation](/ko/wiki/distillation/)