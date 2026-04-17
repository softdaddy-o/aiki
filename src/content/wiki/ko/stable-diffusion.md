---
term: stable-diffusion
title: Stable Diffusion(스테이블 디퓨전)
lang: ko
summary: Stable Diffusion은 Stability AI와 함께 자주 언급되는 이미지 생성 모델 계열이야.
readerValue: >-
  이 이름이 벤치마크 숫자보다 어떤 이미지 작업에 쓰이고, 로컬 실행이나 API 배포 같은 운영 선택지가 왜 같이 따라붙는지 읽는 데 도움이
  돼.
category: model
modelType: family
modelProfile:
  memoryUsage: '직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다. 이렇게 보면 돼.'
  implementation: '생성 모델 계열로 보면 되고, 확산형인지 다른 구현인지 공식 문서 기준으로 구분하면 돼.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 돼.
  access: 무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있어.
  pricing: >-
    직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다. 이렇게 보면
    돼.
  weightsOpen: 오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요해.
  vendor: Stability AI
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - 스테이블 디퓨전
  - SD
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
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Stable_Diffusion'
      title: Stable Diffusion
    - url: 'https://stability.ai/stable-image'
      title: Stability AI Image Models &mdash; Stability AI
  checks:
    - type: source_match
      result: pass
      summary: Stable Diffusion을 이미지 생성 모델 계열로 소개하는 출처 흐름에 맞춰 정의를 다시 맞춰봤어.
      items:
        - '독자 문제 대조: Stable Diffusion을 단일 앱 이름이 아니라 이미지 생성 모델 계열로 읽게 첫 문장을 고쳤어.'
        - 위키 요약과 Stability AI 소개에서 공통으로 잡히는 텍스트-투-이미지 맥락을 중심에 뒀어.
      findings:
        - 모델 계열이라는 점을 분명히 남겼어.
    - type: web_cross_check
      result: pass
      summary: 위키성 설명과 벤더 소개를 나란히 보고 실사용 장면 위주로 다시 봤어.
      items:
        - >-
          비교 기준: 백과형 설명의 기본 정의와 Stability AI의 제품 소개를 맞춰 보면서 공통으로 성립하는 이미지 생성·편집
          활용만 남겼어.
        - '버전별 마케팅 표현은 제각각이라, 제품 초안·인페인팅 같은 넓은 활용 범위만 유지했어.'
      findings:
        - 벤더 홍보 문구를 그대로 베끼지 않게 줄였어.
    - type: number_verify
      result: pass
      summary: '출시 연도처럼 널리 알려진 숫자는 확인하고, 변동성 큰 가격·속도 수치는 빼서 다시 봤어.'
      items:
        - '백과 설명에 나온 2022 공개 맥락은 안정적인 숫자라 참고했지만, 본문은 날짜 암기보다 사용처 이해에 집중하게 썼어.'
        - '가격, VRAM, 처리 속도처럼 환경 따라 달라지는 숫자는 넣지 않았어.'
      findings:
        - 고정 숫자는 최소만 참고했고 변동 숫자는 막았어.
    - type: adversarial
      result: pass
      summary: 가장 흔한 오해인 'Stable Diffusion은 한 버전짜리 제품'이라는 해석을 막았어.
      items:
        - 'Stable Diffusion을 단일 서비스 이름으로만 읽지 않게, 여러 버전과 파생 모델을 묶어 부른다는 점을 밝혔어.'
        - >-
          또 이미지 생성 결과가 자동으로 상업 사용 안전성을 보장하는 건 아니라는 전제가 필요해서, 실무 문맥만 강조하고 안전성 보장은
          말하지 않았어.
      findings:
        - 단일 제품 오해와 만능 안전성 오해를 줄였어.
---
## 한 줄 정의
Stable Diffusion은 텍스트 설명이나 기존 이미지를 바탕으로 새 이미지를 만들어 내는 확산 기반 이미지 모델 계열이야. Stability AI 이름과 함께 자주 나오지만, 실제로는 SDXL 같은 여러 버전과 파생 모델을 묶어 부르는 경우가 많아.
## 이 모델로 무엇을 할 수 있나
실무에서는 콘셉트 시안, 광고 비주얼 초안, 썸네일, 배경 생성, 인페인팅 같은 작업에 많이 써. Stability AI API로 붙여 쓸 수도 있고, 로컬 GPU 환경에서 직접 돌리는 배포 경로도 널리 쓰여서 제품 실험과 내부 제작 파이프라인에 자주 들어가.
## 왜 중요한가
Stable Diffusion 계열은 이미지 생성 AI를 대형 클라우드 데모에서 끝내지 않고, 실제 제작 워크플로와 로컬 실행 문화로 퍼뜨린 축 가운데 하나야. 그래서 기사에서 이 이름이 보이면 성능 숫자만 볼 게 아니라, 어떤 팀이 자체 워크플로에 붙이려는지까지 같이 읽는 게 중요해.
## 같이 보면 좋은 모델
- DeepSeek R1은 텍스트 추론 모델이라서, Stable Diffusion처럼 이미지를 직접 만드는 모델과 역할이 아예 다르다는 걸 비교해 보기 좋아.
- Llama는 텍스트 중심 오픈 모델 계열이라서, '계열 이름'으로 불린다는 점은 비슷해도 출력 대상이 다르다는 걸 보여 줘.
- Gemma를 같이 보면 경량 텍스트 모델과 이미지 생성 모델이 배포 전략에서 어떻게 갈리는지 감이 잡혀.
- Qwen을 같이 보면 멀티버전 모델 계열을 읽는 법은 비슷하지만, Stable Diffusion은 이미지 제작 파이프라인에 붙는다는 점이 더 선명해져.
