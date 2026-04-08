---
title: "Anthropic, Claude 구독으로 OpenClaw 사용 막았어 — 서드파티 에이전트 일괄 제한"
date: "2026-04-05T10:00:00+09:00"
lang: ko
category: news
summary: "4월 4일부터 Claude Pro/Max 구독자는 OpenClaw 같은 서드파티 에이전트 도구에서 구독을 못 써. API 종량제 전환이 필수고, 일부 사용자는 월 비용이 최대 50배까지 오를 수 있어."
readerValue: "이 글이 해결해주는 문제는 4월 4일부터 Claude Pro/Max 구독자는 OpenClaw 같은 서드파티 에이전트 도구에서 구독을 못 써. API 종량제 전환이 필수고, 일부 사용자는 월 비용이 최대 50배까지 오를 수 있어가 실제 시장과 개발 흐름에서 왜 중요한지 빠르게 파악하게 해준다는 점이다."
sourceUrl: "https://venturebeat.com/technology/anthropic-cuts-off-the-ability-to-use-claude-subscriptions-with-openclaw-and"
sourceTitle: "VentureBeat"
draft: false
score: 60
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
    - type: adversarial
      result: pass
      findings:
        - "'50배 비용 증가'는 HN 사용자 추정치 — Anthropic 공식 확인 아님"
        - "Anthropic 입장(보안 우려, ToS 위반)은 기사에 미반영 — 한쪽 시각 위주"
tags: ["anthropic", "claude", "openclaw", "pricing"]
---

Anthropic이 4월 4일(미국 시간 정오)부터 Claude Pro랑 Max 구독을 서드파티 에이전트 도구에서 못 쓰게 막았어. OpenClaw를 포함한 외부 AI 에이전트에서 구독 인증이 더 이상 작동 안 해.

이게 뭐가 문제냐면, 비용 구조가 안 맞았거든. 당시 13.5만 개 이상의 OpenClaw 인스턴스가 돌아가고 있었는데, 월정액 구독자가 API 요금 대비 5배 이상 싸게 대규모 에이전트 작업을 돌리고 있었어. Anthropic 입장에선 구독 사업이 에이전트 사용량을 사실상 보조금 지급하는 꼴이었던 거야.

앞으로 OpenClaw에서 Claude를 쓰려면 종량제("extra usage") 결제나 직접 API를 써야 해. 일부 헤비 유저는 월 비용이 최대 50배까지 뛸 수 있어. Anthropic은 구독료 1개월 상당의 일회성 크레딧이랑 선결제 시 최대 30% 할인을 제공 중이야(4월 17일까지).

근데 타이밍이 묘해. OpenClaw 제작자 Peter Steinberger가 2월에 OpenAI로 이직한 직후 나온 조치거든. Claude 구독으로 에이전트를 돌리고 있었다면 API 키 전환이랑 비용 재산정을 당장 시작해야 해.
