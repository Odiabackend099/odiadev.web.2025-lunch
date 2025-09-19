@echo off
echo ========================================
echo ODIADEV Vercel Deployment Fix Script
echo ========================================
echo.

echo [1/4] Validating project structure...
if not exist "index.html" (
    echo ERROR: index.html not found
    exit /b 1
)
if not exist "vercel.json" (
    echo ERROR: vercel.json not found
    exit /b 1
)
if not exist "styles.css" (
    echo ERROR: styles.css not found
    exit /b 1
)
if not exist "script.js" (
    echo ERROR: script.js not found
    exit /b 1
)
if not exist "manifest.json" (
    echo ERROR: manifest.json not found
    exit /b 1
)
if not exist "sw.js" (
    echo ERROR: sw.js not found
    exit /b 1
)
echo ✓ All required files present

echo.
echo [2/4] Validating vercel.json configuration...
findstr /c:"functions" vercel.json >nul
if %errorlevel% equ 0 (
    echo ERROR: vercel.json still contains 'functions' property
    echo This conflicts with 'builds' property for static sites
    exit /b 1
)
findstr /c:"builds" vercel.json >nul
if %errorlevel% neq 0 (
    echo ERROR: vercel.json missing 'builds' property
    exit /b 1
)
echo ✓ Configuration valid - no conflicts detected

echo.
echo [3/4] Checking for Vercel CLI...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Vercel CLI
        exit /b 1
    )
)
echo ✓ Vercel CLI available

echo.
echo [4/4] Ready for deployment!
echo.
echo To deploy your ODIADEV site:
echo 1. Run: vercel
echo 2. Follow the prompts to link/create project
echo 3. Your site will be deployed successfully
echo.
echo Configuration Summary:
echo - Static site with PWA features
echo - Service worker for offline support
echo - Optimized headers for Nigerian mobile networks
echo - Security headers included
echo.
pause
