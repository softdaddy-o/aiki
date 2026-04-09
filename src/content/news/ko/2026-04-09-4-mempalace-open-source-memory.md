---
title: 배우가 만든 AI 메모리 툴 — MemPalace, 유료 경쟁자 제쳤다
date: "2026-04-09T12:00:00+09:00"
lang: ko
category: news
summary: 밀라 요보비치와 개발자 Ben Sigman이 만든 오픈소스 AI 메모리 시스템 MemPalace가 출시 3일 만에 GitHub 스타 23,000개를 넘겼다. LongMemEval 96.6% 달성, 유료 경쟁 제품보다 높다.
readerValue: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하게 해준다.
sourceUrl: https://github.com/milla-jovovich/mempalace
sourceTitle: "GitHub: MemPalace"
draft: false
score: 75
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: https://github.com/milla-jovovich/mempalace
      title: GitHub MemPalace
    - url: https://cybernews.com/ai-news/milla-jovovich-mempalace-memory-tool/
      title: Cybernews
    - url: https://www.mempalace.tech/
      title: MemPalace 공식 사이트
  checks:
    - type: source_match
      result: pass
      summary: 원문 제목이랑 기사 메타데이터가 같은 사건을 가리키는지 먼저 맞춰봤다.
      items:
        - "기사 제목 대조: 배우가 만든 AI 메모리 툴 — MemPalace, 유료 경쟁자 제쳤다"
        - "원문 제목 대조: GitHub: MemPalace"
        - "대표 출처 도메인: github.com"
        - "핵심 태그 축: 오픈소스, AI메모리, MemPalace, 로컬AI"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 출처 3건을 나란히 놓고 정말 같은 사건을 말하는지 다시 봤다.
      items:
        - "출처 1: GitHub MemPalace (https://github.com/milla-jovovich/mempalace)"
        - "출처 2: Cybernews (https://cybernews.com/ai-news/milla-jovovich-mempalace-memory-tool/)"
        - "출처 3: MemPalace 공식 사이트 (https://www.mempalace.tech/)"
    - type: number_verify
      result: pass
      summary: 숫자와 고유 명칭은 따로 빼서 한 번 더 보고 과장된 표현을 걸렀다.
      items:
        - "수치 대조: 밀라 요보비치와 개발자 Ben Sigman이 만든 오픈소스 AI 메모리 시스템 MemPalace가 출시 3일 만에 GitHub 스타 23,000개를 넘겼다."
        - "수치 대조: LongMemEval 96.6% 달성, 유료 경쟁 제품보다 높다."
        - "수치 대조: 4월 6일에 나온 [MemPalace](https://github.com/milla-jovovich/mempalace)가 3일 만에 GitHub 스타 23,000개를 넘겼어."
        - "수치 대조: LongMemEval 벤치마크에서 96.6%(raw 기준)를 달성했고, 월 $19~249짜리 Mem0나 $25+짜리 Zep보다 점수가 높아."
    - type: adversarial
      result: pass
      summary: 헷갈릴 수 있는 해석 포인트는 한 번 더 의심해보고 정리했다.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 확인했다.
        - 출처 성격상 주장과 해석을 분리해 독자가 바로 써먹을 판단 기준만 남겼다.
      findings: []
tags:
  - 오픈소스
  - AI메모리
  - MemPalace
  - 로컬AI
---

4월 6일에 나온 [MemPalace](https://github.com/milla-jovovich/mempalace)가 3일 만에 GitHub 스타 23,000개를 넘겼어. 만든 사람이 좀 특이한데 — 영화 바이오하자드로 유명한 배우 밀라 요보비치와 개발자 Ben Sigman이야. LongMemEval 벤치마크에서 96.6%(raw 기준)를 달성했고, 월 $19~249짜리 Mem0나 $25+짜리 Zep보다 점수가 높아.

작동 방식은 심플해. 대화 내용을 AI가 요약하는 게 아니라 전부 그대로 저장하고, 벡터 검색으로 꺼내 쓰는 구조거든. ChromaDB와 SQLite로 로컬에서 돌리니까 API 비용이 0원이야. AI 요약이 맥락을 날리는 문제를 원천 차단한 셈.

LLM에 기억을 붙이고 싶었던 사람들한테는 당장 시도해볼 만한 선택지야. 유료 서비스 쓰기 전에 로컬에서 먼저 테스트해보는 것도 방법이거든.
