---
term: phi
title: "Phi"
lang: ko
summary: "Phi는 모델 성능, 제품 전략, 개발 흐름 맥락에서 반복해서 등장하는 AI 모델다."
readerValue: "이 용어가 뉴스에 나오면 Phi가 단순 기능 이름인지, 성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지 빠르게 구분해서 읽게 해준다."
category: model
modelProfile:
  memoryUsage: "소형 또는 온디바이스 지향으로 읽으면 되고, 실제 메모리 요구량은 양자화 방식과 컨텍스트 길이에 따라 달라진다."
  implementation: "Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요하다."
  activeParameters: "소형 모델 계열이지만 활성 파라미터 수는 공식 모델 카드 기준으로 다시 확인하는 편이 안전하다."
  multimodalSupport: "텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요"
  access: "무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다."
  pricing: "유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다."
  weightsOpen: "비공개 또는 서비스/API 제공 중심"
  vendor: "Microsoft"
aliases:
  - "Phi"
relatedTerms:
  - llm
firstMentioned: "2026-03-05"
mentionCount: 1
draft: false
tags:
  - microsoft
  - small-language-model
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://en.wikipedia.org/wiki/Phi_(language_model)"
      title: "Phi (language model)"
    - url: "https://azure.microsoft.com/en-us/blog/introducing-phi-4/"
      title: "https://azure.microsoft.com/en-us/blog/introducing-phi-4/"
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
Phi는 특정 회사가 만든 단일 제품명이라기보다, 모델 성능, 제품 전략, 개발 흐름 변화와 연결해 읽어야 하는 모델 계열 이름에 가깝다. 기사에서 이 단어가 나오면 벤치마크 점수만 볼 게 아니라 어떤 사용 시나리오를 밀고 있는지까지 같이 봐야 한다.
## 뉴스에서 왜 자주 나오나
Phi는 AIKI 기사에서 1번 이상 언급됐고, 가장 이른 기록도 2026-03-05까지 올라간다. 그만큼 이 용어는 반짝 유행어라기보다 모델 성능, 제품 전략, 개발 흐름 문제를 설명할 때 계속 재등장하는 기준 단어다. 참고 소스도 Phi (language model), https://azure.microsoft.com/en-us/blog/introducing-phi-4/ 쪽으로 모여 있어, 한 번 정리해 두면 이후 뉴스를 읽을 때 해석 속도가 빨라진다.
## 읽을 때 체크포인트
1. 먼저 Phi가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 모델 성능, 제품 전략, 개발 흐름 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.

3. 마지막으로 기사에서 Phi 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [llm](/ko/wiki/llm/)