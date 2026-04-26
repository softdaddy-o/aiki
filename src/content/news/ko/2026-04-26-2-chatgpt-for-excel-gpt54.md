---
title: "ChatGPT for Excel 베타 출시 — GPT-5.4 탑재, 금융 데이터 앱은 별도"
date: "2026-04-26T09:10:00+09:00"
lang: ko
category: news
summary: "OpenAI가 3월 5일 ChatGPT for Excel 베타를 공개했고, GPT-5.4와 내부 투자은행 벤치마크 87.3%를 함께 제시했어. 다만 금융 데이터는 ChatGPT 안의 별도 앱 확장으로 봐야 하고, 공식 세부 문구상 당일 공개 앱과 FactSet coming soon은 구분해서 봐야 해. 4월 22일엔 Google Sheets 베타도 추가됐어."
readerValue: "스프레드시트 베타와 ChatGPT 금융 데이터 앱을 분리해서 보고, 지금 바로 쓸 수 있는 범위와 라이선스 전제를 판단할 수 있어."
sourceUrl: "https://openai.com/index/chatgpt-for-excel/"
sourceTitle: "OpenAI — ChatGPT for Excel and new financial data integrations"
draft: false
score: 105
sourceCount: 2
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://openai.com/index/chatgpt-for-excel/"
      title: "OpenAI 공식 발표 — ChatGPT for Excel and new financial data integrations"
    - url: "https://help.openai.com/en/articles/20001063-chatgpt-for-excel-and-google-sheets-in-beta"
      title: "OpenAI Help Center — ChatGPT for Excel and Google Sheets in beta"
  checks:
    - type: source_match
      result: pass
      summary: "OpenAI 공식 발표문에서 출시일, 모델, 세부 출시 목록, 4월 22일 업데이트 문구를 다시 대조했어."
      items:
        - "3월 5일 발표, 4월 22일 Google Sheets beta 업데이트 — OpenAI 공식 글 명시"
        - "ChatGPT for Excel은 Excel 워크북 안에서 동작하는 베타 add-in이고 GPT-5.4 기반 — 공식 글 명시"
        - "세부 섹션의 `released today` 목록은 Moody’s·Dow Jones Factiva·MSCI·Third Bridge·MT Newswires이고, FactSet은 coming soon으로 따로 적혀 있어"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "Help Center 현재 문구로 Google Sheets beta 접근 범위와 제품 경계를 다시 확인했어."
      items:
        - "Help Center: ChatGPT for Excel과 ChatGPT for Google Sheets는 서로 분리된 스프레드시트 경험으로 안내돼"
        - "Help Center: 베타 접근 범위는 Business·Enterprise·Edu·K-12와 ChatGPT Pro·Plus 사용자로 안내돼"
        - "Help Center: 서드파티 데이터 접근은 사용자 본인에게 주어진 권한에 달렸다고 적혀 있어"
    - type: number_verify
      result: pass
      summary: "벤치마크와 날짜 수치는 공식 발표문 기준으로 다시 확인했어."
      items:
        - "내부 투자은행 벤치마크 87.3% vs GPT-5 43.7%"
        - "출시일 2026년 3월 5일"
        - "Google Sheets beta 업데이트일 2026년 4월 22일"
    - type: adversarial
      result: pass
      summary: "지금 당장 쓸 수 있는 범위를 독자가 구분할 수 있게 제품 경계와 접근 제한을 본문에 반영했어."
      items:
        - "공식 소개 문단의 폭넓은 금융 데이터 예시와 세부 `released today` 목록을 구분했어"
        - "스프레드시트 베타와 ChatGPT 안의 금융 데이터 앱을 같은 제품처럼 섞지 않았어"
        - "외부 데이터 앱 사용은 관리자 설정, 사용자 권한, 데이터 소스 라이선스에 따라 달라질 수 있어"
      findings:
        - "현재 접근 범위는 출시 당일 문구보다 Help Center 최신 문구를 우선해 정리했어"
tags: ["openai", "chatgpt", "gpt", "excel", "spreadsheet"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
reviewStamp:
  panelVersion: "1.0.0"
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
  contentHash: "24830bb0633820d4"
  reviewedAt: "2026-04-26"
---
## 무슨 일이 일어났나

[OpenAI](/ko/wiki/openai/)가 2026년 3월 5일 [공식 발표](https://openai.com/index/chatgpt-for-excel/)로 [ChatGPT](/ko/wiki/chatgpt/) for Excel 베타를 공개했어. Excel 워크북 안에서 시트를 읽고, 수식을 만들고, 모델을 업데이트하는 스프레드시트 전용 사이드바 경험이야. 모델은 [GPT](/ko/wiki/gpt/) 계열인 GPT-5.4고, OpenAI는 내부 투자은행 [벤치마크](/ko/wiki/benchmark/)에서 87.3%를 제시했어. 2026년 4월 22일 업데이트에선 ChatGPT for Google Sheets도 베타로 열렸고, 현재 [Help Center](https://help.openai.com/en/articles/20001063-chatgpt-for-excel-and-google-sheets-in-beta)는 Excel·Google Sheets 베타를 Business·Enterprise·Edu·K-12, 그리고 ChatGPT Pro·Plus 사용자 대상의 글로벌 베타로 안내하고 있어.

## 제품 경계는 어디서 갈리나

[LLM](/ko/wiki/llm/)을 엑셀에 넣는 기능과 ChatGPT 안의 금융 데이터 앱을 같은 제품으로 보면 헷갈리기 쉬워. 이번 발표는 실제로 두 층으로 나뉘어 있어.

- **ChatGPT for Excel / Google Sheets**: 시트 안에서 직접 표를 만들고, 수식을 고치고, 변경 내용을 설명하는 스프레드시트 전용 베타야.
- **ChatGPT 안의 금융 데이터 앱**: 시장·기업·리서치 데이터를 ChatGPT 본체 쪽으로 끌어오는 별도 앱 확장이야. 공식 글의 첫 소개 문단은 FactSet·Dow Jones Factiva·LSEG·Daloopa·S&P Global 등을 예시로 들지만, 세부 섹션에서 `released today`로 따로 적은 목록은 Moody’s·Dow Jones Factiva·MSCI·Third Bridge·MT Newswires이고 FactSet은 coming soon이야.
- **둘이 만나는 지점**: 4월 22일 업데이트 이후 스프레드시트 베타에도 앱과 스킬 지원이 추가돼 시트 안 분석과 ChatGPT 앱 워크플로우를 잇는 접점은 생겼지만, Help Center는 이 환경이 메인 ChatGPT의 메모리·일반 커넥터를 그대로 쓰는 경험과는 다르다고 적고 있어.

## 지금 바로 쓸 수 있는 건 뭔가

독자가 바로 판단해야 할 포인트는 세 가지야.

- **스프레드시트 자동화**: Excel 베타는 이미 열려 있고, Google Sheets는 2026년 4월 22일부터 베타로 추가됐어.
- **외부 금융 데이터 접근**: 여기서 바로 쓸 수 있는 범위는 앱 공개 여부만으로 끝나지 않아. Help Center도 서드파티 데이터 접근은 사용자 본인에게 주어진 권한에 달렸다고 적고 있어서, 실제 사용엔 조직 설정과 별도 데이터 라이선스가 걸릴 수 있어.
- **성능 수치 해석**: 87.3%는 OpenAI 내부 투자은행 벤치마크 수치라서, 실무 신호로는 볼 수 있어도 독립 검증까지 끝난 절대값으로 읽을 단계는 아니야.
