---
term: deepseek-r1
title: "DeepSeek R1 (딥시크 R1)"
lang: ko
summary: "DeepSeek R1은 DeepSeek가 2025년 1월 20일 공개한 추론 중심 모델이야. 기사에서는 점수표보다 오픈 웨이트, API, 증류형 공개를 함께 미는 제품 전략을 먼저 읽는 편이 정확해."
readerValue: "기사에서 DeepSeek R1이 나올 때, 이 이름이 단순 성능 경쟁용 모델인지 아니면 오픈 배포와 API 판매를 묶은 전략 카드인지 구분하는 데 쓸 수 있어."
category: model
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "DeepSeek R1 (딥시크 R1)"
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
  date: "2026-04-13"
  sources:
    - url: "https://github.com/deepseek-ai/DeepSeek-R1"
      title: "deepseek-ai/DeepSeek-R1"
    - url: "https://api-docs.deepseek.com/news/news250120"
      title: "DeepSeek-R1 Release | DeepSeek API Docs"
  checks:
    - type: source_match
      result: pass
      summary: "정의와 본문이 공식 소개의 범위를 벗어나지 않게 맞춰봤어."
      items:
        - "독자 문제 대조: DeepSeek R1을 단순 챗봇 이름이 아니라 추론 모델과 배포 전략의 묶음으로 설명해서, 기사에서 사용처와 제품 전략을 먼저 읽고 싶은 독자 초점에 맞췄다."
        - "공식 저장소는 R1을 first-generation reasoning model로 소개하고, API 공지는 MIT 라이선스와 `deepseek-reasoner` 호출 방식을 함께 전면에 둔다."
        - "본문에서 RL 기반 후학습, 오픈 웨이트, 증류 모델, API 경로를 따로 풀어 쓴 내용은 제공된 두 공식 소스가 직접 말하는 범위 안에 있다."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "저장소 설명과 API 공지가 겹치는 주장만 남겼는지 다시 봤어."
      items:
        - "비교 기준: GitHub 저장소의 기술 설명과 API 릴리스 공지의 제품 설명이 동시에 확인되는 주장만 본문 핵심으로 채택했다."
        - "두 소스 모두 DeepSeek R1을 수학, 코드, reasoning 성능을 앞세운 모델로 설명한다."
        - "저장소는 오픈소스 모델과 6개 증류 체크포인트를, API 공지는 MIT 라이선스와 `deepseek-reasoner` 사용법을 강조하므로, 문서에서 모델과 서비스와 생태계를 함께 읽는 해석이 성립한다."
    - type: number_verify
      result: pass
      summary: "날짜와 규모, 모델 수처럼 본문에 넣은 숫자는 한 번 더 봤어."
      items:
        - "공식 저장소 기준 DeepSeek-R1 본체는 총 671B 파라미터, 활성 37B, 컨텍스트 길이 128K로 적혀 있다."
        - "공식 저장소와 API 공지는 증류형을 6개로 소개한다."
        - "공개 시점은 2025-01-20이며, API 공지는 `deepseek-reasoner` 모델명과 당시 토큰 단가를 별도로 적고 있다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 오해를 미리 막는 문장들만 남겼는지 다시 봤어."
      items:
        - "DeepSeek R1을 DeepSeek의 모든 모델을 가리키는 상위 브랜드처럼 쓰지 않았다."
        - "오픈 모델이라는 말이 곧바로 가벼운 로컬 운영을 뜻하는 것처럼 읽히지 않게 본체 규모와 증류형 차이를 분리했다."
        - "R1 본체, R1-Distill 계열, API 별칭 `deepseek-reasoner`를 같은 것으로 뭉개지 않도록 주의 문장을 넣었다."
      findings:
        - "'오픈소스니까 누구나 본체를 쉽게 돌릴 수 있다'는 오해를 막도록 서술을 조정했다."
        - "'R1'과 'R1-Distill'을 같은 배포 단위처럼 읽지 않게 구분을 분명히 했다."
