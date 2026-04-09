---
term: prompt-engineering
title: "Prompt Engineering"
lang: ko
summary: "Prompt Engineering은 같은 모델에서도 입력 문장을 설계해 더 안정적이고 원하는 결과를 끌어내는 기법이야."
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
      summary: "이 페이지를 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지"
        - "용어명 대조: Prompt Engineering"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "비교 기준: 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지"
        - "Prompt engineering (https://en.wikipedia.org/wiki/Prompt_engineering)"
        - "Prompt engineering overview (https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "선택 기준 대조: 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지"
        - "명칭 대조: Prompt Engineering"
        - "고정 스펙이 적은 항목이라 숫자 대신 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "오해 방지 기준: 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지"
        - "정의와 역할보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈다."
      findings:
        - "이 페이지는 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Prompt Engineering은 모델에게 어떤 순서와 형식으로 지시를 주면 원하는 결과가 더 잘 나오는지 설계하는 작업이야.
## 어떻게 작동하나
출력 형식을 명시하거나, 역할을 부여하거나, 좋은 예시를 함께 주는 식으로 모델의 응답을 조정해. 모델을 다시 학습시키지 않고도 결과를 크게 바꿀 수 있다는 점이 관건이야.

예전에는 프롬프트 문장 몇 개의 요령처럼 보였지만, 지금은 구조화 출력, 도구 호출, 시스템 프롬프트, 평가 루프까지 포함한 설계 작업으로 넓어졌다.
## 왜 중요한가
모델이 같아도 프롬프트 설계에 따라 품질 차이가 크게 난다. 그래서 프롬프트 엔지니어링은 성능 트릭이 아니라 제품 안정성을 좌우하는 운영 기술에 가까워.
## 관련 용어
- [Chain-of-Thought](/ko/wiki/chain-of-thought/) — Prompt Engineering를 볼 때 비교 포인트는 입력 설계와 출력 제어를 정확도, 비용, 실행 흐름 중 어디서 바꿔야 하는지다.