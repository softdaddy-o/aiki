---
term: fine-tuning
title: "Fine-tuning"
lang: ko
summary: "Fine-tuning은 이미 학습된 기반 모델을 특정 데이터로 추가 학습시켜 원하는 작업에 더 맞게 조정하는 방법이야."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르는 기준이 돼."
category: technique
aliases:
  - "fine tuning"
relatedTerms:
  - pytorch
  - alignment
  - distillation
  - rlhf
firstMentioned: "2026-03-18"
mentionCount: 4
draft: false
tags:
  - adaptation
  - training
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning)"
      title: "Fine-tuning (deep learning)"
    - url: "https://platform.openai.com/docs/guides/fine-tuning"
      title: "Model optimization | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 LLM 출력은 비결정적이며 모델 스냅샷과 제품군 간에 모델 동작이 변경됩니다."
        - "원문을 보면 LLM 출력은 비결정적이며 모델 스냅샷과 제품군 간에 모델 동작이 변경됩니다."
        - "별칭 대조: fine tuning도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 LLM 출력은 비결정적이며 모델 스냅샷과 제품군 간에 모델 동작이 변경됩니다."
        - "교차 대조: LLM 출력은 비결정적이며 모델 스냅샷과 제품군 간에 모델 동작이 변경됩니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: platform.openai.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 학습과 비용 최적화 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 새 제품명으로 받아들이면 실제로는 기존 모델 위에 얹는 방법론이라는 점을 놓치기 쉬워."
        - "헷갈리기 쉬운 건 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Fine-tuning은 베이스 모델을 그대로 새로 만드는 대신, 특정 작업이나 도메인에 맞게 추가로 학습시키는 적응 기법이야.
## 어떻게 작동하나
예를 들어 회사 내부 문체에 맞는 답변, 특정 형식의 분류 작업, 좁은 전문 분야 용어 처리가 필요할 때 파인튜닝을 쓴다. 프롬프트만으로는 잘 안 잡히는 패턴을 모델 가중치에 직접 반영하는 셈이야.

다만 최신 지식을 넣는 목적이라면 RAG가 더 적합한 경우가 많아. 파인튜닝은 "무엇을 알고 있나"보다 "어떻게 말하고 반응하나"를 바꾸는 데 더 강한 편이야.
## 왜 중요한가
파인튜닝을 이해해야 RAG, 프롬프트 엔지니어링, 모델 교체 중 무엇이 맞는 해법인지 구분할 수 있어. 실무에선 비용과 유지보수 판단이 여기서 갈려.
## 관련 용어
- [PyTorch](/ko/wiki/pytorch/) — 같이 보면 학습·압축 전략 맥락을 같이 이해하는 데 도움이 돼.
- [Alignment](/ko/wiki/alignment/) — 같이 보면 학습·압축 전략 맥락을 같이 이해하는 데 도움이 돼.
- [Distillation](/ko/wiki/distillation/) — Distillation와 비교해 보면 학습과 비용 최적화에서 어디가 다른지 읽기 쉬워.
- [RLHF](/ko/wiki/rlhf/) — RLHF와 비교해 보면 학습과 비용 최적화에서 어디가 다른지 읽기 쉬워.