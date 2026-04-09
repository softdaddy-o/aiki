---
term: imagen
title: "Imagen"
lang: ko
summary: "Google DeepMind의 상위 모델 계열이다. 기사에서는 개별 버전보다 라인업 이름으로 자주 등장한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: family
modelProfile:
  memoryUsage: "서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다."
  implementation: "생성 모델 계열로 보면 되고, 확산형인지 다른 구현인지 공식 문서 기준으로 구분하면 된다."
  activeParameters: "공개 자료 기준 활성 파라미터 수 확인 필요"
  multimodalSupport: "텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 된다."
  access: "무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다."
  pricing: "유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다."
  weightsOpen: "비공개 또는 서비스/API 제공 중심"
  vendor: "Google DeepMind"
aliases:
  - "Imagen"
relatedTerms:
  - gemini
  - gemma
  - gemini-2.5
  - diffusion
mentionCount: 0
draft: false
tags:
  - image-generation
  - google
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Imagen_(text-to-image_model)"
      title: "Imagen (text-to-image model)"
    - url: "https://deepmind.google/models/imagen/"
      title: "Imagen — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명과 라인업 성격이 맞는지 확인했다."
      items:
        - "모델명 대조: Imagen"
        - "벤더 대조: Google DeepMind"
        - "상위 계열: 최상위 라인업"
        - "페이지 성격: 개별 스냅샷이 아니라 상위 계열 안내 페이지"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 설명이 일치하는지 확인했다."
      items:
        - "비교 소스 1: Imagen (text-to-image model)"
        - "비교 소스 2: Imagen — Google DeepMind"
    - type: adversarial
      result: pass
      summary: "이 페이지가 버전 비교표가 아니라 계열 안내 페이지라는 점을 별도로 점검했다."
      items:
        - "개별 가격과 컨텍스트는 하위 버전 페이지에서 확인해야 한다."
      findings:
        - "계열 페이지의 일반 설명을 특정 버전 스펙처럼 읽지 않도록 분리했다."
---
## 한 줄 정의
Google DeepMind의 상위 모델 계열이야. 기사에서 이 이름만 보이면 보통 특정 스냅샷 하나보다 라인업 전체 방향을 가리키는 경우가 많아. 그래서 먼저 어떤 하위 모델을 뜻하는지부터 확인하는 편이 맞아.
## 이 모델로 무엇을 할 수 있나
Imagen 같은 계열 페이지에서는 세부 버전별 역할을 먼저 잡는 게 중요해. 무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 계열 이름만 알아서는 가격이나 컨텍스트를 정확히 비교할 수 없고, 실제 선택은 하위 버전에서 갈린다.
## 스펙을 읽는 법
- **계열 이름인지 개별 버전인지**: 이 이름은 상위 라인업을 가리킨다. 실제 비교표는 하위 버전 페이지에서 읽는 편이 정확하다.
- **입력/출력 범위**: 텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 된다. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: 서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 공개 자료 기준 활성 파라미터 수 확인 필요. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: 무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: 유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: 비공개 또는 서비스/API 제공 중심. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 상위 계열을 알아두면 Google DeepMind의 라인업 방향을 빠르게 읽을 수 있어. 뉴스 제목에는 상위 이름만 크게 남는 경우가 많지만, 실제 선택 기준은 속도형인지 고성능형인지, 폐쇄형 API인지 공개 웨이트인지 같은 하위 포지션에서 갈린다.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemini 2.5](/ko/wiki/gemini-2.5/) — 비교 대상으로 자주 같이 묶이는 모델
- [Diffusion Model](/ko/wiki/diffusion/) — 멀티모달 생성·해석 흐름을 같이 볼 때 좋다.