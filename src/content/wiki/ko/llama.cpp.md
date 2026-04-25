---
term: llama.cpp
title: "llama.cpp (로컬 LLM 추론 엔진)"
lang: ko
summary: "llama.cpp는 오픈 가중치 모델을 로컬 장비나 자체 인프라에서 직접 추론하게 해주는 실행 엔진이자 CLI·서버 도구 묶음이야. 모델 이름이라기보다 GGUF 포맷, 양자화, 하드웨어 백엔드, API 노출 방식을 실제 운영에 연결하는 층으로 보는 게 맞아."
readerValue: "llama.cpp를 그냥 실행 도구로 볼지, 로컬 추론과 배포 책임을 팀이 직접 가져오는 기반으로 볼지 구분할 수 있어."
category: tool
aliases:
  - "llamacpp"
relatedTerms:
  - ollama
  - gguf
  - local-llm
  - lm-studio
firstMentioned: "2026-02-20"
mentionCount: 7
draft: false
tags:
  - local-ai
  - gguf
  - tool
  - llm-inference
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://github.com/ggml-org/llama.cpp"
      title: "ggml-org/llama.cpp"
    - url: "https://github.com/ggml-org/llama.cpp"
      title: "GitHub - ggml-org/llama.cpp: LLM inference in C/C++"
  checks:
    - type: source_match
      result: pass
      summary: "공식 저장소 설명 범위를 넘겨 과장하지 않았는지 문서의 역할 구분을 다시 봤어."
      items:
        - "독자 문제 대조: llama.cpp를 모델 이름이 아니라 추론 엔진과 CLI·서버 도구 묶음으로 설명한 구성이 README의 성격과 맞는지 맞춰봤어."
        - "공식 저장소의 핵심 소개가 `LLM inference in C/C++`로 잡혀 있는 점과 본문 첫 정의가 같은 층위를 가리키는지 한 번 더 봤어."
        - "GGUF 파일 요구, 양자화 지원, 여러 하드웨어 백엔드 지원을 본문에서 운영 관점으로 풀어 쓴 방식이 원문 정보와 어긋나지 않는지 다시 봤어."
    - type: web_cross_check
      result: pass
      sources: 1
      summary: "저장소 한 군데만 베끼지 않고 소개 문장, 실행 예시, 모델 포맷 설명을 나눠 대조해 다시 봤어."
      items:
        - "비교 기준: 저장소 상단 설명, Quick start의 `llama-cli`·`llama-server` 예시, 모델 섹션의 GGUF 요구 사항이 모두 같은 도구 성격을 가리키는지 맞춰봤어."
        - "OpenAI 호환 서버 예시와 로컬 모델 실행 예시가 함께 있는 점을 근거로, 개발용 라이브러리만이 아니라 실제 서비스 연결점까지 가진 도구라는 해석을 한 번 더 봤어."
    - type: number_verify
      result: pass
      summary: "빨리 낡는 수치가 문서 핵심 판단을 흔들지 않도록 숫자 의존도를 줄였는지 다시 봤어."
      items:
        - "본문에 버전 번호, 성능 비교 수치, 지원 장치 개수처럼 금방 바뀌는 숫자를 핵심 설명으로 넣지 않았는지 한 번 더 봤어."
        - "공식 README에 보이는 양자화 비트 폭과 같은 숫자는 배경 정보로만 참고하고, 문서의 결론이 특정 수치 하나에 기대지 않게 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "초심자가 가장 많이 섞어 읽는 층위 혼동을 문장 순서에서 걸러냈는지 한 번 더 봤어."
      items:
        - "llama.cpp를 곧바로 챗앱이나 완성형 제품으로 읽지 않게, 실행 엔진과 운영 도구라는 위치를 먼저 두었는지 다시 봤어."
        - "로컬 실행이 가능하다는 말이 곧바로 도입이 쉽다는 뜻으로 번지지 않게, 포맷·양자화·하드웨어 선택 책임을 분리해서 적었는지 맞춰봤어."
      findings:
        - "llama.cpp는 모델 자체가 아니라 모델을 실행하는 런타임이야."
        - "Ollama와 같은 상위 배포 도구와 겹치는 부분은 있어도 같은 층위는 아니야. llama.cpp 쪽이 더 아래에서 포맷 호환과 추론 실행을 직접 다뤄."
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
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
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "04642bb753d4d8be"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
llama.cpp는 오픈 [가중치](/ko/wiki/weight/) LLM을 CPU나 GPU에서 직접 돌리게 해주는 C/C++ 기반 추론 엔진이야. 이름은 특정 모델 계열에서 출발했지만, 지금은 여러 [GGUF](/ko/wiki/gguf/) 모델을 실행하는 공용 런타임에 더 가깝고 CLI와 서버까지 함께 제공해 실제 배포 경로에 바로 닿아 있어.
## 어떻게 작동하나
핵심은 모델을 [GGUF](/ko/wiki/gguf/) 파일 형태로 준비하고, llama.cpp가 그 파일을 읽어 [토큰](/ko/wiki/token/) 생성 계산을 수행하는 방식이야. 이 과정에서 양자화된 가중치를 써서 [메모리](/ko/wiki/memory/) 사용량을 줄이고, CPU만 쓰거나 Metal·CUDA·Vulkan 같은 백엔드를 붙여 장비에 맞게 속도를 끌어올려.
사용 방식도 나뉘어 있어. `llama-cli`로 터미널에서 바로 테스트할 수 있고, `llama-server`로 [OpenAI](/ko/wiki/openai/) 호환 API를 열어 내부 서비스나 실험용 앱 뒤에 붙일 수도 있어.
## 왜 중요한가
실무에서는 이 도구를 쓰는 순간 단순히 모델을 호출하는 게 아니라, 어떤 파일 포맷을 받을지, 어느 정도로 양자화할지, 어떤 장비에 올릴지, API를 어떤 방식으로 감쌀지를 직접 결정하게 돼. 그래서 비용 통제, 지연 시간, 데이터 외부 반출 제한이 중요한 팀에선 작은 유틸리티가 아니라 배포 구조를 바꾸는 축이 될 수 있어.
기사나 릴리스 노트에서 어떤 모델이 llama.cpp를 지원한다고 나오면, 그 말은 대개 모델 성능 자체보다 로컬 실행 가능성, 온프레미스 배포 여지, 더 싼 운영 경로가 열렸다는 뜻에 가깝다. 반대로 팀이 관리형 API만 쓰고 운영 책임을 최소화하려면 영향 범위는 줄고, 실험용 로컬 [런타임](/ko/wiki/runtime/) 정도로만 남을 수 있어.
## 주의해서 볼 점
llama.cpp를 쓴다고 바로 쉬운 제품이 되는 건 아니야. 모델 포맷을 [GGUF](/ko/wiki/gguf/)로 맞춰야 하고, [양자화](/ko/wiki/quantization/) 수준에 따라 품질·속도·[메모리](/ko/wiki/memory/) 사용량이 함께 바뀌어서 운영 판단이 계속 들어가.
이름 때문에 Meta의 LLaMA 전용 도구처럼 보일 수 있지만 실제로는 호환되는 여러 모델을 돌리는 쪽으로 넓게 쓰여. 또 [Ollama](/ko/wiki/ollama/) 같은 상위 도구가 감춰 주는 부분을 직접 다루게 되므로, 모델 관리, 서버 옵션, 프롬프트 템플릿, 하드웨어 튜닝 책임이 팀 안으로 들어온다는 점을 같이 봐야 해.
## 관련 용어
- [Ollama](/ko/wiki/ollama/) — Ollama는 llama.cpp 같은 추론 엔진 위에 모델 설치, 실행 명령, API 노출을 더 쉽게 감싼 도구에 가깝다. 직접 제어보다 사용 편의와 빠른 온보딩이 중요할 때 차이가 크게 느껴져.
- [GGUF](/ko/wiki/gguf/) — GGUF는 llama.cpp가 주로 읽는 모델 파일 포맷이야. llama.cpp가 실행 엔진이라면 GGUF는 그 엔진에 넣는 포장 형식이라고 보면 된다.
- [Local LLM](/ko/wiki/local-llm/) — Local LLM은 로컬에서 모델을 돌리는 방식 전체를 가리키는 넓은 말이야. llama.cpp는 그 범주 안에서 실제 추론을 맡는 구체적인 구현체다.
- [LM Studio](/ko/wiki/lm-studio/) — LM Studio는 GUI 중심이라 모델 검색, 다운로드, 채팅 테스트가 쉽다. llama.cpp는 그보다 아래 층에서 실행 성능, 포맷 호환, 서버화 같은 운영 쪽을 더 직접 건드린다.
