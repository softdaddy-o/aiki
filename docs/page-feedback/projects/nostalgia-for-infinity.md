# Project Page Feedback: nostalgia-for-infinity

- Content path: `src/content/projects/ko/nostalgia-for-infinity.md`
- Public path: `/ko/projects/nostalgia-for-infinity/`
- Project name: NostalgiaForInfinity
- Short name: NIF
- Last reviewed: 2026-04-15
- Feedback status: active

## Persistent Constraints

- NIF 페이지도 프로젝트 페이지 공통 전략을 따른다. 제일 앞에서 "무엇을 할 수 있나"를 보여주고, 기본 정보와 주의점을 뒤로 미루지 않는다.
- 저장소, 라이선스, 기본 정보, 데이터/실행 범위, 권장 설정이 있다면 Project Card로 정형화한다.
- 암호화폐 트레이딩 봇 전략 페이지이므로 수익을 보장하거나 매수/매도 신호를 추천하는 톤을 피한다.
- 라이선스는 코드 라이선스와 거래소, Freqtrade, 데이터, 실제 운용 책임을 분리해서 설명한다.
- 백테스트, pairlist, timeframe, open trades, stablecoin stake currency 같은 조건은 "이 조건에서 문서가 권장하는 설정"으로 말하고, 성과 보장으로 쓰지 않는다.
- 쇼케이스가 있다면 yfinance에서 정리한 쇼케이스 패턴을 기본값으로 삼는다. 큰 풀-width 헤더, 그 아래 왼쪽 세로 플로팅 메뉴, 명확한 탭 affordance를 유지한다.
- NIF 특성상 주의점 섹션은 강하게 유지한다. 자동매매, 레버리지, 거래소 API 키, 수수료, 슬리피지, 시장 급변 리스크를 독자가 놓치지 않게 한다.

## Active Feedback

- id: FB-20260415-001
  status: active
  priority: must
  source: user
  captured: 2026-04-15
  appliesTo: process
  feedback: NIF 프로젝트가 추가되었으므로, 프로젝트 페이지별 피드백 저장소에 NIF도 독립적으로 보관할 수 있어야 한다.
  acceptance: NIF 콘텐츠 파일을 다시 쓸 때 `docs/page-feedback/projects/nostalgia-for-infinity.md`를 먼저 읽고, 페이지별 피드백을 반영한다.
  notes: 원격 `main`에서 실제 콘텐츠 slug가 `nostalgia-for-infinity`로 확인되었다.

- id: FB-20260415-002
  status: active
  priority: must
  source: implementation review
  captured: 2026-04-15
  appliesTo: compliance
  feedback: 암호화폐 자동매매 프로젝트는 기능 소개보다 운용 리스크와 책임 경계를 더 분명히 해야 한다.
  acceptance: 페이지에 수익 보장처럼 읽히는 문장이 없고, 주의점 섹션에서 실제 운용 리스크를 독립적으로 다룬다.
  notes:

## Resolved Or Superseded

- 없음

## Rewrite Checklist

- 실제 콘텐츠 경로와 공개 URL이 이 파일의 메타 정보와 맞다.
- NIF의 핵심 기능을 "무엇을 할 수 있나" 섹션으로 앞쪽에 정리했다.
- Project Card에 GitHub 저장소, 라이선스, 공식 문서, Freqtrade 기반, 권장 운용 조건을 정형화했다.
- 자동매매, 거래소 API 키, 수수료, 슬리피지, 시장 급변 리스크를 주의점에서 다뤘다.
- 쇼케이스가 있다면 yfinance의 플로팅 메뉴 패턴을 재사용하거나, 적용하지 않는 이유를 남겼다.
