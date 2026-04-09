---
term: kubeflow
title: "Kubeflow"
lang: ko
summary: "운영과 배포 흐름을 연결하고 조립하는 프레임워크야. 결국 운영과 배포 흐름을 어떤 구조로 묶어야 하는지를 풀 때 어떤 뼈대를 쓸지 가르는 이름이야."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
category: framework
aliases:
  - "Kubeflow"
relatedTerms:
  - weights-and-biases
  - mlflow
mentionCount: 0
draft: false
tags:
  - mlops
  - kubernetes
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://github.com/kubeflow/kubeflow"
      title: "kubeflow/kubeflow"
    - url: "https://www.kubeflow.org/"
      title: "Kubeflow"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 운영과 배포 흐름을 어떤 구조로 묶어야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: 운영과 배포 흐름을 어떤 구조로 묶어야 하는지."
        - "이름을 다시 보면 Kubeflow로 잡혀."
        - "분류를 다시 보면 프레임워크로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 운영과 배포 흐름을 어떤 구조로 묶어야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "여기서 먼저 갈라 볼 기준은 운영과 배포 흐름을 어떤 구조로 묶어야 하는지야."
        - "비교 출처 1: kubeflow/kubeflow (https://github.com/kubeflow/kubeflow)"
        - "비교 출처 2: Kubeflow (https://www.kubeflow.org/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 운영과 배포 흐름을 어떤 구조로 묶어야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 운영과 배포 흐름을 어떤 구조로 묶어야 하는지야."
        - "이름부터 다시 보면 Kubeflow로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 운영과 배포 흐름을 어떤 구조로 묶어야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "헷갈리지 않으려면 운영과 배포 흐름을 어떤 구조로 묶어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 운영과 배포 흐름을 어떤 구조로 묶어야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
운영과 배포 흐름을 연결하고 조립하는 프레임워크야. 쉽게 말하면 실험과 배포를 기록하고 반복 가능하게 만드는 운영층을 코드와 시스템 구조로 묶는 뼈대야. 결국 운영과 배포 흐름을 어떤 구조로 묶어야 하는지를 풀 때 어떤 골조를 쓸지 가르는 이름이야.
## 실제로 무엇을 하나
결과를 직접 만드는 모델이라기보다 흐름을 묶는 틀에 가까워. 실험 로그, 버전, 배포 상태, 인프라 구성을 관리해 팀이 같은 결과를 다시 만들 수 있게 해 준다. 보통 관건은 운영과 배포 흐름을 어떤 구조로 묶어야 하는지를 어떤 구조로 묶느냐야.
## 왜 중요한가
팀 규모가 커질수록 모델 그 자체보다 운영 체계가 더 큰 병목이 돼. 결국 운영과 배포 흐름을 어떤 구조로 묶어야 하는지를 어느 구조 문제로 볼지 알아야 도입 판단이 쉬워져.
## 관련 용어
- [Weights & Biases](/ko/wiki/weights-and-biases/) — 운영과 배포 관점에서 같이 보면 맥락이 선다.
- [MLflow](/ko/wiki/mlflow/) — 운영과 배포 관점에서 같이 보면 맥락이 선다.