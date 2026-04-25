---
title: "LightRAG"
slug: "lightrag"
lang: "ko"
category: "framework"
summary: "LightRAG는 문서에서 엔터티와 관계를 뽑아 지식 그래프와 벡터 검색을 함께 쓰는 RAG 프레임워크야."
readerValue: "이 페이지는 LightRAG가 그냥 벡터 RAG보다 나은 경우와, 오히려 과한 경우를 빨리 가르는 데 초점을 둬."
githubUrl: "https://github.com/HKUDS/LightRAG"
showcaseComponent: "lightrag"
tags: ["python", "rag", "knowledge-graph", "llm", "multimodal"]
stars: 33707
license: "MIT"
version: "v1.4.14"
contentStatus: "final"
draft: false
date: "2026-04-18"
edition: "ai"
factCheck:
  status: "passed"
  date: "2026-04-18"
  sources:
    - url: "https://api.github.com/repos/HKUDS/LightRAG"
      title: "GitHub REST API repository metadata for HKUDS/LightRAG"
    - url: "https://github.com/HKUDS/LightRAG"
      title: "LightRAG README"
    - url: "https://github.com/HKUDS/LightRAG/releases/tag/v1.4.14"
      title: "LightRAG v1.4.14 release"
    - url: "https://github.com/HKUDS/LightRAG/blob/main/docs/ProgramingWithCore.md"
      title: "Programming with LightRAG Core"
    - url: "https://github.com/HKUDS/LightRAG/blob/main/docs/AdvancedFeatures.md"
      title: "LightRAG advanced features"
  checks:
    - type: "source_match"
      result: "pass"
      sources: 5
      summary: "핵심 정의는 README와 코어 문서를 같이 보고 잡았어. LightRAG를 그냥 그래프 달린 검색기로 뭉개지 않고, 코어와 서버가 갈리는 구조까지 같이 설명되게 맞췄어."
      items:
        - "독자 문제 대조: 이 글은 '그래프형 RAG가 정말 필요한가'를 먼저 가르는 문서라서, README의 graph-based retrieval 설명과 core/server 분리 설명을 앞에 세워뒀어."
        - "README에서 먼저 확인한 건 LightRAG를 knowledge graph + vector retrieval 흐름으로 잡는다는 점이야. 그래서 본문 첫 문단도 그 정의부터 열었어."
        - "`Programming with LightRAG Core`를 보면 코어는 임베디드 앱이나 연구용에 더 가깝고, 외부 프로젝트 통합은 서버 REST API 쪽으로 방향을 잡게 돼."
    - type: "web_cross_check"
      result: "pass"
      sources: 5
      summary: "README, 코어 문서, advanced features, release 정보를 같이 대조했어. 기능 나열보다 '언제 이 복잡도를 감수할 가치가 생기는가'를 읽게 하려고 출처를 역할별로 나눠 봤어."
      items:
        - "비교 기준: 코어 vs 서버, 그래프 기반 retrieval, 멀티모달 확장, 운영 기능을 각각 다른 문서에서 나눠 봤어."
        - "README에서 먼저 잡히는 건 Server가 Web UI, API, 그래프 탐색, 간단한 질의 화면을 한 번에 묶는다는 점이야."
        - "`AdvancedFeatures`를 보면 Langfuse, RAGAS, graph export, RAG-Anything 경로가 따로 빠져 있어. 운영 기능과 확장 기능이 어디서 갈리는지 여기서 읽히더라."
        - "release와 README를 같이 놓고 보면 citation, document deletion, reranker, OpenSearch 같은 기능이 2025~2026 사이에 붙어 온 흐름이 보였어."
    - type: "number_verify"
      result: "pass"
      sources: 3
      summary: "숫자는 진짜 필요한 것만 다시 찍었어. 2026-04-18 기준 공개 값이고, 링크만 열면 바로 다시 확인할 수 있는 항목만 남겼어."
      items:
        - "GitHub REST API 기준 stars는 33,707이었어."
        - "최신 릴리스 태그는 v1.4.14였고, 공개 시점은 2026-04-12였어."
        - "README는 indexing 단계에서 최소 32B 모델과 32KB 이상 context를 권장하고, reasoning model은 여기엔 잘 안 맞는다고 눌러 적어뒀어."
    - type: "adversarial"
      result: "pass"
      sources: 4
      summary: "제일 큰 오해는 LightRAG를 넣으면 RAG 품질과 비용이 자동으로 해결된다고 믿는 쪽이야. 그래서 자동 절감 도구처럼 읽히는 부분은 따로 걸러뒀어."
      items:
        - "그래프가 얽히는 문서군이 아니면 LightRAG의 장점보다 인덱싱 비용과 운영 복잡도가 먼저 보일 수 있어."
        - "코어를 직접 끼워 넣으면 빨라 보이지만, 저장소가 권하는 건 서버 API 경로다. 여기서 방향을 잘못 잡으면 통합 비용이 커질 수 있어."
        - "README의 비교표는 재현 조건 안에서 읽어야 한다. 데이터셋과 모델 구성이 달라지면 체감 우위는 쉽게 바뀐다."
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
  contentHash: "ffba8aec99de96eb"
  reviewedAt: "2026-04-25T09:56:00Z"
