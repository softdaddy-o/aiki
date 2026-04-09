---
title: Karpathy, RAG 대신 마크다운 위키로 지식 관리하는 방법 공개
date: "2026-04-06T12:00:00+09:00"
lang: ko
category: news
summary: Andrej Karpathy가 GitHub Gist에 'LLM Knowledge Bases'를 공개했다. RAG나 벡터 DB 없이, LLM이 원본 문서를 마크다운 위키로 컴파일하고 Obsidian으로 탐색하는 구조다. 기사 100개, 40만 단어 규모에서 복잡한 Q&A가 가능하다고 한다.
readerValue: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하게 해준다.
sourceUrl: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
sourceTitle: Karpathy GitHub Gist
draft: false
score: 68
factCheck:
  status: passed
  date: "2026-04-06"
  sources:
    - url: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
      title: Karpathy Gist 원문
    - url: https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an/
      title: VentureBeat 보도
    - url: https://academy.dair.ai/blog/llm-knowledge-bases-karpathy
      title: DAIR.AI 분석
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 맞춰봤다.
      items:
        - "독자 문제 대조: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 먼저 갈라 봐야 해."
        - "제목 대조: 기사 제목은 \"Karpathy, RAG 대신 마크다운 위키로 지식 관리하는 방법 공개\"이고, 원문 제목은 \"Karpathy GitHub Gist\"로 잡혔어."
        - "출처 대조: 대표 원문 도메인은 gist.github.com로 잡혔어."
        - "태그 대조: 이 글의 핵심 축은 karpathy, 지식관리, RAG, Obsidian로 읽었어."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 원문 하나만 믿지 않으려고 관련 출처 3건을 옆에 두고 다시 봤다.
      items:
        - "비교 기준: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 먼저 갈라 봐야 해."
        - "비교 출처 1: Karpathy Gist 원문 (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)"
        - "비교 출처 2: VentureBeat 보도 (https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an/)"
        - "비교 출처 3: DAIR.AI 분석 (https://academy.dair.ai/blog/llm-knowledge-bases-karpathy)"
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 한 번 더 봤다.
      items:
        - "숫자 포인트: 원문에서 다시 본 숫자나 버전 표기는 100, 40, 4, 3 쪽이야."
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸렀다.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.
        - 출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.
      findings: []
tags:
  - karpathy
  - 지식관리
  - RAG
  - Obsidian
  - LLM
---

## RAG도 벡터 DB도 안 쓴대

Andrej Karpathy가 4월 3일 GitHub Gist에 ['LLM Knowledge Bases'](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)라는 글을 올렸어. 방법이 생각보다 단순해. 원본 문서를 LLM한테 주고, 구조화된 마크다운 위키로 컴파일시키는 거야. 백링크도 자동 생성되고. 프론트엔드는 [Obsidian](https://obsidian.md/).

[VentureBeat](https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an/) 등 여러 매체에서 다뤘어.

## 3개 레이어로 돼 있어

- **Raw Layer**: 기사, 논문, 이미지 등 원본 문서. LLM이 읽기만 하고 수정은 안 해.
- **Wiki Layer**: LLM이 원본을 요약하고, 핵심 개념을 추출해서 백과사전 스타일 글을 써. 관련 개념 간 백링크도 자동으로 연결해줘.
- **Health Check**: LLM이 위키를 스캔하면서 불일치, 누락 데이터, 새로운 연결을 찾아.

기사 약 100개, 40만 단어 규모에서 RAG 파이프라인 없이 복잡한 Q&A가 가능하대.

## 토큰을 코딩 대신 지식에 쓰겠다는 거지

Karpathy 본인이 "내 토큰 사용량의 큰 비중이 이제 코드가 아니라 지식 쪽으로 가고 있다"고 했어. Tesla AI 디렉터 출신이자 OpenAI 공동창립자가 코딩 대신 지식 관리에 AI를 집중 투입하겠다는 건데. 벡터 DB 세팅에 시간 쓰기 전에, Obsidian이나 Logseq 같은 도구에 LLM을 붙여보는 것도 방법이야.
