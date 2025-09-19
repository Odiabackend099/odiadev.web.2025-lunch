@echo off
echo ========================================
echo ODIADEV GitHub + Vercel Deployment
echo Battle-tested for Nigerian networks
echo ========================================

REM Step 1: Initialize Git repository
echo [1/6] Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Git init failed
    pause
    exit /b 1
)

REM Step 2: Add all files
echo [2/6] Adding files to Git...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Git add failed
    pause
    exit /b 1
)

REM Step 3: Initial commit
echo [3/6] Creating initial commit...
git commit -m "feat: ODIADEV AI website with PWA support for Nigerian mobile users

- Mobile-first design optimized for 2G/3G networks
- PWA with offline support and service worker
- Adaqua AI, Cross AI, MISS Legal AI product showcase
- Vercel deployment configuration
- Nigerian English + local language support ready"
if %errorlevel% neq 0 (
    echo ERROR: Git commit failed
    pause
    exit /b 1
)

REM Step 4: Set main branch
echo [4/6] Setting main branch...
git branch -M main
if %errorlevel% neq 0 (
    echo ERROR: Branch rename failed
    pause
    exit /b 1
)

REM Step 5: Add GitHub remote
echo [5/6] Adding GitHub remote...
git remote add origin https://github.com/Odiabackend099/odiadev.web.2025-lunch.git
if %errorlevel% neq 0 (
    echo WARNING: Remote might already exist, continuing...
)

REM Step 6: Push to GitHub
echo [6/6] Pushing to GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo ERROR: Git push failed - check your GitHub credentials
    echo Run: git push -u origin main
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ SUCCESS! Deployment Complete
echo ========================================
echo.
echo 📁 GitHub Repository:
echo    https://github.com/Odiabackend099/odiadev.web.2025-lunch
echo.
echo 🚀 Next Steps:
echo    1. Go to vercel.com
echo    2. Import your GitHub repository
echo    3. Deploy automatically
echo.
echo 📱 PWA Features Included:
echo    ✓ Offline support for Nigerian networks
echo    ✓ Mobile-first responsive design
echo    ✓ Service worker for caching
echo    ✓ Install prompt for home screen
echo    ✓ Optimized for 2G/3G connections
echo.
echo 🎯 Live URL will be:
echo    https://odiadev-web-2025.vercel.app
echo.
pause
