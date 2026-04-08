---
term: prompt-caching
title: "Prompt Caching"
lang: ko
summary: "Prompt Caching는 배포 비용과 추론 처리량 맥락에서 반복해서 등장하는 AI 기법다."
readerValue: "이 용어가 뉴스에 나오면 Prompt Caching가 단순 기능 이름인지, 성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지 빠르게 구분해서 읽게 해준다."
category: technique
aliases:
  - "cache reuse"
relatedTerms:
  - ollama
  - vllm
  - quantization
  - distillation
mentionCount: 0
draft: false
tags:
  - efficiency
  - inference
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://platform.openai.com/docs/guides/prompt-caching"
      title: "Prompt caching | OpenAI API"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
      title: "Prompt caching"
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
Prompt Caching는 특정 제품명이 아니라 일을 처리하는 방법론에 가깝다. 결국 질문은 하나다. 이 기법이 배포 비용과 추론 처리량 쪽에서 성능, 비용, 안정성 중 무엇을 바꾸느냐다. 그래서 같은 기법이라도 어떤 모델과 데이터 위에 얹히는지에 따라 뉴스의 무게가 달라진다.
## 뉴스에서 왜 자주 나오나
Prompt Caching는 아직 기사 수가 많지 않아도 앞으로 자주 붙을 가능성이 높은 단어다. 이유는 간단하다. 새 모델이나 제품이 나와도 결국 독자가 궁금한 건 배포 비용과 추론 처리량 쪽 변화이기 때문이다. 이런 용어를 먼저 잡아 두면 발표문이 조금 과장돼도 어디를 봐야 하는지 중심을 잃지 않는다.
## 읽을 때 체크포인트
1. 먼저 Prompt Caching가 모델 내부 이야기인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 배포 비용과 추론 처리량 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 밀어 올리는지, 비용을 줄이는지, 아니면 사용자 경험만 부드럽게 만드는지 나눠서 읽으면 과장을 덜 타게 된다.

3. 마지막으로 기사에서 cache reuse 같은 표현이 섞여 나오면 같은 범주인지 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아서, 여기서 한 번 걸러 두면 발표 내용을 훨씬 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [ollama](/ko/wiki/ollama/)
- [vllm](/ko/wiki/vllm/)
- [quantization](/ko/wiki/quantization/)
- [distillation](/ko/wiki/distillation/)