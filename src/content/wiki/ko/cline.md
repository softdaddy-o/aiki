---
term: cline
title: "Cline(클라인)"
lang: ko
summary: "Cline은 VS Code 계열 IDE 안에서 파일 수정, 명령 실행, 브라우저 작업까지 잇는 코딩 에이전트야."
readerValue: "이 이름이 단순 코드 추천기가 아니라, 권한 승인 아래 실제 작업을 수행하는 IDE 에이전트라는 걸 빠르게 이해하는 데 도움이 돼."
category: tool
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "클라인"
relatedTerms:
  - claude-code
  - cursor
  - codex
  - copilot
firstMentioned: "2026-02-26"
mentionCount: 2
draft: false
tags:
  - coding-agent
  - vs-code
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://github.com/cline/cline"
      title: "cline/cline"
    - url: "https://docs.cline.bot/"
      title: "Cline Documentation - Cline"
  checks:
    - type: source_match
      result: pass
      summary: "공식 소개가 강조하는 IDE 안 자율 코딩 에이전트 성격에 맞춰 설명을 다시 맞춰봤어."
      items:
        - "독자 문제 대조: Cline을 단순 추천기가 아니라 IDE 안에서 실제 작업을 수행하는 에이전트로 읽게 정리했어."
        - "GitHub 소개와 공식 문서가 공통으로 말하는 파일 편집, 명령 실행, 브라우저 작업, 승인 흐름을 본문에 반영했어."
      findings:
        - "행동 에이전트라는 핵심을 남겼어."
    - type: web_cross_check
      result: pass
      summary: "저장소 소개와 문서 설명을 맞춰 보면서 승인 구조를 과장 없이 다시 봤어."
      items:
        - "비교 기준: GitHub README의 기능 설명과 문서의 승인 중심 설명을 같이 보고, 둘 다 확인되는 기능만 적었어."
        - "MCP 확장 가능성은 입력 초안과 생태계 맥락에 맞지만, 세부 연동 목록은 확실한 범위 밖이라 넓히지 않았어."
      findings:
        - "기능 나열보다 작동 구조를 우선했어."
    - type: number_verify
      result: pass
      summary: "지원 모델 수나 사용량 숫자는 본문에서 빼고, 승인과 권한 구조 설명만 남겼어."
      items:
        - "Cline 문맥에서 중요한 건 몇 개 모델을 붙이느냐보다 어떤 권한으로 어떤 행동을 하느냐라서 수치형 주장을 넣지 않았어."
        - "가격이나 요청 한도는 빠르게 바뀔 수 있어서 경계 문장으로만 처리했어."
      findings:
        - "숫자보다 권한 구조를 보게 정리했어."
    - type: adversarial
      result: pass
      summary: "가장 흔한 오해인 '승인만 누르면 안전하다'는 생각을 막는 쪽으로 다시 봤어."
      items:
        - "승인 절차가 있다고 해도 잘못된 명령이나 넓은 권한은 위험할 수 있다는 점을 주의점에 넣었어."
        - "또 Cline을 그냥 VS Code 추천 확장처럼 읽지 않게, 실제 작업 실행까지 간다는 점을 분명히 했어."
      findings:
        - "승인과 안전을 동일시하는 오해를 줄였어."
---
## 한 줄 정의
Cline은 편집기 안에서 코드를 읽고, 파일을 고치고, 터미널 명령까지 이어서 다룰 수 있게 만든 AI 코딩 에이전트야. 핵심은 추천 문장 몇 개를 보여 주는 수준이 아니라, 실제 작업 단계를 사용자의 승인 아래 실행한다는 점이야.
## 어떻게 작동하나
공식 문서와 저장소 설명 기준으로 Cline은 파일 편집, 명령 실행, 브라우저 사용 같은 작업을 단계별 승인을 받으며 진행해. 또 MCP 같은 확장 경로를 통해 외부 도구를 연결할 수 있어서, IDE 안에서 에이전트가 다루는 범위를 넓혀 볼 수 있어.
## 왜 중요한가
Cline은 IDE 안의 AI가 어디까지 실제 행동 주체가 될 수 있는지 보여 주는 예시라서 중요해. 개발자가 코드, 터미널, 확인 절차를 오가던 흐름을 한 자리에 모으면서도 승인 절차를 전면에 두는 방식이라, 에이전트형 IDE 도구를 이해할 때 자주 비교 기준이 돼.
## 주의해서 볼 점
승인 기반이라고 해서 결과가 자동으로 안전해지는 건 아니야. 명령 실행 범위, 연결한 모델 비용, 외부 도구 권한이 넓어질수록 실수의 영향도 커지니까, 작업 범위와 검토 습관을 같이 관리해야 해.
## 관련 용어
- Claude Code를 같이 보면 둘 다 코드를 바꾸는 에이전트지만, IDE 안 승인 흐름과 터미널 중심 흐름의 차이를 읽기 쉬워.
- Cursor를 같이 보면 편집기 통합형 AI 보조와 실제 행동 에이전트 사이의 간격이 어디인지 비교해 볼 수 있어.
- Codex를 같이 보면 모델이나 브랜드 이름과, 실제 사용자가 설치하는 코딩 도구 이름을 구분하는 데 도움돼.
- Copilot을 같이 보면 자동완성 중심 경험과 에이전트 실행 중심 경험이 어떻게 다른지 더 선명하게 보여.