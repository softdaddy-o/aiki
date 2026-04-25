---
term: qwen3.5-27b-claude-4.6-opus-reasoning-distilled
title: >-
  Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled (쿠엔3.5-27B 클로드 4.6 오퍼스 리즈닝
  디스틸드)
lang: ko
summary: >-
  Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled는 Alibaba/Qwen 기반 위에 Jackrong이
  올린 커뮤니티 체크포인트야. Hugging Face에서 내려받아 로컬 런타임으로 돌리는 실험용 모델이지, Anthropic 공식 API
  모델은 아니야.
readerValue: '이 이름이 보이면 `Claude 무료판`으로 오해하지 않고, Qwen 기반 로컬 튜닝 모델인지 먼저 구분하는 데 도움 돼.'
category: model
modelType: version
parentModel: qwen3.5-27b
modelProfile:
  memoryUsage: >-
    27B 기반 체크포인트라 로컬 실험도 메모리 여유를 먼저 봐야 해. MLX 4bit나 GGUF처럼 양자화 변형이 같이 붙는 이유가 바로
    이 부담을 줄이려는 거야. 이렇게 보면 돼.
  implementation: >-
    Qwen3.5-27B를 바탕으로 Claude 4.6 Opus 스타일 reasoning을 흉내 내도록 커뮤니티가 만든
    distillation 체크포인트야. Anthropic의 공식 서비스 모델은 아니야. 이렇게 보면 돼.
  activeParameters: 기반 크기는 27B급으로 보면 돼. 별도 활성 파라미터 수치를 공식적으로 내건 체크포인트는 아니야. 이렇게 보면 돼.
  multimodalSupport: >-
    체크포인트 설명은 주로 텍스트 reasoning·coding 실험에 맞춰져 있어. 멀티모달 여부는 기반 Qwen 기능보다 실제 배포판
    설정을 먼저 확인해야 해.
  access: >-
    공식 API가 아니라 Hugging Face 체크포인트를 받아 직접 돌리는 경로가 기본이야. MLX, GGUF, vLLM 같은 서빙
    경로를 따로 골라야 해.
  pricing: 서비스형 토큰 과금이 아니라 직접 돌리는 체크포인트라 GPU·메모리 비용으로 계산하는 편이 맞아.
  weightsOpen: 커뮤니티 배포 weights 공개. 이렇게 보면 돼.
  vendor: Community checkpoint on Qwen base
aliases:
  - Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled
  - Qwopus
relatedTerms:
  - qwen3.5-27b
  - distillation
  - claude-opus-4-6
  - llama.cpp
  - gguf
firstMentioned: '2026-04-07T12:00:00+09:00'
mentionCount: 3
draft: false
tags:
  - qwen
  - distillation
  - gguf
  - local-llm
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: >-
        https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled
      title: Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled
    - url: >-
        https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks
      title: Detecting and Preventing Distillation Attacks
    - url: >-
        https://huggingface.co/mlx-community/Qwen3.5-27B-Claude-4.6-Opus-Distilled-MLX-4bit
      title: mlx-community/Qwen3.5-27B-Claude-4.6-Opus-Distilled-MLX-4bit
  checks:
    - type: source_match
      result: pass
      sources: 1
      summary: 커뮤니티 체크포인트라는 정체성과 본문 정의를 다시 맞춰봤어.
      items:
        - >-
          독자 문제 대조: 숫자보다 사용처와 제품 전략을 먼저 읽게 하려고, Claude라는 이름보다 Qwen 기반 커뮤니티
          체크포인트라는 점을 앞에 뒀어.
        - Jackrong 카드가 base model을 Qwen3.5-27B로 두고 SFT+LoRA 파이프라인을 적고 있는지 확인했어.
        - >-
          같은 카드가 final model을 `text-only`로 적고 있어서 멀티모달 만능처럼 쓰지 않게 본문도 그 범위 안에
          묶었어.
      findings:
        - >-
          Jackrong 카드에서 base model이 Qwen3.5-27B이고 training pipeline이 SFT+LoRA라고
          적힌 부분을 다시 봤어.
        - >-
          Model Introduction과 pipeline overview에서 Claude 공식 모델이 아니라 커뮤니티 파인튜닝
          체크포인트라는 점을 확인했어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 커뮤니티 카드와 Anthropic 공식 글을 맞대서 이름 때문에 생기는 오해를 줄였어.
      items:
        - >-
          비교 기준: Jackrong 모델 카드, MLX 커뮤니티 배포 카드, Anthropic의 distillation attacks
          글처럼 출처 성격이 다른 문서를 나눠서 봤어.
        - >-
          Jackrong 카드와 MLX 카드는 로컬 실험 경로와 사용성을 보여 주고, Anthropic 글은 `Claude` 이름을
          공식 계보처럼 읽으면 왜 위험한지 경계선을 줘.
        - '그래서 본문에서 장점은 커뮤니티 실험 범위로만 남기고, 법적 보증이나 공식 공급자 책임이 따라오는 뉘앙스는 빼 버렸어.'
      findings:
        - >-
          Anthropic 공식 글은 distillation을 API 남용·보안 이슈 맥락으로 다루고 있어서, 이 체크포인트를 공식
          Claude 계열로 읽으면 안 된다는 점을 다시 확인했어.
        - >-
          MLX 배포 카드는 variant별 로컬 실행 조건을 보여 주는 자료지, 원본 모델의 보편 스펙 문서는 아니라는 점을 따로
          남겼어.
    - type: number_verify
      result: pass
      sources: 2
      summary: 커뮤니티 카드에 적힌 실험 수치와 variant 요구 사항만 다시 맞춰봤어.
      items:
        - >-
          Jackrong 카드는 single RTX 3090 기준으로 Q4_K_M 약 16.5GB VRAM, 29~35 tok/s,
          262K context를 적고 있어서 community benchmark로만 취급했어.
        - >-
          MLX 커뮤니티 배포 카드는 최소 24GB unified memory, 권장 32GB+, 최종 크기 14GB라고 적어 놔서
          Apple Silicon variant 정보로만 남겼어.
        - >-
          이 숫자들은 모두 배포판과 실험 환경에 묶인 값이라서, Anthropic 공식 모델이나 원본 Qwen의 보편 조건처럼 확대하지
          않았어.
      findings:
        - 수치는 모두 커뮤니티 카드가 직접 적은 범위 안에서만 인용했어.
        - 실험 환경이 다르면 속도와 메모리 값이 달라질 수 있다는 경계도 그대로 남겼어.
    - type: adversarial
      result: pass
      sources: 3
      summary: 공식 Claude 서비스처럼 읽히는 표현과 만능 로컬 모델 과장을 막았어.
      items:
        - >-
          `이름에 Claude가 있으니 Anthropic 공식 모델`이라는 오해를 막으려고 배포 주체와 기반 모델을 계속 분리해서
          썼어.
        - '`text-only` 파이프라인을 확인했기 때문에 기반 Qwen의 이미지 기능을 그대로 기대하게 만드는 문장은 뺐어.'
        - >-
          Hugging Face Inference Provider가 비어 있는 상태라서, 바로 클라우드 서비스처럼 붙이면 된다는
          뉘앙스도 남기지 않았어.
      findings:
        - 가장 흔한 오해인 `Claude 무료판` 식 번역을 차단했어.
        - 실험용 로컬 체크포인트와 서비스용 공급자 모델의 경계를 분명히 남겼어.
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
formatVersion: 2
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
  contentHash: "1a40231f465c261c"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
