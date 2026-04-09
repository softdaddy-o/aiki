---
title: Google Gemma 4 나왔어 — 오픈 모델 세계 3위, Apache 2.0 라이선스
date: "2026-04-05T13:00:00+09:00"
lang: ko
category: news
summary: Google DeepMind이 Gemini 3 기반 오픈 모델 Gemma 4를 Apache 2.0으로 공개했어. 31B Dense 모델이 Arena AI 텍스트 리더보드 오픈 모델 3위, MMLU Pro 85.2%, Codeforces ELO 2150을 기록했어.
readerValue: 이 모델이 화제성 공개인지 실제 배포 후보인지 빠르게 판단하게 해준다.
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
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 맞춰봤다.
      items:
        - "독자 문제 대조: 이 모델이 화제성 공개인지 실제 배포 후보인지 먼저 갈라 봐야 해."
        - "제목 대조: 기사 제목은 \"Google Gemma 4 나왔어 — 오픈 모델 세계 3위, Apache 2.0 라이선스\"이고, 원문 제목은 \"Google Blog\"로 잡혔어."
        - "출처 대조: 대표 원문 도메인은 blog.google로 잡혔어."
        - "태그 대조: 이 글의 핵심 축은 google, gemma-4, open-model, deepmind로 읽었어."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 원문 하나만 믿지 않으려고 관련 출처 3건을 옆에 두고 다시 봤다.
      items:
        - "비교 기준: 이 모델이 화제성 공개인지 실제 배포 후보인지 먼저 갈라 봐야 해."
        - "비교 출처 1: Google Blog — Gemma 4 announcement (https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)"
        - "비교 출처 2: Google DeepMind — Gemma 4 model page (https://deepmind.google/models/gemma/gemma-4/)"
        - "비교 출처 3: Google Developers Blog — Gemma 4 on edge (https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/)"
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 한 번 더 봤다.
      items:
        - "숫자 포인트: 원문에서 다시 본 숫자나 버전 표기는 4, 3, 2.0, 31B 쪽이야."
        - 이름처럼 보이는 숫자 표기는 버전명인지 실제 스펙인지 따로 갈라서 읽었어.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸렀다.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.
        - 출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.
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
