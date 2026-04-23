---
title: "구글 8세대 TPU, 훈련용 TPU 8t와 추론용 TPU 8i 두 칩으로 쪼갰다"
date: "2026-04-24T08:00:00+09:00"
lang: ko
category: news
summary: "Google Cloud Next '26에서 구글이 8세대 TPU를 공개했어. 거대 훈련용 TPU 8t와 지연시간 민감한 에이전트 추론용 TPU 8i — 두 칩으로 분리해서 각각 역할에 특화했어. 슈퍼팟 하나에 9,600칩, 121 ExaFlops를 묶고, 추론 칩은 가성비를 80% 끌어올렸다고 해."
readerValue: "에이전트 워크로드를 GCP에 올릴지 자체 인프라로 갈지 판단할 수 있어."
sourceUrl: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/eighth-generation-tpu-agentic-era/"
sourceTitle: "Google Blog"
draft: false
score: 105
sourceCount: 5
factCheck:
  status: passed
  date: "2026-04-24"
  sources:
    - url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/eighth-generation-tpu-agentic-era/"
      title: "Google Blog — 8th generation TPUs"
  checks:
    - type: source_match
      result: pass
      summary: "Google 원문에서 TPU 8t/8i 두 칩 분리, 슈퍼팟 9,600칩, 121 ExaFlops, 80% 가성비 개선을 전부 확인했어."
      items:
        - "TPU 8t (Training) — 9,600 chips per superpod, 121 ExaFlops — 원문 명시"
        - "TPU 8i (Inference) — 80% better performance-per-dollar vs. previous generation — 원문 명시"
        - "288 GB HBM + 384 MB on-chip SRAM (3x more than prior generation) — 원문 명시"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "Google Cloud Next '26 발표 공식 블로그와 aicoffeechat 스레드에서 동일한 8t/8i 분리 구조를 확인했어."
      items:
        - "Google Blog 공식 포스트 — 2026-04-22 게시"
        - "Threads @aicoffeechat 언급 — scrape-targets.json threads_aicoffeechat.json 확인"
        - "Google Cloud Next '26 context — scrape JSON sourceCount=5"
    - type: number_verify
      result: pass
      summary: "2 PB 공유 HBM, 97% goodput, 19.2 Tb/s 인터커넥트 수치 전부 원문 일치."
      items:
        - "'2 petabytes shared HBM per superpod' — 원문 일치"
        - "'19.2 Tb/s interconnect bandwidth (doubled for MoE)' — 원문 일치"
        - "'up to 2x better performance-per-watt vs. Ironwood' — 원문 일치"
    - type: adversarial
      result: pass
      summary: "Google 자체 벤치마크 기반이라 독립 측정이 나오기 전까지 성능 주장은 보수적으로 읽어야 해."
      items:
        - "80% 가성비 개선은 Google 내부 비교 기준"
        - "'General availability later in 2026' — 실제 출시 시점 변동 가능"
        - "경쟁사 NVIDIA Blackwell 대비 직접 비교 데이터는 공개 안 됨"
      findings:
        - "Google 자체 벤치마크 — 독립 검증 필요"
        - "GA 시점이 '2026년 하반기'로만 명시되어 구체 날짜 미정"
tags: ["google", "tpu", "agent", "cloud", "infrastructure"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.2.0"
  news: "3.1.1"
---

구글이 Cloud Next '26에서 8세대 TPU를 [공개했어](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/eighth-generation-tpu-agentic-era/). 이번엔 한 칩으로 다 하지 않고, 훈련용 TPU 8t와 추론용 TPU 8i 두 개로 쪼갰어. 에이전트 시대에 맞춰 워크로드 성격이 완전히 갈린다는 판단이야.

## 두 칩으로 역할을 나눈 이유

**TPU 8t**는 대규모 훈련 전용이야. 슈퍼팟 하나에 9,600칩이 들어가고 2 PB의 공유 HBM으로 묶여서 총 121 ExaFlops를 뽑아. 전세대 대비 팟당 연산력이 거의 3배로 올라갔고, 최대 100만 칩까지 거의 선형으로 확장된다고 해.

**TPU 8i**는 [에이전트](/ko/wiki/agent/) 추론용이야. 지연시간에 민감한 작업을 노리고 설계했어. 전세대 대비 가성비가 80% 개선됐고, 288 GB HBM에 온칩 SRAM이 384 MB — 이전보다 3배 많아. MoE 모델을 빠르게 돌리려고 인터커넥트 대역폭을 19.2 Tb/s로 두 배 키웠어.

## 왜 이렇게 갈랐나

훈련은 몇 주씩 돌리는 큰 배치 작업이고, 에이전트 추론은 사용자가 기다리는 실시간 응답이야. 성격이 정반대니까 한 칩으로 양쪽 다 잡으면 어느 쪽도 최적이 아니야. 구글은 이 구분을 받아들여서 8t는 처리량, 8i는 응답성에 초점을 맞췄어.

TPU 8i는 Boardfly라는 새 토폴로지로 네트워크 직경을 50% 줄이고, 온칩 가속 엔진으로 집합 통신 지연을 최대 5배 줄였다고 해. 추론 서버 한 대당 Axion Arm CPU 호스트도 두 배로 늘렸어.

## 에이전트 워크로드 가는 쪽이면 주목할 만해

에이전트를 본격 돌릴 계획이면 인프라 선택지가 바뀔 수 있어. 같은 비용으로 거의 두 배 트래픽을 받겠다는 게 구글 주장이야. Ironwood 대비 와트당 성능도 최대 2배로 개선됐어. 일반 공급은 2026년 하반기 예정이라 당장 쓸 수는 없지만, 연말 GCP 마이그레이션을 검토한다면 TPU 8i 출시 일정을 맞춰보는 게 합리적이야.

다만 수치는 전부 구글 내부 비교 기준이야. NVIDIA Blackwell 대비 직접 벤치는 아직 안 나왔으니, 실제 선택은 GA 이후 독립 벤치마크가 나오고 판단하는 게 안전해.
