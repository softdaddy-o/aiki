---
term: transformer
title: "Transformer (트랜스포머)"
lang: ko
summary: "Transformer는 토큰 사이의 관계를 attention으로 계산해 문맥을 다루는 신경망 아키텍처다. GPT 계열을 포함한 현대 언어 모델의 공통 바탕으로 널리 쓰였고, 새 모델 이름이라기보다 모델 내부 설계 방식을 가리키는 말로 이해하는 편이 맞아."
readerValue: "Transformer가 제품명이나 브랜드명이 아니라 모델 안쪽 계산 구조를 뜻한다는 점부터 잡아두면, 기사에서 말하는 '아키텍처 변화'와 '모델 출시'를 헷갈리지 않고 읽을 수 있어."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "Transformer (트랜스포머)"
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
    - url: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)"
      title: "Transformer (deep learning architecture)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
  checks:
    - type: source_match
      result: pass
      summary: "정의와 독자 초점을 제공된 출처 요약, 기존 문서 방향, reader focus와 맞춰봤어."
      items:
        - "독자 문제 대조: Transformer를 새 모델 이름이 아니라 내부 구조 변화로 먼저 설명해 달라는 요구를 첫 섹션과 요약에 반영했어."
        - "'attention으로 토큰 관계를 계산하는 아키텍처'라는 핵심 정의가 현재 문서 발췌와 충돌하지 않는지 다시 봤어."
        - "관련 용어는 단순 나열 대신 Attention은 계산 방식, Mixture of Experts는 확장 전략이라는 대비로 풀었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "원 논문 소개 페이지와 백과 요약을 서로 대조해 핵심 설명이 한쪽에만 기대지 않게 다시 봤어."
      items:
        - "비교 기준: Transformer가 제품명이 아니라 딥러닝 아키텍처인지, 그리고 attention 중심 구조인지 두 출처에서 같은 방향으로 설명하는지 확인했어."
        - "Google Research의 'Attention is All You Need' 소개는 Transformer를 recurrence와 convolution 없이 attention만으로 구성한 새 아키텍처라고 설명해."
        - "Wikipedia 요약도 Transformer를 현대 딥러닝, 특히 자연어 처리에 쓰이는 아키텍처로 정리해서 본문 방향과 어긋나지 않았어."
    - type: number_verify
      result: pass
      summary: "본문에 넣은 수치성 판단과 연도 맥락이 과장되지 않도록 논문에 나온 숫자를 한 번 더 봤어."
      items:
        - "원 논문 소개 페이지에는 2017년 NIPS 논문으로 표시돼 있고, Transformer의 최초 제안 시점을 그 기준으로 이해하는 게 맞아."
        - "같은 페이지에 28.4 BLEU, 41.0 BLEU, 3.5일, 8 GPUs 같은 성능 수치가 제시돼 있지만, 이번 본문은 개념 설명 중심이라 그 숫자를 전면에 세우지 않았어."
        - "'긴 문맥과 병렬 계산에 유리하다'는 서술은 수치 자랑이 아니라 구조적 성격 설명으로만 제한했어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 오해를 먼저 세워 놓고 문장이 그 오해를 키우지 않는지 맞춰봤어."
      items:
        - "가장 흔한 오해는 Transformer를 GPT처럼 개별 서비스나 모델 이름으로 읽는 거라서, 첫 문단에서 구조라는 점을 못 박았어."
        - "두 번째 오해는 Attention과 Transformer를 같은 뜻으로 쓰는 건데, 관련 용어에서 계산 방식과 전체 아키텍처를 분리해 설명했어."
        - "세 번째 오해는 Transformer면 무조건 최신이고 최고라는 식의 단정인데, 비용 문제와 각종 변형이 계속 나온다는 점을 주의 섹션에 넣었어."
      findings:
        - "Transformer는 브랜드명이 아니라 아키텍처라는 점을 흐리면 기사 해석이 바로 틀어질 수 있어."
        - "Attention을 설명했다고 Transformer 전체를 설명한 셈은 아니라는 점을 따로 구분해야 해."
---
## 한 줄 정의
Transformer는 문장이나 입력 안에 있는 토큰들이 서로 어떤 부분을 참고해야 하는지 attention으로 계산하는 신경망 아키텍처야. 중요한 점은 이게 새 모델 이름이 아니라, 여러 모델이 공통으로 깔고 가는 내부 구조라는 거야.
## 어떻게 작동하나
입력이 들어오면 각 토큰은 다른 토큰들과의 관련성을 점수처럼 계산하고, 그 결과를 바탕으로 자기 표현을 계속 업데이트해. 그래서 앞의 몇 글자만 순서대로 끌고 가는 방식보다 문장 전체의 관계를 더 직접적으로 반영할 수 있어.
초기의 Transformer는 encoder와 decoder로 나뉘었고, 이후 언어 모델에서는 decoder 중심 구조가 많이 쓰였어. 핵심은 recurrence 없이 attention을 중심에 두고 계산을 조직한다는 점이라서, 긴 문맥 처리와 병렬 계산에 유리한 기반을 만들었어.
## 왜 중요한가
실무에서는 Transformer를 이해해야 모델 성능 얘기와 인프라 얘기를 같이 읽을 수 있어. 왜 GPU를 많이 쓰는지, 왜 긴 컨텍스트에서 비용이 커지는지, 왜 attention 최적화가 자주 화제가 되는지가 이 구조와 바로 연결돼 있어.
기사 해석에서도 중요해. '트랜스포머를 넘었다', 'attention 병목을 줄였다', '새 아키텍처를 썼다' 같은 표현은 보통 앱 기능 추가가 아니라 모델 내부 설계가 바뀌었다는 뜻이야. 그래서 이 단어를 제품 라인업처럼 읽으면 발표 내용을 잘못 이해하기 쉬워.
## 주의해서 볼 점
Transformer가 강력한 구조인 건 맞지만, attention 계산 비용이 입력 길이에 따라 빠르게 커진다는 약점도 같이 따라와. 그래서 긴 문서를 다루거나 실시간 처리가 중요한 환경에서는 attention 자체를 줄이거나 우회하는 변형이 계속 나와.
또 Transformer 하나만 안다고 모델 전체를 다 안 건 아니야. 학습 데이터, 파라미터 수, 추론 최적화, 안전성 조정이 결과를 크게 바꾸기 때문이야. 현실에서는 'Transformer 기반'이라는 말보다 어떤 변형을 얹었는지가 성능 차이를 더 크게 만들 때도 많아.
## 관련 용어
- [Attention](/ko/wiki/attention/) — Attention은 토큰끼리 무엇을 얼마나 참고할지 정하는 계산 방식이고, Transformer는 그 attention을 중심으로 모델 전체를 짜는 아키텍처야. 둘을 같은 뜻으로 보면 계산 규칙과 전체 설계를 구분하지 못하게 돼.
- [Mixture of Experts](/ko/wiki/mixture-of-experts/) — Mixture of Experts는 입력마다 일부 전문가 모듈만 골라 쓰는 방식이야. Transformer가 기본 뼈대라면, Mixture of Experts는 그 뼈대 위에 계산량과 용량을 조절하려고 얹는 확장 전략에 가까워.