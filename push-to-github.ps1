# ODIADEV GitHub Push Script (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ODIADEV GitHub Push Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check command success
function Test-LastCommand {
    param($Message)
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: $Message" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Step 1: Check git installation
Write-Host "[1/7] Checking git installation..." -ForegroundColor Yellow
try {
    git --version | Out-Null
    Write-Host "✓ Git is available" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Step 2: Initialize git repository
Write-Host ""
Write-Host "[2/7] Initializing git repository..." -ForegroundColor Yellow
if (!(Test-Path ".git")) {
    git init
    Test-LastCommand "Failed to initialize git repository"
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

# Step 3: Configure git user
Write-Host ""
Write-Host "[3/7] Configuring git user (if needed)..." -ForegroundColor Yellow
$userName = git config user.name 2>$null
if (!$userName) {
    Write-Host "Setting default git user configuration..." -ForegroundColor Yellow
    git config user.name "ODIADEV AI LTD"
    git config user.email "contact@odia.dev"
    Write-Host "✓ Git user configured" -ForegroundColor Green
} else {
    Write-Host "✓ Git user already configured: $userName" -ForegroundColor Green
}

# Step 4: Add files to git
Write-Host ""
Write-Host "[4/7] Adding files to git..." -ForegroundColor Yellow
git add .
Test-LastCommand "Failed to add files to git"
Write-Host "✓ All files staged for commit" -ForegroundColor Green

# Step 5: Create initial commit
Write-Host ""
Write-Host "[5/7] Creating initial commit..." -ForegroundColor Yellow
$commitMessage = @"
Initial commit: ODIADEV AI LTD website with fixed Vercel config

- Fixed vercel.json configuration conflict (removed functions property)
- Static PWA site with Nigerian voice-AI features
- Includes service worker for offline support
- Optimized for Nigerian mobile networks (MTN/Airtel)
- Security headers and PWA manifest included
- Ready for Vercel deployment

Products: Adaqua AI (Flagship), Cross AI, MISS Legal AI
Company: ODIADEV AI LTD - Nigeria's Voice-AI Infrastructure Platform
"@

git commit -m $commitMessage
Test-LastCommand "Failed to create commit"
Write-Host "✓ Initial commit created" -ForegroundColor Green

# Step 6: Setup GitHub remote
Write-Host ""
Write-Host "[6/7] Setting up GitHub remote..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: You need to create a GitHub repository first!" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: odiadev-web-2025" -ForegroundColor White
Write-Host "3. Description: ODIADEV AI LTD - Nigeria's Voice-AI Infrastructure Platform" -ForegroundColor White
Write-Host "4. Make it Public (recommended for open source)" -ForegroundColor White
Write-Host "5. DO NOT initialize with README, .gitignore, or license (we have them)" -ForegroundColor White
Write-Host "6. Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "After creating the repository, GitHub will show you the remote URL." -ForegroundColor Yellow
Write-Host "It will look like: https://github.com/yourusername/odiadev-web-2025.git" -ForegroundColor Yellow
Write-Host ""

$repoUrl = Read-Host "Enter your GitHub repository URL"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "ERROR: No repository URL provided" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Try to add remote, if it exists, update it
try {
    git remote add origin $repoUrl 2>$null
} catch {
    Write-Host "Remote already exists, updating..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
    Test-LastCommand "Failed to set remote URL"
}
Write-Host "✓ GitHub remote configured" -ForegroundColor Green

# Step 7: Push to GitHub
Write-Host ""
Write-Host "[7/7] Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to push to GitHub" -ForegroundColor Red
    Write-Host "This might be due to authentication issues." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Cyan
    Write-Host "1. Make sure you're logged into GitHub" -ForegroundColor White
    Write-Host "2. If using HTTPS, you might need a Personal Access Token" -ForegroundColor White
    Write-Host "3. Try running: git push -u origin main" -ForegroundColor White
    Write-Host "4. Or use GitHub Desktop for easier authentication" -ForegroundColor White
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ SUCCESS! ODIADEV pushed to GitHub" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your repository is now available at:" -ForegroundColor Cyan
Write-Host $repoUrl -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Connect to Vercel for automatic deployments" -ForegroundColor White
Write-Host "2. Go to https://vercel.com/new" -ForegroundColor White
Write-Host "3. Import your GitHub repository" -ForegroundColor White
Write-Host "4. Deploy with zero configuration needed" -ForegroundColor White
Write-Host ""
Write-Host "The fixed vercel.json will ensure smooth deployment!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"
