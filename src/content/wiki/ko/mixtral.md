---
term: mixtral
title: "Mixtral"
lang: ko
summary: "Mixtral는 Mistral AI가 실제 배포용으로 내놓은 개별 모델 버전이야. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 해."
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
      summary: "원문에서 모델명, 벤더, 페이지 성격이 같은 축인지 먼저 맞춰봤다."
      items:
        - "모델명 대조: Mixtral 8x7B 계열"
        - "벤더 대조: Mistral AI"
        - "배포 유형 대조: version 모델 / 오픈 웨이트"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 라인업 위치와 접근 경로를 다시 봤다."
      items:
        - "공식 소스 1: Mixtral of Experts 발표"
        - "공식 소스 2: Hugging Face 모델 카드"
        - "비교 확인: MoE 구조와 공개 웨이트 배포가 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 따로 빼서 한 번 더 봤다."
      items:
        - "총 파라미터: 46.7B"
        - "활성 파라미터: 12.9B"
        - "컨텍스트: 32K"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "dense 모델과 단순 파라미터 수 비교만 하면 실제 추론 비용 감각이 틀어질 수 있어."
      findings:
        - "dense 모델과 단순 파라미터 수 비교만 하면 실제 추론 비용 감각이 틀어질 수 있어."
---
## 한 줄 정의
Mixtral는 Mistral AI가 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. 텍스트 중심 모델이야. 이미지·오디오 입력을 기대하는 계열은 아니다. Mistral AI의 sparse mixture-of-experts 모델이야. 8개 expert 중 일부만 활성화하는 구조라 MoE 이해가 관건이야.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. Mistral AI의 sparse mixture-of-experts 모델이야. 8개 expert 중 일부만 활성화하는 구조라 MoE 이해가 관건이야. 오픈 웨이트 모델이라 허깅페이스에서 바로 받아 로컬이나 자체 인프라에 올릴 수 있어. 그래서 텍스트만이 아니라 이미지 맥락까지 같이 읽는 작업처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 돼.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트 중심 모델이야. 이미지·오디오 입력을 기대하는 계열은 아니다. 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈려.
- **컨텍스트/메모리 감각**: Mixtral 8x7B v0.1 기준 32K 컨텍스트를 지원해. 총 파라미터 수는 46.7B지만 토큰당 활성 파라미터가 더 적어 dense 40B대 모델과는 메모리 감각이 다르다. 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 봐.
- **모델 구조와 규모**: 공식 발표 기준 총 46.7B 파라미터, 토큰당 활성 12.9B다. 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있어.
- **접근 경로**: 오픈 웨이트 모델이라 허깅페이스에서 바로 받아 로컬이나 자체 인프라에 올릴 수 있어. 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단해.
- **가격과 운영비**: 직접 호스팅이면 GPU 비용이 관건이야. API 재판매 채널을 쓸 때만 별도 토큰 단가를 비교하면 돼. 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 돼.
- **웨이트 공개 여부**: 오픈 웨이트 공개. 자체 호스팅 가능 여부를 여기서 먼저 걸러내.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 Mistral AI 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞아.
## 같이 보면 좋은 모델
- [Mistral](/ko/wiki/mistral/) — 비교 대상으로 자주 같이 묶이는 모델