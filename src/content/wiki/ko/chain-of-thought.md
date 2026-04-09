---
term: chain-of-thought
title: "Chain-of-Thought"
lang: ko
summary: "복잡한 추론과 계획을 개선하거나 연결하는 AI 기법이다. 보통 정확도, 비용, 실행 방식 중 하나를 바꾼다."
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
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Chain-of-Thought"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Prompt engineering (https://en.wikipedia.org/wiki/Prompt_engineering)"
        - "Language Models Perform Reasoning via Chain of Thought (https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
복잡한 추론과 계획을 바꾸거나 개선할 때 쓰는 기법이다. 쉽게 말하면 단순 답변보다 중간 추론 과정을 더 길게 쓰는 사고 레이어 역할을 한다고 보면 된다.
## 어떻게 작동하나
한 번에 바로 답을 찍기보다 중간 단계와 계획을 더 많이 쓰도록 설계된 흐름이다. 그래서 속도와 비용 대신 정확도나 복잡한 문제 해결력을 얻는 경우가 많다. 그래서 이런 기법은 "무슨 모델이냐"보다 입력, 검색, 학습, 실행 흐름 중 어디에 개입하는지로 이해하는 편이 쉽다.
## 왜 중요한가
복잡한 분석, 수학, 도구 조합 작업을 볼 때 "왜 느린데도 비싼 모델을 쓰는가"를 설명해 준다. 같은 모델도 어떤 기법을 붙이느냐에 따라 정확도, 비용, 지연이 크게 달라진다.
## 관련 용어
- [Prompt Engineering](/ko/wiki/prompt-engineering/) — 입력 설계와 출력 제어 맥락을 같이 잡아 준다.
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 긴 추론과 계획형 작업을 같이 볼 때 도움이 된다.
- [o3](/ko/wiki/o3/) — 긴 추론과 계획형 작업을 같이 볼 때 도움이 된다.
- [Claude Opus](/ko/wiki/claude-opus/) — 긴 추론과 계획형 작업을 같이 볼 때 도움이 된다.