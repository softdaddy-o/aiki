---
term: flux
title: "FLUX.1"
lang: ko
summary: "Black Forest Labs가 실제 배포한 이미지 생성 모델 버전이야. 이름이 보이면 성능 점수보다 어떤 배포 방식과 사용 흐름에 맞는지부터 읽는 편이 정확해."
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
draft: false
tags:
  - image-generation
  - open-weight
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://blackforestlabs.ai/announcing-black-forest-labs/"
      title: "회사 출범 공지"
    - url: "https://huggingface.co/black-forest-labs"
      title: "Hugging Face 조직 페이지"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지가 이미지 생성용 개별 버전 문서인지 먼저 맞춰봤어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 FLUX.1를 어떤 작업과 운영 조건에 붙일 모델인지."
        - "모델 이름부터 다시 보면 FLUX.1이라는 표기가 일관되게 쓰이는지 봤어."
        - "배포 방식 대조: 버전 모델과 API·웨이트 채널이 섞여 있는지 정리했어."
        - "문서 층위: 상위 개념 설명이 아니라 실제 배포 후보 문서인지 점검했다."
        - "만든 쪽을 다시 보면 Black Forest Labs."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공개 소개와 배포 채널 설명을 같이 놓고 라인업 해석이 어긋나지 않는지 다시 봤어."
      items:
        - "여기서 먼저 갈라 볼 기준은 FLUX.1를 고를 때 접근 채널, 가격, 입력 범위 가운데 무엇을 먼저 봐야 하는지."
        - "출처 1 대조: 회사 출범 공지에서 라인업과 배포 방향을 읽었다."
        - "출처 2 대조: Hugging Face 조직 페이지에서 실제 공개 채널을 확인했어."
        - "교차 확인: Pro, Dev, Schnell 구분이 두 자료에서 같은 방향인지 살폈다."
    - type: number_verify
      result: pass
      summary: "운영 판단에 필요한 수치와 분기 정보를 다시 봤어."
      items:
        - "규모 확인: 12B 계열 설명이 공개 자료와 크게 다르지 않은지 봤어."
        - "라인업 확인: Pro, Dev, Schnell 구분이 실제 선택 기준으로 연결되는지 점검했다."
        - "출력 형태 확인: 텍스트가 아니라 이미지 생성 모델이라는 점을 다시 확인했어."
    - type: adversarial
      result: pass
      summary: "자주 생기는 과장 해석을 세워 놓고 어디서 틀리기 쉬운지 정리했어."
      items:
        - "오해 점검: 텍스트 모델처럼 토큰 가격만으로 비교하면 실제 운영 부담을 놓치기 쉬워."
        - "배포 점검: 공개 웨이트와 API형을 같은 조건으로 읽으면 추천 답이 틀어질 수 있어."
      findings:
        - "이 모델은 품질 비교만큼이나 배포 채널과 비용 구조를 같이 읽어야 정확하게 해석돼."
---
## 한 줄 정의
FLUX.1은 Black Forest Labs가 배포한 텍스트 프롬프트 기반 이미지 생성 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 설명이 아니라 실제로 써 볼 후보가 올라온 상황으로 보면 돼.
## 이 모델로 무엇을 할 수 있나
핵심은 Black Forest Labs가 같은 계열 안에서도 Pro, Dev, Schnell처럼 배포 방식을 나눠 놓았다는 점이야. Pro는 API 중심으로 읽고, Dev와 Schnell은 직접 실행 가능성까지 같이 보는 식으로 나눠야 실제 선택 기준이 선다.

실무에선 텍스트 출력 모델처럼 토큰 가격만 볼 수 없고, 이미지 1장당 비용과 GPU 여유를 함께 봐야 해. 그래서 이 이름을 읽을 때도 "예쁜 그림을 만드는가"보다 어느 채널에서 얼마의 운영 부담으로 돌릴 수 있는지를 먼저 따지는 편이 나아.
## 왜 중요한가
이 모델을 이해하면 이미지 생성 기사에서도 배포 채널과 운영 비용을 같이 읽는 습관이 생긴다. 같은 계열이라도 API형과 직접 실행형이 섞이면 추천 답이 완전히 달라지기 때문에, 제품 선택 기준을 분리해 읽는 데 도움이 돼.
## 같이 보면 좋은 모델
- [Mistral](/ko/wiki/mistral/) — Mistral와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.
- [Diffusion Model](/ko/wiki/diffusion/) — 같이 보면 로컬 배포와 오픈 모델 맥락을 같이 읽는 데 도움이 돼.
- [Stable Diffusion](/ko/wiki/stable-diffusion/) — Stable Diffusion와는 결과물 형태와 배포 방식 차이를 비교하기 쉬워.
- [DALL-E](/ko/wiki/dall-e/) — DALL-E와는 결과물 형태와 배포 방식 차이를 비교하기 쉬워.