---
term: attention
title: Attention (어텐션)
lang: ko
summary: >-
  Attention은 새 모델 이름이 아니라, 모델이 문맥 안에서 어떤 토큰을 얼마나 참고할지 계산하는 내부 메커니즘이야. 현재 위치와 다른
  위치들의 관련도를 점수로 만들고 그 비중을 섞어 다음 표현을 만든다는 점이 중요해.
readerValue: >-
  Attention이 제품명이나 기능 이름이 아니라 Transformer 같은 구조 안에서 정보 참고 범위를 정하는 계산 방식이라는 점을 먼저
  잡을 수 있어.
category: concept
formatVersion: 2
aliases:
  - Attention (어텐션)
relatedTerms:
  - transformer
  - mixture-of-experts
firstMentioned: '2026-02-23'
mentionCount: 6
draft: false
tags:
  - architecture
  - transformer
factCheck:
  status: passed
  date: '2026-04-25'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Attention_(machine_learning)'
      title: Attention (machine learning)
    - url: 'https://research.google/pubs/attention-is-all-you-need/'
      title: Attention is All You Need
    - url: 'https://www.ibm.com/think/topics/attention-mechanism'
      title: What is an attention mechanism?
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: 본문이 attention을 독립 제품이 아니라 토큰 간 관련도를 계산해 정보 반영 비중을 정하는 메커니즘으로 설명하는지 출처 정의와 대조했다.
      items:
        - 첫 문장이 attention을 새 모델 이름이 아니라 입력 안의 여러 토큰 관계를 계산하는 내부 메커니즘으로 규정하는지 확인했다.
        - 독자가 attention을 모델명이나 제품명으로 오해하지 않게 첫 문장과 다음 문장이 모두 내부 계산 메커니즘이라는 점을 직접 못 박는지 확인했다.
        - 작동 설명이 query, key, value를 통해 관련도 점수를 만들고 가중합으로 표현을 갱신한다는 기본 구조와 어긋나지 않는지 확인했다.
        - 비용 설명이 긴 입력에서 관계 수가 늘어 계산량과 메모리 부담이 커진다는 자기주의 메커니즘의 일반적 특성을 정확히 반영하는지 확인했다.
      findings:
        - Transformer와 Mixture of Experts 비교는 각각 전체 아키텍처와 모듈 선택 구조라는 범위로 제한해 역할 혼동을 줄였다.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 논문, 백과 설명, 독립 해설을 교차 확인해 attention 설명이 한 논문의 문맥에만 갇히지 않도록 정리했다.
      items:
        - 논문식 정의 vs 독립 해설이라는 비교축으로, 수식 중심 설명과 일반 독자용 설명이 모두 attention을 토큰 간 관련도 계산으로 수렴하는지 대조했다.
        - Wikipedia의 일반 정의와 IBM 설명이 모두 attention을 입력 요소별 중요도 계산으로 설명하는지 대조했고 본문 정의를 그 공통분모에 맞췄다.
        - Transformer 논문의 scaled dot-product attention 식 `softmax(QK^T / √d_k)V`를 본문의 작동 앵커로 삼아 수식 설명이 원 논문 표현과 충돌하지 않는지 확인했다.
        - 긴 시퀀스에서 비용이 커진다는 본문 경고가 논문의 self-attention 복잡도 표와 독립 설명의 비용 서술 양쪽에서 일관되게 지지되는지 확인했다.
      findings:
        - attention을 모델 이름이나 브랜드 기능처럼 읽히게 하는 표현은 제거했고, 비교가 필요한 용어는 본문 인라인 링크로만 남겼다.
    - type: number_verify
      result: pass
      sources: 3
      summary: 본문에 넣은 수식과 예시 숫자를 직접 검산하고, 넣지 않은 수치 주장도 따로 기록해 과장 범위를 통제했다.
      items:
        - 논문 식 `Attention(Q, K, V) = softmax(QK^T / √d_k)V`의 스케일 항이 `√d_k`인지 다시 대조했고, `1/d_k`나 다른 정규화 항으로 바꾸지 않았다.
        - 관계 수 예시는 `n × n` 기준으로 계산해 4,096 토큰에서 `4,096² = 16,777,216`, 8,192 토큰에서 `8,192² = 67,108,864`임을 검산했다.
        - 본문에는 특정 상용 모델의 컨텍스트 길이, 실제 GPU 메모리 사용량, 처리 속도 수치는 넣지 않았고 출처가 달라질 수 있는 벤치마크 수치도 의도적으로 제외했다.
      findings:
        - 수치는 메커니즘 규모를 감잡는 최소 예시와 논문 앵커만 남기고, 환경 의존적인 성능 수치는 보수적으로 비워 뒀다.
    - type: adversarial
      result: pass
      sources: 3
      summary: 독자가 attention을 만능 해석 도구나 별도 모델 계열로 오해할 수 있는 지점을 문장 단위로 점검했다.
      items:
        - attention을 제품명, 모델 계열, 브랜드 기능처럼 읽을 여지가 남지 않도록 첫 문장과 비교 문장을 점검했다.
        - attention 점수가 곧 모델의 이유 설명 전체라는 과잉 해석을 막기 위해 점수는 참고 비중 신호일 뿐이라는 경고를 유지했다.
        - Transformer와 Mixture of Experts를 같은 효율화 기법으로 뭉뚱그려 읽지 않도록 하나는 토큰 관계 계산, 다른 하나는 전문가 모듈 선택이라는 대비를 본문 안에 배치했다.
      findings:
        - 관련 용어 독립 섹션을 없애고 비교를 본문 흐름 안으로 옮겨, 용어 사전처럼 따로 떼어 읽을 때 생기는 오독 가능성을 줄였다.
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
  contentHash: "b2eb329d6736628b"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