이 모델은 Alibaba의 [Qwen3.5-27B](/ko/wiki/qwen3.5-27b/) 위에 Jackrong이 파인튜닝해서 올린 커뮤니티 체크포인트야. 이름에 [Claude](/ko/wiki/claude/)가 들어가지만 [Anthropic](/ko/wiki/anthropic/) 공식 모델이나 [Anthropic API](/ko/wiki/anthropic-api/)가 아니라, 특정 [Reasoning](/ko/wiki/reasoning/) 스타일을 [Distillation](/ko/wiki/distillation/)로 흉내 낸 [로컬](/ko/wiki/local-llm/) 실험용 [웨이트](/ko/wiki/weight/)라고 읽는 게 맞아. [Hugging Face](/ko/wiki/hugging-face/) [training](/ko/wiki/training/) pipeline overview도 최종 모델을 `text-only`로 적어 놔서, 기반 [Qwen](/ko/wiki/qwen/)의 [멀티모달](/ko/wiki/multimodal/) 인상을 그대로 가져오면 안 돼.
## 이 모델로 무엇을 할 수 있나
실제로는 [로컬](/ko/wiki/local-llm/) 코딩 [에이전트](/ko/wiki/agent/) 실험, 긴 단계 계획 짜기, 오프라인 문서 분석, 개발자용 프롬프트 템플릿 테스트 같은 데 먼저 붙여 볼 만해. Jackrong 카드에는 `developer` role을 보내는 현대 코딩 [에이전트](/ko/wiki/agent/) 환경에서 템플릿 충돌을 줄였고 thinking 모드를 꺼 두지 않았다고 적혀 있어. 또 MLX 4bit 배포본은 Apple Silicon Mac과 최소 24GB unified [memory](/ko/wiki/memory/), `mlx-lm` 실행 경로를 제시하니까, 서비스 배포보다 개인 장비에서 [런타임](/ko/wiki/runtime/)을 골라 실험하는 모델에 더 가깝다고 보면 돼.
## 왜 중요한가
이 이름이 중요한 이유는 `Claude급이 공짜로 풀렸다`보다 `Qwen 기반 로컬 튜닝 모델이 특정 추론 습관을 흉내 내도록 조정됐다`로 읽어야 하기 때문이야. [Anthropic](/ko/wiki/anthropic/)은 2026년 2월 23일 [distillation](/ko/wiki/distillation/) attacks 글에서 타사 모델 출력 증류를 공개적으로 문제 삼았으니, 이름에 [Claude](/ko/wiki/claude/)가 들어가도 공식 계보나 보증으로 받아들이면 안 돼. 그래서 실험용 체크포인트로는 흥미롭지만, 안정적인 공급자 책임과 SLA가 필요한 서비스라면 공식 [API](/ko/wiki/api/) 모델이나 원본 [Qwen](/ko/wiki/qwen/) 쪽이 더 안전해.
## 같이 보면 좋은 모델
- [Qwen3.5-27B](/ko/wiki/qwen3.5-27b/): 이 체크포인트가 어디서 출발했는지 원본 기반 모델부터 비교해 볼 수 있어.
- [Claude Opus 4.6](/ko/wiki/claude-opus-4-6/): 이름에 붙은 [Claude](/ko/wiki/claude/)가 공식 서비스에선 무엇을 뜻하는지 기준을 잡아 줘.
- [DeepSeek-R1](/ko/wiki/deepseek-r1/): [추론](/ko/wiki/inference/) 스타일을 앞세운 공개 모델이 실제 제품 전략과 어떻게 엮이는지 비교하기 좋아.
- [Gemma 4](/ko/wiki/gemma-4/): [로컬](/ko/wiki/local-llm/) 실험용 오픈 모델을 고를 때 배포 자유도와 생태계 안정성을 다른 방향으로 보여 줘.
