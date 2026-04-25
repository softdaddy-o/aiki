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
formatVersion: 2
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: >-
        https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/
      title: Language Models Perform Reasoning via Chain of Thought
    - url: 'https://arxiv.org/abs/2201.11903'
      title: Chain-of-Thought Prompting Elicits Reasoning in Large Language Models
    - url: 'https://platform.openai.com/docs/guides/reasoning-best-practices'
      title: Reasoning Best Practices | OpenAI
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: 초기 CoT 연구 축과 최신 reasoning model 사용 가이드를 분리해서 본문 정의와 맞췄어.
      items:
        - '초기 축: CoT 논문과 Google Research 설명은 Chain-of-Thought를 모델명이 아니라 단계적 추론을 유도하는 prompting 기법으로 다뤄.'
        - '최신 축: OpenAI reasoning best practices는 최신 추론 모델에서 장황한 ''think step by step'' 지시가 항상 이득이 아니라고 설명해.'
        - '본문 첫 문단을 초심자 기준으로 다시 열어, CoT를 새 모델명이 아니라 프롬프트 기법으로 먼저 설명했어.'
      findings:
        - 역사적 정의와 최신 사용 가이드를 같은 문장에 섞지 않고 역할별로 나눴어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 초기 연구의 효용 설명과 최신 reasoning 모델 운용 가이드를 같은 주장으로 뭉개지 않았는지 다시 봤어.
      items:
        - >-
          비교 기준: Chain-of-Thought를 길게 출력시키는 규칙으로 읽을지, 단계적 해결을 유도하는 프롬프트
          기법으로 읽을지 먼저 맞춰봤어.
        - >-
          초기 연구 축은 multi-step reasoning 향상용 prompting에 초점을 두고, 최신 OpenAI 가이드는 reasoning
          모델에서 과도한 단계 지시가 불필요하거나 방해될 수 있다고 설명해.
        - 그래서 본문도 역사적 개념은 개념 설명에, 최신 실무 판단은 모델 선택과 지시 강도 판단에 배치했어.
      findings:
        - 같은 CoT라도 2022년 연구 맥락과 2026년 실무 가이드는 증거 역할이 다르다는 점을 또렷하게 남겼어.
    - type: number_verify
      result: pass
      sources: 2
      summary: 초기 CoT 연구의 모델 규모 숫자와 최신 reasoning 모델 가이드를 분리해서 숫자 해석 범위를 다시 적었어.
      items:
        - '초기 CoT 논문과 Google 설명은 효과가 특히 큰 모델, 대략 100B+ 규모에서 더 두드러졌다는 역사적 맥락을 제시해.'
        - '이 100B+ 표기는 초기 연구 관찰값이지, 현재 모든 모델 선택에 그대로 적용되는 보편 기준으로 쓰면 안 돼.'
        - '최신 OpenAI reasoning best practices는 파라미터 수 임계값보다, 작업 성격과 reasoning 모델 사용 여부를 먼저 보라고 안내해.'
        - '그래서 본문에서도 100B+는 개념 정의가 아니라 연구 배경으로만 남기고, 실무 판단은 프롬프트 조정과 모델 교체 중 무엇이 맞는지로 옮겼어.'
      findings:
        - 숫자는 역사적 범위로만 제한하고, 최신 실무 판단 기준은 별도 축으로 분리했어.
    - type: adversarial
      result: pass
      sources: 3
      summary: Chain-of-Thought를 무조건 길게 쓰게 하는 규칙으로 읽는 오해를 막았어.
      items:
        - CoT를 쓰면 항상 추론 과정을 전부 공개해야 한다는 오해를 피했어.
        - 최신 reasoning 모델에 아무 때나 'step by step'을 붙이면 더 좋아진다는 식의 단정도 막았어.
        - 모델 교체 문제와 프롬프트 설계 문제를 같은 해결책처럼 섞는 표현도 정리했어.
      findings:
        - 출력 형식과 입력 설계가 뒤섞이는 오해를 먼저 잘라 냈어.
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
  contentHash: "66f581668ec355fe"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
Chain-of-Thought는 모델이 답만 바로 내지 않고, 문제를 몇 단계로 나눠 풀게 유도하는 프롬프트 기법이야. 새 모델 이름이 아니라, 같은 모델에서도 더 질서 있게 추론하도록 입력을 설계하는 방식으로 이해하면 돼.

초기 CoT 연구는 대략 100B+급 대형 모델에서 이런 방식이 멀티스텝 추론에 도움이 될 수 있음을 보여줬어. 그래서 CoT는 처음부터 "모델을 바꾸는 기술"이 아니라, [프롬프트 엔지니어링](/ko/wiki/prompt-engineering/) 안에서 쓰는 도구로 읽는 게 맞아.

## 어떻게 작동하나
CoT는 모델 안에 없는 지식을 새로 넣는 게 아니라, 이미 할 수 있는 작업을 더 순서 있게 풀도록 유도해. 보통은 "한 번에 답해줘"보다 "조건을 나눠 보고 결론을 정리해줘"처럼 요청하는 식으로 작동하고, 수학 문제, 일정 짜기, 코드 원인 분석처럼 단계가 2개 이상 필요한 작업에서 특히 잘 맞아.

실무에서는 요청 문장을 짧게 붙이는 편이 가장 편해.
- `조건을 먼저 1개씩 확인하고, 마지막에 결론만 말해줘.`
- `계산을 한 번 검산한 뒤 답해줘.`
- `선택지별 장단점을 비교하고 추천안을 골라줘.`

예를 들면:
- 복잡한 계산 검산
- 여러 조건이 엮인 계획 세우기
- 버그 원인을 2단계 이상으로 좁히는 코드 분석

반대로 짧은 번역, 단순 요약, 즉답형 사실 확인에는 굳이 길게 붙일 이유가 적어. 이럴 땐 CoT를 얹기보다 아예 요청을 짧고 명확하게 만드는 편이 더 낫다.

## 왜 중요한가
이 기법은 모델이 "무슨 답을 낼지"보다 "어떤 순서로 풀지"를 정리할 때 힘을 써. 그래서 출력의 정확도만 보는 문제보다, 추론 경로가 중요한 작업에서 판단 품질을 끌어올리는 데 도움이 돼.

특히 모델이 답을 대충 맞히는 것처럼 보여도, 중간 단계에서 실수가 잦은 작업에는 도움이 돼. 수학, 논리 퍼즐, 정책 비교, 코드 리뷰 같은 상황이 여기에 들어가.

동시에 CoT를 붙였다고 항상 더 좋아지는 건 아니야. [OpenAI](/ko/wiki/openai/)의 reasoning best practices는 최신 [추론 모델](/ko/wiki/reasoning/)에선 "think step by step" 같은 직접 지시가 오히려 불필요하거나 방해가 될 수 있다고 설명해. 그래서 프롬프트를 고치는 게 맞는지, 모델 자체를 [o3](/ko/wiki/o3/)나 [딥시크 R1](/ko/wiki/deepseek-r1/) 같은 추론형으로 바꾸는 게 맞는지 먼저 나눠 보는 판단 기준이 중요해.

정리하면 이거야:
- 문제를 더 잘 설명하면 풀릴 것 같으면 CoT를 써.
- 모델 자체의 추론 성능이 병목이면 [추론 모델](/ko/wiki/reasoning/)로 바꿔.
- 너무 단순한 요청이면 CoT를 빼고 바로 물어봐.
