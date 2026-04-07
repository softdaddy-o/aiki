---
term: triton
title: "Triton Inference Server"
lang: ko
summary: "Triton Inference Server는 최적화된 클라우드 및 에지 추론 솔루션을 제공합니다."
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
  date: "2026-04-07"
  sources:
    - url: "https://github.com/triton-inference-server/server"
      title: "triton-inference-server/server"
    - url: "https://developer.nvidia.com/triton-inference-server"
      title: "NVIDIA Dynamo-Triton"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 한 줄 정의
Triton Inference Server는 Triton Inference Server는 최적화된 클라우드 및 에지 추론 솔루션을 제공합니다라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다라는 설명을 함께 보면, Triton Inference Server가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
Triton Inference Server는 최근 AI 제품, 모델, 워크플로를 읽을 때 기본 맥락을 잡아주는 용어다.
## 관련 용어
- [vllm](/ko/wiki/vllm/)
- [sglang](/ko/wiki/sglang/)
- [ollama](/ko/wiki/ollama/)
- [inference](/ko/wiki/inference/)