---
title: "공개 거부된 AI — Claude Mythos와 Project Glasswing"
date: "2026-04-09T09:00:00+09:00"
lang: ko
category: news
summary: "Anthropic이 Claude Mythos Preview를 일반에 공개하지 않기로 했다. 수천 개의 제로데이 취약점을 혼자 찾아내는 능력이 너무 강해 Project Glasswing을 통해 사이버 보안 전문가 11개 기업에만 제한 제공한다."
sourceUrl: "https://www.anthropic.com/glasswing"
sourceTitle: "Anthropic Project Glasswing"
draft: false
readerValue: Claude Mythos가 실제로 무엇을 할 수 있고 왜 공개 안 되는지 파악해 AI 보안 흐름을 빠르게 이해하게 해준다.
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://www.anthropic.com/glasswing"
      title: "Anthropic Project Glasswing"
    - url: "https://techcrunch.com/2026/04/07/anthropic-mythos-ai-model-preview-security/"
      title: "TechCrunch: Anthropic Mythos"
    - url: "https://www.theguardian.com/technology/2026/apr/08/anthropic-ai-cybersecurity-software"
      title: "The Guardian"
  checks:
    - type: source_match
      result: pass
      summary: Anthropic 공식 페이지와 TechCrunch 원문 대조로 핵심 사실 확인
      items:
        - "CVE-2026-4747(FreeBSD 17년 취약점) — TechCrunch/Anthropic 공식 확인"
        - "OpenBSD 27년 버그 — 검색 결과 복수 출처 확인"
        - "파트너 11개사 목록 — Anthropic 공식 Glasswing 페이지 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: Anthropic 공식, TechCrunch, The Guardian 3개 출처 교차검증
      items:
        - "The Guardian: 수천 개 제로데이 발견 보도 일치"
        - "TechCrunch: Project Glasswing 파트너십 구조 일치"
        - "SecurityWeek: 공격/방어 양면성 논의 일치"
    - type: number_verify
      result: pass
      summary: 기사 내 수치를 개별 확인
      items:
        - "17년 — CVE-2026-4747 FreeBSD 취약점 연령 ✅"
        - "27년 — OpenBSD 버그 연령 ✅"
        - "수천 개 — Anthropic 발표 기준 (독립 검증 전이므로 '수천 개'로 표기) ✅"
        - "11개 기업 — Anthropic 공식 파트너 목록 직접 카운팅 ✅"
    - type: adversarial
      result: pass
      summary: 과장·인과관계 오류 여부 비판적 검토
      items:
        - "취약점 수 '수천 개'는 Anthropic 자체 발표 기준이며 독립적 재현 검증 전"
        - "11개 기업 참여가 '방어 성공'을 보장하지 않음 — 본문에서 단정 안 함"
      findings:
        - "취약점 수 '수천 개'는 Anthropic 자체 발표 기준이며 독립적 재현 검증 전"
tags: ["Anthropic", "AI보안", "사이버보안", "Claude"]
score: 90
---

Anthropic이 새 모델 [Claude Mythos Preview](https://www.anthropic.com/glasswing)를 공개했는데, 일반 사용자는 쓸 수 없어. 몇 주 만에 FreeBSD에서 17년 된 원격코드실행 취약점(CVE-2026-4747), OpenBSD에서는 무려 27년 된 버그를 포함해 수천 개의 제로데이를 혼자 찾아냈거든. "너무 강해서 악용될 수 있다"는 판단에 일반 공개를 포기하고, [Project Glasswing](https://www.anthropic.com/glasswing)이라는 파트너십 프로그램으로만 운영하기로 했다.

파트너사는 AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorgan Chase, Linux Foundation, Microsoft, NVIDIA, Palo Alto Networks — 총 11곳이야. 이들이 Mythos로 방어를 먼저 점검하는 동안 Anthropic은 공격자보다 앞서 패치할 시간을 버는 구조거든.

지금 쓰는 소프트웨어에 수십 년 된 취약점이 조용히 숨어 있다는 게 이번에 현실로 드러났어. AI가 공격 도구가 되기 전에 방어에 먼저 쓸 수 있느냐 — 그게 앞으로 기업 보안의 핵심 질문이 될 거야.
