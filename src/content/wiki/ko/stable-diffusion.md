---
term: stable-diffusion
title: "Stable Diffusion"
lang: ko
summary: "Stability AI가 이미지 생성 계열 전체를 묶어 설명할 때 쓰는 라인업 이름이야."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽는 데 도움이 돼."
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
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Stable_Diffusion"
      title: "위키 개요"
    - url: "https://stability.ai/stable-image"
      title: "Stability AI 이미지 모델 소개"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지가 특정 체크포인트가 아니라 계열 이름을 설명하는 문서인지 먼저 맞춰봤어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 Stable Diffusion를 어떤 작업과 운영 조건에 붙일 모델인지."
        - "범위 대조: 단일 버전이 아니라 이미지 생성 라인업을 묶는 이름인지 확인했어."
        - "만든 쪽을 다시 보면 Stability AI가 어떤 맥락에서 이 이름을 쓰는지 살폈다."
        - "문서 성격: 상위 계열 설명과 실제 제품 소개가 섞이지 않도록 층위를 다시 봤어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "보조 출처와 공식 소개를 같이 놓고 계열 해석이 엇갈리지 않는지 다시 봤어."
      items:
        - "여기서 먼저 갈라 볼 기준은 Stable Diffusion를 고를 때 접근 채널, 가격, 입력 범위 가운데 무엇을 먼저 봐야 하는지."
        - "출처 1 대조: 위키 개요에서 계열명 사용 범위를 읽었다."
        - "출처 2 대조: stability.ai 소개 페이지에서 현재 제품 연결 방식을 확인했어."
        - "교차 확인: 계열 이름과 실제 서비스 채널이 서로 충돌하지 않는지 점검했다."
    - type: number_verify
      result: pass
      summary: "핵심은 숫자보다 배포 경로와 적용 범위라서 그쪽을 다시 봤어."
      items:
        - "호스팅 경로: 직접 실행 가능한지와 별도 유료 채널이 있는지 나눠 봤어."
        - "사용 범위: 텍스트 기반 이미지 생성 중심인지 살폈다."
        - "선택 기준: 실제 비교는 개별 버전 페이지에서 해야 한다는 점을 다시 확인했어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석을 세워 놓고 어디서 과장되기 쉬운지 정리했어."
      items:
        - "오해 점검: 계열명을 특정 최신 버전처럼 읽으면 제품 비교가 흐려진다."
        - "배포 점검: 오픈 계열이라는 말만 보고 라이선스와 서비스 경로를 생략하면 운영 판단이 틀어질 수 있어."
      findings:
        - "계열 설명과 개별 버전 선택은 분리해서 읽어야 실제 운영 판단이 선명해진다."
---
## 한 줄 정의
Stable Diffusion은 특정 한 버전보다 이미지 생성 모델 계열 전체를 가리킬 때 더 자주 쓰이는 이름이야.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 것은 "이름 하나가 정확히 어느 버전인가"보다 어떤 사용처와 배포 방식이 묶여 있는가다. 텍스트 프롬프트로 이미지를 만들고, 파생 모델과 툴 생태계가 넓게 퍼져 있어서 기사에서는 계열명 자체가 제품 방향 신호처럼 자주 등장해.

실무에선 API 상품인지, 직접 호스팅 가능한 오픈 계열인지, 특정 체크포인트를 가리키는지부터 분리해서 읽는 편이 안전하다. 같은 이름이 보여도 버전과 라이선스, 배포 채널에 따라 실제 선택지는 크게 달라져.
## 왜 중요한가
이 이름을 계열명으로 읽으면 "새 모델이 나왔다"는 기사와 "새 버전이 붙었다"는 기사를 구분하기 쉬워진다. 그래서 숫자 비교보다 어떤 사용자 층과 배포 경로를 겨냥하는지 먼저 읽는 기준점이 돼.
## 같이 보면 좋은 모델
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — DeepSeek R1와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.
- [Llama](/ko/wiki/llama/) — Llama와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.
- [Gemma](/ko/wiki/gemma/) — Gemma와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.
- [Qwen](/ko/wiki/qwen/) — Qwen와는 오픈 웨이트 여부와 자체 호스팅 난도를 비교하기 쉬워.