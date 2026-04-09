---
term: guardrail
title: "Guardrail"
lang: ko
summary: "Guardrail은 모델이 위험한 답이나 잘못된 형식의 답을 내지 않도록 앞뒤에서 제어하는 안전 장치다."
readerValue: "이 말이 성능 향상보다 오류와 위험을 줄이는 안전 장치에 가깝다는 점을 구분하게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://www.ibm.com/think/topics/ai-guardrails"
      title: "What Are AI Guardrails? | IBM"
    - url: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/overview"
      title: "Not Found - Claude API Docs"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Guardrail"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "What Are AI Guardrails? | IBM (https://www.ibm.com/think/topics/ai-guardrails)"
        - "Not Found - Claude API Docs (https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/overview)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Guardrail은 LLM 출력이 정책, 형식, 안전 기준을 벗어나지 않도록 필터링하고 제어하는 규칙과 시스템을 말한다.
## 어떻게 작동하나
입력 단계에서 금지 요청을 차단하거나, 출력 단계에서 개인정보·욕설·금지 주제를 걸러내거나, 구조화된 JSON만 통과시키는 식으로 구현할 수 있다. 단일 모델 기능이라기보다 여러 검증 층의 조합인 경우가 많다.

그래서 guardrail은 성능을 높이는 기술이라기보다 사고를 줄이는 운영 장치로 보는 편이 맞다. 특히 고객지원, 금융, 의료처럼 규정이 중요한 환경에서 필수로 붙는다.
## 왜 중요한가
좋은 모델을 고르는 것만으로는 서비스 안전성이 보장되지 않는다. Guardrail을 알아야 왜 많은 AI 제품이 모델 바깥에 별도 제어 계층을 두는지 이해할 수 있다.
## 관련 용어
- [Alignment](/ko/wiki/alignment/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.
- [Hallucination](/ko/wiki/hallucination/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.
- [Red Teaming](/ko/wiki/red-teaming/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.