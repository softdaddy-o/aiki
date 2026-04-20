Set-Location "D:\srcp\aiki"
$logFile = "D:\srcp\aiki\logs\migrate-format-version.log"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content $logFile "[$timestamp] === run start ==="
& "D:\Program Files\nodejs\node.exe" "D:\srcp\aiki\scripts\aiki-migrate-format-version.cjs" 2>&1 | Tee-Object -Append -FilePath $logFile
$exit = $LASTEXITCODE
Add-Content $logFile "[$timestamp] exit=$exit"
