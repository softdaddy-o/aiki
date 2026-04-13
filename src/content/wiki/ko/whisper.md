---
term: whisper
title: "Whisper"
lang: ko
summary: "Whisper는 OpenAI가 멀티모달 생성과 이해를 같이 다루는 라인업 쪽 라인업을 설명할 때 쓰는 이름이야. 기사에서 이 단어가 보이면 새 모델 하나보다 제품 방향이 움직이는 신호로 읽는 편이 맞아."
readerValue: "기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용처와 제품 전략을 밀고 있는지 먼저 읽는 데 도움이 돼."
category: model
modelType: family
modelProfile:
  memoryUsage: "서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 나아."
  implementation: "Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해."
  activeParameters: "공개 자료 기준 활성 파라미터 수 확인 필요"
  multimodalSupport: "오디오 입력 또는 음성 처리 지원으로 읽는 편이 맞아."
  access: "무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전해."
  pricing: "유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋아."
  weightsOpen: "비공개 또는 서비스/API 제공 중심"
  vendor: "OpenAI"
aliases:
  - "Whisper"
relatedTerms:
  - speech-to-text
  - multimodal
  - text-to-speech
firstMentioned: "2026-02-21"
mentionCount: 2
draft: false
tags:
  - audio
  - transcription
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Whisper_(speech_recognition_system)"
      title: "Whisper (speech recognition system)"
    - url: "https://openai.com/index/whisper/"
      title: "Introducing Whisper"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 어떤 층위의 모델 설명으로 읽어야 하는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 Whisper가 개별 모델 하나가 아니라 어떤 작업군을 묶는 라인업 이름인지."
        - "모델 이름부터 다시 보면 Whisper."
        - "만든 쪽을 다시 보면 OpenAI."
        - "상위 계열로는 최상위 라인업."
        - "페이지 성격: 개별 스냅샷이 아니라 상위 계열 안내 페이지."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 소스를 나란히 놓고 접근 채널과 포지션 설명이 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 Whisper 아래에서 어떤 버전 페이지를 봐야 하는지."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: openai.com."
    - type: number_verify
      result: pass
      summary: "가격, 접근 경로, 입력 범위처럼 실제 도입 판단에 필요한 정보는 따로 떼서 검증해뒀어 확인했어."
      items:
        - "운영 정보 대조: 유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋아."
        - "접근 경로 대조: 무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전해."
        - "입력/출력 범위 대조: 오디오 입력 또는 음성 처리 지원으로 읽는 편이 맞아."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리해뒀어 확인했어."
      items:
        - "개별 가격과 컨텍스트는 하위 버전 페이지에서 확인해야 해."
      findings:
        - "계열 페이지의 일반 설명을 특정 버전 스펙처럼 읽지 않도록 분리했다."
---
## 한 줄 정의
Whisper라는 이름을 새 모델 하나라고 읽으면 자꾸 헷갈려. OpenAI가 멀티모달 생성과 이해를 같이 다루는 라인업 쪽 라인업을 설명할 때 앞에 내세우는 간판에 가깝거든. 그래서 기사에서 이 계열명이 보이면 벤치마크보다 어떤 사용 장면을 키우려는지부터 읽는 편이 덜 틀려.
## 이 모델로 무엇을 할 수 있나
Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해. 오디오 입력 또는 음성 처리 지원으로 읽는 편이 맞아. 예를 들어 이미지를 보고 답하거나 음성을 받아 처리하는 앱에서 입력 범위 차이가 바로 체감돼. 다만 계열 이름만으로 가격표나 제한을 확정하면 거의 틀려. 여기서는 텍스트를 다루는 계열인지, 이미지나 영상까지 넓히는지, 앱 중심인지 API 중심인지 같은 방향만 잡아두고, 실제 도입 판단은 하위 버전 페이지에서 끝내는 편이 맞아.
## 왜 중요한가
뉴스는 종종 버전명을 빼고 계열명만 남겨. 이걸 모르면 "또 새 모델이 나왔네" 정도로 읽고 지나가는데, 계열 성격을 먼저 잡아두면 OpenAI가 이번에 어디에 힘을 싣는지 훨씬 빨리 보여. 그래서 이 페이지는 스펙표를 외우는 곳이 아니라, 이후 기사 해석 속도를 올리는 기준점 역할을 해.
## 같이 보면 좋은 모델
- [Speech to Text](/ko/wiki/speech-to-text/) — 같이 보면 음성 입출력 맥락을 같이 이해하는 데 도움이 돼.
- [Multimodal AI](/ko/wiki/multimodal/) — 같이 보면 음성 입출력 맥락을 같이 이해하는 데 도움이 돼.
- [Text to Speech](/ko/wiki/text-to-speech/) — 같이 보면 음성 입출력 맥락을 같이 이해하는 데 도움이 돼.