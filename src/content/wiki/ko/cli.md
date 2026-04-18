---
term: cli
title: CLI(명령줄 인터페이스)
lang: ko
summary: 'CLI는 텍스트 명령으로 프로그램을 움직이는 인터페이스야. 반복 작업, 원격 운영, 자동화가 핵심인 순간엔 GUI보다 훨씬 강해.'
readerValue: 이 페이지를 보면 CLI를 배워야 하는 상황과 오히려 피해야 하는 상황을 금방 가를 수 있어.
category: concept
guideVersion:
  common: 1.0.0
  wiki: "3.0.0"
aliases:
  - CLI
  - Command Line Interface
relatedTerms:
  - aider
  - claude-code
  - codex
  - copilot
  - cursor
firstMentioned: '2021-06-29'
mentionCount: 9
draft: false
tags:
  - developer-tools
  - terminal
  - shell
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: 'https://www.gnu.org/software/bash/manual/html_node/Invoking-Bash.html'
      title: GNU Bash manual — Invoking Bash
    - url: >-
        https://learn.microsoft.com/en-us/windows/terminal/command-line-arguments
      title: Windows Terminal command line arguments
  checks:
    - type: source_match
      result: pass
      sources: 1
      summary: CLI 정의와 셸 실행 흐름이 기본 문서 설명이랑 맞는지 맞춰봤어.
      items:
        - >-
          독자 문제 대조: CLI가 그냥 검은 창인지 작업 방식인지 먼저 가를 수 있게 텍스트 명령을 입력받아 실행하는 인터페이스라고
          정의했어.
        - >-
          2026-04-18에
          https://www.gnu.org/software/bash/manual/html_node/Invoking-Bash.html
          를 다시 보고 rcfile, interactive shell, login shell 같은 실행 옵션 설명과 본문을 맞췄어.
        - CLI를 화면 모양이 아니라 재실행 가능한 절차라는 쪽으로 설명해서 독자 판단 기준에 맞췄어.
      findings:
        - 셸 실행 방식 설명은 GNU Bash 문서 기준으로 맞췄어.
        - Bash 고유 문법을 CLI 일반론으로 과장하지 않게 조절했어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 셸 문서와 터미널 문서를 나눠 읽어서 역할 경계를 다시 봤어.
      items:
        - >-
          비교 기준: Bash 문서는 셸이 명령을 해석하는 쪽을, Windows Terminal 문서는 `wt`가 창과 탭, 분할을
          제어하는 쪽을 보여 준다고 보고 본문 역할을 나눴어.
        - >-
          https://learn.microsoft.com/en-us/windows/terminal/command-line-arguments
          문서에 `wt`가 새 탭과 split pane을 만든다고 적혀 있어서, CLI가 운영 자동화와 창 제어를 동시에 품을 수
          있다는 예시로 썼어.
        - '두 문서가 다르다고 해서 CLI 정의가 갈리는 건 아니고, 셸 문법과 터미널 제어가 다른 층위라는 점만 본문에 남겼어.'
      findings:
        - 셸과 터미널을 한 덩어리로 뭉개지 않았어.
        - 운영 예시는 공식 문서에 직접 나온 동작만 골라 썼어.
    - type: number_verify
      result: skip
      summary: 해당 페이지는 핵심 수치 주장이 거의 없어서 없는 숫자는 안 만들고 남겼어.
      items:
        - '버전, 가격, 시장 점유율 같은 숫자는 본문 핵심 판단에 필요하지 않아서 새로 넣지 않았어.'
        - >-
          Windows Terminal 문서의 pane 비율 예시는 인터페이스 예시일 뿐이라, CLI 일반 정의의 숫자 근거로 승격하지
          않았어.
        - 대신 용어 정의의 신뢰도는 GNU Bash와 Microsoft 공식 문서를 교차 확인하는 방식으로 보완했어.
      findings:
        - 유의미한 수치 주장 없음이라는 점을 체크에 명시했어.
        - 본문도 허위 정량 비교 없이 운영 조건 중심으로 정리했어.
    - type: adversarial
      result: pass
      sources: 2
      summary: CLI를 만능이거나 본질적으로 위험한 도구처럼 읽는 오해를 막았어.
      items:
        - >-
          CLI는 전문가만 쓰는 위험한 창이라는 오해가 있는데, 실제 위험은 인터페이스보다 권한 범위와 명령 대상에 더 크게 달려
          있어.
        - >-
          반대로 CLI면 무조건 자동화에 좋다고 오해하기 쉬워서, 삭제나 권한 변경처럼 실수 비용이 큰 작업은 안전장치 없이는 피하라고
          적었어.
        - 'Bash 예제를 PowerShell에 그대로 붙여 넣는 식 오류가 흔해서, 셸 문법 차이를 주의점 섹션에 직접 넣었어.'
      findings:
        - '오입력, 권한 상승, 자동화 실패 확산을 구체 사례로 남겼어.'
        - 도입 기준과 회피 기준을 둘 다 적어서 한쪽으로 몰리지 않게 했어.
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.0.0"
    tone-editor: "1.0.0"
    structure-editor: "1.0.0"
  panelVerdict: pass
  reviewedAt: "2026-04-17"
