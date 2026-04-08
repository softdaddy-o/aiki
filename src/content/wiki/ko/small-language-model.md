---
term: small-language-model
title: "Small Language Model"
lang: ko
summary: "Small Language Model는 모델 성능, 제품 전략, 개발 흐름 맥락에서 반복해서 등장하는 AI 개념다."
readerValue: "Small Language Model를 보면 용어 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "slm"
relatedTerms:
  - quantization
  - distillation
  - prompt-caching
mentionCount: 0
draft: false
tags:
  - efficiency
  - on-device
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model"
      title: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model"
    - url: "https://huggingface.co/blog/smollm"
      title: "SmolLM - blazingly fast and remarkably powerful"
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
Small Language Model는 제품 하나보다 여러 발표에서 공통으로 쓰이는 개념어다. 이 단어를 잡아 두면 모델 성능, 제품 전략, 개발 흐름 얘기가 나올 때 문장을 훨씬 빨리 해석할 수 있다. 쉽게 말해 기사에 흩어진 표현을 하나의 지도 위에 올려놓게 해 주는 공용 언어라고 보면 된다.
## 뉴스에서 왜 자주 나오나
Small Language Model는 아직 기사 출현 빈도가 높지 않아도 앞으로 자주 붙을 가능성이 높은 용어다. 이유는 간단하다. 독자가 결국 궁금해하는 건 모델 성능, 제품 전략, 개발 흐름 쪽 변화이기 때문이다. 이런 용어를 먼저 잡아 두면 발표문이 조금 과장돼 보여도 어디를 읽어야 하는지 판단이 쉬워진다.
## 읽을 때 체크포인트
1. 먼저 Small Language Model가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 모델 성능, 제품 전략, 개발 흐름 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.

3. 마지막으로 기사에서 slm 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [quantization](/ko/wiki/quantization/)
- [distillation](/ko/wiki/distillation/)
- [prompt-caching](/ko/wiki/prompt-caching/)