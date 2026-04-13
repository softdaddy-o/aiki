---
term: diffusion
title: "Diffusion Model"
lang: ko
summary: "Diffusion Model는 기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다."
readerValue: "이미지 생성 뉴스에서 모델 이름보다 생성 방식 차이가 중요한지 먼저 판단하는 데 도움이 돼."
category: concept
aliases:
  - "diffusion model"
relatedTerms:
  - stable-diffusion
  - dall-e
  - flux
  - imagen
firstMentioned: "2026-02-23"
mentionCount: 3
draft: true
tags:
  - image-generation
  - generative-ai
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Diffusion_model"
      title: "Diffusion model"
    - url: "https://stability.ai/blog/stable-diffusion-public-release"
      title: "Stable Diffusion Public Release &mdash; Stability AI"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다."
        - "원문을 보면 기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다."
        - "별칭 대조: diffusion model도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다."
        - "교차 대조: 기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: stability.ai."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 멀티모달 생성과 해석 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "이미지 생성 모델 이름만 외우고 생성 방식 차이를 놓치면 발표문을 과장되게 읽기 쉬워."
---
## 한 줄 정의
Diffusion Model를 짧게 잡으면 기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다 쪽이야. 이미지나 영상, 오디오처럼 텍스트 밖의 입출력을 다루기 때문에 프롬프트 설계와 비용 구조도 달라져.
## 어떻게 작동하나
기계 학습에서 확산 기반 생성 모델 또는 점수 기반 생성 모델이라고도 하는 확산 모델은 잠재 변수 생성 모델의 한 클래스입니다. 이미지나 영상, 오디오처럼 텍스트 밖의 입출력을 다루기 때문에 프롬프트 설계와 비용 구조도 달라져. 예를 들어 텍스트 프롬프트로 이미지를 만들거나 이미지를 보고 답하는 제품 흐름이 대표적인 예시야.
## 왜 중요한가
창작, 편집, 미디어 자동화, 멀티모달 앱 같은 곳에서 영향이 커. 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어.
## 관련 용어
- [Stable Diffusion](/ko/wiki/stable-diffusion/) — 확산 모델이 실제 제품 이름으로 내려오면 어떤 라인업이 되는지 이어서 보게 해 준다.
- [DALL-E](/ko/wiki/dall-e/) — 같은 이미지 생성이라도 제품형 서비스와 모델 계열 설명이 어떻게 갈리는지 비교하게 해 준다.
- [FLUX.1](/ko/wiki/flux/) — 확산 계열 이후 구현이 어떻게 달라졌는지와 배포 방식 차이를 같이 보게 해 준다.
- [Imagen](/ko/wiki/imagen/) — 연구 발표형 이미지 생성 모델이 제품 문맥으로 내려올 때 무엇을 더 봐야 하는지 비교하게 해 준다.