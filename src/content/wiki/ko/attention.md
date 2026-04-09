---
term: attention
title: "Attention"
lang: ko
summary: "Attention은 모델이 현재 토큰을 처리할 때 입력 중 무엇을 더 참고해야 하는지 가중치를 두는 메커니즘이다."
readerValue: "이 말이 새 모델 이름이 아니라 내부 구조 변화라는 점을 먼저 읽게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Attention_(machine_learning)"
      title: "Attention (machine learning)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Attention"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Attention (machine learning) (https://en.wikipedia.org/wiki/Attention_(machine_learning))"
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
Attention은 문장 전체에서 지금 중요한 정보가 어디 있는지 계산해서, 필요한 부분에 더 큰 비중을 두게 만드는 방식이다.
## 어떻게 작동하나
예를 들어 "그는 컵을 탁자 위에 올려두고 그것을 닦았다" 같은 문장에서 "그것"이 무엇을 가리키는지 판단하려면 앞 문맥을 다시 봐야 한다. Attention은 이런 참조 관계를 계산하는 핵심 장치다.

Transformer가 강해진 이유도 바로 이 attention을 병렬로 크게 확장했기 때문이다. 그래서 attention은 세부 부품처럼 보여도 실제로는 현대 LLM 성능의 중심 개념이다.
## 왜 중요한가
모델이 왜 긴 문맥을 잘 처리하거나, 반대로 특정 길이 이상에서 갑자기 흔들리는지 이해하려면 attention부터 알아야 한다. 아키텍처 뉴스의 핵심 문장을 읽는 데 필요한 기본 단어다.
## 관련 용어
- [Transformer](/ko/wiki/transformer/) — 모델 내부 구조를 같이 읽을 때 이해가 쉬워진다.
- [Mixture of Experts](/ko/wiki/mixture-of-experts/) — 모델 내부 구조를 같이 읽을 때 이해가 쉬워진다.