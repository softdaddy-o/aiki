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
  date: "2026-04-10"
  sources:
    - url: "https://en.wikipedia.org/wiki/Attention_(machine_learning)"
      title: "Attention (machine learning)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 Attention로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 Attention (machine learning) (https://en.wikipedia.org/wiki/Attention_(machine_learning))"
        - "같이 본 출처로는 Attention is All You Need (https://research.google/pubs/attention-is-all-you-need/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름부터 다시 보면 Attention로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Attention은 문장 전체에서 지금 중요한 정보가 어디 있는지 계산해서, 필요한 부분에 더 큰 비중을 두게 만드는 방식이야.
## 어떻게 작동하나
예를 들어 "그는 컵을 탁자 위에 올려두고 그것을 닦았다" 같은 문장에서 "그것"이 무엇을 가리키는지 판단하려면 앞 문맥을 다시 봐야 해. Attention은 이런 참조 관계를 계산하는 핵심 장치다. Transformer가 강해진 이유도 바로 이 attention을 병렬로 크게 확장했기 때문이야. 그래서 attention은 세부 부품처럼 보여도 실제로는 현대 LLM 성능의 중심 개념이야.
## 왜 중요한가
모델이 왜 긴 문맥을 잘 처리하거나, 반대로 특정 길이 이상에서 갑자기 흔들리는지 이해하려면 attention부터 알아야 해. 아키텍처 뉴스의 핵심 문장을 읽는 데 필요한 기본 단어다.
## 관련 용어
- [Transformer](/ko/wiki/transformer/) — Attention를 볼 때 비교 포인트는 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지다. - [Mixture of Experts](/ko/wiki/mixture-of-experts/) — Attention를 볼 때 비교 포인트는 모델 내부 구조와 효율를 기사에서 어떤 판단 기준으로 읽어야 하는지다.