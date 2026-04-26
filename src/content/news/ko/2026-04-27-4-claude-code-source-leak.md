---
title: "Claude Code 소스가 통째로 새어나갔어 — KAIROS·undercover 모드까지 드러났어"
date: "2026-04-27T10:00:00+09:00"
lang: ko
category: news
summary: "Anthropic이 npm 패키지 @anthropic-ai/claude-code 2.1.88에 59.8MB 소스맵을 실수로 포함했어. 약 51만 줄 TypeScript 코드가 노출됐고, KAIROS 백그라운드 에이전트와 undercover 모드 같은 미공개 기능이 드러났어. 4만 회 이상 포크됐어."
readerValue: "Claude Code의 다음 로드맵을 보고 자체 워크플로 설계를 어디까지 따라갈지 가를 수 있어."
sourceUrl: "https://www.deeplearning.ai/the-batch/claude-codes-source-code-leaked-exposing-potential-future-features-kairos-and-autodream/"
sourceTitle: "deeplearning.ai — Claude Code's Source Code Leaked"
draft: false
score: 90
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-27"
  sources:
    - url: "https://www.deeplearning.ai/the-batch/claude-codes-source-code-leaked-exposing-potential-future-features-kairos-and-autodream/"
      title: "deeplearning.ai — Claude Code Source Leaked"
    - url: "https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know"
      title: "VentureBeat — Claude Code Source Leak"
    - url: "https://alex000kim.com/posts/2026-03-31-claude-code-source-leak/"
      title: "Alex Kim's blog — The Claude Code Source Leak"
    - url: "https://www.zscaler.com/blogs/security-research/anthropic-claude-code-leak"
      title: "Zscaler ThreatLabz — Anthropic Claude Code Leak"
  checks:
    - type: source_match
      result: pass
      summary: "deeplearning.ai 디지스트와 VentureBeat 1차 보도 수치를 본문과 일치 확인."
      items:
        - "패키지명·버전: @anthropic-ai/claude-code v2.1.88"
        - "유출 파일: 59.8 MB JavaScript source map(.map)"
        - "유출 코드: 약 51.2만 줄 TypeScript"
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "주류 매체·보안 분석·기술 블로그 4개 소스가 동일한 사실관계를 공유."
      items:
        - "deeplearning.ai: KAIROS·autoDream 기능 명시"
        - "VentureBeat: 발견자 Chaofan Shou(Solayer Labs 인턴) 정보"
        - "Zscaler ThreatLabz: 보안 관점에서의 영향 분석"
        - "Alex Kim 블로그: 유출 코드 상세 분석"
    - type: number_verify
      result: pass
      summary: "유출 규모와 후속 확산 수치를 정량 확인."
      items:
        - "발견 시점: 2026-03-31 04:23 ET (X에서 최초 공개)"
        - "포크 수: 40,000회 이상"
        - "Anthropic은 npm·GitHub에서 즉시 삭제했지만 미러는 그대로 남았음"
    - type: adversarial
      result: pass
      summary: "Anthropic의 공식 입장과 커뮤니티 해석 차이를 분리."
      items:
        - "Anthropic은 '릴리스 패키징 휴먼 에러, 보안 침해 아님'이라고 발표"
        - "유저·고객 데이터 노출은 없음 — 어디까지나 클라이언트 사이드 코드"
        - "KAIROS·undercover 모드는 미릴리스 기능이라 실제 출시 형태와 다를 수 있음"
      findings:
        - "코드는 봤지만 모델 가중치는 아니야 — 대부분의 가치는 여전히 Anthropic 서버 안에 있어"
        - "undercover 모드 같은 기능명만으로 의도를 추측하면 어긋날 수 있어 — 실제 활성화 여부는 미확인"
tags: ["claude", "claude-code", "anthropic", "leak", "kairos"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[Anthropic](/ko/wiki/anthropic/)이 npm에 올린 `@anthropic-ai/claude-code` v2.1.88 패키지에 59.8MB짜리 [JavaScript source map](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know) 파일이 그대로 들어갔어. 안에는 약 51만 줄 [TypeScript](/ko/wiki/typescript/) 소스가 들어있었고, 2026-03-31 새벽 4시 23분 ET에 한 인턴이 X에 올리면서 폭발했지. 몇 시간 안에 GitHub 미러가 4만 번 넘게 포크됐어. 노출 시점부터 패키지가 npm에서 내려질 때까지 약 6시간 걸렸어.

[Anthropic](/ko/wiki/anthropic/) 측은 "릴리스 패키징 휴먼 에러이지 보안 침해는 아니다"라고 발표했고, 유저·고객 데이터 노출은 없다고 못 박았어. npm과 GitHub 원본은 즉시 내려졌지만 이미 미러는 곳곳에 퍼져있어.

## 무엇이 드러났나

[deeplearning.ai 정리](https://www.deeplearning.ai/the-batch/claude-codes-source-code-leaked-exposing-potential-future-features-kairos-and-autodream/)에 따르면 핵심 발견 세 가지야:

- **KAIROS**: [Claude Code](/ko/wiki/claude-code/)를 항상 켜져있는 백그라운드 [에이전트](/ko/wiki/agent/)로 돌리는 시스템. 유저가 자리를 비운 사이에도 세션을 굴리고, autoDream이라는 메모리 통합 프로세스를 돌려.
- **Undercover 모드**: 공개 오픈소스에 조용히 기여할 때 쓰는 모드. 시스템 프롬프트에 "커밋 메시지에 Anthropic 내부 정보를 포함하지 말라"는 지시가 박혀있어.
- **모델 코드네임**: Capybara가 Claude 4.6 변종, Fennec이 Opus 4.6에 매핑돼있어.

## 어떤 의미인가

코드는 봤지만 [모델 가중치](/ko/wiki/weight/)는 안 봤어. 진짜 IP는 여전히 Anthropic 서버 안에 있고, 외부에 풀린 건 클라이언트 측 도구 호출 로직과 시스템 프롬프트 정도야. 그래도 [Claude Code](/ko/wiki/claude-code/)의 백그라운드 에이전트 로드맵을 미리 본 셈이라, 본인 워크플로에서 어디까지 자동화 영역을 넓힐지 판단 재료가 생긴 거지.

## 주의할 점

미릴리스 기능명만 보고 동작을 추측하면 어긋나기 쉬워. KAIROS와 undercover 모드가 실제 그 형태로 출시될지는 [Anthropic](/ko/wiki/anthropic/)도 확정한 적이 없어. 코드 분석을 본인 도구 설계에 참고할 때는 "이런 방향을 시도하고 있다" 정도로만 받아들이는 게 안전해. 실제 동작은 정식 출시 후 검증해야 해.
