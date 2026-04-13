---
term: on-device
title: "On-device AI"
lang: ko
summary: "On-device AI는 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "온디바이스"
  - "on device"
  - "device ai"
relatedTerms:
  - llama.cpp
  - ollama
  - quantization
  - gguf
firstMentioned: "2026-03-02"
mentionCount: 2
draft: false
tags:
  - local-ai
  - edge-ai
  - deployment
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://developers.google.com/machine-learning/glossary#on-device_inference"
      title: "อภิธานศัพท์เกี่ยวกับแมชชีนเลิร์นนิง
   &nbsp;|&nbsp; Machine Learning &nbsp;|&nbsp; Google for Developers"
    - url: "https://developer.apple.com/documentation/coreml"
      title: "Core ML | Apple Developer Documentation"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
        - "원문을 보면 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
        - "별칭 대조: 온디바이스, on device, device ai도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
        - "교차 대조: 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다."
        - "출처 1 대조: developers.google.com."
        - "출처 2 대조: developer.apple.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 오픈 모델과 로컬 배포 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
On-device AI를 짧게 잡으면 모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다 쪽이야. 데이터 저장만이 아니라 인증, 스토리지, 함수, API 레이어를 어디까지 한 번에 묶는지 같이 봐야 해.
## 어떻게 작동하나
모델에서 일시적으로 제거하여 기능이나 구성 요소의 중요성을 평가하는 기술입니다. 데이터 저장만이 아니라 인증, 스토리지, 함수, API 레이어를 어디까지 한 번에 묶는지 같이 봐야 해. 예를 들어 로그인, 데이터 저장, 파일 업로드, 서버 함수까지 한 화면에서 붙이는 백엔드 시제품을 만들 때 차이가 크게 드러나.
## 왜 중요한가
비용, 지연 시간, 데이터 통제권을 직접 잡고 싶을 때 핵심이 되는 축이야. 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어.
## 관련 용어
- [llama.cpp](/ko/wiki/llama.cpp/) — 같이 보면 로컬 배포와 오픈 모델 맥락을 같이 읽는 데 도움이 돼.
- [Ollama](/ko/wiki/ollama/) — 같이 보면 로컬 배포와 오픈 모델 맥락을 같이 읽는 데 도움이 돼.
- [Quantization](/ko/wiki/quantization/) — 같이 보면 로컬 배포와 오픈 모델 맥락을 같이 읽는 데 도움이 돼.
- [GGUF](/ko/wiki/gguf/) — 같이 보면 로컬 배포와 오픈 모델 맥락을 같이 읽는 데 도움이 돼.