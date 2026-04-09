---
term: red-teaming
title: "Red Teaming"
lang: ko
summary: "안전성과 신뢰성 제어를 개선하거나 연결하는 AI 기법이다. 보통 정확도, 비용, 실행 방식 중 하나를 바꾼다."
readerValue: "이 말이 성능 향상보다 오류와 위험을 줄이는 안전 장치에 가깝다는 점을 구분하게 해준다."
category: technique
aliases:
  - "red teaming"
relatedTerms:
  - eval
  - alignment
  - hallucination
  - guardrail
mentionCount: 0
draft: false
tags:
  - safety
  - testing
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://www.ibm.com/think/topics/red-teaming"
      title: "What is Red Teaming? | IBM"
    - url: "https://www.anthropic.com/news/red-teaming-language-models-to-reduce-harms-methods-scaling-behaviors-and-lessons-learned"
      title: "Red Teaming Language Models to Reduce Harms: Methods, Scaling Behaviors, and Lessons Learned"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Red Teaming"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "What is Red Teaming? | IBM (https://www.ibm.com/think/topics/red-teaming)"
        - "Red Teaming Language Models to Reduce Harms: Methods, Scaling Behaviors, and Lessons Learned (https://www.anthropic.com/news/red-teaming-language-models-to-reduce-harms-methods-scaling-behaviors-and-lessons-learned)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
안전성과 신뢰성 제어를 바꾸거나 개선할 때 쓰는 기법이다. 쉽게 말하면 모델이 위험한 답이나 허위 답을 덜 내게 만드는 안전장치 역할을 한다고 보면 된다.
## 어떻게 작동하나
출력 정책, 거부 기준, 오류 점검, 검증 루프 같은 제어를 넣는 층으로 보면 이해가 쉽다. 그래서 이런 기법은 "무슨 모델이냐"보다 입력, 검색, 학습, 실행 흐름 중 어디에 개입하는지로 이해하는 편이 쉽다.
## 왜 중요한가
실서비스에서는 성능 점수보다 사고 예방과 신뢰성 관리가 더 큰 비용을 좌우한다. 같은 모델도 어떤 기법을 붙이느냐에 따라 정확도, 비용, 지연이 크게 달라진다.
## 관련 용어
- [Eval](/ko/wiki/eval/) — 성능 검증 기준을 같이 잡아 준다.
- [Alignment](/ko/wiki/alignment/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.
- [Hallucination](/ko/wiki/hallucination/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.
- [Guardrail](/ko/wiki/guardrail/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.