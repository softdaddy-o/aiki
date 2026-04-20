---
term: deepseek-r1
title: DeepSeek R1(딥시크 R1)
lang: ko
summary: >-
  DeepSeek R1은 DeepSeek가 만든 추론 중심 모델이고, API에서는 `deepseek-reasoner`로 쓰며 MIT 라이선스
  오픈 웨이트와 증류형 공개까지 같이 보는 게 중요해. 기사에서는 점수표보다 오픈 배포와 API 판매를 함께 미는 전략 카드로 읽는 편이 더
  정확해.
readerValue: '기사에서 DeepSeek R1이 나오면 단순 성능 경쟁용 모델인지, 아니면 오픈 배포와 API 판매를 묶은 전략 카드인지 구분하게 해줘.'
category: model
modelType: version
modelProfile:
  memoryUsage: >-
    공개 모델 기준 총 671B 파라미터, 활성 37B 규모의 MoE 계열로 알려져 있어. 자체 호스팅 시 메모리와 KV 캐시 설계 부담이
    큰 편이야.
  implementation: >-
    추론 특화 MoE 모델이야. DeepSeek는 R1이 강화학습 기반 추론 성능을 전면에 내세운 공개 계열이라고 설명한다. 이렇게 보면
    돼.
  activeParameters: '공식 공개 수치는 총 671B 파라미터, 토큰당 활성 37B다. 이렇게 보면 돼.'
  multimodalSupport: 현재 공개 버전은 텍스트 중심 reasoning 모델로 보는 편이 정확해.
  access: 'DeepSeek API의 reasoning 채널로 쓰거나, 공개 웨이트를 받아 자체 호스팅하는 두 경로가 있어.'
  pricing: API 채널 가격은 시점별로 바뀔 수 있어. 자체 호스팅 관점에서는 토큰 단가보다 GPU 시간과 메모리 비용이 더 중요해.
  weightsOpen: 오픈 웨이트 공개 계열이야. 허깅페이스와 GitHub 배포 경로를 함께 확인하는 편이 안전하다. 이렇게 보면 돼.
  vendor: DeepSeek
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - DeepSeek R1(딥시크 R1)
relatedTerms:
  - llama
  - gemma
  - o3
  - qwen
firstMentioned: '2025-01-20'
mentionCount: 1
draft: false
tags:
  - reasoning
  - open-model
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://github.com/deepseek-ai/DeepSeek-R1'
      title: deepseek-ai/DeepSeek-R1
    - url: 'https://api-docs.deepseek.com/news/news250120'
      title: DeepSeek-R1 Release | DeepSeek API Docs
  checks:
    - type: source_match
      result: pass
      summary: 공식 저장소와 API 공지가 말하는 추론 모델과 배포 전략이라는 축에 맞췄어.
      items:
        - '독자 문제 대조: DeepSeek R1을 단순 챗봇 이름이 아니라 추론 모델과 배포 전략의 묶음으로 설명했어.'
        - >-
          공식 저장소는 R1을 reasoning model로 소개하고, API 공지는 MIT 라이선스와
          `deepseek-reasoner` 호출 방식을 함께 전면에 둬.
        - >-
          본문에서 RL 기반 후학습, 오픈 웨이트, 증류 모델, API 경로를 따로 푼 내용은 두 공식 소스가 직접 말하는 범위 안에
          있어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 저장소 설명과 API 공지가 겹치는 주장만 남겼는지 다시 확인했어.
      items:
        - '비교 기준: GitHub 저장소의 기술 설명과 API 릴리스 공지의 제품 설명이 동시에 확인되는 주장만 핵심으로 채택했어.'
        - '두 소스 모두 DeepSeek R1을 수학, 코드, reasoning 성능을 앞세운 모델로 설명해.'
        - >-
          저장소는 오픈 웨이트와 증류 체크포인트를, API 공지는 `deepseek-reasoner` 사용 경로를 강조하므로 모델과
          서비스와 생태계를 함께 읽는 해석이 성립해.
    - type: number_verify
      result: pass
      summary: 날짜와 규모처럼 본문에 들어간 숫자는 한 번 더 점검했어.
      items:
        - 공개 시점은 2025년 1월 20일로 맞췄어.
        - >-
          공식 저장소 기준 본체 규모는 총 671B, 활성 37B, 컨텍스트 길이 128K이고, 증류형은 6개로 소개돼 있다는 점을
          확인했어.
    - type: adversarial
      result: pass
      summary: 오픈 모델이라는 말 때문에 생기는 과한 기대를 따로 막았어.
      items:
        - 'R1 본체, R1-Distill 계열, API 별칭 `deepseek-reasoner`를 같은 것으로 뭉개지 않도록 구분했어.'
        - 오픈 모델이라는 말이 곧바로 가벼운 로컬 운영을 뜻하는 것처럼 읽히지 않게 본체 규모와 증류형의 현실적 차이를 분리했어.
      findings:
        - 'R1은 하나의 이름 아래에 본체, 증류형, API 경로가 겹쳐 있어서 문맥을 안 보면 쉽게 오해돼.'
        - 오픈 웨이트라는 말만 보고 바로 개인 장비에서 본체를 돌릴 수 있다고 생각하면 판단이 크게 어긋날 수 있어.
