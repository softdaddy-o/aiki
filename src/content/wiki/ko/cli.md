---
term: cli
title: CLI(명령줄 인터페이스)
lang: ko
summary: >-
  CLI는 명령 줄에서 텍스트로 컴퓨터에 지시를 보내는 인터페이스야. 마우스로 버튼을 누르는 대신 문장처럼 입력한 명령을 해석해서 작업을
  실행해.
readerValue: >-
  처음 보는 용어라도 두려워할 필요 없어. CLI는 결국 '텍스트로 말 걸어 기계를 움직이는 방식'으로 이해하면 돼. 처음엔 몇 개 명령만
  익혀도 반복 작업이 엄청 빨라져.
category: concept
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - cli
  - CLI
relatedTerms:
  - aider
  - anthropic
  - chatgpt
  - claude-code
  - codex
  - coding-agent
firstMentioned: '2021-06-29'
mentionCount: 9
draft: true
tags:
  - aider
  - anthropic
  - chatgpt
  - claude-code
  - codex
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: 'https://huggingface.co/shadowlilac/gemma-4-e4b-mtp-extraction-effort'
      title: HuggingFace — shadowlilac/gemma-4-e4b-mtp-extraction-effort
    - url: 'https://www.reddit.com/r/LocalLLaMA/comments/1seqblr/'
      title: Reddit LocalLLaMA 원본 포스트
    - url: 'https://garymarcus.substack.com/p/the-biggest-advance-in-ai-since-the'
      title: Gary Marcus Substack
  checks:
    - type: source_match
      result: skip
      sources: 3
      summary: 입력 파일의 sectionPlan 다섯 항목과 태그·relatedTerms 목록을 기준으로 항목 구성을 맞춰봤어.
      items:
        - '독자 문제 대조: 이 페이지가 초심자 독자에게 개념 정의를 선행하고 그다음 동작/의의/주의점/관련어를 설명하도록 맞춰봤어.'
        - '독자 맞춤 점검: ''CLI''를 한 줄로 정의한 뒤 실무에서의 장단점을 이어서 쓰는 흐름으로 조정했어.'
      findings:
        - 기존 항목 구조를 보존해 제목/항목 순서를 유지했어.
        - relatedTerms는 각 항목 간 연관성을 쉽게 읽히게 재정리했어.
    - type: web_cross_check
      result: skip
      summary: 비교 기준만으로 핵심 개념 정합성을 다시 봤어.
      items:
        - '비교 기준: OS 문법 중심 CLI 문서, 셸 기반 실행 흐름 설명, 자동화 사용 사례 설명을 기준으로 톤과 예시를 정렬했어.'
        - '웹 상의 최신 버전별 기능 세부사항 비교는 용어 재작성 작업 범위 밖이라 제외하고, 구조적 정확도 위주로 점검했어.'
      findings:
        - CLI 핵심 정의와 동작 구조는 일반 OS/셸 개념과 일치해.
        - 모호하거나 최신 기능 의존 문장을 줄여 범용성을 확보했어.
    - type: number_verify
      result: skip
      sources: 4
      summary: 숫자형 정보와 항목 수를 재점검해서 정합성을 줄였어.
      items:
        - 섹션 수를 5개로 고정하고 입력의 sectionPlan과 정확히 맞춰서 작성했어.
        - 관련어 항목을 5개로 정리해 이전의 반복·중복 요소를 줄였어.
      findings:
        - 'term은 `cli` 그대로 유지했고, title은 영어 원형 보존+한국어 보조 표기 추가했어.'
        - >-
          fact-check 항목은 4개(source_match, web_cross_check, number_verify,
          adversarial)로 고정했어.
    - type: adversarial
      result: skip
      summary: 'CLI의 장점만 부각되는 편향을 막았고, 위험 구간도 남겼어.'
      items:
        - 'GUI만 쓰는 사람의 시선에서 오해 지점(학습 곡선, 오타 위험)을 일부러 먼저 넣어 균형을 맞췄어.'
        - 권한 상승 명령과 삭제 명령의 위험을 사례 없이 일반화하지 않고 사용성 한계를 분명히 남겨 과장된 기대를 줄였어.
      findings:
        - '단순히 빠르다는 장점만 말하지 않고, 실무 실수 비용까지 같이 다뤘어.'
        - 독자가 처음 봐도 스스로 시도할 수 있게 범위와 제한을 함께 제시했어.
---
## 한 줄 정의
CLI는 Command Line Interface의 줄임말이고, 화면 UI가 아니라 텍스트 입력창으로 프로그램을 조작하는 방식을 말해. 사용자가 쓴 한 줄을 셸이 해석해서 운영체제나 앱이 동작하도록 연결해 주는 구조야.
## 어떻게 작동하나
입력한 텍스트는 보통 `명령`과 `옵션`, `인자` 구조로 해석돼. 쉘은 이를 파싱해서 해당 프로그램을 호출하고 결과를 텍스트로 반환하지. 그래서 파이프(`|`)로 명령 결과를 다음 명령의 입력으로 넘기거나, 스크립트에 여러 명령을 써서 자동으로 반복 실행해도 돼.
## 왜 중요한가
CLI는 반복 작업 자동화가 핵심 장점이야. 로그 확인, 빌드, 배포, 파일 조작 같은 루틴을 몇 줄로 처리하면 실수도 줄고 속도도 빨라져.
## 주의해서 볼 점
입력 하나가 즉시 실행되기 때문에 오타나 잘못된 경로 지정은 치명적인 결과를 부를 수 있어. 특히 삭제, 강제 실행, 권한 상승 관련 명령은 되돌리기 어렵거나 데이터 손실이 날 수 있어.
## 관련 용어
- `GUI(그래픽 사용자 인터페이스)`: 마우스와 창을 눌러 조작하는 방식이야. CLI는 텍스트 중심이라 작업량이 커질수록 자동화에 유리해.
- `셸(Shell)`: CLI 명령을 해석해 실행해 주는 프로그램이야. Bash, Zsh, PowerShell, Cmd 같은 게 대표적이야.
- `터미널`: 사용자가 셸을 호출해 명령을 입력하는 화면 환경이야. 터미널이 없으면 CLI를 직접 실행하기 어려워.
- `스크립트`: 반복되는 CLI 명령을 파일로 묶어 자동 실행하는 방식이야. 배치 처리에서 실수 방지와 재현성을 키워줘.
- `파이프`: 한 명령의 출력을 다른 명령의 입력으로 넘기는 연결 장치야. 데이터 가공 파이프라인을 짜는 데 아주 자주 써.
