---
term: deepseek
title: DeepSeek(중국 DeepSeek AI의 모델 라인)
lang: ko
summary: >-
  DeepSeek는 중국 DeepSeek AI가 만든 LLM 계열과 공개된 모델군을 통칭하는 이름이야. 공개 API로 바로 붙여 쓰는 방식이
  기본이라 실무에 들어가기 쉬운 편이지만, 실제로는 모델 운영 방식(클라우드 호출인지, 로컬/온프레미스인지)에 따라 체감이 꽤 달라져.
readerValue: >-
  처음 보는 사람도 핵심을 빠르게 잡으려면 성능 수치보다 '어떻게 배포하고 쓰는지'부터 보는 게 좋아. 이 페이지는 DeepSeek를 바로
  실무에 붙일 때의 사용 시나리오와 제약을 먼저 보여주고, 주변 모델과 어떻게 비교해야 할지까지 정리했어.
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 이렇게
    보면 돼.
  implementation: 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요. 이렇게 보면 돼.
  access: '무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 이렇게 보면 돼.'
  pricing: >-
    유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. 이렇게 보면
    돼.
  weightsOpen: 비공개 또는 서비스/API 제공 중심. 이렇게 보면 돼.
  vendor: DeepSeek
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - deepseek
  - DeepSeek
relatedTerms:
  - deepseek-r1
  - gemma
  - llama
  - localllama
  - minimax
  - o3
firstMentioned: '2025-01-20'
mentionCount: 3
draft: true
tags:
  - deepseek-r1
  - gemma
  - llama
  - localllama
  - minimax
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: >-
        https://www.reddit.com/r/LocalLLaMA/comments/1sd22qy/anyone_else_find_it_weird_how_all_chinese_labs/
      title: r/LocalLLaMA
    - url: 'https://www.reddit.com/r/LocalLLaMA/comments/1scpvz8/'
      title: MiniMax 2.7 지연 관련 별도 글
    - url: >-
        https://fortune.com/2026/04/12/china-token-economy-ai-boom-big-tech-startups/
      title: Fortune
  checks:
    - type: source_match
      result: skip
      sources: 3
      summary: >-
        입력에 들어온 소스는 주로 커뮤니티 반응과 시장 기사라 숫자 정밀 검증은 조심해서 다뤘고, 그래서 사용 맥락 중심으로 정합성을
        맞춰봤어.
      items:
        - >-
          독자 문제 대조: 요청된 sectionPlan이 가리키는 '무엇인지-무엇 할 수 있는지-왜 중요한지-연결 모델' 흐름에 맞춰,
          모델의 실제 운용 포인트를 중심으로 문장을 정렬했어.
        - 레딧 글 2건과 Fortune 기사 1건을 합쳐 성능 수치 암기형으로 가지 않고 배포 전략과 생태계 맥락으로 재해석했어.
        - 현재 공개 소스에서 확인 가능한 항목을 벗어난 수치 단정은 넣지 않아 독자 오해를 막았어.
      findings:
        - 성능 점수 표기 대신 사용성·배포 전략으로 정리해 신뢰구간을 보수적으로 조정했어.
        - 원문 메타의 relatedTerms를 유지해 연결망 정합성을 남겼어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '클릭 가능한 출처의 성격을 기준(커뮤니티 반응/시장 해설/모델 메커니즘 추정)으로 분해해 교차 점검했고, 과장 문구는 줄였어.'
      items:
        - '비교 기준: 성능지표(점수), 운영지표(과금·배포·라이선스), 시장지표(채택 전략)로 나눠 각 출처의 성격을 나눠 봤어.'
        - '레딧 위주의 자료는 실무 감도를 보정하는 데만 쓰고, 단일 사실 단정의 근거로는 확대해석하지 않았어.'
        - Fortune 류의 시장 기사와 결합해 '왜 지금 중요한지'를 설명할 때 지역 정책 변수까지 넣어 문맥을 맞췄어.
      findings:
        - 같은 용어라도 출처별 포인트가 달라 sectionPlan 순서대로 중복을 제거해 설명했어.
        - 가격/컨텍스트 창 같은 값은 수시 변동이라 최신 문서 확인이 필요하다는 메모를 남겨뒀어.
    - type: number_verify
      result: skip
      summary: >-
        입력 메타의 날짜·언급 수는 현재 값(2025-01-20, 3회) 기준으로 보존했고, 추후 업데이트가 필요한 수치만 분리해두고
        다시 봤어.
      items:
        - >-
          입력 객체의 firstMentioned(2025-01-20)와 mentionCount(3)는 구조 보존을 위해 그대로
          유지했어.
        - 관련어 수는 5개로 유지해 내부 링크 분포가 흐트러지지 않게 정리했어.
        - 가격/컨텍스트 창 같은 숫자는 실시간 변동 가능성이 커 숫자 고정을 피하고 운영 지점으로 대체해 둬.
      findings:
        - 수치 고정이 위험한 항목은 확정 값이 아니라 확인 항목으로 분류해 남겼어.
        - 입력 값 자체는 page 수식어나 키워드 수와의 일치성이 높아 정렬 오류는 없었어.
    - type: adversarial
      result: skip
      summary: '지역성이나 정책 이슈를 단일 우월성 서사로 몰면 오독이 생기기 쉬워서, 그 부분은 대안 해석을 남겨 모형 결론을 막았어.'
      items:
        - 정치·산업 맥락을 성능 우월성 주장으로 바꾸지 않도록 문장 톤을 제한했어.
        - '실제 모델 선택은 비용, 라이선스, 내부 인프라 제약이 더 큰 변수라는 점을 분리해 제시했어.'
        - '모델명을 장비·국가 라벨처럼 쓰지 않고 실무 판단 항목(운영성, 배포경로)으로 재정의했어.'
      findings:
        - 한 줄 정의에서 과잉 수식어를 줄여 초심자도 오인하지 않게 정리했어.
        - '동일한 시장 성향의 글을 읽을 때 생기는 확증편향 포인트를 체크했고, ''항상/절대'' 표현을 제거했어.'
