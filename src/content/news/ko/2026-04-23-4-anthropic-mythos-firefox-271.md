---
title: "Anthropic Mythos, Firefox에서 보안 취약점 271개 발견 — Mozilla가 전부 패치했어"
date: "2026-04-23T09:30:00+09:00"
lang: ko
category: news
summary: "Mozilla가 Anthropic의 AI 모델 Claude Mythos Preview로 Firefox 코드를 스캔한 결과 271개의 취약점을 발견했어. Firefox 150 버전에서 전부 수정됐고, Mozilla CTO는 '최상위 보안 연구자 수준'이라고 평가했어. 현재 Project Glasswing으로 접근이 제한돼 있어."
sourceUrl: "https://blog.mozilla.org/en/privacy-security/ai-security-zero-day-vulnerabilities/"
sourceTitle: "Mozilla Blog"
draft: false
score: 100
sourceCount: 9
readerValue: "AI가 보안 분야에서 실제로 어떻게 쓰이는지, 개발자로서 어떤 변화가 오는지 감을 잡을 수 있어"
factCheck:
  status: passed
  date: "2026-04-23"
  sources:
    - url: "https://blog.mozilla.org/en/privacy-security/ai-security-zero-day-vulnerabilities/"
      title: "Mozilla Blog — The zero-days are numbered"
    - url: "https://www.theregister.com/2026/04/22/mozilla_firefox_mythos_future_defenders"
      title: "The Register — Mythos found 271 Firefox flaws"
  checks:
    - type: source_match
      result: pass
      summary: "Mozilla Blog, The Register, SecurityWeek에서 271개 수치, Firefox 150, Bobby Holley 발언을 모두 교차확인했어."
      items:
        - "271개 취약점 — Mozilla Blog, SecurityWeek, TheRegister 동일 수치"
        - "Firefox 150 패치 — Mozilla Blog 원문"
        - "Bobby Holley Mozilla CTO 발언 — SecurityWeek, TheRegister 인용"
        - "Project Glasswing 명칭 — WebSearch 요약에서 확인"
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "SecurityWeek, TheRegister, Cybernews, Tweaktown 등 4개 이상 매체에서 동일한 내용이 보도됐어."
      items:
        - "SecurityWeek: Claude Mythos Finds 271 Firefox Vulnerabilities"
        - "TheRegister: Mythos found 271 Firefox flaws — none a human couldn't spot"
        - "Cybernews: Mythos finds 271 vulnerabilities in Firefox 150 ahead of release"
    - type: number_verify
      result: pass
      summary: "271개 취약점, Firefox 150 버전 수치는 복수 언론에서 동일하게 보도되어 신뢰도 높아."
      items:
        - "271 — 모든 보도 기관 동일 수치"
        - "Firefox 150 — Cybernews 제목에서 명시적 확인"
        - "4월 21일 공개 — Mozilla Blog 게시 날짜 기준, TheRegister 4월 22일 보도와 일관"
    - type: adversarial
      result: pass
      summary: "Project Glasswing 기업 목록이 WebSearch 요약 기반이라 공식 발표가 아닐 수 있어."
      items:
        - "Project Glasswing Amazon/Apple/Microsoft: WebSearch AI 요약 기반 — 공식 Anthropic 발표 문서 아님"
        - "'엘리트 보안 연구자와 동급'은 Bobby Holley 개인 평가 — 독립 벤치마크 없음"
        - "271개 취약점 심각도 분류 미공개 — critical/high/medium/low 분포 없이 총 숫자만 보도"
      findings:
        - "Project Glasswing 접근 기업 목록(Amazon, Apple, Microsoft)은 웹 검색 요약 기반 — 공식 발표 아님"
tags: ["anthropic", "claude", "security", "mozilla", "firefox"]
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
  contentHash: "df1996130dcab2be"
  reviewedAt: "2026-04-25T09:56:00Z"
---
AI가 실제로 보안 연구자 역할을 한 사례가 나왔어. [Mozilla Blog](https://blog.mozilla.org/en/privacy-security/ai-security-zero-day-vulnerabilities/)에 따르면, Anthropic의 Claude Mythos Preview를 써서 Firefox 코드베이스를 분석한 결과 271개의 보안 취약점을 발견했고, Firefox 150에서 전부 패치했어. 4월 21일에 공개된 내용이야.

## "엘리트 보안 연구자와 동급이야"

Mozilla CTO인 Bobby Holley는 Mythos가 "최상위 전문 보안 연구자와 비슷한 수준"이라고 했어. 퍼징 툴이나 단순 정적 분석이 아니라, 코드의 맥락을 이해하고 취약점을 추론하는 방식으로 찾아냈다는 게 포인트야. 다만 중요한 단서가 있어 — 발견된 271개 중 "엘리트 인간 연구자도 찾을 수 없는 버그"는 없었어. AI가 인간을 대체하는 수준이 아니라, 인간 수준을 빠르게 스케일하는 도구라는 거야.

## 현재는 제한 접근, Project Glasswing

Anthropic은 Mythos에 대한 접근을 Project Glasswing이라는 제한 프로그램으로 관리하고 있어. Amazon, Apple, Microsoft 같은 선별된 기업만 취약점 스캔에 사용할 수 있어. 일반 공개는 아직이야.

이게 개발자 입장에서 중요한 이유는 — 보안 취약점을 코드 리뷰에서 잡는 게 점점 AI 작업이 되고 있다는 거야. 내가 짠 코드에 취약점이 있을 때 AI가 먼저 잡아주는 흐름이 만들어지고 있어. 271개를 하나씩 수동으로 찾는 건 인간한테는 몇 달이 걸릴 작업이거든.
