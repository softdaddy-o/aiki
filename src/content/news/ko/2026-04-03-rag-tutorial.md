---
title: "RAG가 뭔가요? — 5분 비주얼 가이드"
date: "2026-04-03T10:00:00+09:00"
lang: ko
category: tutorial
summary: "검색 증강 생성(RAG)을 애니메이션으로 쉽게 이해하기. 비전공자를 위한 인터랙티브 설명."
factCheck:
  status: passed
  date: "2026-04-03"
  sources:
    - url: "https://arxiv.org/abs/2005.11401"
      title: "RAG 원논문"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: number_verify
      result: skip
    - type: adversarial
      result: pass
      findings:
        - "RAG가 모든 환각을 해결하는 것은 아님. 검색 품질에 의존."
tags: ["rag", "tutorial", "beginner"]
---

RAG(Retrieval-Augmented Generation)는 LLM이 답변하기 전에 관련 문서를 먼저 검색하는 기법이다.

일반 LLM은 학습 데이터에만 의존하지만, RAG는 실시간 데이터를 검색해서 답변에 포함시킨다.
