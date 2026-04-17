---
term: long-context
title: Long Context (긴 문맥)
lang: ko
summary: >-
  Long Context는 모델이 한 번의 요청 안에서 아주 긴 입력을 같이 읽고 다루는 능력을 가리키는 말이야. 기사에서 이 표현이 나오면
  최대 길이 숫자만 보지 말고, 그 긴 정보를 실제로 끝까지 써먹는지도 같이 봐야 해.
readerValue: 'Long Context가 숫자 자랑인지, 아니면 긴 문서나 큰 코드베이스 작업에 진짜 도움되는 주장인지 빨리 가를 수 있어.'
category: concept
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - long context
relatedTerms:
  - context-window
  - token
  - memory
firstMentioned: '2026-03-27'
mentionCount: 2
draft: false
tags:
  - context-window
  - memory
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://docs.anthropic.com/en/docs/build-with-claude/context-windows'
      title: Context windows
    - url: 'https://deepmind.google/technologies/gemini/'
      title: Gemini 3 — Google DeepMind
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 정의와 판독 기준을 제공된 출처 방향에 맞춰 다시 잡아봤어.
      items:
        - '독자 문제 대조: 큰 숫자만 보지 말고 실제 활용성과 판독 기준까지 같이 보게끔 첫 설명을 잡았어.'
        - context window와 긴 문맥 활용 능력을 같은 말처럼 뭉개지 않고 구분해 적었어.
      findings:
        - 최대 길이와 실제 품질은 다를 수 있다는 경계선을 본문에 남겼어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 제공된 두 출처가 겹치는 공통 의미만 다시 봤어.
      items:
        - >-
          비교 기준: 하나는 context window 설명이고 다른 하나는 긴 문맥 처리 능력을 보여 주는 제품 소개라는 점을 놓고
          공통 의미만 뽑았어.
        - 특정 회사 우열이나 고정 수치는 빼고 긴 입력 처리라는 공통 개념만 남겼어.
      findings:
        - 긴 문맥이 곧 완벽한 이해는 아니라는 해석도 같이 유지했어.
    - type: number_verify
      result: pass
      sources: 2
      summary: 새 숫자는 얹지 않고 예시 숫자만 느슨하게 남겼어.
      items:
        - 128K나 1M은 기사에서 자주 보이는 예시 숫자라는 수준으로만 다뤘어.
        - 비용과 지연시간은 커질 수 있다고만 적고 정확한 수치는 넣지 않았어.
      findings:
        - 최대 길이를 성능 보장 수치처럼 읽히지 않게 표현을 줄였어.
    - type: adversarial
      result: pass
      sources: 2
      summary: 처음 듣는 독자가 가장 자주 하는 오해를 먼저 막았어.
      items:
        - Long Context를 장기 기억과 같은 개념으로 오해하지 않게 Memory와 분리했어.
        - 큰 context window가 곧 고품질 추론이라는 식의 과장을 피했어.
      findings:
        - 긴 문맥 소개는 검색 보강이나 압축 전략을 숨기고 말할 수 있어서 숫자만 보면 해석이 틀어질 수 있어.
---
## 한 줄 정의
Long Context는 긴 문서, 여러 파일, 긴 대화를 한 요청 안에 같이 올려 두고 처리하는 능력이야. 다만 많이 넣을 수 있다는 뜻이지, 모든 구간을 똑같이 잘 이해한다는 뜻은 아니야.
## 어떻게 작동하나
모델은 들어온 텍스트와 파일을 토큰 단위로 읽고 현재 문맥 창 안에서 계산해. 실제 서비스는 긴 자료를 통째로 넣기만 하지 않고 검색, 요약, 압축을 섞어서 중요한 부분이 창 안에 남도록 조정해.
## 왜 중요한가
긴 계약서 비교, 긴 회의록 정리, 여러 코드 파일 동시 분석처럼 앞뒤 문맥을 오래 붙잡아야 하는 작업에서 차이가 크게 나. 그래서 기사에서 128K나 1M 같은 숫자가 보여도, 필요한 정보를 다시 잘 꺼내 쓰는지까지 봐야 실전 성능인지 홍보 문구인지 가를 수 있어.
## 주의해서 볼 점
Long Context는 장기 기억과는 달라. 지금 요청 안에 넣은 정보는 참고할 수 있어도 세션이 바뀌거나 문맥 창 밖으로 밀려나면 그대로 이어진다고 보면 안 돼. 또 최대 길이와 실제 활용 품질은 같지 않아서 비용과 지연시간도 같이 봐야 해.
## 관련 용어
- **Context Window (컨텍스트 윈도우)**: 한 번의 요청 안에 실제로 담을 수 있는 토큰 예산이야. Long Context는 그 창이 크거나 긴 문맥을 잘 다루는 성격을 가리키는 말이야.
- [Token (토큰)](/ko/wiki/token/): 모델이 입력과 출력을 계산할 때 쓰는 기본 단위야. Long Context를 읽을 때도 결국 몇 토큰까지 넣고 얼마나 남길 수 있는지가 중요해.
- **Memory (메모리)**: 여러 요청에 걸쳐 정보를 남겨 두는 저장 개념에 더 가까워. Long Context는 현재 요청 안에서 많이 담는 능력이고, Memory는 다음 요청에 다시 불러올 수 있느냐가 더 중요해.
