---
term: multimodal
title: "Multimodal AI"
lang: ko
summary: "Multimodal AI는 텍스트만이 아니라 이미지, 오디오, 비디오 같은 여러 입력과 출력을 함께 다루는 AI를 뜻해."
readerValue: "텍스트 모델 뉴스가 아니라 입력과 출력 범위가 넓어진 변화인지 먼저 판단하게 해준다."
category: concept
aliases:
  - "multimodal ai"
relatedTerms:
  - vision-language-model
  - whisper
  - speech-to-text
  - text-to-speech
firstMentioned: "2023-03-14"
mentionCount: 11
draft: false
tags:
  - vision
  - audio
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Multimodal_learning"
      title: "Multimodal learning"
    - url: "https://deepmind.google/technologies/gemini/"
      title: "Gemini 3 — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 텍스트 모델 뉴스가 아니라 입력과 출력 범위가 넓어진 변화인지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자 문제 대조: 텍스트 모델 뉴스가 아니라 입력과 출력 범위가 넓어진 변화인지"
        - "용어명 대조: Multimodal AI"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 이미지 이해, 음성 처리, 비디오 입력 중 실제로 지원 범위가 어디까지인지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "비교 기준: 이미지 이해, 음성 처리, 비디오 입력 중 실제로 지원 범위가 어디까지인지"
        - "Multimodal learning (https://en.wikipedia.org/wiki/Multimodal_learning)"
        - "Gemini 3 — Google DeepMind (https://deepmind.google/technologies/gemini/)"
    - type: number_verify
      result: pass
      summary: "이 항목에서 이미지 이해, 음성 처리, 비디오 입력 중 실제로 지원 범위가 어디까지인지를 가를 때 필요한 숫자와 이름은 한 번 더 봤다."
      items:
        - "수치 대조: 3"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 텍스트 모델 뉴스가 아니라 입력과 출력 범위가 넓어진 변화인지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "오해 방지 기준: 이미지 이해, 음성 처리, 비디오 입력 중 실제로 지원 범위가 어디까지인지"
        - "정의와 역할보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈다."
      findings:
        - "멀티모달이라는 말만 보고 이미지, 음성, 비디오 지원이 전부 다 된다고 읽으면 실제 기능 범위를 과대평가하기 쉬워."
---
## 한 줄 정의
Multimodal AI는 서로 다른 형태의 데이터를 함께 이해하거나 생성할 수 있는 모델과 시스템을 말해.
## 어떻게 작동하나
예를 들어 사용자가 사진을 올리고 질문하면 모델이 이미지를 읽고 텍스트로 답하거나, 텍스트 지시를 받고 이미지를 생성하는 식이야. 최근에는 음성 입출력까지 같이 묶이는 경우도 많아.

중요한 건 "멀티모달"이 곧 모든 모달리티를 완벽하게 지원한다는 뜻은 아니라는 점이야. 어떤 모델은 이미지 입력만 되고, 어떤 모델은 음성 출력까지 돼. 그래서 실제 지원 범위를 항상 따로 봐야 해.
## 왜 중요한가
멀티모달이라는 말만 보면 다 비슷해 보이지만, 실제 제품 차이는 입력과 출력 범위에서 갈려. 이 개념을 알아야 "이미지 이해", "오디오 실시간", "비디오 생성" 같은 뉴스를 한 줄로 정리할 수 있어.
## 관련 용어
- [Vision-Language Model](/ko/wiki/vision-language-model/) — 이미지와 텍스트를 같이 다루는 축이 멀티모달 안에서 어디쯤인지 구분하게 해 준다.
- [Whisper](/ko/wiki/whisper/) — 오디오 이해가 멀티모달 전체와 같은 말은 아니라는 점을 비교하게 해 준다.
- [Speech to Text](/ko/wiki/speech-to-text/) — 음성 입력 처리만 필요한지, 더 넓은 멀티모달 시스템을 보는지 가르게 해 준다.
- [Text to Speech](/ko/wiki/text-to-speech/) — 음성 출력 계층이 멀티모달 전체와 어떻게 다른지 비교하게 해 준다.