---
term: tokenizer
title: "Tokenizer"
lang: ko
summary: "텍스트를 모델이 읽을 토큰 단위로 잘라 주는 규칙과 도구. 같은 문장도 어떤 tokenizer를 쓰느냐에 따라 토큰 수가 달라져."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하는 데 도움이 돼."
category: tool
aliases:
  - "tokenizer"
relatedTerms:
  - context-window
mentionCount: 0
draft: false
tags:
  - tokens
  - preprocessing
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Lexical_analysis"
      title: "Lexical analysis"
    - url: "https://platform.openai.com/tokenizer"
      title: "OpenAI Platform"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 어휘 토큰화는 LLM(대형 언어 모델)에 사용되는 토큰화 유형과 관련이 있지만 두 가지 차이점이 있습니다."
        - "원문을 보면 어휘 토큰화는 LLM(대형 언어 모델)에 사용되는 토큰화 유형과 관련이 있지만 두 가지 차이점이 있습니다."
        - "별칭 대조: tokenizer도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 어휘 토큰화는 LLM(대형 언어 모델)에 사용되는 토큰화 유형과 관련이 있지만 두 가지 차이점이 있습니다."
        - "교차 대조: 어휘 토큰화는 LLM(대형 언어 모델)에 사용되는 토큰화 유형과 관련이 있지만 두 가지 차이점이 있습니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: platform.openai.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 토큰 예산과 긴 문맥 처리 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 모델 자체와 같은 말로 쓰면 제품 층위와 운영 층위가 섞이기 쉬워."
        - "헷갈리기 쉬운 건 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Tokenizer는 사람이 읽는 문장을 모델이 계산할 수 있는 토큰 단위로 나눠 주는 규칙과 도구야.
## 실제로 무엇을 하나
모델은 문장을 그대로 읽지 않고 tokenizer가 자른 조각을 입력으로 받는다. 그래서 같은 문장도 모델마다 토큰 수가 다를 수 있고, 그 차이가 곧 비용과 컨텍스트 길이 계산 차이로 이어져. OpenAI tokenizer나 llama.cpp 계열 tokenizer가 서로 결과가 다른 이유도 여기에 있어.
## 왜 중요한가
실무에선 프롬프트가 왜 갑자기 길이 제한에 걸리는지, 왜 예상보다 비용이 많이 나오는지 설명할 때 tokenizer 이해가 꼭 필요해. 모델을 바꾸면 성능만이 아니라 토큰 계산 방식도 같이 달라져.
## 관련 용어
- [Token](/ko/wiki/token/) — tokenizer가 만들어 내는 기본 단위
- [Context Window](/ko/wiki/context-window/) — 잘린 토큰을 어디까지 넣을 수 있는지 정하는 한도
- [LLM](/ko/wiki/llm/) — tokenizer가 자른 토큰을 실제로 처리하는 기반 모델