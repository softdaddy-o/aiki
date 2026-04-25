---
title: "백악관, 연방 기관에 Anthropic Mythos 접근 권한 준비 중"
date: "2026-04-17T11:00:00+09:00"
lang: ko
category: news
summary: "백악관 예산관리국(OMB)이 국방부·재무부·국토안보부 등 주요 연방 기관에 Anthropic의 Mythos 모델 접근을 설정하는 작업을 시작했다. Mythos는 OS와 웹브라우저에서 수천 건의 보안 취약점을 발견한 모델로, Project Glasswing 프레임워크로 제한 배포 중이다."
readerValue: "미국 정부가 Anthropic의 가장 강력한 모델을 실제로 어떻게 쓰려는지 파악"
sourceUrl: "https://www.bloomberg.com/news/articles/2026-04-16/white-house-moves-to-give-us-agencies-anthropic-mythos-access"
sourceTitle: "Bloomberg"
draft: false
score: 100
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-17"
  sources:
    - url: "https://www.bloomberg.com/news/articles/2026-04-16/white-house-moves-to-give-us-agencies-anthropic-mythos-access"
      title: "Bloomberg — White House Anthropic Mythos"
    - url: "https://www.cnbc.com/video/2026/04/16/white-house-moves-to-give-u-s-agencies-anthropic-mythos-access.html"
      title: "CNBC"
    - url: "https://www.axios.com/2026/04/14/anthropic-mythos-trump-administration-cisa-cuts"
      title: "Axios — Mythos + CISA"
  checks:
    - type: source_match
      result: pass
      summary: "Gregory Barbaccia, 6개 이상 부처 수신, Project Glasswing — Bloomberg에서 직접 확인했어"
      items:
        - "Gregory Barbaccia(연방 CIO) 발신 — Bloomberg 원문 확인"
        - "수신 부처: DOD, Treasury, Commerce, DHS, DOJ, State — Bloomberg 확인"
        - "Project Glasswing 명칭 — Bloomberg + Axios 교차 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Bloomberg, CNBC, Axios 3곳에서 Mythos 배포 문맥 교차 확인했어"
      items:
        - "Bloomberg 2026-04-16: OMB CIO 이메일 원문 기반 단독 보도"
        - "CNBC 2026-04-16: 백악관 Mythos 접근 설정 움직임 보도"
        - "Axios 2026-04-14: CISA 예산 삭감 이후 Mythos 배포 복잡성 보도"
    - type: number_verify
      result: pass
      summary: "수신 부처 수, 취약점 수(수천 건) 원문과 일치했어"
      items:
        - "6개 이상 부처(DOD/Treasury/Commerce/DHS/DOJ/State) — Bloomberg 확인 ✅"
        - "'수천 건' 취약점 — Bloomberg 'thousands of vulnerabilities' 그대로 인용 ✅"
    - type: adversarial
      result: pass
      summary: "'범정부 배포 준비 중' 해석이 과장인지 검토했어"
      items:
        - "이메일은 '준비 중 + coming weeks' — 확정 배포가 아님. 기사에서 '준비 중'으로 표현해 정확"
        - "Project Glasswing: Bloomberg + Axios 두 독립 보도에서 확인 ✅"
      findings:
        - "Bloomberg 보도는 이메일 내용 기반이나 이메일 원문은 공개되지 않음 — 단일 출처 주의"
tags: ["anthropic", "mythos", "us-government", "cybersecurity", "federal"]
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
  contentHash: "110e063ce8b476dc"
  reviewedAt: "2026-04-25T09:56:00Z"
---
## 무슨 일이 있었나

백악관 예산관리국(OMB)의 연방 최고정보책임자(CIO) Gregory Barbaccia가 여러 장관급 부처에 이메일을 보냈다. Anthropic의 Mythos 모델을 연방 기관에서 쓸 수 있도록 보안 프레임워크를 구축하겠다는 내용이야. 이메일을 받은 부처는 국방부(DOD), 재무부, 상무부, 국토안보부(DHS), 법무부, 국무부 등이야.

Mythos가 뭔지부터 짧게 — Anthropic이 공개 배포하지 않고 "Project Glasswing" 이름으로 제한적으로 운영 중인 [Claude](/ko/wiki/claude/) 계열 모델이야. 방어적 사이버보안 목적으로만 특정 기관에 접근을 허용하는 방식이고, 지금까지 OS와 웹브라우저에서 수천 건의 보안 취약점을 찾아냈다고 해. 정확한 수치가 아니라 "thousands"라는 표현을 씀 — 그만큼 규모를 강조하는 거지.

## 왜 중요할까

타이밍이 복잡해. 몇 주 전에 CNBC가 Vance 부통령과 Bessent 재무장관이 AI 회사들을 불러 보안 우려를 직접 물었다는 내용을 보도했거든. 백악관이 Mythos의 사이버보안 리스크에 신중한 입장이었다는 거고, 지금은 그 우려를 프레임워크로 관리하면서 실용적 배포 쪽으로 방향을 잡은 것처럼 보여.

## 앞으로 볼 점

이메일은 "몇 주 안에 추가 정보를 공유하겠다"는 선에서 끝났어 — 언제부터, 어떻게 쓸지는 아직 확정이 아니야. 다만 DOD부터 법무부까지 6개 이상 핵심 부처가 수신자에 포함됐다는 건, 이게 특정 부처의 파일럿이 아니라 범정부 차원 배포를 준비 중이라는 신호로 읽혀.
