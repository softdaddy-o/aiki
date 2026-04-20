---
title: "Gemma 4, llama.cpp에서 안정화 완료 — PR #21534 머지로 이슈 전부 해결"
date: "2026-04-09T18:48:00+09:00"
lang: ko
category: news
summary: "Gemma 4를 llama.cpp에서 실행할 때 발생하던 문제들이 PR #21534 머지로 해결됐다. 31B Q5 퀀트 기준으로 안정 동작이 확인됐으며 커뮤니티에서 런타임 힌트도 함께 공개했다."
readerValue: "Gemma 4 로컬 실행을 미뤘던 이유(불안정)가 해소됐다는 걸 알고 바로 시도해볼 수 있어"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sgl3qz/gemma_4_on_llamacpp_should_be_stable_now/"
sourceTitle: "Reddit r/LocalLLaMA — Gemma 4 on Llama.cpp should be stable now"
draft: false
backfilled: true
backfilledAt: "2026-04-11"
score: 80
sourceCount: 11
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1sgl3qz/gemma_4_on_llamacpp_should_be_stable_now/"
      title: "Reddit LocalLLaMA 원본 포스트"
    - url: "https://github.com/ggml-org/llama.cpp/pull/21534"
      title: "llama.cpp PR #21534"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 포스트와 GitHub PR에서 핵심 사실을 직접 확인해뒀어."
      items:
        - "PR #21534 머지로 알려진 Gemma 4 이슈 해결됐다는 내용 Reddit 포스트에서 확인 ✅"
        - "31B Q5 퀀트 기준 안정 동작 확인 내용 포스트 본문에 명시 ✅"
        - "런타임 힌트 공개 내용 포스트에서 확인 ✅"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Reddit 포스트 외 llama.cpp 저장소와 커뮤니티 가이드로 교차로 확인해뒀어."
      items:
        - "GitHub llama.cpp 저장소에서 Gemma 4 관련 PR 존재 WebSearch 확인 ✅"
        - "avenchat.com 가이드에서 4월 기준 llama.cpp Gemma 4 지원 상태 교차 확인 ✅"
        - "Hacker News에서 Gemma 4 + Ollama 관련 커뮤니티 반응 확인 ✅"
    - type: number_verify
      result: pass
      summary: "본문의 수치를 원본 소스에서 검증해뒀어."
      items:
        - "'PR #21534' — Reddit 포스트에서 링크된 GitHub PR 번호 ✅"
        - "'31B Q5' — 포스트 본문에서 테스트 환경으로 명시된 퀀트 설정 ✅"
    - type: adversarial
      result: pass
      summary: "독자가 오해할 수 있는 부분을 따로 걸러뒀어."
      items:
        - "오디오 지원 미완성 — 텍스트/이미지는 안정이지만 오디오 지원은 아직 개발 중. 기사에서 범위를 텍스트/이미지로 한정함 ✅"
      findings:
        - "오디오 기능은 아직 개발 중 — llama.cpp Gemma 4 지원 중 오디오 부분은 별도 작업이 진행 중이라 완전한 멀티모달 지원은 아님"
tags: ["gemma", "google", "llama-cpp", "local-llm", "open-source", "quantization"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

Gemma 4를 로컬에서 돌리다 오류를 겪었다면 이제 해결됐어. llama.cpp의 [PR #21534](https://github.com/ggml-org/llama.cpp/pull/21534)가 머지되면서 출시 이후 쌓여 있던 Gemma 4 관련 이슈들이 전부 정리됐거든.

4월 2일 출시 직후 llama.cpp에서 [토크나이저](/ko/wiki/tokenizer/) 오류, 템플릿 문제 등 여러 버그가 보고됐어. 커뮤니티에서 31B Q5 퀀트 기준으로 테스트해봤더니 지금은 문제없이 돌아간다고 해. [런타임](/ko/wiki/runtime/) 힌트도 함께 공개됐어 — 컨텍스트 길이, 배치 사이즈 등 성능에 영향을 주는 설정 값 가이드야.

텍스트와 이미지 추론은 지금 상태에서 안정적이야. 오디오 지원은 아직 별도 작업이 진행 중이라 [멀티모달](/ko/wiki/multimodal/) 전체가 다 되는 건 아니야. [로컬](/ko/wiki/local-llm/) Gemma 4 실험을 미뤘다면 지금 최신 빌드를 받아서 바로 시도해볼 수 있어. [원본 스레드](https://www.reddit.com/r/LocalLLaMA/comments/1sgl3qz/gemma_4_on_llamacpp_should_be_stable_now/)에 [런타임](/ko/wiki/runtime/) 힌트 전문이 있어.
