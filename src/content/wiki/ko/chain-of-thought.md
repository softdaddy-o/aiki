---
term: chain-of-thought
title: "Chain-of-Thought(연쇄 추론 유도)"
lang: ko
summary: "Chain-of-Thought는 모델이 문제를 단계적으로 풀게 유도하는 프롬프트 기법이야. 새 모델 이름이 아니라 같은 모델에서도 추론 흐름을 더 잘 끌어내려는 입력 설계라고 보면 돼."
readerValue: "Chain-of-Thought를 알면 새 reasoning 모델을 써야 하는 문제와, 프롬프트만 바꿔도 풀리는 문제를 구분하는 데 도움이 돼."
category: technique
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "cot"
relatedTerms:
  - prompt-engineering
  - deepseek-r1
  - o3
  - claude-opus
firstMentioned: "2026-03-08"
mentionCount: 5
draft: false
tags:
  - reasoning
  - prompting
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Prompt_engineering"
      title: "Prompt engineering"
    - url: "https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/"
      title: "Language Models Perform Reasoning via Chain of Thought"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "초기 CoT 연구 정의와 최신 실무 문맥을 다시 맞춰봤어."
      items:
        - "독자 문제 대조: Chain-of-Thought를 모델명으로 오해하지 않게 프롬프트 기법이라고 먼저 못 박았어."
        - "Google 연구 블로그의 핵심인 '중간 추론 단계 유도' 설명을 본문 첫머리에 반영했어."
        - "최신 reasoning 모델 문맥에서는 공개 추론 텍스트보다 입력 설계라는 뜻이 더 중요하다는 점도 같이 적었어."
      findings:
        - "Chain-of-Thought는 모델명이 아니라 프롬프트 기법이라는 점을 먼저 잡았어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "초기 Google 설명과 최신 OpenAI 사용 가이드를 같이 맞춰봤어."
      items:
        - "비교 기준: Chain-of-Thought를 그대로 길게 쓰게 하는 출력 규칙으로 볼지, 단계적 해결을 유도하는 프롬프트 기법으로 볼지 맞춰봤어."
        - "Google 글은 multi-step reasoning 향상용 prompting으로 설명했고, OpenAI reasoning 가이드는 최신 o시리즈에선 'think step by step' 유도가 불필요하거나 방해될 수 있다고 말해."
        - "그래서 본문도 역사적 개념과 최신 실무 주의점을 함께 넣는 쪽으로 정리했어."
      findings:
        - "초기 논문 문맥과 최신 사용 가이드를 같이 봐야 과장이 줄었어."
    - type: number_verify
      result: pass
      sources: 1
      summary: "초기 연구의 규모 숫자는 다시 보고 본문에서 범위를 줄였어."
      items:
        - "Google 글은 Chain-of-Thought 효과가 충분히 큰 모델 규모, 대략 100B급 이상에서 두드러졌다고 설명했어."
        - "하지만 최신 모델 환경에서는 그 숫자가 보편 규칙처럼 읽히기 쉬워서 본문 핵심 정의에는 넣지 않고 역사적 배경으로만 처리했어."
      findings:
        - "숫자는 역사 맥락으로만 남기고 현재 일반 규칙처럼 보이지 않게 줄였어."
    - type: adversarial
      result: pass
      sources: 2
      summary: "Chain-of-Thought를 무조건 길게 쓰게 하는 규칙으로 읽는 오해를 막았어."
      items:
        - "CoT를 쓰면 항상 추론 과정을 전부 공개해야 한다는 오해를 피했어."
        - "최신 reasoning 모델에 아무 때나 'step by step'을 붙이면 더 좋아진다는 식의 단정도 막았어."
        - "모델 교체 문제와 프롬프트 설계 문제를 같은 해결책처럼 섞는 표현도 정리했어."
      findings:
        - "출력 형식과 입력 설계가 뒤섞이는 오해를 먼저 잘라 냈어."
---
## 한 줄 정의
Chain-of-Thought는 모델이 문제를 중간 단계로 나눠 생각하게 유도하는 프롬프트 기법이야. 새 모델 이름이 아니라, 같은 모델에도 다른 입력 설계를 써서 추론 성능을 끌어내려는 방법이라고 이해하면 돼.
초기 Google 연구가 이 표현을 널리 퍼뜨렸지만, 지금은 더 넓게 '단계적 추론을 유도하는 프롬프트'라는 뜻으로 많이 읽혀. 그래서 모델 교체와 프롬프트 설계를 구분하는 데 특히 중요해.
## 어떻게 작동하나
대표적인 방식은 예시 몇 개나 지시문을 써서 모델이 바로 답만 내지 말고 중간 판단을 거쳐 최종 답을 내게 만드는 거야. 수학 문제, 계획 세우기, 코드 분석처럼 한 번에 찍기보다 단계 분해가 필요한 작업에서 효과가 잘 드러났어.
다만 요즘 reasoning 모델은 내부적으로 추론을 수행하면서도 그 과정을 전부 노출하지 않을 수 있어. 그래서 Chain-of-Thought를 '길게 생각 내용을 다 보여 주는 출력'보다 '단계적 해결을 유도하는 입력 설계'로 이해하는 게 더 정확해.
## 왜 중요한가
이 개념을 알면 모델 자체의 한계와 프롬프트 설계 효과를 분리해서 볼 수 있어. 어떤 문제는 새 reasoning 모델이 필요하지만, 어떤 문제는 같은 모델에서도 Chain-of-Thought 유도만으로 크게 나아질 수 있어.
또 반대로 최신 reasoning 모델에서는 무조건 'step by step'을 붙이는 게 항상 이득은 아니야. OpenAI 가이드처럼 내부 추론을 이미 잘하는 모델에는 오히려 간단하고 직접적인 지시가 더 나을 때도 있어.
## 주의해서 볼 점
Chain-of-Thought가 항상 길게 드러나는 추론 텍스트를 뜻하는 건 아니야. 민감한 업무에서는 중간 추론을 그대로 노출하는 게 보안이나 품질 관리에 불리할 수 있고, 최신 모델은 내부에서 추론하고 바깥에는 짧게 답하는 편이 더 나을 수도 있어.
또 초기 연구에서 효과가 컸다고 해서 모든 모델과 모든 작업에 같은 비율로 먹히는 것도 아니야. 프롬프트 기법이라는 점을 잊지 않는 게 중요해.
## 관련 용어
- prompt-engineering: Chain-of-Thought가 들어가는 큰 상위 문맥이야. 입력 설계를 어떻게 바꾸느냐를 함께 보면 이해가 빨라.
- deepseek-r1: 추론 모델 자체가 얼마나 많은 중간 사고를 내부에서 처리하는지 볼 때 자주 비교돼. 프롬프트 기법과 모델 능력의 경계를 읽기 좋아.
- o3: 최신 reasoning 모델 문맥에서 Chain-of-Thought를 얼마나 직접 요구해야 하는지 비교할 때 도움이 돼. 내부 추론과 외부 지시의 균형을 보기 좋아.
- claude-opus: 범용 고성능 모델에서 프롬프트 설계가 어디까지 성능을 끌어올리는지 비교할 때 자주 같이 본다.