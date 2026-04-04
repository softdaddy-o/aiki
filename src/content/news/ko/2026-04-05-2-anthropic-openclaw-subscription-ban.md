---
title: "Anthropic, Claude 구독으로 OpenClaw 사용 차단 — 서드파티 에이전트 일괄 제한"
date: "2026-04-05T10:00:00+09:00"
lang: ko
category: news
summary: "4월 4일부터 Claude Pro/Max 구독자는 OpenClaw 등 서드파티 에이전트 도구에서 구독을 사용할 수 없게 됐다. API 종량제 전환이 필수이며, 일부 사용자는 월 비용이 최대 50배까지 오를 수 있다."
sourceUrl: "https://venturebeat.com/technology/anthropic-cuts-off-the-ability-to-use-claude-subscriptions-with-openclaw-and"
sourceTitle: "VentureBeat"
draft: false
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: "https://venturebeat.com/technology/anthropic-cuts-off-the-ability-to-use-claude-subscriptions-with-openclaw-and"
      title: "VentureBeat — Anthropic cuts off Claude subscriptions with OpenClaw"
    - url: "https://thenextweb.com/news/anthropic-openclaw-claude-subscription-ban-cost"
      title: "TNW — Anthropic blocks OpenClaw from Claude subscriptions"
    - url: "https://news.ycombinator.com/item?id=47633396"
      title: "Hacker News discussion"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 3
    - type: number_verify
      result: pass
tags: ["anthropic", "claude", "openclaw", "pricing"]
---

Anthropic이 4월 4일(미국 시간 정오)부터 Claude Pro와 Max 구독을 서드파티 에이전트 도구에서 사용할 수 없도록 제한했다. OpenClaw를 포함한 외부 AI 에이전트에서 구독 인증이 더 이상 작동하지 않는다.

배경은 비용 구조 불균형이다. 당시 13.5만 개 이상의 OpenClaw 인스턴스가 운영 중이었는데, 월정액 구독자가 API 요금 대비 5배 이상 저렴하게 대규모 에이전트 작업을 돌리고 있었다. Anthropic 입장에선 구독 사업이 에이전트 사용량을 사실상 보조금 지급하는 꼴이었던 거다.

앞으로 OpenClaw에서 Claude를 쓰려면 종량제("extra usage") 결제나 직접 API를 사용해야 한다. 일부 헤비 유저는 월 비용이 최대 50배까지 뛸 수 있다. Anthropic은 구독료 1개월 상당의 일회성 크레딧과 선결제 시 최대 30% 할인을 제공 중이다(4월 17일까지).

OpenClaw 제작자 Peter Steinberger가 2월에 OpenAI로 이직한 직후 발표된 조치라는 점도 주목할 만하다. Claude 구독으로 에이전트를 돌리고 있었다면 API 키 전환과 비용 재산정을 당장 시작해야 한다.
