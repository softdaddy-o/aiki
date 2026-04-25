---
term: grok
title: Grok (그록)
lang: ko
summary: >-
  Grok은 xAI가 만드는 생성형 AI 모델 계열 이름이자 그 모델을 얹은 챗봇 제품 이름으로도 같이 쓰여. 그래서 기사에서 Grok이
  보이면 순수 모델 스펙 얘기인지, X와 붙은 사용자 제품 얘기인지 먼저 분리해서 읽어야 해.
readerValue: 'xAI 관련 기사에서 모델 성능 경쟁인지, X와 묶인 소비자 제품 전략인지 구분하게 해 줘.'
category: model
modelType: family
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
  vendor: xAI
aliases:
  - Grok (그록)
relatedTerms:
  - chatgpt
  - claude
  - perplexity
mentionCount: 0
draft: false
tags:
  - xai
  - assistant
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Grok_(chatbot)'
      title: Grok (chatbot)
    - url: 'https://x.ai/blog'
      title: 'xAI — Creators of Grok, the AI Chatbot'
  checks:
    - type: source_match
      result: pass
      summary: Grok을 모델 가족이자 제품 이름으로 쓰는 현실에 맞춰 다시 정리했어.
      items:
        - '독자 문제 대조: Grok을 xAI 모델 계열 이름으로 설명하되, 챗봇 제품명으로도 같이 쓰인다는 점을 본문 앞에 붙였어.'
        - >-
          xAI docs Welcome 페이지가 Grok을 'truthful, insightful answers'를 주는 AI
          model로 소개하고, 오래된 공식 소개 글도 챗봇 제품으로 다루고 있어서 두 층을 같이 반영했어.
        - >-
          도구 사용과 실시간 정보 활용을 빼면 Grok이 왜 자주 기사에 나오는지 설명이 빈약해져서 web/X search와 code
          execution 맥락도 넣었어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '현재 개발자 문서와 공식 블로그, 초창기 제품 소개가 같은 이름을 어떻게 쓰는지 비교했어.'
      items:
        - >-
          비교 기준: xAI 개발자 문서, 2025년 2월 19일 Grok 3 Beta 글, 2023년 11월 Announcing
          Grok 글이 Grok을 모델과 제품 중 어디에 놓는지 봤어.
        - >-
          세 소스 모두 Grok을 xAI의 중심 AI 이름으로 다루지만, 문맥에 따라 모델 계열과 챗봇 제품을 오가서 본문에도 그
          구분을 남겼어.
        - >-
          현재 docs는 API와 도구 사용을, 초기 소개 글은 제품 성격과 X 기반 실시간성을 더 강조해서 두 층을 같이 읽는 게
          맞았어.
    - type: number_verify
      result: pass
      summary: 세대별 스펙 숫자가 달라지는 점을 확인하고 본문은 보수적으로 잡았어.
      items:
        - '현재 xAI 모델 문서는 Grok 4.20 Beta에 2,000,000 context를 적고 있는지 확인했어.'
        - '2025년 2월 19일 Grok 3 Beta 글이 1,000,000 token context를 말하는 것도 같이 확인했어.'
        - >-
          그래서 'Grok'라는 일반 항목 본문엔 한 세대의 숫자를 고정 스펙처럼 박지 않고, 가족 이름과 제품 전략 쪽 설명에 무게를
          뒀어.
    - type: adversarial
      result: pass
      summary: 모델명과 서비스명을 한 덩어리로 읽는 실수를 막아 뒀어.
      items:
        - 'Grok을 항상 하나의 고정 모델로 읽지 않게, 세대가 계속 바뀌는 계열 이름이라는 점을 남겼어.'
        - X와 묶인 실시간 정보 이미지만 강조하다가 개발자 API와 도구 호출 기능이 빠지지 않게 균형을 잡았어.
        - 공식 성능 주장과 제품 브랜딩을 같은 층위로 읽지 않게 역할을 분리했어.
      findings:
        - >-
          Grok은 같은 이름이 모델 가족, 앱, API 브랜드를 같이 가리키기 쉬워서 기사 제목만 보면 실제로 무엇이 발표된 건지
          헷갈리기 쉬워.
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "55c6eca622dcd0cd"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Grok은 xAI가 만든 생성형 AI 모델 가족을 가리키는 이름이야. 동시에 웹과 모바일에서 쓰는 챗봇 제품명으로도 같이 쓰여서, 기사에선 모델명과 서비스명이 겹쳐 보이는 경우가 많아. 이 점은 [xAI 블로그](https://x.ai/blog)와 [위키백과 정리](https://en.wikipedia.org/wiki/Grok_(chatbot))를 같이 보면 바로 드러나.
## 이 모델로 무엇을 할 수 있나
실사용에선 일반 대화, 요약, 글 초안, 코드 보조 같은 범용 챗봇 용도로 생각하면 돼. 현재 xAI 개발자 문서 기준으론 웹 검색, X 검색, 코드 실행, 구조화된 출력처럼 4개 축의 도구 사용이 붙어서 조사형 답변이나 도구 호출형 워크플로우에도 들어갈 수 있어.
## 왜 중요한가
Grok이 중요한 건 모델 한 개의 성능표보다 xAI가 소비자용 AI와 개발자용 API를 어떤 브랜드로 묶는지 보여 주기 때문이야. [2023년 첫 발표 글](https://x.ai/blog/grok)과 2025년 이후 문서를 같이 보면 같은 이름 아래에서 제품과 모델 세대가 함께 움직인다는 점이 더 또렷해져.
## 같이 보면 좋은 모델
- [chatgpt](/ko/wiki/chatgpt/)는 모델 이름과 제품 이름이 어떻게 겹쳐 보이는지 비교하기 좋아. 둘 다 챗 인터페이스가 강하지만 배포 채널과 생태계 전략은 꽤 다르게 읽혀.
- [claude](/ko/wiki/claude/)는 문서 작업과 안정적인 응답 톤 이미지가 강해. Grok을 볼 때 안전장치, 제품 포지션, [도구 사용](/ko/wiki/tool-use/) 감각 차이를 비교하기 좋아.
- [perplexity](/ko/wiki/perplexity/)는 검색과 출처 합성 쪽을 더 강하게 미는 제품이야. 그래서 Grok과 비교하면 모델 경쟁인지 사용자 경험 경쟁인지 구분하기 쉬워.
