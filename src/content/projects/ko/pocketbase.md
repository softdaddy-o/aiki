---
title: PocketBase
slug: pocketbase
lang: ko
category: framework
summary: PocketBase는 SQLite, admin UI, auth/files/realtime를 한 바이너리에 묶은 single-node 백엔드야. 내부툴이나 작은 MVP를 오늘 바로 띄워 볼 팀이면 여기서 먼저 걸러 볼 수 있어.
readerValue: '지금 필요한 게 PocketBase 같은 single-node kit인지, 아니면 managed backend로 바로 가야 하는지 가를 기준.'
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
    - url: /pocketbase/admin-login.png
      title: 'PocketBase Playwright capture: superuser login'
    - url: /pocketbase/admin-records.png
      title: 'PocketBase Playwright capture: generated records list'
    - url: /pocketbase/admin-record-edit.png
      title: 'PocketBase Playwright capture: record edit drawer'
    - url: /pocketbase/public-page.png
      title: 'PocketBase Playwright capture: public demo page'
  checks:
    - type: source_match
      result: pass
      sources: 4
      summary: 'README와 docs 기준 제품 정의, standalone 실행 경로, Go/JS 확장 지점을 먼저 대조했어.'
      items:
        - >-
          README 소개 문구에서 PocketBase를 embedded SQLite, realtime subscriptions,
          files and users management, Admin dashboard UI, REST-ish API를 포함한 open
          source Go backend로 확인.
        - >-
          README standalone 예시에서 prebuilt executable을 내려받아 `./pocketbase serve`로
          시작하는 실행 경로 확인.
        - >-
          README Go toolkit 예시에서 `pocketbase.New()`와 `app.OnServe()`로 custom
          route를 붙이는 최소 확장 경로 확인.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: >-
        독립 출처 2개 이상 교차검증까진 못 갔어. 그래서 이번 판단은 README, docs, release note 같은 1차 문서와
        내부 lab 관찰을 함께 본 1차 검토로만 묶어 뒀어.
      items:
        - >-
          README, docs, release note는 모두 1차 제품 문서다. 이번 교차 확인은 제품 정의, JS hooks/Go
          overview, 현재 배포 버전 확인까지만 맡겼다.
        - >-
          PocketBase를 single binary + embedded SQLite + admin UI 출발선으로 읽는 해석은 1차 문서와
          내부 실행 결과(`/api/health`, login, records list, public page)가 서로 어긋나지 않는 수준까지 확인.
        - >-
          제3자 운영 사례나 독립 벤치마크는 이번 문서에 없다. 그래서 multi-node 운용, managed Postgres
          대체성, backup/restore·concurrent write 한계 평가는 보수적으로 남겨 뒀다.
    - type: number_verify
      result: pass
      summary: 공개 숫자와 내부 관찰 수치를 갈라 두고, 각 항목을 가능한 한 직접 근거 이름에 붙였어.
      items:
        - '[공식 웹 | repository page] GitHub API 기준 stars 57,756 확인.'
        - '[공식 웹 | release page] latest release가 2026-04-20 게시 `v0.37.2`인지 확인.'
        - >-
          [internal lab observation | health endpoint] `127.0.0.1:18092/api/health`가 200을 반환하는지
          단일 Windows lab 실행에서 확인.
        - >-
          [internal lab observation | `admin-login.png`] `/_/#/login` superuser login 화면이
          열리는지 확인.
        - >-
          [internal lab observation | `admin-records.png`, `admin-record-edit.png`] `tasks_demo`
          records list와 edit drawer에서 2개 레코드, `slug`, `status` 반영 상태 확인.
        - >-
          [internal lab observation | `public-page.png`] `pb_public/index.html`이 두 record와 stats
          카드를 렌더링하는지 확인.
        - >-
          [internal lab observation | demo route] `/api/demo/stats` 값이 `total 2 / done 1 /
          draft 1`로 맞는지 같은 lab 세션에서 확인.
        - >-
          [internal lab observation | process/files] `pocketbase.exe` Working Set 32.6 MB,
          Private 61.6 MB, `pb_data/data.db` 156 KB는 두 record만 넣은 단일 Windows lab 실행값으로만
          기록. 일반 운영 수치로 확대 해석하지 않음.
    - type: adversarial
      result: pass
      sources: 3
      summary: >-
        README의 pre-v1 경고와 lab의 single-node 실행 구조를 같이 놓고, 어디까지 맞고 어디서 불리해지는지 갈라 봤어.
      items:
        - >-
          managed Postgres나 multi-region 기본 전제를 원하는 팀에선 PocketBase의 핵심 장점이 줄어. 이건
          embedded SQLite 구조에서 바로 나오는 해석이야.
        - README의 v1.0.0 이전 full backward compatibility 미보장 경고도 같이 확인했어.
        - 그래서 첫 테스트 축도 범용 backend platform보다 single-node backend kit에 두는 편이 맞았어.
