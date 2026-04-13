---
term: copilot
title: "GitHub Copilot"
lang: ko
summary: "GitHub Copilot은 GitHub 및 OpenAI가 개발한 코드 완성 및 프로그래밍 AI 도우미로, 코드 자동 완성을 통해 Visual Studio Code, Visual Studio, Neovim, Eclipse 및 JetBrains 통합 개발 환경(IDE) 사용자를 지원합니…"
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하는 데 도움이 돼."
category: tool
aliases:
  - "GitHub Copilot"
relatedTerms:
  - claude-code
  - codex
  - cursor
  - aider
firstMentioned: "2021-06-29"
mentionCount: 8
draft: true
tags:
  - coding-agent
  - developer-tools
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/GitHub_Copilot"
      title: "GitHub Copilot"
    - url: "https://github.com/features/copilot"
      title: "GitHub Copilot · Your AI pair programmer"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 GitHub 및 OpenAI가 개발한 코드 완성 및 프로그래밍 AI 도우미로, 코드 자동 완성을 통해 Visual Studio Code, Visual Studio, Neovim, Eclipse 및 JetBrains 통합 개발 환경(IDE) 사용자를 지원합니다."
        - "원문을 보면 GitHub 및 OpenAI가 개발한 코드 완성 및 프로그래밍 AI 도우미로, 코드 자동 완성을 통해 Visual Studio Code, Visual Studio, Neovim, Eclipse 및 JetBrains 통합 개발 환경(IDE) 사용자를 지원합니다."
        - "명칭 대조: 페이지 이름 표기가 일관되게 유지되는지 확인했어."
        - "분류를 다시 보면 이 항목은 도구로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 사용자는 생성에 사용되는 대규모 언어 모델을 선택할 수 있습니다."
        - "교차 대조: 사용자는 생성에 사용되는 대규모 언어 모델을 선택할 수 있습니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: github.com."
    - type: number_verify
      result: pass
      summary: "설명에 직접 걸리는 숫자와 표기를 한 번 더 검증해뒀어 확인했어."
      items:
        - "숫자를 다시 보면 29 같은 표기가 실제 기준점으로 잡혀."
        - "숫자를 다시 보면 2021. 같은 표기가 실제 기준점으로 잡혀."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 모델 자체와 같은 말로 쓰면 제품 층위와 운영 층위가 섞이기 쉬워."
        - "헷갈리기 쉬운 건 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
---
## 한 줄 정의
GitHub Copilot를 짧게 잡으면 GitHub 및 OpenAI가 개발한 코드 완성 및 프로그래밍 AI 도우미로, 코드 자동 완성을 통해 Visual Studio Code, Visual Studio, Neovim, Eclipse 및 JetBrains 통합 개발 환경(IDE) 사용자를 지원합니다 쪽이야. 코드베이스를 읽고 파일을 수정하고 CLI 명령을 실행하거나 IDE와 연결하는 흐름에서 존재감이 커.
## 실제로 무엇을 하나
사용자는 생성에 사용되는 대규모 언어 모델을 선택할 수 있습니다. 코드베이스를 읽고 파일을 수정하고 CLI 명령을 실행하거나 IDE와 연결하는 흐름에서 존재감이 커. 예를 들어 리포지토리를 탐색하고 파일을 고치고 테스트를 돌리는 코딩 보조 흐름이 여기에 들어가.
## 왜 중요한가
실제로는 모델 성능이 비슷할 때 생산성을 가르는 건 이런 도구와 워크플로인 경우가 많아. 모델 자체와 같은 층위로 읽으면 도입 범위와 운영 책임을 헷갈리기 쉬워.
## 관련 용어
- [Claude Code](/ko/wiki/claude-code/) — Claude Code와 비교해 보면 개발 생산성과 코딩 워크플로에서 어디가 다른지 읽기 쉬워.
- [Codex](/ko/wiki/codex/) — Codex와 비교해 보면 개발 생산성과 코딩 워크플로에서 어디가 다른지 읽기 쉬워.
- [Cursor](/ko/wiki/cursor/) — Cursor와 비교해 보면 개발 생산성과 코딩 워크플로에서 어디가 다른지 읽기 쉬워.
- [Aider](/ko/wiki/aider/) — Aider와 비교해 보면 개발 생산성과 코딩 워크플로에서 어디가 다른지 읽기 쉬워.