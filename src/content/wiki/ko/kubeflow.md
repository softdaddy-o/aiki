---
term: kubeflow
title: "Kubeflow"
lang: ko
summary: "Kubeflow를 사용하면 Kubernetes에 ML 워크플로를 간단하고 자동화하여 배포할 수 있습니다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하는 데 도움이 돼."
category: framework
aliases:
  - "Kubeflow"
relatedTerms:
  - weights-and-biases
  - mlflow
mentionCount: 0
draft: true
tags:
  - mlops
  - kubernetes
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://github.com/kubeflow/kubeflow"
      title: "kubeflow/kubeflow"
    - url: "https://www.kubeflow.org/"
      title: "Kubeflow"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 를 사용하면 Kubernetes에 ML 워크플로를 간단하고 자동화하여 배포할 수 있습니다."
        - "원문을 보면 를 사용하면 Kubernetes에 ML 워크플로를 간단하고 자동화하여 배포할 수 있습니다."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 프레임워크로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "교차 대조: 여러 출처가 같은 층위의 용어로 설명하는지 확인했어."
        - "출처 1 대조: github.com."
        - "출처 2 대조: kubeflow.org."
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
        - "헷갈리기 쉬운 건 완제품이나 단일 모델처럼 읽으면 직접 조립해야 하는 범위를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Kubeflow를 짧게 잡으면 를 사용하면 Kubernetes에 ML 워크플로를 간단하고 자동화하여 배포할 수 있습니다 쪽이야. 실험 로그, dashboard, artifact, registry, deploy 흐름을 어떻게 추적하고 재현할지에서 차이가 크게 나.
## 실제로 무엇을 하나
실험 로그, dashboard, artifact, registry, deploy 흐름을 어떻게 추적하고 재현할지에서 차이가 크게 나. 예를 들어 실험 결과를 비교하고 모델 artifact를 저장한 뒤 나중에 같은 설정으로 다시 deploy하는 흐름이 대표적이야. 완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여.
## 왜 중요한가
팀 규모가 커질수록 모델 그 자체보다 운영 체계가 더 큰 병목이 돼. 완제품이나 모델 이름과 비교해 두면 어디까지 직접 조립해야 하는지 차이가 더 또렷하게 보여.
## 관련 용어
- [Weights & Biases](/ko/wiki/weights-and-biases/) — Weights & Biases와 함께 보면 Kubeflow가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.
- [MLflow](/ko/wiki/mlflow/) — MLflow와 함께 보면 Kubeflow가 제품, 개념, 모델 가운데 어느 층위인지 비교하기 쉬워.