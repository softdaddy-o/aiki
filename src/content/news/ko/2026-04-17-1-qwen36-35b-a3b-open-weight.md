---
title: "알리바바 Qwen3.6-35B-A3B 공개 — 3B만 켜서 코딩 51.5점"
date: "2026-04-17T09:00:00+09:00"
lang: ko
category: news
summary: "알리바바가 Qwen3.6-35B-A3B를 오픈 웨이트로 공개했다. 총 파라미터 35B이지만 한 번에 3B만 활성화하는 MoE 구조로, Terminal-Bench 2.0에서 51.5점을 기록해 Gemma 4-31B(42.9)를 넘었고 SWE-bench Pro에서도 49.5 대 35.7로 앞섰다."
readerValue: "로컬 코딩 에이전트 모델 선택 기준이 바뀌었는지 파악"
sourceUrl: "https://officechai.com/ai/qwen3-6-35b-a3b-benchmarks/"
sourceTitle: "Officechai"
draft: false
score: 100
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-17"
  sources:
    - url: "https://huggingface.co/Qwen/Qwen3.6-35B-A3B"
      title: "HuggingFace — Qwen3.6-35B-A3B"
    - url: "https://officechai.com/ai/qwen3-6-35b-a3b-benchmarks/"
      title: "Officechai — Qwen3.6 벤치마크"
    - url: "https://simonwillison.net/2026/Apr/16/qwen-beats-opus/"
      title: "Simon Willison 블로그"
  checks:
    - type: source_match
      result: pass
      summary: "35B/3B 파라미터, Apache 2.0, 262K 컨텍스트 — HuggingFace 공식 페이지에서 확인했어"
      items:
        - "35B total / 3B active (MoE) — HuggingFace Qwen3.6-35B-A3B 페이지 확인"
        - "Apache 2.0 라이선스 — HuggingFace 라이선스 탭 확인"
        - "컨텍스트 262,144 토큰, 최대 1,010,000 — HuggingFace model card 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "officechai.com, BenchLM, simonwillison.net 3곳에서 교차 확인했어"
      items:
        - "officechai.com: Terminal-Bench 2.0 + SWE-bench Pro 수치 확인"
        - "benchlm.ai: 독립 벤치마크 집계에서 51.5 / 42.9 일치"
        - "simonwillison.net: Qwen3.6이 Claude Opus 4.7보다 펠리컨 그림을 더 잘 그렸다는 테스트"
    - type: number_verify
      result: pass
      summary: "51.5 / 42.9 Terminal-Bench 2.0, 49.5 / 35.7 SWE-bench Pro — 모두 교차 확인됐어"
      items:
        - "Terminal-Bench 2.0: Qwen3.6 51.5 vs Gemma 4-31B 42.9 — officechai + benchlm.ai"
        - "SWE-bench Pro: Qwen3.6 49.5 vs Gemma 4-31B 35.7 — officechai 확인"
        - "262,144 토큰 컨텍스트 — HuggingFace 공식 확인"
    - type: adversarial
      result: pass
      summary: "RTX 3090 실행 가능성과 벤치마크 신뢰도를 검토했어"
      items:
        - "RTX 3090 실행: 3B 활성 파라미터 bfloat16 ≈ 6GB VRAM → RTX 3090 24GB로 가능 ✅"
        - "Simon Willison 클레임: simonwillison.net/2026/Apr/16/qwen-beats-opus/ 직접 확인 ✅"
      findings: []
tags: ["qwen", "mixture-of-experts", "open-source", "alibaba", "agentic-coding"]
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
  contentHash: "ecd021398c4cca79"
  reviewedAt: "2026-04-25T09:56:00Z"
---
## 무슨 일이 있었나

알리바바 [Qwen](/ko/wiki/qwen/) 팀이 Qwen3.6-35B-A3B를 오픈 웨이트로 공개했다. 이름에 숫자가 두 개 붙는 게 포인트인데 — 35B가 전체 파라미터, 3B가 추론할 때 실제로 켜지는 파라미터거든. [Sparse MoE(희소 혼합 전문가)](https://aiki.softdaddy-o.com/wiki/mixture-of-experts) 구조라서 35B짜리 모델을 3B 수준의 연산 비용으로 돌릴 수 있다는 얘기다.

성능 수치가 꽤 직관적으로 나왔어. [에이전트](/ko/wiki/agent/) 코딩 벤치마크인 Terminal-Bench 2.0에서 51.5점, [Google Gemma](/ko/wiki/gemma/) 4-31B의 42.9점보다 높다. [SWE-bench Pro](https://aiki.softdaddy-o.com/wiki/swe-bench)에서도 49.5 대 35.7이고. Simon Willison은 자기 블로그에 "Qwen3.6이 [Claude Opus 4.7](/ko/wiki/claude-opus-4-7/)보다 펠리컨을 더 잘 그렸다"고 적었고, [LocalLLaMA](/ko/wiki/localllama/) 커뮤니티에서도 빠르게 화제가 됐어.

## 왜 중요할까

컨텍스트 길이는 기본 262,144 토큰에 최대 100만 토큰까지 확장 가능하고, [Apache 2.0](/ko/wiki/apache/) 라이선스라 상업적으로도 자유롭게 쓸 수 있다. HuggingFace에 기본 버전과 FP8 퀀트 버전이 올라와 있고, [Ollama](/ko/wiki/ollama/)에서도 `ollama pull qwen3.6:35b-a3b`로 바로 받을 수 있어.

## 앞으로 볼 점

[로컬](/ko/wiki/local-llm/) 코딩 에이전트를 세팅하려는 사람한테는 지금 시점에서 가장 현실적인 선택지 중 하나가 됐어. 3B 활성 파라미터면 RTX 3090 한 장으로도 돌릴 수 있고, 코딩 성능은 [Gemma 4](/ko/wiki/gemma-4/)-31B를 넘는다는 게 포인트거든.
