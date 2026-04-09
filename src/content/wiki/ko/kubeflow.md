---
term: kubeflow
title: "Kubeflow"
lang: ko
summary: "운영과 배포 흐름을 연결하고 조립하는 프레임워크야. 여러 단계와 도구를 묶는 문맥에서 자주 나와."
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
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Kubeflow"
        - "분류 대조: 프레임워크"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "kubeflow/kubeflow (https://github.com/kubeflow/kubeflow)"
        - "Kubeflow (https://www.kubeflow.org/)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Kubeflow"
        - "숫자가 적은 개념형 항목이라 고정 스펙보다 정의와 분류가 틀리지 않는지 먼저 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
운영과 배포 흐름을 연결하고 조립하는 프레임워크야. 쉽게 말하면 실험과 배포를 기록하고 반복 가능하게 만드는 운영층을 코드와 시스템 구조로 묶는 뼈대야.
## 실제로 무엇을 하나
결과를 직접 만드는 모델이라기보다 흐름을 묶는 틀에 가까워. 실험 로그, 버전, 배포 상태, 인프라 구성을 관리해 팀이 같은 결과를 다시 만들 수 있게 해 준다. 보통 프롬프트, 검색, 메모리, 실행 순서를 어떻게 묶는지가 관건이야.
## 왜 중요한가
팀 규모가 커질수록 모델 그 자체보다 운영 체계가 더 큰 병목이 돼. 프레임워크는 모델 성능보다 개발 속도와 시스템 구조를 바꾸는 경우가 많아서, 그 차이를 알아야 도입 판단이 쉬워져.
## 관련 용어
- [Weights & Biases](/ko/wiki/weights-and-biases/) — 운영과 배포 관점에서 같이 보면 맥락이 선다.
- [MLflow](/ko/wiki/mlflow/) — 운영과 배포 관점에서 같이 보면 맥락이 선다.