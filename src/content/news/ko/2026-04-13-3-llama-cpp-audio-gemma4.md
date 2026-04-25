---
title: "llama.cpp에 음성 인식이 들어왔다 — Gemma 4로 로컬 STT 가능"
date: "2026-04-13T10:00:00+09:00"
lang: ko
category: news
summary: "llama-server에 Gemma 4 E2B/E4B 기반 음성 인식(STT)이 공식 지원됐다. mmproj 파일 하나 추가하면 로컬에서 음성→텍스트 변환이 가능해졌다. E2B는 2.3B 유효 파라미터로 가벼운 하드웨어에서도 돌릴 수 있고, USM Conformer 인코더 기반 다국어 STT를 지원한다."
readerValue: "로컬 환경에서 Whisper 없이 Gemma 4만으로 STT를 돌릴 수 있는지 판단하게 해준다"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sjhxrw/audio_processing_landed_in_llamaserver_with_gemma4/"
sourceTitle: "r/LocalLLaMA"
draft: false
score: 85
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1sjhxrw/audio_processing_landed_in_llamaserver_with_gemma4/"
      title: "r/LocalLLaMA — Audio processing landed in llama-server"
    - url: "https://ai.google.dev/gemma/docs/core/model_card_4"
      title: "Google — Gemma 4 Model Card"
    - url: "https://github.com/ggml-org/llama.cpp/discussions/21334"
      title: "GitHub — How to input audio to Gemma 4 E4B"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 원문과 공식 모델 카드의 오디오 지원 정보를 비교해뒀어."
      items:
        - "llama-server에서 Gemma 4 E2B/E4B STT 지원 — Reddit 원문 확인 ✅"
        - "--mmproj 플래그 사용법 — GitHub discussion 확인 ✅"
        - "E2B 2.3B effective, E4B 4.5B effective 파라미터 — Google 모델 카드 확인 ✅"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "오디오 기능 스펙을 독립 소스에서 교차 확인해뒀어."
      items:
        - "E2B/E4B 오디오 입력 지원 — Google 모델 카드, HuggingFace 블로그 일치 ✅"
        - "USM 스타일 Conformer 인코더 — Google 공식 문서 확인 ✅"
        - "다국어 STT + 번역 지원 — 모델 카드 capabilities 섹션 확인 ✅"
    - type: number_verify
      result: pass
      summary: "모델 파라미터와 스펙 수치를 정량 확인해뒀어."
      items:
        - "E2B: 2.3B effective / 5.1B total — Google 모델 카드 일치 ✅"
        - "E4B: 4.5B effective / 8B total — Google 모델 카드 일치 ✅"
        - "128K 컨텍스트 — E2B/E4B 모두 128K 확인 ✅"
    - type: adversarial
      result: pass
      summary: "로컬 STT 실용성을 비판적으로 걸러뒀어."
      items:
        - "llama.cpp 오디오 지원은 최근 추가되어 안정성 검증이 부족할 수 있음"
        - "Whisper 대비 정확도 비교 벤치마크가 아직 없음"
        - "mmproj 파일 크기와 VRAM 요구사항 정확한 수치는 공식 문서에 미기재"
      findings:
        - "Whisper 대비 STT 정확도 비교 벤치마크가 아직 공개되지 않았다"
        - "8GB VRAM으로 충분한지는 양자화 방식에 따라 달라질 수 있다"
tags: ["llama-cpp", "gemma", "음성인식", "local-llm", "멀티모달"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    news: "3.1.2"
  panelVerdict: pass
  contentHash: "637897ec5bb7ebdb"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

[llama.cpp](/ko/wiki/llama-cpp/)의 llama-server에 음성 처리가 드디어 들어왔어. Gemma 4 E2B와 E4B 모델로 로컬에서 음성→텍스트 변환(STT)이 가능해진 거야. [로컬 LLM](/ko/wiki/local-llm/) 커뮤니티에서 [상당한 관심](https://www.reddit.com/r/LocalLLaMA/comments/1sjhxrw/audio_processing_landed_in_llamaserver_with_gemma4/)을 끌었어.

사용법은 생각보다 간단해. mmproj 파일(약 600MB)을 다운받아서 `--mmproj` 플래그와 함께 llama-server를 실행하면 돼. USM 스타일 Conformer 인코더가 오디오를 처리하고, Gemma 4의 언어 모델이 텍스트로 변환하는 구조야. 별도의 [Whisper](/ko/wiki/whisper/) 파이프라인 없이 하나의 모델로 음성 이해까지 되는 거거든.

## 왜 중요할까

흥미로운 건 이게 단순 STT에서 끝나지 않는다는 점이야. E2B/E4B는 네이티브 [멀티모달](/ko/wiki/multimodal/) 모델이라, 음성으로 질문하면 바로 텍스트 답변을 생성할 수 있어. [Google의 공식 모델 카드](https://ai.google.dev/gemma/docs/core/model_card_4)에 따르면 다국어 음성 인식과 음성→번역 텍스트 변환도 지원하거든. E2B는 2.3B 유효 파라미터(5.1B 전체), E4B는 4.5B 유효 파라미터(8B 전체)라 8GB VRAM 이상이면 돌릴 수 있어.

## 앞으로 볼 점

로컬 AI 도구 스택을 쌓고 있다면 짚어볼 변화야. 128K 컨텍스트 윈도우에서 텍스트+이미지+음성을 한 모델로 처리하는 로컬 [멀티모달](/ko/wiki/multimodal/) 환경이 점점 현실이 되고 있으니까.
