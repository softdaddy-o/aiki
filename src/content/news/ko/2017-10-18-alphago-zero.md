---
title: 'AlphaGo Zero, 자기학습 강화학습의 분기점'
date: '2017-10-18T12:00:00+09:00'
lang: ko
category: news
summary: >-
  2017년 10월 18일, DeepMind가 사람 기보 없이 바둑 규칙만으로 스스로 학습한 AlphaGo Zero를 공개했어. 3일 학습 뒤
  기존 AlphaGo를 100대 0으로 이겼고, 바로 그 결과가 이번 발표를 다시 보게 만드는 지점이야.
readerValue: >-
  자기대국이 잘 먹히는 문제와 아닌 문제를 어떻게 가를지, 그리고 이런 발표를 제품 우선순위나 배포 판단에 언제 반영할지 감을 빠르게 잡게
  해줘.
sourceUrl: 'https://deepmind.google/blog/alphago-zero-starting-from-scratch/'
sourceTitle: 'AlphaGo Zero: Starting from scratch'
draft: true
backfilled: true
backfilledAt: '2026-04-08'
score: 89
sourceCount: 3
factCheck:
  status: passed
  date: '2026-04-08'
  sources:
    - url: 'https://deepmind.google/blog/alphago-zero-starting-from-scratch/'
      title: 'AlphaGo Zero: Starting from scratch'
    - url: 'https://www.nature.com/articles/nature24270'
      title: Mastering the game of Go without human knowledge
    - url: 'https://en.wikipedia.org/wiki/AlphaGo_Zero'
      title: AlphaGo Zero
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 2017년 10월 18일 공개된 AlphaGo Zero 발표를 정확히 가리키는지 사건 단위로 다시 맞춰봤어.
      items:
        - '공식 블로그 게시일은 2017년 10월 18일이고, 본문도 그날 공개된 AlphaGo Zero 발표를 중심 사건으로 잡았어.'
        - >-
          AlphaGo Zero는 사람 기보를 먼저 학습하지 않고 바둑 규칙과 자기대국만으로 학습한 시스템이라는 점을 공식 블로그와
          Nature 논문이 같이 뒷받침해.
        - '이전 버전과의 차별점은 ''인간 데이터 없이 시작한 버전''이라는 데 있으니 제목, 요약, 첫 문단을 모두 그 주장에 맞췄어.'
        - 첫 섹션에서 일반 AI 산업 서론을 빼고 AlphaGo Zero 소개와 발표 결과를 바로 설명하도록 구조를 바꿨어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '공식 블로그만 따라가지 않고 논문과 보조 자료를 붙여서 날짜, 학습 방식, 비교 대상이 일치하는지 교차 확인했어.'
      items:
        - DeepMind 블로그와 Nature 논문은 모두 AlphaGo Zero가 자기대국만으로 학습한 시스템이라고 설명해.
        - >-
          DeepMind 블로그는 3일 자기대국 뒤 기존 AlphaGo를 100대 0으로 이겼다고 적고, Wikipedia도 같은 비교
          결과를 요약해.
        - >-
          Nature 논문과 Wikipedia는 AlphaGo Zero가 21일에 AlphaGo Master 수준에 도달하고 40일에는
          이전 버전 전반을 넘어섰다고 정리해.
        - '응용 전망은 출처가 제시한 가능성 수준으로만 다루고, 이미 검증된 일반 제품 효과처럼 쓰지 않도록 본문을 조정했어.'
    - type: number_verify
      result: pass
      summary: 독자가 기억해야 할 숫자와 비교 구도를 수치별로 다시 검산해뒀어.
      items:
        - 발표일은 2017년 10월 18일로 공식 블로그 날짜와 맞아.
        - 3일 뒤 100대 0은 기존 AlphaGo Lee 버전과의 비교 결과로 공식 블로그와 보조 자료가 일치해.
        - >-
          21일과 40일은 각각 AlphaGo Master 수준 도달과 이전 버전 전반 추월을 가리키는 별도 이정표라서 본문에서도
          분리해서 썼어.
        - >-
          AlphaGo Master 상대 전적은 보조 자료에서 89대 11로 정리돼 있어서, 본문에서는 과한 숫자 나열보다 비교 의미
          중심으로 다뤘어.
    - type: adversarial
      result: pass
      summary: 이 사건을 곧바로 모든 AI 제품의 청사진으로 읽는 오해를 막기 위해 과장 포인트를 따로 걸렀어.
      items:
        - >-
          AlphaGo Zero의 성과는 규칙이 고정된 바둑 환경에서 나온 결과라서, 데이터가 지저분한 실서비스 문제와는 조건이
          다르다고 본문에 적었어.
        - >-
          사람 데이터가 필요 없었다는 사실을 도메인 지식이 완전히 불필요하다는 뜻으로 번역하지 않도록, 시뮬레이션 가능성과 자동 보상
          설계가 전제라는 한계를 넣었어.
        - >-
          바로 비교할 대상은 AlphaGo Lee와 AlphaGo Master 같은 이전 버전이지, 곧장 음성 인식 같은 열린 문제
          전체가 아니라는 점을 분명히 했어.
        - '단백질 접힘 같은 응용 전망은 출처가 제시한 가능성 수준으로만 다루고, 이미 검증된 제품 효과처럼 과장하지 않았어.'
      findings:
        - 'DeepMind 블로그가 가장 빠른 1차 출처이지만, 실제로 검증된 것은 자기대국이 가능한 바둑 환경에서의 성과야.'
