---
term: transformer
title: "Transformer"
lang: ko
summary: "Transformer는 토큰 사이 관계를 한꺼번에 계산하는 방식으로 현대 LLM 대부분의 기반이 된 신경망 아키텍처다."
readerValue: "이 말이 새 모델 이름이 아니라 내부 구조 변화라는 점을 먼저 읽는 데 도움이 돼."
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
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning)"
      title: "Transformer (deep learning)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 딥러닝에서 변환기는 텍스트가 토큰이라는 숫자 표현으로 변환되고 각 토큰이 단어 임베딩 테이블의 조회를 통해 벡터로 변환되는 다중 헤드 주의 메커니즘을 기반으로 하는 인공 신경망 아키텍처 제품군입니다."
        - "원문을 보면 딥러닝에서 변환기는 텍스트가 토큰이라는 숫자 표현으로 변환되고 각 토큰이 단어 임베딩 테이블의 조회를 통해 벡터로 변환되는 다중 헤드 주의 메커니즘을 기반으로 하는 인공 신경망 아키텍처 제품군입니다."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 딥러닝에서 변환기는 텍스트가 토큰이라는 숫자 표현으로 변환되고 각 토큰이 단어 임베딩 테이블의 조회를 통해 벡터로 변환되는 다중 헤드 주의 메커니즘을 기반으로 하는 인공 신경망 아키텍처 제품군입니다."
        - "교차 대조: 딥러닝에서 변환기는 텍스트가 토큰이라는 숫자 표현으로 변환되고 각 토큰이 단어 임베딩 테이블의 조회를 통해 벡터로 변환되는 다중 헤드 주의 메커니즘을 기반으로 하는 인공 신경망 아키텍처 제품군입니다."
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
Transformer는 문장 안의 각 토큰이 다른 토큰과 어떤 관계를 맺는지 attention으로 계산하는 딥러닝 구조야.
## 어떻게 작동하나
이전 언어 모델은 보통 왼쪽에서 오른쪽으로 순서대로 읽는 구조가 많았지만, Transformer는 문장 전체를 보면서 어떤 단어를 더 참고해야 하는지 병렬로 계산해. 그래서 긴 문맥을 더 잘 다루고 GPU 병렬 처리에도 유리해.

지금의 GPT, Claude, Gemini, Llama 계열이 거의 다 이 구조를 바탕으로 발전했다. 그래서 Transformer는 개별 제품 이름이 아니라, 그 제품들이 서 있는 공통 토대에 가까워.
## 왜 중요한가
뉴스에서 새 모델이 나올 때 "트랜스포머를 넘었다"거나 "attention 병목을 줄였다"는 말이 붙으면, 그건 기능 추가보다 모델 내부 구조 변화 이야기일 가능성이 커. 이 구분을 해야 발표문을 과장 없이 읽을 수 있어.
## 관련 용어
- [Attention](/ko/wiki/attention/) — Attention와 비교해 보면 모델 내부 구조와 효율에서 어디가 다른지 읽기 쉬워.
- [Mixture of Experts](/ko/wiki/mixture-of-experts/) — Mixture of Experts와 비교해 보면 모델 내부 구조와 효율에서 어디가 다른지 읽기 쉬워.