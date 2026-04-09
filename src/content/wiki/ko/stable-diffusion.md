---
term: stable-diffusion
title: "Stable Diffusion"
lang: ko
summary: "Stable Diffusion는 Stability AI가 멀티모달 생성과 이해를 같이 다루는 라인업 쪽 라인업을 설명할 때 쓰는 이름이야. 기사에서 이 단어가 보이면 새 모델 하나보다 제품 방향이 움직이는 신호로 읽는 편이 맞아."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: family
modelProfile:
  memoryUsage: "직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 해."
  implementation: "생성 모델 계열로 보면 되고, 확산형인지 다른 구현인지 공식 문서 기준으로 구분하면 돼."
  activeParameters: "공개 자료 기준 활성 파라미터 수 확인 필요"
  multimodalSupport: "텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 돼."
  access: "무료 실험 또는 자체 호스팅 가능성이 높아. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있어."
  pricing: "직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 해."
  weightsOpen: "오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요해."
  vendor: "Stability AI"
aliases:
  - "Stable Diffusion"
relatedTerms:
  - deepseek-r1
  - llama
  - gemma
  - qwen
mentionCount: 0
draft: false
tags:
  - image-generation
  - open-model
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Stable_Diffusion"
      title: "Stable Diffusion"
    - url: "https://stability.ai/stable-image"
      title: "Stability AI Image Models &mdash; Stability AI"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 Stable Diffusion가 개별 모델 하나가 아니라 어떤 작업군을 묶는 라인업 이름인지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: Stable Diffusion가 개별 모델 하나가 아니라 어떤 작업군을 묶는 라인업 이름인지"
        - "모델명 대조: Stable Diffusion"
        - "벤더 대조: Stability AI"
        - "상위 계열: 최상위 라인업"
        - "페이지 성격: 개별 스냅샷이 아니라 상위 계열 안내 페이지"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 Stable Diffusion 아래에서 어떤 버전 페이지를 봐야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "비교 기준: Stable Diffusion 아래에서 어떤 버전 페이지를 봐야 하는지"
        - "비교 소스 1: Stable Diffusion"
        - "비교 소스 2: Stability AI Image Models &mdash; Stability AI"
    - type: number_verify
      result: pass
      summary: "가격, 접근 경로, 입력 범위처럼 Stable Diffusion 아래에서 어떤 버전 페이지를 봐야 하는지를 가를 때 필요한 정보는 따로 떼서 한 번 더 봤다."
      items:
        - "운영 정보 대조: 직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 해."
        - "접근 경로 대조: 무료 실험 또는 자체 호스팅 가능성이 높아. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있어."
        - "입력/출력 범위 대조: 텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 돼."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 Stable Diffusion가 개별 모델 하나가 아니라 어떤 작업군을 묶는 라인업 이름인지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "오해 방지 기준: Stable Diffusion 아래에서 어떤 버전 페이지를 봐야 하는지"
        - "개별 가격과 컨텍스트는 하위 버전 페이지에서 확인해야 해."
      findings:
        - "계열 페이지의 일반 설명을 특정 버전 스펙처럼 읽지 않도록 분리했다."
---
## 한 줄 정의
Stable Diffusion를 새 모델 하나라고 읽으면 자꾸 헷갈려. 이 이름은 Stability AI가 멀티모달 생성과 이해를 같이 다루는 라인업 쪽 라인업을 설명할 때 앞에 내세우는 간판에 가까워. 그래서 기사에서 Stable Diffusion가 보이면 벤치마크보다, Stability AI가 지금 어떤 사용 장면을 키우려는지부터 읽는 편이 덜 틀린다.
## 이 모델로 무엇을 할 수 있나
생성 모델 계열로 보면 되고, 확산형인지 다른 구현인지 공식 문서 기준으로 구분하면 돼. 텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 돼. 다만 Stable Diffusion라는 이름만으로 가격표나 제한을 확정하면 거의 틀려. 여기서는 텍스트를 다루는 계열인지, 이미지나 영상까지 넓히는지, 앱 중심인지 API 중심인지 같은 방향만 잡아두고, 실제 도입 판단은 하위 버전 페이지에서 끝내는 편이 맞아.
## 스펙을 읽는 법
- **계열 이름인지 개별 버전인지**: 이 이름은 상위 라인업을 가리켜. 실제 비교표는 하위 버전 페이지에서 읽는 편이 정확해.
- **입력/출력 범위**: 텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 돼. 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈려.
- **컨텍스트/메모리 감각**: 직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 해. 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 봐.
- **모델 구조와 규모**: 공개 자료 기준 활성 파라미터 수 확인 필요. 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있어.
- **접근 경로**: 무료 실험 또는 자체 호스팅 가능성이 높아. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있어. 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단해.
- **가격과 운영비**: 직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 해. 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 돼.
- **웨이트 공개 여부**: 오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요해. 자체 호스팅 가능 여부를 여기서 먼저 걸러내.
## 왜 중요한가
뉴스는 종종 버전명을 빼고 Stable Diffusion 같은 계열명만 남겨. 이걸 모르면 "또 새 모델이 나왔네" 정도로 읽고 지나가는데, 계열 성격을 먼저 잡아두면 Stability AI가 이번에 어디에 힘을 싣는지 훨씬 빨리 보여. 그래서 이 페이지는 스펙표를 외우는 곳이 아니라, 이후 기사 해석 속도를 올리는 기준점 역할을 해.
## 같이 보면 좋은 모델
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 비교 대상으로 자주 같이 묶이는 모델
- [Llama](/ko/wiki/llama/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델
- [Qwen](/ko/wiki/qwen/) — 비교 대상으로 자주 같이 묶이는 모델