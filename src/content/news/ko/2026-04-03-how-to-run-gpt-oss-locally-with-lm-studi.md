---
title: "developers.openai.com ??, OpenAI가 LM Studio 기반 `gpt-oss` 로컬 실행..."
date: "2026-04-03T12:00:00+09:00"
lang: ko
category: news
summary: "OpenAI가 LM Studio 기반 `gpt-oss` 로컬 실행 가이드를 공개했다. `gpt-oss-20b`는 최소 16GB VRAM, `gpt-oss-120b`는 60GB 이상을 권장하고, 기존 OpenAI SDK 코드도 `base_url`만 바꿔 거의 그대로 붙일 수 있다."
readerValue: "이 뉴스의 값은 OpenAI가 LM Studio 기반 `gpt-oss` 로컬 실행 가이드를 공개했다. `gpt-oss-20b`는 최소 16GB VRAM, `gpt-oss-120b`는 60GB 이상을 권장하고, 기존 OpenAI SDK 코드도 `base_url`만 바꿔 거의 그대로 붙일 수 있다가 실제 시장과 개발 흐름에 어떤 신호인지 빠르게 판단하게 해준다는 점이다."
sourceUrl: "https://developers.openai.com/cookbook/articles/gpt-oss/run-locally-lmstudio/"
sourceTitle: "developers.openai.com"
draft: false
score: 79
factCheck:
  status: passed
  date: "2026-04-03"
  sources:
    - url: "https://developers.openai.com/cookbook/articles/gpt-oss/run-locally-lmstudio/"
      title: "developers.openai.com"
  checks:
    - type: source_match
      result: pass
tags: ["gpt-oss", "lm-studio", "openai", "local-llm"]
backfilled: true
backfilledAt: "2026-04-07"
---

[OpenAI Cookbook 가이드](https://developers.openai.com/cookbook/articles/gpt-oss/run-locally-lmstudio/)는 `gpt-oss`를 "로컬에서 실제로 굴려보는 입문선"에 가깝게 정리했어. 포인트는 복잡한 서버 셋업이 아니라 `LM Studio` 하나로 `gpt-oss-20b`나 `gpt-oss-120b`를 내려받고, 채팅 UI나 로컬 API까지 바로 붙여보는 흐름이야.

하드웨어 기준이 꽤 명확해. 문서 기준으로 `gpt-oss-20b`는 최소 `16GB VRAM`이면 시작할 수 있고, `gpt-oss-120b`는 `60GB` 이상을 권장해. 전자는 고급형 소비자 GPU나 Apple Silicon 맥을 겨냥했고, 후자는 멀티 GPU나 워크스테이션 급 장비를 전제로 둔 셈이야.

또 하나 재밌는 건 호환성 쪽이야. LM Studio는 `llama.cpp`용 GGUF 엔진과 Apple Silicon용 `MLX` 엔진을 같이 지원하고, 로컬 `v1/chat/completions` 엔드포인트를 열어줘. 그래서 기존 OpenAI SDK 코드를 거의 안 바꾸고 `base_url="http://localhost:1234/v1"`만 바꿔서 재사용할 수 있어. API 키도 굳이 필요 없고.

왜 중요하냐면 오픈 웨이트 모델이 진짜 대중화되려면 "잘 만든 모델"만큼 "잘 굴리는 런타임"이 중요하거든. 이번 문서는 `gpt-oss`를 서버실 장난감이 아니라 일반 개발자가 자기 PC나 맥에서 바로 만져볼 수 있는 물건으로 끌어내렸다는 점에서 의미가 있어.
