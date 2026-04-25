---
term: claude-sonnet
title: Claude Sonnet (클로드 소넷)
lang: ko
summary: >-
  Claude Sonnet은 Anthropic이 Claude 제품군 안에서 코딩, 에이전트, 업무 자동화 같은 실제 배포용 작업에 앞세우는
  주력 모델 계열이야. 기사에서 버전명이 빠져 있으면 성능표보다 어떤 사용처와 제품 전략을 밀고 있는지 읽는 단서로 보는 편이 맞아.
readerValue: 'Claude Sonnet이 나오면 최고점 경쟁 기사인지, 아니면 Anthropic의 기본 실전형 모델선 이야기인지 먼저 구분할 수 있어.'
category: model
modelType: family
parentModel: claude
modelProfile:
  memoryUsage: >-
    서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 이렇게
    보면 돼.
  implementation: 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요. 이렇게 보면 돼.
  access: '무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 이렇게 보면 돼.'
  pricing: >-
    유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. 이렇게 보면
    돼.
  weightsOpen: 비공개 또는 서비스/API 제공 중심. 이렇게 보면 돼.
  vendor: Anthropic
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - Claude Sonnet (클로드 소넷)
relatedTerms:
  - claude
  - claude-sonnet-4-5
  - chatgpt
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
    - url: 'https://www.anthropic.com/claude/sonnet'
      title: Claude Sonnet 4.6
    - url: 'https://docs.anthropic.com/en/docs/about-claude/models'
      title: Models overview
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: Claude Sonnet을 주력 실전형 계열로 설명한 방향을 공식 설명에 맞춰봤어.
      items:
        - '독자 문제 대조: 벤치마크 숫자보다 사용처와 제품 전략을 먼저 읽게 해달라는 요구에 맞춰 실전형 기본선이라는 점을 앞세웠어.'
        - 코딩과 에이전트 맥락을 실제 사용 장면 중심으로 풀었어.
      findings:
        - Claude 전체 브랜드와 Sonnet 계열명을 같은 것으로 쓰지 않게 갈랐어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 제품 소개와 모델 개요 문서가 겹치는 공통 포지션만 남겼어.
      items:
        - >-
          비교 기준: Sonnet 제품 페이지는 현재 사용처를, 모델 개요 문서는 Claude 가족 안에서의 자리를 보여 준다는 점을
          놓고 비교했어.
        - '두 출처 모두 Sonnet을 코딩과 에이전트, 실사용 업무 흐름에 강한 라인으로 놓는 점은 같았어.'
      findings:
        - 버전 고유 사양은 계열 일반론으로 올리지 않고 주력 실전형이라는 공통 의미만 유지했어.
    - type: number_verify
      result: pass
      sources: 2
      summary: 버전에 따라 바뀌는 숫자는 계열 전체 사실처럼 적지 않았어.
      items:
        - 컨텍스트 길이나 가격 같은 수치는 계열 공통값으로 쓰지 않았어.
        - Sonnet 4.5나 4.6 같은 숫자는 버전 예시로만 다뤘어.
      findings:
        - 실전 사용처를 설명하는 데 필요 없는 세부 수치는 빼서 문장을 줄였어.
    - type: adversarial
      result: pass
      sources: 2
      summary: 처음 읽는 사람이 가장 많이 하는 오해를 먼저 막았어.
      items:
        - Claude Sonnet을 앱 이름처럼 읽지 않게 제품군과 계열을 분리했어.
        - Sonnet을 숫자 없는 단일 모델명으로 굳히지 않게 버전 확인 필요성을 남겼어.
      findings:
        - >-
          기사 문맥에서 Claude Sonnet은 최신 Sonnet 버전을 느슨하게 부르는 표현일 수 있어서 실제 도입 판단은 구체
          버전까지 내려가야 해.
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.1.0
    tone-editor: 1.6.0
    structure-editor: 1.1.0
  guideVersions:
    tone: 2.0.0
    common: 2.3.0
    wiki: 3.1.2
  panelVerdict: pass
  contentHash: b8f1505f7c2ad65e
  reviewedAt: '2026-04-25T09:55:56Z'
formatVersion: 2
---
## 한 줄 정의
Claude Sonnet은 [Anthropic](/ko/wiki/anthropic/)이 Claude 안에서 주력 범용 모델선으로 내세우는 계열 이름이야. 특정 버전 하나를 가리킬 때도 있지만, 기사에서는 보통 코딩과 실무 자동화에 넓게 쓰는 Sonnet 라인 전체를 뜻하는 경우가 많아.
## 이 모델로 무엇을 할 수 있나
실제로는 코드 작성과 수정, 문서 요약, 도구 호출이 섞인 [에이전트](/ko/wiki/agent/) 작업, 긴 대화형 업무 자동화처럼 매일 반복되는 실전 작업에 많이 연결돼. [Anthropic API](/ko/wiki/anthropic-api/)에서 기본선으로 검토되는 계열이라는 점까지 같이 보면, 최고 점수만 노리는 티어가 아니라 속도와 비용과 성능의 균형을 맡는 라인이라는 감이 잡혀.
## 왜 중요한가
기사에서 Claude Sonnet이 반복되면 새로운 점수표보다 [Anthropic](/ko/wiki/anthropic/)이 어떤 모델을 실전 표준처럼 밀고 있는지 읽는 쪽이 더 중요해. 이 이름은 앱 기본 경험, API 추천선, [에이전트](/ko/wiki/agent/) 워크플로 기본 선택지 같은 제품 전략과 같이 움직이기 쉬워. 그래서 도입 판단에서는 계열명만 보지 말고 버전과 채널을 함께 보는 습관이 필요해.
## 같이 보면 좋은 모델
- **Claude (클로드)**: Claude는 제품군 전체 이름이야. Sonnet은 그 안의 한 계열이니까 브랜드 이야기와 계열 이야기를 섞지 않는 게 먼저야.
- **[Claude Sonnet 4.5](/ko/wiki/claude-sonnet-4-5/) (클로드 소넷 4.5)**: Sonnet 계열의 특정 버전이야. 실제 가격이나 기능이나 컨텍스트 길이를 따질 때는 계열명보다 버전명이 더 직접적인 기준이 돼.
- **[ChatGPT](/ko/wiki/chatgpt/) ([챗지피티](/ko/wiki/chatgpt/))**: [ChatGPT](/ko/wiki/chatgpt/)는 사용자 제품 이름 성격이 더 강해. Claude Sonnet과 같은 층위로 놓으면 앱 이름과 모델 계열 이름을 섞기 쉬워.
- **[OpenAI API](/ko/wiki/openai-api/) (오픈AI API)**: [OpenAI API](/ko/wiki/openai-api/)는 접근 채널 이름이지 특정 모델 계열이 아니야. 비교할 때는 모델 대 모델 비교와 플랫폼 대 플랫폼 비교를 분리해서 봐야 덜 헷갈려.
