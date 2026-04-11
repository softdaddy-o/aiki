---
term: runtime
title: "Runtime"
lang: ko
summary: "Runtime은 모델 파일을 실제 하드웨어에서 로드하고 실행하며 입출력과 메모리를 관리하는 실행 계층이다."
readerValue: "이 단어를 보면 단순한 라이브러리 이름인지, 모델을 실제 서비스에서 돌리는 실행 계층인지 바로 갈라서 이해해야 한다."
category: framework
aliases:
  - "런타임"
  - "inference runtime"
  - "추론 런타임"
relatedTerms:
  - inference
  - vllm
  - sglang
  - triton
mentionCount: 0
draft: false
tags:
  - serving
  - deployment
  - systems
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://onnxruntime.ai/"
      title: "ONNX Runtime"
    - url: "https://triton-inference-server.github.io/"
      title: "NVIDIA Triton Inference Server"
  checks:
    - type: source_match
      result: pass
      summary: "런타임을 모델 실행 계층으로 설명하는지, 단순 프레임워크나 모델 자체와 혼동하지 않는지 먼저 봤다."
      items:
        - "핵심을 로드, 실행, 메모리 관리, 입출력 처리로 잡았다."
        - "카테고리는 구현 계층 성격이 강해서 framework로 뒀다."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "ONNX Runtime과 Triton 문서를 같이 보고 배포 문맥에서 쓰는 의미가 맞는지 교차 확인했다."
      items:
        - "두 문서 모두 모델을 실제 하드웨어에서 효율적으로 실행하는 계층으로 설명한다."
        - "서빙, 배치 처리, 최적화가 runtime 논의와 붙는다는 점을 확인했다."
    - type: number_verify
      result: skip
      summary: "런타임은 특정 수치보다 역할 구분이 중요해서 숫자 검증은 생략했다."
      items:
        - "성능 수치는 런타임마다 달라서 정의 항목에서는 일반화하지 않았다."
    - type: adversarial
      result: pass
      summary: "런타임을 운영체제나 단순 SDK와 같은 말로 읽지 않도록 경계를 분리했다."
      items:
        - "모델 파일만 있다고 실행되지 않고, 실제 추론 런타임이 필요하다는 점을 분명히 했다."
        - "vLLM, SGLang, Triton 같은 구체 런타임과 연결되도록 구성했다."
---
## 한 줄 정의
런타임은 모델을 실제 환경에서 읽어 올리고 돌리는 실행 엔진이야.

## 어떻게 작동하나
모델 가중치와 토크나이저, 연산 그래프를 메모리에 올린 다음 입력을 받아 추론을 수행하고 결과를 반환해. 이 과정에서 배치 처리, 캐시, GPU 메모리 배분, 스트리밍 출력 같은 운영 세부를 맡는 층이 바로 runtime이야.

## 왜 중요한가
같은 모델이라도 어떤 런타임 위에서 돌리느냐에 따라 처리량, 지연시간, 메모리 사용량이 크게 달라져. 그래서 기사에서 runtime이 나오면 모델 품질 이야기보다 실제 운영 성능과 배포 난이도 이야기일 가능성이 높아.

## 관련 용어
- [Inference](/ko/wiki/inference/)
- [vLLM](/ko/wiki/vllm/)
- [SGLang](/ko/wiki/sglang/)
- [Triton](/ko/wiki/triton/)