---
## 한 줄 정의
DeepSeek R1은 DeepSeek가 2025년 1월 20일 공개한 추론 중심 모델이야. 그냥 성능 좋은 챗봇 이름이 아니라, API에서는 `deepseek-reasoner`로 쓰고 모델 가중치는 MIT 라이선스로 공개하며 작은 증류형까지 같이 푸는 제품 축이라고 보면 된다. 그래서 기사에서 이 이름이 나오면 새 모델 한 개보다, DeepSeek가 추론 전용 라인을 어떻게 배포하고 확장하는지 같이 읽어야 한다.
## 어떻게 작동하나
R1의 출발점은 DeepSeek-V3-Base이고, 후학습 단계에서 강화학습을 크게 써서 긴 사고 과정을 스스로 만들어내게 한 게 핵심이야. 저장소 설명에 따르면 R1-Zero는 지도 미세조정 없이 RL만으로 추론 능력을 끌어올렸지만 반복, 가독성, 언어 혼합 문제가 있었고, R1은 cold-start 데이터와 추가 정렬 단계를 넣어 그 약점을 줄였다.
실제로는 수학 풀이, 코드 문제, 장문 계획처럼 답을 바로 찍기보다 여러 단계를 거쳐야 하는 작업에 잘 맞는다. 배포 방식도 하나가 아니어서, 큰 본체를 API로 붙일 수도 있고, Qwen이나 Llama 기반으로 만든 1.5B부터 70B까지의 증류형을 골라 더 작은 운영 환경에 맞출 수도 있어.
## 왜 중요한가
실무에서는 벤치마크 한 줄보다 운영 경로가 더 중요해. R1은 최상위 추론 성능만 내세우는 게 아니라, API 접속, 오픈 웨이트, 상업 사용 가능 라이선스, 증류형 공개를 한 묶음으로 내세워서 도입 선택지를 넓힌다.
기사 해석도 여기서 갈린다. 같은 추론형 모델 기사라도 o3 같은 상용 API 제품과의 성능 비교 기사로만 읽으면 절반만 본 셈이야. R1은 공개 가중치와 증류 생태계를 함께 밀기 때문에, 누가 직접 호스팅할 수 있는지, 어떤 크기부터 현실적인지, DeepSeek가 어디서 영향력을 넓히려는지를 같이 봐야 의미가 잡힌다.
## 주의해서 볼 점
R1이라는 이름이 항상 같은 배포 대상을 뜻하는 건 아니야. 기사나 문서에서 `DeepSeek-R1` 본체, `DeepSeek-R1-Distill-*`, API 별칭 `deepseek-reasoner`를 섞어 말하면 실제 선택지가 완전히 달라진다.
또 오픈 모델이라고 해서 곧바로 로컬 운영이 쉬운 것도 아니야. 본체는 총 671B에 활성 37B인 대형 MoE라서 현실적으로는 증류형이나 API를 먼저 검토하는 경우가 많다. 공식 권장값도 범용 챗 모델과 조금 달라서 시스템 프롬프트를 덧씌우기보다 사용자 프롬프트에 지시를 넣고, 온도는 0.6 안팎으로 두는 쪽을 권한다.
## 관련 용어
- [Llama](/ko/wiki/llama/): Llama는 범용 오픈 웨이트 계열을 대표해서, R1과 비교하면 기본 모델 패밀리와 추론 튜닝 결과물을 구분하는 데 도움이 된다. R1이 Llama 8B와 70B 위에 증류형을 만든 것도 이 차이를 보여준다.
- [Gemma](/ko/wiki/gemma/): Gemma는 비교적 가벼운 오픈 모델 선택지로 읽는 경우가 많다. R1과 붙여 보면 절대 성능보다 운영 크기, 튜닝 목적, 배포 난도가 어디서 갈리는지 보게 된다.
- [o3](/ko/wiki/o3/): o3도 어려운 문제 해결에 쓰는 추론형 모델이라는 점에선 비교 대상이 된다. 다만 R1 문맥에서는 공개 가중치와 증류 생태계가 같이 따라오고, o3 문맥에서는 API 제품 성격이 더 전면에 나온다.
- [Qwen](/ko/wiki/qwen/): Qwen은 자체 모델군이면서 동시에 R1 증류형의 기반 모델이기도 하다. 그래서 둘을 비교할 때는 DeepSeek가 만든 reasoning 데이터와 튜닝 방식이 Qwen 본체 위에 어떤 차이를 얹었는지 보는 편이 정확해.