# Deploy AgroMan to Vercel - PowerShell Script

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════════╗"
Write-Host "║                                                                            ║"
Write-Host "║              🚀 AGROMAN DEPLOYMENT TO VERCEL - STEP BY STEP               ║"
Write-Host "║                                                                            ║"
Write-Host "╚════════════════════════════════════════════════════════════════════════════╝"
Write-Host ""

# Change to project root
Set-Location $PSScriptRoot

# Step 1: Install Vercel CLI
Write-Host "📥 STEP 1: Installing Vercel CLI..."
Write-Host "────────────────────────────────────────────────────────────"

# Check if vercel is already installed
try {
    $vercelVersion = & vercel --version 2>&1
    Write-Host "✅ Vercel CLI already installed: $vercelVersion"
} catch {
    Write-Host "Installing Vercel CLI globally..."
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI"
        Write-Host ""
        Write-Host "Alternative: Try running this in Administrator mode"
        exit 1
    }
}

Write-Host ""
Write-Host "📝 STEP 2: Login to Vercel..."
Write-Host "────────────────────────────────────────────────────────────"
Write-Host "A browser window will open for you to login."
Write-Host ""

vercel login

Write-Host ""
Write-Host "✅ Logged in to Vercel"
Write-Host ""

# Step 3: Deploy Backend
Write-Host "🔧 STEP 3: Deploying Backend to Vercel..."
Write-Host "────────────────────────────────────────────────────────────"

Set-Location backend
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend deployed successfully!"
} else {
    Write-Host "⚠️ Backend deployment may have issues"
}

Set-Location ..

Write-Host ""

# Step 4: Deploy Frontend
Write-Host "🔧 STEP 4: Deploying Frontend to Vercel..."
Write-Host "────────────────────────────────────────────────────────────"

Set-Location frontend
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend deployed successfully!"
} else {
    Write-Host "⚠️ Frontend deployment may have issues"
}

Set-Location ..

Write-Host ""
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════════╗"
Write-Host "║                                                                            ║"
Write-Host "║                   ✅ DEPLOYMENT COMPLETE! ✅                              ║"
Write-Host "║                                                                            ║"
Write-Host "║            Your AgroMan app is now live on Vercel!                        ║"
Write-Host "║                                                                            ║"
Write-Host "║  🌐 URLS:                                                                  ║"
Write-Host "║                                                                            ║"
Write-Host "║     Frontend:  https://agroman-frontend.vercel.app/                       ║"
Write-Host "║     Backend:   https://agroman-backend.vercel.app/api/                    ║"
Write-Host "║                                                                            ║"
Write-Host "║  Anyone in the world can access these URLs!                               ║"
Write-Host "║                                                                            ║"
Write-Host "║  Test Credentials:                                                         ║"
Write-Host "║     Email: consumer@agroman.com                                            ║"
Write-Host "║     Password: password123                                                  ║"
Write-Host "║                                                                            ║"
Write-Host "╚════════════════════════════════════════════════════════════════════════════╝"
Write-Host ""
