---
term: qwen
title: "Qwen"
lang: ko
summary: "Alibaba / Qwen의 상위 모델 계열이다. 기사에서는 개별 버전보다 라인업 이름으로 자주 등장한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: family
modelProfile:
  memoryUsage: "직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다."
  implementation: "Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요하다."
  activeParameters: "공개 자료 기준 활성 파라미터 수 확인 필요"
  multimodalSupport: "텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요"
  access: "무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있다."
  pricing: "직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다."
  weightsOpen: "오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요하다."
  vendor: "Alibaba / Qwen"
aliases:
  - "Qwen"
relatedTerms:
  - deepseek-r1
  - llama
  - gemma
  - stable-diffusion
firstMentioned: "2026-03-02"
mentionCount: 11
draft: false
tags:
  - alibaba
  - open-model
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Qwen"
      title: "Qwen"
    - url: "https://qwenlm.github.io/"
      title: "Qwen"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명과 라인업 성격이 맞는지 확인했다."
      items:
        - "모델명 대조: Qwen"
        - "벤더 대조: Alibaba / Qwen"
        - "상위 계열: 최상위 라인업"
        - "페이지 성격: 개별 스냅샷이 아니라 상위 계열 안내 페이지"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 설명이 일치하는지 확인했다."
      items:
        - "비교 소스 1: Qwen"
        - "비교 소스 2: Qwen"
    - type: adversarial
      result: pass
      summary: "이 페이지가 버전 비교표가 아니라 계열 안내 페이지라는 점을 별도로 점검했다."
      items:
        - "개별 가격과 컨텍스트는 하위 버전 페이지에서 확인해야 한다."
      findings:
        - "계열 페이지의 일반 설명을 특정 버전 스펙처럼 읽지 않도록 분리했다."
---
## 한 줄 정의
Alibaba / Qwen의 상위 모델 계열이야. 기사에서 이 이름만 보이면 보통 특정 스냅샷 하나보다 라인업 전체 방향을 가리키는 경우가 많아. 그래서 먼저 어떤 하위 모델을 뜻하는지부터 확인하는 편이 맞아.
## 이 모델로 무엇을 할 수 있나
Qwen 같은 계열 페이지에서는 세부 버전별 역할을 먼저 잡는 게 중요해. 무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있다. 계열 이름만 알아서는 가격이나 컨텍스트를 정확히 비교할 수 없고, 실제 선택은 하위 버전에서 갈린다.
## 스펙을 읽는 법
- **계열 이름인지 개별 버전인지**: 이 이름은 상위 라인업을 가리킨다. 실제 비교표는 하위 버전 페이지에서 읽는 편이 정확하다.
- **입력/출력 범위**: 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: 직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 공개 자료 기준 활성 파라미터 수 확인 필요. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: 무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: 직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: 오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요하다. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 상위 계열을 알아두면 Alibaba / Qwen의 라인업 방향을 빠르게 읽을 수 있어. 뉴스 제목에는 상위 이름만 크게 남는 경우가 많지만, 실제 선택 기준은 속도형인지 고성능형인지, 폐쇄형 API인지 공개 웨이트인지 같은 하위 포지션에서 갈린다.
## 같이 보면 좋은 모델
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 비교 대상으로 자주 같이 묶이는 모델
- [Llama](/ko/wiki/llama/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델
- [Stable Diffusion](/ko/wiki/stable-diffusion/) — 비교 대상으로 자주 같이 묶이는 모델