---
title: "구글, Gemini 스마트홈 기기에 '대화 연속' 기능 추가 — 매번 'Hey Google' 안 해도 돼"
date: "2026-04-23T09:40:00+09:00"
lang: ko
category: news
summary: "구글이 Gemini for Home에 Continued Conversation 기능을 추가했어. Gemini가 응답한 뒤 몇 초간 마이크가 활성 상태를 유지해서 웨이크 워드 없이 후속 질문을 이어갈 수 있어. 4월 21일부터 모든 지원 언어와 지역에 롤아웃 중이야."
sourceUrl: "https://blog.google/products-and-platforms/devices/how-to-use-gemini-continued-conversation/"
sourceTitle: "Google Blog"
draft: false
score: 100
sourceCount: 4
readerValue: "구글 스마트홈 기기 쓰는 사람이 매번 '헤이 구글'을 다시 불러야 하는 불편을 없애는 방법을 알 수 있어"
factCheck:
  status: passed
  date: "2026-04-23"
  sources:
    - url: "https://blog.google/products-and-platforms/devices/how-to-use-gemini-continued-conversation/"
      title: "Google Blog — Continued Conversation, now in Gemini for Home"
    - url: "https://9to5google.com/2026/04/21/gemini-home-continued-conversation/"
      title: "9to5Google — Gemini for Home adding Continued Conversation"
  checks:
    - type: source_match
      result: pass
      summary: "Google Blog에서 기능 작동 방식, 롤아웃 범위, 활성화 경로를 직접 확인했어."
      items:
        - "응답 후 마이크 짧게 열림 — Google Blog 원문"
        - "LED 맥동/점등으로 활성 상태 표시 — Google Blog 원문"
        - "활성화: Home Settings > Gemini for Home voice assistant > Continued Conversation — Google Blog 원문"
        - "모든 지원 언어/지역 롤아웃 — Google Blog 원문"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "9to5Google, Engadget, Droid-life 등 복수 매체에서 동일한 기능이 보도됐어."
      items:
        - "9to5Google: Gemini for Home adding Continued Conversation"
        - "Engadget: Google now lets you have full conversations with Gemini for Home"
        - "Droid-life: Gemini for Google Home Just Got Way More Contextual"
    - type: number_verify
      result: pass
      summary: "구체적 수치(초 단위)가 기사에 없어 — '몇 초간' 표현은 정성적 설명으로 쓴 거야."
      items:
        - "'몇 초간' — Google Blog가 정확한 초수를 공개하지 않음, 정성적 표현 사용 적절"
    - type: adversarial
      result: pass
      summary: "Side-Talk 감지 정확도 수치나 지원되지 않는 기기 목록은 기사에 없어."
      items:
        - "Side-Talk 감지: 정확도 수치 없음 — '더 잘 구분한다'는 정성적 주장"
        - "모든 Gemini for Home 기기가 지원하는지 여부 미확인"
      findings: []
tags: ["google", "gemini", "smart-home", "voice-assistant", "google-home"]
formatVersion: 2
guideVersion:
  common: "1.0.0"
  news: "2.1.0"
---

구글 스마트홈 기기를 쓰다 보면 매번 "Hey Google"을 다시 말해야 하는 게 은근히 번거로웠는데, 구글이 이 문제를 [Continued Conversation](https://blog.google/products-and-platforms/devices/how-to-use-gemini-continued-conversation/)으로 해결했어. 4월 21일부터 모든 지원 언어와 지역으로 롤아웃 중이야.

## 작동 방식: 응답 후 몇 초간 마이크가 계속 열려 있어

Gemini가 대답하고 나면 기기의 마이크가 짧게 더 열려 있어. 기기 LED가 계속 켜져 있거나 맥동하는 걸로 확인할 수 있어. 이 상태에서 "그럼 내일 날씨는?" 같은 후속 질문을 웨이크 워드 없이 바로 이어서 말하면 돼. Gemini가 이전 대화 맥락을 유지하고 있어서 주제가 연결된 질문이면 훨씬 자연스러운 대화가 가능해.

## 사이드토크 감지 개선, 가족 모두 사용 가능

부작용으로 걱정될 수 있는 건 다른 사람과 나누는 대화를 AI가 오해하고 반응하는 거야. 구글은 Side-Talk 감지를 개선해서 Gemini가 후속 질문과 옆 사람과의 사적인 대화를 구분할 수 있도록 했어. 가족 구성원과 방문객도 같은 기능을 쓸 수 있어.

활성화 방법은 홈 앱에서 Home Settings > Gemini for Home voice assistant > Continued Conversation으로 들어가면 돼. 스마트홈 음성 어시스턴트를 매일 쓰는 상황이라면, 웨이크 워드 반복 호출이 사라지는 게 생각보다 훨씬 편해질 거야.
