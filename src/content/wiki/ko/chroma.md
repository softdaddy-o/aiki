---
term: chroma
title: "Chroma(크로마)"
lang: ko
summary: "Chroma(크로마)는 문서 임베딩과 메타데이터를 함께 저장해서 AI 앱의 retrieval를 바로 시작하게 도와주는 오픈소스 데이터 인프라야. RAG 프로토타입이나 코드 검색, 문서 검색처럼 벡터 검색을 빨리 붙여 볼 때 자주 등장해."
readerValue: "Chroma가 보이면 운영형 검색 엔진 전체보다 빠른 프로토타입용 retrieval 저장소인지 먼저 구분해 볼 수 있어."
category: tool
formatVersion: 2
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
  date: "2026-04-25"
  sources:
    - url: "https://github.com/chroma-core/chroma"
      title: "chroma-core/chroma"
    - url: "https://docs.trychroma.com/"
      title: "Introduction - Chroma Docs"
    - url: "https://docs.langchain.com/oss/python/integrations/vectorstores/chroma"
      title: "Chroma integration - Docs by LangChain"
    - url: "https://qdrant.tech/"
      title: "Qdrant - Vector Search Engine"
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: "핵심 정의를 Chroma 1차 출처와 독립 통합 문서에 맞춰 다시 대조하고, 독자가 prototype store와 운영형 검색 엔진을 혼동하지 않게 reader-problem도 같이 명시했어."
      items:
        - "독자 문제 대조: Chroma를 문서·메타데이터·임베딩을 함께 다루는 retrieval 저장소로 읽어야지, 권한 분리·백업·장기 운영까지 곧바로 해결하는 운영형 검색 엔진으로 읽으면 판단이 어긋난다는 점을 먼저 잡았어."
        - "GitHub 저장소 소개와 공식 문서 소개를 기준으로 문서, 메타데이터, 임베딩을 함께 다루는 구조를 확인하고 한 줄 정의에 그대로 반영했어."
        - "LangChain의 Chroma 통합 문서가 Chroma를 vector store로 소개하고 로컬·인메모리·persisted 실행 예시를 드는지 확인해서, 본문의 prototype store vs operations 비교축을 '빠르게 붙여 보는 retrieval 출발점' 수준으로 제한했어."
        - "공식 문서의 collection/query 흐름을 기준으로 질의 설명을 벡터 유사도와 메타데이터 필터 조합 수준으로 제한해서 과장된 기능 확장을 넣지 않았어."
      findings:
        - "GitHub 저장소와 README가 Chroma를 공개 프로젝트로 보여 줘서 오픈소스 서술 근거가 남아 있어."
        - "공식 문서가 document, embedding, metadata를 함께 넣는 사용 흐름을 설명해 핵심 정의를 지지해."
        - "LangChain 문서도 Chroma를 vector store 통합으로 다뤄서, 본문을 운영형 검색 엔진 전체로 과장하지 않는 쪽이 안전해."
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "Chroma 1차 출처에 LangChain과 Qdrant를 더해 독립 교차검증을 다시 구성했고, prototype store와 operations 엔진을 가르는 비교축을 명시했어."
      items:
        - "비교 기준: Chroma 공식 문서와 LangChain의 Chroma 통합 문서는 빠르게 붙이는 vector store·retrieval 흐름에 초점을 두고, Qdrant 홈페이지는 production-grade AI search를 전면에 두는지 대조해서 prototype store vs operations 엔진 축을 분명히 했어."
        - "독자 문제 대조: Chroma를 곧바로 운영형 검색 엔진 전체로 오해하기 쉬워서, 독립 출처에서 먼저 보이는 역할이 로컬·초기 retrieval 시작점인지 확인했어."
        - "Chroma 쪽 출처에서 공통으로 반복되는 collection/vector store 흐름만 본문 정의에 남기고, 권한 분리·백업·장기 운영 같은 운영 단어는 Qdrant처럼 생산 운영을 전면에 내세우는 제품 축과 구분했어."
        - "문서 검색과 코드 검색 예시는 Chroma와 LangChain 문서가 직접 다루는 retrieval 사용 장면 범위 안에서만 유지하고, 운영 우위 결론은 별도 비교 후보를 보는 판단으로 남겼어."
      findings:
        - "Chroma 공식 문서와 LangChain 문서는 모두 Chroma를 retrieval/vector store 흐름으로 설명해 기본 역할이 일치해."
        - "Qdrant는 production-grade search와 배포·보안·운영 기능을 전면에 두고 있어, Chroma 본문에서 비교축을 operations 쪽으로 분리할 근거가 생겨."
        - "운영형 검색 엔진과 동일하다는 서술은 Chroma 1차 출처와 독립 출처 어디에서도 직접 지지되지 않아 본문에서 decision cue로만 처리했어."
    - type: number_verify
      result: pass
      summary: "본문 숫자가 source-backed 성능 수치가 아니라 가정 예시라는 점을 문장 안에서 직접 밝히고, 공식 근거가 없는 숫자를 의사결정 기준처럼 쓰지 않게 정리했어."
      items:
        - "본문의 `1~2일`은 공식 구현 시간 약속이 아니라, 작은 자료 묶음으로 retrieval 흐름을 빠르게 검증하는 가정 예시라고 본문에서 직접 밝혔어."
        - "본문의 `문서 200~500개`와 `필터 2개`도 제품 한계치나 권장값이 아니라 초반 실험 장면을 설명하는 가정 예시라고 분명히 적었어."
        - "latency, QPS, 최대 컬렉션 크기처럼 공식 소스가 고정값으로 약속하지 않는 숫자는 본문 판단축으로 올리지 않았어."
      findings:
        - "측정값처럼 오해될 성능 숫자는 배제했어."
        - "구체 숫자는 독자 장면을 상상하게 하는 가정 예시로만 썼어."
        - "수치 앵커가 의사결정 기준과 직접 연결되도록 문맥을 붙였어."
    - type: adversarial
      result: pass
      summary: "Chroma를 만능 운영형 검색 엔진으로 읽는 오해를 막기 위해, 어디까지가 좋은 출발점이고 어디서부터 비교가 필요한지 반대 사례까지 적었어."
      items:
        - "가장 흔한 오해인 `Chroma 하나면 운영형 벡터 검색까지 다 된다`는 해석을 반례로 잡고 본문에서 먼저 끊었어."
        - "프로토타입용 retrieval 저장소와 운영형 검색 엔진을 구분하는 decision cue를 본문 본섹션에 올려 두어서 누가 써야 하고 누가 건너뛰어야 하는지 바로 보이게 했어."
        - "[Pinecone](/ko/wiki/pinecone/), [Qdrant](/ko/wiki/qdrant/), [Weaviate](/ko/wiki/weaviate/)를 운영 비교축으로 인라인 배치해 대체 후보를 숨기지 않았어."
      findings:
        - "Chroma는 빠른 실험 출발점이라는 장점이 분명해."
        - "권한, 백업, SLA 같은 운영 요구가 앞서면 다른 선택지 비교가 필요하다는 한계도 같이 남아 있어."
        - "프로토타입 장점과 운영 한계를 같은 단락에서 보여 줘 과도한 낙관 해석을 줄였어."
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
  contentHash: "0d186bedf1582fde"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
