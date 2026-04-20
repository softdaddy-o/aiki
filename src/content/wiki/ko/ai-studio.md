---
term: ai-studio
title: AI Studio (AI 스튜디오)
lang: ko
summary: >-
  AI Studio는 Google이 Gemini 프롬프트를 바로 시험해 보라고 만든 브라우저 작업실이야. 모델 이름이 아니라 프롬프트 실험,
  코드 내보내기, 빠른 설정 확인을 한곳에 묶은 개발자 도구로 이해하는 편이 맞아.
readerValue: >-
  AI Studio를 보면 모델 이름과 실험 도구를 헷갈리지 않게 되고, 빠른 프로토타이핑용 UI와 운영 플랫폼의 차이도 한 번에 잡을 수
  있어.
category: tool
guideVersion:
  common: 1.0.0
  wiki: 3.0.0
aliases:
  - AI Studio
  - Google AI Studio
relatedTerms:
  - gemini-api
  - function-calling
  - grounding
  - token
  - api
firstMentioned: '2026-04-04T09:00:00+09:00'
mentionCount: 3
draft: true
tags:
  - developer-tools
  - gemini
  - prompting
factCheck:
  status: passed
  date: '2026-04-18'
  sources:
    - url: 'https://ai.google.dev/aistudio/'
      title: Google AI Studio
    - url: 'https://ai.google.dev/tutorials/ai-studio_quickstart/'
      title: Google AI Studio quickstart
    - url: >-
        https://docs.cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-google-ai
      title: Migrate from Google AI Studio to Vertex AI
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: 이 페이지가 AI Studio를 모델이 아니라 실험 도구로 설명하는 방향이 맞는지 확인했어.
      items:
        - "독자 문제 대조: AI Studio를 모델 이름으로 읽지 않고, Gemini 실험 도구로 읽게 만드는 설명 방향이 맞는지 먼저 봤어."
        - 'quickstart는 `Get code`, Run settings, 프롬프트 실험 흐름을 직접 보여 준다.'
      findings:
        - 이 항목을 모델 이름이 아니라 브라우저 기반 실험 도구로 정리하는 편이 정확하다.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '소개 페이지, quickstart, Vertex AI 전환 문서를 같은 프레임에서 비교했어.'
      items:
        - "비교 기준: 브라우저 실험 도구인지, 운영 배포 플랫폼인지부터 갈라 봤어."
        - AI Studio는 빠른 테스트와 코드 초안에 초점을 둔다.
        - 'Vertex AI 전환 문서는 운영 배포, IAM, 엔드포인트, MLOps 쪽 역할 차이를 분명히 적는다.'
      findings:
        - 실험 UI와 운영 플랫폼은 같은 층위 제품으로 보면 안 된다.
    - type: number_verify
      result: pass
      sources: 2
      summary: 숫자와 조건은 보수적으로 다시 확인했어.
      items:
        - >-
          소개 페이지의 `1 million token context window` 문구는 체험용 안내로 읽고, 모든 모델의 기본
          규격처럼 단정하지 않았다.
        - 운영 기능 비교는 인증 방식과 배포 기능 차이만 남기고 임의 수치를 넣지 않았다.
      findings:
        - 과장된 성능 숫자 대신 실제 제품 역할 차이에 집중했다.
    - type: adversarial
      result: pass
      sources: 3
      summary: 가장 흔한 오해를 먼저 막았어.
      items:
        - AI Studio를 새 모델 이름으로 읽으면 안 된다.
        - 'AI Studio를 운영 콘솔로 착각하면 권한, 로그, 배포 설계가 어긋나기 쉽다.'
      findings:
        - 이 페이지는 실험 도구와 운영 플랫폼을 구분해 주는 가이드다.
---

## 한 줄 정의

AI Studio는 Google이 [Gemini](/ko/wiki/gemini/)를 빠르게 실험하게 해 주는 브라우저 작업실이야. 새 모델 이름이 아니라 프롬프트를 만들고 응답 형식을 바꾸고 API 코드로 넘기는 개발자 도구라고 보면 쉬워.

## 어떻게 작동하나

quickstart 기준으로 보면 프롬프트를 입력하고, Run settings를 바꾸고, 마음에 드는 결과가 나오면 `Get code`로 바로 옮기는 흐름부터 보면 돼. 이 과정에서 [Function Calling](/ko/wiki/function-calling/), structured output, code execution, [Grounding](/ko/wiki/grounding/) 같은 기능을 UI에서 바로 시험해 볼 수 있어.

예를 들어 JSON 출력 형식을 맞추거나 툴 호출 설정을 바꿔 보면서 응답 차이를 확인한 뒤, 그 결과를 [Gemini API](/ko/wiki/gemini-api/) 호출 코드로 넘기는 식이 가장 전형적이야. 그래서 실험 속도가 매우 빠른 대신, 운영 정책까지 붙는 환경은 아니라고 보는 게 맞아.

## 왜 중요한가

이 도구가 중요한 이유는 모델을 갈아끼우기 전에 프롬프트 설계와 도구 설정이 결과를 얼마나 바꾸는지 아주 빨리 보여 주기 때문이야. 브라우저에서 테스트하고 바로 코드 초안을 받아 볼 수 있으니, 프로토타입 도입 속도가 꽤 빨라.

또 AI Studio는 Vertex AI와의 역할 차이를 이해하는 기준점이 돼. 실험 단계에서는 훨씬 가볍고, 운영 단계에서는 권한 관리와 배포 통제를 더 강하게 주는 플랫폼으로 넘어가야 한다는 분기점을 분명하게 보여 줘.

## 주의해서 볼 점

첫 화면에 1 million token context 체험 링크가 보여도, 그 숫자가 모든 모델의 기본 보장처럼 읽히면 안 돼. 소개 페이지의 체험 문구와 실제 모델 규격은 구분해서 봐야 해.

또 AI Studio와 Vertex AI를 같은 제품으로 생각하면 안 돼. AI Studio는 실험 속도와 코드 초안에 강하고, Vertex AI는 배포, IAM, 로그, 모니터링 같은 운영 통제에 강해. 도입 단계에서는 이 차이를 먼저 이해하고 설정을 나눠 보는 편이 안전해.

## 관련 용어

- [Gemini API](/ko/wiki/gemini-api/): AI Studio에서 다듬은 프롬프트를 실제 앱 호출로 옮길 때 바로 이어지는 경로야.
- [Function Calling](/ko/wiki/function-calling/): 툴 호출을 UI에서 바로 실험해 볼 때 자주 같이 봐.
- [Grounding](/ko/wiki/grounding/): 외부 정보에 기대는 응답을 어떻게 다룰지 테스트할 때 같이 읽기 좋아.
- [Token](/ko/wiki/token/): 긴 프롬프트 체험 문구를 읽을 때 기본 개념으로 필요해.
- [API](/ko/wiki/api/): 실험 UI와 실제 호출 인터페이스를 구분할 때 기준점이 돼.
