---
title: "DeepSeek DeepGEMM, Mega MoE와 FP4 Indexer로 대규모 업데이트"
date: "2026-04-18T11:00:00+09:00"
lang: ko
category: news
summary: "DeepSeek이 FP8 GEMM 라이브러리 DeepGEMM에 Mega MoE, FP4 Indexer, FP8×FP4 하이브리드 연산을 붙이는 대규모 업데이트를 준비 중이다. MoE dispatch·SwiGLU·combine을 단일 메가커널로 합치고 Blackwell 최적화까지 포함돼, V4 루머와 맞물려 커뮤니티 관심이 커졌다."
readerValue: "MoE 모델을 직접 학습·서빙하는 팀이라면 지금 인프라 설계를 어느 방향으로 잡을지 판단하게 해준다"
sourceUrl: "https://www.panewslab.com/en/articles/019d9605-414a-727c-8f9a-75d01ca4b436"
sourceTitle: "PANews"
draft: false
score: 45
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-18"
  sources:
    - url: "https://www.panewslab.com/en/articles/019d9605-414a-727c-8f9a-75d01ca4b436"
      title: "PANews — DeepGEMM major updates"
    - url: "https://github.com/deepseek-ai/DeepGEMM"
      title: "GitHub deepseek-ai/DeepGEMM"
    - url: "https://finance.sina.com.cn/tech/roll/2026-04-17/doc-inhuupte2263261.shtml"
      title: "Sina Tech — DeepGEMM 업데이트"
  checks:
    - type: source_match
      result: pass
      summary: "PANews 보도와 GitHub 리포지토리 정보를 대조했어"
      items:
        - "DeepGEMM은 FP8 GEMM 라이브러리 — GitHub README 확인"
        - "'Public release 26/04' 머지 리퀘스트 공개 — PANews 보도"
        - "Mega MoE: dispatch + linear1/SwiGLU/linear2 + combine 단일 커널 — PANews 확인"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "PANews와 Sina Tech 두 보도에서 업데이트 범위가 다 일치했어"
      items:
        - "FP4 Indexer 추가 (MQA logits 지원) — PANews + Sina Tech"
        - "FP8×FP4 하이브리드 연산 지원 — PANews + Sina Tech"
        - "NVIDIA Blackwell 아키텍처 최적화 — PANews"
    - type: number_verify
      result: pass
      summary: "버전·기능 수치를 GitHub와 보도에서 맞췄어"
      items:
        - "DeepGEMM 저장소 활성: GitHub에서 public repo 확인"
        - "Mega MoE가 4개 서브 연산(dispatch, linear1/SwiGLU, linear2, combine) 통합"
        - "HyperConnection, DeepEPv2 MoE GEMM layout 등 보조 기능 추가"
    - type: adversarial
      result: pass
      summary: "V4 루머 연결 여부와 실제 사용성 제약을 비판적으로 봤어"
      items:
        - "PANews는 '이번 릴리스는 모델 릴리스와 무관'이라고 명시했음"
        - "V4 연결설은 커뮤니티 추측 — 공식 발표 아님"
        - "Blackwell 최적화는 H100 등 기존 GPU 사용자에겐 직접 이득 제한적"
      findings:
        - "V4 출시와 연결짓는 해석은 공식 근거 없음 — 인프라 최적화 릴리스로만 볼 것"
        - "실제 성능 이득 수치(토큰/초, 메모리 절감)는 아직 공개되지 않음"
tags: ["deepseek", "deepgemm", "mixture-of-experts", "fp8", "gpu-optimization"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

DeepSeek이 자체 FP8 GEMM 라이브러리 [DeepGEMM](https://github.com/deepseek-ai/DeepGEMM)에 큰 업데이트를 예고하고 나섰어. 'Public release 26/04'라는 머지 리퀘스트를 [공개](https://www.panewslab.com/en/articles/019d9605-414a-727c-8f9a-75d01ca4b436)하면서 Mega MoE, FP4 Indexer, FP8×FP4 하이브리드 연산 같은 무거운 변경들이 한꺼번에 들어갔거든.

핵심은 Mega MoE 쪽이야. 기존 [MoE](https://aiki.softdaddy-o.com/wiki/mixture-of-experts) 추론은 dispatch(토큰 분배), linear1/SwiGLU/linear2(전문가 연산), combine(결과 결합) 4단계를 따로 돌렸는데, 이걸 하나의 메가 커널로 합쳤다. NVLink 통신과 텐서 코어 연산 사이의 오버랩까지 같이 튜닝했고. MoE 서빙에서 커널 런치 오버헤드와 메모리 이동 비용이 병목이던 팀에는 직접 영향이 큰 변화야. FP8 기반에서 FP4로 한 단계 더 내려가는 방향이라, 같은 H100 8장 서버 기준으로 메모리 여유를 더 뽑을 수 있게 설계된 거거든.

추가로 들어간 FP4 Indexer는 MQA(Multi-Query Attention) logits를 FP4로 처리해서 더 큰 MTP(Multi-Token Prediction)를 지원하고, FP8×FP4 하이브리드 연산과 NVIDIA Blackwell 최적화도 포함된다. HyperConnection과 DeepEPv2 MoE GEMM 레이아웃도 같이 들어갔어. 정리하면 차세대 GPU + 저비트 정밀도 + MoE라는 조합에 맞춰 인프라를 다시 짠 업데이트야.

커뮤니티가 이걸 DeepSeek V4 출시 루머와 엮어서 해석하고 있는데, PANews는 "이번 릴리스는 내부 모델 릴리스와는 무관하다"고 못을 박았어. 실제 성능 이득 수치(토큰/초, 메모리 절감)는 아직 공개 안 됐고, Blackwell이 아닌 H100 세대를 쓰는 팀한테는 직접 체감 이득이 제한적일 수 있다는 점도 같이 봐둘 만해.
