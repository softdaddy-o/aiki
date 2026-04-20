---
title: "Gemma 4, MTP 드래프터 숨겨져 있었어 — 커뮤니티가 역공학으로 꺼냈다"
date: "2026-04-11T12:00:00+09:00"
lang: ko
category: news
summary: "Google Gemma 4에 Multi-Token Prediction(MTP) 드래프터가 내장돼 있다는 게 커뮤니티 역공학으로 밝혀졌다. LiteRT-LM 포맷에서 TFLite 드래프터 파일이 추출됐으며 PyTorch 변환 작업이 진행 중이다."
readerValue: "Gemma 4가 발표 때 언급 안 한 MTP 기능이 있다는 걸 알고, 추론 속도에 대한 기대치를 조정할 수 있다"
sourceUrl: "https://huggingface.co/shadowlilac/gemma-4-e4b-mtp-extraction-effort"
sourceTitle: "HuggingFace — shadowlilac/gemma-4-e4b-mtp-extraction-effort"
draft: false
score: 110
sourceCount: 5
factCheck:
  status: passed
  date: "2026-04-11"
  sources:
    - url: "https://huggingface.co/shadowlilac/gemma-4-e4b-mtp-extraction-effort"
      title: "HuggingFace 역공학 리포지토리"
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1seqblr/"
      title: "Reddit LocalLLaMA 원본 포스트"
  checks:
    - type: source_match
      result: pass
      summary: "HuggingFace 역공학 리포지토리에서 핵심 사실을 직접 확인해뒀어."
      items:
        - "shadowlilac/gemma-4-e4b-mtp-extraction-effort 리포지토리 존재 확인 ✅"
        - "LiteRT-LM 포맷에서 TFLite 드래프터 파일 추출 방법 명시 ✅"
        - "Section11_TFLiteModel_tf_lite_mtp_drafter.tflite 파일명 확인 ✅"
        - "C++ 구현체 llm_litert_mtp_drafter 존재 및 end-to-end 드래프팅 용도 확인 ✅"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "단일 소스만 믿지 않고 Reddit 커뮤니티와 추가 출처로 교차로 확인해뒀어."
      items:
        - "HuggingFace 역공학 리포지토리 직접 확인 ✅"
        - "Reddit r/LocalLLaMA 원본 포스트에서 커뮤니티 반응 및 추가 정보 확인 ✅"
        - "DeepSeek V3 MTP 2배 향상 수치 — DeepSeek 공식 기술 보고서에서 교차 확인 ✅"
    - type: number_verify
      result: pass
      summary: "본문의 수치를 원본 소스에서 검증해뒀어."
      items:
        - "'최대 2배' 향상 — DeepSeek V3 기술 보고서 MTP 관련 섹션에서 token/s 기준 속도 향상 수치 확인 ✅"
    - type: adversarial
      result: pass
      summary: "독자가 오해할 수 있는 부분과 미확인 사항을 따로 정리해뒀어."
      items:
        - "MTP 실제 활성화 미확인 — 드래프터 추출만 됐고 실제 추론에서 작동하는지는 아직 미확인. 기사에서 '추출만 됐고' 명시 ✅"
        - "Google 의도 불명 — 숨긴 건지 준비 중인 건지 불명확. 기사에서 단정 짓지 않음 ✅"
      findings:
        - "MTP가 실제 추론 속도 향상으로 이어지는지는 아직 검증 전 — 드래프터 추출만 됐고 실제 활성화 여부는 미확인"
        - "Google이 의도적으로 숨긴 건지, 아직 준비 중인 기능인지는 불명확"
tags: ["gemma", "google", "mtp", "multi-token-prediction", "reverse-engineering", "open-source"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

Google이 Gemma 4를 발표할 때 언급하지 않은 기능이 있었어 — **MTP(Multi-[Token](/ko/wiki/token/) Prediction)** 드래프터가 모델 내부에 숨어 있었던 거야. 커뮤니티 개발자가 LiteRT-LM 포맷을 역공학해서 꺼냈어.

추출 방법은 이래. Google의 `litertlm_peek_main` CLI로 `.litertlm` 파일 내부를 열면 `Section11_TFLiteModel_tf_lite_mtp_drafter.tflite`라는 파일이 있어. 이 파일이 MTP 드래프터야. C++ 구현체(`llm_litert_mtp_drafter`)가 딸려 있고, "end-to-end 드래프팅"에 쓰이는 구조다.

MTP는 [추론](/ko/wiki/inference/) 속도를 높이는 기술이야. 다음 [토큰](/ko/wiki/token/) **1개**만 예측하는 대신, 여러 토큰을 동시에 예측해서 디코딩 단계를 줄여. [DeepSeek](/ko/wiki/deepseek/) V3에서 **[토큰](/ko/wiki/token/)/초 기준 최대 2배** 향상을 보여줬던 방식인데, Gemma 4에도 같은 구조가 심겨 있었던 거야.

지금은 TFLite 파일 추출까지만 됐고, [PyTorch](/ko/wiki/pytorch/)로 변환하는 작업이 커뮤니티에서 진행 중이야. Google이 언제 이걸 공식 지원할지는 미발표 상태야. [역공학 진행 상황](https://huggingface.co/shadowlilac/gemma-4-e4b-mtp-extraction-effort)은 HuggingFace에서 볼 수 있어.
