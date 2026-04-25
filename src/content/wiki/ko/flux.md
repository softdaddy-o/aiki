---
term: flux
title: FLUX.1 (플럭스 원)
lang: ko
summary: >-
  FLUX.1은 Black Forest Labs가 만든 이미지 생성 모델 계열이야. 고품질 결과와 함께 API 사용, 오픈 웨이트, 로컬 실행
  흐름이 같이 붙는 이름이라서 실무 쪽에서 특히 자주 보여.
readerValue: >-
  FLUX.1을 보면 단순히 그림이 잘 나오는 모델인지보다 어떤 버전을 어디에 배포할 수 있는지 읽는 데 도움돼. 상용 API와 로컬
  워크플로가 같이 열려 있는 모델이라는 점이 핵심이야.
category: model
modelType: version
modelProfile:
  memoryUsage: >-
    FLUX.1은 12B 파라미터 이미지 생성 모델 계열로 알려져 있어. 텍스트 LLM보다 VRAM 요구량이 크기 쉬워 배치와 해상도 설정을
    같이 봐야 한다. 이렇게 보면 돼.
  implementation: >-
    Black Forest Labs의 rectified flow transformer 계열 이미지 생성 모델이야. Pro, Dev,
    Schnell처럼 배포 방식이 갈린다. 이렇게 보면 돼.
  activeParameters: 공개 자료 기준 12B 파라미터 계열이야. 활성 파라미터를 따로 쪼개 공개하는 구조는 아니다. 이렇게 보면 돼.
  multimodalSupport: 텍스트 프롬프트를 받아 이미지를 생성하는 모델이야. 텍스트 출력형 LLM과는 사용 방식이 다르다. 이렇게 보면 돼.
  access: 'Pro는 API 중심이고, Dev와 Schnell은 오픈 웨이트로 받아 직접 실행할 수 있어.'
  pricing: >-
    API형 Pro와 자체 호스팅형 Dev·Schnell의 비용 구조가 갈린다. 이 모델은 토큰 가격보다 이미지 1장당 생성 비용과 GPU
    점유가 더 중요해.
  weightsOpen: 'Dev와 Schnell은 오픈 웨이트, Pro는 폐쇄형 API. 이렇게 보면 돼.'
  vendor: Black Forest Labs
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - FLUX.1 (플럭스 원)
relatedTerms:
  - mistral
  - diffusion
  - stable-diffusion
  - dall-e