tags:
  - alphago-zero
  - deepmind
  - reinforcement-learning
formatVersion: 2
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  news: 3.1.2
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.1.0
    tone-editor: 1.6.0
    structure-editor: 1.1.0
  guideVersions:
    tone: 2.0.0
    common: 2.3.0
    news: 3.1.2
  panelVerdict: pass
  contentHash: 9f1a0ea953d70873
  reviewedAt: '2026-04-25T09:55:57Z'
---
## 무슨 일이 있었나

[공식 발표](https://deepmind.google/blog/alphago-zero-starting-from-scratch/)가 나온 날짜는 2017년 10월 18일이야. 여기서 공개된 AlphaGo Zero는 사람 바둑 기보를 먼저 먹이지 않고, 바둑 규칙만 알려준 뒤 자기대국으로만 학습한 바둑 AI였어. 함께 공개된 [Nature 논문](https://www.nature.com/articles/nature24270) 기준으로 보면 이 시스템은 3일 학습 뒤 이세돌을 이겼던 기존 AlphaGo 버전을 100대 0으로 꺾었고, 40일 학습 뒤에는 AlphaGo Master보다 더 강한 수준까지 올라갔어.

## 왜 중요할까

중요한 건 바둑 AI가 또 강해졌다는 데서 끝나지 않는다는 점이야. 인간이 만든 정답 데이터가 비싸거나 편향될 수 있는 문제라면, 규칙과 보상만 잘 정의해도 자기대국만으로 빠르게 성능을 끌어올릴 수 있다는 사례를 보여줬기 때문이야.

- 제품 문제가 규칙이 고정돼 있고 시뮬레이션을 싸게 반복할 수 있다면, 이 발표는 자기대국이나 합성 데이터 기반 학습을 먼저 검토해도 된다는 신호에 가까워.
- 반대로 정답이 애매하거나 현실 피드백이 느린 문제라면, 이 발표만 보고 배포 일정을 앞당기면 안 돼. 그런 경우에는 아직 보류 쪽에 더 가까워.

## 한계와 맥락

AlphaGo Zero는 닫힌 규칙, 명확한 승패, 값싼 시뮬레이션이라는 조건이 갖춰진 바둑에서 빛났어. 그래서 다음으로 바로 비교할 건 AlphaGo Lee, AlphaGo Master와의 차이야. 사람 기보 의존도가 얼마나 줄었는지, 같은 시간 대비 성능이 얼마나 빨라졌는지를 봐야 해. 반대로 이 결과를 곧바로 [음성 인식](/ko/wiki/speech-to-text/)처럼 입력 잡음이 많고 정답이 흔들리는 문제로 일반화하면 판단을 그르치기 쉬워.

## 앞으로 볼 점

이후 흐름에서 봐야 할 건 단순한 성능 숫자보다 확장 조건이야. 비슷한 발표를 다시 볼 때는 이런 점들을 같이 보면 돼.

- 자기대국이나 시뮬레이션이 실제로 가능한지
- 보상 함수를 자동으로 설계할 수 있는지
- 인간 데이터 파이프라인을 줄였을 때 실제 운영비나 실험 속도가 좋아지는지

AlphaGo Zero는 그 체크리스트를 선명하게 만든 사건으로 봐도 무리가 없어.
