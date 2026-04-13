---
term: flux
title: "FLUX.1"
lang: ko
summary: "FLUX.1는 Black Forest Labs가 실제 배포용으로 내놓은 개별 모델 버전이야. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 해."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽는 데 도움이 돼."
category: model
modelType: version
modelProfile:
  memoryUsage: "FLUX.1은 12B 파라미터 이미지 생성 모델 계열로 알려져 있어. 텍스트 LLM보다 VRAM 요구량이 크기 쉬워 배치와 해상도 설정을 같이 봐야 해."
  implementation: "Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이야. Pro, Dev, Schnell처럼 배포 방식이 갈려."
  activeParameters: "공개 자료 기준 12B 파라미터 계열이야. 활성 파라미터를 따로 쪼개 공개하는 구조는 아니다."
  multimodalSupport: "텍스트 프롬프트를 받아 이미지를 생성하는 모델이야. 텍스트 출력형 LLM과는 사용 방식이 다르다."
  access: "Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있어."
  pricing: "API형 Pro와 자체 호스팅형 Dev·Schnell의 비용 구조가 갈려. 이 모델은 토큰 가격보다 이미지 1장당 생성 비용과 GPU 점유가 더 중요해."
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
draft: true
tags:
  - image-generation
  - open-weight
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://blackforestlabs.ai/announcing-black-forest-labs/"
      title: "Announcing Black Forest Labs"
    - url: "https://huggingface.co/black-forest-labs"
      title: "black-forest-labs (Black Forest Labs)"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 FLUX.1를 텍스트만이 아니라 이미지나 오디오가 섞인 작업에 붙여도 되는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 FLUX.1를 텍스트만이 아니라 이미지나 오디오가 섞인 작업에 붙여도 되는지."
        - "모델 이름부터 다시 보면 FLUX.1."
        - "만든 쪽을 다시 보면 Black Forest Labs."
        - "배포 유형 대조: version 모델 / API + 오픈 웨이트 혼합."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 입력 범위, 출력 형태, 접근 채널 중 어디가 실제 선택 기준인지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 입력 범위, 출력 형태, 접근 채널 중 어디가 실제 선택 기준인지."
        - "공식 소스 1: Black Forest Labs launch."
        - "공식 소스 2: Hugging Face 배포 페이지."
        - "비교 확인: Pro, Dev, Schnell 배포 방식 차이가 소스 간 일치."
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 입력 범위, 출력 형태, 접근 채널 중 어디가 실제 선택 기준인지를 가를 때 필요한 항목만 따로 빼서 검증해뒀어."
      items:
        - "파라미터: 12B."
        - "라인업: Pro / Dev / Schnell."
        - "출력 유형: 텍스트-이미지 생성."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 FLUX.1를 텍스트만이 아니라 이미지나 오디오가 섞인 작업에 붙여도 되는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 입력 범위, 출력 형태, 접근 채널 중 어디가 실제 선택 기준인지."
        - "토큰 가격표가 없는 대신 GPU 점유와 이미지 1장당 비용을 따로 봐야 해."
      findings:
        - "토큰 가격표가 없는 대신 GPU 점유와 이미지 1장당 비용을 따로 봐야 해."
---
## 한 줄 정의
FLUX.1는 Black Forest Labs가 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. 텍스트 프롬프트를 받아 이미지를 생성하는 모델이야. 텍스트 출력형 LLM과는 사용 방식이 다르다. Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이야. Pro, Dev, Schnell처럼 배포 방식이 갈려.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이야. Pro, Dev, Schnell처럼 배포 방식이 갈려. Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있어. 그래서 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 돼.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 Black Forest Labs 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞아.
## 같이 보면 좋은 모델
- [Mistral](/ko/wiki/mistral/) — 비교 대상으로 자주 같이 묶이는 모델 - [Diffusion Model](/ko/wiki/diffusion/) — 로컬 배포와 오픈 모델 맥락을 같이 읽는 데 도움이 돼. - [Stable Diffusion](/ko/wiki/stable-diffusion/) — 비교 대상으로 자주 같이 묶이는 모델 - [DALL-E](/ko/wiki/dall-e/) — 비교 대상으로 자주 같이 묶이는 모델