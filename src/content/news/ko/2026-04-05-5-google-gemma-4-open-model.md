---
title: "Google Gemma 4 나왔어 — 오픈 모델 세계 3위, Apache 2.0 라이선스"
date: "2026-04-05T13:00:00+09:00"
lang: ko
category: news
summary: "Google DeepMind이 Gemini 3 기반 오픈 모델 Gemma 4를 Apache 2.0으로 공개했어. 31B Dense 모델이 Arena AI 텍스트 리더보드 오픈 모델 3위, MMLU Pro 85.2%, Codeforces ELO 2150을 기록했어."
readerValue: "이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하게 해준다."
sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/"
sourceTitle: "Google Blog"
draft: false
score: 70
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/"
      title: "Google Blog — Gemma 4 announcement"
    - url: "https://deepmind.google/models/gemma/gemma-4/"
      title: "Google DeepMind — Gemma 4 model page"
    - url: "https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/"
      title: "Google Developers Blog — Gemma 4 on edge"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 3
    - type: number_verify
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "벤치마크(MMLU Pro, Codeforces ELO)는 Google 자체 측정 — 독립 재현 결과 대기 중"
        - "'오픈 모델 3위'는 Arena AI 리더보드 기준 — 리더보드 순위는 투표 편향에 영향받음"
tags: ["google", "gemma-4", "open-model", "deepmind"]
---

Google DeepMind이 4월 2일 Gemma 4를 공개했어. Gemini 3이랑 같은 연구 기반으로 만든 오픈 웨이트 모델이고, [Apache 2.0 라이선스](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)로 배포돼. 모델은 E2B, E4B, 26B MoE, 31B Dense 4가지 크기로 나왔어.

성능 수치가 눈에 띄어. 31B Dense 모델은 Arena AI 텍스트 리더보드에서 오픈 모델 3위, MMLU Pro 85.2%, AIME 2026 89.2%를 기록했어. Codeforces ELO 2150으로 코딩 능력도 훨씬 큰 모델이랑 경쟁 가능한 수준이야. 26B MoE 모델도 리더보드 6위를 차지했고. Google 측은 "자기 크기의 20배 모델을 이기는" 효율성을 강조하고 있어.

근데 진짜 반응이 뜨거운 건 로컬 실행 쪽이야. 26B MoE 모델은 Mixture of Experts 구조 덕분에 16GB Mac에서 CPU 전용 모드로도 돌아가고, Raspberry Pi 5에서 Gemma 4 E4B를 실행한 사례도 나왔어. 4W 전력의 Rockchip NPU에서 llama.cpp 포크로 구동한 보고도 있고. 무겁고 비싼 클라우드 API 없이도 쓸 만한 성능의 AI를 로컬에서 돌리는 시대가 한 발짝 더 가까워졌어.
