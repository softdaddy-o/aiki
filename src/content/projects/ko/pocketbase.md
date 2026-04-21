---
title: PocketBase
slug: pocketbase
lang: ko
category: framework
summary: 'PocketBase는 SQLite, 인증, 파일, realtime, admin UI를 한 바이너리에 묶은 Go 백엔드다.'
readerValue: '이 페이지는 PocketBase를 지금 바로 내부툴이나 소규모 서비스에 붙일지, 아니면 더 무거운 managed backend로 갈지 빠르게 가르기 위한 판단판이다.'
githubUrl: 'https://github.com/pocketbase/pocketbase'
showcaseComponent: pocketbase
tags:
  - go
  - sqlite
  - realtime
  - admin-ui
  - rest-api
stars: 57756
license: MIT
version: v0.37.2
contentStatus: final
draft: false
date: '2026-04-21'
edition: ai
factCheck:
  status: passed
  date: '2026-04-21'
  sources:
    - url: 'https://github.com/pocketbase/pocketbase'
      title: PocketBase repository page
    - url: 'https://github.com/pocketbase/pocketbase/blob/master/README.md'
      title: PocketBase README
    - url: 'https://github.com/pocketbase/pocketbase/releases/tag/v0.37.2'
      title: PocketBase v0.37.2 release
    - url: 'https://pocketbase.io/docs/'
      title: PocketBase documentation
  checks:
    - type: source_match
      result: pass
      sources: 4
      summary: 'README와 공식 docs를 다시 맞춰봤어. PocketBase는 Go 백엔드에 SQLite, realtime, files, users, admin UI를 한 파일로 묶는 쪽으로 읽는 게 맞아.'
      items:
        - 'README는 PocketBase를 embedded SQLite, realtime subscriptions, files and users management, Admin dashboard UI, REST-ish API를 포함한 open source Go backend로 소개한다.'
        - 'standalone 경로는 prebuilt executable을 받아 `./pocketbase serve`로 시작하는 흐름을 직접 제시한다.'
        - 'Go toolkit 경로는 `pocketbase.New()`와 `app.OnServe()`를 써서 custom route를 붙이는 최소 예시를 README에 같이 둔다.'
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 'repo 설명과 docs 흐름은 같은 방향이야. 빠른 standalone 시작 뒤 필요할 때 Go나 JS로 확장하는 구조가 일관되게 나온다.'
      items:
        - 'README는 prebuilt executable이 `examples/base/main.go` 기반이라고 적는다.'
        - 'README와 docs는 Go overview와 JS hooks 경로를 따로 안내한다.'
        - '공식 release를 바로 띄우고 그 위에 custom route와 hook을 얹는 흐름이 문서 전반에 반복된다.'
    - type: number_verify
      result: pass
      sources: 3
      summary: '가변 숫자는 2026-04-21 기준으로 다시 고정했어.'
      items:
        - 'GitHub API 기준 repository stars는 57,756이다.'
        - 'latest release는 2026-04-20에 게시된 `v0.37.2`다.'
        - '이번 lab 인스턴스의 `pocketbase.exe` 메모리는 Working Set 32.6 MB, Private 61.6 MB였다.'
    - type: adversarial
      result: pass
      sources: 3
      summary: '이 페이지의 도입 판단은 공식 구조와 실제 실행에서 같이 나온 해석이야. embedded SQLite, portable executable, admin UI 즉시성은 장점이고, 분산 구조와 managed infra 기본 전제에선 장점이 줄어든다.'
      items:
        - 'managed Postgres나 multi-region 기본 전제를 원하는 팀에선 PocketBase의 핵심 장점이 줄어든다. 이건 embedded SQLite 구조에서 나온 해석이다.'
        - 'README는 v1.0.0 전에는 full backward compatibility를 보장하지 않는다고 적고 있다.'
        - '그래서 이 페이지는 PocketBase를 범용 backend platform보다 빠른 single-node backend kit 쪽으로 먼저 평가한다.'
guideVersion:
  common: '3.0.0'
  projects: '3.0.0'
reviewStamp:
  panelVersion: '1.0.0'
  agentVersions:
    beginner-editor: '1.0.0'
    fact-checker: '1.0.0'
    skeptical-critic: '1.1.0'
    tone-editor: '1.3.0'
    structure-editor: '1.1.0'
  panelVerdict: pass
  contentHash: '6c3d504f1ffa9c46'
  reviewedAt: '2026-04-21'
---

## 한 줄 판단

PocketBase는 "백엔드 기본 세트"를 한 파일에 묶어 바로 돌려 보려는 팀에 강하다. auth, admin, files, realtime, CRUD를 한 번에 붙이고 싶다면 아주 빠르고, 반대로 managed Postgres나 분산 구조가 첫날부터 기본 전제면 장점이 줄어든다.

