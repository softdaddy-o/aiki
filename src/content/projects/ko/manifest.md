---
title: Manifest
slug: manifest
lang: ko
category: tool
summary: 'Manifest는 개인용 AI 에이전트 앞단에서 요청을 채점하고 가장 싼 적합 모델로 보내는 오픈소스 모델 라우터다.'
readerValue: '이 페이지는 Manifest를 지금 붙일지, 아니면 그냥 모델 몇 개를 고정해서 쓸지 판단하려는 팀을 위해 repo 안의 실제 예시 프롬프트와 슬롯 추천 기준만 빠르게 정리한다.'
githubUrl: 'https://github.com/mnfst/manifest'
showcaseComponent: manifest
tags:
  - model-routing
  - agent
  - fallbacks
  - openai-compatible
  - observability
stars: 5145
license: MIT
version: v5.47.0
contentStatus: final
draft: false
date: '2026-04-20'
edition: ai
factCheck:
  status: passed
  date: '2026-04-20'
  sources:
    - url: 'https://github.com/mnfst/manifest'
      title: Manifest repository page
    - url: 'https://github.com/mnfst/manifest/blob/main/README.md'
      title: Manifest README
    - url: 'https://github.com/mnfst/manifest/blob/main/packages/manifest/package.json'
      title: Manifest canonical package version
    - url: 'https://github.com/mnfst/manifest/blob/main/packages/shared/src/tiers.ts'
      title: Manifest tier definitions
    - url: 'https://github.com/mnfst/manifest/blob/main/packages/frontend/src/services/framework-snippets.ts'
      title: Manifest framework snippets
    - url: 'https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/score-request.spec.ts'
      title: Manifest routing score tests
    - url: 'https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/specificity-coverage.spec.ts'
      title: Manifest specificity coverage tests
    - url: 'https://github.com/mnfst/manifest/blob/main/packages/backend/src/routing/proxy/proxy-response-handler.ts'
      title: Manifest routing response headers
  checks:
    - type: source_match
      result: pass
      sources: 5
      summary: 'README와 tier 정의, snippet 소스를 다시 맞춰봤다. Manifest는 개인용 AI 에이전트용 라우터이고 핵심 인터페이스는 `model: "auto"`다.'
      items:
        - "README는 Manifest를 personal AI agents 앞단의 smart model router라고 정의한다."
        - "`packages/shared/src/tiers.ts`에는 simple, standard, complex, reasoning 네 개의 generalist tier가 있다."
        - "`packages/frontend/src/services/framework-snippets.ts`에는 OpenAI SDK, Vercel AI SDK, LangChain, cURL 예시가 모두 `auto` 모델로 잡혀 있다."
    - type: web_cross_check
      result: pass
      sources: 4
      summary: 'repo 안에 이미 재사용 가능한 예시가 있다. 별도 임의 프롬프트를 새로 만들지 않아도 score test와 specificity corpus를 showcase 샘플로 바로 쓸 수 있다.'
      items:
        - "`score-request.spec.ts`에는 `What is the capital of France?` 같은 simple 예시와 기술 프롬프트 예시가 같이 있다."
        - "`specificity-coverage.spec.ts`에는 coding, email_management, calendar_management 등 카테고리별 현실적인 프롬프트 목록이 들어 있다."
        - "`proxy-response-handler.ts`는 `X-Manifest-Tier`, `X-Manifest-Model`, `X-Manifest-Specificity` 같은 확인용 헤더를 직접 노출한다."
    - type: number_verify
      result: pass
      sources: 3
      summary: '숫자와 버전은 2026-04-20 기준으로 다시 확인했다.'
      items:
        - "GitHub API 기준 repository stars는 5,145다."
        - "canonical version은 `packages/manifest/package.json`의 `5.47.0`이다."
        - "README는 `23-dimension scoring algorithm`, `under 2ms`, `cut costs up to 70%`를 명시한다."
    - type: adversarial
      result: pass
      sources: 4
      summary: "Manifest를 '최고 모델 자동 추천기'처럼 쓰면 오해다. 실제 가치는 슬롯 설계와 fallback, 헤더 관측성에 있다."
      items:
        - "README와 비교표 기준으로 Manifest는 단일 auto-router보다 tier/fallback 제어와 local architecture가 핵심 차별점이다."
        - "공식 문서에는 '이 작업엔 이 모델이 정답' 같은 고정 추천표가 없고, 사용자가 tier별 모델을 직접 꽂도록 설계돼 있다."
        - "그래서 이 페이지의 모델 추천은 repo에 들어 있는 지원 모델 카탈로그를 바탕으로 한 practical slot 예시로만 제시한다."
guideVersion:
  common: '3.0.0'
  projects: '3.0.0'
reviewStamp:
  panelVersion: '1.0.0'
  agentVersions:
    beginner-editor: '1.0.0'
    fact-checker: '1.0.0'
    skeptical-critic: '1.1.0'
    tone-editor: '1.3.0'
    structure-editor: '1.1.0'
  panelVerdict: pass
  reviewedAt: '2026-04-20'
---
