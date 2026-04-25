---
title: "Qwen3.6-35B-A3B, SWE-bench Verified 73.4점으로 로컬 코딩 판도 바꿨다"
date: "2026-04-18T10:00:00+09:00"
lang: ko
category: news
summary: "알리바바 Qwen3.6-35B-A3B가 SWE-bench Verified 73.4점, Terminal-Bench 2.0 51.5점을 기록하며 공개됐다. 3B 활성 파라미터 MoE로 RTX 3090 한 장에 돌리면서 Gemma 4-31B의 52.0점을 20점 가까이 앞섰다."
readerValue: "로컬 코딩 에이전트 모델을 올 2분기에 어느 쪽으로 세팅할지 판단하게 해준다"
sourceUrl: "https://pandaily.com/alibaba-open-sources-qwen3-6-35-b-a3-b-with-just-3-b-active-parameters-targeting-top-tier-agent-coding"
sourceTitle: "Pandaily"
draft: false
score: 100
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-18"
  sources:
    - url: "https://pandaily.com/alibaba-open-sources-qwen3-6-35-b-a3-b-with-just-3-b-active-parameters-targeting-top-tier-agent-coding"
      title: "Pandaily — Qwen3.6 공개 보도"
    - url: "https://officechai.com/ai/qwen3-6-35b-a3b-benchmarks/"
      title: "Officechai — 벤치마크 비교"
    - url: "https://www.buildfastwithai.com/blogs/qwen3-6-35b-a3b-review"
      title: "BuildFastWithAI — SWE-bench 73.4"
    - url: "https://simonwillison.net/2026/Apr/16/qwen-beats-opus/"
      title: "Simon Willison — Qwen beats Opus"
  checks:
    - type: source_match
      result: pass
      summary: "Pandaily, Officechai, BuildFastWithAI 세 소스에서 모델 스펙을 확인했어"
      items:
        - "35B total / 3B active, Apache 2.0 오픈 웨이트 — Pandaily + Officechai 확인"
        - "2026-04-16 공개 — Pandaily + Officechai 일치"
        - "로컬 추론 가능, RTX 3090에서 실행 가능 — Simon Willison 실기 테스트 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "공식 발표 외 3개 독립 매체에서 수치를 교차 확인했어"
      items:
        - "SWE-bench Verified 73.4 — BuildFastWithAI + Officechai"
        - "Terminal-Bench 2.0 51.5 vs Gemma 4-31B 42.9 — Officechai 확인"
        - "MCPMark 37.0 vs Gemma 4-31B 18.1 — Officechai 확인"
    - type: number_verify
      result: pass
      summary: "핵심 벤치마크 수치를 공식·독립 소스 기준으로 맞췄어"
      items:
        - "SWE-bench Verified: Qwen3.6 73.4 vs Gemma 4-31B 52.0"
        - "Terminal-Bench 2.0: 51.5 vs 42.9"
        - "MCPMark: 37.0 vs 18.1, GPQA Diamond 86.0, AIME 2026 92.7"
    - type: adversarial
      result: pass
      summary: "벤치마크 체리피킹 가능성과 라이선스 변수를 점검했어"
      items:
        - "알리바바가 선택한 비교 대상(Gemma 4-31B)이 Qwen 유리 쪽으로 편향 가능성"
        - "Claude Opus 4.7, GPT-5.4 등 프론티어 클로즈드 모델과의 직접 비교는 수치가 제한적"
        - "최근 Qwen3.6 관련 라이선스·의존 프로젝트 충돌(커뮤니티 보고) 흐름 있음"
      findings:
        - "공개 수치는 대부분 Qwen 팀 벤치마크 기반 — 써드파티 독립 재현은 일부 태스크만"
        - "Gemma 4-31B와 비교는 우호적, Opus/GPT-5.4 대비는 부분적"
tags: ["qwen", "open-source", "mixture-of-experts", "swe-bench", "agentic-coding"]
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
formatVersion: 2
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
  contentHash: "803a323bd814e5f0"
  reviewedAt: "2026-04-25T09:56:00Z"
---
## 무슨 일이 있었나

알리바바 [Qwen](/ko/wiki/qwen/) 팀이 [Qwen3.6-35B-A3B](https://pandaily.com/alibaba-open-sources-qwen3-6-35-b-a3-b-with-just-3-b-active-parameters-targeting-top-tier-agent-coding)를 [Apache 2.0](/ko/wiki/apache/)로 공개했다. 이름이 길어서 헷갈리는데, 포인트는 35B 전체 파라미터 중 한 번에 3B만 켜지는 [Sparse MoE(희소 혼합 전문가)](https://aiki.softdaddy-o.com/wiki/mixture-of-experts) 구조라는 거야. 35B급 모델을 3B급 연산 비용으로 돌리는 설계거든.

[벤치마크 수치](https://officechai.com/ai/qwen3-6-35b-a3b-benchmarks/)가 꽤 직관적이야. SWE-bench Verified에서 73.4점, [Gemma 4](/ko/wiki/gemma-4/)-31B의 52.0점을 20점 가까이 앞섰고, Terminal-Bench 2.0에서 51.5 vs 42.9, 툴 사용 [벤치마크](/ko/wiki/benchmark/) MCPMark에서는 37.0 vs 18.1로 두 배 넘게 벌렸어. [추론](/ko/wiki/inference/) 쪽도 GPQA Diamond 86.0, AIME 2026 92.7, HMMT Feb 2026 83.6이라 수학·과학 문제에서 프론티어급에 근접한다.

## 왜 중요할까

현장 리액션이 더 재밌어. Simon Willison은 자기 [블로그](https://simonwillison.net/2026/Apr/16/qwen-beats-opus/)에 "Qwen3.6이 [Claude Opus 4.7](/ko/wiki/claude-opus-4-7/)보다 펠리컨을 더 잘 그렸다"고 적었고, [LocalLLaMA](/ko/wiki/localllama/) 커뮤니티에서도 하루 만에 가장 많이 돌려본 모델이 됐어. 3B 활성 파라미터를 bfloat16으로 돌리면 약 6GB 수준이라, RTX 3090 24GB 한 장으로도 충분히 돌릴 수 있다는 게 실사용 포인트고.

## 앞으로 볼 점

한 가지 짚어둘 건 — 비교 대상으로 선택된 [Gemma 4](/ko/wiki/gemma-4/)-31B 쪽이 [Qwen](/ko/wiki/qwen/)에 유리한 설정일 수 있다는 점이야. [Opus 4.7](/ko/wiki/claude-opus-4-7/)이나 GPT-5.4 같은 클로즈드 프론티어와의 직접 수치 비교는 아직 부분적이거든. 그래도 [Apache 2.0](/ko/wiki/apache/)에 262K 컨텍스트, 실기 벤치마크까지 합치면 로컬 코딩 [에이전트](/ko/wiki/agent/) 세팅은 지금 분명히 Qwen3.6 쪽으로 기울어 있어.
