---
title: "M3 Pro에서 Gemma E2B로 실시간 음성·영상 대화를 돌린 사례"
date: "2026-04-06T12:00:00+09:00"
lang: ko
category: news
summary: "Gemma E2B를 M3 Pro에서 실시간 음성·영상 입력, 음성 출력 형태로 묶은 데모다. 언어 학습 같은 개인용 온디바이스 AI 경험이 어디까지 왔는지 가늠하게 해준다."
readerValue: "이 글이 해결해주는 문제는 실시간 멀티모달 AI가 아직 거대한 클라우드 모델 전용이 아니라는 점, 그리고 개인 기기에서 먼저 유효한 사용처가 어디인지 빠르게 읽게 해준다는 점이다."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sda3r6/realtime_ai_audiovideo_in_voice_out_on_an_m3_pro/"
sourceTitle: "Reddit r/LocalLLaMA"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 80
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://news.ycombinator.com/item?id=47652561"
      title: "Hacker News discussion"
    - url: "https://github.com/fikrikarim/parlor"
      title: "parlor GitHub repo"
  checks:
    - type: source_match
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "완전한 연속 비디오 스트림보다는 저빈도 이미지 스냅샷에 가까워서 '실시간 영상' 표현은 다소 넓게 봐야 한다."
tags: ["gemma", "on-device", "multimodal", "voice"]
---

Gemma E2B를 M3 Pro에서 실시간 음성·영상 입력과 음성 출력으로 연결한 데모다. Reddit에서 추천 169개, 댓글 31개를 모았는데, 포인트는 "코딩 에이전트급 성능"이 아니라 언어 학습처럼 짧은 왕복이 중요한 개인용 AI 경험을 온디바이스에서 굴릴 수 있다는 데 있다.

작성자는 에이전트 코딩 같은 고난도 용도는 아니라고 선을 그으면서도, 새로운 언어를 배울 때 카메라로 사물을 비추고 바로 대화하는 흐름에는 이 조합이 충분히 먹힌다고 설명했다. 링크된 `parlor` 저장소까지 보면, 이 글의 본질은 모델 자체보다 입출력 레이어를 어떻게 묶었는지에 있다.

이 사례가 주는 신호는 분명하다. 멀티모달 실시간 AI가 당장 모든 생산성 업무를 대체하는 건 아니어도, 언어 학습, 보조 설명, 시각 안내 같은 좁은 작업에서는 이미 개인 기기 위에서 설득력 있는 UX를 만들 수 있다는 뜻이다. 앞으로 스마트폰 쪽으로 바로 내려갈 수 있다는 상상도 그래서 허황되지 않다.

상위 댓글도 "5B 모델이면 이제 휴대폰 16GB RAM에서도 되지 않나"라는 식으로 반응했다. 즉 사람들은 데모의 멋보다도 "이게 언제 내 기기로 내려오나"를 먼저 보고 있었다. 실시간 멀티모달 AI를 읽을 때도 바로 그 질문이 핵심이다.
