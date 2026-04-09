---
term: deepseek-r1
title: "DeepSeek R1"
lang: ko
summary: "DeepSeek에서 제공하는 버전형 모델이다. 실제 도입에서는 입력 범위, 컨텍스트, 가격을 함께 비교해야 한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
modelProfile:
  memoryUsage: "공개 모델 기준 총 671B 파라미터, 활성 37B 규모의 MoE 계열로 알려져 있다. 자체 호스팅 시 메모리와 KV 캐시 설계 부담이 큰 편이다."
  implementation: "추론 특화 MoE 모델이다. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명한다."
  activeParameters: "공식 공개 수치는 총 671B 파라미터, 토큰당 활성 37B다."
  multimodalSupport: "현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확하다."
  access: "DeepSeek API의 reasoning 채널로 쓰거나, 공개 웨이트를 받아 자체 호스팅하는 두 경로가 있다."
  pricing: "API 채널 가격은 시점별로 바뀔 수 있다. 자체 호스팅 관점에서는 토큰 단가보다 GPU 시간과 메모리 비용이 더 중요하다."
  weightsOpen: "오픈 웨이트 공개 계열이다. 허깅페이스와 GitHub 배포 경로를 함께 확인하는 편이 안전하다."
  vendor: "DeepSeek"
aliases:
  - "DeepSeek R1"
relatedTerms:
  - llama
  - gemma
  - o3
  - qwen
firstMentioned: "2025-01-20"
mentionCount: 1
draft: false
tags:
  - reasoning
  - open-model
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://github.com/deepseek-ai/DeepSeek-R1"
      title: "deepseek-ai/DeepSeek-R1"
    - url: "https://api-docs.deepseek.com/news/news250120"
      title: "DeepSeek-R1 Release | DeepSeek API Docs"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 맞는지 먼저 대조했다."
      items:
        - "모델명 대조: DeepSeek R1"
        - "벤더 대조: DeepSeek"
        - "배포 유형 대조: version 모델 / 공개 계열"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 위치와 접근 경로를 교차검증했다."
      items:
        - "공식 소스 1: DeepSeek R1 릴리스 공지"
        - "공식 소스 2: 공개 저장소 / 모델 카드"
        - "비교 확인: 공개 배포와 reasoning 포지션 설명이 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 별도로 묶어서 다시 확인했다."
      items:
        - "총 파라미터: 671B"
        - "활성 파라미터: 37B"
        - "포지션: reasoning 특화 공개 모델"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트를 따로 비판적으로 검토했다."
      items:
        - "API 가격보다 자체 호스팅 GPU 비용이 실제 운영비를 더 크게 좌우할 수 있다."
      findings:
        - "API 가격보다 자체 호스팅 GPU 비용이 실제 운영비를 더 크게 좌우할 수 있다."
---
## 한 줄 정의
DeepSeek에서 제공하는 버전형 모델이야. 추론 특화 MoE 모델이다. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명한다. 현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확하다. 한 줄로 말하면 "이 모델이 실제로 어떤 입력을 받아 어떤 결과를 내는지"를 가장 직접적으로 보여 주는 페이지라고 보면 된다.
## 이 모델로 무엇을 할 수 있나
추론 특화 MoE 모델이다. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명한다. 현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확하다. 실무에서는 이 문장만 읽어도 이 모델이 챗봇형인지, 코딩형인지, 멀티모달 앱에 맞는지 감이 잡힌다.
## 스펙을 읽는 법
- **입력/출력 범위**: 현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확하다. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: 공개 모델 기준 총 671B 파라미터, 활성 37B 규모의 MoE 계열로 알려져 있다. 자체 호스팅 시 메모리와 KV 캐시 설계 부담이 큰 편이다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 공식 공개 수치는 총 671B 파라미터, 토큰당 활성 37B다. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: DeepSeek API의 reasoning 채널로 쓰거나, 공개 웨이트를 받아 자체 호스팅하는 두 경로가 있다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: API 채널 가격은 시점별로 바뀔 수 있다. 자체 호스팅 관점에서는 토큰 단가보다 GPU 시간과 메모리 비용이 더 중요하다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: 오픈 웨이트 공개 계열이다. 허깅페이스와 GitHub 배포 경로를 함께 확인하는 편이 안전하다. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 버전 페이지가 중요한 이유는 실제 도입 판단이 바로 이 단계에서 이뤄지기 때문이야. 같은 회사 모델끼리도 입력 범위, 컨텍스트, 가격, 배포 채널이 다르면 완전히 다른 제품에 맞는다. 그래서 벤치마크 숫자보다 "내 앱에 바로 붙는지"를 읽는 기준으로 봐야 한다.
## 같이 보면 좋은 모델
- [Llama](/ko/wiki/llama/) — 비교 대상으로 자주 같이 묶이는 모델
- [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델
- [o3](/ko/wiki/o3/) — 비교 대상으로 자주 같이 묶이는 모델
- [Qwen](/ko/wiki/qwen/) — 비교 대상으로 자주 같이 묶이는 모델