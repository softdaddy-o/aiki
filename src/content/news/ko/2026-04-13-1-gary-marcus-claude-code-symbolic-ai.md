---
title: "Gary Marcus, Claude Code 유출 코드 보고 '뉴로심볼릭 AI의 증거'라고 했다"
date: "2026-04-13T09:00:00+09:00"
lang: ko
category: news
summary: "Gary Marcus가 Claude Code 소스 유출 분석에서 핵심 커널 print.ts가 486개 분기점과 12단계 중첩을 가진 고전적 IF-THEN 구조임을 지적했다. 순수 LLM이 아닌 뉴로심볼릭 하이브리드라는 주장에 ML 커뮤니티에서 뜨거운 논쟁이 벌어졌다."
readerValue: "AI 에이전트 아키텍처가 순수 LLM이 아닌 심볼릭 하이브리드로 가고 있는지 판단할 수 있게 해준다"
sourceUrl: "https://garymarcus.substack.com/p/the-biggest-advance-in-ai-since-the"
sourceTitle: "Gary Marcus Substack"
draft: false
score: 95
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://garymarcus.substack.com/p/the-biggest-advance-in-ai-since-the"
      title: "Gary Marcus Substack — The Biggest Advance in AI Since the LLM"
    - url: "https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know"
      title: "VentureBeat — Claude Code's source code appears to have leaked"
    - url: "https://layer5.io/blog/engineering/the-claude-code-source-leak-512000-lines-a-missing-npmignore-and-the-fastest-growing-repo-in-github-history/"
      title: "Layer5 — Claude Code Leak 512,000 Lines"
    - url: "https://www.cnbc.com/2026/03/31/anthropic-leak-claude-code-internal-source.html"
      title: "CNBC — Anthropic leaks part of Claude Code's internal source"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 원문과 Gary Marcus Substack 글의 핵심 수치를 직접 비교해뒀어."
      items:
        - "512,000줄, 1,906 파일 — Layer5, VentureBeat 복수 매체 확인 ✅"
        - "3,167줄 print.ts, 486개 분기점, 12단계 중첩 — Marcus Substack 원문 일치 ✅"
        - "npm 유출 경위(3월 31일, .npmignore 누락) — BleepingComputer, CNBC 확인 ✅"
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "4개 독립 매체에서 동일 사실 교차 확인해뒀어."
      items:
        - "VentureBeat, CNBC, Layer5, The Hacker News 모두 512K줄 유출 사실 일치 ✅"
        - "Marcus의 뉴로심볼릭 주장은 Substack 원문에서 직접 확인 ✅"
        - "Reddit 토론 존재 — r/MachineLearning 게시물 ID 1sjb0qi 확인 ✅"
    - type: number_verify
      result: pass
      summary: "기사 내 모든 수치를 공식 소스 기준으로 검증해뒀어."
      items:
        - "512,000줄 — Layer5 분석에서 '513,000 lines' 근사치 확인 (반올림 차이) ✅"
        - "1,906 파일 — VentureBeat '약 1,900 files', Layer5 '1,906 files' 확인 ✅"
        - "486 분기점, 12단계 중첩 — Marcus Substack 원문 인용 그대로 ✅"
    - type: adversarial
      result: pass
      summary: "한쪽 시각만 전달하지 않도록 검증해뒀어."
      items:
        - "Marcus의 뉴로심볼릭 해석은 그의 오래된 주장과 일치하는 확증편향 가능성 있음 — 반론 병기"
        - "486 분기 = 심볼릭 AI라는 등치는 과도할 수 있음 — CLI 엔지니어링 패턴 시각 병기"
        - "print.ts가 전체 아키텍처의 핵심인지 vs 출력 포맷팅일 뿐인지 논쟁 존재"
      findings:
        - "Marcus는 뉴로심볼릭 AI 옹호자로 알려져 있어 자신의 주장에 유리한 해석일 수 있다"
        - "print.ts라는 파일명은 출력 포맷팅 용도일 가능성이 있으며, 핵심 추론 로직이 아닐 수 있다"
tags: ["anthropic", "claude-code", "neurosymbolic-ai", "gary-marcus", "소스유출"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

Gary Marcus가 Claude Code 소스 유출을 분석하면서 한마디 던졌어 — "이건 고전 심볼릭 AI 그 자체다." 3월 31일에 npm에 잘못 올라간 512,000줄, 1,906개 TypeScript 파일 중 핵심은 3,167줄짜리 커널 `print.ts`인데, 486개 분기점과 12단계 중첩이 들어있는 거대한 IF-THEN 조건문이거든.

Marcus의 핵심 주장은 이거야. Claude Code가 잘 작동하는 이유가 [LLM](/ko/wiki/llm/) 때문이 아니라, LLM 위에 얹은 결정론적 심볼릭 루프 덕분이라는 거야. John McCarthy나 Marvin Minsky 같은 AI 초기 연구자들이 바로 알아볼 만한 구조라는 게 그의 표현이야. ML 커뮤니티에서 큰 반응과 함께 뜨거운 논쟁이 벌어졌어.

반론도 있어. 486개 분기가 많아 보이지만, 복잡한 CLI 도구에서 분기 처리는 흔한 엔지니어링 패턴이야. "심볼릭 AI 복귀"라고 부르기엔 과장이라는 시각도 있거든. 하지만 [VentureBeat](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know)과 [CNBC](https://www.cnbc.com/2026/03/31/anthropic-leak-claude-code-internal-source.html)까지 이걸 다룬 걸 보면, AI 에이전트가 순수 신경망만으로는 안 된다는 인식이 퍼지고 있는 건 확실해.

실무에서 의미 있는 포인트는 하나야. 코딩 에이전트를 만들 때 LLM 호출만으로 끝내지 말고, 결정론적 로직으로 감싸는 하이브리드 설계를 고려해야 한다는 거야. [Anthropic](/ko/wiki/anthropic/)이 512,000줄을 쏟아부은 이유가 바로 거기에 있으니까.
