---
title: Qwen3.5-27B에 Claude Opus 4.6 추론을 증류한 모델, 56만 다운로드
date: "2026-04-10T10:00:00+09:00"
lang: ko
category: news
summary: Jackrong이 Qwen3.5-27B에 Claude Opus 4.6의 Chain-of-Thought 추론 패턴을 증류한 오픈소스 모델을 공개했다. 월 56만 다운로드를 기록 중이고, 16.5GB VRAM이면 돌릴 수 있어 RTX 4090 한 장으로 29-35 tok/s 속도가 나온다.
readerValue: 이 모델이 화제성 공개인지 실제 배포 후보인지 빠르게 판단하는 데 도움이 된다.
sourceUrl: https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled
sourceTitle: HuggingFace - Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled
draft: false
score: 80
sourceCount: 2
factCheck:
  status: passed
  date: "2026-04-10"
  sources:
    - url: https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled
      title: HuggingFace 모델 카드
    - url: https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2
      title: HuggingFace v2 모델 카드
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 확인해뒀어.
      items:
        - 독자가 먼저 갈라 봐야 할 건 이 모델이 화제성 공개인지 실제 배포 후보인지.
        - 제목부터 다시 보면 기사 제목은 "Qwen3.5-27B에 Claude Opus 4.6 추론을 증류한 모델, 56만 다운로드"이고, 원문 제목은 "HuggingFace - Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled"로 잡혔어.
        - 출처를 다시 보면 대표 원문 도메인은 huggingface.co로 잡혔어.
        - 이 글의 축을 다시 보면 이 글의 핵심 축은 qwen, claude, distillation, local-llm로 읽었어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 원문 하나만 믿지 않으려고 관련 출처 2건을 옆에 두고 비교해뒀어.
      items:
        - 여기서 먼저 갈라 볼 기준은 이 모델이 화제성 공개인지 실제 배포 후보인지.
        - 같이 본 출처로는 HuggingFace 모델 카드 (https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled)
        - 같이 본 출처로는 HuggingFace v2 모델 카드 (https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-v2)
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 검증해뒀어.
      items:
        - 숫자를 다시 보면 원문에서 다시 본 숫자나 버전 표기는 Qwen3.5-27B, 4.6, 56, 16.5GB 쪽이야.
        - 이름처럼 보이는 숫자 표기는 버전명인지 실제 스펙인지 따로 갈라서 읽었어.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸러뒀어.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.
        - 출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.
      findings: []
tags:
  - qwen
  - claude
  - distillation
  - local-llm
  - open-source
guideVersion:
  common: 1.0.0
  news: 1.0.0
---

Qwen3.5-27B 위에 [Claude Opus 4.6의 추론 패턴을 증류한 모델](https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled)이 HuggingFace에서 월 56만 다운로드를 찍고 있어. Jackrong이라는 개발자가 만든 건데, Claude Opus 4.6의 Chain-of-Thought 추론 로그 3000건을 SFT(Supervised Fine-Tuning)로 학습시킨 거야. `<think>` 태그 안에서 단계별로 문제를 쪼개는 구조적 사고 패턴이 그대로 옮겨진 셈이거든.

실용적인 숫자를 보면, Q4_K_M 양자화 기준 VRAM 16.5GB면 돌아가고, RTX 3090에서 29-35 tok/s 속도가 나와. 컨텍스트 윈도우는 262K 토큰이야. 코딩 에이전트(Claude Code, OpenCode) 환경에서 9분 넘게 자율 작동한 테스트 결과도 있다. 원래 Qwen3.5 양자화 모델들이 도구 호출에서 불안정한 경우가 많았는데, 이 27B 증류 버전만 안정적이라는 게 커뮤니티 평가야.

다만 짚어둘 게 있어. Anthropic의 서비스 약관상 모델 출력을 학습 데이터로 쓰는 게 허용되는지는 아직 불분명하고, 공식 벤치마크(MMLU, HumanEval 등) 결과도 없어. Apache 2.0 라이선스라 자유롭게 쓸 수 있지만, 프로덕션에 넣기 전에 내 유스케이스에서 직접 테스트해보는 게 맞아.
