---
term: continue
title: "Continue(컨티뉴)"
lang: ko
summary: "Continue는 IDE 보조 경험과 저장소용 AI 체크 흐름을 함께 제공하는 오픈소스 코딩 도구 계열이야."
readerValue: "이 이름이 단순 채팅 확장인지, 아니면 저장소 규칙을 파일로 관리하면서 로컬과 CI에서 같은 AI 체크를 돌리는 흐름까지 포함하는지 구분하는 데 도움이 돼."
category: tool
aliases:
  - "컨티뉴"
relatedTerms:
  - cursor
  - windsurf
  - claude-code
  - codex
firstMentioned: "2026-03-07"
mentionCount: 1
draft: false
tags:
  - coding-agent
  - editor
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://github.com/continuedev/continue"
      title: "continuedev/continue"
    - url: "https://docs.continue.dev/"
      title: "What is Continue? | Continue Docs"
  checks:
    - type: source_match
      result: pass
      summary: "공식 문서가 강조하는 source-controlled AI checks와 CLI 흐름에 맞춰 설명을 다시 맞춰봤어."
      items:
        - "독자 문제 대조: Continue를 단순 IDE 채팅 확장이 아니라 저장소 규칙형 AI 체크 도구로 읽게 첫 문장을 조정했어."
        - "GitHub 저장소 설명과 공식 문서에서 공통으로 보이는 checks, CLI, CI 흐름을 본문 중심으로 올렸어."
      findings:
        - "현재 문서 기준 제품 축을 반영했어."
    - type: web_cross_check
      result: pass
      summary: "저장소 소개와 공식 문서를 나란히 보면서 예전 이미지와 현재 초점을 구분해 다시 봤어."
      items:
        - "비교 기준: GitHub 저장소의 source-controlled checks 설명과 공식 문서의 Checks/CLI/CI 구조를 맞춰 보고, 겹치는 기능만 남겼어."
        - "IDE 확장 뿌리는 남겨 두되, 지금 문서에서 더 강하게 미는 저장소 체크 흐름을 앞세웠어."
      findings:
        - "제품 방향 전환 때문에 생기는 혼선을 줄였어."
    - type: number_verify
      result: pass
      summary: "규칙 수나 지원 모델 수 같은 숫자는 바뀌기 쉬워서 빼고, 저장소 규칙 흐름만 남겼어."
      items:
        - "체크 개수, 실행 한도, 가격 같은 숫자는 저장소마다 다르고 빠르게 변해서 본문에 넣지 않았어."
        - "대신 '.continue/checks' 같은 구조와 로컬·CI 재사용성처럼 개념을 이해하는 데 필요한 부분만 살렸어."
      findings:
        - "숫자보다 워크플로 설명을 우선했어."
    - type: adversarial
      result: pass
      summary: "가장 흔한 오해인 'Continue는 그냥 코드 채팅 확장'이라는 해석을 막았어."
      items:
        - "예전 인상만 떠올려서 IDE 보조 하나로만 읽지 않게, 저장소 안 규칙 파일과 CI 실행 흐름을 분명히 적었어."
        - "반대로 AI 체크가 만능 심판처럼 읽히지 않게, 사람 리뷰 경계를 따로 세워야 한다는 점도 넣었어."
      findings:
        - "현재 제품 초점과 한계를 같이 남겼어."
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
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
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "f7874022da9a0671"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
Continue는 코딩 보조 IDE 확장과, 저장소 안에 AI 체크 규칙을 넣어 로컬과 CI에서 돌리는 흐름을 함께 다루는 오픈소스 도구야. 그래서 지금 이 이름을 읽을 때는 채팅 확장 하나보다 저장소 워크플로까지 포함한 제품 방향으로 보는 게 맞아.
## 어떻게 작동하나
공식 문서 기준으로는 체크 규칙을 저장소 안 파일로 관리하고, Continue CLI나 CI에서 같은 규칙을 실행할 수 있어. 그래서 pull request가 열렸을 때 diff를 기준으로 AI 체크를 돌리고, 그 결과를 반복 가능한 저장소 규칙처럼 취급하는 흐름을 만들 수 있어.
## 왜 중요한가
AI 코딩 도구가 개인 보조에서 팀 규칙 집행으로 옮겨 가는 흐름을 보여 준다는 점에서 Continue가 중요해. 리뷰어 감에만 기대던 검사 기준을 저장소 파일로 남길 수 있어서, 팀이 AI를 일회성 채팅이 아니라 운영 규칙으로 다뤄 볼 수 있게 해 줘.
## 주의해서 볼 점
Continue를 예전 이미지대로 IDE 채팅 확장 하나로만 읽으면 지금 제품 방향을 놓치기 쉬워. 반대로 AI 체크가 있다고 해서 정답 판정기가 되는 건 아니니까, 실패 조건과 사람 리뷰 경계를 규칙 파일 안에서 분명히 잡아야 해.
## 관련 용어
- Cursor를 같이 보면 IDE 안에서 바로 쓰는 코딩 보조와 저장소 규칙형 AI 체크가 어디서 갈리는지 비교하기 좋아.
- Windsurf를 같이 보면 AI IDE 경험과 저장소-중심 체크 워크플로가 서로 다른 경쟁 축이라는 점이 더 또렷해져.
- Claude Code를 같이 보면 개별 작업 수행형 에이전트와 팀 규칙형 AI 체크 흐름의 차이를 읽기 쉬워.
- Codex를 같이 보면 모델 이름과 실제 저장소 워크플로 도구 이름을 섞어 읽지 않는 데 도움돼.
