---
term: api
title: API (애플리케이션 프로그래밍 인터페이스)
lang: ko
summary: >-
  API는 프로그램이 다른 프로그램의 기능을 정해진 형식으로 호출하는 연결 규약이야. 요청 형식, 응답 형식, 인증 방식 같은 운영 조건이
  같이 붙어.
readerValue: 'AI 기사에서 API라는 말을 보면 새 앱 화면 얘기인지, 외부 서비스가 코드로 붙는 호출 경로 얘기인지 먼저 가를 수 있어.'
category: concept
guideVersion:
  tone: 2.0.0
  common: 2.2.0
  wiki: 3.1.1
aliases:
  - application programming interface
relatedTerms:
  - gpt
  - llm
  - openai
  - token
firstMentioned: '2025-01-20'
mentionCount: 25
draft: true
tags:
  - integration
  - infrastructure
factCheck:
  status: passed
  date: '2026-04-23'
  sources:
    - url: 'https://en.wikipedia.org/wiki/API'
      title: API
    - url: 'https://aws.amazon.com/what-is/api/'
      title: What is an API? - Application Programming Interface Explained - AWS
    - url: 'https://developers.openai.com/api/reference/overview'
      title: API Overview | OpenAI API Reference
    - url: 'https://developers.openai.com/api/docs/models/gpt-5-mini/'
      title: GPT-5 mini Model | OpenAI API
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: 이 페이지의 핵심 독자 문제인 'API 출시'와 '웹 앱/모델 출시' 혼동이 실제 출처 구조와 맞는지 먼저 대조했어.
      items:
        - >-
          독자 문제 대조: Wikipedia와 AWS는 둘 다 API를 프로그램 사이 인터페이스로 설명해. 그래서 이 페이지가 '새 앱
          화면 공개'와 '외부 연동 경로 공개'를 갈라 읽으라고 한 축이 맞아.
        - >-
          OpenAI API Reference는 브라우저 화면 소개가 아니라 HTTP 요청, 인증 헤더, 응답 포맷 예시를 중심에 둬.
          본문이 API를 화면보다 호출 계약으로 설명한 이유가 여기서 확인돼.
        - >-
          즉, '새 [GPT](/ko/wiki/gpt/) 모델이 나왔다'는 소식만으로는 API 가용성을 확정할 수 없고, 실제로는 별도
          API 문서와 운영 조건이 붙어야 한다는 독해 방향이 출처와 맞는다.
      findings:
        - 이 페이지가 해결하는 혼동은 '기능 발표'가 아니라 '외부 개발자가 붙일 수 있는 경로가 열렸는가'라는 점이야.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: >-
        일반 정의와 실제 AI 문서를 겹쳐 보고, 웹 앱/데모 접근과 API 접근을 같은 것으로 읽으면 어떤 해석 오류가 생기는지
        점검했어.
      items:
        - >-
          비교 기준: 사람이 웹 앱이나 데모를 브라우저에서 직접 쓰는 경우와, 다른 서비스가 API로 HTTP 요청을 보내 붙는 경우를
          나눠 봤어.
        - >-
          AWS의 일반 설명과 OpenAI API 문서를 같이 놓으면 API 쪽에는 인증, 가격, rate limit, 모델 식별자
          같은 운영 정보가 따라붙어. 이런 정보가 없고 웹 UI만 보인다면 '사용자용 체험은 있음, API는 아직 아님'으로 해석이
          바뀌어야 해.
        - >-
          OpenAI 모델 문서는 가격표와 한도, alias와 snapshot 표기를 같이 묶어 보여 줘. 그래서 이 페이지가 '모델
          공개'와 '운영 가능한 API 공개'를 갈라 읽으라고 한 판단이 버텨.
      findings:
        - 웹 데모 접근과 외부 연동 접근은 같은 사건이 아닐 수 있어. 해석 기준을 섞으면 기사 독해가 바로 틀어져.
    - type: number_verify
      result: pass
      summary: 본문에 넣은 운영 수치와 버전 예시를 2026-04-23 기준 공식 문서 숫자로 다시 맞춰 봤어.
      items:
        - >-
          OpenAI `GPT-5 mini Model` 페이지에는 입력 1M tokens당 `$0.25`, 출력 1M tokens당
          `$2.00`가 적혀 있어. 본문의 가격 예시는 이 수치에 맞춰 썼어.
        - >-
          같은 문서의 Tier 1 한도는 `RPM 500`, `TPM 500,000`으로 표시돼. 여기서 Tier 1은 계정 사용 단계
          중 기본 등급이라는 뜻이야.
        - >-
          버전 표기 예시도 함께 보였어. `gpt-5-mini` 같은 alias는 '현재 기본으로 가리키는 이름'이고,
          `gpt-5-mini-2025-08-07` 같은 snapshot은 날짜가 붙은 고정 버전이야.
      findings:
        - '이 페이지는 정의만이 아니라 가격, 한도, 버전 정책처럼 실제 운영 판단에 쓰는 숫자를 함께 봐야 해.'
    - type: adversarial
      result: pass
      summary: '처음 읽는 사람이 가장 자주 하는 오해를 세워 놓고, 본문이 그 오해를 실제로 막는지 다시 봤어.'
      items:
        - >-
          오해 1: API 출시 기사면 곧 새 웹 앱이나 데모가 나왔다는 뜻이야. 반대야. API는 다른 서비스가 기능을 호출하는
          통로라서, 사용자 화면 공개와는 별개일 수 있어.
        - >-
          오해 2: 모델 이름만 보이면 바로 개발에 붙일 수 있다. 그렇지 않아. 인증 방식, 가격, rate limit, 지원 버전이
          빠져 있으면 실사용 판단이 안 돼.
        - >-
          오해 3: alias만 알면 된다. 실제 운영에서는 snapshot까지 확인해야 나중에 모델이 바뀌어도 같은 동작을 재현하기
          쉬워.
      findings:
        - 이 페이지는 '무슨 모델인가'보다 '어떤 조건으로 호출 가능한가'를 먼저 보게 만드는 쪽으로 읽혀야 해.
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
    common: 2.2.0
    wiki: 3.1.1
  panelVerdict: pass
  contentHash: f13ed229397f4263
  reviewedAt: '2026-04-23'
