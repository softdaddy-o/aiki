---
title: Nemotron OCR v2
slug: nemotron-ocr-v2
lang: ko
category: model
modelType: version
summary: "GPU 서버형 구조 보존 OCR이 정말 필요한지 먼저 가르는, 다국어 문서용 모델."
readerValue: "GPU 서버형 구조 보존 OCR로 갈지, 아니면 PaddleOCR 계열이나 기존 OCR 스택에 남을지 가르는 기준."
githubUrl: "https://huggingface.co/nvidia/nemotron-ocr-v2"
showcaseComponent: "nemotron-ocr-v2"
tags:
  - ocr
  - vision
  - rag
  - multilingual
  - nvidia
relatedTerms:
  - multimodal
sourceMetric: 123
license: NVIDIA Open Model License
version: v2
modelProfile:
  memoryUsage: "공식 카드가 VRAM 사용량을 한 줄 수치로 요약하진 않아서 메모리 요구량을 단정하긴 어렵다. 대신 로컬 CPU 실험용보다 GPU 서버형 운영 전제를 먼저 보는 편이 맞아."
  implementation: "detector, recognizer, relational model을 묶어서 텍스트 추출과 읽기 순서, 레이아웃 관계를 함께 다루는 OCR 모델이야."
  activeParameters: "공개 소스 기준 활성 파라미터 수는 본문 핵심 판단 포인트로 제시되지 않았다. 여기서는 `v2_multilingual`과 `v2_english` 변형 차이가 운영 판단에 더 중요해."
  multimodalSupport: "문서와 이미지 입력을 다루지만, 범용 생성형 멀티모달보다 문서 OCR과 구조 추출 쪽 비중이 더 크다."
  access: "Hugging Face 모델 카드와 NVIDIA 블로그를 중심으로 접근하고, 기본 기준 배포본은 `v2_multilingual`로 읽으면 돼."
  pricing: "API 가격표가 중심인 서비스형 모델은 아니야. 운영 비용은 토큰 단가보다 NVIDIA GPU 서버와 CUDA 빌드 환경을 갖추는 쪽이 더 크게 작용한다."
  weightsOpen: "가중치 접근 경로는 공개돼 있지만 라이선스는 NVIDIA Open Model License라서 일반적인 완전 자유 오픈 웨이트와 같은 감각으로 보면 안 돼."
  vendor: NVIDIA
  variant: "`v2_multilingual`을 기본 기준으로 보고, 영어 전용 처리만 필요하면 `v2_english`를 별도 변형으로 분리해서 보면 된다."
  deploymentEnvironment: "로컬 CPU 실험보다 Linux amd64 기반 NVIDIA GPU 서버형 PoC나 운영 배포에 더 맞는다."
  hardwareRuntimeConstraints: "Linux amd64, NVIDIA GPU, CUDA toolkit, Python 3.12, C++ CUDA extension build 전제가 있다."
