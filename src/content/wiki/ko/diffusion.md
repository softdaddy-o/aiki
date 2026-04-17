---
term: diffusion
title: Diffusion Model(확산 모델)
lang: ko
summary: >-
  Diffusion Model은 잡음에 가까운 상태에서 시작해 노이즈를 조금씩 걷어내며 새 샘플을 만드는 생성 모델 계열이야. 이미지 생성에서
  특히 유명하지만, 핵심은 제품명이 아니라 생성 방식 자체야.
readerValue: Diffusion Model을 알면 이미지 AI 기사에서 회사 이름보다 샘플링 방식과 배포 형태 차이가 왜 중요한지 먼저 볼 수 있어.
category: concept
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - diffusion model
relatedTerms:
  - stable-diffusion
  - dall-e
  - flux
  - imagen
firstMentioned: '2026-02-23'
mentionCount: 3
draft: false
tags:
  - image-generation
  - generative-ai
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Diffusion_model'
      title: Diffusion model
    - url: 'https://stability.ai/blog/stable-diffusion-public-release'
      title: Stable Diffusion Public Release &mdash; Stability AI
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: 확산 모델의 기본 작동 원리를 다시 맞춰봤어.
      items:
        - '독자 문제 대조: Diffusion Model을 특정 제품명이 아니라 노이즈를 제거하며 샘플을 만드는 생성 방식으로 설명했어.'
        - 초기 DDPM 설명의 핵심인 forward noise 과정과 reverse sampling 과정을 본문 구조에 반영했어.
        - Stable Diffusion 같은 제품 이름과 알고리즘 이름을 분리해 읽게 만들었어.
      findings:
        - 이 페이지는 제품명이 아니라 생성 메커니즘을 먼저 잡는 게 핵심이었어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 연구 설명과 실제 제품 생태계를 같이 맞춰봤어.
      items:
        - '비교 기준: 확산 모델을 이론 개념으로만 둘지, 실제 이미지 생성 제품들과 연결된 생성 방식으로 설명할지 맞춰봤어.'
        - >-
          DDPM 계열 설명은 노이즈 추가와 제거 흐름을 보여 주고, 허깅페이스 코스는 교육용 구조를 정리해 주며, Stability
          글은 실제 배포 생태계를 보여 줬어.
        - 그래서 본문도 원리와 실사용 문맥을 같이 넣는 쪽으로 정리했어.
      findings:
        - 원리와 생태계를 같이 봐야 독자가 브랜드명에 덜 끌려가.
    - type: number_verify
      result: skip
      sources: 2
      summary: 특정 스텝 수나 VRAM 숫자는 모델마다 달라서 일반 설명에서 줄였어.
      items:
        - >-
          Stable Diffusion 공개 글의 VRAM 숫자 같은 값은 특정 모델 버전에 묶여 있어서, Diffusion Model
          일반 설명에서는 뺐어.
        - 확산 단계 수 역시 구현마다 달라서 '여러 스텝으로 복원한다'는 구조만 남겼어.
      findings:
        - 숫자를 붙이면 오히려 특정 제품 설명처럼 좁아져서 줄였어.
    - type: adversarial
      result: pass
      sources: 3
      summary: 확산 모델을 곧바로 특정 브랜드와 동일시하는 오해를 막았어.
      items:
        - Stable Diffusion과 Diffusion Model을 같은 말처럼 쓰지 않도록 분리했어.
        - 모든 이미지 생성 모델이 확산 방식이라는 식의 일반화도 피했어.
        - 확산 모델이면 무조건 느리거나 무조건 고품질이라는 단정도 막았어.
      findings:
        - 브랜드명과 알고리즘명을 섞는 오해가 제일 흔해서 그 지점을 먼저 정리했어.
---
## 한 줄 정의
Diffusion Model은 무작위 잡음에 가까운 상태에서 출발해서 점차 노이즈를 걷어내며 새 데이터를 만드는 생성 모델이야. 한 장의 이미지를 바로 뽑아내기보다, 여러 스텝을 거쳐 점점 또렷한 결과로 복원해 가는 방식이라고 보면 돼.
그래서 이 말은 특정 회사 제품명이 아니라 생성 메커니즘 이름이야. Stable Diffusion 같은 건 그 위에 올라간 구체적인 모델이나 브랜드라고 생각하면 이해가 쉬워.
## 어떻게 작동하나
초기 연구와 교육 자료 기준으로 확산 모델은 크게 두 흐름으로 이해하면 돼. 학습할 때는 원본 데이터에 조금씩 노이즈를 섞어 망가지는 과정을 배우고, 생성할 때는 그 반대 방향으로 노이즈를 줄여 가며 샘플을 복원해.
이미지 생성에서는 여기에 텍스트 조건을 같이 넣어서 원하는 스타일이나 내용을 유도해. 그래서 프롬프트를 바꾸면 같은 시작 잡음에서도 전혀 다른 결과가 나올 수 있어.
## 왜 중요한가
이미지 생성 뉴스를 읽을 때 결과물 이름만 보면 핵심을 놓치기 쉬워. Diffusion Model을 이해하면 Stable Diffusion, FLUX, Imagen 같은 이름이 보여도 결국 비슷한 생성 철학 위에서 어떤 구현, 라이선스, 배포 전략을 택했는지 읽기 쉬워져.
또 이 계열은 품질뿐 아니라 샘플링 속도와 제어 방식도 중요해. 그래서 같은 '이미지 생성 AI'라도 사용감이 크게 갈리는 이유를 설명해 줘.
## 주의해서 볼 점
확산 모델이라고 해서 전부 같은 속도나 품질을 내는 건 아니야. 스텝 수, 스케줄러, 조건 제어 방식, 라텐트 구조 같은 요소에 따라 실제 체감이 크게 달라져.
또 제품명과 모델 구조 이름을 같은 말처럼 섞으면 금방 헷갈려. 기사에서 '확산 모델'이 나오면 알고리즘을 말하는 건지, 특정 제품군을 말하는 건지 먼저 나눠서 봐야 해.
## 관련 용어
- [stable-diffusion](/ko/wiki/stable-diffusion/): 확산 모델이 실제 오픈 모델 생태계로 퍼진 대표 사례야. 구조 이름과 브랜드 이름을 나눠 보는 데 가장 좋아.
- [dall-e](/ko/wiki/dall-e/): 이미지 생성 제품 이름으로 많이 알려져 있어. 생성 방식 설명과 서비스 이름 설명이 어떻게 다른지 대비해서 보기 좋아.
- [flux](/ko/wiki/flux/): 최신 이미지 생성 경쟁 문맥에서 자주 같이 나오는 이름이야. 같은 확산 계열 안에서도 구현과 배포 전략이 다르다는 걸 보여 줘.
- [imagen](/ko/wiki/imagen/): 연구와 제품 사이 문맥에서 자주 거론되는 이미지 모델 이름이야. 회사 브랜드보다 생성 방식이 먼저라는 감각을 잡는 데 도움이 돼.
