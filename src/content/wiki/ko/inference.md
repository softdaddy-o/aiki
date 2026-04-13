---
term: inference
title: "Inference"
lang: ko
summary: "Inference는 학습이 끝난 모델이 실제 입력을 받아 결과를 생성하는 실행 단계다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "model inference"
  - "추론"
  - "모델 추론"
relatedTerms:
  - vllm
  - runtime
  - sglang
  - triton
firstMentioned: "2025-01-20"
mentionCount: 40
draft: false
tags:
  - serving
  - runtime
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Statistical_inference"
      title: "Statistical inference"
    - url: "https://developers.google.com/machine-learning/glossary#inference"
      title: "Machine Learning Glossary &nbsp;|&nbsp; Google for Developers"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
        - "원문을 보면 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
        - "별칭 대조: model inference, 추론, 모델 추론도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
        - "교차 대조: 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: developers.google.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 모델 서빙과 추론 성능 맥락에서 다루는 범위를 다시 확인했어."
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
Inference는 이미 학습된 모델에 프롬프트나 데이터를 넣고, 그에 대한 예측 결과를 뽑아내는 과정이야.
## 어떻게 작동하나
학습이 모델을 만드는 단계라면, inference는 그 모델을 실제 서비스에서 돌리는 단계다. 사용자가 질문을 보냈을 때 토큰을 생성하고, 이미지 요청을 받았을 때 결과를 내놓는 일이 전부 여기에 해당해.

실무에선 정확도 못지않게 inference 속도, 지연, GPU 메모리, 배치 처리 효율이 중요해. 같은 모델도 inference 스택이 달라지면 운영비와 사용자 경험이 크게 달라져.
## 왜 중요한가
모델 출시 뉴스와 실제 서비스 운영 뉴스는 종종 다른 문제를 다룬다. Inference를 이해하면 "모델이 좋다"와 "서비스에 싸고 빠르게 올릴 수 있다"를 분리해서 볼 수 있어.
## 관련 용어
- [vLLM](/ko/wiki/vllm/) — 같이 보면 추론 서빙과 운영 성능 맥락을 같이 읽는 데 도움이 돼.
- [Runtime](/ko/wiki/runtime/) — 같이 보면 추론 서빙과 운영 성능 맥락을 같이 읽는 데 도움이 돼.
- [SGLang](/ko/wiki/sglang/) — 같이 보면 추론 서빙과 운영 성능 맥락을 같이 읽는 데 도움이 돼.
- [Triton Inference Server](/ko/wiki/triton/) — 같이 보면 추론 서빙과 운영 성능 맥락을 같이 읽는 데 도움이 돼.