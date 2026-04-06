---
title: "Karpathy, RAG 대신 마크다운 위키로 지식 관리하는 방법 공개"
date: "2026-04-06T12:00:00+09:00"
lang: ko
category: news
summary: "Andrej Karpathy가 GitHub Gist에 'LLM Knowledge Bases'를 공개했다. RAG나 벡터 DB 없이, LLM이 원본 문서를 마크다운 위키로 컴파일하고 Obsidian으로 탐색하는 구조다. 기사 100개, 40만 단어 규모에서 복잡한 Q&A가 가능하다고 한다."
sourceUrl: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
sourceTitle: "Karpathy GitHub Gist"
draft: false
score: 68
factCheck:
  status: passed
  date: "2026-04-06"
  sources:
    - url: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
      title: "Karpathy Gist 원문"
    - url: "https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an/"
      title: "VentureBeat 보도"
    - url: "https://academy.dair.ai/blog/llm-knowledge-bases-karpathy"
      title: "DAIR.AI 분석"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 3
    - type: number_verify
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "100개 기사/40만 단어는 '중간 규모'로, 기업 지식베이스(수만 건)에는 RAG가 여전히 필요할 수 있음"
tags: ["karpathy", "지식관리", "RAG", "Obsidian", "LLM"]
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
