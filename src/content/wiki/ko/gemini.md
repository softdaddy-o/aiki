---
term: gemini
title: "Gemini"
lang: ko
summary: "Gemini는 Google DeepMind가 멀티모달 생성과 이해를 같이 다루는 라인업에 붙이는 대표 이름이다. 기사에서 보이면 개별 버전보다 라인업 방향을 먼저 읽는 편이 맞다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: family
modelProfile:
  memoryUsage: "서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다."
  implementation: "Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요하다."
  activeParameters: "공개 자료 기준 활성 파라미터 수 확인 필요"
  multimodalSupport: "멀티모달 지원으로 보면 된다. 다만 입력 전용인지 출력까지 되는지는 API 문서를 함께 봐야 한다."
  access: "무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다."
  pricing: "유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다."
  weightsOpen: "비공개 또는 서비스/API 제공 중심"
  vendor: "Google DeepMind"
aliases:
  - "google gemini"
relatedTerms:
  - gemini-2.5
  - gpt-4o
  - gemma
  - imagen
firstMentioned: "2026-02-18"
mentionCount: 21
draft: false
tags:
  - google
  - multimodal
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Gemini_(language_model)"
      title: "Gemini (language model)"
    - url: "https://deepmind.google/technologies/gemini/"
      title: "Gemini 3 — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명과 라인업 성격이 같은 축인지 먼저 맞춰봤다."
      items:
        - "모델명 대조: Gemini"
        - "벤더 대조: Google DeepMind"
        - "상위 계열: 최상위 라인업"
        - "페이지 성격: 개별 스냅샷이 아니라 상위 계열 안내 페이지"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 라인업 설명이 같은지 다시 봤다."
      items:
        - "비교 소스 1: Gemini (language model)"
        - "비교 소스 2: Gemini 3 — Google DeepMind"
    - type: adversarial
      result: pass
      summary: "이 페이지가 버전 비교표가 아니라 계열 안내 페이지라는 점은 따로 의심해보고 확인했다."
      items:
        - "개별 가격과 컨텍스트는 하위 버전 페이지에서 확인해야 한다."
      findings:
        - "계열 페이지의 일반 설명을 특정 버전 스펙처럼 읽지 않도록 분리했다."
---
## 한 줄 정의
Gemini는 Google DeepMind가 멀티모달 생성과 이해를 같이 다루는 라인업 쪽에 붙이는 대표 이름이야. 기사에서 이 이름이 보이면 모델 하나가 갑자기 바뀌었다기보다, 제품군 전체 방향이나 배포 확대를 말하는 경우가 많다. 그래서 이 페이지는 성능표보다 "지금 무슨 축으로 밀고 있나"를 읽는 용도로 보는 편이 맞다.
## 이 모델로 무엇을 할 수 있나
Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요하다. 멀티모달 지원으로 보면 된다. 다만 입력 전용인지 출력까지 되는지는 API 문서를 함께 봐야 한다. 다만 계열 이름만으로는 가격이나 제한을 못 박을 수 없어서, 실제 도입 판단은 하위 버전 페이지에서 끝내야 해. 여기서는 "이 라인업이 어떤 입력과 결과를 밀고 있나"를 먼저 잡아두면 충분하다.
## 스펙을 읽는 법
- **계열 이름인지 개별 버전인지**: 이 이름은 상위 라인업을 가리킨다. 실제 비교표는 하위 버전 페이지에서 읽는 편이 정확하다.
- **입력/출력 범위**: 멀티모달 지원으로 보면 된다. 다만 입력 전용인지 출력까지 되는지는 API 문서를 함께 봐야 한다. 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈린다.
- **컨텍스트/메모리 감각**: 서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 본다.
- **모델 구조와 규모**: 공개 자료 기준 활성 파라미터 수 확인 필요. 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있다.
- **접근 경로**: 무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단한다.
- **가격과 운영비**: 유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 된다.
- **웨이트 공개 여부**: 비공개 또는 서비스/API 제공 중심. 자체 호스팅 가능 여부를 여기서 먼저 걸러낸다.
## 왜 중요한가
중요한 건 뉴스가 항상 세부 버전까지 친절하게 적어주지 않는다는 점이야. Gemini 같은 계열명을 먼저 알아두면 "새 데모 하나가 나왔다"가 아니라 Google DeepMind가 어느 경험을 키우고 있는지 바로 읽힌다. 그리고 나서 실제 구매나 연동 판단이 필요할 때만 하위 버전 페이지로 내려가면 된다.
## 같이 보면 좋은 모델
- [Gemini 2.5](/ko/wiki/gemini-2.5/) — 비교 대상으로 자주 같이 묶이는 모델
- [GPT-4o](/ko/wiki/gpt-4o/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델
- [Imagen](/ko/wiki/imagen/) — 비교 대상으로 자주 같이 묶이는 모델