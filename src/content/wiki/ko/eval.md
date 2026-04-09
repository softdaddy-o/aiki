---
term: eval
title: "Eval"
lang: ko
summary: "평가와 검증을 개선하거나 연결하는 AI 기법이야. 보통 정확도, 비용, 실행 방식 중 하나를 바꿔."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
category: technique
aliases:
  - "evaluation"
relatedTerms:
  - red-teaming
firstMentioned: "2026-02-20"
mentionCount: 8
draft: false
tags:
  - testing
  - benchmark
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://platform.openai.com/docs/guides/evals"
      title: "Working with evals | OpenAI API"
    - url: "https://huggingface.co/docs/evaluate/index"
      title: "Evaluate on the Hub · Hugging Face"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Eval"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Working with evals | OpenAI API (https://platform.openai.com/docs/guides/evals)"
        - "Evaluate on the Hub · Hugging Face (https://huggingface.co/docs/evaluate/index)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Eval"
        - "숫자가 적은 개념형 항목이라 고정 스펙보다 정의와 분류가 틀리지 않는지 먼저 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
평가와 검증을 바꾸거나 개선할 때 쓰는 기법이야. 쉽게 말하면 모델 성능을 재는 시험대 역할을 한다고 보면 돼.
## 어떻게 작동하나
정답률만 보는 게 아니라 실패 패턴, 재현성, 실제 업무 시나리오 대응력을 비교하는 기준을 만들어. 그래서 이런 기법은 "무슨 모델이냐"보다 입력, 검색, 학습, 실행 흐름 중 어디에 개입하는지로 이해하는 편이 쉬워.
## 왜 중요한가
벤치마크를 모르면 발표문 숫자를 그대로 믿기 쉽고, 반대로 벤치마크만 믿어도 실제 성능을 과대평가하기 쉬워. 같은 모델도 어떤 기법을 붙이느냐에 따라 정확도, 비용, 지연이 크게 달라져.
## 관련 용어
- [Red Teaming](/ko/wiki/red-teaming/) — 안전성·신뢰성 제어 맥락을 같이 이해하게 해 준다.