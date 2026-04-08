---
title: "Claude Code, 명령어 50개 넘으면 보안 규칙 무시하는 버그 발견"
date: "2026-04-06T10:00:00+09:00"
lang: ko
category: news
summary: "Anthropic의 AI 코딩 도구 Claude Code에서 명령어가 50개를 넘으면 사용자가 설정한 deny 규칙을 건너뛰는 취약점이 발견됐다. 보안 회사 Adversa AI가 npm 소스맵 유출 후 분석해 밝혀냈고, v2.1.90에서 패치됐다."
readerValue: "Anthropic의 AI 코딩 도구 Claude Code에서 명령어가 50개를 넘으면 사용자가 설정한 deny 규칙을 건너뛰는 취약점이 발견됐다. 보안 회사 Adversa AI가 npm 소스맵 유출 후 분석해 밝혀냈고, v2.1.90에서 패치됐다가 실제 시장과 개발 흐름에서 왜 중요한지 빠르게 파악하게 해준다는 점이다."
sourceUrl: "https://adversa.ai/claude-code-security-bypass-deny-rules-disabled/"
sourceTitle: "Adversa AI"
draft: false
score: 72
factCheck:
  status: passed
  date: "2026-04-06"
  sources:
    - url: "https://adversa.ai/claude-code-security-bypass-deny-rules-disabled/"
      title: "Adversa AI 분석 보고서"
    - url: "https://www.theregister.com/2026/04/01/claude_code_rule_cap_raises/"
      title: "The Register 보도"
    - url: "https://www.securityweek.com/critical-vulnerability-in-claude-code-emerges-days-after-source-leak/"
      title: "SecurityWeek 보도"
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
        - "v2.1.90 패치로 이미 해결된 과거 이슈이나, AI 에이전트 권한 관리의 구조적 한계를 보여주는 사례"
tags: ["claude-code", "보안", "anthropic", "취약점"]
---

## 명령어 50개 넘기면 보안 체크가 꺼져

[Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)에서 사용자가 설정한 deny 규칙이 특정 조건에서 무시되는 취약점이 나왔어. 셸 명령어를 `&&`나 `||`로 50개 이상 연결하면, Claude Code가 개별 명령어 보안 분석을 건너뛰고 전체를 한꺼번에 승인 요청해버리거든.

그러니까 `rm` 명령을 deny로 설정해놔도, 앞에 무해한 명령어 50개를 붙이면 `rm`이 그냥 실행돼.

## Adversa AI가 소스 유출 후 발견

보안 회사 [Adversa AI](https://adversa.ai/claude-code-security-bypass-deny-rules-disabled/)가 3월 31일 npm에 실수로 포함된 `.map` 소스맵 파일을 분석해서 이 취약점을 찾아냈어. Anthropic 내부 티켓 CC-643을 보면, 복잡한 복합 명령어가 UI를 멈추게 하는 성능 문제를 해결하려다 보안 체크를 생략하는 코드가 들어갔대.

[The Register](https://www.theregister.com/2026/04/01/claude_code_rule_cap_raises/)와 [SecurityWeek](https://www.securityweek.com/critical-vulnerability-in-claude-code-emerges-days-after-source-leak/) 등 보안 매체에서 꽤 크게 다뤘어. Reddit에서도 화제가 됐고.

## 패치는 한 줄이었는데

Anthropic이 Claude Code v2.1.90에서 `bashPermissions.ts` 파일의 `behavior` 값을 `"ask"`에서 `"deny"`로 바꾸는 한 줄 수정으로 패치했어. 수정은 간단했는데, AI 에이전트에 deny 규칙을 설정하는 것만으로는 부족하다는 게 드러난 거지. 실행 로그를 정기적으로 확인하는 습관이 필요해.
