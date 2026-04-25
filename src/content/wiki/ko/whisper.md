---
term: whisper
title: Whisper (위스퍼)
lang: ko
summary: >-
  Whisper (위스퍼)는 OpenAI가 공개한 음성 인식 모델이야. 오디오를 텍스트로 옮기고 여러 언어 음성을 영어로 번역하는 데 많이
  써.
readerValue: Whisper를 채팅 모델이 아니라 STT용 공개 모델로 읽어야 기사랑 제품 얘기가 덜 헷갈려.
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 이렇게
    보면 돼.
  implementation: 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 오디오 입력 또는 음성 처리 지원으로 읽는 편이 맞아.
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
  - Whisper (위스퍼)
relatedTerms:
  - speech-to-text
  - multimodal
  - text-to-speech
firstMentioned: '2026-02-21'
mentionCount: 2
draft: false
tags:
  - audio
  - transcription
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Whisper_(speech_recognition_system)'
      title: Whisper (speech recognition system)
    - url: 'https://openai.com/index/whisper/'
      title: Introducing Whisper
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: Whisper가 정확히 어떤 모델인지 공식 소개와 백과 요약을 맞춰봤어.
      items:
        - '독자 문제 대조: Whisper를 범용 LLM이 아니라 OpenAI의 음성 인식 모델로 읽어야 하는지 확인했어.'
        - OpenAI 공식 소개는 Whisper를 automatic speech recognition system이라고 설명해.
        - 위키 요약도 speech recognition and transcription 모델이라고 적어.
        - 그래서 본문은 STT와 음성 번역 중심 모델이라는 정의로 맞췄어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 공식 소개와 백과 요약을 나란히 놓고 Whisper의 사용처 설명이 엇나가지 않는지 다시 봤어.
      items:
        - '비교 기준: Whisper를 채팅 모델로 볼지, 음성 전사와 번역 모델로 볼지 비교했어.'
        - 두 출처 모두 핵심 기능을 speech recognition과 transcription으로 잡아.
        - 'OpenAI 쪽은 다국어 전사와 영어 번역, 공개 코드까지 더 분명하게 말해.'
        - '그래서 본문도 회의 녹취, 자막, 음성 인터페이스 전처리 같은 실사용 쪽으로 옮겼어.'
    - type: number_verify
      result: pass
      sources: 2
      summary: 학습 데이터 규모와 공개 시점처럼 공식 문서에 박힌 수치만 남기고 맞춰봤어.
      items:
        - 'OpenAI 공식 소개는 Whisper가 680,000시간의 다국어·멀티태스크 데이터로 학습됐다고 적어.'
        - 공식 소개 게시일은 2022년 9월 21일이야.
        - 최신 벤치마크 점수는 시기와 셋업에 따라 달라지니 본문에 넣지 않았어.
    - type: adversarial
      result: pass
      sources: 2
      summary: Whisper를 챗봇이나 음성 합성 모델로 잘못 읽는 지점을 따로 막았어.
      items:
        - 'Whisper라는 이름만 보고 채팅이나 생성형 대화 모델로 오해하기 쉬운데, 핵심은 음성 받아쓰기야.'
        - '또 텍스트를 음성으로 읽어 주는 TTS 모델과도 반대 방향이라서, 음성 관련 기능이라고 한데 묶어 읽으면 헷갈려.'
      findings:
        - Whisper는 오디오 입력을 텍스트로 바꾸는 공개 STT 모델이라는 점을 남겼어.
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
  contentHash: 3aadfdcfaa85f486
  reviewedAt: '2026-04-25T09:55:57Z'
formatVersion: 2
---
## 한 줄 정의
Whisper는 [OpenAI](/ko/wiki/openai/)가 공개한 자동 [음성 인식](/ko/wiki/speech-to-text/) 모델이야. 채팅을 잘하는 모델이 아니라, 사람 목소리나 녹음 파일을 받아 텍스트로 옮기는 데 초점이 있는 모델로 보면 돼.
## 이 모델로 무엇을 할 수 있나
회의 녹취, 자막 초안, 고객센터 통화 기록 정리, 음성 인터페이스 전처리처럼 오디오를 먼저 글로 바꿔야 하는 일에 바로 붙일 수 있어. [OpenAI](/ko/wiki/openai/) 소개 기준으로 다국어 전사와 영어 번역을 지원하고, 공개된 모델과 [inference](/ko/wiki/inference/) code를 직접 돌려서 [로컬](/ko/wiki/local-llm/) 파이프라인이나 서버 처리 흐름에 넣는 식의 활용도 많아.
## 왜 중요한가
Whisper는 공개된 STT 모델 중에서 실무 체감이 큰 이름이라서, 음성 기능이 필요한 제품들이 자체 파이프라인을 만들 때 자주 기준점으로 삼아. 특히 68만 시간 규모의 다국어 데이터로 학습됐다는 공식 설명 덕분에, 잡음이나 억양이 섞인 환경에서도 비교적 강인한 공개 모델이라는 인식이 넓게 퍼졌어.
## 같이 보면 좋은 모델
- [Speech to Text](/ko/wiki/speech-to-text/)는 Whisper가 들어가는 작업 범주 자체를 설명해. Whisper는 그 범주 안에서 가장 널리 알려진 구체적인 모델 사례 중 하나야.
- [Multimodal AI](/ko/wiki/multimodal/)는 여러 입력 형식을 함께 다루는 시스템을 가리켜. Whisper는 그중에서도 오디오를 텍스트로 바꾸는 단일 축에 더 집중한 모델이야.
- [Text to Speech](/ko/wiki/text-to-speech/)는 글을 소리로 바꾸는 반대 방향 기술이야. Whisper와 같이 보면 음성 입출력 파이프라인의 앞뒤가 어떻게 나뉘는지 감이 와.
