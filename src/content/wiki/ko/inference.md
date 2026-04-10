---
term: inference
title: "Inference"
lang: ko
summary: "Inference는 학습이 끝난 모델이 실제 입력을 받아 결과를 생성하는 실행 단계다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
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
  date: "2026-04-10"
  sources:
    - url: "https://en.wikipedia.org/wiki/Statistical_inference"
      title: "Statistical inference"
    - url: "https://developers.google.com/machine-learning/glossary#inference"
      title: "Machine Learning Glossary &nbsp;|&nbsp; Google for Developers"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 Inference로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 Statistical inference (https://en.wikipedia.org/wiki/Statistical_inference)"
        - "같이 본 출처로는 Machine Learning Glossary &nbsp;|&nbsp; Google for Developers (https://developers.google.com/machine-learning/glossary#inference)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름부터 다시 보면 Inference로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 모델 서빙과 추론 성능를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Inference는 이미 학습된 모델에 프롬프트나 데이터를 넣고, 그에 대한 예측 결과를 뽑아내는 과정이야.
## 어떻게 작동하나
학습이 모델을 만드는 단계라면, inference는 그 모델을 실제 서비스에서 돌리는 단계다. 사용자가 질문을 보냈을 때 토큰을 생성하고, 이미지 요청을 받았을 때 결과를 내놓는 일이 전부 여기에 해당해. 실무에선 정확도 못지않게 inference 속도, 지연, GPU 메모리, 배치 처리 효율이 중요해. 같은 모델도 inference 스택이 달라지면 운영비와 사용자 경험이 크게 달라져.
## 왜 중요한가
모델 출시 뉴스와 실제 서비스 운영 뉴스는 종종 다른 문제를 다룬다. Inference를 이해하면 "모델이 좋다"와 "서비스에 싸고 빠르게 올릴 수 있다"를 분리해서 볼 수 있어.
## 관련 용어
- [vLLM](/ko/wiki/vllm/) — 추론 서빙과 운영 성능 맥락을 같이 읽는 데 도움이 돼. - [SGLang](/ko/wiki/sglang/) — 추론 서빙과 운영 성능 맥락을 같이 읽는 데 도움이 돼. - [Triton Inference Server](/ko/wiki/triton/) — 추론 서빙과 운영 성능 맥락을 같이 읽는 데 도움이 돼. - [BentoML](/ko/wiki/bentoml/) — 추론 서빙과 운영 성능 맥락을 같이 읽는 데 도움이 돼.