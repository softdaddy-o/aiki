---
term: claude-sonnet-4-5
title: "Claude Sonnet 4.5"
lang: ko
summary: "Anthropic에서 제공하는 버전형 모델이다. 실제 도입에서는 입력 범위, 컨텍스트, 가격을 함께 비교해야 한다."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽게 해준다."
category: model
modelType: version
parentModel: claude-sonnet
modelProfile:
  memoryUsage: "Claude API 기준 200K 컨텍스트 계열로 운영한다. 자체 웨이트가 공개되지 않으므로 서버 메모리보다 컨텍스트와 출력 정책을 먼저 본다."
  implementation: "Anthropic의 Sonnet 라인업 중 코딩과 에이전트 작업을 겨냥한 서비스형 모델이다. 병렬 툴 실행과 긴 코드베이스 작업 성능을 강조한다."
  activeParameters: "활성 파라미터 수는 비공개다. 대신 API 식별자 `claude-sonnet-4-5`와 상위 Sonnet 라인업 내 포지션이 실사용 기준이 된다."
  multimodalSupport: "텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞다. 핵심 포인트는 코드 이해와 장문 맥락 유지다."
  access: "Claude API, AWS Bedrock, Vertex AI 같은 서비스 채널에서 접근하는 폐쇄형 모델이다."
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
      summary: "원문에서 모델명, 벤더, 페이지 성격이 맞는지 먼저 대조했다."
      items:
        - "모델명 대조: Claude Sonnet 4.5"
        - "벤더 대조: Anthropic"
        - "배포 유형 대조: version 모델 / 폐쇄형 API"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스 2건을 비교해 라인업 위치와 접근 경로를 교차검증했다."
      items:
        - "공식 소스 1: Introducing Claude Sonnet 4.5"
        - "공식 소스 2: Claude models overview"
        - "비교 확인: Sonnet 라인업 내 위치와 배포 채널 설명이 두 소스에서 일치"
    - type: number_verify
      result: pass
      summary: "숫자와 고유 명칭은 별도로 묶어서 다시 확인했다."
      items:
        - "컨텍스트: 200K 계열"
        - "가격: 입력 $3 / 출력 $15 per 1M tokens"
        - "채널: Claude API / AWS Bedrock / Vertex AI"
    - type: adversarial
      result: pass
      summary: "오해하기 쉬운 포인트를 따로 비판적으로 검토했다."
      items:
        - "활성 파라미터 수는 공개되지 않아 벤치마크 기사에서 추정 수치를 사실처럼 쓰면 안 된다."
      findings:
        - "활성 파라미터 수는 공개되지 않아 벤치마크 기사에서 추정 수치를 사실처럼 쓰면 안 된다."
---
## 한 줄 정의
Anthropic에서 제공하는 버전형 모델이야. Anthropic의 Sonnet 라인업 중 코딩과 에이전트 작업을 겨냥한 서비스형 모델이다. 병렬 툴 실행과 긴 코드베이스 작업 성능을 강조한다. 텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞다. 핵심 포인트는 코드 이해와 장문 맥락 유지다. 한 줄로 말하면 "이 모델이 실제로 어떤 입력을 받아 어떤 결과를 내는지"를 가장 직접적으로 보여 주는 페이지라고 보면 된다.
## 이 모델로 무엇을 할 수 있나
Anthropic의 Sonnet 라인업 중 코딩과 에이전트 작업을 겨냥한 서비스형 모델이다. 병렬 툴 실행과 긴 코드베이스 작업 성능을 강조한다. 텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞다. 핵심 포인트는 코드 이해와 장문 맥락 유지다. 실무에서는 이 문장만 읽어도 이 모델이 챗봇형인지, 코딩형인지, 멀티모달 앱에 맞는지 감이 잡힌다.
## 스펙을 읽는 법
- **입력/출력 범위**: 텍스트 중심 모델로 보되, Claude 계열의 일반 입력 기능과 함께 읽는 편이 맞다. 핵심 포인트는 코드 이해와 장문 맥락 유지다. 이 줄은 텍스트 전용인지, 이미지·오디오까지 받는지부터 구분하는 항목이야.
- **컨텍스트/메모리 감각**: Claude API 기준 200K 컨텍스트 계열로 운영한다. 자체 웨이트가 공개되지 않으므로 서버 메모리보다 컨텍스트와 출력 정책을 먼저 본다. 긴 문서를 붙일 수 있는지와 호출 비용 감각이 여기서 갈린다.
- **모델 구조와 규모**: 활성 파라미터 수는 비공개다. 대신 API 식별자 `claude-sonnet-4-5`와 상위 Sonnet 라인업 내 포지션이 실사용 기준이 된다. dense인지 MoE인지, 크기 감각을 읽는 데 쓰는 줄이다.
- **접근 경로**: Claude API, AWS Bedrock, Vertex AI 같은 서비스 채널에서 접근하는 폐쇄형 모델이다. 이 항목을 보면 바로 제품에 붙일 수 있는지, 특정 플랫폼에서만 쓰는지 판단할 수 있다.
- **가격과 운영비**: Anthropic 발표 기준 Claude Sonnet 4와 같은 가격으로 유지되며, 1M 토큰당 입력 $3, 출력 $15다. API 단가인지, GPU 비용인지, 어느 쪽을 먼저 계산해야 하는지 여기서 정리된다.
- **웨이트 공개 여부**: 오픈 웨이트 미공개, API 제공 중심. 직접 호스팅 가능한지 여부를 읽는 줄이다.
## 왜 중요한가
이런 버전 페이지가 중요한 이유는 실제 도입 판단이 바로 이 단계에서 이뤄지기 때문이야. 같은 회사 모델끼리도 입력 범위, 컨텍스트, 가격, 배포 채널이 다르면 완전히 다른 제품에 맞는다. 그래서 벤치마크 숫자보다 "내 앱에 바로 붙는지"를 읽는 기준으로 봐야 한다.
## 같이 보면 좋은 모델
- [Claude Sonnet](/ko/wiki/claude-sonnet/) — 비교 대상으로 자주 같이 묶이는 모델
- [Claude](/ko/wiki/claude/) — 비교 대상으로 자주 같이 묶이는 모델
- [OpenAI API](/ko/wiki/openai-api/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉽다.
- [Anthropic API](/ko/wiki/anthropic-api/) — 앱 연결과 통합 관점에서 같이 보면 이해가 쉽다.