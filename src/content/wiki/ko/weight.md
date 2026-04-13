---
term: weight
title: "Model Weights"
lang: ko
summary: "Model Weights는 학습이 끝난 뒤 모델 안에 저장된 수치 파라미터 묶음으로, 실제 성능과 배포 가능성을 좌우하는 핵심 자산이다."
readerValue: "웨이트라는 말을 보면 코드 저장소와 모델 자체를 구분하고, 실제로 배포하거나 파인튜닝할 수 있는 대상이 무엇인지 바로 알아야 한다."
category: concept
aliases:
  - "웨이트"
  - "weights"
  - "가중치"
  - "model weights"
relatedTerms:
  - quantization
  - fine-tuning
  - gguf
  - onnx
mentionCount: 0
draft: true
tags:
  - model-files
  - open-model
  - deployment
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://huggingface.co/docs/transformers/main/en/model_sharing"
      title: "Model sharing | Hugging Face Transformers"
    - url: "https://en.wikipedia.org/wiki/Weighting"
      title: "Weighting"
  checks:
    - type: source_match
      result: pass
      summary: "웨이트를 모델 내부 수치 파라미터로 설명하는지, 체크포인트나 코드와 혼동하지 않는지 먼저 확인했다."
      items:
        - "핵심을 학습된 파라미터 묶음으로 잡았다."
        - "카테고리는 특정 도구가 아니라 모델 구성 요소라 concept로 뒀다."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "허깅페이스 문서와 일반 개념 설명을 같이 보고 실무에서 쓰는 의미가 맞는지 맞춰봤다."
      items:
        - "실무에서는 모델 공유, 체크포인트 배포, 파인튜닝 문맥에서 weights라는 표현을 쓴다."
        - "기사 문맥에서는 '웨이트 공개'가 곧 모델 파일 공개를 뜻하는 경우가 많다."
    - type: number_verify
      result: skip
      summary: "웨이트는 특정 수치보다 파일과 파라미터의 성격을 이해하는 것이 중요해서 숫자 검증은 생략했다."
      items:
        - "정밀도나 파라미터 수는 개별 모델 문맥에서 따로 확인해야 한다."
    - type: adversarial
      result: pass
      summary: "오픈소스 코드 공개와 오픈 웨이트 공개를 같은 말로 오해하지 않도록 경계를 분리했다."
      items:
        - "코드가 공개돼도 웨이트가 닫혀 있을 수 있다."
        - "웨이트가 공개돼도 학습 데이터나 전체 파이프라인이 공개되는 것은 아니다."
---
## 한 줄 정의
웨이트는 모델이 학습으로 얻은 숫자 파라미터 묶음이야.

## 어떻게 작동하나
모델 구조가 뼈대라면 웨이트는 그 구조 안을 채우는 값들이야. 학습이 끝나면 이 값들이 파일 형태로 저장되고, 런타임이 그 파일을 읽어 실제 추론을 수행해. 그래서 웨이트를 내려받을 수 있느냐가 로컬 실행, 파인튜닝, 양자화 가능 여부와 바로 연결된다.

## 왜 중요한가
AI 기사에서 "오픈 웨이트"가 나오면 대개 누구나 모델 파일을 받아서 직접 돌리거나 변형할 수 있다는 뜻이야. 반대로 API만 제공되고 웨이트가 없으면 성능을 써볼 수는 있어도 배포 구조나 비용 최적화 선택지는 훨씬 좁아진다.

## 관련 용어
- [Quantization](/ko/wiki/quantization/)
- [Fine-tuning](/ko/wiki/fine-tuning/)
- [GGUF](/ko/wiki/gguf/)
- [ONNX](/ko/wiki/onnx/)
