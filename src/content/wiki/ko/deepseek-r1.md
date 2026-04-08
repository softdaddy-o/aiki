---
term: deepseek-r1
title: "DeepSeek R1"
lang: ko
summary: "DeepSeek R1는 DeepSeek가 제공하는 버전형 AI 모델로, 실제 도입에서는 성능보다 접근 경로와 운영 조건까지 함께 비교해야 한다."
readerValue: "DeepSeek R1가 기사에 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
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
  date: "2026-04-08"
  sources:
    - url: "https://github.com/deepseek-ai/DeepSeek-R1"
      title: "deepseek-ai/DeepSeek-R1"
    - url: "https://api-docs.deepseek.com/news/news250120"
      title: "DeepSeek-R1 Release | DeepSeek API Docs"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 먼저 감 잡기
DeepSeek R1는 DeepSeek가 제공하는 버전형 모델이다. 추론 특화 MoE 모델이다. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명한다. 현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확하다. 그래서 기사에서 이 이름이 보이면 추상적인 성능 향상 문구보다 입력 범위, 컨텍스트 한도, 접근 채널이 어떻게 달라졌는지부터 확인하는 편이 정확하다.
## 뉴스에서 왜 자주 나오나
DeepSeek R1는 AIKI 기사에서 이미 1번 이상 언급됐고, 기록도 2025-01-20까지 올라간다. 이제는 이름만 익히는 단계가 아니라 deepseek-ai/DeepSeek-R1, DeepSeek-R1 Release | DeepSeek API Docs 기준으로 DeepSeek API의 reasoning 채널로 쓰거나, 공개 웨이트를 받아 자체 호스팅하는 두 경로가 있다. API 채널 가격은 시점별로 바뀔 수 있다. 자체 호스팅 관점에서는 토큰 단가보다 GPU 시간과 메모리 비용이 더 중요하다. 이 차이를 바로 읽어야 할 시점이다.
## 읽을 때 체크포인트
1. 먼저 DeepSeek R1가 어떤 입력을 받고 무엇을 출력하는지부터 확인하면 된다. 여기서 모델 포지션이 거의 정리된다.

2. 다음으로 컨텍스트, 최대 출력, 툴 호출 지원처럼 운영 조건을 봐야 한다. 같은 성능 홍보라도 실제 제품 적합성은 여기서 갈린다.

3. 마지막으로 DeepSeek API의 reasoning 채널로 쓰거나, 공개 웨이트를 받아 자체 호스팅하는 두 경로가 있다. API 채널 가격은 시점별로 바뀔 수 있다. 자체 호스팅 관점에서는 토큰 단가보다 GPU 시간과 메모리 비용이 더 중요하다. 이 두 줄을 같이 읽으면 '당장 붙일 수 있는 모델인지'와 '비용이 감당되는지'를 빠르게 판단할 수 있다.
## 같이 봐야 할 용어
- [llama](/ko/wiki/llama/)
- [gemma](/ko/wiki/gemma/)
- [o3](/ko/wiki/o3/)
- [qwen](/ko/wiki/qwen/)