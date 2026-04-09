---
term: mixtral
title: "Mixtral"
lang: ko
summary: "Mistral AI에서 제공하는 버전형 모델이다. 실제 도입에서는 입력 범위, 컨텍스트, 가격을 함께 비교해야 한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
parentModel: mistral
modelProfile:
  memoryUsage: "Mixtral 8x7B v0.1 기준 32K 컨텍스트를 지원한다. 총 파라미터 수는 46.7B지만 토큰당 활성 파라미터가 더 적어 dense 40B대 모델과는 메모리 감각이 다르다."
  implementation: "Mistral AI의 sparse mixture-of-experts 모델이다. 8개 expert 중 일부만 활성화하는 구조라 MoE 이해가 핵심이다."
  activeParameters: "공식 발표 기준 총 46.7B 파라미터, 토큰당 활성 12.9B다."
  multimodalSupport: "텍스트 중심 모델이다. 이미지·오디오 입력을 기대하는 계열은 아니다."
  access: "오픈 웨이트 모델이라 허깅페이스에서 바로 받아 로컬이나 자체 인프라에 올릴 수 있다."
  pricing: "직접 호스팅이면 GPU 비용이 핵심이다. API 재판매 채널을 쓸 때만 별도 토큰 단가를 비교하면 된다."
  weightsOpen: "오픈 웨이트 공개"
  vendor: "Mistral AI"
aliases:
  - "Mixtral"
relatedTerms:
  - mistral
mentionCount: 0
draft: false
tags:
  - mistral
  - moe
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://mistral.ai/news/mixtral-of-experts"
      title: "Mixtral of experts | Mistral AI"
    - url: "https://huggingface.co/mistralai/Mixtral-8x7B-v0.1"
      title: "mistralai/Mixtral-8x7B-v0.1 · Hugging Face"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 맞는지 먼저 대조했다."
      items:
        - "모델명 대조: Mixtral 8x7B 계열"
        - "벤더 대조: Mistral AI"
        - "배포 유형 대조: version 모델 / 오픈 웨이트"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 위치와 접근 경로를 교차검증했다."
      items:
        - "공식 소스 1: Mixtral of Experts 발표"
        - "공식 소스 2: Hugging Face 모델 카드"
        - "비교 확인: MoE 구조와 공개 웨이트 배포가 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 별도로 묶어서 다시 확인했다."
      items:
        - "총 파라미터: 46.7B"
        - "활성 파라미터: 12.9B"
        - "컨텍스트: 32K"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트를 따로 비판적으로 검토했다."
      items:
        - "dense 모델과 단순 파라미터 수 비교만 하면 실제 추론 비용 감각이 틀어질 수 있다."
      findings:
        - "dense 모델과 단순 파라미터 수 비교만 하면 실제 추론 비용 감각이 틀어질 수 있다."
---
## 한 줄 정의
Mistral AI에서 제공하는 버전형 모델이야. Mistral AI의 sparse mixture-of-experts 모델이다. 8개 expert 중 일부만 활성화하는 구조라 MoE 이해가 핵심이다. 텍스트 중심 모델이다. 이미지·오디오 입력을 기대하는 계열은 아니다. 한 줄로 말하면 "이 모델이 실제로 어떤 입력을 받아 어떤 결과를 내는지"를 가장 직접적으로 보여 주는 페이지라고 보면 된다.
## 이 모델로 무엇을 할 수 있나
Mistral AI의 sparse mixture-of-experts 모델이다. 8개 expert 중 일부만 활성화하는 구조라 MoE 이해가 핵심이다. 텍스트 중심 모델이다. 이미지·오디오 입력을 기대하는 계열은 아니다. 실무에서는 이 문장만 읽어도 이 모델이 챗봇형인지, 코딩형인지, 멀티모달 앱에 맞는지 감이 잡힌다.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트 중심 모델이다. 이미지·오디오 입력을 기대하는 계열은 아니다. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: Mixtral 8x7B v0.1 기준 32K 컨텍스트를 지원한다. 총 파라미터 수는 46.7B지만 토큰당 활성 파라미터가 더 적어 dense 40B대 모델과는 메모리 감각이 다르다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 공식 발표 기준 총 46.7B 파라미터, 토큰당 활성 12.9B다. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: 오픈 웨이트 모델이라 허깅페이스에서 바로 받아 로컬이나 자체 인프라에 올릴 수 있다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: 직접 호스팅이면 GPU 비용이 핵심이다. API 재판매 채널을 쓸 때만 별도 토큰 단가를 비교하면 된다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: 오픈 웨이트 공개. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 버전 페이지가 중요한 이유는 실제 도입 판단이 바로 이 단계에서 이뤄지기 때문이야. 같은 회사 모델끼리도 입력 범위, 컨텍스트, 가격, 배포 채널이 다르면 완전히 다른 제품에 맞는다. 그래서 벤치마크 숫자보다 "내 앱에 바로 붙는지"를 읽는 기준으로 봐야 한다.
## 같이 보면 좋은 모델
- [Mistral](/ko/wiki/mistral/) — 비교 대상으로 자주 같이 묶이는 모델