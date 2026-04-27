---
title: Nemotron-Personas-Korea
slug: nemotron-personas-korea
lang: ko
category: dataset
summary: >-
  7M synthetic personas(1M records 횞 7 variants)? ?쒓뎅 ?멸뎄?듦퀎 ?뺣젹 援ъ“瑜?諛뷀깢?쇰줈, AI ?먯씠?꾪듃
  ?⑹꽦 ?ъ슜?먭뎔??鍮좊Ⅴ寃?留뚮뱾 ???덈뒗吏 ?먮떒?섍린 ?꾪븳 ?곗씠?곗뀑?대떎.
readerValue: '梨꾪깮 ?먮떒? 癒쇱? 紐⑤뜽 ?깅뒫???꾨땲?? 吏??吏곸뾽/?멸뎄?숈쟻 遺꾪룷媛 ?뱀떊???쒕굹由ъ삤???꾩슂??媛?쒕젅?쇱쓣 異⑸텇???ы쁽?섎뒗吏濡??쒖옉?쒕떎.'
githubUrl: 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea'
showcaseComponent: nemotron-personas-korea
license: CC BY 4.0
version: '2026-04-20'
contentStatus: final
draft: false
date: '2026-04-20'
edition: ai
factCheck:
  status: passed
  date: '2026-04-27'
  sources:
    - url: 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea'
      title: Hugging Face dataset card ??Nemotron-Personas-Korea
    - url: >-
        https://huggingface.co/blog/nvidia/build-korean-agents-with-nemotron-personas
      title: >-
        How to Ground a Korean AI Agent in Real Demographics with Synthetic
        Personas
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: '??異쒖쿂?먯꽌 ?곗씠?곗뀑??怨듦컻 ?깃꺽, ?⑹꽦 ?깃꺽, ?쇱씠?좎뒪? ?듭떖 ?섏튂 踰붿쐞瑜??뺤씤?덈떎.'
      items:
        - ?곗씠?곗뀑 移대뱶??CC BY 4.0 ?쇱씠?좎뒪媛 紐낆떆?섏뼱 ?덈떎.
        - 釉붾줈洹몄? ?곗씠?곗뀑 ?ㅻ챸 紐⑤몢 ?쒓뎅 ?멸뎄?듦퀎 ?뺣젹 ?⑹꽦 persona 紐⑹쟻???꾩젣?쒕떎.
        - ?먮떒 ?곗꽑?쒖쐞???ㅼ궗???쒕??덉씠?섏슜 seed bank濡쒖쓽 ?곹빀?깆씠??
    - type: number_verify
      result: pass
      sources: 2
      summary: '핵심 수치는 데이터셋 카드와 공개 표 기반으로 7M personas(1M records × 7 variants), district=252 classes를 기준으로 검증한다. 블로그 본문은 6 million/7 million가 혼재되어 있는 내부 모순이 있어 기록으로 남긴다.'
      items:
        - HF 데이터셋 카드 및 데이터셋-디테일은 1M records × 7 variants = 7M personas를 일치시킨다.
        - HF 데이터셋 스키마는 district 문자열 클래스 252개를 정의한다.
        - 공개 표/섹션에서도 7M personas 및 252 districts를 동일한 맥락으로 제시한다.
      findings:
        - HF 데이터셋 카드에서 `district`는 문자열 클래스가 252개다.
        - NVIDIA 블로그는 일부 문단에서 `25 districts`를 쓰며, 동일한 집계 단위를 명시하지 않아 252 클래스와 직접 동치로 확인되지 않는다.
        - NVIDIA 블로그 텍스트에는 `6 million`과 `7 million (1 million records × 7 personas each)`가 혼재되어 있어 수치 모순이 존재한다.
formatVersion: 2
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  projects: 4.2.0
reviewStamp:
  panelVersion: 1.1.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.1.0
    tone-editor: 1.6.0
    structure-editor: 1.1.0
  guideVersions:
    tone: 2.0.0
    common: 2.3.0
    projects: 4.2.0
  panelVerdict: pass
  contentHash: "441006c90aeb2676"
  reviewedAt: '2026-04-27T09:00:00Z'
---