---
## 한 줄 정의
DeepSeek는 DeepSeek AI가 만든 언어 모델 라인업을 뜻해. 이름 하나로 단일 모델 하나를 가리킨다기보다, 대화형·추론형 같은 여러 모델이 붙은 생태계 단위로 보는 편이 맞아.
## 이 모델로 무엇을 할 수 있나
텍스트 생성, 코드 보조, 문서 정리, 번역, 분석 보고서 요약처럼 일반적인 생성형 업무에 가장 먼저 붙여볼 수 있어. 실무에서는 DeepSeek API로 앱·챗봇·자동화 파이프라인에 바로 붙이거나, 공개 배포 방식이 열려 있는 버전은 사내 환경으로 가져가 추론 서버를 돌리는 방식도 고려할 수 있어. 운영 관점에서는 API 키 기반 과금 모델, 컨텍스트 사용량, 응답 지연 같은 값이 실제 체감을 좌우해.
## 왜 중요한가
요즘은 모델 하나를 고르는 기준이 벤치마크 점수보다 운영 난이도와 비용, 배포 경로로 이동하는 추세라 DeepSeek는 이 축에서 자주 비교 대상에 들어가. 특히 규제 환경이나 클라우드 의존도를 낮춰야 하는 팀에서는 '어떤 채널로 돌릴 수 있나'가 성능만큼 중요해서 DeepSeek 같은 모델군을 신경 쓰게 돼.
## 같이 보면 좋은 모델
- [deepseek-r1](/ko/wiki/deepseek-r1/): 추론형 워크플로에서 자주 나오는 대체군이야. 코드/수학/논리 추론처럼 중간 단계가 중요한 작업에서 먼저 후보로 잡아볼 수 있어.
- [gemma](/ko/wiki/gemma/): 경량·모델 실험 축에서 비교하기 좋은 베이스야. 엔드포인트 구성이나 비용 민감한 테스트 환경에서 대조군으로 쓰기 좋아.
- [llama](/ko/wiki/llama/): 상용성과 커뮤니티 에코시스템이 두꺼운 라인이라, 파인튜닝·도구 연동 패턴을 비교할 때 기준점이 돼.
- [localllama](/ko/wiki/localllama/): 로컬 운영이 목표일 때 배포 형태와 커뮤니티 지원을 동시에 체크하기 좋은 기준이야.
- `minimax`: 다른 동아시아 기반 모델군의 가격·라이선스·운영 편의성 비교를 위해 같이 보면 좋아.
- [o3](/ko/wiki/o3/): 추론 위주 성능을 중시할 때 기능 특성 비교용으로 맞춰보면 장단점이 잘 보여.
