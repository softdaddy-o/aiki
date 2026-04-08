---
title: "LocalLLaMA ??, 개발자 fikrikarim이 M3 Pro 맥북에서 Gemma E2B와 Kokoro를 조..."
date: "2026-04-06T12:00:00+09:00"
lang: ko
category: news
summary: "개발자 fikrikarim이 M3 Pro 맥북에서 Gemma E2B와 Kokoro를 조합해 오디오·비디오 입력, 음성 출력이 이어지는 온디바이스 데모를 공개했다. 코드베이스는 `parlor`로 올라왔고, 추가 이미지 프레임을 넣을 때 지연이 약 `0.5초` 늘어난다고 설명했다."
readerValue: "이 뉴스의 값은 개발자 fikrikarim이 M3 Pro 맥북에서 Gemma E2B와 Kokoro를 조합해 오디오·비디오 입력, 음성 출력이 이어지는 온디바이스 데모를 공개했다. 코드베이스는 `parlor`로 올라왔고, 추가 이미지 프레임을 넣을 때 지연이 약 `0.5초` 늘어난다고 설명했다가 실제 시장과 개발 흐름에 어떤 신호인지 빠르게 판단하게 해준다는 점이다."
sourceUrl: "https://v.redd.it/jdurdr0ysetg1"
sourceTitle: "LocalLLaMA"
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

LocalLLaMA와 Hacker News에서 같이 퍼진 데모를 보면, 개발자 fikrikarim이 `M3 Pro` 맥북 위에서 오디오·비디오 입력을 받고 음성으로 답하는 온디바이스 파이프라인을 만들었어. 모델은 `Gemma E2B`, 음성은 `Kokoro`, 코드베이스는 [parlor](https://github.com/fikrikarim/parlor)라는 이름으로 공개됐고.

이 조합이 재밌는 건 클라우드 없이도 꽤 자연스러운 대화 흐름이 나온다는 점이야. 작성자 설명 기준으로 맥북 1대에서 음성과 영상 2개 입력 축을 같이 다루고, 여기에 이미지 스냅샷을 추가하면 time-to-first-token이 약 0.5초 정도 더 붙는다고 해. 기본 파이프라인도 모델 3개를 이어 붙인 구조라서, 완전한 비디오 스트리밍이라기보다 빠른 시각 스냅샷 대화에 가깝지만 체감은 이미 "로컬 비서" 쪽에 꽤 가까워졌어.

하드웨어 포인트도 커. `M3 Pro` 한 대에서 이 정도 멀티모달 상호작용이 된다는 건, 고성능 GPU 서버가 아니어도 개인 장비에서 음성 에이전트를 굴릴 수 있다는 뜻이거든. 작성자는 HN 댓글에서 같은 구조가 `iPhone 17 Pro`급 칩에서도 가능할 수 있다고 언급했어.

왜 중요하냐면 에이전트 경쟁의 다음 단계가 이제 모델 IQ보다 배치 위치에 달려 있어서야. 클라우드 API가 아니라 네 노트북에서 돌아가는 멀티모달 모델이 충분히 쓸 만해지면, 개인정보·지연·비용 계산이 한꺼번에 바뀌거든. 이 데모는 그 전환선이 생각보다 빨리 오고 있다는 신호로 보여.