mentionCount: 0
draft: false
tags:
  - image-generation
  - open-weight
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://blackforestlabs.ai/announcing-black-forest-labs/'
      title: Announcing Black Forest Labs
    - url: 'https://huggingface.co/black-forest-labs'
      title: black-forest-labs (Black Forest Labs)
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: FLUX.1을 Black Forest Labs의 이미지 생성 계열로 설명한 중심 정의를 출처와 맞춰봤어.
      items:
        - '독자 문제 대조: FLUX.1을 단일 앱 이름으로 오해하지 않게 모델 시리즈라는 점을 먼저 적었어.'
        - >-
          공식 발표에 나온 local development, personal use, Hugging Face weights, API
          축을 본문 운영 설명에 반영했어.
      findings:
        - 벤더와 배포 경로를 같이 적는 구성이 출처 성격과 잘 맞았어.
        - 버전별 모든 세부 차이는 길어져서 핵심 배포 차이만 남겼어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: '공식 발표와 Hugging Face 조직 정보를 비교해서, 공개 버전과 생태계 연동 설명이 과장되지 않았는지 다시 봤어.'
      items:
        - >-
          비교 기준: Black Forest Labs 제작, 이미지 생성 목적, 공개 웨이트 접근성, API 제공 여부를 서로
          맞춰봤어.
        - >-
          ComfyUI나 Diffusers처럼 실사용 워크플로에 붙는다는 설명은 공식 발표의 day-1 integration 맥락에
          맞춰 좁혀 썼어.
      findings:
        - 상용 API와 로컬 워크플로가 공존하는 모델이라는 설명은 유지해도 됐어.
        - 최신 가격이나 성능 수치는 변동성이 커서 본문에서는 줄였어.
    - type: number_verify
      result: pass
      sources: 1
      summary: 세대 번호 말고는 변동성 큰 수치 주장을 거의 빼서 문서 수명을 늘렸어.
      items:
        - '가격, 속도, 이미지 해상도 같은 숫자는 서비스 업데이트에 따라 자주 바뀌어서 넣지 않았어.'
        - 대신 Apache 2.0 공개 여부처럼 운영상 의미가 큰 정보만 남겼어.
      findings:
        - 숫자 경쟁보다 배포 경로와 라이선스 의미를 먼저 읽게 만들었어.
    - type: adversarial
      result: pass
      summary: FLUX.1을 무조건 완전 오픈 모델이거나 무조건 폐쇄형 API라고 단정하는 오해를 막았어.
      items:
        - '같은 계열 안에서도 버전별 공개 범위와 사용 방식이 달라서, 한 문장으로 뭉개지 않게 정리했어.'
        - '품질 이야기만 앞세우면 운영 조건이 가려져서, 실무에서 중요한 배포 선택지를 먼저 보이게 했어.'
      findings:
        - 이름 하나 아래 여러 운영 경로가 있다는 점을 남겨서 과잉 단순화를 막았어.
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
  contentHash: b5bd31bdfd56f653
  reviewedAt: '2026-04-25T09:55:56Z'
formatVersion: 2
---
## 한 줄 정의
FLUX.1은 Black Forest Labs가 만든 텍스트-이미지 생성 모델 시리즈야. 한 이름 아래에 API 중심 상용 버전과, [Hugging Face](/ko/wiki/hugging-face/)나 Diffusers, [ComfyUI](/ko/wiki/comfyui/) 같은 [로컬](/ko/wiki/local-llm/) 워크플로에 붙는 공개 버전이 같이 있어 배포 선택지가 넓은 편이야.
## 이 모델로 무엇을 할 수 있나
광고 비주얼 초안, 제품 이미지 콘셉트, 캐릭터 시트, 스타일 탐색, 썸네일 제작처럼 이미지 품질이 중요한 작업에서 많이 써. 특히 FLUX.1 [schnell]이나 [dev]처럼 [로컬](/ko/wiki/local-llm/) 개발 흐름에 맞는 버전은 자체 파이프라인에 붙여 반복 생성하거나, 커스텀 UI 툴에서 바로 실험할 때 편해.
## 왜 중요한가
FLUX.1이 중요한 이유는 이미지 생성 모델을 꼭 닫힌 서비스로만 쓰지 않아도 된다는 선택지를 다시 강하게 보여줬기 때문이야. Black Forest Labs가 API도 제공하고 일부 버전은 공개 웨이트나 [Apache 2.0](/ko/wiki/apache/) 라이선스로 풀어서, 제품 팀과 [로컬](/ko/wiki/local-llm/) 제작 파이프라인 팀이 같은 계열을 다른 방식으로 쓸 수 있게 만들었어.
## 같이 보면 좋은 모델
- [Stable Diffusion](/ko/wiki/stable-diffusion/): 오픈 이미지 생성 생태계의 대표축이라서 FLUX.1의 공개 전략과 비교하기 좋아. 툴 연동과 커뮤니티 확장 방식 차이도 잘 보여.
- [DALL-E](/ko/wiki/dall-e/): 클라우드 제품 중심 이미지 생성 모델과 비교할 때 좋아. 같은 생성 작업이어도 배포 방식과 제어권이 어떻게 다른지 선명해져.
- `Midjourney`: 결과물 감성과 서비스 경험으로 자주 비교돼. FLUX.1이 워크플로 통합 쪽에서 왜 주목받는지 같이 보면 더 잘 보여.
