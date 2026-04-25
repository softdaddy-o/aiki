---
title: "구글, 기업용 AI 에이전트 전용 플랫폼 'Gemini Enterprise Agent Platform' 공개"
date: "2026-04-23T09:00:00+09:00"
lang: ko
category: news
summary: "Google Cloud Next '26에서 구글이 에이전트 빌드·거버넌스·최적화를 하나로 묶은 Gemini Enterprise Agent Platform을 발표했어. 기존 Vertex AI를 전면 개편한 이 플랫폼은 Agent Identity, Agent Gateway, Agent Simulation 등 8개 신규 기능을 포함하고 있어."
sourceUrl: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-enterprise-agent-platform/"
sourceTitle: "Google Blog"
draft: false
score: 110
sourceCount: 8
readerValue: "AI 에이전트를 업무에 도입하려는 사람이 어디서부터 시작해야 하는지 방향을 잡을 수 있어"
factCheck:
  status: passed
  date: "2026-04-23"
  sources:
    - url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-enterprise-agent-platform/"
      title: "Google Blog — Gemini Enterprise Agent Platform"
    - url: "https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-agent-platform"
      title: "Google Cloud Blog — Introducing Gemini Enterprise Agent Platform"
  checks:
    - type: source_match
      result: pass
      summary: "Google Cloud Next '26 발표 원문에서 3개 축(Build/Govern/Optimize)과 신규 기능명을 전부 확인했어."
      items:
        - "Build — Agent Development Kit, 서브 에이전트 네트워크 — Google Blog 원문 확인"
        - "Govern — Agent Identity, Agent Registry, Agent Gateway — Google Blog 원문 확인"
        - "Optimize — Agent Simulation, Agent Evaluation, Agent Observability — Google Blog 원문 확인"
        - "Vertex AI 흡수 재편 — '(formerly Vertex AI)' 명시"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "TechCrunch, SiliconANGLE, NewsBytesApp 등 복수 매체가 동일한 발표 내용을 다루고 있어. 교차 확인됐어."
      items:
        - "TechCrunch: Google makes interesting choice with agent-building tool for enterprises"
        - "SiliconANGLE: Google brings agentic development and governance under one roof"
        - "Google Cloud Blog — 'Introducing Gemini Enterprise Agent Platform' 공식 발표 별도 확인"
    - type: number_verify
      result: pass
      summary: "3개 축, 3개 Optimize 도구, Gemini+Claude 총 5개 모델 수치가 전부 맞아."
      items:
        - "'3개 축' — Build/Govern/Optimize 3개 정확"
        - "'3개 도구(Simulation+Evaluation+Observability)' — 원문 3개 기능 나열 일치"
        - "'총 5개 모델' — Gemini Pro+Flash(2) + Claude Opus+Sonnet+Haiku(3) = 5 계산 일치"
    - type: adversarial
      result: pass
      summary: "Gemini 3.1 버전명이 WebSearch AI 요약 기반이라 공식 문서 대비 부정확할 수 있어."
      items:
        - "Gemini 3.1 Pro/Flash 버전명은 WebSearch AI 요약 기반 — 공식 블로그 직접 확인 필요"
        - "'5개 모델' 수치는 Gemini 2 + Claude 3 조합으로 계산됨 — 출시 후 변경 가능"
        - "Agent Gateway의 실제 파트너 에코시스템 적용 범위가 공개되지 않음 — 출시 후 검증 필요"
      findings:
        - "Gemini 3.1 Pro/Flash 버전명은 WebSearch AI 요약 기반 — 공식 블로그에서 재확인 권장"
        - "'5개 모델' 수치는 Gemini 2 + Claude 3 조합으로 계산됨 — 출시 시 변경 가능"
tags: ["google", "gemini", "agent", "enterprise", "cloud"]
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
  contentHash: "e74928d1ec403123"
  reviewedAt: "2026-04-25T09:56:00Z"
---
Google Cloud Next '26에서 구글이 기업용 AI 에이전트 플랫폼을 완전히 새로 짰어. 이름은 [Gemini Enterprise Agent Platform](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-enterprise-agent-platform/) — 기존 Vertex AI를 흡수해서 에이전트를 빌드하고, 통제하고, 성능을 측정하는 3개 축을 하나의 플랫폼으로 묶은 거야.

## 3개 축: Build, Govern, Optimize

**Build** 쪽에서는 Agent Development Kit(ADK)이 업그레이드됐어. 에이전트를 서브 에이전트 네트워크로 구성할 수 있어서 복잡한 추론을 분산해서 처리하는 구조가 가능해졌어. **Govern**은 기업 입장에서 진짜 중요한 부분인데, Agent Identity로 모든 에이전트에 추적 가능한 ID를 부여하고, Agent Gateway로 파트너 에코시스템의 외부 에이전트도 동일한 가이드라인 아래 통제할 수 있어. 이게 없으면 에이전트가 뭘 하고 있는지 전혀 모르거든.

**Optimize**는 Agent Simulation, Agent Evaluation, Agent Observability — 이 3개 도구로 에이전트의 실행 트레이스를 전부 기록하고 목표 달성 여부를 실시간으로 확인하는 기능이야.

## 구글 모델 외에 Claude도 쓸 수 있어

플랫폼 기반 모델은 Gemini 3.1 Pro와 Flash인데, Anthropic의 Claude Opus, Sonnet, Haiku까지 총 5개 모델을 선택할 수 있어. 구글이 자기 플랫폼에서 경쟁사 모델을 공식 지원하는 셈이거든. 기업 고객한테 모델 선택권을 주겠다는 전략이야.

에이전트 기반 업무 자동화를 검토 중이라면, 이제 빌드만 하면 끝이 아니라 "이 에이전트가 실제로 의도대로 작동하고 있나"를 지속적으로 검증하는 Observe-Evaluate 루프가 필수야. Gemini Enterprise Agent Platform은 그 인프라를 제공하려는 거야.
