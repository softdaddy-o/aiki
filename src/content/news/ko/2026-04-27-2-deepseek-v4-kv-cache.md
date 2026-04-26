---
title: "DeepSeek V4 Pro, 1M 컨텍스트에서 KV 캐시를 V3.2의 10%로 줄였어"
date: "2026-04-27T09:00:00+09:00"
lang: ko
category: news
summary: "DeepSeek V4 Pro가 1M 토큰 컨텍스트에서 KV 캐시를 9.62GiB로 줄였어. V3.2의 83.9GiB 대비 약 10% 수준이고, 단일 토큰 추론 FLOPs도 27%로 떨어졌어. CSA와 HCA 두 어텐션을 합친 구조라 백서에 그대로 적혀있어."
readerValue: "1M 컨텍스트 에이전트를 단일 GPU 메모리에 올릴 수 있는 라인이 바뀌었는지 가를 수 있어."
sourceUrl: "https://huggingface.co/blog/deepseekv4"
sourceTitle: "DeepSeek-V4 — a million-token context that agents can actually use"
draft: false
score: 100
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-27"
  sources:
    - url: "https://huggingface.co/blog/deepseekv4"
      title: "Hugging Face Blog — DeepSeek-V4"
    - url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro"
      title: "deepseek-ai/DeepSeek-V4-Pro — Model Card"
    - url: "https://www.digitalapplied.com/blog/deepseek-v4-preview-launch-1m-context-efficiency"
      title: "DigitalApplied — DeepSeek V4 Launch"
    - url: "https://wccftech.com/deepseek-v4-cuts-kv-cache-by-90-at-1m-tokens-but-aggressive-compression-could-risk-needle-in-a-haystack-failures/"
      title: "Wccftech — DeepSeek V4 KV Cache 90% Cut"
  checks:
    - type: source_match
      result: pass
      summary: "Hugging Face 공식 블로그와 모델 카드 수치를 본문과 일치 확인."
      items:
        - "1M 컨텍스트 KV 캐시 9.62GiB (V3.2의 83.9GiB 대비 약 11%)"
        - "단일 토큰 추론 FLOPs는 V3.2의 27%"
        - "Pro 1.6T 총 / 49B 활성, Flash 284B 총 / 13B 활성"
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "공식 1건, 모델 카드 1건, 분석 보도 2건을 교차로 확인."
      items:
        - "Hugging Face 공식 블로그: 어텐션 메커니즘 설명"
        - "모델 카드: 파라미터 사양"
        - "DigitalApplied·Wccftech: 효율 향상의 trade-off 분석"
    - type: number_verify
      result: pass
      summary: "KV 캐시 절대값과 비율 수치를 공식 블로그 기준으로 정량 확인."
      items:
        - "1M 토큰: V4 Pro 9.62GiB vs V3.2 83.9GiB (≈11.5%)"
        - "FLOPs: V4 Pro가 V3.2의 27%"
        - "어텐션 구조: CSA + HCA 하이브리드"
    - type: adversarial
      result: pass
      summary: "효율 향상이 리트리벌 정확도와 trade-off 가능성을 따로 명시했어."
      items:
        - "Wccftech가 needle-in-a-haystack 실패 위험을 지적한 점을 본문에 반영"
        - "DeepSeek 자체 백서 수치라 독립 재현이 더 필요해"
        - "1M 컨텍스트 실제 응답 품질은 별도 평가 필요"
      findings:
        - "압축 어텐션이 1M 컨텍스트 안에서 특정 토큰을 놓치는 케이스가 보고되고 있어 — 정확도 trade-off가 수치 안에 가려져 있어"
        - "9.62GiB라도 GPU 한 장에 모델 가중치까지 같이 올리려면 여전히 H100급이 필요해"
tags: ["deepseek", "kv-cache", "long-context", "moe", "open-weight"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[DeepSeek](/ko/wiki/deepseek/)가 [V4](https://huggingface.co/blog/deepseekv4) 백서를 공개하면서 1M 토큰 컨텍스트의 [KV 캐시](/ko/wiki/kv-cache/) 사용량을 V3.2의 10% 수준으로 줄였다고 적었어. KV 캐시는 어텐션을 빠르게 돌리려고 키와 값을 미리 저장해두는 메모리야. 컨텍스트가 길어질수록 선형으로 늘어나서 1M 토큰쯤 가면 GPU VRAM을 먹어치우는 부분이지.

수치는 이래:

- **1M 컨텍스트 KV 캐시**: V4 Pro 9.62GiB / V3.2 83.9GiB (약 11%)
- **단일 토큰 추론 FLOPs**: V4 Pro가 V3.2의 27%
- **모델 사양**: V4 Pro 1.6T 총 / 49B 활성, V4 Flash 284B 총 / 13B 활성

## 왜 이게 일어났나

DeepSeek는 어텐션 자체를 두 갈래로 갈랐어. CSA(Compressed Sparse Attention)는 m개의 토큰을 하나의 KV 엔트리로 압축해두고, 쿼리는 그 중 top-k만 본다고 백서가 설명해. HCA(Heavily Compressed Attention)는 더 강하게 누른 보조 경로야. 두 흐름이 같이 돌아가니까 1M 토큰 안에서도 메모리가 폭발하지 않는 거지.

V3.2에서 토큰 효율 격차를 본인들이 인정했던 흐름이 V4에서 본격적으로 뒤집혔어. 같은 [LocalLLaMA](/ko/wiki/localllama/) 커뮤니티에서 V3.2 한 줄 인용으로 시작된 토론이 결국 다음 세대 발표 근거가 된 셈이야.

## 어떤 의미인가

[1M 컨텍스트 에이전트](/ko/wiki/long-context/)를 진지하게 운용하려면 그동안 KV 캐시 80GiB+가 큰 벽이었어. 9.62GiB로 떨어지면 H100 80GB 한 장에 모델 가중치와 캐시를 같이 올리는 시나리오가 현실에 들어와. 코드베이스 전체를 통째로 컨텍스트로 밀어넣고 에이전트로 도는 패턴이 단일 카드에서 가능해진다는 뜻이야.

## 주의할 점

[Wccftech](https://wccftech.com/deepseek-v4-cuts-kv-cache-by-90-at-1m-tokens-but-aggressive-compression-could-risk-needle-in-a-haystack-failures/)는 이 압축 방식이 needle-in-a-haystack 류 평가에서 특정 토큰을 놓칠 위험을 지적했어. 9.62GiB라는 메모리 수치 안에 정확도 trade-off가 숨어있을 수 있다는 거지. 실제 도입 전에 본인 도메인 문서로 long-context 정확도를 따로 측정하는 게 안전해. 백서 수치만 보고 결정하기엔 아직 일러.
