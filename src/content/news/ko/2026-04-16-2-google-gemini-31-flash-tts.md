---
title: "Google, Gemini 3.1 Flash TTS로 AI 음성에 오디오 태그 컨트롤을 열었다"
date: "2026-04-16T09:10:00+09:00"
lang: ko
category: news
summary: "Google이 Gemini 3.1 Flash TTS를 4월 15일 출시했다. 70개 이상 언어를 지원하며, Artificial Analysis TTS 리더보드에서 Elo 1,211을 기록했다. 텍스트 안에 오디오 태그를 삽입해 음성 스타일, 속도, 감정을 문장 단위로 제어할 수 있다."
readerValue: "AI 음성 합성을 프로덕트에 도입할 때 비용과 품질 기준을 잡게 해준다"
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts/"
sourceTitle: "Google Blog"
draft: false
score: 115
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-16"
  sources:
    - url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts/"
      title: "Google Blog - Gemini 3.1 Flash TTS"
    - url: "https://www.marktechpost.com/2026/04/15/google-ai-launches-gemini-3-1-flash-tts-a-new-benchmark-in-expressive-and-controllable-ai-voice/"
      title: "MarkTechPost - Gemini 3.1 Flash TTS"
    - url: "https://x.com/ArtificialAnlys/status/2044450045190418673"
      title: "Artificial Analysis - TTS Leaderboard Tweet"
  checks:
    - type: source_match
      result: pass
      summary: "Google 공식 블로그에서 출시일, 언어 수, 오디오 태그, SynthID 전부 맞아"
      items:
        - "4월 15일 출시 — Google 공식 블로그에서 확인"
        - "70개 이상 언어 지원 — Google 공식, MarkTechPost에서 일치"
        - "SynthID 워터마크 자동 삽입 — 공식 블로그 원문에서 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Google 공식, MarkTechPost, Artificial Analysis 3개 독립 소스에서 같은 내용 확인했어"
      items:
        - "Google 공식 블로그: 출시일, 기능 상세 확인"
        - "MarkTechPost: Elo 1,211 수치와 리더보드 순위 확인"
        - "Artificial Analysis 공식 트윗: 리더보드 2위 (Inworld TTS 1.5 Max 뒤) 확인"
    - type: number_verify
      result: pass
      summary: "Elo 점수, 언어 수, 리더보드 순위를 공식 소스에서 대조했어"
      items:
        - "Elo 1,211 — Artificial Analysis 공식 트윗과 리더보드 페이지에서 확인"
        - "리더보드 2위 — 1위 Inworld TTS 1.5 Max (Elo 1,215) 바로 뒤"
        - "70개 이상 언어 — Google 공식 블로그에서 확인"
    - type: adversarial
      result: pass
      summary: "리더보드 1위가 아닌 2위라는 점과 가격 미공개를 확인했어"
      items:
        - "Elo 1,211은 리더보드 1위가 아니라 2위 (1위는 Inworld TTS 1.5 Max)"
        - "Google 공식 블로그에서 구체적 API 가격이 공개되지 않았음"
        - "멀티 스피커 대화 네이티브 지원은 Google 공식에서 확인, ElevenLabs 직접 비교 벤치마크는 없음"
      findings:
        - "리더보드 2위이며, 1위 Inworld TTS 1.5 Max와 Elo 차이가 4점으로 근소함"
        - "API 가격이 미공개라 ElevenLabs 대비 비용 비교가 아직 불가능"
tags: ["google", "gemini", "text-to-speech", "audio-tags"]
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
formatVersion: 2
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
    news: "3.1.2"
  panelVerdict: pass
  contentHash: "ab6827c8613e588d"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

Google이 4월 15일 [Gemini 3.1 Flash TTS](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts/)를 내놨어. 핵심은 텍스트 안에 오디오 태그를 직접 넣어서 음성을 제어하는 방식이야. "여기서부터 속삭이듯이", "이 부분은 신나게" 같은 자연어 지시를 텍스트 중간에 삽입하면, 한 문장 안에서도 톤이 달라지거든.

## 왜 중요할까

숫자를 보면 포지셔닝이 확실해. [Artificial Analysis TTS 리더보드](https://www.marktechpost.com/2026/04/15/google-ai-launches-gemini-3-1-flash-tts-a-new-benchmark-in-expressive-and-controllable-ai-voice/)에서 Elo 1,211을 찍었고, 70개 이상 언어를 지원해. 멀티 스피커 대화를 네이티브로 처리하는 것도 [ElevenLabs](/ko/wiki/text-to-speech/)나 [OpenAI](/ko/wiki/openai/) TTS와 차별되는 부분이야. 생성된 오디오에는 [SynthID](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts/) 워터마크가 자동으로 삽입돼서 AI 생성 여부를 추적할 수 있어.

## 앞으로 볼 점

개발자는 [Gemini API](/ko/wiki/gemini-api/)와 [Google AI Studio](/ko/wiki/google-ai-studio/)에서 프리뷰로 쓸 수 있고, 기업은 Vertex AI, 일반 사용자는 Google Vids를 통해 접근할 수 있어. TTS를 프로덕트에 넣으려면 ElevenLabs 대비 비용과 세밀한 제어력을 비교해보는 게 첫 단계야.