contentStatus: final
draft: false
date: "2026-04-19"
edition: "ai"
factCheck:
  status: passed
  date: "2026-04-19"
  sources:
    - url: "https://huggingface.co/blog/nvidia/nemotron-ocr-v2"
      title: "Building a Fast Multilingual OCR Model with Synthetic Data"
    - url: "https://huggingface.co/nvidia/nemotron-ocr-v2"
      title: "Nemotron OCR v2 model card"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "이 페이지의 기준 대상을 `nvidia/nemotron-ocr-v2` 모델 페이지가 가리키는 multilingual 기본 배포본으로 맞췄어."
      items:
        - "`Nemotron OCR v2` 기본 모델 페이지는 multilingual 배포본으로 읽는 편이 맞아."
        - "`v2_english`는 같은 계열의 별도 변형이라서, 영어 전용 범위와 multilingual 벤치마크를 섞지 않았어."
        - "사용 사례 설명은 RAG 파이프라인, 멀티모달 검색, 에이전트 애플리케이션처럼 모델 카드에 직접 나온 범위로만 적었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "두 출처가 모두 벤더 자료라 독립 비교 검증은 아니야. 그래서 본문 수치 근거는 NVIDIA가 직접 밝힌 범위로만 제한했고, 쇼케이스의 공개 데모나 로컬 실행은 성능 수치 증거로 쓰지 않았어."
      items:
        - "블로그와 모델 카드는 둘 다 GPU 가속 배포와 문서 구조 인식 용도를 말하지만, 타사 OCR과의 독립 비교 자료까지 주지는 않아."
        - "그래서 `34.7 pages/s`는 `v2_multilingual` 단일 A100 기준의 벤더 벤치마크로만 읽고, PaddleOCR류 대비 우열 근거로 확대하지 않았어."
        - "쇼케이스의 public Space와 local CUDA 관찰은 기능 확인용 서술로만 남기고, 속도나 VRAM 수치 근거로 취급하지 않았어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "벤더 문서에서 직접 확인 가능한 숫자만 검증했어. 공개 데모 응답 시간이나 로컬 VRAM처럼 자체 관찰 숫자는 여기서 검증된 근거가 아니라서 판단 근거에서 뺐어."
      items:
        - "블로그 기준 `v2_multilingual`은 단일 A100에서 `34.7 pages/s`를 제시해."
        - "블로그는 학습 데이터로 `12.2M synthetic training images`와 약 `680K real-world images`를 직접 적어."
        - "모델 카드는 설치 요구 사항으로 `Python 3.12`를 적어."
    - type: adversarial
      result: pass
      sources: 2
      summary: "현재 출처만으로는 구조 보존 OCR + GPU 서버 전제의 적합성까지는 말할 수 있어도, 다른 OCR보다 더 빠르거나 더 정확하다고 단정할 수는 없어."
      items:
        - "독립 비교가 없어서 이 페이지의 판단 기준은 속도 우열표보다 `텍스트만 추출` 대 `구조까지 적재`, `CPU/가벼운 GPU` 대 `NVIDIA GPU 서버`에 두었어."
        - "그래서 비교 섹션도 성능 승부보다 운영 전제와 후처리 부담 차이를 중심으로 정리했어."
    - type: adversarial
      result: pass
      sources: 2
      summary: "좋은 점만 적지 않고, 이 모델이 안 맞는 환경도 같이 적었어."
      items:
        - "CPU-only 환경이나 Mac 로컬 개발 머신 중심 팀이면 바로 쓰기 어렵다."
        - "언어별 경량 OCR만 필요하면 더 단순한 OCR 스택이 운영상 편할 수 있다."
        - "이 모델은 OCR 결과를 구조적으로 다루는 쪽에 강하고, 설치 부담은 그만큼 크다."
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  projects: "4.2.0"
reviewStamp:
  panelVersion: 1.1.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    projects: "4.2.0"
  panelVerdict: pass
  contentHash: "78b1749d743386b7"
  reviewedAt: "2026-04-25T09:56:00Z"
---
## 모델 정체성

Nemotron OCR v2는 문서와 이미지에서 텍스트를 읽고, 읽기 순서와 문단 관계까지 함께 정리하는 OCR 모델이야. GPU 서버에서 구조 보존 OCR을 돌릴 계획이 있으면 볼 가치가 있고, CPU 로컬이나 단순 텍스트 추출이 목적이면 여기서 멈춰도 된다.

NVIDIA는 `v2_multilingual` 기준 단일 A100에서 `34.7 pages/s`를 제시하지만, 여기서 먼저 볼 이유는 속도표 한 줄보다 구조 보존 OCR을 GPU 서버형으로 밀어 넣을 수 있느냐에 있다. 그래서 스캔 문서, 멀티컬럼 레이아웃, 혼합 언어 문서를 [RAG](/ko/wiki/rag/) 파이프라인에 바로 적재하려는 팀이 먼저 테스트할 이유가 생긴다.

모델 카드 기준 구조는 세 부분이야.

1. detector가 텍스트가 있는 위치를 찾고
2. recognizer가 텍스트를 읽고
3. relational model이 읽기 순서와 레이아웃 관계를 정리한다

이 조합 덕분에 그냥 텍스트 박스만 나열하는 OCR보다, 나중에 문단 단위로 다시 쓰기 쉬운 결과를 만들기 좋다.

## 모델 프로필

이 글의 기준 대상은 Hugging Face `nvidia/nemotron-ocr-v2` 모델 페이지가 가리키는 기본 배포본, 즉 `v2_multilingual`이야. 본문의 언어 범위와 `34.7 pages/s` 같은 수치도 이 변형 기준으로 읽으면 된다.

같은 계열에 `v2_english`도 있지만, 이건 영어 문서만 처리할 때 보는 별도 변형이야. 영어만 다루면 `v2_english`부터 시험해 볼 수 있고, 한국어나 혼합 언어 문서가 들어오면 `v2_multilingual`을 먼저 보면 된다.

접근 경로는 Hugging Face 모델 카드와 NVIDIA 블로그가 중심이고, 라이선스 표기는 NVIDIA Open Model License야. 실무에서는 일반적인 경량 OCR 라이브러리처럼 바로 가져다 붙이는 감각보다, 벤더 문서에 적힌 사용 조건과 배포 범위를 먼저 읽는 편이 안전하다.

