---
term: chain-of-thought
title: "Chain-of-Thought"
lang: ko
summary: "복잡한 문제에서 모델이 중간 사고 단계를 드러내게 유도하는 프롬프트 기법이야."
readerValue: "이 말이 모델 교체가 아니라 입력 설계와 출력 제어를 바꾸는 기법인지 바로 이해하는 데 도움이 돼."
category: technique
aliases:
  - "cot"
relatedTerms:
  - prompt-engineering
  - deepseek-r1
  - o3
  - claude-opus
firstMentioned: "2026-03-08"
mentionCount: 5
draft: false
tags:
  - reasoning
  - prompting
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Prompt_engineering"
      title: "Prompt engineering"
    - url: "https://research.google/blog/language-models-perform-reasoning-via-chain-of-thought/"
      title: "Language Models Perform Reasoning via Chain of Thought"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 프롬프트 엔지니어링은 생성 인공 지능(GenAI) 모델에서 지정된 출력을 생성하기 위해 자연어 입력을 구조화하는 프로세스입니다."
        - "원문을 보면 프롬프트 엔지니어링은 생성 인공 지능(GenAI) 모델에서 지정된 출력을 생성하기 위해 자연어 입력을 구조화하는 프로세스입니다."
        - "별칭 대조: cot도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 프롬프트 엔지니어링은 생성 인공 지능(GenAI) 모델에서 지정된 출력을 생성하기 위해 자연어 입력을 구조화하는 프로세스입니다."
        - "교차 대조: 프롬프트 엔지니어링은 생성 인공 지능(GenAI) 모델에서 지정된 출력을 생성하기 위해 자연어 입력을 구조화하는 프로세스입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: research.google."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 복잡한 추론과 계획 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 새 제품명으로 받아들이면 실제로는 기존 모델 위에 얹는 방법론이라는 점을 놓치기 쉬워."
        - "헷갈리기 쉬운 건 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Chain-of-Thought는 모델 구조를 바꾸지 않고도 단계별 사고 과정을 먼저 펼치게 만드는 입력 설계 기법이야.
## 어떻게 작동하나
예를 들어 수학 문제나 코드 수정 요청에서 "정답만 말해" 대신 "단계별로 풀어라"를 넣으면, 모델이 중간 판단을 더 드러내면서 실수를 줄이는 경우가 있어. 그래서 이 기법은 모델 교체보다 입력 설계를 조정하는 쪽에 가까워.

실제로는 답을 바로 찍으면 오류가 늘어나는 작업에만 적용하고, 쉬운 작업이나 민감한 작업에서는 장황한 추론을 강제하지 않도록 설정하는 편이 나아. 결국 핵심은 언제 단계별 사고를 요구할지 구분하는 데 있어.
## 왜 중요한가
이 기법을 이해하면 reasoning 모델과 프롬프트 전술을 헷갈리지 않게 돼. 실무에선 모델을 바꾸지 않고도 출력 품질을 조정하는 대표 레버라서, 수학·코드·계획형 작업을 볼 때 먼저 비교해 둘 가치가 커.
## 관련 용어
- [Prompt Engineering](/ko/wiki/prompt-engineering/) — 상위 입력 설계 개념 안에서 어디에 놓이는지 비교하기 좋아.
- [Reasoning Model](/ko/wiki/reasoning/) — 하나는 모델 포지션이고 다른 하나는 입력 기법이라 같이 보면 층위 차이가 선명해진다.
- [DeepSeek R1](/ko/wiki/deepseek-r1/) — 긴 추론을 강조하는 모델과 프롬프트 기법이 실제로 어떻게 만나는지 보기에 좋아.
- [o3](/ko/wiki/o3/) — reasoning 계열 제품과 프롬프트 전술을 같이 비교할 때 기준점이 돼.