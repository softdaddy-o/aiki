---
title: 배우가 만든 AI 메모리 툴 — MemPalace, 유료 경쟁자 제쳤다
date: "2026-04-09T12:00:00+09:00"
lang: ko
category: news
summary: 밀라 요보비치와 개발자 Ben Sigman이 만든 오픈소스 AI 메모리 시스템 MemPalace가 출시 3일 만에 GitHub 스타 23,000개를 넘겼다. LongMemEval 96.6% 달성, 유료 경쟁 제품보다 높다.
readerValue: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하는 데 도움이 된다.
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
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 확인해뒀어.
      items:
        - 독자가 먼저 갈라 봐야 할 건 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지.
        - "제목부터 다시 보면 기사 제목은 \"배우가 만든 AI 메모리 툴 — MemPalace, 유료 경쟁자 제쳤다\"이고, 원문 제목은 \"GitHub: MemPalace\"로 잡혔어."
        - 출처를 다시 보면 대표 원문 도메인은 github.com로 잡혔어.
        - 이 글의 축을 다시 보면 이 글의 핵심 축은 오픈소스, AI메모리, MemPalace, 로컬AI로 읽었어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 원문 하나만 믿지 않으려고 관련 출처 3건을 옆에 두고 비교해뒀어.
      items:
        - 여기서 먼저 갈라 볼 기준은 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지.
        - 같이 본 출처로는 GitHub MemPalace (https://github.com/milla-jovovich/mempalace)
        - 같이 본 출처로는 Cybernews (https://cybernews.com/ai-news/milla-jovovich-mempalace-memory-tool/)
        - 같이 본 출처로는 MemPalace 공식 사이트 (https://www.mempalace.tech/)
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 검증해뒀어.
      items:
        - 숫자를 다시 보면 원문에서 다시 본 숫자나 버전 표기는 3, 23, 000, 96.6% 쪽이야.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸러뒀어.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.
        - 출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.
      findings: []
tags:
  - 오픈소스
  - AI메모리
  - MemPalace
  - 로컬AI
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
formatVersion: 2
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
    news: "3.1.2"
  panelVerdict: pass
  contentHash: "540a7b05956e3c3b"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

4월 6일에 나온 [MemPalace](https://github.com/milla-jovovich/mempalace)가 3일 만에 GitHub 스타 23,000개를 넘겼어. 만든 사람이 좀 특이한데 — 영화 바이오하자드로 유명한 배우 밀라 요보비치와 개발자 Ben Sigman이야. LongMemEval 벤치마크에서 96.6%(raw 기준)를 달성했고, 월 $19~249짜리 Mem0나 $25+짜리 Zep보다 점수가 높아.

## 왜 중요할까

작동 방식은 심플해. 대화 내용을 AI가 요약하는 게 아니라 전부 그대로 저장하고, 벡터 검색으로 꺼내 쓰는 구조거든. ChromaDB와 SQLite로 로컬에서 돌리니까 API 비용이 0원이야. AI 요약이 맥락을 날리는 문제를 원천 차단한 셈.

## 앞으로 볼 점

LLM에 기억을 붙이고 싶었던 사람들한테는 당장 시도해볼 만한 선택지야. 유료 서비스 쓰기 전에 로컬에서 먼저 테스트해보는 것도 방법이거든.
