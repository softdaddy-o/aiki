---
term: prompt-engineering
title: "Prompt Engineering"
lang: ko
summary: "Prompt Engineering는 모델 성능, 제품 전략, 개발 흐름 맥락에서 반복해서 등장하는 AI 기법다."
readerValue: "Prompt Engineering가 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
category: technique
aliases:
  - "prompt engineering"
relatedTerms:
  - chain-of-thought
mentionCount: 0
draft: false
tags:
  - prompting
  - instruction
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://en.wikipedia.org/wiki/Prompt_engineering"
      title: "Prompt engineering"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
      title: "Prompt engineering overview"
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
Prompt Engineering는 특정 제품명이 아니라 일을 처리하는 방법에 가깝다. 결국 이 기법이 모델 성능, 제품 전략, 개발 흐름 가운데 무엇을 바꾸는지 봐야 한다. 같은 기법이라도 어떤 모델과 데이터 위에 얹히느냐에 따라 무게가 달라진다.
## 뉴스에서 왜 자주 나오나
Prompt Engineering는 아직 기사 출현 빈도가 높지 않아도 앞으로 자주 붙을 가능성이 높은 용어다. 이유는 간단하다. 독자가 결국 궁금해하는 건 모델 성능, 제품 전략, 개발 흐름 쪽 변화이기 때문이다. 이런 용어를 먼저 잡아 두면 발표문이 조금 과장돼 보여도 어디를 읽어야 하는지 판단이 쉬워진다.
## 읽을 때 체크포인트
1. 먼저 Prompt Engineering가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 모델 성능, 제품 전략, 개발 흐름 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.

3. 마지막으로 기사에서 prompt engineering 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [chain-of-thought](/ko/wiki/chain-of-thought/)