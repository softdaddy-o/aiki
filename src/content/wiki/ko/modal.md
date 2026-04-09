---
term: modal
title: "Modal"
lang: ko
summary: "운영과 배포 작업에 자주 쓰이는 AI 도구다. 모델 자체보다 실제 사용 흐름을 바꾸는 쪽에 가깝다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
category: tool
aliases:
  - "Modal"
relatedTerms:
  - quantization
  - onnx
  - bentoml
firstMentioned: "2023-03-14"
mentionCount: 11
draft: false
tags:
  - deployment
  - serverless
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://modal.com/"
      title: "Modal: High-performance AI infrastructure"
    - url: "https://modal.com/docs/guide"
      title: "Introduction"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Modal"
        - "분류 대조: 도구"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Modal: High-performance AI infrastructure (https://modal.com/)"
        - "Introduction (https://modal.com/docs/guide)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
운영과 배포 작업에 쓰이는 AI 도구다. 쉽게 말하면 실험과 배포를 기록하고 반복 가능하게 만드는 운영층을 실제 제품과 워크플로로 옮긴 쪽에 가깝다.
## 실제로 무엇을 하나
모델 자체라기보다 운영과 배포 작업을 실제로 굴리는 도구 쪽에 가깝다. 실험 로그, 버전, 배포 상태, 인프라 구성을 관리해 팀이 같은 결과를 다시 만들 수 있게 해 준다. 그래서 기능 목록보다 어떤 병목을 줄여 주는지로 읽는 편이 이해가 빠르다.
## 왜 중요한가
팀 규모가 커질수록 모델 그 자체보다 운영 체계가 더 큰 병목이 된다. 실무에서는 도구 이름을 모델 이름처럼 오해하면 실제 도입 범위와 필요한 연결 작업을 잘못 보기 쉽다.
## 관련 용어
- [Quantization](/ko/wiki/quantization/) — 학습·압축 전략 맥락을 같이 이해하게 해 준다.
- [ONNX](/ko/wiki/onnx/) — 운영과 배포 관점에서 같이 보면 맥락이 선다.
- [BentoML](/ko/wiki/bentoml/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.