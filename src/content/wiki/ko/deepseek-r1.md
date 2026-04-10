---
term: deepseek-r1
title: "DeepSeek R1"
lang: ko
summary: "DeepSeek R1는 DeepSeek가 실제 배포용으로 내놓은 개별 모델 버전이야. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 해."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽는 데 도움이 돼."
category: model
modelType: version
modelProfile:
  memoryUsage: "공개 모델 기준 총 671B 파라미터, 활성 37B 규모의 MoE 계열로 알려져 있어. 자체 호스팅 시 메모리와 KV 캐시 설계 부담이 큰 편이야."
  implementation: "추론 특화 MoE 모델이야. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명해."
  activeParameters: "공식 공개 수치는 총 671B 파라미터, 토큰당 활성 37B다."
  multimodalSupport: "현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확해."
  access: "DeepSeek API의 reasoning 채널로 쓰거나, 공개 웨이트를 받아 자체 호스팅하는 두 경로가 있어."
  pricing: "API 채널 가격은 시점별로 바뀔 수 있어. 자체 호스팅 관점에서는 토큰 단가보다 GPU 시간과 메모리 비용이 더 중요해."
  weightsOpen: "오픈 웨이트 공개 계열이야. 허깅페이스와 GitHub 배포 경로를 함께 확인하는 편이 안전하다."
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
  date: "2026-04-10"
  sources:
    - url: "https://github.com/deepseek-ai/DeepSeek-R1"
      title: "deepseek-ai/DeepSeek-R1"
    - url: "https://api-docs.deepseek.com/news/news250120"
      title: "DeepSeek-R1 Release | DeepSeek API Docs"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 DeepSeek R1를 어려운 추론 작업에 붙일지, 비용이 더 낮은 범용 모델로 내려도 되는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 DeepSeek R1를 어려운 추론 작업에 붙일지, 비용이 더 낮은 범용 모델로 내려도 되는지."
        - "모델 이름부터 다시 보면 DeepSeek R1."
        - "만든 쪽을 다시 보면 DeepSeek."
        - "배포 유형 대조: version 모델 / 공개 계열."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 추론 성능, 응답 속도, 운영비 중 어디에 무게를 둘지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 추론 성능, 응답 속도, 운영비 중 어디에 무게를 둘지."
        - "공식 소스 1: DeepSeek R1 릴리스 공지."
        - "공식 소스 2: 공개 저장소 / 모델 카드."
        - "비교 확인: 공개 배포와 reasoning 포지션 설명이 일치."
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 추론 성능, 응답 속도, 운영비 중 어디에 무게를 둘지를 가를 때 필요한 항목만 따로 빼서 검증해뒀어."
      items:
        - "총 파라미터: 671B."
        - "활성 파라미터: 37B."
        - "포지션: reasoning 특화 공개 모델."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 DeepSeek R1를 어려운 추론 작업에 붙일지, 비용이 더 낮은 범용 모델로 내려도 되는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 추론 성능, 응답 속도, 운영비 중 어디에 무게를 둘지."
        - "API 가격보다 자체 호스팅 GPU 비용이 실제 운영비를 더 크게 좌우할 수 있어."
      findings:
        - "API 가격보다 자체 호스팅 GPU 비용이 실제 운영비를 더 크게 좌우할 수 있어."
---
## 한 줄 정의
DeepSeek R1는 DeepSeek가 실제 제품에 붙일 모델 선택 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. 현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확해. 추론 특화 MoE 모델이야. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명해.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. 추론 특화 MoE 모델이야. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명해. DeepSeek API의 reasoning 채널로 쓰거나, 공개 웨이트를 받아 자체 호스팅하는 두 경로가 있어. 그래서 실제 제품에 붙일 모델 선택처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 돼.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 DeepSeek 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞아.
## 같이 보면 좋은 모델
- [Llama](/ko/wiki/llama/) — 비교 대상으로 자주 같이 묶이는 모델 - [Gemma](/ko/wiki/gemma/) — 비교 대상으로 자주 같이 묶이는 모델 - [o3](/ko/wiki/o3/) — 비교 대상으로 자주 같이 묶이는 모델 - [Qwen](/ko/wiki/qwen/) — 비교 대상으로 자주 같이 묶이는 모델