---
term: aider
title: Aider(에이더)
lang: ko
summary: Aider는 터미널에서 LLM과 같이 코드를 고치고 Git 흐름까지 이어 가는 AI 페어 프로그래밍 도구야.
readerValue: '이 이름이 채팅 모델이 아니라, 기존 저장소를 열고 실제 파일 수정과 커밋 흐름까지 잇는 CLI 도구라는 걸 빨리 파악하는 데 도움이 돼.'
category: tool
guideVersion:
  common: 1.0.0
  wiki: 3.0.0
aliases:
  - 에이더
relatedTerms:
  - claude-code
  - cursor
  - codex
  - copilot
firstMentioned: '2026-02-26'
mentionCount: 1
draft: true
tags:
  - coding-agent
  - cli
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://github.com/Aider-AI/aider'
      title: Aider-AI/aider
    - url: 'https://aider.chat/'
      title: Aider - AI Pair Programming in Your Terminal
  checks:
    - type: source_match
      result: pass
      summary: 공식 문구인 'terminal pair programming'에 맞춰 Aider의 정체를 다시 맞춰봤어.
      items:
        - '독자 문제 대조: Aider를 모델이 아니라 터미널 기반 AI 페어 프로그래밍 도구로 읽게 정의했어.'
        - GitHub 소개와 공식 사이트가 공통으로 말하는 기존 코드베이스 작업 흐름을 본문 중심에 뒀어.
      findings:
        - 터미널과 코드 수정이라는 핵심을 남겼어.
    - type: web_cross_check
      result: pass
      summary: 저장소 작업과 터미널 페어 프로그래밍이라는 공통분모만 남기도록 다시 봤어.
      items:
        - >-
          비교 기준: GitHub 저장소 소개와 공식 사이트 소개를 나란히 보고 둘 다 겹치는 'terminal'과 'existing
          codebase' 표현을 우선했어.
        - 세세한 명령 옵션이나 지원 모델 목록은 페이지 목적에 비해 빨리 낡아서 넣지 않았어.
      findings:
        - 핵심 작동 방식은 두 출처에서 일치했어.
    - type: number_verify
      result: pass
      summary: '지원 모델 수나 요금처럼 바뀌기 쉬운 숫자는 빼고, Git과 diff 검토처럼 덜 흔들리는 정보만 남겼어.'
      items:
        - Aider 문맥에서는 숫자보다 어떤 작업 단위까지 이어 주는지가 더 중요해서 수치형 주장은 넣지 않았어.
        - '숫자 대신 파일 수정, diff, 커밋 흐름처럼 실제 사용 장면을 설명하게 바꿨어.'
      findings:
        - 낡기 쉬운 숫자 설명은 줄였어.
    - type: adversarial
      result: pass
      summary: 가장 흔한 오해인 '그냥 터미널 챗봇'이라는 해석을 막는 데 초점을 맞춰봤어.
      items:
        - 'Aider를 질문 답변 도구로만 읽지 않게, 실제 파일 수정과 Git 흐름을 건드린다는 점을 분명히 적었어.'
        - '반대로 완전 자동 개발 도구로 과장하지 않게, 리뷰와 테스트가 필요하다는 경계도 같이 넣었어.'
      findings:
        - 챗봇과 작업 도구의 차이를 남겼어.
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.0.0
    tone-editor: 1.0.0
    structure-editor: 1.0.0
  panelVerdict: pass
  reviewedAt: '2026-04-17'
---
## 한 줄 정의
Aider는 터미널 안에서 LLM과 짝을 이뤄 기존 코드베이스를 수정하게 도와주는 CLI 도구야. 그냥 질문만 받는 챗봇이 아니라, 어떤 파일을 바꾸고 어떤 diff를 만들지 실제 작업 단위로 이어 주는 쪽에 가깝지.
## 어떻게 작동하나
개발자는 저장소 안에서 Aider를 띄우고, 바꾸고 싶은 파일이나 목표를 지정한 뒤 대화를 이어 가면 돼. 그러면 Aider가 관련 파일을 문맥에 넣고 수정안을 만들고, 필요하면 Git 커밋 흐름까지 이어서 다뤄 볼 수 있어.
## 왜 중요한가
Aider는 새 IDE로 갈아타지 않아도 기존 터미널과 Git 습관 위에 AI 코딩을 얹을 수 있게 해 줘. 그래서 대규모 저장소를 다루는 팀이나 CLI 중심 개발자에게는 생산성 도구이면서도 작업 방식 전환 비용이 낮은 선택지로 읽혀.
## 주의해서 볼 점
Aider가 만드는 수정은 실제 파일과 히스토리에 바로 닿기 때문에, 리뷰 없는 수용은 위험할 수 있어. 모델 품질과 비용 차이도 크니까 diff 확인, 테스트 실행, 커밋 단위 관리까지 같이 보는 습관이 필요해.
## 관련 용어
- Claude Code를 같이 보면 둘 다 코드 수정까지 이어 가지만, 터미널 중심 경험과 통합 에이전트 경험이 어떻게 다른지 비교해 볼 수 있어.
- Cursor를 같이 보면 IDE 안에서 붙는 코딩 보조와 터미널에서 붙는 코딩 보조의 감각 차이가 더 잘 보여.
- Codex를 같이 보면 모델 이름이나 브랜드와 실제 실행 도구를 섞어 읽지 않는 데 도움돼.
- Copilot을 같이 보면 자동완성 중심 보조와 저장소 단위 수정 흐름 도구가 어디서 갈리는지 읽기 쉬워.
