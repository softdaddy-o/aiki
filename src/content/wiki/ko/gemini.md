---
term: gemini
title: Gemini(제미니)
lang: ko
summary: >-
  Gemini는 Google DeepMind가 만드는 멀티모달 모델 가족 이름이야. 챗봇 하나보다 Google이 앱, 검색, API를 같은
  축으로 묶을 때 쓰는 큰 간판에 더 가까워.
readerValue: 'Gemini가 나오면 성능 자랑 기사인지, Google 제품 전략 신호인지 먼저 가르는 데 도움돼. 하위 모델명까지 같이 봐야 덜 헷갈려.'
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 이렇게
    보면 돼.
  implementation: 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 멀티모달 지원으로 보면 돼. 다만 입력 전용인지 출력까지 되는지는 API 문서를 함께 봐야 한다. 이렇게 보면 돼.
  access: '무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 이렇게 보면 돼.'
  pricing: >-
    유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. 이렇게 보면
    돼.
  weightsOpen: 비공개 또는 서비스/API 제공 중심. 이렇게 보면 돼.
  vendor: Google DeepMind
aliases:
  - google gemini
relatedTerms:
  - gemini-2.5
  - gpt-4o
  - gemma
  - gemini-api
firstMentioned: '2026-02-18'
mentionCount: 23
draft: false
tags:
  - google
  - multimodal
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Gemini_(language_model)'
      title: Gemini (language model)
    - url: 'https://deepmind.google/technologies/gemini/'
      title: Gemini 3 — Google DeepMind
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 정의와 쓰임새를 공식 설명 범위 안으로 다시 맞춰봤어.
      items:
        - >-
          독자 문제 대조: Gemini를 챗봇 하나로 읽기 쉬운 지점을 먼저 풀고, Google DeepMind의 모델 계열명이라는
          점을 첫 문단에 박았어.
        - 위키 성격의 설명과 Google 공식 문서에서 공통으로 보이는 멀티모달 모델 가족이라는 핵심만 남겼어.
        - 하위 모델과 서비스 간판이 겹쳐 보이는 구조를 본문 전체에서 같은 방향으로 설명했어.
      findings:
        - Gemini는 모델명과 서비스명이 겹쳐 보여서 층위 분리가 중요해.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 공식 모델 문서와 Google 소개문에서 겹치는 부분만 골라 다시 봤어.
      items:
        - >-
          비교 기준: Google AI for Developers의 모델 문서와 Gemini Developer API/Vertex AI
          안내를 나란히 놓고 공통 분모만 남겼어.
        - '한쪽의 홍보성 표현은 줄이고, 둘 다 인정하는 API 제공 경로와 모델 계열 구조만 본문에 반영했어.'
        - '멀티모달, 장문맥, 개발자 배포 경로처럼 실사용에 바로 연결되는 내용만 살렸어.'
      findings:
        - Gemini는 앱 이름보다 API와 제품군 단위로 읽을 때 덜 흔들려.
    - type: number_verify
      result: pass
      sources: 1
      summary: 길게 남는 숫자는 공식 모델 문서에서 바로 확인되는 값만 남겼어.
      items:
        - 'Gemini 2.5 Pro 입력 한도 1,048,576토큰은 Google 모델 문서 표에 있는 값으로 맞춰봤어.'
        - 검증 부담이 큰 벤치마크 점수나 가격표는 일반 Gemini 설명에 굳이 넣지 않고 줄였어.
        - 버전명은 2.5처럼 실제 모델 세대를 가리키는 숫자만 비교 축으로 남겼어.
      findings:
        - 이 페이지는 숫자보다 모델 가족 구조를 아는 게 더 중요해.
    - type: adversarial
      result: pass
      sources: 1
      summary: 서비스 이름과 모델 이름을 한 덩어리로 읽는 오해를 먼저 막았어.
      items:
        - Gemini를 앱 이름으로만 읽는 경우와 모델 이름으로만 읽는 경우 둘 다 생긴다는 점을 본문에 드러냈어.
        - 하위 모델명을 안 보고 Gemini만 보고 결론내리면 틀리기 쉬운 구조라는 경계도 남겼어.
        - Google 제품 전략 신호라는 맥락을 넣어서 단순 성능 기사로만 읽는 과장도 줄였어.
      findings:
        - Gemini는 큰 간판이어서 하위 버전까지 내려가야 실제 선택 정보가 보여.
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
  contentHash: "9606a061f0eae2af"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
Gemini는 [Google DeepMind](/ko/wiki/google-deepmind/)가 내놓는 AI 모델 계열 이름이야. 특정 챗봇 한 개를 가리키는 말이라기보다 여러 하위 모델과 서비스 표지를 한데 묶는 큰 브랜드로 보는 게 맞아.
## 이 모델로 무엇을 할 수 있나
Gemini는 글쓰기, 요약, 코드 보조, 이미지 이해, 음성 대화처럼 입력 형식이 섞인 작업을 한 흐름에서 다루는 쪽에 쓰여. 실무에선 Google의 Gemini Developer API나 Vertex AI [Gemini API](/ko/wiki/gemini-api/)로 붙여 쓰는 경우가 많고, 대표 모델인 [Gemini 2.5](/ko/wiki/gemini-2.5/) Pro는 공식 문서 기준으로 입력 1,048,576토큰까지 받는 [긴 문맥](/ko/wiki/long-context/) 작업을 밀고 있어.
## 왜 중요한가
Gemini라는 이름은 점수표보다 Google이 어디에 힘을 싣는지 읽게 해 주는 신호라서 중요해. 기사에서 Gemini만 적혀 있으면 앱 기능 업데이트인지, API 배포인지, 새로운 하위 모델 발표인지 층위를 먼저 나눠 봐야 제대로 읽을 수 있어.
## 같이 보면 좋은 모델
- [gemini-2.5](/ko/wiki/gemini-2.5/): Gemini라는 큰 간판 아래서 실제 선택 대상이 되는 세대명이야. 기사에서 Gemini만 보이면 이 하위 이름까지 같이 봐야 판단이 정확해져.
- [gpt-4o](/ko/wiki/gpt-4o/): [멀티모달](/ko/wiki/multimodal/) 사용자 경험을 자주 같이 비교하는 경쟁 모델이야. 실시간 반응성과 제품 포지셔닝 차이를 읽을 때 같이 보면 감이 빨라.
- [gemma](/ko/wiki/gemma/): 같은 Google 계열이지만 공개 가중치와 [로컬](/ko/wiki/local-llm/) 실행 맥락이 강한 모델이야. 그래서 Gemini와 역할이 어떻게 갈리는지 보기 좋고, 클라우드 중심 전략과도 대비돼.
- [gemini-api](/ko/wiki/gemini-api/): 모델 자체가 아니라 Gemini를 붙이는 호출 통로를 가리키는 말이야. 모델 이름과 접근 채널을 섞어 읽지 않게 도와줘.
