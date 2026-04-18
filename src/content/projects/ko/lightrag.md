---
title: "LightRAG"
slug: "lightrag"
lang: "ko"
category: "framework"
summary: "지식 그래프 추출, 다양한 스토리지 백엔드, Web UI와 API를 묶은 Python 기반 오픈소스 RAG 프레임워크"
readerValue: "LightRAG를 도입하려는 사람이 코어 라이브러리와 서버의 차이, 지원 스토리지, 멀티모달 확장, 실제 운영 전에 확인할 LLM·임베딩 조건을 한 번에 파악할 수 있습니다."
githubUrl: "https://github.com/HKUDS/LightRAG"
showcaseComponent: "generic"
tags: ["python", "rag", "knowledge-graph", "llm", "multimodal"]
stars: 33650
license: "MIT"
version: "v1.4.14"
contentStatus: "final"
draft: false
date: "2026-04-18"
edition: "ai"
---

## 무엇을 할 수 있나

- 문서를 넣으면 엔터티와 관계를 추출해 지식 그래프 기반으로 인덱싱하고, 그 결과를 질의 응답에 활용할 수 있어.
- `LightRAG Server`를 통해 Web UI, API, 지식 그래프 탐색 화면, 간단한 RAG 질의 인터페이스를 한 번에 띄울 수 있어.
- PostgreSQL, MongoDB, Neo4j, OpenSearch 같은 스토리지 백엔드를 붙여 저장 구조를 환경에 맞게 선택할 수 있어.
- `RAG-Anything` 연동으로 PDF, 이미지, 오피스 문서, 표, 수식까지 포함한 멀티모달 문서 처리 경로를 확장할 수 있어.
- 인용(citation), 문서 삭제 후 그래프 재생성, RAGAS 평가, Langfuse 트레이싱 같은 운영용 기능도 공식 README 기준으로 계속 추가되고 있어.

## 왜 LightRAG인가

LightRAG는 단순히 청크를 벡터 검색하는 형태에서 한 단계 더 가서, 문서 안의 엔터티와 관계를 뽑아 지식 그래프로 묶는 데 초점을 둔 RAG 프레임워크야. 그래서 문서 집합 안의 연결 구조를 같이 다루고 싶을 때 일반적인 벡터 검색형 RAG보다 설계 차이가 분명해.

또 하나 중요한 점은 코어 라이브러리와 서버가 나뉘어 있다는 거야. 코어는 임베디드 애플리케이션이나 연구용 실험에 가깝고, 실제 제품 연동에는 서버가 제공하는 REST API와 Web UI를 쓰는 쪽을 저장소에서도 권장하고 있어.

## 주요 기능

- **설치 경로 다양화**: `uv`, `pip`, Docker Compose 기준 설치 흐름이 README에 정리돼 있어.
- **서버 + UI 제공**: 문서 인덱싱, 그래프 탐색, 질의 응답을 브라우저 UI와 API로 동시에 다룰 수 있어.
- **코어 API 제공**: 예제 코드와 별도 문서로 `QueryParam`, LLM/임베딩 연동, reranker 주입, insert/delete/merge 같은 코어 기능을 설명해.
- **스토리지 확장성**: PostgreSQL, MongoDB, Neo4j, OpenSearch를 포함해 다양한 저장 계층을 붙일 수 있어.
- **운영 보조 기능**: citation, 평가(RAGAS), 관측(Langfuse), 멀티모달 처리 확장 경로가 이미 문서화돼 있어.

## 주의점

- **인덱싱 단계 LLM 요구사항이 높아**: README는 인덱싱용 모델로 최소 32B급 파라미터와 32KB 이상 컨텍스트를 권장하고, reasoning 모델은 인덱싱 단계에서 권장하지 않아.
- **임베딩 모델은 중간에 쉽게 바꾸기 어려워**: 인덱싱과 질의에 같은 임베딩 모델을 써야 하고, 특히 PostgreSQL 같은 스토리지는 벡터 차원 변경 시 관련 테이블을 다시 만들어야 할 수 있어.
- **코어와 서버 용도를 구분해야 해**: 저장소는 외부 프로젝트 통합에는 코어 직접 호출보다 서버 REST API 사용을 권장하고 있어.
- **성능 우위는 재현 조건을 봐야 해**: README에는 NaiveRAG, RQ-RAG, HyDE, GraphRAG 대비 재현 결과가 있지만, 실제 품질은 데이터셋과 모델 설정에 따라 달라져.
