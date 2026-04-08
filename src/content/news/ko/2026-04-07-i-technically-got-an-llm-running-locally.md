---
title: "iMac G3에서 LLM을 돌린 복고 실험"
date: "2026-04-07T12:00:00+09:00"
lang: ko
category: news
summary: "LocalLLaMA에 1998년형 iMac G3에서 초소형 LLM을 구동한 실험이 올라왔다. 기기는 `233MHz` PowerPC 750과 `32MB` RAM, 모델은 약 `1MB`급 TinyStories 체크포인트였고, Retro68로 클래식 Mac OS용 바이너리를 크로스컴파일했다."
sourceUrl: "https://i.redd.it/p4vfca76qhtg1.jpeg"
sourceTitle: "LocalLLaMA"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 80
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1sdnw7l/i_technically_got_an_llm_running_locally_on_a/"
      title: "LocalLLaMA"
  checks:
    - type: source_match
      result: pass
    - type: adversarial
      result: pass
      findings: []
tags: ["llm", "retro-computing", "tiny-model", "local-ai"]
---

LocalLLaMA에 올라온 [복고 실험](https://www.reddit.com/r/LocalLLaMA/comments/1sdnw7l/i_technically_got_an_llm_running_locally_on_a/)은 말 그대로 `1998년`형 iMac G3에서 LLM을 실행해본 사례야. 기기 사양은 `233MHz` PowerPC 750, `32MB` RAM, 운영체제는 Mac OS 8.5였고 추가 업그레이드도 없었다고 해.

물론 여기서 돌아간 모델은 오늘날 기준의 챗봇이 아니야. Andrej Karpathy의 `TinyStories` 계열, 대략 `260K` 규모에 체크포인트가 `1MB` 안팎인 초소형 모델이야. "구형 컴퓨터에서도 GPT급 AI가 돌아간다"는 이야기가 아니라, 아주 작은 추론 모델을 오래된 환경에 이식해본 실험에 가깝지.

재미는 모델보다 구현 과정에 있어. 작성자는 `Retro68`를 써서 현대 맥에서 클래식 Mac OS용 바이너리를 크로스컴파일했고, 그 결과물을 iMac G3로 옮겨 실행했다. 고전 하드웨어에 현대 ML 추론 코드를 억지로 맞춰 넣는 과정 자체가 이 실험의 중심이야.

이런 시도가 남기는 메시지도 있다. LLM 논의는 거대한 GPU 숫자만 따라가기 쉽지만, 반대로 추론 엔진과 모델이 어디까지 작아질 수 있는지도 중요한 축이기 때문이다. `28년` 전 하드웨어에서 `1MB`급 모델을 돌렸다는 사실은 초저전력·초경량 AI가 내려갈 수 있는 하한선을 감각적으로 보여준다.
