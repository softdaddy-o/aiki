---
term: qwen-3.5
title: Qwen 3.5(큐원 3.5)
lang: ko
summary: >-
  Qwen 3.5(큐원 3.5)는 Alibaba 쪽 Qwen 팀이 내놓은 오픈 가중치 중심 모델 세대야. 로컬 서빙도 되고 Alibaba
  Cloud Model Studio API로도 이어져서 오픈 모델과 상용 배포 사이를 같이 보게 만드는 이름이야.
readerValue: 'Qwen 3.5가 로컬 LLM, 에이전트, 장문 컨텍스트 이야기에서 왜 기준점처럼 쓰이는지 빠르게 잡을 수 있어.'
category: model
modelType: family
parentModel: qwen
modelProfile:
  memoryUsage: >-
    Qwen 3.5는 크기별 편차가 큰 family다. 예를 들어 35B-A3B는 총 35B에 3B 활성 구조고, 기본 컨텍스트는
    262,144 토큰이며 1,010,000 토큰까지 확장할 수 있어.
  implementation: >-
    Qwen 팀이 공개한 멀티모달·agent 지향 오픈 모델 계열이야. thinking 모드, 툴 사용, 긴 컨텍스트, 다국어를 한 묶음으로
    밀어붙인 세대라고 보면 돼.
  activeParameters: >-
    35B-A3B는 256개 expert 중 8 routed + 1 shared가 활성화되는 MoE 구조다. family 페이지에서는 9B,
    35B-A3B, 397B-A17B처럼 어떤 크기를 가리키는지 먼저 확인해야 한다. 이렇게 보면 돼.
  multimodalSupport: >-
    공식 모델 카드 기준 텍스트와 비전 입력을 함께 다루는 멀티모달 foundation 모델이야. 201개 언어·방언 지원과 툴
    사용/agent 성향이 같이 강조돼.
  access: >-
    공식 Hugging Face 웨이트를 받아 Transformers, vLLM, SGLang, KTransformers 같은 스택으로 직접
    서빙할 수 있어. 관리형 추론은 Alibaba Cloud Model Studio 쪽을 같이 봐.
  pricing: >-
    오픈 웨이트라 토큰표보다 직접 서빙 비용과 추론 프레임워크 선택이 먼저다. 다만 관리형으로 쓸 땐 Qwen API 상품군이 별도로
    붙는다. 이렇게 보면 돼.
  weightsOpen: 오픈 웨이트 공개. 이렇게 보면 돼.
  vendor: Alibaba / Qwen
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - qwen 3.5
  - qwen3.5
relatedTerms:
  - gemma
  - chain-of-thought
  - local-llm
  - localllama
mentionCount: 0
draft: false
tags:
  - alibaba
  - open-model
  - reasoning
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: 'https://huggingface.co/Qwen/Qwen3.5-35B-A3B'
      title: Qwen/Qwen3.5-35B-A3B · Hugging Face
    - url: 'https://huggingface.co/Qwen/Qwen3.5-397B-A17B'
      title: Qwen/Qwen3.5-397B-A17B · Hugging Face
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 모델 카드와 공식 발표의 설명이 내가 쓴 가족형 정의랑 맞는지 맞춰봤어.
      items:
        - '독자 문제 대조: Qwen 3.5를 단일 모델이 아니라 여러 오픈 가중치와 서비스형 모델을 아우르는 세대로 설명했어.'
        - 'Hugging Face 카드의 Apache 2.0, 35B 중 3B 활성, 262,144 기본 컨텍스트 설명을 반영했어.'
        - Qwen 공식 연구 페이지의 2026년 2월 공개 맥락을 참고해서 세대 모델이라는 표현만 남겼어.
      findings:
        - Qwen 3.5는 오픈 가중치와 호스티드 API가 동시에 존재하는 점이 핵심 축이야.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '모델 카드, Qwen 공식 발표, Alibaba Cloud 문서가 같은 운영 그림을 보여주는지 다시 봤어.'
      items:
        - >-
          비교 기준: 오픈 가중치 모델 설명과 Alibaba Cloud의 `qwen3.5-flash` 서비스 설명이 같은 세대 모델을
          가리키는지 맞춰봤어.
        - >-
          모델 카드는 로컬 서빙과 262,144 기본 컨텍스트를 말하고, Model Studio 문서는 1M 컨텍스트 API 경로를
          말하는지 나눠서 확인했어.
        - thinking mode 기본값과 내장 툴 설명도 로컬 오픈 모델과 호스티드 버전을 섞지 않게 분리했어.
      findings:
        - Qwen 3.5는 로컬 배포와 클라우드 배포를 동시에 읽어야 전체 그림이 보여.
    - type: number_verify
      result: pass
      sources: 2
      summary: 컨텍스트 길이와 활성 파라미터 숫자를 다시 봤어.
      items:
        - 35B-A3B의 총 35B와 활성 3B 수치를 다시 확인했어.
        - '기본 컨텍스트 262,144와 확장 1,010,000 토큰 수치를 다시 확인했어.'
        - 'Model Studio의 `qwen3.5-flash` 기본 1,000,000 컨텍스트도 따로 확인했어.'
      findings:
        - Qwen 3.5 숫자는 오픈 모델 카드와 호스티드 서비스 문서를 구분해서 적어야 헷갈림이 줄어들어.
    - type: adversarial
      result: pass
      summary: Qwen 3.5를 전부 같은 크기와 같은 배포 방식으로 읽는 오해를 막았어.
      items:
        - 35B-A3B와 `qwen3.5-flash`를 같은 물건처럼 쓰지 않고 로컬 오픈 모델과 API 서비스로 분리했어.
        - 장문 컨텍스트 숫자도 기본값과 확장값을 나눠 적어서 1M이 항상 기본인 것처럼 보이지 않게 했어.
        - thinking mode 기본이라는 설명도 출력 정책 문제와 연결해서 단순 홍보 문장처럼 안 보이게 바꿨어.
      findings:
        - 독자가 Qwen 3.5를 하나의 고정 스펙 모델로 오해할 가능성을 줄였어.
