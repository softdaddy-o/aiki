---
term: speech-to-text
title: "Speech to Text(음성 인식)"
lang: ko
summary: "Speech to Text(음성 인식)는 사람 목소리를 글로 바꿔서 검색, 자막, 명령 처리로 넘기는 입력 기술이야."
readerValue: "이 말을 들으면 그냥 받아쓰기인지, 음성 제품의 핵심 입력 파이프라인인지 빨리 구분할 수 있어."
category: technique
aliases:
  - "asr"
relatedTerms:
  - whisper
  - multimodal
  - text-to-speech
firstMentioned: "2026-02-21"
mentionCount: 3
draft: false
tags:
  - audio
  - transcription
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Speech_recognition"
      title: "Speech recognition"
    - url: "https://platform.openai.com/docs/guides/speech-to-text"
      title: "Speech to text | OpenAI API"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "정의와 실무 맥락이 원문 축이랑 맞는지 맞춰봤어."
      items:
        - "독자 문제 대조: 이 글은 STT를 먼저 말을 글로 바꾸는 입력 기술로 잡아서 처음 듣는 사람도 방향을 바로 읽게 했어."
        - "원문 대조: 백과 설명과 OpenAI 가이드 모두 음성에서 텍스트로 간다는 핵심 흐름을 공통으로 말하고 있었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "개념 설명과 구현 가이드가 같은 뜻을 가리키는지 다시 봤어."
      items:
        - "비교 기준: 일반 기술 정의와 API 가이드가 모두 음성을 텍스트로 바꾸는 층을 말하는지 비교해 봤어."
        - "교차검증: 한쪽은 개념 설명, 다른 한쪽은 사용 방법에 무게가 있지만 핵심 역할은 같았어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "가변적인 성능 숫자는 덜어내고 판단 기준만 남겼어."
      items:
        - "숫자 점검: 지원 언어 수, 정확도 점수, 지연 시간 수치처럼 자주 바뀌는 숫자는 본문에 안 넣었어."
        - "표현 점검: 숫자 대신 화자 분리, 잡음 대응, 실시간성 같은 실제 판단 포인트를 남겼어."
    - type: adversarial
      result: pass
      summary: "정확도만 보면 된다는 오해는 막았어."
      items:
        - "흔한 오해 점검: STT를 받아쓰기 정확도 경쟁으로만 보면 화자 분리나 지연 문제를 놓치기 쉬워."
        - "반례 점검: 실시간 통화와 배치 전사는 요구 조건이 크게 다르다는 점을 본문에 남겼어."
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
  contentHash: "73ebe2dc7d67c7c3"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Speech to Text는 사람 목소리를 컴퓨터가 다룰 수 있는 글로 바꾸는 기술이야. 음성 입력을 검색, 자막, 요약, 명령 처리로 넘기기 전에 거치는 첫 변환층이라고 보면 돼.
## 어떻게 작동하나
오디오를 잘게 나누고 소리 특징을 뽑은 다음, 그걸 단어와 문장으로 복원해. 실무에선 여기에 화자 분리, 타임스탬프, 잡음 대응까지 붙어서 회의록이나 콜센터 파이프라인 전체를 이뤄.
## 왜 중요한가
회의 기록, 영상 자막, 음성 비서처럼 말이 먼저 들어오는 제품은 STT가 흔들리면 뒤에 붙는 검색과 요약도 같이 흔들려. 그래서 이 단계는 부가 기능이 아니라 음성 제품의 핵심 입력층으로 봐야 해.
## 주의해서 볼 점
정확도만 보면 부족하고 지연 시간, 지원 언어, 업계 용어 인식, 개인정보 처리 방식도 같이 봐야 해. 실시간 통화용인지 배치 전사용인지에 따라 허용 가능한 오류와 비용 구조가 꽤 달라져.
## 관련 용어
- [Whisper](/ko/wiki/whisper/)는 STT 쪽에서 자주 같이 언급되는 대표 모델이야. 특정 제품명이 아니라 음성을 글로 바꾸는 모델 계열 예시로 보면 돼.
- [Multimodal AI](/ko/wiki/multimodal/)는 음성을 여러 입력 형식 중 하나로 다루는 더 큰 범주야. STT는 그중에서도 음성을 텍스트로 바꾸는 입구 역할에 더 가까워.
- [Text to Speech](/ko/wiki/text-to-speech/)는 글을 다시 소리로 바꾸는 반대 방향 기술이야. 둘을 같이 보면 음성 인터페이스의 입출력 흐름이 한 번에 보여.
