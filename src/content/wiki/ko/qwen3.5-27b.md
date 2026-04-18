---
term: qwen3.5-27b
title: "Qwen3.5-27B (큐웬3.5-27B)"
lang: ko
summary: "Qwen3.5-27B는 Alibaba의 Qwen 계열에 속한 27B급 오픈 웨이트 멀티모달 모델이야. 서비스형 이름표로 보기보다, 직접 내려받아 추론 서버에 올릴 수 있는 공개 모델 후보로 이해하는 쪽이 더 실전적이야."
readerValue: "Qwen3.5-27B를 보면 어떤 입력을 받는지, 왜 27B급 오픈 모델이 실무 비교표에 자주 들어오는지, 그리고 직접 배포할 때 어떤 판단 포인트를 체크해야 하는지 한 번에 잡을 수 있어."
category: model
modelType: version
parentModel: qwen-3.5
modelProfile:
  memoryUsage: "27B급이라 직접 올릴 때는 VRAM, 처리량, 지연 시간을 함께 계산해야 해."
  implementation: "Qwen 오픈 모델 계열의 27B 버전으로, 공식 카드와 Transformers 문서를 기준으로 직접 로드하는 흐름이 기본이야."
  activeParameters: "공개 문서에서는 27B 모델로 소개되고 routed expert 구조 설명은 별도로 붙지 않아."
  multimodalSupport: "문서상 태스크는 image-text-to-text야."
  access: "오픈 웨이트 모델이라 가중치를 내려받아 직접 실행하는 경로가 대표적이야."
  pricing: "정해진 API 요금표보다 자체 서빙 비용과 GPU 예산으로 계산하는 편이 자연스러워."
  weightsOpen: "Apache-2.0 기반 오픈 웨이트"
  vendor: "Alibaba / Qwen"
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "Qwen3.5-27B"
  - "Qwen 3.5 27B"
relatedTerms:
  - qwen-3.5
  - gguf
  - local-llm
  - weight
  - inference
firstMentioned: "2026-04-07T12:00:00+09:00"
mentionCount: 4
draft: false
tags:
  - qwen
  - local-llm
  - gguf
  - multimodal
factCheck:
  status: passed
  date: "2026-04-18"
  sources:
    - url: "https://huggingface.co/Qwen/Qwen3.5-27B"
      title: "Qwen/Qwen3.5-27B"
    - url: "https://huggingface.co/docs/transformers/en/model_doc/qwen3_5"
      title: "Qwen3.5 | Hugging Face Transformers"
    - url: "https://help.aliyun.com/zh/dashscope/developer-reference/qwen-vl-plus/"
      title: "Qwen3.5 open-source series model list | Alibaba Cloud"
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: "핵심 정의를 세 문서에 맞춰 다시 대조했어."
      items:
        - "모델 카드는 이 항목을 Apache-2.0 공개 모델로 설명하고 태스크를 image-text-to-text로 적어 둬."
        - "Transformers 문서는 로드와 추론 경로를 직접 설명하므로, 이 페이지를 자체 서빙 후보로 읽는 방향과 맞아."
      findings:
        - "서비스형 전용 모델이 아니라 직접 실행 가능한 오픈 모델이라는 정리는 공식 자료와 맞다."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "카드, 라이브러리 문서, 벤더 목록이 같은 모델 축을 가리키는지 확인했어."
      items:
        - "저장소 카드와 Transformers 문서는 모두 Qwen3.5-27B를 같은 계열의 실행 가능한 모델로 본다."
        - "Alibaba Cloud 목록도 `qwen3.5-27b`를 오픈소스 시리즈 중 하나로 따로 적고 있어 이름 축이 일치한다."
      findings:
        - "운영 비용은 공식 문서가 직접 수치로 확정하지 않으므로 환경별 계산이 필요하다."
    - type: number_verify
      result: pass
      sources: 2
      summary: "본문에서 직접 쓴 숫자만 다시 확인했어."
      items:
        - "27B 표기는 모델명 자체에서 다시 확인했다."
        - "카드에는 262,144 기본 컨텍스트와 1,010,000 확장 표기가 있고, 본문은 그 범위를 넘는 임의 수치를 넣지 않았다."
      findings:
        - "VRAM 추정치나 벤치마크 순위처럼 변동 가능한 숫자는 넣지 않았다."
    - type: adversarial
      result: pass
      sources: 3
      summary: "오픈 모델을 곧바로 쉬운 배포라고 오해하는 지점을 먼저 막았어."
      items:
        - "공개 가중치가 있다고 해서 자동으로 저비용 운영이 되는 건 아니다."
        - "멀티모달 지원이 곧 모든 배포 환경에서 같은 입력 파이프라인을 보장하는 뜻도 아니다."
      findings:
        - "이 페이지는 모델 성격과 도입 판단 기준을 정리하는 가이드다."
