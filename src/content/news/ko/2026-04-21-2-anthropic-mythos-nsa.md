---
title: "NSA, 국방부 블랙리스트 무시하고 Anthropic Mythos 몰래 쓰고 있었다"
date: "2026-04-21T09:10:00+09:00"
lang: ko
category: news
summary: "NSA가 국방부의 Anthropic 블랙리스트에도 불구하고 최고 비공개 모델 Mythos Preview를 사용 중이라고 Axios가 보도했다. Mythos는 공격적 사이버 능력 때문에 약 40개 조직에만 접근이 제한된 모델이다."
readerValue: "AI 거버넌스 갈등이 어떤 방식으로 실무에서 무력화되는지 판단하게 해준다."
sourceUrl: "https://www.axios.com/2026/04/19/nsa-anthropic-mythos-pentagon"
sourceTitle: "Axios"
draft: false
score: 100
sourceCount: 5
factCheck:
  status: passed
  date: "2026-04-21"
  sources:
    - url: "https://www.axios.com/2026/04/19/nsa-anthropic-mythos-pentagon"
      title: "Axios — NSA using Anthropic's Mythos despite blacklist"
    - url: "https://techcrunch.com/2026/04/20/nsa-spies-are-reportedly-using-anthropics-mythos-despite-pentagon-feud/"
      title: "TechCrunch — NSA spies reportedly using Anthropic's Mythos"
    - url: "https://www.malwarebytes.com/blog/news/2026/04/mythos-an-ai-tool-too-powerful-for-public-release"
      title: "Malwarebytes — Mythos: too powerful for public release"
  checks:
    - type: source_match
      result: pass
      summary: "핵심 사실(40개 조직 제한, 12개 공개 발표, 2월 블랙리스트, Dario 회동) 모두 Axios 원문과 일치해."
      items:
        - "약 40개 조직 접근 제한 — Axios 본문에서 직접 확인"
        - "12개 조직만 공개 발표 — Axios 동일 기사에서 확인"
        - "DoD 2월 블랙리스트 — Axios: 'department moved in February to cut off Anthropic' 확인"
    - type: web_cross_check
      result: pass
      sources: 5
      summary: "Axios, TechCrunch, BusinessToday, Malwarebytes, Slashdot 5개 독립 출처가 동일한 핵심 사실을 보도했어."
      items:
        - "TechCrunch에서 NSA 사용 및 Pentagon 갈등 독립 확인"
        - "Malwarebytes에서 Mythos의 공격적 사이버 능력 특성 확인"
        - "BusinessToday와 Slashdot에서 블랙리스트-사용 모순 구조 확인"
    - type: number_verify
      result: pass
      summary: "40개 조직, 12개 공개 모두 Axios 수치와 일치해. Dario 회동 날짜는 '금요일', 4월 18일이야."
      items:
        - "~40개 조직 접근 제한 — Axios 단독 수치이나 TechCrunch가 동일 수치 인용"
        - "12개 조직 공개 발표 — Axios 원문에서 직접 확인"
        - "회동 날짜 '지난 금요일' = 2026-04-18로 추정 확인"
    - type: adversarial
      result: pass
      summary: "NSA 사용 사실은 익명 소스 기반이고 공식 확인이 없어. '공격적 사이버 능력' 표현은 Anthropic 측 설명이야."
      items:
        - "NSA 사용 확인은 '한 소스'(one source)에만 근거 — Axios 명시"
        - "NSA와 Anthropic 모두 공식 성명 없음"
        - "Mythos Preview 이름 자체가 공개 제품명인지 미확인"
      findings:
        - "NSA 사용 근거는 Axios 익명 소스 1건 — 다른 매체는 Axios 인용. 독립 검증 불가 상태"
        - "Mythos의 '공격적 사이버 능력' 기술은 Anthropic 내부 설명이며 공개 기술 문서 없음"
tags: ["anthropic", "mythos", "ai-safety", "government-ai", "cybersecurity"]
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
  contentHash: "c95b3fc6603568cf"
  reviewedAt: "2026-04-25T09:56:00Z"
---
[Axios 보도](https://www.axios.com/2026/04/19/nsa-anthropic-mythos-pentagon)에 따르면 NSA가 Anthropic의 비공개 모델 Mythos Preview를 사용 중이야. 문제는 국방부(DoD)가 지난 2월 Anthropic을 '공급망 위협'으로 규정하고 벤더들에 사용 중단을 요구한 상태라는 점이거든.

## 얼마나 모순적인 상황인가

군이 법원에서는 "Anthropic을 사용하면 국가 안보에 위협"이라고 주장하면서, 동시에 NSA는 Anthropic의 가장 강력한 모델을 쓰고 있는 거야. Mythos는 Anthropic이 약 40개 조직에만 접근을 제한한 모델이야 — 공개적으로 발표한 건 12개 조직뿐이고, NSA는 익명 명단에 포함된 기관 중 하나야. 현재 주 사용 목적은 자사 환경의 보안 취약점 탐지야.

## 왜 NSA가 이 모델을 원하는 건가

Mythos가 특별한 이유는 [Malwarebytes 분석](https://www.malwarebytes.com/blog/news/2026/04/mythos-an-ai-tool-too-powerful-for-public-release)에도 나오듯 공격적 사이버 능력 때문이야. Anthropic은 "일반 공개하기엔 너무 위험하다"고 판단해 아예 출시를 제한했는데, NSA 입장에선 바로 그 능력이 필요한 거야 — 내 시스템의 취약점을 적보다 먼저 찾아내려면.

## 협의 국면으로 전환 중

Dario Amodei CEO는 지난 금요일 백악관 비서실장 Susie Wiles와 재무장관 Scott Bessent를 만났어. 국방부 이외 정부 부처들의 Mythos 활용 방향을 논의했고, 양측 모두 "생산적인 회의였다"고 밝혔어. 갈등이 협상 국면으로 접어들고 있어.
