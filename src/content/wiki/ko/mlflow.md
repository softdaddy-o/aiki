---
term: mlflow
title: "MLflow(엠엘플로우)"
lang: ko
summary: "MLflow는 실험 기록, 모델 버전, 평가, 추적 데이터를 한 흐름으로 관리하게 해 주는 오픈소스 AI 엔지니어링 플랫폼이야. 예전의 실험 추적 도구 이미지가 강했지만, 요즘은 LLM과 에이전트 관찰성 쪽까지 범위가 넓어졌어."
readerValue: "이 용어를 알면 기사에서 모델 성능 얘기와 운영 기록 체계 얘기를 섞지 않고 읽을 수 있어."
category: tool
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "MLflow(엠엘플로우)"
relatedTerms:
  - weights-and-biases
  - kubeflow
mentionCount: 0
draft: false
tags:
  - mlops
  - tracking
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://github.com/mlflow/mlflow"
      title: "mlflow/mlflow"
    - url: "https://mlflow.org/"
      title: "Deliver High-Quality AI, Fast"
  checks:
    - type: source_match
      result: pass
      summary: "최신 MLflow 포지셔닝인 AI engineering platform 흐름에 맞춰 다시 썼어."
      items:
        - "독자 문제 대조: 이 페이지는 MLflow를 낡은 실험 기록 도구로만 보지 않고, 왜 요즘 LLM 추적과 평가 문맥에서도 나오는지 바로 연결해 줘."
        - "공식 저장소와 사이트는 실험 추적뿐 아니라 evaluation, tracing, optimization 쪽까지 범위를 넓혀 설명하고 있어."
      findings:
        - "확인 출처: https://github.com/mlflow/mlflow"
        - "확인 출처: https://mlflow.org/"
    - type: web_cross_check
      result: pass
      sources: 1
      summary: "깃허브와 공식 사이트 모두 MLflow의 범위가 넓어졌다는 점에서 맞물려 있어."
      items:
        - "비교 기준: 전통적 experiment tracking 도구인지, 최신 AI 애플리케이션 추적과 평가까지 포함하는지 비교했어."
        - "공식 사이트는 tracing, prompt management, evaluation 같은 표현을 전면에 둬."
      findings:
        - "그래서 본문도 옛 설명에만 묶지 않고 현재 쓰임새까지 반영했어."
    - type: number_verify
      result: skip
      summary: "다운로드 수나 스타 수 같은 변하는 숫자는 본문에서 뺐어."
      items:
        - "프로젝트 인기도 숫자는 금방 바뀌니까 핵심 설명에서 제외했어."
        - "대신 역할과 실무 쓰임새를 남겨서 오래 가는 문장으로 맞췄어."
      findings:
        - "변동 수치보다 기능 범위 설명이 더 안정적이야."
    - type: adversarial
      result: pass
      summary: "MLflow가 모든 MLOps를 대신한다는 식의 과장을 피했어."
      items:
        - "오해 점검: MLflow를 쓴다고 쿠버네티스 파이프라인 운영까지 자동으로 해결되진 않아."
        - "오해 점검: 팀마다 tracking만 쓰는지, registry와 tracing까지 쓰는지 범위가 다를 수 있어."
      findings:
        - "독자가 제품 범위를 과장해서 받아들이지 않게 조정했어."
---
## 한 줄 정의
MLflow는 머신러닝과 생성형 AI 개발 과정에서 생기는 실험 기록, 모델 버전, 평가 결과를 연결해서 관리하는 플랫폼이야. 한 번의 학습을 돌리는 도구가 아니라, 여러 번의 시도와 그 결과를 잃지 않게 묶는 시스템이라고 보면 돼.
## 어떻게 작동하나
학습 코드나 애플리케이션에서 파라미터, 메트릭, 아티팩트, 추적 데이터를 MLflow에 기록하면 나중에 실행별 차이를 비교할 수 있어. 거기에 모델 레지스트리나 평가 기능을 붙이면 어떤 모델이 언제 어떻게 만들어졌고 어디에 배포됐는지 한 줄로 이어서 볼 수 있어.
## 왜 중요한가
AI 프로젝트는 시간이 갈수록 코드보다 실험 이력과 평가 근거가 더 중요해지는 경우가 많아. 그래서 MLflow가 언급되면 보통 새 알고리즘보다, 재현성, 팀 공용 기록, LLM 추적과 평가 체계를 어떻게 만들었는지가 핵심이라고 읽는 편이 정확해.
## 주의해서 볼 점
MLflow 하나로 파이프라인 운영 전체가 자동 완성되진 않아. 어떤 팀은 실험 추적만 쓰고, 어떤 팀은 레지스트리와 추적까지 같이 쓰니까 실제 문맥에서 어디까지 쓰는지 구분해서 봐야 해.
## 관련 용어
- `weights-and-biases`: 둘 다 실험 추적과 평가 문맥에서 자주 비교돼. MLflow는 오픈소스와 자가 호스팅 흐름이 강하다는 점이 자주 포인트가 돼.
- `kubeflow`: Kubeflow는 쿠버네티스 기반 파이프라인과 운영 자동화 쪽으로 더 넓어. MLflow는 실험 기록, 모델 관리, 추적과 평가 쪽에 더 직접적이야.
