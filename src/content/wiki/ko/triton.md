---
term: triton
title: "Triton Inference Server"
lang: ko
summary: "모델 서빙과 추론 성능 작업에 자주 쓰이는 AI 도구다. 모델 자체보다 실제 사용 흐름을 바꾸는 쪽에 가깝다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://github.com/triton-inference-server/server"
      title: "triton-inference-server/server"
    - url: "https://developer.nvidia.com/triton-inference-server"
      title: "NVIDIA Dynamo-Triton"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Triton Inference Server"
        - "분류 대조: 도구"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "triton-inference-server/server (https://github.com/triton-inference-server/server)"
        - "NVIDIA Dynamo-Triton (https://developer.nvidia.com/triton-inference-server)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
모델 서빙과 추론 성능 작업에 쓰이는 AI 도구다. 쉽게 말하면 모델을 빠르고 안정적으로 서빙하는 추론 런타임을 실제 제품과 워크플로로 옮긴 쪽에 가깝다.
## 실제로 무엇을 하나
모델 자체라기보다 모델 서빙과 추론 성능 작업을 실제로 굴리는 도구 쪽에 가깝다. 요청을 배치로 묶고, 메모리를 재사용하고, GPU 자원을 효율적으로 써서 같은 모델도 더 싸고 빠르게 서비스하게 만든다. 그래서 기능 목록보다 어떤 병목을 줄여 주는지로 읽는 편이 이해가 빠르다.
## 왜 중요한가
실무에서는 모델 자체보다 추론 스택이 지연 시간과 비용을 좌우하는 경우가 많다. 실무에서는 도구 이름을 모델 이름처럼 오해하면 실제 도입 범위와 필요한 연결 작업을 잘못 보기 쉽다.
## 관련 용어
- [vLLM](/ko/wiki/vllm/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.
- [SGLang](/ko/wiki/sglang/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.
- [Ollama](/ko/wiki/ollama/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.
- [Inference](/ko/wiki/inference/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.