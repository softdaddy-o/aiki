---
term: weights-and-biases
title: "Weights & Biases"
lang: ko
summary: "Weights & Biases는 모든 가중치 및 편향 제품에 대한 문서 보기."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하는 데 도움이 돼."
category: tool
aliases:
  - "wandb"
relatedTerms:
  - mlflow
  - kubeflow
mentionCount: 0
draft: false
tags:
  - mlops
  - tracking
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://wandb.ai/site"
      title: "Weights &amp; Biases: The AI Developer Platform"
    - url: "https://docs.wandb.ai/"
      title: "Weights &amp; Biases Documentation - Weights &amp; Biases Documentation"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 모든 가중치 및 편향 제품에 대한 문서 보기."
        - "원문을 보면 모든 가중치 및 편향 제품에 대한 문서 보기."
        - "별칭 대조: wandb도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 모든 가중치 및 편향 제품에 대한 문서 보기."
        - "교차 대조: 모든 가중치 및 편향 제품에 대한 문서 보기."
        - "출처 1 대조: wandb.ai."
        - "출처 2 대조: docs.wandb.ai."
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
Weights & Biases를 짧게 잡으면 모든 가중치 및 편향 제품에 대한 문서 보기 쪽이야. 실험 로그, dashboard, artifact, registry, deploy 흐름을 어떻게 추적하고 재현할지에서 차이가 크게 나.
## 실제로 무엇을 하나
모든 가중치 및 편향 제품에 대한 문서 보기. 실험 로그, dashboard, artifact, registry, deploy 흐름을 어떻게 추적하고 재현할지에서 차이가 크게 나. 예를 들어 실험 결과를 비교하고 모델 artifact를 저장한 뒤 나중에 같은 설정으로 다시 deploy하는 흐름이 대표적이야.
## 왜 중요한가
팀 규모가 커질수록 모델 그 자체보다 운영 체계가 더 큰 병목이 돼. 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워.
## 관련 용어
- [MLflow](/ko/wiki/mlflow/) — MLflow와 비교해 보면 운영과 배포에서 어디가 다른지 읽기 쉬워.
- [Kubeflow](/ko/wiki/kubeflow/) — Kubeflow와 함께 보면 Weights & Biases가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.