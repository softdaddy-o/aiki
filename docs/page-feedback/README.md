# Page Feedback Memory

이 디렉터리는 뉴스, 위키, 프로젝트 페이지별 피드백을 보관하는 곳이다. 목적은 페이지를 새 가이드나 새 템플릿에 맞춰 다시 쓸 때도 기존 피드백이 사라지지 않게 하는 것이다.

공개 콘텐츠 파일과 피드백 파일은 분리한다. 콘텐츠는 독자가 보는 결과물이고, 이 디렉터리의 피드백은 다음 리라이트에 반드시 반영해야 하는 내부 입력값이다.

## Directory Map

- `news/<slug>.md`: `src/content/news/ko/<slug>.md`에 대응한다.
- `wiki/<slug>.md`: `src/content/wiki/ko/<slug>.md`에 대응한다.
- `projects/<slug>.md`: `src/content/projects/ko/<slug>.md`에 대응한다.

각 타입에는 `_template.md`가 있다. 새 페이지 피드백을 처음 기록할 때는 해당 타입의 템플릿을 복사해서 시작한다.

## Status

- `active`: 다음 리라이트에 반드시 검토한다.
- `resolved`: 현재 페이지에 반영되었고 유지 여부만 확인한다.
- `superseded`: 더 최근 피드백이나 가이드가 대체했다.
- `discarded`: 명시적으로 적용하지 않기로 했다.
- `pending`: 콘텐츠 파일이나 원천 정보가 아직 워크트리에 없어서 대기 중이다.

## Priority

- `must`: 적용하지 않으면 페이지 품질 기준을 통과하지 못한다.
- `should`: 가능하면 적용해야 하며, 적용하지 않으면 이유를 남긴다.
- `nice`: 여유가 있을 때 반영한다.

## Workflow

1. 페이지 리뷰 중 나온 피드백은 즉시 `docs/page-feedback/<type>/<slug>.md`에 기록한다.
2. 뉴스, 위키, 프로젝트 페이지를 생성하거나 다시 쓸 때는 먼저 아래 순서로 읽는다.
   - 공통 tone 가이드: `docs/tone-guide-common.md`
   - 공통 구성 가이드: `docs/content-guide-common.md`
   - 타입별 가이드: `docs/content-guide-news.md`, `docs/content-guide-wiki.md`, `docs/content-guide-projects.md`
   - 페이지별 피드백: `docs/page-feedback/<type>/<slug>.md`
3. 충돌이 있으면 최신 `active` 피드백을 우선하되, 공개 품질이나 법적 주의사항과 충돌하면 이유를 남기고 조정한다.
4. 리라이트 후에는 피드백 파일의 `Applied in` 또는 `Notes`에 반영 여부를 적는다.
5. 같은 피드백이 반복되면 개별 페이지에만 남기지 말고 타입별 템플릿이나 상위 가이드로 승격한다.

## Entry Format

```md
- id: FB-YYYYMMDD-001
  status: active
  priority: must
  source: user
  captured: YYYY-MM-DD
  appliesTo: layout | copy | data | compliance | interaction | visual
  feedback: ...
  acceptance: ...
  notes: ...
```

## Rewrite Checklist

- 페이지별 피드백 파일이 있는가?
- `active`와 `pending` 항목을 모두 검토했는가?
- 라이선스, 출처, 주의점처럼 공개 리스크가 있는 항목을 다시 확인했는가?
- 사용자 톤 피드백이 본문, 카드, 탭, CTA까지 일관되게 반영되었는가?
- 적용하지 않은 피드백의 이유를 남겼는가?
