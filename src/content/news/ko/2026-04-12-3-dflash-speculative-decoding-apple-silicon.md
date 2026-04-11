---
title: "DFlash, Apple Silicon에서 Qwen3.5-9B를 85 tok/s로 돌린다 — 3.3배 가속"
date: "2026-04-12T11:00:00+09:00"
lang: ko
category: news
summary: "DFlash 추론 가속 기법이 Apple Silicon MLX에서 구현됐다. M5 Max 64GB 환경에서 Qwen3.5-9B가 기존 26 tok/s에서 85 tok/s로 3.3배 빨라졌고, 4B 모델은 2048 토큰 생성 시 133 tok/s까지 올라간다. 소형 드래프트 모델이 16토큰을 병렬 생성하고 타겟 모델이 한 번에 검증하는 방식이다."
readerValue: "Mac으로 로컬 LLM을 돌리는 사람이라면 추론 속도를 3배 올릴 수 있는 방법이 생겼다는 것"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1simszl/dflash_speculative_decoding_on_apple_silicon_85/"
sourceTitle: "r/LocalLLaMA"
draft: false
score: 100
sourceCount: 2
factCheck:
  status: passed
  date: "2026-04-12"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1simszl/dflash_speculative_decoding_on_apple_silicon_85/"
      title: "r/LocalLLaMA — DFlash speculative decoding on Apple Silicon"
    - url: "https://arxiv.org/abs/2602.06036"
      title: "arXiv — DFlash 논문"
  checks:
    - type: source_match
      result: pass
      summary: "원 게시물의 벤치마크 수치를 본문 기준으로 비교해뒀어."
      items:
        - "Qwen3.5-9B: 85 tok/s vs 26 tok/s baseline = 3.3x — 원문 표 일치 ✅"
        - "Qwen3.5-4B: 133 tok/s (2048 tokens) vs 42 tok/s = 3.2x — 원문 표 일치 ✅"
        - "M5 Max 64GB, MLX, no CUDA — 환경 조건 일치 ✅"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "Reddit 게시물과 arXiv 논문을 교차 확인해뒀어."
      items:
        - "DFlash 논문 arXiv:2602.06036 존재 확인 ✅"
        - "block diffusion 16토큰 병렬 생성 방식 — 논문과 Reddit 설명 일치 ✅"
    - type: number_verify
      result: pass
      summary: "벤치마크 수치를 원문 테이블 기준으로 검증해뒀어."
      items:
        - "85 tok/s (9B, 1024 tokens) — 원문 ✅"
        - "133 tok/s (4B, 2048 tokens) — 원문 ✅"
        - "16토큰 병렬 생성 — 원문 'generates 16 tokens in parallel' ✅"
    - type: adversarial
      result: pass
      summary: "벤치마크 한계를 정리해뒀어."
      items:
        - "단일 하드웨어(M5 Max) 결과 — 다른 환경에서 재현성 미확인"
        - "아직 공개 repo 없음 — 직접 테스트 불가 상태 명시"
      findings:
        - "greedy exact argmax match로 출력 품질은 동일하다고 주장하나, 독립 검증은 아직 없음"
tags: ["로컬llm", "apple-silicon", "추론가속", "mlx", "speculative-decoding"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

Apple Silicon에서 로컬 LLM 추론 속도를 3배 이상 올리는 [DFlash 구현체가 공개됐어](https://www.reddit.com/r/LocalLLaMA/comments/1simszl/dflash_speculative_decoding_on_apple_silicon_85/). M5 Max 64GB에서 Qwen3.5-9B 기준, 기존 26 tok/s가 85 tok/s로 올라갔어. 3.3배 가속이야.

원리는 speculative decoding의 변형인데, 소형 드래프트 모델이 [block diffusion 방식](https://arxiv.org/abs/2602.06036)으로 16개 토큰을 한 번에 병렬 생성하고, 타겟 모델이 1회 forward pass로 전부 검증해. 출력은 baseline과 bit-for-bit 동일하다고 하니까 품질 저하는 없다는 거지. Qwen3.5-4B에서는 2048 토큰 생성 시 133 tok/s까지 나왔어 — 모델이 작을수록 드래프트-검증 밸런스가 좋아져서 긴 생성에서 오히려 빨라지는 패턴이야.

아직 공개 repo는 없고 MLX 전용이라 CUDA 환경에서는 안 돼. 그래도 Mac으로 로컬 LLM 돌리는 사람한테는 속도 병목을 크게 줄일 수 있는 방법이 생긴 거야. llama.cpp 쪽 구현을 기다리는 커뮤니티 반응도 뜨거워.
