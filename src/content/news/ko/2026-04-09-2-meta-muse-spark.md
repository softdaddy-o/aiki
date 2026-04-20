---
title: Meta의 오픈소스 전략이 바뀌었다 — Muse Spark 공개
date: "2026-04-09T10:00:00+09:00"
lang: ko
category: news
summary: Meta Superintelligence Labs의 첫 모델 Muse Spark가 공개됐다. Llama로 대표되던 오픈소스 전략을 뒤집고 클로즈드 모델로 출시, 전 세계 30억 명의 Meta 앱에 탑재할 예정이다.
readerValue: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하는 데 도움이 된다.
sourceUrl: https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/
sourceTitle: "TechCrunch: Meta Muse Spark"
draft: false
score: 82
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/
      title: TechCrunch
    - url: https://www.bloomberg.com/news/articles/2026-04-08/meta-debuts-first-ai-model-from-prized-superintelligence-group
      title: Bloomberg
    - url: https://www.cnbc.com/2026/04/08/meta-debuts-first-major-ai-model-since-14-billion-deal-to-bring-in-alexandr-wang.html
      title: CNBC
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 확인해뒀어.
      items:
        - 독자가 먼저 갈라 봐야 할 건 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지.
        - "제목부터 다시 보면 기사 제목은 \"Meta의 오픈소스 전략이 바뀌었다 — Muse Spark 공개\"이고, 원문 제목은 \"TechCrunch: Meta Muse Spark\"로 잡혔어."
        - 출처를 다시 보면 대표 원문 도메인은 techcrunch.com로 잡혔어.
        - 이 글의 축을 다시 보면 이 글의 핵심 축은 Meta, Muse Spark, AI모델, 오픈소스로 읽었어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 원문 하나만 믿지 않으려고 관련 출처 3건을 옆에 두고 비교해뒀어.
      items:
        - 여기서 먼저 갈라 볼 기준은 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지.
        - 같이 본 출처로는 TechCrunch (https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/)
        - 같이 본 출처로는 Bloomberg (https://www.bloomberg.com/news/articles/2026-04-08/meta-debuts-first-ai-model-from-prized-superintelligence-group)
        - 같이 본 출처로는 CNBC (https://www.cnbc.com/2026/04/08/meta-debuts-first-major-ai-model-since-14-billion-deal-to-bring-in-alexandr-wang.html)
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 검증해뒀어.
      items:
        - 숫자를 다시 보면 원문에서 다시 본 숫자나 버전 표기는 30, 9, 1, 000 쪽이야.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸러뒀어.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.
        - 출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.
        - 사건성 키워드는 단발 이슈인지 구조 변화 신호인지 따로 갈라 봤어.
      findings: []
tags:
  - Meta
  - Muse Spark
  - AI모델
  - 오픈소스
---

Meta Superintelligence Labs의 첫 모델 [Muse Spark](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/)가 나왔어. 9개월 전 영입한 Alexandr Wang이 이끄는 팀의 작품이고, 코드명은 Avocado였다고. 그런데 이번 출시에서 눈에 띄는 게 있어 — 지금까지 [Llama](/ko/wiki/llama/) 시리즈로 오픈소스 전략을 밀어온 Meta가 이번엔 클로즈드 모델로 출시했거든. "향후 버전에서 오픈소스화를 희망한다"는 말을 남기면서.

모델은 속도 모드와 깊은 추론을 위한 Contemplating mode를 이중으로 갖췄고, 의사 1,000명과 협력해 건강 관련 [추론](/ko/wiki/inference/) 능력을 키웠대. Facebook, Instagram, WhatsApp, Messenger는 물론 Ray-Ban Meta 스마트 안경에도 탑재될 예정이야 — 전 세계 30억 명이 쓰는 앱들이잖아.

AI 경쟁에서 오픈소스는 생태계 확보 전략이었는데, Meta가 그걸 접었다는 건 이제 경쟁이 성능 전쟁으로 옮겨갔다는 신호야. [Llama](/ko/wiki/llama/)를 쓰던 개발자들 입장에선 다음 오픈소스 Muse가 언제 나올지 지켜볼 수밖에.
