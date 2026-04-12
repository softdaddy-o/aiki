---
title: "OpenAI Stargate 핵심 리더 3명이 Meta로 갔다 — 데이터센터 전략 흔들린다"
date: "2026-04-13T10:30:00+09:00"
lang: ko
category: news
summary: "OpenAI의 Stargate 데이터센터 프로젝트를 이끌던 Peter Hoeschele, Shamez Hemani, Anuj Saharan 3명이 Meta로 이직했다. OpenAI는 자체 데이터센터 건설에서 클라우드 임대로 전략을 바꾸고, Abilene Stargate는 2GW 확장 대신 1.2GW로 축소했다. Meta는 2026년 AI 인프라에 1,350억 달러를 쏟아붓고 있다."
readerValue: "OpenAI의 인프라 전략 변화가 API 가격과 서비스 안정성에 어떤 영향을 줄지 판단하게 해준다"
sourceUrl: "https://www.theinformation.com/articles/openai-stargate-leaders-depart-latest-shakeup-data-center-strategy"
sourceTitle: "The Information"
draft: false
score: 90
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://www.theinformation.com/articles/openai-stargate-leaders-depart-latest-shakeup-data-center-strategy"
      title: "The Information — OpenAI Stargate Leaders Depart"
    - url: "https://seekingalpha.com/news/4573915-openai-stargate-leaders-including-peter-hoeschele-depart-in-latest-shakeup-to-data-center-strategy-report"
      title: "Seeking Alpha — Stargate Leaders Depart"
    - url: "https://winbuzzer.com/2026/03/09/openai-oracle-cap-texas-ai-data-center-abilene-stargate-xcxwbn/"
      title: "WinBuzzer — OpenAI and Oracle Cap Texas AI Data Center at 1.2 GW"
    - url: "https://www.datacenterdynamics.com/en/news/openai-reorganizes-leadership-amid-data-center-strategy-readjustment/"
      title: "DCD — OpenAI Reorganizes Leadership"
  checks:
    - type: source_match
      result: pass
      summary: "인물 이름, 전략 전환, 수치를 원문과 비교해뒀어."
      items:
        - "Peter Hoeschele, Shamez Hemani, Anuj Saharan 3명 이직 — The Information 확인 ✅"
        - "Meta Superintelligence Labs 합류 — Seeking Alpha, Outlook Business 확인 ✅"
        - "Abilene 2GW→1.2GW 축소 — WinBuzzer, Tom's Hardware 확인 ✅"
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "4개 독립 소스에서 사실 교차 확인해뒀어."
      items:
        - "The Information, Seeking Alpha, DCD, Bloomberg 모두 리더십 이탈 보도 ✅"
        - "영국 Stargate 일시 중단 — Bloomberg, CNBC, Computer Weekly 확인 ✅"
        - "Meta 2026년 AI 인프라 지출 규모 — 복수 매체 보도 ✅"
    - type: number_verify
      result: pass
      summary: "금액과 전력 수치를 정량 확인해뒀어."
      items:
        - "Abilene 1.2GW 캡 — WinBuzzer, Tom's Hardware 일치 ✅"
        - "2GW 확장 취소 — Interesting Engineering, Tom's Hardware 확인 ✅"
        - "Meta $135B AI 인프라 지출 — Outlook Business 보도 기준 ✅"
    - type: adversarial
      result: pass
      summary: "전략 해석이 한쪽으로 치우치지 않도록 맥락을 걸러뒀어."
      items:
        - "자체 인프라 축소가 곧 API 가격 인상으로 이어진다는 인과는 불확실"
        - "클라우드 임대 전환은 비용 절감 전략일 수도 있음"
        - "3명 이직이 조직 전체 역량 저하를 의미하지는 않을 수 있음"
      findings:
        - "클라우드 임대 전환이 비용 절감 효과를 가져올 수도 있어 API 가격 영향은 양방향이다"
        - "Meta의 $135B 수치는 자본지출 계획이며 실제 집행액과 다를 수 있다"
tags: ["openai", "meta", "stargate", "데이터센터", "인프라"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

OpenAI의 야심작 [Stargate](/ko/wiki/stargate/) 데이터센터를 이끌던 핵심 인물 3명이 한꺼번에 빠졌어. [The Information 보도](https://www.theinformation.com/articles/openai-stargate-leaders-depart-latest-shakeup-data-center-strategy)에 따르면 Peter Hoeschele는 이미 떠났고, Shamez Hemani와 Anuj Saharan도 수일 내 합류 예정이야. 행선지는 Meta의 Superintelligence Labs야.

배경이 중요해. OpenAI는 최근 자체 데이터센터 건설에서 클라우드 임대 모델로 전략을 크게 틀었어. 텍사스 Abilene Stargate 사이트는 원래 2GW까지 확장할 계획이었는데 1.2GW로 축소됐고, 영국 Stargate 프로젝트는 IPO를 앞두고 [일시 중단된 상태](https://www.datacenterdynamics.com/en/news/openai-reorganizes-leadership-amid-data-center-strategy-readjustment/)야. 이 와중에 핵심 인프라 인력이 빠진 거거든.

반면 Meta는 완전히 반대 방향으로 가고 있어. 2026년 AI 인프라에 1,350억 달러(약 186조 원)를 쏟아붓겠다고 선언했고, 이 세 사람은 그 자금이 실제로 데이터센터로 전환되는 일을 맡게 돼. [Seeking Alpha 보도](https://seekingalpha.com/news/4573915-openai-stargate-leaders-including-peter-hoeschele-depart-in-latest-shakeup-to-data-center-strategy-report)에서도 "Meta의 공격적 채용"이라고 표현했어.

OpenAI API를 쓰고 있다면 눈여겨볼 포인트야. 자체 인프라 축소가 곧 컴퓨팅 비용 구조 변화로 이어질 수 있고, 그건 결국 API 가격에 반영될 수 있거든.
