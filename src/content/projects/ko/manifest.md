---
title: Manifest
slug: manifest
lang: ko
category: tool
summary: 프롬프트를 점수화해 tier와 specificity별 모델 슬롯으로 보내는 오픈소스 라우터.
readerValue: '다중 provider와 fallback을 운영할지, 아니면 고정 모델 1~2개로 끝낼지 비용과 운영 복잡도로 가르는 기준.'
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
    - url: >-
        https://github.com/mnfst/manifest/blob/main/packages/manifest/package.json
      title: Manifest canonical package version
    - url: 'https://github.com/mnfst/manifest/blob/main/packages/shared/src/tiers.ts'
      title: Manifest tier definitions
    - url: >-
        https://github.com/mnfst/manifest/blob/main/packages/frontend/src/services/framework-snippets.ts
      title: Manifest framework snippets
    - url: >-
        https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/score-request.spec.ts
      title: Manifest routing score tests
    - url: >-
        https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/specificity-coverage.spec.ts
      title: Manifest specificity coverage tests
    - url: >-
        https://github.com/mnfst/manifest/blob/main/packages/backend/src/routing/proxy/proxy-response-handler.ts
      title: Manifest routing response headers
  checks:
    - type: source_match
      result: pass
      sources: 5
      summary: >-
        README와 tier 정의, snippet 소스를 다시 맞춰봤어. 여기 적은 내용 중 repo 문서로 직접 확인한 구조 설명은
        이 항목에 묶여 있다고 보면 돼.
      items:
        - README는 Manifest를 personal AI agents 앞단의 smart model router라고 정의한다.
        - >-
          `packages/shared/src/tiers.ts`에는 simple, standard, complex, reasoning
          네 개의 generalist tier가 있다.
        - >-
          `packages/frontend/src/services/framework-snippets.ts`에는 OpenAI SDK,
          Vercel AI SDK, LangChain, cURL 예시가 모두 `auto` 모델로 잡혀 있다.
    - type: web_cross_check
      result: pass
      sources: 4
      summary: >-
        `score-request.spec.ts`와 `specificity-coverage.spec.ts`를 나란히 놓고, tier와
        specificity를 어떤 식으로 읽어야 하는지 다시 맞춰봤어.
      items:
        - >-
          `score-request.spec.ts`에는 `What is the capital of France?` 같은 simple
          예시와 기술 프롬프트 예시가 같이 있다.
        - >-
          `specificity-coverage.spec.ts`에는 coding, email_management,
          calendar_management 등 카테고리별 현실적인 프롬프트 목록이 들어 있다.
        - >-
          `proxy-response-handler.ts`는 `X-Manifest-Tier`, `X-Manifest-Model`,
          `X-Manifest-Specificity` 같은 확인용 헤더를 직접 노출한다.
    - type: number_verify
      result: pass
      sources: 3
      summary: >-
        repo 페이지와 문서에 공개된 숫자와 버전은 2026-04-20 기준으로 다시 확인해 뒀어. 본문에 적은 로컬 scorer 관찰값은 이 숫자
        검증 범위엔 넣지 않고 따로 읽는 편이야.
      items:
        - 'GitHub repository page 표시 기준 stars는 5,145다.'
        - canonical version은 `packages/manifest/package.json`의 `5.47.0`이다.
        - >-
          README는 `23-dimension scoring algorithm`, `under 2ms`, `cut costs up
          to 70%`를 명시한다.
    - type: adversarial
      result: pass
      sources: 4
      summary: '''auto''만 기대했을 때 실익이 남는지, fallback 체인과 헤더 관측성이 실제 차이인지 다시 봤어.'
      items:
        - >-
          README와 비교표 기준으로 Manifest는 단일 auto-router보다 tier/fallback 제어와 local
          architecture 쪽 차이가 더 크게 난다.
        - '공식 문서에는 ''이 작업엔 이 모델이 정답'' 같은 고정 추천표가 없고, 사용자가 tier별 모델을 직접 꽂도록 설계돼 있다.'
        - >-
          그래서 이 페이지의 모델 추천은 repo에 들어 있는 지원 모델 카탈로그를 바탕으로 한 practical slot 예시로만
          제시한다.
        - >-
          로컬 scorer 예시는 body와 showcase에서 참고용 관찰값으로만 다루고, repo 문서 기반 검증과 같은 무게로
          두지 않는다.
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  projects: "4.2.0"
reviewStamp:
  panelVersion: 1.1.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    projects: "4.2.0"
  panelVerdict: pass
  contentHash: "cc08299572f1ba75"
  reviewedAt: "2026-04-25T09:56:00Z"
---
## 한 줄 판단

Manifest는 프롬프트를 점수화해 tier와 specificity별 모델 슬롯으로 보내는 라우터야. 여기서 slot은 `simple`, `coding`처럼 실제로 모델과 fallback을 붙여 두는 운영 묶음이고, tier는 `simple`, `standard`, `complex`, [`reasoning`](/ko/wiki/reasoning/)처럼 요청의 난도와 비용대를 가르는 단계야. specificity는 `coding`, `calendar_management`처럼 업무 성격을 한 번 더 붙이는 꼬리표라고 보면 돼. 예를 들면 버그 수정 요청은 complex tier로 읽히더라도 coding specificity가 붙으면 coding 슬롯으로 보내는 식이야.

판단 기준은 [README](https://github.com/mnfst/manifest/blob/main/README.md)와 [`score-request.spec.ts`](https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/score-request.spec.ts), [`specificity-coverage.spec.ts`](https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/specificity-coverage.spec.ts)를 먼저 두고, 그 위에 로컬 scorer 예시를 참고용으로만 얹는 쪽이 맞아.

## 구조 축

[OpenAI-compatible API](/ko/wiki/api/) 앞단에 붙일 때는 SDK에서 `baseURL`만 Manifest로 바꾸고 `model: "auto"`를 유지하는 구조가 기본이야. 대신 핵심은 "auto" 한 줄이 아니라, 그 뒤에서 어떤 slot 정책과 fallback 체인을 설계해 둘지야. Manifest는 추천 모델표를 대신 써 주는 도구보다, 요청을 어떤 슬롯으로 보낼지 팀이 직접 정의하게 만드는 라우터에 더 가깝다.

그래서 이 페이지에서 먼저 볼 포인트도 모델 이름이 아니라 slot, tier, specificity, fallback, 그리고 [`proxy-response-handler.ts`](https://github.com/mnfst/manifest/blob/main/packages/backend/src/routing/proxy/proxy-response-handler.ts)가 내보내는 `X-Manifest-Tier`, `X-Manifest-Reason`, `X-Manifest-Specificity` 같은 헤더야. 이 도구의 차별점은 "어떤 모델이 최고인가"보다 "왜 이 요청이 이 슬롯으로 갔는가"를 추적할 수 있다는 데 있어.

## 로컬 출력

이 페이지에서 참고용으로 묶은 로컬 scorer 예시를 보면, 짧은 사실 질의는 simple 쪽으로, 버그 수정 요청은 complex tier 위에 coding specificity가 붙는 쪽으로, 일정 잡기 요청은 standard tier에 `calendar_management` specificity가 붙는 쪽으로 읽힌다. 이 정도면 Manifest를 볼 때 tier만 보는 게 아니라 specificity까지 같이 읽어야 한다는 점은 충분히 확인된다.

다만 이 페이지의 factCheck는 repo 문서와 공개 소스 기준 검증이고, 로컬 scorer run의 confidence 숫자나 세부 출력 로그는 별도 캡처로 묶어 두지 못했어. 그래서 여기서는 특정 confidence 수치 자체보다 "어떤 요청이 어느 tier와 specificity로 묶였는가"를 참고용 운영 예시로 읽는 편이 안전해.

## 도입 판단

Manifest를 붙일 팀은 보통 provider를 2개 이상 물리고, 요청 종류마다 비용 차이가 크고, slot별 primary와 fallback을 직접 운영하려는 팀이야. simple 요청은 싼 슬롯으로 보내고 coding이나 reasoning만 비싼 슬롯을 쓰겠다는 식의 비용 통제가 실제 이점으로 이어져. 여기에 헤더 관측성과 로컬 제어까지 필요하면 Manifest 쪽 가치가 더 또렷해져.

반대로 고정 모델 1~2개로 대부분의 요청을 처리하고, 장애 대응도 사실상 한 모델 교체 정도로 끝낼 팀이라면 router 운영 복잡도가 먼저 들어와. slot 정책을 계속 다듬고 specificity를 해석하고 fallback을 점검할 사람이 없으면, 단일 플래그십 모델이나 더 얇은 proxy로 끝내는 편이 더 싸고 단순해.

## 비교 축

비슷한 auto-router나 cloud proxy와 비교할 때도 먼저 볼 것은 추천 모델표가 아니야. slot policy를 직접 설계할 수 있는지, fallback 체인을 세밀하게 둘 수 있는지, 응답 헤더로 라우팅 이유를 관측할 수 있는지를 먼저 보면 돼. 이 세 가지가 필요 없으면 Manifest까지 들일 이유는 약해지고, 세 가지가 모두 필요하면 Manifest의 장점이 분명해져.