배포 전제도 가볍지 않다. 모델 카드는 Linux amd64, NVIDIA GPU, CUDA toolkit, Python 3.12를 전제로 두고, 설치 흐름에는 C++ CUDA extension build가 들어간다. 실제 출발선은 로컬 CPU 실험이 아니라 GPU 서버형 PoC와 운영 배포다.

## 적합한 팀

Nemotron OCR v2는 GPU 서버에서 OCR을 빠르게 돌려 [RAG](/ko/wiki/rag/) 입력을 만들려는 팀이 먼저 볼 모델이야.

다음 중 두 개 이상이 맞으면 볼 이유가 있다.

1. 한국어 포함 다국어 문서를 한 모델로 처리하고 싶다.
2. PaddleOCR 같은 언어별 파이프라인을 따로 운영하기보다, 한 번에 묶어 관리하고 싶다.
3. OCR 결과를 검색용 텍스트뿐 아니라 레이아웃 정보까지 같이 다루고 싶다.
4. CPU 로컬 툴이 아니라 NVIDIA GPU 서버를 전제로 둔 운영이 가능하다.

반대로 "그냥 PDF에서 텍스트만 빨리 뽑으면 된다" 수준이면, 더 단순한 OCR 스택이 운영 부담이 적다.

## 핵심 근거

공식 블로그 기준으로 Nemotron OCR v2 multilingual은 단일 A100에서 34.7 pages/s를 제시해. 다만 이 수치는 NVIDIA가 공개한 벤더 [벤치마크](/ko/wiki/benchmark/)이고, PaddleOCR류나 hosted OCR API와의 독립 비교는 아직 없다. 그리고 블로그가 강조하는 포인트는 두 가지야.

1. 데이터: [학습](/ko/wiki/training/) 데이터로 12.2M synthetic training images와 약 680K real-world images를 함께 썼다.
2. 구조: detector backbone feature를 recognizer와 relational model이 다시 써서 속도를 끌어올렸다.

즉, 이 모델의 매력은 "정확도도 괜찮다"보다 "멀티링구얼 OCR을 구조 정보까지 포함해서 꽤 빠르게 돌릴 수 있다"에 있다.

## 도입 제약

여기서 가장 중요한 건 설치 제약이 생각보다 무겁다는 점이야. 모델 카드는 Linux amd64, NVIDIA GPU, CUDA toolkit, Python 3.12를 전제로 둬. 설치도 C++ CUDA extension을 빌드하는 흐름이라, CPU-only 개발 환경이나 Mac 로컬 머신 중심 팀이면 시작점부터 번거롭다.

그래서 도입 전에 볼 건 단순하다.

1. 우리 팀이 정말 GPU OCR 서버를 운영할 건가.
2. OCR 결과를 레이아웃까지 포함해 후속 처리에 쓸 건가.
3. 이 복잡도를 감수할 만큼 멀티링구얼 문서 적재가 중요한가.

이 질문에 확실히 "예"가 아니면, 더 가벼운 OCR 스택이 나을 가능성이 높다.

## 비교 축

독립 비교 수치가 없으니, 여기서는 성능표 한 줄보다 운영 전제와 결과물 형태를 기준으로 비교하는 편이 안전하다. PaddleOCR나 더 단순한 OCR 스택은 텍스트 추출이 우선이고, CPU나 상대적으로 가벼운 GPU 환경에서 빨리 붙여야 할 때 유리하다. [API](/ko/wiki/api/) 형태의 hosted OCR은 결과 JSON을 빨리 받는 쪽에 강하지만, 문단 관계나 읽기 순서까지 팀 기준으로 다듬는 제어권은 약하다. 언어별 파이프라인을 나눠도 괜찮고, 문단 관계나 읽기 순서까지 구조화해서 넘길 필요가 크지 않다면 이쪽이 실무에서 더 편하다.

반대로 Nemotron OCR v2 multilingual은 다국어 문서를 한 모델로 묶고, 읽기 순서와 레이아웃 관계를 같이 정리해서 [RAG](/ko/wiki/rag/)나 [멀티모달 AI](/ko/wiki/multimodal/) 검색 쪽 후처리 부담을 줄이려는 팀에 맞다. 비교 기준은 정확도 한 줄보다, 가벼운 추출이 필요한지 구조까지 담긴 문서 적재가 필요한지에 둔다.

## 최종 판단

Nemotron OCR v2는 OCR 정확도 한 줄보다, GPU 서버에서 다국어 OCR과 문서 구조 추출을 같이 밀어 넣는 문서 적재 경로로 먼저 봐야 한다. RAG, [멀티모달 AI](/ko/wiki/multimodal/) 검색, 에이전트 문서 파이프라인이 중심이면 볼 가치가 있고, 단순 OCR이면 과하다.
