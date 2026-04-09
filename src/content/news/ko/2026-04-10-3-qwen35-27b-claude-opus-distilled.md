---
title: "Qwen3.5-27B에 Claude Opus 4.6 추론을 증류한 모델, 56만 다운로드"
date: "2026-04-10T10:00:00+09:00"
lang: ko
category: news
summary: "Jackrong이 Qwen3.5-27B에 Claude Opus 4.6의 Chain-of-Thought 추론 패턴을 증류한 오픈소스 모델을 공개했다. 월 56만 다운로드를 기록 중이고, 16.5GB VRAM이면 돌릴 수 있어 RTX 4090 한 장으로 29-35 tok/s 속도가 나온다."
readerValue: "로컬 환경에서 Claude급 추론 품질을 쓸 수 있는지 판단하게 해준다"
sourceUrl: "https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled"
sourceTitle: "HuggingFace - Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled"
draft: false
score: 80
sourceCount: 2
factCheck:
  status: passed
  date: "2026-04-10"
  sources:
    - url: "https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled"
      title: "HuggingFace 모델 카드"
    - url: "https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2"
      title: "HuggingFace v2 모델 카드"
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제 HuggingFace 모델 카드 내용과 맞는지부터 먼저 맞춰봤다.
      items:
        - 28B 파라미터에 Qwen3.5-27B 베이스라는 건 모델 카드에서 바로 확인했어.
        - Claude Opus 4.6 CoT 증류라는 건 학습 데이터셋(nohurry/Opus-4.6-Reasoning-3000x-filtered)에서 확인했어.
        - Apache 2.0 라이선스도 모델 카드 메타데이터에 적혀 있었어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: v1이랑 v2 모델 카드, Ollama 레지스트리를 옆에 두고 다시 봤다.
      items:
        - 262K 컨텍스트 윈도우 — v1, v2 모델 카드 양쪽에서 같은 수치였어.
        - Q4_K_M 양자화 시 16.5GB VRAM — 모델 카드 README에서 확인했어.
        - 월 56만 다운로드 — HuggingFace 다운로드 카운터에서 직접 봤어.
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 VRAM 수치랑 속도는 따로 떼어서 한 번 더 봤다.
      items:
        - 16.5GB VRAM (Q4_K_M) — 모델 카드 README에 명시돼 있었어.
        - 29-35 tok/s — RTX 3090 테스트 결과로 모델 카드에 기록돼 있었어.
        - 262K 컨텍스트 — 모델 카드 스펙에서 확인한 수치야.
    - type: adversarial
      result: pass
      summary: 독자가 너무 기대하기 쉬운 지점을 따로 의심해보고 걸렀다.
      items:
        - 증류가 Anthropic의 허가를 받았는지 불분명해서 ToS 리스크가 있을 수 있어.
        - 커뮤니티 벤치마크만 있고 MMLU 같은 표준 벤치마크 결과는 아직 없었어.
        - 27B 모델만 안정적이라는 건 제작자 주장이고 체계적 비교는 부족했어.
      findings:
        - "Anthropic ToS상 모델 출력을 학습 데이터로 쓰는 게 허용되는지 확인이 필요해"
        - "커뮤니티 테스트 결과만 있어서 다양한 태스크에서의 일반화 성능은 미확인"
tags:
  - qwen
  - claude
  - distillation
  - local-llm
  - open-source
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

Qwen3.5-27B 위에 [Claude Opus 4.6의 추론 패턴을 증류한 모델](https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled)이 HuggingFace에서 월 56만 다운로드를 찍고 있어. Jackrong이라는 개발자가 만든 건데, Claude Opus 4.6의 Chain-of-Thought 추론 로그 3000건을 SFT(Supervised Fine-Tuning)로 학습시킨 거야. `<think>` 태그 안에서 단계별로 문제를 쪼개는 구조적 사고 패턴이 그대로 옮겨진 셈이거든.

실용적인 숫자를 보면, Q4_K_M 양자화 기준 VRAM 16.5GB면 돌아가고, RTX 3090에서 29-35 tok/s 속도가 나와. 컨텍스트 윈도우는 262K 토큰이야. 코딩 에이전트(Claude Code, OpenCode) 환경에서 9분 넘게 자율 작동한 테스트 결과도 있다. 원래 Qwen3.5 양자화 모델들이 도구 호출에서 불안정한 경우가 많았는데, 이 27B 증류 버전만 안정적이라는 게 커뮤니티 평가야.

다만 짚어둘 게 있어. Anthropic의 서비스 약관상 모델 출력을 학습 데이터로 쓰는 게 허용되는지는 아직 불분명하고, 공식 벤치마크(MMLU, HumanEval 등) 결과도 없어. Apache 2.0 라이선스라 자유롭게 쓸 수 있지만, 프로덕션에 넣기 전에 내 유스케이스에서 직접 테스트해보는 게 맞아.
