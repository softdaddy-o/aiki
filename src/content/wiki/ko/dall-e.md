---
term: dall-e
title: DALL-E (달리)
lang: ko
summary: >-
  DALL-E는 OpenAI가 만든 텍스트-이미지 생성 모델 계열이야. 문장으로 이미지를 만든다는 개념을 대중적인 제품 경험으로 옮긴 이름으로
  많이 쓰여.
readerValue: >-
  DALL-E가 나오면 범용 언어 모델 얘기라기보다 이미지 생성 제품 흐름을 읽는 데 도움돼. 특히 ChatGPT나 API 안에서 이미지
  생성이 어떻게 붙는지 감을 잡기 좋아.
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    서비스형 모델이면 서버 메모리 요구량이 공개되지 않을 수 있어, 배포 메모리 대신 컨텍스트와 출력 한도를 같이 보는 편이 낫다. 이렇게
    보면 돼.
  implementation: '생성 모델 계열로 보면 되고, 확산형인지 다른 구현인지 공식 문서 기준으로 구분하면 돼.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 텍스트 외 시각/오디오 생성까지 포함하는 멀티모달 계열로 보면 돼.
  access: '무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 이렇게 보면 돼.'
  pricing: >-
    유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. 이렇게 보면
    돼.
  weightsOpen: 비공개 또는 서비스/API 제공 중심. 이렇게 보면 돼.
  vendor: OpenAI
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - DALL-E (달리)
relatedTerms:
  - chatgpt
  - codex
  - gpt-4o
  - o3
mentionCount: 0
draft: false
tags:
  - image-generation
  - openai
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/DALL-E'
      title: DALL-E
    - url: 'https://openai.com/dall-e-3'
      title: DALL·E 3
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: DALL-E를 OpenAI의 텍스트-이미지 모델 계열로 설명한 정의를 제공된 출처와 맞춰봤어.
      items:
        - '독자 문제 대조: DALL-E를 챗봇 이름이나 범용 LLM으로 오해하지 않게 이미지 생성 모델 계열이라고 먼저 적었어.'
        - OpenAI 페이지가 강조하는 텍스트 충실도와 이미지 생성 목적을 본문 설명 축으로 잡았어.
      findings:
        - 모델 계열과 제품 경험을 함께 설명해도 출처 흐름과 잘 맞았어.
        - 세대별 세부 변화는 길게 늘이지 않고 핵심만 남겼어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: '외부 개요와 OpenAI 소개를 비교해서, DALL-E를 이미지 생성 제품 이름으로 읽는 방향이 맞는지 다시 봤어.'
      items:
        - '비교 기준: 텍스트로 디지털 이미지를 만든다는 공통 정의, OpenAI 제작, 프롬프트 충실도 강조라는 세 축을 맞춰봤어.'
        - 'API와 ChatGPT 통합처럼 실사용 맥락은 남기되, 버전별 비교 우열은 과하게 밀지 않았어.'
      findings:
        - 두 출처 모두 텍스트-이미지 생성이라는 중심점은 같았어.
        - 현재 제품 배치가 계속 바뀌는 부분은 폭넓게만 설명하고 줄였어.
    - type: number_verify
      result: pass
      sources: 1
      summary: 해상도나 가격 같은 가변 숫자는 본문에서 빼서 낡는 속도를 줄였어.
      items:
        - '이미지 크기, 호출 비용, 세대별 출시일은 자주 바뀌거나 맥락이 달라서 넣지 않았어.'
        - 독자가 알아야 할 건 무엇을 만드는 모델인지와 어디에 붙는지라서 그 부분만 남겼어.
      findings:
        - 숫자보다 사용처와 제품 의미를 먼저 읽게 정리했어.
    - type: adversarial
      result: pass
      summary: DALL-E를 모든 멀티모달 기능의 이름처럼 뭉뚱그려 읽는 오해를 막았어.
      items:
        - '이미지를 읽는 모델과 이미지를 만드는 모델을 헷갈리기 쉬워서, 생성 쪽 이름이라는 점을 분명히 적었어.'
        - '또 DALL-E가 곧 모든 OpenAI 비전 기능이라고 느끼기 쉬운데, 제품 범위를 이미지 생성 중심으로 좁혀 놨어.'
      findings:
        - 용어 범위를 좁혀서 기사 문맥 해석이 쉬워지게 만들었어.
---
## 한 줄 정의
DALL-E는 [OpenAI](/ko/wiki/openai/)가 만든 텍스트-이미지 생성 모델 계열이야. 사용자가 문장으로 장면을 설명하면 그 설명에 맞는 이미지를 클라우드에서 만들어 주는 제품 이름으로 이해하면 돼.
## 이 모델로 무엇을 할 수 있나
실무에서는 광고 시안, 스토리보드 초안, 블로그 썸네일, 캐릭터 콘셉트, 제품 목업처럼 빠르게 그림 방향을 잡아야 할 때 많이 써. [OpenAI](/ko/wiki/openai/) 서비스 안에서 [ChatGPT](/ko/wiki/chatgpt/)와 같이 쓰거나 API로 앱에 붙이는 흐름이 강해서, 디자이너 도구가 아니어도 제품 안에서 이미지 생성 기능을 넣는 데 자주 연결돼.
## 왜 중요한가
DALL-E가 중요한 이유는 텍스트-이미지 생성이 연구 데모를 넘어서 일반 사용자가 바로 만지는 AI 기능이 될 수 있다는 걸 크게 보여줬기 때문이야. 지금은 더 많은 경쟁 모델이 생겼어도, 기사에서 DALL-E가 언급되면 보통 [OpenAI](/ko/wiki/openai/)의 이미지 생성 라인업이나 프롬프트 충실도 경쟁을 가리키는 경우가 많아.
## 같이 보면 좋은 모델
- [GPT-4o](/ko/wiki/gpt-4o/): 이미지를 이해하고 생성 맥락까지 묶어서 보는 데 좋아. DALL-E보다 더 넓은 [멀티모달](/ko/wiki/multimodal/) 제품 흐름을 같이 읽게 해.
- `FLUX.1`: 고품질 이미지 생성과 [로컬](/ko/wiki/local-llm/) 워크플로 쪽에서 자주 비교돼. API 중심인 DALL-E와 배포 방식 차이를 보기 좋아.
- [Stable Diffusion](/ko/wiki/stable-diffusion/): 오픈 생태계 대표축이야. DALL-E와 비교하면 클라우드 제품 중심과 [로컬](/ko/wiki/local-llm/) 커뮤니티 중심의 차이가 선명해져.
