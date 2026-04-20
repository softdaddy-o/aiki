---
term: claude-sonnet-4-5
title: Claude Sonnet 4.5(클로드 소네트 4.5)
lang: ko
summary: >-
  Claude Sonnet 4.5는 Anthropic이 2025년 9월 29일 발표한 Claude 계열의 구체 버전명이야. 코딩과 복잡한
  에이전트 작업을 전면에 내세운 배치였고, API 이름과 가격까지 같이 읽어야 실무 감이 잡혀.
readerValue: >-
  벤치마크 자랑보다 이 버전이 어떤 작업에 밀렸는지, 실제로 어떻게 호출하는지 읽는 데 도움돼. Claude라는 큰 간판 아래서 선택 단위가
  어디까지 내려가는지도 보여 줘.
category: model
modelType: version
parentModel: claude-sonnet
modelProfile:
  memoryUsage: >-
    Claude API 기준 200K 컨텍스트 계열로 운영한다. 자체 웨이트가 공개되지 않으므로 서버 메모리보다 컨텍스트와 출력 정책을 먼저
    봐.
  implementation: >-
    Anthropic의 Sonnet 라인업 중 코딩과 에이전트 작업을 겨냥한 서비스형 모델이야. 병렬 툴 실행과 긴 코드베이스 작업 성능을
    강조한다. 이렇게 보면 돼.
  activeParameters: >-
    활성 파라미터 수는 비공개다. 대신 API 식별자 `claude-sonnet-4-5`와 상위 Sonnet 라인업 내 포지션이 실사용
    기준이 돼.
  multimodalSupport: >-
    텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞아. 핵심 포인트는 코드 이해와 장문 맥락 유지다.
    이렇게 보면 돼.
  access: 'Claude API, AWS Bedrock, Vertex AI 같은 서비스 채널에서 접근하는 폐쇄형 모델이야.'
  pricing: >-
    Anthropic 발표 기준 Claude Sonnet 4와 같은 가격으로 유지되며, 1M 토큰당 입력 $3, 출력 $15다. 이렇게 보면
    돼.
  weightsOpen: '오픈 웨이트 미공개, API 제공 중심. 이렇게 보면 돼.'
  vendor: Anthropic
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - claude sonnet 4.5
relatedTerms:
  - claude-sonnet
  - chatgpt
  - claude
  - openai-api
