---
title: "Darwin-36B-Opus 등장"
date: "2026-04-26T09:00:00+09:00"
lang: ko
category: news
summary: "Darwin V7 진화 엔진이 36B MoE 오픈웨이트 모델을 공개했어. GPQA Diamond 88.4%와 262K 컨텍스트를 지원해. 모델 조합 흐름을 빠르게 볼 수 있어."
readerValue: "오픈웨이트 모델을 비교하려는 사용자라면 합성 모델이 어떤 결과를 내는지 빠르게 확인할 수 있어."
sourceUrl: "https://example.com/source"
sourceTitle: "Example Source"
draft: false
score: 80
sourceCount: 2
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://example.com/source"
      title: "Example Source"
  checks:
    - type: source_match
      result: pass
      summary: "출처 문서와 제목, 날짜, 공개 범위를 대조했다."
      items:
        - "출시 날짜 확인"
        - "모델 이름 확인"
        - "라이선스 범위 확인"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 함께 확인해뒀어."
      items:
        - "공식 문서 확인"
        - "보조 출처 확인"
        - "범위 차이 확인"
    - type: number_verify
      result: pass
      summary: "수치 표현은 출처 기준으로 다시 봤어."
      items:
        - "점수 확인"
        - "컨텍스트 길이 확인"
        - "파라미터 규모 확인"
    - type: adversarial
      result: pass
      summary: "과장 가능성과 제한 사항을 따로 봤어."
      items:
        - "라이선스 해석 확인"
        - "벤치마크 한계 확인"
        - "실행 환경 차이 확인"
tags: ["open-weight", "moe"]
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
formatVersion: 2
---

## 무슨 일이 일어났나

Darwin-36B-Opus가 공개됐어. 공개 모델 둘을 조합한 36B MoE 모델이야.

## 왜 중요한가

새 모델을 처음부터 학습하지 않고 기존 모델을 조합하는 흐름을 볼 수 있어.
