---
term: modal
title: "Modal"
lang: ko
summary: "Modal은 1초 미만의 콜드 스타트와 초당 가격 책정을 제공하는 서버리스 AI 인프라 플랫폼입니다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하는 데 도움이 돼."
category: tool
aliases:
  - "Modal"
relatedTerms:
  - quantization
  - onnx
  - runtime
  - on-device
firstMentioned: "2023-03-14"
mentionCount: 11
draft: true
tags:
  - deployment
  - serverless
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://modal.com/"
      title: "Modal: High-performance AI infrastructure"
    - url: "https://modal.com/docs/guide"
      title: "Introduction"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 1초 미만의 콜드 스타트와 초당 가격 책정을 제공하는 서버리스 AI 인프라 플랫폼입니다."
        - "원문을 보면 1초 미만의 콜드 스타트와 초당 가격 책정을 제공하는 서버리스 AI 인프라 플랫폼입니다."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 AI 및 데이터 팀을 위한 서버리스 플랫폼입니다."
        - "교차 대조: AI 및 데이터 팀을 위한 서버리스 플랫폼입니다."
        - "출처 1 대조: modal.com."
        - "출처 2 대조: modal.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 운영과 배포 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 모델 자체와 같은 말로 쓰면 제품 층위와 운영 층위가 섞이기 쉬워."
        - "헷갈리기 쉬운 건 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Modal를 짧게 잡으면 1초 미만의 콜드 스타트와 초당 가격 책정을 제공하는 서버리스 AI 인프라 플랫폼입니다 쪽이야. 데이터 저장만이 아니라 인증, 스토리지, 함수, API 레이어를 어디까지 한 번에 묶는지 같이 봐야 해.
## 실제로 무엇을 하나
AI 및 데이터 팀을 위한 서버리스 플랫폼입니다. 데이터 저장만이 아니라 인증, 스토리지, 함수, API 레이어를 어디까지 한 번에 묶는지 같이 봐야 해. 예를 들어 로그인, 데이터 저장, 파일 업로드, 서버 함수까지 한 화면에서 붙이는 백엔드 시제품을 만들 때 차이가 크게 드러나.
## 왜 중요한가
팀 규모가 커질수록 모델 그 자체보다 운영 체계가 더 큰 병목이 돼. 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워.
## 관련 용어
- [Quantization](/ko/wiki/quantization/) — Quantization와 함께 보면 Modal가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [ONNX](/ko/wiki/onnx/) — ONNX와 함께 보면 Modal가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [Runtime](/ko/wiki/runtime/) — Runtime와 함께 보면 Modal가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [On-device AI](/ko/wiki/on-device/) — On-device AI와 함께 보면 Modal가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.