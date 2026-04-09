---
term: gguf
title: "GGUF"
lang: ko
summary: "오픈 모델과 로컬 배포 흐름을 연결하고 조립하는 프레임워크다. 여러 단계와 도구를 묶는 문맥에서 자주 나온다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
category: framework
aliases:
  - "GGUF"
relatedTerms:
  - llama.cpp
  - ollama
  - lm-studio
firstMentioned: "2026-03-03"
mentionCount: 3
draft: false
tags:
  - local-ai
  - model-format
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://github.com/ggerganov/llama.cpp/blob/master/gguf-py/README.md"
      title: "llama.cpp/gguf-py/README.md at master · ggml-org/llama.cpp"
    - url: "https://huggingface.co/docs/hub/gguf"
      title: "GGUF · Hugging Face"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: GGUF"
        - "분류 대조: 프레임워크"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "llama.cpp/gguf-py/README.md at master · ggml-org/llama.cpp (https://github.com/ggerganov/llama.cpp/blob/master/gguf-py/README.md)"
        - "GGUF · Hugging Face (https://huggingface.co/docs/hub/gguf)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
오픈 모델과 로컬 배포 흐름을 연결하고 조립하는 프레임워크다. 쉽게 말하면 모델을 직접 내려받아 운영하는 배포 층을 코드와 시스템 구조로 묶는 뼈대다.
## 실제로 무엇을 하나
결과를 직접 만드는 모델이라기보다 흐름을 묶는 틀에 가깝다. 웨이트, 포맷, 양자화, 런타임을 조합해서 원하는 환경에서 직접 돌리는 쪽에 가깝다. 보통 프롬프트, 검색, 메모리, 실행 순서를 어떻게 묶는지가 핵심이 된다.
## 왜 중요한가
비용, 지연 시간, 데이터 통제권을 직접 잡고 싶을 때 핵심이 되는 축이다. 프레임워크는 모델 성능보다 개발 속도와 시스템 구조를 바꾸는 경우가 많아서, 그 차이를 알아야 도입 판단이 쉬워진다.
## 관련 용어
- [llama.cpp](/ko/wiki/llama.cpp/) — 로컬 배포와 오픈 모델 맥락을 같이 읽게 해 준다.
- [Ollama](/ko/wiki/ollama/) — 추론 서빙과 운영 성능 맥락을 같이 읽게 해 준다.
- [LM Studio](/ko/wiki/lm-studio/) — 로컬 배포와 오픈 모델 맥락을 같이 읽게 해 준다.