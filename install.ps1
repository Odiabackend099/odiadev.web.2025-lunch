Param(
  [string]$Target = "."
)
$ErrorActionPreference = "Stop"
Write-Host "==> Installing ODIADEV site into: $Target"

# Create backup
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backup = Join-Path $Target ("backup_frontend_" + $stamp)
New-Item -ItemType Directory -Force -Path $backup | Out-Null

$paths = @("index.html","robots.txt","sitemap.xml","manifest.json","sw.js","assets",".well-known","favicon.ico","ai.txt","llm.txt","humans.txt")
foreach ($p in $paths) {
  $full = Join-Path $Target $p
  if (Test-Path $full) {
    $dest = Join-Path $backup $p
    New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
    Copy-Item -Recurse -Force $full $dest
  }
}
Write-Host "==> Backup saved to $backup"

# Copy new files
Copy-Item -Recurse -Force "$PSScriptRoot\*" $Target

# Validate
$required = @("index.html","assets\img\logo.png","robots.txt","sitemap.xml")
foreach ($r in $required) {
  if (-not (Test-Path (Join-Path $Target $r))) {
    throw "Missing $r after install"
  }
}
Write-Host "==> Install complete." -ForegroundColor Green
