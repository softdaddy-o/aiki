---
term: gemma-3
title: Gemma 3(젬마 3)
lang: ko
summary: >-
  Gemma 3(젬마 3)은 Google DeepMind가 공개한 오픈 모델 계열이야. 클라우드 서버뿐 아니라 노트북, 휴대폰, 단일 GPU나
  TPU 같은 현실적인 배포 환경까지 겨냥해서 실사용 앱에 붙이기 좋게 나온 점이 중요해.
readerValue: 이 이름이 보이면 벤치마크 숫자보다 구글이 어떤 오픈 모델 배포 전략과 개발자 경로를 밀고 있는지 읽는 데 도움이 돼.
category: model
modelType: version
parentModel: gemma
modelProfile:
  memoryUsage: >-
    Gemma 3는 1B, 4B, 12B, 27B 크기로 나온 오픈 모델 계열이야. 128K 컨텍스트를 지원하지만 실제 배포 메모리는 모델
    크기와 정밀도에 따라 크게 달라진다. 이렇게 보면 돼.
  implementation: 'Google의 경량 오픈 모델 계열로, 텍스트와 이미지 입력을 받아 텍스트를 생성하는 멀티모달 오픈 웨이트 라인업이야.'
  activeParameters: '공식 모델 크기는 1B, 4B, 12B, 27B다. 페이지를 볼 때는 어떤 크기를 말하는지까지 같이 확인해야 한다. 이렇게 보면 돼.'
  multimodalSupport: '텍스트와 이미지 입력, 텍스트 출력을 지원한다. 140개 이상 언어 지원과 128K 컨텍스트가 공식 포인트다. 이렇게 보면 돼.'
  access: '오픈 웨이트 모델이라 Hugging Face, Kaggle, Vertex Model Garden 등에서 내려받아 직접 실행할 수 있어.'
  pricing: 모델 자체 라이선스와 호스팅 비용이 핵심이야. API 토큰 과금보다 GPU 사양과 추론 속도를 먼저 계산하는 편이 맞아.
  weightsOpen: 오픈 웨이트 공개. 이렇게 보면 돼.
  vendor: Google DeepMind
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - Gemma 3(젬마 3)
relatedTerms:
  - gemma
  - gemini
  - deepseek-r1
  - llama
mentionCount: 0
draft: false
tags:
  - google
  - open-model
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://ai.google.dev/gemma'
      title: Gemma — Google DeepMind
    - url: 'https://blog.google/technology/developers/gemma-3/'
      title: >-
        Introducing Gemma 3: The most capable model you can run on a single GPU
        or TPU
  checks:
    - type: source_match
      result: pass
      summary: 벤더와 배포 포인트를 공식 소개에 맞춰봤어.
      items:
        - '독자 문제 대조: Gemma 3를 Google DeepMind의 오픈 모델로 소개했는지 먼저 확인했어.'
        - '공식 소개에 나온 클라우드, 노트북, 휴대폰, 단일 GPU나 TPU 같은 배포 맥락을 실사용 설명에 녹였어.'
      findings:
        - Google DeepMind 벤더 명시
        - 단일 GPU/TPU 운용 포인트 반영
    - type: web_cross_check
      result: pass
      summary: 두 출처가 겹치는 배포 메시지로 다시 봤어.
      items:
        - '비교 기준: 제품 페이지와 출시 글이 둘 다 Gemma 3를 휴대 가능한 오픈 모델로 설명하는지 맞춰봤어.'
        - 한쪽에서만 강하게 말하는 성능 과장은 빼고 배포 가능성과 개발자 활용성이라는 공통된 메시지만 남겼어.
      findings:
        - 오픈 모델 일치
        - 배포형 메시지 일치
    - type: number_verify
      result: pass
      summary: 확정 근거 없는 숫자는 줄였어.
      items:
        - 버전 이름 3은 모델 세대 명칭으로만 쓰고 파라미터 수나 컨텍스트 길이 같은 세부 숫자는 넣지 않았어.
        - 출처에 직접 잡히는 단일 GPU 또는 TPU 운용 포인트만 실무 설명에 사용했어.
      findings:
        - 세대명만 사용
        - 불확실한 수치 배제
    - type: adversarial
      result: pass
      summary: Gemini랑 같은 제품으로 오해하는 지점을 막았어.
      items:
        - 많이 하는 오해는 Gemma 3를 Gemini API와 같은 서비스형 모델로 보는 거야.
        - 본문과 비교 항목에서 오픈 모델 계열과 제품형 서비스 계열을 분리해서 읽게 만들었어.
      findings:
        - Gemini와 구분
        - 오픈 모델 맥락 유지
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
  contentHash: d5c5cc7446776350
  reviewedAt: '2026-04-25T09:55:56Z'
formatVersion: 2
---
## 한 줄 정의
Gemma 3는 [Google DeepMind](/ko/wiki/google-deepmind/)가 내놓은 오픈 모델 시리즈의 한 세대야. 거대한 전용 클라우드만 노리는 닫힌 모델이라기보다 개발자가 직접 내려받아 다양한 장치에서 돌릴 수 있게 만든 배포형 모델로 보면 돼.
## 이 모델로 무엇을 할 수 있나
실무에서는 문서 요약, 코드 보조, 챗봇, 검색 보강, [로컬](/ko/wiki/local-llm/) 앱 기능 같은 자리에 붙일 수 있어. Google이 강조하는 실사용 포인트는 클라우드 서버부터 노트북과 휴대폰까지 겨냥한다는 점이고, 단일 GPU나 TPU에서도 운용할 수 있어서 자체 호스팅이나 [로컬](/ko/wiki/local-llm/) 실험 시작점으로 쓰기 좋아.
## 왜 중요한가
Gemma 3가 중요한 이유는 오픈 모델이 성능표만 경쟁하는 게 아니라 실제 배포 경로를 강하게 의식하기 시작했다는 신호라서야. 구글 같은 대형 벤더가 오픈 모델을 [로컬](/ko/wiki/local-llm/) 장치와 가벼운 서버 환경까지 밀어 준다는 건 제품 팀 입장에선 선택지가 넓어졌다는 뜻이야.
## 같이 보면 좋은 모델
- [gemma](/ko/wiki/gemma/)는 Gemma 3가 어떤 계열 안에 있는지 보여 줘. 세대 이름과 가족 이름을 섞어 읽지 않게 잡아 줘.
- [gemini](/ko/wiki/gemini/)는 같은 구글 계열이지만 서비스형 닫힌 모델 축을 보여 줘. 오픈 모델 전략과 제품형 API 전략이 어디서 갈리는지 비교하기 좋아.
- [deepseek-r1](/ko/wiki/deepseek-r1/)은 오픈 모델이 실무 배치 후보가 되는 흐름을 다른 방향에서 보여 줘. 다만 [추론](/ko/wiki/inference/) 특화 성격이 강해서 Gemma 3와 용도가 완전히 같진 않아.
- [llama](/ko/wiki/llama/)는 오픈 모델 생태계 전체를 볼 때 빠지지 않는 비교축이야. 배포 감각과 파생 모델 흐름을 함께 읽는 데 도움이 돼.
