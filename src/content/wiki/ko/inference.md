---
term: inference
title: "Inference"
lang: ko
summary: "Inference는 학습이 끝난 모델이 실제 입력을 받아 결과를 생성하는 실행 단계다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "model inference"
relatedTerms:
  - vllm
  - sglang
  - triton
  - bentoml
firstMentioned: "2026-02-16"
mentionCount: 9
draft: false
tags:
  - serving
  - runtime
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Statistical_inference"
      title: "Statistical inference"
    - url: "https://developers.google.com/machine-learning/glossary#inference"
      title: "機械学習の用語集
   &nbsp;|&nbsp; Machine Learning &nbsp;|&nbsp; Google for Developers"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Inference"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Statistical inference (https://en.wikipedia.org/wiki/Statistical_inference)"
        - "機械学習の用語集
   &nbsp;|&nbsp; Machine Learning &nbsp;|&nbsp; Google for Developers (https://developers.google.com/machine-learning/glossary#inference)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Inference"
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
Inference는 이미 학습된 모델에 프롬프트나 데이터를 넣고, 그에 대한 예측 결과를 뽑아내는 과정이야.
## 어떻게 작동하나
학습이 모델을 만드는 단계라면, inference는 그 모델을 실제 서비스에서 돌리는 단계다. 사용자가 질문을 보냈을 때 토큰을 생성하고, 이미지 요청을 받았을 때 결과를 내놓는 일이 전부 여기에 해당해.

실무에서는 정확도 못지않게 inference 속도, 지연, GPU 메모리, 배치 처리 효율이 중요해. 같은 모델도 inference 스택이 달라지면 운영비와 사용자 경험이 크게 달라져.
## 왜 중요한가
모델 출시 뉴스와 실제 서비스 운영 뉴스는 종종 다른 문제를 다룬다. Inference를 이해하면 "모델이 좋다"와 "서비스에 싸고 빠르게 올릴 수 있다"를 분리해서 볼 수 있어.
## 관련 용어
- [vLLM](/ko/wiki/vllm/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.
- [SGLang](/ko/wiki/sglang/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.
- [Triton Inference Server](/ko/wiki/triton/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.
- [BentoML](/ko/wiki/bentoml/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.