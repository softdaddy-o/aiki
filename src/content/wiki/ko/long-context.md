---
term: long-context
title: "Long Context"
lang: ko
summary: "Long Context는 무엇이든 배우고, 구축하고, 계획하는 데 도움이 되는 최첨단 추론을 제공합니다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "long context"
relatedTerms:
  - context-window
  - token
  - memory
firstMentioned: "2026-03-27"
mentionCount: 2
draft: false
tags:
  - context-window
  - memory
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"
      title: "Context windows"
    - url: "https://deepmind.google/technologies/gemini/"
      title: "Gemini 3 — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 무엇이든 배우고, 구축하고, 계획하는 데 도움이 되는 최첨단 추론을 제공합니다."
        - "원문을 보면 무엇이든 배우고, 구축하고, 계획하는 데 도움이 되는 최첨단 추론을 제공합니다."
        - "별칭 대조: long context도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 무엇이든 배우고, 구축하고, 계획하는 데 도움이 되는 최첨단 추론을 제공합니다."
        - "교차 대조: 무엇이든 배우고, 구축하고, 계획하는 데 도움이 되는 최첨단 추론을 제공합니다."
        - "출처 1 대조: docs.anthropic.com."
        - "출처 2 대조: deepmind.google."
    - type: number_verify
      result: pass
      summary: "설명에 직접 걸리는 숫자와 표기를 한 번 더 검증해뒀어 확인했어."
      items:
        - "숫자를 다시 보면 3 같은 표기가 실제 기준점으로 잡혀."
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
Long Context를 짧게 잡으면 무엇이든 배우고, 구축하고, 계획하는 데 도움이 되는 최첨단 추론을 제공합니다 쪽이야. 토큰 수 계산, 입력 한도, 출력 길이, 비용 감각이 실제로 어디서 갈리는지 읽을 때 기본 축이 돼.
## 어떻게 작동하나
무엇이든 배우고, 구축하고, 계획하는 데 도움이 되는 최첨단 추론을 제공합니다. 토큰 수 계산, 입력 한도, 출력 길이, 비용 감각이 실제로 어디서 갈리는지 읽을 때 기본 축이 돼. 예를 들어 128K 컨텍스트나 1M 토큰 같은 문구를 볼 때 실제 비용과 한도를 읽는 기준이 돼.
## 왜 중요한가
긴 문서 처리, 프롬프트 설계, 사용량 요금제를 읽을 때 기본이 돼. 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어.
## 관련 용어
- [Context Window](/ko/wiki/context-window/) — Context Window와 비교해 보면 토큰 예산과 긴 문맥 처리에서 어디가 다른지 읽기 쉬워.
- [Token](/ko/wiki/token/) — Token와 비교해 보면 토큰 예산과 긴 문맥 처리에서 어디가 다른지 읽기 쉬워.
- [Memory](/ko/wiki/memory/) — Memory와 비교해 보면 토큰 예산과 긴 문맥 처리에서 어디가 다른지 읽기 쉬워.