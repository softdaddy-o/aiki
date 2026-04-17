---
term: chroma
title: "Chroma(크로마)"
lang: ko
summary: "Chroma(크로마)는 문서 임베딩과 메타데이터를 함께 저장해서 AI 앱의 retrieval를 바로 시작하게 도와주는 오픈소스 데이터 인프라야. RAG 프로토타입이나 코드 검색, 문서 검색처럼 벡터 검색을 빨리 붙여 볼 때 자주 등장해."
readerValue: "Chroma가 보이면 운영형 검색 엔진 전체보다 빠른 프로토타입용 retrieval 저장소인지 먼저 구분해 볼 수 있어."
category: tool
guideVersion:
  common: "1.0.0"
  wiki: "3.0.0"
aliases:
  - "Chroma(크로마)"
relatedTerms:
  - pinecone
  - weaviate
  - qdrant
  - rag
firstMentioned: "2026-04-09"
mentionCount: 1
draft: false
tags:
  - vector-db
  - retrieval
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://github.com/chroma-core/chroma"
      title: "chroma-core/chroma"
    - url: "https://docs.trychroma.com/"
      title: "Introduction - Chroma Docs"
  checks:
    - type: source_match
      result: pass
      summary: "오픈소스 AI 데이터 인프라라는 정의를 맞춰봤어."
      items:
        - "독자 문제 대조: Chroma를 AI용 retrieval를 쉽게 시작하게 해 주는 오픈소스 데이터 인프라로 설명했는지 확인했어."
        - "공식 문서의 built-in 시작점 메시지에 맞춰 프로토타입 친화적인 성격을 본문에 반영했어."
      findings:
        - "오픈소스 데이터 인프라"
        - "retrieval 시작점 강조"
    - type: web_cross_check
      result: pass
      summary: "깃허브와 문서가 겹치는 의미만 남겼어."
      items:
        - "비교 기준: 저장소 소개와 공식 문서가 둘 다 Chroma를 AI 데이터 인프라로 설명하는지 맞춰봤어."
        - "범위를 불필요하게 넓히지 않고 검색과 retrieval 중심이라는 공통분모만 유지했어."
      findings:
        - "AI 데이터 인프라 일치"
        - "retrieval 중심 유지"
    - type: number_verify
      result: pass
      summary: "성능 숫자는 넣지 않게 막았어."
      items:
        - "처리량, latency, 컬렉션 크기 같은 수치는 환경마다 달라서 본문에 적지 않았어."
        - "대신 프로토타입과 운영 성숙도 차이처럼 독자가 바로 써먹을 기준을 남겼어."
      findings:
        - "환경 의존 수치 미사용"
    - type: adversarial
      result: pass
      summary: "운영형 벡터 DB와 완전히 같다고 보는 오해를 줄였어."
      items:
        - "많이 하는 오해는 Chroma를 어떤 규모에서도 똑같이 맞는 만능 운영형 검색 엔진으로 보는 거야."
        - "본문에 프로토타입 장점과 운영 한계를 같이 적어서 선택 기준이 흔들리지 않게 했어."
      findings:
        - "프로토타입 강점"
        - "운영 한계 병기"
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.0.0"
    tone-editor: "1.0.0"
    structure-editor: "1.0.0"
  panelVerdict: pass
  reviewedAt: "2026-04-17"
---
## 한 줄 정의
Chroma는 AI용 검색과 retrieval 작업을 쉽게 시작하게 해 주는 오픈소스 데이터 인프라야. 문서, 메타데이터, 임베딩을 한데 저장해 두고 비슷한 의미의 항목을 빠르게 꺼내는 저장소라고 이해하면 돼.
## 어떻게 작동하나
문서와 메타데이터를 컬렉션에 넣고 임베딩을 저장해 두면, 질의가 들어왔을 때 벡터 유사도와 필터 조건을 조합해서 결과를 꺼내. 이렇게 찾은 내용을 RAG 컨텍스트나 검색형 앱의 후보군으로 넘기면 생성 모델이 바깥 정보를 더 쉽게 참조할 수 있어.
## 왜 중요한가
Chroma가 자주 언급되는 이유는 AI 프로토타입에서 retrieval 스택을 아주 빠르게 붙일 수 있게 해 주기 때문이야. 뉴스에서 이 이름이 보이면 벡터 검색이 연구용 개념을 넘어서 실제 제품 실험 단계까지 내려왔다는 신호로 읽을 수 있어.
## 주의해서 볼 점
Chroma는 시작이 쉬운 대신 큰 트래픽과 복잡한 운영 요구까지 전부 자동으로 해결해 주는 만능 해법은 아니야. 컬렉션 설계, 임베딩 품질, 검색 전략이 별로면 결과는 쉽게 흔들리고 운영 성숙도 면에서는 다른 선택지가 더 맞을 수도 있어.
## 관련 용어
- [pinecone](/ko/wiki/pinecone/)은 관리형 벡터 DB라서 서비스형으로 빠르게 운영하고 싶은 경우와 비교하기 좋아. Chroma는 직접 붙이는 오픈소스 감각이 더 강해.
- [weaviate](/ko/wiki/weaviate/)는 객체 구조와 더 넓은 플랫폼 감각을 가진 벡터 DB야. Chroma의 가벼운 시작점과 대비해서 보면 차이가 잘 보여.
- [qdrant](/ko/wiki/qdrant/)는 비슷한 층위의 검색 저장소라 API와 운영 감각 차이를 비교하기 좋아. 둘 다 retrieval 저장소지만 철학과 운영 포지션은 조금 달라.
- [rag](/ko/wiki/rag/)는 Chroma 같은 저장소가 실제 답변 생성 앞단에서 무슨 역할을 하는지 보여 줘. retrieval와 생성 모델을 한 흐름으로 이해하게 도와줘.