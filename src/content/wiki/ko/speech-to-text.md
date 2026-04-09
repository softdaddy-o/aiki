---
term: speech-to-text
title: "Speech to Text"
lang: ko
summary: "음성 입출력을 개선하거나 연결하는 AI 기법이야. 결국 핵심은 음성 입력을 텍스트로 바꾸는 단계에서 정확도와 지연 중 어디가 병목인지를 풀 때 어느 레버를 건드릴지 정하는 데 있어."
readerValue: "음성 입력을 텍스트로 바꾸는 단계에서 정확도와 지연 중 어디가 병목인지 먼저 판단하게 해준다."
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
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Speech_recognition"
      title: "Speech recognition"
    - url: "https://platform.openai.com/docs/guides/speech-to-text"
      title: "https://platform.openai.com/docs/guides/speech-to-text"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 음성 입력을 텍스트로 바꾸는 단계에서 정확도와 지연 중 어디가 병목인지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자가 먼저 갈라 봐야 할 건 음성 입력을 텍스트로 바꾸는 단계에서 정확도와 지연 중 어디가 병목인지야."
        - "이름을 다시 보면 Speech to Text로 잡혀."
        - "분류를 다시 보면 기법로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 인식 정확도, 스트리밍 지연, 운영비 중 어디를 먼저 맞춰야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "여기서 먼저 갈라 볼 기준은 인식 정확도, 스트리밍 지연, 운영비 중 어디를 먼저 맞춰야 하는지야."
        - "같이 본 출처로는 Speech recognition (https://en.wikipedia.org/wiki/Speech_recognition)"
        - "같이 본 출처로는 https://platform.openai.com/docs/guides/speech-to-text (https://platform.openai.com/docs/guides/speech-to-text)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 인식 정확도, 스트리밍 지연, 운영비 중 어디를 먼저 맞춰야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 인식 정확도, 스트리밍 지연, 운영비 중 어디를 먼저 맞춰야 하는지야."
        - "이름부터 다시 보면 Speech to Text로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 음성 입력을 텍스트로 바꾸는 단계에서 정확도와 지연 중 어디가 병목인지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "헷갈리지 않으려면 인식 정확도, 스트리밍 지연, 운영비 중 어디를 먼저 맞춰야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "음성 기능 전체를 한 덩어리로 보면 인식과 합성의 병목이 어디서 갈리는지 놓치기 쉬워."
---
## 한 줄 정의
음성 입출력을 바꾸거나 개선할 때 쓰는 기법이야. 쉽게 말하면 음성을 텍스트나 음성으로 바꾸는 입출력 계층 역할을 한다고 보면 돼. 결국 음성 입력을 텍스트로 바꾸는 단계에서 정확도와 지연 중 어디가 병목인지를 풀 때 손대는 레버라고 보면 맞아.
## 어떻게 작동하나
인식, 합성, 스트리밍 같은 오디오 파이프라인을 다룬다. 텍스트 LLM과 달리 지연 시간과 음질도 같이 봐. 그래서 이런 기법은 "무슨 모델이냐"보다 인식 정확도, 스트리밍 지연, 운영비 중 어디를 먼저 맞춰야 하는지가 어느 단계에서 바뀌는지로 이해하는 편이 쉬워.
## 왜 중요한가
콜센터, 회의록, 음성 비서처럼 사람의 말이 직접 들어오는 제품에서 바로 쓰여. 결국 음성 입력을 텍스트로 바꾸는 단계에서 정확도와 지연 중 어디가 병목인지를 어떤 레버로 푸는지에 따라 정확도, 비용, 지연이 크게 달라져.
## 관련 용어
- [Whisper](/ko/wiki/whisper/) — 대표적인 음성 인식 모델이 실제로 어떤 품질 기준을 보여주는지 이어서 보게 해 준다.
- [Multimodal AI](/ko/wiki/multimodal/) — 음성 입력 처리 하나와 멀티모달 전체 시스템은 범위가 다르다는 점을 구분하게 해 준다.
- [Text to Speech](/ko/wiki/text-to-speech/) — 입력을 텍스트로 바꾸는 문제와 출력을 음성으로 만드는 문제를 분리해 보게 해 준다.