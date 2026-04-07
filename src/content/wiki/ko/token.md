---
term: token
title: "Token"
lang: ko
summary: "어휘 토큰화는 텍스트를 \"어휘 분석기\" 프로그램에 의해 정의된 범주에 속하는 의미 있는 어휘 토큰으로 변환하는 것입니다."
category: concept
aliases:
  - "tokenization"
relatedTerms:
  - llm
  - long-context
  - memory
firstMentioned: "2026-02-23"
mentionCount: 8
draft: false
tags:
  - language-model
  - context-window
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://en.wikipedia.org/wiki/Lexical_analysis"
      title: "Lexical analysis"
    - url: "https://platform.openai.com/tokenizer"
      title: "https://platform.openai.com/tokenizer"
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
## 한 줄 정의
Token는 어휘 토큰화는 텍스트를 "어휘 분석기" 프로그램에 의해 정의된 범주에 속하는 의미 있는 어휘 토큰으로 변환하는 것입니다. 자연어의 경우 이러한 범주에는 명사, 동사, 형용사, 구두점 등이 포함됩니다. 프로그래밍 언어의 경우 범주에는 식별자, 연산자, 그룹화 기호, 데이터 유형 및 언어 키워드가 포함됩니다. 어휘 토큰화는 LLM(대형 언어 모델)에 사용되는 토큰화 유형과 관련이 있지만 두 가지 차이점이 있습니다. 첫째, 어휘 토큰화는 일반적으로 어휘 문법을 기반으로 하는 반면, LLM…
## 어떻게 작동하나
https://platform.openai.com/tokenizer라는 설명을 함께 보면, Token가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 Token는 8번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [llm](/ko/wiki/llm/)
- [long-context](/ko/wiki/long-context/)
- [memory](/ko/wiki/memory/)