---
term: chain-of-thought
title: "Chain-of-Thought"
lang: ko
summary: "복잡한 추론과 계획을 개선하거나 연결하는 AI 기법이야. 결국 핵심은 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지를 풀 때 어느 레버를 건드릴지 정하는 데 있어."
readerValue: "이 말이 모델 교체가 아니라 입력 설계와 출력 제어를 바꾸는 기법인지 바로 이해하게 해준다."
category: technique
aliases:
  - "cot"
relatedTerms:
  - prompt-engineering
  - deepseek-r1
  - o3
  - claude-opus
firstMentioned: "2026-03-08"
mentionCount: 3
draft: false
tags:
  - reasoning
  - prompting
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Prompt_engineering"
      title: "Prompt engineering"
    - url: "https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/"
      title: "Language Models Perform Reasoning via Chain of Thought"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지."
        - "이름을 다시 보면 Chain-of-Thought로 잡혀."
        - "분류를 다시 보면 기법로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "여기서 먼저 갈라 볼 기준은 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "비교 출처 1: Prompt engineering (https://en.wikipedia.org/wiki/Prompt_engineering)"
        - "비교 출처 2: Language Models Perform Reasoning via Chain of Thought (https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "이름부터 다시 보면 Chain-of-Thought로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "헷갈리지 않으려면 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
복잡한 추론과 계획을 바꾸거나 개선할 때 쓰는 기법이야. 쉽게 말하면 단순 답변보다 중간 추론 과정을 더 길게 쓰는 사고 레이어 역할을 한다고 보면 돼. 결국 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지를 풀 때 손대는 레버라고 보면 맞아.
## 어떻게 작동하나
한 번에 바로 답을 찍기보다 중간 단계와 계획을 더 많이 쓰도록 설계된 흐름이야. 그래서 속도와 비용 대신 정확도나 복잡한 문제 해결력을 얻는 경우가 많아. 그래서 이런 기법은 "무슨 모델이냐"보다 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지가 어느 단계에서 바뀌는지로 이해하는 편이 쉬워.
## 왜 중요한가
복잡한 분석, 수학, 도구 조합 작업을 볼 때 "왜 느린데도 비싼 모델을 쓰는가"를 설명해 준다. 결국 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지를 어떤 레버로 푸는지에 따라 정확도, 비용, 지연이 크게 달라져.
## 관련 용어
- [Prompt Engineering](/ko/wiki/prompt-engineering/) — Chain-of-Thought를 볼 때 비교 포인트는 복잡한 추론과 계획를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지다.
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 긴 추론과 계획형 작업을 같이 볼 때 도움이 돼.
- [o3](/ko/wiki/o3/) — 긴 추론과 계획형 작업을 같이 볼 때 도움이 돼.
- [Claude Opus](/ko/wiki/claude-opus/) — 긴 추론과 계획형 작업을 같이 볼 때 도움이 돼.