---
## 한 줄 정의
CLI는 버튼 대신 명령문을 쳐서 프로그램을 움직이는 작업 방식이야. 사람이 한 번 친 절차를 그대로 다시 실행하거나 스크립트로 묶기 쉬워서, 서버 운영과 개발 자동화의 기본 축으로 자주 쓰여. 같은 작업을 자주 반복하고 결과를 텍스트 로그로 남겨야 할수록 CLI 쪽 이점이 커져.
## 어떻게 작동하나
보통은 셸이 `명령어 옵션 인자`를 읽고 실제 프로그램을 실행해. Bash는 시작할 때 어떤 초기화 파일을 읽을지와 인터랙티브 셸 동작을 옵션으로 바꿀 수 있고, Windows Terminal의 `wt`는 새 탭, 분할 창, 특정 창 대상 실행 같은 동작을 명령줄에서 조합할 수 있어. 그래서 배포 스크립트, 로그 재처리, 서버 초기화 자동화처럼 절차형 작업을 코드처럼 다루기 쉬워져.
## 왜 중요한가
CLI를 써야 할 신호는 꽤 뚜렷해. 같은 일을 자주 반복하고, CI나 배치 작업으로 옮길 생각이 있고, 원격 서버나 권한 있는 환경을 다뤄야 하고, 결과를 텍스트 로그로 남겨야 하면 CLI가 맞아. 예를 들어 배포 스크립트 실행이나 대량 로그 파싱은 GUI보다 다시 돌리기 쉽고, [claude-code](/ko/wiki/claude-code/)나 [codex](/ko/wiki/codex/) 같은 에이전트 도구도 결국 이 흐름 위에서 힘을 써.
## 주의해서 볼 점
안전하지 않은 경우도 분명해. 삭제나 권한 변경처럼 한 번 틀리면 복구 비용이 큰 작업을 즉석에서 실행하거나, 팀이 Bash와 PowerShell 문법 차이를 제대로 공유하지 못한 상태면 실수가 빠르게 퍼져. dry-run, 테스트 환경, 최소 권한 같은 안전장치를 먼저 깔지 않으면 CLI 자동화는 편의가 아니라 사고 증폭기가 되기 쉬워.
## 관련 용어
- [aider](/ko/wiki/aider/): CLI 위에서 파일 수정과 커밋 흐름을 AI에 붙이는 쪽이라, 터미널 중심 자동화를 어떻게 확장하는지 보기 좋아.
- [claude-code](/ko/wiki/claude-code/): 대화형 에이전트를 터미널 작업에 직접 붙이는 예라서 CLI가 단순 셸을 넘어서 작업 허브가 되는 흐름을 보여 줘.
- [codex](/ko/wiki/codex/): 명령 실행, 테스트, 코드 수정까지 CLI 루프로 묶는 방식이 더 강한 축이야.
- [copilot](/ko/wiki/copilot/): IDE 안 제안이 중심이라서, CLI 중심 자동화와 어디서 역할이 갈리는지 비교할 때 기준이 돼.
- [cursor](/ko/wiki/cursor/): 화면은 IDE 쪽이지만 내부적으로 터미널 명령을 많이 엮는다는 점을 같이 보면 경계가 선명해져.
