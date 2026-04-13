---
term: hallucination
title: "Hallucination"
lang: ko
summary: "Hallucination은 모델이 사실이 아닌 내용을 그럴듯하게 만들어 내는 현상을 뜻해."
readerValue: "이 말이 성능 향상보다 오류와 위험을 줄이는 안전 장치에 가깝다는 점을 구분하는 데 도움이 돼."
category: concept
aliases:
  - "ai hallucination"
relatedTerms:
  - alignment
  - guardrail
  - grounding
  - red-teaming
mentionCount: 0
draft: false
tags:
  - reliability
  - safety
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)"
      title: "Hallucination (artificial intelligence)"
    - url: "https://www.ibm.com/think/topics/ai-hallucinations"
      title: "What Are AI Hallucinations? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 AI 환각은 LLM(대형 언어 모델)이 존재하지 않는 패턴이나 개체를 인식하여 무의미하거나 부정확한 출력을 생성하는 경우입니다."
        - "원문을 보면 AI 환각은 LLM(대형 언어 모델)이 존재하지 않는 패턴이나 개체를 인식하여 무의미하거나 부정확한 출력을 생성하는 경우입니다."
        - "별칭 대조: ai hallucination도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 AI 환각은 LLM(대형 언어 모델)이 존재하지 않는 패턴이나 개체를 인식하여 무의미하거나 부정확한 출력을 생성하는 경우입니다."
        - "교차 대조: AI 환각은 LLM(대형 언어 모델)이 존재하지 않는 패턴이나 개체를 인식하여 무의미하거나 부정확한 출력을 생성하는 경우입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: ibm.com."
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
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Hallucination은 LLM이 답을 생성할 때 실제 근거가 없거나 틀린 내용을 자신감 있게 출력하는 문제다.
## 어떻게 작동하나
모델은 본질적으로 다음 토큰을 예측하는 시스템이라, 모르는 정보가 나와도 "가장 그럴듯한" 문장을 이어 쓰려는 경향이 있어. 그래서 출처가 없는 숫자, 존재하지 않는 논문, 잘못된 코드 API를 지어낼 수 있어.

이 문제를 줄이기 위해 RAG, 검증 단계, 도구 호출, 가드레일 같은 보완 장치가 같이 쓰여. 즉 hallucination은 모델 하나의 결함이라기보다 생성형 시스템 전반의 기본 리스커.
## 왜 중요한가
AI를 업무에 붙일수록 중요한 건 "가끔 틀린다"가 아니라 "틀려도 너무 그럴듯하다"는 점이야. Hallucination을 이해해야 검증 비용과 운영 리스크를 제대로 볼 수 있어.
## 관련 용어
- [Alignment](/ko/wiki/alignment/) — Alignment와 비교해 보면 안전성과 신뢰성 제어에서 어디가 다른지 읽기 쉬워.
- [Guardrail](/ko/wiki/guardrail/) — 같이 보면 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼.
- [Grounding](/ko/wiki/grounding/) — 같이 보면 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼.
- [Red Teaming](/ko/wiki/red-teaming/) — 같이 보면 안전성·신뢰성 제어 맥락을 같이 이해하는 데 도움이 돼.