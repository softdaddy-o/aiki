# Responsive checklist

모든 페이지 공통. 새로 만들거나 고친 뒤 이 리스트 전부 체크.

## CSS 규칙

- [ ] 단일 열 그리드: `grid-template-columns: minmax(0, 1fr)` (맨손 `1fr` 금지)
- [ ] 다열 그리드: 모든 트랙 `minmax(0, ...)` (예: `repeat(3, minmax(0, 1fr))`)
- [ ] 그리드·플렉스 자식 카드·래퍼: `min-width: 0`
- [ ] `<pre>`, `<code>`: `max-width: 100%; min-width: 0; overflow: auto`
- [ ] Hero H1 영문: `overflow-wrap: anywhere; word-break: break-word`
- [ ] Hero H1 clamp 상한: **≤ 6rem 권장, 최대 7rem**
- [ ] Hero H1 vw 값: **≤ 9vw**
- [ ] 한국어 본문: `word-break: keep-all`
- [ ] `100vw` 하드코드 피하고 `calc(100vw - Xpx)` 또는 `100%` 사용
- [ ] `backdrop-filter` 는 fixed 자식 필요한 요소에서 끄기
- [ ] 모바일(≤ 900) 쉘: 엣지 투 엣지 `max-width: 100%`, 적당한 side padding

## 브레이크포인트

최소 다음 4개 고려. 필요 시 추가.

- **1200**: 메타 그리드 4열 → 2열
- **1100**: Stage grid 다열 → 단열
- **900**: Shell 엣지 투 엣지 전환, 섹션 네비 가로 스크롤 전환
- **720**: Hero padding 축소, card-tabs 단일 열

## 측정 뷰포트

검증은 반드시 이 목록 전체에서:

- **360, 390**: 일반 모바일 (아이폰 SE, 아이폰 14)
- **768**: 태블릿 세로 (iPad)
- **1024**: 태블릿 가로 / 소형 노트북
- **1280, 1440**: 노트북
- **1920**: 데스크톱 FHD
- **2560**: 울트라와이드 / 고해상도

각 뷰포트에서:
- [ ] 가로 스크롤 없음 (`body.scrollWidth ≤ innerWidth + 1`)
- [ ] TRUE overflow(overflow:auto 스크롤 컨테이너 외부) 요소 0 개
- [ ] 텍스트 잘림 없음
- [ ] Hero 컬럼 침범 없음
- [ ] 하단 네비 아이콘 모두 보임

## 공통 안티패턴 체크

- [ ] `<pre>` 에 긴 한 줄 HTML 스니펫을 넣고 있다면, 카드 폭을 밀고 있지 않은가?
- [ ] `.hf-card { grid-column: 1 / -1 }` 같은 전체 폭 셀이 부모 그리드 폭을 결정하고 있진 않은가?
- [ ] `1fr` 이 섞여 있는 그리드 옆에 max-content 성향 형제가 있는가?
- [ ] `<section>` 에 `::before` 로 배경 full-bleed 를 시도할 때 부모 제약 해제는 되어 있는가?
