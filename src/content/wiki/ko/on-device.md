---
term: on-device
title: "On-device AI"
lang: ko
summary: "On-device AI는 모델 추론을 클라우드가 아니라 스마트폰, 노트북, 엣지 장비 같은 사용자 기기 안에서 직접 실행하는 방식이다."
readerValue: "이 용어를 보면 프라이버시나 비용 얘기만이 아니라, 실제로 모델이 어디서 돌고 어떤 제약을 받는지 바로 구분할 수 있어야 한다."
category: concept
aliases:
  - "온디바이스"
  - "on device"
  - "device ai"
relatedTerms:
  - local-llm
  - quantization
  - runtime
  - gguf
mentionCount: 0
draft: false
tags:
  - local-ai
  - edge-ai
  - deployment
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://developers.google.com/machine-learning/glossary#on-device_inference"
      title: "On-device inference | Google Machine Learning Glossary"
    - url: "https://developer.apple.com/machine-learning/core-ml/"
      title: "Core ML | Apple Developer"
  checks:
    - type: source_match
      result: pass
      summary: "온디바이스 AI를 기기 내부에서 직접 추론을 수행하는 개념으로 설명하는지 먼저 확인했다."
      items:
        - "용어의 중심을 클라우드가 아니라 사용자 기기 내부 실행으로 잡았다."
        - "카테고리는 특정 제품이 아니라 개념이라 concept로 두었다."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "구글과 애플 문서를 같이 보고, 정의가 특정 벤더 마케팅 문구에 치우치지 않는지 맞춰봤다."
      items:
        - "Google은 on-device inference를 기기 내 추론으로 설명한다."
        - "Apple도 Core ML 문서에서 기기 내부 실행과 프라이버시 이점을 강조한다."
    - type: number_verify
      result: skip
      summary: "핵심이 숫자보다 실행 위치와 제약 조건 구분이라 수치 검증은 생략했다."
      items:
        - "이 항목은 성능 수치보다 배포 위치를 이해하는 데 초점이 있다."
    - type: adversarial
      result: pass
      summary: "온디바이스를 단순히 오프라인 모드와 같은 뜻으로 오해하지 않도록 경계를 분리했다."
      items:
        - "온디바이스라고 해서 항상 완전 오프라인인 것은 아니다."
        - "작은 모델, 메모리 제한, 발열, 배터리 제약이 함께 따라온다는 점을 본문에 반영했다."
---
## 한 줄 정의
온디바이스 AI는 모델을 서버에 보내지 않고 사용자 기기 안에서 직접 돌리는 실행 방식이야.

## 어떻게 작동하나
앱이나 런타임이 기기에 맞는 모델 파일과 연산 라이브러리를 함께 들고 있고, 입력이 들어오면 네트워크 왕복 없이 로컬 CPU, GPU, NPU에서 바로 추론을 수행해. 그래서 반응 속도나 프라이버시 이점이 크지만, 메모리·발열·배터리 제약도 같이 받는다.

## 왜 중요한가
기사에서 온디바이스가 나오면 "작은 모델을 로컬에서 실제로 배포할 수 있느냐"를 묻는 말인 경우가 많아. 클라우드 호출 비용을 줄이거나 민감 데이터를 기기 밖으로 내보내지 않으려는 맥락과 자주 붙는다.

## 관련 용어
- [Local LLM](/ko/wiki/local-llm/)
- [Quantization](/ko/wiki/quantization/)
- [Runtime](/ko/wiki/runtime/)
- [GGUF](/ko/wiki/gguf/)
