---
title: "Anthropic AI 에이전트, 정렬 연구에서 사람 연구원을 압도했다"
date: "2026-04-15T09:10:00+09:00"
lang: ko
category: news
summary: "Anthropic의 자율 AI 에이전트 9대가 weak-to-strong 정렬 문제를 5일 만에 PGR 0.97로 풀었다. 같은 문제에 사람 연구원 2명은 7일간 PGR 0.23에 머물렀고, 총 비용은 약 1만 8천 달러였다."
readerValue: "AI 에이전트가 연구 업무까지 대체 가능한 단계인지 판단하게 해준다"
sourceUrl: "https://alignment.anthropic.com/2026/automated-w2s-researcher/"
sourceTitle: "Anthropic Alignment"
draft: false
score: 110
sourceCount: 2
factCheck:
  status: passed
  date: "2026-04-15"
  sources:
    - url: "https://alignment.anthropic.com/2026/automated-w2s-researcher/"
      title: "Anthropic Alignment - Automated W2S Researcher"
    - url: "https://www.anthropic.com/research/measuring-agent-autonomy"
      title: "Anthropic - Measuring AI Agent Autonomy"
  checks:
    - type: source_match
      result: pass
      summary: "Anthropic alignment 공식 페이지에서 뽑은 수치랑 기사가 전부 맞아"
      items:
        - "PGR 0.97 (에이전트) vs 0.23 (사람) — 원문 일치"
        - "9대 병렬 에이전트, 5일, 800시간 — 원문 일치"
        - "비용 약 1만 8천 달러, 시간당 22달러 — 원문 일치"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "Anthropic 공식 페이지랑 Reddit singularity에서 같은 수치를 확인했어"
      items:
        - "Anthropic alignment 공식 페이지: 원본 연구 결과"
        - "Reddit r/singularity: 커뮤니티 논의에서 동일 수치 인용"
        - "Anthropic Fellows Program 소속 연구로 코드 공개 확인"
    - type: number_verify
      result: pass
      summary: "PGR 범위, 비용, 인원 수 전부 공식 소스에서 맞는지 대조했어"
      items:
        - "PGR 0~1 스케일 — 원문에서 정의 확인"
        - "사람 연구원 2명, 7일 — 원문 'Two authors' 확인"
        - "총 비용 ~$18,000, 시간당 ~$22 — 원문 일치"
    - type: adversarial
      result: pass
      summary: "Anthropic 자사 연구라서 특정 문제에 한정된 결론인지 확인했어"
      items:
        - "weak-to-strong라는 특정 문제에서만 나온 결과인지 확인"
        - "비교 대상 사람 연구원 규모가 적절한지 확인"
        - "비용 산정에 인프라 세팅 비용이 빠져있는지 확인"
      findings:
        - "weak-to-strong supervision이라는 특정 문제에서의 결과이며, 일반 연구 자동화로 확대 해석 주의"
        - "사람 연구원 2명은 '두 저자'로, 대규모 연구팀과의 비교가 아님"
        - "비용에 GPU 추론 비용만 포함 — 인프라 세팅, 감독 비용 미포함 가능성"
tags: ["anthropic", "ai-agent", "alignment", "weak-to-strong"]
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
  contentHash: "e81f768c0110a740"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

Anthropic이 [자율 AI 에이전트(AAR)로 정렬 연구를 자동화한 결과](https://alignment.anthropic.com/2026/automated-w2s-researcher/)를 공개했어. 핵심은 weak-to-strong supervision이라는 문제야 — 약한 모델의 감독만으로 더 강한 모델을 학습시킬 수 있는지를 다루는 건데, 이게 결국 사람이 자기보다 똑똑한 AI를 어떻게 통제하느냐와 직결되거든.

## 왜 중요할까

숫자가 강렬해. 사람 연구원 2명이 7일간 매달린 결과는 PGR(Performance Gap Recovered) 0.23이었어. 그런데 AI 에이전트 9대를 병렬로 돌렸더니 5일 만에 PGR 0.97을 찍었거든. 누적 800시간 작업에 비용은 약 1만 8천 달러, 시간당 22달러꼴이야. 에이전트들은 독립된 샌드박스에서 아이디어 제안부터 실험, 코드 공유까지 전부 자율적으로 돌렸어.

## 앞으로 볼 점

실무에서 의미 있는 건 "측정 가능한 목표가 있는 연구는 이미 자동화할 수 있다"는 결론이야. 물론 열린 문제나 창의적 연구와는 차이가 있지만, [벤치마크](/ko/wiki/benchmark/) 최적화나 하이퍼파라미터 탐색 같은 반복 작업이라면 사람보다 에이전트가 빠르고 싼 시대가 이미 온 거야.
