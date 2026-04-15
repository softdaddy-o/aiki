---
title: "yfinance"
slug: "yfinance"
lang: "ko"
category: "library"
summary: "Yahoo Finance 데이터를 Python에서 다루기 쉽게 가져오는 오픈소스 금융 데이터 라이브러리"
readerValue: "실시간에 가까운 시세, 과거 가격, 재무제표, 옵션, 스크리너 데이터를 하나의 Python 인터페이스로 탐색하는 법을 볼 수 있습니다."
githubUrl: "https://github.com/ranaroussi/yfinance"
showcaseComponent: "yfinance"
tags: ["python", "finance", "market-data", "api"]
stars: 22996
license: "Apache-2.0"
draft: false
date: "2026-04-15"
edition: "ai"
---

## 왜 yfinance인가

yfinance는 Yahoo Finance의 공개 데이터를 Python 코드에서 바로 다룰 수 있게 해주는 라이브러리입니다. 개별 종목의 가격과 기본 정보뿐 아니라 과거 가격, 배당과 액면분할, 재무제표, 애널리스트 리서치, 옵션 체인, 시장 스크리너까지 한 인터페이스에서 확인할 수 있습니다.

정식 거래소 피드나 유료 데이터 공급자를 대체하는 도구는 아니지만, 리서치 노트 작성, 백테스트 초안, 시장 데이터 파이프라인 프로토타입에는 충분히 빠르게 쓸 수 있습니다.

## 핵심 기능

- **Ticker 기본 정보**: 가격, 거래소, 통화, 시가총액, 52주 범위
- **히스토리 데이터**: 일간, 주간, 월간 과거 가격과 스파크라인 렌더링
- **재무제표**: 손익계산서, 대차대조표, 현금흐름표 요약
- **배치 다운로드**: 여러 종목의 가격 행렬을 한 번에 수집
- **Discovery**: 검색, Lookup, 스크리너, 시장 개요
- **파생상품과 펀드 데이터**: 옵션 체인, ETF 보유 종목, 펀드 메타데이터

## 쇼케이스에서 보는 것

아래 대시보드는 빌드 타임에 Python 스크립트가 생성한 JSON을 읽어 렌더링합니다. 미국, 한국, 일본, 유럽, 인도, ETF, 암호화폐, 외환, 원자재 예시를 함께 보여주고, 개별 종목 딥다이브에서는 yfinance가 제공하는 여러 API 표면을 한 번에 비교합니다.
