---
term: lm-studio
title: "LM Studio"
lang: ko
summary: "오픈 모델과 로컬 배포 작업에 자주 쓰이는 AI 도구다. 모델 자체보다 실제 사용 흐름을 바꾸는 쪽에 가깝다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
category: tool
aliases:
  - "LM Studio"
relatedTerms:
  - llama.cpp
  - ollama
  - gguf
firstMentioned: "2026-04-03"
mentionCount: 1
draft: false
tags:
  - local-ai
  - desktop
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://lmstudio.ai/"
      title: "LM Studio - Local AI on your computer"
    - url: "https://lmstudio.ai/docs/welcome"
      title: "Welcome to LM Studio Docs! | LM Studio Docs"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: LM Studio"
        - "분류 대조: 도구"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "LM Studio - Local AI on your computer (https://lmstudio.ai/)"
        - "Welcome to LM Studio Docs! | LM Studio Docs (https://lmstudio.ai/docs/welcome)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
오픈 모델과 로컬 배포 작업에 쓰이는 AI 도구다. 쉽게 말하면 모델을 직접 내려받아 운영하는 배포 층을 실제 제품과 워크플로로 옮긴 쪽에 가깝다.
## 실제로 무엇을 하나
모델 자체라기보다 오픈 모델과 로컬 배포 작업을 실제로 굴리는 도구 쪽에 가깝다. 웨이트, 포맷, 양자화, 런타임을 조합해서 원하는 환경에서 직접 돌리는 쪽에 가깝다. 그래서 기능 목록보다 어떤 병목을 줄여 주는지로 읽는 편이 이해가 빠르다.
## 왜 중요한가
비용, 지연 시간, 데이터 통제권을 직접 잡고 싶을 때 핵심이 되는 축이다. 실무에서는 도구 이름을 모델 이름처럼 오해하면 실제 도입 범위와 필요한 연결 작업을 잘못 보기 쉽다.
## 관련 용어
- [llama.cpp](/ko/wiki/llama.cpp/) — 로컬 배포와 오픈 모델 맥락을 같이 읽게 해 준다.
- [Ollama](/ko/wiki/ollama/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.
- [GGUF](/ko/wiki/gguf/) — 로컬 배포와 오픈 모델 맥락을 같이 읽게 해 준다.