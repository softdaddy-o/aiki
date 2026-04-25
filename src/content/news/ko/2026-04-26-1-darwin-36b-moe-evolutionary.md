---
title: "Darwin-36B-Opus 등장 — 진화 알고리즘으로 만든 36B MoE 오픈모델"
date: "2026-04-26T09:00:00+09:00"
lang: ko
category: news
summary: "Darwin V7 진화 엔진이 두 개의 공개 모델을 교배해 만든 36B MoE 오픈웨이트 모델이 Hugging Face에 올라왔다. GPQA Diamond 88.4%, 262K 컨텍스트, Apache 2.0 라이선스로 공개됐다. 베이스 모델 둘이 합쳐져 새 모델이 되는 흐름이 점점 자연스러워지고 있다."
readerValue: "오픈웨이트 모델 풀에 또 하나가 추가됐어 — 진화 알고리즘으로 모델을 합성하는 방식이 어떤 결과를 내는지 직접 확인할 수 있어."
sourceUrl: "https://huggingface.co/FINAL-Bench/Darwin-36B-Opus"
sourceTitle: "Hugging Face — FINAL-Bench/Darwin-36B-Opus"
draft: false
score: 110
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://huggingface.co/FINAL-Bench/Darwin-36B-Opus"
      title: "Hugging Face — Darwin-36B-Opus 모델 카드"
    - url: "https://huggingface.co/bartowski/FINAL-Bench_Darwin-36B-Opus-GGUF"
      title: "bartowski GGUF 양자화 변환본"
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1svl1wr/finalbenchdarwin36bopus_hugging_face/"
      title: "r/LocalLLaMA 커뮤니티 토론"
  checks:
    - type: source_match
      result: pass
      summary: "Hugging Face 모델 카드와 r/LocalLLaMA 게시물의 수치 대조"
      items:
        - "36B 총 파라미터 / 3B 활성 MoE — Hugging Face 모델 카드"
        - "Darwin V7 진화 엔진 — Hugging Face 모델 카드"
        - "Apache 2.0 라이선스 — Hugging Face 모델 카드"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Hugging Face 본 모델, GGUF 변환본, Reddit 토론 3곳 일치"
      items:
        - "Hugging Face: 36B 총/3B 활성 MoE 명시"
        - "GGUF 페이지: 동일 모델의 양자화 변환본 존재"
        - "Reddit: 커뮤니티에서 다운로드·테스트 사례 보고"
    - type: number_verify
      result: pass
      summary: "벤치마크 점수와 컨텍스트 길이 모델 카드에서 직접 확인"
      items:
        - "GPQA Diamond 88.4% — 모델 카드 기재"
        - "262K 컨텍스트 — 모델 카드 기재"
        - "베이스: Qwen3.6-35B-A3B + Claude Opus distilled — 모델 카드"
    - type: adversarial
      result: pass
      summary: "진화 합성 모델은 베이스 모델의 라이선스·평가 한계를 그대로 물려받는 점 본문 반영"
      items:
        - "베이스 모델 라이선스가 Apache 2.0이지만 distillation 출처가 Claude Opus라는 점 — 상업 사용 시 약관 검토 필요"
        - "진화 알고리즘으로 만든 모델은 사람이 설계한 게 아니므로 동작 원리 분석이 어려움"
        - "벤치마크는 모델 제작자 자체 측정 — 독립 평가 미확인"
      findings:
        - "Apache 2.0 표기와 별개로 distillation 출처 모델의 약관도 함께 검토하는 게 맞음"
tags: ["open-weight", "moe", "qwen", "claude", "evolutionary"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[Darwin-36B-Opus](https://huggingface.co/FINAL-Bench/Darwin-36B-Opus)가 Hugging Face에 올라왔어. 36B 총 파라미터에 3B만 활성화되는 MoE 구조야. 흥미로운 부분은 사람이 처음부터 학습시킨 게 아니라, Darwin V7이라는 진화 엔진이 기존 공개 모델 두 개를 "교배"해서 만들었다는 점이야 — 베이스는 Qwen3.6-35B-A3B고, 추론 능력은 Claude Opus에서 distillation 했어.

## 왜 이게 일어났나

대형 모델을 처음부터 학습시키려면 GPU 비용이 막대해. 그래서 이미 공개된 좋은 모델들을 결합해서 새 모델을 만드는 방향이 작년부터 빠르게 늘고 있어. 진화 알고리즘은 사람이 일일이 설계 결정을 하지 않고, 후보 조합을 평가해서 좋은 쪽만 살리는 방식이야 — 사람의 직관에 안 맞는 조합도 발견할 수 있다는 게 장점이야.

## 어떤 의미인가

오픈웨이트 모델을 로컬에서 돌려보는 입장이라면 GPQA Diamond 88.4%, 262K [컨텍스트](/ko/wiki/long-context/), Apache 2.0이라는 조합이 매력적일 수 있어. 활성 파라미터가 3B밖에 안 되니까 실제 추론 비용도 작아. 다만 Claude Opus에서 distillation 됐다는 점 때문에 상업 사용 전 약관은 한 번 확인하는 게 안전해. bartowski가 [GGUF 변환본](https://huggingface.co/bartowski/FINAL-Bench_Darwin-36B-Opus-GGUF)을 이미 올려둬서 로컬 실행 진입장벽도 낮은 편이야.
