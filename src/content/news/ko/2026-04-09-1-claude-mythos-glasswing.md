---
title: 공개 거부된 AI — Claude Mythos와 Project Glasswing
date: "2026-04-09T09:00:00+09:00"
lang: ko
category: news
summary: Anthropic이 Claude Mythos Preview를 일반에 공개하지 않기로 했다. 수천 개의 제로데이 취약점을 혼자 찾아내는 능력이 너무 강해 Project Glasswing을 통해 사이버 보안 전문가 11개 기업에만 제한 제공한다.
readerValue: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하게 해준다.
sourceUrl: https://www.anthropic.com/glasswing
sourceTitle: Anthropic Project Glasswing
draft: false
score: 90
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: https://www.anthropic.com/glasswing
      title: Anthropic Project Glasswing
    - url: https://techcrunch.com/2026/04/07/anthropic-mythos-ai-model-preview-security/
      title: "TechCrunch: Anthropic Mythos"
    - url: https://www.theguardian.com/technology/2026/apr/08/anthropic-ai-cybersecurity-software
      title: The Guardian
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 맞춰봤다.
      items:
        - "독자 문제 대조: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 먼저 갈라 봐야 해."
        - "제목 대조: 기사 제목은 \"공개 거부된 AI — Claude Mythos와 Project Glasswing\"이고, 원문 제목은 \"Anthropic Project Glasswing\"로 잡혔어."
        - "출처 대조: 대표 원문 도메인은 anthropic.com로 잡혔어."
        - "태그 대조: 이 글의 핵심 축은 Anthropic, AI보안, 사이버보안, Claude로 읽었어."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 원문 하나만 믿지 않으려고 관련 출처 3건을 옆에 두고 다시 봤다.
      items:
        - "비교 기준: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 먼저 갈라 봐야 해."
        - "비교 출처 1: Anthropic Project Glasswing (https://www.anthropic.com/glasswing)"
        - "비교 출처 2: TechCrunch: Anthropic Mythos (https://techcrunch.com/2026/04/07/anthropic-mythos-ai-model-preview-security/)"
        - "비교 출처 3: The Guardian (https://www.theguardian.com/technology/2026/apr/08/anthropic-ai-cybersecurity-software)"
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 한 번 더 봤다.
      items:
        - "숫자 포인트: 원문에서 다시 본 숫자나 버전 표기는 11, 17, 27 쪽이야."
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸렀다.
      items:
        - 공식 발표 문구와 실제 배포 범위는 같은 말이 아니라서 분리해서 읽었어.
        - 홍보성 표현보다 출시 채널, 가격, 접근 조건이 본문과 맞는지 다시 맞춰봤어.
      findings:
        - 공식 블로그는 가장 빠른 원문이지만 마케팅 문구가 섞일 수 있어서 운영 조건은 따로 봐야 해.
tags:
  - Anthropic
  - AI보안
  - 사이버보안
  - Claude
---

Anthropic이 새 모델 [Claude Mythos Preview](https://www.anthropic.com/glasswing)를 공개했는데, 일반 사용자는 쓸 수 없어. 몇 주 만에 FreeBSD에서 17년 된 원격코드실행 취약점(CVE-2026-4747), OpenBSD에서는 무려 27년 된 버그를 포함해 수천 개의 제로데이를 혼자 찾아냈거든. "너무 강해서 악용될 수 있다"는 판단에 일반 공개를 포기하고, [Project Glasswing](https://www.anthropic.com/glasswing)이라는 파트너십 프로그램으로만 운영하기로 했다.

파트너사는 AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorgan Chase, Linux Foundation, Microsoft, NVIDIA, Palo Alto Networks — 총 11곳이야. 이들이 Mythos로 방어를 먼저 점검하는 동안 Anthropic은 공격자보다 앞서 패치할 시간을 버는 구조거든.

지금 쓰는 소프트웨어에 수십 년 된 취약점이 조용히 숨어 있다는 게 이번에 현실로 드러났어. AI가 공격 도구가 되기 전에 방어에 먼저 쓸 수 있느냐 — 그게 앞으로 기업 보안의 핵심 질문이 될 거야.
