---
term: claude-sonnet-4-5
title: "Claude Sonnet 4.5"
lang: ko
summary: "Claude Sonnet 4.5는 Anthropic가 실제 배포용으로 내놓은 개별 모델 버전이야. 이름이 보이면 성능 점수만 보지 말고 어떤 작업에 맞는지와 운영비 구간을 같이 읽어야 해."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
parentModel: claude-sonnet
modelProfile:
  memoryUsage: "Claude API 기준 200K 컨텍스트 계열로 운영해. 자체 웨이트가 공개되지 않으므로 서버 메모리보다 컨텍스트와 출력 정책을 먼저 봐."
  implementation: "Anthropic의 Sonnet 라인업 중 코딩과 에이전트 작업을 겨냥한 서비스형 모델이야. 병렬 툴 실행과 긴 코드베이스 작업 성능을 강조해."
  activeParameters: "활성 파라미터 수는 비공개다. 대신 API 식별자 `claude-sonnet-4-5`와 상위 Sonnet 라인업 내 포지션이 실사용 기준이 돼."
  multimodalSupport: "텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞아. 핵심 포인트는 코드 이해와 장문 맥락 유지다."
  access: "Claude API, AWS Bedrock, Vertex AI 같은 서비스 채널에서 접근하는 폐쇄형 모델이야."
  pricing: "Anthropic 발표 기준 Claude Sonnet 4와 같은 가격으로 유지되며, 1M 토큰당 입력 $3, 출력 $15다."
  weightsOpen: "오픈 웨이트 미공개, API 제공 중심"
  vendor: "Anthropic"
aliases:
  - "claude sonnet 4.5"
relatedTerms:
  - claude-sonnet
  - claude
  - openai-api
  - anthropic-api
mentionCount: 0
draft: false
tags:
  - anthropic
  - application
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://www.anthropic.com/news/claude-sonnet-4-5"
      title: "Introducing Claude Sonnet 4.5"
    - url: "https://docs.anthropic.com/en/docs/about-claude/models"
      title: "Models overview"
  checks:
    - type: source_match
      result: pass
      summary: "원문에서 모델명, 벤더, 페이지 성격이 같은 축인지 먼저 맞춰봤다."
      items:
        - "모델명 대조: Claude Sonnet 4.5"
        - "벤더 대조: Anthropic"
        - "배포 유형 대조: version 모델 / 폐쇄형 API"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 나란히 놓고 라인업 위치와 접근 경로를 다시 봤다."
      items:
        - "공식 소스 1: Introducing Claude Sonnet 4.5"
        - "공식 소스 2: Claude models overview"
        - "비교 확인: Sonnet 라인업 내 위치와 배포 채널 설명이 두 소스에서 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 따로 빼서 한 번 더 봤다."
      items:
        - "컨텍스트: 200K 계열"
        - "가격: 입력 $3 / 출력 $15 per 1M tokens"
        - "채널: Claude API / AWS Bedrock / Vertex AI"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "활성 파라미터 수는 공개되지 않아 벤치마크 기사에서 추정 수치를 사실처럼 쓰면 안 돼."
      findings:
        - "활성 파라미터 수는 공개되지 않아 벤치마크 기사에서 추정 수치를 사실처럼 쓰면 안 돼."
---
## 한 줄 정의
Claude Sonnet 4.5는 Anthropic가 코드 이해, 수정, 에이전트형 자동화 쪽 문제를 풀려고 내놓은 개별 모델 버전이야. 기사에서 이 이름이 보이면 상위 계열 소개가 아니라, 실제로 붙여볼 후보가 올라온 상황이라고 보면 돼. 텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞아. 핵심 포인트는 코드 이해와 장문 맥락 유지다. Anthropic의 Sonnet 라인업 중 코딩과 에이전트 작업을 겨냥한 서비스형 모델이야. 병렬 툴 실행과 긴 코드베이스 작업 성능을 강조해.
## 이 모델로 무엇을 할 수 있나
이 페이지에서 먼저 볼 건 "성능이 높다"보다 "어떤 일을 맡길 모델인가"야. Anthropic의 Sonnet 라인업 중 코딩과 에이전트 작업을 겨냥한 서비스형 모델이야. 병렬 툴 실행과 긴 코드베이스 작업 성능을 강조해. Claude API, AWS Bedrock, Vertex AI 같은 서비스 채널에서 접근하는 폐쇄형 모델이야. 그래서 코드 이해, 수정, 에이전트형 자동화처럼 한 단계씩 풀어야 하는 작업에 맞는지, 아니면 더 가볍고 싼 모델로도 충분한지 가르는 기준이 돼.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞아. 핵심 포인트는 코드 이해와 장문 맥락 유지다. 텍스트 전용인지, 이미지까지 같이 읽는지부터 여기서 갈려.
- **컨텍스트/메모리 감각**: Claude API 기준 200K 컨텍스트 계열로 운영해. 자체 웨이트가 공개되지 않으므로 서버 메모리보다 컨텍스트와 출력 정책을 먼저 봐. 긴 문서 작업이 되는지와 호출비 감각을 이 줄에서 같이 봐.
- **모델 구조와 규모**: 활성 파라미터 수는 비공개다. 대신 API 식별자 `claude-sonnet-4-5`와 상위 Sonnet 라인업 내 포지션이 실사용 기준이 돼. 파라미터 숫자를 공개하지 않아도 운영 옵션 차이만으로 성격을 읽을 수 있어.
- **접근 경로**: Claude API, AWS Bedrock, Vertex AI 같은 서비스 채널에서 접근하는 폐쇄형 모델이야. 바로 제품에 붙일 수 있는지, 특정 채널에서만 열리는지 여기서 판단해.
- **가격과 운영비**: Anthropic 발표 기준 Claude Sonnet 4와 같은 가격으로 유지되며, 1M 토큰당 입력 $3, 출력 $15다. 운영비 계산을 어디서 시작할지 정하는 자리라고 보면 돼.
- **웨이트 공개 여부**: 오픈 웨이트 미공개, API 제공 중심. 자체 호스팅 가능 여부를 여기서 먼저 걸러내.
## 왜 중요한가
중요한 건 발표문에선 성능 숫자가 앞에 나오지만, 실제 도입은 컨텍스트·출력 한도·지원 API·가격표에서 갈린다는 점이야. 같은 Anthropic 모델이어도 여기 값이 달라지면 추천 답이 완전히 바뀐다. 그래서 이 페이지는 "얼마나 똑똑한가"보다 "우리 제품에 붙일 수 있는가"를 판단하는 용도로 읽는 편이 맞아.
## 같이 보면 좋은 모델
- [Claude Sonnet](/ko/wiki/claude-sonnet/) — 비교 대상으로 자주 같이 묶이는 모델
- [Claude](/ko/wiki/claude/) — 비교 대상으로 자주 같이 묶이는 모델
- [OpenAI API](/ko/wiki/openai-api/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.
- [Anthropic API](/ko/wiki/anthropic-api/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉬워.