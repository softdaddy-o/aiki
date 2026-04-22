---
title: "OpenAI, GPT-5.4로 기업 시장 공략 — 컴퓨터 사용 75%, 1M 토큰 컨텍스트"
date: "2026-04-23T09:10:00+09:00"
lang: ko
category: news
summary: "OpenAI가 기업용 AI 시장에서 GPT-5.4를 전면에 내세우고 있어. SWE-bench Pro 57.7%, OSWorld 컴퓨터 사용 75%, GDPval 83% 성적에 1M+ 토큰 컨텍스트를 지원해. 5단계 추론 강도 조절 기능이 비용 최적화의 골자야."
sourceUrl: "https://openai.com/business/"
sourceTitle: "OpenAI"
draft: false
score: 110
sourceCount: 26
readerValue: "AI 도구 도입을 결정해야 하는 상황에서 GPT-5.4가 실제로 어떤 작업에 유용한지 파악할 수 있어"
factCheck:
  status: passed
  date: "2026-04-23"
  sources:
    - url: "https://openai.com/index/introducing-gpt-5-2/"
      title: "OpenAI — Introducing GPT-5.2"
    - url: "https://www.nxcode.io/resources/news/gpt-5-4-complete-guide-features-pricing-models-2026"
      title: "NxCode — GPT-5.4 Complete Guide 2026"
  checks:
    - type: source_match
      result: pass
      summary: "GPT-5.4 3개 벤치마크 수치, 1M 컨텍스트, 5단계 추론 강도 기능을 WebSearch 요약에서 확인했어."
      items:
        - "SWE-bench Pro 57.7% — NxCode GPT-5.4 가이드 확인"
        - "OSWorld 75% (컴퓨터 사용) — NxCode GPT-5.4 가이드 확인"
        - "GDPval 83% — NxCode GPT-5.4 가이드 확인"
        - "5단계 추론 강도 조절, 1M+ 컨텍스트 — NxCode 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "NxCode, TokenMix, Wikipedia 등 복수 출처에서 GPT-5.4 기능을 교차확인했어."
      items:
        - "Wikipedia GPT-5 페이지에서 GPT-5 계열 모델 릴리스 이력 확인"
        - "NxCode에서 GPT-5.4 Mini/Nano 3월 17일 출시 확인"
    - type: number_verify
      result: pass
      summary: "벤치마크 수치(57.7%/75%/83%), API 가격($2.50/$15, $30/$180, $0.40/$1.60), '6배 저렴' 계산이 다 맞아."
      items:
        - "$2.50/$15 standard vs $30/$180 Pro: Pro = 12배 비쌈 (기사 미언급)"
        - "$2.50 vs $0.40: 6.25배 → '약 6배' 표현 ✅"
        - "GPT-5.4 Mini SWE-bench 54.38% — NxCode 확인"
    - type: adversarial
      result: pass
      summary: "벤치마크 수치가 OpenAI 자체 측정이거나 제3자 요약본이라 독립 검증이 필요해. 가격도 변경될 수 있어."
      items:
        - "SWE-bench Pro/OSWorld/GDPval 수치가 OpenAI 공식 릴리스 노트보다 제3자 요약 기반"
        - "API 가격은 공개 시점 기준이며 향후 변경 가능"
        - "Computer Use API OSWorld 75%: '화면을 직접 읽고 클릭'하는 모든 작업이 75% 성공한다는 뜻이 아님"
      findings:
        - "SWE-bench Pro 57.7%, OSWorld 75%, GDPval 83%는 WebSearch 요약 기반 — 공식 OpenAI 릴리스 노트 교차확인 권장"
        - "API 가격($2.50/$15, $30/$180)은 공개 시점 기준이며 변경될 수 있음"
tags: ["openai", "gpt", "gpt-5", "enterprise", "computer-use"]
formatVersion: 2
guideVersion:
  common: "1.0.0"
  news: "2.1.0"
---

OpenAI가 기업 시장에서 [GPT-5.4](https://openai.com/business/)를 중심으로 포지셔닝을 강화하고 있어. 올해 3월 출시된 GPT-5.4는 세 가지 벤치마크에서 뚜렷한 숫자를 냈는데 — SWE-bench Pro(코딩) 57.7%, OSWorld(컴퓨터 사용) 75%, GDPval(지식 업무) 83%야. 특히 컴퓨터 사용 75%는 화면을 직접 읽고 클릭하는 작업을 자동화할 수 있다는 뜻이거든.

## 1M 컨텍스트 + 5단계 추론 강도가 포인트야

컨텍스트 윈도우가 100만 토큰을 넘는다는 건 긴 계약서, 코드베이스, 리서치 문서를 한 번에 집어넣을 수 있다는 거야. 여기에 추론 강도를 5단계로 조절하는 기능이 붙어 있어 — 단순 Q&A는 낮은 강도로 빠르게, 복잡한 분석은 높은 강도로 정확하게 처리하는 거야. 비용 측면에서 실용적인 선택지가 생긴 셈이야.

API 가격은 input/output 기준 $2.50/$15 per MTok(백만 토큰)이고, 더 많은 성능이 필요하면 Pro 버전이 $30/$180야. Mini 버전은 SWE-bench Pro 54.38%에 가격이 약 6배 저렴해서 ($0.40/$1.60) 비용 민감한 작업에는 Mini가 현실적인 선택이야.

## 지금 기업들이 GPT-5.4에 관심 갖는 이유

단순 텍스트 생성이 아니라 컴퓨터를 직접 조작하는 Computer Use API가 이번 릴리스의 포인트야. RPA(Robotic Process Automation) 도구를 굳이 별도로 설치하지 않아도 GPT-5.4가 브라우저나 앱 UI를 직접 다룰 수 있거든. 반복 업무 자동화를 검토 중인 팀이라면 먼저 OSWorld 75%가 어떤 시나리오에서 나온 숫자인지 체크해보는 게 좋아 — 벤치마크가 실제 업무 환경과 항상 일치하진 않으니까.
