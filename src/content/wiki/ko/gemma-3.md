---
term: gemma-3
title: "Gemma 3"
lang: ko
summary: "Gemma 3는 오픈 모델 전략과 생태계 경쟁 맥락에서 반복해서 등장하는 AI 모델다."
readerValue: "Gemma 3가 기사에 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelProfile:
  memoryUsage: "직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다."
  implementation: "Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요하다."
  activeParameters: "공개 자료 기준 활성 파라미터 수 확인 필요"
  multimodalSupport: "텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요"
  access: "무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있다."
  pricing: "직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다."
  weightsOpen: "오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요하다."
  vendor: "Google DeepMind"
aliases:
  - "Gemma 3"
relatedTerms:
  - gemma
  - gemini
  - deepseek-r1
  - llama
mentionCount: 0
draft: false
tags:
  - google
  - open-model
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://ai.google.dev/gemma"
      title: "Gemma — Google DeepMind"
    - url: "https://blog.google/technology/developers/gemma-3/"
      title: "Introducing Gemma 3: The most capable model you can run on a single GPU or TPU"
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
Gemma 3는 특정 회사가 만든 단일 제품명이라기보다, 오픈 모델 전략과 생태계 경쟁 변화와 연결해 읽어야 하는 모델 계열 이름에 가깝다. 기사에서 이 단어가 나오면 벤치마크 점수만 볼 게 아니라 어떤 사용 시나리오를 밀고 있는지까지 같이 봐야 한다.
## 뉴스에서 왜 자주 나오나
Gemma 3는 아직 기사 출현 빈도가 높지 않아도 앞으로 자주 붙을 가능성이 높은 용어다. 이유는 간단하다. 독자가 결국 궁금해하는 건 오픈 모델 전략과 생태계 경쟁 쪽 변화이기 때문이다. 이런 용어를 먼저 잡아 두면 발표문이 조금 과장돼 보여도 어디를 읽어야 하는지 판단이 쉬워진다.
## 읽을 때 체크포인트
1. 먼저 Gemma 3가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 오픈 모델 전략과 생태계 경쟁 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.

3. 마지막으로 기사에서 Gemma 3 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [gemma](/ko/wiki/gemma/)
- [gemini](/ko/wiki/gemini/)
- [deepseek-r1](/ko/wiki/deepseek-r1/)
- [llama](/ko/wiki/llama/)