---
term: text-to-speech
title: "Text to Speech(음성 합성)"
lang: ko
summary: "Text to Speech(음성 합성)는 글을 사람이 말하듯 들리는 소리로 바꿔서 읽어주기와 음성 인터페이스를 만드는 기술이야."
readerValue: "이 말을 보면 단순 낭독 기능인지, 제품 톤과 반응성을 좌우하는 출력 계층인지 가르기 쉬워져."
category: technique
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "tts"
relatedTerms:
  - multimodal
  - whisper
  - speech-to-text
mentionCount: 0
draft: false
tags:
  - audio
  - voice
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Speech_synthesis"
      title: "Speech synthesis"
    - url: "https://platform.openai.com/docs/guides/text-to-speech"
      title: "Text to speech | OpenAI API"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "정의와 쓰임새가 원문 축이랑 맞는지 맞춰봤어."
      items:
        - "독자 문제 대조: 이 글은 TTS를 먼저 글을 소리로 바꾸는 출력 기술로 잡아서 처음 듣는 사람도 방향을 바로 읽게 했어."
        - "원문 대조: 백과 설명과 OpenAI 가이드 모두 텍스트를 음성으로 합성하는 흐름을 공통으로 설명하고 있었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "기술 정의와 제품 가이드가 같은 기능을 가리키는지 다시 봤어."
      items:
        - "비교 기준: 일반적인 speech synthesis 설명과 API 가이드가 같은 층위의 기능을 말하는지 비교해 봤어."
        - "교차검증: 둘 다 글을 음성 오디오로 바꾸는 기술이라는 핵심은 같고, 차이는 설명 깊이였어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "변동이 큰 성능 숫자와 음성 개수는 본문에서 줄였어."
      items:
        - "숫자 점검: 음성 종류 수, 지연 시간, 지원 언어 수처럼 자주 바뀌는 숫자는 본문에 안 넣었어."
        - "표현 점검: 숫자 대신 자연스러움, 반응성, 정책 이슈 같은 판단 기준을 남겼어."
    - type: adversarial
      result: pass
      summary: "목소리만 자연스러우면 끝이라는 오해는 막았어."
      items:
        - "흔한 오해 점검: TTS는 목소리 톤만 좋으면 된다고 생각하기 쉬운데 실제론 지연과 긴 문장 안정성도 중요해."
        - "반례 점검: 화자 모사 기능은 품질 문제가 아니라 정책과 저작권 문제까지 같이 따라온다는 점을 본문에 남겼어."
---
## 한 줄 정의
Text to Speech는 글을 소리로 읽어 주는 기술이야. 화면에 있는 텍스트를 귀로 들을 수 있는 출력으로 바꾸는 계층이라고 보면 돼.
## 어떻게 작동하나
문장을 발음 단위와 억양 정보로 풀고, 그걸 바탕으로 오디오 파형을 만들어 내. 요즘은 단순 낭독을 넘어서 감정, 말투, 속도, 화자 스타일까지 제어하는 흐름이 많아.
## 왜 중요한가
접근성 기능, 오디오북, AI 비서, 고객 응대 봇처럼 귀로 전달되는 제품은 TTS 품질이 곧 사용자 경험이야. 같은 답변이라도 목소리가 어색하거나 반응이 느리면 제품 완성도가 바로 떨어져.
## 주의해서 볼 점
자연스러움만 볼 게 아니라 지연, 긴 문장 안정성, 다국어 발음, 끊김도 같이 봐야 해. 또 보이스 클로닝이나 특정 화자 흉내 기능은 품질 문제만이 아니라 정책과 저작권 이슈도 같이 따라와.
## 관련 용어
- [Speech to Text](/ko/wiki/speech-to-text/)는 소리를 글로 바꾸고, TTS는 글을 소리로 바꿔. 둘을 같이 보면 음성 인터페이스의 입출력 방향이 선명해져.
- [Multimodal AI](/ko/wiki/multimodal/)는 텍스트와 음성을 함께 다루는 더 큰 범주야. TTS는 그중에서도 텍스트를 음성으로 내보내는 출력 쪽에 가까워.
- [Whisper](/ko/wiki/whisper/)는 반대 방향인 STT 쪽 대표 예시라서 입출력 흐름을 비교할 때 자주 같이 읽혀. 그래서 TTS를 이해할 때도 짝 개념으로 붙여 보면 좋아.