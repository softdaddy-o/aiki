---
term: streamlit
title: "Streamlit"
lang: ko
summary: "앱 프로토타이핑과 인터페이스 제작 흐름을 연결하고 조립하는 프레임워크다. 여러 단계와 도구를 묶는 문맥에서 자주 나온다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
category: framework
aliases:
  - "Streamlit"
relatedTerms:
  - gradio
mentionCount: 0
draft: false
tags:
  - app
  - ui
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://github.com/streamlit/streamlit"
      title: "streamlit/streamlit"
    - url: "https://streamlit.io/"
      title: "Streamlit • A faster way to build and share data apps"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: Streamlit"
        - "분류 대조: 프레임워크"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "streamlit/streamlit (https://github.com/streamlit/streamlit)"
        - "Streamlit • A faster way to build and share data apps (https://streamlit.io/)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
앱 프로토타이핑과 인터페이스 제작 흐름을 연결하고 조립하는 프레임워크다. 쉽게 말하면 모델 기능을 바로 시험하고 데모 앱으로 묶는 인터페이스 레이어를 코드와 시스템 구조로 묶는 뼈대다.
## 실제로 무엇을 하나
결과를 직접 만드는 모델이라기보다 흐름을 묶는 틀에 가깝다. 프롬프트 입력, 출력 시각화, 상태 관리 같은 UI 층을 붙여 아이디어를 빠르게 확인하고 공유하게 만든다. 보통 프롬프트, 검색, 메모리, 실행 순서를 어떻게 묶는지가 핵심이 된다.
## 왜 중요한가
프로토타입 속도와 사용자 체감은 이런 인터페이스 층에서 크게 갈린다. 프레임워크는 모델 성능보다 개발 속도와 시스템 구조를 바꾸는 경우가 많아서, 그 차이를 알아야 도입 판단이 쉬워진다.
## 관련 용어
- [Gradio](/ko/wiki/gradio/) — 앱 프로토타이핑과 인터페이스 맥락을 같이 보면 이해가 쉽다.