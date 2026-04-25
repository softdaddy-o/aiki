---
title: OpenClaw 보안 취약점 연쇄 발견 — 13.5만 인스턴스 중 63%가 인증 미설정
date: "2026-04-05T14:00:00+09:00"
lang: ko
category: news
summary: OpenClaw에서 CVE-2026-25253(CVSS 8.8) 등 심각한 보안 취약점이 연달아 터졌어. 공개 노출된 13.5만 인스턴스 중 63%가 인증 없이 돌아가고 있고, 관리자 권한 탈취가 가능해.
readerValue: 이 이슈가 기능 소개보다 운영 리스크에 가까운지 빠르게 판단하는 데 도움이 된다.
sourceUrl: https://www.armosec.io/blog/cve-2026-32922-openclaw-privilege-escalation-cloud-security/
sourceTitle: ARMO Security
draft: false
score: 55
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: https://www.armosec.io/blog/cve-2026-32922-openclaw-privilege-escalation-cloud-security/
      title: ARMO — CVE-2026-32922 privilege escalation
    - url: https://www.sangfor.com/blog/cybersecurity/openclaw-ai-agent-security-risks-2026
      title: Sangfor — OpenClaw security risks
    - url: https://openclawai.io/blog/openclaw-cve-flood-nine-vulnerabilities-four-days-march-2026
      title: OpenClaw AI — Nine CVEs in Four Days
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 확인해뒀어.
      items:
        - 독자가 먼저 갈라 봐야 할 건 이 이슈가 기능 소개보다 운영 리스크에 가까운지.
        - 제목부터 다시 보면 기사 제목은 "OpenClaw 보안 취약점 연쇄 발견 — 13.5만 인스턴스 중 63%가 인증 미설정"이고, 원문 제목은 "ARMO Security"로 잡혔어.
        - 출처를 다시 보면 대표 원문 도메인은 armosec.io로 잡혔어.
        - 이 글의 축을 다시 보면 이 글의 핵심 축은 openclaw, security, cve, vulnerability로 읽었어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 원문 하나만 믿지 않으려고 관련 출처 3건을 옆에 두고 비교해뒀어.
      items:
        - 여기서 먼저 갈라 볼 기준은 이 이슈가 기능 소개보다 운영 리스크에 가까운지.
        - 같이 본 출처로는 ARMO — CVE-2026-32922 privilege escalation (https://www.armosec.io/blog/cve-2026-32922-openclaw-privilege-escalation-cloud-security/)
        - 같이 본 출처로는 Sangfor — OpenClaw security risks (https://www.sangfor.com/blog/cybersecurity/openclaw-ai-agent-security-risks-2026)
        - 같이 본 출처로는 OpenClaw AI — Nine CVEs in Four Days (https://openclawai.io/blog/openclaw-cve-flood-nine-vulnerabilities-four-days-march-2026)
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 검증해뒀어.
      items:
        - 숫자를 다시 보면 원문에서 다시 본 숫자나 버전 표기는 13.5, 63%, 8.8, 3 쪽이야.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸러뒀어.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.
        - 출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.
      findings: []
tags:
  - openclaw
  - security
  - cve
  - vulnerability
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
  contentHash: "51c96891a87a510d"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

[AI 에이전트](/ko/wiki/agent/) 도구 OpenClaw에서 심각한 보안 취약점이 줄줄이 터지고 있어. 3월에만 4일간 9개 CVE가 동시에 공개됐고, 그중 CVE-2026-25253은 CVSS 8.8점으로 게이트웨이 전체 장악이 가능한 수준이야. 악성 링크 클릭 한 번으로 인증 토큰이 유출되면 공격자가 전체 관리자 권한을 가져가.

## 왜 중요할까

근본 원인이 뭐냐면, OpenClaw이 [인증 비활성화 상태로 배포](https://www.sangfor.com/blog/cybersecurity/openclaw-ai-agent-security-risks-2026)돼. SecurityScorecard STRIKE 팀 조사에 따르면, 공개 노출된 13.5만 개 인스턴스 중 63%가 인증을 설정 안 하고 돌리고 있었어. WebSocket 핸드셰이크 과정에서 클라이언트가 임의로 `operator.admin` 스코프를 선언할 수 있는 취약점(CVE-2026-33579)도 확인됐어. 일반 사용자가 서버에 "나는 관리자"라고 말하면 그대로 관리자가 되는 거야.

## 앞으로 볼 점

OpenClaw를 쓰고 있다면 즉시 v2026.3.12 이상으로 업데이트해야 해. 인증 설정을 반드시 활성화하고, 외부 네트워크 노출 여부를 점검하는 게 급선무야. [Anthropic](/ko/wiki/anthropic/)이 [Claude](/ko/wiki/claude/) 구독에서 OpenClaw을 차단한 것도 이 보안 이슈랑 무관하지 않아.
