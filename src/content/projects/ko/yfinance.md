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
factCheck:
  status: "pending"
  date: "2026-04-20"
  sources:
    - url: "https://github.com/ranaroussi/yfinance"
      title: "ranaroussi/yfinance GitHub repository"
    - url: "https://pypi.org/project/yfinance/"
      title: "yfinance on PyPI"
    - url: "https://ranaroussi.github.io/yfinance/"
      title: "yfinance documentation"
  checks:
    - type: "source_match"
      result: "pass"
      sources: 3
      summary: "프로젝트 소개, 핵심 기능, 설치 경로를 GitHub 저장소, PyPI, 공식 문서 기준으로 다시 맞춰뒀어."
      items:
        - "Ticker, Tickers, download, Search, Sector/Industry, Screener 흐름이 PyPI 설명과 문서 예시 기준으로 맞아."
        - "이 페이지의 '시장 샘플, 묶음 조회, 검색과 탐색, 종목 상세' 구성은 실제 문서에 있는 공개 API 범위를 넘겨 말하지 않게 조정했어."
    - type: "web_cross_check"
      result: "pass"
      sources: 3
      summary: "연구용 오픈소스 라이브러리라는 설명과 데이터 이용 주의 문구를 공식 문서 쪽 표현과 교차 확인했어."
      items:
        - "PyPI와 문서 모두 yfinance가 Yahoo의 공개 API를 활용하는 연구·교육용 도구라고 적고 있어."
        - "Yahoo 데이터 이용 조건은 별도로 확인해야 한다는 경고도 PyPI와 문서에 같이 들어 있어."
    - type: "number_verify"
      result: "pass"
      sources: 2
      summary: "별 개수나 릴리스 같은 숫자는 시점 의존 값이라 고정 사실로 과장하지 않도록 메타 카드와 팩트 체크를 분리했어."
      items:
        - "이 페이지의 stars 표시는 카탈로그 시점 스냅샷이므로 배포 전 다시 확인하는 전제가 붙어."
        - "핵심 판단은 숫자보다 기능 범위와 법적 주의사항 쪽에 두는 편이 안전해."
---

## 뭘 해볼 수 있나

- 관심 종목의 최근 가격, 거래량, 52주 범위, 시가총액 같은 기본 시장 데이터를 빨리 확인할 수 있어.
- 여러 종목을 한 번에 다운로드해서 리서치 표, 작은 대시보드, 백테스트 초안에 바로 넣어볼 수 있어.
- 배당, 액면분할, 재무제표, <span class="term-hint"><span class="term-hint__label">옵션 체인</span><button class="term-hint__button" type="button" aria-label="용어 설명 보기">?</button><span class="term-hint__tooltip">특정 만기와 행사가별로 콜옵션과 풋옵션 가격을 묶어 보여주는 표야. 옵션 시장 분위기를 볼 때 자주 써.</span></span>, ETF 보유 종목처럼 가격 밖의 데이터도 한 흐름으로 비교할 수 있어.
- 한국, 미국, 암호화폐, ETF, 외환, 원자재처럼 서로 다른 시장 샘플을 같은 스키마로 다루는 감각을 잡을 수 있어.
- 정식 데이터 벤더를 붙이기 전, 제품 아이디어나 분석 파이프라인의 모양을 빠르게 검증할 수 있어.

## 왜 yfinance인가

yfinance는 Yahoo Finance의 공개 데이터를 Python 코드에서 바로 다룰 수 있게 해주는 라이브러리야. 개별 종목의 가격과 기본 정보뿐 아니라 과거 가격, 배당과 액면분할, 재무제표, 애널리스트 리서치, 옵션 체인, 시장 <span class="term-hint"><span class="term-hint__label">스크리너</span><button class="term-hint__button" type="button" aria-label="용어 설명 보기">?</button><span class="term-hint__tooltip">정해 둔 조건으로 관심 종목 후보를 한 번에 걸러 주는 검색 도구야. 거래량, 등락률, 섹터 같은 기준을 많이 써.</span></span>까지 한 인터페이스에서 확인할 수 있어.

정식 거래소 피드나 유료 데이터 공급자를 대체하는 도구는 아니야. 대신 리서치 노트 작성, 백테스트 초안, 시장 데이터 파이프라인 프로토타입처럼 빠른 탐색이 중요한 작업에는 꽤 잘 맞아.

## 핵심 기능

- **Ticker 기본 정보**: 가격, 거래소, 통화, 시가총액, 52주 범위
- **히스토리 데이터**: 일간, 주간, 월간 과거 가격과 스파크라인 렌더링
- **재무제표**: 손익계산서, 대차대조표, 현금흐름표 요약
- **배치 다운로드**: 여러 종목의 가격 행렬을 한 번에 수집
- **탐색 도구**: 검색, 조회, 스크리너, 시장 개요
- **파생상품과 펀드 데이터**: 옵션 체인, ETF 보유 종목, 펀드 메타데이터

## 주의점

- **투자 조언이 아니야**: 쇼케이스의 가격, 재무, 옵션, 스크리너 데이터는 기능 설명용이야. 매매 판단에는 거래소, 공시, 증권사, 유료 데이터 벤더 같은 1차 출처를 다시 확인해야 해.
- **코드 라이선스와 데이터 조건은 별개야**: yfinance 코드는 Apache-2.0이지만 Yahoo Finance 데이터 사용 조건까지 자동으로 해결되는 건 아니야. 제품이나 고객 서비스에 데이터를 노출하려면 Yahoo의 데이터 이용 조건과 사내 컴플라이언스 기준을 따로 봐야 해.
- **데이터가 지연되거나 비어 있을 수 있어**: 종목, 거래소, 자산군에 따라 실시간성, 조정주가, 통화, 시간대, 재무제표 필드가 다르게 들어올 수 있어.
- **API 안정성을 보장하지 않아**: Yahoo Finance의 공개 엔드포인트 구조가 바뀌면 yfinance 호출도 깨질 수 있어. 운영 서비스라면 캐시, 재시도, 장애 대응, 대체 데이터 소스를 같이 설계해야 해.
- **대량 호출은 조심해야 해**: 무리한 반복 요청은 차단, 지연, 불완전한 응답으로 이어질 수 있어. 배치 수집은 간격 제한과 로컬 캐시를 두고 실행하는 편이 안전해.
