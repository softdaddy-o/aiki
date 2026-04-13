---
term: runtime
title: "Runtime"
lang: ko
summary: "Runtime는 이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하는 데 도움이 돼."
category: framework
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
  date: "2026-04-13"
  sources:
    - url: "https://onnxruntime.ai/"
      title: "ONNX Runtime | Home"
    - url: "https://developer.nvidia.com/triton-inference-server"
      title: "NVIDIA Dynamo-Triton"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다."
        - "원문을 보면 이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다."
        - "별칭 대조: 런타임, inference runtime, 추론 런타임도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 프레임워크로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다."
        - "교차 대조: 이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다."
        - "출처 1 대조: onnxruntime.ai."
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
        - "헷갈리기 쉬운 건 완제품이나 단일 모델처럼 읽으면 직접 조립해야 하는 범위를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Runtime를 짧게 잡으면 이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다 쪽이야. 데이터 저장만이 아니라 인증, 스토리지, 함수, API 레이어를 어디까지 한 번에 묶는지 같이 봐야 해.
## 실제로 무엇을 하나
이전 NVIDIA Triton Inference Server였던 NVIDIA Dynamo-Triton을 사용하면 TensorRT, PyTorch, ONNX 등을 포함한 주요 프레임워크 전반에 걸쳐 AI 모델을 배포할 수 있습니다. 데이터 저장만이 아니라 인증, 스토리지, 함수, API 레이어를 어디까지 한 번에 묶는지 같이 봐야 해. 예를 들어 로그인, 데이터 저장, 파일 업로드, 서버 함수까지 한 화면에서 붙이는 백엔드 시제품을 만들 때 차이가 크게 드러나.
## 왜 중요한가
실무에선 모델 자체보다 추론 스택이 지연 시간과 비용을 좌우하는 경우가 많아. 완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여.
## 관련 용어
- [BentoML](/ko/wiki/bentoml/) — BentoML와 함께 보면 Runtime가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [vLLM](/ko/wiki/vllm/) — vLLM와 함께 보면 Runtime가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [Quantization](/ko/wiki/quantization/) — Quantization와 함께 보면 Runtime가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [Inference](/ko/wiki/inference/) — Inference와 함께 보면 Runtime가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.