## repo sample과 실제 실행

이번에는 repo를 보고 sample이 있으면 그걸 돌려 보자는 기준으로 접근했어. 공식 README는 prebuilt executable이 `examples/base/main.go` 기반이라고 적고 있어서, Go toolchain이 없는 이 환경에선 source build 대신 공식 Windows amd64 release를 바로 실행했다. 즉, 설명만 읽은 게 아니라 repo가 가리키는 base sample의 컴파일된 결과물을 실제로 밟은 셈이다.

```bash
pocketbase.exe --dir .\pb_data serve --http 127.0.0.1:18092
pocketbase.exe --dir .\pb_data superuser upsert showcase@example.com Passw0rd!
```

이 상태에서 `/api/health`가 바로 200을 반환했고, dashboard는 `/_/#/login`으로 열렸다. superuser 로그인 뒤에는 Admin UI에서 `tasks_demo` base collection을 만들고 `title`, `slug`, `status`, `done` 필드를 넣었다. `title`은 presentable field로 바꿔서 자동 생성 리스트 화면이 사람이 읽는 운영 화면처럼 보이게 맞췄다.

## 화면에서 본 페이지

실제로 캡처한 페이지는 네 장이다. `/_/#/login`은 첫 superuser login 화면, `/_/#/collections?collection=tasks_demo`는 자동 생성 record list, row click으로 열리는 edit drawer는 자동 생성 record form, `/`는 `pb_public/index.html`에서 띄운 작은 공개 페이지다. 이 네 장은 모두 Playwright로 이번 lab 인스턴스에서 저장했다.

CRUD 자동 생성 쪽은 기대보다 분명했다. record list는 `id / title / slug / status / done / created / updated` 컬럼으로 바로 나왔고, `Admin Dashboard Review` row를 클릭하자 edit drawer가 뜨면서 같은 필드 구성이 그대로 다시 나왔다. 즉, collection 스키마를 한 번 정하면 list와 form이 동시에 따라온다.

## 로직과 데이터 연동

이번 예제는 설명만 넣지 않고 실제로 로직을 추가해 봤다. `pb_hooks/main.pb.js`에서 `onRecordCreateRequest`와 `onRecordUpdateRequest`를 써서 `title`에서 `slug`를 다시 만들고, 빈 `status`는 `draft`로 채우도록 했다. 그리고 `routerAdd("GET", "/api/demo/tasks", ...)`와 `routerAdd("GET", "/api/demo/stats", ...)`를 붙여서 collection data를 custom JSON route로 읽어 오게 만들었다.

이후 `pb_public/index.html`에서 `fetch('/api/demo/tasks')`를 호출해 두 record를 카드로 렌더링했다. 최종적으로 admin에는 `Admin Dashboard Review`, `First PocketBase Task Revised` 두 record가 보였고, route 응답도 `total 2 / done 1 / draft 1`로 맞았다. 로직이 record hook에서 값에 개입하고, route가 같은 data를 읽고, public page가 다시 그 JSON을 화면으로 바꾸는 흐름을 한 번에 확인한 셈이다.

## 운영 포인트

이번 lab 인스턴스에서 `pocketbase.exe`의 메모리는 Working Set 32.6 MB, Private 61.6 MB였다. 두 record가 들어간 `pb_data/data.db`는 156 KB였다. 아주 작은 예제 기준이긴 하지만, "single binary인데 얼마나 무거운가"를 감으로만 보지 않고 숫자로 볼 수는 있었다.

운영 경계도 비교적 선명했다. `pb_data`는 SQLite와 내부 데이터, `pb_hooks`는 JS logic, `pb_public`은 바로 서빙되는 정적 페이지를 맡는다. 이번 `tasks_demo`의 record 접근은 기본적으로 superuser 쪽만 열려 있었고, public 읽기 페이지는 custom route로 따로 열었다. 결국 access rule, binary version, backup plan을 직접 들고 가겠다는 팀에 잘 맞는다.

## 최종 판단

PocketBase는 "작지만 완성도가 높은 single-node backend"가 필요할 때 세다. repo sample이 곧 release binary와 가깝고, Admin UI가 CRUD를 자동 생성하고, `pb_hooks`와 custom route로 얇은 business logic까지 붙일 수 있어서 내부툴과 초기 제품 검증 속도가 매우 빠르다. 반대로 분산 구조와 managed infra를 기본 전제로 두고 시작하는 팀이면 여기서 얻는 속도 이점보다 구조 변경 비용이 먼저 보일 수 있다.
