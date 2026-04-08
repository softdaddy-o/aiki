---
title: "Gemma 4 31B가 $0.20 비용으로 상위 모델들을 앞섰다는 주장"
date: "2026-04-06T12:00:00+09:00"
lang: ko
category: news
summary: "한 커뮤니티 벤치마크에서 Gemma 4 31B가 실행당 0.20달러 비용으로 GPT-5.2, Gemini 3 Pro, Sonnet 4.6보다 높은 수익률을 냈다는 보고다."
readerValue: "이 글이 해결해주는 문제는 오픈 모델 성능을 볼 때 순위표만이 아니라 비용 대비 효율을 같이 봐야 한다는 점, 그리고 커뮤니티 벤치마크를 어디까지 신뢰할지 판단 포인트를 빠르게 짚게 해준다는 점이다."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sdcotc/gemma_4_just_casually_destroyed_every_model_on/"
sourceTitle: "Reddit r/LocalLLaMA"
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

Gemma 4 31B가 커뮤니티 리더보드에서 Opus 4.6과 GPT-5.2를 제외한 거의 모든 모델을 눌렀다는 주장이다. 작성자는 실행당 비용을 0.20달러로 잡았고, 5회 중 5회 수익, 중앙 ROI 1,144%를 기록했다고 적었다. Reddit에서 추천 1,560개, 댓글 274개가 붙은 것도 이 숫자 조합이 꽤 자극적이기 때문이다.

내용을 뜯어보면 더 중요한 건 절대 성능보다 비교 방식이다. Gemma 4 31B를 GPT-5.2는 4.43달러, Gemini 3 Pro는 2.95달러, Sonnet 4.6은 7.90달러로 놓고 비교해 비용 효율을 강조했다. 즉 이 글은 "Gemma가 최고다"보다 "에이전트 워크로드에서 비용을 넣으면 순위가 달라진다"는 메시지로 읽는 편이 맞다.

다만 이런 벤치마크는 설정 공개 범위와 평가 기준을 같이 봐야 한다. 실제로 상위 댓글도 결과 페이지에 추론 비용 열이 보이지 않는다고 지적했다. AI 실무에서 이 글이 주는 가치는 순위표 자체보다, 앞으로는 성능 숫자만이 아니라 실행 비용과 과제 설계를 한 묶음으로 봐야 한다는 신호에 있다.

그래서 이 글은 Gemma 4 찬양문으로 읽기보다, 오픈 모델 평가가 "성능만 좋은가"에서 "돈까지 넣으면 어떤가"로 이동하는 장면으로 보는 편이 낫다. 특히 에이전트나 시뮬레이션 워크로드를 운영하는 팀이라면 더 그렇다.
