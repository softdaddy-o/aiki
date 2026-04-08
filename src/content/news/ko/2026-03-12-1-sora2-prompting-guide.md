---
title: "OpenAI Cookbook ??, OpenAI가 Sora 2 API를 위한 공식 프롬프팅 가이드를 업데이트했어...."
date: "2026-03-12T12:00:00+09:00"
lang: ko
category: news
summary: "OpenAI가 Sora 2 API를 위한 공식 프롬프팅 가이드를 업데이트했어. 캐릭터 제어, 카메라 워크, API 파라미터 설정까지 실전 가이드를 담았고, 올바른 프롬프트 구조로 원하는 영상을 더 정확하게 뽑을 수 있어."
sourceUrl: "https://cookbook.openai.com/examples/sora/sora2_prompting_guide"
sourceTitle: "OpenAI Cookbook"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 75
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://cookbook.openai.com/examples/sora/sora2_prompting_guide"
      title: "OpenAI Cookbook — Sora 2 Prompting Guide"
  checks:
    - type: source_match
      result: pass
    - type: adversarial
      result: pass
      findings: []
tags: ["openai", "sora", "video-generation", "prompting"]
---

OpenAI가 [Sora 2 공식 프롬프팅 가이드](https://cookbook.openai.com/examples/sora/sora2_prompting_guide)를 업데이트했어. 최신 Sora API 기능을 반영한 버전이야.

핵심은 구조화된 프롬프트야. 좋은 프롬프트는 네 파트로 나뉘어: **장면 설명**(등장인물, 의상, 배경) → **카메라 워크**(샷 유형, 심도, 렌즈/스타일) → **무드/조명** → **구체적 액션 순서**. 카메라 움직임은 한 샷당 하나로만 제한하고, 렌즈 이름(예: "50mm 표준렌즈")을 명시하면 더 정확하게 나와.

캐릭터 등장도 가능해. opt-in 방식이라 특정 인물(공인/창작 캐릭터)을 허가 받아 넣을 수 있고, 언제든 철회도 돼.

API로 영상을 뽑을 때 주의할 점이 있어: 해상도(최대 1080p), 영상 길이(4초·8초·12초 중 선택)는 텍스트 프롬프트로 바꿀 수 없고 API 파라미터로 직접 지정해야 해. 프롬프트에 "3초짜리"라고 써도 무시된다는 뜻이야. 카메라 움직임 지시어도 샷당 1개로 제한해야 제대로 반영돼.

영상 생성 AI를 처음 써본다면 이 가이드에서 출발하는 게 제일 빨라.
