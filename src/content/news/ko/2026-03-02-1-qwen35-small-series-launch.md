---
title: "알리바바 Qwen 3.5 스몰 시리즈 출시 — 9B가 120B를 이겼다"
date: "2026-03-02T12:00:00+09:00"
lang: ko
category: news
summary: "알리바바 Qwen 팀이 0.8B·2B·4B·9B 네 가지 소형 모델을 Apache 2.0 오픈소스로 공개했어. Qwen3.5-9B는 GPQA Diamond에서 81.7점을 기록해 13.5배 더 큰 GPT-OSS-120B(71.5점)를 앞질렀고, 멀티모달 학습을 처음부터 통합해 온디바이스 추론도 가능한 수준이야."
sourceUrl: "https://huggingface.co/Qwen/Qwen3.5-9B"
sourceTitle: "Hugging Face — Qwen"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 80
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://www.marktechpost.com/2026/03/02/alibaba-just-released-qwen-3-5-small-models-a-family-of-0-8b-to-9b-parameters-built-for-on-device-applications/"
      title: "MarkTechPost — Alibaba Qwen 3.5 Small Models"
    - url: "https://stable-learn.com/en/qwen35-native-multimodal-agent-model/"
      title: "StableLearn — Qwen3.5 Full Coverage"
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
      findings: []
tags: ["qwen", "alibaba", "open-source", "small-model", "benchmark", "multimodal"]
---

알리바바 Qwen 팀이 2026년 3월 2일, Qwen3.5 스몰 시리즈 네 모델(0.8B·2B·4B·9B)을 Apache 2.0 라이선스로 한꺼번에 공개했어. 온디바이스 추론과 로컬 실행을 겨냥한 라인업인데, 숫자부터 좀 충격적이야.

Qwen3.5-9B가 GPQA Diamond(대학원 수준 과학 문제 벤치마크)에서 81.7점을 받아서 GPT-OSS-120B의 71.5점을 넘어섰거든. 파라미터 수가 13.5배 차이 나는데 오히려 더 높은 점수야. MMLU-Pro(82.5 vs 80.8)랑 멀티링구얼 MMMLU(81.2 vs 78.2)에서도 마찬가지 결과가 나왔어.

아키텍처 쪽에서는 멀티모달을 나중에 붙이는 방식이 아니라 처음부터 텍스트·이미지·비디오 토큰을 같이 학습시켰어. 그래서 경량 VL 모델에서 흔히 보이는 성능 저하 없이 멀티모달 추론이 되는 거야. 게다가 Gated Delta Networks + sparse MoE 구조를 쓰는 덕에 모델 크기 대비 효율이 꽤 높게 나왔어.

오픈소스라서 Hugging Face에서 바로 받을 수 있고, unsloth GGUF 버전도 같은 날 올라왔어. 9B면 RTX 3080 정도면 충분히 돌아가는 수준이라 로컬 세팅 장벽이 낮은 편이야.
