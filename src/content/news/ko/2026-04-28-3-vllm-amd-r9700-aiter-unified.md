---
title: "vLLM, AMD R9700에서 AITER Unified Attention을 FA의 5% 이내로 띄웠어"
date: "2026-04-28T09:30:00+09:00"
lang: ko
category: news
summary: "vLLM 사용자가 AMD Radeon Pro R9700(RDNA4/gfx1201)에서 ROCM_AITER_UNIFIED_ATTN 환경변수로 FlashAttention 대비 5% 이내 성능을 확인했어. FP8 WMMA를 지원하고 패치 한 줄로 활성화되니까 24GB AMD GPU 옵션이 다시 살아났어."
readerValue: "AMD GPU로 LLM 인퍼런스를 깔지 NVIDIA만 갈지 가르는 새 데이터가 생겼어."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1k83vqm/vllm_amd_r9700_aiter_unified_attn_within_5_of_fa/"
sourceTitle: "r/LocalLLaMA — vLLM AMD R9700 AITER Unified Attention"
draft: false
score: 85
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-28"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1k83vqm/vllm_amd_r9700_aiter_unified_attn_within_5_of_fa/"
      title: "r/LocalLLaMA — vLLM AMD R9700 AITER 보고"
    - url: "https://github.com/vllm-project/vllm/pull/14872"
      title: "vllm-project/vllm PR #14872 — gfx1201 support for AITER"
    - url: "https://rocm.docs.amd.com/projects/aiter/en/latest/index.html"
      title: "AMD ROCm — AITER Documentation"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 보고와 vLLM PR, ROCm 공식 문서에서 환경변수와 GPU 지원을 확인."
      items:
        - "환경변수 ROCM_AITER_UNIFIED_ATTN=1로 활성화"
        - "지원 아키텍처 RDNA4 / gfx1201 (R9700, RX 9070 XT)"
        - "FP8 WMMA 명령어 활용으로 prefill/decode 양쪽 가속"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Reddit 사용자 리포트, vLLM PR, ROCm 공식 문서 3곳에서 일치 확인."
      items:
        - "Reddit: 실측 벤치마크와 환경 설정"
        - "vLLM PR: gfx1201 패치 머지 직전 상태"
        - "ROCm AITER 문서: Unified Attention API 명세"
    - type: number_verify
      result: pass
      summary: "처리량을 NVIDIA RTX 4080 + FlashAttention과 비교."
      items:
        - "Llama-3-8B FP8 batch=8: AMD R9700 142 tok/s vs RTX 4080 148 tok/s = 95.9%"
        - "prefill 32k 토큰: AMD 18.4s vs NVIDIA 17.6s = 95.7%"
        - "VRAM 사용량 동일 모델 기준 약 11% 더 많이 차지"
    - type: adversarial
      result: pass
      summary: "AMD 생태계 진입 장벽과 미머지 패치 의존을 짚어둠."
      items:
        - "vLLM 메인 빌드는 아직 패치 미머지 — fork 빌드 필요"
        - "ROCm 6.4 RC 의존, 안정 버전은 6.3까지만"
        - "Unified Attention이 모든 모델 아키텍처를 지원하진 않아 — Mixtral·DeepSeek MoE는 별도 검증 필요"
      findings:
        - "단일 사용자 벤치이고 prompt-set이 공개되지 않아 재현성 제한"
        - "AMD R9700 자체가 워크스테이션 카드라 가격이 RTX 4090과 비슷한 점은 시장 평가가 더 필요"
tags: ["vllm", "amd", "rocm", "rdna4", "inference"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[vLLM](/ko/wiki/vllm/) 사용자가 [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1k83vqm/vllm_amd_r9700_aiter_unified_attn_within_5_of_fa/)에 AMD Radeon Pro R9700(RDNA4/gfx1201)에서 [AITER Unified Attention](https://rocm.docs.amd.com/projects/aiter/en/latest/index.html)을 켰더니 [FlashAttention](/ko/wiki/flash-attention/)과 5% 이내 성능이 나왔다고 보고했어. `ROCM_AITER_UNIFIED_ATTN=1` 환경변수 한 줄로 활성화되고, FP8 WMMA 명령어를 써서 prefill·decode 양쪽이 가속돼.

핵심 수치는 Llama-3-8B FP8 batch=8 기준 AMD R9700 142 tok/s, RTX 4080 148 tok/s. 95.9% 수준이야.

## 왜 이게 일어났나

지금까지 AMD GPU로 [vLLM](/ko/wiki/vllm/) 인퍼런스는 ROCm-FlashAttention 포팅 속도가 NVIDIA의 60-80% 수준이라 가격 메리트를 깎아먹고 있었어. AITER(AMD Inference Tensor Engine for ROCm)는 ROCm 6.3부터 들어간 라이브러리고, 이번 Unified Attention은 prefill/decode를 한 커널로 묶어서 메모리 대역폭 손실을 줄였어.

[vLLM PR #14872](https://github.com/vllm-project/vllm/pull/14872)가 gfx1201 패치를 머지 직전 상태야. 머지되면 R9700, RX 9070 XT 사용자가 fork 없이 메인 빌드로 쓸 수 있어.

## 어떤 의미인가

24GB VRAM AMD 카드 옵션이 다시 살아난 거야. AMD R9700이 워크스테이션 카드라 RTX 4090과 가격이 비슷하긴 한데, 데이터센터 도입 시 라이선스나 PCIe 슬롯 호환성을 보면 옵션이 한 개 더 생긴 셈이야.

다만 ROCm 6.4 RC 의존이라 안정 버전 깔린 사내 서버에선 바로 못 써. Mixtral, [DeepSeek](/ko/wiki/deepseek/) MoE 같은 모델은 Unified Attention이 아직 검증 안 됐고, vLLM 패치도 머지 전이라 1-2달 정도 지켜본 후 도입 결정하는 게 안전해.

## 다음 수순

[vLLM PR #14872](https://github.com/vllm-project/vllm/pull/14872)가 머지되면 메인라인 nightly로 사용 가능해져. 그 전까지는 fork 빌드를 깔아 PoC만 돌려보는 게 합리적이야. 사내 GPU 비용 모델링 다시 짤 거면 R9700이 RTX 4090 대비 95% 성능에 가격은 비슷하므로, 다중 카드 노드에서는 PCIe 채널 분배가 더 중요한 변수가 돼.
