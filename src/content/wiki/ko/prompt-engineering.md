---
term: prompt-engineering
title: "Prompt Engineering"
lang: ko
summary: "Prompt Engineering은 같은 모델에서도 입력 문장을 설계해 더 안정적이고 원하는 결과를 끌어내는 기법이다."
readerValue: "이 말이 모델 교체가 아니라 입력 설계와 출력 제어를 바꾸는 기법인지 바로 이해하게 해준다."
category: technique
aliases:
  - "prompt engineering"
relatedTerms:
  - chain-of-thought
mentionCount: 0
draft: false
tags:
  - prompting
  - instruction
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Prompt_engineering"
      title: "Prompt engineering"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
      title: "Prompt engineering overview"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Prompt Engineering"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Prompt engineering (https://en.wikipedia.org/wiki/Prompt_engineering)"
        - "Prompt engineering overview (https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Prompt Engineering은 모델에게 어떤 순서와 형식으로 지시를 주면 원하는 결과가 더 잘 나오는지 설계하는 작업이다.
## 어떻게 작동하나
출력 형식을 명시하거나, 역할을 부여하거나, 좋은 예시를 함께 주는 식으로 모델의 응답을 조정한다. 모델을 다시 학습시키지 않고도 결과를 크게 바꿀 수 있다는 점이 핵심이다.

예전에는 프롬프트 문장 몇 개의 요령처럼 보였지만, 지금은 구조화 출력, 도구 호출, 시스템 프롬프트, 평가 루프까지 포함한 설계 작업으로 넓어졌다.
## 왜 중요한가
모델이 같아도 프롬프트 설계에 따라 품질 차이가 크게 난다. 그래서 프롬프트 엔지니어링은 성능 트릭이 아니라 제품 안정성을 좌우하는 운영 기술에 가깝다.
## 관련 용어
- [Chain-of-Thought](/ko/wiki/chain-of-thought/) — 긴 추론과 계획형 작업을 같이 볼 때 도움이 된다.