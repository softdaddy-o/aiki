---
term: flux
title: "FLUX.1"
lang: ko
summary: "Black Forest Labs에서 제공하는 버전형 모델이다. 실제 도입에서는 입력 범위, 컨텍스트, 가격을 함께 비교해야 한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
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
  date: "2026-04-09"
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
## 한 줄 정의
Black Forest Labs에서 제공하는 버전형 모델이야. Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이다. Pro, Dev, Schnell처럼 배포 방식이 나뉜다. 텍스트 프롬프트를 받아 이미지를 생성하는 모델이다. 텍스트 출력형 LLM과는 사용 방식이 다르다. 한 줄로 말하면 "이 모델이 실제로 어떤 입력을 받아 어떤 결과를 내는지"를 가장 직접적으로 보여 주는 페이지라고 보면 된다.
## 이 모델로 무엇을 할 수 있나
Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이다. Pro, Dev, Schnell처럼 배포 방식이 나뉜다. 텍스트 프롬프트를 받아 이미지를 생성하는 모델이다. 텍스트 출력형 LLM과는 사용 방식이 다르다. 실무에서는 이 문장만 읽어도 이 모델이 챗봇형인지, 코딩형인지, 멀티모달 앱에 맞는지 감이 잡힌다.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트 프롬프트를 받아 이미지를 생성하는 모델이다. 텍스트 출력형 LLM과는 사용 방식이 다르다. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: FLUX.1은 12B 파라미터 이미지 생성 모델 계열로 알려져 있다. 텍스트 LLM보다 VRAM 요구량이 크기 쉬워 배치와 해상도 설정을 같이 봐야 한다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 공개 자료 기준 12B 파라미터 계열이다. 활성 파라미터를 따로 쪼개 공개하는 구조는 아니다. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: API형 Pro와 자체 호스팅형 Dev·Schnell의 비용 구조가 갈린다. 이 모델은 토큰 가격보다 이미지 1장당 생성 비용과 GPU 점유가 더 중요하다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: Dev와 Schnell은 오픈 웨이트, Pro는 폐쇄형 API. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 버전 페이지가 중요한 이유는 실제 도입 판단이 바로 이 단계에서 이뤄지기 때문이야. 같은 회사 모델끼리도 입력 범위, 컨텍스트, 가격, 배포 채널이 다르면 완전히 다른 제품에 맞는다. 그래서 벤치마크 숫자보다 "내 앱에 바로 붙는지"를 읽는 기준으로 봐야 한다.
## 같이 보면 좋은 모델
- [Mistral](/ko/wiki/mistral/) — 비교 대상으로 자주 같이 묶이는 모델
- [Diffusion Model](/ko/wiki/diffusion/) — 멀티모달 생성·해석 흐름을 같이 볼 때 좋다.
- [Stable Diffusion](/ko/wiki/stable-diffusion/) — 비교 대상으로 자주 같이 묶이는 모델
- [DALL-E](/ko/wiki/dall-e/) — 비교 대상으로 자주 같이 묶이는 모델