---
term: transformer
title: "Transformer"
lang: ko
summary: "Transformer는 토큰 사이 관계를 한꺼번에 계산하는 방식으로 현대 LLM 대부분의 기반이 된 신경망 아키텍처다."
readerValue: "이 말이 새 모델 이름이 아니라 내부 구조 변화라는 점을 먼저 읽게 해준다."
category: concept
aliases:
  - "Transformer"
relatedTerms:
  - attention
  - mixture-of-experts
firstMentioned: "2018-10-11"
mentionCount: 3
draft: false
tags:
  - architecture
  - attention
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning)"
      title: "Transformer (deep learning)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Transformer"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Transformer (deep learning) (https://en.wikipedia.org/wiki/Transformer_(deep_learning))"
        - "Attention is All You Need (https://research.google/pubs/attention-is-all-you-need/)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Transformer는 문장 안의 각 토큰이 다른 토큰과 어떤 관계를 맺는지 attention으로 계산하는 딥러닝 구조다.
## 어떻게 작동하나
이전 언어 모델은 보통 왼쪽에서 오른쪽으로 순서대로 읽는 구조가 많았지만, Transformer는 문장 전체를 보면서 어떤 단어를 더 참고해야 하는지 병렬로 계산한다. 그래서 긴 문맥을 더 잘 다루고 GPU 병렬 처리에도 유리하다.

지금의 GPT, Claude, Gemini, Llama 계열이 거의 다 이 구조를 바탕으로 발전했다. 그래서 Transformer는 개별 제품 이름이 아니라, 그 제품들이 서 있는 공통 토대에 가깝다.
## 왜 중요한가
뉴스에서 새 모델이 나올 때 "트랜스포머를 넘었다"거나 "attention 병목을 줄였다"는 말이 붙으면, 그건 기능 추가보다 모델 내부 구조 변화 이야기일 가능성이 크다. 이 구분을 해야 발표문을 과장 없이 읽을 수 있다.
## 관련 용어
- [Attention](/ko/wiki/attention/) — 모델 내부 구조를 같이 읽을 때 이해가 쉬워진다.
- [Mixture of Experts](/ko/wiki/mixture-of-experts/) — 모델 내부 구조를 같이 읽을 때 이해가 쉬워진다.