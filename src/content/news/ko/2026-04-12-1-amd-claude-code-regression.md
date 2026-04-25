---
title: "AMD AI 디렉터, Claude Code 성능 하락을 7,000 세션 데이터로 증명했다"
date: "2026-04-12T09:00:00+09:00"
lang: ko
category: news
summary: "AMD AI 디렉터 Stella Laurenzo가 6,852개 Claude Code 세션과 234,760건의 도구 호출을 분석해 thinking depth가 67% 하락했음을 공개했다. 파일 읽기 횟수는 편집당 6.6회에서 2.0회로 떨어졌고, AMD 엔지니어링 팀은 이미 다른 코딩 도구로 전환한 상태다."
readerValue: "Claude Code를 실무에 쓰고 있다면 최근 품질 변화를 수치로 확인하고 대비할 수 있다는 것"
sourceUrl: "https://www.theregister.com/2026/04/06/anthropic_claude_code_dumber_lazier_amd_ai_director/"
sourceTitle: "The Register"
draft: false
score: 100
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-12"
  sources:
    - url: "https://www.theregister.com/2026/04/06/anthropic_claude_code_dumber_lazier_amd_ai_director/"
      title: "The Register — Claude Code has become dumber, lazier"
    - url: "https://winbuzzer.com/2026/04/07/amd-ai-director-claude-code-performance-decline-7000-sessions-xcxwbn/"
      title: "WinBuzzer — AMD Engineer Logs 7,000 Sessions"
    - url: "https://dev.to/adioof/claude-code-got-67-dumber-amds-ai-director-had-the-telemetry-to-prove-it-42gh"
      title: "DEV Community — Claude Code Got 67% Dumber"
    - url: "https://www.infoworld.com/article/4154973/enterprise-developers-question-claude-codes-reliability-for-complex-engineering.html"
      title: "InfoWorld — Enterprise developers question Claude Code"
  checks:
    - type: source_match
      result: pass
      summary: "본문 핵심 수치를 The Register, WinBuzzer 원문에서 직접 비교해뒀어."
      items:
        - "6,852 세션, 234,760 도구 호출, 17,871 thinking block — 원문 수치 일치 ✅"
        - "편집당 파일 읽기 6.6→2.0회 — The Register 원문 확인 ✅"
        - "thinking depth 67% 하락 — DEV Community, WinBuzzer 교차 확인 ✅"
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "4개 독립 매체에서 동일 사실인지 확인해뒀어."
      items:
        - "The Register, WinBuzzer, DEV Community, InfoWorld 4곳에서 Laurenzo 분석 동일 인용 ✅"
        - "GitHub issue #42796 존재 확인 (87 comments) ✅"
    - type: number_verify
      result: pass
      summary: "모든 수치를 원문 기준으로 검증해뒀어."
      items:
        - "6,852 세션 — 원문 일치 ✅"
        - "67% thinking depth 하락 — 중앙값 2,200→720자 기준, 복수 매체 확인 ✅"
        - "편집당 읽기 6.6→2.0회 — The Register 확인 ✅"
    - type: adversarial
      result: pass
      summary: "한쪽 시각만 전달하지 않도록 맥락을 걸러뒀어."
      items:
        - "Anthropic 공식 입장은 별도 발표 없음 — 본문에 '공식 대응 없음' 명시"
        - "thinking redaction과의 인과관계는 상관관계일 수 있음 — '시점이 겹친다'로 서술"
      findings:
        - "Anthropic이 이후 수정 배포할 가능성이 있으므로 독자는 최신 상태 확인 필요"
tags: ["anthropic", "claude-code", "amd", "성능하락", "개발도구"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
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
  contentHash: "52d9b4b0eb2b409d"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

AMD AI 디렉터 Stella Laurenzo가 Claude Code 성능 하락을 데이터로 증명해서 화제야. 6,852개 세션, 234,760건 도구 호출, 17,871개 thinking block을 분석한 결과 — [thinking depth가 67% 떨어졌어](https://www.theregister.com/2026/04/06/anthropic_claude_code_dumber_lazier_amd_ai_director/).

## 왜 중요할까

구체적으로 뭐가 달라졌냐면, 예전에는 코드 편집 전 파일을 평균 6.6번 읽었거든. 관련 파일 확인하고, grep 돌리고, 테스트 코드 보고 나서 수정했다는 거야. 근데 하락 구간에서는 이게 2.0회로 줄었어. 편집의 3분의 1은 파일을 한 번도 안 읽고 바로 수정한 거지. 이 시점이 3월 초 thinking content redaction 배포(v2.1.69)와 겹쳐.

## 앞으로 볼 점

Laurenzo 팀은 이미 다른 코딩 도구로 전환했어. [GitHub issue #42796](https://github.com/anthropics/claude-code/issues/42796)에는 87개 넘는 댓글이 달렸는데, 비슷한 경험을 보고하는 엔터프라이즈 사용자가 많아. [Anthropic](/ko/wiki/anthropic/) 쪽 공식 대응은 아직 없어. Claude Code를 실무에 쓰고 있다면 최근 세션 품질을 직접 체크해보는 게 좋겠어.
