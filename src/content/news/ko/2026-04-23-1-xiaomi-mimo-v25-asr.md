---
title: "Xiaomi MiMo-V2.5-ASR 공개 — 8B 음성인식 모델, 중국어 5개 방언 지원"
date: "2026-04-23T17:46:04+09:00"
lang: ko
category: news
summary: "Xiaomi MiMo 팀이 8B 파라미터 음성인식(ASR) 모델을 MIT 라이선스로 공개했다. 표준 중국어와 영어 외에 우어, 광동어, 민난어, 사천어 등 5개 이상 중국어 방언을 지원한다. AMI 영어 벤치마크에서 Open ASR 리더보드 기준 선두권에 들었다."
readerValue: "한국어 ASR이 아니라도, 멀티언어·코드스위칭·노이즈 환경 평가 사례를 보면 자기 워크플로우에 맞는 ASR을 고를 때 비교 기준을 잡을 수 있어."
sourceUrl: "https://huggingface.co/XiaomiMiMo/MiMo-V2.5-ASR"
sourceTitle: "Hugging Face — XiaomiMiMo/MiMo-V2.5-ASR"
draft: false
backfilled: true
backfilledAt: "2026-04-26"
score: 105
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://huggingface.co/XiaomiMiMo/MiMo-V2.5-ASR"
      title: "Hugging Face 모델 카드 — 1차 소스"
    - url: "https://mimo.xiaomi.com/mimo-v2-5-asr"
      title: "Xiaomi MiMo 공식 블로그"
  checks:
    - type: source_match
      result: pass
      summary: "Hugging Face 모델 카드와 Xiaomi 공식 블로그 본문 대조"
      items:
        - "8B 파라미터, F32 텐서 — 모델 카드 명시"
        - "MIT 라이선스 — 모델 카드 명시"
        - "중국어 5+ 방언 지원 — 모델 카드 명시"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Hugging Face, Xiaomi 공식 블로그, Open ASR 리더보드 3곳 교차"
      items:
        - "Hugging Face: 1차 소스"
        - "Xiaomi MiMo 공식 블로그: 상세 벤치마크 표"
        - "Open ASR 리더보드: AMI 벤치마크 비교 가능"
    - type: number_verify
      result: pass
      summary: "파라미터 수, 라이선스, 지원 언어 수 모델 카드 직접 확인"
      items:
        - "8B 파라미터 — 모델 카드"
        - "5개 이상 중국어 방언 — 모델 카드"
        - "Open ASR 리더보드 영어 AMI 선두권 — 모델 카드"
    - type: adversarial
      result: pass
      summary: "ASR은 도메인·환경 의존도가 커서 리더보드 점수와 실 사용 격차가 흔하다는 점 본문 반영"
      items:
        - "벤치마크 점수가 좋아도 한국어 사용자에게는 직접 적용 안 됨 — 본문에 명시"
        - "리더보드는 정해진 데이터셋 기준 — 실 사용 환경(노이즈, 발화 길이)과 다를 수 있음"
        - "Xiaomi 자체 측정 부분은 독립 검증과 분리 표기"
      findings:
        - "한국어 지원 정보가 모델 카드에 명시되어 있지 않음 — 사용 시 별도 평가 필요"
tags: ["xiaomi", "asr", "speech-to-text", "open-weight", "multilingual"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

Xiaomi MiMo 팀이 [MiMo-V2.5-ASR](https://huggingface.co/XiaomiMiMo/MiMo-V2.5-ASR)을 Hugging Face에 올렸어. 8B 파라미터의 음성인식 모델이고 MIT 라이선스야. 표준 중국어와 영어는 기본이고, 우어·광동어·민난어·사천어 등 5개 이상 중국어 방언도 지원해. 영어 AMI 벤치마크에서 Open ASR 리더보드 선두권에 들었다는 게 모델 카드에 명시돼 있어.

## 왜 이게 일어났나

음성인식은 LLM의 발전 속도에 비해 상대적으로 정체된 영역이었어. 특히 코드스위칭(중국어와 영어가 한 문장에 섞이는 발화)과 방언, 노래 가사, 노이즈 환경에서는 기존 모델들이 약했어. MiMo 팀은 이 7가지 시나리오 — 멀티 방언, 코드스위칭, 가사, 노이즈, 다중 화자, 지식 집약형, 자체 구두점 생성 — 를 명시적으로 타깃해서 학습시켰다고 모델 카드에 적었어.

## 어떤 의미인가

한국어 ASR을 찾는 사용자라면 직접 적용은 어려워 — 모델 카드에 한국어가 지원 언어로 표기돼 있지 않거든. 그래도 평가 방식 자체는 참고할 만해. 리더보드 점수 1개로만 비교하지 않고, 7가지 사용 환경별로 분리해서 보는 접근이 ASR 선택에 더 실용적이야. MIT 라이선스라 상업 사용 제약이 적은 점도 [오픈웨이트](/ko/wiki/open-weight/) 모델 평가 시 가산점이야. 한국어 ASR 모델을 고를 때도 같은 7가지 환경 기준으로 비교해 보면 자기 워크플로우에 맞는지 더 빨리 판단할 수 있어.
