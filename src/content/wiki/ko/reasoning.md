---
term: reasoning
title: "Reasoning Model"
lang: ko
summary: "Reasoning Model은 답을 바로 찍기보다 중간 추론 단계를 더 길게 사용하도록 설계한 LLM 계열이야."
readerValue: "이 말이 단순 속도 경쟁이 아니라 복잡한 문제 해결 방식 변화를 뜻한다는 점을 먼저 읽는 데 도움이 돼."
category: concept
aliases:
  - "reasoning model"
  - "추론 모델"
  - "reasoning"
relatedTerms:
  - llm
firstMentioned: "2025-01-20"
mentionCount: 25
draft: false
tags:
  - thinking
  - planning
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://platform.openai.com/docs/guides/reasoning-best-practices"
      title: "Reasoning best practices | OpenAI API"
    - url: "https://www.anthropic.com/news/visible-extended-thinking"
      title: "Claude&#x27;s extended thinking"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 복잡한 추론과 계획를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 복잡한 추론과 계획를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 Reasoning Model로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 복잡한 추론과 계획를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 복잡한 추론과 계획를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 Reasoning best practices | OpenAI API (https://platform.openai.com/docs/guides/reasoning-best-practices)"
        - "같이 본 출처로는 Claude&#x27;s extended thinking (https://www.anthropic.com/news/visible-extended-thinking)"
    - type: number_verify
      result: pass
      summary: "이 항목에서 복잡한 추론과 계획를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가를 때 필요한 숫자와 이름은 따로 검증해뒀어."
      items:
        - "숫자를 다시 보면 1 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 3 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 27 같은 표기가 실제 기준점으로 잡혀."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 복잡한 추론과 계획를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 복잡한 추론과 계획를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 복잡한 추론과 계획를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Reasoning Model은 복잡한 문제를 풀 때 내부적으로 더 많은 추론 단계를 거치도록 최적화된 언어 모델을 말해.
## 어떻게 작동하나
일반 모델이 빠르게 답을 생성하는 데 강하다면, reasoning 모델은 수학, 계획, 코드 수정처럼 중간 단계가 중요한 문제에서 더 오래 생각하도록 설계돼. 그래서 보통 더 느리고 비싸지만, 어려운 문제에서는 정확도가 높아질 수 있어. 최근의 o1, o3, DeepSeek R1 같은 이름이 이 흐름에 속해. 겉으로는 다 LLM이지만, 실제 제품 포지션은 "빠른 범용 모델"과 "느리지만 복잡한 추론형 모델"로 나뉘는 셈이야.
## 왜 중요한가
요즘 모델 뉴스에서 reasoning이 붙으면 단순 성능 향상보다 문제 해결 방식 변화에 가까워. 이 개념을 알아야 왜 속도와 가격을 희생하면서도 특정 모델이 주목받는지 이해할 수 있어.
## 관련 용어
- [LLM](/ko/wiki/llm/) — 기본 언어 모델 개념을 같이 보면 맥락이 훨씬 빨리 잡힌다.
