---
title: "TranslateGemma-12B, 자막 번역에서 프론티어 LLM 5개를 이겼다 — 단 한 가지 함정"
date: "2026-04-15T09:30:00+09:00"
lang: ko
category: news
summary: "Alconost가 TranslateGemma-12B를 Gemini Flash Lite, DeepSeek V3.2, Claude Sonnet, GPT-5.4 등 5개 프론티어 모델과 자막 번역 벤치마크에서 비교했다. 자동 지표에선 TranslateGemma가 전 언어에서 승리했지만, 사람 QA에서는 다른 결과가 나왔다."
readerValue: "번역 업무에 소형 전문 모델과 범용 LLM 중 어떤 걸 써야 하는지 판단하게 해준다"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sl5k6d/we_benchmarked_translategemma12b_against_5/"
sourceTitle: "r/LocalLLaMA"
draft: false
score: 95
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-15"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1sl5k6d/we_benchmarked_translategemma12b_against_5/"
      title: "Reddit r/LocalLLaMA - TranslateGemma benchmark"
    - url: "https://arxiv.org/pdf/2601.09012"
      title: "TranslateGemma Technical Report (Google)"
    - url: "https://aicybr.com/blog/translategemma-guide"
      title: "AiCybr - TranslateGemma Guide"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 원문의 벤치마크 구조랑 기사 내용이 전부 맞아"
      items:
        - "6개 언어쌍 비교 — Reddit 원문에서 확인"
        - "5개 프론티어 모델 대상 — Reddit 원문 모델 목록 일치"
        - "자동 지표 1등 + 사람 QA에서 반전 — Reddit 원문 서사 일치"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Reddit, Google 논문, AiCybr 가이드 3곳에서 교차 확인했어"
      items:
        - "Google 논문: MetricX 3.60 (12B) vs 4.04 (27B baseline) 확인"
        - "AiCybr: WMT24++ 55개 언어쌍 벤치마크 수치 일치"
        - "Reddit: Alconost(번역 회사)의 자막 특화 벤치마크"
    - type: number_verify
      result: pass
      summary: "MetricX 점수를 Google 논문 원본이랑 대조해서 맞는지 확인했어"
      items:
        - "MetricX 3.60 (12B) — Google 논문 확인"
        - "MetricX 4.04 (27B baseline) — Google 논문 확인"
        - "55개 언어쌍 — Google 논문 확인"
    - type: adversarial
      result: pass
      summary: "벤치마크와 실사용 갭은 기사에서 이미 다뤘고, 출처 이해관계도 확인했어"
      items:
        - "Alconost가 번역 서비스 회사라 자체 벤치마크에 이해관계가 있는지 확인"
        - "사람 QA 결과에 구체적 수치가 있는지 확인"
        - "자동 지표에서 1등이라는 주장에 체리피킹이 있는지 확인"
      findings:
        - "Alconost는 번역 서비스 회사로 자체 벤치마크 이해관계 가능성 있음"
        - "사람 QA 결과의 구체적 수치는 Reddit 원문에 미공개 — 정성적 평가만 확인"
tags: ["translategemma", "translation", "benchmark", "google"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

번역 전문 회사 Alconost가 [TranslateGemma-12B를 프론티어 LLM 5개와 자막 번역에서 비교](https://www.reddit.com/r/LocalLLaMA/comments/1sl5k6d/we_benchmarked_translategemma12b_against_5/)했어. 대상은 [Gemini](/ko/wiki/gemini/) 3.1 Flash Lite, [DeepSeek](/ko/wiki/deepseek/) V3.2, [Claude Sonnet](/ko/wiki/claude-sonnet/) 4.6, GPT-5.4까지 — 쟁쟁한 라인업이야. 6개 언어쌍에서 자동 번역 지표(MetricX, COMET)를 돌렸더니 TranslateGemma가 전부 이겼거든.

그런데 여기서 반전이 있어. 사람 QA를 붙였더니 이야기가 달라진 거야. 자동 지표에서 1등이던 TranslateGemma가 실제 번역 품질에선 뉘앙스나 문맥 처리에서 약점을 보였다고 해. Google이 12B짜리로 [WMT24++ 벤치마크에서 MetricX 3.60](https://arxiv.org/pdf/2601.09012)을 찍으며 자기네 27B 모델(4.04)도 이긴 건 맞는데, [벤치마크](/ko/wiki/benchmark/) 점수와 실사용 품질 사이에 갭이 있다는 거야.

실무에서 가져갈 교훈은 명확해. [벤치마크](/ko/wiki/benchmark/) 1등이라고 바로 프로덕션에 넣지 말고, 사람 QA를 꼭 거치라는 거야. 특히 자막처럼 맥락 의존도가 높은 작업에서는 12B 전문 모델보다 범용 LLM이 더 나을 수 있거든. 비용 절감이 목적이라면 TranslateGemma를 초벌로 쓰고 사람이 교정하는 하이브리드가 현실적이야.
