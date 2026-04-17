---
term: ray
title: Ray(레이)
lang: ko
summary: >-
  Ray는 여러 머신과 GPU에 작업을 나눠서 돌리게 해 주는 분산 컴퓨팅 프레임워크야. 모델 구조를 정의하는 도구라기보다, 학습·튜닝·서빙
  작업을 클러스터 규모로 실행하게 만드는 실행 엔진에 가까워.
readerValue: '이 말을 알면 기사에서 새 학습 기법 얘기인지, 아니면 큰 작업을 여러 자원에 쪼개 돌리는 인프라 얘기인지 바로 가를 수 있어.'
category: framework
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - Ray(레이)
relatedTerms:
  - pytorch
  - alignment
  - fine-tuning
  - distillation
firstMentioned: '2026-03-27'
mentionCount: 2
draft: false
tags:
  - distributed
  - training
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://github.com/ray-project/ray'
      title: ray-project/ray
    - url: 'https://www.ray.io/'
      title: Scale Machine Learning &amp; AI Computing | Ray by Anyscale
  checks:
    - type: source_match
      result: pass
      summary: 분산 런타임과 AI 라이브러리라는 공식 설명을 그대로 살렸어.
      items:
        - >-
          독자 문제 대조: 이 페이지는 Ray를 모델 이름으로 착각하지 않게 하고, 계산을 분산하는 프레임워크라는 핵심을 먼저 잡아
          줘.
        - 깃허브 README와 ray.io 둘 다 core distributed runtime과 AI 라이브러리 조합을 강조해.
      findings:
        - '확인 출처: https://github.com/ray-project/ray'
        - '확인 출처: https://www.ray.io/'
    - type: web_cross_check
      result: pass
      sources: 1
      summary: 공식 채널 둘 다 Ray를 분산 실행 엔진으로 본다는 점이 일치해.
      items:
        - '비교 기준: 모델 학습 프레임워크인지, 분산 컴퓨팅 프레임워크인지 구분해서 봤어.'
        - ray.io는 AI compute engine과 오픈소스 프레임워크 성격을 함께 드러내고 있어.
      findings:
        - 이 페이지는 Ray를 PyTorch 대체재처럼 쓰지 않아서 방향이 맞아.
    - type: number_verify
      result: skip
      summary: 버전이나 성능 수치를 핵심 주장으로 쓰지 않았어.
      items:
        - 분산 도구는 환경 편차가 커서 일반화 수치를 넣지 않는 편이 안전해.
        - 본문도 기능 범위와 역할 구분에 집중했어.
      findings:
        - 숫자 대신 역할 분리를 정확히 잡는 게 독자한테 더 유용해.
    - type: adversarial
      result: pass
      summary: Ray를 학습 알고리즘이나 모델 프레임워크로 오해하는 지점을 막았어.
      items:
        - '오해 점검: Ray가 있다고 해서 모델 정확도가 자동으로 올라가는 건 아니야.'
        - '오해 점검: 작은 프로젝트에선 분산 프레임워크 도입이 오히려 복잡도만 늘릴 수 있어.'
      findings:
        - 도입 판단 기준을 성능 환상 대신 운영 비용 관점으로 돌려놨어.
---
## 한 줄 정의
Ray는 파이썬 작업을 여러 머신과 GPU에 분산해서 실행하게 해 주는 프레임워크야. [공식 사이트](https://www.ray.io/)와 [GitHub 저장소](https://github.com/ray-project/ray) 2곳 모두 이걸 distributed runtime과 AI compute engine으로 설명해.
## 어떻게 작동하나
함수를 원격 작업으로 보내거나 상태를 가진 actor를 만들어서 클러스터 전체에 일을 나눠. 그 위에 Train, Tune, Serve처럼 3개 대표 라이브러리를 얹어서 학습, 하이퍼파라미터 탐색, 배포까지 같은 런타임 위에서 이어 붙일 수 있어.
## 왜 중요한가
모델이 커질수록 알고리즘 못지않게 자원 분배와 작업 스케줄링이 성능과 비용을 크게 흔들어. 특히 1개 머신에서 끝나지 않고 2개 이상 GPU 자원을 동시에 쓰는 순간부터는 모델 구조 혁신보다 병렬화와 자동화가 더 큰 이슈가 되기도 해.
## 주의해서 볼 점
Ray는 PyTorch 같은 딥러닝 프레임워크를 대체하는 물건이 아니야. 클러스터 관리, 데이터 이동, 실패 복구 같은 운영 복잡도도 같이 따라오니까 작은 실험에선 오히려 과한 선택이 될 수 있어.
## 관련 용어
- [pytorch](/ko/wiki/pytorch/): 모델 정의와 학습 루프를 맡는 핵심 프레임워크야. Ray는 그 작업을 더 큰 자원 풀에 분산 실행하게 해 주는 층이라고 보면 돼.
- [alignment](/ko/wiki/alignment/): 정렬 작업은 데이터 생성, 평가, 반복 실험이 많아서 분산 자원이 자주 필요해. 그래서 Ray는 기법 자체보다 그런 워크로드를 운영하는 데 연결돼.
- [fine-tuning](/ko/wiki/fine-tuning/): 미세조정은 학습 방법 이름이고, Ray는 그 학습을 여러 자원에 나눠 돌리는 실행 기반이야. 둘은 역할이 완전히 달라.
- [distillation](/ko/wiki/distillation/): distillation도 결국 여러 실험과 비교가 필요한 학습 파이프라인이야. Ray는 그런 반복 작업을 확장하는 데 쓰이기 쉬워.
