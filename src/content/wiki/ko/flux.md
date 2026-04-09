---
term: flux
title: "FLUX.1"
lang: ko
summary: "FLUX.1는 Black Forest Labs가 실제 배포용으로 내놓은 개별 모델 버전이야. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 해."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
modelProfile:
  memoryUsage: "FLUX.1은 12B 파라미터 이미지 생성 모델 계열로 알려져 있어. 텍스트 LLM보다 VRAM 요구량이 크기 쉬워 배치와 해상도 설정을 같이 봐야 해."
  implementation: "Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이야. Pro, Dev, Schnell처럼 배포 방식이 나뉜다."
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
      summary: "원문에서 모델명, 벤더, 페이지 성격이 같은 축인지 먼저 맞춰봤다."
      items:
        - "모델명 대조: FLUX.1"
        - "벤더 대조: Black Forest Labs"
        - "배포 유형 대조: version 모델 / API + 오픈 웨이트 혼합"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 라인업 위치와 접근 경로를 다시 봤다."
      items:
        - "공식 소스 1: Black Forest Labs launch"
        - "공식 소스 2: Hugging Face 배포 페이지"
        - "비교 확인: Pro, Dev, Schnell 배포 방식 차이가 소스 간 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 따로 빼서 한 번 더 봤다."
      items:
        - "파라미터: 12B"
        - "라인업: Pro / Dev / Schnell"
        - "출력 유형: 텍스트-이미지 생성"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "토큰 가격표가 없는 대신 GPU 점유와 이미지 1장당 비용을 따로 봐야 해."
      findings:
        - "토큰 가격표가 없는 대신 GPU 점유와 이미지 1장당 비용을 따로 봐야 해."
---
## 한 줄 정의
FLUX.1는 Black Forest Labs가 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. 텍스트 프롬프트를 받아 이미지를 생성하는 모델이야. 텍스트 출력형 LLM과는 사용 방식이 다르다. Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이야. Pro, Dev, Schnell처럼 배포 방식이 나뉜다.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이야. Pro, Dev, Schnell처럼 배포 방식이 나뉜다. Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있어. 그래서 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 돼.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트 프롬프트를 받아 이미지를 생성하는 모델이야. 텍스트 출력형 LLM과는 사용 방식이 다르다. 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈려.
- **컨텍스트/메모리 감각**: FLUX.1은 12B 파라미터 이미지 생성 모델 계열로 알려져 있어. 텍스트 LLM보다 VRAM 요구량이 크기 쉬워 배치와 해상도 설정을 같이 봐야 해. 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 봐.
- **모델 구조와 규모**: 공개 자료 기준 12B 파라미터 계열이야. 활성 파라미터를 따로 쪼개 공개하는 구조는 아니다. 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있어.
- **접근 경로**: Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있어. 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단해.
- **가격과 운영비**: API형 Pro와 자체 호스팅형 Dev·Schnell의 비용 구조가 갈려. 이 모델은 토큰 가격보다 이미지 1장당 생성 비용과 GPU 점유가 더 중요해. 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 돼.
- **웨이트 공개 여부**: Dev와 Schnell은 오픈 웨이트, Pro는 폐쇄형 API. 자체 호스팅 가능 여부를 여기서 먼저 걸러내.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 Black Forest Labs 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞아.
## 같이 보면 좋은 모델
- [Mistral](/ko/wiki/mistral/) — 비교 대상으로 자주 같이 묶이는 모델
- [Diffusion Model](/ko/wiki/diffusion/) — 멀티모달 생성·해석 흐름을 같이 볼 때 좋아.
- [Stable Diffusion](/ko/wiki/stable-diffusion/) — 비교 대상으로 자주 같이 묶이는 모델
- [DALL-E](/ko/wiki/dall-e/) — 비교 대상으로 자주 같이 묶이는 모델