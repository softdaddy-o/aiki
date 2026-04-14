---
term: on-device
title: "On-device AI(온디바이스)"
lang: ko
summary: "On-device AI(온디바이스)는 모델 추론을 서버가 아니라 사용자 기기 안에서 직접 돌리는 배포 방식이야. 속도, 개인정보, 오프라인 동작 같은 조건을 같이 바꾸기 때문에 기술 이름보다 제품 전략에 가까운 말로 읽는 게 좋아."
readerValue: "이 용어가 나오면 단순히 로컬에서 돈다보다 데이터가 어디서 처리되고 네트워크에 얼마나 덜 묶이는지 같이 보면 도움이 돼."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "온디바이스"
  - "on device"
  - "device ai"
relatedTerms:
  - llama.cpp
  - ollama
  - quantization
  - gguf
firstMentioned: "2026-03-02"
mentionCount: 2
draft: false
tags:
  - local-ai
  - edge-ai
  - deployment
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://developers.google.com/machine-learning/glossary#on-device_inference"
      title: "Machine Learning Glossary &nbsp;|&nbsp; Google for Developers"
    - url: "https://developer.apple.com/documentation/coreml"
      title: "Core ML | Apple Developer Documentation"
  checks:
    - type: source_match
      result: pass
      summary: "핵심 개념을 기기 내 추론으로 맞춰봤어."
      items:
        - "독자 문제 대조: On-device AI를 서버 추론이 아니라 기기 안에서 실행하는 방식으로 바로 설명했는지 확인했어."
        - "Apple의 Core ML 같은 기기 내 모델 통합 맥락에 맞게 배포 전략 중심으로 풀어 썼어."
      findings:
        - "기기 내 추론"
        - "배포 전략 중심"
    - type: web_cross_check
      result: pass
      summary: "개념이 흔들리지 않게 다시 봤어."
      items:
        - "비교 기준: 개발자 문서와 플랫폼 문맥에서 둘 다 로컬 기기에서 모델을 돌리는 방향을 가리키는지 맞춰봤어."
        - "잘못 붙은 외부 스니펫은 버리고 기기 내 실행이라는 안정적인 공통 의미만 남겼어."
      findings:
        - "핵심 의미 고정"
        - "잡음 스니펫 배제"
    - type: number_verify
      result: pass
      summary: "기기별 성능 숫자는 넣지 않게 막았어."
      items:
        - "스마트폰 세대별 속도나 메모리 요구량처럼 환경마다 달라지는 숫자는 본문에서 뺐어."
        - "대신 배터리, 발열, 저장 공간처럼 누구나 체크해야 하는 제약 조건만 남겼어."
      findings:
        - "기기별 수치 미사용"
    - type: adversarial
      result: pass
      summary: "완전 오프라인이란 오해를 막았어."
      items:
        - "많이 하는 오해는 온디바이스면 클라우드 연결이 전혀 없다고 보는 거야."
        - "본문에 업데이트와 동기화는 서버와 섞일 수 있다는 점을 적어서 혼합 구조 가능성을 남겼어."
      findings:
        - "완전 오프라인과 구분"
        - "하이브리드 가능성 명시"
---
## 한 줄 정의
On-device AI는 모델 추론이나 핵심 AI 기능을 서버가 아니라 사용자의 폰, 노트북, 태블릿 같은 기기 안에서 직접 실행하는 방식이야. 쉽게 말해 기기 자체가 AI 계산의 주 무대가 되는 배포 전략이라고 보면 돼.
## 어떻게 작동하나
앱은 모델 파일이나 최적화된 패키지를 기기에 내려받고, 런타임이 CPU, GPU, NPU 같은 로컬 하드웨어에서 추론을 돌려. 실제 제품은 업데이트나 동기화는 클라우드와 섞어 쓰는 경우가 많아서 무엇이 완전히 로컬이고 무엇이 서버 의존인지 따로 구분해서 봐야 해.
## 왜 중요한가
온디바이스 전략은 반응 속도만 빠르게 하는 게 아니라 개인정보 처리 범위, 오프라인 사용성, 서버 비용 구조까지 한꺼번에 바꿔. 그래서 뉴스에서 이 말이 보이면 유행어로 넘기지 말고 데이터 통제권과 사용자 경험이 어디로 이동하는지 읽는 게 중요해.
## 주의해서 볼 점
온디바이스라고 해도 모든 데이터가 절대 밖으로 안 나간다는 뜻은 아니야. 기기 성능, 발열, 배터리, 저장 공간 제약이 크고 큰 모델은 양자화나 경량화 없이는 실제로 올리기 어려워서 마케팅 문구와 구현 현실을 분리해서 봐야 해.
## 관련 용어
- [llama.cpp](/ko/wiki/llama.cpp/)는 로컬 기기에서 모델을 실제로 돌리는 엔진 쪽이야. 온디바이스라는 배포 개념을 구현 단계로 끌어내릴 때 같이 보면 좋아.
- [ollama](/ko/wiki/ollama/)는 로컬 모델 실행을 더 쉽게 감싸 주는 도구야. 사용자가 체감하는 온디바이스 경험이 어떤 식으로 보이는지 이해하는 데 도움이 돼.
- [quantization](/ko/wiki/quantization/)은 큰 모델을 기기 안에 넣기 위해 거의 꼭 따라오는 경량화 기법이야. 온디바이스가 가능한지 아닌지를 가르는 현실 조건이라 같이 봐야 해.
- [gguf](/ko/wiki/gguf/)는 로컬 배포에서 자주 보이는 모델 파일 형식이야. 어떤 포맷이 실제 기기 실행 경로에 맞는지 읽는 데 연결점이 돼.