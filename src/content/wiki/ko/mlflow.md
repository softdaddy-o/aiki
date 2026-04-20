---
term: mlflow
title: MLflow(엠엘플로우)
lang: ko
summary: >-
  MLflow는 실험 기록, 모델 버전, 평가 결과, 추적 데이터를 한 흐름으로 묶어 주는 오픈소스 AI 엔지니어링 플랫폼이야. 예전엔 실험
  추적 도구 이미지가 강했지만 지금은 LLM과 에이전트 평가, 모니터링 쪽까지 범위를 넓히고 있어.
readerValue: '이 용어를 알면 모델 성능 얘기와 별개로, 실험과 배포 기록을 관리하는 계층을 가리키는 말인지 바로 구분할 수 있어.'
category: tool
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - MLflow(엠엘플로우)
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
  date: '2026-04-14'
  sources:
    - url: 'https://github.com/mlflow/mlflow'
      title: mlflow/mlflow
    - url: 'https://mlflow.org/'
      title: 'Deliver High-Quality AI, Fast'
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 오픈소스 AI engineering platform이라는 공식 설명과 실제 쓰임새를 맞춰봤어.
      items:
        - >-
          독자 문제 대조: MLflow를 단순 예전 실험 로그 도구가 아니라, 실험과 모델 운영 기록을 묶는 플랫폼으로 먼저 이해하게
          했어.
        - '공식 소개에 나오는 debug, evaluate, monitor, optimize 흐름을 본문 설명과 이어서 맞췄어.'
      findings:
        - '깃허브와 공식 사이트 둘 다 agents, LLMs, ML models까지 범위를 넓혀 설명하고 있었어.'
        - tracking만이 아니라 evaluation과 monitoring도 현재 설명 축에 들어가 있었어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 저장소 소개와 제품 사이트가 같은 제품 범위를 말하는지 다시 봤어.
      items:
        - '비교 기준: 실험 추적 전용 도구인지, 더 넓은 AI 엔지니어링 플랫폼인지 나눠서 봤어.'
        - '두 출처 다 최근 설명에서는 tracing, evaluation, monitoring까지 같이 묶고 있었어.'
      findings:
        - 그래서 본문도 예전 이미지와 현재 범위를 같이 짚는 방식으로 잡았어.
        - 플랫폼 범위를 너무 좁게 설명하는 실수를 줄였어.
    - type: number_verify
      result: skip
      summary: 버전 번호나 도입 규모 숫자는 빼고 오래 가는 제품 설명만 남겼어.
      items:
        - 특정 릴리스 번호나 사용자 수처럼 금방 바뀌는 숫자는 본문에 넣지 않았어.
        - 대신 기능 축과 쓰임새 중심으로 설명을 남겼어.
      findings:
        - 수치 오인 가능성은 줄였어.
        - 추후 업데이트 부담도 같이 줄였어.
    - type: adversarial
      result: pass
      sources: 2
      summary: MLflow 하나면 MLOps 전체가 끝난다는 식의 오해를 막았어.
      items:
        - tracking을 잘 한다고 해서 파이프라인 운영이나 배포 자동화까지 전부 해결되는 건 아니야.
        - >-
          팀마다 tracing, registry, evaluation 사용 깊이가 달라서 문맥 없이 이름만 보고 범위를 단정하면
          헷갈려.
      findings:
        - 실험 추적 도구와 전체 운영 플랫폼을 같은 말로 섞지 않게 했어.
        - 문맥별 쓰임새 차이를 남겨서 과장을 막았어.
---
## 한 줄 정의
MLflow는 머신러닝과 생성형 AI 개발 과정에서 생기는 실험 기록, 모델 버전, [평가](/ko/wiki/eval/) 결과를 연결해서 관리하는 오픈소스 플랫폼이야. [공식 사이트](https://mlflow.org/)와 [GitHub 저장소](https://github.com/mlflow/mlflow) 모두 이걸 tracking을 넘는 AI engineering platform으로 설명해.
## 어떻게 작동하나
훈련 코드나 애플리케이션에서 파라미터, 메트릭, 아티팩트, 추적 데이터를 MLflow에 기록하면 실행별 차이를 비교할 수 있어. 최근 공식 설명도 debug, evaluate, monitor, optimize처럼 4개 흐름을 함께 묶어서 보여 주기 때문에, 단순 실험 로그 툴로만 보면 범위를 좁게 잡는 셈이야.
## 왜 중요한가
AI 프로젝트는 시간이 갈수록 코드보다 실험 이력과 [평가](/ko/wiki/eval/) 근거가 더 중요해지는 경우가 많아. 특히 실험 기록, [evaluation](/ko/wiki/eval/), registry처럼 최소 3개 층이 엮이기 시작하면 누가 언제 무엇을 바꿨는지 남기는 계층의 가치가 바로 커져.
## 주의해서 볼 점
MLflow 하나로 파이프라인 전체가 자동 완성되진 않아. 어떤 팀은 실험 추적만 쓰고, 어떤 팀은 registry와 tracing까지 깊게 쓰니까 실제 문맥에서 어디까지 포함하는지 구분해서 봐야 해.
## 관련 용어
- [weights-and-biases](/ko/wiki/weights-and-biases/): 둘 다 실험 추적과 평가를 다루지만 W&B는 호스티드 경험과 시각화가 더 두드러지는 편이야. MLflow는 오픈소스 기반으로 조합해서 붙이는 흐름에서 자주 읽혀.
- [kubeflow](/ko/wiki/kubeflow/): Kubeflow는 쿠버네티스 위에서 파이프라인과 운영 자동화까지 넓게 가져가. MLflow는 그 안이나 옆에서 실험, 평가, registry, tracing을 관리하는 계층으로 보는 편이 자연스러워.
