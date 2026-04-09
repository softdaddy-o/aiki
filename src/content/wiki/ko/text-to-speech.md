---
term: text-to-speech
title: "Text to Speech"
lang: ko
summary: "음성 입출력을 개선하거나 연결하는 AI 기법이야. 보통 정확도, 비용, 실행 방식 중 하나를 바꿔."
readerValue: "이 말이 성능 트릭인지 비용 절감 방식인지, 실무에서 어디에 붙는 기법인지 빠르게 가르게 해준다."
category: technique
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Speech_synthesis"
      title: "Speech synthesis"
    - url: "https://platform.openai.com/docs/guides/text-to-speech"
      title: "Text to speech | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Text to Speech"
        - "분류 대조: 기법"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Speech synthesis (https://en.wikipedia.org/wiki/Speech_synthesis)"
        - "Text to speech | OpenAI API (https://platform.openai.com/docs/guides/text-to-speech)"
    - type: number_verify
      result: pass
      summary: "이 항목은 개념 설명이 중심이라 숫자보다 명칭과 분류를 한 번 더 봤다."
      items:
        - "명칭 대조: Text to Speech"
        - "숫자가 적은 개념형 항목이라 고정 스펙보다 정의와 분류가 틀리지 않는지 먼저 맞춰봤다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
음성 입출력을 바꾸거나 개선할 때 쓰는 기법이야. 쉽게 말하면 음성을 텍스트나 음성으로 바꾸는 입출력 계층 역할을 한다고 보면 돼.
## 어떻게 작동하나
인식, 합성, 스트리밍 같은 오디오 파이프라인을 다룬다. 텍스트 LLM과 달리 지연 시간과 음질도 같이 봐. 그래서 이런 기법은 "무슨 모델이냐"보다 입력, 검색, 학습, 실행 흐름 중 어디에 개입하는지로 이해하는 편이 쉬워.
## 왜 중요한가
콜센터, 회의록, 음성 비서처럼 사람의 말이 직접 들어오는 제품에서 바로 쓰인다. 같은 모델도 어떤 기법을 붙이느냐에 따라 정확도, 비용, 지연이 크게 달라져.
## 관련 용어
- [Multimodal AI](/ko/wiki/multimodal/) — 음성 입출력 맥락을 같이 이해하게 해 준다.
- [Whisper](/ko/wiki/whisper/) — 음성 입출력 맥락을 같이 이해하게 해 준다.
- [Speech to Text](/ko/wiki/speech-to-text/) — 음성 입출력 맥락을 같이 이해하게 해 준다.