---
term: guardrail
title: "Guardrail"
lang: ko
summary: "Guardrail은 모델이 위험한 답이나 잘못된 형식의 답을 내지 않도록 앞뒤에서 제어하는 안전 장치다."
readerValue: "이 말이 성능 향상보다 오류와 위험을 줄이는 안전 장치에 가깝다는 점을 구분하는 데 도움이 돼."
category: technique
aliases:
  - "guardrails"
relatedTerms:
  - alignment
  - hallucination
  - red-teaming
mentionCount: 0
draft: false
tags:
  - safety
  - policy
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://www.ibm.com/think/topics/ai-guardrails"
      title: "What Are AI Guardrails? | IBM"
    - url: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/overview"
      title: "Not Found - Claude API Docs"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "이름을 다시 보면 Guardrail로 잡혀."
        - "분류를 다시 보면 기법로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "같이 본 출처로는 What Are AI Guardrails? | IBM (https://www.ibm.com/think/topics/ai-guardrails)"
        - "같이 본 출처로는 Not Found - Claude API Docs (https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/overview)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지야."
        - "이름부터 다시 보면 Guardrail로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Guardrail은 LLM 출력이 정책, 형식, 안전 기준을 벗어나지 않도록 필터링하고 제어하는 규칙과 시스템을 말해.
## 어떻게 작동하나
입력 단계에서 금지 요청을 차단하거나, 출력 단계에서 개인정보·욕설·금지 주제를 걸러내거나, 구조화된 JSON만 통과시키는 식으로 구현할 수 있어. 단일 모델 기능이라기보다 여러 검증 층의 조합인 경우가 많아. 그래서 guardrail은 성능을 높이는 기술이라기보다 사고를 줄이는 운영 장치로 보는 편이 맞아. 특히 고객지원, 금융, 의료처럼 규정이 중요한 환경에서 필수로 붙어.
## 왜 중요한가
좋은 모델을 고르는 것만으로는 서비스 안전성이 보장되지 않아. Guardrail을 알아야 왜 많은 AI 제품이 모델 바깥에 별도 제어 계층을 두는지 이해할 수 있어.
## 관련 용어
- [Alignment](/ko/wiki/alignment/) — 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼. - [Hallucination](/ko/wiki/hallucination/) — 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼. - [Red Teaming](/ko/wiki/red-teaming/) — Guardrail를 볼 때 비교 포인트는 안전성과 신뢰성 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지다.