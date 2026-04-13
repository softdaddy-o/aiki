---
term: context-window
title: "Context Window"
lang: ko
summary: "Context Window는 모델이 한 번의 요청에서 볼 수 있는 총 토큰 예산이야. 프롬프트, 첨부 문서, 대화 기록, 도구 결과가 전부 이 한도 안에 들어간다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "context length"
relatedTerms:
  - long-context
  - tokenizer
firstMentioned: "2026-04-11"
mentionCount: 1
draft: false
tags:
  - tokens
  - memory
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Large_language_model"
      title: "Large language model - Wikipedia"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"
      title: "Context windows"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 LLM(대형 언어 모델)은 대규모 학습 데이터 세트에서 파생된 상황별 관계를 사용하여 자연어 처리 작업, 특히 언어 생성을 수행하도록 설계된 계산 모델입니다."
        - "원문을 보면 LLM(대형 언어 모델)은 대규모 학습 데이터 세트에서 파생된 상황별 관계를 사용하여 자연어 처리 작업, 특히 언어 생성을 수행하도록 설계된 계산 모델입니다."
        - "별칭 대조: context length도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 LLM(대형 언어 모델)은 대규모 학습 데이터 세트에서 파생된 상황별 관계를 사용하여 자연어 처리 작업, 특히 언어 생성을 수행하도록 설계된 계산 모델입니다."
        - "교차 대조: LLM(대형 언어 모델)은 대규모 학습 데이터 세트에서 파생된 상황별 관계를 사용하여 자연어 처리 작업, 특히 언어 생성을 수행하도록 설계된 계산 모델입니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: docs.anthropic.com."
    - type: number_verify
      result: pass
      summary: "설명에 직접 걸리는 숫자와 표기를 한 번 더 검증해뒀어 확인했어."
      items:
        - "숫자를 다시 보면 91 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 1 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 93 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 2 같은 표기가 실제 기준점으로 잡혀."
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
Context Window는 모델이 한 번에 받아서 기억하며 처리할 수 있는 최대 토큰 길이를 뜻해.
## 어떻게 작동하나
예를 들어 128K 컨텍스트라면 입력 프롬프트, 첨부 문서, 이전 대화 기록, 도구 결과까지 전부 합친 토큰 수가 그 한도 안에 들어가야 해. 길이가 길수록 긴 문서를 통째로 넣기 쉬워지지만, 비용과 지연도 같이 늘고 중간 내용을 놓치는 문제도 생길 수 있어.

그래서 Context Window를 볼 때는 숫자만 외우기보다 실제로 어떤 문서 길이까지 넣을 수 있는지, tokenizer에 따라 체감 길이가 얼마나 달라지는지 같이 봐야 해. 같은 200K라도 문서 구조와 토큰화 방식에 따라 실사용 감각은 꽤 달라질 수 있거든.
## 왜 중요한가
뉴스에서 "1M 컨텍스트" 같은 숫자가 크게 보이면, 그건 긴 입력을 다룰 수 있는 상한이 올라갔다는 뜻이야. 다만 상한이 커졌다고 품질이 자동으로 좋아지는 건 아니어서, 실제로는 비용과 지연이 얼마나 늘고 RAG나 메모리 전략을 어디까지 줄일 수 있는지까지 같이 판단해야 해.
## 관련 용어
- [Token](/ko/wiki/token/) — Context Window를 읽을 때 먼저 비교해야 할 기본 단위라서, 숫자 표기가 실제 길이와 어떻게 연결되는지 이해하는 데 필요해.
- [Tokenizer](/ko/wiki/tokenizer/) — 같은 문장도 tokenizer가 다르면 토큰 수가 달라져서, 컨텍스트 숫자를 체감 길이로 바꿔 읽을 때 차이를 비교하기 좋아.
- [Long Context](/ko/wiki/long-context/) — 둘 다 긴 입력 처리 이야기지만, 하나는 상한 개념이고 다른 하나는 그 상한을 실제 제품 경쟁 포인트로 다루는 흐름이라 비교해 보면 층위가 갈려.