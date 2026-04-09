---
term: multimodal
title: "Multimodal AI"
lang: ko
summary: "Multimodal AI는 텍스트만이 아니라 이미지, 오디오, 비디오 같은 여러 입력과 출력을 함께 다루는 AI를 뜻해."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
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
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Multimodal AI"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "Multimodal learning (https://en.wikipedia.org/wiki/Multimodal_learning)"
        - "Gemini 3 — Google DeepMind (https://deepmind.google/technologies/gemini/)"
    - type: number_verify
      result: pass
      summary: "이 항목에서 같이 언급되는 숫자와 이름은 한 번 더 봤다."
      items:
        - "수치 대조: 3"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Multimodal AI는 서로 다른 형태의 데이터를 함께 이해하거나 생성할 수 있는 모델과 시스템을 말해.
## 어떻게 작동하나
예를 들어 사용자가 사진을 올리고 질문하면 모델이 이미지를 읽고 텍스트로 답하거나, 텍스트 지시를 받고 이미지를 생성하는 식이야. 최근에는 음성 입출력까지 같이 묶이는 경우도 많아.

중요한 건 "멀티모달"이 곧 모든 모달리티를 완벽하게 지원한다는 뜻은 아니라는 점이야. 어떤 모델은 이미지 입력만 되고, 어떤 모델은 음성 출력까지 돼. 그래서 실제 지원 범위를 항상 따로 봐야 해.
## 왜 중요한가
멀티모달이라는 말만 보면 다 비슷해 보이지만, 실제 제품 차이는 입력과 출력 범위에서 갈려. 이 개념을 알아야 "이미지 이해", "오디오 실시간", "비디오 생성" 같은 뉴스를 한 줄로 정리할 수 있어.
## 관련 용어
- [Vision-Language Model](/ko/wiki/vision-language-model/) — 멀티모달 생성·해석 흐름을 같이 볼 때 좋아.
- [Whisper](/ko/wiki/whisper/) — 음성 입출력 맥락을 같이 이해하게 해 준다.
- [Speech to Text](/ko/wiki/speech-to-text/) — 음성 입출력 맥락을 같이 이해하게 해 준다.
- [Text to Speech](/ko/wiki/text-to-speech/) — 음성 입출력 맥락을 같이 이해하게 해 준다.