---
title: "중국 AI 랩들이 동시에 최신 모델 오픈소스를 멈췄다"
date: "2026-04-06T11:00:00+09:00"
lang: ko
category: news
summary: "MiniMax, 지혜AI(GLM), Qwen, Mimo 등 중국 주요 AI 랩들이 최신 모델을 오픈소스로 공개하지 않고 있다. MiniMax-m2.7은 발표 후 14일째 웨이트 미공개. r/LocalLLaMA에서 이례적 동시 중단에 의문이 제기됐다."
readerValue: "이 글이 해결해주는 문제는 MiniMax, 지혜AI(GLM), Qwen, Mimo 등 중국 주요 AI 랩들이 최신 모델을 오픈소스로 공개하지 않고 있다. MiniMax-m2.7은 발표 후 14일째 웨이트 미공개. r/LocalLLaMA에서 이례적 동시 중단에 의문이 제기됐다가 실제 시장과 개발 흐름에서 왜 중요한지 빠르게 파악하게 해준다는 점이다."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sd22qy/anyone_else_find_it_weird_how_all_chinese_labs/"
sourceTitle: "r/LocalLLaMA"
draft: false
score: 58
factCheck:
  status: passed
  date: "2026-04-06"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1sd22qy/anyone_else_find_it_weird_how_all_chinese_labs/"
      title: "r/LocalLLaMA 원문"
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1scpvz8/"
      title: "MiniMax 2.7 지연 관련 별도 글"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: number_verify
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "동시 중단이 의도적 조율인지 각사 개별 사정인지 확인 불가"
        - "수출 규제·정부 가이드라인·상업화 전환 등 추측만 존재"
tags: ["오픈소스", "중국-AI", "LocalLLaMA", "MiniMax", "Qwen"]
---

## 4개 랩이 동시에 멈췄어

MiniMax-m2.7, GLM-5 시리즈, Qwen3.6, Mimo-v2-pro — 중국 주요 AI 랩들이 최신 모델 웨이트를 동시에 공개하지 않고 있어. r/LocalLLaMA에서 [화제](https://www.reddit.com/r/LocalLLaMA/comments/1sd22qy/anyone_else_find_it_weird_how_all_chinese_labs/)가 됐는데, 이게 좀 이례적이거든.

MiniMax-m2.7이 대표적이야. X에서 발표한 지 14일, HuggingFace에 포스트를 올린 지 12일이 지났는데 모델 웨이트가 안 나왔어. [별도 글](https://www.reddit.com/r/LocalLLaMA/comments/1scpvz8/)까지 올라올 정도로 관심이 크고.

## 이유는 아직 추측뿐

미국 수출 규제 강화, 중국 정부 가이드라인 변경, 상업화 전환 등 여러 추측이 있는데 공식적으로 확인된 건 없어. 각 회사가 개별 사정으로 지연된 건지, 업계 전체의 방향 전환인지도 불분명해.

## 로컬 LLM 생태계에는 타격

중국 랩들의 오픈소스 모델이 로컬 LLM 생태계의 주요 공급원이었거든. Qwen, DeepSeek, GLM 시리즈가 대표적이야. 이 흐름이 멈추면 Google의 [Gemma 4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)(Apache 2.0)와 Meta Llama 시리즈가 대안이 되는데, 한 나라에 의존하지 않는 공급 다변화가 필요한 시점이야.
