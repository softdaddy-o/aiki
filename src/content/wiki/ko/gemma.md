---
term: gemma
title: "Gemma (젬마)"
lang: ko
summary: "Gemma는 Google DeepMind가 내놓는 공개형 모델 계열이야. Gemini와 기술 뿌리를 공유하지만 개발자가 직접 내려받아 기기나 서버에 올려 쓰는 쪽에서 더 자주 거론돼."
readerValue: "Gemma가 보이면 Google이 서비스형 AI만 미는 게 아니라 공개형 모델과 온디바이스 흐름도 같이 챙긴다는 뜻으로 읽으면 쉬워."
category: model
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "google gemma"
relatedTerms:
  - gemma-3
  - gemini
  - deepseek-r1
  - llama
firstMentioned: "2026-03-19"
mentionCount: 12
draft: false
tags:
  - open-model
  - google
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Gemma_(language_model)"
      title: "Gemma (language model)"
    - url: "https://ai.google.dev/gemma"
      title: "Gemma — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      sources: 1
      summary: "Gemma를 Google DeepMind의 공개형 계열로 설명했는지 원문 요약과 맞춰봤어."
      items:
        - "독자 문제 대조: 독자가 Gemma를 Gemini의 별명으로 오해하지 않게 모델 계열 개념부터 맨 앞에 놨어."
        - "소스 대조: Wikipedia 요약의 source-available 계열 설명과 Gemini 기반 기술 관계를 반영했어."
      findings:
        - "버전 나열은 줄이고 공개형 계열이라는 핵심만 살렸어."
        - "Google DeepMind 벤더 표기를 본문 초반에 분명히 넣었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 페이지의 기기 타깃과 공개형 메시지를 중심으로 다시 맞춰봤어."
      items:
        - "비교 기준: Google DeepMind 공식 Gemma 페이지에서 공개형 모델, 서버부터 노트북과 휴대폰까지의 기기 범위를 확인했어."
        - "교차 확인: 운영 환경 설명만 남기고 과한 홍보 문구는 덜어냈어."
      findings:
        - "온디바이스와 공개형 생태계라는 두 축은 공식 페이지와 입력 소스가 같이 가리켰어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "버전 출시 월처럼 빨리 낡는 숫자는 줄이고 기기 범위 같은 안정적인 사실만 남겼어."
      items:
        - "정량 점검: Gemma 2, 3, 4의 출시 시점은 소스에 있지만 핵심 설명에는 굳이 넣지 않았어."
        - "오류 방지: 모바일·개인용 컴퓨터 지향처럼 공식 페이지에 직접 보이는 운영 범위만 본문에 반영했어."
      findings:
        - "시간이 지나도 덜 낡는 설명 위주로 정리했어."
    - type: adversarial
      result: pass
      summary: "Gemma를 Gemini와 같은 제품명으로 섞어 읽을 위험은 막았어."
      items:
        - "오해 점검: Gemma는 모델 계열이고 Gemini는 서비스·제품 문맥이 더 강하다는 구분을 유지했어."
        - "표현 점검: 완전 오픈소스 단정 대신 공개형 모델 계열이라는 표현으로 수위를 맞췄어."
      findings:
        - "브랜드 혼동을 줄이도록 비교 대상을 의도적으로 분리했어."
---
## 한 줄 정의
Gemma는 Google DeepMind가 공개형으로 내놓는 대형 언어 모델 계열이야. Gemini와 완전히 다른 회사 제품이라기보다, Google이 개발자에게 직접 배포하는 모델 라인이라고 보면 돼.
## 이 모델로 무엇을 할 수 있나
실무에서는 요약, 분류, 질의응답, 코드 보조, 간단한 에이전트 흐름 같은 범용 작업에 쓸 수 있어. Google DeepMind가 클라우드 서버뿐 아니라 노트북과 휴대폰 같은 기기까지 염두에 둔 공개형 모델로 소개하고 있어서, 서비스 API만 쓰는 경우와는 다른 배포 선택지를 같이 떠올리면 돼.
## 왜 중요한가
Gemma가 중요하게 읽히는 이유는 Google이 Gemini 같은 서비스형 모델만 밀고 있는 게 아니라 공개형 생태계도 계속 키우고 있다는 신호라서 그래. 특히 기기 효율성과 온디바이스 활용을 같이 강조해서, 기사에서 나오면 성능표보다 어느 환경에 올려 쓸 모델인지 먼저 보는 편이 도움이 돼.
## 같이 보면 좋은 모델
- `gemma-3`는 Gemma 계열 안에서 세대 차이를 읽을 때 바로 이어지는 이름이야. 같은 브랜드 안에서도 목표 성능과 배포 포지션이 어떻게 바뀌는지 보게 해.
- `gemini`는 같은 Google 계열이지만 서비스 경험 쪽에 더 가까운 이름이야. Gemma와 같이 보면 모델 자체와 완성형 제품을 헷갈리지 않게 도와.
- `deepseek-r1`는 추론 중심 공개형 모델 비교에서 자주 붙는 이름이야. Gemma와 놓고 보면 공개형 모델이라도 어디에 무게를 두는지 차이가 보여.
- `llama`는 Meta 쪽 공개형 모델 계열이야. Gemma와 나란히 보면 회사별 공개형 전략과 배포 메시지를 비교하기 좋아.