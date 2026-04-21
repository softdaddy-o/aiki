Set-Location "D:\srcp\aiki"

$logFile  = "D:\srcp\aiki\logs\aiki-daily.log"
$node     = "D:\Program Files\nodejs\node.exe"

function Log($msg) {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $msg"
    Add-Content $logFile $line
    Write-Host $line
}

function Run($label, $args) {
    Log "--- $label ---"
    & $node $args 2>&1 | Tee-Object -Append -FilePath $logFile
    $exit = $LASTEXITCODE
    Log "$label exit=$exit"
    return $exit
}

Log "=== aiki-daily start ==="

# 1. 포맷 마이그레이션
Run "migrate-format-version" "D:\srcp\aiki\scripts\aiki-migrate-format-version.cjs"

# 2. 위키 용어 동기화 (discovery 전에 최신 상태 확보)
Run "sync-wiki-terms" "D:\srcp\aiki\scripts\aiki-sync-wiki-terms.cjs"

# 3. 위키 발굴 (내부적으로 sync-wiki-terms + link-related-terms 재실행)
Run "wiki-discovery" "D:\srcp\aiki\scripts\aiki-run-wiki-discovery.cjs"

# 4. 본문 링크 자동완성 (발굴로 생긴 새 용어 포함)
Run "autolink-body" "D:\srcp\aiki\scripts\aiki-autolink-body.cjs"

# 5. 변경사항 커밋 + 푸시
Log "--- git commit+push ---"
$changed = & git status --porcelain 2>&1
if ($changed) {
    $date = Get-Date -Format "yyyy-MM-dd"
    & git add src/content/ data/ 2>&1 | Tee-Object -Append -FilePath $logFile
    $msg = "chore(daily): migrate, wiki-discovery, autolink [$date]"
    & git commit -m $msg 2>&1 | Tee-Object -Append -FilePath $logFile
    & git push 2>&1 | Tee-Object -Append -FilePath $logFile
    Log "push exit=$LASTEXITCODE"
} else {
    Log "no changes to commit"
}

Log "=== aiki-daily done ==="
