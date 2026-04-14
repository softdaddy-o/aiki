---
term: kubeflow
title: "Kubeflow (큐브플로)"
lang: ko
summary: "Kubeflow는 Kubernetes 위에서 머신러닝 학습, 파이프라인, 노트북, 배포를 한 흐름으로 묶어 운영하게 해주는 오픈소스 프레임워크야."
readerValue: "이 이름이 단순한 모델 이름이 아니라, ML 팀의 개발·실험·배포 흐름을 Kubernetes 방식으로 정리하는 프레임워크인지 바로 구분하게 도와줘."
category: framework
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "큐브플로"
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
  date: "2026-04-14"
  sources:
    - url: "https://github.com/kubeflow/kubeflow"
      title: "kubeflow/kubeflow"
    - url: "https://www.kubeflow.org/"
      title: "Kubeflow"
  checks:
    - type: source_match
      result: pass
      summary: "공식 설명이 가리키는 대상이랑 본문 정의를 맞춰뒀어."
      items:
        - "독자 문제 대조: 이 이름이 단순한 모델 이름이 아니라 Kubernetes용 머신러닝 워크플로 툴킷인지 공식 저장소 설명으로 먼저 맞춰봤어."
        - "공식 사이트도 Kubeflow를 Kubernetes에서 ML 워크플로 배포를 쉽게 만드는 프로젝트로 설명해서, 본문이 인프라형 프레임워크라는 축을 유지하는지 확인했어."
      findings:
        - "GitHub 저장소 설명과 공식 사이트 설명 모두 Kubernetes 기반 ML 워크플로 운영이라는 핵심을 공유했어."
        - "본문 정의도 모델 성능 향상 기술이 아니라 운영 프레임워크라는 쪽으로 정리됐어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "두 공식 출처를 나란히 놓고 설명 축이 흔들리지 않는지 봤어."
      items:
        - "비교 기준: GitHub 저장소 설명이 'Kubernetes용 머신러닝 툴킷'에 무게를 두는지, 공식 사이트가 'ML workflows 배포 자동화'에 무게를 두는지 비교했어."
        - "둘 다 모델 자체보다 워크플로와 배포 운영을 중심에 놓고 있어서, 본문이 Kubeflow를 인프라 프레임워크로 설명하는 방향과 어긋나지 않았어."
      findings:
        - "두 출처 모두 Kubeflow를 Kubernetes 위에서 ML 작업을 조직하는 도구로 설명했어."
        - "기능 소개 방식은 조금 달라도 핵심 포지션은 일치했어."
    - type: number_verify
      result: pass
      summary: "숫자로 흔들릴 만한 주장 대신 안정적인 역할 설명만 남겼어."
      items:
        - "본문에는 노드 수, 지원 컴포넌트 개수, 성능 수치처럼 바뀌기 쉬운 숫자를 넣지 않았어."
        - "핵심은 Kubeflow의 역할이 Kubernetes 기반 ML 워크플로 프레임워크라는 점이라서, 숫자보다 기능 범위와 용도 구분을 중심으로 검토했어."
      findings:
        - "변동 가능성이 큰 수치 주장을 피해서 오래 가는 설명으로 맞췄어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 오해를 먼저 잘라냈어."
      items:
        - "흔한 오해: Kubeflow를 모델을 학습시키는 라이브러리로 읽으면, 실제 가치인 Kubernetes 기반 운영 표준화를 놓치기 쉬워."
        - "흔한 오해: 실험 추적만 필요할 때도 Kubeflow가 정답이라고 보면, MLflow나 Weights & Biases 같은 더 가벼운 선택지를 놓치기 쉬워."
      findings:
        - "이 문서는 Kubeflow를 인프라 프레임워크로 설명하고, 개별 추적 도구와의 경계도 분리해뒀어."
        - "도입 난도와 운영 부담도 같이 적어서 과장된 기대를 줄였어."
---
## 한 줄 정의
Kubeflow는 Kubernetes 위에서 머신러닝 작업 흐름을 체계적으로 굴리게 해주는 오픈소스 프레임워크야. 모델 자체를 더 똑똑하게 만드는 기술이라기보다, 학습부터 파이프라인과 배포까지 ML 팀의 일을 쿠버네티스 방식에 맞춰 정리하는 틀이야.
## 어떻게 작동하나
Kubeflow는 Kubernetes 자원 위에 노트북, 학습 잡, 파이프라인, 서빙 같은 ML 구성 요소를 올려서 반복 가능한 워크플로를 만들게 해. 그래서 팀은 개별 스크립트를 수동으로 돌리는 대신, 컨테이너와 오케스트레이션 규칙에 맞춘 방식으로 실험과 운영을 이어 가게 돼.
## 왜 중요한가
조직 규모가 커질수록 데이터 과학자, ML 엔지니어, 플랫폼 팀이 같은 환경과 규칙을 공유해야 해서 머신러닝 작업을 표준화된 흐름에 올리는 가치가 커져. Kubeflow는 재현 가능한 파이프라인과 자원 관리 규칙을 맞추는 데 도움이 돼서, 사람 손으로 이어 붙인 운영을 줄이는 쪽에서 의미가 커.
## 주의해서 볼 점
Kubeflow는 강력하지만 Kubernetes 이해도와 운영 역량이 부족하면 오히려 팀 부담을 크게 늘릴 수 있어. 실험 추적이나 모델 등록 같은 일부 기능만 필요하다면, 더 가벼운 도구 조합이 Kubeflow 전체 도입보다 현실적일 때도 많아.
## 관련 용어
- `weights-and-biases`: Weights & Biases는 실험 기록과 시각화 쪽이 더 직접적이야. Kubeflow는 그보다 Kubernetes 위에서 파이프라인과 배포까지 묶는 운영 틀에 더 가까워.
- `mlflow`: MLflow는 실험 추적, 모델 레지스트리, 평가 흐름을 다루는 데 익숙한 선택지야. Kubeflow는 여기에 Kubernetes 기반 오케스트레이션과 워크플로 자동화 비중이 더 커.