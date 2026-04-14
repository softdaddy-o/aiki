---
term: kubeflow
title: "Kubeflow(쿠브플로우)"
lang: ko
summary: "Kubeflow는 Kubernetes 위에서 머신러닝 워크플로를 굴리기 쉽게 만들어 주는 오픈소스 프레임워크야. 모델 하나를 더 똑똑하게 만드는 기술이라기보다 학습, 파이프라인, 서빙, 운영 규칙을 쿠버네티스 방식으로 묶는 쪽에 더 가까워."
readerValue: "이 이름이 나오면 새 모델 얘기보다 ML 팀의 쿠버네티스 운영 체계와 파이프라인 자동화 얘기라는 걸 바로 잡을 수 있어."
category: framework
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "Kubeflow(쿠브플로우)"
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
      sources: 2
      summary: "공식 소개가 말하는 Kubernetes용 ML toolkit 성격과 본문을 맞춰봤어."
      items:
        - "독자 문제 대조: Kubeflow를 새 모델 기술이 아니라 Kubernetes 위의 ML 워크플로 프레임워크로 먼저 이해하게 했어."
        - "공식 사이트가 말하는 deployment of ML workflows on Kubernetes라는 축을 본문 첫 설명에 반영했어."
      findings:
        - "깃허브 소개도 Machine Learning Toolkit for Kubernetes라고 아주 직접적으로 적고 있었어."
        - "공식 사이트도 워크플로 배포와 자동화를 중심으로 설명하고 있었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "저장소와 공식 사이트가 같은 운영 프레임워크 축을 말하는지 다시 봤어."
      items:
        - "비교 기준: 모델 학습 라이브러리인지, 실험 추적 도구인지, Kubernetes 운영 프레임워크인지 나눠서 봤어."
        - "두 출처 다 Kubeflow를 워크플로 배포와 자동화 중심의 프레임워크로 설명하고 있었어."
      findings:
        - "그래서 본문도 파이프라인과 운영 규칙 설명을 앞세웠어."
        - "단일 기능 도구처럼 좁게 설명하는 위험을 줄였어."
    - type: number_verify
      result: skip
      summary: "버전이나 도입 규모 숫자는 빼고 역할 설명만 남겼어."
      items:
        - "릴리스 버전, 설치 규모, 성능 숫자처럼 자주 바뀌는 정보는 본문에서 뺐어."
        - "대신 Kubernetes 기반 ML 운영 틀이라는 안정적인 설명만 남겼어."
      findings:
        - "숫자 때문에 문서가 빨리 낡을 위험은 줄였어."
        - "핵심 개념은 더 또렷하게 남겼어."
    - type: adversarial
      result: pass
      sources: 2
      summary: "Kubeflow가 모든 팀에 무조건 맞는 해답이라는 오해를 막았어."
      items:
        - "강력한 프레임워크라도 Kubernetes 운영 역량이 없으면 도입 비용이 크게 늘 수 있어."
        - "실험 추적 같은 일부 문제만 풀고 싶다면 더 가벼운 조합이 나을 수도 있어."
      findings:
        - "플랫폼 규모와 팀 역량을 같이 보게 만들었어."
        - "대형 프레임워크 도입을 무조건 정답처럼 읽는 과장도 막았어."
---
## 한 줄 정의
Kubeflow는 Kubernetes 위에서 머신러닝 작업 흐름을 체계적으로 굴리게 해 주는 오픈소스 프레임워크야. [공식 사이트](https://www.kubeflow.org/)와 [GitHub 저장소](https://github.com/kubeflow/kubeflow) 2곳 모두 이걸 Kubernetes용 ML toolkit으로 설명해.
## 어떻게 작동하나
노트북, 학습 잡, 파이프라인, 서빙 같은 ML 구성 요소를 Kubernetes 자원과 연결해서 반복 가능한 워크플로로 만든다고 보면 돼. 보통 노트북, 파이프라인, 서빙처럼 최소 3개 축이 같이 움직여서 개별 스크립트를 손으로 이어 붙일 때보다 운영 규칙을 맞추기 쉬워져.
## 왜 중요한가
조직 규모가 커질수록 데이터 과학자, ML 엔지니어, 플랫폼 팀처럼 3개 역할이 같은 환경과 규칙을 공유해야 해서 머신러닝 작업을 표준화된 흐름에 올리는 가치가 커져. Kubeflow는 이런 역할 분리를 Kubernetes 운영 규칙 위에서 맞추는 데 도움을 줘.
## 주의해서 볼 점
Kubeflow는 강력하지만 Kubernetes 이해도와 운영 역량이 부족하면 오히려 팀 부담을 크게 늘릴 수 있어. 실험 추적이나 모델 등록 같은 일부 기능만 필요하다면 더 가벼운 도구 조합이 Kubeflow 전체 도입보다 현실적일 때도 많아.
## 관련 용어
- `weights-and-biases`: W&B는 실험 기록과 시각화에 더 직접적인 도구야. Kubeflow는 그보다 쿠버네티스 위에서 파이프라인과 배포까지 묶는 운영 틀에 더 가까워.
- `mlflow`: MLflow는 실험 추적, registry, 평가 흐름을 다루는 데 익숙한 선택지야. Kubeflow는 여기에 Kubernetes 기반 오케스트레이션과 워크플로 자동화 비중이 더 커.