---
## LightRAG가 뭐냐

LightRAG는 [RAG](/ko/wiki/rag/)에서 문서를 잘게 나눠 [embedding](/ko/wiki/embedding/)으로만 찾는 쪽에서 한 발 더 나가, 문서 안의 엔터티와 관계를 뽑아 지식 그래프를 같이 타는 프레임워크야. 질문이 들어오면 그래프와 벡터 검색을 함께 써서 답할 조각을 고르는 식이라고 보면 돼.

그래서 이 프로젝트의 포인트는 "검색 한 번 더 잘한다"보다 "문서 덩어리 안의 연결 구조를 유지한다"에 있어. 사람, 제품, 규정, 사건처럼 관계가 계속 엮이는 문서군이면 차이가 커지고, 그냥 문단 검색이면 이 복잡도가 과할 수 있어.

## 도입 먼저 가르면

LightRAG를 볼지 말지는 네 가지면 된다.

1. 문서가 길고, 관계가 많고, 같은 개체가 여러 문서에 반복해서 나온다.
2. 단순 [LLM](/ko/wiki/llm/) 질의응답보다 "누가 누구와 연결돼 있나" 같은 연결형 질문이 자주 나온다.
3. 인덱싱 단계에서 더 무거운 모델과 저장소 운영을 감수할 수 있다.
4. 그냥 벡터 검색만으로는 답이 자주 흐려진다는 불만이 이미 있다.

셋 이상이 `예`면 LightRAG를 볼 이유가 있다. 반대로 사내 문서 수가 적고, 질문도 거의 키워드 검색이나 요약 수준이면 그냥 벡터 RAG가 더 싸고 단순하다.

## 코어냐 서버냐

여기서 초보가 제일 많이 헷갈리는 게 코어와 서버 차이야.

- 코어는 앱 안에 직접 넣거나 연구용 실험을 할 때 본다.
- 서버는 Web UI, REST [API](/ko/wiki/api/), 그래프 탐색, 간단한 질의 인터페이스까지 한 번에 붙이고 싶을 때 본다.

저장소도 외부 프로젝트 통합에는 코어 직접 호출보다 서버 API 경로를 권하는 편이야. 빠르게 붙여야 하는 팀이면 서버부터 보는 게 보통 맞다.

## 잘 맞는 경우

첫 번째는 사내 위키나 제품 매뉴얼처럼 문서가 길고 연결이 많은 경우야.

- 예시: 제품명, 기능명, 오류 코드, 운영 절차가 문서 여러 군데에 반복해서 섞여 있는 경우.
- 여기서 볼 것: 특정 기능이 어느 장애 코드와 연결되는지, 한 문서가 아니라 문서 묶음 단위로 관계가 살아나는지.
- 실패 신호: 관계 질문이 거의 없고, 결국 문단 유사도 검색만 주로 쓰는 경우.

두 번째는 멀티모달 문서 적재를 같이 보려는 팀이야.

- 예시: PDF, 이미지, 오피스 문서, 표, 수식이 같이 들어오는 리서치 저장소.
- 여기서 볼 것: `RAG-Anything` 경로가 실제 파이프라인에 필요한지, citation과 삭제 후 재생성이 운영에 필요한지.
- 실패 신호: 결국 텍스트 문서만 다루고, 그래프 탐색 화면도 거의 안 보는 경우.

## 덜 맞는 경우

문서 수가 아직 적고, 질문도 "이 문단 어디 있지" 수준이면 LightRAG는 대체로 과하다. 이런 단계에선 그래프 추출과 저장소 관리 비용이 검색 품질 이득보다 먼저 느껴질 수 있어.

또 하나는 인덱싱 환경을 가볍게 가져가야 하는 팀이야. README 기준으로 indexing 단계에선 최소 32B 모델과 32KB 이상 context를 권장한다. 여기에 [reasoning](/ko/wiki/reasoning/) 모델은 indexing에 권장하지 않는다고 따로 적혀 있다. 지금 인프라가 여기까지 못 받쳐주면 시작부터 버거울 수 있어.

## 시작 전에 체크할 것

- 2026-04-18 기준 저장소 stars는 33,707이고 최신 릴리스는 [v1.4.14](https://github.com/HKUDS/LightRAG/releases/tag/v1.4.14)야.
- 스토리지는 PostgreSQL, MongoDB, Neo4j, OpenSearch 같은 경로를 붙일 수 있지만, 하나를 골랐다고 운영 난도가 사라지진 않아.
- 임베딩 모델은 인덱싱과 질의에 같은 기준을 유지해야 한다. 특히 벡터 차원을 바꾸면 저장 계층을 다시 만져야 할 수 있어.
- README의 성능 비교는 NaiveRAG, RQ-RAG, HyDE, GraphRAG 대비 재현 결과다. 그 수치를 바로 우리 문서에 가져오면 거의 틀릴 수 있어.
