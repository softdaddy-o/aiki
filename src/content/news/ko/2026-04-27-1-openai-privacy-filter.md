---
title: "OpenAI, 개인정보 마스킹 모델 Privacy Filter를 오픈소스로 공개했어"
date: "2026-04-27T08:30:00+09:00"
lang: ko
category: news
summary: "OpenAI가 1.5B 파라미터 PII 마스킹 모델 Privacy Filter를 Apache 2.0으로 풀었어. 이름·주소·이메일 등 8개 카테고리를 GPU 3GB VRAM 또는 CPU 4-8GB RAM에서 오프라인으로 처리해. PII-Masking-300k에서 F1 96%."
readerValue: "사내 데이터를 클라우드에 보내지 않고 마스킹할 수 있는지 직접 가를 수 있어."
sourceUrl: "https://openai.com/index/introducing-openai-privacy-filter/"
sourceTitle: "OpenAI — Introducing OpenAI Privacy Filter"
draft: false
score: 100
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-27"
  sources:
    - url: "https://openai.com/index/introducing-openai-privacy-filter/"
      title: "OpenAI — Introducing OpenAI Privacy Filter"
    - url: "https://huggingface.co/openai/privacy-filter"
      title: "openai/privacy-filter — Hugging Face"
    - url: "https://venturebeat.com/data/openai-launches-privacy-filter-an-open-source-on-device-data-sanitization-model-that-removes-personal-information-from-enterprise-datasets"
      title: "VentureBeat — OpenAI launches Privacy Filter"
    - url: "https://decrypt.co/365139/openai-privacy-filter-open-source-pii-masking-model"
      title: "Decrypt — OpenAI Open-Sourced PII Masking Model"
  checks:
    - type: source_match
      result: pass
      summary: "OpenAI 공식 발표와 Hugging Face 모델 카드의 핵심 수치를 본문과 일치 확인."
      items:
        - "1.5B 파라미터, Apache 2.0 라이선스, 128k 토큰 컨텍스트"
        - "PII 카테고리 8종 — 이름, 주소, 이메일, 전화번호, URL, 날짜, 계좌번호, secrets"
        - "GPU FP16 3GB VRAM 또는 CPU 4-8GB RAM에서 동작"
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "공식 1건, HF 모델카드 1건, 독립 보도 2건을 교차로 확인."
      items:
        - "OpenAI 공식: 발표일·라이선스·카테고리"
        - "Hugging Face: 모델 사양과 추론 요구사항"
        - "VentureBeat·Decrypt: 오프라인 동작과 엔터프라이즈 활용 맥락"
    - type: number_verify
      result: pass
      summary: "PII-Masking-300k 벤치마크 F1 수치를 보도 기사로 검증."
      items:
        - "PII-Masking-300k F1 96% (precision 94.04%, recall 98.04%)"
        - "수정판 벤치마크 F1 97.43% (precision 96.79%, recall 98.08%)"
        - "활성 파라미터 50M, 총 1.5B"
    - type: adversarial
      result: pass
      summary: "OpenAI 자체 발표라 독립 평가가 없다는 점을 따로 적었어."
      items:
        - "벤치마크 수치는 OpenAI 자체 평가라 독립 재현이 더 필요해"
        - "한국어 PII 처리 성능은 별도 검증 필요 — 데이터셋이 영문 중심"
        - "엔터프라이즈 도입 시 라이선스만이 아니라 출력 마스킹 토큰 형식 호환도 봐야 해"
      findings:
        - "PII-Masking-300k 자체가 OpenAI가 일부 어노테이션을 수정해서 쓴 데이터셋이라 자체 평가 색채가 있어"
        - "실제 한국어 주소·주민번호 패턴에서의 정확도는 별도 테스트가 필요해"
tags: ["openai", "privacy", "pii", "open-source", "on-device"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[OpenAI](/ko/wiki/openai/)가 [Privacy Filter](https://openai.com/index/introducing-openai-privacy-filter/)라는 이름으로 PII(개인 식별 정보) 마스킹 모델을 [Hugging Face](https://huggingface.co/openai/privacy-filter)에 풀었어. 라이선스는 Apache 2.0이고, 총 1.5B 파라미터에 활성 50M짜리 양방향 토큰 분류 모델이야.

처리 카테고리는 8개야. 이름, 주소, 이메일, 전화번호, URL, 날짜, 계좌번호, 그리고 secrets(API 키 같은 것). 컨텍스트는 128k 토큰까지 받아.

## 어디서 돌아가는가

GPU에서는 FP16 기준 약 3GB VRAM, CPU에서는 4-8GB RAM이면 중간 길이 텍스트가 처리돼. 사내 노트북이나 단일 GPU 서버에서 데이터를 외부로 빼지 않고 마스킹할 수 있다는 게 이번 발표의 무게중심이야.

벤치마크 수치는 [OpenAI 발표](https://openai.com/index/introducing-openai-privacy-filter/) 기준이야:

- **PII-Masking-300k 원본**: F1 96% (precision 94.04%, recall 98.04%)
- **수정판**: F1 97.43% (precision 96.79%, recall 98.08%)

수정판은 OpenAI가 검토 중에 발견한 어노테이션 오류를 고친 버전이라고 명시돼 있어.

## 어떤 의미인가

지금까지 [엔터프라이즈](/ko/wiki/openai/) 영역에서 PII 마스킹은 외부 SaaS에 데이터를 보내거나 정규식 기반 도구를 쓰는 두 갈래였어. Apache 2.0으로 풀린 1.5B 모델은 그 가운데를 메워. 데이터를 노트북 밖으로 안 보내면서 ML 기반 정확도를 쓸 수 있어.

다만 평가 수치 자체가 OpenAI 자체 데이터셋 기준이고, 한국어 주민번호·전화번호 같은 로컬 패턴 성능은 별도 테스트가 필요해. 사내에 적용한다면 실제 자사 데이터 1000건 정도로 precision/recall을 다시 재보는 게 안전해.

## 다음 수순

[VentureBeat](https://venturebeat.com/data/openai-launches-privacy-filter-an-open-source-on-device-data-sanitization-model-that-removes-personal-information-from-enterprise-datasets) 보도에 따르면 첫 타깃은 학습 데이터 정제와 RAG 파이프라인 입력 단계야. RAG 인덱스를 만들기 전에 한 번 흘려서 PII를 비워두면 추후 응답에서 새는 위험이 줄어들어. 한 번 깔아두면 워크플로 어느 단계에서든 호출할 수 있는 구조야.
