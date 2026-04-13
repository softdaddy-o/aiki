---
term: triton
title: "Triton Inference Server"
lang: ko
summary: "NVIDIA가 제공하는 모델 서빙용 추론 서버로, 여러 프레임워크 모델을 하나의 운영 계층에서 배포할 때 자주 쓰여."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하는 데 도움이 돼."
category: tool
aliases:
  - "triton inference server"
relatedTerms:
  - vllm
  - sglang
  - ollama
  - inference
mentionCount: 0
draft: false
tags:
  - serving
  - inference
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://github.com/triton-inference-server/server"
      title: "triton-inference-server/server"
    - url: "https://developer.nvidia.com/triton-inference-server"
      title: "NVIDIA Dynamo-Triton"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다."
        - "원문을 보면 이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다."
        - "별칭 대조: triton inference server도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "교차 대조: 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "출처 1 대조: github.com."
        - "출처 2 대조: developer.nvidia.com."
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
        - "헷갈리기 쉬운 건 모델 자체와 같은 말로 쓰면 제품 층위와 운영 층위가 섞이기 쉬워."
        - "헷갈리기 쉬운 건 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
이 도구는 개별 모델 이름이 아니라, TensorRT·PyTorch·ONNX 같은 여러 형식을 공통 추론 서버 형태로 운영하게 만드는 배포 계층에 가까워.
## 실제로 무엇을 하나
핵심은 모델 자체보다 batching, cache, GPU 메모리 사용, 서버 API 같은 운영 요소를 다루는 데 있어. 같은 모델이라도 이 계층을 어떻게 두느냐에 따라 지연 시간과 비용이 크게 달라질 수 있어.

실무에선 여러 모델을 한 묶음으로 서빙하거나, 특정 프레임워크에 묶이지 않고 공통 추론 계층을 두고 싶을 때 많이 검토해. 그래서 기사를 읽을 때도 "새 모델인가"보다 "기존 모델을 어떤 방식으로 배포하고 최적화하나"를 보는 편이 맞아.
## 왜 중요한가
서빙 계층을 따로 이해하면 모델 성능 기사와 운영 기사 사이를 헷갈리지 않게 돼. 같은 모델을 쓰더라도 추론 서버 구성에 따라 비용, 지연 시간, 운영 책임이 크게 달라지기 때문이야.
## 관련 용어
- [vLLM](/ko/wiki/vllm/) — vLLM와 비교해 보면 모델 서빙과 추론 성능에서 어디가 다른지 읽기 쉬워.
- [SGLang](/ko/wiki/sglang/) — SGLang와 비교해 보면 모델 서빙과 추론 성능에서 어디가 다른지 읽기 쉬워.
- [Ollama](/ko/wiki/ollama/) — Ollama와 비교해 보면 모델 서빙과 추론 성능에서 어디가 다른지 읽기 쉬워.
- [Inference](/ko/wiki/inference/) — Inference와 함께 보면 Triton Inference Server가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.