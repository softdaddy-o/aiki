---
term: hallucination
title: "Hallucination"
lang: ko
summary: "Hallucination은 모델이 사실이 아닌 내용을 그럴듯하게 만들어 내는 현상을 뜻한다."
readerValue: "이 말이 성능 향상보다 오류와 위험을 줄이는 안전 장치에 가깝다는 점을 구분하게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)"
      title: "Hallucination (artificial intelligence)"
    - url: "https://www.ibm.com/think/topics/ai-hallucinations"
      title: "What Are AI Hallucinations? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Hallucination"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Hallucination (artificial intelligence) (https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence))"
        - "What Are AI Hallucinations? | IBM (https://www.ibm.com/think/topics/ai-hallucinations)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Hallucination은 LLM이 답을 생성할 때 실제 근거가 없거나 틀린 내용을 자신감 있게 출력하는 문제다.
## 어떻게 작동하나
모델은 본질적으로 다음 토큰을 예측하는 시스템이라, 모르는 정보가 나와도 "가장 그럴듯한" 문장을 이어 쓰려는 경향이 있다. 그래서 출처가 없는 숫자, 존재하지 않는 논문, 잘못된 코드 API를 지어낼 수 있다.

이 문제를 줄이기 위해 RAG, 검증 단계, 도구 호출, 가드레일 같은 보완 장치가 같이 쓰인다. 즉 hallucination은 모델 하나의 결함이라기보다 생성형 시스템 전반의 기본 리스크다.
## 왜 중요한가
AI를 업무에 붙일수록 중요한 건 "가끔 틀린다"가 아니라 "틀려도 너무 그럴듯하다"는 점이다. Hallucination을 이해해야 검증 비용과 운영 리스크를 제대로 볼 수 있다.
## 관련 용어
- [Alignment](/ko/wiki/alignment/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.
- [Guardrail](/ko/wiki/guardrail/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.
- [Grounding](/ko/wiki/grounding/) — 검색과 외부지식 연결 맥락을 같이 잡아 준다.
- [Red Teaming](/ko/wiki/red-teaming/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.