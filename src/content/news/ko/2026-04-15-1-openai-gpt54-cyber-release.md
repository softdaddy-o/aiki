---
title: "OpenAI, 사이버 보안 전용 모델 GPT-5.4-Cyber를 제한 배포했다"
date: "2026-04-15T09:00:00+09:00"
lang: ko
category: news
summary: "OpenAI가 소프트웨어 보안 취약점 탐지 전용 모델 GPT-5.4-Cyber를 Trusted Access for Cyber(TAC) 프로그램을 통해 제한 공개했다. Anthropic Mythos 발표 1주일 만에 나온 대응으로, 수천 명 보안 전문가에게 단계적으로 접근권을 확대할 예정이다."
readerValue: "AI 사이버 보안 도구가 실무에 쓸 만한 단계인지 빠르게 판단하게 해준다"
sourceUrl: "https://www.bloomberg.com/news/articles/2026-04-14/openai-releases-cyber-model-to-limited-group-in-race-with-mythos"
sourceTitle: "Bloomberg"
draft: false
score: 110
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-15"
  sources:
    - url: "https://www.bloomberg.com/news/articles/2026-04-14/openai-releases-cyber-model-to-limited-group-in-race-with-mythos"
      title: "Bloomberg - OpenAI Releases Cyber Model"
    - url: "https://dnyuz.com/2026/04/14/in-the-wake-of-anthropics-mythos-openai-has-a-new-cybersecurity-model-and-strategy/"
      title: "dnyuz - OpenAI Cybersecurity Model and Strategy"
    - url: "https://openai.com/index/trusted-access-for-cyber/"
      title: "OpenAI - Trusted Access for Cyber"
  checks:
    - type: source_match
      result: pass
      summary: "Bloomberg 보도랑 OpenAI 공식 블로그에서 모델명, 프로그램명, 출시일이 전부 맞아"
      items:
        - "모델명 GPT-5.4-Cyber — Bloomberg, Axios, dnyuz 모두 일치"
        - "TAC 프로그램 2026년 2월 도입 — OpenAI 공식 페이지에서 확인"
        - "4월 14일 제한 배포 시작 — Bloomberg 보도일과 일치"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Bloomberg, Axios, dnyuz 3개 독립 매체에서 같은 내용을 확인했어"
      items:
        - "Bloomberg: GPT-5.4-Cyber 제한 배포 확인"
        - "Axios: 티어별 접근 구조 확인"
        - "dnyuz: Anthropic Mythos와의 전략 차이 확인"
    - type: number_verify
      result: pass
      summary: "TAC 프로그램 도입 시점이랑 API 크레딧 금액을 공식 소스에서 대조했어"
      items:
        - "TAC 2월 도입 — OpenAI 공식 페이지 확인"
        - "1000만 달러 API 크레딧 — OpenAI 공식 발표에서 확인"
        - "Codex Security 120만 커밋 스캔 — The Hacker News 보도"
    - type: adversarial
      result: pass
      summary: "OpenAI 자사 발표 기반이라 독립 보안 평가는 아직 없어"
      items:
        - "GPT-5.4-Cyber 실제 성능을 독립적으로 측정한 벤치마크가 없는지 확인"
        - "Anthropic Mythos와 직접 성능 비교가 가능한지 확인"
        - "OpenAI의 '기존 안전장치로 충분' 주장에 대한 반론 여부 확인"
      findings:
        - "GPT-5.4-Cyber의 실제 취약점 탐지 성능은 독립 벤치마크 미공개"
        - "Anthropic Mythos와의 직접 성능 비교 데이터 없음 — 전략 차이만 언급"
tags: ["openai", "cybersecurity", "gpt-5.4-cyber", "anthropic-mythos"]
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
  contentHash: "7c765237ee673651"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

OpenAI가 4월 14일 사이버 보안 전용 모델 [GPT-5.4-Cyber](https://www.bloomberg.com/news/articles/2026-04-14/openai-releases-cyber-model-to-limited-group-in-race-with-mythos)를 공개했어. 소프트웨어 취약점을 찾아내는 데 특화된 모델이고, 지금은 Trusted Access for Cyber(TAC) 프로그램을 통해 검증된 보안 팀에만 접근을 열어두고 있거든. 최상위 티어 사용자는 취약점 연구 같은 민감한 작업에서 제한이 풀린 버전을 쓸 수 있어.

## 왜 중요할까

타이밍이 눈에 띄는 게, [Anthropic이 Mythos Preview를 제한 공개](https://fortune.com/2026/04/10/anthropic-mythos-ai-driven-cybersecurity-risks-already-here/)한 지 딱 1주일 만이야. 다만 전략은 정반대거든. [Anthropic](/ko/wiki/anthropic/)은 "악용 위험이 크다"며 접근 자체를 강하게 막았는데, OpenAI는 "기존 안전장치로 충분하다"면서 수천 명, 수백 팀 단위로 접근을 넓히겠다고 했어.

## 앞으로 볼 점

실무 입장에서 보면, 이제 보안 감사에 AI를 끼워넣는 게 선택이 아니라 표준이 되어가고 있는 거야. OpenAI는 TAC 외에도 [Codex](/ko/wiki/codex/) Security라는 앱 보안 [에이전트](/ko/wiki/agent/), 오픈소스 보안을 위한 Linux Foundation 기부까지 묶어서 내놓았거든. 보안 팀이라면 TAC 프로그램 가입 조건부터 확인해보는 게 첫걸음이야.
