---
term: fine-tuning
title: "Fine-tuning"
lang: ko
summary: "Fine-tuning은 이미 학습된 기반 모델을 특정 데이터로 추가 학습시켜 원하는 작업에 더 맞게 조정하는 방법이다."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
category: technique
aliases:
  - "fine tuning"
relatedTerms:
  - pytorch
  - alignment
  - distillation
  - rlhf
firstMentioned: "2026-03-18"
mentionCount: 3
draft: false
tags:
  - adaptation
  - training
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning)"
      title: "Fine-tuning (deep learning)"
    - url: "https://platform.openai.com/docs/guides/fine-tuning"
      title: "Model optimization | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Fine-tuning"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Fine-tuning (deep learning) (https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning))"
        - "Model optimization | OpenAI API (https://platform.openai.com/docs/guides/fine-tuning)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Fine-tuning은 베이스 모델을 그대로 새로 만드는 대신, 특정 작업이나 도메인에 맞게 추가로 학습시키는 적응 기법이다.
## 어떻게 작동하나
예를 들어 회사 내부 문체에 맞는 답변, 특정 형식의 분류 작업, 좁은 전문 분야 용어 처리가 필요할 때 파인튜닝을 쓴다. 프롬프트만으로는 잘 안 잡히는 패턴을 모델 가중치에 직접 반영하는 셈이다.

다만 최신 지식을 넣는 목적이라면 RAG가 더 적합한 경우가 많다. 파인튜닝은 "무엇을 알고 있나"보다 "어떻게 말하고 반응하나"를 바꾸는 데 더 강한 편이다.
## 왜 중요한가
파인튜닝을 이해해야 RAG, 프롬프트 엔지니어링, 모델 교체 중 무엇이 맞는 해법인지 구분할 수 있다. 실무에서는 비용과 유지보수 판단이 여기서 갈린다.
## 관련 용어
- [PyTorch](/ko/wiki/pytorch/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [Alignment](/ko/wiki/alignment/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.
- [Distillation](/ko/wiki/distillation/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [RLHF](/ko/wiki/rlhf/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.