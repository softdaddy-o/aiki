---
title: "배우가 만든 AI 메모리 툴 — MemPalace, 유료 경쟁자 제쳤다"
date: "2026-04-09T12:00:00+09:00"
lang: ko
category: news
summary: "밀라 요보비치와 개발자 Ben Sigman이 만든 오픈소스 AI 메모리 시스템 MemPalace가 출시 3일 만에 GitHub 스타 23,000개를 넘겼다. LongMemEval 96.6% 달성, 유료 경쟁 제품보다 높다."
sourceUrl: "https://github.com/milla-jovovich/mempalace"
sourceTitle: "GitHub: MemPalace"
draft: false
readerValue: LLM에 무료로 메모리를 붙이는 구체적 선택지를 파악하고 바로 시도해볼 수 있게 해준다.
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://github.com/milla-jovovich/mempalace"
      title: "GitHub MemPalace"
    - url: "https://cybernews.com/ai-news/milla-jovovich-mempalace-memory-tool/"
      title: "Cybernews"
    - url: "https://www.mempalace.tech/"
      title: "MemPalace 공식 사이트"
  checks:
    - type: source_match
      result: pass
      summary: GitHub·공식 사이트·Cybernews 원문 대조로 핵심 사실 확인
      items:
        - "4월 6일 출시 — GitHub 커밋 이력 확인"
        - "LongMemEval 96.6%(raw) — 공식 사이트 벤치마크 기재 확인"
        - "ChromaDB + SQLite 스택 — GitHub README 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: GitHub, 공식 사이트, Cybernews 교차검증
      items:
        - "GitHub: 23,000+ 스타, 밀라 요보비치 + Ben Sigman 작성자 확인"
        - "공식 사이트: 벤치마크 수치 및 아키텍처 일치"
        - "Cybernews: '100% hybrid' 수치 논란 맥락 보도 일치"
    - type: number_verify
      result: pass
      summary: 기사 내 수치 개별 확인
      items:
        - "23,000 GitHub 스타 — 검색 결과 복수 출처 확인 ✅"
        - "96.6%(raw 기준) — 공식 사이트 기재 (100% hybrid는 방법론 논란 있어 제외) ✅"
        - "Mem0 $19~249/mo — 공식 가격 페이지 기준 ✅"
        - "Zep $25/mo+ — 공식 가격 기준 ✅"
    - type: adversarial
      result: pass
      summary: 과장·인과 오류 비판적 검토
      items:
        - "'100% hybrid' 수치는 방법론 논란 있음 — 본문에서 96.6%로 표기"
        - "Mem0, Zep 가격은 플랜에 따라 변동 가능 — 범위로 표기"
      findings:
        - "'100% hybrid' 수치는 방법론 논란이 있음 — raw 96.6%가 실제 비교 기준으로 더 정확"
        - "Mem0, Zep 가격은 플랜에 따라 변동 가능"
tags: ["오픈소스", "AI메모리", "MemPalace", "로컬AI"]
score: 75
---

4월 6일에 나온 [MemPalace](https://github.com/milla-jovovich/mempalace)가 3일 만에 GitHub 스타 23,000개를 넘겼어. 만든 사람이 좀 특이한데 — 영화 바이오하자드로 유명한 배우 밀라 요보비치와 개발자 Ben Sigman이야. LongMemEval 벤치마크에서 96.6%(raw 기준)를 달성했고, 월 $19~249짜리 Mem0나 $25+짜리 Zep보다 점수가 높아.

작동 방식은 심플해. 대화 내용을 AI가 요약하는 게 아니라 전부 그대로 저장하고, 벡터 검색으로 꺼내 쓰는 구조거든. ChromaDB와 SQLite로 로컬에서 돌리니까 API 비용이 0원이야. AI 요약이 맥락을 날리는 문제를 원천 차단한 셈.

LLM에 기억을 붙이고 싶었던 사람들한테는 당장 시도해볼 만한 선택지야. 유료 서비스 쓰기 전에 로컬에서 먼저 테스트해보는 것도 방법이거든.
