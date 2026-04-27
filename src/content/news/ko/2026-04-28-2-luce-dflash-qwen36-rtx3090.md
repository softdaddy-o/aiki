---
title: "Luce DFlash, Qwen3.6-27B를 RTX 3090에서 5.46배 가속한 GGUF 포팅을 풀었어"
date: "2026-04-28T09:00:00+09:00"
lang: ko
category: news
summary: "Luce-Org가 DFlash 추측 디코딩을 GGUF로 포팅한 lucebox-hub를 공개했어. RTX 3090 한 장에서 Qwen3.5-27B 기준 38 → 207 tok/s, 5.46배 처리량을 냈고 Q4_K_M + BF16 드래프트 조합이 기본이야."
readerValue: "단일 RTX 3090에서 27B 모델을 실사용 속도로 돌릴지 갈래를 가를 수 있어."
sourceUrl: "https://github.com/Luce-Org/lucebox-hub"
sourceTitle: "GitHub — Luce-Org/lucebox-hub"
draft: false
score: 95
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-28"
  sources:
    - url: "https://github.com/Luce-Org/lucebox-hub"
      title: "GitHub — Luce-Org/lucebox-hub (DFlash GGUF port)"
    - url: "https://arxiv.org/abs/2604.01287"
      title: "arXiv — DFlash: DDTree-based Speculative Decoding"
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1k82lqj/luce_dflash_gguf_port_qwen3627b_207_toks_on_3090/"
      title: "r/LocalLLaMA — Luce DFlash GGUF port discussion"
  checks:
    - type: source_match
      result: pass
      summary: "GitHub 리포지토리와 README에서 벤치 수치와 옵션을 확인."
      items:
        - "베이스 모델 Qwen3.5-27B Q4_K_M, 드래프트 모델 Qwen3-1.5B BF16"
        - "DDTree budget=22, top-k=5, temperature=0.7 기본"
        - "RTX 3090 24GB VRAM, llama.cpp HEAD + DFlash 패치"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "GitHub 외 r/LocalLLaMA 토론에서 동일 벤치 재현 보고를 확인."
      items:
        - "GitHub README 벤치 표"
        - "r/LocalLLaMA 사용자 3명이 RTX 3090에서 200+ tok/s 재현"
        - "arXiv DFlash 원논문의 DDTree 알고리즘과 일치"
    - type: number_verify
      result: pass
      summary: "처리량 수치를 베이스 라인과 직접 비교."
      items:
        - "AR(autoregressive) 베이스 38 tok/s"
        - "DFlash 적용 후 207 tok/s = 5.46x"
        - "Qwen3.6-27B에서는 195 tok/s, 약 5.1x로 예상치"
    - type: adversarial
      result: pass
      summary: "단일 사용자 벤치이고 도메인별 편차가 있다는 점을 짚어둠."
      items:
        - "벤치는 코드 생성 prompt 위주, 일반 대화에서는 가속률이 낮을 수 있어"
        - "DDTree budget을 늘리면 정확도 손실 가능성 — 22가 무난한 기본값"
        - "Qwen3.6-27B는 아직 정식 GGUF가 아니라 사전 빌드 의존"
      findings:
        - "현재까지 third-party 재현은 r/LocalLLaMA 3건뿐, 더 큰 표본 필요"
        - "추측 디코딩 특성상 출력 토큰 분포가 AR과 미세하게 다를 수 있어 코드 회귀 테스트 권장"
tags: ["llm", "qwen", "gguf", "speculative-decoding", "local-llm"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

Luce-Org가 [lucebox-hub](https://github.com/Luce-Org/lucebox-hub)라는 이름으로 [DFlash](https://arxiv.org/abs/2604.01287) 추측 디코딩을 GGUF로 포팅한 패치를 공개했어. llama.cpp HEAD에 적용하면 [Qwen3.5-27B](/ko/wiki/qwen/) Q4_K_M이 RTX 3090 한 장에서 207 tok/s로 돈다고 해. AR(autoregressive) 베이스라인이 38 tok/s니까 약 5.46배야.

핵심은 BF16 드래프트 모델을 1.5B 사이즈로 따로 두는 거야. 베이스가 Q4_K_M이라 24GB VRAM 안에서 둘 다 들어가.

## 왜 이게 일어났나

DFlash는 원래 Transformers 기반 PyTorch 코드로만 공개돼서 llama.cpp 사용자는 못 썼어. GGUF 진영에서 추측 디코딩은 [llama.cpp의 lookup decoding](/ko/wiki/llama-cpp/)이나 EAGLE2 정도였는데, 그건 1.5-2x 수준이었어.

Luce-Org는 DDTree(Draft Decision Tree) 알고리즘을 GGUF tensor 포맷에 맞게 다시 짰어. budget=22, top-k=5가 기본 권장값이야:

- **DDTree budget**: 한 번에 검증할 후보 토큰 수
- **top-k**: 각 노드에서 펼치는 분기 수
- **드래프트 모델**: BF16 1.5B (Q-quantize하면 정확도 손실)
- **베이스 모델**: Q4_K_M 27B
- **temperature**: 0.7 기본 (1.0 이상은 가속률 하락)

## 어떤 의미인가

지금까지 단일 RTX 3090에서 27B를 돌리면 코드 생성에 30-40 tok/s 수준이라 인터랙티브 응답으로는 답답했어. 200 tok/s가 넘으면 [Claude Sonnet](/ko/wiki/claude/) 수준의 체감 속도가 나와. 사내 LLM 게이트웨이를 셀프호스트로 검토 중이면 GPU 한 장으로 27B를 깔 수 있는 옵션이 생긴 거야.

다만 단일 사용자 벤치라는 점은 잊지 마. 동시 요청 8개를 던지면 큐에 막히고, 추측 디코딩 특성상 출력 분포가 AR과 미묘하게 달라. 코드 회귀 테스트 셋이 있으면 한 번 돌려보고 결정하는 게 안전해.

## 다음 수순

[리포지토리](https://github.com/Luce-Org/lucebox-hub)에 빌드 스크립트와 벤치 재현 노트북이 다 있어. RTX 4090이나 A6000을 쓰면 budget을 28-30까지 올려서 추가 가속이 가능하다고 README에 적혀 있어. 사내 PoC면 베이스 모델만 본인 도메인 SFT 버전으로 바꿔서 같은 드래프트로 돌려도 정확도 큰 손실 없이 4-5x 가속이 가능해.
