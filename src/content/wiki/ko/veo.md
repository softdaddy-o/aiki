---
term: veo
title: Veo (비오)
lang: ko
summary: >-
  Veo (비오)는 Google DeepMind가 만든 영상 생성 모델이야. 텍스트 프롬프트로 장면을 만들고 최신 계열은 오디오까지 같이
  합성해.
readerValue: Veo를 범용 챗봇이 아니라 구글의 영상 제작 축을 보여 주는 모델로 읽으면 기사 속 제품 전략이 더 잘 보여.
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 이렇게
    보면 돼.
  implementation: '생성 모델 계열로 보면 되고, 확산형인지 다른 구현인지 공식 문서 기준으로 구분하면 돼.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 돼.
  access: '무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 이렇게 보면 돼.'
  pricing: >-
    유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. 이렇게 보면
    돼.
  weightsOpen: 비공개 또는 서비스/API 제공 중심. 이렇게 보면 돼.
  vendor: Google DeepMind
aliases:
  - Veo (비오)
relatedTerms:
  - gemini
  - gemma
  - sora
  - gemini-2.5
mentionCount: 0
draft: false
tags:
  - video-generation
  - google
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://deepmind.google/models/veo/'
      title: Veo — Google DeepMind
    - url: 'https://blog.google/technology/google-deepmind/veo-2/'
      title: 'https://blog.google/technology/google-deepmind/veo-2/'
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: Veo가 구글의 영상 생성 모델 계열이라는 기본 축부터 공식 페이지와 입력 소스로 맞춰봤어.
      items:
        - '독자 문제 대조: Veo를 챗봇 모델이 아니라 Google DeepMind의 영상 생성 모델로 읽어야 하는지 확인했어.'
        - >-
          Google DeepMind 공식 모델 페이지는 Veo를 state-of-the-art video generation
          model이라고 소개해.
        - >-
          입력에 들어 있던 DeepMind 모델 요약도 filmmakers and storytellers를 위한 video
          generation model이라고 잡아.
        - 그래서 본문은 영상 제작용 전문 모델 계열이라는 정의로 맞췄어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 모델 페이지와 관련 발표 축을 비교해서 Veo를 제품 라인업 안에서 어디에 놓아야 하는지 다시 봤어.
      items:
        - '비교 기준: Veo를 범용 Gemini 계열로 읽을지, 전문 영상 생성 모델로 읽을지 비교했어.'
        - >-
          공식 모델 페이지는 Try in Gemini, Try in Flow, Build with Veo를 함께 보여 주면서도 역할
          자체는 video generation에 고정해 둬.
        - 관련 발표 축은 창작자와 스토리텔러용 영상 제작 도구라는 방향을 밀고 있어.
        - 그래서 본문은 구글 제품 생태계 안에 붙어 있지만 역할은 전문 영상 생성이라는 식으로 정리했어.
    - type: number_verify
      result: pass
      sources: 2
      summary: 최신 공개 표기인 Veo 3.1과 오디오 지원 같은 운영 디테일만 공식 페이지 기준으로 맞춰봤어.
      items:
        - 공식 모델 페이지 상단에는 Veo 3.1이라고 표기돼 있어.
        - 공식 설명은 Veo 3 계열이 native audio와 extended videos를 포함한다고 말해.
        - 가격이나 사용량 제한은 공개 화면에서 바뀔 수 있으니 본문에는 넣지 않았어.
    - type: adversarial
      result: pass
      sources: 2
      summary: Veo를 구글의 모든 생성 AI를 대표하는 이름처럼 읽는 오해를 따로 막았어.
      items:
        - 'Veo가 Gemini의 다른 버전이라고 읽기 쉬운데, 실제로는 영상 생성에 특화된 별도 모델 축이야.'
        - '또 완성형 영화 제작기처럼 기대하기 쉽지만, 실무에서는 콘셉트 검증과 시안 생성부터 보는 게 더 정확해.'
      findings:
        - Veo는 구글 창작 모델 라인업 안의 영상 전문 모델이라는 점을 남겼어.
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
  contentHash: "9fc9e3ac56c12938"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Veo는 [Google DeepMind](/ko/wiki/google-deepmind/)의 영상 생성 모델 계열이야. 대화형 범용 모델이 아니라, 프롬프트를 받아 영화 같은 짧은 영상 결과물을 만드는 창작용 모델로 보면 돼.
## 이 모델로 무엇을 할 수 있나
광고 시안, 스토리보드 미리보기, 콘셉트 영상, 짧은 소셜 클립 같은 걸 빠르게 시각화하는 데 많이 맞아. 공식 페이지 기준으로 Veo 3.1은 [Gemini](/ko/wiki/gemini/)와 Flow에서 써 볼 수 있고, 개발자는 `Build with Veo` 경로로 접근할 수 있어서 클라우드 기반 제작 파이프라인에 붙이는 그림이 분명해.
## 왜 중요한가
Veo는 구글이 텍스트 모델만 하는 게 아니라 이미지, 음악, 영상까지 창작 툴 체인을 넓히고 있다는 신호라서 중요해. 특히 공식 소개에서 native audio와 extended videos를 함께 밀고 있어서, 단순 무음 영상 생성이 아니라 더 완성도 있는 제작 도구 쪽으로 가고 있다는 점이 눈에 띄어.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/)는 범용 추론과 대화 쪽의 중심 모델이야. Veo와 같이 보면 구글이 챗봇과 영상 생성 모델을 어떻게 분리해서 운영하는지 감이 와.
- [Gemma](/ko/wiki/gemma/)는 공개 [가중치](/ko/wiki/weight/) 모델 계열이야. Veo는 공개 모델이라기보다 클라우드와 제품 안에서 쓰는 전문 생성 모델이라는 차이가 커.
- [Sora](/ko/wiki/sora/)는 같은 영상 생성 범주에서 가장 자주 비교되는 이름이야. 두 모델을 같이 보면 각 회사가 영상 제작 워크플로를 어디까지 밀고 싶은지 읽기 좋아.
- [Gemini 2.5](/ko/wiki/gemini-2.5/)는 범용 [추론 모델](/ko/wiki/reasoning/) 버전이야. Veo와 이름 구조가 비슷해 보여도 역할은 완전히 다르다는 점을 같이 보면 헷갈림이 줄어.
