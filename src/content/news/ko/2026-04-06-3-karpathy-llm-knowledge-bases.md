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
      summary: 대표 원문과 기사 메타데이터를 먼저 대조해 제목 축이 맞는지 확인했다.
      items:
        - "기사 제목 대조: Karpathy, RAG 대신 마크다운 위키로 지식 관리하는 방법 공개"
        - "원문 제목 대조: Karpathy GitHub Gist"
        - "대표 출처 도메인: gist.github.com"
        - "핵심 태그 축: karpathy, 지식관리, RAG, Obsidian"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 출처 3건을 비교해 같은 사건을 가리키는지 교차검증했다.
      items:
        - "출처 1: Karpathy Gist 원문 (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)"
        - "출처 2: VentureBeat 보도 (https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an/)"
        - "출처 3: DAIR.AI 분석 (https://academy.dair.ai/blog/llm-knowledge-bases-karpathy)"
    - type: number_verify
      result: pass
      summary: 숫자와 고유 명칭은 별도 묶음으로 다시 훑어 과장 여부를 걸렀다.
      items:
        - "수치 대조: 기사 100개, 40만 단어 규모에서 복잡한 Q&A가 가능하다고 한다."
        - "수치 대조: Andrej Karpathy가 4월 3일 GitHub Gist에 ['LLM Knowledge Bases'](https://gist.github.com/karpathy/442a6bf5559148..."
        - "수치 대조: ## 3개 레이어로 돼 있어"
        - "수치 대조: 기사 약 100개, 40만 단어 규모에서 RAG 파이프라인 없이 복잡한 Q&A가 가능하대."
    - type: adversarial
      result: pass
      summary: 헷갈리기 쉬운 해석 포인트를 비판적으로 다시 검토했다.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 확인했다.
        - 출처 성격상 주장과 해석을 분리해 독자가 바로 써먹을 판단 기준만 남겼다.
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
