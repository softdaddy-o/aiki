---
term: text-to-speech
title: "Text to Speech"
lang: ko
summary: "TTS(텍스트 음성 변환) 시스템은 일반 언어 텍스트를 음성으로 변환합니다."
readerValue: "텍스트를 음성으로 내보낼 때 자연스러움과 지연 중 어디가 더 중요한지 먼저 판단하는 데 도움이 돼."
category: technique
aliases:
  - "tts"
relatedTerms:
  - multimodal
  - whisper
  - speech-to-text
mentionCount: 0
draft: true
tags:
  - audio
  - voice
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Speech_synthesis"
      title: "Speech synthesis"
    - url: "https://platform.openai.com/docs/guides/text-to-speech"
      title: "Text to speech | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 시스템은 일반 언어 텍스트를 음성으로 변환합니다."
        - "원문을 보면 시스템은 일반 언어 텍스트를 음성으로 변환합니다."
        - "별칭 대조: tts도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 기법로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 이러한 목적으로 사용되는 컴퓨터 시스템을 음성 합성기라고 ​​하며 소프트웨어나 하드웨어 제품으로 구현될 수 있습니다."
        - "교차 대조: 이러한 목적으로 사용되는 컴퓨터 시스템을 음성 합성기라고 ​​하며 소프트웨어나 하드웨어 제품으로 구현될 수 있습니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: platform.openai.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 음성 입출력 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 새 제품명으로 받아들이면 실제로는 기존 모델 위에 얹는 방법론이라는 점을 놓치기 쉬워."
        - "헷갈리기 쉬운 건 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해."
      findings:
        - "TTS를 단순 보이스 효과로만 보면 지연과 운영비 같은 제품 문제를 놓치기 쉬워."
---
## 한 줄 정의
Text to Speech를 짧게 잡으면 시스템은 일반 언어 텍스트를 음성으로 변환합니다 쪽이야. 음성 인식, 합성, 스트리밍, 지연 시간처럼 텍스트 LLM과 다른 오디오 pipeline 조건을 함께 봐야 해.
## 어떻게 작동하나
이러한 목적으로 사용되는 컴퓨터 시스템을 음성 합성기라고 ​​하며 소프트웨어나 하드웨어 제품으로 구현될 수 있습니다. 음성 인식, 합성, 스트리밍, 지연 시간처럼 텍스트 LLM과 다른 오디오 pipeline 조건을 함께 봐야 해. 예를 들어 회의록 전사, 콜센터 음성봇, 낭독 기능처럼 입력과 출력이 음성인 제품에서 쓰임새가 갈려.
## 왜 중요한가
콜센터, 회의록, 음성 비서처럼 사람의 말이 직접 들어오는 제품에서 바로 쓰여. 독립 제품명처럼 읽지 말고 기존 모델이나 workflow 위에서 어떤 변수를 바꾸는지 비교해 봐야 해.
## 관련 용어
- [Multimodal AI](/ko/wiki/multimodal/) — 음성 출력 계층이 멀티모달 전체와 같은 말은 아니라는 점을 구분하는 데 도움이 돼.
- [Whisper](/ko/wiki/whisper/) — 입력 인식 모델과 출력 합성 모델은 선택 기준이 다르다는 점을 비교하게 해 준다.
- [Speech to Text](/ko/wiki/speech-to-text/) — 음성 입출력 전체를 묶어 보지 말고 어느 단계 문제인지 분리하게 해 준다.