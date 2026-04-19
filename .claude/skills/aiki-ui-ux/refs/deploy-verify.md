# Deploy verification recipes

"배포됐어? 똑같아 보이는데?" 를 다시 듣지 않기 위함.

## 1. 고유 문자열 고르기

변경한 CSS/HTML 에서 다른 커밋에 있을 확률이 거의 없는 고유한 문자열을 하나 골라.

좋은 후보:
- 새로 추가한 margin/max-width 의 calc() 식: `margin-left:max(220px,calc((100vw - 1440px)`
- 새 클래스 이름의 전체 형태: `.project-page--showcase-native`
- 새 CSS 변수나 속성 이름 조합: `grid-template-columns:minmax(0,1fr)` (너무 흔하면 주변 맥락 포함)

나쁜 후보:
- 짧고 흔한 단어 (`max-width`, `flex`, etc.)
- 최근 여러 커밋에 걸쳐 반복된 것

## 2. curl grep

```bash
curl -s "https://aiki.softdaddy-o.com/ko/projects/hyperframes/" | grep -F "margin-left:max(220px,calc"
```

- 매치 → 신규 CSS 배포됨.
- 빈 출력 → 아직 이전 빌드. 60초 ~ 2분 대기 후 재시도.
- 주의: 배포 백엔드(GitHub Pages / Cloudflare)에 따라 첫 빌드 후 edge cache propagation 2~5분 걸림.

## 3. 캐시 우회 스크린샷

브라우저 캐시, CDN edge cache 우회 위해 쿼리 스트링 시간값 붙임.

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --user-data-dir=/tmp/chromeLive \
  --window-size=1440,1000 --virtual-time-budget=6000 \
  --screenshot=.tmp/screenshots/live-1440.png \
  "https://aiki.softdaddy-o.com/ko/projects/hyperframes/?v=$(date +%s)"
```

- `--user-data-dir=/tmp/chromeLive` 매번 새 디렉터리로 쿠키/캐시 분리.
- `?v=$(date +%s)` Unix timestamp 로 CDN 캐시 키 변경.

## 4. 여러 뷰포트 한번에

```bash
for w in 390 768 1440 2560; do
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
    --headless=new --disable-gpu --user-data-dir=/tmp/chL_$w \
    --window-size=$w,1000 --hide-scrollbars --virtual-time-budget=5500 \
    --screenshot=.tmp/screenshots/live-$w.png \
    "https://aiki.softdaddy-o.com/ko/projects/hyperframes/?v=$(date +%s)"
done
```

`--hide-scrollbars` 는 모바일 시뮬레이션에서 스크롤바 15px 예약 아티팩트 제거용.

## 5. 배포 타임라인

- GitHub Pages: push → action 빌드 → deploy. 약 1~3분.
- Cloudflare Pages: push → build → deploy. 약 2~5분 + edge propagation 1~2분.

빠른 재시도 루프:

```bash
until curl -s "https://aiki.softdaddy-o.com/ko/projects/hyperframes/" | grep -qF "<FRAGMENT>"; do
  echo "not yet, waiting 30s..."
  sleep 30
done
echo "deployed."
```