mentionCount: 0
draft: false
tags:
  - anthropic
  - application
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://www.anthropic.com/news/claude-sonnet-4-5'
      title: Introducing Claude Sonnet 4.5
    - url: 'https://docs.anthropic.com/en/docs/about-claude/models'
      title: Models overview
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: '버전명, 발표 시점, 실사용 포지션을 공식 발표 기준으로 다시 맞춰봤어.'
      items:
        - >-
          독자 문제 대조: Claude Sonnet 4.5를 그냥 Claude의 별칭으로 읽지 않게, 계열 안의 구체 버전명이라는 점을
          첫 문단에 넣었어.
        - Anthropic 발표문에서 직접 말한 코딩·에이전트·컴퓨터 사용 포지션을 실무 설명으로 옮겼어.
        - '모델 개요 문서와 부딪히지 않게, 이 페이지는 2025년 9월 29일 발표 배치를 설명하는 항목이라는 시간 축도 남겼어.'
      findings:
        - 이 페이지는 현재 최신 모델 소개가 아니라 특정 배치명을 설명하는 페이지로 읽어야 해.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 발표문과 Anthropic 모델 문서를 같이 보고 버전 층위를 다시 봤어.
      items:
        - '비교 기준: Claude Sonnet 4.5 발표문과 Anthropic 모델 개요 문서의 계열 구조를 대조했어.'
        - >-
          현재 모델 개요 문서가 최신 세대를 중심으로 적혀 있다는 점을 감안해서, 4.5 페이지는 발표 당시 배치 설명으로 위치를
          잡았어.
        - '버전명과 계열명, 그리고 API 호출 이름을 서로 다른 층위로 나눠 본문에 반영했어.'
      findings:
        - Claude 계열은 세대 교체가 빨라서 날짜를 함께 읽어야 덜 틀려.
    - type: number_verify
      result: pass
      sources: 1
      summary: 이 페이지에서 중요한 숫자는 발표문에 있는 값만 남겨 맞춰봤어.
      items:
        - 발표 날짜는 2025년 9월 29일로 공식 발표문과 맞춰봤어.
        - API 모델 이름 `claude-sonnet-4-5`는 발표문 표기 그대로 남겼어.
        - 가격 3달러 입력 / 15달러 출력 per MTok도 발표문 문구 기준으로 다시 맞췄어.
      findings:
        - 4.5 페이지는 숫자 자체보다 어떤 배치를 가리키는지 아는 데 값이 있어.
    - type: adversarial
      result: pass
      sources: 1
      summary: 최신 일반론과 특정 버전론을 섞어 읽는 오해를 막았어.
      items:
        - 현재 최신 Claude 문서와 4.5 발표문이 다른 시점을 가리킨다는 점을 숨기지 않았어.
        - 성능 자랑 문구를 그대로 옮기지 않고 실제 운영 디테일인 API 이름과 가격으로 중심을 옮겼어.
        - >-
          Claude, Claude Sonnet, Claude Sonnet 4.5를 같은 단위로 비교하지 않게 관련 항목을 따로
          붙였어.
      findings:
        - 버전 페이지는 항상 날짜와 발표 문맥까지 같이 읽어야 안전해.
---
## 한 줄 정의
Claude Sonnet 4.5는 [Anthropic](/ko/wiki/anthropic/)이 Claude 계열 안에서 따로 이름 붙여 발표한 구체 버전명이야. Claude라는 큰 브랜드 아래에서 실제 선택과 비교의 단위가 되는 모델 이름이라고 보면 돼.
## 이 모델로 무엇을 할 수 있나
[Anthropic](/ko/wiki/anthropic/)은 이 버전을 코딩, 복잡한 [에이전트](/ko/wiki/agent/) 구축, 컴퓨터 사용 작업에 특히 강한 모델로 소개했어. 실무에선 Claude API에서 `claude-sonnet-4-5`로 호출할 수 있고, 발표문 기준 가격은 입력 100만 토큰당 3달러, 출력 100만 토큰당 15달러로 Sonnet 4와 같다고 안내됐어.
## 왜 중요한가
이 이름이 중요한 이유는 Sonnet이라는 계열명보다 훨씬 구체적인 배치 정보와 시점을 주기 때문이야. 2025년 9월 29일 발표라는 날짜까지 붙여 읽으면, [Anthropic](/ko/wiki/anthropic/)이 그 시점에 어떤 작업을 이 버전에 맡기고 어떤 제품 업데이트와 함께 밀었는지 문맥이 바로 살아나.
## 같이 보면 좋은 모델
- [claude-sonnet](/ko/wiki/claude-sonnet/): Sonnet이라는 계열명 자체를 가리켜. Claude Sonnet 4.5가 그 안의 특정 배치라는 점을 구분하게 해 줘.
- [chatgpt](/ko/wiki/chatgpt/): 사용자 서비스 이름이 앞에 서는 경우를 비교하기 좋아. 모델명과 서비스명을 어떻게 나눠 읽어야 하는지 감이 빨라져.
- [claude](/ko/wiki/claude/): 더 큰 가족 이름이야. 버전명 없이 Claude만 쓰인 문장을 읽을 때 정보가 얼마나 뭉개지는지 보여 줘.
- [openai-api](/ko/wiki/openai-api/): 모델 자체가 아니라 호출 경로를 가리키는 말이야. `claude-sonnet-4-5` 같은 모델명과 API 인터페이스를 섞지 않게 도와줘.