---
## 한 줄 정의
DeepSeek R1은 DeepSeek가 공개한 [추론](/ko/wiki/inference/) 중심 모델이야. 그냥 성능 좋은 챗봇 이름이 아니라, API에서는 `deepseek-reasoner`로 쓰고 모델 가중치는 MIT 라이선스로 공개하며 작은 증류형까지 같이 푸는 제품 축이라고 보면 돼.
## 이 모델로 무엇을 할 수 있나
실제로는 수학 풀이, 코드 문제, 긴 계획 수립처럼 답을 바로 찍기보다 여러 단계를 거쳐야 하는 작업에 잘 맞아. 특히 [reasoning](/ko/wiki/reasoning/) 성격이 강한 질의응답, 분석형 코딩, 도구 호출 전에 계획을 세우는 보조 모델 같은 자리에서 많이 거론돼.
배포 방식도 하나가 아니야. 큰 본체를 API로 붙일 수도 있고, [Qwen](/ko/wiki/qwen/)이나 [Llama](/ko/wiki/llama/) 기반으로 만든 1.5B부터 70B까지의 증류형을 골라 더 작은 서버나 [로컬](/ko/wiki/local-llm/) 환경에서 현실적으로 써볼 수도 있어.
## 왜 중요한가
R1이 중요한 이유는 최상위 [추론](/ko/wiki/inference/) 성능만이 아니라 도입 경로를 여러 갈래로 열어 놨기 때문이야. API 접속, 오픈 [웨이트](/ko/wiki/weight/), 상업 사용 가능 라이선스, 증류형 공개가 한 묶음으로 나오니까, 상용 API만 보던 팀도 직접 호스팅과 비용 계산을 같이 검토하게 돼.
기사 해석도 여기서 갈려. 같은 추론형 모델 기사라도 o3 같은 상용 API 제품과의 성능 비교로만 읽으면 절반만 본 셈이야. R1은 공개 가중치와 증류 생태계를 함께 밀기 때문에, 누가 직접 호스팅할 수 있는지와 어떤 크기부터 현실적인지까지 같이 봐야 의미가 잡혀.
## 같이 보면 좋은 모델
- [Llama](/ko/wiki/llama/)는 범용 오픈 [웨이트](/ko/wiki/weight/) 계열을 대표해서, R1과 비교하면 기본 모델 패밀리와 [추론](/ko/wiki/inference/) 튜닝 결과물을 구분하는 데 도움이 돼. R1이 [Llama](/ko/wiki/llama/) 기반 증류형을 따로 공개한 점도 이 차이를 잘 보여줘.
- [Gemma](/ko/wiki/gemma/)는 비교적 가벼운 오픈 모델 선택지로 많이 거론돼. R1과 붙여 보면 절대 성능보다 운영 크기, 튜닝 목적, 배포 난도가 어디서 갈리는지 더 잘 보여.
- [o3](/ko/wiki/o3/)도 어려운 문제 해결에 쓰는 추론형 모델이라는 점에서는 직접 비교 대상이야. 다만 o3는 API 제품 성격이 더 전면에 나오고, R1은 공개 가중치와 증류 생태계가 같이 따라온다는 차이가 있어.
- [Qwen](/ko/wiki/qwen/)은 자체 모델군이면서 동시에 R1 증류형의 기반 모델이기도 해. 그래서 둘을 비교할 때는 DeepSeek가 만든 [reasoning](/ko/wiki/reasoning/) 데이터와 튜닝 방식이 [Qwen](/ko/wiki/qwen/) 본체 위에 어떤 차이를 얹었는지 보는 편이 정확해.
