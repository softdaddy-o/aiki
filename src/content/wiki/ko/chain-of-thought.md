---
term: chain-of-thought
title: "Chain-of-Thought (추론 유도)"
lang: ko
summary: >-
  CoT는 모델에게 답만 바로 내라고 하기보다 중간 추론 단계를 거치게 만드는 프롬프트 기법이야. 수학, 계획, 코드 분석처럼 단계가 2개 이상 필요한 문제에서 특히 유용하고, 너무 단순한 요청에는 굳이 붙일 필요가 없어.
readerValue: >-
  이 문서를 읽으면 CoT가 무엇인지, 언제 쓰고 언제 빼야 하는지, 그리고 [추론 모델](/ko/wiki/reasoning/)로 바꾸는 것과 어떤 차이가 있는지 바로 구분할 수 있어.
category: technique
guideVersion:
  common: 1.0.0
  wiki: "3.0.0"
aliases:
  - cot
  - chain of thought
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
  date: '2026-04-17'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Prompt_engineering'
      title: 'Prompt engineering'
    - url: >-
        https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/
      title: 'Language Models Perform Reasoning via Chain of Thought'
    - url: 'https://platform.openai.com/docs/guides/reasoning-best-practices'
      title: 'Reasoning best practices | OpenAI API'
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: '정의와 출처가 서로 맞아. 이 기법은 모델 자체를 바꾸는 개념이 아니라 프롬프트로 중간 추론을 유도하는 방식이야.'
      items:
        - 'Prompt engineering 자료와 Google 연구 블로그가 둘 다 이 기법을 프롬프트 쪽 도구로 다뤄.'
        - 'Google 연구는 중간 추론 단계를 거치는 방식이 멀티스텝 문제에 도움이 될 수 있다고 설명해.'
        - 'OpenAI 문서도 모든 요청에 "think step by step"을 붙이는 식의 습관이 항상 맞는 건 아니라고 경고해.'
      findings:
        - '모델 교체와 프롬프트 조정이 같은 레버가 아니라는 점이 잘 구분돼.'
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 'Google 연구와 OpenAI 권장사항을 같이 보면, 이 방식은 상황에 맞춰 쓰는 유도 기법이야.'
      items:
        - 'Google 블로그는 이 방식을 중간 추론 단계가 있는 흐름으로 설명해.'
        - 'OpenAI reasoning best practices는 최신 추론 모델에서 "think step by step"이 늘 최선은 아니라고 말해.'
        - '둘을 함께 보면, CoT는 복잡한 작업에 더 잘 맞고 단순 요청에는 생략할 수 있다는 결론이 자연스러워.'
      findings:
        - '프롬프트를 다듬는 전략과 추론형 모델로 바꾸는 전략을 구분하면 맥락이 맞아.'
    - type: number_verify
      result: pass
      sources: 1
      summary: 'Google 블로그의 100B+급 모델과 멀티스텝 추론이라는 숫자 맥락이 설명과 어긋나지 않아.'
      items:
        - '초기 CoT 연구는 100B+급 대형 모델에서 중간 추론 단계를 넣는 방식의 효과를 보여줬어.'
        - '이 수치는 "아무 모델이나"가 아니라, 충분한 규모에서 CoT의 차이가 더 분명하게 보였다는 맥락을 보강해.'
      findings:
        - '숫자는 과장된 장식이 아니라, CoT가 주로 큰 모델에서 먼저 두드러졌다는 배경을 설명해.'
    - type: adversarial
      result: pass
      sources: 2
      summary: '가장 흔한 오해는 이 기법을 모델 업그레이드와 같은 말로 읽는 거야.'
      items:
        - 'CoT는 모델 자체를 갈아끼우는 게 아니라 프롬프트를 바꾸는 쪽이야.'
        - '단순 계산이나 짧은 사실 질문에는 오히려 답이 늘어질 수 있어.'
        - '그래서 [o3](/ko/wiki/o3/)나 [딥시크 R1](/ko/wiki/deepseek-r1/) 같은 추론형 모델을 쓸지, 기존 모델에 CoT를 붙일지 먼저 나눠 보는 게 좋아.'
      findings:
        - '프롬프트 유도와 모델 선택은 다른 레버라는 점을 분명히 하면 오해가 줄어.'
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.0.0"
    tone-editor: "1.0.0"
    structure-editor: "1.0.0"
  panelVerdict: pass
  reviewedAt: "2026-04-17"
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
CoT를 붙였다고 항상 더 좋아지는 건 아니야. OpenAI의 [reasoning best practices](https://platform.openai.com/docs/guides/reasoning-best-practices)는 최신 [추론 모델](/ko/wiki/reasoning/)에선 "think step by step"이 오히려 불필요하거나 방해가 될 수 있다고 말해. 즉, 프롬프트를 고치는 게 맞는지, 모델 자체를 [o3](/ko/wiki/o3/)나 [딥시크 R1](/ko/wiki/deepseek-r1/) 같은 추론형으로 바꾸는 게 맞는지 먼저 나눠 봐야 해.

정리하면 이거야:
- 문제를 더 잘 설명하면 풀릴 것 같으면 CoT를 써.
- 모델 자체의 추론 성능이 병목이면 reasoning model로 바꿔.
- 너무 단순한 요청이면 CoT를 빼고 바로 물어봐.

## 관련 용어
- [프롬프트 엔지니어링](/ko/wiki/prompt-engineering/): CoT를 포함하는 더 큰 상위 범주야. 프롬프트를 어떻게 쓰느냐가 핵심이야.
- [추론 모델](/ko/wiki/reasoning/): 중간 추론 능력 자체를 강화한 모델이야. CoT를 붙일지 모델을 바꿀지 구분할 때 같이 보면 좋아.
- [o3](/ko/wiki/o3/): 최신 추론 모델의 대표 사례로, CoT를 따로 유도하지 않아도 되는 경우를 보여줘.
- [딥시크 R1](/ko/wiki/deepseek-r1/): 추론 중심 모델과 프롬프트 유도의 차이를 비교하기 좋은 예시야.
- [OpenAI(오픈에이아이)](/ko/wiki/openai/): reasoning 가이드와 함께 보면 CoT를 언제 생략해야 하는지 감이 더 빨리 와.
- [클로드 오퍼스](/ko/wiki/claude-opus/): 고성능 범용 모델과 CoT 조합을 생각할 때 참고하기 좋아.
