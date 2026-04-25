---
term: modal
title: "Modal(모달)"
lang: ko
summary: "Modal(모달)은 Python 코드와 의존성을 컨테이너처럼 감싸서 클라우드 CPU나 GPU에 서버리스로 올려 주는 AI 인프라 플랫폼이야. 모델을 만드는 도구라기보다 추론, 배치 작업, 학습 잡, 샌드박스 실행을 어디서 어떻게 굴릴지 정하는 운영 레이어에 가까워."
readerValue: "Modal이 보이면 새 모델 이름보다 GPU 운영과 배포 속도를 줄여 주는 플랫폼 이야기인지 먼저 읽어볼 수 있어."
category: tool
aliases:
  - "Modal(모달)"
relatedTerms:
  - quantization
  - onnx
  - runtime
  - on-device
firstMentioned: "2023-03-14"
mentionCount: 11
draft: false
tags:
  - deployment
  - serverless
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://modal.com/"
      title: "Modal: High-performance AI infrastructure"
    - url: "https://modal.com/docs/guide"
      title: "Introduction"
  checks:
    - type: source_match
      result: pass
      summary: "서버리스 AI 인프라라는 정의를 맞춰봤어."
      items:
        - "독자 문제 대조: Modal을 모델 자체가 아니라 CPU, GPU, 데이터 집약 작업을 올리는 서버리스 플랫폼으로 설명했는지 확인했어."
        - "공식 문서에 있는 AI 인프라 플랫폼이라는 표현과 실행 플랫폼이라는 맥락을 그대로 살렸어."
      findings:
        - "서버리스 AI 인프라"
        - "운영 레이어 강조"
    - type: web_cross_check
      result: pass
      summary: "공식 사이트와 가이드의 공통점만 남겼어."
      items:
        - "비교 기준: 홈과 가이드가 둘 다 Modal을 AI와 데이터 팀용 서버리스 플랫폼으로 소개하는지 맞춰봤어."
        - "한쪽에서 언급한 서브초대 콜드 스타트와 초 단위 과금은 운영 디테일로만 쓰고 과장된 성능 주장으로는 쓰지 않았어."
      findings:
        - "플랫폼 정의 일치"
        - "운영 디테일 분리"
    - type: number_verify
      result: pass
      summary: "가격표 같은 변동 숫자는 직접 못 박지 않았어."
      items:
        - "출처에 있는 과금 방식은 초 단위라는 원칙만 언급했고 구체 요금 수치는 넣지 않았어."
        - "지연시간도 서브초대 성격만 남기고 확정 성능 수치처럼 읽히지 않게 조정했어."
      findings:
        - "요금 수치 미사용"
        - "지연시간 과장 방지"
    - type: adversarial
      result: pass
      summary: "모델 이름으로 착각하는 지점을 막았어."
      items:
        - "많이 하는 오해는 Modal을 새 모델이나 모델 허브 이름처럼 보는 거야."
        - "본문에 추론과 배치 작업을 올리는 운영 플랫폼이라는 점을 앞쪽에 배치해서 오해를 줄였어."
      findings:
        - "모델 아님"
        - "배포 플랫폼 명확화"
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "235af207f957dd45"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Modal은 AI와 데이터 작업을 서버리스 방식으로 올릴 수 있게 해 주는 클라우드 실행 플랫폼이야. 개발자가 쿠버네티스나 GPU 인프라를 직접 만지기보다 코드 중심으로 실행 환경을 선언해서 쓰는 쪽에 더 가까워.
## 어떻게 작동하나
코드와 의존성을 정의하면 Modal이 그걸 실행 이미지로 감싸서 클라우드 CPU나 GPU에서 실행해 줘. 공식 소개 기준으로 서브초대 콜드 스타트와 초 단위 과금 같은 운영 특성이 있고, [함수 호출](/ko/wiki/function-calling/), 배치 작업, 장시간 실행 작업을 같은 플랫폼 안에서 다룰 수 있어.
## 왜 중요한가
AI 서비스는 모델 품질만큼이나 배포 속도와 운영 단가가 중요해. Modal 같은 플랫폼을 이해하면 팀이 얼마나 적은 인프라 작업으로 GPU 워크로드를 붙일 수 있는지, 그리고 왜 이런 도구가 제품 속도를 바꾸는지 감을 잡기 쉬워.
## 주의해서 볼 점
Modal이 편하다고 해서 비용과 운영 고민이 사라지는 건 아니야. 콜드 스타트, 장기 실행 비용, 데이터 위치, 벤더 종속성 같은 문제는 여전히 남아서 항상 직접 운영보다 싸고 유연하다고 단정하면 틀려.
## 관련 용어
- [quantization](/ko/wiki/quantization/)은 모델을 더 가볍게 만드는 기법이야. Modal은 그 모델을 어디서 돌릴지 정하는 플랫폼이라 층위가 다르다는 걸 같이 보면 좋아.
- [onnx](/ko/wiki/onnx/)는 모델 포맷과 호환성 이야기야. 배포 플랫폼과 실행 포맷을 분리해서 읽게 도와줘.
- [runtime](/ko/wiki/runtime/)은 코드나 모델이 실제로 도는 실행 계층이야. Modal은 그 런타임을 감싸는 운영 플랫폼에 더 가까워.
- [on-device](/ko/wiki/on-device/)는 반대로 기기 안에서 추론하는 전략이야. 클라우드 서버리스 중심인 Modal과 대비해서 읽기 좋아.
