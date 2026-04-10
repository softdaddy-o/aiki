---
title: YC-Bench — LLM에게 스타트업 1년 경영을 맡겨봤어
date: "2026-04-05T11:00:00+09:00"
lang: ko
category: news
summary: 12개 LLM이 시뮬레이션 스타트업 CEO 역할을 수백 턴 동안 수행하는 벤치마크 YC-Bench가 나왔어. Claude Opus 4.6이 평균 127만 달러로 1위, GLM-5는 11분의 1 비용으로 거의 같은 성과를 냈어.
readerValue: 이 연구를 당장 제품 로드맵으로 읽어야 할지, 아직 연구 신호로만 봐야 할지 빠르게 판단하는 데 도움이 된다.
sourceUrl: https://arxiv.org/abs/2604.01212
sourceTitle: arXiv
draft: false
score: 55
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: https://arxiv.org/abs/2604.01212
      title: arXiv — YC-Bench paper
    - url: https://github.com/collinear-ai/yc-bench
      title: GitHub — YC-Bench repository
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 확인해뒀어.
      items:
        - 독자가 먼저 갈라 봐야 할 건 이 연구를 당장 제품 로드맵으로 읽어야 할지, 아직 연구 신호로만 봐야 할지.
        - 제목부터 다시 보면 기사 제목은 "YC-Bench — LLM에게 스타트업 1년 경영을 맡겨봤어"이고, 원문 제목은 "arXiv"로 잡혔어.
        - 출처를 다시 보면 대표 원문 도메인은 arxiv.org로 잡혔어.
        - 이 글의 축을 다시 보면 이 글의 핵심 축은 benchmark, llm, claude, glm-5로 읽었어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 원문 하나만 믿지 않으려고 관련 출처 2건을 옆에 두고 비교해뒀어.
      items:
        - 여기서 먼저 갈라 볼 기준은 이 연구를 당장 제품 로드맵으로 읽어야 할지, 아직 연구 신호로만 봐야 할지.
        - 같이 본 출처로는 arXiv — YC-Bench paper (https://arxiv.org/abs/2604.01212)
        - 같이 본 출처로는 GitHub — YC-Bench repository (https://github.com/collinear-ai/yc-bench)
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 검증해뒀어.
      items:
        - 숫자를 다시 보면 원문에서 다시 본 숫자나 버전 표기는 1, 12, 4.6, 127 쪽이야.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸러뒀어.
      items:
        - 논문 성과와 실제 제품 배포 가능성은 같은 뜻으로 읽지 않으려고 따로 갈라 봤어.
        - 평가셋 결과가 실제 서비스 품질을 바로 보장하는지도 한 번 더 의심해봤어.
      findings:
        - 논문 수치는 재현 환경과 후속 구현에 따라 체감값이 크게 달라질 수 있어.
tags:
  - benchmark
  - llm
  - claude
  - glm-5
  - startup
---

LLM이 스타트업 CEO를 얼마나 잘 할 수 있을까? 이걸 진지하게 측정한 벤치마크가 나왔어. [YC-Bench](https://arxiv.org/abs/2604.01212)는 LLM 에이전트에게 시뮬레이션 스타트업의 1년 경영(수백 턴)을 맡기는 POMDP 기반 벤치마크야. 직원 관리, 계약 수주, 급여 지급까지 실제 경영 의사결정을 반복해야 하고, 클라이언트 중 약 35%는 계약 후 업무 요구량을 몰래 늘리는 함정도 있어.

12개 모델 중 평균 최종 자금 100만 달러를 넘긴 건 딱 3개뿐이야. Claude Opus 4.6이 평균 127만 달러로 1위, GLM-5가 121만 달러로 바로 뒤를 쫓았어. 재밌는 건 GLM-5의 추론 비용이 Claude Opus 4.6의 11분의 1이라는 거야. 비용 대비 성과로 따지면 GLM-5가 사실상 최고 효율이야.

상위 모델들의 공통 전략도 눈에 띄어. 초반에 1-2개 클라이언트에 집중해서 신뢰를 쌓으면, 성공할수록 향후 업무량이 최대 50%까지 줄어드는 "신뢰 눈덩이" 효과가 발동해. 반대로 여러 클라이언트에 분산 투자한 모델은 의미 있는 업무 경감에 도달 못 하고 급여 부담에 침몰했어. 코딩 벤치마크로는 측정 못 하는 장기 전략 능력을 보여주는 결과야.
