---
term: attention
title: "Attention (어텐션)"
lang: ko
summary: "Attention는 새 모델 이름이 아니라, 모델이 문맥 안에서 어떤 토큰을 얼마나 참고할지 계산하는 내부 메커니즘이야. 현재 위치와 다른 위치들의 관련도를 점수로 만들고 그 비중을 섞어 다음 표현을 만든다는 점이 핵심이야."
readerValue: "이 항목을 읽으면 attention이 제품명이나 모델 계열이 아니라, Transformer 같은 구조 안에서 정보 참고 범위를 정하는 계산 방식이라는 점을 먼저 잡을 수 있어."
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
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Attention_(machine_learning)"
      title: "Attention (machine learning)"
    - url: "https://research.google/pubs/attention-is-all-you-need/"
      title: "Attention is All You Need"
  checks:
    - type: source_match
      result: pass
      summary: "주어진 출처 요약과 현재 문서 초안을 대조했을 때, attention을 문맥 내 중요도 계산 메커니즘으로 설명한 방향은 맞아."
      items:
        - "독자 문제 대조: reader focus에 맞춰 attention을 새 모델명이 아니라 내부 구조 변화로 이해하도록 앞부분에서 바로 못 박았어."
        - "출처 요약의 핵심 요소인 토큰 간 관련도 계산, 비중 반영, 현재 표현 재구성을 본문 구조에 그대로 반영했어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "제공된 두 출처 요약끼리 충돌하는 내용은 없고, 개념 설명과 Transformer 맥락 연결도 자연스럽게 맞물려."
      items:
        - "비교 기준: 위키 요약의 개념 정의와 'Attention Is All You Need'의 Transformer 맥락을 함께 놓고, attention을 독립 모델이 아닌 핵심 계산 방식으로 정리했어."
        - "긴 시퀀스에서 토큰 관계를 다룬다는 설명은 위키 요약과 맞고, Transformer의 중심 메커니즘이라는 서술도 논문 맥락과 어긋나지 않아."
    - type: number_verify
      result: pass
      summary: "본문에 고정 수치나 비율 주장을 넣지 않아서 숫자 검증이 필요한 대목은 없었어."
      items:
        - "mentionCount, firstMentioned 같은 메타데이터는 설명 본문에 섞지 않았어."
        - "계산 비용이 커진다는 서술은 방향 설명만 두고, 근거 없이 구체 수치를 추가하지 않았어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 오해를 먼저 막는 방향으로 서술해서, 독자가 모델명이나 해석 도구로 오인할 가능성을 낮췄어."
      items:
        - "attention을 제품명, 모델 계열, 기능 이름처럼 읽지 않도록 첫 섹션과 요약에서 내부 메커니즘이라고 분명히 적었어."
        - "attention 점수를 곧바로 모델의 이유 설명으로 받아들이지 않도록 제한점도 함께 적었어."
      findings:
        - "'Attention'이라는 영어 표기만 보면 새 모델 이름처럼 들릴 수 있다는 오해를 선제적으로 차단했어."
        - "'점수가 높다 = 그 이유가 전부 드러난다'라는 과도한 해석을 경계하도록 구성했어."
---
## 한 줄 정의
Attention는 모델이 입력 안의 여러 토큰 사이 관계를 계산해서, 지금 위치를 만들 때 무엇을 얼마나 반영할지 정하는 내부 메커니즘이야. 새 모델 이름이나 브랜드가 아니라, 문맥 속 정보의 비중을 정하는 계산 규칙이라고 보면 돼.
핵심은 현재 토큰이 다른 토큰들을 똑같이 보지 않는다는 데 있어. 어떤 단어, 기호, 앞 문장의 조건이 더 중요하면 그쪽 비중을 더 높여서 현재 표현을 다시 만든다.
## 어떻게 작동하나
모델은 지금 처리 중인 위치와 문맥의 다른 위치들을 서로 비교해서 관련도 점수를 만든다. 그 점수를 그대로 쓰는 게 아니라 비중 형태로 바꾼 뒤, 중요한 토큰의 정보는 더 크게, 덜 중요한 토큰의 정보는 더 작게 섞는다.
이렇게 만들어진 새 표현은 다음 층 계산이나 다음 토큰 예측에 바로 쓰인다. 그래서 멀리 떨어진 주어와 서술어의 연결, 앞에서 걸어 둔 조건, 대명사가 가리키는 대상 같은 관계를 한 번 더 끌어와 반영할 수 있어.
## 왜 중요한가
Transformer 계열 모델이 긴 문맥을 다루는 방식을 이해하려면 attention을 알아야 해. 순서대로 한 칸씩만 밀고 가는 대신, 필요한 위치를 직접 참조해서 현재 계산에 끌어올 수 있기 때문에 번역, 요약, 질의응답, 코드 생성 같은 작업에서 큰 차이를 만든다.
실무에서도 이 개념은 바로 연결된다. 기사에서 attention을 줄였다고 하거나 다른 방식으로 대체했다고 하면, 그건 새 모델 이름 얘기보다 내부 구조와 비용 구조가 바뀌었다는 뜻에 더 가깝다.
## 주의해서 볼 점
Attention이 강력하다고 해서 공짜는 아니야. 입력이 길어질수록 비교해야 할 관계가 많아져서 계산량과 메모리 사용이 빠르게 커지고, 그래서 긴 문맥 처리 비용 문제가 같이 따라온다.
또 attention 점수는 참고 비중을 보여 주는 신호일 뿐, 사람 눈에 보이는 설명 자체는 아니야. 어떤 토큰을 더 봤는지는 알 수 있어도 그것만으로 모델 내부 판단 전체를 완전히 해석했다고 보긴 어렵다.
## 관련 용어
- [Transformer](/ko/wiki/transformer/) : Transformer는 attention을 중심 부품으로 삼아 층을 쌓은 전체 아키텍처야. Attention이 문맥 참조 방식이라면 Transformer는 그 방식을 실제 모델 설계로 확장한 틀이야.
- [Mixture of Experts](/ko/wiki/mixture-of-experts/) : Mixture of Experts는 어떤 전문가 모듈을 호출할지 고르는 구조고, attention은 문맥 안에서 어떤 토큰 정보를 더 반영할지 정하는 구조야. 둘 다 효율과 성능에 영향을 주지만, 하나는 연산 경로 선택이고 다른 하나는 정보 참조 비중 계산이라는 점이 다르다.