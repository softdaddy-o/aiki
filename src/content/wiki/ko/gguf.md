---
term: gguf
title: "GGUF"
lang: ko
summary: "C/C++의 LLM 추론."
category: framework
aliases:
  - "GGUF"
relatedTerms:
  - llama.cpp
  - ollama
  - lm-studio
firstMentioned: "2026-02-20"
mentionCount: 5
draft: false
tags:
  - local-ai
  - model-format
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://github.com/ggerganov/llama.cpp/blob/master/gguf-py/README.md"
      title: "llama.cpp/gguf-py/README.md at master · ggml-org/llama.cpp"
    - url: "https://huggingface.co/docs/hub/gguf"
      title: "GGUF · Hugging Face"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 한 줄 정의
GGUF는 C/C++의 LLM 추론. GitHub에 계정을 만들어 ggml-org/llama.cpp 개발에 기여하세요라는 맥락에서 자주 언급된다.
## 어떻게 작동하나
우리는 오픈 소스와 오픈 사이언스를 통해 인공 지능을 발전시키고 민주화하기 위한 여정을 진행하고 있습니다라는 설명을 함께 보면, GGUF가 실제 제품과 연구 흐름에서 어떻게 쓰이는지 감이 잡힌다.
## 왜 지금 중요하나
AIKI 기사 기준으로 GGUF는 5번 이상 함께 언급됐다. 그만큼 최근 AI 뉴스에서 맥락을 이해할 때 반복해서 마주치는 용어다.
## 관련 용어
- [llama.cpp](/ko/wiki/llama.cpp/)
- [ollama](/ko/wiki/ollama/)
- [lm-studio](/ko/wiki/lm-studio/)