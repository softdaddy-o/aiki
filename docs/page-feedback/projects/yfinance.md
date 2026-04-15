# Project Page Feedback: yfinance

- Content path: `src/content/projects/ko/yfinance.md`
- Public path: `/ko/projects/yfinance/`
- Last reviewed: 2026-04-15
- Feedback status: active

## Persistent Constraints

- AIKI의 글쓰기 톤을 유지한다. 설명은 직설적이고 실용적으로 쓰되, 과장된 마케팅 문장으로 흐르지 않는다.
- 제일 앞부분에 "무엇을 할 수 있나" 성격의 섹션을 둔다. 섹션명은 페이지 맥락에 맞게 제안할 수 있지만, 기능과 사용 가능성을 먼저 보여줘야 한다.
- GitHub 기본 정보는 독립 링크 CTA가 아니라 히어로 근처의 정형화된 Project Card로 보여준다.
- Project Card에는 저장소 성격, 라이선스, 기본 정보, 데이터 범위, 주의할 제약을 함께 둔다.
- "공식 임베드를 못했다"거나 구현 한계를 변명하는 문장은 공개 페이지에 쓰지 않는다.
- 라이선스와 주의점 섹션은 필요하다. 코드 라이선스와 데이터 제공자 약관/사용 책임은 분리해서 설명한다.
- 쇼케이스는 본문 설명 아래쪽에 둔다. 본문과 쇼케이스 사이에는 명확한 구분선이나 헤더가 필요하다.
- `Interactive Showcase`는 쇼케이스의 큰 풀-width 헤더로 보이게 한다.
- 쇼케이스 안의 검은색 헤더나 서브헤더는 `Interactive Showcase`보다 작게 조율한다.
- 플로팅 메뉴는 쇼케이스 영역 왼쪽에 세로로 둔다. 쇼케이스보다 위로 올라가면 안 되고, 풀-width `Interactive Showcase` 헤더 바로 아래부터 시작한다.
- 탭을 누르면 다양한 정보가 바뀐다는 점이 보여야 한다. 원본 `soft-yfinance-sample`처럼 플로팅되는 버튼 패턴을 재사용 가능한 템플릿으로 발전시킬 수 있다.

## Active Feedback

- id: FB-20260415-001
  status: active
  priority: must
  source: user
  captured: 2026-04-15
  appliesTo: layout
  feedback: GitHub 아이콘이 있던 위치에 GitHub 정보 카드를 옮긴다. 별도 GitHub 링크 버튼은 빼고, 라이선스와 기본 정보도 그 카드에 포함한다.
  acceptance: Project Card가 히어로 근처에서 저장소/라이선스/기본 정보를 한 번에 보여주며, 별도 "GitHub 링크" CTA가 강조되지 않는다.
  notes:

- id: FB-20260415-002
  status: active
  priority: must
  source: user
  captured: 2026-04-15
  appliesTo: copy
  feedback: 글쓰기 톤을 AIKI 톤으로 맞춘다. 라이선스와 기본 정보도 Model Card처럼 정형화한다.
  acceptance: 카드와 본문 모두 과장된 홍보 문구보다 판단 가능한 정보 중심으로 작성되어 있다.
  notes:

- id: FB-20260415-003
  status: active
  priority: should
  source: user
  captured: 2026-04-15
  appliesTo: copy
  feedback: 공식 임베딩 스크립트가 없거나 사용하지 않았다는 설명은 공개 페이지에서 굳이 말하지 않는다.
  acceptance: 페이지에 구현 한계 변명처럼 읽히는 문장이 없다.
  notes:

- id: FB-20260415-004
  status: active
  priority: must
  source: user
  captured: 2026-04-15
  appliesTo: layout
  feedback: 쇼케이스 섹션은 제일 아래로 옮기고, 여기서부터 쇼케이스라는 점이 명확한 구분선이나 헤더를 둔다.
  acceptance: 일반 설명 섹션을 모두 읽은 뒤 쇼케이스가 시작되며, 시각적으로 다른 영역임을 바로 알 수 있다.
  notes:

- id: FB-20260415-005
  status: active
  priority: must
  source: user
  captured: 2026-04-15
  appliesTo: interaction
  feedback: 쇼케이스 탭은 다양한 정보가 열린다는 점이 드러나야 한다. 왼쪽 세로 플로팅 버튼 패턴을 사용하고, 쇼케이스 영역보다 위로 올라가지 않게 한다.
  acceptance: 데스크톱에서 플로팅 메뉴가 쇼케이스 왼쪽에 세로로 보이고, `Interactive Showcase` 풀-width 헤더 바로 아래부터 시작한다.
  notes:

## Resolved Or Superseded

- 없음

## Rewrite Checklist

- Project Card에 저장소, 라이선스, 기본 정보, 데이터 범위가 정리되어 있다.
- "무엇을 할 수 있나" 성격의 섹션이 페이지 앞부분에 있다.
- 주의점 섹션이 남아 있고, 투자/데이터 사용 책임을 분명히 한다.
- 쇼케이스는 페이지 하단에 있으며 `Interactive Showcase` 헤더가 풀-width로 시작한다.
- 플로팅 메뉴는 쇼케이스 최상단 영역의 왼쪽에 있고, 탭 전환이 시각적으로 명확하다.
