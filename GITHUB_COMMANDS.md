# 🚀 ODIADEV GitHub Push Commands

## Quick Manual Setup

If you prefer to run commands manually, here's the exact sequence:

### 1. Initialize Git Repository
```bash
git init
```

### 2. Configure Git User (if needed)
```bash
git config user.name "ODIADEV AI LTD"
git config user.email "contact@odia.dev"
```

### 3. Add All Files
```bash
git add .
```

### 4. Create Initial Commit
```bash
git commit -m "Initial commit: ODIADEV AI LTD website with fixed Vercel config

- Fixed vercel.json configuration conflict (removed functions property)
- Static PWA site with Nigerian voice-AI features  
- Includes service worker for offline support
- Optimized for Nigerian mobile networks (MTN/Airtel)
- Security headers and PWA manifest included
- Ready for Vercel deployment

Products: Adaqua AI (Flagship), Cross AI, MISS Legal AI
Company: ODIADEV AI LTD - Nigeria's Voice-AI Infrastructure Platform"
```

### 5. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `odiadev-web-2025`
3. Description: `ODIADEV AI LTD - Nigeria's Voice-AI Infrastructure Platform`
4. Make it **Public** (recommended)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 6. Add Remote & Push
```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/odiadev-web-2025.git
git branch -M main
git push -u origin main
```

## 🎯 Automated Options

### Option A: Run Batch Script
```cmd
push-to-github.bat
```

### Option B: Run PowerShell Script  
```powershell
.\push-to-github.ps1
```

## 🔧 Troubleshooting

### Authentication Issues
If you get authentication errors:

1. **Personal Access Token** (Recommended)
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` permissions
   - Use token as password when prompted

2. **GitHub CLI** (Alternative)
   ```bash
   # Install GitHub CLI first
   gh auth login
   gh repo create odiadev-web-2025 --public --source=. --push
   ```

3. **SSH Keys** (Advanced)
   ```bash
   # If you have SSH keys set up
   git remote set-url origin git@github.com:YOUR_USERNAME/odiadev-web-2025.git
   ```

## ✅ Verification

After successful push, verify:
1. Visit your repository: `https://github.com/YOUR_USERNAME/odiadev-web-2025`
2. Check all files are present
3. Verify `vercel.json` shows the fixed configuration (no `functions` property)

## 🚀 Next Steps: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect it as a static site
4. Deploy with zero configuration needed!

The fixed `vercel.json` ensures smooth deployment without the previous error.
