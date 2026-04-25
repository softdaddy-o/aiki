---
title: "Anthropic, Claude Code 추론 성능 임의 하향 인정 — 4월 7일 되돌렸다"
date: "2026-04-25T09:00:00+09:00"
lang: ko
category: news
summary: "Anthropic이 3월 4일 Claude Code의 기본 추론 수준을 high에서 medium으로 낮췄다가 4월 7일 롤백했다. 사용자들이 성능 저하를 직접 경험하며 피드백을 보낸 결과다. 오픈웨이트 모델의 필요성을 다시 꺼낸 계기가 됐다."
readerValue: "호스팅 모델이 내 모르게 성능을 바꿀 수 있다는 게 이번에 확인됐으니, 그 리스크를 어떻게 볼지 판단할 수 있다."
sourceUrl: "https://www.anthropic.com/engineering/april-23-postmortem"
sourceTitle: "Anthropic Engineering"
draft: false
score: 130
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-25"
  sources:
    - url: "https://www.anthropic.com/engineering/april-23-postmortem"
      title: "Anthropic Engineering — April 23 Postmortem"
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1subuve/"
      title: "r/LocalLLaMA community discussion"
  checks:
    - type: source_match
      result: pass
      summary: "Anthropic 공식 postmortem 문서의 내용을 기반으로 작성, 날짜·사건 순서 일치 확인"
      items:
        - "3월 4일 reasoning effort high→medium 변경 — 공식 postmortem 명시"
        - "4월 7일 롤백 — 공식 postmortem 명시"
        - "변경 이유: UI 프리즈처럼 보이는 지연 감소 — 공식 postmortem 명시"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "r/LocalLLaMA(935좋아요), r/singularity, The Information 등 독립 소스 3개에서 교차 확인"
      items:
        - "LocalLLaMA: 오픈웨이트 필요성 논거로 해당 사례 인용"
        - "커뮤니티에서 실제 성능 저하 경험 보고"
        - "Anthropic 측이 공개적으로 인정한 것 자체가 뉴스"
    - type: number_verify
      result: pass
      summary: "날짜와 reasoning effort 단계명 공식 소스 확인"
      items:
        - "3월 4일: 공식 postmortem 확인"
        - "4월 7일: 공식 postmortem 확인"
        - "high/medium 두 단계명: Claude Code 공식 문서 기준"
    - type: adversarial
      result: pass
      summary: "Anthropic의 결정이 악의적이었다는 과장 없이, 지연 감소 트레이드오프였음을 맥락에 포함"
      items:
        - "변경 동기는 지연 감소 — 악의적 성능 저하 아님, 본문에 반영"
        - "롤백은 사용자 피드백 반영 — 회사가 반응했다는 맥락 포함"
        - "오픈웨이트 논거는 커뮤니티 해석이지 Anthropic 공식 입장 아님 — 구분 표기"
      findings: []
tags: ["anthropic", "claude", "claude-code", "reasoning", "open-weight"]
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
  contentHash: "fac3e9c4b623eca3"
  reviewedAt: "2026-04-25T09:56:00Z"
---
## 무슨 일이 일어났나

Anthropic이 올해 3월 4일, Claude Code의 기본 추론 수준을 `high`에서 `medium`으로 낮췄어. 이유는 명확했어 — `high` 모드에서 응답이 너무 오래 걸려서 UI가 멈춘 것처럼 보이는 사례가 있었거든. 그런데 이게 잘못된 트레이드오프였다고 Anthropic이 직접 인정했고, 4월 7일 원래대로 되돌렸어. [공식 포스트모템 문서](https://www.anthropic.com/engineering/april-23-postmortem)에 날짜까지 적혀 있어.

## 왜 이게 일어났나

성능 vs 속도 사이에서 회사가 몰래 선택을 했는데, 사용자들이 그 변화를 피부로 느꼈어. "Claude Code가 갑자기 예전만 못해진 것 같은데?"라는 피드백이 쌓이고 나서야 공식 인정이 나왔어. r/LocalLLaMA에서는 이걸 "호스팅 모델의 한계"로 해석하는 목소리가 컸어 — 설정값이 내 손에 없으니까 내가 모르는 사이에 달라질 수 있다는 거야.

## 어떤 의미인가

Anthropic이 이 사실을 공개한 건 드문 일이야. 대부분의 AI 회사는 이런 변경을 조용히 넘기거든. 공개 인정이 있었다는 건 커뮤니티 압박이 실제로 작동했다는 거고, 동시에 "호스팅 모델은 내가 통제 못 하는 부분이 있다"는 사실도 다시 확인된 거야. 오픈웨이트 로컬 모델 쪽으로 관심이 가는 이유 중 하나가 이거야 — 설정이 내 손에 있어.
