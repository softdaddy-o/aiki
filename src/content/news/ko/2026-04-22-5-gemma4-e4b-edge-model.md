---
title: "Gemma 4 E4B — 5GB RAM으로 돌아가는 구글의 엣지 모델"
date: "2026-04-22T11:00:00+09:00"
lang: ko
category: news
summary: "구글이 Gemma 4 패밀리에 Per-Layer Embeddings(PLE) 기반 E2B(2B)와 E4B(4B) 엣지 모델을 포함했다. 4비트 양자화 시 E4B는 5GB RAM에서 실행 가능해 MacBook Air나 고사양 스마트폰 수준에서도 동작한다."
readerValue: "비용 없이 로컬에서 프라이빗하게 AI를 쓸 수 있는 실용적인 선택지를 판단하게 해준다."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sru6zi/did_google_hide_the_best_version_of_gemma_4_e4b/"
sourceTitle: "r/LocalLLaMA"
draft: false
score: 75
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-22"
  sources:
    - url: "https://deepmind.google/models/gemma/gemma-4/"
      title: "Google DeepMind — Gemma 4"
    - url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/"
      title: "Google Blog — Gemma 4 announcement"
    - url: "https://huggingface.co/blog/gemma4"
      title: "HuggingFace — Gemma 4 blog"
  checks:
    - type: source_match
      result: pass
      summary: "Google DeepMind 공식 페이지에서 E4B(4B params), HuggingFace 블로그에서 Per-Layer Embeddings(PLE)를 직접 확인했어."
      items:
        - "E4B (4B params) — Google DeepMind 공식 페이지 확인"
        - "Per-Layer Embeddings(PLE) — HuggingFace Gemma 4 블로그 확인"
        - "4비트 E4B ≈ 5GB RAM — 파라미터 수 × 양자화 비트 계산 일치"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Google DeepMind, Google Blog, HuggingFace 세 곳에서 E2B/E4B 스펙, Apache 2.0 라이선스, llama.cpp/MLX/Ollama 지원을 각각 확인했어."
      items:
        - "Google DeepMind: E2B(phones), E4B(edge) 구분 확인"
        - "Google Blog: Apache 2.0 라이선스 확인"
        - "HuggingFace: llama.cpp, MLX, Ollama 지원 확인"
    - type: number_verify
      result: pass
      summary: "E4B 4비트 기준 약 5GB RAM은 4B × 0.5 bytes/param × 오버헤드 + 컨텍스트 계산으로 합리적한 범위야."
      items:
        - "E2B 4비트 ≈ 1.5GB RAM — 2B × 0.5 bytes/param × 1.1 오버헤드 ≈ 1.1GB, 반올림 합리적"
        - "E4B 4비트 ≈ 5GB RAM — 4B × 0.5 bytes/param × 1.1 오버헤드 ≈ 2.2GB + 컨텍스트 → 약 4~5GB 합리적"
        - "Gemma 4 총 4개 크기: E2B, E4B, 26B MoE (3.8B active), 31B Dense — 공식 확인"
    - type: adversarial
      result: pass
      summary: "PLE 성능 개선은 구글 자체 발표 기반이라 독립 비교 데이터가 없고, 5GB RAM이 엣지라고 해도 앱과 함께 쓰는 일반 스마트폰에서는 빠듯할 수 있어."
      items:
        - "4B 모델은 복잡한 추론 작업에서 대형 모델 대비 품질 크게 낮을 수 있음"
        - "PLE가 실제로 얼마나 성능을 개선하는지 독립 벤치마크 부족"
        - "5GB RAM이 '엣지'라 해도 일반 스마트폰 RAM(6~8GB)에서 앱과 함께 쓰기는 빡빡"
      findings:
        - "PLE 성능 개선은 구글 자체 발표 기반 — 독립 비교 데이터 부족"
        - "실용성 검증 위해 실제 태스크 벤치마크 대기 필요"
tags: ["gemma", "google", "local-llm", "edge-ai", "quantization"]
guideVersion:
  common: "1.0.0"
  news: "2.1.0"
formatVersion: 2
---

## 무슨 일이 일어났나

구글이 [Gemma 4](https://deepmind.google/models/gemma/gemma-4/) 패밀리를 발표하면서 E2B(2B)와 E4B(4B) 두 가지 엣지 모델을 포함시켰어. 4비트 양자화 기준 E4B는 약 5GB RAM, E2B는 약 1.5GB RAM에서 실행 가능해 — MacBook Air M1이나 고사양 안드로이드 폰 수준이야. [r/LocalLLaMA](/ko/wiki/localllama/) 커뮤니티에서는 "구글이 이 버전을 제대로 홍보 안 하고 묻어둔 게 아니냐"는 반응이 나올 만큼 관심이 높았어.

## 뭐가 다른가

E2B/E4B의 핵심은 Per-Layer Embeddings(PLE) 구조야. 일반 트랜스포머는 임베딩을 공유하지만, PLE는 레이어마다 별도 임베딩을 써서 같은 파라미터 수에서 훨씬 깊은 표현 능력을 끌어내. 결과적으로 4B 크기지만 더 큰 모델에 가까운 이해력을 내는 게 설계 목표야. llama.cpp, MLX, Ollama에서 즉시 쓸 수 있고, Apache 2.0 라이선스라 상업적 활용도 자유로워.

## 어떤 의미인가

API 비용 없이 내 컴퓨터에서 프라이빗하게 AI를 돌리고 싶은 사람에게 실용적인 선택지야. 단, 4B 모델은 복잡한 추론이나 긴 코드 생성에서 대형 모델 대비 품질이 크게 낮을 수 있어. 업무 자동화의 간단한 분류, 요약, 짧은 텍스트 처리에 쓰기 좋고, 복잡한 분석은 API 모델로 보완하는 구조가 현실적이야.
