@echo off
echo ========================================
echo ODIADEV GitHub Push Script
echo ========================================
echo.

echo [1/7] Checking git installation...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✓ Git is available

echo.
echo [2/7] Initializing git repository...
if not exist ".git" (
    git init
    if %errorlevel% neq 0 (
        echo ERROR: Failed to initialize git repository
        pause
        exit /b 1
    )
    echo ✓ Git repository initialized
) else (
    echo ✓ Git repository already exists
)

echo.
echo [3/7] Configuring git user (if needed)...
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo Setting default git user configuration...
    git config user.name "ODIADEV AI LTD"
    git config user.email "contact@odia.dev"
    echo ✓ Git user configured
) else (
    echo ✓ Git user already configured
)

echo.
echo [4/7] Adding files to git...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files to git
    pause
    exit /b 1
)
echo ✓ All files staged for commit

echo.
echo [5/7] Creating initial commit...
git commit -m "Initial commit: ODIADEV AI LTD website with fixed Vercel config

- Fixed vercel.json configuration conflict (removed functions property)
- Static PWA site with Nigerian voice-AI features
- Includes service worker for offline support
- Optimized for Nigerian mobile networks (MTN/Airtel)
- Security headers and PWA manifest included
- Ready for Vercel deployment

Products: Adaqua AI (Flagship), Cross AI, MISS Legal AI
Company: ODIADEV AI LTD - Nigeria's Voice-AI Infrastructure Platform"
if %errorlevel% neq 0 (
    echo ERROR: Failed to create commit
    pause
    exit /b 1
)
echo ✓ Initial commit created

echo.
echo [6/7] Setting up GitHub remote...
echo.
echo IMPORTANT: You need to create a GitHub repository first!
echo.
echo 1. Go to https://github.com/new
echo 2. Repository name: odiadev-web-2025
echo 3. Description: ODIADEV AI LTD - Nigeria's Voice-AI Infrastructure Platform
echo 4. Make it Public (recommended for open source)
echo 5. DO NOT initialize with README, .gitignore, or license (we have them)
echo 6. Click "Create repository"
echo.
echo After creating the repository, GitHub will show you the remote URL.
echo It will look like: https://github.com/yourusername/odiadev-web-2025.git
echo.
set /p REPO_URL="Enter your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo ERROR: No repository URL provided
    pause
    exit /b 1
)

git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo ERROR: Failed to add remote origin
    echo This might be because it already exists. Trying to update...
    git remote set-url origin %REPO_URL%
    if %errorlevel% neq 0 (
        echo ERROR: Failed to set remote URL
        pause
        exit /b 1
    )
)
echo ✓ GitHub remote configured

echo.
echo [7/7] Pushing to GitHub...
git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to GitHub
    echo This might be due to authentication issues.
    echo.
    echo Troubleshooting:
    echo 1. Make sure you're logged into GitHub
    echo 2. If using HTTPS, you might need a Personal Access Token
    echo 3. Try: git push -u origin main
    echo 4. Or use GitHub Desktop for easier authentication
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ SUCCESS! ODIADEV pushed to GitHub
echo ========================================
echo.
echo Your repository is now available at:
echo %REPO_URL%
echo.
echo Next steps:
echo 1. Connect to Vercel for automatic deployments
echo 2. Go to https://vercel.com/new
echo 3. Import your GitHub repository
echo 4. Deploy with zero configuration needed
echo.
echo The fixed vercel.json will ensure smooth deployment!
echo.
pause