---

## 한 줄 정의

Qwen3.5-27B (큐웬3.5-27B)는 Alibaba의 Qwen 계열에 포함된 27B급 오픈 웨이트 멀티모달 모델이야. 텍스트 전용 모델로만 보면 안 되고, [weight](/ko/wiki/weight/)를 직접 받아 [inference](/ko/wiki/inference/) 경로를 설계하는 후보로 읽는 편이 정확해.

## 모델 프로필

이 모델은 [Qwen 3.5](/ko/wiki/qwen-3.5/) 계열 안에서 "직접 올려서 쓰는 27B급 공개 모델"이라는 성격이 중요해. API 이름표만 보는 문맥보다, 사내 GPU나 전용 추론 서버에 얹을 수 있는지 검토하는 문맥에서 더 자주 거론돼.

라이선스는 Apache 2.0이고 대표 접근 경로는 모델 카드와 Transformers 문서야. 그래서 이 항목을 볼 때는 "호스티드 서비스 소개"보다 "공개 가중치를 어떻게 받아서 배포할지"를 먼저 읽는 편이 맞아.

## 어디에 쓰이나

실무에서는 이미지가 붙은 문서 분류, 시각 정보가 섞인 질의응답, 캡처 화면 이해, 멀티모달 보조 모델 후보처럼 검토하는 경우가 많아. 오픈 웨이트라서 호출 제한보다 배포 구조, 메모리 예산, 처리량 계획이 먼저 논점이 돼.

예를 들어 내부 문서 검색에 이미지를 섞어 쓰거나, OCR 뒤에 붙는 후처리 모델을 따로 두기 싫을 때 이런 크기의 공개 멀티모달 모델을 비교하게 돼. 도입할 때는 어떤 [runtime](/ko/wiki/runtime/)에 올릴지, 어떤 정밀도로 설정할지, GPU 한 장에 배치가 몇 개까지 들어갈지를 같이 계산해야 해.

## 왜 중요한가

Qwen3.5-27B가 자주 비교표에 들어오는 이유는 너무 작지도 너무 크지도 않은 중간 지점이기 때문이야. 더 작은 모델은 멀티모달 작업에서 답답할 수 있고, 훨씬 더 큰 모델은 배포 부담이 빠르게 커져. 그래서 오픈 웨이트 멀티모달 모델을 직접 붙이려는 팀은 이 크기를 성능과 운영 부담을 함께 보는 기준점으로 삼는 경우가 많아.

중요한 건 숫자 자체보다 도입 방식이야. API만 붙이면 끝나는 모델이 아니라 가중치 관리, 입력 파이프라인, 지연 시간, 메모리 예산을 전부 같이 봐야 하니까, 이 모델을 이해하면 "오픈 모델을 실제로 굴린다"는 말이 무엇을 뜻하는지 감이 빨리 생겨.

## 같이 보면 좋은 모델

- [Qwen 3.5](/ko/wiki/qwen-3.5/): 이 버전이 계열 안에서 어떤 위치인지 먼저 볼 때 기준점이 돼.
- [Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled](/ko/wiki/qwen3.5-27b-claude-4.6-opus-reasoning-distilled/): 같은 크기에서 distillation이 붙으면 문서 성격이 어떻게 달라지는지 비교하기 좋아.
- [Gemma 4](/ko/wiki/gemma-4/): 다른 벤더의 오픈 모델 축과 비교할 때 자주 함께 올라와.
- [GGUF](/ko/wiki/gguf/): 직접 서빙이나 경량 배포를 논할 때 같이 따라오는 포맷 문맥이야.
