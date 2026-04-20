---
term: imagen
title: Imagen (이마젠)
lang: ko
summary: >-
  Imagen (이마젠)은 Google DeepMind의 텍스트-이미지 생성 모델이야. 문장을 넣으면 사진풍 이미지나 일러스트를 빠르게 만들어
  줘.
readerValue: 'Imagen을 범용 대화 모델이 아니라 구글의 이미지 생성 축으로 읽으면 앱, API, 워터마크 얘기가 왜 같이 붙는지 이해돼.'
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
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - Imagen (이마젠)
relatedTerms:
  - gemini
  - gemma
  - gemini-2.5
  - gemini-api
mentionCount: 0
draft: false
tags:
  - image-generation
  - google
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Imagen_(text-to-image_model)'
      title: Imagen (text-to-image model)
    - url: 'https://deepmind.google/models/imagen/'
      title: Imagen — Google DeepMind
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: Imagen이 정확히 어떤 모델 계열인지 공식 페이지와 입력 소스를 맞춰봤어.
      items:
        - '독자 문제 대조: Imagen을 Google DeepMind의 텍스트-이미지 생성 모델로 읽어야 하는지 확인했어.'
        - 공식 모델 페이지는 Imagen을 leading text-to-image model이라고 소개해.
        - 입력 소스 요약도 Google DeepMind의 text-to-image model series라고 적어.
        - 그래서 본문은 이미지 생성 전문 모델 계열이라는 정의로 맞췄어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 공식 모델 페이지와 입력 소스를 비교해서 Imagen의 제품 위치를 다시 봤어.
      items:
        - '비교 기준: Imagen을 범용 Gemini 안의 기능으로만 볼지, 별도 이미지 생성 모델 축으로 볼지 비교했어.'
        - >-
          공식 페이지는 Try in Gemini와 Try in Whisk를 함께 보여 주지만 모델 정체성은 text-to-image로
          고정해 둬.
        - 입력 소스도 Stable Diffusion이나 DALL-E와 비슷한 이미지 생성 범주라고 잡아.
        - 그래서 본문은 구글 제품 안에 붙어 있지만 역할은 이미지 생성 전문 모델이라는 식으로 정리했어.
    - type: number_verify
      result: pass
      sources: 2
      summary: Imagen 4 표기와 SynthID 안전 표식처럼 공식 화면에 고정된 디테일만 맞춰봤어.
      items:
        - 공식 페이지는 Imagen 4를 직접 언급하고 있어.
        - 같은 페이지는 SynthID를 AI 생성 이미지에 넣는 보이지 않는 디지털 워터마크 도구라고 설명해.
        - 가격이나 세부 요금 정책은 자주 바뀔 수 있으니 본문에서 뺐어.
    - type: adversarial
      result: pass
      sources: 2
      summary: Imagen을 아무 구글 AI 이미지 기능 전체의 별칭처럼 읽는 오해를 따로 막았어.
      items:
        - Imagen은 구글의 모든 시각 기능을 통칭하는 말이 아니라 이미지 생성 모델 계열 이름이야.
        - >-
          또 최종 상업 비주얼을 자동으로 다 끝내 주는 도구처럼 기대하면 과해. 실무에선 초안, 탐색, 방향 검증 단계에서 먼저 힘을
          발휘해.
      findings:
        - Imagen은 구글 라인업 안의 이미지 생성 모델 축이라는 점을 남겼어.
---
## 한 줄 정의
Imagen은 [Google DeepMind](/ko/wiki/google-deepmind/)가 만든 텍스트-이미지 생성 모델 계열이야. 질문에 답하는 대화 모델이 아니라, 프롬프트를 받아 시각 결과물을 만들어 내는 창작 모델이라고 보면 돼.
## 이 모델로 무엇을 할 수 있나
광고 콘셉트 시안, 제품 이미지 초안, 프레젠테이션 비주얼, 무드보드용 그림처럼 아이디어를 빨리 시각화하는 데 잘 맞아. 공식 페이지 기준으로 Imagen은 [Gemini](/ko/wiki/gemini/)와 Whisk에서 써 볼 수 있고, 개발자용 경로도 따로 보여 줘서 앱 안 체험과 개발 연동이 둘 다 가능한 클라우드형 모델이라는 점이 분명해.
## 왜 중요한가
Imagen은 구글이 이미지 생성 모델을 앱 체험과 개발자 생태계 둘 다에 밀고 있다는 신호라서 중요해. 또 공식 페이지에서 Imagen 4와 SynthID 워터마킹을 같이 강조하고 있어서, 단순 생성 품질 경쟁뿐 아니라 안전 표식과 배포 경로까지 함께 설계하는 축으로 읽는 게 맞아.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/)는 범용 대화와 [추론](/ko/wiki/inference/) 모델이야. Imagen과 같이 보면 구글이 텍스트 응답 모델과 시각 생성 모델을 어떻게 분리해 놓는지 보이기 쉬워.
- [Gemma](/ko/wiki/gemma/)는 공개 [가중치](/ko/wiki/weight/) 모델 계열이야. Imagen은 공개 가중치보다 제품과 개발자 경로 안에서 쓰는 전문 생성 모델이라는 차이가 커.
- [Gemini 2.5](/ko/wiki/gemini-2.5/)는 대화와 [추론](/ko/wiki/inference/) 버전 이름이야. Imagen은 이름이 비슷한 구글 라인업 안에 있어도 역할은 이미지 생성 쪽으로 완전히 다르다는 걸 같이 보면 좋아.
- [Gemini API](/ko/wiki/gemini-api/)는 모델을 붙이는 인터페이스 층이야. Imagen은 그 위에서 실제 이미지를 만들어 내는 모델 계열이라 층위가 다르다는 점을 구분하면 헷갈림이 줄어.
