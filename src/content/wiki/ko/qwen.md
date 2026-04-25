---
term: qwen
title: Qwen (큐원)
lang: ko
summary: >-
  Qwen (큐원)은 Alibaba Cloud가 굴리는 생성형 AI 모델 브랜드야. 오픈웨이트 모델과 클라우드 API가 한 이름 아래 같이
  있어서, 기사에서 보이면 성능표보다 배포 경로부터 보면 맥락이 빨리 잡혀.
readerValue: 'Qwen이 로컬에 올려 돌리는 모델 얘기인지, Alibaba Cloud API 상품 얘기인지 바로 갈라 읽는 데 도움 돼.'
category: model
modelType: family
modelProfile:
  memoryUsage: '직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다. 이렇게 보면 돼.'
  implementation: 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요. 이렇게 보면 돼.
  access: 무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있어.
  pricing: >-
    직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다. 이렇게 보면
    돼.
  weightsOpen: 오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요해.
  vendor: Alibaba / Qwen
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - Qwen (큐원)
relatedTerms:
  - deepseek-r1
  - llama
  - gemma
  - local-llm
firstMentioned: '2026-03-02'
mentionCount: 17
draft: false
tags:
  - alibaba
  - open-model
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Qwen'
      title: Qwen
    - url: 'https://qwenlm.github.io/'
      title: Qwen
  checks:
    - type: source_match
      result: pass
      summary: Qwen을 단일 모델보다 브랜드와 배포 방식으로 읽게 했는지 독자 초점에 맞춰봤어.
      items:
        - '독자 문제 대조: 벤치마크보다 사용처와 제품 전략을 먼저 읽고 싶은 사람 기준으로 첫 문단을 잡았어.'
        - 모델 한 개와 브랜드 묶음을 헷갈리지 않게 정의 문장에서 바로 분리했어.
      findings:
        - 요약과 readerValue가 로컬 실행 문맥과 API 상품 문맥을 먼저 가르게 만들었어.
    - type: web_cross_check
      result: pass
      sources: 1
      summary: 공식 Qwen 사이트와 배포 문서를 맞대 보고 API 호환과 로컬 실행 문장을 다시 봤어.
      items:
        - >-
          비교 기준: qwen.ai의 OpenAI 호환 API 설명과 Qwen 배포 문서의 vLLM·SGLang·Ollama 안내를
          함께 봤어.
        - Alibaba Cloud API와 오픈웨이트 로컬 배포를 같은 문장에 섞지 않고 역할을 나눠 적었어.
      findings:
        - 'OpenAI 호환 API, 오픈웨이트, 로컬 서빙 경로처럼 공식 페이지에서 직접 확인되는 운영 디테일만 남겼어.'
    - type: number_verify
      result: pass
      sources: 1
      summary: '버전마다 빨리 바뀌는 수치는 덜고, 문맥에 꼭 필요한 운영 정보만 남겼어.'
      items:
        - 컨텍스트 길이 같은 가변 수치는 페이지 목적상 핵심이 아니라서 뺐어.
        - 수치 경쟁보다 배포 경로와 사용 방식이 더 중요하다는 독자 초점에 맞게 숫자 비중을 줄였어.
      findings:
        - 숫자 때문에 문서가 금방 낡아 보이는 문제를 줄였어.
    - type: adversarial
      result: pass
      summary: Qwen을 전부 오픈소스나 전부 클라우드 상품으로 읽히는 표현을 막았어.
      items:
        - 브랜드 전체와 개별 모델을 같은 뜻처럼 보이게 하는 문장을 피했어.
        - 모든 Qwen이 똑같은 라이선스나 배포 경로를 가진 것처럼 읽히지 않게 범위를 좁혀 적었어.
      findings:
        - '독자가 기사 한 줄만 보고도 브랜드, 모델, 서비스 레이어를 분리해 읽게 만들었어.'
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.1.0
    tone-editor: 1.6.0
    structure-editor: 1.1.0
  guideVersions:
    tone: 2.0.0
    common: 2.3.0
    wiki: 3.1.2
  panelVerdict: pass
  contentHash: fbe831ff9366229d
  reviewedAt: '2026-04-25T09:55:57Z'
formatVersion: 2
---
## 한 줄 정의
Qwen은 모델 한 개 이름이라기보다 Alibaba Cloud가 묶어서 내놓는 생성형 AI 계열 이름이야. 그래서 `Qwen`이 보이면 먼저 어떤 버전인지와 [로컬](/ko/wiki/local-llm/) 배포인지 클라우드 API인지부터 같이 확인해야 해.
## 이 모델로 무엇을 할 수 있나
실무에서는 글쓰기, 요약, 번역, 질의응답, 코드 생성, [에이전트](/ko/wiki/agent/) 흐름 같은 범용 작업에 붙여 써. 공식 안내 기준으로는 [OpenAI](/ko/wiki/openai/) 호환 API로 붙일 수 있고, 공개된 오픈웨이트 모델은 [vLLM](/ko/wiki/vllm/)·[SGLang](/ko/wiki/sglang/)·[Ollama](/ko/wiki/ollama/) 같은 경로로 로컬이나 자체 서버에도 올릴 수 있어.
## 왜 중요한가
Qwen이 중요한 이유는 공개 배포와 상용 API를 한 브랜드 안에서 같이 밀기 때문이야. 그래서 기사에서 Qwen을 볼 때는 [벤치마크](/ko/wiki/benchmark/) 숫자보다 라이선스, 배포 경로, Alibaba 생태계와 얼마나 깊게 묶였는지를 먼저 보는 게 실무 판단에 더 도움 돼.
## 같이 보면 좋은 모델
- [Llama](/ko/wiki/llama/): Meta 쪽 오픈 모델 축이라서 공개 생태계 비교 기준으로 자주 같이 나와. Qwen과 붙여 보면 누가 [로컬](/ko/wiki/local-llm/) 실행 친화적인지, 누가 클라우드 서비스까지 더 세게 미는지 감이 잡혀.
- [Gemma](/ko/wiki/gemma/): Google 계열 오픈 모델 흐름을 볼 때 좋은 비교 상대야. Qwen과 나란히 보면 같은 오픈 모델이라도 배포 채널과 제품 메시지가 꽤 다르다는 게 보여.
- [DeepSeek R1](/ko/wiki/deepseek-r1/): [추론](/ko/wiki/inference/) 성능 중심 기사에서 자주 거론돼. Qwen과 비교하면 성능 화제와 제품화 화제가 어디서 갈리는지 읽기 쉬워져.
- [Local LLM](/ko/wiki/local-llm/): 브랜드가 아니라 실행 방식이야. Qwen 일부 모델이 이 범주에 들어갈 수 있어서, 기사 문장을 [로컬](/ko/wiki/local-llm/) 실행 가능성과 서비스형 제공으로 분리해 읽는 데 도움 돼.
