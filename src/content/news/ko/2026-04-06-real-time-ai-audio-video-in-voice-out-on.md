---
title: M3 Pro에서 Gemma E2B로 실시간 음성·영상 대화를 돌린 사례
date: "2026-04-06T12:00:00+09:00"
lang: ko
category: news
summary: Gemma E2B를 M3 Pro에서 실시간 음성·영상 입력, 음성 출력 형태로 묶은 데모다. 언어 학습 같은 개인용 온디바이스 AI 경험이 어디까지 왔는지 가늠하게 해준다.
readerValue: 이 데모가 재미 요소인지 실제 로컬 배포 힌트인지 빠르게 판단하는 데 도움이 된다.
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
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 확인해뒀어.
      items:
        - 독자가 먼저 갈라 봐야 할 건 이 데모가 재미 요소인지 실제 로컬 배포 힌트인지.
        - 제목부터 다시 보면 기사 제목은 "M3 Pro에서 Gemma E2B로 실시간 음성·영상 대화를 돌린 사례"이고, 원문 제목은 "Reddit r/LocalLLaMA"로 잡혔어.
        - 출처를 다시 보면 대표 원문 도메인은 reddit.com로 잡혔어.
        - 이 글의 축을 다시 보면 이 글의 핵심 축은 gemma, on-device, multimodal, voice로 읽었어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 원문 하나만 믿지 않으려고 관련 출처 2건을 옆에 두고 비교해뒀어.
      items:
        - 여기서 먼저 갈라 볼 기준은 이 데모가 재미 요소인지 실제 로컬 배포 힌트인지.
        - 같이 본 출처로는 Hacker News discussion (https://news.ycombinator.com/item?id=47652561)
        - 같이 본 출처로는 parlor GitHub repo (https://github.com/fikrikarim/parlor)
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 검증해뒀어.
      items:
        - 숫자를 다시 보면 원문에서 다시 본 숫자나 버전 표기는 M3, E2B 쪽이야.
        - 이름처럼 보이는 숫자 표기는 버전명인지 실제 스펙인지 따로 갈라서 읽었어.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸러뒀어.
      items:
        - 커뮤니티 반응 수치와 실제 제품 영향력은 같은 뜻이 아니라서 따로 갈라 봤어.
        - 개인 실험이나 후기 성격의 글이라 재현 가능성과 대표성도 따로 의심해봤어.
      findings:
        - Reddit 반응은 관심 신호일 뿐이고, 제품 준비도나 시장 검증을 바로 뜻하지는 않아.
tags:
  - gemma
  - on-device
  - multimodal
  - voice
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    news: "3.1.2"
  panelVerdict: pass
  contentHash: "921390c67f49fbb3"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

Gemma E2B를 M3 Pro에서 실시간 음성·영상 입력, 음성 출력 형태로 묶은 데모야. 언어 [학습](/ko/wiki/training/) 같은 개인용 [온디바이스](/ko/wiki/on-device/) AI 경험이 어디까지 왔는지 가늠하게 해준다 [원문](https://www.reddit.com/r/LocalLLaMA/comments/1sda3r6/realtime_ai_audiovideo_in_voice_out_on_an_m3_pro/)은 Reddit [r/LocalLLaMA](/ko/wiki/localllama/) 기준으로 확인한 내용이야. 이 이슈는 AI가 아직 거대한 클라우드 모델 전용이 아니라는 점, 그리고 개인 기기에서 먼저 유효한 사용처가 어디인지 빠르게 읽게 해준 쪽에서 읽어야 해. 이걸 그렇게 봐야 [온디바이스](/ko/wiki/on-device/) AI가 먼저 먹히는 자리가 어디인지 선명해지거든.

## 왜 중요할까

M3 Pro에서 Gemma E2B로 실시간 음성·영상 대화를 돌린 사례에서 진짜 봐야 하는 건 이름 자체보다 실무 우선순위와 적용 범위가 어디를 바꾸는지야. 공개 범위, 숫자, 적용 대상, 제약 조건이 같이 움직이는지 봐야 발표 문구와 실전 신호를 구분할 수 있어.

## 앞으로 볼 점

실무에서는 이 업데이트를 바로 도입할지보다 먼저 지금 쓰는 모델, 도구, 배포 흐름과 붙일 수 있는지를 체크하면 돼. 그렇게 봐야 이 변화가 단순 화제인지, 다음 분기 우선순위를 바꿀 수준인지 판단하기 쉬워져.
