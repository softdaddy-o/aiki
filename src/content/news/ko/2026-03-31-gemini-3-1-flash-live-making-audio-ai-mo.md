---
title: "Gemini 3.1 Flash Live, 오디오 AI를 더 자연스럽고 빠르게 만든다"
date: "2026-03-31T12:00:00+09:00"
lang: ko
category: news
summary: "Google이 실시간 음성 대화용 모델 Gemini 3.1 Flash Live를 공개했다. 더 낮은 지연과 개선된 음성 이해, 그리고 오디오 벤치마크 리더보드 선두가 핵심이야."
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-live/"
sourceTitle: "blog.google"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 65
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-live/"
      title: "blog.google"
    - url: "https://developers.openai.com/tracks/ai-application-development/"
      title: "Secondary source"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
tags: ["gemini", "memory"]
---

Google이 [Gemini 3.1 Flash Live](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-live/)를 공개했어. 한 줄로 요약하면, 실시간 음성 대화에 맞춘 Gemini의 최신 오디오 모델이야.

핵심은 세 가지야. 첫째, 지연을 더 낮춰서 대화 리듬이 자연스러워졌고. 둘째, 톤과 억양을 더 잘 읽어서 음성 인터페이스가 덜 기계적으로 들린다고 해. 셋째, 복잡한 음성 작업에서 점수가 꽤 좋게 나왔어. Google 설명 기준으로 ComplexFuncBench Audio에서 `90.8%`, Scale AI Audio MultiChallenge에서는 `36.1%`를 기록했어.

배포 경로도 넓어. 개발자는 Gemini Live API와 Google AI Studio에서 프리뷰로 접근할 수 있고, 기업은 Gemini Enterprise for Customer Experience에 붙일 수 있어. 일반 사용자 쪽도 Search Live와 Gemini Live로 이어지니까, 이건 연구 발표가 아니라 실제 제품 라인업 확장이야.

이 뉴스가 중요한 이유는 음성 AI 경쟁의 축이 “말을 할 수 있느냐”에서 “실시간으로 얼마나 자연스럽고 믿을 만하게 반응하느냐”로 넘어가고 있어서야. 텍스트 모델 성능만 좋은 걸로는 부족하고, 지연·억양·잡음 환경 대응까지 같이 봐야 한다는 뜻이지.

Google은 모든 오디오에 워터마킹을 넣는다고도 밝혔어. 음성 생성 품질을 올리면서 동시에 합성 오디오 표식까지 챙기겠다는 방향이야. 앞으로 음성 에이전트 경쟁은 모델 품질뿐 아니라 이런 안전장치 설계까지 같이 가게 될 가능성이 커 보여.
