---
title: "Gemma 4 31B에 추론 가속 붙였더니 코드 생성 50% 빨라졌다"
date: "2026-04-13T09:30:00+09:00"
lang: ko
category: news
summary: "Gemma 4 E2B(4.65B)를 드래프트 모델로 쓴 추론 가속(speculative decoding) 벤치마크 결과가 나왔다. RTX 5090에서 평균 29%, 코드 생성은 50% 속도 향상을 보였다. Gemma 4 31B UD-Q4_K_XL(18.3GB) 기준이고, 로컬 LLM 커뮤니티에서 큰 반응을 얻었다."
readerValue: "로컬에서 Gemma 4를 돌릴 때 드래프트 모델로 속도를 얼마나 끌어올릴 수 있는지 판단하게 해준다"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sjct6a/speculative_decoding_works_great_for_gemma_4_31b/"
sourceTitle: "r/LocalLLaMA"
draft: false
score: 90
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1sjct6a/speculative_decoding_works_great_for_gemma_4_31b/"
      title: "r/LocalLLaMA — Speculative Decoding works great for Gemma 4 31B"
    - url: "https://huggingface.co/blog/lujangusface/tw-eagle3-gemma4"
      title: "HuggingFace — EAGLE3 Gemma 4 Draft Head (1.72x speedup)"
    - url: "https://ai.google.dev/gemma/docs/core/model_card_4"
      title: "Google — Gemma 4 Model Card"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 원문의 셋업과 벤치마크 수치를 기사와 비교해뒀어."
      items:
        - "RTX 5090 32GB, Windows 11, llama.cpp TurboQuant KV 캐시 포크 — 원문 일치 ✅"
        - "Gemma 4 31B UD-Q4_K_XL 18.3GB, E2B 3.0GB — 원문 일치 ✅"
        - "평균 29%, 코드 50% 속도 향상 — 원문 제목과 본문 일치 ✅"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "추론 가속 원리와 Gemma 4 스펙을 독립 소스에서 확인해뒀어."
      items:
        - "Gemma 4 31B가 Dense 모델이라 MoE의 추론 가속 문제를 피한다는 점 — 모델 카드 확인 ✅"
        - "EAGLE3 1.72x 비교 수치 — HuggingFace 블로그 확인 ✅"
        - "E2B 파라미터 수(2.3B effective) — Google 모델 카드 확인 ✅"
    - type: number_verify
      result: pass
      summary: "벤치마크 수치와 모델 스펙을 정량 확인해뒀어."
      items:
        - "29% 평균 속도 향상 — Reddit 원문 벤치마크 표 확인 ✅"
        - "50% 코드 생성 속도 향상 — 원문 제목에 명시 ✅"
        - "18.3GB(Q4_K_XL), 3.0GB(E2B) — 양자화 파일 크기로 합리적 ✅"
    - type: adversarial
      result: pass
      summary: "벤치마크 일반화 가능성을 비판적으로 검증해뒀어."
      items:
        - "RTX 5090은 최신 고가 GPU — 중저가 GPU에서 동일 비율은 미보장"
        - "개인 벤치마크(피어리뷰 아님) — 재현 가능성 명시 필요"
        - "TurboQuant KV 캐시 포크는 공식 llama.cpp가 아닌 커뮤니티 포크"
      findings:
        - "RTX 5090 기준 벤치마크라 RTX 4070~4090에서 동일 비율을 보장하지 않는다"
        - "TurboQuant는 커뮤니티 포크로, 공식 llama.cpp 대비 안정성 차이가 있을 수 있다"
tags: ["gemma", "speculative-decoding", "local-llm", "llama-cpp", "벤치마크"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
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
  contentHash: "aca6a556de356eba"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

Gemma 4 31B에 작은 모델 하나 붙였을 뿐인데, 코드 생성이 50% 빨라졌어. [r/LocalLLaMA](/ko/wiki/localllama/)에서 [공유된 벤치마크](https://www.reddit.com/r/LocalLLaMA/comments/1sjct6a/speculative_decoding_works_great_for_gemma_4_31b/)를 보면, Gemma 4 E2B(4.65B)를 드래프트 모델로 쓰는 [추론 가속](/ko/wiki/speculative-decoding/) 세팅에서 평균 29% 속도 향상이 나왔거든.

셋업은 RTX 5090(32GB VRAM), Windows 11, [llama.cpp](/ko/wiki/llama.cpp/) TurboQuant KV 캐시 포크 기반이야. 메인 모델은 Gemma 4 31B UD-Q4_K_XL(18.3GB), 드래프트 모델은 Gemma 4 E2B UD-Q4_K_XL(3.0GB)이고, 128K 컨텍스트로 돌렸어. 코드 생성 태스크에서 50%, 일반 텍스트에서도 20% 이상의 속도 개선이 나왔다고 해.

## 왜 중요할까

이게 주목받는 이유는 MoE 모델에서 추론 가속이 원래 까다롭기 때문이야. 드래프트 [토큰](/ko/wiki/token/) 검증 시 활성화되는 전문가(expert)들의 합집합을 로드해야 해서 [메모리](/ko/wiki/memory/) 대역폭이 폭증하거든. 그런데 Gemma 4 31B는 Dense 모델이라 이 문제를 비껴가는 거야. 별도로 [Thoughtworks가 만든 EAGLE3 드래프트 헤드](https://huggingface.co/blog/lujangusface/tw-eagle3-gemma4)는 1.72배 속도 향상을 달성했는데, 방식이 다르니 비교해볼 가치가 있어.

## 앞으로 볼 점

RTX 5090이 아닌 RTX 4070~4090급에서도 [양자화](/ko/wiki/quantization/) 조합에 따라 비슷한 비율의 개선을 기대할 수 있다는 게 커뮤니티 반응이야. [로컬](/ko/wiki/local-llm/) LLM을 쓰고 있다면 드래프트 모델 세팅 한번 해볼 타이밍이야.
