---
term: lyria
title: Lyria (리리아)
lang: ko
summary: Lyria (리리아)는 Google DeepMind의 음악 생성 모델이야. 텍스트나 이미지를 받아 프로젝트용 트랙을 만드는 데 초점이 있어.
readerValue: Lyria를 노래 추천 기능이 아니라 구글의 음악 생성 라인업으로 읽으면 기사에서 말하는 창작 워크플로가 더 잘 보여.
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 이렇게
    보면 돼.
  implementation: 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 돼.
  access: '무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 이렇게 보면 돼.'
  pricing: >-
    유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. 이렇게 보면
    돼.
  weightsOpen: 비공개 또는 서비스/API 제공 중심. 이렇게 보면 돼.
  vendor: Google DeepMind
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - Lyria (리리아)
relatedTerms:
  - gemini
  - gemma
  - gemini-2.5
  - gemini-api
firstMentioned: '2026-02-18'
mentionCount: 1
draft: false
tags:
  - music-generation
  - google
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://deepmind.google/models/lyria/'
      title: Lyria 3 — Google DeepMind
    - url: >-
        https://blog.google/technology/google-deepmind/lyria-a-new-way-to-create-music-with-generative-ai/
      title: >-
        https://blog.google/technology/google-deepmind/lyria-a-new-way-to-create-music-with-generative-ai/
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: Lyria를 구글의 음악 생성 모델로 읽는 기본 축부터 공식 모델 페이지와 입력 소스로 맞춰봤어.
      items:
        - '독자 문제 대조: Lyria를 범용 모델이 아니라 Google DeepMind의 음악 생성 모델로 봐야 하는지 확인했어.'
        - 공식 모델 페이지는 Lyria 3를 music generation model이라고 소개해.
        - 입력 소스 요약도 이미지를 올려 custom high-fidelity track으로 바꾸는 모델이라고 적어.
        - 그래서 본문은 음악 생성과 트랙 제작 흐름 중심으로 정리했어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 모델 페이지와 관련 소개 축을 비교해서 Lyria의 실사용 맥락이 어긋나지 않는지 다시 봤어.
      items:
        - '비교 기준: Lyria를 음악 추천 기능으로 볼지, 실제 음악 생성 모델로 볼지 비교했어.'
        - >-
          공식 모델 페이지는 up to 3 minutes long, compose with images,
          professional-grade audio 같은 창작 기능을 앞세워.
        - 관련 소개 축도 새로운 방식의 music creation을 강조해.
        - '그래서 본문은 배경음악 제작, 콘셉트 트랙 생성, 이미지 기반 작곡 흐름 쪽으로 맞췄어.'
    - type: number_verify
      result: pass
      sources: 2
      summary: 공식 페이지에 박힌 3분 길이 정보와 실시간 계열 이름만 골라서 맞춰봤어.
      items:
        - 공식 페이지는 Lyria 3를 최대 3분 길이 트랙 생성 모델로 소개해.
        - 같은 페이지에 Lyria RealTime이라는 별도 실시간 생성 계열도 보여 줘.
        - 가격표나 사용량 제한은 자주 바뀔 수 있어서 본문에는 넣지 않았어.
    - type: adversarial
      result: pass
      sources: 2
      summary: Lyria를 그냥 노래 검색이나 추천 기능처럼 읽는 오해를 따로 막았어.
      items:
        - Lyria는 음악을 찾아 주는 서비스가 아니라 음악 자체를 만들어 내는 생성 모델이야.
        - 또 완성 음원 마스터링 도구처럼 기대하면 과해. 실제 강점은 초안 생성과 창작 실험 속도 쪽이 더 또렷해.
      findings:
        - Lyria는 구글의 음악 생성 스택 안에서 작곡과 사운드 아이데이션을 맡는 모델이라는 점을 남겼어.
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
  contentHash: e8ce2d0546a6e551
  reviewedAt: '2026-04-25T09:55:57Z'
formatVersion: 2
---
## 한 줄 정의
Lyria는 [Google DeepMind](/ko/wiki/google-deepmind/)가 만든 음악 생성 모델 계열이야. 채팅을 잘하는 모델이 아니라, 프롬프트나 이미지를 받아 음악 클립이나 트랙을 만드는 창작용 모델로 보면 돼.
## 이 모델로 무엇을 할 수 있나
배경음악 초안, 광고나 숏폼용 트랙, 콘셉트 데모용 사운드처럼 빠르게 분위기를 잡아야 하는 작업에 잘 맞아. 공식 페이지 기준으로 Lyria 3는 [Gemini](/ko/wiki/gemini/)에서 써 볼 수 있고 최대 3분 길이의 high-fidelity 음악을 만들 수 있으며, 이미지를 올려서 그 장면에 맞는 트랙으로 바꾸는 흐름도 지원해.
## 왜 중요한가
Lyria는 구글이 생성 AI를 텍스트와 이미지에서 끝내지 않고 음악 제작 단계까지 넓히고 있다는 걸 보여 줘서 중요해. 또 Lyria RealTime처럼 실시간 상호작용용 모델도 따로 보여 주고 있어서, 단발성 곡 생성뿐 아니라 악기처럼 다루는 인터랙티브 음악 생성 쪽까지 시야를 넓히고 있다는 점이 보여.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/)는 범용 대화와 [추론](/ko/wiki/inference/) 모델이야. Lyria와 같이 보면 구글이 대화형 모델과 음악 생성 모델을 어떻게 역할 분리하는지 보이기 쉬워.
- [Gemma](/ko/wiki/gemma/)는 공개 [가중치](/ko/wiki/weight/) 모델 계열이야. Lyria는 공개 가중치보다는 제품과 클라우드 경험 안에서 쓰는 전문 생성 모델이라는 차이가 커.
- [Gemini 2.5](/ko/wiki/gemini-2.5/)는 범용 [추론](/ko/wiki/inference/) 버전 이름이야. Lyria는 그와 별개로 음악 결과물을 만드는 전문 모델이라는 점을 같이 보면 덜 헷갈려.
- [Gemini API](/ko/wiki/gemini-api/)는 개발자가 모델 기능을 붙이는 인터페이스 층이야. Lyria는 그 위에서 실제 음악을 만들어 내는 모델 이름이라는 점에서 층위가 달라.
