---
term: token
title: "Token"
lang: ko
summary: "모델이 텍스트를 잘라 읽는 최소 단위. 비용, 컨텍스트 길이, 최대 출력 계산이 모두 토큰 기준으로 움직여."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "tokenization"
relatedTerms:
  - llm
  - long-context
  - memory
firstMentioned: "2026-02-23"
mentionCount: 12
draft: false
tags:
  - language-model
  - context-window
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
        - "별칭 대조: tokenization도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
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
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
Token은 LLM이 텍스트를 한 글자씩이 아니라 잘게 쪼갠 조각 단위로 읽을 때 쓰는 기본 단위다.
## 어떻게 작동하나
영어 단어 하나가 토큰 하나일 때도 있지만, 긴 단어는 여러 조각으로 나뉠 수 있고 한글도 글자 수와 토큰 수가 꼭 일치하지는 않아. 모델은 결국 이 토큰 개수를 기준으로 입력 길이, 출력 길이, 요금을 계산해. 그래서 같은 문장도 어떤 tokenizer를 쓰느냐에 따라 비용과 처리 한도가 달라져.
## 왜 중요한가
뉴스에서 "128K 컨텍스트", "최대 출력 8K", "1M tokens당 가격" 같은 문구가 보이면 전부 토큰 단위를 말하는 거다. 이 개념을 알아야 모델 스펙표와 API 요금표를 제대로 읽을 수 있어.
## 관련 용어
- [LLM](/ko/wiki/llm/) — 토큰을 실제로 읽고 예측하는 기반 모델
- [Tokenizer](/ko/wiki/tokenizer/) — 텍스트를 토큰으로 자르는 규칙과 도구
- [Context Window](/ko/wiki/context-window/) — 한 번에 넣을 수 있는 토큰 상한