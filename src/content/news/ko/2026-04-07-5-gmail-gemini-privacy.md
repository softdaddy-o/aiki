---
title: "Gemini가 내 이메일을 학습하지 않는다 — Google의 해명"
date: "2026-04-07T16:00:00+09:00"
lang: ko
category: news
summary: "Google이 Gemini in Gmail의 데이터 처리 방식을 공식 블로그에서 설명했다. 개인 이메일로 Gemini 기초 모델을 학습하지 않으며, Gemini가 처리하는 내용은 요청된 작업 후 바로 폐기된다."
sourceUrl: "https://blog.google/products-and-platforms/products/gmail/privacy-in-gmail-with-gemini/"
sourceTitle: "Google Blog: Gmail Privacy with Gemini"
draft: false
backfilled: true
backfilledAt: "2026-04-09"
readerValue: Gemini를 Gmail에서 쓸 때 내 이메일이 어떻게 처리되는지 정확히 파악하게 해준다.
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://blog.google/products-and-platforms/products/gmail/privacy-in-gmail-with-gemini/"
      title: "Google Blog"
    - url: "https://betanews.com/article/google-insists-it-does-not-train-gemini-with-your-emails/"
      title: "BetaNews"
  checks:
    - type: source_match
      result: pass
      summary: Google 공식 블로그와 독립 보도 대조 확인
      items:
        - "이메일로 기초 모델 학습 안 함 — Google 공식 발표 확인"
        - "요청 처리 후 데이터 폐기 — 공식 블로그 확인"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: Google 공식, BetaNews 교차검증
      items:
        - "Google Blog: 기초 모델 비학습 정책 공식 선언"
        - "BetaNews: 동일 내용 보도"
    - type: number_verify
      result: pass
      summary: 수치 확인
      items:
        - "수치 없음 — 정책 성명 기사"
    - type: adversarial
      result: pass
      summary: 과장·인과 오류 검토
      items:
        - "Google 자체 발표라 독립 검증 불가 — 사용자 감사(audit) 수단 없음"
      findings:
        - "Google 자체 정책 발표로 독립 감사 수단이 없음을 독자에게 맥락 제공"
score: 65
tags: ["Google", "Gmail", "Gemini", "AI프라이버시"]
---

Gmail에서 Gemini를 쓰면 내 이메일이 AI 학습에 쓰이는 거 아닐까 — 많이들 갖는 의문이야. Google이 [공식 블로그](https://blog.google/products-and-platforms/products/gmail/privacy-in-gmail-with-gemini/)에서 직접 답을 냈어. 개인 이메일로 Gemini 기초 모델을 학습하지 않고, Gemini in Gmail이 처리하는 내용은 요청된 작업을 끝낸 직후 인박스에서 나가버린다고 밝혔거든.

작동 방식을 보면 Gemini는 이메일 요약 같은 특정 요청에만 접근하고, 그 요청이 끝나면 데이터를 보유하지 않아. "인박스 안에서만 안전하게 처리한다"는 게 Google의 설명이야.

다만 이건 Google의 자체 발표이고, 외부에서 독립적으로 감사할 수단은 아직 없다는 점은 알아두는 게 좋아. Gemini를 Gmail에 연동해서 쓰는 사람이라면 [Privacy Hub 공식 문서](https://support.google.com/mail/answer/14615114)를 한 번 읽어보는 것도 나쁘지 않을 거야.
