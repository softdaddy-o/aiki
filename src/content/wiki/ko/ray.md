---
term: ray
title: Ray(레이)
lang: ko
summary: >-
  Ray는 여러 머신과 GPU에 파이썬 작업을 나눠 돌리게 해 주는 분산 컴퓨팅 프레임워크야. 모델 구조나 새
  [학습](/ko/wiki/training/) 기법 자체라기보다, 학습·탐색·서빙 작업을 클러스터 규모로 실행하게 만드는
  [런타임](/ko/wiki/runtime/)에 가깝지.
readerValue: '이 말을 알면 기사에서 새 학습 기법 얘기인지, 아니면 큰 작업을 여러 자원에 쪼개 돌리는 분산 실행 인프라 얘기인지 바로 가를 수 있어.'
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
draft: true
tags:
  - distributed
  - training
factCheck:
  status: passed
  date: '2026-04-23'
  sources:
    - url: 'https://docs.ray.io/en/latest/ray-overview/getting-started.html'
      title: Getting Started — Ray
    - url: 'https://docs.ray.io/en/latest/ray-core/actors.html'
      title: Actors — Ray Core
    - url: 'https://www.usenix.org/conference/osdi18/presentation/moritz'
      title: 'Ray: A Distributed Framework for Emerging AI Applications'
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: '본문의 핵심 정의를 Ray 공식 문서와 논문 설명에 맞춰서, 학습 기법이 아니라 분산 실행 프레임워크로 잡았어.'
      items:
        - >-
          Getting Started 문서는 Ray를 파이썬과 AI 애플리케이션을 노트북에서 클러스터까지 확장하는 프레임워크로
          소개하므로, 본문도 모델 프레임워크보다 실행 계층으로 설명했어.
        - >-
          Actors 문서는 task와 actor를 핵심 추상화로 설명하므로, 본문의 원격 작업과 상태 있는 actor 설명이 문서
          축과 맞아.
        - >-
          USENIX 논문은 task-parallel과 actor-based computation을 한 실행 엔진 위에서 다룬다고 적고
          있어서, Ray를 분산 실행 인프라로 읽는 해석을 뒷받침해.
      findings:
        - 정의는 모델 이름이나 알고리즘이 아니라 분산 시스템이라는 쪽으로 수렴해.
        - 'Train, Tune, Serve는 코어 위에 얹히는 워크로드 계열로 읽는 편이 맞아.'
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 공식 문서와 독립 논문을 함께 비교해도 Ray는 새 학습법이 아니라 분산 실행 프레임워크라는 해석이 유지돼.
      items:
        - >-
          공식 Getting Started와 USENIX 논문 모두 Ray를 분산 시스템 또는 프레임워크로 규정해서, 본문이
          [학습](/ko/wiki/training/) 방법과 분리해 설명한 방향이 맞아.
        - >-
          공식 Actors 문서와 논문 모두 task/actor, 스케줄링, fault tolerance를 중심에 두고 있어서, 본문의
          '작업 분배와 상태 관리' 판단축이 소스 간에 일치해.
        - >-
          만약 독립 소스가 Ray를 주로 특정 모델 프레임워크나 알고리즘으로 소개했다면 본문 판단을 바꿔야 했겠지만, 확인한 소스들은
          모두 실행 인프라 쪽에 무게를 둬.
      findings:
        - 벤더 소개와 논문 서술이 모두 같은 층위를 가리켜서 해석 충돌이 없었어.
        - 독립 소스까지 봐도 PyTorch 대체재라는 식의 해석은 지지되지 않았어.
    - type: number_verify
      result: skip
      sources: 3
      summary: >-
        이 페이지는 시점에 따라 달라지는 성능 수치나 버전 숫자를 핵심 근거로 쓰지 않아서, 숫자 검증 대신 숫자 표현을 보수적으로
        줄였어.
      items:
        - >-
          기존의 '1대 머신, 2개 이상 GPU' 같은 임계치 표현은 빼고, 여러 GPU나 여러 노드가 필요해질 때라는 질적 기준으로
          바꿨어.
        - '본문에는 처리량, latency, task/s, 버전 같은 수치 주장을 넣지 않았고, 분산 실행이 필요한 상황 판단만 남겼어.'
        - >-
          Train, Tune, Serve는 성능 숫자가 아니라 Ray 문서가 구분하는 대표 워크로드 이름이라서, 벤치마크 검증 대상
          숫자로 취급하지 않았어.
      findings:
        - 숫자보다 역할 구분을 정확히 잡는 편이 초보자 판단에 더 직접적이야.
        - 성능 비교 수치를 넣지 않아서 문서가 빠르게 낡을 위험도 줄였어.
    - type: adversarial
      result: pass
      sources: 3
      summary: 초보자가 가장 자주 하는 오해인 'Ray가 모델 자체를 바꾸거나 성능을 자동으로 올려 준다'는 해석을 본문에서 직접 막았어.
      items:
        - >-
          [PyTorch](/ko/wiki/pytorch/) 같은 모델 프레임워크를 고르는 문제와 Ray를 도입하는 문제를 분리해서,
          둘을 대체 관계로 읽지 않게 했어.
        - >-
          [파인튜닝](/ko/wiki/fine-tuning/)이나 [지식 증류](/ko/wiki/distillation/)처럼 모델을
          바꾸는 학습 방법과 달리, Ray는 그 작업을 여러 자원에 배치하고 재시도하는 실행 계층이라고 못 박았어.
        - >-
          단일 머신에서 끝나는 작은 실험에는 plain PyTorch나 더 단순한 스케줄러가 낫다는 한계를 적어서, 무조건 도입해야
          하는 도구처럼 보이지 않게 했어.
      findings:
        - '''도입하면 정확도가 오른다''는 환상을 차단하고 운영 비용 판단으로 시선을 돌렸어.'
        - 도입 가치와 도입 비용을 같이 적어서 홍보성 문장으로 흐르지 않게 했어.
---
## 한 줄 정의
Ray는 파이썬 작업을 여러 머신과 GPU에 분산해서 실행하게 해 주는 프레임워크야. 새 [학습](/ko/wiki/training/) 방법이나 모델 구조를 말하는 게 아니라, 학습·탐색·서빙 작업을 더 큰 자원 풀에 올리는 [런타임](/ko/wiki/runtime/) 쪽 이야기라고 보면 돼.

## 언제 Ray 얘기인가
Ray를 떠올릴 시점은 "모델을 어떻게 바꿀까?"보다 "이 일을 여러 자원에 어떻게 나눠 돌릴까?"가 문제일 때야.

- 분산 학습: [PyTorch](/ko/wiki/pytorch/) 코드가 한 대에서는 이미 돌아가는데, 여러 GPU나 여러 노드로 늘리면서 작업 배치, 자원 예약, 실패 재시도를 같이 다뤄야 할 때 Ray가 들어와.
- 하이퍼파라미터 탐색: 같은 모델을 설정만 바꿔 수십 번 돌려야 할 때, Ray는 trial들을 클러스터에 나눠 배치하고 결과를 모으는 역할을 해.
- 서빙과 상태 관리: 모델 API 하나만 띄우는 수준을 넘어, 상태 있는 worker나 여러 서비스 조합을 운영해야 할 때 actor 기반 실행 모델이 도움이 될 수 있어.

즉 [파인튜닝](/ko/wiki/fine-tuning/)이나 [지식 증류](/ko/wiki/distillation/)처럼 모델을 어떻게 바꿀지 고민하는 문맥이면 학습 기법 비교가 먼저고, 이미 정한 작업을 더 큰 자원에 안정적으로 퍼뜨리는 문맥이면 Ray 쪽 비교가 맞아.

## Ray를 넣으면 뭐가 달라지나
Ray를 도입하면 로컬 스크립트 하나가 하던 일을 클러스터 작업 단위로 쪼개고, task와 actor에 자원 요구사항을 붙여 스케줄링하게 돼. 그래서 분산 학습에서는 "코드를 돌린다"에서 끝나지 않고 작업 배치, 체크포인트, 실패 복구, 노드 간 자원 활용까지 운영 범위가 넓어져.

튜닝에서는 수동으로 실험을 여러 번 돌리던 흐름이 병렬 trial 관리 문제로 바뀌고, 서빙에서는 단일 프로세스 API보다 상태 관리와 확장 전략이 더 중요해져. 초보자 기준으로 보면 Ray는 모델 품질을 직접 높이는 도구가 아니라, 이미 필요한 워크로드를 더 큰 시스템으로 옮길 때 생기는 실행 문제를 처리하는 도구야.

## 언제 쓰고 언제 건너뛰나
지금 Ray를 시험해 볼 팀은 여러 GPU나 여러 머신을 실제로 써야 하고, 같은 종류의 학습·튜닝 작업을 반복 실행하며, 실패 재시도나 자원 스케줄링을 코드 바깥에서 수동으로 감당하기 버거운 팀이야. 이런 경우엔 작은 분산 학습 job 하나나 짧은 하이퍼파라미터 탐색을 Ray로 옮겨 보고, 대기 시간과 작업 관리가 얼마나 줄어드는지 확인하는 게 가장 빠른 가치 검증이 돼.

반대로 한 대에서 끝나는 실험, 단순한 학습 루프, 운영 여력이 거의 없는 팀이라면 일단 건너뛰는 편이 낫다. Ray를 넣으면 클러스터 운영, 데이터 직렬화와 이동, 상태 있는 actor 디버깅 같은 비용이 함께 들어오고, 이 정도 문제 규모라면 plain PyTorch와 더 단순한 스케줄러만으로도 충분한 경우가 많아. 초보자는 먼저 "프레임워크를 고르는 문제인가?"면 [PyTorch](/ko/wiki/pytorch/)를, "학습 방법을 고르는 문제인가?"면 [파인튜닝](/ko/wiki/fine-tuning/)이나 [지식 증류](/ko/wiki/distillation/)를, "실행을 분산해야 하는가?"면 Ray를 비교하면 돼.