formatVersion: 2
---


## 한 줄 정의

API는 프로그램이 다른 프로그램의 기능을 정해진 형식으로 호출하는 인터페이스야. 쉽게 말해 "이 형식으로 요청을 보내면 저쪽이 이 형식으로 응답한다"는 약속이라고 보면 돼.

그래서 API는 웹 앱 화면 자체가 아니라 연결 규약을 말해. 같은 기능이라도 사람이 브라우저에서 직접 쓰는 데모나 웹 앱이 있을 수 있고, 다른 서비스가 코드로 붙는 API가 따로 있을 수 있어.

## 어떻게 작동하나

예를 들어 어떤 개발자가 [LLM](/ko/wiki/llm/) 기능을 자기 제품 안에 넣고 싶다면, 모델 회사 사이트를 사람이 직접 눌러 쓰는 대신 API로 요청을 보내 결과를 받아 와. 이때 요청 내용, 모델 이름, 인증 키, 응답 형식 같은 규칙이 API 문서에 적혀 있어.

여기서 초심자가 자주 헷갈리는 비교가 하나 있어. 웹 앱이나 데모는 사람이 직접 써 보는 사용자용 화면이고, API는 다른 프로그램이 기능을 호출하는 개발자용 통로야. 또 "새 [GPT](/ko/wiki/gpt/) 모델 출시"는 모델 자체가 나왔다는 뜻일 뿐이고, 그 모델이 바로 API로 열렸다는 뜻은 아니야.

## 왜 중요한가

AI 기사에서 API라는 말을 이해하면 "새 모델 출시", "새 웹 앱 기능 추가", "외부 개발자용 API 공개"를 따로 읽을 수 있어. 이 셋은 같이 움직일 때도 있지만, 실제로는 시차를 두고 따로 발표되는 경우도 많아.

운영 판단도 여기서 갈려. 예를 들어 2026년 4월 23일 기준 [OpenAI](/ko/wiki/openai/) `gpt-5-mini` 문서에는 입력 100만 [토큰](/ko/wiki/token/)당 `$0.25`, 출력 100만 토큰당 `$2.00`, Tier 1(가장 기본적인 사용 등급) 기준 분당 요청 500회와 분당 토큰 500,000개 한도가 적혀 있었어. 그래서 API가 있다는 사실만으로는 부족하고, 가격표와 사용 한도까지 같이 봐야 실제 도입 가능성을 판단할 수 있어.

## 주의해서 볼 점

- 인증 방식: 로그인만 하면 되는지, 서버에서 비밀 키를 따로 관리해야 하는지 먼저 봐야 해.
- 요청 한도: 분당 요청 수나 분당 토큰 수 상한이 작으면 데모는 돌아가도 실제 서비스 운영은 막힐 수 있어.
- 응답 안정성: JSON 필드와 오류 처리 규칙이 문서에 얼마나 분명한지 확인해야 해.
- 버전 정책: `gpt-5-mini` 같은 alias는 현재 기본으로 가리키는 별칭이고, `gpt-5-mini-2025-08-07` 같은 snapshot은 날짜가 붙은 고정 버전이야. 운영에서는 별칭만 볼지, 고정 버전까지 지정할지 판단이 필요해.

결국 AI API를 볼 때는 "모델이 있느냐"보다 "외부 서비스가 어떤 조건으로 안정적으로 붙을 수 있느냐"를 먼저 봐야 해. 기사와 문서를 읽을 때도 화면 데모, 모델 발표, API 운영 조건을 분리해서 보는 습관이 중요해.

## 관련 용어

- [GPT](/ko/wiki/gpt/): 모델 이름이 기사에 먼저 보여도, 실제 외부 연동은 API 문서와 운영 조건을 따로 확인해야 해.
- [LLM](/ko/wiki/llm/): API는 LLM 자체가 아니라 그 기능을 다른 서비스에서 호출하게 만드는 연결 방식이야.
- [OpenAI](/ko/wiki/openai/): AI 기사에서 API 가격, 한도, 버전 정책을 함께 공개하는 대표 사례로 자주 등장해.
- [Token](/ko/wiki/token/): API 비용과 rate limit이 대개 token 단위로 계산되기 때문에 운영 판단에서 같이 봐야 하는 개념이야.
