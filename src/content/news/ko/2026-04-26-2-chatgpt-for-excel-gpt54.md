---
title: "ChatGPT for Excel 출시 — GPT-5.4 탑재, 금융 데이터 통합 5종 추가"
date: "2026-04-26T09:10:00+09:00"
lang: ko
category: news
summary: "OpenAI가 3월 5일 ChatGPT for Excel을 발표했다. GPT-5.4 모델로 내부 투자은행 벤치마크 87.3% (GPT-5는 43.7%)를 기록했고, FactSet·Dow Jones Factiva·LSEG·Daloopa·S&P Global 다섯 곳 통합이 같이 들어갔다. 4월 22일 업데이트로 Google Sheets 베타도 추가됐다."
readerValue: "스프레드시트 안에서 LLM을 쓰려는 사용자라면 OpenAI가 어디까지 통합했고 어떤 모델로 돌아가는지 미리 파악해 둘 수 있어."
sourceUrl: "https://openai.com/index/chatgpt-for-excel/"
sourceTitle: "OpenAI — ChatGPT for Excel"
draft: false
score: 105
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://openai.com/index/chatgpt-for-excel/"
      title: "OpenAI 공식 발표 — ChatGPT for Excel"
    - url: "https://openai.com/index/introducing-chatgpt-images-2-0/"
      title: "OpenAI — 같은 시기 다른 발표 (관련 컨텍스트)"
  checks:
    - type: source_match
      result: pass
      summary: "OpenAI 공식 블로그 본문과 4월 22일 업데이트 노트 직접 인용"
      items:
        - "발표일 3월 5일, 업데이트 4월 22일 — 공식 블로그 명시"
        - "GPT-5.4 모델 사용 — 공식 블로그 명시"
        - "FactSet·Dow Jones Factiva·LSEG·Daloopa·S&P Global 통합 — 공식 블로그 명시"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "OpenAI 공식, 같은 발표 시기 관련 게시물, 비즈니스 인사이더 보도 교차"
      items:
        - "OpenAI 공식 페이지: 모델·통합·날짜 1차 소스"
        - "동시 발표된 ChatGPT Images 2.0 — 같은 캠페인 시기 확인"
        - "Reddit r/algotrading 데이터 API 관련 토론 — 금융 통합 맥락 보강"
    - type: number_verify
      result: pass
      summary: "벤치마크 수치 OpenAI 공식 발표 기준 확인"
      items:
        - "GPT-5.4 87.3% vs GPT-5 43.7% — 내부 투자은행 벤치마크"
        - "다섯 곳 외부 데이터 소스 통합 — 공식 발표 명시"
        - "Google Sheets 베타 추가일 4월 22일 — 공식 업데이트 노트"
    - type: adversarial
      result: pass
      summary: "내부 벤치마크는 OpenAI 자체 측정이라는 점, 통합은 유료 라이선스 필요 가능성 본문 반영"
      items:
        - "투자은행 벤치마크는 OpenAI 내부 측정 — 독립 검증은 추후"
        - "FactSet·LSEG 등 외부 데이터는 사용자가 별도 라이선스 보유해야 사용 가능 가능성"
        - "Google Sheets 베타는 아직 일부 사용자 한정 — 전면 공개 시점 미정"
      findings:
        - "벤치마크 격차가 큰 만큼 자체 측정인 점은 본문에서 분명히 표기"
tags: ["openai", "chatgpt", "gpt", "excel", "spreadsheet"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

OpenAI가 3월 5일 [ChatGPT for Excel](https://openai.com/index/chatgpt-for-excel/)을 공개했어. Excel 안에서 ChatGPT가 직접 시트를 읽고, 수식을 만들고, 데이터를 분석하는 통합이야. 모델은 GPT-5.4고, OpenAI가 자체 측정한 투자은행 벤치마크에서 87.3%를 기록했어 — 같은 벤치마크에서 GPT-5는 43.7%였어. 4월 22일 업데이트로 Google Sheets 베타도 같이 들어갔어.

## 왜 이게 일어났나

스프레드시트는 화이트칼라 업무의 핵심 도구인데, LLM이 그 안에서 직접 쓰일 수 있게 되면 자동화 범위가 크게 넓어져. 동시에 OpenAI는 FactSet, Dow Jones Factiva, LSEG, Daloopa, S&P Global — 다섯 곳의 외부 금융 데이터 소스를 [ChatGPT](/ko/wiki/chatgpt/)에 직접 연결했어. 이건 명백히 금융 업무자동화를 노린 통합이야. 시트와 외부 데이터를 한 화면에서 LLM에 물어볼 수 있게 만든 거야.

## 어떤 의미인가

엑셀에서 LLM을 쓰는 사용자 입장에서는 워크플로우가 바뀔 만한 변화야. 다만 외부 금융 데이터 통합은 사용자가 별도 라이선스를 들고 있어야 작동할 가능성이 커 — FactSet이나 LSEG는 기관용 유료 데이터거든. 87.3%라는 벤치마크 점수는 OpenAI 자체 측정이라 독립 검증 결과가 나올 때까지 절대값 그대로 받아들이긴 이른 편이야. 그래도 일반 시트 작업 자동화는 GPT-5.4 그대로 적용되니까 충분히 시도해 볼 만해.