guideVersion:
  tone: 2.0.0
  common: 2.2.0
  projects: 4.2.0
---

## takeaway

- PocketBase: embedded SQLite, admin UI, auth/files/realtime를 한 바이너리에 묶은 single-node backend kit.
- 지금 바로 테스트할 팀: 작은 내부툴, 운영 대시보드, single-node MVP처럼 admin과 CRUD를 먼저 확인해야 하는 팀.
- `managed Postgres`, multi-region, 복잡한 분산 구조가 출발점이면 장점이 금방 줄어.

## USE / SKIP

### USE

- 작은 내부툴, 운영 대시보드, single-node MVP처럼 admin과 CRUD가 먼저 보여야 할 때.
- `pb_hooks`(내장 JS hook 디렉터리)와 custom route로 얇은 business logic만 얹고 싶은 팀.
- release binary를 먼저 띄우고 나중에 custom Go app으로 승격하는 순서를 선호하는 팀.

### SKIP

- managed Postgres와 hosted ops를 기본 전제로 두는 팀.
- multi-region이나 복잡한 분산 topology를 초반부터 설계해야 하는 팀.
- binary version, backup, upload path, access rule을 직접 운영하고 싶지 않은 팀.

## cases

### release 실행

- 공식 README가 가리키는 prebuilt executable 흐름을 [CLI(명령줄 인터페이스)](/ko/wiki/cli/) 기준으로 그대로 밟은 경로.
- Go toolchain이 없는 환경에서 source build 대신 공식 Windows amd64 release `v0.37.2`를 바로 쓴 구성.

```bash
pocketbase.exe --dir .\pb_data serve --http 127.0.0.1:18092
pocketbase.exe --dir .\pb_data superuser upsert showcase@example.com Passw0rd!
```

- `/api/health` 즉시 200, dashboard는 `/_/#/login`으로 바로 오픈.

### 자동 Admin CRUD

- `tasks_demo` base collection에 `title`, `slug`, `status`, `done` 필드를 넣고 `title`을 presentable field(리스트에서 대표로 먼저 보여 줄 필드)로 잡았어.
- records list는 `id / title / slug / status / done / created / updated` 컬럼으로 바로 생성돼.
- `Admin Dashboard Review` 행을 클릭하면 같은 스키마를 쓰는 edit drawer가 열려 list와 form이 함께 따라오는 구조를 바로 볼 수 있어.

### `pb_hooks` + route + `pb_public`

- `pb_hooks/main.pb.js`에서 `title -> slug` 동기화와 빈 `status -> draft` 기본값 적용.
- `routerAdd("GET", "/api/demo/tasks", ...)`와 `routerAdd("GET", "/api/demo/stats", ...)`로 읽기 전용 [API(애플리케이션 프로그래밍 인터페이스)](/ko/wiki/api/) 분리.
- `pb_public/index.html`은 `fetch('/api/demo/tasks')`로 두 record를 카드로 렌더링했고, `/api/demo/stats` 값도 `total 2 / done 1 / draft 1`로 일치.

## adopt

1. 공식 release binary나 `examples/base`부터 띄워서 login과 health를 먼저 확인해.
2. collection을 만들 때 운영자가 읽을 대표 필드 하나를 presentable로 잡아 records list를 정리해.
3. `pb_hooks`에서 기본값과 slug 동기화처럼 얇은 규칙만 붙이고, 읽기 전용 route 한두 개로 공개 화면을 나눠.
4. hook과 route가 커질 때만 custom Go app으로 승격해.

## ops

- `pocketbase.exe`: 이번 단일 Windows lab에서만 Working Set 32.6 MB, Private 61.6 MB, `pb_data/data.db` 156 KB.
- `pb_data`는 SQLite와 내부 데이터, `pb_hooks`는 JS logic, `pb_public`은 정적 페이지를 맡는 분리 구조.
- 이번 `tasks_demo`는 기본적으로 superuser만 record 접근을 열고, public 읽기는 custom route로 따로 분리해 뒀어.
- pre-v1 경고가 있어서 version pin, backup plan, 업그레이드 순서를 같이 가져가는 편이 안전해.

## compare

- [`Supabase`](/ko/wiki/supabase/) / Firebase: auth, storage, DB를 managed service로 묶고 서버 운영을 줄이고 싶을 때 더 자연스러워. 반대로 single binary와 자동 admin CRUD를 빨리 붙이는 속도는 PocketBase가 앞서.
- `Go + chi + SQLite 직접 조합`: admin 화면까지 직접 설계하고 schema와 runtime을 코드로 세밀하게 통제하고 싶을 때 맞아. 대신 초기 CRUD와 운영 화면은 PocketBase 쪽이 먼저 붙어.
- `PocketBase`: single-node 내부툴과 MVP에서 auth, admin, files, realtime을 한 번에 올릴 때 강점이 커. 대신 binary, filesystem, access rule 운영 책임은 팀이 계속 직접 안고 가야 해.
