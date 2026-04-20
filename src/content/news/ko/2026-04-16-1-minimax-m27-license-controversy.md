---
title: "MiniMax, M2.7 모델 공개 후 라이선스를 비상업으로 바꿔 논란"
date: "2026-04-16T09:00:00+09:00"
lang: ko
category: news
summary: "MiniMax가 에이전트 특화 모델 M2.7의 가중치를 Hugging Face에 공개한 뒤, 라이선스를 비상업용으로 변경했다. SWE-Pro 56.22%, Terminal Bench 2 57.0%를 기록한 모델이지만, 상업적 사용에는 사전 서면 승인이 필요해져 스타트업과 추론 제공업체에 실질적 장벽이 생겼다."
readerValue: "오픈소스 라벨만 보고 M2.7을 프로덕션에 넣으려던 계획이 유효한지 빠르게 판단하게 해준다"
sourceUrl: "https://huggingface.co/MiniMaxAI/MiniMax-M2.7/commit/edf8030bc287b531e4c9af83df92f96489d910c0"
sourceTitle: "Hugging Face"
draft: false
score: 120
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-16"
  sources:
    - url: "https://huggingface.co/MiniMaxAI/MiniMax-M2.7/commit/edf8030bc287b531e4c9af83df92f96489d910c0"
      title: "Hugging Face - MiniMax M2.7 License Update Commit"
    - url: "https://www.marktechpost.com/2026/04/12/minimax-just-open-sourced-minimax-m2-7-a-self-evolving-agent-model-that-scores-56-22-on-swe-pro-and-57-0-on-terminal-bench-2/"
      title: "MarkTechPost - MiniMax M2.7 Open Source"
    - url: "https://huggingface.co/MiniMaxAI/MiniMax-M2.7/discussions/12"
      title: "Hugging Face - Community License Discussion"
  checks:
    - type: source_match
      result: pass
      summary: "HF 커밋 이력과 MiniMax 공식 블로그에서 벤치마크와 라이선스 변경 사실이 전부 맞아"
      items:
        - "SWE-Pro 56.22% — MarkTechPost, MiniMax 공식, NVIDIA NIM 문서에서 동일 수치 확인"
        - "Terminal Bench 2 57.0% — 동일 출처 3곳에서 일치"
        - "3월 18일 발표, 4월 12일 가중치 공개 — MiniMax 공식 뉴스에서 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "MarkTechPost, Let's Data Science, HF 토론방에서 라이선스 논란을 독립 확인했어"
      items:
        - "MarkTechPost: 벤치마크 수치와 MoE 아키텍처 설명 일치"
        - "Let's Data Science: 라이선스 비상업 변경 사실 보도"
        - "HF discussions/12: 커뮤니티 비판 내용 원문 확인"
    - type: number_verify
      result: pass
      summary: "SWE-Pro, Terminal Bench 2, self-evolving 100회 라운드 수치를 공식 소스에서 대조했어"
      items:
        - "SWE-Pro 56.22% — MiniMax 공식 모델 페이지에서 확인"
        - "SWE Multilingual 76.5% — MarkTechPost에서 확인"
        - "자가 진화 100회+ 라운드, 30% 성능 향상 — MiniMax 공식 뉴스에서 확인"
    - type: adversarial
      result: pass
      summary: "MiniMax 자체 벤치마크 수치라 독립 검증이 제한적인지 확인했어"
      items:
        - "SWE-Pro, Terminal Bench 2는 외부 벤치마크라 자사 편향 가능성 낮음"
        - "라이선스 변경 시점과 동기에 대한 MiniMax 측 공식 설명 부재"
        - "상업 사용 승인 절차의 구체적 조건이 공개되지 않은 상태"
      findings:
        - "MiniMax가 라이선스를 변경한 구체적 사유를 공개하지 않았음"
        - "파인튜닝 파생물과 생성 결과물에 대한 상업적 제한 범위가 불명확"
tags: ["minimax", "open-source", "license", "m2.7", "mixture-of-experts"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

MiniMax가 자사 최강 [에이전트](/ko/wiki/agent/) 모델 [MiniMax M2.7](https://huggingface.co/MiniMaxAI/MiniMax-M2.7/commit/edf8030bc287b531e4c9af83df92f96489d910c0)의 가중치를 [Hugging Face](/ko/wiki/hugging-face/)에 올린 뒤, 라이선스를 슬쩍 비상업용으로 바꿨어. 3월 18일 발표 당시 "오픈소스"라고 했는데, 정작 상업적 사용에는 사전 서면 승인이 필요하고 "Built with MiniMax M2.7" 표기까지 의무화했거든. 오픈소스가 아니라 source-available 라이선스인 셈이야.

성능 자체는 인상 깊어. [SWE-Pro](https://www.marktechpost.com/2026/04/12/minimax-just-open-sourced-minimax-m2-7-a-self-evolving-agent-model-that-scores-56-22-on-swe-pro-and-57-0-on-terminal-bench-2/) 56.22%, Terminal Bench 2 57.0%, SWE Multilingual 76.5%를 찍었고, [MoE](/ko/wiki/mixture-of-experts/) 아키텍처 덕분에 [추론](/ko/wiki/inference/) 비용도 낮은 편이야. 자체 최적화 라운드 100회 이상을 돌려 내부 [평가](/ko/wiki/eval/) 세트에서 30% 성능 향상을 달성한 "자가 진화(self-evolving)" 메커니즘도 독특하고.

문제는 커뮤니티 반응이야. [Hugging Face](/ko/wiki/hugging-face/) 토론방에서는 ["오픈소스라고 부르지 마라"](https://huggingface.co/MiniMaxAI/MiniMax-M2.7/discussions/12)는 비판이 바로 터졌어. 파인튜닝한 파생 모델이나 생성된 결과물에도 상업적 제한이 걸리는지가 불명확해서, 스타트업이나 [추론](/ko/wiki/inference/) API 제공업체 입장에서는 법적 리스크가 커. M2.7을 프로덕션에 넣으려면 라이선스 전문을 먼저 읽고, 상업 승인 절차를 확인하는 게 순서야.
