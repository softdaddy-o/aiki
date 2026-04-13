---
term: attention
title: "Attention"
lang: ko
summary: "Attention은 모델이 현재 토큰을 처리할 때 입력 중 무엇을 더 참고해야 하는지 가중치를 두는 메커니즘이야."
readerValue: "이 말이 새 모델 이름이 아니라 내부 구조 변화라는 점을 먼저 읽는 데 도움이 돼."
category: concept
aliases:
  - "Attention"
relatedTerms:
  - transformer
  - mixture-of-experts
firstMentioned: "2026-02-23"
mentionCount: 6
draft: false
tags:
  - architecture
  - transformer
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Attention_(machine_learning)"
      title: "Attention (machine learning)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 보다 일반적으로 Attention은 크기가 수천만에서 수백만 개의 토큰에 이르는 고정 너비 시퀀스에 걸쳐 토큰 임베딩이라는 벡터를 인코딩합니다."
        - "원문을 보면 보다 일반적으로 Attention은 크기가 수천만에서 수백만 개의 토큰에 이르는 고정 너비 시퀀스에 걸쳐 토큰 임베딩이라는 벡터를 인코딩합니다."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 기계 학습에서 주의는 해당 시퀀스의 다른 구성 요소와 관련하여 시퀀스의 각 구성 요소의 중요성을 결정하는 방법입니다."
        - "교차 대조: 기계 학습에서 주의는 해당 시퀀스의 다른 구성 요소와 관련하여 시퀀스의 각 구성 요소의 중요성을 결정하는 방법입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: research.google."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 모델 내부 구조와 효율 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Attention은 문장 전체에서 지금 중요한 정보가 어디 있는지 계산해서, 필요한 부분에 더 큰 비중을 두게 만드는 방식이야.
## 어떻게 작동하나
예를 들어 "그는 컵을 탁자 위에 올려두고 그것을 닦았다" 같은 문장에서 "그것"이 무엇을 가리키는지 판단하려면 앞 문맥을 다시 봐야 해. Attention은 이런 참조 관계를 계산하는 핵심 장치다.

Transformer가 강해진 이유도 바로 이 attention을 병렬로 크게 확장했기 때문이야. 그래서 attention은 세부 부품처럼 보여도 실제로는 현대 LLM 성능의 중심 개념이야.
## 왜 중요한가
모델이 왜 긴 문맥을 잘 처리하거나, 반대로 특정 길이 이상에서 갑자기 흔들리는지 이해하려면 attention부터 알아야 해. 아키텍처 뉴스의 핵심 문장을 읽는 데 필요한 기본 단어다.
## 관련 용어
- [Transformer](/ko/wiki/transformer/) — Transformer와 비교해 보면 모델 내부 구조와 효율에서 어디가 다른지 읽기 쉬워.
- [Mixture of Experts](/ko/wiki/mixture-of-experts/) — Mixture of Experts와 비교해 보면 모델 내부 구조와 효율에서 어디가 다른지 읽기 쉬워.