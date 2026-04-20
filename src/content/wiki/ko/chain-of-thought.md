---
term: chain-of-thought
title: Chain-of-Thought(연쇄 추론 유도)
lang: ko
summary: >-
  Chain-of-Thought는 모델이 문제를 단계적으로 풀게 유도하는 프롬프트 기법이야. 새 모델 이름이 아니라 같은 모델에서도 추론
  흐름을 더 잘 끌어내려는 입력 설계라고 보면 돼.
readerValue: >-
  Chain-of-Thought를 알면 새 reasoning 모델을 써야 하는 문제와, 프롬프트만 바꿔도 풀리는 문제를 구분하는 데 도움이
  돼.
category: technique
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - cot
relatedTerms:
  - prompt-engineering
  - reasoning
  - inference
  - openai
  - o3
  - deepseek-r1
  - claude-opus
firstMentioned: '2026-03-08'
mentionCount: 5
draft: false
tags:
  - reasoning
  - prompting
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Prompt_engineering'
      title: Prompt engineering
    - url: >-
        https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/
      title: Language Models Perform Reasoning via Chain of Thought
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 초기 CoT 연구 정의와 최신 실무 문맥을 다시 맞춰봤어.
      items:
        - '독자 문제 대조: Chain-of-Thought를 모델명으로 오해하지 않게 프롬프트 기법이라고 먼저 못 박았어.'
        - Google 연구 블로그의 핵심인 '중간 추론 단계 유도' 설명을 본문 첫머리에 반영했어.
        - 최신 reasoning 모델 문맥에서는 공개 추론 텍스트보다 입력 설계라는 뜻이 더 중요하다는 점도 같이 적었어.
      findings:
        - Chain-of-Thought는 모델명이 아니라 프롬프트 기법이라는 점을 먼저 잡았어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 초기 Google 설명과 최신 OpenAI 사용 가이드를 같이 맞춰봤어.
      items:
        - >-
          비교 기준: Chain-of-Thought를 그대로 길게 쓰게 하는 출력 규칙으로 볼지, 단계적 해결을 유도하는 프롬프트
          기법으로 볼지 맞춰봤어.
        - >-
          Google 글은 multi-step reasoning 향상용 prompting으로 설명했고, OpenAI reasoning
          가이드는 최신 o시리즈에선 'think step by step' 유도가 불필요하거나 방해될 수 있다고 말해.
        - 그래서 본문도 역사적 개념과 최신 실무 주의점을 함께 넣는 쪽으로 정리했어.
      findings:
        - 초기 논문 문맥과 최신 사용 가이드를 같이 봐야 과장이 줄었어.
    - type: number_verify
      result: pass
      sources: 1
      summary: 초기 연구의 규모 숫자는 다시 보고 본문에서 범위를 줄였어.
      items:
        - 'Google 글은 Chain-of-Thought 효과가 충분히 큰 모델 규모, 대략 100B급 이상에서 두드러졌다고 설명했어.'
        - 하지만 최신 모델 환경에서는 그 숫자가 보편 규칙처럼 읽히기 쉬워서 본문 핵심 정의에는 넣지 않고 역사적 배경으로만 처리했어.
      findings:
        - 숫자는 역사 맥락으로만 남기고 현재 일반 규칙처럼 보이지 않게 줄였어.
    - type: adversarial
      result: pass
      sources: 2
      summary: Chain-of-Thought를 무조건 길게 쓰게 하는 규칙으로 읽는 오해를 막았어.
      items:
        - CoT를 쓰면 항상 추론 과정을 전부 공개해야 한다는 오해를 피했어.
        - 최신 reasoning 모델에 아무 때나 'step by step'을 붙이면 더 좋아진다는 식의 단정도 막았어.
        - 모델 교체 문제와 프롬프트 설계 문제를 같은 해결책처럼 섞는 표현도 정리했어.
      findings:
        - 출력 형식과 입력 설계가 뒤섞이는 오해를 먼저 잘라 냈어.
