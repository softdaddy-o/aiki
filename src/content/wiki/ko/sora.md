---
term: sora
title: Sora (소라)
lang: ko
summary: >-
  Sora (소라)는 OpenAI의 영상 생성 모델이자 그 모델을 앞세운 영상 제작 서비스 이름이야. 텍스트나 이미지에서 짧은 영상을 만들고
  다듬는 흐름으로 이해하면 기사 문맥이 빨리 잡혀.
readerValue: 'Sora가 연구 모델 얘기인지 앱·구독 제품 얘기인지 헷갈릴 때, 영상 생성 기능과 접근 경로를 한 번에 구분해 볼 수 있어.'
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
  vendor: OpenAI
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - Sora (소라)
relatedTerms:
  - chatgpt
  - codex
  - gpt-4o
  - o3
firstMentioned: '2024-02-15'
mentionCount: 3
draft: false
tags:
  - video-generation
  - openai
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Sora_(text-to-video_model)'
      title: Sora (text-to-video model)
    - url: 'https://openai.com/sora'
      title: Sora
  checks:
    - type: source_match
      result: pass
      summary: Sora를 모델과 제품 경험 둘 다로 읽게 했는지 독자 초점에 맞춰봤어.
      items:
        - '독자 문제 대조: 성능 숫자보다 사용처와 제품 전략을 먼저 알고 싶은 흐름에 맞춰 모델과 서비스 레이어를 같이 설명했어.'
        - 첫 단락에서 연구 모델명과 앱·웹 서비스명을 분리해서 소개했어.
      findings:
        - 기사에서 Sora가 나왔을 때 모델 얘기인지 구독형 제품 얘기인지 먼저 가를 수 있게 남겼어.
    - type: web_cross_check
      result: pass
      sources: 1
      summary: OpenAI 도움말과 제품 안내를 맞대 보고 웹·앱 운영 방식과 생성 길이 문장을 다시 봤어.
      items:
        - '비교 기준: Sora 앱 도움말, 웹 편집기 안내, Sora 소개 페이지를 함께 봤어.'
        - >-
          앱의 10초·15초 생성, 웹 스토리보드 확장, ChatGPT 구독 연동처럼 공식 페이지에서 직접 확인되는 운영 정보만
          골랐어.
      findings:
        - Sora를 단순 데모 모델이 아니라 실제 제품 흐름으로 읽게 하는 정보만 남겼어.
    - type: number_verify
      result: pass
      sources: 1
      summary: 길이와 구독 관련 숫자는 공식 도움말에서 바로 확인되는 범위만 남겼어.
      items:
        - '앱 생성 길이는 10초와 15초로 적고, 웹 스토리보드 확장은 별도 흐름으로 분리했어.'
        - 검증되지 않은 해상도나 요금 세부치는 페이지 목적에 비해 과해서 넣지 않았어.
      findings:
        - 숫자를 넣더라도 현재 제품 경험을 설명하는 데 꼭 필요한 것만 남겼어.
    - type: adversarial
      result: pass
      summary: Sora를 순수 연구 모델이나 만능 영상 편집 앱으로 과장해 읽히는 표현을 막았어.
      items:
        - 모델과 서비스 브랜드가 겹친다는 점을 먼저 밝혀서 문맥 혼선을 줄였어.
        - 모든 편집 기능이 모든 플랫폼에서 똑같이 된다는 식의 일반화를 피했어.
      findings:
        - '독자가 기사 문장 하나만 봐도 모델, 앱, 구독 문맥을 분리해 따라가게 만들었어.'
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
  contentHash: a3bf3bcf0fe9ae44
  reviewedAt: '2026-04-25T09:55:57Z'
formatVersion: 2
---
## 한 줄 정의
Sora는 [OpenAI](/ko/wiki/openai/)가 만든 텍스트·이미지 기반 영상 생성 모델이야. 동시에 `sora.com`과 앱으로 이어지는 영상 제작 경험 전체를 가리키기도 해서, 모델명만으로 읽으면 서비스 문맥을 놓치기 쉬워.
## 이 모델로 무엇을 할 수 있나
실무에서는 광고 시안, 콘셉트 영상, 스토리보드 테스트, 소셜 클립 초안 같은 데 먼저 붙어. 현재 [OpenAI](/ko/wiki/openai/)는 Sora를 웹과 앱으로 운영하고 있고, 도움말 기준으로 앱에서는 10초나 15초 영상 생성과 편집을, 웹 스토리보드에서는 더 긴 생성 흐름을 밀고 있어.
## 왜 중요한가
Sora가 중요한 이유는 [OpenAI](/ko/wiki/openai/)가 채팅 밖으로 나가 영상 창작 도구까지 제품선을 넓히는 신호이기 때문이야. 그래서 기사에서 Sora를 볼 때는 데모 품질만 보지 말고 [ChatGPT](/ko/wiki/chatgpt/) 구독과 어떻게 묶이는지, 편집 기능이 어디까지 붙는지를 같이 봐야 해.
## 같이 보면 좋은 모델
- [GPT-4o](/ko/wiki/gpt-4o/): 대화형 [멀티모달](/ko/wiki/multimodal/) 쪽 중심이야. Sora와 같이 보면 [OpenAI](/ko/wiki/openai/) 안에서 실시간 상호작용과 결과물 생성형 비디오가 어떻게 갈리는지 보여.
- [o3](/ko/wiki/o3/): 분석과 [추론](/ko/wiki/inference/) 작업을 맡는 모델이야. Sora와 붙여 보면 [OpenAI](/ko/wiki/openai/)가 생성 도구와 [추론](/ko/wiki/inference/) 엔진을 따로 운용한다는 점이 선명해져.
- [ChatGPT](/ko/wiki/chatgpt/): 제품 경험 이름이야. Sora 접근이 [ChatGPT](/ko/wiki/chatgpt/) 구독과 묶일 때가 많아서 서비스 문맥을 읽는 기준점이 돼.
- [Codex](/ko/wiki/codex/): 개발 작업 특화 제품선이야. Sora와 나란히 보면 [OpenAI](/ko/wiki/openai/)가 영역별로 다른 도구 브랜드를 운영한다는 감각이 생겨.