Attention은 모델이 입력 안의 여러 [토큰](/ko/wiki/token/) 사이 관계를 계산해서 지금 위치를 만들 때 무엇을 얼마나 반영할지 정하는 내부 메커니즘이야. 새 모델 이름이나 브랜드가 아니라 문맥 속 정보의 비중을 정하는 계산 규칙이라고 보면 돼.
## 어떻게 작동하나
Attention은 구조 안에서 정보 참고 범위를 정하는 계산이라, 지금 위치의 query와 문맥 각 위치의 key를 비교해 관련도 점수를 만들고 그 가중치로 value를 섞는 과정으로 이해하면 돼. 흔히 `Attention(Q, K, V) = softmax(QK^T / √d_k)V`처럼 적는데, 핵심은 현재 위치가 문맥 어디를 얼마나 참고할지 점수로 정한 뒤 그 비중만큼 정보를 다시 모으는 데 있어. 모델은 이렇게 중요한 [토큰](/ko/wiki/token/) 정보는 더 크게, 덜 중요한 [토큰](/ko/wiki/token/) 정보는 더 작게 섞어서 현재 표현을 만들고, 그 결과를 다음 층 계산과 다음 [토큰](/ko/wiki/token/) 예측에 바로 써.
## 왜 중요한가
[Transformer](/ko/wiki/transformer/)는 attention을 중심 부품으로 엮은 전체 아키텍처라서, 긴 문맥을 다루는 방식을 이해하려면 attention을 먼저 알아야 해. 필요한 위치를 직접 참조해 현재 계산에 끌어올 수 있기 때문에 번역, 요약, 질의응답, 코드 생성 같은 작업에서 차이가 크게 나. 반대로 [Mixture of Experts](/ko/wiki/mixture-of-experts/)는 어떤 전문가 모듈을 호출할지 고르는 구조라서, attention처럼 토큰끼리의 관련도를 계산하는 층과는 비교 축이 달라. 기사에서 attention을 줄였다고 하거나 다른 방식으로 바꿨다고 하면, 그건 새 모델 이름보다 내부 구조와 비용 구조가 달라졌다는 뜻에 더 가까워.
## 주의해서 볼 점
Attention이 강력하다고 해서 공짜는 아니야. 기본 self-attention은 길이 `n`인 입력에서 토큰 관계를 대체로 `n × n`으로 비교해서 층당 복잡도가 `O(n² · d)`로 커져. 예를 들어 4,096 토큰이면 관계 점수 칸이 `4,096² = 16,777,216`개이고, 8,192 토큰이면 `67,108,864`개로 4배가 돼서 계산량과 [메모리](/ko/wiki/memory/) 부담이 빠르게 커질 수 있어. 또 attention 점수는 참고 비중을 보여 주는 신호일 뿐이라서 그것만 보고 모델 내부 판단 전체가 투명하게 드러난다고 생각하면 과한 해석이 돼.
