---
term: vllm
title: "vLLM(브이엘엘엠)"
lang: ko
summary: "vLLM은 이미 있는 대규모 언어 모델을 빠르게 돌리고 서비스하기 위한 추론 엔진이자 서빙 계층이야. 모델 자체보다 운영 구조를 바꾸는 런타임 선택지에 더 가까운 편이야."
readerValue: "vLLM이 단순 실행 도구인지, 아니면 팀의 추론 서버 구조와 배포 전략을 바꾸는 선택지인지 빨리 가르게 해줘."
category: tool
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "vLLM(브이엘엘엠)"
relatedTerms:
  - sglang
  - triton
  - ollama
  - inference
firstMentioned: "2026-03-09"
mentionCount: 1
draft: false
tags:
  - inference
  - serving
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://github.com/vllm-project/vllm"
      title: "vllm-project/vllm"
    - url: "https://docs.vllm.ai/"
      title: "vLLM"
  checks:
    - type: source_match
      result: pass
      summary: "공식 저장소와 공식 문서가 말하는 역할에 맞춰 정의를 잡았어."
      items:
        - "독자 문제 대조: vLLM을 모델 이름이 아니라 운영 계층의 추론 엔진으로 설명했고, 그 점이 공식 소개와 맞아."
        - "공식 저장소 소개처럼 고처리량과 메모리 효율을 앞세운 서빙 엔진이라는 축을 본문 중심에 뒀어."
        - "학습 도구가 아니라 이미 있는 모델을 실행하고 서비스하는 계층이라는 서술이 소스 취지와 일치해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "README와 공식 문서가 가리키는 핵심 포인트를 같이 대조했어."
      items:
        - "비교 기준: GitHub README의 제품 소개와 공식 문서 홈의 기능 목록이 같은 역할을 말하는지 봤어."
        - "두 소스 모두 PagedAttention, continuous batching, prefix caching 계열 최적화를 핵심 특징으로 제시해."
        - "두 소스 모두 라이브러리 사용과 API 서버 노출을 함께 다루므로, 본문에서 코드 호출과 배포를 같이 적은 방향이 타당해."
    - type: number_verify
      result: pass
      summary: "수치는 공식 문서에서 바로 확인되는 범위만 남기고 과장은 뺐어."
      items:
        - "지원 범위는 문서에 적힌 200개 넘는 모델 아키텍처 지원 수준까지만 다뤘어."
        - "처리량 향상 배수나 지연 시간 개선 수치는 워크로드 의존성이 커서 본문 설명에 넣지 않았어."
    - type: adversarial
      result: pass
      summary: "이름 때문에 생기는 오해를 먼저 막는 쪽으로 점검했어."
      items:
        - "vLLM을 새 모델 발표나 체크포인트 이름으로 오해하지 않게 첫 단락부터 실행 계층이라는 점을 앞세웠어."
        - "OpenAI 호환 API라는 표현이 OpenAI 서비스와 완전히 동일하다는 뜻으로 읽히지 않게 제한을 분명히 했어."
      findings:
        - "vLLM은 모델 자체가 아니라 추론 엔진이야."
        - "학습 프레임워크, 모델 이름, 서빙 엔진을 한데 묶어 읽지 않게 정리했어."
---
## 한 줄 정의
vLLM은 대규모 언어 모델을 실제 서비스나 배치 작업에서 돌릴 때 쓰는 [추론](/ko/wiki/inference/)·서빙 엔진이야. 모델을 새로 학습시키는 도구가 아니라, 이미 준비된 모델을 API 서버나 프로그램 내부 엔진으로 붙여서 응답하게 만드는 실행 계층이라고 보면 돼.
## 어떻게 작동하나
vLLM은 허깅페이스 계열 모델을 불러와 파이썬 코드 안에서 직접 돌릴 수도 있고, [OpenAI](/ko/wiki/openai/) 호환 API 서버처럼 띄워 다른 서비스가 붙게 만들 수도 있어. 한 번에 들어오는 요청을 계속 재배치하면서 처리하고, 생성 과정에서 쌓이는 KV 캐시를 잘게 나눠 관리해 [메모리](/ko/wiki/memory/) 낭비를 줄이는 쪽에 초점이 잡혀 있어.
이 과정에서 PagedAttention, continuous batching, prefix caching 같은 기법이 붙어. 그래서 같은 GPU에서도 더 많은 요청을 안정적으로 소화하거나, 긴 문맥과 동시 요청이 섞인 상황에서 병목을 덜 만드는 데 도움이 돼.
## 왜 중요한가
실무에서는 같은 모델을 써도 어떤 [추론](/ko/wiki/inference/) 엔진으로 서빙하느냐에 따라 지연 시간, 동시 처리량, GPU 점유율, 운영비가 크게 달라져. vLLM은 이런 차이를 정면으로 다루는 도구라서, 모델 선택 다음 단계가 아니라 서비스 구조 설계 단계에서 중요해져.
그래서 vLLM 도입은 단순한 라이브러리 교체로 끝나지 않는 경우가 많아. API 호환 방식, 배치 전략, 캐시 재사용, 다중 GPU 분산, 모니터링 포인트까지 함께 바뀔 수 있어서 팀의 개발 흐름과 배포 방식에 직접 영향을 줘.
## 주의해서 볼 점
vLLM을 모델 이름이나 [학습](/ko/wiki/training/) 프레임워크로 읽으면 범위를 잘못 잡게 돼. 이건 추론과 서빙을 다루는 엔진이고, [OpenAI](/ko/wiki/openai/) 호환 API를 낸다고 해서 [OpenAI](/ko/wiki/openai/)의 제품 동작과 운영 정책까지 그대로 따라간다는 뜻은 아니야.
성능 이득도 항상 같은 크기로 나오지 않아. 어떤 모델을 쓰는지, 요청이 짧은지 긴지, 동시성 패턴이 어떤지, 하드웨어와 [양자화](/ko/wiki/quantization/) 설정이 무엇인지에 따라 체감 차이가 크게 달라지기 때문에 vLLM만 붙이면 무조건 빨라진다고 받아들이면 곤란해.
## 관련 용어
- [SGLang](/ko/wiki/sglang/)은 빠른 LLM 서빙을 노린다는 점에서는 vLLM과 맞닿아 있어. 다만 SGLang은 요청을 어떻게 작성하고 제어할지까지 더 전면에 두는 편이라서, 엔진 코어만 고르는 문제보다 실행 흐름까지 설계할 때 비교 포인트가 생겨.
- [Triton](/ko/wiki/triton/)은 LLM 하나만이 아니라 여러 프레임워크와 여러 종류의 모델을 함께 배포하는 범용 서빙 서버 성격이 더 강해. 반대로 vLLM은 LLM 추론 최적화에 더 깊게 들어가서 멀티모델 플랫폼이 필요한지, LLM 처리량이 핵심인지에 따라 선택 기준이 갈려.
- [Ollama](/ko/wiki/ollama/)는 로컬 PC에서 모델을 내려받아 바로 실행하고 간단한 API로 붙이는 경험을 앞세워. vLLM은 팀 단위 서버 운영, 다중 요청 처리, 캐시 재사용, 분산 추론처럼 운영 난도가 높은 환경에서 더 의미가 커져.
- [Inference](/ko/wiki/inference/)는 모델이 입력을 받아 출력을 만드는 전체 단계를 뜻해. vLLM은 그 추론 단계를 실제 서비스에서 효율적으로 돌리기 위한 구체적인 엔진이야.