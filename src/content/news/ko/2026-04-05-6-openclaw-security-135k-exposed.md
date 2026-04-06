---
title: "OpenClaw 보안 취약점 연쇄 발견 — 13.5만 인스턴스 중 63%가 인증 미설정"
date: "2026-04-05T14:00:00+09:00"
lang: ko
category: news
summary: "OpenClaw에서 CVE-2026-25253(CVSS 8.8) 등 심각한 보안 취약점이 연달아 터졌어. 공개 노출된 13.5만 인스턴스 중 63%가 인증 없이 돌아가고 있고, 관리자 권한 탈취가 가능해."
sourceUrl: "https://www.armosec.io/blog/cve-2026-32922-openclaw-privilege-escalation-cloud-security/"
sourceTitle: "ARMO Security"
draft: false
score: 55
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: "https://www.armosec.io/blog/cve-2026-32922-openclaw-privilege-escalation-cloud-security/"
      title: "ARMO — CVE-2026-32922 privilege escalation"
    - url: "https://www.sangfor.com/blog/cybersecurity/openclaw-ai-agent-security-risks-2026"
      title: "Sangfor — OpenClaw security risks"
    - url: "https://openclawai.io/blog/openclaw-cve-flood-nine-vulnerabilities-four-days-march-2026"
      title: "OpenClaw AI — Nine CVEs in Four Days"
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
        - "'63% 인증 미설정'은 SecurityScorecard STRIKE 팀 조사 — 조사 방법론(스캔 범위, 시점) 미공개"
        - "ARMO가 보안 솔루션 기업이라 자사 제품 홍보 맥락에서 심각성을 강조할 유인이 있음"
tags: ["openclaw", "security", "cve", "vulnerability"]
---

AI 에이전트 도구 OpenClaw에서 심각한 보안 취약점이 줄줄이 터지고 있어. 3월에만 4일간 9개 CVE가 동시에 공개됐고, 그중 CVE-2026-25253은 CVSS 8.8점으로 게이트웨이 전체 장악이 가능한 수준이야. 악성 링크 클릭 한 번으로 인증 토큰이 유출되면 공격자가 전체 관리자 권한을 가져가.

근본 원인이 뭐냐면, OpenClaw이 [인증 비활성화 상태로 배포](https://www.sangfor.com/blog/cybersecurity/openclaw-ai-agent-security-risks-2026)돼. SecurityScorecard STRIKE 팀 조사에 따르면, 공개 노출된 13.5만 개 인스턴스 중 63%가 인증을 설정 안 하고 돌리고 있었어. WebSocket 핸드셰이크 과정에서 클라이언트가 임의로 `operator.admin` 스코프를 선언할 수 있는 취약점(CVE-2026-33579)도 확인됐어. 일반 사용자가 서버에 "나는 관리자"라고 말하면 그대로 관리자가 되는 거야.

OpenClaw를 쓰고 있다면 즉시 v2026.3.12 이상으로 업데이트해야 해. 인증 설정을 반드시 활성화하고, 외부 네트워크 노출 여부를 점검하는 게 급선무야. Anthropic이 Claude 구독에서 OpenClaw을 차단한 것도 이 보안 이슈랑 무관하지 않아.
