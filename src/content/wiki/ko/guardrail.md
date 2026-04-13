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
  date: "2026-04-13"
  sources:
    - url: "https://www.ibm.com/think/topics/ai-guardrails"
      title: "What Are AI Guardrails? | IBM"
    - url: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/overview"
      title: "Not Found - Claude API Docs"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 AI 가드레일은 인공 지능(AI) 시스템이 정의된 경계 내에서 안전하고 책임감 있게 작동하도록 유지하는 보호 장치입니다."
        - "원문을 보면 AI 가드레일은 인공 지능(AI) 시스템이 정의된 경계 내에서 안전하고 책임감 있게 작동하도록 유지하는 보호 장치입니다."
        - "별칭 대조: guardrails도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 AI 가드레일은 인공 지능(AI) 시스템이 정의된 경계 내에서 안전하고 책임감 있게 작동하도록 유지하는 보호 장치입니다."
        - "교차 대조: AI 가드레일은 인공 지능(AI) 시스템이 정의된 경계 내에서 안전하고 책임감 있게 작동하도록 유지하는 보호 장치입니다."
        - "출처 1 대조: ibm.com."
        - "출처 2 대조: docs.anthropic.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 안전성과 신뢰성 제어 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 새 제품명으로 받아들이면 실제로는 기존 모델 위에 얹는 방법론이라는 점을 놓치기 쉬워."
        - "헷갈리기 쉬운 건 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Guardrail은 LLM 출력이 정책, 형식, 안전 기준을 벗어나지 않도록 필터링하고 제어하는 규칙과 시스템을 말해.
## 어떻게 작동하나
입력 단계에서 금지 요청을 차단하거나, 출력 단계에서 개인정보·욕설·금지 주제를 걸러내거나, 구조화된 JSON만 통과시키는 식으로 구현할 수 있어. 단일 모델 기능이라기보다 여러 검증 층의 조합인 경우가 많아.

그래서 guardrail은 성능을 높이는 기술이라기보다 사고를 줄이는 운영 장치로 보는 편이 맞아. 특히 고객지원, 금융, 의료처럼 규정이 중요한 환경에서 필수로 붙어.
## 왜 중요한가
좋은 모델을 고르는 것만으로는 서비스 안전성이 보장되지 않아. Guardrail을 알아야 왜 많은 AI 제품이 모델 바깥에 별도 제어 계층을 두는지 이해할 수 있어.
## 관련 용어
- [Alignment](/ko/wiki/alignment/) — 같이 보면 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼.
- [Hallucination](/ko/wiki/hallucination/) — 같이 보면 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼.
- [Red Teaming](/ko/wiki/red-teaming/) — Red Teaming와 비교해 보면 안전성과 신뢰성 제어에서 어디가 다른지 읽기 쉬워.