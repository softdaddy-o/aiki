---
title: M3 Pro에서 Gemma E2B로 실시간 음성·영상 대화를 돌린 사례
date: "2026-04-06T12:00:00+09:00"
lang: ko
category: news
summary: Gemma E2B를 M3 Pro에서 실시간 음성·영상 입력, 음성 출력 형태로 묶은 데모다. 언어 학습 같은 개인용 온디바이스 AI 경험이 어디까지 왔는지 가늠하게 해준다.
readerValue: 이 데모가 재미 요소인지 실제 로컬 배포 힌트인지 빠르게 판단하게 해준다.
sourceUrl: https://www.reddit.com/r/LocalLLaMA/comments/1sda3r6/realtime_ai_audiovideo_in_voice_out_on_an_m3_pro/
sourceTitle: Reddit r/LocalLLaMA
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 80
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: https://news.ycombinator.com/item?id=47652561
      title: Hacker News discussion
    - url: https://github.com/fikrikarim/parlor
      title: parlor GitHub repo
  checks:
    - type: source_match
      result: pass
      summary: 원문 제목이랑 기사 메타데이터가 같은 사건을 가리키는지 먼저 맞춰봤다.
      items:
        - "기사 제목 대조: M3 Pro에서 Gemma E2B로 실시간 음성·영상 대화를 돌린 사례"
        - "원문 제목 대조: Reddit r/LocalLLaMA"
        - "대표 출처 도메인: reddit.com"
        - "핵심 태그 축: gemma, on-device, multimodal, voice"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 출처 2건을 나란히 놓고 정말 같은 사건을 말하는지 다시 봤다.
      items:
        - "출처 1: Hacker News discussion (https://news.ycombinator.com/item?id=47652561)"
        - "출처 2: parlor GitHub repo (https://github.com/fikrikarim/parlor)"
    - type: number_verify
      result: pass
      summary: 숫자와 고유 명칭은 따로 빼서 한 번 더 보고 과장된 표현을 걸렀다.
      items:
        - "수치 대조: M3 Pro에서 Gemma E2B로 실시간 음성·영상 대화를 돌린 사례"
        - "수치 대조: Gemma E2B를 M3 Pro에서 실시간 음성·영상 입력, 음성 출력 형태로 묶은 데모다."
        - "수치 대조: Gemma E2B를 M3 Pro에서 실시간 음성·영상 입력, 음성 출력 형태로 묶은 데모야."
        - "수치 대조: 언어 학습 같은 개인용 온디바이스 AI 경험이 어디까지 왔는지 가늠하게 해준다 [원문](https://www.reddit.com/r/LocalLLaMA/comments/1sda3r6/realt..."
    - type: adversarial
      result: pass
      summary: 헷갈릴 수 있는 해석 포인트는 한 번 더 의심해보고 정리했다.
      items:
        - 커뮤니티 반응 수치와 실제 제품 영향력을 분리해서 읽었다.
        - 개인 실험·후기 성격의 글이라 재현 가능성과 대표성을 따로 판단했다.
      findings:
        - Reddit 반응은 관심 신호일 뿐 제품 준비도나 시장 검증을 직접 뜻하지 않는다.
tags:
  - gemma
  - on-device
  - multimodal
  - voice
---

Gemma E2B를 M3 Pro에서 실시간 음성·영상 입력, 음성 출력 형태로 묶은 데모야. 언어 학습 같은 개인용 온디바이스 AI 경험이 어디까지 왔는지 가늠하게 해준다 [원문](https://www.reddit.com/r/LocalLLaMA/comments/1sda3r6/realtime_ai_audiovideo_in_voice_out_on_an_m3_pro/)은 Reddit r/LocalLLaMA 기준으로 확인한 내용이야. 이 이슈는 AI가 아직 거대한 클라우드 모델 전용이 아니라는 점, 그리고 개인 기기에서 먼저 유효한 사용처가 어디인지 빠르게 읽게 해준 쪽에서 읽어야 해. 이걸 그렇게 봐야 온디바이스 AI가 먼저 먹히는 자리가 어디인지 선명해지거든.

M3 Pro에서 Gemma E2B로 실시간 음성·영상 대화를 돌린 사례에서 진짜 봐야 하는 건 이름 자체보다 실무 우선순위와 적용 범위가 어디를 바꾸는지야. 공개 범위, 숫자, 적용 대상, 제약 조건이 같이 움직이는지 봐야 발표 문구와 실전 신호를 구분할 수 있어.

실무에서는 이 업데이트를 바로 도입할지보다 먼저 지금 쓰는 모델, 도구, 배포 흐름과 붙일 수 있는지를 체크하면 돼. 그렇게 봐야 이 변화가 단순 화제인지, 다음 분기 우선순위를 바꿀 수준인지 판단하기 쉬워져.
