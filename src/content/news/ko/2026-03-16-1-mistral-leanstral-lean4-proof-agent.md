---
title: "Mistral AI ??, 가 Lean 4 전용 오픈소스 코드 에이전트 Leanstral을 공개했다. 119B 파..."
date: "2026-03-16T12:00:00+09:00"
lang: ko
category: news
summary: "Mistral AI가 Lean 4 전용 오픈소스 코드 에이전트 Leanstral을 공개했다. 119B 파라미터(활성 6.5B) 구조로 pass@2 기준 Claude Sonnet을 2.6점 앞서면서, 실행 비용은 $36 대 $549로 압도적으로 낮다. Apache 2.0 라이선스로 무료 API 엔드포인트도 제공한다."
sourceUrl: "https://mistral.ai/news/leanstral"
sourceTitle: "Mistral AI"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 80
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://mistral.ai/news/leanstral"
      title: "Leanstral: Open-Source foundation for trustworthy vibe-coding | Mistral AI"
    - url: "https://huggingface.co/mistralai/Leanstral-2603"
      title: "mistralai/Leanstral-2603 · Hugging Face"
    - url: "https://docs.mistral.ai/models/leanstral-26-03"
      title: "Leanstral - Mistral AI Docs"
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
      findings: []
tags: ["mistral", "lean4", "open-source", "formal-verification", "code-agent"]
---

Mistral AI가 3월 16일 Lean 4 전용 오픈소스 증명 에이전트 **[Leanstral](https://mistral.ai/news/leanstral)**을 공개했어. 형식 검증(formal verification) 분야에서 AI가 실제로 쓸 만한 오픈소스 도구가 나온 건데, 숫자가 꽤 설득력 있거든.

모델은 총 119B 파라미터에 활성 파라미터는 6.5B인 스파스 구조야. MiniF2F 벤치마크 pass@2 기준 점수가 26.3으로 Claude Sonnet(23.7)을 2.6점 앞서고, 비용은 실행당 $36 대 $549로 약 15배 차이가 나. pass@16에서도 31.9로 Sonnet보다 8점 높아.

Leanstral이 다른 건 Lean의 Language Server Protocol을 MCP로 연결한다는 점이야. 프루프가 실패하면 실제 컴파일러 오류 메시지를 읽어서 다음 시도를 수정하거든. 추측이 아닌 컴파일러 피드백 기반 반복이라 perfectoid space 같은 복잡한 수학 객체나 Rust 코드 명세 검증에도 바로 쓸 수 있어.

[Apache 2.0 라이선스](https://huggingface.co/mistralai/Leanstral)로 HuggingFace에 올라와 있고, Mistral Vibe 에이전트 모드와 무료 API 엔드포인트로도 쓸 수 있어. FLTEval 평가 스위트와 기술 리포트도 함께 공개됐어.
