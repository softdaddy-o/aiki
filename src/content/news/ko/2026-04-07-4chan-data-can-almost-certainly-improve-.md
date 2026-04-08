---
title: "4chan 데이터 튜닝, 8B·70B가 베이스를 넘겼다는 주장"
date: "2026-04-07T12:00:00+09:00"
lang: ko
category: news
summary: "LocalLLaMA의 한 실험자가 4chan 데이터로 튜닝한 `8B`와 `70B` 모델이 모두 베이스 모델보다 낫다고 주장했다. 합성 데이터 비중이 커진 시대에 편집되지 않은 인간 대화가 창의성과 비판성을 되살릴 수 있다는 논의가 붙었다."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1se2kna/4chan_data_can_almost_certainly_improve_model/"
sourceTitle: "LocalLLaMA"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 80
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1se2kna/4chan_data_can_almost_certainly_improve_model/"
      title: "LocalLLaMA"
  checks:
    - type: source_match
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "주장 근거가 주로 UGI와 내부 테스트에 머물러 있어 범용 성능 개선으로 일반화하긴 아직 이르다."
tags: ["llm", "training-data", "alignment", "open-model"]
---

LocalLLaMA에 올라온 [실험 글](https://www.reddit.com/r/LocalLLaMA/comments/1se2kna/4chan_data_can_almost_certainly_improve_model/)은 데이터셋 선택에 대한 꽤 불편한 질문을 던진다. 작성자는 4chan 데이터로 튜닝한 `8B(약 80억)` 모델과 `70B(약 700억)` 모델이 둘 다 베이스 모델보다 나은 결과를 냈다고 주장했다.

커뮤니티가 붙잡은 논점은 데이터 질보다 데이터 결이야. 최근 모델은 증류 데이터와 합성 데이터 비중이 지나치게 커지면서 말투는 매끈하지만 지나치게 순응적이거나 창의성이 마른다는 불만이 많다. 댓글에서도 편집되지 않은 인간 상호작용이 오히려 모델 응답을 더 살아 있게 만든다는 반응이 이어졌어.

작성자도 같은 지점을 짚어. 4chan 데이터를 고른 이유는 공격성 자체가 아니라, 과도한 맞장구와 무딘 비판 성향을 줄이는 데 도움이 된다고 봤기 때문이야. 게시글에는 모델이 더 논쟁적이고 덜 아첨하게 됐다는 식의 설명도 붙어 있다.

물론 이 결과를 곧바로 일반화하긴 어렵다. 현재 근거는 `UGI`와 내부 평가에 크게 기대고 있고, 외부 벤치와 독립 재현도 더 필요하다. 그래도 이 실험은 한 가지 질문을 남긴다. 데이터셋을 지나치게 정제할수록 모델이 더 똑똑해지는 게 아니라, 오히려 인간 대화의 거친 롱테일을 잃으면서 사고의 폭까지 같이 줄어드는 것 아니냐는 질문이다.
