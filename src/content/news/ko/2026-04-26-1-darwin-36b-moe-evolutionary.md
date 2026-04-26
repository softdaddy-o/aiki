---
title: "Darwin-36B-Opus 등장 — 진화 알고리즘으로 만든 36B MoE 오픈모델"
date: "2026-04-26T09:00:00+09:00"
lang: ko
category: news
summary: "Darwin-36B-Opus는 공개 체크포인트 둘을 재조합한 36B MoE 오픈웨이트 모델이야. GPQA는 첫 시도 73.2%, 재시도 투표 포함 88.4%로 제작자 공개값이야. GGUF 변환본은 바로 시험해볼 수 있지만 Claude Opus distillation 출처는 상업 사용 전 약관 확인이 필요해."
readerValue: "로컬에서 새 오픈웨이트 모델을 테스트하려는 사용자라면 성능 수치, GGUF 변환본, 상업 사용 전 확인할 약관 리스크를 한 번에 볼 수 있어."
sourceUrl: "https://huggingface.co/FINAL-Bench/Darwin-36B-Opus"
sourceTitle: "Hugging Face — FINAL-Bench/Darwin-36B-Opus"
draft: false
score: 110
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://huggingface.co/FINAL-Bench/Darwin-36B-Opus"
      title: "Hugging Face — Darwin-36B-Opus 모델 카드"
    - url: "https://huggingface.co/bartowski/FINAL-Bench_Darwin-36B-Opus-GGUF"
      title: "bartowski GGUF 양자화 변환본"
    - url: "https://huggingface.co/hesamation/Qwen3.6-35B-A3B-Claude-4.6-Opus-Reasoning-Distilled"
      title: "Parent model — Claude Opus reasoning-distilled checkpoint"
    - url: "https://www.anthropic.com/legal/commercial-terms"
      title: "Anthropic Commercial Terms of Service"
  checks:
    - type: source_match
      result: pass
      summary: "Hugging Face 모델 카드와 parent 모델 카드의 핵심 표기를 대조했어"
      items:
        - "36B 총 파라미터 / 3B 활성 MoE — Hugging Face 모델 카드"
        - "Darwin V7 진화 엔진 — Hugging Face 모델 카드"
        - "Apache 2.0 라이선스 — Hugging Face 모델 카드"
        - "Pass 1 greedy 145/198 = 73.2%, Pass 2 stochastic retry 175/198 = 88.4% — Hugging Face 모델 카드"
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "Hugging Face 계열 카드와 Anthropic 약관으로 출처 기반 검증을 했어"
      items:
        - "Darwin 모델 카드: 36B 총/3B 활성 MoE, 262K 컨텍스트, Apache 2.0 표기 확인"
        - "GGUF 페이지: 동일 모델의 양자화 변환본 존재 확인"
        - "Parent 모델 카드: Claude Opus reasoning trajectories 기반 SFT 데이터셋 표기 확인"
        - "Anthropic Commercial Terms: 출력 사용과 경쟁 모델 학습 제한 조항 확인"
      findings:
        - "GPQA Diamond 88.4%는 Pass 2 stochastic retry 포함값이고, Pass 1 greedy는 73.2%야"
        - "262K 컨텍스트는 모델 카드 기준 self-reported 사양이고, 독립 재현 자료는 이 기사 기준으로 미확인"
        - "검증 강도는 독립 재현이 아니라 모델 카드·parent 카드·약관 대조 수준이야"
        - "Apache 2.0 표기와 별개로 Claude Opus distillation 데이터가 어떤 경로로 만들어졌는지에 따라 약관 검토가 필요"
    - type: number_verify
      result: pass
      summary: "GPQA 수치는 Pass 1과 Pass 2를 분리해 확인했어"
      items:
        - "GPQA Diamond Pass 1 greedy: 145/198, 73.2% — 모델 카드 기준 self-reported"
        - "GPQA Diamond Pass 2 stochastic retry: 175/198, 88.4% — 모델 카드 기준 self-reported"
        - "262K 컨텍스트 — 모델 카드 기준 self-reported"
        - "베이스: Qwen3.6-35B-A3B + Claude Opus distilled — 모델 카드"
      findings:
        - "88.4%를 단독 headline 수치로 읽으면 greedy baseline 73.2%와 retry-vote 조건이 가려져"
    - type: adversarial
      result: pass
      summary: "Apache 2.0 표기와 Claude Opus distillation 출처를 별도 리스크로 분리했어"
      items:
        - "모델 카드의 Apache 2.0 표기만으로 상업 사용 결론을 내리기 어렵고, distillation 데이터 출처와 사용 약관도 같이 봐야 해"
        - "진화 알고리즘으로 만든 모델은 조합 경로 해석이 상대적으로 어려움"
        - "벤치마크는 모델 제작자 자체 측정 — 독립 평가 미확인"
      findings:
        - "Apache 2.0 표기와 별개로 distillation 출처 모델의 약관도 함께 검토하는 게 맞음"
tags: ["open-weight", "moe", "qwen", "claude", "evolutionary"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
reviewStamp:
  panelVersion: "1.0.0"
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
  contentHash: "22e0132e433ab356"
  reviewedAt: "2026-04-26"
---
## 무슨 일이 일어났나

[Darwin-36B-Opus](https://huggingface.co/FINAL-Bench/Darwin-36B-Opus)가 [Hugging Face](/ko/wiki/hugging-face/)에 올라왔어. 36B 총 파라미터를 갖고 있지만 답변할 때는 약 3B만 쓰는 [MoE](/ko/wiki/mixture-of-experts/) 구조야. 모델 카드는 262K [긴 문맥](/ko/wiki/long-context/), [Apache 2.0](/ko/wiki/apache/) 표기, GPQA Diamond 결과를 앞세워.

GPQA 수치는 조건을 나눠 봐야 해. 첫 시도에서는 145/198 정답으로 73.2%였고, 틀린 문제를 다시 생성해 여러 답을 투표하고 동률이면 추가 투표한 뒤에는 175/198 정답으로 88.4%였어. 둘 다 제작자 공개값이라 독립 재현은 아직 따로 봐야 해.

## 왜 이게 일어났나

Darwin V7은 [Qwen](/ko/wiki/qwen/)3.6-35B-A3B와 [Claude](/ko/wiki/claude/) Opus [distillation](/ko/wiki/distillation/) 계열 체크포인트를 재조합했어. 처음부터 재학습하지 않고 [웨이트](/ko/wiki/weight/)를 조합해 새 후보를 찾는 방식이라 공개 속도는 빠르지만, parent 데이터 경로와 약관 확인은 더 중요해져.

## 어떤 의미인가

로컬 실행 관점에서는 [GGUF](/ko/wiki/gguf/) 변환본이 이미 올라온 점이 커. 바로 시험해볼 수 있지만, 실무나 상업 사용 전에는 [Apache 2.0](/ko/wiki/apache/) 표기만 보지 말고 parent 모델 카드와 [Anthropic](/ko/wiki/anthropic/) 약관까지 같이 확인해야 해. GPQA 88.4%도 재시도 투표 포함값으로 읽는 게 맞아.
