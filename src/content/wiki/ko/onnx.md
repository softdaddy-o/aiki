---
term: onnx
title: "ONNX(오닉스)"
lang: ko
summary: "ONNX(오닉스)는 한 프레임워크에서 만든 모델을 다른 런타임과 배포 환경으로 옮기기 쉽게 만든 공통 포맷이야."
readerValue: "이 이름을 보면 모델 자체인지 실행 엔진인지 헷갈리지 않고, 중간 표현 형식이라는 걸 바로 잡을 수 있어."
category: framework
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "ONNX(오닉스)"
relatedTerms:
  - quantization
  - runtime
  - modal
  - on-device
mentionCount: 0
draft: false
tags:
  - interoperability
  - deployment
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Open_Neural_Network_Exchange"
      title: "Open Neural Network Exchange"
    - url: "https://onnx.ai/"
      title: "ONNX | Home"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "포맷이라는 핵심 정의가 원문 축이랑 맞는지 맞춰봤어."
      items:
        - "독자 문제 대조: 이 글은 ONNX를 먼저 모델 표현용 공통 포맷으로 잡아서 런타임이나 플랫폼으로 오해하지 않게 했어."
        - "원문 대조: 백과 설명과 ONNX 공식 홈 모두 모델을 표현하고 옮기기 위한 표준 형식이라는 점을 공통으로 말하고 있었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "백과 설명과 공식 설명이 같은 역할을 가리키는지 다시 봤어."
      items:
        - "비교 기준: 백과 설명과 공식 홈 설명이 모두 ONNX를 표현 표준으로 설명하는지 비교해 봤어."
        - "교차검증: 둘 다 다양한 프레임워크, 도구, 런타임 사이에서 모델을 옮기기 위한 공통 형식이라고 보고 있었어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "버전과 연산자 수 같은 가변 숫자는 본문에서 줄였어."
      items:
        - "숫자 점검: opset 번호나 지원 연산자 개수처럼 시간이 지나며 달라지는 수치는 본문에 안 넣었어."
        - "표현 점검: 숫자 대신 이식성, 변환 실패 가능성, 런타임 검증 필요성만 남겼어."
    - type: adversarial
      result: pass
      summary: "만능 변환기나 실행 엔진으로 읽힐 부분은 막았어."
      items:
        - "흔한 오해 점검: ONNX만 있으면 어떤 모델이든 아무 문제 없이 어디서나 돈다고 생각하기 쉬워."
        - "반례 점검: 변환이 깨지거나 성능이 달라질 수 있다는 한계를 본문에 남겼어."
---
## 한 줄 정의
ONNX는 머신러닝 모델을 표현하는 공통 포맷이야. 한 프레임워크에서 만든 모델을 다른 런타임이나 배포 환경으로 넘기기 쉽게 하려고 쓰는 중간 표준이라고 보면 돼.
## 어떻게 작동하나
모델의 그래프 구조와 연산자를 ONNX 형식으로 내보내면, 그 형식을 이해하는 런타임이나 컴파일러가 다른 환경에서 실행해. 그래서 학습은 한 프레임워크에서 하고 배포는 ONNX를 읽는 엔진으로 넘기는 흐름이 자주 나와.
## 왜 중요한가
실무에선 모델 품질만큼 어디서 얼마나 쉽게 돌릴 수 있는지도 중요해서 공통 포맷의 가치가 커. 특히 모바일, 엣지, 서버처럼 환경이 갈라질수록 ONNX는 이식성을 높이는 접점이 돼.
## 주의해서 볼 점
ONNX가 만능 변환기라는 뜻은 아니고, 지원 안 되는 연산자나 프레임워크 특수 기능이 있으면 변환이 깨질 수 있어. 변환에 성공해도 원래 프레임워크와 똑같은 성능이 바로 나오진 않을 수 있어서 런타임별 검증이 필요해.
## 관련 용어
- [Runtime](/ko/wiki/runtime/)은 ONNX 파일을 실제로 읽고 실행하는 계층이야. 포맷과 실행 엔진은 같은 말이 아니라는 점이 중요해.
- [Quantization](/ko/wiki/quantization/)은 ONNX 모델을 더 가볍게 배포할 때 자주 같이 붙는 최적화 기법이야. 포맷을 바꾸는 일과 수치를 줄이는 일은 구분해서 봐야 해.
- [Modal](/ko/wiki/modal/)은 배포와 실행 환경을 서비스로 다루는 쪽에 더 가까워. ONNX는 그보다 아래쪽의 모델 표현 형식이라고 보면 돼.
- [On-device AI](/ko/wiki/on-device/)는 ONNX가 왜 자주 언급되는지 보여 주는 대표 배포 맥락이야. 기기마다 다른 실행 환경을 넘나들 때 ONNX의 의미가 커져.