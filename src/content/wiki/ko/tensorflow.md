---
term: tensorflow
title: "TensorFlow (텐서플로)"
lang: ko
summary: "TensorFlow (텐서플로)는 머신러닝 모델을 만들고 학습시키고 서비스까지 이어 붙이는 프레임워크야."
readerValue: "TensorFlow가 모델 이름이 아니라 학습, 배포, 모바일 추론까지 묶는 플랫폼 축이라는 걸 빠르게 잡아볼 수 있어."
category: framework
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "TensorFlow (텐서플로)"
relatedTerms:
  - pytorch
  - alignment
  - fine-tuning
  - distillation
mentionCount: 0
draft: false
tags:
  - training
  - deep-learning
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/TensorFlow"
      title: "TensorFlow"
    - url: "https://www.tensorflow.org/"
      title: "TensorFlow"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "위키 요약과 공식 사이트 문구를 맞춰서 TensorFlow가 플랫폼인지 모델인지 다시 봤어."
      items:
        - "독자 문제 대조: TensorFlow를 특정 AI 모델이 아니라 머신러닝 프레임워크로 읽어야 하는지 확인했어."
        - "위키 요약은 TensorFlow를 machine learning and artificial intelligence용 소프트웨어 라이브러리로 설명해."
        - "공식 사이트는 end-to-end open source machine learning platform이라고 소개해."
        - "그래서 본문도 모델 이름이 아니라 학습과 배포를 묶는 프레임워크라는 축으로 정리했어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "백과 요약과 공식 소개를 비교해서 라이브러리와 플랫폼이라는 표현 차이만 정리해봤어."
      items:
        - "비교 기준: TensorFlow를 단순 라이브러리로 볼지, 배포까지 품는 플랫폼으로 볼지 비교했어."
        - "위키는 범용 소프트웨어 라이브러리라는 점을 먼저 잡아."
        - "공식 사이트는 도구, 라이브러리, 커뮤니티 자원을 포함한 end-to-end 플랫폼 축을 더 강조해."
        - "그래서 본문은 프레임워크이면서 배포 생태계까지 이어지는 스택이라는 쪽으로 맞췄어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "Apache License 2.0 같은 고정 정보만 남기고, 바뀌기 쉬운 수치는 덜어냈어."
      items:
        - "위키 요약은 TensorFlow가 Apache License 2.0으로 배포되는 오픈소스라고 적어."
        - "공식 사이트도 open source platform이라고 밝히고 있어."
        - "버전별 성능 수치나 최신 벤치마크는 금방 낡으니 본문에서 아예 빼서 과장 위험을 줄였어."
    - type: adversarial
      result: pass
      sources: 2
      summary: "TensorFlow라는 이름만 보고 모델 성능 자체로 읽는 오해를 따로 막았어."
      items:
        - "TensorFlow를 쓰면 자동으로 더 좋은 모델이 나온다고 생각하기 쉬운데, 실제 성능은 모델 구조와 데이터 설계에 달려 있어."
        - "반대로 오래된 프레임워크라서 쓸모없다고 단정하는 것도 과해. 배포와 모바일 쪽에서는 여전히 실무 맥락이 살아 있어."
      findings:
        - "TensorFlow는 모델이 아니라 개발과 배포 스택이라는 점을 중심에 남겼어."
---
## 한 줄 정의
TensorFlow는 신경망 모델을 정의하고 학습하고 추론까지 돌리는 소프트웨어 프레임워크야. 특정 모델 하나의 이름이 아니라, 모델 개발 전체 흐름을 묶는 기반 스택에 가까워.
## 어떻게 작동하나
보통은 Keras 같은 상위 API로 모델 구조를 만들고, TensorFlow 실행 엔진이 CPU나 GPU, TPU에서 계산을 처리해. 학습이 끝난 뒤에는 TensorFlow Serving으로 서버 추론을 붙이거나 TensorFlow Lite로 모바일과 엣지 기기 쪽에 내보내는 식으로 이어질 수 있어.
## 왜 중요한가
TensorFlow가 오래 살아남은 이유는 모델 정확도 한 가지만이 아니라 학습부터 배포까지 한 생태계로 묶여 있기 때문이야. 팀 입장에서는 연구 코드, 서비스 [추론](/ko/wiki/inference/), 모바일 배포를 완전히 다른 도구로 찢지 않아도 돼서 운영 흐름을 잡기 쉬워.
## 주의해서 볼 점
요즘 연구 예제나 최신 커뮤니티 튜토리얼은 [PyTorch](/ko/wiki/pytorch/) 쪽이 더 빨리 보이는 경우가 많아서, TensorFlow만이 표준이라고 보면 감각이 늦어질 수 있어. 또 TensorFlow라는 이름을 보면 성능 좋은 모델 자체로 오해하기 쉬운데, 실제 성능은 그 위에 올린 모델 구조와 데이터, [학습](/ko/wiki/training/) 설계가 더 크게 좌우해.
## 관련 용어
- [PyTorch](/ko/wiki/pytorch/)는 TensorFlow와 가장 자주 비교되는 딥러닝 프레임워크야. 연구 생산성과 배포 생태계 중 어디에 무게를 두는지 같이 보면 차이가 잘 보여.
- [Alignment](/ko/wiki/alignment/)는 모델이 원하는 방향으로 행동하게 만드는 문제를 말해. TensorFlow는 그런 모델을 구현하고 학습시키는 기반 도구 쪽이야.
- [Fine-tuning](/ko/wiki/fine-tuning/)은 이미 학습된 모델을 추가 데이터로 다시 맞추는 방법이야. TensorFlow는 그 미세조정 과정을 실행하는 프레임워크로 이해하면 돼.
- [Distillation](/ko/wiki/distillation/)은 큰 모델의 행동을 더 작은 모델에 옮기는 학습 기법이야. TensorFlow는 그런 실험을 코드로 굴리는 실행 환경에 가까워.