---
## 정의
Chain-of-Thought는 모델이 답만 바로 내지 않고, 중간 추론 단계를 거치게 만드는 프롬프트 기법이야. 말 그대로 "생각하는 과정"을 전부 공개하라는 뜻이라기보다, 복잡한 문제를 풀 때 답의 흐름을 단계적으로 만들도록 유도하는 쪽에 가까워.

초기 Google 연구는 100B+급 모델에서 이런 방식이 멀티스텝 추론에 도움이 될 수 있음을 보여줬어. 그래서 CoT는 처음부터 "모델을 바꾸는 기술"이 아니라, [프롬프트 엔지니어링](/ko/wiki/prompt-engineering/) 안에서 쓰는 도구로 읽는 게 맞아.

## 어떻게 쓰나
보통은 "한 번에 답해줘"보다 "중간 과정을 나눠서 생각해줘"처럼 요청하는 식으로 써. 수학 문제, 일정 짜기, 코드 원인 분석처럼 단계가 2개 이상 필요한 작업에서 특히 잘 맞아.

실무에서는 요청 문장을 짧게 붙이는 편이 가장 편해.
- `조건을 먼저 1개씩 확인하고, 마지막에 결론만 말해줘.`
- `계산을 한 번 검산한 뒤 답해줘.`
- `선택지별 장단점을 비교하고 추천안을 골라줘.`

예를 들면:
- 복잡한 계산 검산
- 여러 조건이 엮인 계획 세우기
- 버그 원인을 2단계 이상으로 좁히는 코드 분석

반대로 짧은 번역, 단순 요약, 즉답형 사실 확인에는 굳이 길게 붙일 이유가 적어. 이럴 땐 CoT를 얹기보다 아예 요청을 짧고 명확하게 만드는 편이 더 낫다.

## 언제 유용한가
이 기법은 모델이 "무슨 답을 낼지"보다 "어떤 순서로 풀지"를 정리할 때 힘을 써. 그래서 출력의 정확도보다 추론 경로가 중요한 문제에서 효과가 커.

특히 모델이 답을 대충 맞히는 것처럼 보여도, 중간 단계에서 실수가 잦은 작업에는 도움이 돼. 수학, 논리 퍼즐, 정책 비교, 코드 리뷰 같은 상황이 여기에 들어가.

## 주의할 점
CoT를 붙였다고 항상 더 좋아지는 건 아니야. [OpenAI](/ko/wiki/openai/)의 [reasoning best practices](https://platform.openai.com/docs/guides/reasoning-best-practices)는 최신 [추론 모델](/ko/wiki/reasoning/)에선 "think step by step"이 오히려 불필요하거나 방해가 될 수 있다고 말해. 즉, 프롬프트를 고치는 게 맞는지, 모델 자체를 [o3](/ko/wiki/o3/)나 [딥시크 R1](/ko/wiki/deepseek-r1/) 같은 추론형으로 바꾸는 게 맞는지 먼저 나눠 봐야 해.

정리하면 이거야:
- 문제를 더 잘 설명하면 풀릴 것 같으면 CoT를 써.
- 모델 자체의 추론 성능이 병목이면 [reasoning model](/ko/wiki/reasoning/)로 바꿔.
- 너무 단순한 요청이면 CoT를 빼고 바로 물어봐.

## 관련 용어
- [prompt-engineering](/ko/wiki/prompt-engineering/): Chain-of-Thought가 들어가는 큰 상위 문맥이야. 입력 설계를 어떻게 바꾸느냐를 함께 보면 이해가 빨라.
- [deepseek-r1](/ko/wiki/deepseek-r1/): 추론 모델 자체가 얼마나 많은 중간 사고를 내부에서 처리하는지 볼 때 자주 비교돼. 프롬프트 기법과 모델 능력의 경계를 읽기 좋아.
- [o3](/ko/wiki/o3/): 최신 reasoning 모델 문맥에서 Chain-of-Thought를 얼마나 직접 요구해야 하는지 비교할 때 도움이 돼. 내부 추론과 외부 지시의 균형을 보기 좋아.
- [claude-opus](/ko/wiki/claude-opus/): 범용 고성능 모델에서 프롬프트 설계가 어디까지 성능을 끌어올리는지 비교할 때 자주 같이 본다.