---
## 한 줄 정의
Qwen 3.5는 Alibaba가 밀고 있는 Qwen 계열의 2026년 세대 모델 묶음이야. 하나의 단일 모델 이름이라기보다 397B-A17B, 35B-A3B, 27B 같은 오픈 가중치 모델과 `qwen3.5-flash` 같은 서비스형 모델을 같이 가리킬 때가 많아. 공식 Hugging Face 카드 기준 오픈 가중치 모델은 Apache 2.0으로 배포되고 Alibaba Cloud Model Studio에서는 API 서비스로 이어져.
## 이 모델로 무엇을 할 수 있나
실무에서는 로컬 멀티모달 에이전트, 코드 생성, 문서 이해, 장문 검색과 요약, 화면 기반 툴 사용 실험에 많이 써. `Qwen/Qwen3.5-35B-A3B`는 Transformers, vLLM, SGLang 같은 프레임워크에서 바로 서빙할 수 있고, 문서 예시상 8 GPU 텐서 병렬로 `http://localhost:8000/v1` OpenAI 호환 엔드포인트를 띄우는 방식이 대표적이야. 인프라를 직접 안 굴리고 싶으면 Alibaba Cloud의 `qwen3.5-flash`를 API로 쓰면 되고, 이쪽은 기본 1M 컨텍스트와 내장 툴을 앞세워.
## 왜 중요한가
Qwen 3.5가 중요한 이유는 오픈 가중치 모델이면서도 에이전트, 코딩, 멀티모달, 장문 컨텍스트를 한 세대 안에 강하게 묶었기 때문이야. 35B-A3B 카드 기준 컨텍스트는 기본 262,144 토큰이고 1,010,000 토큰까지 확장 가능해서 로컬 LLM 얘기에서 장문 기준점으로 자주 불려. 또 Qwen3.5 모델은 thinking mode가 기본이라 `<think>` 출력 관리나 추론 길이 제어까지 운영 포인트로 같이 봐야 해.
## 같이 보면 좋은 모델
- [gemma](/ko/wiki/gemma/): 둘 다 오픈 모델 얘기에서 자주 맞붙는 이름이야. Qwen 3.5는 장문 컨텍스트와 서비스형 API 연결이 강하고 Gemma 4는 온디바이스와 Google 생태계 쪽이 강해.
- [chain-of-thought](/ko/wiki/chain-of-thought/): Qwen 3.5는 thinking mode가 기본이라 추론 노출을 어떻게 다룰지 이해할 때 같이 보면 좋아. `<think>`를 그대로 보여줄지 숨길지 같은 운영 문제도 여기와 맞닿아 있어.
- [local-llm](/ko/wiki/local-llm/): Qwen 3.5는 로컬 LLM 문맥에서 장문과 멀티모달을 같이 보게 만드는 기준점이야. 어느 정도 하드웨어에서 어떤 길이까지 버티는지 읽을 때 좋은 비교축이 돼.
- [localllama](/ko/wiki/localllama/): 실제 체감 성능과 양자화 이야기는 LocalLLaMA 쪽에서 많이 쌓여. 제품 문서와 커뮤니티 경험이 어디서 만나는지 보려면 같이 읽는 게 좋아.
