---
title: "developers.openai.com ??, OpenAI가 [Sora 2 Prompting Guide](http..."
date: "2026-04-05T12:00:00+09:00"
lang: ko
category: news
summary: "OpenAI가 [Sora 2 Prompting Guide](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide/)를 공개했다. 핵심은 추상적인 묘사보다 샷 단위 설계다. 한 장면엔 카메라 이동 1개, 주체 행동 1개, 색상 앵커 3~5개를 넣는 식으로 지시하라는 내용이다."
readerValue: "이 뉴스의 값은 OpenAI가 [Sora 2 Prompting Guide](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide/)를 공개했다. 핵심은 추상적인 묘사보다 샷 단위 설계다. 한 장면엔 카메라 이동 1개, 주체 행동 1개, 색상 앵커 3~5개를 넣는 식으로 지시하라는 내용이다가 실제 시장과 개발 흐름에 어떤 신호인지 빠르게 판단하게 해준다는 점이다."
sourceUrl: "https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide/"
sourceTitle: "developers.openai.com"
draft: false
score: 85
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: "https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide/"
      title: "developers.openai.com"
    - url: "https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide/"
      title: "Related OpenAI guide"
  checks:
    - type: source_match
      result: pass
tags: ["openai", "sora", "video-generation", "prompting"]
backfilled: true
backfilledAt: "2026-04-07"
---

OpenAI가 공개한 [Sora 2 프롬프팅 가이드](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide/)는 영상 생성이 왜 텍스트 생성보다 까다로운지 잘 보여줘. 핵심은 "멋진 묘사"가 아니라 샷 설계야. 문서는 한 장면에 카메라 이동 `1개`, 주체 행동 `1개`만 두고, 타이밍은 걸음 수나 초 단위로 잘게 쪼개라고 권장하거든.

예시가 직관적이야. `Actor walks across the room` 같은 문장은 너무 추상적이라 결과가 흔들리기 쉽고, 대신 `네 걸음 걸어 창가로 가서 마지막 1초에 커튼을 젖힌다`처럼 비트로 써야 한다는 거야. 영상 모델은 문학적 표현보다 편집 가능한 동작 지시를 더 잘 먹는다는 얘기지.

조명과 색도 비슷해. 가이드는 `brightly lit room`처럼 뭉뚱그린 표현보다, 따뜻한 키라이트와 차가운 림라이트처럼 광원 성격을 나누고, 색상 앵커는 `3~5개` 정도 명시하라고 말해. 또 캐릭터 일관성이 필요하면 이미지 입력을 첫 프레임 기준점으로 쓰라고 권장해. JPEG, PNG, WEBP 지원도 함께 적혀 있고.

왜 중요하냐면 영상 생성은 결국 장면 제어 문제라서야. 텍스트 모델처럼 큰 문장 1개로 밀어붙이면 그럴듯해 보여도 편집 가능한 결과가 잘 안 나와. 이번 문서는 Sora 2를 "마법 상자"가 아니라 샷 단위로 지시해야 하는 제작 도구로 다뤄야 한다는 점을 꽤 명확하게 정리해줘.
