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

LocalLLaMA에 올라온 [이 복고 실험](https://www.reddit.com/r/LocalLLaMA/comments/1sdnw7l/i_technically_got_an_llm_running_locally_on_a/)은 제목 그대로야. `1998년`형 iMac G3에서 진짜로 LLM을 돌려봤어. 하드웨어는 `233MHz` PowerPC 750, 메모리는 `32MB`, 운영체제는 Mac OS 8.5.

물론 여기서 말하는 LLM은 지금 우리가 쓰는 챗봇급 모델이 아니야. Andrej Karpathy의 `TinyStories` 계열 초소형 체크포인트고, 크기도 `1MB` 안팎이야. 그러니까 “구형 맥에서도 GPT가 돌아간다”가 아니라, “언어 모델을 어디까지 줄일 수 있냐”를 보여주는 데모에 가까워.

진짜 재미는 구현 쪽이야. 작성자는 `Retro68`로 클래식 Mac OS용 바이너리를 크로스컴파일해서 현대 ML 추론 코드를 옛 하드웨어에 억지로 이식했어. 이건 성능 자랑이라기보다 포팅 감각과 집념의 승리야.

그래도 이런 실험이 주는 메시지는 분명해. LLM 뉴스는 보통 더 큰 GPU, 더 큰 컨텍스트, 더 큰 매개변수로만 흐르는데, 반대 방향도 중요하거든. `28년` 전 컴퓨터에서 `1MB`급 모델이 돌아갔다는 사실은 초경량 추론의 하한선이 생각보다 낮을 수 있다는 걸 감각적으로 보여줘.

요약하면, 이건 실용 제품 뉴스는 아니야. 대신 “언어 모델은 얼마나 작아질 수 있나”라는 질문에 꽤 멋진 답을 준 실험이야.
