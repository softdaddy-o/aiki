---
term: synthetic-data
title: "Synthetic Data(합성 데이터)"
lang: ko
summary: "Synthetic Data(합성 데이터)는 실제 데이터를 바로 쓰기 어려울 때, 비슷한 특성을 흉내 낸 데이터를 만들어 학습과 테스트에 쓰는 방식이야."
readerValue: "이 말을 보면 성능 꼼수인지, 데이터 부족과 개인정보 문제를 푸는 실무 카드인지 빨리 가를 수 있어."
category: technique
aliases:
  - "synthetic data"
relatedTerms:
  - benchmark
mentionCount: 0
draft: false
tags:
  - training-data
  - evaluation
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Synthetic_data"
      title: "Synthetic data"
    - url: "https://www.ibm.com/think/topics/synthetic-data"
      title: "What Is Synthetic Data? | IBM"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "정의와 쓰임새가 원문 축이랑 맞는지 맞춰봤어."
      items:
        - "독자 문제 대조: 이 글은 Synthetic Data를 먼저 실데이터 대체 재료로 잡아서 성능 꼼수처럼 읽히지 않게 했어."
        - "원문 대조: 백과 설명과 IBM 설명 모두 실제 데이터를 흉내 낸 인공 데이터라는 축을 공통으로 말하고 있었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "백과 설명과 기업 설명이 같은 범위를 말하는지 다시 봤어."
      items:
        - "비교 기준: 단순 랜덤 데이터가 아니라 실제 데이터 특성을 모사한 실무용 데이터인지 비교해 봤어."
        - "교차검증: 두 출처 다 학습, 테스트, 개인정보 회피 같은 맥락에서 Synthetic Data를 설명하고 있었어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "변동 큰 효과 숫자는 빼고 개념 중심으로 줄였어."
      items:
        - "숫자 점검: 정확도 향상치나 비용 절감 비율처럼 출처마다 달라질 수 있는 숫자는 본문에 안 넣었어."
        - "표현 점검: 데이터 규모나 생성 속도 같은 가변 수치 대신 역할과 한계만 남겼어."
    - type: adversarial
      result: pass
      summary: "실데이터를 완전히 대체한다는 오해가 커질 부분은 막았어."
      items:
        - "흔한 오해 점검: Synthetic Data만 있으면 현실 데이터 없이도 충분하다고 읽기 쉬운 부분을 경계했어."
        - "반례 점검: 현실 분포를 못 닮으면 모델이 배포 후에 무너질 수 있다는 한계를 본문에 남겼어."
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "33d50a3a53f496e7"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Synthetic Data는 실제 기록을 그대로 모은 데이터가 아니라, 실제 데이터의 패턴을 흉내 내서 만든 인공 데이터야. 핵심은 가짜라는 말보다 [학습](/ko/wiki/training/), 테스트, 평가에 쓸 대체 재료라는 점이야.
## 어떻게 작동하나
기존 데이터 분포를 통계적으로 본떠 샘플을 만들거나, 시뮬레이터로 장면을 만든 뒤 데이터셋을 뽑아내거나, 생성 모델로 새 예시를 찍어 내는 식으로 만들어. 실무에선 희귀 오류 사례를 늘리거나 개인정보가 섞인 원본을 바로 못 쓸 때 임시 데이터셋을 채우는 데 많이 써.
## 왜 중요한가
실데이터는 비싸고 느리게 모이고, 드문 사례는 더더욱 부족해서 모델을 바로 굴리기 어려울 때가 많아. Synthetic Data는 그 공백을 메워서 초기 실험 속도를 올리고 테스트 범위를 넓히는 데 도움돼.
## 주의해서 볼 점
합성 데이터가 현실 분포를 충분히 못 닮으면 모델이 너무 깨끗한 세상만 배운 채로 배포될 수 있어. 그래서 원본 데이터를 완전히 대체하는 만능 해법으로 보기보다, 실데이터 검증을 보조하는 장치로 보는 쪽이 안전해.
## 관련 용어
- [Benchmark](/ko/wiki/benchmark/)는 모델을 어떤 기준으로 재는지 정한 테스트 셋이나 절차야. Synthetic Data를 벤치마크에 넣을 땐 실제 사용 상황을 얼마나 닮았는지 따로 확인해야 해.
- 데이터 증강은 기존 데이터를 조금 변형해서 양을 늘리는 쪽이고, Synthetic Data는 새 샘플 자체를 더 적극적으로 만들어 내는 쪽이야. 둘은 같이 쓰이기도 하지만 같은 말은 아니야.
