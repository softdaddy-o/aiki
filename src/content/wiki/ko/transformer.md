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
      summary: "이 페이지를 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자가 먼저 갈라 봐야 할 건 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 Transformer로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "여기서 먼저 갈라 볼 기준은 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 Transformer (deep learning) (https://en.wikipedia.org/wiki/Transformer_(deep_learning))"
        - "같이 본 출처로는 Attention is All You Need (https://research.google/pubs/attention-is-all-you-need/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름부터 다시 보면 Transformer로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "헷갈리지 않으려면 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Transformer는 문장 안의 각 토큰이 다른 토큰과 어떤 관계를 맺는지 attention으로 계산하는 딥러닝 구조야.
## 어떻게 작동하나
이전 언어 모델은 보통 왼쪽에서 오른쪽으로 순서대로 읽는 구조가 많았지만, Transformer는 문장 전체를 보면서 어떤 단어를 더 참고해야 하는지 병렬로 계산해. 그래서 긴 문맥을 더 잘 다루고 GPU 병렬 처리에도 유리해.

지금의 GPT, Claude, Gemini, Llama 계열이 거의 다 이 구조를 바탕으로 발전했다. 그래서 Transformer는 개별 제품 이름이 아니라, 그 제품들이 서 있는 공통 토대에 가까워.
## 왜 중요한가
뉴스에서 새 모델이 나올 때 "트랜스포머를 넘었다"거나 "attention 병목을 줄였다"는 말이 붙으면, 그건 기능 추가보다 모델 내부 구조 변화 이야기일 가능성이 커. 이 구분을 해야 발표문을 과장 없이 읽을 수 있어.
## 관련 용어
- [Attention](/ko/wiki/attention/) — Transformer를 볼 때 비교 포인트는 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지다.
- [Mixture of Experts](/ko/wiki/mixture-of-experts/) — Transformer를 볼 때 비교 포인트는 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지다.