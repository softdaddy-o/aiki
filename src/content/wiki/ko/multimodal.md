---
term: multimodal
title: Multimodal AI(멀티모달 AI)
lang: ko
summary: >-
  Multimodal AI는 텍스트, 이미지, 음성, 영상처럼 다른 형식의 정보를 한 시스템 안에서 같이 받고 연결해 처리하는 AI를 뜻해.
  특정 제품명보다 입력과 출력 범위가 넓어진 변화를 설명하는 말에 더 가까워.
readerValue: >-
  텍스트 모델 뉴스인지, 입력과 출력 범위가 넓어진 변화인지 빠르게 가르는 데 도움돼. 그래서 제품 설명에서 실제로 뭐가 달라지는지 감이
  빨라져.
category: concept
aliases:
  - multimodal ai
relatedTerms:
  - vision-language-model
  - whisper
  - speech-to-text
  - text-to-speech
firstMentioned: '2023-03-14'
mentionCount: 11
draft: false
tags:
  - vision
  - audio
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Multimodal_learning'
      title: Multimodal learning
    - url: 'https://deepmind.google/technologies/gemini/'
      title: Gemini 3 — Google DeepMind
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 여러 형식을 연결해 처리한다는 핵심을 원문 기준으로 다시 맞춰봤어.
      items:
        - >-
          독자 문제 대조: 멀티모달을 그냥 입력 종류가 많다는 뜻으로만 읽기 쉬워서, 형식들을 하나의 작업 흐름으로 연결한다는 점을 첫
          문단에 넣었어.
        - 일반 개념 설명과 Gemini 계열 공식 문서에서 보이는 멀티모달 실사용 예시를 함께 반영했어.
        - 특정 제품명이 아니라 개념어라는 점이 드러나게 summary와 본문을 정리했어.
      findings:
        - 멀티모달은 제품보다 능력 범위를 설명하는 말로 읽는 게 더 정확해.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 일반 개념 정의와 실제 제품 문서를 붙여 보고 쓰임새를 다시 봤어.
      items:
        - '비교 기준: 멀티모달 학습 일반 정의와 Google Gemini 문서에서 보이는 텍스트·이미지·오디오 처리 사례를 대조했어.'
        - '개념 자체는 넓게 유지하되, 사진 이해와 음성 대화처럼 독자가 바로 떠올릴 수 있는 실사용 예시만 남겼어.'
        - 제품 하나의 홍보 문구로 흐르지 않게 특정 브랜드 이름은 설명 중심에서 한 발 뺐어.
      findings:
        - '멀티모달은 기술 개념이고, 각 제품은 그 개념을 서로 다른 범위로 구현해.'
    - type: number_verify
      result: pass
      sources: 1
      summary: 숫자보다 범위 구분이 핵심인 페이지라 정량 과장은 줄였어.
      items:
        - 지원 모달 수를 억지로 세지 않고 텍스트·이미지·음성·영상 같은 대표 축만 남겼어.
        - 토큰 한도나 벤치마크 점수처럼 개념 정의와 직접 관계없는 숫자는 넣지 않았어.
        - '실사용 예시는 기능 범주로 설명하고, 특정 제품 수치 경쟁으로 흐르지 않게 막았어.'
      findings:
        - 이 항목은 숫자보다 어디까지 입력·출력이 넓어졌는지가 더 중요해.
    - type: adversarial
      result: pass
      sources: 1
      summary: 멀티모달이라는 말만으로 모든 능력이 보장된다고 읽는 오해를 막았어.
      items:
        - 이미지 한 장 이해와 긴 영상 추적은 전혀 다른 난이도라는 점을 주의 문단에 넣었어.
        - 음성 지원이 있어도 단순 전사와 실시간 대화는 다르다는 점을 따로 적었어.
        - 모달 개수만 보고 성능이나 제품 완성도를 추정하지 말라는 경계도 남겼어.
      findings:
        - 멀티모달은 넓은 말이라 세부 지원 범위를 꼭 따져 봐야 해.
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
  contentHash: "3cb61e11bc31909e"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Multimodal AI는 텍스트, 이미지, 음성, 영상처럼 형식이 다른 정보를 한 시스템 안에서 함께 다루는 AI를 말해. 중요한 건 입력 종류가 많다는 사실만이 아니라, 그 여러 형식을 하나의 작업 흐름으로 연결해서 이해하거나 만들어 낸다는 점이야.
## 어떻게 작동하나
멀티모달 시스템은 서로 다른 입력을 모델이 계산할 수 있는 내부 표현으로 바꾼 뒤, 그 표현들 사이의 대응 관계를 맞춰 결과를 내. 그래서 사진을 보고 답하거나, 음성을 듣고 텍스트로 옮기고, 다시 음성으로 응답하거나, 텍스트 설명을 바탕으로 이미지를 만드는 식의 작업이 가능해져.
## 왜 중요한가
이 개념이 중요한 이유는 실제 제품이 할 수 있는 일이 입력과 출력 형식에 따라 크게 달라지기 때문이야. 텍스트만 다루는 모델과 이미지·음성·영상까지 다루는 모델은 자동화할 수 있는 업무 종류가 완전히 달라져서, 제품 설명에서 멀티모달이라는 말이 나오면 체감 변화의 크기를 가늠하는 단서가 돼.
## 주의해서 볼 점
멀티모달이라는 말은 너무 넓게 쓰여서 지원 범위를 자세히 안 보면 금방 과장처럼 들려. 이미지 한 장을 읽는 기능과 긴 영상을 따라가며 맥락을 유지하는 기능은 다르고, 음성을 받는다고 해도 단순 전사인지 실시간 대화인지도 또 따로 봐야 해.
## 관련 용어
- [vision-language-model](/ko/wiki/vision-language-model/): 이미지와 텍스트 결합에 집중한 하위 범주야. 멀티모달 AI의 한 갈래로 보면 감이 쉬워.
- [whisper](/ko/wiki/whisper/): 음성을 텍스트로 바꾸는 데 특화된 모델이야. 멀티모달 전체와 오디오 특화 모델을 구분하게 해 줘.
- [speech-to-text](/ko/wiki/speech-to-text/): 음성 입력을 문자로 바꾸는 기능 이름이야. 입력 한 축만 다루는 사례와 비교할 때 좋아.
- [text-to-speech](/ko/wiki/text-to-speech/): 텍스트를 음성으로 바꾸는 출력 기술이야. 멀티모달이 입력과 출력 둘 다 넓힐 수 있다는 점을 보여 줘.
