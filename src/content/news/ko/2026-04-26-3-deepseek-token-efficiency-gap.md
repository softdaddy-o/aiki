---
title: "DeepSeek가 직접 인정한 토큰 효율 격차 — V3.2 논문 한 줄에서 시작된 토론"
date: "2026-04-26T09:20:00+09:00"
lang: ko
category: news
summary: "DeepSeek-V3.2 논문은 토큰 효율을 남은 과제로 못박았어. Table 3 기준 DeepSeek-V3.2-Speciale는 CodeForces에서 2701점을 내며 77k 토큰을 썼고, Gemini 3.0-Pro는 2708점에 22k였어. HLE도 30.6점/35k 대 37.7점/15k라 비용 판단이 필요해."
readerValue: "오픈웨이트 모델을 비용 기준으로 비교하려는 사용자라면 정답 도달까지의 토큰 수가 가격에 직접 영향을 준다는 사실을 짚을 수 있어."
sourceUrl: "https://huggingface.co/deepseek-ai/DeepSeek-V3.2/blob/main/assets/paper.pdf"
sourceTitle: "DeepSeek-V3.2 Technical Report"
draft: false
score: 100
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://huggingface.co/deepseek-ai/DeepSeek-V3.2/blob/main/assets/paper.pdf"
      title: "DeepSeek-V3.2 Technical Report"
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1svbmnc/decreased_intelligence_density_in_deepseek_v4_pro/"
      title: "r/LocalLLaMA — Decreased Intelligence Density in DeepSeek V4 Pro"
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1subuve/takeaways_discussion_about_the_deepseek_v4/"
      title: "r/LocalLLaMA — Takeaways discussion about the DeepSeek V4"
  checks:
    - type: source_match
      result: pass
      summary: "DeepSeek-V3.2 논문 문장, Table 3 수치, V4 Pro 커뮤니티 해석을 출처별로 분리했어."
      items:
        - "토큰 효율 한계를 인정한 직접 문장은 DeepSeek-V3.2 기술 보고서 본문에서 확인했어."
        - "Gemini 3.0-Pro와의 수치 비교는 DeepSeek-V3.2 기술 보고서 Table 3에서만 가져왔어."
        - "V4 Pro 평가는 r/LocalLLaMA 스레드의 해석으로 분리했고 DeepSeek 공식 발언처럼 섞지 않았어."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "공식 기술 보고서 1건과 LocalLLaMA 후속 토론 2건을 나눠 교차 확인했어."
      items:
        - "DeepSeek-V3.2 Technical Report: 토큰 효율 한계 문장과 Table 3 수치 확인"
        - "r/LocalLLaMA 'Decreased Intelligence Density in DeepSeek V4 Pro': V3.2 문장이 V4 Pro 토론으로 확장된 흐름 확인"
        - "r/LocalLLaMA 'Takeaways discussion about the DeepSeek V4': V4 계열 전반으로 해석이 퍼진 커뮤니티 맥락 확인"
    - type: number_verify
      result: pass
      summary: "Table 3의 정확도와 output token count 두 줄을 본문 수치로 옮겼어."
      items:
        - "CodeForces: DeepSeek-V3.2-Speciale 2701점/77k 토큰, Gemini 3.0-Pro 2708점/22k 토큰"
        - "HLE: DeepSeek-V3.2-Speciale 30.6점/35k 토큰, Gemini 3.0-Pro 37.7점/15k 토큰"
        - "토큰 수 단위는 기술 보고서 Table 3의 output token count in thousands 표기를 따랐어."
    - type: adversarial
      result: pass
      summary: "논문 문장과 커뮤니티 확장을 다른 층위로 적어 오해를 막았어."
      items:
        - "Reddit 제목이 V4 Pro여도 인용된 핵심 문장은 V3.2 논문에서 왔다는 점을 따로 적었어."
        - "토큰을 더 쓴다는 게 곧 정확도가 낮다는 뜻은 아니라는 해석 구분을 유지했어."
        - "Gemini 3.0-Pro와의 비교는 외부 벤치마크 평론이 아니라 DeepSeek 자기 서술이라는 점을 표시했어."
      findings:
        - "V4 Pro 토론은 커뮤니티가 V3.2 문장을 현재 제품 평가로 확장한 흐름이고, DeepSeek 공식 인정 범위는 V3.2 문장까지야."
tags: ["deepseek", "gemini", "open-weight", "token-efficiency", "benchmark"]
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
  contentHash: "d756dfebcbdfa514"
  reviewedAt: "2026-04-26"
---
## 무슨 일이 일어났나

[DeepSeek](/ko/wiki/deepseek/)의 [DeepSeek-V3.2 기술 보고서](https://huggingface.co/deepseek-ai/DeepSeek-V3.2/blob/main/assets/paper.pdf)에 솔직한 대목이 있었어. 토큰 효율은 같은 품질에 도달하는 데 필요한 생성 토큰 양을 말해. 보고서는 [Gemini](/ko/wiki/gemini/) 3.0-Pro급 출력 품질에 맞추려면 DeepSeek-V3.2가 더 긴 생성 경로를 필요로 한다고 설명했어.

Table 3을 보면 크기가 보여. CodeForces에서 DeepSeek-V3.2-Speciale는 2701점에 77k 출력 토큰을 썼고, Gemini 3.0-Pro는 2708점에 22k였어. HLE에서는 DeepSeek-V3.2-Speciale가 30.6점/35k, Gemini 3.0-Pro가 37.7점/15k였어. [LocalLLaMA](/ko/wiki/localllama/)에서는 이 문장과 표가 다시 인용되면서 V4 Pro 평가 토론으로 번졌어.

## 왜 이게 일어났나

API 가격은 토큰 수로 매기니까 토큰 효율은 곧 비용이야. 오픈웨이트 모델을 로컬에서 돌릴 때도 [추론](/ko/wiki/inference/) 시간이 길어지면 GPU 점유 시간이 늘어나. [DeepSeek](/ko/wiki/deepseek/)은 이 부분을 모델 카드 마케팅 문구가 아니라 논문 본문과 수치 표에 같이 남겼어.

## 어떤 의미인가

오픈웨이트 모델을 평가할 때 [벤치마크](/ko/wiki/benchmark/) 점수만 비교하면 한쪽 면만 보는 거야. 반복 호출, 대량 자동화, 에이전트 루프처럼 토큰이 계속 쌓이는 작업이라면 77k 대 22k 같은 차이는 바로 비용 리스크로 이어져.

[DeepSeek](/ko/wiki/deepseek/)이 V3.2 논문에서 공식적으로 인정한 건 토큰 효율 격차 자체야.

반대로 수학·코딩 대회형 문제처럼 한 번의 고난도 풀이 품질이 더 중요하면 긴 추론을 감수할 여지도 있어. 그래서 [LocalLLaMA](/ko/wiki/localllama/)의 V4 Pro 토론은 DeepSeek 공식 주장 자체가 아니라, 논문 수치를 현재 제품 평가로 넓힌 커뮤니티 해석으로 봐야 해.

모델 비교할 때 출처 분리는 매번 챙기는 게 안전해.
