---
title: "Gemma 4 31B, 로컬 벤치에서 비용 대비 성능이 부각됐다"
date: "2026-04-06T12:00:00+09:00"
lang: ko
category: news
summary: "LocalLLaMA 벤치 공유에 따르면 Gemma 4 31B가 에이전트형 테스트에서 `5/5` 수익 달성과 `+1,144%` 중앙 ROI를 기록했다. 실행 비용은 `run당 0.20달러`였고, 더 높은 점수를 낸 건 Opus 4.6뿐이라는 주장이다."
sourceUrl: "https://i.redd.it/cg0ej8ee9ftg1.png"
sourceTitle: "LocalLLaMA"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 80
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1sdcotc/gemma_4_just_casually_destroyed_every_model_on/"
      title: "LocalLLaMA benchmark post"
  checks:
    - type: source_match
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "커뮤니티 벤치마크 결과라서 독립 재현과 평가셋 공개가 더 필요하다."
tags: ["gemma", "google", "open-model", "benchmark"]
---

LocalLLaMA에 올라온 [벤치 공유](https://www.reddit.com/r/LocalLLaMA/comments/1sdcotc/gemma_4_just_casually_destroyed_every_model_on/)는 Gemma 4 31B를 비용 대비 성능 관점에서 다시 보게 만들었어. 게시물 기준으로 이 모델은 에이전트형 테스트에서 `5번 중 5번` 모두 수익 구간에 들어갔고, 중앙값 ROI는 `+1,144%`였어.

커뮤니티가 더 민감하게 반응한 건 비용표였어. 작성자는 `run당 0.20달러` 수준에서 이 결과가 나왔다고 적었고, 같은 표에는 `GPT-5.2` `4.43달러`, `Gemini 3 Pro` `2.95달러`, `Sonnet 4.6` `7.90달러`가 함께 제시됐다. 절대 점수보다 가격 대비 효율이 훨씬 강한 메시지로 읽힌 셈이야.

다만 그대로 일반화하긴 이르다. Google 공식 벤치마크가 아니라 커뮤니티 자체 평가이고, 과제 구성과 테스트 환경이 얼마나 대표성을 가지는지는 더 확인이 필요하다. 그럼에도 `31B`급 오픈 모델이 상위 폐쇄형 모델 바로 아래 구간에서 언급된다는 사실 자체는 무시하기 어렵다.

중요한 건 로컬 모델 경쟁의 질문이 바뀌고 있다는 점이다. 예전에는 오픈 모델이 어디까지 따라오느냐가 핵심이었다면, 지금은 같은 비용에서 폐쇄형보다 더 나은 선택지가 되느냐가 더 직접적인 기준이 되고 있다. Gemma 4 31B는 그 싸움에서 꽤 공격적인 기준점이야.
