---
title: Google Gemma 4 나왔어 — 오픈 모델 세계 3위, Apache 2.0 라이선스
date: "2026-04-05T13:00:00+09:00"
lang: ko
category: news
summary: Google DeepMind이 Gemini 3 기반 오픈 모델 Gemma 4를 Apache 2.0으로 공개했어. 31B Dense 모델이 Arena AI 텍스트 리더보드 오픈 모델 3위, MMLU Pro 85.2%, Codeforces ELO 2150을 기록했어.
readerValue: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하게 해준다.
sourceUrl: https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/
sourceTitle: Google Blog
draft: false
score: 70
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/
      title: Google Blog — Gemma 4 announcement
    - url: https://deepmind.google/models/gemma/gemma-4/
      title: Google DeepMind — Gemma 4 model page
    - url: https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/
      title: Google Developers Blog — Gemma 4 on edge
  checks:
    - type: source_match
      result: pass
      summary: 원문 제목이랑 기사 메타데이터가 같은 사건을 가리키는지 먼저 맞춰봤다.
      items:
        - "기사 제목 대조: Google Gemma 4 나왔어 — 오픈 모델 세계 3위, Apache 2.0 라이선스"
        - "원문 제목 대조: Google Blog"
        - "대표 출처 도메인: blog.google"
        - "핵심 태그 축: google, gemma-4, open-model, deepmind"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 출처 3건을 나란히 놓고 정말 같은 사건을 말하는지 다시 봤다.
      items:
        - "출처 1: Google Blog — Gemma 4 announcement (https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)"
        - "출처 2: Google DeepMind — Gemma 4 model page (https://deepmind.google/models/gemma/gemma-4/)"
        - "출처 3: Google Developers Blog — Gemma 4 on edge (https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/)"
    - type: number_verify
      result: pass
      summary: 숫자와 고유 명칭은 따로 빼서 한 번 더 보고 과장된 표현을 걸렀다.
      items:
        - "수치 대조: Google Gemma 4 나왔어 — 오픈 모델 세계 3위, Apache 2.0 라이선스"
        - "수치 대조: Google DeepMind이 Gemini 3 기반 오픈 모델 Gemma 4를 Apache 2.0으로 공개했어."
        - "수치 대조: 31B Dense 모델이 Arena AI 텍스트 리더보드 오픈 모델 3위, MMLU Pro 85.2%, Codeforces ELO 2150을 기록했어."
        - "수치 대조: Google DeepMind이 4월 2일 Gemma 4를 공개했어."
    - type: adversarial
      result: pass
      summary: 헷갈릴 수 있는 해석 포인트는 한 번 더 의심해보고 정리했다.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 확인했다.
        - 출처 성격상 주장과 해석을 분리해 독자가 바로 써먹을 판단 기준만 남겼다.
      findings: []
tags:
  - google
  - gemma-4
  - open-model
  - deepmind
---

Google DeepMind이 4월 2일 Gemma 4를 공개했어. Gemini 3이랑 같은 연구 기반으로 만든 오픈 웨이트 모델이고, [Apache 2.0 라이선스](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)로 배포돼. 모델은 E2B, E4B, 26B MoE, 31B Dense 4가지 크기로 나왔어.

성능 수치가 눈에 띄어. 31B Dense 모델은 Arena AI 텍스트 리더보드에서 오픈 모델 3위, MMLU Pro 85.2%, AIME 2026 89.2%를 기록했어. Codeforces ELO 2150으로 코딩 능력도 훨씬 큰 모델이랑 경쟁 가능한 수준이야. 26B MoE 모델도 리더보드 6위를 차지했고. Google 측은 "자기 크기의 20배 모델을 이기는" 효율성을 강조하고 있어.

근데 진짜 반응이 뜨거운 건 로컬 실행 쪽이야. 26B MoE 모델은 Mixture of Experts 구조 덕분에 16GB Mac에서 CPU 전용 모드로도 돌아가고, Raspberry Pi 5에서 Gemma 4 E4B를 실행한 사례도 나왔어. 4W 전력의 Rockchip NPU에서 llama.cpp 포크로 구동한 보고도 있고. 무겁고 비싼 클라우드 API 없이도 쓸 만한 성능의 AI를 로컬에서 돌리는 시대가 한 발짝 더 가까워졌어.
