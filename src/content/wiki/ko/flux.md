---
term: flux
title: "FLUX.1"
lang: ko
summary: "FLUX.1는 Black Forest Labs가 제공하는 버전형 AI 모델로, 실제 도입에서는 성능보다 접근 경로와 운영 조건까지 함께 비교해야 한다."
readerValue: "FLUX.1가 기사에 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
modelProfile:
  memoryUsage: "FLUX.1은 12B 파라미터 이미지 생성 모델 계열로 알려져 있다. 텍스트 LLM보다 VRAM 요구량이 크기 쉬워 배치와 해상도 설정을 같이 봐야 한다."
  implementation: "Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이다. Pro, Dev, Schnell처럼 배포 방식이 나뉜다."
  activeParameters: "공개 자료 기준 12B 파라미터 계열이다. 활성 파라미터를 따로 쪼개 공개하는 구조는 아니다."
  multimodalSupport: "텍스트 프롬프트를 받아 이미지를 생성하는 모델이다. 텍스트 출력형 LLM과는 사용 방식이 다르다."
  access: "Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있다."
  pricing: "API형 Pro와 자체 호스팅형 Dev·Schnell의 비용 구조가 갈린다. 이 모델은 토큰 가격보다 이미지 1장당 생성 비용과 GPU 점유가 더 중요하다."
  weightsOpen: "Dev와 Schnell은 오픈 웨이트, Pro는 폐쇄형 API"
  vendor: "Black Forest Labs"
aliases:
  - "FLUX.1"
relatedTerms:
  - mistral
  - diffusion
  - stable-diffusion
  - dall-e
mentionCount: 0
draft: false
tags:
  - image-generation
  - open-weight
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://blackforestlabs.ai/announcing-black-forest-labs/"
      title: "Announcing Black Forest Labs"
    - url: "https://huggingface.co/black-forest-labs"
      title: "black-forest-labs (Black Forest Labs)"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 맞는지 먼저 대조했다."
      items:
        - "모델명 대조: FLUX.1"
        - "벤더 대조: Black Forest Labs"
        - "배포 유형 대조: version 모델 / API + 오픈 웨이트 혼합"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 위치와 접근 경로를 교차검증했다."
      items:
        - "공식 소스 1: Black Forest Labs launch"
        - "공식 소스 2: Hugging Face 배포 페이지"
        - "비교 확인: Pro, Dev, Schnell 배포 방식 차이가 소스 간 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 별도로 묶어서 다시 확인했다."
      items:
        - "파라미터: 12B"
        - "라인업: Pro / Dev / Schnell"
        - "출력 유형: 텍스트-이미지 생성"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트를 따로 비판적으로 검토했다."
      items:
        - "토큰 가격표가 없는 대신 GPU 점유와 이미지 1장당 비용을 따로 봐야 한다."
      findings:
        - "토큰 가격표가 없는 대신 GPU 점유와 이미지 1장당 비용을 따로 봐야 한다."
---
## 먼저 감 잡기
FLUX.1는 Black Forest Labs가 제공하는 버전형 모델이야. Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이다. Pro, Dev, Schnell처럼 배포 방식이 나뉜다. 텍스트 프롬프트를 받아 이미지를 생성하는 모델이다. 텍스트 출력형 LLM과는 사용 방식이 다르다. 그래서 기사에서 이 이름이 보이면 추상적인 성능 향상 문구보다 입력 범위, 컨텍스트 한도, 접근 채널이 어떻게 달라졌는지부터 먼저 보는 편이 정확해.
## 뉴스에서 왜 자주 나오나
FLUX.1가 뉴스에 풀네임으로 등장하기 시작했다는 건 이제 실제 배포 판단에 써야 할 정보가 붙었다는 뜻에 가까워. 상위 브랜드 이름만 나올 때와 달리, 이 단계부터는 텍스트 프롬프트를 받아 이미지를 생성하는 모델이다. 텍스트 출력형 LLM과는 사용 방식이 다르다. API형 Pro와 자체 호스팅형 Dev·Schnell의 비용 구조가 갈린다. 이 모델은 토큰 가격보다 이미지 1장당 생성 비용과 GPU 점유가 더 중요하다. 같은 운용 조건을 구체적으로 비교할 수 있어.
## 읽을 때 체크포인트
1. 먼저 FLUX.1가 어떤 입력을 받고 무엇을 출력하는지부터 확인하면 돼. 여기서 모델 포지션이 거의 정리돼.

2. 다음으로 컨텍스트, 최대 출력, 툴 호출 지원처럼 운영 조건을 봐야 해. 같은 성능 홍보라도 실제 제품 적합성은 여기서 갈려.

3. 마지막으로 Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있다. API형 Pro와 자체 호스팅형 Dev·Schnell의 비용 구조가 갈린다. 이 모델은 토큰 가격보다 이미지 1장당 생성 비용과 GPU 점유가 더 중요하다. 이 두 줄을 같이 읽으면 '당장 붙일 수 있는 모델인지'와 '비용이 감당되는지'를 빠르게 판단할 수 있어.
## 같이 봐야 할 용어
- [mistral](/ko/wiki/mistral/)
- [diffusion](/ko/wiki/diffusion/)
- [stable-diffusion](/ko/wiki/stable-diffusion/)
- [dall-e](/ko/wiki/dall-e/)