Chroma는 문서, 메타데이터, [임베딩](/ko/wiki/embedding/)을 함께 저장해 AI 앱의 retrieval를 빠르게 붙이는 오픈소스 저장소야. 특히 [RAG](/ko/wiki/rag/) 프로토타입에서 관련 문서를 다시 꺼내 오는 첫 retrieval 계층으로 이해하면 가장 정확해.
## 실제로 무엇을 하나
문서와 메타데이터를 컬렉션에 넣고 임베딩을 저장해 두면, 질의가 들어왔을 때 벡터 유사도와 필터 조건을 함께 써서 결과를 꺼내. 예를 들어 `lang=ko`와 `team=docs`처럼 필터 2개를 거는 장면은 기능 상한을 말하는 게 아니라, 메타데이터 조건을 곁들여 후보를 좁히는 가정 예시야. 이 흐름은 코드 검색에서 README, ADR, API 문서를 함께 묶어 맥락을 찾거나, 문서 검색에서 FAQ와 매뉴얼을 묶어 답변 후보를 만드는 장면에 잘 맞아.
## 왜 중요한가
Chroma가 자주 언급되는 이유는 retrieval 스택을 빠르게 붙여 보려는 프로토타입 단계에서 마찰이 낮기 때문이야. 여기서 `1~2일`은 공식 구축 시간 약속이 아니라, 작은 자료 묶음으로 retrieval 흐름을 빨리 붙여 [평가](/ko/wiki/eval/)해 보는 가정 예시야. 문서 `200~500개`도 공식 권장 규모가 아니라 사내 가이드나 저장소 문서를 한 컬렉션에 묶어 검색 품질 감을 먼저 보는 초기 실험 장면을 가리키는 숫자야. 그래서 이 이름이 보이면 운영형 검색 엔진 전체를 바로 사는 장면이라기보다, 검색 흐름을 먼저 검증하는 제품 실험 단계인지부터 읽어야 해.
## 주의해서 볼 점
판단 기준은 분명해. 지금 필요한 게 프로토타입용 retrieval 저장소인지, 아니면 권한 분리와 백업, 장기 운영까지 먼저 봐야 하는 운영형 검색 엔진인지를 먼저 갈라야 해. 이 축은 [Chroma 공식 문서](https://docs.trychroma.com/)와 [LangChain의 Chroma 통합 문서](https://docs.langchain.com/oss/python/integrations/vectorstores/chroma)가 빠른 retrieval 출발점을 설명하는 방식, 그리고 [Qdrant 소개](https://qdrant.tech/)가 production-grade search를 전면에 두는 방식을 비교해 보면 더 또렷해져. 한 팀이 검색 흐름을 빠르게 시험하는 단계라면 Chroma가 좋은 출발점이지만, 운영 성숙도와 비교가 먼저라면 [Pinecone](/ko/wiki/pinecone/), [Qdrant](/ko/wiki/qdrant/), [Weaviate](/ko/wiki/weaviate/) 같은 선택지를 같이 보는 편이 맞아. 즉 Chroma는 검색을 바로 붙여 보는 저장소 쪽에 가깝고, 운영 요구가 이미 분명한 팀이라면 건너뛰는 판단도 충분히 합리적이야.
