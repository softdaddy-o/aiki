---
term: attention
title: "Attention (어텐션)"
lang: ko
summary: "Attention은 새 모델 이름이 아니라, 모델이 문맥 안에서 어떤 토큰을 얼마나 참고할지 계산하는 내부 메커니즘이야. 현재 위치와 다른 위치들의 관련도를 점수로 만들고 그 비중을 섞어 다음 표현을 만든다는 점이 중요해."
readerValue: "Attention이 제품명이나 기능 이름이 아니라 Transformer 같은 구조 안에서 정보 참고 범위를 정하는 계산 방식이라는 점을 먼저 잡을 수 있어."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "Attention (어텐션)"
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
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Attention_(machine_learning)"
      title: "Attention (machine learning)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "attention을 문맥 내 중요도 계산 메커니즘으로 설명한 방향을 제공된 출처와 맞춰봤어."
      items:
        - "독자 문제 대조: 새 모델 이름이 아니라 내부 구조 변화라는 점을 먼저 읽게 하려는 요구를 첫 문장에 반영했어."
        - "토큰 간 관련도 계산과 비중 반영을 작동 설명에 그대로 녹였어."
      findings:
        - "Transformer 맥락 연결도 논문 제목이 가리키는 범위를 넘지 않게 정리했어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "개념 설명과 Transformer 논문 맥락이 충돌하지 않는 범위만 남겼어."
      items:
        - "비교 기준: 위키 요약의 일반 개념 정의와 논문이 보여 준 Transformer 핵심 메커니즘이라는 맥락을 함께 놓고 대조했어."
        - "긴 시퀀스에서 토큰 관계를 다룬다는 설명은 두 출처와 어긋나지 않아."
      findings:
        - "attention을 독립 모델이나 제품 기능 이름처럼 설명하는 표현은 모두 피했어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "고정 수치나 비율은 넣지 않고 원리 중심으로 설명했어."
      items:
        - "헤드 수나 차원 수 같은 구조 세부 값은 본문에 넣지 않았어."
        - "비용 증가는 방향 설명만 두고 임의 수치로 단정하지 않았어."
      findings:
        - "메커니즘 이해에 꼭 필요한 범위만 남겨 수치 과장을 줄였어."
    - type: adversarial
      result: pass
      sources: 2
      summary: "attention을 둘러싼 흔한 오해를 먼저 차단했어."
      items:
        - "Attention을 제품명, 모델 계열, 기능 브랜드로 오해하지 않게 했어."
        - "attention 점수가 곧 모델의 이유 설명 전체라는 식의 과한 해석을 막았어."
      findings:
        - "Attention이라는 영어 표기만 보면 새 모델 이름처럼 들릴 수 있어서 개념과 제품명을 섞어 읽는 걸 특히 조심해야 해."
---
## 한 줄 정의
Attention은 모델이 입력 안의 여러 토큰 사이 관계를 계산해서 지금 위치를 만들 때 무엇을 얼마나 반영할지 정하는 내부 메커니즘이야. 새 모델 이름이나 브랜드가 아니라 문맥 속 정보의 비중을 정하는 계산 규칙이라고 보면 돼.
## 어떻게 작동하나
모델은 지금 처리 중인 위치와 문맥의 다른 위치들을 서로 비교해서 관련도 점수를 만들어. 그 점수를 비중 형태로 바꾼 뒤 중요한 토큰 정보는 더 크게, 덜 중요한 토큰 정보는 더 작게 섞어서 현재 표현을 다시 만들어. 이렇게 만들어진 표현은 다음 층 계산과 다음 토큰 예측에 바로 쓰여.
## 왜 중요한가
Transformer 계열 모델이 긴 문맥을 다루는 방식을 이해하려면 attention을 알아야 해. 필요한 위치를 직접 참조해 현재 계산에 끌어올 수 있기 때문에 번역, 요약, 질의응답, 코드 생성 같은 작업에서 차이가 크게 나. 기사에서 attention을 줄였다고 하거나 다른 방식으로 바꿨다고 하면, 그건 새 모델 이름보다 내부 구조와 비용 구조가 달라졌다는 뜻에 더 가까워.
## 주의해서 볼 점
Attention이 강력하다고 해서 공짜는 아니야. 입력이 길어질수록 비교해야 할 관계가 많아져서 계산량과 메모리 사용이 빠르게 커질 수 있어. 또 attention 점수는 참고 비중을 보여 주는 신호일 뿐이라서 그것만 보고 모델 내부 판단 전체가 투명하게 드러난다고 생각하면 과한 해석이 돼.
## 관련 용어
- **Transformer (트랜스포머)**: Transformer는 attention을 중심 부품으로 삼아 층을 쌓은 전체 아키텍처야. Attention이 문맥 참조 방식이라면 Transformer는 그 방식을 실제 모델 설계로 확장한 틀이야.
- **Mixture of Experts (전문가 혼합)**: Mixture of Experts는 어떤 전문가 모듈을 호출할지 고르는 구조야. Attention은 문맥 안에서 어떤 토큰 정보를 더 반영할지 정하는 구조라서 둘은 같은 효율 최적화 이야기처럼 보여도 역할이 달라.
