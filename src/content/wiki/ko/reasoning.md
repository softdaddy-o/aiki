---
term: reasoning
title: "Reasoning Model"
lang: ko
summary: "Reasoning Model은 답을 바로 찍기보다 중간 추론 단계를 더 길게 사용하도록 설계한 LLM 계열이야."
readerValue: "이 말이 단순 속도 경쟁이 아니라 복잡한 문제 해결 방식 변화를 뜻한다는 점을 먼저 읽게 해준다."
category: concept
aliases:
  - "reasoning model"
relatedTerms:
  - llm
firstMentioned: "2025-01-20"
mentionCount: 23
draft: false
tags:
  - thinking
  - planning
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://platform.openai.com/docs/guides/reasoning-best-practices"
      title: "https://platform.openai.com/docs/guides/reasoning-best-practices"
    - url: "https://www.anthropic.com/news/visible-extended-thinking"
      title: "Claude&#x27;s extended thinking"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Reasoning Model"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "https://platform.openai.com/docs/guides/reasoning-best-practices (https://platform.openai.com/docs/guides/reasoning-best-practices)"
        - "Claude&#x27;s extended thinking (https://www.anthropic.com/news/visible-extended-thinking)"
    - type: number_verify
      result: pass
      summary: "이 항목에서 같이 언급되는 숫자와 이름은 한 번 더 봤다."
      items:
        - "수치 대조: 27"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Reasoning Model은 복잡한 문제를 풀 때 내부적으로 더 많은 추론 단계를 거치도록 최적화된 언어 모델을 말해.
## 어떻게 작동하나
일반 모델이 빠르게 답을 생성하는 데 강하다면, reasoning 모델은 수학, 계획, 코드 수정처럼 중간 단계가 중요한 문제에서 더 오래 생각하도록 설계돼. 그래서 보통 더 느리고 비싸지만, 어려운 문제에서는 정확도가 높아질 수 있어.

최근의 o1, o3, DeepSeek R1 같은 이름이 이 흐름에 속해. 겉으로는 다 LLM이지만, 실제 제품 포지션은 "빠른 범용 모델"과 "느리지만 복잡한 추론형 모델"로 나뉘는 셈이야.
## 왜 중요한가
요즘 모델 뉴스에서 reasoning이 붙으면 단순 성능 향상보다 문제 해결 방식 변화에 가까워. 이 개념을 알아야 왜 속도와 가격을 희생하면서도 특정 모델이 주목받는지 이해할 수 있어.
## 관련 용어
- [LLM](/ko/wiki/llm/) — 기본 언어 모델 개념을 같이 보면 맥락이 훨씬 빨리 잡힌다.