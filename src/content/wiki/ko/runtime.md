---
term: runtime
title: "Runtime(런타임)"
lang: ko
summary: "Runtime(런타임)은 저장된 모델을 실제 하드웨어에서 돌려서 응답을 뽑아내는 실행 계층이야."
readerValue: "이 말을 보면 모델 이름이 아니라, 모델을 실제로 돌리는 엔진 쪽 이야기라는 걸 바로 잡을 수 있어."
category: framework
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "런타임"
  - "inference runtime"
  - "추론 런타임"
relatedTerms:
  - bentoml
  - vllm
  - quantization
  - inference
firstMentioned: "2026-04-09"
mentionCount: 1
draft: false
tags:
  - serving
  - deployment
  - systems
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://onnxruntime.ai/"
      title: "ONNX Runtime | Home"
    - url: "https://developer.nvidia.com/triton-inference-server"
      title: "NVIDIA Dynamo-Triton"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "실행 계층이라는 설명이 원문 축이랑 맞는지 맞춰봤어."
      items:
        - "독자 문제 대조: 이 글은 런타임을 먼저 모델을 실제로 돌리는 엔진으로 잡아서 모델명처럼 읽히지 않게 했어."
        - "원문 대조: ONNX Runtime과 Triton 소개 모두 실행, 가속, 추론 제공이라는 공통 역할을 보여 주고 있었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "서로 다른 도구 설명을 비교해도 같은 층위인지 다시 봤어."
      items:
        - "비교 기준: ONNX Runtime과 Triton 설명이 모두 추론 실행 계층을 가리키는지 비교해 봤어."
        - "교차검증: 범위는 조금 다르지만 둘 다 모델을 실제로 돌려서 응답을 내는 쪽이라는 점은 같았어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "환경 따라 달라지는 성능 수치는 본문에서 줄였어."
      items:
        - "숫자 점검: latency, throughput, QPS 같은 값은 하드웨어와 설정에 따라 크게 달라져서 본문에 안 넣었어."
        - "표현 점검: 숫자 대신 실행 엔진, 메모리 관리, 배치 처리 같은 구조적 역할만 남겼어."
    - type: adversarial
      result: pass
      summary: "서빙 플랫폼 전체와 같은 말로 섞이는 오해는 막았어."
      items:
        - "흔한 오해 점검: 런타임을 배포 플랫폼 전체와 같은 말로 쓰면 도구 선택 기준이 흐려지기 쉬워."
        - "반례 점검: 어떤 도구는 실행 엔진에 가깝고 어떤 도구는 운영 레이어까지 포함한다는 구분을 본문에 남겼어."
---
## 한 줄 정의
Runtime은 저장된 모델 파일을 실제 하드웨어에서 돌려서 [추론](/ko/wiki/inference/) 결과를 내는 실행 계층이야. 모델 자체가 아니라 모델을 먹여서 응답을 꺼내는 엔진 쪽이라고 보면 돼.
## 어떻게 작동하나
런타임은 모델 그래프와 가중치를 읽고, 연산을 어떤 CPU나 GPU 커널로 돌릴지 정하고, 메모리와 배치 처리도 관리해. 실무에선 API 요청이 들어왔을 때 이 계층이 실제 추론을 수행해서 결과를 돌려주는 역할을 맡아.
## 왜 중요한가
모델 품질이 비슷해도 어떤 런타임을 쓰느냐에 따라 응답 속도, 동시 처리량, 운영 비용이 크게 갈려. 그래서 제품 성능을 올릴 때는 모델 선택만큼이나 실행 엔진 선택이 중요해.
## 주의해서 볼 점
런타임을 서빙 플랫폼 전체랑 같은 말로 쓰면 범위가 쉽게 섞여. 어떤 도구는 순수 실행 엔진에 가깝고, 어떤 도구는 배포와 스케줄링까지 포함하니 어디까지 책임지는지 나눠서 봐야 해.
## 관련 용어
- [BentoML](/ko/wiki/bentoml/)은 런타임보다 더 넓은 서빙과 운영 레이어를 다루는 도구로 자주 읽혀. 그래서 실행 엔진과 배포 플랫폼을 구분할 때 같이 보면 좋아.
- [vLLM](/ko/wiki/vllm/)은 특히 LLM 추론 최적화에 초점을 둔 런타임 계열이야. 범용 엔진과 무엇이 다른지 볼 때 좋은 비교점이 돼.
- [Quantization](/ko/wiki/quantization/)은 같은 런타임 위에서도 속도와 메모리 사용을 바꾸는 최적화 기법이야. 런타임 선택과 수치 최적화는 별개 층위야.
- [Inference](/ko/wiki/inference/)는 결과를 내는 행위 자체야. 런타임은 그 행위를 실제 시스템에서 수행하게 만드는 계층이야.